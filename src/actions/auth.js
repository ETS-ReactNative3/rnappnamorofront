import { Keyboard } from 'react-native';
import firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';
import * as RootNavigationRef from '../routes/RootNavigationRef';

import * as Types from '../constants/Types';
import { decodeJwtToken } from '../components/utils/Functions';
import { Api } from '../components/utils/Api';
import * as Actions from '../actions';

const unsubscribeFirebaseListeners = [];

export function setAccessTokenOnStorageAndRedux(accessToken) {
    return async dispatch => {
        AsyncStorage.setItem('accessToken', accessToken || '');
        dispatch(updateAccessTokenOnRedux(accessToken));
    }
}

export function updateAccessTokenOnRedux(accessToken) {
    return {
        type: Types.UPDATE_ACCESS_TOKEN,
        accessToken
    }
}

export function checkIfTokenHasExpired() {
    return async (dispatch, getState) => {
        try {

            dispatch(isCheckingIfTokenHasExpiredStatus(true));

            const accessToken = getState().auth.accessToken;

            if (accessToken) {

                await Api({ accessToken }).post('account/check_if_token_has_expired', { /*body*/ });

                dispatch({
                    type: Types.CHECK_IF_TOKEN_HAS_EXPIRED,
                    isAuthenticated: true
                });

                dispatch(isCheckingIfTokenHasExpiredStatus(false));

                dispatch(getUserData(true, true, true, true));

            } else {

                dispatch(isCheckingIfTokenHasExpiredStatus(false));
                dispatch(signOut());
            }

        } catch (err) {

            dispatch(isCheckingIfTokenHasExpiredStatus(false));
            dispatch(handleActionError(err));
        }
    }
}

export function isCheckingIfTokenHasExpiredStatus(isCheckingIfTokenHasExpired) {
    return {
        type: Types.CHECKING_IF_TOKEN_HAS_EXPIRED,
        isCheckingIfTokenHasExpired
    }
}

export function signOut() {
    return async (dispatch) => {
        try {
            unsubscribeFirebaseListeners.map(item => item());

            await AsyncStorage.setItem('accessToken', '');

            firebase.auth().signOut();

            dispatch(cleanMatchSearcherArrayAndGetNextProfile(false));
            dispatch(updateMatchedProfilesArray([]));

            dispatch(setAccessTokenOnStorageAndRedux(''));
            dispatch(signOutAction());

            dispatch(showLoader(false));

            //if the user logout while something didn't finished yet, handleActionError and then signOut() will be called
            //this will make RootNavigationRef.reset('Home') be read more than once, wich will create a non desirable effect
            //on Home screen "recreating" it many times
            RootNavigationRef.getCurrentRoutName() != 'Home' && RootNavigationRef.reset('Home');

        } catch (err) {

            dispatch(handleActionError(err));
            dispatch(setAccessTokenOnStorageAndRedux(''));
        }
    }
}

export function signOutAction() {
    return { type: Types.AUTH_SIGN_OUT };
}

export function signUpAction(userData, navigation) {
    return async (dispatch, getState) => {

        try {

            dispatch(showLoader(true));

            const res = await Api({ accessToken: getState().auth.accessToken }).post('account/signup', userData);

            navigation.goBack();

            dispatch(setAccessTokenOnStorageAndRedux(res.data.token));

            dispatch({
                type: Types.AUTH_SIGN_UP,
            });

            dispatch(showLoader(false));

            RootNavigationRef.reset('Dashboard');

        } catch (err) {
            dispatch(handleActionError(err));
        }
    }
}

export function signInLocalAction(userData) {
    return async dispatch => {
        try {

            dispatch(showLoader(true));

            const res = await Api({ accessToken: null }).post('account/signin', userData);

            dispatch(setAccessTokenOnStorageAndRedux(res.data.token));
            dispatch(Actions.updateUserDataOnRedux({ id: decodeJwtToken(res.data.token).id }));

            dispatch(Actions.showLoader(false));

            Keyboard.dismiss();

            dispatch({ type: Types.AUTH_SIGN_IN });

            dispatch(Actions.getUserData(true, true, true, true));

            RootNavigationRef.reset('Dashboard');

        } catch (err) {
            dispatch(handleActionError(err));
        }
    }
}

export function signInOauthAction(oauthAccessToken, type) {
    return async (dispatch, getState) => {

        const authState = getState().auth;

        try {

            dispatch(showLoader(true));

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

            dispatch(Actions.updateUserDataOnRedux({ id: decodeJwtToken(res.data.token).id }));

            dispatch(showLoader(false));

            Keyboard.dismiss();

            dispatch({ type: Types.AUTH_SIGN_IN });

            dispatch(getUserData(true, true, true, true));

            RootNavigationRef.reset('Dashboard');

        } catch (err) {
            dispatch(handleActionError(err));
        }
    }
}