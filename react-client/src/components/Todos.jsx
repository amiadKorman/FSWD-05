import React, { useState, useEffect } from 'react';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortCriteria, setSortCriteria] = useState('serial');
  const [searchQuery, setSearchQuery] = useState('');
  const apiUrl = 'http://localhost:3000/todos'; // Replace with your JSON server URL

  // Get the current user ID from localStorage
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const currentUserId = currentUser ? Number(currentUser.id) : null;

  useEffect(() => {
    if (currentUserId !== null) {
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => setTodos(data.filter(todo => Number(todo.userId) === currentUserId)))
        .catch(error => console.error('Error fetching todos:', error));
    }
  }, [currentUserId]);

  const addTodo = (title) => {
    const newTodo = {
      title,
      completed: false,
      userId: currentUserId, // Set the userId of the new todo to the current user's ID
    };
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    })
    .then(response => response.json())
    .then(todo => setTodos([...todos, todo]))
    .catch(error => console.error('Error adding todo:', error));
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`Failed to delete todo with id: ${id}`);
      }
      setTodos(todos.filter(todo => todo.id !== id));
      console.log(`Successfully deleted todo with id: ${id}`);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const updateTodo = (id, updatedTodo) => {
    fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTodo)
    })
    .then(response => response.json())
    .then(todo => setTodos(todos.map(t => (t.id === id ? todo : t))))
    .catch(error => console.error('Error updating todo:', error));
  };

  const toggleComplete = (id) => {
    const todoToToggle = todos.find(todo => todo.id === id);
    const updatedTodo = { ...todoToToggle, completed: !todoToToggle.completed };
    updateTodo(id, updatedTodo);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'notCompleted') return !todo.completed;
    return true;
  });

  const sortedTodos = filteredTodos.sort((a, b) => {
    if (sortCriteria === 'serial') return a.id - b.id;
    if (sortCriteria === 'alphabetical') return a.title.localeCompare(b.title);
    if (sortCriteria === 'random') return 0.5 - Math.random();
    if (sortCriteria === 'done') return a.completed === b.completed ? 0 : a.completed ? -1 : 1;
    if (sortCriteria === 'notDone') return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
    return 0;
  });

  const searchResults = sortedTodos.filter(todo => {
    const query = searchQuery.toLowerCase();
    const title = todo.title ? todo.title.toLowerCase() : '';
    return title.includes(query) || todo.id.toString().includes(query);
  });

  return (
    <div>
      <h1>Todos</h1>
      <div>
        <input 
          type="text" 
          placeholder="Search by ID or title..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <select onChange={(e) => setSortCriteria(e.target.value)} value={sortCriteria}>
          <option value="serial">Serial</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="random">Random</option>
          <option value="done">Done</option>
          <option value="notDone">Not Done</option>
        </select>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="notCompleted">Not Completed</option>
        </select>
      </div>
      <ul>
        {searchResults.map((todo, index) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {index + 1}. ID: {todo.id}, User ID: {todo.userId}, {todo.title} {/* Serial number, ID, User ID, and title */}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button onClick={() => updateTodo(todo.id, { ...todo, title: prompt('New title', todo.title) })}>
              Edit
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => addTodo(prompt('New todo'))}>Add Todo</button>
    </div>
  );
};

export default Todos;
