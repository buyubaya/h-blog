import React, { Component } from 'react';
import * as moment from 'moment';
import * as _ from 'lodash';
// APOLLO
import { Query, Mutation, Subscription, graphql, compose } from 'react-apollo';
import {
    MESSAGE_QUERY,
    SEND_MESSAGE_MUTATION,
    MESSAGE_SUBSCRIPTION,

    USER_STATUS_QUERY,
    USER_STATUS_MUTATION,
    USER_STATUS_SUBSCRIPTION
} from '../../apollo/qms';
import ChatBox from './ChatBox';


class ChatRoom extends Component {
    unsubscribe = null;

    state = {
        messageList: []
    };

    componentDidMount() {
        // MESSAGE
        let { sender, roomId, listenTo } = this.props;
        const listenToReceiverRoomId = _.get(listenTo, 'receiver.roomId');
        listenTo = listenTo ? listenTo : {};
        if (listenToReceiverRoomId) {
            _.set(listenTo, 'receiver.roomId', [...listenToReceiverRoomId, roomId]);
        }
        else {
            _.set(listenTo, 'receiver.roomId', [roomId]);
        }
        const senderId = sender && sender.userId;
        const { messageQuery } = this.props;
        const msgSubscribeToMore = messageQuery && messageQuery.subscribeToMore;

        // USER STATUS
        const { userStatusQuery } = this.props;
        const userStatusSubscribeToMore = userStatusQuery && userStatusQuery.subscribeToMore;

        this.unsubscribe = [
            msgSubscribeToMore && msgSubscribeToMore({
                document: MESSAGE_SUBSCRIPTION,
                variables: listenTo,
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData) {
                        return prev;
                    }

                    const newItem = subscriptionData.data.newMessage;
                    // UPDATE MESSAGE QUERY
                    const { onMessageReceive } = this.props;
                    onMessageReceive && onMessageReceive(newItem);

                    return Object.assign({}, prev, {
                        message: [...prev.message, newItem]
                    });
                }
            }),
            userStatusSubscribeToMore && userStatusSubscribeToMore({
                document: USER_STATUS_SUBSCRIPTION,
                variables: { senderId, roomId },
                updateQuery: (prev, { subscriptionData }) => {
                    // CHECK DATA
                    if (!subscriptionData) {
                        return prev;
                    }

                    // CHECK SAME EMITTER
                    const newItem = subscriptionData.data.userStatusUpdated;
                    if (newItem.senderId === senderId) {
                        return prev;
                    }

                    // ADD USER TYPING
                    if (newItem.isTyping) {
                        // CHECK EXISTED
                        const checkExist = prev.userStatus.filter(item => item.senderId === newItem.senderId);
                        if (checkExist.length < 1) {
                            return Object.assign({}, prev, {
                                userStatus: [newItem, ...prev.userStatus]
                            });
                        }
                        return prev;
                    }
                    // REMOVE USER STOP TYPING
                    else {
                        return Object.assign({}, prev, {
                            userStatus: prev.userStatus.filter(item => item.senderId !== newItem.senderId)
                        });
                    }
                }
            })
        ];
    }

    componentWillReceiveProps(newProps) {
        // const { messageQuery, initialMessageList } = newProps;
        // let messageList = messageQuery && messageQuery.message;
        // if (initialMessageList) {
        //     messageList = messageList ? [...initialMessageList, ...messageList] : [];
        // }

        const { messageList } = this.state;
        const { messageQuery } = newProps;
        const messageData = messageQuery && messageQuery.message ? messageQuery.message : [];
        // if (initialMessageList) {
        //     messageList = messageList ? [...initialMessageList, ...messageList] : [];
        // }
        // FIND LATEST OTHER MESSAGE
        const newMessage = _.findLast(messageData, item => {
            return _.get(item, 'sender.userId') !== _.get(newProps, 'sender.userId') &&
            !_.some(messageList, x => x.messageId === item.messageId);
        });

        this.setState(state => {
            const newMessageList = [...state.messageList];
            if(newMessage){
                newMessageList.push(newMessage);
            }
            
            return ({
                messageList: newMessageList
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe && this.unsubscribe.forEach(item => {
            item();
        });
    }

    handleMessageSend = (msgText) => {
        let { sender, sendMessage, sendTo, roomId } = this.props;
        let variables = {
            sender,
            content: msgText
        };
        sendTo = sendTo ? sendTo : {};
        const sendToRoomId = _.get(sendTo, 'receiver.roomId');
        if (sendToRoomId) {
            _.set(sendTo, 'receiver.roomId', [...sendToRoomId, roomId]);
        }
        else {
            _.set(sendTo, 'receiver.roomId', [roomId]);
        }

        variables = {
            ...variables,
            receiver: sendTo.receiver
        };

        // UPDATE MESSAGE LIST
        let tmp = this.state.messageList.length;
        this.setState(state => ({
            messageList: [...state.messageList, { ...variables, isSending: true }]
        }));
        return sendMessage && sendMessage({ variables })
            .then(res => {
                console.log(123, res);
                this.setState(state => {
                    const newMessage = res.data.sendMessage;
                    const newMessageList = [...state.messageList];
                    newMessageList[tmp] = { ...newMessage, isSending: false };

                    return ({
                        messageList: [...newMessageList]
                    });
                });
                return Promise.resolve(res);
            });
    }

    handleMessageTyping = () => {
        const { sender, roomId } = this.props;
        const senderId = sender && sender.userId;
        const senderName = sender && sender.userName;
        const { updateUserStatus } = this.props;

        updateUserStatus && updateUserStatus({
            variables: {
                senderId, senderName, roomId, isTyping: true
            }
        });
    }

    handleMessageTypingStop = (msgText) => {
        const { sender, roomId } = this.props;
        const senderId = sender && sender.userId;
        const senderName = sender && sender.userName;
        const { updateUserStatus } = this.props;

        updateUserStatus && updateUserStatus({
            variables: {
                senderId, senderName, roomId, isTyping: false
            }
        });
    }

    render() {
        let { messageList } = this.state;
        const {
            initialMessageList,
            userStatusQuery,
            sender, roomId, title,
            onHide, chatBoxWrapperClassName, chatBoxWrapperStyle
        } = this.props;
        // MESSAGE
        if (initialMessageList) {
            messageList = [...initialMessageList, ...messageList];
        }
        // USER STATUS
        let userTypingList = userStatusQuery && userStatusQuery.userStatus;
        userTypingList = userTypingList ? userTypingList.map(item => item.senderName) : [];

        return (
            <ChatBox
                title={title}
                sender={sender}
                roomId={roomId}
                messageList={messageList}
                onMessageSend={this.handleMessageSend}
                onMessagegTyping={this.handleMessageTyping}
                onMessagegTypingStop={this.handleMessageTypingStop}
                userTypingList={userTypingList}
                onHide={onHide}
                chatBoxWrapperClassName={chatBoxWrapperClassName}
                chatBoxWrapperStyle={chatBoxWrapperStyle}
            />
        )
    }
}


export default compose(
    graphql(MESSAGE_QUERY, {
        name: 'messageQuery',
        options: ({ roomId }) => ({
            variables: { roomId }
        })
    }),
    graphql(SEND_MESSAGE_MUTATION, { name: 'sendMessage' }),
    graphql(USER_STATUS_QUERY, {
        name: 'userStatusQuery',
        options: ({ roomId }) => ({
            variables: { roomId }
        })
    }),
    graphql(USER_STATUS_MUTATION, { name: 'updateUserStatus' })
)(ChatRoom);