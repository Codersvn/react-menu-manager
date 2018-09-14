import { combineReducers } from 'redux';
import { Editor } from './EditorComponent/editor.reducer';
import { SET_MENU_ID } from './menu.action';

const Element = (state = {}, action) => {
  switch (action.type) {
    case SET_MENU_ID:
      return { ...state, ...{ id: action.data } };
    default:
      return state;
  }
};

export const Menu = combineReducers({ Element, Editor });
