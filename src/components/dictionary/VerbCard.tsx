import React from 'react';
import { IrregularVerb } from '../../types/verb';
import { VerbMastery } from '../../types/progress';
import { formatAnswersDisplay } from '../../utils/answerNormalizer';
import { Volume2, Award } from 'lucide-react';

interface VerbCardProps {
  verb: IrregularVerb;
  mastery?: VerbMastery;
  onClick: (verb: IrregularVerb) => void;
  onPlaySound?: (e: React.MouseEvent, text: string) => void;
}

export const VerbCard: React.FC<VerbCardProps> = ({
  verb,
  mastery,
  onClick,
  onPlaySound,
}) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'mastered':
        return 'border-l-4 border-l-emerald-500';
      case 'reviewing':
        return 'border-l-4 border-l-blue-500';
      case 'learning':
        return 'border-l-4 border-l-amber-500';
      default:
        return 'border-l-4 border-l-slate-300 dark:border-l-slate-700';
    }
  };

  return (
    <div
      onClick={() => onClick(verb)}
      className={`glass-card p-4 cursor-pointer hover:-translate-y-0.5 transition-all relative overflow-hidden group ${getStatusColor(
        mastery?.status
      )}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <h4 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            {verb.v1}
          </h4>
          {onPlaySound && (
            <button
              onClick={(e) => onPlaySound(e, verb.v1)}
              className="p-1 rounded-lg text-slate-400 hover:text-brand-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Nghe âm phát"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}
        </div>

        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
          Màn {verb.level}
        </span>
      </div>

      <div className="space-y-1 mb-3 text-sm">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <span className="text-xs font-bold text-slate-400 uppercase w-6 shrink-0">V2</span>
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            {formatAnswersDisplay(verb.v2)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <span className="text-xs font-bold text-slate-400 uppercase w-6 shrink-0">V3</span>
          <span className="font-semibold text-purple-600 dark:text-purple-400">
            {formatAnswersDisplay(verb.v3)}
          </span>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
        <span className="font-medium text-slate-600 dark:text-slate-400 truncate max-w-[170px]" title={verb.meaning}>
          {verb.meaning}
        </span>

        {mastery && mastery.masteryScore > 0 && (
          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-extrabold shrink-0">
            <Award className="w-3.5 h-3.5" />
            <span>{mastery.masteryScore}%</span>
          </div>
        )}
      </div>
    </div>
  );
};
