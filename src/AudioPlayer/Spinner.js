import React, { useContext } from "react";
import PropTypes from "prop-types";

import { useSpring, animated } from "react-spring";

import MDSpinner from "react-md-spinner";

import AudioContext from "./AudioContext";

const scaleString = scale => `scale(${scale})`;
const getStyles = props => ({
  display: "inline-block",
  opacity: props.opacity,
  width: props.width,
  transform: props.scale.interpolate(scaleString)
});

const Spinner = ({ isActive, color, size, borderSize }) => {
  const context = useContext(AudioContext);

  const props = useSpring({
    width: context.isLoading ? size : 0,
    opacity: context.isLoading ? 1 : 0,
    scale: context.isLoading ? 1 : 0
  });
  return (
    <animated.div style={getStyles(props)}>
      <MDSpinner singleColor={color} size={size} borderSize={borderSize} />
    </animated.div>
  );
};

Spinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  borderSize: PropTypes.number
};

Spinner.defaultProps = {
  color: "black",
  size: 18,
  borderSize: 3.5
};

export default Spinner;
