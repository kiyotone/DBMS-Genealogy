from pydantic import BaseModel

class FamilyCreate(BaseModel):
    family_name: str
    origin_country: str
    description: str = None

    class Config:
        orm_mode = True
