import { combineReducers } from 'redux';
import lang from './lang';
import auth from './auth';

export default combineReducers({
  lang,
  auth
});