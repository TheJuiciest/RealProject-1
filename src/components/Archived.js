import React, {Component} from 'react';
import $ from 'jquery';     


class Archived extends Component {

	constructor(props) {
		super(props)
		this.state = {
			submissions: [],
		}
	}

	archivedGrab() {
		var me = this;
		$.ajax({
			method: 'GET',
			url: 'http://localhost:3002/api/submissions',
		})
		.done(function(submissions){
			me.setState({ submissions: submissions })
		})
	}

   componentWillMount() {
   	this.archivedGrab()
   }

	render() {
		return (
	    	<div>
	    		Past Submission Posts
				<ul>
		        {this.state.submissions.map(function(submission,index) {
		        	console.log(submission)
		            return <li key={index}>{submission.date}{submission.location}{submission.topicTitle}{submission.submissionType}{submission.description}</li>
		          })
		        }
		        </ul>
	    	</div>
		)
	}
}


export default Archived