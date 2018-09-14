import { FETCH_MENU_SUCCESSED } from './editor.action';

export const Editor = (state = { fetched: false }, action) => {
  switch (action.type) {
    case FETCH_MENU_SUCCESSED:
      return { ...state, ...{ fetched: true, data: action.data } };
    default:
      return state;
  }
};
