import * as RootNavigationRef from '../routes/RootNavigationRef';

import * as Types from '../constants/Types';
import {
    calculateAge,
    getSearchingByDesc,
    getSchoolingDesc,
    getGenderDesc
} from '../components/utils/Functions';
import { Api } from '../components/utils/Api';

export function updateUser(user, shouldShowLoader, CleanMatchSearcherArrayAndGetNextProfile) {
    return async (dispatch, getState) => {

        const dashboardState = getState().dashboard;
        const authState = getState().auth;

        try {

            shouldShowLoader && dispatch(showLoader(true));

            user = { ...user, id: dashboardState.userData.id };

            await Api({ accessToken: authState.accessToken }).post(`users/update_user`, { user });

            const userData = user.ageRange ? {
                ageRange: [
                    parseInt(user.ageRange.split(',')[0]),
                    parseInt(user.ageRange.split(',')[1])
                ]
            } : user;

            dispatch(updateUserDataOnRedux(userData));

            CleanMatchSearcherArrayAndGetNextProfile && dispatch(cleanMatchSearcherArrayAndGetNextProfile(true));

            dispatch(showLoader(false));

        } catch (err) {
            dispatch(handleActionError(err));
        }
    }
}

export function getUserData(
    shouldGetAddress,
    shouldGetProfilesForMatchSearcher,
    shouldSignInOnFirebase,
    shouldGetMatchedProfiles
) {

    return async (dispatch, getState) => {

        const dashboardState = getState().dashboard;
        const authState = getState().auth;

        try {

            const res = await Api({ accessToken: authState.accessToken })
                .get(`users/get_user/${dashboardState.userData.id}`, {});

            const userData = res.data;

            //handling userData fields to be correctly "read" by the app
            const ageRange = userData.ageRange.split(',');
            userData.ageRange = ageRange.map(item => parseInt(item));
            userData.schooling = { key: userData.schooling || 0, label: getSchoolingDesc(userData.schooling || 0) };
            userData.gender = { key: userData.gender || 0, label: getGenderDesc(userData.gender || 0) };
            userData.searchingBy = { key: userData.searchingBy || 1, label: getSearchingByDesc(userData.searchingBy || 1) };
            userData.birthday = new Date(userData.birthday);//needed to work properly on datePicker
            userData.age = calculateAge(userData.birthday);
            userData.showMeOnApp = userData.showMeOnApp == 1;
            userData.emailNotification = userData.emailNotification == 1;
            userData.pushNotification = userData.pushNotification == 1;

            userData.userImages.map(item => {
                item.progress = 0;
                item.uploaded = true;
                item.error = false;
            });

            dispatch(updateUserDataOnRedux(userData));

            !userData.profileComplete && RootNavigationRef.push('CompleteYourProfileModal');

            shouldGetAddress && dispatch(getAddress());

            shouldSignInOnFirebase && dispatch(signInOrSignUpToFirebase());

            shouldGetMatchedProfiles && dispatch(getMatchedProfiles());

            shouldGetProfilesForMatchSearcher && dispatch(getNextProfileForTheMatchSearcher());

        } catch (err) {
            dispatch(handleActionError(err));
        }
    }
}

export function updateUserDataOnRedux(userData) {
    return {
        type: Types.UPDATE_USER_DATA,
        userData
    }
}

export function deleteUserImage(imageId) {
    return async (dispatch, getState) => {
        try {

            dispatch(showLoader(true));

            await Api({ accessToken: getState().auth.accessToken }).delete(`users/user_images/${imageId}`);

            dispatch(showLoader(false));
            dispatch(getUserData(true));

            RootNavigationRef.goBack();

        } catch (err) {
            dispatch(handleActionError(err));
        }
    }
}