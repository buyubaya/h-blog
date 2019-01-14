import React from 'react';
import { compose, pure } from 'recompose';
import { withFormik, Field } from 'formik';
import * as Yup from 'yup';
// COMPONENTS
import FormBuilder from 'components/form/FormBuilder';
import { 
    FIELDS, 
    initialValues, 
    validationSchema, 
    handleSubmit 
} from 'components/TuciInputPage/TuciInputAction';
import { Button } from 'antd';


const TuciInputForm = (props) => {
    return(
        <div>
            <div className='tuci-box'>
                <FormBuilder formData={FIELDS}>
                    {data => (
                        data.map((item, index) => 
                            <div key={index}>
                                <div>{item.label}</div>
                                <Field {...item} />
                            </div>
                        )
                    )}
                </FormBuilder>
                <Button onClick={props.handleReset}>Reset</Button>
                <Button onClick={props.handleSubmit}>Submit</Button>
            </div>

            <pre>{JSON.stringify(props, null, 4)}</pre>
        </div>
    );
};


export default compose(
    pure,
    withFormik({
        displayName: 'TuciInputForm',
        mapPropsToValues: initialValues,
        validationSchema,
        handleSubmit
    })
)(TuciInputForm);