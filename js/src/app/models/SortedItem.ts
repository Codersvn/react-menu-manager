import { Model } from '@codersvn/model';
import * as _ from 'lodash/core';

interface SortedItemInterface {
  id: any;
  children: any;
}

export class SortedItem extends Model implements SortedItemInterface {
  public id;
  public children;
  constructor(options) {
    super();
    this.children = d => _.map(d, i => new SortedItem(i));
    (this as any).bind(options);
  }

  transform(items) {
    let item = _.find(items, i => Number(i.id) === Number(this.id));
    if (_.isArray(this.children) && this.children.length > 0) {
      item.menus = _.map(this.children, i => i.transform(items));
    }
    return item;
  }
}
