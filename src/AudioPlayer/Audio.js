import React from "react";
import PropTypes from "prop-types";

import { isEmpty } from "lodash";

const padZero = number => ("0" + number).substr(-2);
const secondsToString = seconds =>
  `${Math.floor(seconds / 60)}:${padZero(Math.floor(seconds % 60))}`;

class Audio extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.state = { canPlay: false };

    this.timeLoaded = false;

    this.setMuted = this.setMuted.bind(this);
    this.canPlayHandler = this.canPlayHandler.bind(this);
    this.controllAudio = this.controllAudio.bind(this);
    this.timeUpdateHandler = this.timeUpdateHandler.bind(this);
    this.waitForUserInteration = this.waitForUserInteration.bind(this);
  }

  componentDidMount() {
    this.controllAudio(null);
  }

  componentDidUpdate(prevProps) {
    this.controllAudio(prevProps);
  }

  controllAudio(prevProps) {
    const { canPlay } = this.state;
    const { isPlaying, playFrom } = this.props;
    if (!canPlay) return;

    const shouldComapareProps = isEmpty(prevProps);

    if (shouldComapareProps || isPlaying !== prevProps.isPlaying) {
      this.setPlayingState();
    }

    if (shouldComapareProps || playFrom !== prevProps.playFrom) {
      this.setCurrentTime();
    }
  }

  setPlayingState() {
    const audio = this.audioRef.current;
    if (this.props.isPlaying) {
      audio.play().catch(this.waitForUserInteration);
    } else {
      audio.pause();
    }
  }

  setMuted(isMuted) {
    this.audioRef.current.muted = isMuted;
  }

  waitForUserInteration(err) {
    const component = this;
    window.addEventListener("click", function interactionListener() {
      component.setPlayingState();
      window.removeEventListener("click", interactionListener);
    });
  }

  setCurrentTime() {
    const audio = this.audioRef.current;
    audio.currentTime = (audio.duration / 100) * this.props.playFrom;
  }

  canPlayHandler() {
    if (this.state.canPlay) return;
    this.setState({ canPlay: true }, () => this.controllAudio(null));
  }

  timeUpdateHandler() {
    const audio = this.audioRef.current;
    const percent = audio.currentTime / (audio.duration / 100);
    const timeFromStart = secondsToString(audio.currentTime);
    const timeLeft = secondsToString(audio.duration - audio.currentTime);
    this.props.onTimeChange(percent, timeFromStart, timeLeft);
  }

  onCanPlayThrough() {
    const { onLoadingChange } = this.props;
    if (!this.timeLoaded) this.setCurrentTime();
    this.timeLoaded = true;
    onLoadingChange(false);
  }

  onWaiting() {
    const { onLoadingChange } = this.props;
    onLoadingChange(true);
  }

  render() {
    const { src, onEnded } = this.props;

    return (
      <audio
        ref={this.audioRef}
        src={src}
        onCanPlay={this.canPlayHandler}
        onLoadedMetadata={this.canPlayHandler}
        onTimeUpdate={this.timeUpdateHandler}
        onCanPlayThrough={() => this.onCanPlayThrough()}
        onSeeking={() => this.setMuted(true)}
        onSeeked={() => this.setMuted(false)}
        onWaiting={() => this.onWaiting()}
        onEnded={onEnded}
      />
    );
  }
}

Audio.propTypes = {
  playFrom: PropTypes.number,
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  onLoadingChange: PropTypes.func.isRequired,
  onTimeChange: PropTypes.func.isRequired,
  onEnded: PropTypes.func.isRequired
};

Audio.defaultProps = {
  playFrom: 0
};

export default Audio;
