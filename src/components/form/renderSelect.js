import React from 'react';
import { PropTypes } from 'prop-types';
import { compose, pure, withHandlers } from 'recompose';
import { Select, Popconfirm, message, Input, Icon } from 'antd';
import { get as _get, map as _map } from 'lodash';
import withInputError from 'components/HOCs/withInputError';
import withApolloInputLoading from 'components/HOCs/withApolloInputLoading';


const renderSelect = ({
    field, 
    form, 
    placeholder, 
    options, 
    valueField, 
    textField,
    handleChange,
    handleBlur
}) => (
    <Select
        style={{ width: '100%' }}
        field={field}
        form={form}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        value={_get(form, `values.${field.name}`)}
    >
        {
            options &&
            _map(options, (item, index) =>
                <Select.Option key={index} value={item.value}>{item.label}</Select.Option>
            )
        }
    </Select>
);


export default compose(
    pure,
    withHandlers({
        handleChange: ({ field: { name }, form: { setFieldValue, setFieldTouched } }) => (value, option) => {
            setFieldValue && setFieldValue(name, value);
            setFieldTouched && setFieldTouched(name, true);
        },

        handleBlur: ({ field: { name }, form: { setFieldTouched } }) => e => {
            setFieldTouched && setFieldTouched(name, true);
        }
    }),
    withInputError
)(renderSelect);