import React, { useState, Fragment } from 'react';
import { Card, Button, Form, Image, ProgressBar } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { _saveQuestionAnswer } from '../utils/_Data';
import { addAnswerUser } from '../actions/Users';
import { recordAnswerQuestion } from '../actions/Questions';

const CardDisplay = ({
	option1Text,
	option2Text,
	name,
	qid,
	addAnswerUser,
	allUsers,
	allQuestions,
	recordAnswerQuestion,
	isAnswered = false
}) => {
	const [ choice, setChoice ] = useState('');
	const [ redirect, setRedirect ] = useState(false);
	const authedUser = localStorage.id;

	if (redirect) {
		return <Redirect to="/leaderboard" />;
	}

	//console.log(allUsers);

	const onChangeHandler = (event) => {
		setChoice(event.target.value);
		console.log(choice);
	};

	const onSubmitHandler = async (event) => {
		event.preventDefault();
		//console.log(choice);
		let answers = {
			authedUser,
			qid: qid,
			answer: choice
		};

		const res = await _saveQuestionAnswer(answers);
		console.log(res);

		const newAnswerUser = {
			[qid]: choice
		};
		const newAnswers = { ...allUsers[authedUser].answers, ...newAnswerUser };
		//console.log(newAnswers);

		allUsers[authedUser].answers = newAnswers;
		//console.log(allUsers);

		console.log(allQuestions[qid].optionOne.votes);

		if (choice === 'optionOne') {
			const userVotes = [ ...allQuestions[qid].optionOne.votes, authedUser ];
			allQuestions[qid].optionOne.votes = userVotes;
		}
		if (choice === 'optionTwo') {
			const userVotes = [ ...allQuestions[qid].optionTwo.votes, authedUser ];
			allQuestions[qid].optionTwo.votes = userVotes;
		}

		console.log(allQuestions);

		addAnswerUser(allUsers);
		recordAnswerQuestion(allQuestions);
		setRedirect(true);
	};

	let bodyComponent = null;

	if (isAnswered) {
		let total = allQuestions[qid].optionOne.votes.length + allQuestions[qid].optionTwo.votes.length;
		// console.log(allQuestions[qid]);

		function financial(x) {
			return Number.parseFloat(x).toFixed(0);
		}

		let percent1 = financial(allQuestions[qid].optionOne.votes.length / total * 100);
		let percent2 = financial(allQuestions[qid].optionTwo.votes.length / total * 100);
		bodyComponent = (
			<div style={{ alignContent: 'center', alignItems: 'center', alignText: 'center' }}>
				<Card className="text-center" border="warning" key={qid} style={{ minWidth: '60rem', marginTop: 20 }}>
					<Card.Header>Would You Rather?</Card.Header>
					<Card.Body>
						<Card.Title>{allQuestions[qid].author}</Card.Title>
						<Image src={`https://robohash.org/${name}?size=170x150`} roundedCircle />
						<Card.Text>
							{allQuestions[qid].optionOne.votes.includes(localStorage.id) ? (
								<Button variant="warning">{allQuestions[qid].optionOne.text}</Button>
							) : (
								allQuestions[qid].optionOne.text
							)}
						</Card.Text>
						<Card.Text>
							{allQuestions[qid].optionTwo.votes.includes(localStorage.id) ? (
								<Button variant="warning">{allQuestions[qid].optionTwo.text}</Button>
							) : (
								allQuestions[qid].optionTwo.text
							)}
						</Card.Text>
					</Card.Body>
					<Card.Footer>
						Users have answered:
						<ProgressBar>
							<ProgressBar
								striped
								variant="success"
								now={percent1}
								key={1}
								label={`option 1: ${percent1}%`}
							/>
							<ProgressBar variant="info" now={percent2} key={2} label={`option 2: ${percent2}%`} />
						</ProgressBar>
					</Card.Footer>
				</Card>
			</div>
		);
	} else {
		bodyComponent = (
			<div>
				<Card className="text-center" border="warning" style={{ minWidth: '60rem', marginTop: 20 }}>
					<Card.Header>Would You Rather?</Card.Header>
					<Card.Body>
						<Card.Title>{name}</Card.Title>
						<Image src={`https://robohash.org/${name}?size=170x150`} roundedCircle />

						<Form onSubmit={onSubmitHandler}>
							<Form.Group controlId="formBasicCheckbox">
								<Form.Check
									type="radio"
									name="choice"
									onChange={onChangeHandler}
									id={'option1'}
									label={option1Text}
									value="optionOne"
								/>
								<br />
								<Form.Check
									type="radio"
									name="choice"
									onChange={onChangeHandler}
									id={'option2'}
									value="optionTwo"
									label={option2Text}
								/>
							</Form.Group>

							<Button variant="primary" type="submit">
								Submit
							</Button>
						</Form>
					</Card.Body>
				</Card>
			</div>
		);
	}
	return <Fragment>{bodyComponent}</Fragment>;
};

CardDisplay.propTypes = {
	allQuestions: PropTypes.object,
	addAnswerUser: PropTypes.func.isRequired,
	recordAnswerQuestion: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
	allQuestions: state.questions.questions,
	allUsers: state.users.users
});

export default connect(mapStateToProps, { addAnswerUser, recordAnswerQuestion })(CardDisplay);
