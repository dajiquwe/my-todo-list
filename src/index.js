import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import TaskList from './components/TaskList/TaskList';
import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import Footer from './components/Footer/Footer';
import Timer from './components/Timer/Timer';

import './index.css';

export default class App extends Component {
  maxId = 100;
  state = {
    todoData: [],
    toShow: 'all',
  };

  createTodoItem(label) {
    return {
      label,
      done: false,
      // active: false,
      id: this.maxId++,
      checked: false,
      date: new Date(),
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);

      const newArray = [...todoData.slice(0, index), ...todoData.slice(index + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];

      return {
        todoData: newArr,
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const index = arr.findIndex((el) => el.id === id);
    const oldItem = arr[index];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
  }

  // onToggleActive = (id) => {
  //   this.setState(({todoData}) => {
  //     return {
  //       todoData: this.toggleProperty(todoData, id, 'active')
  //     };
  //   });
  //   console.log('Toggle Active', id);
  // }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
      };
    });
    // console.log('Toggle Done', id, this.state.todoData);
  };

  // onShowDone = () => {
  //   console.log('Nazhal', this.state.todoData);
  //   const doneItems = this.state.todoData.filter((el) => el.done === true)
  //   console.log(doneItems);

  // }

  onShowTodo = (s) => {
    this.setState({
      toShow: s,
    });
    // console.log(s);
    // console.log(this.state.todoData);
  };

  onChangeCheck = (ident, data) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((element) => {
        if (ident === element.id) element.checked = data;
        return element;
      }),
    }));
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((el) => el.done === false),
    }));
  };

  editItem = (ident, text) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((element) => {
        if (element.id === ident) element.label = text;
        return element;
      }),
    }));
  };

  render() {
    const { todoData } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    let copy = [];

    if (this.state.toShow === 'all') {
      copy = todoData;
    } else if (this.state.toShow === 'active') {
      copy = todoData.filter((el) => el.done === false);
    } else if (this.state.toShow === 'complete') {
      copy = todoData.filter((el) => el.done === true);
    }

    return (
      <div className="app">
        <h1>Todos</h1>
        <Timer />
        <NewTaskForm onItemAdded={this.addItem} placeholder="What needs to be done?" />
        <TaskList
          todos={copy}
          onDeleted={this.deleteItem}
          // onToggleActive={this.onToggleActive}
          onToggleDone={this.onToggleDone}
          onChangeCheck={this.onChangeCheck}
          editItem={this.editItem}
        />
        <Footer
          itemsLeft={todoCount}
          toShow={this.state.toShow}
          onShowTodo={this.onShowTodo.bind(this)}
          clearCompleted={this.clearCompleted}
        />
      </div>
    );
  }
}

// ReactDOM.render(<App />, document.getElementById('root'));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
