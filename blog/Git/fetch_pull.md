---
title: '拉取代码'
authors: [yudong]
tags: [Git]
---

```bash
# 将远程分支拉取到本地分支
git fetch origin <remote-branch-name>:<local-branch-name>

# 取回所有远程分支
git fetch
# 取特定分支
git fetch origin :<local-branch-name>
# alias
git fetch origin master:<local-branch-name>
```
