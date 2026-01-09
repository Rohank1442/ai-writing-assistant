from fastapi import FastAPI
from app.api import auth

app = FastAPI(title="AI Essay Writer")

# Include Routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(auth.router, prefix="/documents", tags=["Documents"])

@app.get("/")
async def health():
    return {"status": "healthy"}