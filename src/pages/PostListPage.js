import React from 'react';
import { Skeleton, Button } from 'antd';
import MainBreadcrumb from 'components/common/MainBreadcrumb';


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

        const styles = {
            levelSpan: {
                width: 100 * 0.5 * 3 + '%'
            }
        }

        return(
            <div className='postList-container'>
                <MainBreadcrumb />

                <section className='section'>
                    <div className='cardList'>
                        {
                            posts.map((item, index) =>
                                <div className='cardItem' key={index}>
                                    <div className='cardBody'>
                                        <div className='cardInfo'>
                                            <h3 className='cardTitle'>{item.title}</h3>
                                            <ul className='levelBar'>
                                                <li><span style={styles.levelSpan}></span></li>
                                                <li><span style={styles.levelSpan}></span></li>
                                                <li><span style={styles.levelSpan}></span></li>
                                            </ul>
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