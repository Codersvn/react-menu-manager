import { FETCH_MENU_SUCCESSED } from './EditorComponent/editor.action';

export const Menu = (state = { items: [] }, action) => {
  switch (action.type) {
    case FETCH_MENU_SUCCESSED:
      return { ...state, ...{ items: [...state.items, ...action.data] } };
    default:
      return state;
  }
};
