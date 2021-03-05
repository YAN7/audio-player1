import React, { useContext } from "react";
import { animated, useSpring } from "react-spring";

import AudioContext from "./AudioContext";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";

const scaleString = scale => `scale(${scale})`;
const getButtonStyles = props => ({
  display: "inline-block",
  opacity: props.opacity,
  position: props.position,
  transform: props.scale.interpolate(scaleString)
});

const TogglePlayButton = () => {
  const context = useContext(AudioContext);
  const pauseProps = useSpring({
    opacity: context.isPlaying ? 1 : 0,
    scale: context.isPlaying ? 1 : 0,
    position: context.isPlaying ? "relative" : "absolute"
  });
  const playProps = useSpring({
    opacity: context.isPlaying ? 0 : 1,
    scale: context.isPlaying ? 0 : 1,
    position: context.isPlaying ? "absolute" : "relative"
  });
  return (
    <div className="toggle-button-container">
      <animated.div style={getButtonStyles(pauseProps)}>
        <PauseButton />
      </animated.div>
      <animated.div style={getButtonStyles(playProps)}>
        <PlayButton />
      </animated.div>
    </div>
  );
};

export default TogglePlayButton;
