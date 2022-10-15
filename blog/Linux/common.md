---
title: 'Linux 常用命令'
authors: [yudong]
tags: [Linux, Shell]
---

## 系统相关

```bash
uname -a
```

## 字体相关

```bash
# 新建目录
sudo mkdir -p /usr/share/fonts/custom
# 拷贝字体文件
sudo mv *.ttf /usr/share/fonts/custom
sudo chmod 744 /usr/share/fonts/custom/*.ttf
sudo mkfontscale
sudo mkfontdir
# 刷新字体缓存
sudo fc-cache -fv
# 查看系统字体
fc-list
# 查看中文字体
fc-list :lang-zh
# 查看 JetBrains 字体是否已安装
fc-list | grep JetBrains
```

VScode 中使用 JetBrains 字体

```json settings.json
{
    "editor.fontFamily": "JetBrains Mono NL Thin",
    "editor.fontWeight": 300
}
```
