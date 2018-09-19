import { combineReducers } from 'redux';
import { FETCH_MENU_SUCCESSED, SORT_MENU, SET_NEW_ITEM_FIELD, DELETE_MENU_ITEM } from './action';
import * as _ from 'lodash/core';

const Application = (state: any = { items: [] }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const NewMenu = (state: { items?: any[] } = { items: [] }, action) => {
  let f;
  switch (action.type) {
    case FETCH_MENU_SUCCESSED:
      f = _.find(state.items, i => i.menu_id === action.menu_id);
      if (_.isUndefined(f)) {
        state = { ...state, ...{ items: [...state.items, ...[{ menu_id: action.data.id }]] } };
      }
      return state;
    case SET_NEW_ITEM_FIELD:
      f = _.find(state.items, i => i.menu_id === action.menu_id);
      if (_.isUndefined(f)) {
        state = { ...state, ...{ items: [...state.items, ...[{ menu_id: action.menu_id, [action.field]: action.data }]] } };
      } else {
        state = { ...state, ...{ items: _.map(state.items, i => (i.menu_id === action.menu_id ? { ...i, ...{ [action.field]: action.data } } : i)) } };
      }
      return state;
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
  let f;
  switch (action.type) {
    case FETCH_MENU_SUCCESSED:
      f = _.find(state.items, i => i.id === action.data.id);
      if (_.isUndefined(f)) {
        return { ...state, ...{ items: [...state.items, ...action.data] } };
      } else {
        return {
          ...state,
          ...{
            items: _.map(state.items, item => {
              if (item.id === action.data.id) {
                return action.data;
              } else {
                return item;
              }
            })
          }
        };
      }
    case SORT_MENU:
      return { ...state, ...{ items: state.items.map(i => Item(i, action)) } };
    case DELETE_MENU_ITEM:
      return { ...state, ...{ items: state.items.map(i => i.deleteItem(action.data)) } };
    default:
      return state;
  }
};

export default combineReducers({
  Application,
  Menu,
  NewMenu
});
