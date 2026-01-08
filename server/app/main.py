from fastapi import FastAPI
from app.api import auth

app = FastAPI(title="AI Essay Writer")

# Include Routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])

@app.get("/")
async def health():
    return {"status": "healthy"}