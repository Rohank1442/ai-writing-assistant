from app.core.security import supabase
from app.services.ai_services import AIService

async def get_grounding_context(query_text: str, doc_id: str, match_count: int = 4):
    """
    Step-by-step Librarian Logic:
    1. Translate text to math (Embedding)
    2. Search the database neighbors (RPC call)
    3. Package the facts into a string (Synthesis)
    """
    
    # Step 1: Initialize AI Service and get the 'Math Fingerprint' (Vector)
    ai = AIService()
    query_vector = ai.get_embedding(query_text)

    # Step 2: Call the SQL function (RPC) we created in Supabase
    # This performs the mathematical similarity search
    response = supabase.rpc("match_doc_chunks", {
        "query_embedding": query_vector,
        "filter_document_id": str(doc_id),
        "match_threshold": 0.4, # 40% similarity or higher
        "match_count": match_count
    }).execute()

    # Step 3: Check if we found anything
    if not response.data:
        return ""

    # Step 4: Synthesis - Combine the chunks into a single research block
    # We add metadata like [Source: Page X] so the AI knows where it came from
    context_parts = []
    for chunk in response.data:
        context_parts.append(f"[Source: Page {chunk['page_number']}]\n{chunk['content']}")

    # Join with a clear separator
    return "\n\n---\n\n".join(context_parts)