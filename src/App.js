import React from 'react';
// STYLES
import './assets/styles/App.css';
// COMPONENTS
import AppRouter from './AppRouter';
// FIREBASE
import { base } from './libs/firebase';
// APOLLO
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import END_POINTS from 'config/Endpoints';

// process.env.NODE_ENV = 'development';
const client = new ApolloClient({
	uri: END_POINTS[process.env.NODE_ENV].GRAPHQL_URI
});

const App = () => (
	<ApolloProvider client={client}>
    	<AppRouter />
  	</ApolloProvider>
);


export default App;
