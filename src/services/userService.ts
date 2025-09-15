// src/services/userService.ts

import { IUserService, User } from './IUserService';

// 'implements IUserService' 确保了这个类遵守了我们定义的契约
// 如果缺少 getUser 方法或类型不匹配，TypeScript 会报错
export class UserService implements IUserService {
  getUser(id: string): User {
    // 目前，我们返回一个模拟的假数据
    // 未来这里可能会变成数据库查询
    console.log(`正在从服务层获取 ID 为 ${id} 的用户数据...`);
    return {
      id: id,
      name: `User-${id}`,
      email: `user${id}@example.com`,
    };
  }
}

// 为 awilix 提供默认导出
export default UserService;