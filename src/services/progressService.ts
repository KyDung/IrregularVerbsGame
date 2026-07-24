import { UserProgress, MistakeRecord, UserSettings, VerbMastery, LevelStats } from '../types/progress';
import { calculateVerbMastery } from '../utils/masteryCalculator';
import { LEVELS } from '../data/levelsData';

const STORAGE_KEY = 'irregular_verbs_360_user_progress_v1';
const CURRENT_VERSION = 1;

export const ALL_LEVEL_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

export const DEFAULT_SETTINGS: UserSettings = {
  theme: 'system',
  soundEnabled: true,
  soundVolume: 0.5,
  defaultQuestionCount: 20,
  defaultDifficulty: 'medium',
  showVietnameseMeaning: true,
  enableTimeLimit: false,
  unlockAllLevels: true,
};

export const INITIAL_PROGRESS: UserProgress = {
  version: CURRENT_VERSION,
  unlockedLevels: ALL_LEVEL_IDS, // All 18 levels unlocked by default
  completedLevels: [],
  levelStats: {},
  verbMastery: {},
  mistakes: [],
  settings: DEFAULT_SETTINGS,
  lastPlayedAt: Date.now(),
  dailyStreak: 1,
  lastStreakDate: new Date().toISOString().split('T')[0],
};

class ProgressService {
  private cache: UserProgress | null = null;

