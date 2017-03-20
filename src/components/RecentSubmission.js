import React, {Component} from 'react';
import $ from 'jquery';
import moment from 'moment';
import RecentSubmissionItem from './RecentSubmissionItem';
//import {FormGroup, FormControl, ControlLabel} from "react-bootstrap";

    



class RecentSubmission extends Component {

	render() {

		return (
	    	<div>
	    		<div>
				<ul id="recentSubUl">
		        {this.props.submissions.map((submission) => <RecentSubmissionItem  key={submission._id} submission={submission}/>)}
		        </ul>
		        </div>
	    	</div>
		)
	}
}



export default RecentSubmission