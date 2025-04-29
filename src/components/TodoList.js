import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaCheck, FaTrash, FaRobot } from 'react-icons/fa';
import '../styles.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [taskInput, setTaskInput] = useState('');

  // Fetch todos from backend
  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // Fetch todos when component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  // Get AI suggestions
  const getAISuggestions = async () => {
    if (!taskInput.trim()) {
      alert('Please enter a task description');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/api/ai/suggestions`, {
        context: taskInput
      });
      setSuggestions(response.data);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
      alert('Failed to get AI suggestions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/todos`, newTodo);
      setTodos([...todos, response.data]);
      setNewTodo({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: ''
      });
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle todo completion
  const handleToggleComplete = async (id) => {
    try {
      await axios.put(`${API_URL}/api/todos/${id}/toggle`);
      setTodos(todos.map(todo => 
        todo._id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  // Delete todo
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return;

    try {
      await axios.delete(`${API_URL}/api/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="todo-app" role="application" aria-label="Todo Application">
      <header className="app-header">
        <h1>Todo Manager</h1>
        <div className="task-input-container">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Enter a task description..."
            className="task-input"
            aria-label="Task input for AI suggestions"
          />
          <button
            onClick={getAISuggestions}
            className="ai-button"
            aria-label="Get AI suggestions"
            title="Get AI suggestions"
            disabled={!taskInput.trim()}
          >
            <FaRobot /> Get Suggestions
          </button>
        </div>
      </header>

      {/* Todo Form */}
      <form
        onSubmit={handleSubmit}
        className="todo-form"
        aria-label="Add new todo"
      >
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            placeholder="Enter todo title"
            required
            aria-required="true"
            aria-invalid={newTodo.title.trim() === ''}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            placeholder="Add a description..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={newTodo.priority}
            onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={newTodo.dueDate}
            onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !newTodo.title.trim()}
          className="submit-button"
          aria-label="Add todo"
        >
          {loading ? (
            <span className="loading">Adding...</span>
          ) : (
            <span>
              <FaPlus /> Add Todo
            </span>
          )}
        </button>
      </form>

      {/* Todo List */}
      <div className="todo-list" role="list" aria-label="Todos">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
            role="listitem"
            aria-label={`Todo: ${todo.title}`}
          >
            <div className="todo-actions">
              <button
                type="button"
                onClick={() => handleToggleComplete(todo._id)}
                className="toggle-button"
                aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
                title={todo.completed ? 'Mark incomplete' : 'Mark complete'}
              >
                <FaCheck />
              </button>
            </div>

            <div className="todo-content" role="region">
              <h3>{todo.title}</h3>
              {todo.description && <p>{todo.description}</p>}
              <div className="todo-meta">
                <span className={`priority ${todo.priority}`}>
                  Priority: {todo.priority}
                </span>
                <span className="due-date">
                  Due: {new Date(todo.dueDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="todo-actions">
              <button
                type="button"
                onClick={() => handleDelete(todo._id)}
                className="delete-button"
                aria-label="Delete todo"
                title="Delete todo"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions Modal */}
      {showSuggestions && (
        <div className="suggestions-modal" role="dialog" aria-modal="true">
          <div className="modal-content">
            <h2>Suggested Todos</h2>
            <div className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="suggestion-item">
                  <h3>{suggestion.title}</h3>
                  <p>{suggestion.description}</p>
                  <p>Priority: {suggestion.priority}</p>
                  <p>Due Date: {new Date(suggestion.dueDate).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowSuggestions(false)}
              className="close-button"
              aria-label="Close suggestions"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
