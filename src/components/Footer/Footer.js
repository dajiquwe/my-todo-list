import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter/TasksFilter';

import './Footer.css';

const Footer = (props) => {
  const { itemsLeft, onShowTodo, toShow, clearCompleted } = props;
  return (
    <footer>
      <span className="items-left">{itemsLeft} items left</span>
      <TasksFilter toShow={toShow} onShowTodo={onShowTodo} />
      <span className="clear" onClick={clearCompleted}>
        Clear completed
      </span>
    </footer>
  );
};

Footer.propTypes = {
  toShow: PropTypes.string,
  itemsLeft: PropTypes.number,
  onShowTodo: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  toShow: 'all',
};

export default Footer;
