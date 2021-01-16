import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { modalOptions } from '../constants/ModalOptions';
import Home from '../components/screens/Home';
import Dashboard from '../components/screens/Dashboard';
import ForgotPasswordModal from '../components/modals/ForgotPassword';
import SignUpModal from '../components/modals/SignUp';
import TurnOnLocationModal from '../components/modals/TurnOnLocation';
import GenericYesNoModal from '../components/modals/GenericYesNoModal';
import ContactModal from '../components/modals/Contact';
import CompleteYourProfileModal from '../components/modals/CompleteYourProfile';

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
        <RootStack.Screen options={modalOptions} name="CompleteYourProfileModal" component={CompleteYourProfileModal} />
        <RootStack.Screen options={modalOptions} name="TurnOnLocationModal" component={TurnOnLocationModal} />
        <RootStack.Screen options={modalOptions} name="GenericYesNoModal" component={GenericYesNoModal} />
        <RootStack.Screen options={modalOptions} name="ContactModal" component={ContactModal} />
    </RootStack.Navigator>
}

export default function Application() {
    return <RootStackNavigator />
};
