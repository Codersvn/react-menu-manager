import { MenuService } from './menu.service';
import store from '../store';

export class ApiService {
  menu: MenuService;
  constructor() {
    const api_url = store.getState().App.api_url;
    this.menu = new MenuService({ api_url });
  }
}
