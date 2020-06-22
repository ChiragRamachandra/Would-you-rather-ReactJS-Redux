import React, { Fragment, useEffect } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import BeforeLogin from './pages/BeforeLogin';
import Dashboard from './pages/Dashboard';
import AnswerQuestion from './pages/AnswerQuestion';
import NewQuestion from './pages/NewQuestion';
import LeaderBoard from './pages/LeaderBoard';
import PrivateRoute from './route/PrivateRoute';
import NotFound from './components/NotFound';

import store from './store/Store';

import { loadUser } from './actions/Auth';
import { getQuestions } from './actions/Questions';
import { getUsers } from './actions/Users';

function App() {
	useEffect(() => {
		store.dispatch(loadUser());
		store.dispatch(getQuestions());
		store.dispatch(getUsers());
	}, []);
	return (
		<div className="App">
			<Router>
				<Fragment>
					<Switch>
						<Route exact path="/" component={BeforeLogin} />
						<PrivateRoute exact path="/leaderboard" component={LeaderBoard} />
						<PrivateRoute path="/dashboard" component={Dashboard} />
						<PrivateRoute path="/questions/:id" component={AnswerQuestion} />
						<PrivateRoute path="/add" component={NewQuestion} />
						<PrivateRoute component={NotFound} />
					</Switch>
				</Fragment>
			</Router>
		</div>
	);
}

export default App;
