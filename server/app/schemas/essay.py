from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime

class EssayBase(BaseModel):
    document_id: UUID
    title: str

class EssayCreate(EssayBase):
    pass

class EssayUpdate(BaseModel):
    outline: Optional[dict] = None
    full_content: Optional[str] = None
    status: Optional[str] = None

class EssayResponse(EssayBase):
    id: UUID
    user_id: UUID
    outline: dict
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class GenerateOutlineRequest(BaseModel):
    document_id: str
    topic: str

class GenerateSectionRequest(BaseModel):
    header: str
    document_id: str