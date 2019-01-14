import React from 'react';
import { Field } from 'formik';
import { Radio } from 'antd';
import renderRadio from './renderRadio';
import { compose, pure } from 'recompose';
import withInputError from '../HOCs/withInputError';


const renderRadioGroup = ({ 
    field, 
    form, 
    options,
    fieldValidate
}) => (
    <div className='tuci-radio-group'>
        {
            options &&
            options.map((item, index) =>
                <Field 
                    key={index}
                    name={field.name}
                    value={item.value}
                    label={item.label}
                    component={renderRadio}
                    validate={fieldValidate}
                />
            )
        }
    </div>
);


export default compose(
    pure,
    withInputError
)(renderRadioGroup);