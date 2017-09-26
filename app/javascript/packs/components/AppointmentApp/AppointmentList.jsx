import React from 'react';
import PropTypes from 'prop-types';
import { isoDatetimeStringPropType } from '../propTypes';
import Appointment from './Appointment';

const AppointmentList = ({ appointments }) => (
  <ul className="list-group">
    {appointments.map(appointment => (
      <Appointment
        id={appointment.id}
        title={appointment.title}
        startTime={appointment.startTime}
        key={appointment.id}
      />
    ))}
  </ul>
);

AppointmentList.propTypes = {
  appointments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      startTime: isoDatetimeStringPropType,
    }),
  ),
};

export default AppointmentList;
