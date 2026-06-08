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
  }
};