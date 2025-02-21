from pydantic import BaseModel
from typing import Optional

class RelationshipCreate(BaseModel):
    person1id: int
    person2id: int
    relationshiptype: str
    status: str