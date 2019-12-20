import React from 'react';
import { fetchOffers } from '../../modules/offers';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Thumbnail } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Checkbox } from 'react-bootstrap';

class Offers extends React.Component {
  constructor() {
    super();
    this.state = {
      offers: [],
      filter: {
        city: '',
        street: '',
        priceStart: '',
        priceEnd: '',
      },
      loaded: false,
      showAll: false
    };
  }

  componentWillMount() {
    this.props.fetchOffers();
  }

  filterItems() {
    let f = this.state.filter;
    this.setState({
      offers: this.props.offers.items.filter(
        offer =>
          offer.city === f.city &&
          (offer.streetAdress.toLowerCase().indexOf(f.street) >= 0 ||
            f.street.length === 0) &&
          (f.priceStart === '' || offer.price >= f.priceStart) &&
          (f.priceEnd === '' || offer.price <= f.priceEnd)
      ),
    });
  }

  handleFilterChange = (name, option) => {
    this.setState(
      {
        filter: {
          ...this.state.filter,
          [name]: option,
        },
      },
      this.filterItems
    );
  };
  handleCityFilter(value) {
    this.handleFilterChange('city', value.target.value);
  }

  componentDidUpdate() {
    if (this.state.loaded === false && this.props.offers.loading === false) {
      this.setState({
        offers: this.props.offers.items,
        loaded: true,
      });
    }
  }

  render() {
    return (
      <div className="container">
        <Row className="filter">
          <FormGroup>
            <Col sm={2}>
              <Row componentClass={ControlLabel}>Miestas:</Row>
              <Row>
                <FormControl
                  componentClass="select"
                  onChange={this.handleCityFilter.bind(this)}
                >
                  <option name="Vilnius">Vilnius</option>
                  <option name="Kaunas">Kaunas</option>
                  <option name="Klaipėda">Klaipėda</option>
                  <option name="Šiauliai">Šiauliai</option>
                </FormControl>
              </Row>
            </Col>
            <Col sm={1} />
            <Col sm={3}>
              <Row componentClass={ControlLabel} sm={1}>
                Gatvė:
              </Row>
              <Row>
                <FormControl
                  type="text"
                  placeholder="pvz. Švitrigailos"
                  onChange={e =>
                    this.handleFilterChange(
                      'street',
                      e.target.value.toLowerCase()
                    )
                  }
                />
              </Row>
            </Col>
            <Col sm={1} />
            <Col sm={4}>
              <Row componentClass={ControlLabel}>Kainos intervalas:</Row>
              <Row>
                <Col sm={5}>
                  <FormControl
                    type="Number"
                    name="Price"
                    placeholder="nuo"
                    onChange={e =>
                      this.handleFilterChange('priceStart', e.target.value)
                    }
                  />
                </Col>
                <Col sm={5}>
                  <FormControl
                    type="Number"
                    name="Price"
                    placeholder="iki"
                    onChange={e =>
                      this.handleFilterChange('priceEnd', e.target.value)
                    }
                  />
                </Col>
              </Row>
            </Col>
            <Col sm={1}>
              <Row componentClass={ControlLabel}>Rodyti be laisvos vietos</Row>
              <Row>
                <Checkbox onClick={() => this.setState({...this.state, showAll: !this.state.showAll})} checked={this.state.showAll}/>
              </Row>
            </Col>
          </FormGroup>
        </Row>
        <Row>
          <div>
            <Button
              className="offers-mapButton-space"
              bsStyle="primary"
              bsSize="small"
              onClick={() => this.props.history.push('/map')}
            >
              Rodyti žemėlapyje
            </Button>
            <Button
              bsStyle="primary"
              className="myOffer-newOffer"
              onClick={() => this.props.history.push('/add-offer')}
            >
              <div className="strip2-tick" />Kurti naują pasiūlymą
            </Button>
          </div>
          <div className="offers-center">
            {this.state.offers.map(offer => {
              return (offer.livingPersons.length !== offer.peopleInRoom || this.state.showAll ? 
                  <div key={offer.id} className="just-box">
                    <div className="cost-strip">
                      <div className="strip-tick" />
                      {offer.price}€
                    </div>
                    <Thumbnail
                      onClick={() => this.props.history.push('/offer/' + offer.id)}
                    >
                      <Image
                        src={offer.photo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqNjQhdZWhGCO_JRXdmrhYHRlC2FW3oZ8QLncQx5lw1PX_6zOVPA"}
                        alt="room"
                        rounded
                        responsive
                      />
                      <div>
                        <h2>{offer.city}</h2>
                        <p>{offer.streetAdress}</p>
                      </div>
                    </Thumbnail>
                  </div> : null
                )
              }
            )}
          </div>
        </Row>
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
      fetchOffers,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Offers);
