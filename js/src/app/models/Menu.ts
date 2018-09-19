import { Model } from './Model';
import { Item } from './Item';
import * as _ from 'lodash/core';

interface MenuInterface {
  menus: any;
}

export class Menu extends Model implements MenuInterface {
  menus: any;
  constructor(options) {
    super();
    this.menus = d => _.map(d.data, i => new Item(i));
    (this as any).bind(options);
  }
}
