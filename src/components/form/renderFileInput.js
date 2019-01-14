import React from 'react';
import { compose, pure, withState, withHandlers, lifecycle } from 'recompose';
import { Upload, Icon } from 'antd';


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
            listType="picture-card"
            fileList={fileList}
            onRemove={handleRemove}
            beforeUpload={handleBeforeUpload}
            onChange={handleChange}
            showUploadList={{ showPreviewIcon: false }}
        >
            <div>
                <Icon type={'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        </Upload>
    </div>
);


export default compose(
    pure,
    withState('fileList', 'setFileList', []),
    withHandlers({
        handleBeforeUpload: props => file => false,

        handleChange: ({ field: { name }, form: { setFieldValue }, setFileList }) => ({ file, fileList, event }) => {
            setFileList && setFileList(fileList);
            fileList = fileList.map(({ thumbUrl, ...rest }) => rest);
            setFieldValue && setFieldValue(name, fileList);
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