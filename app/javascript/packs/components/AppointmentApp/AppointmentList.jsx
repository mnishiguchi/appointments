import React from 'react';
import appointmentsPropType from '../types/appointmentsPropType';
import Appointment from './Appointment';

const AppointmentList = ({ appointments }) => (
  <ul className="list-group">
    {appointments.map(appointment => (
      <Appointment
        title={appointment.title}
        startTime={appointment.startTime}
        key={appointment.id}
      />
    ))}
  </ul>
);

AppointmentList.propTypes = {
  appointments: appointmentsPropType,
};

export default AppointmentList;
