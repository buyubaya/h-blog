import React, { Component } from 'react';
import {
    Breadcrumb as AntBreadcrumb,
    Table,
    Form, Select, InputNumber, Switch, Radio,
    Slider, Button, Upload, Icon, Rate, Checkbox,
    Row, Col,
    Card
} from 'antd';
import RouterUrls from '../constants/RouterUrls';

const Breadcrumb = ({ path }) => {
    function getBreadCrumb(path, prefix = 'Home') {
        let tmp = [];

        let currentPath = path;
        while (currentPath !== '') {
            currentPath = RouterUrls.find(item => item.path === currentPath);
            if (currentPath) {
                tmp.unshift(currentPath.label);
                currentPath = currentPath.path.split('/').slice(0, -1).join('/');
            }
            else {
                break;
            }
        }
        tmp.unshift(prefix);

        return tmp;
    }

    const bc = getBreadCrumb(path);

    return (
        <div className='breadcrumb-area'>
            <AntBreadcrumb>
                {
                    bc && bc.map((item, index) =>
                        <AntBreadcrumb.Item key={index}>
                            {item}
                        </AntBreadcrumb.Item>
                    )
                }
            </AntBreadcrumb>
        </div>
    );
};


const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
}, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '12%',
    render: (text, record) => <img src={'http://transcosmos.co.uk/wp-content/uploads/2015/09/google_logo_03-818x600.jpg'} className='table-image' />
}, {
    title: 'Address',
    dataIndex: 'address',
    width: '30%',
    key: 'address',
}];
const data = [{
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
        {
            key: 11,
            name: 'John Brown',
            age: 42,
            address: 'New York No. 2 Lake Park',
        },
        {
            key: 12,
            name: 'John Brown jr.',
            age: 30,
            address: 'New York No. 3 Lake Park',
            children: [{
                key: 121,
                name: 'Jimmy Brown',
                age: 16,
                address: 'New York No. 3 Lake Park',
            }
            ],
        }, {
            key: 13,
            name: 'Jim Green sr.',
            age: 72,
            address: 'London No. 1 Lake Park',
            children: [{
                key: 131,
                name: 'Jim Green',
                age: 42,
                address: 'London No. 2 Lake Park',
                children: [{
                    key: 1311,
                    name: 'Jim Green jr.',
                    age: 25,
                    address: 'London No. 3 Lake Park',
                }, {
                    key: 1312,
                    name: 'Jimmy Green sr.',
                    age: 18,
                    address: 'London No. 4 Lake Park',
                }],
            }],
        }],
}, {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}];
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
    },
};


class AdminPage extends Component {
    render() {
        const { match } = this.props;

        return (
            <div>
                <aside className='admin-sidebar-area'>
                    <ul className='admin-sidebar-list'>
                        <li className='admin-sidebar-list-item'>
                            <span>Theme</span>
                            <ul className='admin-sidebar-sublist'>
                                <li className='admin-sidebar-list-item'>
                                    <span><i className='fa fa-tint mr10'></i>Color</span>
                                    <span><i className='fa fa-font mr10'></i>Typography</span>
                                </li>
                            </ul>
                        </li>
                        <li className='admin-sidebar-list-item'>
                            <span>Components</span>
                            <ul className='admin-sidebar-sublist'>
                                <li className='admin-sidebar-list-item'>
                                    <span><i className='fa fa-table mr10'></i>Table</span>
                                </li>
                                <li className='admin-sidebar-list-item'>
                                    <span><i className='fa fa-object-ungroup mr10'></i>Form</span>
                                </li>
                                <li className='admin-sidebar-list-item'>
                                    <span><i className='fa fa-list mr10'></i>List</span>
                                </li>
                                <li className='admin-sidebar-list-item'>
                                    <span><i className='fa fa-paper-plane mr10'></i>Card</span>
                                </li>
                                <li className='admin-sidebar-list-item'>
                                    <span><i className='fa fa-code mr10'></i>Editor</span>
                                </li>
                                <li className='admin-sidebar-list-item'>
                                    <span><i className='fa fa-puzzle-piece mr10'></i>Chart</span>
                                </li>
                                <li className='admin-sidebar-list-item'>
                                    <span><i className='fa fa-bell mr10'></i>Notification</span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </aside>
                <main className='admin-main-area'>
                    {
                        match && match.path && <Breadcrumb path={match.path} />
                    }

                    <div className='table-area'>
                        <Table
                            columns={columns}
                            rowSelection={rowSelection}
                            dataSource={data}
                            bordered
                            title={() => 'Header'}
                            footer={() => 'Footer'}
                        />
                    </div>

                    <SampleForm />
                </main>
            </div>
        )
    }
}


class DemoForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        return (
            <div className='admin-form-area'>
                <Card loading={0}>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item
                            label="Plain Text"
                        >
                            <span className="ant-form-text">China</span>
                        </Form.Item>
                        <Form.Item
                            label="Select"
                            hasFeedback
                        >
                            {getFieldDecorator('select', {
                                rules: [
                                    { required: true, message: 'Please select your country!' },
                                ],
                            })(
                                <Select placeholder="Please select a country">
                                    <Select.Option value="china">China</Select.Option>
                                    <Select.Option value="usa">U.S.A</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item
                            label="InputNumber"
                        >
                            {getFieldDecorator('input-number', { initialValue: 3 })(
                                <InputNumber min={1} max={10} />
                            )}
                            <span className="ant-form-text">machines</span>
                        </Form.Item>
                        <Form.Item
                            label="Upload"
                        >
                            {getFieldDecorator('upload', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile,
                            })(
                                <Upload name="logo" action="/upload.do" listType="picture">
                                    <Button>
                                        <Icon type="upload" /> Click to upload
                                    </Button>
                                </Upload>
                            )}
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{ span: 12, offset: 6 }}
                        >
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}
const SampleForm = Form.create({ name: 'validate_other' })(DemoForm);


export default AdminPage;