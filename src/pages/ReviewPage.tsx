import React from 'react';
import { useProgress } from '../hooks/useProgress';
import { IRREGULAR_VERBS } from '../data/verbsData';
import { BookmarkCheck, Play, AlertCircle, CheckCircle2 } from 'lucide-react';
import { formatAnswersDisplay } from '../utils/answerNormalizer';

interface ReviewPageProps {
  onNavigate: (route: string) => void;
  onLaunchMistakeGame: () => void;
}

export const ReviewPage: React.FC<ReviewPageProps> = ({
  onNavigate,
  onLaunchMistakeGame,
}) => {
  const { progress } = useProgress();
  const mistakes = progress.mistakes;

  const mistakesWithVerb = mistakes
    .map(m => {
      const verb = IRREGULAR_VERBS.find(v => v.id === m.verbId);
      return { mistake: m, verb };
    })
    .filter(item => item.verb !== undefined);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <BookmarkCheck className="w-8 h-8 text-amber-500" />
            <span>Sổ từ sai ({mistakes.length})</span>
          </h1>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Danh sách các động từ bạn thường trả lời sai trong quá trình luyện tập.
          </p>
        </div>

        {mistakes.length > 0 && (
          <button
            onClick={onLaunchMistakeGame}
            className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all hover:scale-105"
          >
            <Play className="w-4 h-4 fill-white" /> Bắt đầu ôn từ sai
          </button>
        )}
      </div>

      {mistakes.length === 0 ? (
        <div className="glass-card p-12 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            Sổ từ sai hiện đang trống!
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Bạn chưa trả lời sai từ nào gần đây. Hãy tiếp tục thử thách các màn học mới.
          </p>
          <button
            onClick={() => onNavigate('/levels')}
            className="px-6 py-3 rounded-xl bg-brand-600 text-white font-bold text-xs"
          >
            Đến danh sách 18 Màn
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mistakesWithVerb.map(({ mistake, verb }) => {
            if (!verb) return null;
            return (
              <div key={verb.id} className="glass-card p-5 space-y-3 border-l-4 border-l-amber-500">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">{verb.v1}</h3>
                    <span className="text-xs font-semibold text-slate-500">{verb.meaning}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 text-xs font-black">
                    Sai {mistake.wrongCount} lần
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-xs space-y-1">
                  <div className="font-bold text-emerald-600 dark:text-emerald-400">
                    Đáp án đúng: V2 ({formatAnswersDisplay(verb.v2)}), V3 ({formatAnswersDisplay(verb.v3)})
                  </div>
                  {mistake.userAnswers.length > 0 && (
                    <div className="text-slate-500 truncate">
                      Câu trả lời của bạn: {mistake.userAnswers.join(', ')}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold">
                  <span>Màn {verb.level}</span>
                  <span>Đã đúng lại: {mistake.correctCountAfterMistake}/3 lần</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
