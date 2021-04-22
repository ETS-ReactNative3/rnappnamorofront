import { Keyboard } from 'react-native';
import firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';

import { decodeJwtToken } from '../../components/utils/Functions';
import { Api } from '../../components/utils/Api';
import * as RootNavigationRef from '../../routes/RootNavigationRef';
import * as utilsActions from '../utils/actions';
import * as matchActions from '../match/actions';
import * as authActions from '../auth/actions';
import * as userActions from '../user/actions';
import * as matchThunk from '../match/thunk';
import * as errorThunk from '../error/thunk';
import * as userThunk from '../user/thunk';

const unsubscribeFirebaseListeners = [];

export function setAccessTokenOnStorageAndRedux(accessToken) {
    return async dispatch => {
        AsyncStorage.setItem('accessToken', accessToken || '');
        dispatch(authActions.updateAccessTokenOnRedux(accessToken));
    }
}

export function checkIfTokenHasExpired() {
    return async (dispatch, getState) => {
        try {

            dispatch(authActions.isCheckingIfTokenHasExpiredStatus(true));

            const accessToken = getState().auth.accessToken;

            if (accessToken) {

                await Api({ accessToken }).post('account/check_if_token_has_expired', { /*body*/ });

                dispatch(authActions.isCheckingIfTokenHasExpiredStatus(false));

                dispatch(userThunk.getUserData(true, true, true, true));

            } else {

                dispatch(authActions.isCheckingIfTokenHasExpiredStatus(false));
                dispatch(signOut());
            }

        } catch (err) {

            dispatch(authActions.isCheckingIfTokenHasExpiredStatus(false));
            dispatch(errorThunk.handleThunkError(err));
        }
    }
}

export function signOut() {
    return async (dispatch) => {
        try {
            unsubscribeFirebaseListeners.map(item => item());

            await AsyncStorage.setItem('accessToken', '');

            firebase.auth().signOut();

            dispatch(matchThunk.cleanMatchSearcherArrayAndGetNextProfile(false));
            dispatch(matchActions.updateMatchedProfilesArray([]));

            dispatch(setAccessTokenOnStorageAndRedux(''));
            dispatch(authActions.signOutAction());

            dispatch(utilsActions.showLoader(false));

            //if the user logout while something didn't finished yet, errorThunk.handleThunkError and then signOut() will be called
            //this will make RootNavigationRef.reset('Home') be read more than once, wich will create a non desirable effect
            //on Home screen "recreating" it many times
            RootNavigationRef.getCurrentRoutName() != 'Home' && RootNavigationRef.reset('Home');

        } catch (err) {

            dispatch(errorThunk.handleThunkError(err));
            dispatch(setAccessTokenOnStorageAndRedux(''));
        }
    }
}

export function signUp(userData, navigation) {
    return async (dispatch, getState) => {

        try {

            dispatch(utilsActions.showLoader(true));

            const res = await Api({ accessToken: getState().auth.accessToken }).post('account/signup', userData);

            navigation.goBack();

            dispatch(setAccessTokenOnStorageAndRedux(res.data.token));

            dispatch(authActions.signUpAction());

            dispatch(utilsActions.showLoader(false));

            RootNavigationRef.reset('Dashboard');

        } catch (err) {
            dispatch(errorThunk.handleThunkError(err));
        }
    }
}

export function signInLocal(userData) {
    return async dispatch => {
        try {

            dispatch(utilsActions.showLoader(true));

            const res = await Api({ accessToken: null }).post('account/signin', userData);

            dispatch(setAccessTokenOnStorageAndRedux(res.data.token));
            dispatch(userActions.updateUserDataOnRedux({ id: decodeJwtToken(res.data.token).id }));

            dispatch(utilsActions.showLoader(false));

            Keyboard.dismiss();

            dispatch(authActions.signInAction());
            
            dispatch(userThunk.getUserData(true, true, true, true));

            RootNavigationRef.reset('Dashboard');

        } catch (err) {
            dispatch(errorThunk.handleThunkError(err));
        }
    }
}

export function signInOauth(oauthAccessToken, type) {
    return async (dispatch, getState) => {

        const authState = getState().auth;

        try {

            dispatch(utilsActions.showLoader(true));

            let res;

            switch (type) {
                case 'facebook':
                    res = await Api({ accessToken: authState.accessToken }).post('account/facebook', { access_token: oauthAccessToken });
                    break;
                default:
                    res = await Api({ accessToken: authState.accessToken }).post('account/google', { access_token: oauthAccessToken });
                    break;
            }

            dispatch(setAccessTokenOnStorageAndRedux(res.data.token));

            dispatch(userActions.updateUserDataOnRedux({ id: decodeJwtToken(res.data.token).id }));

            dispatch(utilsActions.showLoader(false));

            Keyboard.dismiss();

            dispatch(authActions.signInAction());

            dispatch(userThunk.getUserData(true, true, true, true));

            RootNavigationRef.reset('Dashboard');

        } catch (err) {
            dispatch(errorThunk.handleThunkError(err));
        }
    }
}
