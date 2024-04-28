import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  state = {
    label: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({
      label: '',
    });
  };

  render() {
    const searchText = this.props.placeholder;
    return (
      <form onSubmit={this.onFormSubmit}>
        <input
          className="newTask"
          type="text"
          onChange={this.onLabelChange}
          placeholder={searchText}
          value={this.state.label}
        />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  placeholder: PropTypes.string,
  onItemAdded: PropTypes.func.isRequired,
};

NewTaskForm.defaultProps = {
  placeholder: 'What needs to be done?',
};
