import { USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, CLEAR_PROFILE } from './Types';

//import { useLocation } from 'react-router-dom';

//LOGIN USER
export const login = (name, id, location) => async (dispatch) => {
	console.log(location);
	try {
		dispatch({
			type: LOGIN_SUCCESS,
			payload: {
				name: name,
				id: id
			}
		});
		window.location.replace(location);
	} catch (err) {
		console.log(err);
		dispatch({
			type: LOGIN_FAILURE
		});
	}
};

//Load User
export const loadUser = () => async (dispatch) => {
	if (localStorage.name) {
		//TOKEN is Present in local storage

		try {
			dispatch({
				type: USER_LOADED,
				payload: {
					name: localStorage.name,
					id: localStorage.id
				}
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: AUTH_ERROR
			});
		}
	} else {
		//TOKEN is NOT Present in local storage
		dispatch({
			type: AUTH_ERROR
		});
	}
};

//LOGOUT
export const logout = () => (dispatch) => {
	dispatch({
		type: CLEAR_PROFILE
	});
	dispatch({
		type: LOGOUT
	});

	// window.location.reload(false);
	// window.location.replace('/');
};
