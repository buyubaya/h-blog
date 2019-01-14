import React from 'react';
import { Row, Col, Button, Upload } from 'antd';
import { withFormik, Field, Formik, ErrorMessage } from 'formik';
import { lifecycle } from 'recompose';

// COMPONENTS
import FormBuilder from 'components/form/FormBuilder';

const required = value => !value ? 'Required' : undefined;

const FIELDS_DB = [
    {
        label: 'Name',
        fieldName: 'name',
        fieldType: 'textInput',
        placeholder: 'Input name'
    },
    {
        label: 'Age',
        fieldName: 'age',
        fieldType: 'numberInput',
        placeholder: 'Input age'
    },
    {
        label: 'Date of birth',
        fieldName: 'dob',
        fieldType: 'dateInput',
        placeholder: 'Input birthdate'
    },
    {
        label: 'Title',
        fieldName: 'title',
        fieldType: 'select',
        placeholder: 'Select title',
        options: [
            {value: 'mr', label: 'Mr'},
            {value: 'mrs', label: 'Mrs'},
            {value: 'sir', label: 'Sir'},
            {value: 'madam', label: 'Madam'}
        ]
    },
    {
        label: 'Sexuality',
        fieldName: 'sex',
        fieldType: 'radioGroup',
        options: [
            {value: 'male', label: 'Male'},
            {value: 'female', label: 'Female'}
        ]
    },
    {
        label: 'Hobbies',
        fieldName: 'hobbies',
        fieldType: 'checkboxGroup',
        options: [
            {value: 'football', label: 'Football'},
            {value: 'basketball', label: 'Basketball'},
            {value: 'swimming', label: 'Swimming'},
            {value: 'climbing', label: 'Climbing'}
        ]
    },
    {
        label: 'Photos',
        fieldName: 'photos',
        fieldType: 'fileInput',
        action: '/'
    }
];


// FORM
let SampleForm = (props) => {    
    return(
        <Row gutter={16}>

            <Col span={12}>
                <FormBuilder formData={FIELDS_DB}>
                    {data => (
                        data.map((item, index) => 
                            <div key={index}>
                                <div>{item.label}</div>
                                <Field {...item} validate={required} />
                            </div>
                        )
                    )}
                </FormBuilder>

                <div>
                    <Button type='button' onClick={props.handleReset}>RESET</Button>
                    <Button type='button' onClick={props.handleSubmit}>Submit</Button>
                </div>

                <div>
                    ERRORS: <ErrorMessage name='dob' />
                </div>

            </Col>

            <Col span={12}>
                <pre>
                    {JSON.stringify(props, null, 4)}
                </pre>   
            </Col>
            
        </Row>
    );
};
SampleForm = lifecycle({
    componentWillMount(){
        this.props.setValues && this.props.setValues({
            name: 'Some Name',
            title: 'mrs',
            // age: null,
            // dob: null,
            sex: 'female',
            hobbies: {
                climbing: true
            },
            photos: [
                {
                    uid: '-1',
                    name: 'default.png',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                }
            ]
        });
    }
})(SampleForm);
SampleForm = withFormik({
    displayName: 'sampleForm',
    enableReinitialize: true,
    // mapPropsToValues: props => ({
    //     name: 'Some Name',
    //     title: 'mrs',
    //     age: null,
    //     dob: null,
    //     sex: 'female',
    //     hobbies: {
    //         climbing: true
    //     }
    // }),
    onReset: (values, bag) =>{
        console.log('RESET', bag);
    },
    handleSubmit: (values, bag) => {
        bag.setStatus({
            _error: 'HELLO'
        });
        bag.setValues({});
    },
    validate: (values, props) => {
        let errors = {};

        if(values.dob && !/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(values.dob)){
            errors.dob = 'ERROR';
        }

        // errors.sex = 'ERROR';

        return errors;
    },
    validateOnChange: false,
    validateOnBlur: true
})(SampleForm);


class SamplePage extends React.Component {
    render(){
        return(
            <div>
                <h1>SAMPLE PAGE</h1>  
                <SampleForm />
            </div>
        );
    }
}

export default SamplePage;