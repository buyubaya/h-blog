import React from 'react';
import Breadcrumb from 'components/common/MainBreadcrumb';


class AboutPage extends React.Component {
    constructor(){
        super();

        this.state = {
            skills: [
                {
                    key: 'html',
                    name: 'HTML<br />CSS',
                    img: 'hawkeye-face.png',
                    percent: 90,
                    infos: [
                        {
                            key: 'html5',
                            title: 'HTML5',
                            img: 'html-icon.png'
                        },
                        {
                            key: 'css3',
                            title: 'CSS3',
                            img: 'css-icon.png'
                        },
                        {
                            key: 'sass',
                            title: 'SASS',
                            img: 'sass-icon.png'
                        }
                    ]
                },
                {
                    key: 'js',
                    name: 'JS<br />Jquery',
                    img: 'captain-face.png',
                    percent: 70,
                    infos: [
                        {
                            key: 'js',
                            title: 'JavaScript',
                            img: 'js-icon.png'
                        },
                        {
                            key: 'jquery',
                            title: 'Jquery',
                            img: 'jquery-icon.png'
                        }
                    ]
                },
                {
                    key: 'reactjs',
                    name: 'ReactJS',
                    img: 'thor-face.png',
                    percent: 80,
                    infos: [
                        {
                            key: 'reactjs',
                            title: 'ReactJS',
                            img: 'reactjs-icon.png'
                        },
                        {
                            key: 'redux',
                            title: 'Redux',
                            img: 'redux-icon.png'
                        },
                        {
                            key: 'redux_observable',
                            title: 'Redux-observable',
                            img: 'redux-observable-icon.png'
                        },
                        {
                            key: 'apollo',
                            title: 'Apollo Client',
                            img: 'apollo-icon.png'
                        }
                    ]
                },
                {
                    key: 'angular_vuejs',
                    name: 'Angular<br />VueJS',
                    img: 'hulk-face.png',
                    percent: 60,
                    infos: [
                        {
                            key: 'angular',
                            title: 'Angular',
                            img: 'angular-icon.png'
                        },
                        {
                            key: 'vuejs',
                            title: 'VueJS',
                            img: 'vuejs-icon.png'
                        }
                    ]
                },
                {
                    key: 'nodejs',
                    name: 'NodeJS',
                    img: 'ironman-face.png',
                    percent: 50,
                    infos: [
                        {
                            key: 'nodejs',
                            title: 'NodeJS',
                            img: 'nodejs-icon.png'
                        }
                    ]
                }
            ]
        };
    }

    componentDidMount(){
        const { skills } = this.state;
        skills.forEach((skill, index) => {
            setTimeout(() => {
                if(this['skill_'+skill.key]){
                    this['skill_'+skill.key].style.width = skill.percent + '%';
                }
                if(this['circle_'+skill.key]){
                    this['circle_'+skill.key].style.strokeDashoffset = 314.159265359 * (100 - skill.percent) / 100;
                }
            }, 500 * index);
        });
    }

    render(){
        const { skills } = this.state;

        return(
            <div className='about-page'>
                <Breadcrumb />

                <div className='section'>
                    <div className='skills-area'>
                        {
                            skills && skills.map((item, index) => (
                                <div className='skill-group row' key={item.key}>
                                    <div className='skill-point column column-6-md'>
                                        <div className='skill-svg'>
                                            <div className='skill-name' dangerouslySetInnerHTML={{__html: item.name}}></div>
                                            <svg viewBox="0 0 100 100">
                                                <circle className='circle-1' cx="50%" cy="50%" r="48" />
                                                <circle ref={el => this['circle_'+item.key] = el} className='circle-2' cx="50%" cy="50%" r="48" />
                                            </svg>
                                        </div>
                                        <div className='skill-bar'>
                                            <span ref={el => this['skill_'+item.key] = el}><img className='skill-icon' src={require(`../assets/images/${item.img}`)} /></span>
                                        </div>
                                    </div>
                                    <div className='skill-info column column-6-md'>
                                        <ul className='skill-info-list'>
                                            {
                                                item.infos && item.infos.map(info =>
                                                    <li className='skill-info' key={info.key}>
                                                        <p className='skill-info-title'>{info.title}</p>
                                                        <div className='skill-info-img'>
                                                            <img src={require(`../assets/images/${info.img}`)} />
                                                        </div>
                                                    </li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}


export default AboutPage;