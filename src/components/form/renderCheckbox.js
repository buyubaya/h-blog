import React from 'react';
import { FieldArray } from 'formik';
import { compose, withState, withHandlers, lifecycle, pure } from 'recompose';
import { Checkbox } from 'antd';
import { get as _get } from 'lodash';
import withInputError from '../HOCs/withInputError';


const renderCheckbox = ({ field, form, handleChange, label, defaultChecked }) => {
    const checked = _get(form, `values.${field.name}`) ? 
    (
        _get(form, `values.${field.name}`) ? true : false
    ) : defaultChecked;

    return(
        <div className='tuci-checkbox'>
            <Checkbox
                onChange={handleChange}
                checked={checked}
            >   
                {label}
            </Checkbox>
        </div>
    );
};


export default compose(
    pure,
    withInputError,
    withHandlers({
        handleChange: ({ field: { name }, form: { setFieldValue, setFieldTouched } }) => e => {
            setFieldValue && setFieldValue(name, e.target.checked);
            setFieldTouched && setFieldTouched(name, true);
        },

        handleBlur: ({ field: { name }, form: { setFieldTouched } }) => e => {
            setFieldTouched && setFieldTouched(name, true);
        }
    })
)(renderCheckbox);