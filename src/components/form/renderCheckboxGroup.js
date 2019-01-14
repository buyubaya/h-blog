import React from 'react';
import { Field } from 'formik';
import { Checkbox } from 'antd';
import renderCheckbox from 'components/form/renderCheckbox';


const renderCheckboxGroup = ({ 
    field, 
    form, 
    options,
    fieldValidate
}) => (
    <div className='tuci-checkbox-group'>
        {
            options &&
            options.map((item, index) =>
                <Field 
                    key={index}
                    name={`${field.name}.${item.value}`}
                    value={item.value}
                    label={item.label}
                    component={renderCheckbox}
                    validate={fieldValidate}
                />
            )
        }
    </div>
);


export default renderCheckboxGroup;