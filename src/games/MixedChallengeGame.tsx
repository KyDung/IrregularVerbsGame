import React, { useState } from 'react';
import { IrregularVerb } from '../types/verb';
import { QuizGame } from './QuizGame';
import { InputGame } from './InputGame';
import { TrueFalseGame } from './TrueFalseGame';
import { ReorderGame } from './ReorderGame';
import { AnswerResult } from '../types/game';
import { Zap } from 'lucide-react';

interface MixedChallengeGameProps {
  verbs: IrregularVerb[];
  allVerbs: IrregularVerb[];
  soundEnabled?: boolean;
  onCompleteSession: (results: AnswerResult[], score: number, accuracyPercent: number) => void;
  onExit: () => void;
}

export const MixedChallengeGame: React.FC<MixedChallengeGameProps> = ({
  verbs,
  allVerbs,
  soundEnabled = true,
  onCompleteSession,
  onExit,
}) => {
  const [started, setStarted] = useState(false);
  const [selectedSubGame, setSelectedSubGame] = useState<'quiz' | 'input' | 'true_false' | 'reorder' | 'matching'>('quiz');
  const [questionCount, setQuestionCount] = useState(20);
  const [timeLimit, setTimeLimit] = useState(0);

  if (!started) {
    return (
      <div className="max-w-lg mx-auto p-6 sm:p-8 glass-card space-y-6 text-center my-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-brand-500/30">
          <Zap className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Thử thách tổng hợp 360
          </h2>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Tùy chọn số lượng câu hỏi và chế độ thời gian để rèn luyện phản xạ toàn diện.
          </p>
        </div>

        {/* Game Mode Picker */}
        <div className="space-y-2 text-left">
          <label className="block text-xs font-bold text-slate-500 uppercase">Chế độ game ưu tiên</label>
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            {[
              { id: 'quiz', label: 'Trắc nghiệm Quiz' },
              { id: 'input', label: 'Nhập V2–V3' },
              { id: 'true_false', label: 'Đúng hay Sai' },
              { id: 'reorder', label: 'Sắp xếp V1-V2-V3' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedSubGame(item.id as any)}
                className={`p-3 rounded-xl border-2 font-bold text-center transition-all ${
                  selectedSubGame === item.id
                    ? 'border-brand-500 bg-brand-50 dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Question Count Picker */}
        <div className="space-y-2 text-left">
          <label className="block text-xs font-bold text-slate-500 uppercase">Số lượng câu hỏi</label>
          <div className="grid grid-cols-3 gap-2 text-xs font-bold">
            {[10, 20, 40].map(count => (
              <button
                key={count}
                onClick={() => setQuestionCount(count)}
                className={`p-3 rounded-xl border-2 font-bold text-center transition-all ${
                  questionCount === count
                    ? 'border-brand-500 bg-brand-50 dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {count} câu
              </button>
            ))}
          </div>
        </div>

        {/* Time Limit Picker */}
        <div className="space-y-2 text-left">
          <label className="block text-xs font-bold text-slate-500 uppercase">Thời gian mỗi câu</label>
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            {[
              { seconds: 0, label: 'Không giới hạn' },
              { seconds: 15, label: '15 giây / câu' },
            ].map(item => (
              <button
                key={item.seconds}
                onClick={() => setTimeLimit(item.seconds)}
                className={`p-3 rounded-xl border-2 font-bold text-center transition-all ${
                  timeLimit === item.seconds
                    ? 'border-brand-500 bg-brand-50 dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <div className="pt-4 flex items-center gap-3">
          <button
            onClick={onExit}
            className="w-1/3 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-sm text-slate-600 dark:text-slate-300"
          >
            Quay lại
          </button>
          <button
            onClick={() => setStarted(true)}
            className="w-2/3 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-black text-base shadow-lg shadow-brand-500/25"
          >
            Bắt đầu thử thách
          </button>
        </div>
      </div>
    );
  }

  // Render chosen sub-game
  switch (selectedSubGame) {
    case 'input':
      return (
        <InputGame
          verbs={verbs}
          questionCount={questionCount}
          soundEnabled={soundEnabled}
          onCompleteSession={onCompleteSession}
          onExit={onExit}
        />
      );
    case 'true_false':
      return (
        <TrueFalseGame
          verbs={verbs}
          allVerbs={allVerbs}
          questionCount={questionCount}
          soundEnabled={soundEnabled}
          onCompleteSession={onCompleteSession}
          onExit={onExit}
        />
      );
    case 'reorder':
      return (
        <ReorderGame
          verbs={verbs}
          questionCount={questionCount}
          soundEnabled={soundEnabled}
          onCompleteSession={onCompleteSession}
          onExit={onExit}
        />
      );
    default:
      return (
        <QuizGame
          verbs={verbs}
          allVerbs={allVerbs}
          questionCount={questionCount}
          timeLimit={timeLimit}
          soundEnabled={soundEnabled}
          onCompleteSession={onCompleteSession}
          onExit={onExit}
        />
      );
  }
};
