import { combineReducers } from 'redux';
import auth from './auth';
import utils from './utils';
import dashboard from './dashboard';
import match from './match';

export default combineReducers({
    auth,
    dashboard,
    utils,
    match
});
