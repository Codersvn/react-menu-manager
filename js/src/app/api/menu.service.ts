import { BaseService } from './base.service';
import { Menu } from '../models/Menu';
import axios from 'axios';
import { environment } from '../../environments/environment';

export class MenuService extends BaseService {
  public url = '/api/admin/menus';
  public model = Menu;
  options: any;

  constructor(options?: {}) {
    super(options);
    this.options = options;
  }

  save(params) {
    const baseURL = this.options.api_url || environment.apiUrl;
    const headers = {
      ['Content-Type']: 'application/json'
    };
    return new Promise((resolve, reject) => {
      const api = axios.create({ baseURL, headers });
      api
        .post(`api/admin/menus/${params.menus.id}/save`, params)
        .then(response => {
          resolve(new this.model(response.data));
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  createItem(menu_id, params) {
    const baseURL = this.options.api_url || environment.apiUrl;
    const headers = {
      ['Content-Type']: 'application/json'
    };

    return new Promise((resolve, reject) => {
      const api = axios.create({ baseURL, headers });
      api
        .post(`api/admin/menus/${menu_id}/items`, params)
        .then(response => {
          resolve(new this.model(response.data.data));
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
