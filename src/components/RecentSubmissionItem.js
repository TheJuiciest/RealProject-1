import React, {Component} from 'react';
import $ from 'jquery';
import moment from 'moment';
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
    	return img ? <img className="imgStyle" role='presentation' src={config.frontEndServer + img.split('public')[1]}/> : '';
    }

	render(){
		 const style= { left: '600px', margin: '10px'}
		 const { username, date, location, topicTitle, submissionType, description, fd, comments, _id}= this.props.submission;
		 
		 return (
        <div className="letsScroll">
         <div className="mainContainer">
             <div className="recentSubContainer">
                 <div className="dateSub">
                      <span>&nbsp; {moment(date).format('MMMM Do YYYY')}</span>
                      <span className="typeOfSub">{submissionType} &nbsp;</span>
                  </div>
                      <hr/>
                  <span className="locationS">&nbsp; {location.split( ', United States')}</span><br/>
                      <ul id="comments-list" className="comments-list">
                          <li>
                   <div className="submissionSub">
                   
                  </div>  
                  <div className="topicSub">
                      <span id="topicSubs"><strong>{topicTitle}</strong></span><br/>
                  </div>  
                  <div className="locationSub">
                   
                  </div>
                  <div className="descriptionSub">
                      <span>{description}</span><br/>
                  </div>
                  <div className="fdSub">
                       <span>{this.formatImg(fd)}</span>
                  </div>
                  <div className="userSub">
                     <span><em id="posted">Submitted by: &nbsp; </em> {username}</span>
                 </div>
                         </li>
                     </ul>
             </div>
             <div className="recentComContainer">
                 <ul className="comments-list reply-list">
                     <li>
             	 <h10>Comments</h10>

                  <div className="commSub">
                       {comments.map(comment => <Comment key={comment._id} comment={comment}/>)}
                  </div>
            
                    </li>
                </ul>
           


	            <div className="buttonSub">
	                    <button bsStyle="warning" className="commentButton" style={style} onClick={this.onClick.bind(this)} value="comment">Leave a Comment</button>    
	                            { this.state.showCommentBox && <CommentBox submissionId={_id}/> }
	            </div>
	        </div>
         </div>
        </div>
		 )
		  
		            	  
	}
}

class Comment extends Component {

	/*deleteComment() {
		$.ajax({
			method: 'DELETE',
			url: config.apiServer + '/api/comment',
			data: {
				comment: this.props.comment_id
			}
		})
		.done(function(result){
			console.log(result)
		})
	} 

<div>
	<button className='deleteComm' value="deleteInput" onClick={this.deleteComment.bind(this)}>Delete Comment</button>
</div>

	*/

	render(){
		const {date, _user, text} = this.props.comment
		const userStyle = { color: 'green'}
		return (
			<div>
				<div>
					<span style={userStyle}> {_user.username}: </span>
					{text} <em id='commentDate'> (on {moment(date).format('MMMM Do YYYY h:mma')}) </em>
				</div>
			</div>
		)
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
            	<textarea className="commentBox" value={this.state.text} onChange={this.textChanged.bind(this)} placeholder="Leave comment here..." />
            	<button className="sendComment" value="sendInput" onClick={this.handleCommentInput.bind(this)}>Post Comment</button> 
            </div>
        )
    }
}


export default RecentSubmissionItem