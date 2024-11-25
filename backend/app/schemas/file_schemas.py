"""
Pydantic schemas for request/response validation and documentation.
Implements data validation and serialization for the API.
"""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

class FileBase(BaseModel):
    """
    Base schema for file records with common attributes.
    """
    file_name: str = Field(..., description="Name of the file")
    file_type: str = Field(..., description="Type/extension of the file")
    file_size: int = Field(..., description="Size of the file in bytes")
    file_path: str = Field(..., description="Path to the file in the system")
    department: Optional[str] = Field(None, description="Department owning the file")
    owner: Optional[str] = Field(None, description="Owner of the file")
    access_level: str = Field(default="private", description="Access level of the file")

class FileCreate(FileBase):
    """
    Schema for creating a new file record.
    Inherits from FileBase and doesn't include auto-generated fields.
    """
    pass

class FileUpdate(BaseModel):
    """
    Schema for updating an existing file record.
    All fields are optional to allow partial updates.
    """
    file_name: Optional[str] = None
    file_type: Optional[str] = None
    file_size: Optional[int] = None
    file_path: Optional[str] = None
    department: Optional[str] = None
    owner: Optional[str] = None
    access_level: Optional[str] = None

class FileResponse(FileBase):
    """
    Schema for file record responses.
    Includes all fields including auto-generated ones.
    """
    file_id: int = Field(..., description="Unique identifier for the file record")
    created_at: datetime = Field(..., description="Timestamp when the record was created")
    updated_at: datetime = Field(..., description="Timestamp when the record was last updated")

    class Config:
        """
        Pydantic configuration for the schema.
        Enables ORM mode for SQLAlchemy model compatibility.
        """
        orm_mode = True
        from_attributes = True

class FileQuery(BaseModel):
    """
    Schema for file search/filter parameters.
    Used for querying file records with various filters.
    """
    department: Optional[str] = None
    owner: Optional[str] = None
    file_type: Optional[str] = None
    access_level: Optional[str] = None
    min_size: Optional[int] = Field(None, description="Minimum file size in bytes")
    max_size: Optional[int] = Field(None, description="Maximum file size in bytes")
