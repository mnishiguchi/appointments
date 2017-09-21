import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

class AppointmentForm extends React.PureComponent {
  // State object keys and input element names must match the corresponding keys of the remote API.
  // - MN 2017-09-22
  state = {
    title: '',
    startTime: '',
  };

  setFormValue = e => {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  };

  setStartTime = moment => {
    const startTime = moment.toDate();
    if (startTime) {
      this.setState(() => ({ startTime }));
    }
  };

  handleFormSubmit = e => {
    this.props.onSubmit(this.state);
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state);
  }

  render() {
    const { title, startTime } = this.state;
    return (
      <form className="AppointmentForm form-inline" style={{ marginBottom: '1rem' }}>
        <div className="d-flex flex-column">
          <input
            type="text"
            className="AppointmentForm__title form-control mb-2 mr-sm-2 mb-sm-0"
            placeholder="Title"
            name="title"
            onChange={this.setFormValue}
          />
          <Datetime
            open
            input={false}
            inputProps={{ name: 'startTime' }}
            value={this.state.startTime}
            onChange={this.setStartTime}
          />

          <button type="button" className="btn btn-primary" onClick={this.handleFormSubmit}>
            Submit
          </button>
        </div>
      </form>
    );
  }
}

AppointmentForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default AppointmentForm;
