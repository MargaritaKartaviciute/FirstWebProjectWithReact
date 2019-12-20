import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import FileReaderInput from 'react-file-reader';
import { InputGroup } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import { fetchProfile, updateProfilePhoto } from '../../modules/profile';
import ReactLoading from 'react-loading';
import { Image } from 'react-bootstrap';
import IPCONFIG from '../../IPCONFIG';



class EditProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      Profile: {
        avatarPhoto: ''
      },
      loaded: false,
      error: null,
      file: 'file name..',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    this.props.fetchProfile(this.props.login.user.id, this.props.login.user.id);
  }
  componentDidMount() {
    if (this.state.loaded === false && this.props.profile.loading === false) {
      this.setState({
        Profile: this.props.profile.user,
        loaded: true,
      });
    }
  }
  onChange = event => {
    this.setState({
      Profile: {
        ...this.state.Profile,
        [event.target.name]: event.target.value,
      },
    });
  };
  handleFile = event => {
    this.setState({
      Profile: {
        ...this.state.Profile,
        avatarPhoto: event.base64,
      },
    });
  };
  handleSubmit = function (event) {
    event.preventDefault();
    let user = this.props.login.user;
    axios
      .put(IPCONFIG + 'api/User', this.state.Profile, {
        headers: { Authorization: 'Bearer ' + user.token },
      })
      .then(result => {
        this.props.updateProfilePhoto(this.state.Profile.avatarPhoto);
        this.props.history.push('/profile/' + user.id);
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
  };
  selectGender(c) {
    this.setState({
      ...this.state,
      Profile: {
        ...this.state.Profile,
        gender: c.target.value,
      },
    });
  }
  RemovePhotoField() {
    this.setState({
      Profile: {
        ...this.state.Profile,
        avatarPhoto: '',
      },
    });
  };
  render() {
    if (this.props.profile.loading === true) {
      return (
        <ReactLoading
          type={'bars'}
          color={'#ff4444'}
          height="200px"
          widgth="200px"
        />
      );
    }
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      birthDay,
      gender,
      degree,
      work,
      school,
      description
    } = this.state.Profile;
    return (
      <div className="container">
        <Form horizontal className="field" onSubmit={this.handleSubmit}>
          {this.state.error !== null && <div className="callout callout-danger">
            <h4>Ivyko klaida</h4>
            <p>{this.state.error}</p>
          </div>
          }

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Vardas:{' '}
            </Col>
            <Col sm={5}>
              <FormControl
                type="text"
                name="firstName"
                value={firstName || ''}
                onChange={e => this.onChange(e)}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Pavardė:{' '}
            </Col>
            <Col sm={5}>
              <FormControl
                type="text"
                name="lastName"
                value={lastName || ''}
                onChange={this.onChange.bind(this)}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Elektroninis Paštas:{' '}
            </Col>
            <Col sm={5}>
              <FormControl
                type="text"
                name="email"
                value={email || ''}
                onChange={this.onChange.bind(this)}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Profilio nuotrauka:{' '}
            </Col>
            <Col sm={10}>
              <Col sm={5}>
                <InputGroup>
                  <InputGroup.Addon>
                    <Glyphicon glyph="camera" />
                  </InputGroup.Addon>
                  <InputGroup.Addon>
                    <FileReaderInput
                      as="url"
                      base64={true}
                      name={'PhotoIn'}
                      handleFiles={e => this.handleFile(e)}
                    >
                        {this.state.Profile.avatarPhoto !== ("" || null) ? <Image src={this.state.Profile.avatarPhoto} width="150px" height="150px" rounded responsive /> :
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
                      onClick={this.RemovePhotoField.bind(this)}
                    >
                      <Glyphicon glyph="remove" />
                    </Button>
                  </InputGroup.Addon>
                </InputGroup>
              </Col>
            </Col>

          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Telefono numeris:{' '}
            </Col>
            <Col sm={5}>
              <FormControl
                type="text"
                name="phoneNumber"
                value={phoneNumber || ''}
                onChange={this.onChange.bind(this)}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Gimimo data:{' '}
            </Col>
            <Col sm={5}>
              <FormControl
                type="Date"
                name="birthDay"
                value={new Date(birthDay).toLocaleDateString() || ''}
                onChange={this.onChange.bind(this)}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formControlsSelect">
            <Col componentClass={ControlLabel} sm={2}>
              Lytis:{' '}
            </Col>
            <Col sm={5}>
              <FormControl
                componentClass="select"
                onChange={this.selectGender.bind(this)}
              >
                <option defaultValue="selected">{gender}</option>
                <option value="Vyras">Vyras</option>
                <option value="Moteris">Moteris</option>
                <option value="Kita">Kita</option>
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Išsilavinimas:{' '}
            </Col>
            <Col sm={5}>
              <FormControl
                type="text"
                name="degree"
                value={degree || ''}
                onChange={this.onChange.bind(this)}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Darbovietė:{' '}
            </Col>
            <Col sm={5}>
              <FormControl
                type="text"
                name="work"
                value={work || ''}
                onChange={this.onChange.bind(this)}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Mokymosi įstaiga:{' '}
            </Col>
            <Col sm={5}>
              <FormControl
                type="text"
                name="school"
                value={school || ''}
                onChange={this.onChange.bind(this)}
                required
              />
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
                placeholder="Aprašymas..."
                rows="6"
                cols="70"
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
                Atnaujinti
              </Button>
              <br />
              <Button
                bsStyle="danger"
                bsSize="small"
                onClick={() =>
                  this.props.history.push(
                    '/profile/' + this.props.login.user.id
                  )
                }
              >
                Atšaukti
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
  profile: state.profile,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProfile,
      updateProfilePhoto
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
