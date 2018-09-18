import { combineReducers } from 'redux';
import { FETCH_MENU_SUCCESSED, SORT_MENU } from './action';

const Application = (state: any = { items: [] }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const Item = (state: { id: any; menus: any[] }, action) => {
  switch (action.type) {
    case SORT_MENU:
      if (state.id === action.menu_id) {
        state.menus = action.data;
      }
      return state;
    default:
      return state;
  }
};

export const Menu = (state = { items: [] }, action) => {
  switch (action.type) {
    case FETCH_MENU_SUCCESSED:
      return { ...state, ...{ items: [...state.items, ...action.data] } };
    case SORT_MENU:
      return { ...state, ...{ items: state.items.map(i => Item(i, action)) } };
    default:
      return state;
  }
};

export default combineReducers({
  Application,
  Menu
});
