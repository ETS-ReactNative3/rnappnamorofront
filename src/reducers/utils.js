import { SHOW_LOADER, MOUSE_BUTTON_DOWN, IS_GEOLOCATION_ENABLE } from '../constants/Types';

const INITIAL_STATE = {
    showLoader: false,
    isMouseButtonDown: false,
    isGeolocationEnabled: true
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case SHOW_LOADER:
            return { ...state, showLoader: action.showLoader }
        case MOUSE_BUTTON_DOWN:
            return { ...state, isMouseButtonDown: action.isMouseButtonDown }
        case IS_GEOLOCATION_ENABLE:
            return { ...state, isGeolocationEnabled: action.isGeolocationEnabled }
        default:
            return state;
    }
}
