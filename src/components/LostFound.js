import React, {Component} from 'react';
import $ from 'jquery';

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

   componentWillMount() {
   	this.lostFoundGrab()
   }

	render() {
		return (
	    	<div>
	    		This is our lost and found page	
				<ul>
		        {this.state.submissions.map(function(submission,index) {
		        	if (submission.submissionType === 'Lost Dog' || submission.submissionType === 'Found Dog') {
		        		return <li key={index}>{submission.date}{submission.location}{submission.topicTitle}{submission.submissionType}{submission.description}</li>
		        	} else {
		        		return ''
		        	}
		        })            
		        }
		        </ul> 
	    	</div>
		)
	}
}


export default LostFound