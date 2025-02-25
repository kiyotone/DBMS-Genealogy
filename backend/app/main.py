import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from .database import create_tables
from .family.routes import router as family_router
from .person.routes import router as person_router
from .events.routes import router as event_router
from .relationships.routes import router as relationship_router
from .users.routes import router as user_router

# Load environment variables
load_dotenv()

app = FastAPI()

# Get allowed origins from env variable and split them into a list
allowed_origins = os.getenv("ALLOWED_ORIGINS", "").split(",")

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

create_tables()

# Include routes
app.include_router(family_router, prefix="/family", tags=["Family"])
app.include_router(person_router, prefix="/person", tags=["Person"])
app.include_router(event_router, prefix="/event", tags=["Event"])
app.include_router(relationship_router, prefix="/relationship", tags=["Relationship"])
app.include_router(user_router, prefix="/auth", tags=["User"])
