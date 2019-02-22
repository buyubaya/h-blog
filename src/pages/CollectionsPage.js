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
                    label: 'CSS Grid',
                    demo_url: 'https://codepen.io/buyubaya/pen/RMPQqg'
                },
                {
                    key: 'rxjs',
                    label: 'RxJS',
                    demo_url: 'https://codepen.io/buyubaya/pen/YJOxEa'
                },
                {
                    key: 'redux-observable',
                    label: 'Redux-Observable',
                    demo_url: 'https://codepen.io/buyubaya/pen/pVXWxJ'
                },
                {
                    key: 'redux-saga',
                    label: 'Redux-Saga',
                    demo_url: 'https://codepen.io/buyubaya/pen/KRLQgP'
                },
                {
                    key: 'cate-recursive',
                    label: 'Category Recursive',
                    demo_url: 'https://codepen.io/buyubaya/pen/xLWYBY'
                },
                {
                    key: 'svg-animation',
                    label: 'SVG Animation',
                    demo_url: 'https://codepen.io/buyubaya/pen/YQxRjq'
                },
                {
                    key: 'vue-vuex',
                    label: 'Vue - Vuex',
                    demo_url: 'https://codepen.io/buyubaya/pen/YRLogK'
                },
                {
                    key: 'google-map',
                    label: 'Google Map',
                    demo_url: 'https://codepen.io/buyubaya/pen/NXbMQK'
                },
                {
                    key: 'device-detector',
                    label: 'Device Detector',
                    demo_url: 'https://codepen.io/buyubaya/pen/VrLNgR'
                },
                {
                    key: 'css-404-page',
                    label: 'CSS 404 Page',
                    demo_url: 'https://codepen.io/buyubaya/pen/mBOzVy'
                },
                {
                    key: 'chartjs',
                    label: 'ChartJS',
                    demo_url: 'https://codepen.io/buyubaya/pen/jLeRwP'
                },
                {
                    key: 'css-skew-background',
                    label: 'CSS Skew Background',
                    demo_url: 'https://codepen.io/buyubaya/pen/GEbbjN'
                }
            ]
        };
    }

    render(){
        const { collections } = this.state;

        return(
            <section className='section'>
                {
                    collections &&
                    <ul className='collections-list numbered-list'>
                        {
                            collections.map(item =>
                                <li className='list-item' key={item.key}>
                                    <a 
                                        href={item.demo_url} 
                                        className='list-item-link' 
                                        target='_blank'
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            )
                        }
                    </ul>
                }
            </section>
        );
    }
}


export default compose(
    withBreadcrumb('collections-page')
)(CollectionsPage);