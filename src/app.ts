// src/app.ts (修正版)

import Koa, { Context } from 'koa';
import Router from '@koa/router';
import nunjucks from 'koa-nunjucks-2';
import serve from 'koa-static';
import historyApiFallback from 'koa2-connect-history-api-fallback';
import path from 'path';
import { createContainer, Lifetime } from 'awilix';
import { scopePerRequest } from 'awilix-koa';

// 手动导入控制器和服务
import HomeController from './controllers/homeController';
import UserController from './controllers/userController';
import UserService from './services/userService';

// 创建 Koa 应用实例
const app = new Koa();

// --- 1. 配置模板引擎 (Nunjucks) ---
app.use(nunjucks({
  ext: 'html',
  path: path.join(__dirname, 'views'),
  nunjucksConfig: {
    trimBlocks: true,
  },
}));

// --- 2. 配置静态文件服务 ---
app.use(serve(path.join(__dirname, 'public')));

// --- 3. 配置 SPA 路由回退 ---
app.use(historyApiFallback({
  index: '/',
  whiteList: ['/api'] // API 路由不回退到首页
}));

// --- 4. 配置依赖注入容器 (Awilix) ---
const container = createContainer();
app.use(scopePerRequest(container));

// 手动注册服务
container.register({
  userService: {
    resolve: () => new UserService(),
    lifetime: Lifetime.SINGLETON
  }
});

// --- 5. 手动配置路由 ---
const router = new Router();

// 手动实例化控制器并设置路由
const homeController = new HomeController();

// 等待容器加载完成后再解析服务
let userController = null;
try {
  const userService = container.resolve('userService');
  userController = new UserController({ userService });
} catch (error) {
  console.log('无法解析 userService，跳过用户路由');
}

// 设置路由
router.get('/', homeController.index.bind(homeController));
if (userController) {
  router.get('/user/:id', userController.get.bind(userController));
}

app.use(router.routes());
app.use(router.allowedMethods());

// --- 6. 启动服务 ---
const port = 3000;
app.listen(port, () => {
  console.log(`🚀 服务已启动，正在监听 ${port} 端口`);
  console.log(`🔗 请访问 http://localhost:${port}`);
});