from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

engine = create_engine(settings.database_url) #Knows where the database is and keeps a pool of open connections. runs once, at startup
SessionLocal = sessionmaker(bind=engine) #A factory that creates new sessions. runs once, at startup

def get_db(): # Gives each request its own session and closes it afterwards
    db = SessionLocal()   # ① request starts: create a fresh session
    try:
        yield db          # ② pause here; hand the session to the route
    finally:
        db.close()        # ③ request finished: always clean up