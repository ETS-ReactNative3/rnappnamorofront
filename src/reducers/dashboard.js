import * as Types from '../constants/Types';

const defaultUserData = {
    ageRange: ['25', '35'],
    firstName: '',
    lastName: '',
    showMeOnApp: true
};

const INITIAL_STATE = {
    isLeftProfileEditorOpen: false,
    isLeftProfileOpen: false,
    isProfileCardEditModeOpen: false,
    isChatPanelOpen: false,
    isMobileConfigOpen: false,
    isMobileEditInfoOpen: false,
    isSearchingProfiles: true,
    userData: defaultUserData,
    matchProfileData: {},
    matchSearcherProfiles: [],
    matchProfiles: [],
    uploadingImagesPreview: [],
    UserMatch: [],
    selectedLeftProfileEditor: '',
    address: '',
    firebaseUser: {},
    realTimeFirebaseUsers: [],
    realTimeFirebaseChat: [],
    profileIdsAlreadyDownloaded: []
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Types.SHOW_LEFT_PROFILE_EDITOR:
            return { ...state, isLeftProfileEditorOpen: action.isLeftProfileEditorOpen };
        case Types.SHOW_LEFT_PROFILE:
            return { ...state, isLeftProfileOpen: action.isLeftProfileOpen };
        case Types.UPDATE_USER_DATA:
            return { ...state, userData: { ...state.userData, ...action.userData } };
        case Types.UPDATE_SELECTED_LEFT_PROFILE_EDITOR:
            return { ...state, selectedLeftProfileEditor: action.selectedLeftProfileEditor };
        case Types.UPDATE_ADDRESS:
            return { ...state, address: action.address };
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
        case Types.PROFILE_CARD_EDIT_MODE:
            return { ...state, isProfileCardEditModeOpen: action.isProfileCardEditModeOpen }
        case Types.ADD_USER_TO_THE_MATCH_SEARCHER_ARRAY:
            return { ...state, matchSearcherProfiles: [...state.matchSearcherProfiles, action.user] }
        case Types.REMOVE_USER_FROM_THE_MATCH_SEARCHER_ARRAY:
            return {
                ...state, matchSearcherProfiles:
                    action.removeAll ? [] :
                        state.matchSearcherProfiles.filter(item => item.id !== action.userId)
            }
        case Types.IS_SEARCHING_PROFILES:
            return { ...state, isSearchingProfiles: action.isSearchingProfiles }
        case Types.UPDATE_MATCH_PROFILE_ARRAY:
            return { ...state, matchProfiles: action.matchProfiles }
        case Types.UPDATE_FIREBASE_USER:
            return { ...state, firebaseUser: action.firebaseUser }
        case Types.UPDATE_REAL_TIME_FIREBASE_USERS:
            return { ...state, realTimeFirebaseUsers: action.realTimeFirebaseUsers }
        case Types.OPEN_CHAT_PANEL:
            return { ...state, isChatPanelOpen: action.isChatPanelOpen }
        case Types.SET_SELECTED_MATCH_PROFILE_DATA:
            return { ...state, selectedMatchProfileData: action.selectedMatchProfileData }
        case Types.UPDATE_REAL_TIME_FIREBASE_CHAT:
            return { ...state, realTimeFirebaseChat: action.realTimeFirebaseChat }
        case Types.OPEN_MOBILE_CONFIG:
            return { ...state, isMobileConfigOpen: action.isMobileConfigOpen }
        case Types.OPEN_MOBILE_EDIT_INFO:
            return { ...state, isMobileEditInfoOpen: action.isMobileEditInfoOpen }
        case Types.UPDATE_PROFILE_IDS_ALREADY_DOWNLOADED:
            return { ...state, profileIdsAlreadyDownloaded: [...state.profileIdsAlreadyDownloaded, action.userId] }
        case Types.REMOVE_ALL_IDS_FROM_PROFILE_IDS_ALREADY_DOWNLOADED:
            return { ...state, profileIdsAlreadyDownloaded: [] }
        default:
            return state;
    }
}
