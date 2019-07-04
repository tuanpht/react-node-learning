import React from 'react';
import './FormCreate.css';

function* generateId() {
  let i = 0;
  while (true) {
    yield ++i;
  }
}

export default class TodoFormCreate extends React.Component {
  state = {
    inputTodo: '',
  };

  nextId = generateId();

  onInputTodoChange = (e) => {
    this.setState({ inputTodo: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    this.props.onTodoAdded({
      id: this.nextId.next().value,
      title: this.state.inputTodo,
      completed: false,
    });

    this.setState({ inputTodo: '' }, () => form.reset());
  };

  render() {
    const { inputTodo } = this.state;

    return (
      <form className="todo-form" onSubmit={this.onSubmit}>
        <input value={inputTodo} onChange={this.onInputTodoChange} required />
        <button type="submit">Add</button>
      </form>
    );
  }
}
