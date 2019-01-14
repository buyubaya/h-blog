import React from 'react';
import { PropTypes } from 'prop-types';
import { compose } from 'recompose';
// FORM
import { Formik, Field } from 'formik';
import renderTextInput from 'components/form/renderTextInput';
import renderRadio from 'components/form/renderRadio';
// ATND
import { Button } from 'antd';
// APOLLO
import { graphql } from "react-apollo";
import gql from "graphql-tag";
// CONST
const userId = 'WNSd8A8IKnOKWmfw3yJlipKgcJE3';
const addReasonMutation = gql`
    mutation addMoneyCategory($name: String!, $moneyType: Int!, $userId: ID!){
        addMoneyCategory(name: $name, moneyType: $moneyType, userId: $userId)
    }
`;
// ACTION
const submit = props => (values, actions) => {

    props.addMoneyCategory && props.addMoneyCategory({ variables: { 
        name: values.item,
        moneyType: values.moneyType,
        userId
    }})
    .then(data => console.log('success'))
    .catch(error => console.log('error'));
};


class FormAddReason extends React.Component {
    static propTypes = {
        moneyType: PropTypes.number,
        addMoneyCategory: PropTypes.func,
        onAddMoneyCategory: PropTypes.func
    }

    render(){
        const { moneyType } = this.props;

        return(
            <Formik 
                initialValues={{ moneyType }}
                enableReinitialize
                onSubmit={submit(this.props)}
                render={
                    ({ handleSubmit }) =>
                    <div className='tuci-form-addReason'>
                        <Field 
                            name='moneyType'
                            value='1'
                            component={renderRadio}
                            label='TU'
                            defaultChecked={moneyType == 1}
                        />
                        <Field 
                            name='moneyType'
                            value='2'
                            component={renderRadio}
                            label='CI'
                            defaultChecked={moneyType == 2}
                        />
                        <Field 
                            name='item'
                            component={renderTextInput}
                        />
                        <Button type='primary' onClick={handleSubmit}>ADD</Button>
                    </div>
                }
            />
        );
    }
} 


export default compose(
    graphql(addReasonMutation, { name: 'addMoneyCategory' })
)(FormAddReason);