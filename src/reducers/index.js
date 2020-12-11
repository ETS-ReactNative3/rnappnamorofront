import { combineReducers } from 'redux';
import auth from './auth';
import utils from './utils';
import dashboard from './dashboard';

export default combineReducers({
    auth,
    dashboard,
    utils
});
