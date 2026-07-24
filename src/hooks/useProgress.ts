import { useState, useEffect, useCallback } from 'react';
import { UserProgress, UserSettings } from '../types/progress';
import { progressService } from '../services/progressService';

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => progressService.getProgress());

  const refreshProgress = useCallback(() => {
    const updated = progressService.getProgress();
    setProgress({ ...updated });
  }, []);

  useEffect(() => {
    // Initial sync
    refreshProgress();

    // Listen to storage changes across tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'irregular_verbs_360_user_progress_v1') {
        refreshProgress();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refreshProgress]);

  const updateSettings = useCallback((newSettings: Partial<UserSettings>) => {
    const updated = progressService.updateSettings(newSettings);
    setProgress({ ...updated });
  }, []);

  const recordAnswerResult = useCallback((
    verbId: string,
    gameType: string,
    isCorrect: boolean,
    userAnswer: string | string[],
    correctAnswers: string[],
    responseTime: number
  ) => {
    const updated = progressService.recordAnswerResult(
      verbId,
      gameType,
      isCorrect,
      userAnswer,
      correctAnswers,
      responseTime
    );
    setProgress({ ...updated });
  }, []);

  const updateLevelSessionResult = useCallback((
    levelId: number,
    score: number,
    accuracyPercent: number
  ) => {
    const res = progressService.updateLevelSessionResult(levelId, score, accuracyPercent);
    setProgress({ ...res.progress });
    return res;
  }, []);

  const resetProgress = useCallback(() => {
    const res = progressService.resetProgress();
    setProgress({ ...res });
  }, []);

  const importProgressJSON = useCallback((jsonString: string) => {
    const res = progressService.importProgressJSON(jsonString);
    if (res.success && res.progress) {
      setProgress({ ...res.progress });
    }
    return res;
  }, []);

  return {
    progress,
    settings: progress.settings,
    refreshProgress,
    updateSettings,
    recordAnswerResult,
    updateLevelSessionResult,
    resetProgress,
    importProgressJSON,
    exportProgressJSON: () => progressService.exportProgressJSON(),
    isLevelUnlocked: (lvl: number) => progressService.isLevelUnlocked(lvl),
  };
}
