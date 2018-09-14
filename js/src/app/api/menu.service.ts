import { BaseService } from './base.service';
import { Menu } from '../models/Menu';

export class MenuService extends BaseService {
  public url = '/api/admin/menus';
  public model = Menu;
}
