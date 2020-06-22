import { ADD_QUESTION, QUESTION_FAILURE, GET_QUESTIONS, ADD_ANSWER_QUESTION, ANSWER_FAIL_QUESTION } from './Types';
import { _getQuestions } from '../utils/_Data';
import { getUsers } from './Users';

//Add Question
export const addQuestion = (question) => async (dispatch) => {
	//get all questions
	let payload = await _getQuestions();
	console.log(payload);
	console.log(question);

	let newQuestion = {
		[question.id]: question
	};

	//add new question using spread operator
	let addedQuestion = { ...payload, ...newQuestion };
	console.log(addedQuestion);

	dispatch(getUsers());

	try {
		dispatch({
			type: ADD_QUESTION,
			payload: addedQuestion
		});
	} catch (err) {
		console.log(err);
		dispatch({
			type: QUESTION_FAILURE
		});
	}
};

//Get All
export const getQuestions = () => async (dispatch) => {
	let payload = await _getQuestions();

	try {
		dispatch({
			type: GET_QUESTIONS,
			payload
		});
	} catch (err) {
		console.log(err);
		dispatch({
			type: QUESTION_FAILURE
		});
	}
};

//Add answer to Question
export const recordAnswerQuestion = (payload) => async (dispatch) => {
	console.log(payload);

	try {
		dispatch({
			type: ADD_ANSWER_QUESTION,
			payload
		});
	} catch (err) {
		console.log(err);
		dispatch({
			type: ANSWER_FAIL_QUESTION
		});
	}
};

//clear questions
export const clearQuestions = () => (dispatch) => {
	dispatch({
		type: QUESTION_FAILURE
	});
	dispatch({
		type: QUESTION_FAILURE
	});
};
