import React, { useState } from 'react';
import { useProgress } from '../hooks/useProgress';
import { LEVELS, getLevelById } from '../data/levelsData';
import { IRREGULAR_VERBS } from '../data/verbsData';
import { Modal } from '../components/layout/Modal';
import { formatAnswersDisplay } from '../utils/answerNormalizer';
import { Play, BookOpen, CheckCircle2, Eye, Volume2 } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface LevelsPageProps {
  onNavigate: (route: string) => void;
}

export const LevelsPage: React.FC<LevelsPageProps> = ({ onNavigate }) => {
  const { progress, updateLevelSessionResult } = useProgress();
  const [previewLevelId, setPreviewLevelId] = useState<number | null>(null);

  const previewLevel = previewLevelId ? getLevelById(previewLevelId) : null;
  const previewVerbs = previewLevelId ? IRREGULAR_VERBS.filter(v => v.level === previewLevelId) : [];

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleMarkLevelKnown = (levelId: number) => {
    updateLevelSessionResult(levelId, 2000, 100);
    soundEffects.playLevelComplete(progress.settings.soundEnabled);
    setPreviewLevelId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          18 Màn học động từ bất quy tắc
        </h1>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Mỗi màn gồm 20 động từ. Bạn có thể xem trước nội dung hoặc chọn màn phù hợp với trình độ.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {LEVELS.map(level => {
          const stats = progress.levelStats[level.id];
          const isCompleted = stats?.completed || false;
          const accuracy = stats?.bestAccuracy || 0;

          return (
            <div
              key={level.id}
              className="glass-card p-6 flex flex-col justify-between space-y-4 hover:border-brand-500 hover:shadow-lg transition-all relative"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                    Màn {level.id}
                  </span>

                  {isCompleted ? (
                    <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Đã xong</span>
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-slate-400">20 động từ</span>
                  )}
                </div>

                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  {level.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {level.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Chính xác: {accuracy}%</span>
                  <button
                    onClick={() => setPreviewLevelId(level.id)}
                    className="text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" /> Xem trước 20 từ
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onNavigate(`/level/${level.id}/learn`)}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" /> Học từ
                  </button>
                  <button
                    onClick={() => onNavigate(`/level/${level.id}/games`)}
                    className="py-2.5 px-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-brand-500/20 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" /> Chơi Game
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview Modal for 20 Verbs */}
      {previewLevel && (
        <Modal
          isOpen={true}
          onClose={() => setPreviewLevelId(null)}
          title={`Xem trước 20 từ - ${previewLevel.title}`}
          maxWidth="xl"
        >
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl">
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                Nếu bạn đã thuộc toàn bộ 20 từ này, bạn có thể bấm nút bên cạnh để đánh dấu hoàn thành màn.
              </p>
              <button
                onClick={() => handleMarkLevelKnown(previewLevel.id)}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" />Tôi đã thuộc 20 từ này (Hoàn thành Màn)
              </button>
            </div>

            <div className="overflow-x-auto max-h-[50vh]">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="sticky top-0 bg-white dark:bg-slate-900">
                  <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                    <th className="py-2.5 px-3 w-10 text-center">STT</th>
                    <th className="py-2.5 px-3">V1 (Nguyên thể)</th>
                    <th className="py-2.5 px-3">V2 (Quá khứ đơn)</th>
                    <th className="py-2.5 px-3">V3 (Phân từ hai)</th>
                    <th className="py-2.5 px-3">Nghĩa tiếng Việt</th>
                    <th className="py-2.5 px-3 text-center">Nghe</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {previewVerbs.map((verb, idx) => (
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
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  const id = previewLevel.id;
                  setPreviewLevelId(null);
                  onNavigate(`/level/${id}/learn`);
                }}
                className="px-4 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs"
              >
                Vào học Flashcard 20 từ này
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
