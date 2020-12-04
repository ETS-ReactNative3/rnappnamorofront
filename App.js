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
import ForgotPassword from './src/components/modals/ForgotPassword';
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

  const RootStack = createStackNavigator();
  const MainStack = createStackNavigator();

  const MainStackNavigator = () => {
    return <MainStack.Navigator mode={'card'} headerMode={'none'} initialRouteName='Home'>
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen name="Dashboard" component={Dashboard} />
    </MainStack.Navigator>
  }

  return (
    <ThemeProvider theme={theme}>
      <Provider store={createStore(reducers, {}, applyMiddleware(reduxThunk))}>
        <NavigationContainer>

          <RootStack.Navigator mode={'modal'} headerMode={'none'} initialRouteName='Home'>

            <RootStack.Screen name="MainStack" component={MainStackNavigator} />
            <RootStack.Screen options={modalOptions} name="ForgotPassword" component={ForgotPassword} />

          </RootStack.Navigator>

        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
};
