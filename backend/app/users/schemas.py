from pydantic import BaseModel
from typing import Optional
from datetime import date

class UserBase(BaseModel):
    firstname: str
    lastname: str
    username: str
    email: str
    role: str