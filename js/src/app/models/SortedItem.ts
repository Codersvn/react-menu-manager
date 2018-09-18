import { Model } from '@codersvn/model';
import { map, isArray, find } from 'lodash-es';

interface SortedItemInterface {
  id: any;
  children: any;
}

export class SortedItem extends Model implements SortedItemInterface {
  public id;
  public children;
  constructor(options) {
    super();
    this.children = d => map(d, i => new SortedItem(i));
    (this as any).bind(options);
  }

  transform(items) {
    let item = find(items, i => Number(i.id) === Number(this.id));
    if (isArray(this.children) && this.children.length > 0) {
      item.menus = map(this.children, i => i.transform(items));
    }
    return item;
  }
}
