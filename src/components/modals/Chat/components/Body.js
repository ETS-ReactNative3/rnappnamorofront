import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import MessageItem from './MessageItem';

const phrases = [
    'Quebre barreiras!',
    'Faça uma piada sobre si mesmo.',
    'Os elogios nunca são demais!',
    'Seja artístico!',
    'Convidar para comer nunca fez mal a ninguém!',
    'Não tenha medo de ser vulnerável!'
];

const MessagesList = styled.FlatList`
    flex: 1;
    background-color: lightblue;
`;

export default function Body({ matchedProfile }) {

    const { realTimeFirebaseChat } = useSelector(state => state.dashboard);
    const { id: userId } = useSelector(state => state.dashboard.userData);

    const [chatMessages, setChatMessages] = useState([]);
    const [phraseIndex, setPhraseIndex] = useState([Math.floor(Math.random() * phrases.length)]);

    useEffect(() => {//sets a random number to show a random tip message to the user:
        setPhraseIndex([Math.floor(Math.random() * phrases.length)]);
    }, []);

    useEffect(() => {
        setChatMessages([]);

        setChatMessages(realTimeFirebaseChat.filter(item =>
            item.userId_1 == matchedProfile.id || item.userId_2 == matchedProfile.id && item
        ).reverse());
    }, [realTimeFirebaseChat]);

    useEffect(() => {
        //scrollbars.scrollToBottom();
    }, [chatMessages]);

    return <MessagesList
        data={chatMessages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <MessageItem userId={userId} messageItem={item} />}
    />
}
