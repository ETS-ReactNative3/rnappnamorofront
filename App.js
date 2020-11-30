import React from 'react';
import firebase from 'firebase';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import EStyleSheet from 'react-native-extended-stylesheet';

import { theme } from './src/constants/StyledComponentsTheme';
import reducers from './src/reducers';
import Home from './src/components/screens/Home';
import Dashboard from './src/components/screens/Dashboard';
// import Terms from './src/components/screens/Terms';
// import PasswordReset from './src/components/screens/PasswordReset';
// import EmailVerification from './src/components/screens/EmailVerification';

// const firebaseConfig = {
//   apiKey: REACT_APP_FIREBASE_API_KEY,
//   authDomain: REACT_APP_FIREBASE_AUTHDOMAIN,
//   databaseURL: REACT_APP_FIREBASE_DATABASEURL,
//   projectId: REACT_APP_FIREBASE_PROJECTID,
//   storageBucket: REACT_APP_FIREBASE_STORAGEBUCKET,
//   messagingSenderId: REACT_APP_FIREBASE_MESSAGINGSENDERID,
//   appId: REACT_APP_FIREBASE_APPID,
//   measurementId: REACT_APP_FIREBASE_MEASUREMENTID
// };

//firebase.initializeApp(firebaseConfig);
EStyleSheet.build(theme);

export default function App() {

  const Stack = createStackNavigator();

  return (
    <ThemeProvider theme={theme}>
      <Provider store={createStore(reducers, {}, applyMiddleware(reduxThunk))}>
        <NavigationContainer>
          <Stack.Navigator headerMode={'none'} initialRouteName='Home'>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            {/*<Stack.Screen name="Terms" component={Terms} />
            <Stack.Screen name="PasswordReset" component={PasswordReset} />
            <Stack.Screen name="EmailVerification" component={EmailVerification} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
};
