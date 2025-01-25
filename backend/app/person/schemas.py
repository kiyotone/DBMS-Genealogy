from pydantic import BaseModel
from typing import Optional
from datetime import date

class PersonCreate(BaseModel):
    first_name: str
    last_name: str
    gender: str
    date_of_birth: date
    date_of_death: Optional[date] = None
    maternal_family_id: Optional[int] = None
    paternal_family_id: Optional[int] = None


