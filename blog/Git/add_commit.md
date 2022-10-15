---
title: '代码提交'
authors: [yudong]
tags: [Git]
---

### 提交到暂存区

```bash
# 将当前目录内的所有改动添加到暂存区
git add .
# 将当前仓库所有的文件改动都添加到暂存区
git add -A
```

### 提交到本地仓库

```bash
# 在 GitHub/GitLab 新建一个仓库后 #
git clone <giturl>
cd <foldname>
git switch -c master
touch README.md
git add README.md
git commit -m "chore: Initial commit"

# 将已有的文件夹关联到已新建仓库 #
cd <foldname>
git init --initial-branch=master
git remote add origin <giturl>
git add .
git commit -m "chore: Initial commit"

# 推送现有 git 仓库 #
cd <foldname>
git remote rename origin old-origin
git remote add origin <giturl>
```

#### 删除已被提交到远程仓库的文件

```bash
# 将文件从 Git 仓库删除，配合 .gitignore
git rm <filename>
# 同上，文件夹
git rm -r <folder>
```
