import store from './app/store';
import { Provider } from 'react-redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MenuComponent from './app/components/MenuComponent/MenuComponent';
import * as $ from 'jquery';
import { DELETE_MENU_ITEM } from './app/store/action';

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
  }, 2000);
});
