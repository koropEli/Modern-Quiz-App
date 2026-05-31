import React from "react";
import "./App.css";

// Принимает путь к видеофайлу и функцию, выполняемую при завершении просмотра
function ChapterVideo({ videoSrc, onVideoEnd }) {
  return (
    <div className="video-fullscreen-container">
      <video
        src={videoSrc}
        autoPlay       // Видео запускается само при открытии экрана
        controls       // Добавляет стандартную полосу перемотки и звука
        playsInline    // Корректное отображение плеера на смартфонах
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