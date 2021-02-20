import * as Types from '../constants/Types';

const INITIAL_STATE = {
    isGettingProfileForTheMatchSearcher: null,
    matchSearcherProfiles: [],
    matchedProfiles: [],
    profileIdsAlreadyDownloaded: [],
    isSuperLikeAvailable: false,
    swipeCardRef: null,
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Types.IS_GETTING_PROFILE_FOR_THE_MATCH_SEARCHER:
            return { ...state, isGettingProfileForTheMatchSearcher: action.isGettingProfileForTheMatchSearcher }
        case Types.ADD_PROFILE_TO_THE_MATCH_SEARCHER_ARRAY:
            return { ...state, matchSearcherProfiles: [...state.matchSearcherProfiles, action.profile] }
        case Types.REMOVE_PROFILE_FROM_THE_MATCH_SEARCHER_ARRAY:
            return {
                ...state, matchSearcherProfiles:
                    action.removeAll ? [] :
                        state.matchSearcherProfiles.filter(item => item.id !== action.profileId)
            }
        case Types.UPDATE_MATCHED_PROFILES_ARRAY:
            return { ...state, matchedProfiles: action.matchedProfiles }
        case Types.UPDATE_PROFILE_IDS_ALREADY_DOWNLOADED:
            return { ...state, profileIdsAlreadyDownloaded: [...state.profileIdsAlreadyDownloaded, action.userId] }
        case Types.REMOVE_ALL_IDS_FROM_PROFILE_IDS_ALREADY_DOWNLOADED:
            return { ...state, profileIdsAlreadyDownloaded: [] }
        case Types.IS_SUPERLIKE_AVAILABLE:
            return { ...state, isSuperLikeAvailable: action.isSuperLikeAvailable }
        case Types.UPDATE_SWIPE_CARD_REF:
            return { ...state, swipeCardRef: action.swipeCardRef }
        default:
            return state;
    }
}
