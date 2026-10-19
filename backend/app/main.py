from fastapi import FastAPI, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.db.session import get_db

from app.api import auth

app = FastAPI()

app.include_router(auth.router)

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/health/db")
def db_health_check(db: Session = Depends(get_db)):
    db.execute(text("select 1"))
    return {"database": "ok"}
