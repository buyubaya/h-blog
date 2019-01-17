import React from 'react';
import { Breadcrumb } from 'antd';


class MainBreadcrumb extends React.Component {
    render(){
        return(
            <div>
                <div className='breadcrumb-area'>
                    <Breadcrumb>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item><a href="">Application Center</a></Breadcrumb.Item>
                        <Breadcrumb.Item><a href="">Application List</a></Breadcrumb.Item>
                        <Breadcrumb.Item>An Application</Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <div className='pageHeader'>
                    <div className='pageTitle'>POSTS</div>
                </div>
            </div>
        );
    }
}


export default MainBreadcrumb;