import { handleError } from '../../utils/Functions';
import * as utilsActions from '../utils/actions';
import * as authThunk from '../auth/thunk';

export function handleThunkError(err) {
    return dispatch => {

        dispatch(utilsActions.showLoader(false));

        //status 401 is Unauthorized, which means that user loses the access to the API
        if (err?.response?.status == 401 && err?.response?.data == 'Unauthorized')
            dispatch(authThunk.signOut());
        else if (err?.message != 'Location permission not granted.')
            handleError(err);
    }
}
