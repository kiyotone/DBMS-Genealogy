from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Request
import os
from dotenv import load_dotenv

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
    return {"Hello": "World"}
