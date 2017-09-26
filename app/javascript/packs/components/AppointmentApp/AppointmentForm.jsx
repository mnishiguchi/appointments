import React from 'react';
import PropTypes from 'prop-types';
import { EventEmitter } from 'fbemitter';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

const emitOnChange = (emitter, name, value) =>
  emitter.emit(AppointmentForm.EVENT_ON_CHANGE, { name, value });

const handleInputChange = emitter => e => {
  const { name, value } = e.target;
  emitOnChange(emitter, name, value);
};

const handleDatetimeChange = emitter => moment => {
  const startTime = moment.toDate();
  if (startTime) {
    emitOnChange(emitter, 'startTime', startTime);
  }
};

const emitOnSubmit = emitter => e => {
  emitter.emit(AppointmentForm.EVENT_ON_SUBMIT);
};

const AppointmentForm = ({ emitter, title, startTime, isFormValid }) => (
  <form className="AppointmentForm form-inline" style={{ marginBottom: '1rem' }}>
    <div className="d-flex flex-column">
      <input
        type="text"
        className="AppointmentForm__title form-control mb-2 mr-sm-2 mb-sm-0"
        placeholder="Title"
        name="title"
        value={title.value}
        onChange={handleInputChange(emitter)}
      />
      <Datetime
        open
        input={false}
        inputProps={{ name: 'startTime' }}
        value={startTime.value}
        onChange={handleDatetimeChange(emitter)}
      />

      <button
        type="button"
        className="btn btn-primary"
        disabled={!isFormValid}
        onClick={emitOnSubmit(emitter)}
      >
        Make an appointment
      </button>
    </div>
  </form>
);

AppointmentForm.EVENT_ON_CHANGE = 'AppointmentForm:onChange';
AppointmentForm.EVENT_ON_SUBMIT = 'AppointmentForm:onSubmit';

AppointmentForm.propTypes = {
  emitter: PropTypes.instanceOf(EventEmitter).isRequired,
  title: PropTypes.shape({
    value: PropTypes.string.isRequired,
    isValid: PropTypes.bool.isRequired,
  }),
  startTime: PropTypes.shape({
    value: PropTypes.instanceOf(Date).isRequired,
    isValid: PropTypes.bool.isRequired,
  }),
  isFormValid: PropTypes.bool.isRequired,
};

export default AppointmentForm;
