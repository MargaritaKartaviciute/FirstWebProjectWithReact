import React from 'react';
import MapContainer from './allOffersMapContainer';
import { fetchOffers } from '../../modules/offers';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class OffersMap extends React.Component {
  constructor() {
    super();
    this.state = {
      offers: [],
      loaded: false,
    };
  }
  componentWillMount() {
    this.props.fetchOffers();
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
      <div>
        <MapContainer offers={this.state.offers} />
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

export default connect(mapStateToProps, mapDispatchToProps)(OffersMap);
