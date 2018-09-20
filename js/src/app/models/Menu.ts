import { Model } from './Model';
import { Item } from './Item';
import * as _ from 'lodash/core';
import * as clone from 'lodash/clone';

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

  deleteItem(id) {
    this.menus = _.filter(this.menus, item => {
      return Number(item.id) !== Number(id);
    });
    this.menus = _.map(this.menus, item => item.deleteItem(id));
    return this;
  }

  updateMenuItem(id, data) {
    let instance = clone(this);
    const find = _.find(instance.menus, item => Number(item.id) === Number(id));
    if (!_.isUndefined(find)) {
      instance.menus = _.map(this.menus, item => {
        if (Number(item.id) === Number(id)) {
          item.label = data.label;
          item.link = data.link;
        }
        return item;
      });
    } else {
      instance.menus = _.map(instance.menus, item => item.updateMenuItem(id, data));
    }
    return instance;
  }

  findItem(id) {
    let items = [];
    _.forEach(this.menus, menu => {
      items = [...items, ...menu.flat()];
    });
    return _.find(items, item => Number(item.id) === Number(id));
  }
}
