---
title: '状态与比较'
authors: [yudong]
tags: [Git]
---

```bash
# 查看状态
git status
# 查看历史操作记录
git reflog
# 查看日志
git log

git lg
```

#### 比较

```bash
# 比较工作区与缓存区
git diff
# 比较缓存区与本地仓库最近一次 commit 内容
git diff --cached
# 比较工作区与最近一次 commit 内容
git diff HEAD
```
