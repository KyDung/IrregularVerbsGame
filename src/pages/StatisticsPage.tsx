import React from 'react';
import { useProgress } from '../hooks/useProgress';
import { IRREGULAR_VERBS } from '../data/verbsData';
import { LEVELS } from '../data/levelsData';
import { BarChart3, Award, Flame, BookOpen, CheckCircle2, BookmarkCheck, TrendingUp } from 'lucide-react';
import { formatAnswersDisplay } from '../utils/answerNormalizer';

export const StatisticsPage: React.FC = () => {
  const { progress } = useProgress();

  const totalVerbs = 360;
  const masteries = Object.values(progress.verbMastery);

  const masteredCount = masteries.filter(m => m.status === 'mastered').length;
  const reviewingCount = masteries.filter(m => m.status === 'reviewing').length;
  const learningCount = masteries.filter(m => m.status === 'learning').length;
  const newCount = totalVerbs - (masteredCount + reviewingCount + learningCount);

  const totalAttempts = masteries.reduce((sum, m) => sum + m.seenCount, 0);
  const totalCorrect = masteries.reduce((sum, m) => sum + m.correctCount, 0);
  const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

  // Top wrong verbs list
  const topWrongVerbs = [...progress.mistakes]
    .sort((a, b) => b.wrongCount - a.wrongCount)
    .slice(0, 5)
    .map(m => {
      const verb = IRREGULAR_VERBS.find(v => v.id === m.verbId);
      return { mistake: m, verb };
    })
    .filter(item => item.verb !== undefined);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="w-8 h-8 text-brand-500" />
          <span>Thống kê tiến độ học tập</span>
        </h1>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Theo dõi tổng quan mức độ thành thạo 360 động từ bất quy tắc của bạn.
        </p>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-5 space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase">Chuỗi ngày liên tục</span>
          <div className="text-2xl font-black text-amber-500 flex items-center gap-1.5">
            <Flame className="w-6 h-6 fill-amber-500" />
            <span>{progress.dailyStreak} ngày</span>
          </div>
        </div>

        <div className="glass-card p-5 space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase">Độ chính xác</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <TrendingUp className="w-6 h-6" />
            <span>{accuracy}%</span>
          </div>
        </div>

        <div className="glass-card p-5 space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase">Đã thuộc</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <Award className="w-6 h-6" />
            <span>{masteredCount} từ</span>
          </div>
        </div>

        <div className="glass-card p-5 space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase">Tổng lượt trả lời</span>
          <div className="text-2xl font-black text-brand-600 dark:text-brand-400 flex items-center gap-1.5">
            <BookOpen className="w-6 h-6" />
            <span>{totalAttempts} lần</span>
          </div>
        </div>
      </div>

      {/* Mastery Breakdown */}
      <div className="glass-card p-6 space-y-6">
        <h3 className="text-lg font-black text-slate-900 dark:text-white">
          Phân bố mức độ thuộc từ (360 từ)
        </h3>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-emerald-600 dark:text-emerald-400">Đã thuộc (Mastered &gt; 80%)</span>
              <span>{masteredCount} từ ({Math.round((masteredCount / totalVerbs) * 100)}%)</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(masteredCount / totalVerbs) * 100}%` }} />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-blue-600 dark:text-blue-400">Đang ôn tập (50% - 80%)</span>
              <span>{reviewingCount} từ ({Math.round((reviewingCount / totalVerbs) * 100)}%)</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: `${(reviewingCount / totalVerbs) * 100}%` }} />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-amber-600 dark:text-amber-400">Đang học (&lt; 50%)</span>
              <span>{learningCount} từ ({Math.round((learningCount / totalVerbs) * 100)}%)</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(learningCount / totalVerbs) * 100}%` }} />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-400">Chưa học (New)</span>
              <span>{newCount} từ ({Math.round((newCount / totalVerbs) * 100)}%)</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
              <div className="bg-slate-300 dark:bg-slate-700 h-full rounded-full" style={{ width: `${(newCount / totalVerbs) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Top 5 Missed Verbs */}
      {topWrongVerbs.length > 0 && (
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-amber-500" />
            <span>Top 5 động từ hay trả lời sai nhất</span>
          </h3>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {topWrongVerbs.map(({ mistake, verb }) => {
              if (!verb) return null;
              return (
                <div key={verb.id} className="py-3 flex items-center justify-between">
                  <div>
                    <span className="font-extrabold text-base text-slate-900 dark:text-white mr-2">{verb.v1}</span>
                    <span className="text-xs text-slate-500">
                      V2: {formatAnswersDisplay(verb.v2)} | V3: {formatAnswersDisplay(verb.v3)} ({verb.meaning})
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 font-extrabold text-xs">
                    Sai {mistake.wrongCount} lần
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
