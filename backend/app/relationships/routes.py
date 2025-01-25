from fastapi import APIRouter, HTTPException
from . import crud
from . import schemas

router = APIRouter()

@router.post("/")
def create_relationship(relationship: schemas.RelationshipCreate):
    """
    Create a new relationship record.
    """
    try:
        crud.create_relationship(
            person1_id=relationship.person1_id,
            person2_id=relationship.person2_id,
            relationship_type=relationship.relationship_type,
            status=relationship.status
        )
        return {"message": "Relationship created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating relationship: {str(e)}")


@router.get("/{relationship_id}")
def get_relationship(relationship_id: int):
    """
    Retrieve a relationship record by ID.
    """
    relationship = crud.get_relationship_by_id(relationship_id)
    if not relationship:
        raise HTTPException(status_code=404, detail="Relationship not found")
    return relationship


@router.get("/")
def get_all_relationships():
    """
    Retrieve all relationship records.
    """
    try:
        relationships = crud.get_all_relationships()
        return relationships
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving relationships: {str(e)}")