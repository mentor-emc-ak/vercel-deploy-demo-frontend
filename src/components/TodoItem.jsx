import './TodoItem.css';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-checkbox">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo._id)}
          className="checkbox"
        />
      </div>

      <div className="todo-content">
        <h3 className="todo-title">{todo.title}</h3>
        {todo.description && (
          <p className="todo-description">{todo.description}</p>
        )}
        <div className="todo-meta">
          <span className="todo-date">
            Created: {formatDate(todo.createdAt)}
          </span>
          {todo.updatedAt !== todo.createdAt && (
            <span className="todo-date">
              Updated: {formatDate(todo.updatedAt)}
            </span>
          )}
        </div>
      </div>

      <div className="todo-actions">
        <button
          className="btn-icon btn-edit"
          onClick={() => onEdit(todo)}
          title="Edit todo"
        >
          ✏️
        </button>
        <button
          className="btn-icon btn-delete"
          onClick={() => onDelete(todo._id)}
          title="Delete todo"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
