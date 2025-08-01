// API Configuration
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5000/api';

// Application Constants
export const APP_NAME = 'GARLIC-Q';
export const APP_VERSION = '1.0.0';

// API Endpoints
export const ENDPOINTS = {
  GARLIC: '/garlic',
  GARLIC_STATS: '/garlic/stats',
  GARLIC_RECIPES: '/garlic/recipes',
  HEALTH: '/health'
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
}; 