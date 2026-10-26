from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.core.config import settings
from app.db.session import get_db

from app.api import auth

app = FastAPI()

# Allow the React app (a different origin) to call this API from the browser.
# allow_credentials lets the browser send/receive the refresh-token cookie;
# it requires explicit origins (a "*" wildcard is not allowed with credentials).
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)

app.include_router(auth.router)

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/health/db")
def db_health_check(db: Session = Depends(get_db)):
    db.execute(text("select 1"))
    return {"database": "ok"}
