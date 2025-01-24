from pydantic import BaseModel
from typing import Optional
from datetime import date

class EventCreate(BaseModel):
    EventType: str
    Date: date
    Location: Optional[str] = None
    Description: Optional[str] = None
    AssociatedPersonID: Optional[int] = None
    AssociatedFamilyID: Optional[int] = None
