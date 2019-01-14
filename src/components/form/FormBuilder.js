import React from 'react';
import { Field } from 'formik';
import { map as _map } from 'lodash';
// COMPONENTS
import renderNumberInput from 'components/form/renderNumberInput';
import renderDateInput from 'components/form/renderDateInput';
import renderRadio from 'components/form/renderRadio';
import renderRadioGroup from 'components/form/renderRadioGroup';
import renderCheckbox from 'components/form/renderCheckbox';
import renderCheckboxGroup from 'components/form/renderCheckboxGroup';
import renderSelect from 'components/form/renderSelect';
import renderTextInput from 'components/form/renderTextInput';
import renderFileInput from 'components/form/renderFileInput';


const FormBuilder = ({ formData, children, className }) => {
    let fields = [];

    _map(formData, (item, index) => {
        let component;

        switch(item.fieldType){
            case 'textInput':
                component = renderTextInput;
                break;
            case 'numberInput':
                component = renderNumberInput;
                break;
            case 'dateInput':
                component = renderDateInput;
                break;
            case 'select':
                component = renderSelect;
                break;
            case 'radio':
                component = renderRadio;
                break;
            case 'radioGroup':
                component = renderRadioGroup;
                break;
            case 'checkbox':
                component = renderCheckbox;
                break;
            case 'checkboxGroup':
                component = renderCheckboxGroup;
                break;
            case 'fileInput':
                component = renderFileInput;
                break;
            default:
                component = 'input';
        }

        fields.push({
            name: item.fieldName,
            label: item.label,
            value: item.value,
            options: item.options,
            placeholder: item.placeholder,
            validate: item.validate,
            fieldValidate: item.validate,
            component: component
        })
    });

    return(
        <div className={className}>
            {
                children && children(fields)
            }
        </div>
    );
};


export default FormBuilder;