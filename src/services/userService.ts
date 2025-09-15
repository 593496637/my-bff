// src/services/userService.ts

import { IUserService, User } from './IUserService';

// 'implements IUserService' 确保了这个类遵守了我们定义的契约
// 如果缺少 getUser 方法或类型不匹配，TypeScript 会报错
export class UserService implements IUserService {
  private users: User[] = [
    { id: '1', name: 'Alice', email: 'alice@example.com' },
    { id: '2', name: 'Bob', email: 'bob@example.com' },
    { id: '3', name: 'Charlie', email: 'charlie@example.com' },
  ];

  getUser(id: string): User {
    console.log(`正在从服务层获取 ID 为 ${id} 的用户数据...`);

    // 先从预设数据中查找
    const existingUser = this.users.find(user => user.id === id);
    if (existingUser) {
      return existingUser;
    }

    // 如果没找到，返回动态生成的用户数据
    return {
      id: id,
      name: `User-${id}`,
      email: `user${id}@example.com`,
    };
  }

  getAllUsers(): User[] {
    console.log('正在从服务层获取所有用户数据...');
    return this.users;
  }
}

// 为 awilix 提供默认导出
export default UserService;