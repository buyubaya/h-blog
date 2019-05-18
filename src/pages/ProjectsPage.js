import React from 'react';
import { Skeleton, Button, Input, Icon } from 'antd';
import { compose } from 'recompose';
import withBreadcrumb from 'components/HOCs/withBreadcrumb';


class ProjectsPage extends React.Component {
    constructor(props, context){
        super(props, context);

        this.copyRepoUrl = this.copyRepoUrl.bind(this);
    }

    copyRepoUrl(key){
        if(this[`repo_url_${key}`]){
            this[`repo_url_${key}`].input.select();
            document.execCommand('copy');
            this[`repo_url_${key}`].input.blur();
        }
    }

    render(){
        const posts = [
            {
                key: 'ng-porfolio',
                title: 'Angular Book Store',
                level: 2/3,
                description: 'Angular, Web Application',
                type: 'angular',
                repo_url: 'https://github.com/buyubaya/ng-porfolio',
                demo_url: '//hieu1801-ng-porfolio.herokuapp.com'
            },
            {
                key: 'graphql-rx-book',
                title: 'GraphQL-ReactJS Book Store',
                level: 2/3,
                description: 'ReactJS, GraphQL, Web Application',
                type: 'reactjs',
                repo_url: 'https://github.com/buyubaya/graphql-rx-book',
                demo_url: 'https://buyubaya.github.io/graphql-rx-book/'
            },
            {
                key: 'rx-chat',
                title: 'ReactJS Chat',
                level: 2/3,
                description: 'ReactJS, GraphQL, Real-time Web Application',
                type: 'reactjs',
                repo_url: 'https://github.com/buyubaya/rx-chat',
                demo_url: 'https://buyubaya.github.io/rx-chat/'
            },
            {
                key: 'rx-book',
                title: 'ReactJS Book Store',
                level: 2/3,
                description: 'ReactJS, Web Application',
                type: 'reactjs',
                repo_url: 'https://github.com/buyubaya/rx-book',
                demo_url: 'https://buyubaya.github.io/rx-book/'
            },
            {
                key: 'v-book',
                title: 'VueJS Book Store',
                level: 0.5,
                description: 'VueJS, Web Application',
                type: 'vuejs',
                repo_url: 'https://github.com/buyubaya/v-book',
                demo_url: 'https://buyubaya.github.io/v-book/'
            },
            {
                key: 'reversi',
                title: 'Reversi',
                level: 1/3,
                description: 'ReactJS, Game',
                type: 'game',
                repo_url: 'https://github.com/buyubaya/reversi',
                demo_url: 'https://buyubaya.github.io/reversi'
            },
            {
                key: 'gomoku',
                title: 'Gomoku',
                level: 1/3,
                description: 'VueJS, Game',
                type: 'game',
                repo_url: 'https://github.com/buyubaya/gomoku',
                demo_url: 'https://buyubaya.github.io/gomoku'
            },
            {
                key: 'castle_on_the_grid',
                title: 'Castle on the Grid',
                level: 0.4,
                description: 'ReactJS, Algorithm',
                type: 'algorithm',
                repo_url: 'https://github.com/buyubaya/castle_on_the_grid',
                demo_url: 'https://buyubaya.github.io/castle_on_the_grid'
            }
        ];

        return(
            <section className='section'>
                <div className='card-list'>
                    {
                        posts.map(item =>
                            <div className='card-item' key={item.key}>
                                <div className={`card-tag ${item.type}`}></div>
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
                                    <div>
                                        <Input 
                                            type='text' 
                                            value={item.repo_url}  
                                            readOnly
                                            ref={el => this[`repo_url_${item.key}`] = el}
                                            addonAfter={<Icon type="copy" title='Copy' onClick={() => this.copyRepoUrl(item.key)}/>}
                                        />
                                        <a href={item.demo_url} target='_blank' className='btn btn-default'>See demo</a>
                                    </div>
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
)(ProjectsPage);