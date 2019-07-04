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

class App extends React.Component {
  state = {
    todos: [],
    inputTodo: '',
    filterType: FILTER_TYPE.ALL,
  };

  nextId = generateId();

  addTodo = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      todos: [...prevState.todos, { id: this.nextId.next().value, title: prevState.inputTodo, completed: false }],
      inputTodo: '',
    }));
  };

  onInputTodoChange = (e) => {
    this.setState({ inputTodo: e.target.value });
  };

  onFilterTodo = (e) => {
    this.setState({ filterType: e.target.value });
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

  toggleTodoStatus = (e) => {
    const todoId = parseInt(e.target.value);
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, completed: !todo.completed };
        }
        return { ...todo };
      }),
    }));
  };

  render() {
    const { filterType, inputTodo } = this.state;
    return (
      <React.Fragment>
        <header>
          <h1 style={{ textAlign: 'center' }}>My TODO List</h1>
          <fieldset>
            <legend>Add new Todo</legend>
            <form className="todo-form" onSubmit={this.addTodo}>
              <input value={inputTodo} onChange={this.onInputTodoChange} />
              <button type="submit">Add</button>
            </form>
          </fieldset>
          <fieldset>
            <legend>Filter</legend>
            <form onChange={this.onFilterTodo}>
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
          </fieldset>
        </header>
        <main>
          <fieldset>
            <legend>Todo list</legend>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
              {this.filterTodos(filterType).map((todo) => (
                <li key={todo.id}>
                  <label>
                    <input type="checkbox" value={todo.id} checked={todo.completed} onChange={this.toggleTodoStatus} />
                    {todo.title}
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
