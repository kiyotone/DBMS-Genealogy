from fastapi import APIRouter, HTTPException
from . import crud
from . import schemas

router = APIRouter()

@router.post("/")
def register_user(user: schemas.UserCreate):
    db_user = crud.get_user_by_email(user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(user)

@router.get("/{user_id}")
def get_user(user_id: int):
    db_user = crud.get_user_by_id(user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.get("/")
def get_all_users():
    return crud.get_all_users()

@router.put("/{user_id}")
def update_user(user_id: int, user: schemas.UserUpdate):
    db_user = crud.get_user_by_id(user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.update_user(user_id, user)

@router.delete("/{user_id}")
def delete_user(user_id: int):
    db_user = crud.get_user_by_id(user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.delete_user(user_id)

@router.post("/login")
def login_user(user: schemas.UserLogin):
    db_user = crud.get_user_by_email(user.email)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    if db_user.password != user.password:
        raise HTTPException(status_code=400, detail="Invalid password")
    return db_user
   