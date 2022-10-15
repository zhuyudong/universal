---
title: '撤销'
authors: [yudong]
tags: [Git]
---

### 版本回退

-   `git reset --(soft|mixed|hard) < HEAD ~(num) > |`

| 指令      | 作用范围                                 |
| --------- | ---------------------------------------- |
| `--hard`  | 回退全部，包括 HEAD、index、working tree |
| `--mixed` | 回退部分，包括 HEAD、index               |
| `--soft`  | 只回退 HEAD                              |

#### 撤销工作区

```bash
git checkout --
# alias
git checkout .
```

#### 撤销暂存区（不覆盖工作区）

```bash
git reset HEAD
```

### 修改最近一次 commit message

```bash
git commit --amend
```

### 合并 commit

**注意：rebase 前确保都已经 add 和 commit，如果有修改可以先 `git stash`，合并结束后再 `git stash pop` **

```bash
# 从HEAD版本开始往过去数3个版本
git rebase -i HEAD~3

# or
# 指名要合并的版本之前的版本号
git rebase -i 3a4226b

# or
git rebase
# 将 pick 改为 squash 或 s 后保存退出，如果有冲突，则解决冲突后
# 如果 commit msg 写错了，如 squash 写成料 sqaush，则执行
git rebase --edit-todo # 继续编辑
# 冲突都解决完后继续 rebase
git add .
git rebase --continue
# 如果想放弃这次压缩则
git rebase --abort
# 如果没有冲突则保存退出
```

合并结束后

```bash
git pull && git push
```
