import React from 'react';
import { useProgress } from '../hooks/useProgress';
import { IRREGULAR_VERBS } from '../data/verbsData';
import { LEVELS } from '../data/levelsData';
import { 
  BookOpen, 
  Award, 
  BookmarkCheck, 
  Play, 
  Layers, 
  ChevronRight, 
  Sparkles,
  Lock,
  Star,
  Zap
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { progress, isLevelUnlocked } = useProgress();

  // Statistics calculation
  const totalVerbs = IRREGULAR_VERBS.length; // 360
  const masteryValues = Object.values(progress.verbMastery);
  
  const totalSeen = masteryValues.filter(m => m.seenCount > 0).length;
  const totalMastered = masteryValues.filter(m => m.status === 'mastered').length;
  const totalReviewNeeded = new Set(progress.mistakes.map(m => m.verbId)).size;

  const totalCorrect = masteryValues.reduce((sum, m) => sum + m.correctCount, 0);
  const totalSeenAttempts = masteryValues.reduce((sum, m) => sum + m.seenCount, 0);
  const overallAccuracy = totalSeenAttempts > 0 ? Math.round((totalCorrect / totalSeenAttempts) * 100) : 0;

  // Find active level
  const activeLevelId = progress.unlockedLevels[progress.unlockedLevels.length - 1] || 1;
  const activeLevel = LEVELS.find(l => l.id === activeLevelId) || LEVELS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-700 via-brand-600 to-blue-600 p-6 sm:p-10 text-white shadow-xl shadow-brand-500/20">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-extrabold text-white">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Hệ thống luyện tập 360 Động từ bất quy tắc</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Làm chủ 360 Động từ tiếng Anh thật dễ dàng!
          </h1>

          <p className="text-sm sm:text-base text-blue-100 font-medium">
            Học qua 18 màn bài bản, flashcard thông minh, 8 dạng mini game tương tác và hệ thống tự động ôn lại từ hay sai.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate(`/level/${activeLevel.id}/learn`)}
              className="px-6 py-3.5 rounded-2xl bg-white text-brand-700 font-black text-sm shadow-lg hover:bg-brand-50 transition-all hover:scale-105 flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-brand-700" /> Tiếp tục học: Màn {activeLevel.id}
            </button>

            <button
              onClick={() => onNavigate('/levels')}
              className="px-6 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold text-sm hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <Layers className="w-4 h-4" /> Danh sách 18 Màn
            </button>
          </div>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute -right-12 -bottom-12 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="glass-card p-5 space-y-2">
          <div className="flex items-center justify-between text-brand-600 dark:text-brand-400">
            <span className="text-xs font-extrabold uppercase tracking-wider">Đã học</span>
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {totalSeen} <span className="text-sm font-semibold text-slate-400">/ 360</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-brand-500 h-full rounded-full" style={{ width: `${(totalSeen / totalVerbs) * 100}%` }} />
          </div>
        </div>

        <div className="glass-card p-5 space-y-2">
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
            <span className="text-xs font-extrabold uppercase tracking-wider">Đã thuộc</span>
            <Award className="w-5 h-5" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {totalMastered} <span className="text-sm font-semibold text-slate-400">từ</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(totalMastered / totalVerbs) * 100}%` }} />
          </div>
        </div>

        <div 
          onClick={() => onNavigate('/review')}
          className="glass-card p-5 space-y-2 cursor-pointer hover:border-amber-400 transition-colors"
        >
          <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
            <span className="text-xs font-extrabold uppercase tracking-wider">Cần ôn lại</span>
            <BookmarkCheck className="w-5 h-5" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {totalReviewNeeded} <span className="text-sm font-semibold text-slate-400">từ sai</span>
          </div>
          <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 block">
            Chạm để mở Sổ từ sai →
          </span>
        </div>

        <div className="glass-card p-5 space-y-2">
          <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400">
            <span className="text-xs font-extrabold uppercase tracking-wider">Tỉ lệ chính xác</span>
            <Zap className="w-5 h-5" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {overallAccuracy}%
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${overallAccuracy}%` }} />
          </div>
        </div>
      </div>

      {/* 18 Levels Grid Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              18 Màn học tập
            </h2>
            <p className="text-xs text-slate-500 font-semibold">
              Mỗi màn gồm 20 động từ bất quy tắc sắp xếp theo lộ trình tối ưu.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/levels')}
            className="flex items-center gap-1 text-sm font-bold text-brand-600 dark:text-brand-400 hover:underline"
          >
            <span>Xem tất cả</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LEVELS.slice(0, 6).map(level => {
            const unlocked = isLevelUnlocked(level.id);
            const stats = progress.levelStats[level.id];
            const isCompleted = stats?.completed || false;
            const accuracy = stats?.bestAccuracy || 0;

            return (
              <div
                key={level.id}
                onClick={() => unlocked && onNavigate(`/level/${level.id}`)}
                className={`glass-card p-5 space-y-4 transition-all relative ${
                  unlocked
                    ? 'cursor-pointer hover:border-brand-400 hover:-translate-y-1'
                    : 'opacity-60 cursor-not-allowed bg-slate-100/50 dark:bg-slate-900/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
                      Màn {level.id}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white line-clamp-1">
                      {level.title}
                    </h3>
                  </div>

                  {!unlocked ? (
                    <div className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-500">
                      <Lock className="w-5 h-5" />
                    </div>
                  ) : isCompleted ? (
                    <div className="flex items-center gap-0.5 text-amber-500">
                      <Star className="w-4 h-4 fill-amber-500" />
                      <Star className="w-4 h-4 fill-amber-500" />
                      <Star className="w-4 h-4 fill-amber-500" />
                    </div>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full bg-brand-50 dark:bg-slate-800 text-brand-700 dark:text-brand-300 text-xs font-bold">
                      20 từ
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {level.description}
                </p>

                {unlocked && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-500">
                      Chính xác tốt nhất: {accuracy}%
                    </span>
                    <span className="font-extrabold text-brand-600 dark:text-brand-400 flex items-center gap-1">
                      Vào học <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
