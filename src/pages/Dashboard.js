import React, { Fragment } from 'react';
import Header from '../components/Header';
import { Row, Col, Container } from 'react-bootstrap';
import ControlledTabs from '../components/ControlledTabs';

const Dashboard = () => {
	return (
		<Fragment>
			<Header />
			<Container style={{ textAlign: 'center', marginTop: 50 }}>
				<Row>
					<Col>
						<ControlledTabs />
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default Dashboard;
