import moment from 'moment';
import humps from 'humps';
import S from 'string';

export const formatDateTime = dateTime =>
  moment
    .utc(dateTime)
    .utcOffset(moment().utcOffset)
    .format('MMM Do YYYY, h:mma');

export const camelizeKeys = object => humps.camelizeKeys(object);
export const underscoreKeys = object => humps.decamelizeKeys(object);

export const getCsrfToken = () => document.querySelector('meta[name="csrf-token"]').content;

export const humanize = string => S(string).humanize().s;

// http://silvio-r.github.io/spop/
export const setSuccessPopup = (message, tag = 'successPopup') => {
  const template = `<div>${message}</div>`;

  if (document.querySelector(`#spop--${tag}`)) {
    document.querySelector(`#spop--${tag} .spop-body>div`).innerHTML = template;
  } else {
    spop({
      template,
      group: tag,
      autoclose: 10000,
      style: 'success',
    });
  }
};

export const setErrorMessages = (formErrors, tag = 'errorPopup') => {
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

    if (document.querySelector(`#spop--${tag}`)) {
      document.querySelector(`#spop--${tag} .spop-body>div`).innerHTML = template;
    } else {
      spop({
        template,
        group: tag,
        autoclose: 10000,
        style: 'error',
      });
    }
  }
};

export const closePopup = tag => {
  const element = document.querySelector(`#spop--${tag}`);
  if (element) element.remove();
};

export const closeErrorPopup = (tag = 'errorPopup') => closePopup(tag);
