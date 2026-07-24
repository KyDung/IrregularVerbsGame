import React, { useState } from 'react';
import { getLevelById } from '../data/levelsData';
import { IRREGULAR_VERBS } from '../data/verbsData';
import { GameType } from '../types/game';
import { formatAnswersDisplay } from '../utils/answerNormalizer';
import { useProgress } from '../hooks/useProgress';
import { 
  HelpCircle, 
  Keyboard, 
  Edit3, 
  Layers, 
  CheckSquare, 
  ArrowRightLeft, 
  Zap,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Eye,
  CheckCircle2,
  Volume2,
  BookOpen
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface LevelGamesPageProps {
  levelId: number;
  onNavigate: (route: string) => void;
  onSelectGame: (levelId: number, gameType: GameType) => void;
}

export const LevelGamesPage: React.FC<LevelGamesPageProps> = ({
  levelId,
  onNavigate,
  onSelectGame,
}) => {
  const { progress, updateLevelSessionResult } = useProgress();
  const [showPreview, setShowPreview] = useState(false);
  const [markedCompleted, setMarkedCompleted] = useState(false);

  const level = getLevelById(levelId);
  if (!level) return <div className="p-8 text-center font-bold">Màn học không tồn tại</div>;

  const levelVerbs = IRREGULAR_VERBS.filter(v => v.level === levelId);

  const handleMarkLevelKnown = () => {
    updateLevelSessionResult(levelId, 2000, 100);
    setMarkedCompleted(true);
    soundEffects.playLevelComplete(progress.settings.soundEnabled);
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const games = [
    {
      type: 'quiz' as GameType,
      title: 'Game 1: Quiz V2 – V3 Chuyên sâu',
      desc: 'Chọn đáp án đúng cặp V2 – V3 trong 4 phương án nhiễu thông minh.',
      icon: HelpCircle,
      color: 'from-blue-600 to-indigo-600',
    },
    {
      type: 'input' as GameType,
      title: 'Game 2: Nhập V2 và V3',
      desc: 'Tự gõ trực tiếp hai dạng quá khứ của 20 động từ (Có nút Nhập lại).',
      icon: Keyboard,
      color: 'from-emerald-600 to-teal-600',
    },
    {
      type: 'missing' as GameType,
      title: 'Game 3: Điền dạng còn thiếu',
      desc: 'Dựa trên dạng đã cho để hoàn thành các ô trống (Có nút Nhập lại).',
      icon: Edit3,
      color: 'from-purple-600 to-pink-600',
    },
    {
      type: 'matching' as GameType,
      title: 'Game 4: Nối từ',
      desc: 'Ghép cặp V1 với V2-V3 và nghĩa tương ứng.',
      icon: Layers,
      color: 'from-amber-600 to-orange-600',
    },
    {
      type: 'true_false' as GameType,
      title: 'Game 5: Đúng hay Sai?',
      desc: 'Xác minh bộ 3 dạng V1-V2-V3 hiển thị có chính xác không.',
      icon: CheckSquare,
      color: 'from-rose-600 to-red-600',
    },
    {
      type: 'reorder' as GameType,
      title: 'Game 6: Sắp xếp thứ tự',
      desc: 'Hoán đổi vị trí các từ thành chuỗi V1 → V2 → V3 chuẩn xác.',
      icon: ArrowRightLeft,
      color: 'from-violet-600 to-purple-600',
    },
    {
      type: 'mixed' as GameType,
      title: 'Game 7: Thử thách tổng hợp',
      desc: 'Trộn nhiều dạng câu hỏi với tùy chọn đếm ngược thời gian.',
      icon: Zap,
      color: 'from-brand-600 to-blue-600',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Level Header Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => onNavigate('/levels')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-600 mb-2 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Danh sách màn
          </button>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            {level.title}
          </h1>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {level.description} (Gồm 20 động từ)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate(`/level/${levelId}/learn`)}
            className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-300 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-brand-500" /> Học Flashcard
          </button>

          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2.5 rounded-xl bg-brand-50 dark:bg-slate-800 border border-brand-200 dark:border-slate-700 text-brand-700 dark:text-brand-300 font-bold text-xs flex items-center gap-1.5 hover:bg-brand-100 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>{showPreview ? 'Ẩn xem trước' : 'Xem trước 20 từ'}</span>
            {showPreview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 20 Verbs Summary Preview Panel */}
      {showPreview && (
        <div className="glass-card p-6 space-y-4 animate-fade-in border-brand-300 dark:border-brand-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-brand-500" />
                <span>Danh sách tổng hợp 20 từ của {level.title}</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Xem trước nội dung. Nếu bạn đã thuộc trọn bộ 20 từ này, bạn có thể đánh dấu hoàn thành để bỏ qua màn.
              </p>
            </div>

            <button
              onClick={handleMarkLevelKnown}
              disabled={markedCompleted}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
                markedCompleted
                  ? 'bg-emerald-500 text-white cursor-default'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white hover:scale-105'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{markedCompleted ? 'Đã hoàn thành Màn này!' : 'Tôi đã thuộc 20 từ này (Bỏ qua Màn)'}</span>
            </button>
          </div>

          {/* 20 Verbs Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                  <th className="py-2.5 px-3 w-10 text-center">STT</th>
                  <th className="py-2.5 px-3">V1 (Nguyên thể)</th>
                  <th className="py-2.5 px-3">V2 (Quá khứ đơn)</th>
                  <th className="py-2.5 px-3">V3 (Phân từ hai)</th>
                  <th className="py-2.5 px-3">Nghĩa tiếng Việt</th>
                  <th className="py-2.5 px-3 text-center">Nghe</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {levelVerbs.map((verb, idx) => (
                  <tr key={verb.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-2 px-3 text-center font-bold text-slate-400">{idx + 1}</td>
                    <td className="py-2 px-3 font-black text-slate-900 dark:text-white">{verb.v1}</td>
                    <td className="py-2 px-3 font-bold text-blue-600 dark:text-blue-400">{formatAnswersDisplay(verb.v2)}</td>
                    <td className="py-2 px-3 font-bold text-purple-600 dark:text-purple-400">{formatAnswersDisplay(verb.v3)}</td>
                    <td className="py-2 px-3 font-medium text-slate-700 dark:text-slate-300">{verb.meaning}</td>
                    <td className="py-2 px-3 text-center">
                      <button
                        onClick={() => speak(verb.v1)}
                        className="p-1 rounded text-slate-400 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mini Game Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Chọn dạng Game để bắt đầu luyện tập 20 từ
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map(g => {
            const Icon = g.icon;
            return (
              <div
                key={g.type}
                onClick={() => onSelectGame(levelId, g.type)}
                className="glass-card p-6 flex flex-col justify-between space-y-4 cursor-pointer hover:scale-[1.02] hover:border-brand-500 transition-all group"
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${g.color} text-white flex items-center justify-center shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">
                    {g.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {g.desc}
                  </p>
                </div>

                <div className="pt-2 text-xs font-black text-brand-600 dark:text-brand-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Chơi ngay 20 từ</span> →
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
