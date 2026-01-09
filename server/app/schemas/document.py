from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from uuid import UUID

class DocumentBase(BaseModel):
    file_name: str

class DocumentCreate(DocumentBase):
    raw_text: Optional[str] = None

class DocumentResponse(DocumentBase):
    id: UUID
    user_id: UUID
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class DocChunkBase(BaseModel):
    content: str
    page_number: Optional[int] = None

class DocChunkCreate(DocChunkBase):
    document_id: UUID
    embedding: List[float] # This will hold the 768 numbers from Gemini

class DocChunkResponse(DocChunkBase):
    id: UUID
    document_id: UUID

    class Config:
        from_attributes = True