import React from 'react';
import { Mutation } from 'react-apollo';

const ApolloMutation = ({mutation, ...rest}) => Comp => (props) => (
    <Mutation mutation={mutation} {...rest}>
        {
            (action, { data }) => {
                return (<Comp {...props} mutationData={data} mutationAction={action} />);
            }
        }
    </Mutation>
);

export default ApolloMutation;