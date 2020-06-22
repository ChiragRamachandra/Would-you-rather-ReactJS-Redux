import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container } from 'react-bootstrap';
import DisplayQuestions from './DisplayQuestions';

function ControlledTabs({ questions, users }) {
	const [ key, setKey ] = useState('home');
	//console.log(questions);
	//console.log(users);

	let answeredQuestions = null;
	let unansweredQuestions = null;

	if (users && questions) {
		const user = users[localStorage.id];
		//console.log(user);

		answeredQuestions = Object.keys(user.answers).sort((a, b) => questions[b].timestamp - questions[a].timestamp);

		//console.log(answeredQuestions);

		unansweredQuestions = Object.keys(questions)
			.filter((qid) => !answeredQuestions.includes(qid))
			.sort((a, b) => questions[b].timestamp - questions[a].timestamp);

		//console.log(unansweredQuestions);
	}

	return (
		<Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)}>
			<Tab eventKey="home" title="Un-answered Questions">
				<Container>
					<DisplayQuestions questions={unansweredQuestions} />
				</Container>
			</Tab>
			<Tab eventKey="profile" title="Answered Questions">
				<DisplayQuestions questions={answeredQuestions} answeredQuestion={true} />
			</Tab>
		</Tabs>
	);
}

ControlledTabs.propTypes = {
	questions: PropTypes.object,
	users: PropTypes.object
};

const mapStateToProps = (state) => ({
	questions: state.questions.questions,
	users: state.users.users
});

export default connect(mapStateToProps, {})(ControlledTabs);
