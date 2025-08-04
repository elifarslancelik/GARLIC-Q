const API_BASE_URL = 'http://localhost:8000/api/v1';

export const api = {
  // Code generation
  generateCode: async (prompt, language, maxTokens = 512, temperature = 0.3) => {
    const response = await fetch(`${API_BASE_URL}/code/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        language,
        max_tokens: maxTokens,
        temperature
      }),
    });
    return response.json();
  },

  // Code translation
  translateCode: async (sourceCode, sourceLanguage, targetLanguage) => {
    const response = await fetch(`${API_BASE_URL}/code/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source_code: sourceCode,
        source_language: sourceLanguage,
        target_language: targetLanguage
      }),
    });
    return response.json();
  },

  // Chat generation
  generateChat: async (message) => {
    const response = await fetch(`${API_BASE_URL}/chat/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message
      }),
    });
    return response.json();
  },

  // User authentication
  login: async (imageBlob) => {
    const formData = new FormData();
    formData.append('file', imageBlob, 'face.jpg');

    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      body: formData,
    });
    return response.json();
  },

  signup: async (imageBlob) => {
    const formData = new FormData();
    formData.append('file', imageBlob, 'face.jpg');

    const response = await fetch(`${API_BASE_URL}/users/signup`, {
      method: 'POST',
      body: formData,
    });
    return response.json();
  }
}; 