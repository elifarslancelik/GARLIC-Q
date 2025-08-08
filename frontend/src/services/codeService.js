import { api } from '../utils/api';

export const codeService = {
  getLanguages: async () => {
    try {
      const response = await api.getLanguages();
      if (response.error) {
        throw new Error(response.error);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  generateCode: async (prompt, language, maxTokens = 512, temperature = 0.3) => {
    try {
      const response = await api.generateCode(prompt, language, maxTokens, temperature);
      if (response.error) {
        throw new Error(response.error);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  translateCode: async (sourceCode, sourceLanguage, targetLanguage) => {
    try {
      const response = await api.translateCode(sourceCode, sourceLanguage, targetLanguage);
      if (response.error) {
        throw new Error(response.error);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  generateChat: async (message) => {
    try {
      const response = await api.generateChat(message);
      if (response.error) {
        throw new Error(response.error);
      }
      return response;
    } catch (error) {
      throw error;
    }
  }
}; 