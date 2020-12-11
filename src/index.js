import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { theme } from './constants/StyledComponentsTheme';
import Home from './components/screens/Home';
import Dashboard from './components/screens/Dashboard';
import ForgotPassword from './components/modals/ForgotPassword';
import SignUp from './components/modals/SignUp';
// import Terms from './src/components/screens/Terms';
// import PasswordReset from './src/components/screens/PasswordReset';
// import EmailVerification from './src/components/screens/EmailVerification';

export default function Application() {

    const modalOptions = {
        headerShown: false,
        cardStyle: { backgroundColor: theme.$opaqueBackgroundColor },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
            overlayStyle: {
                opacity: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.6],
                    extrapolate: "clamp"
                })
            }
        })
    };

    const MainStack = createStackNavigator();
    const RootStack = createStackNavigator();

    const MainStackNavigator = () => {
        return <MainStack.Navigator mode={'card'} headerMode={'none'} initialRouteName='Dashboard'>
            <MainStack.Screen name="Home" component={Home} />
            <MainStack.Screen name="Dashboard" component={Dashboard} />
        </MainStack.Navigator>
    }

    return (
        <NavigationContainer>
            <RootStack.Navigator mode={'modal'} headerMode={'none'}>

                <RootStack.Screen name="MainStack" component={MainStackNavigator} />
                <RootStack.Screen options={modalOptions} name="ForgotPassword" component={ForgotPassword} />
                <RootStack.Screen options={modalOptions} name="SignUp" component={SignUp} />

            </RootStack.Navigator>
        </NavigationContainer>
    );
};
