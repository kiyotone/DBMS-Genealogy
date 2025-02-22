from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from . import crud, schemas, token

router = APIRouter()

# Preflight request handler for CORS
@router.options("/{path:path}")
async def preflight(path: str):
    return JSONResponse(status_code=200, content={"message": "Preflight OK"})

# User registration
@router.post("/signup")
def register_user(user: schemas.UserCreate):
    if crud.get_user_by_email(user.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_data = user.dict()
    created_user = crud.create_user(user_data)
    return JSONResponse(status_code=201, content=created_user)

# Get a specific user (requires token)
@router.get("/{user_id}")
def get_user(user_id: int, current_user: schemas.UserOut = Depends(token.get_user_from_token)):
    user_data = crud.get_user_by_id(user_id)
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")
    return JSONResponse(status_code=200, content=user_data)

# Get all users (admin only)
@router.get("/")
def get_all_users(current_user: schemas.UserOut = Depends(token.get_user_from_token)):
    if current_user["role"].lower() != "admin":
        raise HTTPException(status_code=403, detail="Permission denied")
    
    all_users = crud.get_all_users()
    return JSONResponse(status_code=200, content=all_users)

# Update user
@router.put("/{user_id}")
def update_user(user_id: int, user: schemas.UserUpdate, current_user: schemas.UserOut = Depends(token.get_user_from_token)):
    if not crud.get_user_by_id(user_id):
        raise HTTPException(status_code=404, detail="User not found")
    
    updated_user = crud.update_user(user_id, user.dict())
    return JSONResponse(status_code=200, content=updated_user)

# Delete user
@router.delete("/{user_id}")
def delete_user(user_id: int, current_user: schemas.UserOut = Depends(token.get_user_from_token)):
    if not crud.get_user_by_id(user_id):
        raise HTTPException(status_code=404, detail="User not found")
    
    deleted_user = crud.delete_user(user_id)
    return JSONResponse(status_code=200, content=deleted_user)

# User login
@router.post("/login")
def login_user(user: schemas.UserLogin):
    db_user = crud.get_user_by_email(user.email) or crud.get_user_by_username(user.email)
    
    if not db_user or not crud.check_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    access_token = token.create_access_token(data={"sub": db_user["email"]})
    return JSONResponse(status_code=200, content={"access_token": access_token, "token_type": "bearer"})
