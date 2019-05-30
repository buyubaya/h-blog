import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';


const httpLink = new HttpLink({
    uri: 'https://h-chat-server.herokuapp.com/graphql',
});

const wsLink = new WebSocketLink({
    uri: `wss://h-chat-server.herokuapp.com/graphql`,
    options: {
        reconnect: true,
        timeout: 60000,
        // inactivityTimeout: 1000
    }  
});

wsLink.subscriptionClient.onConnected(() => {
    console.log('CONNECTED');
});
wsLink.subscriptionClient.onDisconnected(() => {
    console.log('CLIENT DISCONNECTED');
});

const terminatingLink = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return (
            kind === 'OperationDefinition' && operation === 'subscription'
        );
    },
    wsLink,
    httpLink
);

const link = ApolloLink.from([terminatingLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
    link,
    cache
});


export default client;