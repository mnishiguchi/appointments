import React from 'react';
import axios from 'axios';
import { EventEmitter } from 'fbemitter';
import { getCsrfToken, underscoreKeys, camelizeKeys } from '../utils';
import appointmentsPropType from '../types/appointmentsPropType';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import FormErrors from './FormErrors';

class AppointmentApp extends React.PureComponent {
  // The form object keys and input element names must match the corresponding keys of the remote API.
  // - MN 2017-09-22
  state = {
    appointments: camelizeKeys(this.props.appointments) || [],
    formObject: {
      title: '',
      startTime: '',
    },
    formErrors: {},
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

  updateFormObject = changeset => {
    this.setState(prevState => ({
      formObject: {
        ...prevState.formObject,
        ...changeset,
      },
    }));
  };

  submitForm = formObject => {
    const params = {
      appointment: underscoreKeys(formObject),
      authenticity_token: getCsrfToken(),
    };
    axios
      .post('/appointments.json', params)
      .then(response => {
        const newAppointment = response.data;
        this.addAppointment(newAppointment);
        this.clearFormErrors();
      })
      .catch(error => {
        const formErrors = error.response.data;
        this.setFormErrors(formErrors);
      });
  };

  setFormErrors = formErrors => {
    this.setState(prevState => ({ formErrors }));
  };

  clearFormErrors = formErrors => {
    this.setState(prevState => ({ formErrors: {} }));
  };

  addAppointment = appointment => {
    this.setState(prevState => {
      const appointments = [...prevState.appointments, camelizeKeys(appointment)].sort(
        (a, b) => new Date(a.startTime) - new Date(b.startTime),
      );
      return { appointments };
    });
  };

  subscribeFormEvents() {
    this.emitter.addListener('AppointmentForm:input:change', changeset => {
      this.updateFormObject(changeset);
    });

    this.emitter.addListener('AppointmentForm:startTime:change', changeset => {
      this.updateFormObject(changeset);
    });

    this.emitter.addListener('AppointmentForm:submit', () => {
      this.submitForm(this.state.formObject);
    });
  }

  render() {
    const { appointments } = this.state;
    return (
      <div className="AppointmentApp">
        <FormErrors formErrors={this.state.formErrors} />
        <div className="row">
          <div className="col-lg-4">
            <AppointmentForm formObject={this.state.formObject} emitter={this.emitter} />
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
  appointments: appointmentsPropType,
};

export default AppointmentApp;
