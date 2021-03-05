import React, { useContext } from "react";
import cx from "classnames";

import AudioContext from "./AudioContext";
import {
  iconButtonDefaultProps,
  iconButtonPropTypes,
  PauseIcon
} from "./constants";

const PauseButton = ({ className, disabled, size }) => {
  const context = useContext(AudioContext);

  return (
    <PauseIcon
      size={size}
      className={cx({
        "audio-icon-button": true,
        disabled: disabled,
        [className]: true
      })}
      onClick={() => context.setIsPlaying(false)}
    />
  );
};

PauseButton.propTypes = iconButtonPropTypes;
PauseButton.defaultProps = iconButtonDefaultProps;

export default PauseButton;
