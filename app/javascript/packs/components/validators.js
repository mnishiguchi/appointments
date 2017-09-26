import moment from 'moment';

export function validateMinLength(string, minLength) {
  if (string.trim().length < minLength) {
    return `length must be at least ${minLength} characters`;
  }
}

export function validateMaxLength(string, maxLength) {
  if (string.trim().length > maxLength) {
    return `length should be a maximum of ${maxLength} characters`;
  }
}

export function validateFutureTime(datetime) {
  if (!moment(datetime).isValid()) {
    return 'must be a valid datetime';
  }
  if (!moment(datetime).isAfter()) {
    return 'must be a future datetime';
  }
}
