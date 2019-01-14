import React from 'react';
import { Spin, Icon, Alert } from 'antd';
import { get as _get } from 'lodash';


const withApolloInputLoading = name => Comp => props => {
    const loading = name ? _get(props, `${name}.loading`) : _get(props, `loading`);
    const error = name ? _get(props, `${name}.error`) : _get(props, `error`);

    if(loading){
        return(
            <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}></Spin>
        );
    }
    if(error){
        return(
            <Spin>
                <Alert 
                    type='error'
                    message={`${error.message}`}
                />
            </Spin>
        );
    }
    return <Comp {...props} />;
};


export default withApolloInputLoading;