import React from 'react';
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
// COMPONENTS
import LoginForm from 'components/LoginPage/LoginForm';


const LoginPage = () => (
    <div>
        <LoginForm />
    </div>
);


export default LoginPage;