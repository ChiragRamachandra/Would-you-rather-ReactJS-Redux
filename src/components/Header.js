import React, { Fragment } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/Auth';
import { Link } from 'react-router-dom';

const Header = ({ isAuthenticated, user, logout }) => {
	let headerComponent = null;

	const onClickHandler = () => {
		logout();
	};

	if (isAuthenticated) {
		headerComponent = (
			<Fragment>
				<Navbar bg="dark" variant="dark">
					<Navbar.Brand as={Link} to="/dashboard">
						<img alt="" src="/logo.svg" width="30" height="30" className="d-inline-block align-top" /> React
						Would You Rather
					</Navbar.Brand>
					<Nav className="mr-auto">
						<Nav.Link as={Link} to="/leaderboard">
							LeaderBoard
						</Nav.Link>
						<Nav.Link as={Link} to="/dashboard">
							Dashboard
						</Nav.Link>

						<Nav.Link as={Link} to="/add">
							New Question
						</Nav.Link>
					</Nav>
					<Nav className="ml-auto">
						<Nav.Link as={Link} to="/dashboard">
							{user}
						</Nav.Link>
						<Nav.Link onClick={onClickHandler}>Logout</Nav.Link>
					</Nav>
				</Navbar>
			</Fragment>
		);
	} else {
		headerComponent = (
			<Fragment>
				<Navbar bg="dark" variant="dark">
					<Navbar.Brand href="/">
						<img alt="" src="/logo.svg" width="30" height="30" className="d-inline-block align-top" /> React
						Would You Rather
					</Navbar.Brand>
				</Navbar>
			</Fragment>
		);
	}

	return <Fragment>{headerComponent}</Fragment>;
};

Header.propTypes = {
	logout: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	user: state.auth.user
});
export default connect(mapStateToProps, { logout })(Header);
