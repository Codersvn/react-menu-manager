import * as ReactDOM from 'react-dom';
import MenuComponent from './components/MenuComponent/MenuComponent';
import { Provider } from 'react-redux';
import * as React from 'react';
import store from './store';
import * as _ from 'lodash/core';

interface OptionInterface {
  menu_id?: any;
  api_url?: string;
}

export class MenuManager {
  constructor(el, options?: OptionInterface) {
    let menu_id = options.menu_id;
    if (_.isUndefined(menu_id)) {
      console.log((document as any).localtion);
    }
    ReactDOM.render(
      <Provider store={store}>
        <MenuComponent id={menu_id} options={options} />
      </Provider>,
      el
    );
  }
}
