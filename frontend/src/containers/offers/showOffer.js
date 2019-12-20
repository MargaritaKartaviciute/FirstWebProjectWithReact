import React from "react";
import axios from "axios";
import { fetchOffer } from "../../modules/offer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Grid } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import { Glyphicon } from "react-bootstrap";
import { Button } from "react-bootstrap";
import MapContainer from "../maps/mapContainer";
import { ButtonToolbar } from "react-bootstrap";
import ReactLoading from 'react-loading';
import IPCONFIG from '../../IPCONFIG';


class ShowOffer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      message:"Sveiki, \nMane sudomino jūsų pasiūlymas, gal galėtumėte suteikti man daugiau informacijos šiais klausimais: \n1)...\n2)...\n3)...\n\n Su manimi galite susisiekti:\nEl. paštu:\nTelefonu:"
    };
  }

  componentWillMount() {
    this.props.fetchOffer(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchOffer(nextProps.match.params.id);
    }
  }
  checkIfOwnerForEditing(allLivingPeople) {
    if (
      this.props.offer.offer.owner ===
      JSON.parse(localStorage.getItem("user")).id
    )
      return <h1>Reikia įgyvendinti čia metoduką</h1>;
    else
      return (
        <ButtonToolbar className="livingPeople-buttonBar">
          {allLivingPeople.map((person, id) => (
            <Button
              key={id}
              onClick={() => this.props.history.push("/profile/" + person.id)}
              bsStyle="primary"
              className="livingPeople-centerButton"
            >
              {person.firstName} {person.lastName}
            </Button>
          ))}
        </ButtonToolbar>
      );
  }
  handleAdd = event => {
    let user = JSON.parse(localStorage.getItem('user'));
    axios
      .post(
        IPCONFIG + 'api/Offers/mail',
        {
          OfferId: this.props.offer.offer.id,
          UserId: user.id,
          Message: this.state.message,
        },
        { headers: { Authorization: 'Bearer ' + user.token } }
      )
      .then(result => {
        this.setState({
          ...this.state,
          message:""
        });
        this.togglePopup();
      })
  };
  changeMessage = event => {
    this.setState({
      ...this.state,
      message: event.target.value,
    });
  };
  showPopup() {
    const message = this.state.message;
    return this.state.showPopup ? (
      <div className="popup">
        <div className="popup_inner_for_mail">
          <h1>Susisiekti su savininku</h1>
          <textarea
            type="text"
            className="mail"
            name="message"
            value={message}
            rows="10" cols="78"
            onChange={this.changeMessage.bind(this)}
          />
          <br />
          <Button onClick={this.handleAdd}>Siųsti</Button>
          <Button onClick={this.togglePopup.bind(this)}>Uždaryti</Button>
        </div>
      </div>
    ) : (
      ''
    );
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
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
    let allPhotos = this.props.offer.offer.photos;
    return (
      <div className="form-group">
        <Grid>
          <Row>
            <Col xs={12}>
              <div className="cost-strip">
                <div className="strip-tick" />
                {this.props.offer.offer.price}€
              </div>
              <Carousel>
                {allPhotos.map((photo, id) => (
                  <Carousel.Item key={id}>
                    <div className="thumbnail_img">
                      <img width={1150} height={500} alt="900x500" src={photo || "https://www.freeiconspng.com/uploads/no-image-icon-13.png"} />
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
            <Col xs={12}>
              <div className="box">
                <div className="offerView-Profile">
                  <Row>
                    <Col xs={6} mdOffset={1} md={5}>
                      <div className="box-header">
                        <h3 className="box-title">Pagrindinė informacija</h3>
                      </div>
                      <div className="map-offer">
                        <MapContainer offer={this.props.offer.offer} />
                      </div>
                    </Col>
                    <Col xs={6} md={4}>
                      <div className="box-body ">
                        <table className="table">
                          <tbody>
                            <tr>
                              <td>Miestas</td>
                              <td>
                                <span>{this.props.offer.offer.city}</span>
                              </td>
                            </tr>
                            <tr>
                              <td>Adresas</td>
                              <td>
                                <span>
                                  {this.props.offer.offer.streetAdress}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>Namo aukštas</td>
                              <td>
                                <span className="badge bg-light-blue">
                                  {this.props.offer.offer.floor}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>Kambarių sk.</td>
                              <td>
                                <span className="badge bg-light-blue">
                                  {this.props.offer.offer.numberOfRooms}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>Gyventojų sk.</td>
                              <td>
                                <span className="badge bg-light-blue">
                                  {this.props.offer.offer.peopleInRoom}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>Mokesčiai už šildymą (žiemą)</td>
                              <td>
                                <span className="badge bg-light-blue">
                                  {this.props.offer.offer.heatingCost}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>Kambario plotas</td>
                              <td>
                                <span className="badge bg-light-blue">
                                  {this.props.offer.offer.sizeOfRoom}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>Nuomos kainą (už mėn.)</td>
                              <td>
                                <span className="badge bg-red">
                                  {this.props.offer.offer.price}€
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={6} mdOffset={1} md={5}>
                      <div className="box-header">
                        <h3 className="box-title">Papildoma informacija</h3>
                      </div>
                    </Col>
                    <Col xs={6} md={4}>
                      <div className="box-body ">
                        <table className="table">
                          <tbody>
                            <tr>
                              <td>Parkingas automobiliui</td>
                              <td>
                                {this.props.offer.offer.carPlace ? (
                                  <span className="badge bg-green">Taip</span>
                                ) : (
                                  <span className="badge bg-red">Ne</span>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>Kondicionierius</td>
                              <td>
                                {this.props.offer.offer.airConditioner ? (
                                  <span className="badge bg-green">Taip</span>
                                ) : (
                                  <span className="badge bg-red">Ne</span>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>Ar galimi augintiniai</td>
                              <td>
                                {this.props.offer.offer.petsAllowed ? (
                                  <span className="badge bg-green">Taip</span>
                                ) : (
                                  <span className="badge bg-red">Ne</span>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>Balkonas</td>
                              <td>
                                {this.props.offer.offer.hasBalcony ? (
                                  <span className="badge bg-green">Taip</span>
                                ) : (
                                  <span className="badge bg-red">Ne</span>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      {/* /.box-body */}
                    </Col>
                  </Row>
                  <br />
                  <br />
                  <Row>
                    <Col xs={6} mdOffset={1} md={5}>
                      <div className="box-header">
                        <h3 className="box-title">Gyventojai</h3>
                      </div>
                    </Col>
                    <Col xs={6} md={4}>
                      <div className="box-body ">
                        <table className="table">
                          <tbody>
                            {this.props.offer.offer.livingPersons.map(
                              person => (
                                <tr key={person.id}>
                                  <td>Gyventojas</td>
                                  <td>
                                    <span
                                      onClick={() =>
                                        this.props.history.push(
                                          "/profile/" + person.id
                                        )
                                      }
                                      className="badge bg-yellow"
                                    >
                                      {person.firstName +
                                        " " +
                                        person.lastName}
                                    </span>
                                  </td>
                                </tr>
                              )
                            )}
                            {[...Array(this.props.offer.offer.peopleInRoom - this.props.offer.offer.livingPersons.length)].map(e => (       
                                <tr><td>Gyventojas</td><td><span className="badge bg-green">
                                  Laisva vieta
                                  </span></td></tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Col>
                  </Row>
                <br />
                <br />{this.showPopup()}
                <Row>
                    <Col xs={12} mdOffset={1} md={10}>
                      <div className="box-header">
                        <h3 className="box-title">Aprašymas</h3>
                      </div>
                        <p>{this.props.offer.offer.description}</p>
                    </Col>
                </Row>
                    <Row>
                        <Col xs={6} mdOffset={1} md={5}>
                            <div className="box-header">
                                <h3 className="box-title">Domina?</h3>
                            </div>
                            <Button className="offerView-button"
                            onClick={this.togglePopup.bind(this)}>
                            Susisiekite
                            <Glyphicon
                                className="offerView-glyph"
                                glyph="glyphicon glyphicon-envelope"
                            />
                            </Button>
                        </Col>
                    </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  offer: state.offer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchOffer
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShowOffer);
