import React, { Fragment } from 'react';
import Header from '../components/Header';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const LeaderBoard = ({ users }) => {
	// console.log(users);
	let bodyComponent = null;
	let totalUser = users;

	if (totalUser) {
		bodyComponent = Object.values(totalUser).sort((a, b) => userScore(b) - userScore(a)).map((user, index) => {
			return (
				<tr key={user.id}>
					<td>{index + 1}</td>
					<td>
						<img src={user.avatarURL} className="avatar" alt={`Avatar of ${user.name}`} />
					</td>
					<td>{user.name}</td>
					<td>{user.questions.length}</td>
					<td>{Object.keys(user.answers).length}</td>
				</tr>
			);
		});
	}
	return (
		<Fragment>
			<Header />
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Profile</th>
						<th>User</th>
						<th>Question Asked</th>
						<th>Question Answered</th>
					</tr>
				</thead>
				<tbody>{bodyComponent}</tbody>
			</Table>
		</Fragment>
	);
};
LeaderBoard.propTypes = {
	users: PropTypes.object
};

const userScore = (user) => Object.keys(user.answers).length + user.questions.length;
const mapStateToProps = (state) => {
	return { users: state.users.users };
};

export default connect(mapStateToProps)(LeaderBoard);
