import React from 'react';
import ReactDOM from 'react-dom';

var google = window.google;
var refreshIntervalId;
var initialCenter = { lng: 113.9966, lat: 46.8787 };

class GMap extends React.Component {
  constructor(props){
    super(props);
    this.state = { zoom: 10, googleLoaded: window.google };
  }
  static propTypes() {
  	initialCenter: React.PropTypes.objectOf(React.PropTypes.number).isRequired
  }

	render() {
    // if(!this.state.googleLoaded){
    //   return <div>Loading...</div>
    // }
    var mapStyle={height: 400}
    return <div className="GMap">
      <div className='UpdatedText'>
        <p>Current Zoom: { this.state.zoom }</p>
      </div>
      <div style={mapStyle} className='GMap-canvas' ref="mapCanvas">
      </div>
    </div>
  }

  componentDidMount() {
    // create the map, marker and infoWindow after the component has
    // been rendered because we need to manipulate the DOM for Google =(

    refreshIntervalId = setInterval(()=>{
      if(window.google){
        google = window.google
        this.setState({googleLoaded: true})
        clearInterval(refreshIntervalId);
        this.startGoogle()
      }
    }, 1000);


    // have to define google maps event listeners here too
    // because we can't add listeners on the map until its created
  }

  startGoogle(){
    console.log('The google', google)
    this.map = this.createMap()
    this.marker = this.createMarker()
    this.infoWindow = this.createInfoWindow()
    google.maps.event.addListener(this.map, 'zoom_changed', ()=> this.handleZoomChange())
  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {
    google.maps.event.clearListeners(this.map, 'zoom_changed')
  }

  createMap() {
    let mapOptions = {
      zoom: this.state.zoom,
      center: this.mapCenter()
    }
    console.log(mapOptions)
    return new google.maps.Map(this.refs.mapCanvas, mapOptions)
  }

  mapCenter() {
    return new google.maps.LatLng(
      this.props.initialCenter.lat,
      this.props.initialCenter.lng
    )
  }

  createMarker() {
    return new google.maps.Marker({
      position: this.mapCenter(),
      map: this.map
    })
	}

  createInfoWindow() {
    let contentString = "<div class='InfoWindow'>I'm a Window that contains Info Yay</div>"
    return new google.maps.InfoWindow({
      map: this.map,
      anchor: this.marker,
      content: contentString
    })
  }
  
  handleZoomChange() {
    this.setState({
      zoom: this.map.getZoom()
    })
  }
}

var initialCenter = { lng: 113.9966, lat: 46.8787 }

export default GMap
