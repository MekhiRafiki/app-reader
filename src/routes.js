import React from 'react';
import { Route, IndexRoute } from 'react-router-dom';

import Login from './Login';
import Dashboard from './Dashboard';
/*import MainPage from './components/MainPage';
import SomePage from './components/SomePage';
import SomeOtherPage from './components/SomeOtherPage';*/

export default (
	<Route path="/" component={Login} />
	<Route path="/dashboard" component={Dashboard} />
);

/*
<Route path="/some/where" component={SomePage} />
<Route path="/some/otherpage" component={SomeOtherPage} />
*/