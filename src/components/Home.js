import React, {Component} from 'react';
import $ from 'jquery';
import Submission from './Submission';
import ImageUpload from './ImageSubmission';
import RecentSubmission from './RecentSubmission';
//import ImageUpload from './ImageSubmission';
import RecentSubmission from './RecentSubmission';
//import { browserHistory } from 'react-router';

class Home extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			submissions: []
		}
	}

	recentGrab() {
		var me = this;
		$.ajax({
			method: 'GET',
			url: 'http://localhost:3002/api/submissions',
		})
		.done(function(submissions){
			me.setState({ submissions: submissions })
		})
	}
				//submissions.sort(function(a, b){
				//return b.Date-a.Date;
    componentWillMount() {
   	this.recentGrab()
    }

	render() {

		if(!document.cookie) {
			$('.loginButton').show();
			$('.submitContainer').hide();
			$('.logoutButton').hide();
			$('.logoutContainer').show();
		} else if (document.cookie) {
			$('.logoutButton').show();
			$('.loginButton').hide();
			$('.submitContainer').show();
			$('.logoutContainer').hide();
		}


		$(".logoutButton").on('click', function(event){
  			event.preventDefault();
  			document.cookie = "";
  			window.location.replace("/");
  		})

		return (
			<div className="recentSubmissionContainer"><Submission reloadSubmissions={this.recentGrab.bind(this)}/><ImageUpload/><RecentSubmission submissions={this.state.submissions}/></div>
			<div>
				<button className="logoutButton" value="logout" href="/">Logout!</button>
				<div className="recentSubmissionContainer">
					<Submission reloadSubmissions={this.recentGrab.bind(this)}/>
					<h1>Recent Event Submissions</h1>
					<RecentSubmission submissions={this.state.submissions}/>
				</div>
			</div>

		)
	}
}

export default Home