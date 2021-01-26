import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import MatchItem from './MatchItem';

const MatchesList = styled.FlatList`
    flex: 1;
`;

export default function MatchesContent() {

    const { matchedProfiles } = useSelector(state => state.dashboard);

    return <MatchesList
        horizontal
        data={matchedProfiles}
        renderItem={({ item }) => <MatchItem matchedProfile={item} />}
        keyExtractor={item => item.id.toString()}
    />
}
