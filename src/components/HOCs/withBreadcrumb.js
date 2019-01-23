import React from 'react';
import Breadcrumb from 'components/common/Breadcrumb';


const withBreadcrumb = containerClassName => Comp => (props, context) => {
    return(
        <div className={containerClassName}>
            <Breadcrumb matchPath={props.match && props.match.path} />
            <Comp {...props} />
        </div>
    );
};


export default withBreadcrumb;