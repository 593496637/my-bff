
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

  // 映射到 GET /user/:id
  async get(ctx: Context) {
    const userId = ctx.params.id;
    const user = this.userService.getUser(userId);

    await ctx.render('user', {
      title: '用户详情页',
      user: user,
    });
  }
}