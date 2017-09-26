import React from 'react';
import PropTypes from 'prop-types';
import { isoDatetimeStringPropType } from '../propTypes';
import { formatDateTime } from '../utils';

const appointmentPath = id => `/appointments/${id}`;

const Appointment = ({ id, title, startTime }) => (
  <li className="list-group-item">
    <div className="d-flex flex-row">
      <div className="mr-auto p-2">
        <a href={appointmentPath(id)}>
          <strong>{title}</strong>
        </a>
      </div>
      <div className="p-2">
        <span>{formatDateTime(startTime)}</span>
      </div>
    </div>
  </li>
);

Appointment.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  startTime: isoDatetimeStringPropType,
};

export default Appointment;
