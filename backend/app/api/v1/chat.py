from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

from ...services.code_service import code_service

router = APIRouter(prefix="/chat", tags=["Chat"])

class ChatGenerationRequest(BaseModel):
    messages: List[dict]
    max_tokens: int = 500
    temperature: float = 0.7

class ChatMessageRequest(BaseModel):
    message: str
    max_tokens: int = 500
    temperature: float = 0.7

@router.post("/generate")
async def generate_chat(request: ChatGenerationRequest):
    """
    Generate chat response using Ollama CodeLlama model
    """
    return code_service.generate_chat(
        messages=request.messages,
        max_tokens=request.max_tokens,
        temperature=request.temperature
    )

@router.post("/message")
async def send_message(request: ChatMessageRequest):
    """
    Send a single message and get response using Ollama CodeLlama model
    """
    return code_service.generate_chat(
        messages=[{"role": "user", "content": request.message}],
        max_tokens=request.max_tokens,
        temperature=request.temperature
    ) 