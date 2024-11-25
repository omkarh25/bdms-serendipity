"""
Database configuration and connection utilities.
Implements database session management and connection pooling.
"""

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base
from contextlib import contextmanager
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Get the current directory
current_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
database_path = os.path.join(current_dir, '..', 'database', 'files.db')

# Database URL configuration
DATABASE_URL = f"sqlite:///{database_path}"

# Create SQLAlchemy engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},  # Needed for SQLite
    echo=True  # Log all SQL queries
)

# SessionLocal class for database sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

@contextmanager
def get_db_session() -> Session:
    """
    Context manager for database sessions.
    Ensures proper handling of database connections and error handling.
    
    Yields:
        Session: SQLAlchemy database session
    
    Raises:
        Exception: Any database-related exceptions that occur during session use
    """
    session = SessionLocal()
    try:
        logger.info("Creating new database session")
        yield session
        session.commit()
    except Exception as e:
        logger.error(f"Database session error: {str(e)}")
        session.rollback()
        raise
    finally:
        logger.info("Closing database session")
        session.close()

def get_db():
    """
    Dependency injection function for FastAPI.
    Creates a new database session for each request.
    
    Yields:
        Session: SQLAlchemy database session
    """
    with get_db_session() as session:
        yield session

def init_db():
    """
    Initialize the database by creating all tables.
    Should be called when application starts.
    """
    try:
        logger.info("Initializing database tables")
        # Ensure the database directory exists
        os.makedirs(os.path.dirname(database_path), exist_ok=True)
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully")
    except Exception as e:
        logger.error(f"Failed to initialize database: {str(e)}")
        raise
