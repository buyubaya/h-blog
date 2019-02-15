import React from 'react';
import { compose } from 'recompose';
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
// COMPONENTS
import LoginForm from 'components/LoginPage/LoginForm';
import withBreadcrumb from 'components/HOCs/withBreadcrumb';


const LoginPage = () => (
    <div className='login-page'>
        <section className='section'>
            <LoginForm />
        </section>
    </div>
);


export default compose(
    withBreadcrumb('login-page-container')
)(LoginPage);