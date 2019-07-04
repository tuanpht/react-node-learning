import React from 'react';

function* generateId() {
  let i = 0;
  while (true) {
    yield ++i;
  }
}

const FILTER_TYPE = {
  ALL: 'all',
  COMPLETED: 'completed',
  ACTIVE: 'active',
};

class Todo extends React.Component {
  onChange = (e) => {
    const updatedTodo = { ...this.props.todo, completed: e.target.checked };

    this.props.onTodoChanged(updatedTodo);
  };

  render() {
    const { todo } = this.props;

    return (
      <label>
        <input type="checkbox" checked={todo.completed} onChange={this.onChange} />
        {todo.title}
      </label>
    );
  }
}

class TodoList extends React.Component {
  render() {
    const { todos, onTodoChanged } = this.props;

    return (
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Todo todo={todo} onTodoChanged={onTodoChanged} />
          </li>
        ))}
      </ul>
    );
  }
}

class TodoFormCreate extends React.Component {
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

class TodoFormFilter extends React.Component {
  onFormChanged = (e) => {
    this.props.onFilterTypeChanged(e.target.value);
  };

  render() {
    return (
      <form onChange={this.onFormChanged}>
        <label>
          <input type="radio" name="filterType" value={FILTER_TYPE.ALL} /> All
        </label>
        <label>
          <input type="radio" name="filterType" value={FILTER_TYPE.COMPLETED} /> Completed
        </label>
        <label>
          <input type="radio" name="filterType" value={FILTER_TYPE.ACTIVE} /> Active
        </label>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    todos: [],
    filterType: FILTER_TYPE.ALL,
  };

  addTodo = (todo) => {
    this.setState((prevState) => ({
      todos: [...prevState.todos, todo],
    }));
  };

  onFilterTodo = (filterType) => {
    this.setState({ filterType: filterType });
  };

  filterTodos = (type) => {
    const { todos } = this.state;
    switch (type) {
      default:
        return [...todos];

      case FILTER_TYPE.ACTIVE:
        return todos.filter((todo) => !todo.completed);

      case FILTER_TYPE.COMPLETED:
        return todos.filter((todo) => todo.completed);
    }
  };

  updateTodo = (updatedTodo) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return { ...updatedTodo };
        }
        return { ...todo };
      }),
    }));
  };

  render() {
    const { filterType, todos } = this.state;
    const filteredTodos = this.filterTodos(filterType);
    return (
      <React.Fragment>
        <header>
          <h1 style={{ textAlign: 'center' }}>My TODO List</h1>
          <fieldset>
            <legend>Add new Todo</legend>
            <TodoFormCreate onTodoAdded={this.addTodo} />
          </fieldset>
          <fieldset>
            <legend>Filter</legend>
            <TodoFormFilter onFilterTypeChanged={this.onFilterTodo} />
          </fieldset>
        </header>
        <main>
          <fieldset>
            <legend>
              Todo list (showing: {filteredTodos.length} / {todos.length})
            </legend>
            <TodoList todos={filteredTodos} onTodoChanged={this.updateTodo} />
          </fieldset>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
