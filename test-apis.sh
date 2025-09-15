#!/bin/bash
echo "=== 测试所有API接口 ==="

echo "1. 健康检查:"
curl -s http://localhost:3000/api/health | head -5

echo -e "\n2. 系统信息:"
curl -s http://localhost:3000/api/info | head -5

echo -e "\n3. 模拟数据:"
curl -s http://localhost:3000/api/mock-data | head -5

echo -e "\n4. 用户信息:"
curl -s http://localhost:3000/api/user/1 | head -5

echo -e "\n5. 用户列表:"
curl -s http://localhost:3000/api/users | head -5

echo -e "\n6. 装饰器控制器首页:"
curl -s http://localhost:3000/decorator | head -5

echo -e "\n7. 装饰器问候接口:"
curl -s http://localhost:3000/decorator/hello | head -5

echo -e "\n8. 装饰器用户信息:"
curl -s http://localhost:3000/decorator/user/1 | head -5

echo -e "\n=== 测试完成 ==="
