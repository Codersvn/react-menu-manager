import { combineReducers } from 'redux';
import { FETCH_MENU_SUCCESSED, SORT_MENU, SET_NEW_ITEM_FIELD, DELETE_MENU_ITEM, SHOW_EDIT_ITEM_FORM, CLOSE_EDIT_ITEM_FORM, EDIT_MENU_ITEM, UPDATE_MENU_ITEM } from './action';
import * as _ from 'lodash/core';

// Edit Reducer
const EditItem = (state: { menu_id?: number } = {}, action) => {
  if (state.menu_id === action.menu_id) {
    switch (action.type) {
      case SHOW_EDIT_ITEM_FORM:
        return { ...state, ...{ show_edit_form: true, data: action.data } };
      case CLOSE_EDIT_ITEM_FORM:
      case UPDATE_MENU_ITEM:
        return { ...state, ...{ show_edit_form: false, data: {} } };
      default:
        break;
    }
  } else {
    return state;
  }
};

const Edit = (state: { items: any[] } = { items: [] }, action) => {
  switch (action.type) {
    case FETCH_MENU_SUCCESSED:
      const find = _.find(state.items, item => item.menu_id === action.data.id);
      if (_.isUndefined(find)) {
        return { ...state, ...{ items: [...state.items, ...[{ menu_id: action.data.id, data: {} }]] } };
      }
    case SHOW_EDIT_ITEM_FORM:
    case CLOSE_EDIT_ITEM_FORM:
    case UPDATE_MENU_ITEM:
      return { ...state, ...{ items: _.map(state.items, item => EditItem(item, action)) } };
    case EDIT_MENU_ITEM:
      const item = { ...{}, ..._.find(state.items, i => i.menu_id === action.menu_id) };
      item.data = { ...item.data, ...{ [action.label]: action.data } };
      return { ...state, ...{ items: _.map(state.items, i => (i.menu_id === item.menu_id ? item : i)) } };
    default:
      return state;
  }
};

// New Reducer

const NewItem = (state: { menu_id?: number } = {}, action) => {
  if (state.menu_id === action.menu_id) {
    switch (action.type) {
      case SET_NEW_ITEM_FIELD:
        return { ...state, ...{ [action.field]: action.data } };
      default:
        break;
    }
  } else {
    return state;
  }
};

const New = (state: { items?: any[] } = { items: [] }, action) => {
  switch (action.type) {
    case FETCH_MENU_SUCCESSED:
      const find = _.find(state.items, item => item.menu_id === action.data.id);
      if (_.isUndefined(find)) {
        return { ...state, ...{ items: [...state.items, ...[{ menu_id: action.data.id }]] } };
      }
      return state;
    case SET_NEW_ITEM_FIELD:
      return { ...state, ...{ items: _.map(state.items, item => NewItem(item, action)) } };
    default:
      return state;
  }
};

// Menu Reducer
const Item = (state: { id: any; menus: any[]; show_edit_form: boolean }, action) => {
  if (state.id === action.menu_id) {
    switch (action.type) {
      case SORT_MENU:
        state.menus = action.data;
      case UPDATE_MENU_ITEM:
        return (state as any).updateMenuItem(action.data.id, action.data);
      default:
        return state;
    }
  } else {
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
    case UPDATE_MENU_ITEM:
      return { ...state, ...{ items: state.items.map(i => Item(i, action)) } };
    case DELETE_MENU_ITEM:
      return { ...state, ...{ items: state.items.map(i => i.deleteItem(action.data)) } };
    default:
      return state;
  }
};

export default combineReducers({
  Edit,
  New,
  Menu
});
