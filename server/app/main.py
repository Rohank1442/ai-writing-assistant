from fastapi import FastAPI
from app.api import auth, documents, essays
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Essay Writer")

origins = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://192.168.1.14:8080",
    "paperflow-7tn3pw27z-rohans-projects-c605bf65.vercel.app"
    "https://paperflow-ashen.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # Allows your frontend
    allow_credentials=True,
    allow_methods=["*"],               # Allows POST, GET, OPTIONS, etc.
    allow_headers=["*"],               # Allows Content-Type, Authorization, etc.
)

# Include Routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(documents.router, prefix="/documents", tags=["Documents"])
app.include_router(essays.router, prefix="/files", tags=["Files"])

@app.get("/")
async def health():
    return {"status": "healthy"}