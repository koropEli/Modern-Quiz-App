const PROGRESS_KEY = "duck_throne_max_unlocked_level";



export const progressStorage = {
  getUnlockedLevels() {
    const saved = localStorage.getItem(PROGRESS_KEY);
    if (!saved) return [1];
    
    // Если сохранение есть, превращаем строку (например "1,2,3") обратно в массив чисел [1, 2, 3]
    return saved.split(",").map(Number);
  },


  // Добавляем новый уровень в список открытых
  unlockLevel(levelId) {
    const currentLevels = this.getUnlockedLevels();
    if (!currentLevels.includes(levelId)) {
      currentLevels.push(levelId);
      // Сортируем для порядка и сохраняем как строку через запятую
      localStorage.setItem(PROGRESS_KEY, currentLevels.sort((a, b) => a - b).join(","));
    }
  },

  // Сброс прогресса до самого первого уровня
  resetProgress() {
    localStorage.setItem(PROGRESS_KEY, "1");
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
      localStorage.setItem("duckAchievements", JSON.stringify(current));
    }
  }


};