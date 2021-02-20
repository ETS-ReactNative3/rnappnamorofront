import * as Types from '../constants/Types';

const defaultUserData = {
    ageRange: [25, 35],
    maxDistance: 80,
    firstName: '',
    lastName: '',
    showMeOnApp: true
};

const INITIAL_STATE = {
    userData: defaultUserData,
    uploadingImagesPreview: [],
    firebaseUser: {},
    realTimeFirebaseChat: [],
    selectedConfigMenu: '',
    selectedConfigMenuTitle: '',
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Types.UPDATE_USER_DATA:
            return { ...state, userData: { ...state.userData, ...action.userData } };
        case Types.UPLOADING_IMAGES:
            return {
                ...state, uploadingImagesPreview:
                    action.removeImageByThisId ?
                        state.uploadingImagesPreview.filter(item => item.id !== action.removeImageByThisId)
                        :
                        state.uploadingImagesPreview.some(item => item.id === action.image.id)//verify if item already exists
                            ? state.uploadingImagesPreview.map(item =>
                                item.id === action.image.id//if so update
                                    ? { ...item, progress: action.image.progress }
                                    : item)
                            : [...state.uploadingImagesPreview, action.image]//if not add
            }
        case Types.UPDATE_FIREBASE_USER:
            return { ...state, firebaseUser: action.firebaseUser }
        case Types.UPDATE_REAL_TIME_FIREBASE_CHAT:
            return { ...state, realTimeFirebaseChat: action.realTimeFirebaseChat }
        case Types.SET_SELECTED_CONFIG_MENU:
            return {
                ...state,
                selectedConfigMenu: action.selectedConfigMenu,
                selectedConfigMenuTitle: action.selectedConfigMenuTitle
            }
        default:
            return state;
    }
}
