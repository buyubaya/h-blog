import React from 'react';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import RouterUrls from 'constants/RouterUrls';


class Breadcrumb extends React.Component {
    getBreadCrumb(path, prefix='Home'){
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

    render(){
        const path = this.props.match && this.props.match.path;
        const bc = this.getBreadCrumb(path);

        return(
            <div>
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

                <div className='pageHeader'>
                    <div className='pageTitle'>{bc.pop()}</div>
                </div>
            </div>
        );
    }
}


export default Breadcrumb;