// Get API base URL from environment or use default
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

// Helper function to handle API errors
const handleApiError = (error) => {
  console.error('API Error:', error);
  return {
    error: true,
    message: 'Backend service is not available. Please try again later.',
    details: error.message
  };
};

export const api = {
  // Get supported languages
  getLanguages: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/code/languages`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Code generation
  generateCode: async (prompt, language, maxTokens = 512, temperature = 0.3) => {
    try {
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
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Code translation
  translateCode: async (sourceCode, sourceLanguage, targetLanguage) => {
    try {
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
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Chat generation
  generateChat: async (message) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message
        }),
      });
      return response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },

  // User authentication
  login: async (imageBlob) => {
    try {
      const formData = new FormData();
      formData.append('file', imageBlob, 'face.jpg');

      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        body: formData,
      });
      return response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },

  signup: async (imageBlob) => {
    try {
      const formData = new FormData();
      formData.append('file', imageBlob, 'face.jpg');

      const response = await fetch(`${API_BASE_URL}/users/signup`, {
        method: 'POST',
        body: formData,
      });
      return response.json();
    } catch (error) {
      return handleApiError(error);
    }
  }
}; 