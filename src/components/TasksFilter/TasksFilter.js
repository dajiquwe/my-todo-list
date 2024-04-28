import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './TasksFilter.css';

export default class TasksFilter extends Component {
  render() {
    const { onShowTodo, toShow } = this.props;
    return (
      <div className="filter">
        <span onClick={() => onShowTodo('all')} className={toShow === 'all' ? 'choosen' : null}>
          All{' '}
        </span>
        <span onClick={() => onShowTodo('active')} className={toShow === 'active' ? 'choosen' : null}>
          Active{' '}
        </span>
        <span onClick={() => onShowTodo('complete')} className={toShow === 'complete' ? 'choosen' : null}>
          Completed{' '}
        </span>
      </div>
    );
  }
}

TasksFilter.propTypes = {
  toShow: PropTypes.string,
  onShowTodo: PropTypes.func.isRequired,
};

TasksFilter.defaultProps = {
  toShow: 'all',
};
