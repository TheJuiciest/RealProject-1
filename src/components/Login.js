import React, {Component} from 'react';
import $ from 'jquery';
import '../css/register.css';
var config = require('../../config');  



class Login extends Component {
	
	constructor(props){
		super(props)
		this.state = {
			username: "",
			password: ""
		};
	}

	usernameChanged(event) {
		this.setState( {username: event.target.value} )
	}
	
	passwordChanged(event) {
		this.setState({ password: event.target.value})
	}
	
	loginEvent() {
		$.ajax({
			method: 'POST', 
			url: config.apiServer + '/api/authenticate',
			data: {
				username: this.state.username,
				password: this.state.password
			}
		})
		.done(function(data){
			document.cookie = data.token;
			if (data.token) {
				alert("Log in successful!");
				window.location.replace("/");
			} else {
				alert("Something wasn't entered correctly.");
			} 
				console.log(data);
		})
	}
	
	render() {
		return (
			
			<div className="board">
			<div className="container">
			<div>
					<h2>Login Your Life</h2>
					<input value={this.state.username} onChange={this.usernameChanged.bind(this)} placeholder="Enter Username" /><br/>
					<input value={this.state.password} onChange={this.passwordChanged.bind(this)} type="password" placeholder="Enter Password" /><br/>
					<button className="loginButton" value="postMe"
					onClick={this.loginEvent.bind(this)}>Log Me On In</button>
			</div>
			</div>
			</div>
			);
	}
}


export default Login