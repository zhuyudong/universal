---
title: '代码合并'
authors: [yudong]
tags: [Git]
---

### merge

```bash
# 当前分支与指定分支合并
git merge <branch-name>
# 当合并时发生冲突时可以终止合并
git merge --abort
```

### rebase

```bash
git rebase develop
```

#### cherry-pick

**`git cherry-pick <commit hash>` 将其它分支上已 commit 的在当前分支上再提交一次，产生新的 commit**

### 冲突解决（conflict resolve）

### merge 与 rebase 的区别

### 使用 rebase 进行 commit 合并，见[这里](/blog/Git/reset_revert#合并commit)
