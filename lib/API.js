const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * A wrapper for the fetch API to automatically handle API base URL and headers.
 * @param {string} endpoint - The API endpoint to call (e.g., '/protected').
 * @param {RequestInit} options - The options for the fetch call.
 * @param {string} token - The authentication token.
 * @returns {Promise<Response>}
 */
export const apiFetch = (endpoint, options = {}, token) => {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };
  return fetch(`${API_URL}${endpoint}`, defaultOptions);
};
