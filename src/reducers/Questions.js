import {
	ADD_QUESTION,
	QUESTION_FAILURE,
	GET_QUESTIONS,
	ADD_ANSWER_QUESTION,
	ANSWER_FAIL_QUESTION
} from '../actions/Types';

const initialState = {
	questions: null
};

export default function(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case ADD_QUESTION:
			return {
				...state,
				questions: payload
			};
		case ADD_ANSWER_QUESTION:
		case GET_QUESTIONS:
			return {
				...state,
				questions: payload
			};

		case QUESTION_FAILURE:
		case ANSWER_FAIL_QUESTION:
			return {
				questions: null
			};
		default:
			return state;
	}
}
