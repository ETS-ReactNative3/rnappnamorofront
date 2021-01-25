import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native';

import MessageItem from './MessageItem';

export default function MessagesContent() {

    const { realTimeFirebaseChat, userMatchesProfile } = useSelector(state => state.dashboard);
    const { id } = useSelector(state => state.dashboard.userData);

    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        updateMessagesArray();
    }, [realTimeFirebaseChat]);

    const updateMessagesArray = () => {
        //filter realTimeFirebaseChat to keep only one (the last) messageItem of each conversation:
        const matchProfileIdsAlreadyOnMessagesHelper = [];

        const messagesHelper = realTimeFirebaseChat.filter(messageItem => {
            const matchProfileId = messageItem.userId_1 == id ? messageItem.userId_2 : messageItem.userId_1;

            if (!matchProfileIdsAlreadyOnMessagesHelper.includes(matchProfileId)) {
                matchProfileIdsAlreadyOnMessagesHelper.push(matchProfileId);
                return messageItem;
            }
        });

        //add matchProfile info into each messageItem:
        const messagesFinal = messagesHelper.map(message => {
            const matchProfileId = message.userId_1 == id ? message.userId_2 : message.userId_1;

            const matchProfile = userMatchesProfile.filter(item => item.id == matchProfileId)[0];

            return { ...message, matchProfile };
        });

        setConversations(messagesFinal);
    }

    return <FlatList
        data={conversations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <MessageItem messageItem={item} />}
    />
}
