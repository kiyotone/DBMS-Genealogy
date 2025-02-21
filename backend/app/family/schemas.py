from pydantic import BaseModel

class FamilyCreate(BaseModel):
    familyname: str
    origincountry: str
    description: str = None
