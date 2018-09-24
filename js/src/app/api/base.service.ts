import { environment } from './../../environments/environment';
import axios from 'axios';

interface ServiceInterface {
  url: any;
  model: any;
}

interface OptionInterface {
  api_url?: string;
  headers?: object;
}

export class BaseService implements ServiceInterface {
  model: any;
  url: any;
  public api: any;
  constructor(options?: OptionInterface) {
    options = options || {};
    const baseURL = options.api_url || environment.apiUrl;
    const headers = options.headers || {
      ['Content-Type']: 'application/json'
    };
    this.api = axios.create({ baseURL, headers });
  }

  /**
   * Get the list of resource with pagination
   *
   * @param params
   */
  get(params: Object = {}): Promise<Object> {
    return this.api.get(`${this.url}`, { params });
  }

  /**
   * Get the instance of resource
   *
   * @param id
   * @param params
   */
  show(id: any, params: Object = {}): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.api
        .get(`${this.url}/${id}`, { params })
        .then(response => {
          resolve(new this.model(response.data.data));
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * Get the list of all resource
   *
   * @param params
   */
  list(params: Object = {}): Promise<Object> {
    return this.api.post(`${this.url}/list`, params);
  }

  /**
   * Create new resource with given data
   *
   * @param params
   */
  create(params: Object = {}): Promise<Object> {
    return this.api.post(`${this.url}`, params);
  }
}
