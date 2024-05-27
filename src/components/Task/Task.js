import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import KG from 'date-fns/locale/en-AU';
import './Task.css';
// import Timer from '../Timer/Timer';

export default class Task extends Component {
  state = {
    editing: false,
    label: '',
    timeId: 10,
  };

  // startTimer = () => {
  //   const intervalID = setInterval(() => {
  //     this.setState({ time: this.state.time + 1 });
  //   }, 1000);
  //   this.setState({ intervalID });
  // };

  // stopTimer = () => {
  //   clearInterval(this.state.intervalID);
  // };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      editItem,
      item: { id },
    } = this.props;
    editItem(id, this.state.label);
    this.setState({ label: '' });
    this.setState({ editing: false });
  };

  render() {
    const { label, id, onDeleted, onToggleDone, done, checked, onChangeCheck, date, onStartTimer, onStopTimer } =
      this.props;
    // const { done, active } = this.state;

    let classNames = 'Task';
    if (done) {
      classNames += ' done';
    }

    // if (active) {
    //   classNames += ' active';
    // }

    return (
      <span className={this.state.editing ? 'editing' : null}>
        <div className="view">
          <input
            type="checkbox"
            className="checkmark"
            checked={checked}
            onChange={(event) => onChangeCheck(id, event.target.checked)}
            onClick={onToggleDone}
          ></input>
          <label htmlFor={id}>
            <span className={classNames}>{label}</span>
          </label>
          <button className="icon icon-delete" onClick={onDeleted}></button>
          <button
            className="icon icon-edit"
            onClick={() => this.setState(({ editing }) => ({ editing: !editing, label: this.props.item.label }))}
          ></button>
          {/* <Timer /> */}
          {/* {this.props.time} */}
          <button className="timers icon-play" onClick={onStartTimer}></button>
          <button className="timers icon-pause" onClick={onStopTimer}></button>
          {/* <span className="timer">{('0' + Math.floor((this.props.time / 6000) % 60)).slice(-2)}:</span>
          <span className="timer">{('0' + Math.floor((this.props.time / 100) % 60)).slice(-2)}</span> */}
          <span className="timer">{this.props.minTime}:</span>
          <span className="timer">{this.props.time}</span>

          <span className="created">
            {`created ${formatDistanceToNow(date, {
              includeSeconds: true,
              locale: KG,
              addSuffix: true,
            })}`}
          </span>
        </div>
        {this.state.editing && (
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={(event) => this.setState({ label: event.target.value })}
              type="text"
              className="edit"
              value={this.state.label}
            />
          </form>
        )}
      </span>
    );
  }
}

Task.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    checked: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
  }),
  id: PropTypes.number,
  label: PropTypes.string,
  checked: PropTypes.bool,
  date: PropTypes.instanceOf(Date),
  done: PropTypes.bool,
  editItem: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onChangeCheck: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
};

Task.defaultProps = {
  item: {},
};
