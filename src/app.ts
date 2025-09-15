// src/app.ts (修正版)

import Koa, { Context } from 'koa';
import Router from '@koa/router';
const nunjucks = require('koa-nunjucks-2');
import serve from 'koa-static';
import historyApiFallback from 'koa2-connect-history-api-fallback';
import path from 'path';
import { createContainer, Lifetime } from 'awilix';
import { scopePerRequest, loadControllers } from 'awilix-koa';

// 手动导入控制器和服务
import HomeController from './controllers/homeController';
import UserController from './controllers/userController';
import ApiController from './controllers/apiController';
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
  whiteList: ['/api', '/decorator'] // API 和装饰器路由不回退到首页
}));

// --- 4. 配置依赖注入容器 (Awilix) ---
const container = createContainer();

// 自动加载services (参考课件项目配置)
container.loadModules([`${__dirname}/services/*.ts`], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SCOPED,
  },
});

// 必须在container配置完成后再设置
app.use(scopePerRequest(container));

// --- 5. 手动配置路由 ---
const router = new Router();

// 手动实例化控制器并设置路由
const homeController = new HomeController();
const apiController = new ApiController();

// 容器会自动加载userService，不需要手动解析
const userController = new UserController({ userService: container.resolve('userService') });

// 设置路由
// 页面路由
router.get('/', homeController.index.bind(homeController));
router.get('/user/:id', userController.get.bind(userController));

// API 路由
router.get('/api/health', apiController.health.bind(apiController));
router.get('/api/info', apiController.info.bind(apiController));
router.get('/api/mock-data', apiController.mockData.bind(apiController));

// 用户相关 API 路由
router.get('/api/user/:id', userController.getUserApi.bind(userController));
router.get('/api/users', userController.getUsersApi.bind(userController));

// 先加载装饰器路由
app.use(loadControllers(path.join(__dirname, 'controllers/*.ts'), { cwd: __dirname }));

// 再加载传统路由
app.use(router.routes());
app.use(router.allowedMethods());

// --- 6. 启动服务 ---
const port = 3000;
app.listen(port, () => {
  console.log(`🚀 服务已启动，正在监听 ${port} 端口`);
  console.log(`🔗 请访问 http://localhost:${port}`);
});