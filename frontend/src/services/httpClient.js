import axios from 'axios';

// Simple HTTP client (Singleton) to centralize configuration and make it easy
// to swap transport (fetch, axios, mock) – Repository pattern depends on this.
const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
  timeout: 10_000,
});

export default httpClient;


