# MEMASTIKAN DATA YANG DITERIMA OLEH ROUTER PADA ENDPOINT YANG BERISI AUTH

from pydantic import BaseModel, EmailStr
from enum import Enum


class roleUser(str, Enum):
    ADMIN = "ADMIN"
    OPERATOR = "OPERATOR"


class requestLogin(BaseModel):
    username: str
    password: str


class requestRegister(BaseModel):
    email: EmailStr
    username: str
    password: str
    role: roleUser
    
class requestVerifyRole(BaseModel):
    token: str
