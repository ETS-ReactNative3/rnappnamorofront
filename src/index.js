import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { theme } from './constants/StyledComponentsTheme';
import { modalOptions } from './constants/ModalOptions';
import Home from './components/screens/Home';
import Dashboard from './components/screens/Dashboard';
import ForgotPasswordModal from './components/modals/ForgotPassword';
import SignUpModal from './components/modals/SignUp';
import TurnOnLocationModal from './components/modals/TurnOnLocation';
// import Terms from './src/components/screens/Terms';
// import PasswordReset from './src/components/screens/PasswordReset';
// import EmailVerification from './src/components/screens/EmailVerification';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const MainStackNavigator = () => {
    return <MainStack.Navigator mode={'card'} headerMode={'none'} initialRouteName='Dashboard'>
        <MainStack.Screen name="Home" component={Home} />
        <MainStack.Screen name="Dashboard" component={Dashboard} />
    </MainStack.Navigator>
}

const RootStackNavigator = () => {
    return <RootStack.Navigator mode={'modal'} headerMode={'none'}>
        <RootStack.Screen name="MainStack" component={MainStackNavigator} />
        <RootStack.Screen options={modalOptions} name="ForgotPasswordModal" component={ForgotPasswordModal} />
        <RootStack.Screen options={modalOptions} name="SignUpModal" component={SignUpModal} />
        <RootStack.Screen options={modalOptions} name="TurnOnLocationModal" component={TurnOnLocationModal} />
    </RootStack.Navigator>
}

export default function Application() {
    return (
        <NavigationContainer>
            <RootStackNavigator />
        </NavigationContainer>
    );
};
