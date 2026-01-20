from fastapi import FastAPI
from app.api import auth, documents, essays
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Essay Writer")

origins = [
    "http://localhost:8080",
    "https://paperflow-ai.vercel.app",
    "https://paperflow-ashen.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(documents.router, prefix="/documents", tags=["Documents"])
app.include_router(essays.router, prefix="/files", tags=["Files"])

@app.get("/")
async def health():
    return {"status": "healthy"}