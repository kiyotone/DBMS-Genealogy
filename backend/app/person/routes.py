from fastapi import APIRouter, HTTPException, status
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
            firstname=person.firstname,
            lastname=person.lastname,
            gender=person.gender,
            dateofbirth=person.dateofbirth,
            dateofdeath=person.dateofdeath,
            maternalfamilyid=person.maternalfamilyid,
            paternalfamilyid=person.paternalfamilyid,
            occupation=person.occupation
        )
        return {"status": 200, "message": "Person created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating person: {str(e)}")


@router.get("/{person_id}")
def get_person(person_id: int):
    """
    Retrieve a person record by ID.
    """
    try:
        person = crud.get_person_by_id(person_id)
        if not person:
            raise HTTPException(status_code=404, detail="Person not found")
        return {"status": 200, "data": person}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving person: {str(e)}")


@router.get("/")
def get_all():
    """
    Retrieve all person records.
    """
    try:
        persons = crud.get_all_persons()
        return {"status": 200, "data": persons}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving persons: {str(e)}")


@router.get("/{person_id}/hierarchy")
def get_person_hierarchy(person_id: int):
    """
    Retrieve the hierarchy of a person.
    """
    try:
        hierarchy = utils.get_position_in_hierarchy(person_id)
        if not hierarchy:
            raise HTTPException(status_code=404, detail="Hierarchy not found")
        return {"status": 200, "data": hierarchy}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving hierarchy: {str(e)}")


@router.get("/{person_id}/descendants")
def get_person_descendants(person_id: int):
    """
    Retrieve the descendants of a person.
    """
    try:
        descendants = utils.get_descendants(person_id)
        if not descendants:
            raise HTTPException(status_code=404, detail="Descendants not found")
        return {"status": 200, "data": descendants}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving descendants: {str(e)}")
