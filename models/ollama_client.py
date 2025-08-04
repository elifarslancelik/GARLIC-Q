#!/usr/bin/env python3
"""
Ollama Client for CodeLlama 7B Model Integration
Handles model loading, text generation, and code completion
"""

import requests
import json
import time
from typing import Dict, List, Optional, Any
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class OllamaClient:
    def __init__(self, base_url: str = "http://ollama:11434", model_name: str = "codellama:7b"):
        """
        Initialize Ollama client
        
        Args:
            base_url: Ollama server URL (default: localhost:11434)
            model_name: Model name to use (default: codellama:7b)
        """
        self.base_url = base_url.rstrip('/')
        self.model_name = model_name
        self.session = requests.Session()
        
    def check_server(self) -> bool:
        """
        Check if Ollama server is running
        
        Returns:
            bool: True if server is accessible, False otherwise
        """
        try:
            response = self.session.get(f"{self.base_url}/api/tags")
            return response.status_code == 200
        except requests.exceptions.RequestException as e:
            logger.error(f"Failed to connect to Ollama server: {e}")
            return False
    
    def list_models(self) -> List[Dict[str, Any]]:
        """
        List available models
        
        Returns:
            List of model information dictionaries
        """
        try:
            response = self.session.get(f"{self.base_url}/api/tags")
            if response.status_code == 200:
                return response.json().get("models", [])
            else:
                logger.error(f"Failed to list models: {response.status_code}")
                return []
        except requests.exceptions.RequestException as e:
            logger.error(f"Error listing models: {e}")
            return []
    
    def pull_model(self, model_name: Optional[str] = None) -> bool:
        """
        Pull model from Ollama registry
        
        Args:
            model_name: Model name to pull (defaults to self.model_name)
            
        Returns:
            bool: True if successful, False otherwise
        """
        model_to_pull = model_name or self.model_name
        
        try:
            logger.info(f"Pulling model: {model_to_pull}")
            response = self.session.post(
                f"{self.base_url}/api/pull",
                json={"name": model_to_pull}
            )
            
            if response.status_code == 200:
                logger.info(f"Successfully pulled model: {model_to_pull}")
                return True
            else:
                logger.error(f"Failed to pull model: {response.status_code}")
                return False
                
        except requests.exceptions.RequestException as e:
            logger.error(f"Error pulling model: {e}")
            return False
    
    def generate_text(self, prompt: str, system_prompt: Optional[str] = None, 
                     max_tokens: int = 2048, temperature: float = 0.7,
                     top_p: float = 0.9, stream: bool = False) -> Dict[str, Any]:
        """
        Generate text using the model
        
        Args:
            prompt: Input prompt
            system_prompt: System prompt (optional)
            max_tokens: Maximum tokens to generate
            temperature: Sampling temperature (0.0 to 1.0)
            top_p: Top-p sampling parameter
            stream: Whether to stream the response
            
        Returns:
            Dictionary containing generated text and metadata
        """
        payload = {
            "model": self.model_name,
            "prompt": prompt,
            "stream": stream,
            "options": {
                "num_predict": max_tokens,
                "temperature": temperature,
                "top_p": top_p
            }
        }
        
        if system_prompt:
            payload["system"] = system_prompt
        
        try:
            logger.info(f"Generating text with prompt length: {len(prompt)}")
            response = self.session.post(
                f"{self.base_url}/api/generate",
                json=payload,
                stream=stream
            )
            
            if response.status_code == 200:
                if stream:
                    return self._handle_stream_response(response)
                else:
                    result = response.json()
                    logger.info(f"Generated {len(result.get('response', ''))} characters")
                    return result
            else:
                logger.error(f"Failed to generate text: {response.status_code}")
                return {"error": f"HTTP {response.status_code}"}
                
        except requests.exceptions.RequestException as e:
            logger.error(f"Error generating text: {e}")
            return {"error": str(e)}
    
    def _handle_stream_response(self, response) -> Dict[str, Any]:
        """
        Handle streaming response from Ollama
        
        Args:
            response: Streaming response object
            
        Returns:
            Dictionary with combined response and metadata
        """
        full_response = ""
        response_data = {}
        
        for line in response.iter_lines():
            if line:
                try:
                    data = json.loads(line.decode('utf-8'))
                    if 'response' in data:
                        full_response += data['response']
                    if 'done' in data and data['done']:
                        response_data = data
                        break
                except json.JSONDecodeError:
                    continue
        
        response_data['response'] = full_response
        return response_data
    
    def code_completion(self, code_prompt: str, language: str = "python", 
                       max_tokens: int = 512, temperature: float = 0.3) -> Dict[str, Any]:
        """
        Generate code completion
        
        Args:
            code_prompt: Partial code or prompt
            language: Programming language
            max_tokens: Maximum tokens to generate
            temperature: Sampling temperature
            
        Returns:
            Dictionary with completed code
        """
        system_prompt = f"You are a helpful coding assistant. Generate code in {language} language. Only provide the code without explanations."
        
        return self.generate_text(
            prompt=code_prompt,
            system_prompt=system_prompt,
            max_tokens=max_tokens,
            temperature=temperature
        )
    
    def chat_completion(self, messages: List[Dict[str, str]], 
                       max_tokens: int = 2048, temperature: float = 0.7) -> Dict[str, Any]:
        """
        Generate chat completion
        
        Args:
            messages: List of message dictionaries with 'role' and 'content'
            max_tokens: Maximum tokens to generate
            temperature: Sampling temperature
            
        Returns:
            Dictionary with chat response
        """
        # Convert messages to prompt format
        prompt = ""
        for message in messages:
            role = message.get('role', 'user')
            content = message.get('content', '')
            if role == 'system':
                system_prompt = content
            elif role == 'user':
                prompt += f"User: {content}\n"
            elif role == 'assistant':
                prompt += f"Assistant: {content}\n"
        
        prompt += "Assistant: "
        
        return self.generate_text(
            prompt=prompt,
            system_prompt=system_prompt if 'system_prompt' in locals() else None,
            max_tokens=max_tokens,
            temperature=temperature
        )

def main():
    """Example usage of OllamaClient"""
    
    # Initialize client
    client = OllamaClient()
    
    # Check server status
    if not client.check_server():
        logger.error("Ollama server is not running. Please start Ollama first.")
        return
    
    logger.info("Ollama server is running")
    
    # List available models
    models = client.list_models()
    logger.info(f"Available models: {len(models)}")
    for model in models:
        logger.info(f"  - {model.get('name', 'Unknown')}")
    
    # Check if CodeLlama is available
    model_names = [model.get('name', '') for model in models]
    if 'codellama:7b' not in model_names:
        logger.info("Pulling CodeLlama 7B model...")
        if client.pull_model():
            logger.info("CodeLlama 7B model pulled successfully")
        else:
            logger.error("Failed to pull CodeLlama 7B model")
            return
    else:
        logger.info("CodeLlama 7B model is already available")
    
    # Test code completion
    logger.info("\nTesting code completion...")
    test_prompt = "def fibonacci(n):"
    result = client.code_completion(test_prompt, language="python")
    
    if 'error' not in result:
        logger.info("Code completion test successful")
        logger.info(f"Generated code:\n{result.get('response', '')}")
    else:
        logger.error(f"Code completion test failed: {result.get('error')}")

if __name__ == "__main__":
    main() 