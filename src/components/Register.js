import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import $ from 'jquery';
//var config = require('../../config');       //let's us use our config file, which connects us to mongo user database



class Register extends Component {
	
	constructor(props){
		super(props)
		this.state = {
			firstname: "",
			lastname: "",
			username: "",
			email: "",
			password: ""
		};
	}

	firstnameChanged(event) {
		this.setState( {firstname: event.target.value} )
	}
	
	lastnameChanged(event) {
		this.setState({ lastname: event.target.value})
	}

	usernameChanged(event) {
		this.setState( {username: event.target.value} )
	}
	
	emailChanged(event) {
		this.setState( {email: event.target.value} )
	}

	passwordChanged(event) {
		this.setState({ password: event.target.value})
	}
	
	registerEvent() {
		$.ajax({
			method: 'POST', 
			url: '/api/register',
			data: JSON.stringify({
				firstname: this.state.firstname,
				lastname: this.sate.lastname,
				username: this.state.username,
				email: this.state.email,
				password: this.sate.password
			})
		})
		.done(function(result){
			console.log(result)
		})
	}
	
	render() {
		return (
			<div>
				<form className='register'>
					<h2>Register Your Life</h2>
					<input name="firstName" type="firstname" placeholder="First Name" /><br/>
					<input name="lastName" type="lastname" placeholder="Last Name" /><br/>
					<input name="username" type="username" placeholder="Username" /><br/>
					<input name="email" type="email" placeholder="Email Address" /><br/>
					<input name="password" type="password" placeholder="Enter Password" /><br/>
					<button className="registerButton" value="Let's Get To It Sparky!"
						onClick={this.registerEvent}>Register Me On Down!</button>
				</form>
			</div>
			);
	}
}


export default Register