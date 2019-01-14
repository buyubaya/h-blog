import React from 'react';
import { Alert } from 'antd';
import { get as _get } from 'lodash';


const withInputError = Comp => ({...props, showError=true}) => {
    const fieldName = _get(props, 'field.name');
    const touched = _get(props, `form.touched.${fieldName}`);
    const error = _get(props, `form.errors.${fieldName}`);

    return(
        <div className={(touched && error) ? 'tuci-inputGroup has-error' : 'tuci-inputGroup'}>
            <Comp {...props} />
            {   
                showError &&
                touched && error &&
                <Alert type='error' message={error} />
            }
        </div>
    );
};


export default withInputError;

    
