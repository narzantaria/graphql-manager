import { LANG_EN, LANG_RU, LANG_ABK } from '../actions/types';

const initialState = {
  lang: 'ru'
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LANG_RU:
    case LANG_EN:
    case LANG_ABK:
      return {
        ...state,
        lang: payload
      }
    default:
      return state;
  }
}