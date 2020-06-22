import { AUTH_ERROR, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, USER_LOADED } from '../actions/Types';

const initialState = {
	isAuthenticated: null,
	loading: true,
	user: localStorage.getItem('name'),
	id: localStorage.getItem('id')
};

export default function(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload.name,
				id: payload.id
			};

		case LOGIN_SUCCESS:
			localStorage.setItem('name', payload.name);
			localStorage.setItem('id', payload.id);
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload.name,
				id: payload.id
			};

		case AUTH_ERROR:
		case LOGIN_FAILURE:
		case LOGOUT:
			localStorage.removeItem('name');
			return {
				...state,
				isAuthenticated: false,
				loading: false,
				user: null,
				id: null
			};
		default:
			return state;
	}
}
