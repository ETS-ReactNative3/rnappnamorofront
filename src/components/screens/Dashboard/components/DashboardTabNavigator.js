import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { theme } from '../../../../constants/StyledComponentsTheme';
import { AwesomeIcon } from '../../../commonComponents';
import { GenericColumnView } from '../../../../GlobalStyle';

import MatchSearcherTab from './MatchSearcherTab';
import ProfileStackNavigator from './ProfileTab/ProfileStackNavigator';
import MatchesAndConversationsTab from './MatchesAndConversationsTab';

const Tab = createMaterialTopTabNavigator();

const Icon = (props) => {
    return (
        <GenericColumnView style={{ justifyContent: 'center', alignItems: 'center' }}>
            <AwesomeIcon
                customIconStyle={{ color: props.iconColor, marginBottom: 8 }}
                solidIcon
                iconName={props.iconName}
            />
        </GenericColumnView>
    );
}

const screenOptions = (iconName) => {
    return { tabBarIcon: ({ color }) => <Icon iconColor={color} iconName={iconName} /> }
}

const TabNavigator = ({ swipeEnabled, setSwipeEnabled }) => {
    return <Tab.Navigator
        swipeEnabled={swipeEnabled}
        tabBarPosition='bottom'
        tabBarOptions={{
            activeTintColor: theme.$primaryColor,
            inactiveTintColor: theme.$lightGray,
            indicatorStyle: { backgroundColor: 'transparent' },
            showIcon: true,
            showLabel: false,
        }}
        screenOptions={({ navigation, route }) => {
            if (route.name === 'MatchSearcher' && navigation.isFocused()) {
                setSwipeEnabled(false);
            } else if (route.name !== 'MatchSearcher' && navigation.isFocused()) {
                setSwipeEnabled(true);
            }
        }}>

        <Tab.Screen name="MatchSearcher" options={screenOptions('heart')} component={MatchSearcherTab} />
        <Tab.Screen name="MatchesAndConversations" options={screenOptions('comments')} component={MatchesAndConversationsTab} />
        <Tab.Screen name="MobileUserProfile" options={screenOptions('user-alt')} component={ProfileStackNavigator} />
    </Tab.Navigator>
}

export default function DashboardTabNavigator() {

    const [swipeEnabled, setSwipeEnabled] = useState(false);

    return <TabNavigator swipeEnabled={swipeEnabled} setSwipeEnabled={setSwipeEnabled} />
}
