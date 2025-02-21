from fastapi import APIRouter, Depends, HTTPException
from . import crud
from . import schemas

router = APIRouter()

@router.post("/")
def create_family(family: schemas.FamilyCreate):
    crud.create_family(family.familyname, family.origincountry, family.description)
    return {"message": "Family created successfully" , "status": 200}

@router.get("/{family_id}")
def get_family(family_id: int):
    family = crud.get_family_by_id(family_id)
    if not family:
        raise HTTPException(status_code=404, detail="Family not found")
    return family

@router.get("/")
def get_families():
    families = crud.get_families()
    return families
