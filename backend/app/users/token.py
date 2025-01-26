import jwt
from datetime import datetime, timedelta
from typing import Union
from dotenv import load_dotenv
import os
from fastapi import HTTPException, Request, Depends
from . import crud


load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 15))  # Default to 15 if not found
ALGORITHM = "HS256"

def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    """Generates an access token."""
    to_encode = data.copy()
    utc_now = datetime.utcnow()  # Use UTC for token consistency
    
    # Set expiration
    expire = utc_now + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    
    # Encode JWT
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str):
    """Decodes and verifies the JWT token."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print(f"Decoded token: {payload}")
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

def get_user_from_token(request: Request):
    """Extract and decode the JWT token from the request's Authorization header."""
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        raise HTTPException(status_code=403, detail="Authorization header is missing")
    
    try:
        # Extract token from Authorization header (Bearer <token>)
        token = auth_header.split(" ")[1]
    except IndexError:
        raise HTTPException(status_code=403, detail="Invalid Authorization header")
    
    # Decode the token and retrieve the user data (email)
    try:
        decoded_token = decode_access_token(token)
        email = decoded_token.get("sub")
        
        if not email:
            raise HTTPException(status_code=403, detail="Token does not contain user information")
        
        # Retrieve the user from the database using the email extracted from the token
        db_user = crud.get_user_by_email(email)
        if not db_user:
            raise HTTPException(status_code=403, detail="User not found")
        print(f"User from token: {db_user}")
        return db_user
    
    except Exception as e:
        raise HTTPException(status_code=403, detail=str(e))
