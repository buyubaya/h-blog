import React from 'react';
import { compose, pure, withState, withHandlers, lifecycle } from 'recompose';
import { Upload, Button, Icon } from 'antd';


const renderFileInput = ({ 
    field, 
    form, 
    action, 
    fileList, 
    handleBeforeUpload, 
    handleRemove, 
    handleChange 
}) => (
    <div className='tuci-fileInput'>
        <Upload
            action={action}
            // listType="picture-card"
            fileList={fileList}
            onRemove={handleRemove}
            beforeUpload={handleBeforeUpload}
            onChange={handleChange}
            showUploadList={{ showPreviewIcon: false }}
        >
            <Button>
                <Icon type={'upload'} />Select file
            </Button>
        </Upload>
    </div>
);


export default compose(
    pure,
    withState('fileList', 'setFileList', []),
    withHandlers({
        handleBeforeUpload: ({ fileList, setFileList }) => file => {
            setFileList && setFileList([...fileList, file]);
            return false;
        },

        handleChange: ({ field: { name }, form: { setFieldValue }, setFileList }) => ({ file, fileList, event }) => {
            setFileList && setFileList(fileList);
            // fileList = fileList.map(({ name, size, type, thumbUrl, ...rest }) => { name, size, type });
            setFieldValue && setFieldValue(name, fileList);
        },

        handleRemove: ({ field: { name }, form: { setFieldValue }, fileList, setFileList }) => file => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList && setFileList(newFileList);
            setFieldValue && setFieldValue(name, newFileList);
        }
    }),
    lifecycle({
        componentWillReceiveProps({ field: { value }, setFileList }){
            if(value !== this.props.field.value){
                setFileList && setFileList(value || []);
            }
        }
    })
)(renderFileInput);