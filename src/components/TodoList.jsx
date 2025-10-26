import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList({ todos, onToggle, onDelete, onEdit }) {
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="todo-list">
      {activeTodos.length > 0 && (
        <div className="todo-section">
          <h2 className="section-title">
            Active Tasks ({activeTodos.length})
          </h2>
          <div className="todos-container">
            {activeTodos.map(todo => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        </div>
      )}

      {completedTodos.length > 0 && (
        <div className="todo-section">
          <h2 className="section-title completed-section">
            ✓ Completed ({completedTodos.length})
          </h2>
          <div className="todos-container">
            {completedTodos.map(todo => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoList;
