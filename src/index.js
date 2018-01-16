import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login';
import Dashboard from './Dashboard';
import HttpsRedirect from 'react-https-redirect';

import {
	HashRouter,
	Route
} from 'react-router-dom';

ReactDOM.render((
	<HttpsRedirect>
		<HashRouter>
			<div>
				<Route exact path="/" component={Login} />
				<Route path="/dashboard" component={Dashboard} />
			</div>
		</HashRouter >
	</HttpsRedirect>
), document.getElementById('root'))