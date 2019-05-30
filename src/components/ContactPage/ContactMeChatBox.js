import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Modal, Badge, Icon, Card, Tabs } from 'antd';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Subscription, compose, graphql } from 'react-apollo';
import {
    JOIN_ROOM_MUTATION
} from '../../apollo/qms';
// COMPONENTS
import ChatRoom from './ChatRoom';


class ContactMeChatBox extends Component {
    state = {
        userId: null,
        userName: 'GUEST_USER',
        roomId: null,
        roomTitle: 'Private Chat',
        groupId: 'GUEST_USER',

        sendTo: {
            receiver: {
                roomId: ['ADMIN'],
                groupId: ['ADMIN']
            }
        },
        listenTo: {
            sender: {
                roomId: ['ROOM_GUEST'],
                groupId: ['ADMIN']
            },
            receiver: {
                roomId: ['ROOM_GUEST'],
                groupId: ['GUEST_USER']
            }
        },

        chatMode: 'ALL'
    };

    componentWillMount() {
        // CHECK SESSION STORAGE
        let guest_session = sessionStorage.getItem('chat_guest_user');
        let guest_data = {
            userId: null,
            userName: 'GUEST_' + moment(Date.now()).format('HH:mm:ss'),
            isNew: true
        };
        if(guest_session){
            guest_session = JSON.parse(guest_session);
            this.setState({
                userId: guest_session.userId,
                userName: guest_session.userName,
                roomId: `ROOM_${guest_session.userId}`
            });
            guest_data = {
                userId: guest_session.userId,
                userName: guest_session.userName,
                isNew: false
            };
        }

        // JOIN ROOM
        const { joinRoom } = this.props;

        joinRoom && joinRoom({ variables: { ...guest_data } })
            .then(res => {
                const guest = {
                    userId: _.get(res, 'data.joinRoom.userId'),
                    userName: _.get(res, 'data.joinRoom.userName')
                };

                this.setState(
                    {
                        userId: guest.userId,
                        userName: guest.userName,
                        roomId: `ROOM_${guest.userId}`
                    },
                    () => {
                        sessionStorage.setItem('chat_guest_user', JSON.stringify(guest));
                    }
                );
            });
    }

    handleMessageReceive = msg => {
        if(msg.sender.userId !== this.state.userId){
            this.setState({ roomTitle: msg.sender.userName });
        }
    }

    handleTabClick = (key, e) => {
        this.setState({ chatMode: key });
    }

    render() {
        const { userId, userName, roomId, roomTitle, groupId, sendTo, listenTo, chatMode } = this.state;
        const sender = { userId, userName, roomId, groupId };

        if(!userId){
            return null;
        }
        
        return (
            <ChatRoom 
                title={roomTitle}
                roomId={roomId}
                sender={sender}
                sendTo={sendTo}
                listenTo={listenTo}
                onMessageReceive={this.handleMessageReceive}
            />
        );
    }
}


export default compose(
    graphql(JOIN_ROOM_MUTATION, { name: 'joinRoom' })
)(ContactMeChatBox);