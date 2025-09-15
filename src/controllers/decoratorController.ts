// src/controllers/decoratorController.ts
// 装饰器风格的控制器示例

import { GET, POST, route } from "awilix-koa";
import { Context } from "koa";

// 使用@route装饰器定义路由前缀
@route("/decorator")
class DecoratorController {
  // 简化构造函数，不依赖注入
  constructor() {}

  // 使用@GET装饰器定义GET路由
  @route("/hello")
  @GET()
  async hello(ctx: Context) {
    ctx.body = {
      success: true,
      data: {
        message: "这是装饰器风格的路由！",
        path: "/decorator/hello",
        timestamp: new Date().toISOString(),
      },
    };
  }

  // 组合路由：/decorator/user/:id
  @route("/user/:id")
  @GET()
  async getUser(ctx: Context) {
    const userId = ctx.params.id;
    // 简化逻辑，不依赖userService
    const user = {
      id: userId,
      name: `装饰器用户${userId}`,
      email: `decorator-user${userId}@example.com`
    };

    ctx.body = {
      success: true,
      data: user,
      message: `装饰器风格获取用户 ${userId} 信息成功`,
    };
  }

  // POST方法示例
  @route("/data")
  @POST()
  async createData(ctx: Context) {
    const body = (ctx.request as any).body;

    ctx.body = {
      success: true,
      data: {
        received: body,
        created: new Date().toISOString(),
      },
      message: "装饰器风格创建数据成功",
    };
  }

  // 无额外路径的根路由：/decorator
  @GET()
  async index(ctx: Context) {
    ctx.body = {
      success: true,
      data: {
        controller: "DecoratorController",
        style: "AOP装饰器风格",
        routes: [
          "GET /decorator - 控制器首页",
          "GET /decorator/hello - 问候接口",
          "GET /decorator/user/:id - 获取用户信息",
          "POST /decorator/data - 创建数据",
        ],
      },
      message: "装饰器控制器首页",
    };
  }
}
export default DecoratorController;
