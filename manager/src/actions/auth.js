import { AUTHORIZE, UNAUTHORIZE } from './types';

// Login user
export const authorize = () => dispatch => {
  // localStorage.setItem('token', token);
  dispatch({
    type: AUTHORIZE,
    payload: 'authorized'
  });
};

// Logout/expire session
export const unauthorize = () => dispatch => {
  localStorage.removeItem('token');
  dispatch({
    type: UNAUTHORIZE,
    payload: 'unauthorized'
  });
};