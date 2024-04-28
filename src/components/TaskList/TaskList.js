import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';

import './TaskList.css';

export default class TaskList extends Component {
  render() {
    const { todos, onDeleted, onToggleDone, onChangeCheck, editItem } = this.props;

    return (
      <ul>
        {todos.map((item) => (
          <li key={item.id}>
            <Task
              label={item.label}
              id={item.id}
              // active={item.active}
              done={item.done}
              checked={item.checked}
              date={item.date}
              onDeleted={() => onDeleted(item.id)}
              onToggleDone={() => onToggleDone(item.id)}
              onChangeCheck={onChangeCheck}
              item={item}
              editItem={editItem}
            />
          </li>
        ))}
      </ul>
    );
  }
}

TaskList.propTypes = {
  todos: PropTypes.any,
  editItem: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onChangeCheck: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  todos: {},
};
