from pwdlib import PasswordHash
import jwt
import hashlib
import secrets
from datetime import datetime, timezone, timedelta
from app.core.config import settings

password_hash = PasswordHash.recommended() #setup Argon2 with secure default settings


def hash_password(password: str) -> str:
    return password_hash.hash(password)

def verify_password(password: str, hashed_password: str) -> bool:
    return password_hash.verify(password, hashed_password)

def create_access_token(user_id: int) -> str:
    payload = {
        "sub": str(user_id),
        "type": "access",
        "exp": datetime.now(timezone.utc) + timedelta(minutes=settings.access_token_expire_minutes),
    }
    return jwt.encode(payload, settings.secret_key, algorithm=settings.jwt_algorithm)

# def create_refresh_token(user_id: int) -> str:
#     payload = {
#         "sub": str(user_id),
#         "type": "refresh",
#         "exp": datetime.now(timezone.utc) + timedelta(days=settings.refresh_token_expire_days),
#     }
#     return jwt.encode(payload, settings.secret_key, algorithm=settings.jwt_algorithm)

def generate_refresh_token() -> str:
    return secrets.token_urlsafe(32)

def hash_token(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()

def decode_token(token: str, expected_type: str) -> int | None:
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.jwt_algorithm])
        if payload.get("type") != expected_type:
            return None
        return int(payload["sub"])
    except (jwt.InvalidTokenError, KeyError, ValueError):
        return None