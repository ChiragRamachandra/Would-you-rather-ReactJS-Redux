import { GET_USERS, USER_FAILURE, ADD_ANSWER_USER, ANSWER_FAIL_USER } from './Types';
import { _getUsers } from '../utils/_Data';
//import store from '../store/Store';

//Get All
export const getUsers = () => async (dispatch) => {
	let payload = await _getUsers();
	//console.log(payload);

	try {
		dispatch({
			type: GET_USERS,
			payload
		});
	} catch (err) {
		console.log(err);
		dispatch({
			type: USER_FAILURE
		});
	}
};

//Add answer
export const addAnswerUser = (payload) => async (dispatch) => {
	console.log(payload);

	try {
		dispatch({
			type: ADD_ANSWER_USER,
			payload
		});
	} catch (err) {
		console.log(err);
		dispatch({
			type: ANSWER_FAIL_USER
		});
	}
};
