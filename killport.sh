#!/bin/bash
# 用法: ./killport.sh 3000
# 跨平台端口清理脚本 (支持 Mac/Linux 和 Windows)

if [ -z "$1" ]; then
  echo "❌ 请输入要释放的端口号，例如: ./killport.sh 3000"
  exit 1
fi

PORT=$1

# 检测操作系统
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" || "$OSTYPE" == "win32" ]]; then
  # Windows 系统
  echo "🖥️  检测到 Windows 系统"

  # 查找占用端口的进程
  PIDS=$(netstat -ano | grep ":$PORT " | awk '{print $5}' | sort -u)

  if [ -z "$PIDS" ]; then
    echo "✅ 端口 $PORT 未被占用"
    exit 0
  fi

  echo "🔎 发现占用端口 $PORT 的进程: $PIDS"

  for PID in $PIDS; do
    echo "🔫 正在杀死进程 PID: $PID (端口 $PORT)"
    taskkill //PID $PID //F
    if [ $? -eq 0 ]; then
      echo "✅ 成功杀死进程 $PID"
    else
      echo "❌ 杀死进程 $PID 失败"
    fi
  done

else
  # Mac/Linux 系统
  echo "🖥️  检测到 Mac/Linux 系统"

  # 查找占用端口的进程
  PIDS=$(lsof -ti :$PORT 2>/dev/null)

  if [ -z "$PIDS" ]; then
    echo "✅ 端口 $PORT 未被占用"
    exit 0
  fi

  echo "🔎 发现占用端口 $PORT 的进程: $PIDS"

  for PID in $PIDS; do
    echo "🔫 正在杀死进程 PID: $PID (端口 $PORT)"
    kill -9 $PID
    if [ $? -eq 0 ]; then
      echo "✅ 成功杀死进程 $PID"
    else
      echo "❌ 杀死进程 $PID 失败"
    fi
  done
fi

echo "🎉 端口 $PORT 清理完成"
