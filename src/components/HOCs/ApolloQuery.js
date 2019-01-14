import React from 'react';
import { Query } from 'react-apollo';

const ApolloQuery = ({query, ...rest}) => Comp => (props) => (
    <Query query={query} {...rest}>
        {
            ({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;

                if (error) return <p>Error :(</p>;

                return (<Comp {...props} apolloData={data} />);
            }
        }
    </Query>
);

export default ApolloQuery;