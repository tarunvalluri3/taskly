import axios from "axios";

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/api",
    withCredentials: true,
    timeout: 8000
  });

/* ---------- AUTH EXPIRED EVENT ---------- */

function emitAuthExpired() {
  window.dispatchEvent(new Event("auth-expired"));
}

/* ---------- RESPONSE INTERCEPTOR ---------- */

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      emitAuthExpired();
    }
    return Promise.reject(err);
  }
);

/* ---------- ERROR PARSER ---------- */

export function parseApiError(err) {
  if (err.response) {
    const status = err.response.status;
    const msg = err.response.data?.message;

    if (status === 401) return msg || "Authentication failed";
    if (status === 409) return msg || "Already exists";
    if (status >= 500) return "Server error — try again later";

    return msg || "Request failed";
  }

  if (err.request) {
    if (err.code === "ECONNABORTED") {
      return "Request timeout — server too slow";
    }
    return "Server unreachable — check connection";
  }

  return "Unexpected error occurred";
}

/* ---------- SIMPLE CACHE LAYER ---------- */

const todoCache = new Map();
const CACHE_TTL = 60 * 1000; // 60 seconds

function getCache(key) {
  const entry = todoCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.time > CACHE_TTL) {
    todoCache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key, data) {
  todoCache.set(key, { data, time: Date.now() });
}

function clearTodoCache() {
  todoCache.clear();
}

/* ---------- AUTH ---------- */

export const login = (data) => api.post("/auth/login", data);
export const signup = (data) => api.post("/auth/signup", data);
export const getMe = () => api.get("/auth/me");
export const logout = () => api.post("/auth/logout");

/* ---------- TODOS ---------- */

export const createTodo = async (data) => {
  const res = await api.post("/todos", data);
  clearTodoCache(); // invalidate
  return res;
};

export const getTodos = async (category) => {
  const key = `todos:${category}`;
  const cached = getCache(key);
  if (cached) {
    return Promise.resolve({ data: cached });
  }

  const res = await api.get(`/todos?category=${category}`);
  setCache(key, res.data);
  return res;
};

export const updateTodo = async (id, data) => {
  const res = await api.patch(`/todos/${id}`, data);
  clearTodoCache();
  return res;
};

export const markComplete = async (id) => {
  const res = await api.patch(`/todos/${id}/complete`);
  clearTodoCache();
  return res;
};

export const markIncomplete = async (id, reason) => {
  const res = await api.patch(`/todos/${id}/incomplete`, { reason });
  clearTodoCache();
  return res;
};

export const deleteTodo = async (id, reason) => {
  const res = await api.patch(`/todos/${id}/delete`, { reason });
  clearTodoCache();
  return res;
};

export default api;
