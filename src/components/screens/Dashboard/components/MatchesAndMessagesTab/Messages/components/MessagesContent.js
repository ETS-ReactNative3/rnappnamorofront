import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native';

import MessageItem from './MessageItem';

export default function MessagesContent() {

    const { realTimeFirebaseChat, matchedProfiles } = useSelector(state => state.dashboard);
    const { id } = useSelector(state => state.dashboard.userData);

    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        updateMessagesArray();
    }, [realTimeFirebaseChat]);

    const updateMessagesArray = () => {
        //filter realTimeFirebaseChat to keep only one (the last) messageItem of each conversation:
        const matchedProfileIdsAlreadyOnMessagesHelper = [];

        const messagesHelper = realTimeFirebaseChat.filter(messageItem => {
            const matchedProfileId = messageItem.userId_1 == id ? messageItem.userId_2 : messageItem.userId_1;

            if (!matchedProfileIdsAlreadyOnMessagesHelper.includes(matchedProfileId)) {
                matchedProfileIdsAlreadyOnMessagesHelper.push(matchedProfileId);
                return messageItem;
            }
        });

        //add matchedProfile info into each messageItem:
        const messagesFinal = messagesHelper.map(message => {
            const matchedProfileId = message.userId_1 == id ? message.userId_2 : message.userId_1;

            const matchedProfile = matchedProfiles.filter(item => item.id == matchedProfileId)[0];

            return { ...message, matchedProfile };
        });

        setConversations(messagesFinal);
    }

    return <FlatList
        data={conversations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <MessageItem matchedProfile={item.matchedProfile} messageItem={item} />}
    />
}
