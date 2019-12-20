import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactLoading from 'react-loading';

const PrivateRoute = ({ component: Component, login, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('user') ? (
          login.loading ? (
            <ReactLoading
              type={'bars'}
              color={'#ff4444'}
              height="200px"
              width="200px"
            />
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  login: state.login,
});

export default withRouter(connect(mapStateToProps)(PrivateRoute));
