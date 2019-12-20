import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './mapAllOffers';
class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Map google={this.props.google} offers={this.props.offers} />
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: '[MAP_KEY]',
  libraries: ['visualization'],
})(MapContainer);
