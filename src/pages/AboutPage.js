import React from 'react';
import Breadcrumb from 'components/common/MainBreadcrumb';


class AboutPage extends React.Component {
    constructor(){
        super();

        this.state = {
            skills: [
                {
                    key: 'html',
                    name: 'HTML',
                    img: 'html-hero.png',
                    percent: 90
                },
                {
                    key: 'js',
                    name: 'JS',
                    img: 'js-hero.png',
                    percent: 70
                },
                {
                    key: 'reactjs',
                    name: 'ReactJS',
                    img: 'reactjs-hero.png',
                    percent: 80
                },
                {
                    key: 'angular',
                    name: 'Angular',
                    img: 'angular-hero.png',
                    percent: 60
                },
                {
                    key: 'vuejs',
                    name: 'VueJS',
                    img: 'vuejs-hero.png',
                    percent: 60
                },
                {
                    key: 'nodejs',
                    name: 'NodeJS',
                    img: 'nodejs-hero.png',
                    percent: 50
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
            }, 1000 * index);
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
                                <div className='skill-group' key={item.key}>
                                    <div className='skill-svg'>
                                        <div className='skill-name'>
                                            {item.name}
                                        </div>
                                        <svg viewBox="0 0 100 100">
                                            <circle className='circle-1' cx="50%" cy="50%" r="48" />
                                            <circle ref={el => this['circle_'+item.key] = el} className='circle-2' cx="50%" cy="50%" r="48" />
                                        </svg>
                                    </div>
                                    <div className='skill-bar'>
                                        <span ref={el => this['skill_'+item.key] = el}><img className='skill-icon' src={require(`../assets/images/${item.img}`)} /></span>
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