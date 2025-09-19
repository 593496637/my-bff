# PM2 部署文档

## 概述

本项目使用 PM2 进行进程管理，支持开发环境和生产环境的不同配置。

## 配置文件说明

### `ecosystem.config.js`

项目包含两个应用配置：

#### 1. 生产环境配置 (`my-bff-app`)
- **运行方式**: 编译后的 JavaScript 文件 (`./dist/app.js`)
- **执行模式**: cluster 集群模式
- **端口**: 3000
- **文件监听**: 关闭 (生产环境稳定性优先)
- **日志文件**: `./logs/my-bff-error.log` 和 `./logs/my-bff-out.log`

#### 2. 开发环境配置 (`my-bff-dev`)
- **运行方式**: TypeScript 源码 (`./src/app.ts`)
- **解释器**: ts-node
- **端口**: 3001
- **文件监听**: 开启 (代码变更自动重启)
- **日志文件**: `./logs/my-bff-dev-error.log` 和 `./logs/my-bff-dev-out.log`

## 使用指南

### 前置准备

1. **构建项目** (生产环境必需)
   ```bash
   npm run build
   ```

2. **确保日志目录存在**
   ```bash
   mkdir -p logs
   ```

### 启动应用

#### 启动生产环境
```bash
# 仅启动生产环境应用
pm2 start ecosystem.config.js --only my-bff-app

# 或者启动所有应用
pm2 start ecosystem.config.js
```

#### 启动开发环境
```bash
# 仅启动开发环境应用
pm2 start ecosystem.config.js --only my-bff-dev
```

#### 启动生产环境 (指定环境变量)
```bash
# 使用生产环境变量启动
pm2 start ecosystem.config.js --only my-bff-app --env production
```

### 应用管理

#### 查看运行状态
```bash
pm2 list
```

#### 查看详细信息
```bash
pm2 describe my-bff-app
```

#### 重启应用
```bash
# 重启指定应用
pm2 restart my-bff-app

# 重启所有应用
pm2 restart all
```

#### 停止应用
```bash
# 停止指定应用
pm2 stop my-bff-app

# 停止所有应用
pm2 stop all
```

#### 删除应用
```bash
# 删除指定应用
pm2 delete my-bff-app

# 删除所有应用
pm2 delete all
```

### 日志管理

#### 查看实时日志
```bash
# 查看指定应用日志
pm2 logs my-bff-app

# 查看最近 50 条日志
pm2 logs my-bff-app --lines 50

# 查看所有应用日志
pm2 logs
```

#### 清空日志
```bash
pm2 flush
```

### 监控

#### 实时监控
```bash
pm2 monit
```

#### 查看资源使用情况
```bash
pm2 status
```

## 访问地址

### 生产环境
- **应用地址**: http://localhost:3000
- **健康检查**: http://localhost:3000/api/health
- **API 接口**: http://localhost:3000/api/list

### 开发环境
- **应用地址**: http://localhost:3001
- **健康检查**: http://localhost:3001/api/health
- **API 接口**: http://localhost:3001/api/list

## 故障排查

### 常见问题

1. **端口被占用**
   ```bash
   # 查看端口占用
   netstat -ano | findstr :3000

   # 或者修改 ecosystem.config.js 中的端口配置
   ```

2. **应用启动失败**
   ```bash
   # 查看错误日志
   pm2 logs my-bff-app --err

   # 查看详细描述
   pm2 describe my-bff-app
   ```

3. **TypeScript 编译错误**
   ```bash
   # 手动检查 TypeScript 编译
   npm run build

   # 查看 ts-node 版本
   ./node_modules/.bin/ts-node --version
   ```

### 日志文件位置

- 生产环境错误日志: `./logs/my-bff-error.log`
- 生产环境输出日志: `./logs/my-bff-out.log`
- 开发环境错误日志: `./logs/my-bff-dev-error.log`
- 开发环境输出日志: `./logs/my-bff-dev-out.log`

## 最佳实践

1. **开发阶段**: 使用 `my-bff-dev` 配置，支持热重载
2. **测试阶段**: 使用 `my-bff-app` 配置测试生产环境
3. **生产部署**: 使用 `my-bff-app` 配置，并启用 `--env production`
4. **定期清理**: 定期清理日志文件，避免磁盘空间不足

## 高级功能

### 集群扩展
```bash
# 启动多个实例 (根据 CPU 核心数)
pm2 start ecosystem.config.js --only my-bff-app -i max

# 启动指定数量实例
pm2 start ecosystem.config.js --only my-bff-app -i 4
```

### 自动重启
```bash
# 设置内存限制，超出后自动重启
pm2 start ecosystem.config.js --only my-bff-app --max-memory-restart 1G
```

### 开机自启
```bash
# 保存当前 PM2 配置
pm2 save

# 生成开机启动脚本
pm2 startup

# 按照提示执行生成的命令
```

---

**注意**: 请根据实际部署环境调整端口号和配置参数。