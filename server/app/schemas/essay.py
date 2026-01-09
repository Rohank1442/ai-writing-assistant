from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime

class EssayBase(BaseModel):
    doc_id: UUID

class EssayCreate(EssayBase):
    outline: Optional[dict] = None
    content: Optional[dict] = None

class EssayUpdate(BaseModel):
    outline: Optional[dict] = None
    content: Optional[dict] = None

class EssayResponse(EssayBase):
    id: UUID
    user_id: UUID
    outline: dict
    content: dict
    created_at: datetime

    class Config:
        from_attributes = True