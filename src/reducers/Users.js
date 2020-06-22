import { USER_FAILURE, GET_USERS, ADD_ANSWER_USER, ANSWER_FAIL_USER } from '../actions/Types';

const initialState = {
	users: null
};

export default function(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case ADD_ANSWER_USER:
		case GET_USERS:
			return {
				...state,
				users: payload
			};

		case ANSWER_FAIL_USER:
		case USER_FAILURE:
			return {
				users: null
			};
		default:
			return state;
	}
}
