import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				loading ? (
					<h2> Loading... </h2>
				) : isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect
						push
						to={{
							pathname: '/',
							state: {
								from: props.location
							}
						}}
					/>
				)}
		/>
	);
};

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
