import React from 'react';
import infobox from '../maps/infobox'
import moment from 'moment'

var google = window.google;
var refreshIntervalId;
var InfoBox


class GMap extends React.Component {
  constructor(props){
    super(props);
    this.state = { zoom: 12, googleLoaded: window.google };
    this.markers = [];
    this.infoBoxes = []
  }


	render() {
    var mapStyle={height: 400}
    return <div className="GMap">
      <div className='UpdatedText'>
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
    InfoBox = infobox(google)
    this.map = this.createMap()
    this.markers = this.props.submissions
                        .filter(submission => submission.submissionType === 'Hazard' && submission.lat && submission.lng)
                        .map(submission => {
                          var marker = this.createMarker(submission.lat, submission.lng)
                          this.infoBoxes.push(this.createInfoBox(submission, marker))
                          //this.infoWindows.push(this.createInfoWindow(submission, marker))
                          return marker
                        })
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
    return new google.maps.Map(this.refs.mapCanvas, mapOptions)
  }

  mapCenter() {
    return new google.maps.LatLng(
      this.props.initialCenter.lat,
      this.props.initialCenter.lng
    )
  }

  createMarker(lat,lng) {
    return new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: this.map
    })
	}

  createInfoBox(submission, marker) {
    const {date, location, topicTitle, description} = submission 
    let boxText = `<div class='InfoBox'>
                        <span class='infoboxdate'>${moment(date).format()}</span>
                        Location: ${location}<br/> 
                       <h3>${topicTitle}</h3>
                        ${description}
                    </div>`
    var box =  new InfoBox({
      map: this.map,
      anchor: marker,
      content: boxText,
      disableAutoPan: false,
      maxWidth: 10,
      pixelOffset: new google.maps.Size(-140, 0),
      zIndex: null,
      boxStyle: { 
        background: "url('tipbox.gif') no-repeat",
        opacity: 0.75,
        width: "280px"
     },
      closeBoxMargin: "10px 2px 2px 2px",
      closeBoxURL: "https://www.google.com/intl/en_us/mapfiles/close.gif",
      infoBoxClearance: new google.maps.Size(1, 1),
      isHidden: false,
      pane: "floatPane",
      enableEventPropagation: false
    })

      google.maps.event.addListener(marker, 'click', function (e) {
        box.open(this.map, this);
      })
      return box;
  }
  
  handleZoomChange() {
    this.setState({
      zoom: this.map.getZoom()
    })
  }
}


export default GMap

