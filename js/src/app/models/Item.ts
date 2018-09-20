import { Model } from './Model';
import * as _ from 'lodash/core';
import * as clone from 'lodash/clone';

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
      instance.menus = _.map(this.menus, item => item.updateMenuItem(id, data));
    }
    return instance;
  }

  flat() {
    const current_item = _.clone(this);
    delete current_item.menus;
    let items = [current_item];
    if (_.isArray(this.menus) && this.menus.length > 0) {
      items = [...items, ...this.menus];
    }
    while (true) {
      const f = _.find(items, item => _.isArray(item.menus) && item.menus.length > 0);
      if (_.isUndefined(f)) {
        break;
      } else {
        items = _.filter(items, item => !_.isEqual(item, f));
        items = [...items, ...f.flat()];
      }
    }
    return items.map(i => new Item(i));
  }

  render() {
    let html = '';
    if (_.isArray(this.menus) && this.menus.length > 0) {
      html += '<ol class="dd-list">';
      _.forEach(this.menus, item => {
        html += `
                  <li class="dd-item" data-menu-item-id="${item.id}" data-label="${item.label}" data-link="${item.link}" data-parent="${item.parent_id}">
                      <div class="dd-handle">
                        <div class="row">
                          <div class="col">${item.label}</div>
                          <div class="col text-right">
                            <span>${item.link}</span>
                          </div>
                        </div>
                      </div>
                      <div class="delete_menu_item_btn sub_item" data-id="${item.id}" data-click="deleteMenuItem">
                        <div class="trash icon"></div>
                      </div>
                      <div class="edit_menu_item sub_item" data-label="${item.label}" data-link="${item.link}" data-item-id="${item.id}"><div class="edit icon"></div></div>
                      ${item.render()}
                  </li>
                `;
      });
      html += '</ol>';
    }
    return html;
  }
}
