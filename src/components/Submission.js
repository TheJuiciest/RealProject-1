import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import $ from 'jquery';
var config = require('../../config');       //let's us use our config file, which connects us to mongo user database



class Submission extends Component {
	
	constructor(props){
		super(props)
		this.state = {
			date: Date,
			location: "",
			topicTitle: "",
			submissionType: "",
			//file: '',
			//imagePreviewUrl: '',
			description: ""
		};
	}

	dateChanged(event) {
		this.setState( { date: event.target.value} )
	}
	
	locationChanged(event) {
		this.setState( { location: event.target.value})
	}

	topicTitleChanged(event) {
		this.setState( { topicTitle: event.target.value} )
	}

	/*photoChanged(event) {
		this.setState({ photoAdded: !this.state.photoAdded})
	} */
	
	descriptionChanged(event) {
		this.setState({ description: event.target.value})
	}

	submissionEvent() {
		var self = this;
		//some sort of search through the state to check that everything has an answer
		$.ajax({
			method: 'POST', 
			url: config.apiServer + '/api/submission',
			data: {
				date: this.state.date,
				location: this.state.location,
				topicTitle: this.state.topicTitle,
				submissionType: this.state.submissionType,
				//file: this.state.file,
				description: this.state.description
			}
		})
		.done(function(result){
			self.props.reloadSubmissions()
			console.log(result)
		})
	}
	
	render() {
		return (
			<div>
					<h2>Submit a Post</h2>
					<input id="date" value={this.state.date} type="date" onChange={this.dateChanged.bind(this)} placeholder="What date did this happen?" /><br/>
					<input id="location" value={this.state.location} onChange={this.locationChanged.bind(this)} placeholder="Location of event postsubmission?" /><br/>
					<input id="topicTitle" value={this.state.topicTitle} onChange={this.topicTitleChanged.bind(this)} placeholder="Name to your Post" /><br/>
					<select id="selectValue" onChange={(e)=>this.setState({'submissionType': e.target.value })}>
						<option value="pleaseSelect">Type of Submission Event</option>
						<option value="Hazard">Hazard</option>
						<option value="Lost Dog">Lost Dog</option>
						<option value="Found Dog">Found Dog</option>
						<option value="Current Condition">Current Condition</option>
						<option value="Community Event">Community Event</option>
						<option value="Other">Other</option>
					</select><br/>
					<input id="description" value={this.state.description} onChange={this.descriptionChanged.bind(this)}  placeholder="Description of event post" /><br/>
					<button className="submissionButton" value="Beam it brah"
						onClick={this.submissionEvent.bind(this)}>Beam it brah!</button>
			</div>
			);
	}
}


export default Submission;