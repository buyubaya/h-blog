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
        }
    }

    render(){
        const posts = [
            {
                key: 'reversi',
                title: 'Reversi',
                level: 1/3,
                description: 'ReactJS, Game',
                repo_url: 'https://github.com/buyubaya/reversi',
                demo_url: '//buyubaya.github.io/reversi'
            },
            {
                key: 'gomoku',
                title: 'Gomoku',
                level: 1/3,
                description: 'VueJS, Game',
                repo_url: 'https://github.com/buyubaya/gomoku',
                demo_url: '//buyubaya.github.io/gomoku'
            },
            {
                key: 'castle_on_the_grid',
                title: 'Castle on the Grid',
                level: 0.4,
                description: 'ReactJS, Algorithm',
                repo_url: 'https://github.com/buyubaya/castle_on_the_grid',
                demo_url: '//buyubaya.github.io/castle_on_the_grid'
            },
            {
                key: 'ng-porfolio',
                title: 'Book Store',
                level: 2/3,
                description: 'Angular, Web Application',
                repo_url: 'https://github.com/buyubaya/ng-porfolio',
                demo_url: '//hieu1801-ng-porfolio.herokuapp.com'
            }
        ];

        return(
            <section className='section'>
                <div className='card-list'>
                    {
                        posts.map(item =>
                            <div className='card-item' key={item.key}>
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