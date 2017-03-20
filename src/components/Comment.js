/*import React, {Component} from 'react';
import $ from 'jquery';
import moment from 'moment';
var config = require('../../config');


class Comment extends Component {

	render(){
		const {date, _user, text} = this.props.comment
		const userStyle = { color: 'black'}
		return <div><span style={userStyle}>{_user.username}: </span>{text} (posted {moment(date).startOf('day').fromNow()})</div>
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
}

export default Comment