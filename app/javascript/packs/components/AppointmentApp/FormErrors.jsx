import React from 'react';
import PropTypes from 'prop-types';
import { humanize } from '../utils';

const FormErrors = ({ formErrors }) => {
  const fieldNames = Object.keys(formErrors);
  const errorCount = fieldNames.reduce((acc, name) => acc + formErrors[name].length, 0);

  return (
    errorCount > 0 && (
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

FormErrors.propTypes = {
  formErrors: PropTypes.object.isRequired,
};

export default FormErrors;
