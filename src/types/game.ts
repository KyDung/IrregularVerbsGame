import { IrregularVerb } from './verb';

export type GameType =
  | 'quiz'
  | 'input'
  | 'missing'
  | 'matching'
  | 'true_false'
  | 'odd_one_out'
  | 'reorder'
  | 'mistake_review'
  | 'mixed';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface GameConfig {
  verbs: IrregularVerb[];
  questionCount: number;
  difficulty: DifficultyLevel;
  timeLimitPerQuestion?: number; // in seconds, 0 = unlimited
  showMeaning?: boolean;
}

export interface AnswerResult {
  verbId: string;
  gameType: GameType;
  isCorrect: boolean;
  userAnswer: string | string[];
  correctAnswers: string[];
  responseTime: number; // in ms
  timestamp: number;
  promptText?: string;
}

export type QuizQuestionType =
  | 'v1_to_v2'
  | 'v1_to_v3'
  | 'v2_to_v1'
  | 'v3_to_v1'
  | 'v1_meaning_to_v2v3'
  | 'v2_to_v3'
  | 'v3_to_v2'
  | 'meaning_to_v1'
  | 'v1v2_to_v3'
  | 'v1v3_to_v2';

export interface QuizQuestion {
  id: string;
  verb: IrregularVerb;
  type: QuizQuestionType;
  prompt: string;
  subPrompt?: string;
  correctAnswer: string;
  allValidAnswers: string[];
  options: string[]; // 4 choices
  correctOptionIndex: number;
  explanation?: string;
}

export interface MissingFormsQuestion {
  id: string;
  verb: IrregularVerb;
  givenForm: 'v1' | 'v2' | 'v3' | 'v1v2' | 'v1v3' | 'v2v3';
  missingForms: ('v1' | 'v2' | 'v3')[];
  prompt: string;
}

export interface MatchingItem {
  id: string;
  verbId: string;
  text: string;
  type: 'v1' | 'v2' | 'v3' | 'v2v3' | 'meaning';
  matchedId?: string;
}

export interface TrueFalseQuestion {
  id: string;
  verb: IrregularVerb;
  triad: {
    v1: string;
    v2: string;
    v3: string;
  };
  meaning: string;
  isCorrectTriad: boolean;
  correctTriad: {
    v1: string;
    v2: string;
    v3: string;
  };
  explanation?: string;
}

export interface OddOneOutQuestion {
  id: string;
  verbs: IrregularVerb[];
  targetVerbId: string; // The one that does not fit the pattern
  patternGroup: string;
  explanation: string;
}

export interface ReorderQuestion {
  id: string;
  verb: IrregularVerb;
  shuffledForms: { id: string; text: string; formTag: 'v1' | 'v2' | 'v3' }[];
  correctOrder: ('v1' | 'v2' | 'v3')[];
}

export interface GameSession {
  id: string;
  gameType: GameType;
  levelId?: number;
  difficulty: DifficultyLevel;
  questionCount: number;
  currentQuestionIndex: number;
  answers: AnswerResult[];
  startedAt: number;
  completedAt?: number;
  score: number;
  streak: number;
  maxStreak: number;
}
