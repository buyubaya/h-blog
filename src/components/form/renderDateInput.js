import React from 'react';
import PropTypes from 'prop-types';
import { compose, withState, withHandlers, lifecycle, pure } from 'recompose';
import { Input } from 'antd';
import withInputError from '../HOCs/withInputError';


const renderDateInput = ({
    field, 
    form, 
    handleChange, 
    handleKeyPress, 
    formattedValue, 
    placeholder 
}) => (
    <div className='tuci-input'>
        <Input
            name={field.name}
            type='text'
            value={formattedValue}
            onChange={handleChange}
            onBlur={field.onBlur}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
        />
    </div>
);


export default compose(
    pure,
    withInputError,
    withState('formattedValue', 'setFormattedValue', ''),
    withHandlers({
        handleChange: ({ field: { name }, form: { setFieldValue } }) => e => {
            let value = e.target.value;
            setFieldValue && setFieldValue(name, value);
        },

        handleKeyPress: ({ setFormattedValue }) => e => {
            (
                (e.key === '/' && e.target.value.substr(-1, 1) === '/') ||
                (e.key === '/' && e.target.value.split('/').length >= 3) ||
                /[^0-9/]/.test(e.key)
            ) && e.preventDefault();
    
            if(/[0-9]/.test(e.key)){
                if(/^([0-9]{2}|([0-9]{2}\/[0-9]{2}))$/.test(e.target.value)){
                    const formattedValue = e.target.value + '/';
                    setFormattedValue && setFormattedValue(formattedValue);
                }
            }
        }
    }),
    lifecycle({
        componentWillReceiveProps(props){
            if(props.field.value != this.props.field.value){
                props.setFormattedValue && props.setFormattedValue(props.field.value);
            }
        }
    })
)(renderDateInput);