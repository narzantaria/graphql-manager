import { AUTHORIZE, UNAUTHORIZE } from '../actions/types';

const initialState = {
  authorized: null,
  user: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTHORIZE: 
      return {
        ...state,
        authorized: true
      }
    case UNAUTHORIZE:
      return {
        ...state,
        authorized: false
      }
    default:
      return state;
  }
}