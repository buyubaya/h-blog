import React, { Component } from 'react';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import RouterUrls from '../constants/RouterUrls';

const Breadcrumb = ({ path }) => {
    function getBreadCrumb(path, prefix='Home'){
        let tmp = [];

        let currentPath = path;
        while(currentPath !== ''){
            currentPath = RouterUrls.find(item => item.path === currentPath);
            if(currentPath){
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

    return(
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
                </main>
            </div>
        )
    }
}


export default AdminPage;