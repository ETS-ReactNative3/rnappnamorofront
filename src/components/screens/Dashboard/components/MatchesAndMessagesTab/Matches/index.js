import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import MatchesContent from './components/MatchesContent';
import { P } from '../../../../../../GlobalStyle';

const YouHaveNoMatchesContainer = styled.View`
    height: 70%;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

export default function Matches() {

    const { userMatchesProfile } = useSelector(state => state.dashboard);

    const YouHaveNoMatches = () => <YouHaveNoMatchesContainer>
        <P>{'Você ainda não tem nenhuma match!'}</P>
    </YouHaveNoMatchesContainer>

    return userMatchesProfile.length > 0 ? <MatchesContent /> : <YouHaveNoMatches />
}
