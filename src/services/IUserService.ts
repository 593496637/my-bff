// src/services/IUserService.ts

// 定义一个 User 数据结构，让我们的代码有类型提示
export interface User {
  id: string;
  name: string;
  email: string;
}

// 定义 UserService 的能力
export interface IUserService {
  getUser(id: string): User;
  getAllUsers(): User[];
}