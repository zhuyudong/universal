---
id: python-dict
title: 'Python 字典'
description: ''
---

| 对象 | 不可变 |
| ---- | ------ |

## 基本常识

1. 任何不可变（immutable）且可散列（hashable）的 Python 对象，都可被用作字典的键

| Python 对象 | 不可变 | 可散列 | 可作为字典键 |
| ----------- | ------ | ------ | ------------ |
| int         | 是     | 是     | 是           |
| float       | 是     | 是     | 是           |
| boolean     | 是     | 是     | 是           |
| complex     | 是     | 是     | 是           |
| str         | 是     | 是     | 是           |
| bytes       | 是     | 是     | 是           |
| list        | 否     | 否     | 否           |
| tuple       | 是     | 有时   | 有时         |
| set         | 否     | 否     | 否           |
| frozenset   | 是     | 是     | 是           |
| dictionary  | 否     | 否     | 否           |
