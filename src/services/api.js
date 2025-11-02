import { auth } from '../config/firebase-config';
import { getIdToken } from 'firebase/auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Helper function to get authorization headers
const getAuthHeaders = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }
  
  const token = await getIdToken(user);
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

// Fetch all todos
export const fetchTodos = async () => {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_URL}/todos`, {
    headers,
  });
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return response.json();
};

// Create a new todo
export const createTodo = async (todoData) => {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers,
    body: JSON.stringify(todoData),
  });
  if (!response.ok) {
    throw new Error('Failed to create todo');
  }
  return response.json();
};

// Update a todo
export const updateTodo = async (id, todoData) => {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(todoData),
  });
  if (!response.ok) {
    throw new Error('Failed to update todo');
  }
  return response.json();
};

// Delete a todo
export const deleteTodo = async (id) => {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
    headers,
  });
  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
  return response.json();
};

// Toggle todo completion status
export const toggleTodo = async (id) => {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_URL}/todos/${id}/toggle`, {
    method: 'PATCH',
    headers,
  });
  if (!response.ok) {
    throw new Error('Failed to toggle todo');
  }
  return response.json();
};
