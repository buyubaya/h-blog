import gql from 'graphql-tag';


// ROOM
export const JOIN_ROOM_MUTATION = gql`
    mutation joinRoom($userId: String, $userName: String!, $isNew: Boolean!) {
        joinRoom(userId: $userId, userName: $userName, isNew: $isNew) {
            userId
            userName
            createdAt
        }
    }
`;

// MESSAGE
export const MESSAGE_QUERY = gql`
    query message($roomId: String){
        message(roomId: $roomId) {
            messageId
            sender {
                userId
                userName
                roomId
                groupId
            }
            receiver {
                userId
                roomId
                groupId
            }
            content
            createdAt
        }
    }
`;

export const SEND_MESSAGE_MUTATION = gql`
    mutation sendMessage($sender: MessageFromInput, $receiver: MessageToInput, $content: String!){
        sendMessage(sender: $sender, receiver: $receiver, content: $content){
            messageId
            sender {
                userId
                userName
                roomId
                groupId
            }
            receiver {
                userId
                roomId
                groupId
            }
            content
            createdAt
            error
        }
    }
`;
// {
//     "from": {
//         "userId": "11111",
//         "userName": "NAME 01"
//     },
//     "to": {
//         "userId": "22222",
//         "roomId": "ROOM_ADMIN",
//         "groupId": "GROUP_ADMIN"
//     },
//     "content": "HAHAHA"
// }

export const MESSAGE_SUBSCRIPTION = gql`
    subscription newdMessage($sender: MessageFromSubscriptionInput, $receiver: MessageToSubscriptionInput){
        newMessage(sender: $sender, receiver: $receiver){
            messageId
            sender {
                userId
                userName
                roomId
                groupId
            }
            receiver {
                userId
                roomId
                groupId
            }
            content
            createdAt
            error
        }
    }
`;
// {
//     "from": {
//       "userId": ["22222"]
//     },
//     "to": {
//       "userId": ["55555"],
//       "roomId": ["ROOM_ABC"],
//       "groupId": ["GROUP_XYZ"]
//     }
// }

// USER STATUS
export const USER_STATUS_QUERY = gql`
    query userStatus($roomId: String!){
        userStatus(roomId: $roomId) {
            senderId
            senderName
            roomId
            isTyping
        }
    }
`;

export const USER_STATUS_MUTATION = gql`
    mutation updateUserStatus(
        $senderId: String!, 
        $senderName: String!, 
        $roomId: String, 
        $isTyping: Boolean
    ){
        updateUserStatus(
            senderId: $senderId, 
            senderName: $senderName, 
            roomId: $roomId, 
            isTyping: $isTyping
        ) {
            senderId
            senderName
            roomId
            isTyping
        }
    }
`;

export const USER_STATUS_SUBSCRIPTION = gql`
    subscription userStatusUpdated($senderId: String, $roomId: String){
        userStatusUpdated(senderId: $senderId, roomId: $roomId) {
            senderId
            senderName
            roomId
            isTyping
        }
    }
`;