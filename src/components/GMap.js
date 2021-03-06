import React from 'react';
import infobox from '../maps/infobox'
import moment from 'moment'
var config = require('../../config');    

var google = window.google;
var refreshIntervalId;
var InfoBox


class GMap extends React.Component {
  constructor(props){
    super(props);
    this.state = { zoom: 13, googleLoaded: window.google };
    this.markers = [];
    this.infoBoxes = []
  }


	render() {
    var mapStyle={height: 400, border:'solid 6px black', 'margin-bottom': '50px', position: 'relative', top: '25px'}
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
                       .filter(submission => (  ['Hazard', 'Lost Dog', 'Found Dog'].indexOf(submission.submissionType) !==  -1 )&& submission.lat && submission.lng)
                       .map(submission => {
                          var marker = this.createMarker(submission.submissionType, submission.lat, submission.lng)
                          this.infoBoxes.push(this.createInfoBox(submission, marker))
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

  createMarker(submissionType, lat,lng) {

    var imgCaution = config.apiServer + '/caution.png';
    var imgLost = config.apiServer + '/lostDog.png';
    var imgFound = config.apiServer + '/foundDog.png';
    console.log('Creating marker', lat, lng)

    /*var oms = new OverlappingMarkerSpiderfier(this.map,
        {markersWontMove: true, markersWontHide: true});

    var usualColor = 'eebb22';
    var spiderfiedColor = 'ffee22';
    var iconWithColor = function(color) {
        return 'https://chart.googleapis.com/chart?chst=d_map_xpin_letter&chld=pin|+|' +
          color + '|000000|ffff00';
    }
    

    var bounds = new gm.LatLngBounds();
    for (var i = 0; i < window.mapData.length; i ++) {
      var datum = window.mapData[i];
      var loc = new google.maps.LatLng(lat, lng);
      bounds.extend(loc);
    } */

    if(submissionType === 'Hazard'){
      console.log(submissionType)
      return new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: this.map,
        icon: imgCaution
      })
    } else if(submissionType === 'Lost Dog'){
      return new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: this.map,
        icon: imgLost
      })
    } else if(submissionType === 'Found Dog'){
      return new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: this.map,
        icon: imgFound
      })
    }
  }

    /*marker.desc = datum.d;
      oms.addMarker(marker);

    map.fitBounds(bounds);

      oms.addListener('click', function(marker) {
        box.setContent(marker.desc);
        box.open(this.map, this.marker);
      });*/

 

  createInfoBox(submission, marker) {
    const {date, submissionType, username, location, topicTitle, description, fd} = submission 
    let boxText = `<div class='InfoBox'>
                        <span class='infoboxdate'>${moment(date).format('MMMM Do YYYY')}</span>
                        <div class='infobox-topdesc'>
                          <span class='infoboxtitle' ><h3>${topicTitle}</h3>
                          ${description}
                        </div>
                        <span class='infoboxlocation'>Location: ${location}</span><br/> 
                        <span class='infoboxuser'>Posted By: ${username}</span>
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
        background: "",
        opacity: 2,
        width: "280px"
     },
      closeBoxMargin: "10px 2px 2px 2px",
      closeBoxURL: "https://www.google.com/intl/en_us/mapfiles/close.gif",
      infoBoxClearance: new google.maps.Size(1, 1),
      isHidden: false,
      pane: "floatPane",
      enableEventPropagation: false
    })

      /*oms.addListener('click', function(marker) {
        box.setContent(marker.desc);
        box.open(this.map, this.marker);
      });

      oms.addListener('spiderfy', function(markers) {
        for(var i = 0; i < markers.length; i ++) {
          markers[i].setIcon(iconWithColor(spiderfiedColor));
          markers[i].setShadow(null);
        } 
        box.close();
      });
      oms.addListener('unspiderfy', function(markers) {
        for(var i = 0; i < markers.length; i ++) {
          markers[i].setIcon(iconWithColor(usualColor));
          markers[i].setShadow(shadow);
        }
      }); */

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

