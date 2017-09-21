import React from 'react';
import PropTypes from 'prop-types';
import { formatDateTime } from '../utils';

const Appointment = ({ title, startTime }) => (
  <li className="list-group-item">
    <div className="d-flex flex-row">
      <div className="mr-auto p-2">
        <strong>{title}</strong>
      </div>
      <div className="p-2">
        <span>{formatDateTime(startTime)}</span>
      </div>
    </div>
  </li>
);

Appointment.propTypes = {
  title: PropTypes.string,
  startTime: PropTypes.string,
};

export default Appointment;
