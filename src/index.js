import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { theme } from './constants/StyledComponentsTheme';
import Home from './components/screens/Home';
import Dashboard from './components/screens/Dashboard';
import ForgotPasswordModal from './components/modals/ForgotPassword';
import SignUpModal from './components/modals/SignUp';
import TurnOnLocationModal from './components/modals/TurnOnLocation';
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

    const MainStackNavigator = (props) => {

        const { routeName } = useSelector(state => state.utils);

        useEffect(() => {
            routeName && props.navigation.push(routeName);
        }, [routeName]);

        return <MainStack.Navigator mode={'card'} headerMode={'none'} initialRouteName='Dashboard'>
            <MainStack.Screen name="Home" component={Home} />
            <MainStack.Screen name="Dashboard" component={Dashboard} />
        </MainStack.Navigator>
    }

    return (
        <NavigationContainer>

            <RootStack.Navigator mode={'modal'} headerMode={'none'}>

                <RootStack.Screen name="MainStack" component={MainStackNavigator} />
                <RootStack.Screen options={modalOptions} name="ForgotPasswordModal" component={ForgotPasswordModal} />
                <RootStack.Screen options={modalOptions} name="SignUpModal" component={SignUpModal} />
                <RootStack.Screen options={modalOptions} name="TurnOnLocationModal" component={TurnOnLocationModal} />

            </RootStack.Navigator>
        </NavigationContainer>
    );
};
