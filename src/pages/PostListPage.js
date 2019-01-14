import React from 'react';
import { Breadcrumb, Skeleton, Button } from 'antd';


class PostListPage extends React.Component {
    render(){
        const posts = [
            {
                title: 'Angular',
                description: 'Angular description Angular description Angular description Angular description Angular description'
            },
            {
                title: 'ReactJS',
                description: 'ReactJS description'
            },
            {
                title: 'VueJS',
                description: 'VueJS description'
            },
            {
                title: 'NodeJS',
                description: 'NodeJS description'
            }
        ];

        return(
            <div className='postList-container'>
                <div className='breadcrumb-area'>
                    <Breadcrumb>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item><a href="">Application Center</a></Breadcrumb.Item>
                        <Breadcrumb.Item><a href="">Application List</a></Breadcrumb.Item>
                        <Breadcrumb.Item>An Application</Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <div className='pageHeader'>
                    <div className='pageTitle'>POSTS</div>
                </div>

                <section className='section'>
                    <div className='cardList'>
                        {
                            posts.map((item, index) =>
                                <div className='cardItem' key={index}>
                                    <div className='cardBody'>
                                        <div className='cardInfo'>
                                            <h3 className='cardTitle'>{item.title}</h3>
                                            <p className='cardDescription'>{item.description}</p>
                                        </div>
                                        <Button className='btn btn-default'>See demo</Button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </section>
            </div>
        );
    }
}

export default PostListPage;