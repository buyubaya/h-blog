import React from 'react';
import { Row, Col, Button, Upload } from 'antd';
import { withFormik, Field, Formik, ErrorMessage } from 'formik';
import { lifecycle } from 'recompose';

// COMPONENTS
import FormBuilder from 'components/form/FormBuilder';
import FetchComponent from 'components/common/FetchComponent';


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
        label: 'Category',
        fieldName: 'category',
        fieldType: 'checkboxGroup',
        options_url: 'http://nodejs-book-api.herokuapp.com/api/category'
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
                    {data => 
                        data.map(item => {
                            if(item.options_url){
                                return(
                                    <FetchComponent 
                                        key={item.name}
                                        url={item.options_url} 
                                        onLoading={() => <h1>LOADING...</h1>}
                                        onSuccess={data => {
                                            const options = data.map(item => ({
                                                value: item._id,
                                                label: item.name
                                            }));
                                            return(
                                                <div>
                                                    <div>{item.label}</div>
                                                    <Field {...item} options={options} />
                                                </div>
                                            );
                                        }}
                                        onError={err => <h1>ERROR</h1>}
                                    />
                                );                                          
                            }
                            else {
                                return(
                                    <div key={item.name}>
                                        <div>{item.label}</div>
                                        <Field {...item} />
                                    </div>
                                );
                            }
                        })
                    }
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
                    name: 'some_photo.png',
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
    handleSubmit: (values, formikBag) => {
        formikBag.props.onSubmit && formikBag.props.onSubmit(values, formikBag);
    },
    validate: (values, props) => {
        let errors = {};

        // if(values.dob && !/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(values.dob)){
        //     errors.dob = 'ERROR';
        // }

        // errors.sex = 'ERROR';

        return errors;
    },
    validateOnChange: false,
    validateOnBlur: true
})(SampleForm);


class SamplePage extends React.Component {
    handleSubmit = (values, formikBag) => {
        console.log('SUBMIT', values);
        formikBag.setStatus({
            _error: 'HELLO'
        });
        formikBag.setValues({});
    }

    handleReset = (values, formikBag) => {
        console.log('RESET HAHA', values, formikBag);
    }

    render(){
        return(
            <div>
                <h1>SAMPLE PAGE</h1>  
                <SampleForm 
                    onSubmit={this.handleSubmit} 
                    onReset={this.handleReset}
                />
            </div>
        );
    }
}

export default SamplePage;