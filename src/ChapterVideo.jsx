import React from "react";
import "./App.css";

function ChapterVideo({ videoSrc, onVideoEnd }) {
  return (
    <div className="video-fullscreen-container">
      <video
        src={videoSrc}
        autoPlay       // Видео запускается само при открытии экрана
        controls       // Добавляет стандартную полосу перемотки и звука
        onEnded={onVideoEnd} // Браузер сам вызовет функцию закрытия, когда видео кончится
      />
      
      {/* Кнопка пропуска видео в зловещем стиле */}
      <button className="skip-video-btn" onClick={onVideoEnd}>
        Skip Cutscene ➜
      </button>
    </div>
  );
}

export default ChapterVideo;