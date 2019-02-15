import React from 'react';
import { compose } from 'recompose';
import withBreadcrumb from 'components/HOCs/withBreadcrumb';


class CollectionsPage extends React.Component {
    constructor(props, context){
        super(props, context);

        this.state = {
            collections: [
                {
                    key: 'css-grid',
                    label: 'CSS Grid'
                },
                {
                    key: 'svg-animation',
                    label: 'SVG animation'
                }
            ]
        };
    }

    render(){
        return(
            <section className='section'>
                <h1>COLLECTIONS</h1>
            </section>
        );
    }
}


export default compose(
    withBreadcrumb('collections-page')
)(CollectionsPage);