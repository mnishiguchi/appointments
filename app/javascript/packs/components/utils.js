import moment from 'moment';
import humps from 'humps';

// import { format } from 'date-fns';
// export const formatDateTime = dateTime => format(dateTime, 'MMM Do, YYYY, h:mma');
export const formatDateTime = dateTime => moment(dateTime).format('MMM Do YYYY, h:mma');

export const camelizeKeys = object => humps.camelizeKeys(object);
export const underscoreKeys = object => humps.decamelizeKeys(object);

export const getCsrfToken = () => document.querySelector('meta[name="csrf-token"]').content;
