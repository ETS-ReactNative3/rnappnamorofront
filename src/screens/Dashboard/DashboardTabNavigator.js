import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { theme } from '../../constants/StyledComponentsTheme';
import { AwesomeIcon, GenericColumnView } from '../../components';
import MatchSearcherTab from '../MatchSearcherTab';
import ProfileStackNavigator from '../ProfileTab/ProfileStackNavigator';
import MatchesAndConversationsTab from '../MatchesAndConversationsTab';

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
    return { gestureEnabled: true, tabBarIcon: ({ color }) => <Icon iconColor={color} iconName={iconName} /> }
}

const TabNavigator = () => {

    return <Tab.Navigator
        swipeEnabled={false}
        tabBarPosition='bottom'
        tabBarOptions={{
            activeTintColor: theme.$primaryColor,
            inactiveTintColor: theme.$lightGray,
            indicatorStyle: { backgroundColor: 'transparent' },
            showIcon: true,
            showLabel: false
        }}>

        <Tab.Screen name="MatchSearcher" options={screenOptions('heart')} component={MatchSearcherTab} />
        <Tab.Screen name="MatchesAndConversations" options={screenOptions('comments')} component={MatchesAndConversationsTab} />
        <Tab.Screen name="MobileUserProfile" options={screenOptions('user-alt')} component={ProfileStackNavigator} />
    </Tab.Navigator>
}

export default function DashboardTabNavigator() {
    return <TabNavigator />
}
