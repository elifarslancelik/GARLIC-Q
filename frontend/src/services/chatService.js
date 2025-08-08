import { api } from '../utils/api';

export const chatService = {
  // Generate chat response
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
  },

  // Generate chat response with conversation history
  generateChatWithHistory: async (messages, maxTokens = 500, temperature = 0.7) => {
    try {
      const response = await fetch('/api/v1/chat/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages,
          max_tokens: maxTokens,
          temperature
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Chat generation failed');
      }
    } catch (error) {
      throw error;
    }
  },

  // Send a single message and get response
  sendMessage: async (message, conversationHistory = []) => {
    try {
      const newMessage = {
        id: Date.now(),
        role: 'user',
        content: message,
        timestamp: new Date().toLocaleTimeString()
      };

      const updatedMessages = [...conversationHistory, newMessage];
      const response = await chatService.generateChatWithHistory(updatedMessages);
      
      const aiResponse = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.response || 'Sorry, I could not generate a response.',
        timestamp: new Date().toLocaleTimeString()
      };

      return {
        userMessage: newMessage,
        aiResponse: aiResponse,
        fullResponse: response
      };
    } catch (error) {
      throw error;
    }
  }
};
