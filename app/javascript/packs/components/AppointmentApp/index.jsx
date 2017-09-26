import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { EventEmitter } from 'fbemitter';
import { isoDatetimeStringPropType } from '../propTypes';
import { getCsrfToken, underscoreKeys, camelizeKeys } from '../utils';
import { validateMinLength, validateMaxLength, validateFutureTime } from '../validators';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import FormErrors from './FormErrors';

class AppointmentApp extends React.PureComponent {
  // The form object keys and input element names must match the corresponding keys of the remote API.
  // - MN 2017-09-22
  static formFieldNames = ['title', 'startTime'];

  static validators = {
    title: [string => validateMinLength(string, 3), string => validateMaxLength(string, 24)],
    startTime: [datetime => validateFutureTime(datetime)],
  };

  initialForm = {
    title: { value: '', isValid: false },
    startTime: { value: new Date(), isValid: false },
    formErrors: {},
    isFormValid: false,
  };

  state = {
    appointments: camelizeKeys(this.props.appointments) || [],
    ...this.initialForm,
  };

  componentWillMount() {
    this.emitter = new EventEmitter();
    this.subscribeFormEvents();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state);
  }

  componentWillUnmount() {
    this.emitter.removeAllListeners();
  }

  updateFormField = (name, value) => {
    const errorMessages = this.validateInputField(name, value, AppointmentApp.validators[name]);
    const isValid = errorMessages.length === 0;
    const formErrors = { ...this.state.formErrors };
    formErrors[name] = errorMessages;

    this.setState(
      {
        [name]: { ...this.state[name], value, isValid },
        formErrors,
      },
      this.setIsFormValid(),
    );
  };

  // Returns an array of error messages of client-side form validation.
  validateInputField = (name, value, validators = []) => {
    const errorMessages = validators.reduce((errors, validate) => {
      const error = validate(value);
      if (error) errors.push(error);
      return errors;
    }, []);
    return errorMessages;
  };

  setIsFormValid = (formFieldNames = AppointmentApp.formFieldNames) => {
    const isFormValid = formFieldNames.reduce((acc, name) => {
      const isFieldValid = this.state[name].isValid;
      return acc && isFieldValid;
    }, true);

    this.setState({ isFormValid });
  };

  submitForm = () => {
    const { title, startTime } = this.state;
    const params = {
      appointment: underscoreKeys({
        title: title.value,
        startTime: startTime.value,
      }),
      authenticity_token: getCsrfToken(),
    };
    axios
      .post('/appointments.json', params)
      .then(response => {
        const newAppointment = response.data;
        this.addAppointment(newAppointment);
        this.clearFormValues();
      })
      .catch(error => {
        const formErrors = error.response.data;
        this.setState({ formErrors });
      });
  };

  addAppointment = appointment => {
    this.setState(prevState => {
      const appointments = [...prevState.appointments, camelizeKeys(appointment)].sort(
        (a, b) => new Date(a.startTime) - new Date(b.startTime),
      );
      return { appointments };
    });
  };

  clearFormValues = () => {
    this.setState({ ...this.initialForm });
  };

  subscribeFormEvents() {
    this.emitter.addListener(AppointmentForm.EVENT_ON_CHANGE, ({ name, value }) => {
      this.updateFormField(name, value);
    });

    this.emitter.addListener(AppointmentForm.EVENT_ON_SUBMIT, () => {
      this.submitForm();
    });
  }

  render() {
    const { appointments, title, startTime, formErrors, isFormValid } = this.state;
    return (
      <div className="AppointmentApp">
        <FormErrors formErrors={formErrors} />
        <div className="row">
          <div className="col-lg-4">
            <AppointmentForm
              title={title}
              startTime={startTime}
              emitter={this.emitter}
              isFormValid={isFormValid}
            />
          </div>
          <div className="col-lg-8">
            <AppointmentList appointments={appointments} />
          </div>
        </div>
      </div>
    );
  }
}

AppointmentApp.propTypes = {
  appointments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      start_time: isoDatetimeStringPropType,
    }),
  ),
};

export default AppointmentApp;
