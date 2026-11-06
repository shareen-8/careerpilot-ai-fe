
import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",

  // Gemini may take longer than a normal API request.
  timeout: 120000,
});

export default api;
