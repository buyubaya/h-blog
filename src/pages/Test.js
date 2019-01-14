import React from 'react';
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

const GQL = gql`
    {
        monies {
            id
            value
            created
            moneyCategoryId
        }
    }
`;

const ADD_TODO = gql`
    mutation Test($id: String) {
        test(id: $id){
            id
            haha{
                id
                text
            }
        }
    }
`;

const Test = () => (
    <Query query={GQL}>
        {
            ({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

                return(
                    <Mutation mutation={ADD_TODO}>
                        {(addTodo, { data }) => (
                            <div onClick={e => addTodo({ variables: {id: 'HAHAHA'} })}>
                                Click
                            </div>
                        )}
                    </Mutation>);
            }
        }
    </Query>
);

export default Test;