import Koa from 'koa';
import serve from 'koa-static';
import historyApiFallback from 'koa2-connect-history-api-fallback';
import nunjucks from 'koa-nunjucks-2';
import path from 'path';
import { createContainer, Lifetime } from 'awilix';
import { scopePerRequest, loadControllers } from 'awilix-koa';

// 创建 Koa 应用实例
const app = new Koa();

// --- 1. 配置模板引擎 ---
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

// --- 4. 配置依赖注入容器 ---
const container = createContainer();

// 自动加载 services
container.loadModules([`${__dirname}/services/*.ts`], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SCOPED,
  },
});

// 启用请求作用域
app.use(scopePerRequest(container));

// --- 5. 自动加载路由控制器 (装饰器模式) ---
app.use(loadControllers(`${__dirname}/routers/*.ts`, { cwd: __dirname }));

// --- 6. 启动服务 ---
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`🚀 BFF 服务已启动，监听端口 ${port}`);
    console.log(`🔗 访问地址: http://localhost:${port}`);
    console.log(`📚 API 健康检查: http://localhost:${port}/api/health`);
    console.log(`🎯 数据接口: http://localhost:${port}/api/list`);
  });
}

export default app;