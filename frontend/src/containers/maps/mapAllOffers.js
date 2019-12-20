import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { geolocated } from 'react-geolocated';

class Map extends Component {
  componentDidUpdate() {
    if ((this.props.google !== null) & (this.props.offers !== null)) {
      this.loadMap();
    }
  }
  loadMap() {
    if (this.props && this.props.google && this.props.coords) {
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      const mapConfig = Object.assign(
        {},
        {
          center: {
            lat: 55.3232,
            lng: 23.8952,
          },
          zoom: 8,
          mapTypeId: 'roadmap',
        }
      );
      this.map = new maps.Map(node, mapConfig);

      this.props.offers.map(offer => {
        const lat = offer.lat;
        const lng = offer.lng;
        if ((lat !== null) & (lng !== null)) {
          const marker = new google.maps.Marker({
            position: {
              lat: parseFloat(lat),
              lng: parseFloat(lng),
            },

            map: this.map,
          });
          var infowindow = new google.maps.InfoWindow({
            content: `<div><h5>${offer.streetAdress}, ${offer.city}</h5>
                    <img src=${
                      offer.photo || "https://www.freeiconspng.com/uploads/no-image-icon-13.png"
                    } style="width:170px;height:150px;"/></div>
                    <a href=${'/offer/' +
                      offer.id} target="_blank">Peržiūrėti pasiūlymą</a>`,
          });
          marker.addListener('click', function() {
            infowindow.open(this.map, marker);
          });
        }
        return this.map;
      });
    }
  }

  render() {
    const style = {
      width: '99vw',
      height: '85vh',
    };
    return (
      <div ref="map" style={style}>
        loading map...
      </div>
    );
  }
}
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Map);
