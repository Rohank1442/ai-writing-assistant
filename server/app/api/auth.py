from fastapi import APIRouter, HTTPException
from app.schemas.user import UserAuth, UserResponse
from app.core.security import supabase

router = APIRouter()

@router.post("/signup", response_model=UserResponse)
async def signup(user_data: UserAuth):
    try:
        res = supabase.auth.sign_up({"email": user_data.email, "password": user_data.password})
        return {"id": res.user.id, "email": res.user.email}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login")
async def login(user_data: UserAuth):
    try:
        res = supabase.auth.sign_in_with_password({"email": user_data.email, "password": user_data.password})
        return {
            "id": res.user.id,
            "email": res.user.email,
            "access_token": res.session.access_token
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid login credentials")