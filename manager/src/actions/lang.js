import { LANG_RU, LANG_EN, LANG_ABK } from './types';

export const setlang = (lang) => dispatch => {
  switch (lang) {
    case 'ru':
      dispatch({
        type: LANG_RU,
        payload: 'ru'
      });
    case 'en':
      dispatch({
        type: LANG_EN,
        payload: 'en'
      });
    case 'abk':
      dispatch({
        type: LANG_ABK,
        payload: 'abk'
      });
    default:
      dispatch({
        type: LANG_RU,
        payload: 'ru'
      });
  }
};