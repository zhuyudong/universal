from typing import NewType
from collections.abc import Sequence


def greeting(name: str) -> str:
    return 'Hello ' + name


# ----------------------------------------
Vector = list[float]


def scale(scalar: float, vector: Vector) -> Vector:
    return [scalar * num for num in vector]


# ----------------------------------------

ConnectionOptions = dict[str, str]
Address = tuple[str, int]
Server = tuple[Address, ConnectionOptions]


def broadcast_message(message: str, servers: Sequence[Server]) -> None:
    pass
# The static type checker will treat the previous type signature as
# being exactly equivalent to this one.


def broadcast_message(message: str, servers: Sequence[tuple[tuple[str, int], dict[str, str]]]) -> None:
    pass


# ----------------------------------------

UserId = NewType('UserId', int)
some_id = UserId(524313)


def get_user_name(user_id: UserId) -> str:
    pass


user_a = get_user_name(UserId(524313))
user_b = get_user_name(-1)  # Error: invalid type
