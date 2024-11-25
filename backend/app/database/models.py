"""
Database models for the BDMS application.
Uses SQLAlchemy ORM for database interactions.
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime
from .database import Base

class FileRecord(Base):
    """Model representing a file record in the ByteDB table."""
    
    __tablename__ = "ByteDB"

    file_id = Column(Integer, primary_key=True, index=True)
    file_name = Column(String, nullable=False)
    file_type = Column(String, nullable=False)
    file_size = Column(Integer, nullable=False)
    file_path = Column(String, nullable=False)
    department = Column(String)
    owner = Column(String)
    access_level = Column(String, default="private")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Transaction(Base):
    """Model representing a transaction record."""
    
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(String, nullable=False)
    description = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    payment_mode = Column(String, nullable=False)
    account_id = Column(String, nullable=False)
    department = Column(String, nullable=False)
    category = Column(String, nullable=False)
    zoho_match = Column(String, default="No")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
