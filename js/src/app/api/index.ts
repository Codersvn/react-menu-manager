import { MenuService } from './menu.service';

export class ApiService {
  menu: MenuService;
  constructor() {
    this.menu = new MenuService();
  }
}
