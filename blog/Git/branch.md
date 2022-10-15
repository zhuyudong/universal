---
title: '分支管理'
authors: [yudong]
tags: [Git]
---

#### 查看分支

```bash
# 查看本地分支
git branch
# 查看远程分支
git branch -r
# 查看所有本地和远程分支
git branch -a
```

#### 切换分支

```bash
git checkout <branch-name>
# 查看并新建分支
git checkout -b <branch-name>
# 拉取远程分支并创建本地分支
git checkout -b <local-branch-name> origin/<remote-branch-name>
# alias
git fetch origin <remote-branch-name>:<local-branch-name>
```

#### 跟踪远程分支

```bash
# 如果远程存在这个分支则本地跟踪这个远程分支
git branch --set-upstream-to=origin/main main
# 如果远程不存在这个分支，则远程新建这个分支并推送上去
git push --set-upstream origin main
```

#### 同步分支列表

```bash
git fetch -p
```

#### 删除分支

```bash
# 删除本地分支
git branch -d <branch-name>
# 强制删除本地分支
# error: The branch 'feat/curate' is not fully merged.
# If you are sure you want to delete it, run 'git branch -D feat/curate'.
git banch -D <branch-name>
# 删除远程分支
git push origin --delete <branch-name>
# alias
git push origin -d <branch-name>
# 删除远程分支
git push origin :<branch-name>
```

#### 重命名分支

```bash
git branch -m <oldbranch-name> <newbranch-name>
```

#### 分支合并查看

```bash
# 查看哪些分支已经合并到当前分支
git branch --merged
# 查看哪些分支还没有合并到当前分支
git branch --no-merged
```

#### 分支信息

```bash
# 查看各个分支最后一个提交对象的信息
git branch -v
```
