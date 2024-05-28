import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import TaskList from './components/TaskList/TaskList';
import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import Footer from './components/Footer/Footer';
// import Timer from './components/Timer/Timer';

import './index.css';

export default class App extends Component {
  maxId = 100;
  state = {
    todoData: [],
    toShow: 'all',
  };

  createTodoItem(label, sec, min) {
    return {
      label,
      done: false,
      id: this.maxId++,
      checked: false,
      date: new Date(),
      minTime: min,
      time: sec,
      intervalId: null,
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

  startTimer = (id) => {
    this.setState(({ todoData }) => {
      const arrNew = [...todoData];
      todoData.map((el) => {
        if (el.id === id) {
          if (el.intervalId !== null) {
            clearInterval(el.intervalId);
          }
          el.intervalId = setInterval(() => {
            this.setState(({ todoData }) => {
              const newArr = [...todoData];
              newArr.map((el) => {
                if (el.id === id) {
                  if (el.time !== 0 || el.minTime !== 0) {
                    if (el.minTime > 0) {
                      if (el.time === 0) {
                        el.minTime = el.minTime - 1;
                        el.time = 60;
                      }
                    } else if (el.minTime === 0 && el.time === 1) {
                      clearInterval(el.intervalId);
                    }
                    el.time = el.time - 1;
                  }
                }
              });
              return {
                todoData: newArr,
              };
            });
          }, 1000);
        }
      });
      return {
        todoData: arrNew,
      };
    });
    // console.log(this.state.todoData);
  };

  // onTimerAdded = (text) => {};

  stopTimer = (intervalId) => {
    clearInterval(intervalId);
  };

  addItem = (text, sec, min) => {
    console.log('sec', sec);
    console.log('min', min);
    const newItem = this.createTodoItem(text, sec, min);

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

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
      };
    });
    this.setState(({ todoData }) => {
      todoData.map((el) => {
        if (el.id === id) {
          el.time = 0;
          el.minTime = 0;
        }
      });
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
        <NewTaskForm onItemAdded={this.addItem} placeholder="What needs to be done?" />
        <TaskList
          todos={copy}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          onChangeCheck={this.onChangeCheck}
          editItem={this.editItem}
          onStartTimer={this.startTimer}
          onStopTimer={this.stopTimer}
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
