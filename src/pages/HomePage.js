import React from 'react';
import { compose } from 'redux';
import { Query, Mutation, graphql } from "react-apollo";
import gql from "graphql-tag";
import { get as _get, map as _map } from 'lodash';
// COMPONENTS
import TuCiBox from 'components/home/TuCiBox';


class HomePage extends React.Component {
    render(){
        return <TuCiBox />;
    }
}


// QUERY
const moneyCategoriesQuery = gql`
{
    moneyCategories {
        id
        name
    }
}
`;


export default compose(
    graphql(moneyCategoriesQuery, {name: 'moneyCategoriesData'})
)(HomePage);

