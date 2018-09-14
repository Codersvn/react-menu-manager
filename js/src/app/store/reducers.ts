import { combineReducers } from 'redux';
import { Menu } from '../components/MenuComponent/menu.reducer';

const Application = (state: any = { items: [] }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  Application,
  Menu
});
