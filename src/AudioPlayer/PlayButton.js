import React, { useContext } from "react";
import cx from "classnames";

import AudioContext from "./AudioContext";
import {
  iconButtonDefaultProps,
  iconButtonPropTypes,
  PlayIcon
} from "./constants";

const PlayButton = ({ className, disabled, size }) => {
  const context = useContext(AudioContext);

  return (
    <PlayIcon
      size={size}
      className={cx({
        "audio-icon-button": true,
        disabled: disabled,
        [className]: true
      })}
      onClick={() => context.setIsPlaying(true)}
    />
  );
};

PlayButton.propTypes = iconButtonPropTypes;
PlayButton.defaultProps = iconButtonDefaultProps;

export default PlayButton;
