import React from 'react';


class EventsPage extends React.Component {   
    render(){
        const events = [
            {
                eventTime: '01/01/2011',
                eventLocation: 'DXC',
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
            <div className='events-page'>
                <h1>HELLO EVENTS</h1>
                <section className='section'>
                    <ul className='eventList'>
                        {
                            events.map((item, index) => 
                                <li className='eventItem'>
                                    <div className='eventCard cardItem'>
                                        <div className='eventTime'>
                                            {item.eventTime}
                                        </div>
                                        <h3 className='eventLocation'>
                                            {item.eventLocation}
                                        </h3>
                                        <p>
                                            {item.eventShortDescription}
                                        </p>
                                    </div>
                                </li> 
                            )
                        }
                    </ul>
                </section>
            </div>
        );
    }
}


export default EventsPage;