import { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { useAuth } from '../context/AuthContext';
import { fetchTodos, createTodo, updateTodo, deleteTodo, toggleTodo } from '../services/api';

function Todos() {
  const { user, logout } = useAuth();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);

  // Fetch all todos on component mount when user is authenticated
  useEffect(() => {
    if (user) {
      loadTodos();
    }
  }, [user]);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await fetchTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to load todos. Make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todoData) => {
    try {
      const newTodo = await createTodo(todoData);
      setTodos([newTodo, ...todos]);
      setError(null);
    } catch (err) {
      setError('Failed to create todo');
      console.error(err);
    }
  };

  const handleUpdateTodo = async (id, todoData) => {
    try {
      const updatedTodo = await updateTodo(id, todoData);
      setTodos(todos.map(todo => todo._id === id ? updatedTodo : todo));
      setEditingTodo(null);
      setError(null);
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo._id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      const updatedTodo = await toggleTodo(id);
      setTodos(todos.map(todo => todo._id === id ? updatedTodo : todo));
      setError(null);
    } catch (err) {
      setError('Failed to toggle todo');
      console.error(err);
    }
  };

  const handleEditClick = (todo) => {
    setEditingTodo(todo);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setTodos([]);
      setError(null);
    } catch (err) {
      setError('Failed to logout');
      console.error(err);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>📝 Todo App</h1>
          <p className="subtitle">Manage your tasks efficiently</p>
          <button onClick={handleLogout} className="logout-btn">
            Logout ({user.email})
          </button>
        </header>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <TodoForm
          onSubmit={editingTodo ? (data) => handleUpdateTodo(editingTodo._id, data) : handleAddTodo}
          initialData={editingTodo}
          isEditing={!!editingTodo}
          onCancel={handleCancelEdit}
        />

        {loading ? (
          <div className="loading">Loading todos...</div>
        ) : (
          <TodoList
            todos={todos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
            onEdit={handleEditClick}
          />
        )}

        {!loading && todos.length === 0 && (
          <div className="empty-state">
            <p>No todos yet. Create your first todo above!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Todos;