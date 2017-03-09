import React, {Component} from 'react';
import $ from 'jquery';
import Submission from './Submission';
import ImageUpload from './ImageSubmission';
import RecentSubmission from './RecentSubmission';

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
		return (
			<div className="recentSubmissionContainer"><Submission reloadSubmissions={this.recentGrab.bind(this)}/><ImageUpload/><RecentSubmission submissions={this.state.submissions}/></div>
		)
	}
}

export default Home