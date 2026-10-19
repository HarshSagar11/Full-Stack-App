from datetime import datetime, timezone, timedelta

from sqlalchemy import select, update
from sqlalchemy.orm import Session
from app.core.config import settings

from app.core.security import generate_refresh_token, hash_token
from app.models.refresh_token import RefreshToken
from app.models.user import User


def _create_refresh_token(db: Session, user_id: int) -> str:
    raw_token = generate_refresh_token()
    db.add(
        RefreshToken(
            user_id=user_id, 
            token_hash=hash_token(raw_token), 
            expires_at=datetime.now(timezone.utc)+timedelta(days=settings.refresh_token_expire_days)
        )
    )

    return raw_token

def issue_refresh_token(db: Session, user_id: int) -> str:
    raw_token = _create_refresh_token(db, user_id)
    db.commit()
    return raw_token

def rotate_refresh_token(db: Session, raw_token: str) -> tuple[User, str] | None:
    now = datetime.now(timezone.utc)
    record = db.scalar(
        select(RefreshToken)
        .where(RefreshToken.token_hash == hash_token(raw_token))
        .with_for_update()
    )

    if record is None:
        return None

    # Reuse detection
    if record.revoked_at is not None:
        db.execute(
            update(RefreshToken)
            .where(
                RefreshToken.user_id == record.user_id, 
                RefreshToken.revoked_at.is_(None))
            .values(revoked_at=now)
        )
        db.commit()
        return None

    if record.expires_at <= now:
        return None

    user = db.get(User, record.user_id)
    if user is None or not user.is_active:
        return None

    record.revoked_at = now
    new_token = _create_refresh_token(db, user.id)
    db.commit()
    return user, new_token

def revoke_refresh_token(db: Session, raw_token: str) -> None:
    record = db.scalar(
        select(RefreshToken)
        .where(RefreshToken.token_hash == hash_token(raw_token))
    )

    if record is not None and record.revoked_at is None:
        record.revoked_at = datetime.now(timezone.utc)
        db.commit()
