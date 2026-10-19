from fastapi import APIRouter, Cookie, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.api.deps import get_current_user
from app.schemas.user import UserCreate, UserRead, UserLogin
from app.core.config import settings
from app.db.session import get_db
from app.models.user import User
from app.core.security import hash_password, verify_password, create_access_token
from app.schemas.token import Token
from app.services.refresh_tokens import issue_refresh_token, revoke_refresh_token, rotate_refresh_token


router = APIRouter(prefix="/auth", tags=["auth"])

def set_refresh_cookie(response: Response, token: str) -> None:
    response.set_cookie(
        key="refresh_token",
        value=token,
        httponly=True,
        secure=settings.cookie_secure,
        samesite="lax",
        path="/auth",
        max_age=settings.refresh_token_expire_days * 24 * 60 * 60,
    )

@router.post("/signup", response_model=UserRead, status_code=201) # this is what api endpoint will return when user is created successfully
def signup(user_in: UserCreate, db: Session = Depends(get_db)): #this is what api end point will accept as input from user
    #check if user already exists
    existing = db.scalar(select(User).where(User.email == user_in.email))
    if existing:
        raise HTTPException(status_code=409, detail="Email already registered")

    user = User(email=user_in.email, hashed_password=hash_password(user_in.password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@router.post("/login", response_model=Token)
def login(user_in: UserLogin, response: Response, db: Session = Depends(get_db)):
    user = db.scalar(select(User).where(User.email == user_in.email))
    if not user or not user.is_active or not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    access_token = create_access_token(user.id)
    refresh_token = issue_refresh_token(db, user.id)
    set_refresh_cookie(response, refresh_token)

    return Token(access_token=access_token)

@router.post("/refresh", response_model=Token)
def refresh(response: Response, refresh_token: str | None = Cookie(default=None), db: Session = Depends(get_db)):
    refresh_token_error = HTTPException(
        status_code=401,
        detail="Invalid refresh token",
    )

    if not refresh_token:
        raise refresh_token_error

    result = rotate_refresh_token(db, refresh_token)

    if result is None:
        raise refresh_token_error

    user, new_refresh_token = result

    set_refresh_cookie(response, new_refresh_token)

    access_token = create_access_token(user.id)
    return Token(access_token=access_token)

    # user_id = decode_token(refresh_token, "refresh")
    # if user_id is None:
    #     raise refresh_token_error

    # user = db.get(User, user_id)
    # if not user or not user.is_active:
    #     raise refresh_token_error

    # access_token = create_access_token(user.id)
    # return Token(access_token=access_token)

@router.get("/me", response_model=UserRead)
def me(current_user: User = Depends(get_current_user)):
    return current_user

@router.post("/logout", status_code=204)
def logout(response: Response, refresh_token: str | None = Cookie(default=None), db: Session = Depends(get_db)):

    if refresh_token is not None:
        revoke_refresh_token(db,refresh_token)
        response.delete_cookie(
            key="refresh_token", 
            path="/auth", 
            httponly=True, 
            secure=settings.cookie_secure, 
            samesite="lax",
        )

