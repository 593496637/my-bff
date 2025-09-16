import { GET, route } from 'awilix-koa';
import { Context } from 'koa';

@route('/')
class IndexController {
  @route('')
  @GET()
  async index(ctx: Context) {
    await ctx.render('index', {
      title: '首页',
      message: '欢迎使用 Koa + Awilix BFF 架构！',
      timestamp: new Date().toLocaleString()
    });
  }

  @route('/about')
  @GET()
  async about(ctx: Context) {
    await ctx.render('about', {
      title: '关于页面',
      description: '这是一个基于 AOP 面向切面编程的 BFF 项目',
      features: [
        '依赖注入 (DI)',
        '控制反转 (IOC)',
        '装饰器路由',
        'SPA 路由支持',
        'TypeScript 支持'
      ]
    });
  }
}

export default IndexController;