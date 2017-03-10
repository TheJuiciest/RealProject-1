import React, {Component} from 'react';
import Map from 'google-maps-react';

// ...

<Map google={this.props.google} zoom={14}>

  <Marker onClick={this.onMarkerClick}
          name={'Current location'} />

  <InfoWindow onClose={this.onInfoWindowClose}>
      <div>
        <h1>{this.state.selectedPlace.name}</h1>
      </div>
  </InfoWindow>
</Map>

class GoogleMaps extends Component {

	fetchPlaces(mapProps, map) {
    const {google} = this.props;
    const service = new google.maps.places.PlacesService(map);
    // ...
  },


  mapClicked(mapProps, map, clickEvent) {

  },


  centerMoved(mapProps, map) {

  },





  render: function() {
    return (
      <Map google={this.props.google}
        onReady={this.fetchPlaces}
        visible={false}>
      <Map google={this.props.google}
        onClick={this.mapClicked} />
      <Map google={this.props.google}
        onDragend={this.centerMoved} />
    )
          <Listing places={this.state.places} />
      </Map>
    )
  }
});

}