import React from 'react';
import { PropTypes } from 'prop-types';
import { compose } from 'redux';
import { Query, Mutation, graphql } from "react-apollo";
import gql from "graphql-tag";
import { get as _get, map as _map } from 'lodash';
// ANTD
import { Row, Col,Button } from 'antd';
import { Spin, Icon, Alert, Input } from 'antd';
// FORMIK
import { withFormik, Field, Formik, ErrorMessage } from 'formik';
// COMPONENTS
import renderTextInput from 'components/form/renderTextInput';
import renderNumberInput from 'components/form/renderNumberInput';
import renderDateInput from 'components/form/renderDateInput';
import renderRadio from 'components/form/renderRadio';
import renderCheckbox from 'components/form/renderCheckbox';
import renderMegaSelect from 'components/home/renderMegaSelect';
import withApolloInputLoading from 'components/HOCs/withApolloInputLoading';

import FormAddReason from 'components/home/FormAddReason';
// QUERY
const userId = 'WNSd8A8IKnOKWmfw3yJlipKgcJE3';
const moneyCategoriesQuery = gql`
{
    moneyCategories{
        id
        name
    }
}`;
const mutate = gql`
    mutation removeMoneyCategory($id: ID!){
        removeMoneyCategory(id: $id)
    }
`;
const addMoneyCategoryMutation = gql`
    mutation addMoneyCategory($name: String!, $moneyType: Int!, $userId: ID!){
        addMoneyCategory(name: $name, moneyType: $moneyType, userId: $userId)
    }
`;
const updateMoneyCategoryMutation = gql`
    mutation updateMoneyCategory($id: ID!, $name: String){
        updateMoneyCategory(id: $id, name: $name)
    }
`;


class MoneyMegaForm extends React.PureComponent {
    static contextTypes = {
        setEditItem: PropTypes.func,
        setTab: PropTypes.func,
        moneyType: PropTypes.number
    };

    render(){
        const { moneyCategories, handleReset, handleSubmit, handleAdd, handleChange } = this.props;

        return(
            <div>
                <Field 
                    name='moneyValue'
                    component={renderNumberInput}
                    placeholder='Input a number'
                />

                <Field
                    name='moneyCategory'
                    component={renderMegaSelect}
                    placeholder='Select a reason'
                    // options={_get(data,'moneyCategories')}
                    // options={[{ id: 1, name: 'LALALA' }]}
                    valueField='id'
                    textField='name'
                    onChange={handleChange}
                    context={this.context}
                />

                {/* <Query query={moneyCategoriesQuery}>
                    {
                        ({loadig, error, data}) => (
                            <Field
                                name='moneyCategory'
                                component={renderMegaSelect}
                                placeholder='Select a reason'
                                options={_get(data,'moneyCategories')}
                                valueField='id'
                                textField='name'
                                loadig={loadig}
                                error={error}
                                onChange={handleChange}
                                context={this.context}
                            />
                        )
                    }
                </Query> */}

                <div>
                    <Button type='button' onClick={handleReset}>
                        <Icon 
                            type="undo" 
                            theme="outlined" 
                        />
                    </Button>
                    <Button type='button' onClick={handleSubmit}>
                        <Icon 
                            type="check" 
                            theme="outlined" 
                        />
                    </Button>
                </div>
            </div>
        );
    }
}

// const MoneyMegaForm = ({ moneyCategories, handleReset, handleSubmit, handleAdd, handleChange }, context) => {
//     console.log('-----', context);

//     return(
        
//     );
// }

// MoneyMegaForm.contextTypes = {
//     setEditItem: PropTypes.func
// };


export default withFormik({
    displayName: 'sampleForm',
    mapPropsToValues: ({ moneyType }) => ({
        moneyType
    }),
    onReset: () => {
        console.log('reset');
    },
    handleSubmit: (values, bag) => {
        console.log('SUBMIT', values, bag);
        bag.setValues({});
    },
    handleAdd: (values, bag) => {
        console.log('ADD');
    },
    validate: (values, props) => {
        let errors = {};

        return errors;
    }
})(MoneyMegaForm);