import React from 'react';
import { compose } from 'recompose';
import withBreadcrumb from 'components/HOCs/withBreadcrumb';


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
                            img: 'html-icon.png',
                            bgColor: '#DD4B25',
                            textColor: '#fff'
                        },
                        {
                            key: 'css3',
                            title: 'CSS3',
                            img: 'css-icon.png',
                            bgColor: '#0273B7',
                            textColor: '#fff'
                        },
                        {
                            key: 'sass',
                            title: 'SASS',
                            img: 'sass-icon.png',
                            bgColor: '#C66394',
                            textColor: '#fff'
                        },
                        {
                            key: 'webpack',
                            title: 'Webpack',
                            img: 'webpack-icon.png',
                            bgColor: '#8ACEF2',
                            textColor: '#1A1D1D'
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
                            img: 'js-icon.png',
                            bgColor: '#F7DE00',
                            textColor: '#000'
                        },
                        {
                            key: 'jquery',
                            title: 'Jquery',
                            img: 'jquery-icon.png',
                            bgColor: '#0766A8',
                            textColor: '#fff'
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
                            img: 'reactjs-icon.png',
                            bgColor: '#00D1F7',
                            textColor: '#212121'
                        },
                        {
                            key: 'redux',
                            title: 'Redux',
                            img: 'redux-icon.png',
                            bgColor: '#7248B6',
                            textColor: '#fff'
                        },
                        {
                            key: 'redux_observable',
                            title: 'Redux-observable',
                            img: 'redux-observable-icon.png',
                            bgColor: '#B11D87',
                            textColor: '#fff'
                        },
                        {
                            key: 'apollo',
                            title: 'Apollo Client',
                            img: 'apollo-icon.png',
                            bgColor: '#102A47',
                            textColor: '#fff'
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
                            img: 'angular-icon.png',
                            bgColor: '#DF3231',
                            textColor: '#fff'
                        },
                        {
                            key: 'vuejs',
                            title: 'VueJS',
                            img: 'vuejs-icon.png',
                            bgColor: '#45B586',
                            textColor: '#fff'
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
                            img: 'nodejs-icon.png',
                            bgColor: '#7FC728',
                            textColor: '#fff'
                        },
                        {
                            key: 'graphql',
                            title: 'GraphQL',
                            img: 'graphql-icon.png',
                            bgColor: '#E535AB',
                            textColor: '#fff'
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

            if(skill.infos.length > 0){
                skill.infos.forEach((skillInfo, jndex) => {
                    setTimeout(() => {
                        if(this[`skill_info_${skill.key}_${skillInfo.key}`]){
                            this[`skill_info_${skill.key}_${skillInfo.key}`].classList.add('is-active');
                        }
                    }, 250 * jndex);
                });
            }
        });
    }

    render(){
        const { skills } = this.state;

        return(
            <div className='section'>
                <div className='skills-area'>
                    {
                        skills && skills.map((item, index) => (
                            <div className='skill-group row' key={item.key}>
                                <div className='skill-point column column-4-md'>
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
                                <div className='skill-info column column-8-md'>
                                    <ul className='skill-info-list'>
                                        {
                                            item.infos && item.infos.map(info =>
                                                <li className='skill-info' key={info.key} ref={el => this[`skill_info_${item.key}_${info.key}`] = el}>
                                                    <p 
                                                        className='skill-info-title' 
                                                        style={{
                                                            backgroundColor: info.bgColor || '#fff',
                                                            color: info.textColor || 'inherit'
                                                        }}
                                                    >
                                                        {info.title}
                                                    </p>
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
        );
    }
}


export default compose(
    withBreadcrumb('about-page')
)(AboutPage);