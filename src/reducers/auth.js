import * as Types from '../actions/types'

const INITIAL_STATE = {
    isAuthenticated: false,
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
        default:
            return state;
    }
}
