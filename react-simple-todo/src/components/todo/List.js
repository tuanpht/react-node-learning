import React from 'react';
import Todo from './Item';
import './List.css';

export default class TodoList extends React.Component {
  render() {
    const { todos, onTodoChanged } = this.props;

    return (
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            <Todo todo={todo} onTodoChanged={onTodoChanged} />
          </li>
        ))}
      </ul>
    );
  }
}
