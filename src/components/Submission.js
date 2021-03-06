import React, {Component} from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import { Link } from 'react-router';
var config = require('../../config');       //let's us use our config file, which connects us to mongo user database
import moment from 'moment';


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
		const myStyles = {
            root: {position: 'relative',
                    left: '-18px',
                    top: '-25px',
                    padding:  '0px',
                    width: '200px'},
            input: {width: '100%'},
            autocompleteContainer: {backgroundColor: 'green'},
            autocompleteItem: {color: 'black'},
            autocompleteActive: {color: 'blue'}
        }


		return (
		  <div>	
			<div className="logoutContainer">
				<form>
					<p1>If you'd like to submit a post or comment, please login!</p1><br/>
					<Link to='/login'><button className="initLoginButton">Login!</button></Link>
				</form>
			</div>
			<div className="mainSubContainer">
				<div className="submitContainer"> 
				    <form ref="uploadForm" className="uploader" encType="multipart/form-data" >
						<div>
							<label htmlFor='date'>Date:</label><input name='date' id="date" value={this.state.date} type="date" onChange={this.dateChanged.bind(this)} placeholder="What date did this happen?" />
						</div>
						<div>
							<label htmlFor='location'>Location: </label><PlacesAutocomplete styles={myStyles} id="location" name='location' value={this.state.location} onChange={this.onChange.bind(this)} placeholder="Location of event" />
					    </div>
					    <div>
					    	<label htmlFor="topic">Topic:</label><input name='topic' id="topicTitle" value={this.state.topicTitle} onChange={this.topicTitleChanged.bind(this)} placeholder="Name to your Post" />
					    </div>
				 	     <div>
				 			<label htmlFor='type' id='subtype'>Submission:</label>
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
							<label htmlFor='description'>Description:</label><textarea name='description' className="form-control" value={this.state.description} onChange={this.descriptionChanged.bind(this)}  placeholder="Description of event post" />
						</div>
						
			       
			            <div className="picUpload">
		            		<label htmlFor='picture'>Pic Upload:</label>
		            		<input id='uploadButton' ref="file" type="file" name="file"/>
			            </div>
						<br/>
						<div>
							<button className="submissionButton" value="Beam it brah"
							onClick={this.uploadFile.bind(this)}>Beam it brah!</button>
			             </div>    
		               </form>          
				</div>
			</div>
		</div>
			);
	}
}


export default Submission;