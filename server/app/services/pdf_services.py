"""
PDF Processing Service - Handles extraction, chunking, and embedding generation

Flow:
1. extract_text_from_pdf: Reads PDF binary → Returns text + page mapping
2. chunk_text: Splits text → Returns chunks with metadata
3. generate_embeddings: Sends chunks to Gemini → Returns vector embeddings
4. process_pdf: Orchestrates all steps → Stores everything in DB
"""

from pypdf import PdfReader
from langchain_text_splitters import RecursiveCharacterTextSplitter
import google.generativeai as genai
from io import BytesIO
from typing import List, Dict, Tuple
from app.core.config import settings
from uuid import UUID

# Configure Gemini API
genai.configure(api_key=settings.GEMINI_API_KEY)

class PDFProcessingService:
    def __init__(self):
        # Initialize text splitter with specified parameters
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=100,
            length_function=len,
            separators=["\n\n", "\n", " ", ""]
        )
    
    def extract_text_from_pdf(self, file_bytes: bytes) -> Tuple[str, Dict[int, str]]:
        """
        Stage 2: EXTRACTION
        Reads PDF binary and extracts text with page information
        
        Args:
            file_bytes: Raw PDF file content
            
        Returns:
            Tuple of (full_text, page_content_map)
            - full_text: All text concatenated
            - page_content_map: Dict mapping page_number → page_text
        """
        pdf_file = BytesIO(file_bytes)
        reader = PdfReader(pdf_file)
        
        full_text = ""
        page_content_map = {}
        
        for page_num, page in enumerate(reader.pages, start=1):
            page_text = page.extract_text() or ""
            page_content_map[page_num] = page_text
            full_text += page_text + "\n\n"
        
        return full_text.strip(), page_content_map
    
    def chunk_text(self, text: str, page_content_map: Dict[int, str]) -> List[Dict]:
        """
        Stage 3: CHUNKING
        Splits text into overlapping chunks and tracks which page each chunk came from
        
        Args:
            text: Full document text
            page_content_map: Mapping of page numbers to page content
            
        Returns:
            List of chunk dictionaries with 'content' and 'page_number'
        """
        chunks = self.text_splitter.split_text(text)
        
        chunked_data = []
        for chunk in chunks:
            # Find which page this chunk primarily belongs to
            page_num = self._find_chunk_page(chunk, page_content_map)
            
            chunked_data.append({
                "content": chunk,
                "page_number": page_num
            })
        
        return chunked_data
    
    def _find_chunk_page(self, chunk: str, page_content_map: Dict[int, str]) -> int:
        """
        Helper: Determines which page a chunk belongs to
        Uses substring matching to find the best page
        """
        # Take first 100 chars of chunk as identifier
        chunk_identifier = chunk[:100]
        
        for page_num, page_text in page_content_map.items():
            if chunk_identifier in page_text:
                return page_num
        
        # Default to page 1 if not found
        return 1
    
    def generate_embeddings(self, texts: List[str]) -> List[List[float]]:
        """
        Stage 3 (continued): EMBEDDING GENERATION
        Generates vector embeddings using Gemini's text-embedding-004 model
        
        Args:
            texts: List of text chunks to embed
            
        Returns:
            List of embeddings (each embedding is a list of 768 floats)
        """
        embeddings = []
        
        for text in texts:
            # Use Gemini's embedding model
            result = genai.embed_content(
                model="models/text-embedding-004",
                content=text,
                task_type="retrieval_document"
            )
            embeddings.append(result['embedding'])
        
        return embeddings
    
    async def process_pdf(
        self, 
        file_bytes: bytes, 
        document_id: UUID,
        supabase_client
    ) -> Dict:
        """
        ORCHESTRATOR: Manages the entire PDF processing pipeline
        
        Flow:
        1. Extract text from PDF
        2. Update document record with raw_text
        3. Chunk the text
        4. Generate embeddings for each chunk
        5. Store chunks + embeddings in doc_chunks table
        
        Args:
            file_bytes: Raw PDF content
            document_id: UUID of the document record
            supabase_client: Supabase client for DB operations
            
        Returns:
            Dict with processing results
        """
        try:
            # Stage 2: Extract text
            raw_text, page_content_map = self.extract_text_from_pdf(file_bytes)
            
            # Update document with raw_text
            supabase_client.table("documents").update({
                "raw_text": raw_text,
                "status": "extracted"
            }).eq("id", str(document_id)).execute()
            
            # Stage 3: Chunk text
            chunks_data = self.chunk_text(raw_text, page_content_map)
            
            # Stage 3: Generate embeddings
            chunk_texts = [chunk["content"] for chunk in chunks_data]
            embeddings = self.generate_embeddings(chunk_texts)
            
            # Store chunks with embeddings in database
            for i, chunk_data in enumerate(chunks_data):
                supabase_client.table("doc_chunks").insert({
                    "document_id": str(document_id),
                    "content": chunk_data["content"],
                    "embedding": embeddings[i],  # Supabase will handle vector type
                    "page_number": chunk_data["page_number"]
                }).execute()
            
            # Update document status to completed
            supabase_client.table("documents").update({
                "status": "completed"
            }).eq("id", str(document_id)).execute()
            
            return {
                "success": True,
                "chunks_count": len(chunks_data),
                "status": "completed"
            }
            
        except Exception as e:
            # Update status to failed
            supabase_client.table("documents").update({
                "status": "failed"
            }).eq("id", str(document_id)).execute()
            
            raise Exception(f"PDF processing failed: {str(e)}")

# Create singleton instance
pdf_service = PDFProcessingService()