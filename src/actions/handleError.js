import { showLoader } from './utils';
import { signOut } from './auth';
import { handleError } from '../components/utils/Functions';

export function handleActionError(err) {
    return dispatch => {

        dispatch(showLoader(false));

        //status 401 is Unauthorized, which means that user losed the access to the API
        if (err?.response?.status == 401 && err?.response?.data == 'Unauthorized')
            dispatch(signOut());
        else if (err?.message != 'Location permission not granted.')
            handleError(err);
    }
}
