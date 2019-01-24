import React from 'react';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import RouterUrls from 'constants/RouterUrls';


class Breadcrumb extends React.Component {
    formatRouterUrls(RouterUrls){
        let tmp = {};

        RouterUrls.forEach(item => {
            let breadcrumb = item.path.split('/') || [];
            tmp[item.path] = {
                ...item,
                breadcrumb
            };
        });

        return tmp;
    }

    render(){
        const path = this.props.match && this.props.match.path;
        const formattedRouterUrls = this.formatRouterUrls(RouterUrls);
        const bc = formattedRouterUrls[path]['breadcrumb'];

        return(
            <div>
                <div className='breadcrumb-area'>
                    <AntBreadcrumb>
                        {
                            bc && bc.map((item, index) =>
                                <AntBreadcrumb.Item key={index}>
                                    {item === '' ? 'Home' : item}
                                </AntBreadcrumb.Item>
                            )
                        }
                    </AntBreadcrumb>
                </div>

                <div className='pageHeader'>
                    <div className='pageTitle'>{formattedRouterUrls[path]['label']}</div>
                </div>
            </div>
        );
    }
}


export default Breadcrumb;