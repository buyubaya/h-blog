import * as Yup from 'yup';


export const FIELDS = [
    {
        fieldName: 'userName',
        fieldType: 'textInput',
        placeholder: 'User name'
    },
    {
        fieldName: 'password',
        fieldType: 'textInput',
        placeholder: 'Password'
    }
];


export const initialValues = () => ({
    userName: undefined,
    password: undefined
});


export const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Required'),
    password: Yup.string().required('Required')
});


export const handleSubmit = (values, actions) => {
    console.log('submit', values, actions);
};