import React from 'react';
import axios from 'axios';
import FileReaderInput from 'react-file-reader';
import { InputGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import { Checkbox, Image } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { fetchUsers } from '../../modules/users';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IPCONFIG from '../../IPCONFIG';

class AddOffer extends React.Component {
  constructor() {
    super();
    this.state = {
      offer: {
        Owner: 1,
        City: 'Vilnius',
        StreetAdress: '',
        Photos: [''],
        Floor: 0,
        NumberOfRooms: 0,
        PeopleInRoom: 0,
        HasBalcony: false,
        PetsAllowed: false,
        Price: 0,
        Description: '',
        SizeOfRoom: 0,
        HeatingCost: 0,
        CarPlace: false,
        AirConditioner: false,
        LivingPersons:[],
      },
      file: 'file name..',
      error: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    //this.props.fetchUsers();
  }
  AddPhotoField() {
    this.setState({
      offer: {
        ...this.state.offer,
        Photos: this.state.offer.Photos.concat(['']),
      },
    });
  }

  RemovePhotoField = id => () => {
    this.setState({
      offer: {
        ...this.state.offer,
        Photos: this.state.offer.Photos.filter((s, sid) => id !== sid),
      },
    });
  };

  onCheck = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ offer: { ...this.state.offer, [name]: value } });
  };

  handleSubmit = event => {
    let user = JSON.parse(localStorage.getItem('user'));
    let data = Object.assign({}, this.state.offer);
    let listOfIds=[]
   if(data.LivingPersons.length !== 0){
      listOfIds = data.LivingPersons.map(user => user.id);
    }
    axios
      .get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: data.City + ' ' + data.StreetAdress,
          key: 'AIzaSyCuB6H4JuDWu0-U4M6OBXPm8uqjuYhx5Hk',
        },
      })
      .then(result => {
        axios
          .post(
            IPCONFIG + 'api/Offers',
            {
              Owner: user.id,
              City: data.City,
              StreetAdress: data.StreetAdress,
              Photos: data.Photos,
              Floor: data.Floor,
              NumberOfRooms: data.NumberOfRooms,
              PeopleInRoom: data.PeopleInRoom,
              HasBalcony: data.HasBalcony,
              PetsAllowed: data.PetsAllowed,
              Price: data.Price,
              Lat: result.data.results[0].geometry.location.lat.toString(),
              Lng: result.data.results[0].geometry.location.lng.toString(),
              Description: data.Description,
              SizeOfRoom: data.SizeOfRoom,
              HeatingCost: data.HeatingCost,
              CarPlace: data.CarPlace,
              AirConditioner: data.AirConditioner,
              LivingPersons: listOfIds,
            },
            {
              headers: { Authorization: 'Bearer ' + user.token },
            }
          )
          .then(result => {
            this.props.history.push('/user-offers/'+user.id);
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
          .post(
            IPCONFIG + 'api/Offers',
            {
              Owner: user.id,
              City: data.City,
              StreetAdress: data.StreetAdress,
              Photos: data.Photos,
              Floor: data.Floor,
              NumberOfRooms: data.NumberOfRooms,
              PeopleInRoom: data.PeopleInRoom,
              HasBalcony: data.HasBalcony,
              PetsAllowed: data.PetsAllowed,
              Price: data.Price,
              Lat: null,
              Lng: null,
              Description: data.Description,
              SizeOfRoom: data.SizeOfRoom,
              HeatingCost: data.HeatingCost,
              CarPlace: data.CarPlace,
              AirConditioner: data.AirConditioner,
              LivingPersons: listOfIds,
            },
            {
              headers: { Authorization: 'Bearer ' + user.token },
            }
          )
          .then(result => {
            this.props.history.push('/user-offers/'+user.id);
            this.setState({
              ...this.state,
              error: null
            })
          })
      ).catch(error => { 
        this.setState({
          ...this.state,
          error: error.response.data
        })
     });
      
  };


  onChange = event => {
    this.setState({
      offer: {
        ...this.state.offer,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleFile(file, i) {
    this.setState({
      ...this.state,
      offer: {
        ...this.state.offer,
        Photos: [
          ...this.state.offer.Photos.slice(0, i),
          file.base64,
          ...this.state.offer.Photos.slice(i + 1),
        ],
      },
    });
  }

  selectCity(c) {
    this.setState({
      ...this.state,
      offer: {
        ...this.state.offer,
        City: c.target.value,
      },
    });
  }

  render() {
    const {
      StreetAdress,
      Floor,
      NumberOfRooms,
      PeopleInRoom,
      SizeOfRoom,
      Description,
      HeatingCost,
    } = this.state.offer;
    
    return (
      <div className="container">

        <Form horizontal>
        {this.state.error !== null && <div className="callout callout-danger">
            <h4>Ivyko klaida</h4>
            {this.state.error.map(error => (
              <p>{error}</p>
            ))}
            
          </div>
          }
          <h1>Kurti naują pasiūlymą</h1>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Miestas
            </Col>
            <Col sm={5}>
              <FormControl
                componentClass="select"
                onChange={this.selectCity.bind(this)}
              >
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
                name="StreetAdress"
                placeholder="Įveskite gatvės adresą.."
                value={StreetAdress}
                onChange={this.onChange.bind(this)}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Nuotraukos
            </Col>
            {this.state.offer.Photos.map((photo, i) => {
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
                            {this.state.offer.Photos[i] !== '' ? (
                              <Image
                                alt="offer house"
                                src={this.state.offer.Photos[i]}
                                width="150px"
                                height="150px"
                                rounded
                                responsive
                              />
                            ) : (
                              <Button bsStyle="primary" bsSize="xsmall">
                                <Glyphicon glyph="paperclip" />
                              </Button>
                            )}
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
              );
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
                name="Floor"
                value={Floor}
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
                name="NumberOfRooms"
                value={NumberOfRooms}
                onChange={this.onChange.bind(this)}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Gyventojų kiekis
            </Col>
            <Col sm={2}>
              <FormControl
                type="Number"
                name="PeopleInRoom"
                value={PeopleInRoom}
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
                name="SizeOfRoom"
                value={SizeOfRoom}
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
                name="HeatingCost"
                value={HeatingCost}
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
                type="checkbox"
                checked={this.state.HasBalcony}
                name="HasBalcony"
                onChange={this.onCheck.bind(this)}
              >
                Balkonas
              </Checkbox>
            </Col>
            <Col componentClass={ControlLabel} sm={2} />
            <Col sm={10}>
              <Checkbox
                type="checkbox"
                checked={this.state.PetsAllowed}
                name="PetsAllowed"
                onChange={this.onCheck.bind(this)}
              >
                Leidžiama laikyti naminius gyvūnus
              </Checkbox>
            </Col>
            <Col componentClass={ControlLabel} sm={2} />
            <Col sm={10}>
              <Checkbox
                type="checkbox"
                checked={this.state.CarPlace}
                name="CarPlace"
                onChange={this.onCheck.bind(this)}
              >
                Yra vieta automobiliui
              </Checkbox>
            </Col>
            <Col componentClass={ControlLabel} sm={2} />
            <Col sm={10}>
              <Checkbox
                type="checkbox"
                checked={this.state.AirConditioner}
                name="AirConditioner"
                onChange={this.onCheck.bind(this)}
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
                name="Description"
                onChange={this.onChange.bind(this)}
                value={Description}
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
          </div>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Kaina (mėn.)
            </Col>
            <Col sm={2}>
              <FormControl
                type="Number"
                name="Price"
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
                Pateikti
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
export default AddOffer;
