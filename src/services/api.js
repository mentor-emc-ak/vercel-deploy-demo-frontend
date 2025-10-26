const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Fetch all todos
export const fetchTodos = async () => {
  const response = await fetch(`${API_URL}/todos`);
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return response.json();
};

// Create a new todo
export const createTodo = async (todoData) => {
  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoData),
  });
  if (!response.ok) {
    throw new Error('Failed to create todo');
  }
  return response.json();
};

// Update a todo
export const updateTodo = async (id, todoData) => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoData),
  });
  if (!response.ok) {
    throw new Error('Failed to update todo');
  }
  return response.json();
};

// Delete a todo
export const deleteTodo = async (id) => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
  return response.json();
};

// Toggle todo completion status
export const toggleTodo = async (id) => {
  const response = await fetch(`${API_URL}/todos/${id}/toggle`, {
    method: 'PATCH',
  });
  if (!response.ok) {
    throw new Error('Failed to toggle todo');
  }
  return response.json();
};
