import { Model } from './Model';
import { map, isArray, find, isEqual, isUndefined, filter, clone, forEach } from 'lodash-es';

interface ItemInterface {
  menus: any;
  flat(): any[];
}

export class Item extends Model implements ItemInterface {
  menus: any;
  constructor(options) {
    super();
    this.menus = d => map(d.data, i => new Item(i));
    (this as any).bind(options);
  }

  flat() {
    const current_item = clone(this);
    delete current_item.menus;
    let items = [current_item];
    if (isArray(this.menus) && this.menus.length > 0) {
      items = [...items, ...this.menus];
    }

    while (true) {
      const f = find(items, item => isArray(item.menus) && item.menus.length > 0);
      if (isUndefined(f)) {
        break;
      } else {
        items = filter(items, item => !isEqual(item, find));
        items = [...items, ...f.flat()];
      }
    }
    return items;
  }

  render() {
    let html = '';
    if (isArray(this.menus) && this.menus.length > 0) {
      html += '<ol class="dd-list">';
      forEach(this.menus, item => {
        html += `
                    <li class="dd-item" data-id="${item.id}" data-label="${item.label}" data-link="${item.link}" data-parent="${item.parent_id}">
                        <div class="dd-handle" id="label_item_${item.id}">${item.label}</div>
                        <div class="delete_item" data-id="${item.id}"><div class="trash icon"></div></div>
                        <div class="edit_item" data-label="${item.label}" data-link="${item.link}" data-item-id="${item.id}"><div class="edit icon"></div></div>
                        ${item.render()}
                    </li>
                `;
      });
      html += '</ol>';
    }
    return html;
  }
}
