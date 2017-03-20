import React, {Component} from 'react';
import $ from 'jquery';
import RecentSubmissionItem from './RecentSubmissionItem';
//import Comment from './Comment';
//import CommentBox from './Comment';

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
	    	<div className="container">
		    	<div className="row">
					<div className="col-md-6">
						<h1>Lost Dogs</h1>
						<div id="rsContainer">
							<ul>
					        {this.state.submissions.map(function(submission,index) {
					        	if (submission.submissionType === 'Lost Dog') {
					        		return <RecentSubmissionItem  key={submission._id} submission={submission}/>
					        	} else {
					        		return ''
					        	}
					        })            
					        }
					        </ul> 
						</div>
					</div>
					<div className="col-md-6">
						<h1>Found Dogs</h1>
						<div id="rsContainer">
							<ul>
					        {this.state.submissions.map(function(submission,index) {
					        	if (submission.submissionType === 'Found Dog') {
					        		return <RecentSubmissionItem  key={submission._id} submission={submission}/>
					        	} else {
					        		return ''
					        	}
					        })            
					        }
					        </ul> 
					    </div> 
					</div>
				</div>
			</div>
		)
	}
}


export default LostFound