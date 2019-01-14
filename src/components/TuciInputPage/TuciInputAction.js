import * as Yup from 'yup';


export const FIELDS = [
    {
        fieldName: 'tuciType',
        fieldType: 'radioGroup',
        options: [
            {value: 'tu', label: 'TU'},
            {value: 'ci', label: 'CI'}
        ]
    },
    {
        fieldName: 'tuciValue',
        fieldType: 'numberInput',
        placeholder: 'Input money'
    },
    {
        fieldName: 'tuciCategory',
        fieldType: 'select',
        placeholder: 'Select category',
        options: [
            {value: '', label: 'Select category'},
            {value: 'com', label: 'COM'},
            {value: 'xang', label: 'XANG'}
        ],
        defaultValue: ''
    },
    {
        fieldName: 'tuciNote',
        fieldType: 'textInput',
        placeholder: 'Note'
    },
];


export const initialValues = () => ({
    tuciType: undefined,
    tuciValue: undefined,
    tuciCategory: undefined,
    tuciNote: undefined
});


export const validationSchema = Yup.object().shape({
    tuciType: Yup.string().required('Required'),
    tuciValue: Yup.number().required('Required'),
    tuciCategory: Yup.string().required('Required'),
    tuciNote: Yup.string()
});


export const handleSubmit = (values, actions) => {
    console.log('submit', values, actions);
};