import React, { Fragment } from 'react';
import Header from '../components/Header';
import CardDisplay from '../components/CardDisplay';
import { Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NoQuestion from '../components/NoQuestion';

const AnswerQuestion = ({ match, allQuestions, allUsers }) => {
	//console.log(match.params.id);
	const qid = match.params.id;
	let isAnswered = false;
	const authedUser = localStorage.id;
	let bodyComponent = null;

	if (allUsers) {
		//console.log(allUsers[authedUser].answers[qid]);
		// console.log(Object.keys(allUsers[authedUser].answers));

		if (allUsers[authedUser].answers[qid] !== null && allUsers[authedUser].answers[qid] !== undefined) {
			isAnswered = true;
		}
	}

	console.log(isAnswered);

	if (allQuestions) {
		console.log(allQuestions[match.params.id]);

		if (allQuestions[match.params.id] === undefined) {
			bodyComponent = (
				<Fragment>
					<NoQuestion />
				</Fragment>
			);
		} else {
			if (isAnswered) {
				bodyComponent = (
					<CardDisplay
						option1Text={allQuestions[match.params.id].optionOne.text}
						option2Text={allQuestions[match.params.id].optionTwo.text}
						name={allQuestions[match.params.id].author}
						qid={match.params.id}
						isAnswered={true}
					/>
				);
			} else {
				bodyComponent = (
					<CardDisplay
						option1Text={allQuestions[match.params.id].optionOne.text}
						option2Text={allQuestions[match.params.id].optionTwo.text}
						name={allQuestions[match.params.id].author}
						qid={match.params.id}
					/>
				);
			}
		}
	}

	return (
		<Fragment>
			<Header />
			<Container style={{ alignContent: 'center', alignItems: 'center' }}>
				<Row style={{ alignContent: 'center', alignItems: 'center' }}>{bodyComponent}</Row>
			</Container>
		</Fragment>
	);
};
AnswerQuestion.propTypes = {
	allQuestions: PropTypes.object,
	allUsers: PropTypes.object
};
const mapStateToProps = (state) => ({
	allQuestions: state.questions.questions,
	allUsers: state.users.users
});

export default connect(mapStateToProps, null)(AnswerQuestion);
