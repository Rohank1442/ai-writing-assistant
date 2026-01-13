from fastapi import FastAPI
from app.api import auth, documents, essays

app = FastAPI(title="AI Essay Writer")

# Include Routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(documents.router, prefix="/documents", tags=["Documents"])
app.include_router(essays.router, prefix="/files", tags=["Files"])

@app.get("/")
async def health():
    return {"status": "healthy"}