from fastapi import FastAPI
from .database import create_tables
from .family.routes import router as family_router
from .person.routes import router as person_router
from .events.routes import router as event_router
from .relationships.routes import router as relationship_router

app = FastAPI()

create_tables()

# Include family-related routes
app.include_router(family_router, prefix="/family", tags=["Family"])
# Include person-related routes
app.include_router(person_router, prefix="/person", tags=["Person"])
# Include event-related routes
app.include_router(event_router, prefix="/event", tags=["Event"])
# Include relationship-related routes
app.include_router(relationship_router, prefix="/relationship", tags=["Relationship"])

