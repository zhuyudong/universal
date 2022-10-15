---
id: curl-tutorial
title: Curl Tutorial
description: ''
---

#### 获取 React GitHub 仓库信息

```bash
curl https://api.github.com/repos/facebook/react
```

```json reference title="Response JSON"
/json/github-react-repo.json
```

#### 获取 React GitHub 仓库访问限制信息

```bash
curl -I https://api.github.com/users/facebook/react
```
