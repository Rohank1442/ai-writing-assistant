"""
Documents API - Handles PDF upload endpoint

Stage 1: INGESTION
- Receives multipart/form-data from client
- Validates PDF file
- Creates document record in DB
- Triggers processing pipeline
"""

from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from app.core.security import get_current_user, supabase
from app.services.pdf_services import pdf_service
from uuid import uuid4

router = APIRouter()

@router.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...),
    current_user = Depends(get_current_user)
):
    """
    Stage 1: INGESTION
    
    Endpoint: POST /documents/upload
    Content-Type: multipart/form-data
    
    Request Body:
        - file: Binary PDF file
        - user_id: Extracted from JWT token
    
    Response:
        {
            "doc_id": "uuid",
            "status": "processing" | "completed" | "failed",
            "chunks_count": int
        }
    
    Flow:
        1. Validate file is PDF
        2. Create document record (status: "ingested")
        3. Read file bytes
        4. Call pdf_service.process_pdf (async)
        5. Return response
    """
    
    # Validate file type
    if not file.filename.endswith('.pdf'):
        raise HTTPException(
            status_code=400, 
            detail="Only PDF files are allowed"
        )
    
    try:
        # Generate unique document ID
        doc_id = uuid4()
        
        # Stage 1: Create document record in DB (status: "ingested")
        document_record = supabase.table("documents").insert({
            "id": str(doc_id),
            "user_id": current_user.id,
            "file_name": file.filename,
            "status": "ingested"
        }).execute()
        
        # Read file bytes into memory
        file_bytes = await file.read()
        
        # Stage 2-3: Process PDF (extraction, chunking, embedding)
        # This is synchronous but wrapped in async function
        processing_result = await pdf_service.process_pdf(
            file_bytes=file_bytes,
            document_id=doc_id,
            supabase_client=supabase
        )
        
        return {
            "doc_id": str(doc_id),
            "status": processing_result["status"],
            "chunks_count": processing_result["chunks_count"]
        }
        
    except Exception as e:
        # If document was created, update its status to failed
        if 'doc_id' in locals():
            supabase.table("documents").update({
                "status": "failed"
            }).eq("id", str(doc_id)).execute()
        
        raise HTTPException(
            status_code=500,
            detail=f"Failed to process PDF: {str(e)}"
        )


@router.get("/")
async def list_documents(current_user = Depends(get_current_user)):
    """
    Get all documents for the current user
    
    Endpoint: GET /documents/
    
    Response:
        {
            "documents": [
                {
                    "id": "uuid",
                    "file_name": "paper.pdf",
                    "status": "completed",
                    "created_at": "2026-01-08T12:00:00"
                },
                ...
            ]
        }
    """
    try:
        result = supabase.table("documents")\
            .select("id, file_name, status, created_at")\
            .eq("user_id", current_user.id)\
            .order("created_at", desc=True)\
            .execute()
        
        return {"documents": result.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{doc_id}")
async def get_document(
    doc_id: str,
    current_user = Depends(get_current_user)
):
    """
    Get a specific document with its chunks count
    
    Endpoint: GET /documents/{doc_id}
    
    Response:
        {
            "document": {
                "id": "uuid",
                "user_id": "uuid",
                "file_name": "paper.pdf",
                "status": "completed",
                "raw_text": "full text...",
                "created_at": "2026-01-08T12:00:00"
            },
            "chunks_count": 42
        }
    """
    try:
        # Get document
        doc_result = supabase.table("documents")\
            .select("*")\
            .eq("id", doc_id)\
            .eq("user_id", current_user.id)\
            .single()\
            .execute()
        
        # Get chunks count
        chunks_result = supabase.table("doc_chunks")\
            .select("id", count="exact")\
            .eq("document_id", doc_id)\
            .execute()
        
        return {
            "document": doc_result.data,
            "chunks_count": chunks_result.count
        }
    except Exception as e:
        raise HTTPException(status_code=404, detail="Document not found")