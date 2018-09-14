import store from './app/store';
import { Provider } from 'react-redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MenuComponent from './app/components/MenuComponent/MenuComponent';

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
});
