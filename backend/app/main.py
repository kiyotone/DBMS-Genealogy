from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Request
import os
from dotenv import load_dotenv


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import create_tables
from .family.routes import router as family_router
from .person.routes import router as person_router
from .events.routes import router as event_router
from .relationships.routes import router as relationship_router
from .users.routes import router as user_router



# Load environment variables
load_dotenv()

app = FastAPI()

# Get allowed origins from env variable and split into a list
allowed_origins = os.getenv("ALLOWED_ORIGINS", "").split(",")
print("Loaded Allowed Origins:", allowed_origins)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging all requests and responses
@app.middleware("http")
async def log_requests(request: Request, call_next):
    print(f"Incoming request: {request.method} {request.url}")
    print(f"Headers: {request.headers}")

    response = await call_next(request)

    print(f"Response status: {response.status_code}")
    print(f"Response headers: {response.headers}")

    return response

@app.get("/")
def read_root():
    return {"Hello": "To Our Family Tree API!"}



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