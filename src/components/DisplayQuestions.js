import React, { Fragment } from 'react';
import { Card, CardGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const DisplayQuestions = ({ questions, allQuestions, answeredQuestion = false }) => {
	// console.log(questions);
	// console.log(allQuestions);
	let CardComponents = null;

	if (questions && allQuestions) {
		CardComponents = questions.map((qid) => {
			let bodyComponent = null;

			if (answeredQuestion) {
				bodyComponent = (
					<Card key={qid} style={{ minWidth: '18rem', margin: '5px' }}>
						<Card.Body>
							<Card.Title>{allQuestions[qid].author}</Card.Title>
							<Card.Text>{allQuestions[qid].optionOne.text}</Card.Text>
							<Card.Text>{allQuestions[qid].optionTwo.text}</Card.Text>

							<Link to={`/questions/${allQuestions[qid].id}`}>
								<Button variant="outline-success">Visit the question</Button>
							</Link>
						</Card.Body>
					</Card>
				);
			} else {
				bodyComponent = (
					<Card key={qid} style={{ minWidth: '18rem', margin: '5px' }}>
						<Card.Body>
							<Card.Title>{allQuestions[qid].author}</Card.Title>
							<Card.Text>{allQuestions[qid].optionOne.text}</Card.Text>
							<Card.Text>{allQuestions[qid].optionTwo.text}</Card.Text>

							<Link to={`/questions/${allQuestions[qid].id}`}>
								<Button variant="outline-success">Answer the Question</Button>
							</Link>
						</Card.Body>
					</Card>
				);
			}

			return bodyComponent;
		});
	}
	return (
		<Fragment>
			<CardGroup>{CardComponents}</CardGroup>
		</Fragment>
	);
};

DisplayQuestions.propTypes = {
	allQuestions: PropTypes.object
};
const mapStateToProps = (state) => ({
	allQuestions: state.questions.questions
});

export default connect(mapStateToProps)(DisplayQuestions);
