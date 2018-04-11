import React, { Component } from 'react';
import './Login.css';

var BACKEND_URL = "https://lit-wave-50852.herokuapp.com/";

class Login extends Component {
	render() {
		return (
			<div className="App">
				<div id="login-container">
					<p className="input-label">SUNet ID</p>
					<input type="text" id="username-input" />
					<p className="input-label">password</p>
					<input type="password" onKeyDown={this.checkSubmit} id="password-input" />
					<div id="login-button" onClick={this.handleSubmit}>enter</div>
				</div>
			</div>
		);
	}
	
	checkSubmit = (e) => {
		if (e.keyCode === 13) {
			this.handleSubmit();	
		}
	}
  
	handleSubmit = () => {
		var data = [];
		data.push(encodeURIComponent('username') + "=" + encodeURIComponent(document.getElementById("username-input").value.toLowerCase()));
		data.push(encodeURIComponent('password') + "=" + encodeURIComponent(document.getElementById("password-input").value.toLowerCase()));
		data = data.join("&");
		fetch(BACKEND_URL + '/login', { 
			method: 'post', 
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: data
		}).then(data => {
			data.json().then(data => {
				if (data.results.reader_id) {
					window.localStorage.setItem('reader-id', String(data.results.reader_id));
					window.location.href = "/#/dashboard";
				} else {
					document.getElementById("password-input").value = "";
					alert("Incorrect password...");
				}
			});
		});
	}
}

export default Login;
