const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Error class to include HTTP status and response data.
 */
class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * A wrapper for the fetch API that automatically handles:
 * - JSON parsing
 * - Throwing errors for non-successful (non-2xx) responses
 * - Including backend error messages in the thrown error
 * - Request timeouts
 *
 * @param {string} endpoint - The API endpoint to call (e.g., '/protected').
 * @param {RequestInit} options - The options for the fetch call.
 * @param {string} [token] - The optional authentication token.
 * @returns {Promise<any>} The JSON data from the response.
 * @throws {ApiError} Throws on network errors or non-2xx HTTP statuses.
 */
export const apiFetch = async (endpoint, options = {}, token) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15-second timeout

  const requestOptions = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    signal: controller.signal,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, requestOptions);
    clearTimeout(timeoutId);

    // If the response is not OK (e.g., 404, 500), parse the error and throw
    if (!response.ok) {
      let errorData = null;
      try {
        errorData = await response.json();
      } catch (e) {
        // The error response wasn't valid JSON
      }
      const errorMessage =
        errorData?.message || `HTTP error! Status: ${response.status}`;
      throw new ApiError(errorMessage, response.status, errorData);
    }

    // Handle successful responses that might not have content (e.g., 204 No Content)
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new ApiError("Request timed out", 408, null);
    }
    // Re-throw our custom error or a generic one if it's another type of network error
    throw error;
  }
};
