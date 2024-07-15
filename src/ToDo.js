import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from './store/actions';

const ToDo = ({ todos, addTodo, toggleTodo, deleteTodo }) => {
    const [input, setInput] = useState('');

    const handleAddTodo = () => {
        if (input.trim() !== '') {
            addTodo({
                id: new Date().getTime(),
                text: input,
                completed: false,
            });
            setInput('');
        }
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add a new to-do"
            />
            <button onClick={handleAddTodo}>Add</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                        />
                        {todo.text}
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const mapStateToProps = (state) => ({
    todos: state.todos,
});

const mapDispatchToProps = {
    addTodo,
    toggleTodo,
    deleteTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
