import React from 'react';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native';

import MatchItem from './MatchItem';

export default function MatchesContent() {

    const { matchedProfiles } = useSelector(state => state.dashboard);

    return <FlatList
        horizontal
        data={matchedProfiles}
        renderItem={({ item }) => <MatchItem matchedProfile={item} />}
        keyExtractor={item => item.id.toString()}
    />
}
