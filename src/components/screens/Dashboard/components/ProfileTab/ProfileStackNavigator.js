import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Configuration from './screens/Configuration';
import UserProfile from './screens/UserProfile';
//import EditInfo from './components/screens/Dashboard';
//import Contact from './modals/Contact';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const MainStackNavigator = () => {
    return <MainStack.Navigator mode={'card'} headerMode={'none'} initialRouteName='Configuration'>
        <MainStack.Screen name="UserProfile" component={UserProfile} />
        <MainStack.Screen name="Configuration" component={Configuration} />
    </MainStack.Navigator>
}

const RootStackNavigator = () => {
    return <RootStack.Navigator mode={'modal'} headerMode={'none'}>
        <RootStack.Screen name="MainStack" component={MainStackNavigator} />
        {/* <RootStack.Screen options={modalOptions} name="Contact" component={ForgotPasswordModal} /> */}
    </RootStack.Navigator>
}

export default function ProfileStackNavigator() {
    return <RootStackNavigator />
};
