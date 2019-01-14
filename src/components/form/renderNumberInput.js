import React from 'react';
import PropTypes from 'prop-types';
import { compose, withState, withHandlers, lifecycle, pure } from 'recompose';
import { Input } from 'antd';
import withInputError from '../HOCs/withInputError';


const formatNumber = value => {
    if(value){
        value += '';
        const list = value.split('.');
        const prefix = list[0].charAt(0) === '-' ? '-' : '';
        let num = prefix ? list[0].slice(1) : list[0];
        let result = '';
        while(num.length > 3){
            result = `,${num.slice(-3)}${result}`;
            num = num.slice(0, num.length - 3);
        }
        if(num) {
            result = num + result;
        }
        return `${prefix}${result}${/\./g.test(value) ? `.${list[1]}` : ''}`;
    }
    else {
        return undefined;
    }
}


const renderNumberInput = ({ 
    field, 
    form, 
    handleChange, 
    handleBlur, 
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
            onBlur={handleBlur}
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
            const value = e.target.value.toString().replace(/,/g, '');
            const reg = /^-?(0|[1-9][0-9]*)?(\.[0-9]*)?$/;
            if(reg.test(value) || value === '' || value === '-'){
                setFieldValue && setFieldValue(name, value);
            }
        },

        handleBlur: ({ field: { name, onBlur }, form: { setFieldValue } }) => e => {
            let value = e.target.value;

            if(value.charAt(value.length - 1) === '.'){
                setFieldValue && setFieldValue(name, value.replace(/[.,]/g, ''));
            }

            if(value === '' || value === '.' || value === '-'){
                setFieldValue && setFieldValue(name, undefined);
            }

            onBlur && onBlur(e);
        },

        handleKeyPress: () => e => {
            (   
                (e.key === '.' && /\./g.test(e.target.value)) ||
                (e.key === '-' && /-/g.test(e.target.value)) ||
                /[^0-9.-]/.test(e.key)
            ) && e.preventDefault();
        }
    }),
    lifecycle({
        componentWillReceiveProps(props){
            if(props.field.value != this.props.field.value){
                props.setFormattedValue && props.setFormattedValue(formatNumber(props.field.value));
            }
        }
    })
)(renderNumberInput);