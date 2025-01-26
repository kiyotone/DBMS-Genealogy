from fastapi import APIRouter, HTTPException, Depends
from . import crud, schemas, token

router = APIRouter()

@router.post("/")
def register_user(user: schemas.UserCreate):
    db_user = crud.get_user_by_email(user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    print(f'User: {user}')
    # Create User as Dict
    user = user.dict()
    return crud.create_user(user)
    
@router.get("/{user_id}")
def get_user(user_id: int, db_user: schemas.UserOut = Depends(token.get_user_from_token)):  # Require token
    db_user = crud.get_user_by_id(user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.get("/")
def get_all_users(db_user: schemas.UserOut = Depends(token.get_user_from_token)):  # Require token
    if db_user["role"].lower() != "admin":
        raise HTTPException(status_code=403, detail="Permission denied")
    return crud.get_all_users()

@router.put("/{user_id}")
def update_user(user_id: int, user: schemas.UserUpdate, db_user: schemas.UserOut = Depends(token.get_user_from_token)):  # Require token
    db_user = crud.get_user_by_id(user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.update_user(user_id, user)

@router.delete("/{user_id}")
def delete_user(user_id: int, db_user: schemas.UserOut = Depends(token.get_user_from_token)):  # Require token
    db_user = crud.get_user_by_id(user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.delete_user(user_id)

@router.post("/login")
def login_user(user: schemas.UserLogin):
    # Accept email or username
    db_user = crud.get_user_by_email(user.email)
    if not db_user:
        db_user = crud.get_user_by_username(user.email)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Check password
    if not crud.check_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Incorrect password")
    
    # Create access token
    access_token = token.create_access_token(data={"sub": db_user["email"]})
    return {"access_token": access_token, "token_type": "bearer"}
