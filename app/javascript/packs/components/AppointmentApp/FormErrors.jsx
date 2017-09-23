import React from 'react';
import PropTypes from 'prop-types';
import { humanize } from '../utils';

const FormErrors = ({ formErrors }) => {
  const fieldNames = Object.keys(formErrors);
  return (
    fieldNames.length > 0 && (
      <div className="alert alert-danger" role="alert">
        <ul style={{ marginBottom: '0' }}>
          {fieldNames.map(fieldName =>
            formErrors[fieldName].map(error => <li>{humanize(`${fieldName} ${error}`)}</li>),
          )}
        </ul>
      </div>
    )
  );
};

FormErrors.propTypes = {};

export default FormErrors;
