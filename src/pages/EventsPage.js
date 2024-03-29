import React from 'react';
import { compose } from 'recompose';
import withBreadcrumb from 'components/HOCs/withBreadcrumb';


class EventsPage extends React.Component {   
    render(){
        const events = [
            {
                eventTime: '08/2019 - Present',
                eventLocation: 'NAB Studio',
                eventShortDescription: 'Front-end Developer',
                eventDescription: 
`
* Main responsibilities:
- Mainly build internal tools for image editing.
- Support mobile team in mobile-web integration.
- Prepare some simple Back-end APIs.
- Implement UI features based on requirement.
- Write technical documents.

* Skills gained:
- Learn various modern technical knowledge.
- Deeper web understandings
`
            },
            {
                eventTime: '06/2018 - 07/2019',
                eventLocation: 'DXC Technology',
                eventShortDescription: 'Front-end Developer',
                eventDescription: 
`
* Working as a Front-end Developer:
- Define Front-end code structure for SCSS.
- Layout and implement UI markup.
- Build all base components for common use in ReactJS.
- Config Webpack for Front-end.
- Code, implement new features based on requirement.
- Communicate and fix bugs related to Front-end.
- Attend New Skill Course in the Company.
    
* Skills gained:
- Technical skills: Webpack Configuration, Code optimization, Debugging,...
- Understanding how to work in Agile Model.
- Improve English Communication skill.
`
            },
            {
                eventTime: '06/2017 - 06/2018',
                eventLocation: 'Transcosmos Co.,Ltd',
                eventShortDescription: 'Front-end Developer',
                eventDescription: 
`
* Working as a Coder:
- Convert PSD to HTML/CSS and ensure it is Perfect Pixel.
- Make Website compatible with most browsers and devices.
- Collaborate with other members and designers to produce a high quality Webpage.

* Skills gained: 
- Responsibility and Discipline.
- Work in Japanese Style.
`
            },
        ];

        return(
            <section className='section'>
                <div className='event-list-area'>
                    <ul className='event-list column-left'>
                        {
                            events.map((item, index) => 
                                <li className={`event-cell clearfix cell-${index+1}`} key={index}>
                                    <div className='event-item'>
                                        <div className='event-card card-item'>
                                            <div className='event-header'>
                                                <div className='event-number-area'>
                                                    <div className='event-number'>{index + 1}</div>
                                                </div>
                                                <div className='event-title-area'>
                                                    <div className='event-time'>
                                                        {item.eventTime}
                                                    </div>
                                                    <h3 className='event-location text-bold'>
                                                        {item.eventLocation}
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className='event-body'>
                                                <pre>{item.eventDescription}</pre>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                    <ul className='event-list column-right'>
                        {
                            events.map((item, index) => 
                                index % 2 === 1
                                ?
                                <li className={`event-cell clearfix cell-${index+1}`} key={index}>
                                    <div className='event-item'>
                                        <div className='event-card card-item'>
                                            <div className='event-header'>
                                                <div className='event-number-area'>
                                                    <div className='event-number'>{index + 1}</div>
                                                </div>
                                                <div className='event-title-area'>
                                                    <div className='event-time'>
                                                        {item.eventTime}
                                                    </div>
                                                    <h3 className='event-location text-bold'>
                                                        {item.eventLocation}
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className='event-body'>
                                                <pre>{item.eventDescription}</pre>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                :
                                null
                            )
                        }
                    </ul>
                </div>
            </section>
        );
    }
}


export default compose(
    withBreadcrumb('events-page')
)(EventsPage);