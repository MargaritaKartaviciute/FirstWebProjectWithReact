import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './map';
class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Map google={this.props.google} offer={this.props.offer} />
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: '[MAP_KEY]',
  libraries: ['visualization'],
})(MapContainer);
