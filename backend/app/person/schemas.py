from pydantic import BaseModel
from typing import Optional
from datetime import date

class PersonCreate(BaseModel):
    firstname: str
    lastname: str
    gender: str
    dateofbirth: date
    dateofdeath: Optional[date] = None
    maternalfamilyid: Optional[int] = None
    paternalfamilyid: Optional[int] = None
    occupation: Optional[str] = None


