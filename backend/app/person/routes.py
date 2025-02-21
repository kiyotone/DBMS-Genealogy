from fastapi import APIRouter, HTTPException
from . import crud
from . import schemas
from . import utils

router = APIRouter()

@router.post("/")
def create_person(person: schemas.PersonCreate):
    """
    Create a new person record.
    """
    try:
        crud.create_person(
            first_name=person.first_name,
            last_name=person.last_name,
            gender=person.gender,
            date_of_birth=person.date_of_birth,
            date_of_death=person.date_of_death,
            maternal_family_id=person.maternal_family_id,
            paternal_family_id=person.paternal_family_id,
            occupation=person.occupation
        )
        return {"message": "Person created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating person: {str(e)}")


@router.get("/{person_id}")
def get_person(person_id: int):
    """
    Retrieve a person record by ID.
    """
    person = crud.get_person_by_id(person_id)
    if not person:
        raise HTTPException(status_code=404, detail="Person not found")
    return person


@router.get("/")
def get_all():
    """
    Retrieve all person records.
    """
    try:
        persons = crud.get_all_persons()
        return persons
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving persons: {str(e)}")

@router.get("/{person_id}/hierarchy")
def get_person_hierarchy(person_id: int):
    """
    Retrieve the hierarchy of a person.
    """
    try:
        hierarchy = utils.get_position_in_hierarchy(person_id)
        return hierarchy
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving hierarchy: {str(e)}")
    
@router.get("/{person_id}/descendants")
def get_person_descendants(person_id: int):
    """
    Retrieve the descendants of a person.
    """
    try:
        descendants = utils.get_descendants(person_id)
        return descendants
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving descendants: {str(e)}")