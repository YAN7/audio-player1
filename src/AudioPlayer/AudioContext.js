import { createContext } from "react";

const AudioContext = createContext({
  isPlaying: true,
  isLoading: false,
  timeProgress: 0,
  timeStrings: { left: "0:00", passed: "0:00" },
  setPlayFrom: () => {},
  setIsPlaying: () => {}
});

export default AudioContext;
