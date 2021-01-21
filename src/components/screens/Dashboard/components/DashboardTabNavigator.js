import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { theme } from '../../../../constants/StyledComponentsTheme';
import { AwesomeIcon } from '../../../commonComponents';
import { GenericColumnView } from '../../../../GlobalStyle';

import MatchSearcherTab from './MatchSearcherTab';
import ProfileStackNavigator from './ProfileTab/ProfileStackNavigator';
import MatchesAndMessagesTab from './MatchesAndMessagesTab';

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

const TabNavigator = () => {
    return <Tab.Navigator
        style={{ height: '100%', width: '100%' }}
        tabBarPosition='bottom'
        tabBarOptions={{
            activeTintColor: theme.$primaryColor,
            inactiveTintColor: theme.$lightGray,
            indicatorStyle: { backgroundColor: 'transparent' },
            showIcon: true,
            showLabel: false,
        }}>

        <Tab.Screen name="MatchesAndMessages" options={screenOptions('comments')} component={MatchesAndMessagesTab} />
        <Tab.Screen name="MatchSearcher" options={screenOptions('heart')} component={MatchSearcherTab} />
        <Tab.Screen name="MobileUserProfile" options={screenOptions('user-alt')} component={ProfileStackNavigator} />

    </Tab.Navigator>
}

export default function DashboardTabNavigator() {
    return <TabNavigator />
}
