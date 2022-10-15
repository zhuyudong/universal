---
title: '常用软件的 Docker 安装与使用'
authors: [yudong]
tags: [Docker]
slug: /docker/install
---

## Docker Compose

https://github.com/docker/compose/releases

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/v2.11.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose version
```

测试 Docker Compose

```bash
cd static/docker-compose
pip install -r requirement.txt

# 启动
python app.py
# 测试
curl -v -i http://localhost:5000

# 通过 docker-compose 方式启动
# docker-compose up
docker-compose up -d
# 查看容器日志
docker logs --help
docker logs <cotainer id> -f -t --details
docker logs <cotainer name> -f -t --details
# 会在其 depends_on 前先停止
docker-compose stop
```

## Redis

```bash
docker pull redis
# or
docker pull redis:lastest
docker images
docker run -itd --name redis -p 6379:6379 redis
docker ps
docker exec -it redis /bin/bash
redis-cli
```
