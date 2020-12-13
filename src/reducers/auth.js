import * as Types from '../constants/Types';

const INITIAL_STATE = {
    isAuthenticated: true,
    checkingIfTokenHasExpired: true,
    accessToken: '',
    firebaseUid: ''
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Types.AUTH_SIGN_UP:
            return { ...state, isAuthenticated: true }
        case Types.AUTH_SIGN_IN:
            return { ...state, isAuthenticated: true }
        case Types.CHECK_IF_TOKEN_HAS_EXPIRED:
            return { ...state, isAuthenticated: action.isAuthenticated }
        case Types.AUTH_SIGN_OUT:
            return { ...state, isAuthenticated: false }
        case Types.UPDATE_ACCESS_TOKEN:
            return { ...state, accessToken: action.accessToken }
        case Types.UPDATE_FIREBASE_UID:
            return { ...state, firebaseUid: action.firebaseUid }
        case Types.CHECKING_IF_TOKEN_HAS_EXPIRED:
            return { ...state, checkingIfTokenHasExpired: action.checkingIfTokenHasExpired }
        default:
            return state;
    }
}