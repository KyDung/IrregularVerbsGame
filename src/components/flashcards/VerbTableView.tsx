import React from 'react';
import { IrregularVerb } from '../../types/verb';
import { formatAnswersDisplay } from '../../utils/answerNormalizer';
import { Volume2 } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

interface VerbTableViewProps {
  verbs: IrregularVerb[];
  soundEnabled?: boolean;
}

export const VerbTableView: React.FC<VerbTableViewProps> = ({
  verbs,
  soundEnabled = true,
}) => {
  const speak = (text: string) => {
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

  return (
    <div className="w-full glass-card overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
              <th className="py-3.5 px-4 w-12 text-center">STT</th>
              <th className="py-3.5 px-4">V1 (Nguyên thể)</th>
              <th className="py-3.5 px-4">V2 (Quá khứ đơn)</th>
              <th className="py-3.5 px-4">V3 (Phân từ hai)</th>
              <th className="py-3.5 px-4">Nghĩa tiếng Việt</th>
              <th className="py-3.5 px-4 text-center">Nghe</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {verbs.map((verb, index) => (
              <tr 
                key={verb.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="py-3 px-4 text-center font-bold text-slate-400">
                  {index + 1}
                </td>
                <td className="py-3 px-4 font-black text-slate-900 dark:text-white">
                  {verb.v1}
                </td>
                <td className="py-3 px-4 font-bold text-blue-600 dark:text-blue-400">
                  {formatAnswersDisplay(verb.v2)}
                </td>
                <td className="py-3 px-4 font-bold text-purple-600 dark:text-purple-400">
                  {formatAnswersDisplay(verb.v3)}
                </td>
                <td className="py-3 px-4 font-medium text-slate-700 dark:text-slate-300">
                  {verb.meaning}
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => speak(verb.v1)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View */}
      <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
        {verbs.map((verb, index) => (
          <div key={verb.id} className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">#{index + 1}</span>
              <button
                onClick={() => speak(verb.v1)}
                className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-baseline justify-between">
              <h4 className="text-lg font-black text-slate-900 dark:text-white">{verb.v1}</h4>
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{verb.meaning}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-1">
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-300">
                <span className="text-[10px] text-slate-400 uppercase block mb-0.5">V2</span>
                {formatAnswersDisplay(verb.v2)}
              </div>
              <div className="p-2 rounded-lg bg-purple-50 dark:bg-slate-800 text-purple-700 dark:text-purple-300">
                <span className="text-[10px] text-slate-400 uppercase block mb-0.5">V3</span>
                {formatAnswersDisplay(verb.v3)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
