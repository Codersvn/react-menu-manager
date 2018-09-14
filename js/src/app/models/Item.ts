import { Model } from './Model';
import * as _ from 'lodash';

interface ItemInterface {
  menus: any;
  flat(): any[];
}

export class Item extends Model implements ItemInterface {
  menus: any;
  constructor(options) {
    super();
    this.menus = d => _.map(d.data, i => new Item(i));
    (this as any).bind(options);
  }

  flat() {
    const current_item = _.clone(this);
    delete current_item.menus;
    let items = [current_item];
    if (_.isArray(this.menus) && this.menus.length > 0) {
      items = [...items, ...this.menus];
    }

    while (true) {
      const find = _.find(items, item => _.isArray(item.menus) && item.menus.length > 0);
      if (_.isUndefined(find)) {
        break;
      } else {
        items = _.filter(items, item => !_.isEqual(item, find));
        items = [...items, ...find.flat()];
      }
    }
    return items;
  }
}
