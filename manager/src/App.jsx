import React, { useEffect } from 'react';
import { createClient, Provider } from 'urql';
import Login from './routes/Login';
import Private from './routes/Private';
import { connect } from 'react-redux';
import { authorize } from './actions/auth';

const client = createClient({ url: `${process.env.REACT_APP_API_PORT}graphql` });

function App(props) {
  useEffect(() => {
    if (!props.auth.authorized && localStorage.token) {
      props.authorize();
    }
  }, []);
  return (
    <Provider value={client}>
      {props.auth.authorized ? <Private /> : <Login />}
    </Provider>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  authorize: () => dispatch(authorize())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);