import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchOffer } from '../../modules/offer';
import { InputGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import { Checkbox, Image } from 'react-bootstrap';
import FileReaderInput from 'react-file-reader';
import ReactLoading from 'react-loading';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { fetchUsers } from '../../modules/users';
import IPCONFIG from '../../IPCONFIG';

class Editoffer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offer: {
        photos: [''],
      },
      loaded: false,
      Lng: '',
      Lan: '',
      file: 'file name..',
      error: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    this.props.fetchOffer(this.props.match.params.id);
    this.props.fetchUsers();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchoffer(nextProps.match.params.id);
    }
  }

  componentDidUpdate() {
    if (this.state.loaded === false && this.props.offer.loading === false) {
      this.setState({
        offer: this.props.offer.offer,
        loaded: true,
      });
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.offer.loading || this.state.gyventojuMasyvas) {
    } else {
      this.setState({
        ...this.state,
        gyventojuMasyvas: [
          ...nextProps.offer.offer.livingPersons.map(user => {
            return {
              label: user.firstName + " " + user.lastName,
              value: user.id
            }
          })
        ]
      }
      )
    }
  }

  handleSubmit = function(event) {
    event.preventDefault();
    let user = this.props.login.user;
    let data = Object.assign({}, this.state.offer);
    axios
      .get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: data.city + ' ' + data.streetAdress,
          key: 'AIzaSyCuB6H4JuDWu0-U4M6OBXPm8uqjuYhx5Hk',
        },
      })
      .then(result => {
        let { owner, ...data2 } = { ...data };
        let newOfferObject = {
          ...data2,
          Owner: user.id,
          Lat: result.data.results[0].geometry.location.lat.toString(),
          Lng: result.data.results[0].geometry.location.lng.toString(),
        };
        axios
          .put(IPCONFIG + 'api/offers', newOfferObject, {
            headers: { Authorization: 'Bearer ' + user.token },
          })
          .then(result => {
            this.props.history.push('/user-offers/' + user.id);
            this.setState({
              ...this.state,
              error: null
            })
          })
          .catch(error => { 
            this.setState({
              ...this.state,
              error: error.response.data
            })
         });
      })
      .catch(() =>
        axios
          .put(
            IPCONFIG + 'api/offers',
            {
              Id: data.Id,
              Owner: user.id,
              city: data.City,
              streetAdress: data.StreetAdress,
              photos: data.photos,
              floor: data.Floor,
              numberOfRooms: data.NumberOfRooms,
              peopleInRoom: data.PeopleInRoom,
              hasBalcony: data.HasBalcony,
              petsAllowed: data.PetsAllowed,
              price: data.Price,
              Lat: null,
              Lng: null,
              description: data.Description,
              sizeOfRoom: data.SizeOfRoom,
              heatingCost: data.HeatingCost,
              carPlace: data.CarPlace,
              airConditioner: data.AirConditioner,
            },
            {
              headers: { Authorization: 'Bearer ' + user.token },
            }
          )
          .then(result => {
            this.props.history.push('/user-offers/' + user.id);
            this.setState({
              ...this.state,
              error: null
            })
          })
          .catch(error => { 
            this.setState({
              ...this.state,
              error: error.response.data
            })
         })
      );
  };

  onChange = event => {
    this.setState({
      offer: {
        ...this.state.offer,
        [event.target.name]: event.target.value,
      },
    });
  };

  AddPhotoField() {
    this.setState({
      offer: {
        ...this.state.offer,
        photos: this.state.offer.photos.concat(['']),
      },
    });
  }

  RemovePhotoField = id => () => {
    this.setState({
      offer: {
        ...this.state.offer,
        photos: this.state.offer.photos.filter((s, sid) => id !== sid),
      },
    });
  };
  selectCity(c) {
    this.setState({
      ...this.state,
      offer: {
        ...this.state.offer,
        city: c.target.value,
      },
    });
  }

  onCheck = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ offer: { ...this.state.offer, [name]: value } });
  };

  handleFile(file, i) {
    this.setState({
      ...this.state,
      offer: {
        ...this.state.offer,
        photos: [
          ...this.state.offer.photos.slice(0, i),
          file.base64,
          ...this.state.offer.photos.slice(i + 1),
        ],
      },
    });
  }

  render() {
    if (this.props.offer.loading === true) {
      return (
        <ReactLoading
          type={'bars'}
          color={'#ff4444'}
          height="200px"
          widgth="200px"
        />
      );
    }
    let allPhotos = this.state.offer.photos;
    const {
      streetAdress,
      floor,
      numberOfRooms,
      peopleInRoom,
      sizeOfRoom,
      description,
      heatingCost,
      price,
      airConditioner,
      carPlace,
      hasBalcony,
      petsAllowed,
      city,
    } = this.state.offer;

    return (
      <div className="container">
        <Form horizontal>
        {this.state.error !== null && <div className="callout callout-danger"> 
        <h4>Ivyko klaida:</h4>
          {this.state.error.map(error => (
              <p>
                {error}
              </p>
            ))}
        </div>
        }
          <h1>Pasiūlymo redagavimas</h1>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Miestas
            </Col>
            <Col sm={5}>
              <FormControl
                componentClass="select"
                onChange={this.selectCity.bind(this)}
              >
                <option name="miestas">{city}</option>
                <option name="Vilnius">Vilnius</option>
                <option name="Kaunas">Kaunas</option>
                <option name="Klaipėda">Klaipėda</option>
                <option name="Šiauliai">Šiauliai</option>
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Gatvė, namo numeris
            </Col>
            <Col sm={5}>
              <FormControl
                type="text"
                name="streetAdress"
                value={streetAdress || ''}
                onChange={this.onChange.bind(this)}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Nuotraukos
            </Col>
            {allPhotos.map((photo, i) => {
              return (
                <div key={i}>
                  {i > 0 ? <Col sm={2} /> : null}
                  <Col sm={10}>
                    <Col sm={5}>
                      <InputGroup key={i} className={'Photo' + i}>
                        <InputGroup.Addon>
                          <Glyphicon glyph="camera" />
                        </InputGroup.Addon>
                        <InputGroup.Addon>
                          <FileReaderInput
                            as="url"
                            base64={true}
                            name={'PhotoIn' + i}
                            handleFiles={e => this.handleFile(e, i)}
                          >
                            {this.state.offer.photos[i] !== '' ? <Image alt="offer house" src={this.state.offer.photos[i]} width="150px" height="150px" rounded responsive /> :
                              <Button bsStyle="primary" bsSize="xsmall">
                                <Glyphicon glyph="paperclip" />
                              </Button>}
                          </FileReaderInput>
                        </InputGroup.Addon>
                        <InputGroup.Addon>
                          <Button
                            bsStyle="danger"
                            bsSize="xsmall"
                            type="button"
                            onClick={i > 0 ? this.RemovePhotoField(i) : null}
                          >
                            <Glyphicon glyph="remove" />
                          </Button>
                        </InputGroup.Addon>
                      </InputGroup>
                    </Col>
                  </Col>
                </div>
              )
            })}
          </FormGroup>
          <FormGroup>
            <Col sm={2} />
            <Col sm={10}>
              <Button
                bsStyle="info"
                bsSize="small"
                value="Add more photos"
                onClick={this.AddPhotoField.bind(this)}
              >
                Pridėti dar vieną
              </Button>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Aukštas
            </Col>
            <Col sm={2}>
              <FormControl
                type="Number"
                name="floor"
                value={floor || ''}
                onChange={this.onChange.bind(this)}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Kambarių skaičius:
            </Col>
            <Col sm={2}>
              <FormControl
                type="Number"
                name="numberOfRooms"
                value={numberOfRooms || ''}
                onChange={this.onChange.bind(this)}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Bendras gyventojų kiekis
            </Col>
            <Col sm={2}>
              <FormControl
                type="Number"
                name="peopleInRoom"
                value={peopleInRoom || ''}
                onChange={this.onChange.bind(this)}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Buto plotas (kv. m.)
            </Col>
            <Col sm={2}>
              <FormControl
                type="Number"
                name="sizeOfRoom"
                value={sizeOfRoom || ''}
                onChange={this.onChange.bind(this)}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Šildymo mokesčiai šalčiausiu laikotarpiu
            </Col>
            <Col sm={2}>
              <FormControl
                type="Number"
                name="heatingCost"
                value={heatingCost || ''}
                onChange={this.onChange.bind(this)}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Privalumai:
            </Col>
            <Col sm={10}>
              <Checkbox
                defaultChecked={hasBalcony}
                name="hasBalcony"
                onClick={this.onCheck.bind(this)}
              >
                Balkonas
              </Checkbox>
            </Col>
            <Col componentClass={ControlLabel} sm={2} />
            <Col sm={10}>
              <Checkbox
                defaultChecked={petsAllowed}
                name="petsAllowed"
                onClick={this.onCheck.bind(this)}
              >
                Leidžiama laikyti šunį
              </Checkbox>
            </Col>
            <Col componentClass={ControlLabel} sm={2} />
            <Col sm={10}>
              <Checkbox
                defaultChecked={carPlace}
                name="carPlace"
                onClick={this.onCheck.bind(this)}
              >
                Yra vieta automobiliui
              </Checkbox>
            </Col>
            <Col componentClass={ControlLabel} sm={2} />
            <Col sm={10}>
              <Checkbox
                defaultChecked={airConditioner}
                name="airConditioner"
                onClick={this.onCheck.bind(this)}
              >
                Yra oro kondicionierius
              </Checkbox>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Aprašymas
            </Col>
            <Col sm={10}>
              <textarea
                name="description"
                onChange={this.onChange.bind(this)}
                value={description || ''}
                placeholder="Išsamus pasiūlymo aprašymas..."
                rows="6"
                cols="70"
                required
              />
            </Col>
          </FormGroup>

          <div className="form-group">
            <Col componentClass={ControlLabel} sm={2}>
                Gyventojai
            </Col>
            <Col sm={10}>
              <Select
                name="form-field-name"
                value={this.state.gyventojuMasyvas}
                onChange={(gyventojuMasyvas) => {
                  this.setState({...this.state, gyventojuMasyvas, offer: {...this.state.offer, livingPersons: gyventojuMasyvas.map(g => {return {id: g.value, firstName: g.label.substr(0, g.label.indexOf(' ')), lastName: g.label.substr(g.label.indexOf(' ')+1)}})}
                  })}}
                multi={true}
                options={this.props.users.loading ? [] : this.props.users.items.map(user => {
                  return {
                    value: user.id,
                    label: user.firstName + " " + user.lastName,
                  }
                })}x
              />
            </Col>
          </div>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Kaina
            </Col>
            <Col sm={2}>
              <FormControl
                type="Number"
                name="price"
                value={price || ''}
                onChange={this.onChange.bind(this)}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={2} />
            <Col sm={2}>
              <Button
                bsStyle="primary"
                bsSize="large"
                onClick={this.handleSubmit}
                value="Submit"
              >
                Išsaugoti pakeitimus
              </Button>
            </Col>
          </FormGroup>
        </Form>

      </div>
    );
  }
}
const mapStateToProps = state => ({
  login: state.login,
  offer: state.offer,
  users: state.users
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchOffer,
      fetchUsers
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Editoffer);
