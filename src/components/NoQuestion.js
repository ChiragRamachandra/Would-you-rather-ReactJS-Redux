import React from 'react';
// import Header from './Header';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NoQuestion = () => {
	return (
		<div style={{ textAlign: 'center' }}>
			<h1>Not Found</h1>

			<Button variant="outline">
				<Link to="/dashboard">
					<h4>Go back to home Page</h4>
				</Link>
			</Button>
		</div>
	);
};

export default NoQuestion;
