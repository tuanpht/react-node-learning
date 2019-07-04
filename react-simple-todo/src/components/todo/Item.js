import React from 'react';
import './Item.css';

export default class Todo extends React.Component {
  onChange = (e) => {
    const updatedTodo = { ...this.props.todo, completed: e.target.checked };

    this.props.onTodoChanged(updatedTodo);
  };

  render() {
    const { todo } = this.props;

    return (
      <label className="todo-item">
        <input type="checkbox" checked={todo.completed} onChange={this.onChange} />
        {todo.title}
      </label>
    );
  }
}
