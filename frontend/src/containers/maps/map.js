import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Map extends Component {
  componentDidMount() {
    this.loadMap();
  }
  loadMap() {
    if (this.props && this.props.google) {
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      const mapConfig = Object.assign(
        {},
        {
          center: {
            lat: parseFloat(this.props.offer.lat),
            lng: parseFloat(this.props.offer.lng),
          },
          zoom: 15,
          mapTypeId: 'roadmap',
        }
      );
      this.map = new maps.Map(node, mapConfig);
      const marker = new google.maps.Marker({
        position: {
          lat: parseFloat(this.props.offer.lat),
          lng: parseFloat(this.props.offer.lng),
        },
        map: this.map,
      });
      var infowindow = new google.maps.InfoWindow({
        content: `<h5>${this.props.offer.streetAdress}, ${
          this.props.offer.city
        }</h5>`,
      });
      marker.addListener('click', function() {
        infowindow.open(this.map, marker);
      });
    }
  }

  render() {
    const style = {
      width: '20vw',
      height: '25vh',
    };
    return (
      <div ref="map" style={style}>
        loading map...
      </div>
    );
  }
}
