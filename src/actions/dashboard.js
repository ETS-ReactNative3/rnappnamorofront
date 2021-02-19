import * as RootNavigationRef from '../routes/RootNavigationRef';

import * as Types from '../constants/Types';
import { decodeJwtToken } from '../components/utils/Functions';
import { successNotification } from '../components/utils/Notifications';
import { Api } from '../components/utils/Api';

export function uploadImageToServer(imageData, selectedFile) {
    return async (dispatch, getState) => {

        const { id: userId } = getState().dashboard.userData;
        const { accessToken } = getState().auth;

        try {

            await Api({ accessToken }).post(`users/user_images/${userId}`, imageData, {
                onUploadProgress: e => {

                    const progress = parseInt(Math.round((e.loaded * 100) / e.total));

                    dispatch(updateUploadingImagesPreview({ ...selectedFile, progress }));
                }
            });

            dispatch(updateUploadingImagesPreview(null, selectedFile.id));

            dispatch(getUserData(true));

        } catch (err) {

            dispatch(updateUploadingImagesPreview(null, selectedFile.id));
            dispatch(handleActionError(err));
        }
    }
}

export function sendNewUserContact(name, email, subject, message) {
    return async (dispatch, getState) => {

        const { accessToken } = getState().auth;

        try {

            dispatch(showLoader(true));

            await Api({ accessToken }).post('users/contact', { name, email, subject, message });

            dispatch(showLoader(false));

            successNotification('Contato enviado com sucesso! Obrigado por nos contactar.');

        } catch (err) {
            dispatch(handleActionError(err));
        }
    }
}

export function sendRecoverPasswordEmail(email) {
    return async (dispatch, getState) => {

        const { accessToken } = getState().auth;

        try {

            dispatch(showLoader(true));

            await Api({ accessToken }).post('account/send_recovery_password_email', { email });

            dispatch(showLoader(false));

            successNotification('E-mail enviado, verifique sua caixa de entrada.');

        } catch (err) {

            dispatch(Actions.showLoader(false));
            dispatch(handleActionError(err));
        }
    }
}

export function sendEmailVerification(email) {
    return async (dispatch, getState) => {

        const { accessToken } = getState().auth;

        try {

            dispatch(showLoader(true));

            const userId = decodeJwtToken(accessToken).id;

            await Api({ accessToken }).post('account/send_email_verification', { email, id: userId });

            dispatch(showLoader(false));

            successNotification('E-mail enviado, verifique sua caixa de entrada.');

        } catch (err) {
            dispatch(handleActionError(err));
        }
    }
}

export function resetPassword(email, token, password, passwordConfirmation) {
    return async (dispatch, getState) => {

        const { accessToken } = getState().auth;

        try {

            dispatch(showLoader(true));

            const res = await Api({ accessToken }).post('account/passwordreset', { email, token, password, passwordConfirmation });

            dispatch(showLoader(false));

            return res;

        } catch (err) {
            dispatch(handleActionError(err));
        }
    }
}

export function updateUploadingImagesPreview(image, removeImageByThisId) {
    return {
        type: Types.UPLOADING_IMAGES,
        image,
        removeImageByThisId
    };
}

export function unmatch(profileId) {
    return async (dispatch, getState) => {

        const dashboardState = getState().dashboard;
        const authState = getState().auth;

        try {

            dispatch(showLoader(true));

            await Api({ accessToken: authState.accessToken }).post(`users/unmatch`,
                { userId: dashboardState.userData.id, profileId }
            );

            await dispatch(removeAllConversationsFromThisMatch(profileId));

            dispatch(showLoader(false));

            dispatch(getUserData(true, true, false, true));

            RootNavigationRef.goBack();//hides yesNo modal
            RootNavigationRef.goBack();//hides chat screen modal

        } catch (err) {
            dispatch(handleActionError(err));
        }
    }
}

export function deleteAccount() {
    return async (dispatch, getState) => {

        dispatch(showLoader(true));

        const dashboardState = getState().dashboard;
        const authState = getState().auth;

        try {

            await Api({ accessToken: authState.accessToken })
                .delete(`account/delete-account/${dashboardState.userData.id}`)
                .then(() => dispatch(signOut()));

        } catch (err) {
            dispatch(handleActionError(err));
        }
    }
}

export function setSelectedConfigMenu(selectedConfigMenu, selectedConfigMenuTitle) {
    return ({
        type: Types.SET_SELECTED_CONFIG_MENU,
        selectedConfigMenuTitle,
        selectedConfigMenu
    })
}
