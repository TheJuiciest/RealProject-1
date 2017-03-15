import React, {Component} from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
var config = require('../../config');       //let's us use our config file, which connects us to mongo user database



class Submission extends Component {
	
	constructor(props){
		super(props)
		this.state = {

			date: new Date('2012-04-15'),
			username:"",
			location: "",
			topicTitle: "",
			submissionType: "",
			description: ""
		};
			this.onChange = (location) => this.setState({ location })
	}

	locationChanged(event) {
    	this.setState( { location: event.target.value }  )

    	geocodeByAddress(location,  (err, { lat, lng }) => {
      		if (err) { console.log('Oh no!', err) }

      		console.log(`Yay! got latitude and longitude for ${location}`, { lat, lng })
    })
  }
    

	dateChanged(event) {
		this.setState( { date: event.target.value} )
	}
	
	/*locationChanged(event) {
		this.setState( { location: event.target.value})
	} */

	topicTitleChanged(event) {
		this.setState( { topicTitle: event.target.value} )
	}

	descriptionChanged(event) {
		this.setState({ description: event.target.value})
	}

	uploadFile(e) {
		var self = this;
        var fd = new FormData();    
        console.log('dogPhoto', ReactDom.findDOMNode(this.refs.file).files[0])
        fd.append('dogPhoto', ReactDom.findDOMNode(this.refs.file).files[0]);
        fd.append('topicTitle', this.state.topicTitle);
        fd.append('date', this.state.date);
        fd.append('location', this.state.location);
        fd.append('submission', this.state.submission);
        fd.append('description', this.state.description);
        fd.append('token',document.cookie)
        $.ajax({
            url: config.apiServer +'/api/submission',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data){
                console.log(data);
            } 
        })
	    	.done(function(result){
			self.props.reloadSubmissions()
			console.log(result)
		})
        e.preventDefault()
    }	
	render() {

		$(".initLoginButton").on('click', function(event){
  			event.preventDefault();
  			window.location.replace("/login");
  		})

  		

		return (
		<div>	
				<div className="logoutContainer">
					<h1>Submit a Post</h1>
					<p1>If you'd like to submit a post, please login!</p1><br/>
					<button className="initLoginButton" value="login" href="/">Login!</button>
				</div>
				<div className="submitContainer"> 
					<h1>Submit a Post</h1>
				Date:<input id="date" value={this.state.date} type="date" onChange={this.dateChanged.bind(this)} placeholder="What date did this happen?" /><br/>
			Location:<input onSubmit={this.locationChanged} type="hidden" /> 
					 <PlacesAutocomplete id="location" value={this.state.location} onChange={this.onChange.bind(this)} placeholder="Location of event" /><br/>
			   Topic:<input id="topicTitle" value={this.state.topicTitle} onChange={this.topicTitleChanged.bind(this)} placeholder="Name to your Post" /><br/>
	 Submission Type:<select id="selectValue" onChange={(e)=>this.setState({'submissionType': e.target.value })}>
						<option value="pleaseSelect">Type of Submission Event</option>
						<option value="Hazard">Hazard</option>
						<option value="Lost Dog">Lost Dog</option>
						<option value="Found Dog">Found Dog</option>
						<option value="Current Condition">Current Condition</option>
						<option value="Community Event">Community Event</option>
						<option value="Other">Other</option>
					</select><br/>                       
					Description<br/><textarea className="form-control" value={this.state.description} onChange={this.descriptionChanged.bind(this)}  placeholder="Description of event post" /><br/>
					<button className="submissionButton" value="Beam it brah"
						onClick={this.uploadFile.bind(this)}>Beam it brah!</button>
					<form ref="uploadForm" className="uploader" encType="multipart/form-data" >
		                  <input type='text' onChange={e => this.setState({title: e.target.value})} value={this.state.title} />
		                   <input ref="file" type="file" name="file" className="upload-file"/>
		                   <input type="button" ref="button" value="Upload" onClick={this.uploadFile} />
	               </form>          
				</div>
			</div>
			);
	}
}


export default Submission;