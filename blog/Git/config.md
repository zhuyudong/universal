---
title: 'Git 配置'
authors: [yudong]
tags: [Git]
---

#### 全局配置

```bash
# 设置默认主分支名
git config --global initi.defaultbranch main
# 修改当前分支名
git branch -m main

#全局配置#
git config --global user.name "zhuyudong"
git config --global user.email "zhuyudong@aliyun.com"
# 设置默认主分支名，注意大小写
git config --global init.defaultbranch main
# 修改用户名和邮箱后修改刚才的提交，使用最新的用户信息
git commit --amend --reset-author

# fatal: unable to access 'xxx': gnutls_handshake() failed: Error in the pull function.
git config --global --unset http.proxy
git config --global --unset https.proxy
```

#### 核心配置

```
# 设置对大小写敏感
git config --global core.ignorecase false
# 使用 vim 作为编辑器
git config --global core.editor "vim"

# 远程分支和本地分支合并策略
git config --global pull.rebase true
# git config pull.rebase false
# git config pull.ff only
```

#### 列出配置

```bash
# 列出所有配置
git config --list
# 列出本仓库配置
git config --local --list
# 列出全局配置
git config --global --list
# 列出系统配置
git config --system --list
```

#### 魔法配置

```
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```
