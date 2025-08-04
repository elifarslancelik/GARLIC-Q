import logging
import sys
import os
from fastapi import HTTPException, status

# Add parent directory to path for models import
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..'))

logger = logging.getLogger(__name__)

class CodeService:
    def __init__(self):
        self.ollama_client = None
        self._initialize_ollama_client()

    def _initialize_ollama_client(self):
        """Initialize Ollama client"""
        try:
            from models.ollama_client import OllamaClient
            self.ollama_client = OllamaClient()
        except Exception as e:
            logger.error(f"Failed to initialize Ollama client: {e}")
            self.ollama_client = None

    def _check_ollama_server(self):
        """Check if Ollama server is running"""
        if self.ollama_client is None:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Ollama client not initialized"
            )
        
        if not self.ollama_client.check_server():
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Ollama server is not running"
            )

    def generate_code(self, prompt: str, language: str = "python", max_tokens: int = 512, temperature: float = 0.3):
        """
        Generate code using Ollama CodeLlama model
        """
        try:
            self._check_ollama_server()
            
            if not prompt.strip():
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Prompt is required"
                )
            
            # Generate code completion
            result = self.ollama_client.code_completion(
                code_prompt=prompt,
                language=language,
                max_tokens=max_tokens,
                temperature=temperature
            )
            
            if "error" in result:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail=f"Code generation failed: {result['error']}"
                )
            
            logger.info(f"Code generated successfully for language: {language}")
            return {
                "response": result.get("response", ""),
                "language": language,
                "tokens_generated": len(result.get("response", "").split()),
                "model": "codellama:7b"
            }
            
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Error in code generation: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"An error occurred during code generation: {str(e)}"
            )

    def generate_chat(self, messages: list, max_tokens: int = 500, temperature: float = 0.7):
        """
        Generate chat response using Ollama CodeLlama model
        """
        try:
            self._check_ollama_server()
            
            if not messages:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Messages are required"
                )
            
            # Generate chat response
            result = self.ollama_client.chat_completion(
                messages=messages,
                max_tokens=max_tokens,
                temperature=temperature
            )
            
            if "error" in result:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail=f"Chat generation failed: {result['error']}"
                )
            
            logger.info("Chat response generated successfully")
            return {
                "response": result.get("response", ""),
                "tokens_generated": len(result.get("response", "").split()),
                "model": "codellama:7b"
            }
            
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Error in chat generation: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"An error occurred during chat generation: {str(e)}"
            )

    def translate_code(self, source_code: str, source_language: str, target_language: str):
        """
        Translate code from one programming language to another using Ollama
        """
        try:
            self._check_ollama_server()
            
            if not source_code.strip():
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Source code is required"
                )
            
            if not source_language or not target_language:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Source and target languages are required"
                )
            
            # Create translation prompt
            prompt = f"""Translate the following {source_language} code to {target_language}:

{source_code}

Please provide only the translated code without any explanations or comments."""

            # Generate translated code
            result = self.ollama_client.code_completion(
                code_prompt=prompt,
                language=target_language,
                max_tokens=1024,
                temperature=0.2
            )
            
            if "error" in result:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail=f"Code translation failed: {result['error']}"
                )
            
            logger.info(f"Code translated from {source_language} to {target_language}")
            return {
                "translated_code": result.get("response", ""),
                "source_language": source_language,
                "target_language": target_language,
                "model": "codellama:7b"
            }
            
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Error in code translation: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"An error occurred during code translation: {str(e)}"
            )

# Global instance
code_service = CodeService() 