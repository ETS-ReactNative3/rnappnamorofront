import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { theme } from '../../../../../constants/StyledComponentsTheme';
//import EditInfo from './components/screens/Dashboard';
import UserProfile from './screens/UserProfile';
import Configuration from './screens/Configuration';
//import Contact from './modals/Contact';

const MainStack2 = createStackNavigator();
const RootStack2 = createStackNavigator();

export default function ProfileNavigator() {

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

    const MainStackNavigator = () => {
        return <MainStack2.Navigator mode={'card'} headerMode={'none'} initialRouteName='UserProfile'>
            <MainStack2.Screen name="UserProfile" component={UserProfile} />
            <MainStack2.Screen name="Configuration" component={Configuration} />
        </MainStack2.Navigator>
    }

    return (
        <RootStack2.Navigator mode={'modal'} headerMode={'none'}>

            <RootStack2.Screen name="MainStack" component={MainStackNavigator} />
            {/* <RootStack.Screen options={modalOptions} name="Contact" component={ForgotPasswordModal} /> */}

        </RootStack2.Navigator>
    );
};
