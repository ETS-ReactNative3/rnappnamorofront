import * as types from '../actions/types'

const INITIAL_STATE = {
    isForgotPasswordModalOpen: false,
    isSignUpModalOpen: false,
    isContactModalOpen: false,
    isTurnOnLocationModalOpen: false,
    isCompleteYourProfileModalOpen: false,
    isGenericYesNoModalOpen: false,
    isYouHaveAMatchModalOpen: false,
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case types.OPEN_FORGOT_PASSWORD_MODAL:
            return { ...state, isForgotPasswordModalOpen: action.isForgotPasswordModalOpen };
        case types.OPEN_SIGN_UP_MODAL:
            return { ...state, isSignUpModalOpen: action.isSignUpModalOpen };
        case types.OPEN_TURN_ON_LOCATION_MODAL:
            return { ...state, isTurnOnLocationModalOpen: action.isTurnOnLocationModalOpen };
        case types.OPEN_COMPLETE_YOUR_PROFILE_MODAL:
            return { ...state, isCompleteYourProfileModalOpen: action.isCompleteYourProfileModalOpen };
        case types.OPEN_GENERIC_YES_NO_MODAL:
            return { ...state, isGenericYesNoModalOpen: action.isGenericYesNoModalOpen };
        case types.OPEN_CONTACT_MODAL:
            return { ...state, isContactModalOpen: action.isContactModalOpen };
        case types.OPEN_YOU_HAVE_A_MATCH_MODAL:
            return { ...state, isYouHaveAMatchModalOpen: action.isYouHaveAMatchModalOpen }
        default:
            return state;
    }
}
