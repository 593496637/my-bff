import { IApi } from '../@types/IApi';
import { IData } from '../@types/IData';

class ApiService implements IApi {
  getInfo(): Promise<IData> {
    return new Promise((resolve) => {
      resolve({
        item: '我是后台数据🌺',
        result: [1, 'next'],
      });
    });
  }
}

export default ApiService;