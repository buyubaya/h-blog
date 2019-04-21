import React from 'react';
import { HashRouter as Router, Switch, Route, IndexRoute, Redirect } from 'react-router-dom';

// COMPONENTS
import MainLayout from 'components/common/MainLayout';
import LandingPage from 'pages/LandingPage';
import AboutPage from 'pages/AboutPage';
import ProjectsPage from 'pages/ProjectsPage';
import EventsPage from 'pages/EventsPage';
import CollectionsPage from 'pages/CollectionsPage';
import LoginPage from 'pages/LoginPage';
import Page404 from 'pages/Page404';
import SamplePage from 'pages/SamplePage';
import AdminPage from 'pages/AdminPage';
// import TuciInputPage from 'pages/TuciInputPage';
// import HomePage from 'pages/HomePage';
// import Test from 'pages/Test';
// <Router basename={process.env.PUBLIC_URL}>

const AppRouter = () => (
	<Router>
		<Switch>
			<MainLayout>
				<Route path='/' exact component={LandingPage} />
				<Route path='/about' component={AboutPage} />
				<Route path='/projects' component={ProjectsPage} />
				<Route path='/events' component={EventsPage} />
				<Route path='/collections' component={CollectionsPage} />
				<Route path='/login' component={LoginPage} />
				{/* <Route path='/home' component={HomePage} />
				<Route path='/tuci' component={TuciInputPage} />
				<Route path='/test' component={Test} /> */}
				<Route path='/sample' exact component={SamplePage} />
				<Route path='/admin/dashboard' exact component={AdminPage} />
				<Route path='/not-found' component={Page404} />
			</MainLayout>
		</Switch>
	</Router>
);


export default AppRouter;
