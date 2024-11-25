"""
Service layer for handling file record business logic.
Implements CRUD operations and business rules for file management.
"""

from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
import logging
from ..database.models import FileRecord
from ..schemas.file_schemas import FileCreate, FileUpdate, FileQuery

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class FileService:
    """
    Service class for handling file record operations.
    Implements business logic and database interactions for file management.
    """

    @staticmethod
    async def create_file(db: Session, file_data: FileCreate) -> FileRecord:
        """
        Create a new file record in the database.
        
        Args:
            db (Session): Database session
            file_data (FileCreate): File data to create
            
        Returns:
            FileRecord: Created file record
            
        Raises:
            Exception: If creation fails
        """
        try:
            logger.info(f"Creating new file record: {file_data.file_name}")
            db_file = FileRecord(**file_data.model_dump())
            db.add(db_file)
            await db.commit()
            await db.refresh(db_file)
            logger.info(f"File record created successfully: {db_file.file_id}")
            return db_file
        except Exception as e:
            logger.error(f"Error creating file record: {str(e)}")
            raise

    @staticmethod
    async def get_file(db: Session, file_id: int) -> Optional[FileRecord]:
        """
        Retrieve a file record by ID.
        
        Args:
            db (Session): Database session
            file_id (int): ID of the file to retrieve
            
        Returns:
            Optional[FileRecord]: Found file record or None
        """
        logger.info(f"Retrieving file record: {file_id}")
        return db.query(FileRecord).filter(FileRecord.file_id == file_id).first()

    @staticmethod
    async def get_files(
        db: Session, 
        skip: int = 0, 
        limit: int = 100,
        query_params: Optional[FileQuery] = None
    ) -> List[FileRecord]:
        """
        Retrieve multiple file records with optional filtering.
        
        Args:
            db (Session): Database session
            skip (int): Number of records to skip
            limit (int): Maximum number of records to return
            query_params (FileQuery): Optional query parameters for filtering
            
        Returns:
            List[FileRecord]: List of file records
        """
        logger.info("Retrieving file records with filters")
        query = db.query(FileRecord)

        if query_params:
            filters = []
            if query_params.department:
                filters.append(FileRecord.department == query_params.department)
            if query_params.owner:
                filters.append(FileRecord.owner == query_params.owner)
            if query_params.file_type:
                filters.append(FileRecord.file_type == query_params.file_type)
            if query_params.access_level:
                filters.append(FileRecord.access_level == query_params.access_level)
            if query_params.min_size is not None:
                filters.append(FileRecord.file_size >= query_params.min_size)
            if query_params.max_size is not None:
                filters.append(FileRecord.file_size <= query_params.max_size)

            if filters:
                query = query.filter(and_(*filters))

        return query.offset(skip).limit(limit).all()

    @staticmethod
    async def update_file(
        db: Session, 
        file_id: int, 
        file_data: FileUpdate
    ) -> Optional[FileRecord]:
        """
        Update an existing file record.
        
        Args:
            db (Session): Database session
            file_id (int): ID of the file to update
            file_data (FileUpdate): Updated file data
            
        Returns:
            Optional[FileRecord]: Updated file record or None
            
        Raises:
            Exception: If update fails
        """
        try:
            logger.info(f"Updating file record: {file_id}")
            db_file = db.query(FileRecord).filter(FileRecord.file_id == file_id).first()
            if db_file:
                update_data = file_data.model_dump(exclude_unset=True)
                for key, value in update_data.items():
                    setattr(db_file, key, value)
                await db.commit()
                await db.refresh(db_file)
                logger.info(f"File record updated successfully: {file_id}")
                return db_file
            return None
        except Exception as e:
            logger.error(f"Error updating file record: {str(e)}")
            raise

    @staticmethod
    async def delete_file(db: Session, file_id: int) -> bool:
        """
        Delete a file record.
        
        Args:
            db (Session): Database session
            file_id (int): ID of the file to delete
            
        Returns:
            bool: True if deleted successfully, False otherwise
            
        Raises:
            Exception: If deletion fails
        """
        try:
            logger.info(f"Deleting file record: {file_id}")
            db_file = db.query(FileRecord).filter(FileRecord.file_id == file_id).first()
            if db_file:
                await db.delete(db_file)
                await db.commit()
                logger.info(f"File record deleted successfully: {file_id}")
                return True
            return False
        except Exception as e:
            logger.error(f"Error deleting file record: {str(e)}")
            raise

    @staticmethod
    async def search_files(
        db: Session, 
        search_term: str, 
        limit: int = 100
    ) -> List[FileRecord]:
        """
        Search for file records based on a search term.
        
        Args:
            db (Session): Database session
            search_term (str): Term to search for
            limit (int): Maximum number of records to return
            
        Returns:
            List[FileRecord]: List of matching file records
        """
        logger.info(f"Searching file records with term: {search_term}")
        return db.query(FileRecord).filter(
            or_(
                FileRecord.file_name.ilike(f"%{search_term}%"),
                FileRecord.department.ilike(f"%{search_term}%"),
                FileRecord.owner.ilike(f"%{search_term}%")
            )
        ).limit(limit).all()
