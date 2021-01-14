import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './routes/RootNavigationRef';

import Routes from './routes';

export default function Application() {
    return <NavigationContainer ref={navigationRef}>
        <Routes />
    </NavigationContainer>
};
