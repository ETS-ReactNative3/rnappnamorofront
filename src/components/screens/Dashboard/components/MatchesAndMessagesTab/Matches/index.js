import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import MatchItem from './components/MatchItem';
import { P } from '../../../../../../GlobalStyle';

const CustomScrollView = styled.ScrollView`
    height: 100%;
`;

const YouHaveNoMatchesContainer = styled.View`
    height: 70%;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

export default function Matches() {

    const { userMatchesProfile } = useSelector(state => state.dashboard);

    const MatchesItems = () => userMatchesProfile.map((item, index) => <MatchItem key={index} item={item} />);

    const MatchItemsRender = () => <CustomScrollView horizontal>
        <MatchesItems />
    </CustomScrollView>

    const YouHaveNoMatches = () => <YouHaveNoMatchesContainer>
        <P>{'Você ainda não tem nenhuma match!'}</P>
    </YouHaveNoMatchesContainer>

    return userMatchesProfile.length > 0 ? <MatchItemsRender /> : <YouHaveNoMatches />
}
