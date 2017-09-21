import PropTypes from 'prop-types';

const appointmentsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    startTime: PropTypes.string,
  }),
);

export default appointmentsPropType;
