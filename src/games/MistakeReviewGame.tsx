import React, { useState, useEffect } from 'react';
import { IrregularVerb } from '../types/verb';
import { MistakeRecord } from '../types/progress';
import { QuizGame } from './QuizGame';
import { InputGame } from './InputGame';
import { AnswerResult } from '../types/game';
import { BookmarkCheck, AlertCircle } from 'lucide-react';

interface MistakeReviewGameProps {
  allVerbs: IrregularVerb[];
  mistakes: MistakeRecord[];
  soundEnabled?: boolean;
  onCompleteSession: (results: AnswerResult[], score: number, accuracyPercent: number) => void;
  onExit: () => void;
}

export const MistakeReviewGame: React.FC<MistakeReviewGameProps> = ({
  allVerbs,
  mistakes,
  soundEnabled = true,
  onCompleteSession,
  onExit,
}) => {
  const [reviewVerbs, setReviewVerbs] = useState<IrregularVerb[]>([]);
  const [gameMode, setGameMode] = useState<'quiz' | 'input'>('quiz');

  useEffect(() => {
    if (!mistakes || mistakes.length === 0) return;

    // Sort mistakes by priority algorithm (wrongCount descending, recent time)
    const sortedMistakes = [...mistakes].sort((a, b) => {
      if (b.wrongCount !== a.wrongCount) {
        return b.wrongCount - a.wrongCount;
      }
      return b.lastWrongAt - a.lastWrongAt;
    });

    const targetIds = sortedMistakes.map(m => m.verbId);
    const filteredVerbs = allVerbs.filter(v => targetIds.includes(v.id));

    setReviewVerbs(filteredVerbs);
  }, [allVerbs, mistakes]);

  if (mistakes.length === 0 || reviewVerbs.length === 0) {
    return (
      <div className="max-w-md mx-auto p-6 glass-card text-center space-y-4 my-12">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
          <BookmarkCheck className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-black text-slate-900 dark:text-white">
          Sổ từ sai trống!
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Chúc mừng bạn! Bạn chưa có câu trả lời sai nào cần ôn tập lại. Hãy tiếp tục thử thách các màn học mới.
        </p>
        <button
          onClick={onExit}
          className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-md"
        >
          Quay lại màn học
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mode selection banner */}
      <div className="max-w-2xl mx-auto px-4 pt-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold">
          <AlertCircle className="w-4 h-4" />
          <span>Đang ôn tập {reviewVerbs.length} từ trong Sổ từ sai</span>
        </div>

        <div className="p-1 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center gap-1">
          <button
            onClick={() => setGameMode('quiz')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
              gameMode === 'quiz' ? 'bg-white dark:bg-slate-700 text-brand-600 shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Dạng Quiz
          </button>
          <button
            onClick={() => setGameMode('input')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
              gameMode === 'input' ? 'bg-white dark:bg-slate-700 text-brand-600 shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Dạng Nhập
          </button>
        </div>
      </div>

      {gameMode === 'quiz' ? (
        <QuizGame
          verbs={reviewVerbs}
          allVerbs={allVerbs}
          questionCount={reviewVerbs.length}
          soundEnabled={soundEnabled}
          onCompleteSession={onCompleteSession}
          onExit={onExit}
        />
      ) : (
        <InputGame
          verbs={reviewVerbs}
          questionCount={reviewVerbs.length}
          soundEnabled={soundEnabled}
          onCompleteSession={onCompleteSession}
          onExit={onExit}
        />
      )}
    </div>
  );
};
