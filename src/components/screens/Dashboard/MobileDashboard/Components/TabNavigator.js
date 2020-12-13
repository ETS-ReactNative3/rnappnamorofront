import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { theme } from '../../../../../constants/StyledComponentsTheme';
import { AwesomeIcon } from '../../../../commonComponents';
import { GenericColumnView } from '../../../../../GlobalStyle';

import MatchSearcher from '../../MatchSearcher';
// import MobileUserProfile from './../Components/MobileUserProfile';
// import MessagesTabAndMatchesTabMerge from './../Components/MessagesTabAndMatchesTabMerge';

export default function TabNavigator() {

    const Tab = createMaterialTopTabNavigator();

    const Icon = (props) => {
        return (
            <GenericColumnView style={{ justifyContent: 'center', alignItems: 'center' }}>
                <AwesomeIcon
                    customIconStyle={{ color: props.iconColor }}
                    solidIcon
                    iconName={props.iconName}
                />
            </GenericColumnView>
        );
    }

    const screenOptions = (iconName) => {
        return { tabBarIcon: ({ color }) => <Icon iconColor={color} iconName={iconName} /> }
    }

    const MatchSearcherScreen = () => <MatchSearcher />;

    return <Tab.Navigator
        style={{ height: '100%', width: '100%' }}
        tabBarOptions={{
            activeTintColor: theme.$primaryColor,
            inactiveTintColor: theme.$lightGray,
            indicatorStyle: { backgroundColor: 'transparent' },
            showIcon: true,
            showLabel: false
        }}>
        <Tab.Screen name="MatchSearcher" options={screenOptions('heart')} component={MatchSearcherScreen} />
        <Tab.Screen name="MessagesTabAndMatchesTabMerge" options={screenOptions('comments')} component={MatchSearcherScreen} />
        <Tab.Screen name="MobileUserProfile" options={screenOptions('user-alt')} component={MatchSearcherScreen} />
    </Tab.Navigator>
}
