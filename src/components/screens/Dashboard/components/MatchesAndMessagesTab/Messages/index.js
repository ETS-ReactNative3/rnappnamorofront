import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import MessagesContent from './components/MessagesContent';
import { P } from '../../../../../../GlobalStyle';

const YouHaveNoConversationsContainer = styled.View`
    height: 70%;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

export default function Messages() {

    const doWeHaveMessages = useSelector(state => {
        const { matchedProfiles, realTimeFirebaseChat } = state.dashboard;
        return matchedProfiles.length > 0 && realTimeFirebaseChat.length > 0;
    });

    const YouHaveNoConversations = () => <YouHaveNoConversationsContainer>
        <P>{'Você ainda não iniciou nenhuma conversa.'}</P>
    </YouHaveNoConversationsContainer>

    return doWeHaveMessages ? <MessagesContent /> : <YouHaveNoConversations />
}
