from fastapi import APIRouter, HTTPException
from . import crud
from . import schemas

router = APIRouter()

@router.post("/")
def create_event(event: schemas.EventCreate):
    """
    Create a new event record.
    """
    try:
        crud.create_event(
            eventtype=event.eventtype,
            date=event.date,
            location=event.location,
            description=event.description,
            associatedpersonid=event.associatedpersonid,
            associatedfamilyid=event.associatedfamilyid
        )
        return {"message": "Event created successfully" , "status": 200}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating event: {str(e)}")


@router.get("/{event_id}")
def get_event(event_id: int):
    """
    Retrieve an event record by ID.
    """
    event = crud.get_event_by_id(event_id)
    
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event


@router.get("/")
def get_all_events():
    """
    Retrieve all event records.
    """
    try:
        events = crud.get_all_events()
        return events
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving events: {str(e)}")
