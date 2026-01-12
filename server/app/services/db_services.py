from app.core.security import supabase

async def get_grounding_context(query_text: str, doc_id: str):
    # 1. Get the vector for the header
    ai = AIService()
    query_vector = ai.get_embedding(query_text)

    # 2. Call the SQL function we created in Step 1
    response = supabase.rpc("match_doc_chunks", {
        "query_embedding": query_vector,
        "filter_document_id": doc_id,
        "match_threshold": 0.5, # Adjust this to be stricter or looser
        "match_count": 4        # Get top 4 chunks
    }).execute()

    # 3. Combine the chunks into one string of "Facts"
    context = "\n---\n".join([chunk['content'] for chunk in response.data])
    return context