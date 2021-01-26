import React from "react";
import styled from 'styled-components';

import { GenericContainer } from '../../../GlobalStyle';
import Header from './components/Header';
import Body from './components/Body';
// import Footer from './components/Footer';

export const ChatContainer = styled(GenericContainer)`
    background-color: white;
`;

export default function Chat(props) {

    return <ChatContainer>

        <Header {...props.route.params} />

        <Body {...props.route.params} />

        {/* <Footer /> */}

    </ChatContainer>
}
