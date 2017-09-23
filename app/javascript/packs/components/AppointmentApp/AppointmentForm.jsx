import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

class AppointmentForm extends React.PureComponent {
  handleInputChange = e =>
    this.props.emitter.emit('AppointmentForm:input:change', {
      [e.target.name]: e.target.value,
    });

  handleDatetimeChange = moment => {
    const startTime = moment.toDate();
    if (startTime) {
      this.props.emitter.emit('AppointmentForm:startTime:change', { startTime });
    }
  };

  handleFormSubmit = e => {
    this.props.emitter.emit('AppointmentForm:submit');
  };

  render() {
    const { emitter, formObject: { title, startTime } } = this.props;

    return (
      <form className="AppointmentForm form-inline" style={{ marginBottom: '1rem' }}>
        <div className="d-flex flex-column">
          <input
            type="text"
            className="AppointmentForm__title form-control mb-2 mr-sm-2 mb-sm-0"
            placeholder="Title"
            name="title"
            onChange={this.handleInputChange}
          />
          <Datetime
            open
            input={false}
            inputProps={{ name: 'startTime' }}
            value={startTime}
            onChange={this.handleDatetimeChange}
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
  formObject: PropTypes.any,
  emitter: PropTypes.any,
};

export default AppointmentForm;
