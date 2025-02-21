from pydantic import BaseModel
from typing import Optional
from datetime import date

class EventCreate(BaseModel):
    eventtype: str
    date: date
    location: Optional[str] = None
    description: Optional[str] = None
    associatedpersonid: Optional[int] = None
    associatedfamilyid: Optional[int] = None
