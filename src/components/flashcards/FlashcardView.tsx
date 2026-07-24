import React, { useState } from 'react';
import { IrregularVerb } from '../../types/verb';
import { formatAnswersDisplay } from '../../utils/answerNormalizer';
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCw, 
  Volume2, 
  CheckCircle2, 
  HelpCircle, 
  BookOpen, 
  Table as TableIcon 
} from 'lucide-react';
import { VerbTableView } from './VerbTableView';
import { soundEffects } from '../../utils/soundEffects';

interface FlashcardViewProps {
  verbs: IrregularVerb[];
  levelTitle: string;
  onBackToLevel: () => void;
  onStartGames: () => void;
  soundEnabled?: boolean;
}

export const FlashcardView: React.FC<FlashcardViewProps> = ({
  verbs,
  levelTitle,
  onBackToLevel,
  onStartGames,
  soundEnabled = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [markedRemembered, setMarkedRemembered] = useState<Record<string, boolean>>({});

  const currentVerb = verbs[currentIndex];
  if (!currentVerb) return null;

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < verbs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const toggleRemember = (verbId: string) => {
    setMarkedRemembered(prev => ({
      ...prev,
      [verbId]: !prev[verbId],
    }));
  };

  const speak = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      soundEffects.playCorrect(soundEnabled);
    }
  };

  const isRemembered = !!markedRemembered[currentVerb.id];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <button
            onClick={onBackToLevel}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-600 mb-1 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Quay lại danh sách màn
          </button>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {levelTitle} - Học từ mới
          </h2>
        </div>

        {/* View mode toggle & Game action */}
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800 flex items-center gap-1">
            <button
              onClick={() => setViewMode('card')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                viewMode === 'card'
                  ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Flashcard
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" /> Dạng bảng
            </button>
          </div>

          <button
            onClick={onStartGames}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-500 hover:to-blue-500 text-white font-bold text-sm shadow-md shadow-brand-500/20 transition-all hover:scale-[1.02]"
          >
            Luyện tập Game
          </button>
        </div>
      </div>

      {viewMode === 'table' ? (
        <VerbTableView verbs={verbs} soundEnabled={soundEnabled} />
      ) : (
        <div className="space-y-6">
          {/* Progress bar for 20 verbs */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>Từ {currentIndex + 1} / {verbs.length}</span>
            <span>{Math.round(((currentIndex + 1) / verbs.length) * 100)}%</span>
          </div>

          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-brand-500 to-blue-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / verbs.length) * 100}%` }}
            />
          </div>

          {/* Flashcard 3D container */}
          <div 
            onClick={toggleFlip}
            className="relative w-full min-h-[320px] sm:min-h-[360px] cursor-pointer group perspective-1000"
          >
            <div className={`relative w-full h-full min-h-[320px] sm:min-h-[360px] transition-transform duration-500 transform-style-3d rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 flex flex-col justify-between ${
              isFlipped 
                ? 'rotate-y-180 bg-gradient-to-br from-slate-900 via-brand-950 to-slate-950 text-white' 
                : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white'
            }`}>
              {/* Front Side */}
              <div className={`w-full h-full flex flex-col items-center justify-center space-y-4 backface-hidden ${isFlipped ? 'hidden' : 'block'}`}>
                <span className="text-xs font-bold tracking-widest text-brand-600 dark:text-brand-400 uppercase">
                  V1 (Động từ nguyên thể)
                </span>

                <div className="flex items-center gap-3">
                  <h3 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                    {currentVerb.v1}
                  </h3>
                  <button
                    onClick={(e) => speak(currentVerb.v1, e)}
                    className="p-2.5 rounded-full bg-brand-50 dark:bg-slate-800 text-brand-600 dark:text-brand-400 hover:scale-110 transition-transform shadow-sm"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-6 h-6" />
                  </button>
                </div>

                <p className="text-lg font-bold text-slate-700 dark:text-slate-200">
                  Nghĩa: {currentVerb.meaning}
                </p>

                <div className="pt-6 flex items-center gap-2 text-xs font-bold text-brand-600 dark:text-brand-400 group-hover:scale-105 transition-transform">
                  <RotateCw className="w-4 h-4 animate-spin-slow" />
                  <span>Chạm thẻ để xem đáp án V2 - V3</span>
                </div>
              </div>

              {/* Back Side (Flipped) */}
              <div className={`w-full h-full flex flex-col items-center justify-center space-y-6 rotate-y-180 ${isFlipped ? 'block' : 'hidden'}`}>
                <div className="text-center space-y-2">
                  <span className="text-xs font-bold text-brand-300 uppercase tracking-widest">
                    V1 → V2 → V3 (Các dạng quá khứ)
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-wide">
                    <span className="text-slate-300">{currentVerb.v1}</span>
                    <span className="text-brand-400"> → </span>
                    <span className="text-blue-300">{formatAnswersDisplay(currentVerb.v2)}</span>
                    <span className="text-brand-400"> → </span>
                    <span className="text-purple-300">{formatAnswersDisplay(currentVerb.v3)}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 dark:bg-black/40 backdrop-blur-md border border-white/20 max-w-md text-center space-y-2">
                  <span className="text-xs font-bold text-amber-300 uppercase">Nghĩa tiếng Việt</span>
                  <p className="text-xl font-extrabold text-white">{currentVerb.meaning}</p>

                  {currentVerb.notes && (
                    <p className="text-xs text-slate-200 font-medium pt-2 border-t border-white/20">
                      💡 {currentVerb.notes}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => speak(`${currentVerb.v1}, ${currentVerb.v2[0]}, ${currentVerb.v3[0]}`, e)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-extrabold text-xs transition-all shadow-md"
                  >
                    <Volume2 className="w-4 h-4" /> Nghe phát âm trọn bộ V1-V2-V3
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Flashcard Bottom Controls */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-700 dark:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" /> Từ trước
            </button>

            {/* Mark Remembered / Review */}
            <button
              onClick={() => toggleRemember(currentVerb.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all ${
                isRemembered
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {isRemembered ? (
                <>
                  <CheckCircle2 className="w-5 h-5" /> Đã nhớ từ này
                </>
              ) : (
                <>
                  <HelpCircle className="w-5 h-5" /> Đánh dấu cần ôn lại
                </>
              )}
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === verbs.length - 1}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-700 dark:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Từ tiếp <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
