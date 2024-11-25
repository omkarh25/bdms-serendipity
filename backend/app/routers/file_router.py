"""
API routes for file management operations.
Implements RESTful endpoints using FastAPI.
"""

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
import logging

from ..database.database import get_db
from ..schemas.file_schemas import FileCreate, FileUpdate, FileResponse, FileQuery
from ..services.file_service import FileService

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create router instance
router = APIRouter(
    prefix="/api/files",
    tags=["files"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=FileResponse, status_code=201)
async def create_file(
    file_data: FileCreate,
    db: Session = Depends(get_db)
):
    """
    Create a new file record.
    
    Args:
        file_data (FileCreate): File data to create
        db (Session): Database session
        
    Returns:
        FileResponse: Created file record
        
    Raises:
        HTTPException: If creation fails
    """
    try:
        logger.info("Creating new file record")
        return await FileService.create_file(db, file_data)
    except Exception as e:
        logger.error(f"Error creating file record: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{file_id}", response_model=FileResponse)
async def get_file(
    file_id: int,
    db: Session = Depends(get_db)
):
    """
    Retrieve a specific file record by ID.
    
    Args:
        file_id (int): ID of the file to retrieve
        db (Session): Database session
        
    Returns:
        FileResponse: Retrieved file record
        
    Raises:
        HTTPException: If file not found
    """
    logger.info(f"Retrieving file record: {file_id}")
    file = await FileService.get_file(db, file_id)
    if file is None:
        raise HTTPException(status_code=404, detail="File not found")
    return file

@router.get("/", response_model=List[FileResponse])
async def get_files(
    skip: int = Query(0, description="Number of records to skip"),
    limit: int = Query(100, description="Maximum number of records to return"),
    query_params: Optional[FileQuery] = None,
    db: Session = Depends(get_db)
):
    """
    Retrieve multiple file records with optional filtering.
    
    Args:
        skip (int): Number of records to skip
        limit (int): Maximum number of records to return
        query_params (FileQuery): Optional query parameters for filtering
        db (Session): Database session
        
    Returns:
        List[FileResponse]: List of file records
    """
    logger.info("Retrieving file records")
    return await FileService.get_files(db, skip, limit, query_params)

@router.put("/{file_id}", response_model=FileResponse)
async def update_file(
    file_id: int,
    file_data: FileUpdate,
    db: Session = Depends(get_db)
):
    """
    Update an existing file record.
    
    Args:
        file_id (int): ID of the file to update
        file_data (FileUpdate): Updated file data
        db (Session): Database session
        
    Returns:
        FileResponse: Updated file record
        
    Raises:
        HTTPException: If file not found or update fails
    """
    try:
        logger.info(f"Updating file record: {file_id}")
        file = await FileService.update_file(db, file_id, file_data)
        if file is None:
            raise HTTPException(status_code=404, detail="File not found")
        return file
    except Exception as e:
        logger.error(f"Error updating file record: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{file_id}", status_code=204)
async def delete_file(
    file_id: int,
    db: Session = Depends(get_db)
):
    """
    Delete a file record.
    
    Args:
        file_id (int): ID of the file to delete
        db (Session): Database session
        
    Raises:
        HTTPException: If file not found or deletion fails
    """
    try:
        logger.info(f"Deleting file record: {file_id}")
        success = await FileService.delete_file(db, file_id)
        if not success:
            raise HTTPException(status_code=404, detail="File not found")
    except Exception as e:
        logger.error(f"Error deleting file record: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/search/{search_term}", response_model=List[FileResponse])
async def search_files(
    search_term: str,
    limit: int = Query(100, description="Maximum number of records to return"),
    db: Session = Depends(get_db)
):
    """
    Search for file records based on a search term.
    
    Args:
        search_term (str): Term to search for
        limit (int): Maximum number of records to return
        db (Session): Database session
        
    Returns:
        List[FileResponse]: List of matching file records
    """
    logger.info(f"Searching file records with term: {search_term}")
    return await FileService.search_files(db, search_term, limit)
