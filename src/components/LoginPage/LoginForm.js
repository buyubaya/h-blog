import React from 'react';
import { compose, pure } from 'recompose';
import { withFormik, Field } from 'formik';
// COMPONENTS
import FormBuilder from 'components/form/FormBuilder';
import { 
    FIELDS, 
    initialValues, 
    validationSchema, 
    handleSubmit 
} from 'components/LoginPage/LoginAction';
import { Button } from 'antd';


const LoginForm = ({ handleReset, handleSubmit }) => (
    <div className='login-form-area card-item'>
        <FormBuilder formData={FIELDS}>
            {data => (
                data.map((item, index) => 
                    <div key={index} className='mb20'>
                        <div>{item.label}</div>
                        <Field {...item} />
                    </div>
                )
            )}
        </FormBuilder>
        <Button onClick={handleReset} className='mr20'>Reset</Button>
        <Button onClick={handleSubmit}>Submit</Button>
    </div>
);


export default compose(
    pure,
    withFormik({
        displayName: 'LoginForm',
        mapPropsToValues: initialValues,
        validationSchema,
        handleSubmit
    })
)(LoginForm);