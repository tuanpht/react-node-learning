import React from 'react';
import { FILTER_TYPE } from './constants';
import { TodoFormFilter, TodoList, TodoFormCreate } from './components/todo';

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
          <h1 className="text-center">My todo list</h1>
          <fieldset>
            <legend>Add new Todo</legend>
            <TodoFormCreate onTodoAdded={this.addTodo} />
          </fieldset>
          <fieldset>
            <legend>Filter</legend>
            <TodoFormFilter onFilterTypeChanged={this.onFilterTodo} defaultFilterType={FILTER_TYPE.ALL} />
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
