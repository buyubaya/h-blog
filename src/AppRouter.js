import React from 'react';
import { BrowserRouter as Router, Switch, Route, IndexRoute, Redirect } from 'react-router-dom';

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
	<Router basename={process.env.PUBLIC_URL}>
		<Switch>
			<MainLayout>
				<Route path='/' exact component={SamplePage} />
				<Route path='/home' component={HomePage} />
				<Route path='/tuci' component={TuciInputPage} />
				<Route path='/login' component={LoginPage} />
				<Route path='/test' component={Test} />
				<Route path='/posts' component={PostListPage} />
				<Route path='/events' component={EventsPage} />
				<Route path='/not-found' component={Page404} />
			</MainLayout>
		</Switch>
	</Router>
);


export default AppRouter;
