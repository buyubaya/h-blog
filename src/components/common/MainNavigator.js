import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';


const MainNavigator = () => {
    const data = [
        {
            key: 'home',
            path: '/',
            label: 'Home'
        },
        {
            key: 'about',
            path: '/about',
            label: 'About'
        },
        {
            key: 'projects',
            path: '/projects',
            label: 'Projects'
        },
        {
            key: 'events',
            path: '/events',
            label: 'Events'
        },
        {
            key: 'login',
            path: '/login',
            label: 'Login'
        }
    ];

    return(
        <Menu
            mode="horizontal"
        >
            <Menu.Item>
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
            </Menu.Item>
            {
                data.map(item =>
                    <Menu.Item key={item.key}>
                        <Link to={item.path}>{item.label}</Link>
                    </Menu.Item>
                )
            }
        </Menu>
        // <div className='mainNav-area'>
            
        //     <ul className='mainNav'>
        //         {
        //             data.map((item, index) =>
        //                 <li className='navItem' key={index}>
        //                     <Link to={item.path}>{item.label}</Link>
        //                 </li>
        //             )
        //         }
        //     </ul>
        // </div>
    );
}


export default MainNavigator;