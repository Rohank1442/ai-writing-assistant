@router.post("/{essay_id}/generate-section")
async def generate_section(
    essay_id: str, 
    header: str, 
    document_id: str,
    current_user = Depends(get_current_user)
):
    # 1. THE RETRIEVAL (The Librarian)
    # Find the most relevant chunks for this specific header
    context = await get_grounding_context(query_text=header, doc_id=document_id)
    
    if not context:
        raise HTTPException(status_code=404, detail="No relevant info found in PDF")

    # 2. THE GENERATION (The Writer)
    # Pass those chunks to Gemini to write the prose
    ai = AIService()
    section_text = await ai.generate_grounded_section(header=header, context=context)

    # 3. THE UPDATE
    # Save this text into your 'essays' table so the user sees it on the frontend
    # (Assuming you have an 'content' JSON column in your essays table)
    return {
        "header": header,
        "content": section_text,
        "status": "success"
    }

@router.post("/generate-outline")
async def create_outline(
    document_id: str, 
    topic: str,
    current_user = Depends(get_current_user)
):
    # 1. Fetch the 'Skimmed' content (First and last chunks)
    # This gives the AI the "Big Picture" without loading 500 chunks
    result = supabase.table("doc_chunks")\
        .select("content")\
        .eq("document_id", document_id)\
        .order("page_number")\
        .limit(5)\
        .execute()
    
    summary_text = "\n".join([c['content'] for c in result.data])

    # 2. Call Gemini to build the JSON blueprint
    ai = AIService()
    outline_json = await ai.generate_outline(topic, summary_text)

    # 3. Create the Essay record in the DB
    # We save the outline so the user can edit it on the frontend
    essay_record = supabase.table("essays").insert({
        "user_id": current_user.id,
        "document_id": document_id,
        "title": topic,
        "outline": outline_json, # Store the structure
        "status": "drafting"
    }).execute()

    return essay_record.data