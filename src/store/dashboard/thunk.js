import { decodeJwtToken } from '../../components/utils/Functions';
import { successNotification } from '../../components/utils/Notifications';
import { Api } from '../../components/utils/Api';
import * as dashboardActions from './actions';
import * as utilsActions from '../utils/actions';
import * as authThunk from '../auth/thunk';
import * as errorThunk from '../error/thunk';
import * as userThunk from '../user/thunk';

export function uploadImageToServer(imageData, selectedFile) {
    return async (dispatch, getState) => {

        const { id: userId } = getState().dashboard.userData;
        const { accessToken } = getState().auth;

        try {

            await Api({ accessToken }).post(`users/user_images/${userId}`, imageData, {
                onUploadProgress: e => {

                    const progress = parseInt(Math.round((e.loaded * 100) / e.total));

                    dispatch(dashboardActions.updateUploadingImagesPreview({ ...selectedFile, progress }));
                }
            });

            dispatch(dashboardActions.updateUploadingImagesPreview(null, selectedFile.id));

            dispatch(userThunk.getUserData(true));

        } catch (err) {

            dispatch(dashboardActions.updateUploadingImagesPreview(null, selectedFile.id));
            dispatch(errorThunk.handleThunkError(err));
        }
    }
}

export function sendNewUserContact(name, email, subject, message) {
    return async (dispatch, getState) => {

        const { accessToken } = getState().auth;

        try {
            dispatch(utilsActions.showLoader(true));

            await Api({ accessToken }).post('users/contact', { name, email, subject, message });

            dispatch(utilsActions.showLoader(false));

            successNotification('Contato enviado com sucesso! Obrigado por nos contactar.');

        } catch (err) {
            dispatch(errorThunk.handleThunkError(err));
        }
    }
}

export function sendRecoverPasswordEmail(email) {
    return async (dispatch, getState) => {

        const { accessToken } = getState().auth;

        try {

            dispatch(utilsActions.showLoader(true));

            await Api({ accessToken }).post('account/send_recovery_password_email', { email });

            dispatch(utilsActions.showLoader(false));

            successNotification('E-mail enviado, verifique sua caixa de entrada.');

        } catch (err) {

            dispatch(utilsActions.showLoader(false));
            dispatch(errorThunk.handleThunkError(err));
        }
    }
}

export function sendEmailVerification(email) {
    return async (dispatch, getState) => {

        const { accessToken } = getState().auth;

        try {

            dispatch(utilsActions.showLoader(true));

            const userId = decodeJwtToken(accessToken).id;

            await Api({ accessToken }).post('account/send_email_verification', { email, id: userId });

            dispatch(utilsActions.showLoader(false));

            successNotification('E-mail enviado, verifique sua caixa de entrada.');

        } catch (err) {
            dispatch(errorThunk.handleThunkError(err));
        }
    }
}

export function resetPassword(email, token, password, passwordConfirmation) {
    return async (dispatch, getState) => {

        const { accessToken } = getState().auth;

        try {

            dispatch(utilsActions.showLoader(true));

            const res = await Api({ accessToken }).post('account/passwordreset', { email, token, password, passwordConfirmation });

            dispatch(utilsActions.showLoader(false));

            return res;

        } catch (err) {
            dispatch(errorThunk.handleThunkError(err));
        }
    }
}

export function deleteAccount() {
    return async (dispatch, getState) => {

        dispatch(utilsActions.showLoader(true));

        const dashboardState = getState().dashboard;
        const authState = getState().auth;

        try {

            await Api({ accessToken: authState.accessToken })
                .delete(`account/delete-account/${dashboardState.userData.id}`)
                .then(() => dispatch(authThunk.signOut()));

        } catch (err) {
            dispatch(errorThunk.handleThunkError(err));
        }
    }
}
