import React from 'react';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';

// COMPONENTS
import MainLayout from 'components/common/MainLayout';
import SamplePage from 'pages/SamplePage';
import TuciInputPage from 'pages/TuciInputPage';
import HomePage from 'pages/HomePage';
import Page404 from 'pages/Page404';
import LoginPage from 'pages/LoginPage';
import Test from 'pages/Test';
import PostListPage from 'pages/PostListPage';
import EventsPage from 'pages/EventsPage';


const AppRouter = () => (
	<Router history={browserHistory} basename={process.env.PUBLIC_URL}>
		<Route path={'/'} component={MainLayout}>
			<IndexRoute component={SamplePage} />
			<Route path='/home' component={HomePage} />
			<Route path='/tuci' component={TuciInputPage} />
			<Route path='/login' component={LoginPage} />
            <Route path='/test' component={Test} />
			<Route path='/posts' component={PostListPage} />
			<Route path='/events' component={EventsPage} />
			<Route path='/not-found' component={Page404} />
		</Route>
		<Redirect from='*' to='/not-found' />
	</Router>
);


export default AppRouter;
