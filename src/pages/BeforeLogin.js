import React, { Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LoginBox from '../components/LoginBox';
import Header from '../components/Header';

const BeforeLogin = ({ location }) => {
	// console.log(location.state.from);
	let path = '/dashboard';
	if (location !== undefined && location.state !== undefined) {
		path = location.state.from.pathname;
		//console.log(location);
	}
	return (
		<Fragment>
			<Header />
			<Container style={{ paddingTop: 50 }}>
				<Row>
					<Col>
						<LoginBox location={path} />
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default BeforeLogin;
