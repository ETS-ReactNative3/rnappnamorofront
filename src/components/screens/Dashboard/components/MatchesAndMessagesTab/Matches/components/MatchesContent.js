import React from 'react';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native';

import MatchItem from './MatchItem';

export default function MatchesContent() {

    const { userMatchesProfile } = useSelector(state => state.dashboard);

    return <FlatList
        horizontal
        data={userMatchesProfile}
        renderItem={MatchItem}
        keyExtractor={item => item.id.toString()}
    />
}
