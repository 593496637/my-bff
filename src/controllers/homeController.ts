// src/controllers/homeController.ts

import { Context } from 'koa';

export default class HomeController {
  // 这个方法会自动映射到 GET /
  // 因为 awilix-koa 默认将 index 方法映射到根路径
  async index(ctx: Context) {
    // 渲染 views/index.html 模板
    // 并传入一个 title 变量
    await ctx.render('index', {
      title: '欢迎来到我的 BFF 项目!',
    });
  }
}