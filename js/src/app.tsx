import store from './app/store';
import { Provider } from 'react-redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MenuComponent from './app/components/MenuComponent/MenuComponent';
import * as $ from 'jquery';
import * as _ from 'lodash/core';
import { DELETE_MENU_ITEM, SHOW_EDIT_ITEM_FORM } from './app/store/action';

const els = document.getElementsByClassName('item');
Array.prototype.forEach.call(els, el => {
  const attrs = {};
  for (var i = 0, atts = el.attributes, n = atts.length; i < n; i++) {
    attrs[atts[i].nodeName] = atts[i].nodeValue;
  }
  ReactDOM.render(
    <Provider store={store}>
      <MenuComponent id={attrs['data-id']} />
    </Provider>,
    el
  );

  setTimeout(() => {
    $('.delete_menu_item_btn.sub_item').on('click', function(event) {
      const el = $(event.target).closest('.dd-item');
      el.remove();
      store.dispatch({ type: DELETE_MENU_ITEM, data: el.attr('data-id') });
    });
    $('.edit_menu_item.sub_item').on('click', function(event) {
      const el = $(event.target).closest('.dd-item');
      const menu_item_id = el.attr('data-menu-item-id');
      const menus = store.getState().Menu.items;
      _.forEach(menus, i => {
        let items = [];
        _.forEach(i.menus, menu => {
          items = [...items, ...menu.flat()];
        });
        let find = _.find(items, item => Number(item.id) === Number(menu_item_id));
        if (!_.isUndefined(find)) {
          store.dispatch({ type: SHOW_EDIT_ITEM_FORM, data: find, menu_id: i.id });
        }
      });
    });
  }, 4000);
});
