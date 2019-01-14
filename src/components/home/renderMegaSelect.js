import React from 'react';
import { PropTypes } from 'prop-types';
import { compose } from 'redux';
import { Select, Popconfirm, message, Input, Icon } from 'antd';
import { get as _get, map as _map, filter as _filter } from 'lodash';
import withInputError from 'components/HOCs/withInputError';
import withApolloInputLoading from 'components/HOCs/withApolloInputLoading';
import { Formik, Field } from 'formik';
// RECOMPOSE
import { withState, withHandlers, mapProps } from 'recompose';
// APOLLO
import { graphql } from "react-apollo";
// QUERY & MUTATION
import { moneyCategoriesQuery } from 'apollo/home/Query';
import { removeMoneyCategoryMutation } from 'apollo/home/Mutation';


let CustomSelect = ({ 
    field, 
    form, 
    placeholder, 
    options, 
    defaultValue, 
    valueField, 
    textField, 
    removeMoneyCategory, 
    handleChange, 
    handleEdit, 
    handleDelete, 
    handleVisibleChange, 
    context
}) => {
    return(
    <Select
        value={_get(field, 'value')}
        onChange={handleChange}
        showSearch
        style={{ width: '100%' }}
        placeholder={placeholder}
        optionFilterProp="children"
        filterOption={true}
        optionFilterProp='text'
    >
        {
            _map(options, item => {
                const value = item[valueField || 'value'];
                const label = item[textField || 'label'];

                return(
                    <Select.Option 
                        key={value} 
                        value={value}
                        text={label}
                    >
                        <span>{label}</span>     
                        <Popconfirm 
                            title="Are you sure delete this item?" 
                            onConfirm={handleDelete(value)}
                            okText="Yes" 
                            cancelText="No"
                        >
                            <span className='span-icon' onClick={e => e.stopPropagation()}>
                                <Icon 
                                    type="close" 
                                    theme="outlined" 
                                    className='icon-close' 
                                />
                            </span>
                        </Popconfirm>
                        <span className='span-icon'>
                            <Icon 
                                type="edit" 
                                theme="outlined" 
                                className='icon-edit' 
                                onClick={handleEdit({id: value, text: label})}
                            />
                        </span>                         
                    </Select.Option>
                );
            })
        }
    </Select>
    )
}

const options = () => {
    return {
        options: ({ context }) => {
            return({ 
                variables: { moneyType: context.moneyType },
                fetchPolicy: 'network-only'
            });
        }
    }
}

const Enhancer = compose(
    graphql(moneyCategoriesQuery, {
        options: ({ context }) => ({
            variables: { moneyType: context.moneyType },
            fetchPolicy: 'cache-and-network'
        })
    }),
    graphql(removeMoneyCategoryMutation, { name: 'removeMoneyCategory' }),
    withApolloInputLoading('data'),
    mapProps(props => ({ ...props, options: _get(props,'data.moneyCategories') })),
    withState('options', 'setOptions', props => props.options),
    withHandlers({
        handleChange: ({ field, form }) => (value, option) => form.setFieldValue(field.name, value),

        handleEdit: ({ context }) => payload => e => {
            e.stopPropagation();
            
            _get(context, 'setEditItem') && 
            _get(context, 'setEditItem')({ type: 'moneyCategory', payload });

            _get(context, 'setTab') && _get(context, 'setTab')('3');
        },

        handleDelete: ({ setOptions, removeMoneyCategory }) => id => e => {
            e.stopPropagation();
            setOptions(options => _filter(options, item => item.id !== id));
            removeMoneyCategory({ variables: { id } });
            message.success('Item has been deleted');
        }
    })
);


CustomSelect = Enhancer(CustomSelect);


const renderSelect = ({
    field, 
    form, 
    placeholder, 
    options, 
    defaultValue, 
    valueField, 
    textField, 
    removeMoneyCategory, 
    context
}) => (
    <CustomSelect
        field={field}
        form={form}
        placeholder={placeholder}
        options={options}
        defaultValue={defaultValue}
        valueField={valueField}
        textField={textField}
        removeMoneyCategory={removeMoneyCategory}
        context={context}
    />
);


export default withInputError(renderSelect);