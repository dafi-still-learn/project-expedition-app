# MEMASTIKAN DATA YANG DITERIMA OLEH ROUTER PADA ENDPOINT YANG BERISI AUTH

from pydantic import BaseModel, EmailStr
from enum import Enum


class roleUser(str, Enum):
    ADMIN = 'admin',
    OPERATOR = 'operator',


class requestLogin(BaseModel):
    username: str
    password: str


class requestRegister(BaseModel):
    email: EmailStr
    username: str
    password: str
    role: roleUser
