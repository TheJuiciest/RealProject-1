import React, {Component} from 'react';
import $ from 'jquery';
import moment from 'moment';
import Comment from './Comment';
import CommentBox from './Comment';
var config = require('../../config');




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
    	const imgStyle={height: '100px', width: '100px'}
    	return img ? <img className="img-circle" style={imgStyle} role='presentation' src={config.frontEndServer + img.split('public')[1]}/> : '';
    }

	render(){
		 const style= { left: '600px', margin: '10px'}
		 const { username, date, location, topicTitle, submissionType, description, fd, comments, _id}= this.props.submission;
		 
		 return (
		 <div className="mainContainer">
		 	<div className="recentSubContainer">
		 		<div className="dateSub">
		 		 	<span>{moment(date).format('MMMM Do YYYY')}</span>
		 	 	</div>
		 	 	 <div className="submissionSub"> 
		 		     <span>{submissionType}</span>
		 		 </div>   
		 		  <div className="topicSub">
		 		     <span>{topicTitle}</span>
		 		 </div>  
		 		 <div className="locationSub">
		 		   <span>{location.split(', United States')}</span>
		 		 </div>
		 		 <div className="descriptionSub">
		 		     <span>{description}</span>
		 		 </div>
		 		 <div className="fdSub">
		 		 	 <span>{this.formatImg(fd)}</span>
		 		 </div>
		 		 <div className="userSub">
		 			<span>{username}</span>
		 		</div>
		 	</div>
		 	<div className="recentComContainer">
		 		 <div className="commSub">
		 		      {comments.map(comment => <Comment key={comment._id} comment={comment}/>)}<br/>
		 	     </div>
		    </div>
		    <div className="buttonSub">
		        	<button bsStyle="warning" className="commentButton" style={style} onClick={this.onClick.bind(this)} value="comment">Leave a Comment</button>	
		            		{ this.state.showCommentBox && <CommentBox submissionId={_id}/> }
		    </div>
		 </div>
		 )
		  
		            	  
	}
}

/*class Comment extends Component {

	render(){
		const {date, _user, text} = this.props.comment
		const userStyle = { color: 'black'}
		return <div><span style={userStyle}>{_user.username}: </span>{text} (on {moment(date).format('MMMM Do YYYY h:mma')})</div>
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
				submission: this.props.submissionId,
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
}*/


export default RecentSubmissionItem