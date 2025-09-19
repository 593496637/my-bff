module.exports = {
  apps: [
    {
      name: 'my-bff-app',
      script: './dist/app.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false, // 生产环境不开启 watch
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: './logs/my-bff-error.log',
      out_file: './logs/my-bff-out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
    {
      // 开发环境配置 (直接运行编译后的代码)
      name: 'my-bff-dev',
      script: './dist/app.js',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: true,
      ignore_watch: ['node_modules', 'logs'],
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      error_file: './logs/my-bff-dev-error.log',
      out_file: './logs/my-bff-dev-out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    }
  ],
};