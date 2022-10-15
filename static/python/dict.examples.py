# from rich import print
from rich.console import Console
from rich import inspect

console = Console().print

x = []
y = {}
# x[0] = 0
"""
Traceback (most recent call last):
  File "/Users/zhuyudong/Desktop/GitHub/universal/static/python/dict.examples.py", line 3, in <module>
    x[0] = 0
IndexError: list assignment index out of range
"""
y[0] = 0
y[1] = 1
console(y)  # {0: 0, 1: 1}
console(len(y))  # 2
console(list(y.keys()))  # [0, 1]
console(list(y.values()))  # [0, 1]
console(list(y.items()))  # [(0, 0), (1, 1)]

del y[0]
console(0 in y)  # False

console(y.get(0))  # None
console(y.get(0, 0))  # 0

# 不存在时设为默认值
console(y.setdefault(0, 0))  # 0
console(y)  # {1: 1, 0: 0}

console(y.copy())  # {1: 1, 0: 0}

z = {1: 'One', 2: 'Two'}
x = {0: 'zero', 1: 'one'}
# z 覆盖 x 中相同的键
x.update(z)
console(x)  # {0: 'zero', 1: 'One', 2: 'Two'}

inspect(y, methods=True)
