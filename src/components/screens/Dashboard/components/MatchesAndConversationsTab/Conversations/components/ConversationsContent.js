import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import ConversationItem from './ConversationItem';

const ConversationsList = styled.FlatList`
    flex: 1;
`;

export default function ConversationsContent() {

    const { realTimeFirebaseChat, matchedProfiles } = useSelector(state => state.dashboard);
    const { id } = useSelector(state => state.dashboard.userData);

    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        updateConversationsArray();
    }, [realTimeFirebaseChat]);

    const updateConversationsArray = () => {
        //filter realTimeFirebaseChat to create one item of each conversation that the user had with other users
        //containing matchedProfile info and the last message info of their conversation
        const matchedProfileIdsAlreadyOnConversationsHelper = [];

        const conversationsHelper = realTimeFirebaseChat.filter(messageItem => {
            const matchedProfileId = messageItem.userId_1 == id ? messageItem.userId_2 : messageItem.userId_1;

            if (!matchedProfileIdsAlreadyOnConversationsHelper.includes(matchedProfileId)) {
                matchedProfileIdsAlreadyOnConversationsHelper.push(matchedProfileId);
                return messageItem;
            }
        });

        //add matchedProfile info into each messageItem:
        const conversationsFinal = conversationsHelper.map(message => {
            const matchedProfileId = message.userId_1 == id ? message.userId_2 : message.userId_1;

            const matchedProfile = matchedProfiles.filter(item => item.id == matchedProfileId)[0];

            return { ...message, matchedProfile };
        });

        setConversations(conversationsFinal);
    }

    return <ConversationsList
        data={conversations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ConversationItem matchedProfile={item.matchedProfile} conversationItem={item} />}
    />
}
