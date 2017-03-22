import React, {Component} from 'react';
import $ from 'jquery';
import RecentSubmissionItem from './RecentSubmissionItem';     


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
		    <div className="archivedContainer">
		    	<div className="col-md-6">
		    		<h1 id='archivedHead'>Past Submission Posts</h1>
					<ul>
			        {this.state.submissions.map((submission) => <RecentSubmissionItem  key={submission._id} submission={submission}/>)}
			        </ul>
		    	</div>
		    </div>	
		)
	}
}


export default Archived