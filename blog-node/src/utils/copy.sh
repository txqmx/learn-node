#!/bin/sh

cd /Users/mc/learnResult/learn-node/blog-node/logs
# 拷贝
cp access.log $(date +%Y-%m-%d).access.log
# 清空
echo "" > access.log

# /bin/sh /Users/mc/learnResult/learn-node/blog-node/src/utils/copy.sh
