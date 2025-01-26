from pydantic import BaseModel
from typing import Optional
from datetime import date

class UserBase(BaseModel):
    firstname: str
    lastname: str
    username: str
    email: str
    role: str

class UserLogin(BaseModel):
    # Accept email or username
    email: str
    password: str
    
class UserOut(UserBase):
    id: int
    created_at: date
    updated_at: date
    
class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    password: Optional[str]

