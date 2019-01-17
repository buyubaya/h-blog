import React from 'react';
import { Link } from 'react-router-dom';


const MainNavigator = () => {
    const data = [
        {
            path: '/',
            label: 'SAMPLE PAGE'
        },
        {
            path: '/home',
            label: 'HOME PAGE'
        },
        {
            path: '/tuci',
            label: 'TUCI PAGE'
        },
        {
            path: '/posts',
            label: 'POSTS'
        },
        {
            path: '/events',
            label: 'EVENTS'
        },
        {
            path: '/login',
            label: 'LOGIN PAGE'
        }
    ];

    return(
        <div className='mainNav-area'>
            <div className='logo-H'>
                <svg viewBox="0 0 80 100">
                    <path id="logo-h" d="M5,5 
                            l20,0 
                            l0,50 
                            l20,0 
                            l0,20 
                            l-20,0 
                            l0,20 
                            l-20,0 
                            l0,-89" />
                    <path d="M75,95 
                            l-20,0 
                            l0,-50 
                            l-20,0 
                            l0,-20 
                            l20,0 
                            l0,-20 
                            l20,0 
                            l0,89" />
                </svg>
            </div>
            <ul className='mainNav'>
                {
                    data.map((item, index) =>
                        <li className='navItem' key={index}>
                            <Link to={item.path}>{item.label}</Link>
                        </li>
                    )
                }
            </ul>
        </div>
    );
}


export default MainNavigator;