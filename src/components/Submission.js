import React, {Component} from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import { Link } from 'react-router';
var config = require('../../config');       //let's us use our config file, which connects us to mongo user database
import moment from 'moment'


class Submission extends Component {
	
	constructor(props){
		super(props)
		this.state = {

			date: moment().format('YYYY-MM-DD'),
			username:"",
			location: "",
			topicTitle: "",
			submissionType: "",
			description: ""
		};
		this.onChange = (location) => {
			this.setState({ location })
			geocodeByAddress(location,  (err, { lat, lng }) => {
  				if (err) { console.log('Oh no!', err) }
				this.setState({lat, lng})
			})
		}
	}

	locationChanged(event) {
    	this.setState( { location: event.target.value }  )
    	console.log('geocoding')

  	}
    

	dateChanged(event) {
		this.setState( { date: event.target.value} )
	}

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
        fd.append('submissionType', this.state.submissionType);
        fd.append('description', this.state.description);
        fd.append('token',document.cookie)
        fd.append('lat', this.state.lat)
        fd.append('lng', this.state.lng)
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


  		

		return (
		  <div>	
			<div className="logoutContainer">
				<h1>Submit a Post</h1>
				<p1>If you'd like to submit a post, please login!</p1><br/>
				<Link to='/login'><button className="initLoginButton">Login!</button></Link>
			</div>
			<div className="submitContainer"> 
				<h1>Submit a Post</h1>
				
			    <form ref="uploadForm" className="uploader" encType="multipart/form-data" >
					<div>
						<label htmlFor='date'>Date:</label><input name='date' id="date" value={this.state.date} type="date" onChange={this.dateChanged.bind(this)} placeholder="What date did this happen?" />
					</div>
					<div>
						<label htmlFor='location'>Location: </label><PlacesAutocomplete id="location" name='location' value={this.state.location} onChange={this.onChange.bind(this)} placeholder="Location of event" />
				    </div>
				    <div>
				    	<label htmlFor="topic">Topic:</label><input name='topic' id="topicTitle" value={this.state.topicTitle} onChange={this.topicTitleChanged.bind(this)} placeholder="Name to your Post" />
				    </div>
			 	     <div>
			 			<label htmlFor='type'>Submission Type:  </label>
		 			    <select name='type' id="selectValue" onChange={(e)=>this.setState({'submissionType': e.target.value })}>
							<option value="pleaseSelect">Type of Submission Event</option>
							<option value="Hazard">Hazard</option>
							<option value="Lost Dog">Lost Dog</option>
							<option value="Found Dog">Found Dog</option>
							<option value="Current Condition">Current Condition</option>
							<option value="Community Event">Community Event</option>
							<option value="Other">Other</option>
						</select> 
					</div>
					<div>                 
						<label htmlFor='description'>Description</label><textarea name='description' className="form-control" value={this.state.description} onChange={this.descriptionChanged.bind(this)}  placeholder="Description of event post" /><br/>
					</div>
					<div>
						<input type='text' onChange={e => this.setState({title: e.target.value})} value={this.state.title} />
		            </div>
		            <div>
		            	<input ref="file" type="file" name="file" className="upload-file"/>
					</div>
					<div>
						<button className="submissionButton" value="Beam it brah"
						onClick={this.uploadFile.bind(this)}>Beam it brah!</button>
		             </div>    
	               </form>          
				</div>
			</div>
			);
	}
}


export default Submission;