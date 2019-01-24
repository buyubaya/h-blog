import React from 'react';
import { compose } from 'recompose';
import withBreadcrumb from 'components/HOCs/withBreadcrumb';


class EventsPage extends React.Component {   
    render(){
        const events = [
            {
                eventTime: '01/01/2011',
                eventLocation: 'Amazon',
                eventShortDescription: 'Developer',
                eventDescription: 'Working as a junior developer'
            },
            {
                eventTime: '02/02/2012',
                eventLocation: 'Google',
                eventShortDescription: 'Senior Developer',
                eventDescription: 'Working as a senior developer'
            },
            {
                eventTime: '02/02/2012',
                eventLocation: 'Facebook',
                eventShortDescription: 'TA',
                eventDescription: 'Working as a technical architech'
            }
        ];

        return(
            <section className='section'>
                <ul className='event-list'>
                    {
                        events.map((item, index) => 
                            <li className='event-row clearfix' key={index}>
                                <div className='event-item'>
                                    <div className='event-card card-item'>
                                        <div className='event-time'>
                                            {item.eventTime}
                                        </div>
                                        <h3 className='event-location text-bold'>
                                            {item.eventLocation}
                                        </h3>
                                        <p>
                                            {item.eventShortDescription}
                                        </p>
                                    </div>
                                </div>
                            </li> 
                        )
                    }
                </ul>
            </section>
        );
    }
}


export default compose(
    withBreadcrumb('events-page')
)(EventsPage);