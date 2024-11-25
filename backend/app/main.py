"""
Main FastAPI application module.
Configures and runs the BDMS API server.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
import uvicorn
from .database.database import init_db
from .routers import file_router

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create FastAPI application
app = FastAPI(
    title="BDMS API",
    description="API for managing file records in the BDMS system",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(file_router.router)

@app.on_event("startup")
async def startup_event():
    """
    Initialize application on startup.
    Creates database tables and performs any necessary setup.
    """
    logger.info("Initializing application")
    init_db()
    logger.info("Application initialized successfully")

@app.get("/", tags=["root"])
async def root():
    """
    Root endpoint for API health check.
    
    Returns:
        dict: Basic API information
    """
    return {
        "message": "BDMS API is running",
        "status": "healthy",
        "version": "1.0.0"
    }

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
