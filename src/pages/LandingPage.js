import React from 'react';
import Avatar from 'components/LandingPage/Avatar';


class LandingPage extends React.Component {
    componentWillMount(){
        document.body.classList.add('isLandingPage');
    }

    componentWillUnMount(){
        document.body.classList.remove('isLandingPage');
    }

    render(){
        return(
            <div className='landingPage-container'>
                <div className='avatar-area'>
                    <div className='avatar'>
                        <Avatar />
                    </div>
                    <div className='content'>
                        <div className='avatarName'>Hycker L</div>
                        <div className='avatarTitle'>Front-end Developer</div>
                    </div>
                </div>
            </div>
        );
    }
}


export default LandingPage;

