// Centralized API configuration
export const API_CONFIG = {
  // Main API base URL - used for most endpoints
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  
  // Backend URL without /api suffix - used for some services
  BACKEND_URL: process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8000',
  
  // Auth API base URL - used for authentication endpoints
  AUTH_BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
} as const;

// Export commonly used URLs
export const API_ENDPOINTS = {
  // Header endpoints
  HEADER: `${API_CONFIG.BASE_URL}/header-content`,
  
  // Content endpoints
  ABOUT: `${API_CONFIG.BASE_URL}/about-content`,
  CONTACT: `${API_CONFIG.BASE_URL}/contact-content`,
  TERMS: `${API_CONFIG.BASE_URL}/terms-content`,
  PRICING: `${API_CONFIG.BASE_URL}/pricing-content`,
  
  // Section endpoints
  FOOTER: `${API_CONFIG.BASE_URL}/footer`,
  WHY_CHOOSE_US: `${API_CONFIG.BASE_URL}/why-choose-us`,
  CONTACT_SECTION: `${API_CONFIG.BASE_URL}/contact-section`,
  
  // Gallery and media
  GALLERY: `${API_CONFIG.BASE_URL}/gallery`,
  UPLOAD: `${API_CONFIG.BASE_URL}/upload`,
  
  // Authentication
  AUTH: {
    LOGIN: `${API_CONFIG.AUTH_BASE_URL}/auth/login`,
    REGISTER: `${API_CONFIG.AUTH_BASE_URL}/auth/register`,
    VERIFY: `${API_CONFIG.AUTH_BASE_URL}/auth/verify`,
    UPDATE: `${API_CONFIG.AUTH_BASE_URL}/auth/update`,
  }
} as const;

export default API_CONFIG;
