import PropTypes from 'prop-types';

// 2017-09-26T04:00:00.000Z
export const isoDatetimeStringPropType = (
  propValue,
  key,
  componentName,
  location,
  propFullName,
) => {
  const isoDateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
  if (!isoDateTimeRegex.test(propValue[key])) {
    return new Error(
      `Invalid prop ${propFullName} supplied to "${componentName}": ${propValue[key]}`,
    );
  }
};
