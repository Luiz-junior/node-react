import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  state = {
    newTodoText: '',
    todos: []
  }

  async componentDidMount() {
    const response = await axios.get('http://localhost:9000/todos');
    this.setState({ todos: response.data });
  }

  handleNewSubmit = async (e) => {
    e.preventDefault();
    if (!this.state.newTodoText) return;

    const response = await axios.post('http://localhost:9000/todos', {
      text: this.state.newTodoText
    });

    this.setState({ todos: [... this.state.todos, response.data] });
    document.getElementById('text').value = '';
  }


  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleNewSubmit}>
          <input id="text"
            onChange={e => this.setState({ newTodoText: e.target.value })}
            value={this.state.newTodoText}
          />
          <button type="submit"> Adicionar </button>
        </form>

        <ul>
          {this.state.todos.map(todo =>
            <div>
              <li key={todo._id}> {todo.text} </li>
            </div>
          )}
        </ul>

      </div>
    );
  }
}

export default App;
