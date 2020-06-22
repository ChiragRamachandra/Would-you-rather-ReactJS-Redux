import React, { Fragment } from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

const LeaderCard = ({
	user = 'UserName',
	answeredQuestions = 0,
	askedQuestions = 0,
	src = 'https://robohash.org/johndoe'
}) => {
	return (
		<Fragment>
			<Card style={{ width: 400 }}>
				<Card.Img variant="top" src={src} />
				<Card.Body>
					<Card.Title>{user}</Card.Title>
					<Card.Text>Score: {answeredQuestions + askedQuestions}</Card.Text>
				</Card.Body>
				<ListGroup className="list-group-flush">
					<ListGroupItem>Answered Questions: {answeredQuestions}</ListGroupItem>
					<ListGroupItem>Created Questions: {askedQuestions}</ListGroupItem>
				</ListGroup>
			</Card>
		</Fragment>
	);
};

export default LeaderCard;
