import React, {Component} from 'react';

//var config = require('../../config');       


class RecentSubmission extends Component {


	render() {
		return (
	    	<div>
				<ul>
		        {this.props.submissions.map(function(submission,index) {
		        	console.log(submission) 
		            return <li key={index}>{submission.username}   {submission.date}   {submission.location}    {submission.topicTitle}    {submission.submissionType}   {submission.fd}   {submission.description}><br/>
		            <button className="CommentButton" value="comment">Leave a Comment</button>
		            </li>
		          })
		        }
		        </ul>
	    	</div>
		)
	}
}

export default RecentSubmission