import React from 'react';
import { Radio } from 'antd';
import { get as _get } from 'lodash';
import { compose, withState, withHandlers, lifecycle, pure } from 'recompose';
import withInputError from '../HOCs/withInputError';


const renderRadio = ({ 
    field, 
    form, 
    handleChange,
    handleBlur,
    label, 
    value, 
    defaultChecked 
}) => {
    const checked = _get(form, `values.${field.name}`) ? 
    (
        _get(form, `values.${field.name}`) === value ? true : false
    ) : defaultChecked;

    return(
        <div className='tuci-radio'>
            <Radio 
                onChange={handleChange}
                onBlur={handleBlur}
                checked={checked}
            >   
                {label}
            </Radio>
        </div>
    );
};


export default compose(
    pure,
    withHandlers({
        handleChange: ({ field: { name }, form: { setFieldValue, setFieldTouched }, value }) => e => {
            setFieldValue && setFieldValue(name, value);
            setFieldTouched && setFieldTouched(name, true);
        },

        handleBlur: ({ field: { name }, form: { setFieldTouched } }) => e => {
            setFieldTouched && setFieldTouched(name, true);
        }
    })
)(renderRadio);