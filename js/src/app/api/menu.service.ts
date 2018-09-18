import { BaseService } from './base.service';
import { Menu } from '../models/Menu';
import axios from 'axios';
import { environment } from '../../environments/environment';

export class MenuService extends BaseService {
  public url = '/api/admin/menus';
  public model = Menu;

  save(params) {
    const baseURL = environment.apiUrl;
    const headers = {
      ['Content-Type']: 'application/json'
    };
    const api = axios.create({ baseURL, headers });
    return this.api.post('api/admin/update/menus-item', params);
  }
}
