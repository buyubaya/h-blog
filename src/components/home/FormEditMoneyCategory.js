import React from 'react';
import { PropTypes } from 'prop-types';
import { compose } from 'redux';
import { Query, Mutation, graphql } from "react-apollo";
import gql from "graphql-tag";
import { Button, Select, Popconfirm, message, Input, Icon } from 'antd';
import { get as _get, map as _map } from 'lodash';
import { Formik, Field } from 'formik';
import renderTextInput from '../form/renderTextInput';


class FormEditMoneyCategory extends React.PureComponent {
    constructor(){
        super();

        this.cancelEdit = this.cancelEdit.bind(this);
    }

    static propTypes = {
        editItem: PropTypes.object
    };

    static contextTypes = {
        moneyType: PropTypes.number,
        setTab: PropTypes.func
    };

    cancelEdit(){
        this.context.setTab && this.context.setTab('1');
    }

    render(){
        const text = _get(this.props, 'editItem.payload.text');
        const moneyType = _get(this.context, 'moneyType');

        return(
            <Formik
                initialValues={{ name: text, moneyType }}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(false);
                    }, 1000);
                    // this.confirmEdit({id: item.id, name: values.editName});
                }}
                render={({handleSubmit}) => 
                    <React.Fragment>
                        <span onClick={e => e.stopPropagation()}>
                            <Field 
                                name='name'
                                component={renderTextInput}
                            />
                        </span>
                        <Button onClick={this.cancelEdit}>
                            <Icon 
                                type="close" 
                                theme="outlined" 
                                className='icon-close' 
                            />
                        </Button>
                        <Button onClick={handleSubmit}>
                            <Icon 
                                type="check" 
                                theme="outlined" 
                                className='icon-check' 
                            />
                        </Button>
                    </React.Fragment>
                }
            />
        );
    }
}


export default FormEditMoneyCategory;