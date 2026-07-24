export type MasteryStatus = 'new' | 'learning' | 'reviewing' | 'mastered';

export interface VerbMastery {
  seenCount: number;
  correctCount: number;
  wrongCount: number;
  correctStreak: number;
  averageResponseTime: number; // in ms
  lastReviewedAt: number; // timestamp
  masteryScore: number; // 0 - 100
  status: MasteryStatus;
}

export interface MistakeRecord {
  verbId: string;
  gameType: string;
  askedForm: string;
  wrongCount: number;
  correctCountAfterMistake: number;
  lastWrongAt: number;
  userAnswers: string[];
}

export interface LevelStats {
  timesPlayed: number;
  bestScore: number;
  bestAccuracy: number; // 0 - 100
  completed: boolean;
  unlocked: boolean;
  lastPlayedAt?: number;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  soundEnabled: boolean;
  soundVolume: number; // 0 - 1
  defaultQuestionCount: number;
  defaultDifficulty: 'easy' | 'medium' | 'hard';
  showVietnameseMeaning: boolean;
  enableTimeLimit: boolean;
  unlockAllLevels: boolean;
}

export interface UserProgress {
  version: number; // schema version e.g. 1
  unlockedLevels: number[];
  completedLevels: number[];
  levelStats: Record<number, LevelStats>;
  verbMastery: Record<string, VerbMastery>;
  mistakes: MistakeRecord[];
  settings: UserSettings;
  lastPlayedAt: number;
  dailyStreak: number;
  lastStreakDate: string; // YYYY-MM-DD
}
