import React, { useContext, useState, useRef } from "react";
import PropTypes from "prop-types";

import { clamp } from "lodash";
import { useSpring, animated } from "react-spring";
import { useGesture } from "react-use-gesture";
import cx from "classnames";

import AudioContext from "./AudioContext";

const getClientRect = ref => {
  const offsets = ref.current.getBoundingClientRect();
  return offsets;
};

const getBarStyles = props => ({
  width: props.width
});
const getCaretStyles = props => ({
  left: props.width
});

const Spinner = ({ className, withTime }) => {
  const progressBar = useRef(null);
  const context = useContext(AudioContext);
  const [isDargging, setIsDargging] = useState(false);
  const [draggingProgress, setDraggingProgress] = useState(0);

  const props = useSpring({
    width: `${isDargging ? draggingProgress : context.timeProgress}%`
  });

  const maoveProgress = (last, x) => {
    const { left, width } = getClientRect(progressBar);
    const progressInPixels = x - left;
    const progress = progressInPixels / (width / 100);
    setDraggingProgress(clamp(progress, 0, 100));
    if (!last) return;
    context.setPlayFrom(clamp(progress, 0, 100));
    setIsDargging(false);
  };

  const handleProgressClick = e => {
    maoveProgress(true, e.clientX);
  };

  const bind = useGesture({
    onDrag: ({ last, xy }) => maoveProgress(last, xy[0]),
    onDragStart: () => setIsDargging(true)
  });

  const { left, passed } = context.timeStrings;

  return (
    <React.Fragment>
      {withTime && <div className="time-container passed">{passed}</div>}
      <div
        ref={progressBar}
        className={cx({
          [className]: true,
          "progress-bar-container": true
        })}
        onClick={handleProgressClick}
      >
        <animated.div
          {...bind()}
          className="progress-bar-caret"
          style={getCaretStyles(props)}
        />
        <animated.div className="progress-bar" style={getBarStyles(props)} />
      </div>
      {withTime && <div className="time-container">-{left}</div>}
    </React.Fragment>
  );
};

Spinner.PropTypes = {
  withTime: PropTypes.bool,
  className: PropTypes.className
};

Spinner.defaultProps = {
  withTime: true,
  className: ""
};

export default Spinner;
