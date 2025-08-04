from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, validator
from typing import List, Optional

from ...services.code_service import code_service

router = APIRouter(prefix="/code", tags=["Code Generation"])

# Supported programming languages (matching frontend)
SUPPORTED_LANGUAGES = {
    'python', 'javascript', 'java', 'cpp', 'html', 'css', 'go', 'rust', 
    'php', 'ruby', 'swift', 'kotlin', 'typescript', 'csharp'
}

class CodeGenerationRequest(BaseModel):
    prompt: str
    language: str
    max_tokens: int = 512
    temperature: float = 0.3

    @validator('language')
    def validate_language(cls, v):
        if v not in SUPPORTED_LANGUAGES:
            raise ValueError(f'Unsupported language: {v}. Supported languages: {", ".join(sorted(SUPPORTED_LANGUAGES))}')
        return v

class ChatGenerationRequest(BaseModel):
    messages: List[dict]
    max_tokens: int = 500
    temperature: float = 0.7

class CodeTranslationRequest(BaseModel):
    source_code: str
    source_language: str
    target_language: str

    @validator('source_language', 'target_language')
    def validate_languages(cls, v):
        if v not in SUPPORTED_LANGUAGES:
            raise ValueError(f'Unsupported language: {v}. Supported languages: {", ".join(sorted(SUPPORTED_LANGUAGES))}')
        return v

@router.get("/languages")
async def get_supported_languages():
    """
    Get list of supported programming languages
    """
    return {
        "languages": [
            {"value": "python", "label": "Python", "icon": "🐍"},
            {"value": "javascript", "label": "JavaScript", "icon": "🟨"},
            {"value": "java", "label": "Java", "icon": "☕"},
            {"value": "cpp", "label": "C++", "icon": "⚡"},
            {"value": "html", "label": "HTML", "icon": "🌐"},
            {"value": "css", "label": "CSS", "icon": "🎨"},
            {"value": "go", "label": "Go", "icon": "🐹"},
            {"value": "rust", "label": "Rust", "icon": "🦀"},
            {"value": "php", "label": "PHP", "icon": "🐘"},
            {"value": "ruby", "label": "Ruby", "icon": "💎"},
            {"value": "swift", "label": "Swift", "icon": "🍎"},
            {"value": "kotlin", "label": "Kotlin", "icon": "🔷"},
            {"value": "typescript", "label": "TypeScript", "icon": "🔵"},
            {"value": "csharp", "label": "C#", "icon": "💜"}
        ]
    }

@router.post("/generate")
async def generate_code(request: CodeGenerationRequest):
    """
    Generate code using Ollama CodeLlama model
    """
    return code_service.generate_code(
        prompt=request.prompt,
        language=request.language,
        max_tokens=request.max_tokens,
        temperature=request.temperature
    )

@router.post("/translate")
async def translate_code(request: CodeTranslationRequest):
    """
    Translate code from one programming language to another using Ollama
    """
    return code_service.translate_code(
        source_code=request.source_code,
        source_language=request.source_language,
        target_language=request.target_language
    ) 