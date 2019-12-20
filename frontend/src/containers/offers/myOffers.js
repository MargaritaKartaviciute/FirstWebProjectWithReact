import React from 'react';
import { fetchUserOffers } from '../../modules/userOffers';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import ReactLoading from 'react-loading';
import IPCONFIG from '../../IPCONFIG';


class UserOffers extends React.Component {
  constructor() {
    super();
    this.state = {
      offers: [],
      loaded: false,
      error: null
    };
  }
  componentWillMount() {
    this.props.fetchUserOffers(this.props.match.params.id);
  }

  componentDidUpdate() {
    if (this.state.loaded === false && this.props.offers.loading === false) {
      this.setState({
        offers: this.props.offers.items,
        loaded: true,
      });
    }
  }
  deleteOffer = id=> {
    let user = JSON.parse(localStorage.getItem('user'));
    axios
      .delete(IPCONFIG + 'api/Offers', {
        params: {
          Id: id,
        },
        headers: { Authorization: 'Bearer ' + user.token },
      })
      .then(response => {
        var index = this.getIndex(id);
        this.setState({
          ...this.state,
          error: null,
          offers: [
            ...this.state.offers.slice(0, index),
            ...this.state.offers.slice(index + 1),
          ],
        })
      })
      .catch(error => {
        this.setState({
          ...this.state,
          error: error.response.data
        })
      });
  }
  getIndex = id => {
    for (var i = 0; i < this.state.offers.length; i++) {
      if (this.state.offers[i].id === id) {
        return i;
      }
    }
    return -1;
  };
  render() {
    if (this.props.offers.loading === true) {
      return (
        <ReactLoading
          type={'bars'}
          color={'#ff4444'}
          height="200px"
          widgth="200px"
        />
      );
    }
    let allUserOffers = this.state.offers;
    return (
      <div>
        {this.state.error !== null && <div className="callout callout-danger">
          <h4>Ivyko klaida</h4>
          <p>{this.state.error}</p>
        </div>
        }
        {this.props.offers.items.length === 0 ? (
          <div className="offerView-Profile">
            <h1 className="myOffer-h2">
              TU DAR NETURI PASIŪLYMO? Pats laikas susikurti!
            </h1>
            <Button
              bsStyle="primary"
              className="myOffer-newOffer2"
              onClick={() => this.props.history.push('/add-offer')}
            >
              Kurti naują pasiūlymą
            </Button>
          </div>
        ) : (
            <div>
              <Button
                bsStyle="primary"
                className="myOffer-newOffer"
                onClick={() => this.props.history.push('/add-offer')}
              >
                <div className="strip2-tick" />Kurti naują pasiūlymą
            </Button>
              {allUserOffers.map((offer, id) => (
                <div key={id} className="myOffer">
                  <Grid className="offerView-Profile">
                    <Row>
                      <Col xs={6} md={4} className="myOffer">
                        <div className="cost-strip">
                          <div className="strip-tick" />
                          {offer.price}€
                      </div>
                        <Image
                          onClick={() =>
                            this.props.history.push('/offer/' + offer.id)
                          }
                          src={offer.photo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqNjQhdZWhGCO_JRXdmrhYHRlC2FW3oZ8QLncQx5lw1PX_6zOVPA"}
                          thumbnail
                          responsive
                        />
                        <Button
                          className="myOffer-button"
                          bsStyle="primary"
                          onClick={() =>
                            this.props.history.push('/offer-edit/' + offer.id)
                          }
                        >
                          Redaguoti pasiūlymą
                      </Button>
                        <Button
                          className="myOffer-button"
                          bsStyle="danger"
                          onClick={() => {
                            this.deleteOffer(offer.id);
                          }}
                        >
                          Pašalinti pasiūlymą
                      </Button>
                      </Col>
                      <Col xs={12} md={8}>
                        <p className="myOffer" id="offerView-font">
                          Aprašymas:
                      </p>
                        <p>{offer.description}</p>
                        <Row>
                          <Col xs={6} md={8}>
                            <h3 className="myOffer-h">
                              Papildoma informacija apie būstą
                          </h3>
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>Namo aukštas</td>
                                  <td>
                                    <span className="badge bg-light-blue">
                                      {offer.floor}
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Kambarių sk.</td>
                                  <td>
                                    <span className="badge bg-light-blue">
                                      {offer.numberOfRooms}
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Gyventojų sk.</td>
                                  <td>
                                    <span className="badge bg-light-blue">
                                      {offer.peopleInRoom}
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Mokesčiai už šildymą (žiemą)</td>
                                  <td>
                                    <span className="badge bg-light-blue">
                                      {offer.heatingCost}€
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Kambario plotas</td>
                                  <td>
                                    <span className="badge bg-light-blue">
                                      {offer.sizeOfRoom}
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </Col>
                          <Col xs={6} md={4}>
                            <h3 className="myOffer-h">Ypatybės</h3>
                            <div className="box-body ">
                              <table className="table">
                                <tbody>
                                  <tr>
                                    <td>Turi balkoną</td>
                                    <td>
                                      {offer.hasBalcony === true ? (
                                        <span className="badge bg-green">Taip</span>
                                      ) : (
                                          <span className="badge bg-red">Ne</span>
                                        )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Kondicionierius</td>
                                    <td>
                                      {offer.airConditioner === true ? (
                                        <span className="badge bg-green">Taip</span>
                                      ) : (
                                          <span className="badge bg-red">Ne</span>
                                        )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Ar galimi augintiniai</td>
                                    <td>
                                      {offer.petsAllowed === true ? (
                                        <span className="badge bg-green">Taip</span>
                                      ) : (
                                          <span className="badge bg-red">Ne</span>
                                        )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Parkingas automobiliui</td>
                                    <td>
                                      {offer.carPlace === true ? (
                                        <span className="badge bg-green">Taip</span>
                                      ) : (
                                          <span className="badge bg-red">Ne</span>
                                        )}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Grid>
                </div>
              ))}
            </div>
          )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  offers: state.offers,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUserOffers,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(UserOffers);
