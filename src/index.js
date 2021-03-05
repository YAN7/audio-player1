import React from "react";
import ReactDOM from "react-dom";

import AudioPlayer from "./AudioPlayer";

import "./styles.css";

const AUDIO_LINK =
  "https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview71/v4/b4/28/82/b4288211-ba32-6959-21f8-c745e52ebd07/mzaf_980642197535082837.plus.aac.p.m4a";

function App() {
  return (
    <div className="App">
      <h1>Broken Bells</h1>
      <div className="song-container" style={{ maxWidth: 600 }}>
        <img alt="cover" src="http://i.imgur.com/JGueLD4.jpg" />
        <div className="song-content">
          <div className="song-title">Holding On For Life</div>
          <div className="song-album">After the Disco</div>
          <AudioPlayer src={AUDIO_LINK} />
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
