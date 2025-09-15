#!/bin/bash
# 用法: ./killport.sh 3000

if [ -z "$1" ]; then
  echo "❌ 请输入要释放的端口号，例如: ./killport.sh 3000"
  exit 1
fi

PORT=$1

PIDS=$(netstat -ano | grep ":$PORT" | awk '{print $5}' | sort -u)

if [ -z "$PIDS" ]; then
  echo "✅ 端口 $PORT 未被占用"
  exit 0
fi

for PID in $PIDS; do
  echo "🔎 杀死 PID: $PID (端口 $PORT)"
  cmd //c "taskkill /PID $PID /F"
done
