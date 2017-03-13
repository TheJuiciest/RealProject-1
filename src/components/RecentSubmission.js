import React, {Component} from 'react';
import $ from 'jquery';

//var config = require('../../config');       



class RecentSubmission extends Component {

	constructor(props) {
    super(props) 
      this.state = {
        showCommentBox: false
        /*username: "",
        commentText: "",
        date: Date.now() */
      }
    }

	 /*commentSubmit(event) {
	   var comments = this.state.commentText;
	   var newComments = comments.concat([comment]);
	   this.setState({commentText: event.target.value});
	}

	 displayComment(e) {
	   var self = this;
	   var id = {this.props.submission("submissionId")};
	   var body = {token: document.cookie}
	   $.ajax({
	       url: config.apiServer +'/api/comment' + id,
	       type: 'POST',
	       data: {
	         username: this.state.username,
	         commentText: this.state.commentText,
	         date: this.state.date
	       },
	       success: function(data) {
	         console.log(data);
	       }
	   })
	       .done(function(result){
	       self.props.reloadComments()
	       console.log(result)
	    })
	    e.preventDefault() 
  } */

	onClick(e) {
        var self = this;
        e.preventDefault();
        this.setState({ showCommentBox: !this.state.showCommentBox });

    }

	render() {

		return (
	    	<div>
				<ul>
		        {this.props.submissions.map((submission) => <RecentSubmissionItem submission={submission}/>)}
		        </ul>
		        <button className="commentButton" value="comment" onClick={this.onClick.bind(this)}>Leave a Comment</button>
		            { this.state.showCommentBox && <CommentBox /> }
	    	</div>
	    	/*<div>
	    		<button className="commentButton" value="comment">Leave a Comment</button>
		        <textarea className="commentBox" value="commentInput" placeholder="Comment on Submission"</textarea>
		    </div> */
		)
	}
}

class RecentSubmissionItem extends Component {
	constructor(props) {
    	super(props) 
      	this.state = {
        	showCommentBox: false
        }
    }
	onClick(e) {
        e.preventDefault();
        this.setState({ showCommentBox: !this.state.showCommentBox });

    }
	render(){
		 const { username, date, location, topicTitle, submissionType, description, fd }= this.props.submission
		 return <li key={fd}>{username}   {date}   {location}    {topicTitle}    {submissionType}    {description} {fd}<br/>
		            		<button className="commentButton" onClick={this.onClick.bind(this)} value="comment">Leave a Comment</button>	
		            		{ this.state.showCommentBox && <CommentBox /> }
		            	  </li>
	}
}


class CommentBox extends Component {
    render() {
        return (
            <div> 
            	<textarea className="commentBox" />
            	<button className="sendComment" value="sendInput">Post Comment</button> 
            </div>
        )
    }
}


export default RecentSubmission