---
title: 'Python 执行函数的集中方式'
authors: [yudong]
tags: [Python]
image: https://i.imgur.com/mErPwqL.png
---

1. 使用 `__call__`

```python
def func():
    print("Hello world!")

func()
func.__call__()
```

2. 使用 `partial`

```python
from functools import partial
from console import console


def func(domain, user):
    echo = f"Hello, {user}@{domain}"
    console(echo)


func_userA = partial(func, user="userA")
func_userB = partial(func, user="userB")
func_userA('example.com')
func_userB('example.com')
```

3. 使用 `eval`

```python
from console import console


def pre_task():
    console('running pre_task')


def task():
    console('running task')


def post_task():
    console('running post_task')


cmd_list = ['pre_task()', 'task()', 'post_task()']

for cmd in cmd_list:
    eval(cmd)
```

4. 使用 `getattr`

```python
from console import console


class Task:

    @staticmethod
    def pre_task():
        console("running pre_task")

    @staticmethod
    def task():
        console("running task")

    @staticmethod
    def post_task():
        console("running post_task")


cmd_list = ['pre_task', 'task', 'post_task']

task = Task()

for cmd in cmd_list:
    func = getattr(task, cmd)
    func()
```

5. 使用 `__dict__`

```python
from console import console


class Task:
    @staticmethod
    def pre_task():
        console("running pre_task")

    @staticmethod
    def task():
        console("running task")

    @staticmethod
    def post_task():
        console("running post_task")


# 每个 Python 对象都有一个内置的 __dic__ 属性，它是一个字典，用于存储对象的属性。
func = Task.__dict__.get("pre_task")
# "reportOptionalMemberAccess": false
func.__func__()
```

6. 使用 `globals`

```python
from typing import Callable
from console import console


def pre_task():
    console('running pre_task')


def task():
    console('running task')


def post_task():
    console('running post_task')


cmd_list = ['pre_task', 'task', 'post_task']

for cmd in cmd_list:
    if cmd in globals():
        # globals()[cmd]()
        # equal to
        func: Callable = globals().get(cmd)
        func()
    else:
        console('command not found: ' + cmd)
```

7. 使用 `exec`

```python
pre_task = """
print("running pre_task")
"""

exec(compile(pre_task, "", "exec"))

# TODO
# with open('./source.txt', 'r+') as f:
#     source = f.read()
#     exec(compile(source, 'source.txt', 'exec'))
```

8. 使用 `attrgetter` 和 `getattr`

```python
from operator import attrgetter
from console import console


class People:

    def speak(self, dest: str):
        console('Hello, %s' % dest)


p = People()
caller1 = attrgetter('speak')
caller1(p)('Tony')
caller2 = getattr(p, 'speak')
caller2('Tony')
```

9. 使用 `methodcaller`

```python
from operator import methodcaller
from console import console


class People:

    def speak(self, dest):
        console(f'Hello, {dest}')


p = People()
caller = methodcaller('speak', 'Tony')
caller(p)
```
