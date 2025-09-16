// 实现的目的是控制反转 IOC
// 用到的方法是 构造注入 DI
import { GET, route } from 'awilix-koa';
import { Context } from 'koa';
import { IApi } from '../@types/IApi';

// 面向切面编程 AOP
@route('/api')
class ApiController {
  private apiService: IApi;

  constructor({ apiService }: { apiService: IApi }) {
    this.apiService = apiService;
  }

  @route('/list')
  @GET()
  async actionList(ctx: Context) {
    const data = await this.apiService.getInfo();
    console.log('data:🍊 ', data);
    ctx.body = {
      data,
    };
  }

  @route('/health')
  @GET()
  async health(ctx: Context) {
    ctx.body = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      message: '服务运行正常 ✅'
    };
  }
}

export default ApiController;