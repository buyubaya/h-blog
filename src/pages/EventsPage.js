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
                <div className='event-list-area'>
                    <ul className='event-list column-left'>
                        {
                            events.map((item, index) => 
                                index % 2 === 0
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
                                                <p>{item.eventShortDescription}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                :
                                null
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
                                                <p>{item.eventShortDescription}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                :
                                null
                            )
                        }
                    </ul>
                    <ul className='event-list column-left sp'>
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
                                                <p>{item.eventShortDescription}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
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