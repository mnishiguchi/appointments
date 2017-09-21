import React from 'react';
import axios from 'axios';
import { getCsrfToken, underscoreKeys, camelizeKeys } from '../utils';
import appointmentsPropType from '../types/appointmentsPropType';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';

class AppointmentApp extends React.PureComponent {
  state = {
    appointments: camelizeKeys(this.props.appointments) || [],
  };

  handleFormSubmit = appointmentFormObject => {
    const params = {
      appointment: underscoreKeys(appointmentFormObject),
      authenticity_token: getCsrfToken(),
    };
    axios
      .post('/appointments.json', params)
      .then(response => {
        const newAppointment = response.data;
        this.addAppointment(newAppointment);
      })
      .catch(error => {
        console.log(error.response);
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

  render() {
    const { appointments } = this.state;
    return (
      <div className="AppointmentApp">
        <h4>Make a new appointment</h4>
        <div className="row">
          <div className="col-lg-4">
            <AppointmentForm onSubmit={this.handleFormSubmit} />
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
