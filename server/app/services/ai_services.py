from google import genai
from google.genai import types
from app.core.config import settings

class AIService:
    def __init__(self):
        self.client = genai.Client(
            api_key=settings.GEMINI_API_KEY
        )

    def get_embedding(self, text: str):
        """Turns text into a 768-dimension vector."""
        result = self.client.models.embed_content(
            model="gemini-embedding-001",
            contents=text,
            config=types.EmbedContentConfig(task_type="RETRIEVAL_QUERY")
        )
        return result.embeddings[0].values

    async def generate_grounded_section(self, header: str, context: str, user_instructions: str = ""):
        """Writes a specific section using ONLY the provided context."""

        prompt = f"""
        You are an expert academic writer. Your task is to write the section: "{header}" 
        based strictly on the provided research context.

        RESEARCH CONTEXT:
        {context}

        USER SPECIFIC INSTRUCTIONS:
        {user_instructions}

        RULES:
        1. Use ONLY the information provided in the Research Context.
        2. If the context doesn't contain enough information, write what is available and 
        mention that further details were not in the source document.
        3. Maintain a professional, objective tone.
        4. Do not mention "Based on the context" or "According to the text"; just write the content.
        """

        response = self.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        return response.text

    async def generate_outline(self, topic: str, pdf_summary: str):
        """Generates a structured JSON outline for the essay."""

        prompt = f"""
        You are an academic architect. Based on the following summary of a research document, 
        create a logical outline for an essay about: "{topic}".

        RESEARCH SUMMARY:
        {pdf_summary}

        Return the output strictly as a JSON object with this structure:
        {{
        "title": "Suggested Title",
        "outline": [
            {{ "header": "Introduction", "description": "What to cover here" }},
            {{ "header": "Point 1", "description": "What to cover here" }},
            ...
        ]
        }}

        The outline should have 5-7 logical sections.
        """

        response = self.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json"
            )
        )
        return response.text