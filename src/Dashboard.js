import React, { Component } from 'react';
import './Dashboard.css';

var BACKEND_URL = "https://XXXXXXXXXXX.herokuapp.com";

class Dashboard extends Component {
	
	constructor() {
		super();
		if (!window.localStorage.getItem('reader-id')) {
			window.location.href = "/#/";
		}
		this.state = {
			leaderboard: [],
			application: [],
			stats: []
		}
	}
	
	componentDidMount() {
		var data = encodeURIComponent('reader_id') + "=" + encodeURIComponent(localStorage.getItem('reader-id'));
		Promise.all([
			fetch(BACKEND_URL + '/leaderboard', { 
				method: 'get'
			}),
			fetch(BACKEND_URL + '/next_application', { 
				method: 'post', 
				headers: {
				    'Accept': 'application/json',
				    'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: data
			}),
			fetch(BACKEND_URL + '/stats', { 
				method: 'get'
			})
		]).then(([leaderboard_data, application_data, stats_data]) => {
			Promise.all([leaderboard_data.json(), application_data.json(), stats_data.json()]).then(data => {
				let leaderboard = data[0].map((person) => {
					return (
						<div className="leaderboard-person-container">
							<div className="leaderboard-name">{person.name}</div>
							<div className='leaderboard-reads'>{person.num_reads}</div>
						</div>
					)
				})
				var application;
				if (data[1]) {
					if (data[1].resume_url !== "none") {
						application = (
							<div className="application-question-container">
								<div id="application-id">{data[1]._id}</div>
								<div className="application-name">{data[1].first_name} {data[1].last_name}</div>
								<div className="application-school">{data[1].school}</div>
								<div className="application-question">Why do you want to come to Treehacks?</div>
								<div className="application-answer">{data[1].question_1}</div>
								<div className="application-question">Tell us about the project you are most proud of.</div>
								<div className="application-answer">{data[1].question_2}</div>
								<div className="application-question">Fun fact...</div>
								<div className="application-answer">{data[1].fun_fact}</div>
								<iframe src={data[1].resume_url} width="750" height="1000" id="resume-embed" title="resume"></iframe>
							</div>
						)
					} else {
						application = (
							<div className="application-question-container">
								<div id="application-id">{data[1]._id}</div>
								<div className="application-name">{data[1].first_name} {data[1].last_name}</div>
								<div className="application-school">{data[1].school}</div>
								<div className="application-question">Why do you want to come to Treehacks?</div>
								<div className="application-answer">{data[1].question_1}</div>
								<div className="application-question">Tell us about the project you are most proud of.</div>
								<div className="application-answer">{data[1].question_2}</div>
								<div className="application-question">Fun fact...</div>
								<div className="application-answer">{data[1].fun_fact}</div>
							</div>
						)
					}
				} else {
					application = (
						<div className="application-question-container">
							<div className="application-name">No more apps to read!</div>
							<div className="application-school">Congrats!</div>
						</div>
					)
				}
				let stats = (
					<div className="leaderboard-person-container">
						<div className="stats-number"><span className="bold-number">{data[2].results.num_remaining}</span> apps remaining</div>
					</div>
				)
				this.setState({leaderboard: leaderboard});
				this.setState({application: application});
				this.setState({stats: stats});
			});
		}).catch((err) => {
			console.log(err);
		});
	}
	
	render() {
		return (
			<div id="dashboard-container">
				<div id="left-container">
					<div id="score-container">
						<div className="field-container">
							<div className="field-prompt">Culture Fit</div>
							<select name="culture-fit" className="criteria-select" id="culture-fit">
								<option value="0">0</option>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</select>
						</div>
						<div className="field-container">
							<div className="field-prompt">Experience</div>
							<select name="experience" className="criteria-select" id="experience">
								<option value="0">0</option>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</select>
						</div>
						<div className="field-container">
							<div className="field-prompt">Passion</div>
							<select name="passion" className="criteria-select" id="passion">
								<option value="0">0</option>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</select>
						</div>
						<div className="field-container">
							<div className="field-prompt">Organizer</div>
							<input type="checkbox" id="organizer" />
						</div>
						<div className="field-container">
							<div className="field-prompt">Beginner</div>
							<input type="checkbox" id="beginner" />
						</div>
						<div id="submit-button" onClick={this.handleSubmit}>submit</div>
					</div>
					<div id="stats-container">
						{this.state.stats}
					</div>
					<div id="leaderboard-container">
						{this.state.leaderboard}
					</div>
				</div>
				<div id="right-container">
					<div id="application-container">
						{this.state.application}
					</div>
				</div>
			</div>
		);
	}
	
	handleSubmit = () => {
		if(!document.getElementById("application-id")) {
			return false;
		}
		document.getElementById('submit-button').style.pointerEvents = 'none';
		document.getElementById('submit-button').innerHTML = "loading...";
		var data = [];
		data.push(encodeURIComponent('application_id') + "=" + encodeURIComponent(document.getElementById("application-id").innerHTML));
		data.push(encodeURIComponent('reader_id') + "=" + encodeURIComponent(window.localStorage.getItem('reader-id')));
		data.push(encodeURIComponent('culture_fit') + "=" + encodeURIComponent(document.getElementById('culture-fit').value));
		data.push(encodeURIComponent('experience') + "=" + encodeURIComponent(document.getElementById('experience').value));
		data.push(encodeURIComponent('passion') + "=" + encodeURIComponent(document.getElementById('passion').value));
		data.push(encodeURIComponent('is_organizer') + "=" + encodeURIComponent(document.getElementById('organizer').checked));
		data.push(encodeURIComponent('is_beginner') + "=" + encodeURIComponent(document.getElementById('beginner').checked));
		data = data.join("&");
		fetch(BACKEND_URL + '/rate', { 
			method: 'post', 
			headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: data
		}).then((data) => {
			data.json().then((data) => {
				if (data.results.status === "success") {
					var selects = document.getElementsByTagName("select");
					for (var i = 0; i < selects.length; i++) {
						selects[i].value = 0;
					}
					document.getElementById("organizer").checked = false;
					document.getElementById("beginner").checked = false;
					var newData = encodeURIComponent('reader_id') + "=" + encodeURIComponent(window.localStorage.getItem('reader-id'));
					Promise.all([
						fetch(BACKEND_URL + '/leaderboard', { 
							method: 'get'
						}),
						fetch(BACKEND_URL + '/next_application', { 
							method: 'post', 
							headers: {
							    'Accept': 'application/json',
							    'Content-Type': 'application/x-www-form-urlencoded'
							},
							body: newData
						}),
						fetch(BACKEND_URL + '/stats', { 
							method: 'get'
						})
					]).then(([leaderboard_data, application_data, stats_data]) => {
						Promise.all([leaderboard_data.json(), application_data.json(), stats_data.json()]).then(data => {
							let leaderboard = data[0].map((person) => {
								return (
									<div className="leaderboard-person-container">
										<div className="leaderboard-name">{person.name}</div>
										<div className='leaderboard-reads'>{person.num_reads}</div>
									</div>
								)
							})
							var application;
							if (data[1]) {
								if (data[1].resume_url !== "none") {
									application = (
										<div className="application-question-container">
											<div id="application-id">{data[1]._id}</div>
											<div className="application-name">{data[1].first_name} {data[1].last_name}</div>
											<div className="application-school">{data[1].school}</div>
											<div className="application-question">Why do you want to come to Treehacks?</div>
											<div className="application-answer">{data[1].question_1}</div>
											<div className="application-question">Tell us about the project you are most proud of.</div>
											<div className="application-answer">{data[1].question_2}</div>
											<div className="application-question">Fun fact...</div>
											<div className="application-answer">{data[1].fun_fact}</div>
											<iframe src={data[1].resume_url} width="750" height="1000" id="resume-embed" title="resume"></iframe>
										</div>
									)
								} else {
									application = (
										<div className="application-question-container">
											<div id="application-id">{data[1]._id}</div>
											<div className="application-name">{data[1].first_name} {data[1].last_name}</div>
											<div className="application-school">{data[1].school}</div>
											<div className="application-question">Why do you want to come to Treehacks?</div>
											<div className="application-answer">{data[1].question_1}</div>
											<div className="application-question">Tell us about the project you are most proud of.</div>
											<div className="application-answer">{data[1].question_2}</div>
											<div className="application-question">Fun fact...</div>
											<div className="application-answer">{data[1].fun_fact}</div>
										</div>
									)
								}
							} else {
								application = (
									<div className="application-question-container">
										<div className="application-name">No more applications to read...</div>
										<div className="application-school">Congrats!</div>
									</div>
								)
							}
							let stats = (
								<div className="leaderboard-person-container">
									<div className="stats-number"><span className="bold-number">{data[2].results.num_remaining}</span> apps remaining</div>
								</div>
							)
							this.setState({leaderboard: leaderboard});
							this.setState({application: application});
							this.setState({stats: stats});
							document.getElementById('submit-button').style.pointerEvents = 'auto';
							document.getElementById('submit-button').innerHTML = "submit";
						});
					}).catch((err) => {
						console.log(err);
					});
				} else {
					alert("Error...");
				}
			})
		})
	}
}

export default Dashboard;
