import React, {Component} from 'react';
import Submission from './Submission';
import $ from 'jquery';

//var config = require('../../config');       


class LostFound extends Component {

	constructor(props) {
		super(props)
		this.state = {
			submissions: []
		}
	}

	lostFoundGrab() {
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
   	this.lostFoundGrab()
   }

	render() {
		return (
	    	<div>
	    		This is our lost and found page	
				<ul>
		        {this.state.submissions.map(function(submission,index) {
		        	console.log(submission)
		        	if (submission.submissionType === 'Lost Dog' || submission.submissionType === 'Found Dog') {
		        		return <li key={index}>{submission.date}{submission.location}{submission.topicTitle}{submission.submissionType}{submission.description}</li>
		        	}
		        })            
		        }
		        </ul> 
	    	</div>
		)
	}
}


export default LostFound