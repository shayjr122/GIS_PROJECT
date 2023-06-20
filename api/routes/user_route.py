from fastapi import APIRouter, Depends, HTTPException, status, Header
from utils.database import UserCred
from utils.user_managment import login,User,refresh_access_token,verify_access_token_user,verify_access_token_admin,signup
from utils.database import User

router = APIRouter()


@router.post("/user/login")
async def login_for_access_token(user: User):
    return await login(user=user)

@router.post("/user/refresh")
async def refresh(token: str):
    return await refresh_access_token(token=token)

@router.post("/user/signup")
async def signup_user(user: UserCred):
    return await signup(user=user)



@router.get("/user/restricted")
async def restricted_route(token: str = Depends(verify_access_token_user)):
    # API logic goes here
    return {"message": "Access granted","token":token}


@router.get("/admin/restricted")
async def restricted_route(token: str = Depends(verify_access_token_admin)):
    # API logic goes here
    return {"message": "Access granted","token":token}