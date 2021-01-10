import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import UserProfile from './screens/UserProfile';
import Configuration from './screens/Configuration';
import ConfigurationEditor from './screens/ConfigurationEditor';
//import EditInfo from './components/screens/Dashboard';

const ProfileNavigator = createStackNavigator();

const TheNavigator = () => {
    return <ProfileNavigator.Navigator mode={'card'} headerMode={'none'} initialRouteName='Configuration'>
        <ProfileNavigator.Screen name="UserProfile" component={UserProfile} />
        <ProfileNavigator.Screen name="Configuration" component={Configuration} />
        <ProfileNavigator.Screen name="ConfigurationEditor" component={ConfigurationEditor} />
        {/* <ProfileNavigator.Screen name="EditInfo" component={EditInfo} /> */}
    </ProfileNavigator.Navigator>
}

export default function ProfileStackNavigator() {
    return <TheNavigator />
};
