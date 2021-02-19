import * as Types from '../constants/Types';
import { calculateDistanceFromLatLonInKm, calculateAge } from '../components/utils/Functions';
import { Api } from '../components/utils/Api';

export function getMatchedProfiles() {
    return async (dispatch, getState) => {
        //get only profiles that was already matched with current user

        const dashboardState = getState().dashboard;
        const authState = getState().auth;

        try {
            const res = await Api({ accessToken: authState.accessToken }).get(
                `users/get_match_profiles/${dashboardState.userData.id}`
                , {});

            res.data.map(item => {
                item.age = calculateAge(new Date(item.birthday))
                item.distance = parseInt(calculateDistanceFromLatLonInKm(
                    dashboardState.userData.currentLongitude,
                    dashboardState.userData.currentLatitude,
                    item.lastLongitude,
                    item.lastLatitude
                ))
            });

            dispatch(updateMatchedProfilesArray(res.data));

        } catch (err) {
            dispatch(handleActionError(err));
        }
    }
}

export function updateSwipeCardRef(swipeCardRef) {
    return {
        type: Types.UPDATE_SWIPE_CARD_REF,
        swipeCardRef
    }
}

export function updateMatchedProfilesArray(matchedProfiles) {
    return {
        type: Types.UPDATE_MATCHED_PROFILES_ARRAY,
        matchedProfiles
    }
}

export function updateIsGettingProfileForTheMatchSearcher(isGettingProfileForTheMatchSearcher) {
    return {
        type: Types.IS_GETTING_PROFILE_FOR_THE_MATCH_SEARCHER,
        isGettingProfileForTheMatchSearcher
    }
}

export function updateProfileIdsAlreadyDownloaded(userId) {
    return {
        type: Types.UPDATE_PROFILE_IDS_ALREADY_DOWNLOADED,
        userId
    };
}

export function addProfileIntoMatchSearcherArray(profile) {
    return {
        type: Types.ADD_PROFILE_TO_THE_MATCH_SEARCHER_ARRAY,
        profile
    };
}

export function cleanMatchSearcherArrayAndGetNextProfile(shouldGetProfilesForMatchSearcher) {
    return dispatch => {
        dispatch(removeAllIdsFromProfileIdsAlreadyDownloaded());
        dispatch(removeUserFromMatchSearcher(null, true));

        shouldGetProfilesForMatchSearcher && dispatch(getNextProfileForTheMatchSearcher());
    }
}

export function getNextProfileForTheMatchSearcher() {
    return async (dispatch, getState) => {

        const {
            userData,
            profileIdsAlreadyDownloaded,
            matchSearcherProfiles,
            isGettingProfileForTheMatchSearcher
        } = getState().dashboard;
        const { accessToken } = getState().auth;
        const { isGeolocationEnabled } = getState().utils;

        try {
            if (!isGettingProfileForTheMatchSearcher && matchSearcherProfiles.length < 2 && isGeolocationEnabled) {

                dispatch(updateIsGettingProfileForTheMatchSearcher(true));

                const res = await Api({ accessToken }).post('users/get_profile_to_the_match_searcher', {
                    currentLongitude: userData.currentLongitude,
                    currentLatitude: userData.currentLatitude,
                    maxDistance: userData.maxDistance,
                    userId: userData.id,
                    searchingBy: userData.searchingBy.key,
                    profileIdsAlreadyDownloaded: profileIdsAlreadyDownloaded,
                    ageRange: userData.ageRange
                });

                if (res.data.user) {
                    res.data.user.distance = parseInt(calculateDistanceFromLatLonInKm(
                        userData.currentLongitude,
                        userData.currentLatitude,
                        res.data.user.lastLongitude,
                        res.data.user.lastLatitude
                    ));

                    res.data.user.age = calculateAge(new Date(res.data.user.birthday));

                    dispatch(addProfileIntoMatchSearcherArray(res.data.user));

                    dispatch(updateProfileIdsAlreadyDownloaded(res.data.user.id));

                    dispatch(updateIsGettingProfileForTheMatchSearcher(false));

                    /*matchSearcherProfiles must have at least 2 profiles, so when user likes/ignores the first one,
                    the second will appear*/
                    matchSearcherProfiles.length < 2 && dispatch(getNextProfileForTheMatchSearcher());
                }
                else
                    dispatch(updateIsGettingProfileForTheMatchSearcher(false));
            }
            else
                dispatch(updateIsGettingProfileForTheMatchSearcher(false));

        } catch (err) {
            dispatch(updateIsGettingProfileForTheMatchSearcher(false));
            dispatch(handleActionError(err));
        }
    }
}

export function removeAllIdsFromProfileIdsAlreadyDownloaded() {
    return {
        type: Types.REMOVE_ALL_IDS_FROM_PROFILE_IDS_ALREADY_DOWNLOADED
    }
}

export function ignoreCurrentProfile(profileId) {
    return dispatch => {
        dispatch(removeUserFromMatchSearcher(profileId));
        dispatch(getNextProfileForTheMatchSearcher());
    }
}

export function likeCurrentProfile(profile, superLike) {
    return dispatch => {
        superLike && dispatch(updateUserDataOnRedux({ lastTimeSuperLikeWasUsed: new Date() }));
        dispatch(createOrUpdateUserMatch(profile, superLike));
        dispatch(removeUserFromMatchSearcher(profile.id));
        dispatch(getNextProfileForTheMatchSearcher());
    }
}

export function updateIsSuperLikeAvailable(isSuperLikeAvailable) {
    return {
        type: Types.IS_SUPERLIKE_AVAILABLE,
        isSuperLikeAvailable
    }
}

export function removeUserFromMatchSearcher(userId, removeAll) {
    return ({
        type: Types.REMOVE_USER_FROM_THE_MATCH_SEARCHER_ARRAY,
        userId,
        removeAll
    });
}
