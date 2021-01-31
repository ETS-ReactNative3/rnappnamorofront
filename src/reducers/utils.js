import { SHOW_LOADER, IS_GEOLOCATION_ENABLE, IS_GETTING_LOCATION } from '../constants/Types';

const INITIAL_STATE = {
    showLoader: false,
    isGeolocationEnabled: null,
    isGettingLocation: null
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case SHOW_LOADER:
            return { ...state, showLoader: action.showLoader }
        case IS_GEOLOCATION_ENABLE:
            return { ...state, isGeolocationEnabled: action.isGeolocationEnabled }
        case IS_GETTING_LOCATION:
            return { ...state, isGettingLocation: action.isGettingLocation }
        default:
            return state;
    }
}
