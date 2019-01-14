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
            <div>
                <h1>HELLO EVENTS</h1>
                <ul className='eventList'>
                    {
                        events.map((item, index) => 
                            <li className='eventItem'>
                                <div className='eventTime'>
                                    {item.eventTime}
                                </div>
                                <div className='eventCard'>
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
            </div>
        );
    }
}


export default EventsPage;