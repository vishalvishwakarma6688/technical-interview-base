import axios from "axios";

const API_URL = "http://localhost:3000/api/todo";

export interface TodoPayload {
  title: string;
  description?: string;
  categoryId?: string | null;
  tags?: string[];
  status?: "Pending" | "Completed";
}

// Get all todos with optional filters
export const getTodos = async (filters?: {
  search?: string;
  categoryId?: string;
  tags?: string[];
  status?: string;
}) => {
  const query = new URLSearchParams();

  if (filters?.search) query.append("search", filters.search);
  if (filters?.categoryId) query.append("categoryId", filters.categoryId);
  if (filters?.status) query.append("status", filters.status);
  if (filters?.tags?.length) query.append("tags", filters.tags.join(","));

  const res = await axios.get(`${API_URL}?${query.toString()}`);
  return res.data;
};

// Get single todo by ID
export const getTodoById = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// Create new todo
export const createTodo = async (data: TodoPayload) => {
  const res = await axios.post(`${API_URL}/create`, data);
  return res.data;
};

// Update todo
export const updateTodo = async (id: string, data: Partial<TodoPayload>) => {
  const res = await axios.patch(`${API_URL}/update`, { id, ...data });
  return res.data;
};

// Delete todo
export const deleteTodo = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
