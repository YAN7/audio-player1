import PropTypes from "prop-types";
import { FaPause, FaPlay } from "react-icons/fa";

export const PauseIcon = FaPause;
export const PlayIcon = FaPlay;

export const iconButtonPropTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export const iconButtonDefaultProps = {
  disabled: false,
  className: "",
  size: 20
};
