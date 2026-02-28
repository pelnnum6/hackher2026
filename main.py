#main page 
from pydantic import BaseModel

class QuizAnswer(BaseModel):
    category: str
    shared: bool

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"status": "ok"}
