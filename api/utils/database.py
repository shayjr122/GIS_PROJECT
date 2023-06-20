from databases import Database
from pydantic import BaseModel
from passlib.context import CryptContext

# Database Settings
DATABASE_URL = "sqlite:///./users.db"

# Password Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# Database Connection
database = Database(DATABASE_URL)


class User(BaseModel):
    email: str
    password: str

class UserCred(BaseModel):
    email: str
    fullName:str
    password: str


class UserInDB(BaseModel):
    id: int
    email: str
    fullName: str
    hashed_password: str
    role:str

# Create users table
async def create_user_table_if_not_exist():
    query = """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            fullName TEXT NOT NULL,
            hashed_password TEXT NOT NULL,
            role TEXT NOT NULL
        );
    """
    await database.execute(query=query)


async def create_default_admin_user():
    user = UserCred(email="admin@admin.com",fullName='Admin',password="Aa123456")
    await register_user(user=user,role="ADMIN")


# Get user from the database
async def get_user_in_db(email: str):
    query = "SELECT * FROM users WHERE email = :email"
    values = {"email": email}
    result = await database.fetch_one(query=query, values=values)
    if result:
        return UserInDB(id=result["id"], email=result["email"],fullName=result["fullName"] ,hashed_password=result["hashed_password"],role=result["role"])


# Register User
async def register_user(user: UserCred,role:str):
    user_db = await get_user_in_db(user.email)
    if user_db:
        return {"message": "User alrady exist"}    
    hashed_password = pwd_context.hash(user.password)
    query = "INSERT INTO users (email, fullName, hashed_password, role) VALUES (:email, :fullName, :hashed_password, :role)"
    values = {"email": user.email, "fullName":user.fullName,"hashed_password": hashed_password, "role":role}
    await database.execute(query=query, values=values)
    return {"message": "User created successfully"}
