from fastapi import APIRouter, HTTPException
from . import crud
from . import schemas

router = APIRouter()

@router.post("/")
def create_relationship(relationship: schemas.RelationshipCreate):
    """
    Create a new relationship record, ensuring no duplicate relationships exist.
    """
    try:
        # Check if a relationship already exists between these two people
        existing_relationship = crud.get_relationship_by_persons(
            relationship.person1id, relationship.person2id
        )
        
        if existing_relationship:
            raise HTTPException(
                status_code=400,
                detail="A relationship between these two people already exists"
            )

        # Create the new relationship
        crud.create_relationship(
            person1id=relationship.person1id,
            person2id=relationship.person2id,
            relationshiptype=relationship.relationshiptype,
            status=relationship.status
        )
        return {"message": "Relationship created successfully", "status": 200}

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