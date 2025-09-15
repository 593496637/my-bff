// src/controllers/apiController.ts

import { Context } from 'koa';

export default class ApiController {
  // 健康检查接口
  async health(ctx: Context) {
    ctx.body = {
      success: true,
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: '1.0.0'
      },
      message: '服务运行正常'
    };
  }

  // 系统信息接口
  async info(ctx: Context) {
    ctx.body = {
      success: true,
      data: {
        name: 'My BFF Server',
        version: '1.0.0',
        description: 'Koa + TypeScript BFF 服务',
        author: 'Developer',
        nodeVersion: process.version,
        platform: process.platform,
        memory: process.memoryUsage()
      },
      message: '获取系统信息成功'
    };
  }

  // 模拟数据接口
  async mockData(ctx: Context) {
    const data = [
      { id: 1, title: '文章标题1', content: '这是文章内容1', createTime: '2024-01-01' },
      { id: 2, title: '文章标题2', content: '这是文章内容2', createTime: '2024-01-02' },
      { id: 3, title: '文章标题3', content: '这是文章内容3', createTime: '2024-01-03' },
    ];

    ctx.body = {
      success: true,
      data: data,
      total: data.length,
      message: '获取模拟数据成功'
    };
  }
}