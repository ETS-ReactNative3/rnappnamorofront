import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../../../constants/StyledComponentsTheme';

import { GenericColumnView, GenericContainer } from '../../../../../GlobalStyle';
import { SectionTitle } from '../../../../commonComponents';
import Matches from './Matches';
import Messages from './Messages';

const MatchesContainer = styled(GenericColumnView)`
    height: 160px;
`;

const MessagesContainer = styled(GenericColumnView)`
    flex: 1;
`;

export default function MatchesAndMessagesTab() {

    const CustomTitle = ({ title }) => <SectionTitle
        titleText={title}
        customTitleStyle={{
            color: theme.$primaryColor,
            fontSize: 16
        }}
    />

    return <GenericContainer style={{backgroundColor: 'white'}}>

        <MatchesContainer>
            <CustomTitle title={'Suas Matches'} />
            <Matches />
        </MatchesContainer>

        <MessagesContainer>
            <CustomTitle title={'Mensagens'} />
            <Messages />
        </MessagesContainer>

    </GenericContainer>
}
