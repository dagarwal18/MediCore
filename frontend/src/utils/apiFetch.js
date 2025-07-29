// src/utils/apiFetch.js
const API_URL = 'http://localhost:8000'; // Adjust to your backend URL

const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  let headers = {
    ...(options.headers || {}),  // Allow caller to override
    ...(token && { Authorization: token }),  // Use token as-is (fixed from earlier)
  };

  // Critical: Do NOT set Content-Type for FormData—let browser handle multipart/form-data
  if (options.body instanceof FormData) {
    delete headers['Content-Type'];  // Remove if present
  } else {
    headers['Content-Type'] = 'application/json';  // Default for other requests
  }

  // Debugging log to verify headers
  console.log(`apiFetch to ${endpoint} with headers:`, headers);

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP error! Status: ${response.status}`);
  }

  // For JSON responses
  if (options.method !== 'GET' || response.headers.get('Content-Type')?.includes('application/json')) {
    return response.json();
  }
  return response; // For non-JSON, like file downloads if needed
};

export { apiFetch };
