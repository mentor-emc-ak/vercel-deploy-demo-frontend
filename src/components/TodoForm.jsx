import { useState, useEffect } from 'react';
import './TodoForm.css';

function TodoForm({ onSubmit, initialData = null, isEditing = false, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setCompleted(initialData.completed || false);
    } else {
      setTitle('');
      setDescription('');
      setCompleted(false);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      completed
    });

    if (!isEditing) {
      setTitle('');
      setDescription('');
      setCompleted(false);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="form-input"
          placeholder="Todo title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <textarea
          className="form-textarea"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
        />
      </div>

      {isEditing && (
        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            <span>Mark as completed</span>
          </label>
        </div>
      )}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {isEditing ? '✏️ Update Todo' : '➕ Add Todo'}
        </button>
        {isEditing && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TodoForm;
