from pydantic import BaseModel


class register(BaseModel):
    email: str
    username: str
    password: str


class login(BaseModel):
    username: str
    password: str


class validate_register(BaseModel):
    email: str
    username: str


class validate_login(BaseModel):
    username: str
    password: str


class lupa_password(BaseModel):
    email: str
