from pydantic import BaseModel
from typing import Optional

class RelationshipCreate(BaseModel):
    person1_id: int
    person2_id: int
    relationship_type: str
    status: str