const PROGRESS_KEY = "duck_throne_max_unlocked_level";


export const progressStorage = {
  getUnlockedLevels() { // функция для получения списка открытых уровней
    const saved = localStorage.getItem(PROGRESS_KEY);
    if (!saved) return [1];
    // Когда ты сохраняешь данные в localStorage, браузер не умеет сохранять 
    // массивы (например, [1, 2]). Он умеет сохранять только строки (просто текст).
    return saved.split(",").map(Number);
  },


  // Добавляем новый уровень в список открытых
  unlockLevel(levelId) {
    const currentLevels = this.getUnlockedLevels();
    if (!currentLevels.includes(levelId)) {
      currentLevels.push(levelId);
      //Это превращение массива в строку
      //Чтобы уровни в сохранении всегда шли по порядку (1, 2, 3...), а не в хаотичном порядке
      localStorage.setItem(PROGRESS_KEY, currentLevels.sort((a, b) => a - b).join(","));
      
    }
  },

  resetProgress() {
    localStorage.setItem(PROGRESS_KEY, "1");
  },

  resetAll: () => {
    localStorage.removeItem("duck_throne_max_unlocked_level");
    localStorage.removeItem("duckAchievements");
    localStorage.clear();
    window.location.href = window.location.origin;
  },

  getAchievements: () => {
    const saved = localStorage.getItem("duckAchievements");
    return saved ? JSON.parse(saved) : [];
  },

  // Записываем новую ачивку (вызовем эту команду в конце 3 и 4 главы)
  unlockAchievement: (achievementId) => {
    const current = progressStorage.getAchievements();
    if (!current.includes(achievementId)) {
      current.push(achievementId);
      // Превращаем массив в строку JSON (формат для хранения сложных данных) и сохраняем
      localStorage.setItem("duckAchievements", JSON.stringify(current));
    }
  }

};