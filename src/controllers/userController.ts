
import { Context } from 'koa';
import { IUserService } from '../services/IUserService';

interface IUserControllerDeps {
  userService: IUserService;
}

export default class UserController {
  private readonly userService: IUserService;

  constructor({ userService }: IUserControllerDeps) {
    this.userService = userService;
  }

  // 映射到 GET /user/:id - 返回页面
  async get(ctx: Context) {
    const userId = ctx.params.id;
    const user = this.userService.getUser(userId);

    await ctx.render('user', {
      title: '用户详情页',
      user: user,
    });
  }

  // API 接口 - 返回 JSON 数据
  async getUserApi(ctx: Context) {
    const userId = ctx.params.id;
    const user = this.userService.getUser(userId);

    ctx.body = {
      success: true,
      data: user,
      message: '获取用户信息成功'
    };
  }

  // API 接口 - 获取所有用户列表
  async getUsersApi(ctx: Context) {
    const users = this.userService.getAllUsers();

    ctx.body = {
      success: true,
      data: users,
      message: '获取用户列表成功'
    };
  }
}