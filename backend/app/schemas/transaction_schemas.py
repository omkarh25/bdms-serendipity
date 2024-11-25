"""
Pydantic schemas for transaction data validation
"""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

class TransactionBase(BaseModel):
    """Base schema for transaction data"""
    date: str
    description: str
    amount: float
    payment_mode: str
    account_id: str
    department: str
    category: str
    zoho_match: str = Field(default="No")

class TransactionCreate(TransactionBase):
    """Schema for creating a new transaction"""
    pass

class TransactionUpdate(BaseModel):
    """Schema for updating a transaction"""
    date: Optional[str] = None
    description: Optional[str] = None
    amount: Optional[float] = None
    payment_mode: Optional[str] = None
    account_id: Optional[str] = None
    department: Optional[str] = None
    category: Optional[str] = None
    zoho_match: Optional[str] = None

class TransactionResponse(TransactionBase):
    """Schema for transaction response"""
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        """Pydantic configuration"""
        from_attributes = True

class TransactionQuery(BaseModel):
    """Schema for transaction query parameters"""
    department: Optional[str] = None
    category: Optional[str] = None
    payment_mode: Optional[str] = None
    min_amount: Optional[float] = None
    max_amount: Optional[float] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
