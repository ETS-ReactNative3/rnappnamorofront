import * as Actions from '../../../../../../actions';

export function ignoreCurrentProfile(dispatch, profileId) {
    dispatch(Actions.ignoreCurrentProfile(profileId));
}

export function likeCurrentProfile(dispatch, superLike, currentProfile) {
    superLike && dispatch(Actions.updateIsSuperLikeAvailable(false));
    dispatch(Actions.likeCurrentProfile(currentProfile, superLike));
}