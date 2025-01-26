from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import create_tables
from .family.routes import router as family_router
from .person.routes import router as person_router
from .events.routes import router as event_router
from .relationships.routes import router as relationship_router
from .users.routes import router as user_router

app = FastAPI()

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins. Replace "*" with specific domains for security.
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods.
    allow_headers=["*"],  # Allows all headers.
)

create_tables()

# Include family-related routes
app.include_router(family_router, prefix="/family", tags=["Family"])
# Include person-related routes
app.include_router(person_router, prefix="/person", tags=["Person"])
# Include event-related routes
app.include_router(event_router, prefix="/event", tags=["Event"])
# Include relationship-related routes
app.include_router(relationship_router, prefix="/relationship", tags=["Relationship"])
# Include user-related routes
app.include_router(user_router, prefix="/auth", tags=["User"])