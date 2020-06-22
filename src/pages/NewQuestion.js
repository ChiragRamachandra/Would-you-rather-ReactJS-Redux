import React, { Fragment, useState } from 'react';
import Header from '../components/Header';
import { Row, Col, Container, Card, Button, Form } from 'react-bootstrap';
import { _saveQuestion } from '../utils/_Data';
import { addQuestion } from '../actions/Questions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const NewQuestion = ({ addQuestion }) => {
	const [ redirect, setRedirect ] = useState(false);
	const [ formData, setFormData ] = useState({
		optionA: '',
		optionB: ''
	});
	const { optionA, optionB } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		console.log(`option1 : ${optionA} | option2: ${optionB}`);
		let formattedQuestion = {
			author: localStorage.id,
			optionOneText: optionA,
			optionTwoText: optionB
		};
		const res = await _saveQuestion(formattedQuestion);
		addQuestion(res);
		console.log(res);
		setRedirect(true);
	};

	if (redirect) {
		return <Redirect to="/dashboard" />;
	}
	return (
		<Fragment>
			<Header />
			<Container style={{ textAlign: 'center', marginTop: 50 }}>
				<Row>
					<Col sm={2} />
					<Col sm={8}>
						<Card>
							<Card.Header as="h5">Featured</Card.Header>
							<Card.Body>
								<Form onSubmit={onSubmit}>
									<Form.Group>
										<Card.Title>Would you rather</Card.Title>
										<Card.Text>
											<Form.Control
												type="text"
												placeholder="Option A"
												name="optionA"
												value={optionA}
												onChange={onChange}
											/>
											<br />
											<Form.Control
												type="text"
												placeholder="Option B"
												name="optionB"
												value={optionB}
												onChange={onChange}
											/>
											<br />
										</Card.Text>
									</Form.Group>
									<Button variant="primary" type="submit">
										Submit
									</Button>
								</Form>
							</Card.Body>
						</Card>
					</Col>
					<Col sm={2} />
				</Row>
			</Container>
		</Fragment>
	);
};

NewQuestion.propTypes = {
	addQuestion: PropTypes.func.isRequired
};

export default connect(null, { addQuestion })(NewQuestion);
