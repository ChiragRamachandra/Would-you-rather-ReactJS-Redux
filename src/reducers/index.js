import { combineReducers } from 'redux';

import auth from './Auth';
import questions from './Questions';
import users from './Users';

export default combineReducers({
	auth,
	questions,
	users
});
