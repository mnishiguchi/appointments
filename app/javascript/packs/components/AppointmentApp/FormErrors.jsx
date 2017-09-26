import React from 'react';
import PropTypes from 'prop-types';
import { humanize } from '../utils';

// http://silvio-r.github.io/spop/
const FormErrors = ({ formErrors }) => {
  const fieldNames = Object.keys(formErrors);
  const errorCount = fieldNames.reduce((acc, name) => acc + formErrors[name].length, 0);

  if (errorCount > 0) {
    const listItems = fieldNames.map(fieldName =>
      formErrors[fieldName].map(error => {
        const humanizedError = humanize(`${fieldName} ${error}`);
        return `<p>${humanizedError}</p>`;
      }),
    );

    const template = `<div>${listItems.join('')}</div>`;

    if (document.querySelector('#spop--FormErrors')) {
      document.querySelector('#spop--FormErrors .spop-body>div').innerHTML = template;
    } else {
      spop({
        template,
        group: 'FormErrors',
        autoclose: 10000,
        style: 'error',
      });
    }
  }

  return <div />;
};

FormErrors.propTypes = {
  formErrors: PropTypes.object.isRequired,
};

export default FormErrors;
