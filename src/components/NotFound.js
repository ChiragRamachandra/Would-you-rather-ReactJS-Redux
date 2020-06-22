import React from 'react';
import Header from '../components/Header';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div style={{ textAlign: 'center' }}>
			<Header />
			<h1>Not Found</h1>

			<Button variant="outline">
				<Link to="/dashboard">
					<h4>Go back to home Page</h4>
				</Link>
			</Button>
		</div>
	);
};

export default NotFound;
