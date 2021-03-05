import React from "react";
import PropTypes from "prop-types";

import Audio from "./Audio";
import TogglePlayButton from "./TogglePlayButton";
import AudioContext from "./AudioContext";
import Spinner from "./Spinner";
import ProgresBar from "./ProgressBar";

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      isLoading: false,
      timeStrings: { left: "0:00", passed: "0:00" },
      timeProgress: props.playFrom,
      playFrom: props.playFrom
    };

    this.setTimeProgress = this.setTimeProgress.bind(this);
    this.setPlayFrom = this.setPlayFrom.bind(this);
    this.setIsPlaying = this.setIsPlaying.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.onEnded = this.onEnded.bind(this);
  }

  getContextValue() {
    return {
      isPlaying: this.state.isPlaying,
      isLoading: this.state.isLoading,
      timeProgress: this.state.timeProgress,
      timeStrings: this.state.timeStrings,
      setIsPlaying: this.setIsPlaying,
      setPlayFrom: this.setPlayFrom
    };
  }

  setPlayFrom(playFrom) {
    this.setState({ playFrom });
  }

  setLoading(isLoading) {
    this.setState({ isLoading });
  }

  setIsPlaying(isPlaying) {
    this.setState({ isPlaying });
  }

  setTimeProgress(timeProgress, passed, left) {
    this.setState({ timeProgress, timeStrings: { passed, left } });
  }

  onEnded() {
    this.setState({ isPlaying: false, playFrom: 0 });
  }

  render() {
    const { src } = this.props;
    const { isPlaying, playFrom } = this.state;

    return (
      <AudioContext.Provider value={this.getContextValue()}>
        <Audio
          isPlaying={isPlaying}
          src={src}
          playFrom={playFrom}
          onLoadingChange={this.setLoading}
          onTimeChange={this.setTimeProgress}
          onEnded={this.onEnded}
        />
        <div className="audio-controls-container">
          <TogglePlayButton />
          <Spinner />
          <ProgresBar />
        </div>
      </AudioContext.Provider>
    );
  }
}

AudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  playFrom: PropTypes.number
};

AudioPlayer.defaultProps = {
  playFrom: 0
};

export default AudioPlayer;
