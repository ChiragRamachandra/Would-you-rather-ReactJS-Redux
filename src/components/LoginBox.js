import React, { Fragment, useEffect, useState } from 'react';
import { Card, DropdownButton, Dropdown } from 'react-bootstrap';
import { _getUsers } from '../utils/_Data';
import PropTypes from 'prop-types';
import { login } from '../actions/Auth';
import { connect } from 'react-redux';

const LoginBox = ({ login, isAuthenticated, location }) => {
	const [ usersName, setUsersName ] = useState([]);

	let userSignIn = null;
	// console.log(location.pathname);

	useEffect(() => {
		const getUsers = async () => {
			const users = await _getUsers();
			//console.log(users);

			setUsersName(users);
		};
		getUsers();
	}, []);

	const onSelectHandler = (evt, evtkey) => {
		// login(event);
		// console.log(event.target.name);
		console.log(evt);
		console.log(evtkey.target.name);
		login(evtkey.target.name, evt, location);
	};

	console.log(usersName);
	if (usersName) {
		userSignIn = Object.entries(usersName).map(([ key, value ]) => {
			return (
				<Dropdown.Item key={value.id} eventKey={value.id} name={value.name}>
					{value.name}
				</Dropdown.Item>
			);
		});
	}

	return (
		<Fragment>
			<Card className="text-center">
				<Card.Header>LOGIN</Card.Header>
				<Card.Body>
					<Card.Title>SIGN IN as:</Card.Title>

					<DropdownButton
						onSelect={onSelectHandler}
						variant="outline-info"
						id="outline-info"
						title="Sign In"
						block="true"
						role="menu"
					>
						{userSignIn}
					</DropdownButton>
				</Card.Body>
			</Card>
		</Fragment>
	);
};

LoginBox.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(LoginBox);
