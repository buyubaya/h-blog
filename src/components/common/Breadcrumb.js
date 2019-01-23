import React from 'react';
import { Breadcrumb as AntBreadcrumb } from 'antd';


class Breadcrumb extends React.Component {
    render(){
        const { matchPath } = this.props;
        const bc = matchPath.split('/');

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
                    <div className='pageTitle'>{bc && bc[bc.length - 1]}</div>
                </div>
            </div>
        );
    }
}


export default Breadcrumb;