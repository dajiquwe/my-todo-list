import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  state = {
    label: '',
    sec: '',
    min: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSecChange = (e) => {
    this.setState({
      sec: e.target.value,
    });
  };

  onMinChange = (e) => {
    this.setState({
      min: e.target.value,
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const secNumber = Number(this.state.sec);
    const minNumber = Number(this.state.min);
    this.props.onItemAdded(this.state.label, secNumber, minNumber);
    this.setState({
      label: '',
      sec: '',
      min: '',
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
          autoFocus
        />
        <input className="sec" placeholder="Sec" onChange={this.onSecChange} value={this.state.sec} />
        <input className="sec" placeholder="Min" onChange={this.onMinChange} value={this.state.min} />
        <button type="submit" className="secretB"></button>
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
