import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import $ from 'jquery';
var config = require('../../config');       //let's us use our config file, which connects us to mongo user database



class Post extends Component {
	
	constructor(props){
		super(props)
		this.state = {
			date: Date,
			location: "",
			topicTitle: "",
			selectValue: "",
			//photoAdded: false,
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
	
	postTypeChanged(event) {
		this.setState( { selectValue: event.target.value} )
	}

	/*photoChanged(event) {
		this.setState({ photoAdded: !this.state.photoAdded})
	} */
	
	descriptionChanged(event) {
		this.setState({ description: event.target.value})
	}

	postEvent() {
		$.ajax({
			method: 'POST', 
			url: config.apiServer + '/api/post',
			data: {
				date: this.state.date,
				location: this.state.location,
				topicTitle: this.state.topicTitle,
				postType: this.state.postType,
				//photoAdded: this.state.photoAdded,
				description: this.state.description
			}
		})
		.done(function(result){
			console.log(result)
		})
	}
	
	render() {
		return (
			<div>
					<h2>Submit a Post</h2>
					<input id="date" value={this.state.date} type="date" onChange={this.dateChanged.bind(this)} placeholder="What date did this happen?" /><br/>
					<input id="location" value={this.state.location} onChange={this.locationChanged.bind(this)} placeholder="Location of event post?" /><br/>
					<input id="topicTitle" value={this.state.topicTitle} onChange={this.topicTitleChanged.bind(this)} placeholder="Name to your Post" /><br/>
					<select id="selectValue" value={this.state.selectValue} onChange={this.postTypeChanged.bind(this)}>
						<option value="Hazard">Hazard</option>
						<option value="Lost Dog">Lost Dog</option>
						<option value="Found Dog">Found Dog</option>
						<option value="Current Condition">Current Condition</option>
						<option value="Community Event">Community Event</option>
						<option value="Other">Other</option>
					</select><br/>
					<input id="description" value={this.state.description} onChange={this.descriptionChanged.bind(this)}  placeholder="Description of event post" /><br/>
					<button className="postButton" value="Beam it brah"
						onClick={this.postEvent.bind(this)}>Beam it brah!</button>
			</div>
			);
	}
}


export default Post;