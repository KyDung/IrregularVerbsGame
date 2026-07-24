import React from 'react';
import { IrregularVerb } from '../../types/verb';
import { VerbMastery } from '../../types/progress';
import { Modal } from '../layout/Modal';
import { formatAnswersDisplay } from '../../utils/answerNormalizer';
import { Volume2, Award, Info, Globe, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

interface VerbDetailModalProps {
  verb: IrregularVerb | null;
  mastery?: VerbMastery;
  isOpen: boolean;
  onClose: () => void;
  soundEnabled?: boolean;
}

export const VerbDetailModal: React.FC<VerbDetailModalProps> = ({
  verb,
  mastery,
  isOpen,
  onClose,
  soundEnabled = true,
}) => {
  if (!verb) return null;

  const playTTS = (text: string) => {
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

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'mastered':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">Thành thạo</span>;
      case 'reviewing':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">Đang ôn tập</span>;
      case 'learning':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">Đang học</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">Từ mới</span>;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Chi tiết động từ: ${verb.v1}`} maxWidth="lg">
      <div className="space-y-6">
        {/* Header Tag & Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg text-xs font-bold bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
              Màn {verb.level}
            </span>
            {verb.frequency && (
              <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 capitalize">
                Tần suất: {verb.frequency === 'common' ? 'Phổ biến' : verb.frequency === 'medium' ? 'Trung bình' : 'Hiếm gặp'}
              </span>
            )}
          </div>
          {getStatusBadge(mastery?.status)}
        </div>

        {/* Big Forms Cards */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-4 rounded-2xl bg-brand-50/50 dark:bg-slate-800/50 border border-brand-100 dark:border-slate-700">
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 block mb-1">V1 (Nguyên thể)</span>
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-xl font-black text-slate-900 dark:text-white">{verb.v1}</span>
              <button
                onClick={() => playTTS(verb.v1)}
                className="p-1 rounded-lg text-brand-600 hover:bg-brand-100 dark:hover:bg-slate-700 transition-colors"
                title="Nghe phát âm"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-slate-800/50 border border-blue-100 dark:border-slate-700">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block mb-1">V2 (Quá khứ đơn)</span>
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-lg font-black text-slate-900 dark:text-white">
                {formatAnswersDisplay(verb.v2)}
              </span>
              <button
                onClick={() => playTTS(verb.v2[0])}
                className="p-1 rounded-lg text-blue-600 hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors"
                title="Nghe phát âm"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-slate-800/50 border border-purple-100 dark:border-slate-700">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block mb-1">V3 (Phân từ hai)</span>
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-lg font-black text-slate-900 dark:text-white">
                {formatAnswersDisplay(verb.v3)}
              </span>
              <button
                onClick={() => playTTS(verb.v3[0])}
                className="p-1 rounded-lg text-purple-600 hover:bg-purple-100 dark:hover:bg-slate-700 transition-colors"
                title="Nghe phát âm"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Vietnamese Meaning */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
            Nghĩa tiếng Việt
          </span>
          <p className="text-lg font-bold text-slate-800 dark:text-slate-100">
            {verb.meaning}
          </p>
        </div>

        {/* Notes & Region Variants */}
        {verb.notes && (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-amber-800 dark:text-amber-300 block mb-0.5">Ghi chú ngữ pháp</span>
              <p className="text-sm text-amber-900 dark:text-amber-200">{verb.notes}</p>
            </div>
          </div>
        )}

        {verb.variants && verb.variants.length > 0 && (
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50 flex items-start gap-3">
            <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-indigo-800 dark:text-indigo-300 block mb-1">Biến thể Anh - Mỹ</span>
              <div className="flex flex-wrap gap-2">
                {verb.variants.map((v, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-indigo-900 dark:text-indigo-200 shadow-sm border border-indigo-100 dark:border-slate-700">
                    {v.form} ({v.region || 'Cả hai'})
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* User Stats for this verb */}
        <div className="p-4 rounded-2xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">
            Thống kê học tập cá nhân
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 text-center">
              <span className="text-xs text-slate-500 block">Số lần gặp</span>
              <span className="text-base font-extrabold text-slate-800 dark:text-slate-100">
                {mastery?.seenCount || 0}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 text-center">
              <span className="text-xs text-emerald-600 dark:text-emerald-400 block flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Đúng
              </span>
              <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                {mastery?.correctCount || 0}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 text-center">
              <span className="text-xs text-rose-600 dark:text-rose-400 block flex items-center justify-center gap-1">
                <XCircle className="w-3.5 h-3.5" /> Sai
              </span>
              <span className="text-base font-extrabold text-rose-600 dark:text-rose-400">
                {mastery?.wrongCount || 0}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 text-center">
              <span className="text-xs text-brand-600 dark:text-brand-400 block flex items-center justify-center gap-1">
                <Award className="w-3.5 h-3.5" /> Điểm thuộc
              </span>
              <span className="text-base font-extrabold text-brand-600 dark:text-brand-400">
                {mastery?.masteryScore || 0}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
