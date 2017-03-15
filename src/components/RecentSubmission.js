import React, {Component} from 'react';
import $ from 'jquery';
import moment from 'moment'

var config = require('../../config');       



class RecentSubmission extends Component {

	render() {

		return (
	    	<div>
				<ul>
		        {this.props.submissions.map((submission) => <RecentSubmissionItem submission={submission}/>)}
		        </ul>
	    	</div>
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

    formatImg(img){
    	const imgStyle={height: '100px', width: '100px', border: 'none'}
    	// if(img.split('public')[1] === undefined){
    	// 	return ''
    	// } else {
    	// 	return <img style={imgStyle} src={config.frontEndServer + img.split('public')[1]}/>
    	// }
    	return img ? <img style={imgStyle} src={config.frontEndServer + img.split('public')[1]}/> : '' ;
    }

	render(){
		 const style= { left: '600px' }
		 const { username, date, location, topicTitle, submissionType, description, fd, comments, _id}= this.props.submission;
		 console.log(comments[0])
		 return <li key={fd}>{username}   {moment(date).format('MMMM Do YYYY')}   {location}    {topicTitle}    {submissionType}    {description} {this.formatImg(fd)} {comments.map(comment => <Comment comment={comment}/>)} <br/>
		            		<button style={style} className="commentButton" onClick={this.onClick.bind(this)} value="comment">Leave a Comment</button>	
		            		{ this.state.showCommentBox && <CommentBox submissionId={_id}/> }
		            	  </li>
	}
}

class Comment extends Component {

	render(){
		const {_user, text} = this.props.comment
		const userStyle = { color: 'hotpink'}
		return <div><span style={userStyle}>{_user.username}: </span>{text}</div>
	}
}

class CommentBox extends Component {
    
	constructor(props) {
    super(props) 
      this.state = {
        text: ""
      }
    }

	textChanged(event) {
		this.setState( {text: event.target.value} )
	}


	handleCommentInput() {
		$.ajax({
			method: 'POST',
			url: config.apiServer + '/api/comment',
			data: {
				token: document.cookie,
				text: this.state.text,
				submission: this.props.submissionId
			}
		})
		.done(function(result){
			console.log(result)
		})
	}

    render() {
        return (
            <div> 
            	<textarea className="commentBox" value={this.state.text} onChange={this.textChanged.bind(this)} placeholder="comment here about your stupid dog" />
            	<button className="sendComment" value="sendInput" onClick={this.handleCommentInput.bind(this)}>Post Comment</button> 
            </div>
        )
    }
}


export default RecentSubmission