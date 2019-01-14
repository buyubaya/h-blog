import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { compose, pure } from 'recompose';
import withInputError from '../HOCs/withInputError';


const renderNumberInput = ({ 
    field, 
    form, 
    placeholder 
}) => (
    <Input
        {...field}
        placeholder={placeholder}
    />
);


export default compose(
    pure,
    withInputError
)(renderNumberInput);