  public getProgress(): UserProgress {
    if (this.cache) {
      return this.cache;
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        this.cache = INITIAL_PROGRESS;
        this.saveProgress(INITIAL_PROGRESS);
        return INITIAL_PROGRESS;
      }

      const parsed = JSON.parse(raw);
      const migrated = this.migrateSchema(parsed);
      this.cache = migrated;
      return migrated;
    } catch (err) {
      console.error('[ProgressService] Failed to load localStorage data, using defaults:', err);
      this.cache = INITIAL_PROGRESS;
      return INITIAL_PROGRESS;
    }
  }

  public saveProgress(progress: UserProgress): boolean {
    try {
      progress.lastPlayedAt = Date.now();
      this.updateDailyStreak(progress);
      this.cache = progress;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      return true;
    } catch (err) {
      console.error('[ProgressService] Error saving progress:', err);
      return false;
    }
  }

  private updateDailyStreak(progress: UserProgress) {
    const today = new Date().toISOString().split('T')[0];
    if (progress.lastStreakDate === today) {
      return; // Already counted today
    }

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (progress.lastStreakDate === yesterday) {
      progress.dailyStreak += 1;
    } else {
      progress.dailyStreak = 1;
    }
    progress.lastStreakDate = today;
  }

  private migrateSchema(data: any): UserProgress {
    if (!data || typeof data !== 'object') {
      return INITIAL_PROGRESS;
    }

    // Merge settings defaults
    const settings = {
      ...DEFAULT_SETTINGS,
      ...(data.settings || {}),
    };

    // Ensure array integrity
    const unlockedLevels = Array.isArray(data.unlockedLevels) && data.unlockedLevels.length > 0
      ? Array.from(new Set([...data.unlockedLevels, ...ALL_LEVEL_IDS]))
      : ALL_LEVEL_IDS;

    const completedLevels = Array.isArray(data.completedLevels)
      ? Array.from(new Set(data.completedLevels))
      : [];

    return {
      version: CURRENT_VERSION,
      unlockedLevels,
      completedLevels,
      levelStats: data.levelStats || {},
      verbMastery: data.verbMastery || {},
      mistakes: Array.isArray(data.mistakes) ? data.mistakes : [],
      settings,
      lastPlayedAt: typeof data.lastPlayedAt === 'number' ? data.lastPlayedAt : Date.now(),
      dailyStreak: typeof data.dailyStreak === 'number' ? data.dailyStreak : 1,
      lastStreakDate: data.lastStreakDate || new Date().toISOString().split('T')[0],
    };
  }

  public recordAnswerResult(
    verbId: string,
    gameType: string,
    isCorrect: boolean,
    userAnswer: string | string[],
    correctAnswers: string[],
    responseTime: number
  ): UserProgress {
    const progress = this.getProgress();

    // 1. Update Verb Mastery
    const prevMastery = progress.verbMastery[verbId];
    const newMastery = calculateVerbMastery(prevMastery, isCorrect, responseTime);
    progress.verbMastery[verbId] = newMastery;

    // 2. Record or update Mistakes
    if (!isCorrect) {
      const existingMistakeIndex = progress.mistakes.findIndex(m => m.verbId === verbId);
      const userAnswersArr = Array.isArray(userAnswer) ? userAnswer : [userAnswer];

      if (existingMistakeIndex >= 0) {
        const existing = progress.mistakes[existingMistakeIndex];
        progress.mistakes[existingMistakeIndex] = {
          ...existing,
          wrongCount: existing.wrongCount + 1,
          lastWrongAt: Date.now(),
          userAnswers: Array.from(new Set([...existing.userAnswers, ...userAnswersArr])),
          correctCountAfterMistake: 0, // Reset recovery streak
        };
      } else {
        const newRecord: MistakeRecord = {
          verbId,
          gameType,
          askedForm: 'v2_v3',
          wrongCount: 1,
          correctCountAfterMistake: 0,
          lastWrongAt: Date.now(),
          userAnswers: userAnswersArr,
        };
        progress.mistakes.push(newRecord);
      }
    } else {
      // Update mistake recovery count if previously missed
      progress.mistakes = progress.mistakes.map(m => {
        if (m.verbId === verbId) {
          return {
            ...m,
            correctCountAfterMistake: m.correctCountAfterMistake + 1,
          };
        }
        return m;
      });
    }

    this.saveProgress(progress);
    return progress;
  }

  public updateLevelSessionResult(
    levelId: number,
    score: number,
    accuracyPercent: number
  ): { unlockedNext: boolean; progress: UserProgress } {
    const progress = this.getProgress();
    let unlockedNext = false;

    const currentStats: LevelStats = progress.levelStats[levelId] || {
      timesPlayed: 0,
      bestScore: 0,
      bestAccuracy: 0,
      completed: false,
      unlocked: true,
    };

    const isPassed = accuracyPercent >= 70;
    const newTimesPlayed = currentStats.timesPlayed + 1;
    const newBestScore = Math.max(currentStats.bestScore, score);
    const newBestAccuracy = Math.max(currentStats.bestAccuracy, accuracyPercent);

    progress.levelStats[levelId] = {
      timesPlayed: newTimesPlayed,
      bestScore: newBestScore,
      bestAccuracy: newBestAccuracy,
      completed: currentStats.completed || isPassed,
      unlocked: true,
      lastPlayedAt: Date.now(),
    };

    if (isPassed && !progress.completedLevels.includes(levelId)) {
      progress.completedLevels.push(levelId);
    }

    // Unlock next level if passed and next level exists
    if (isPassed && levelId < 18) {
      const nextLevelId = levelId + 1;
      if (!progress.unlockedLevels.includes(nextLevelId)) {
        progress.unlockedLevels.push(nextLevelId);
        unlockedNext = true;
      }
    }

    this.saveProgress(progress);
    return { unlockedNext, progress };
  }

  public isLevelUnlocked(levelId: number): boolean {
    const progress = this.getProgress();
    if (progress.settings.unlockAllLevels) return true;
    return progress.unlockedLevels.includes(levelId);
  }

  public updateSettings(newSettings: Partial<UserSettings>): UserProgress {
    const progress = this.getProgress();
    progress.settings = {
      ...progress.settings,
      ...newSettings,
    };
    this.saveProgress(progress);
    return progress;
  }

  public resetProgress(): UserProgress {
    this.cache = INITIAL_PROGRESS;
    localStorage.removeItem(STORAGE_KEY);
    this.saveProgress(INITIAL_PROGRESS);
    return INITIAL_PROGRESS;
  }

  public exportProgressJSON(): string {
    const progress = this.getProgress();
    return JSON.stringify(progress, null, 2);
  }

  public importProgressJSON(jsonString: string): { success: boolean; message: string; progress?: UserProgress } {
    try {
      const parsed = JSON.parse(jsonString);
      const migrated = this.migrateSchema(parsed);
      this.saveProgress(migrated);
      return {
        success: true,
        message: 'Nhập dữ liệu tiến độ thành công!',
        progress: migrated,
      };
    } catch (err) {
      return {
        success: false,
        message: `Lỗi nhập dữ liệu: ${err instanceof Error ? err.message : 'Tệp JSON không hợp lệ'}`,
      };
    }
  }
}

export const progressService = new ProgressService();
