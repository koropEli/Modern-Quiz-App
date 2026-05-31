import React from "react";

function ChapterVideo({ videoSrc, onVideoEnd }) {
  return (
    <div className="video-cutscene-container">
      <video
        className="fullscreen-video" 
        src={videoSrc}
        autoPlay
        onEnded={onVideoEnd}
      />
      <button className="skip-video-btn" onClick={onVideoEnd}>
        Skip Cutscene ➜
      </button>
    </div>
  );
}

export default ChapterVideo;