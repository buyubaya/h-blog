import React from 'react';
import { Skeleton, Button } from 'antd';
import { compose } from 'recompose';
import withBreadcrumb from 'components/HOCs/withBreadcrumb';


class PostListPage extends React.Component {
    render(){
        const posts = [
            {
                title: 'Reversi',
                level: 1/3,
                description: 'ReactJS, Game',
                demo_url: '//buyubaya.github.io/reversi'
            },
            {
                title: 'Gomoku',
                level: 1/3,
                description: 'VueJS, Game',
                demo_url: '//buyubaya.github.io/gomoku'
            },
            {
                title: 'Castle on the Grid',
                level: 0.4,
                description: 'ReactJS, Algorithm',
                demo_url: '//buyubaya.github.io/castle_on_the_grid'
            },
            {
                title: 'Book Store',
                level: 2/3,
                description: 'Angular, Web Application',
                demo_url: '//hieu1801-ng-porfolio.herokuapp.com'
            }
        ];

        return(
            <section className='section'>
                <div className='card-list'>
                    {
                        posts.map((item, index) =>
                            <div className='card-item' key={index}>
                                <div className='card-body'>
                                    <div className='card-info'>
                                        <h3 className='card-title'>{item.title}</h3>
                                        <ul className='level-bar'>
                                            <li><span style={{ width: 100 * item.level * 3 + '%' }}></span></li>
                                            <li><span style={{ width: 100 * item.level * 3 + '%' }}></span></li>
                                            <li><span style={{ width: 100 * item.level * 3 + '%' }}></span></li>
                                        </ul>
                                        <p className='card-description'>{item.description}</p>
                                    </div>
                                    <a href={item.demo_url} target='_blank' className='btn btn-default'>See demo</a>
                                </div>
                            </div>
                        )
                    }
                </div>
            </section>
        );
    }
}


export default compose(
    withBreadcrumb('postList-container')
)(PostListPage);