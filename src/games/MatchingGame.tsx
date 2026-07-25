import React, { useState, useEffect } from 'react';
import { IrregularVerb } from '../types/verb';
import { AnswerResult } from '../types/game';
import { formatAnswersDisplay } from '../utils/answerNormalizer';
import { shuffleArray } from '../utils/distractorGenerator';
import { CheckCircle2 } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface MatchingGameProps {
  verbs: IrregularVerb[];
  pairCount?: number; // 5 - 8 pairs
  soundEnabled?: boolean;
  onCompleteSession: (results: AnswerResult[], score: number, accuracyPercent: number) => void;
  onExit: () => void;
}

interface Item {
  id: string;
  verbId: string;
  text: string;
  column: 'left' | 'right';
  matched: boolean;
}

export const MatchingGame: React.FC<MatchingGameProps> = ({
  verbs,
  pairCount = 6,
  soundEnabled = true,
  onCompleteSession,
  onExit,
}) => {
  const [leftItems, setLeftItems] = useState<Item[]>([]);
  const [rightItems, setRightItems] = useState<Item[]>([]);
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [selectedRightId, setSelectedRightId] = useState<string | null>(null);
  const [wrongPairIds, setWrongPairIds] = useState<[string, string] | null>(null);
  const [matchedCount, setMatchedCount] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [startTime] = useState(Date.now());
  const [score, setScore] = useState(0);

  const verbsKey = verbs.map(v => v.id).join(',');

  useEffect(() => {
    const selectedVerbs = shuffleArray([...verbs]).slice(0, Math.min(pairCount, verbs.length));

    const lefts: Item[] = selectedVerbs.map((v, idx) => ({
      id: `L_${v.id}_${idx}`,
      verbId: v.id,
      text: `${v.v1} (V1)`,
      column: 'left',
      matched: false,
    }));

    const rights: Item[] = selectedVerbs.map((v, idx) => ({
      id: `R_${v.id}_${idx}`,
      verbId: v.id,
      text: `${formatAnswersDisplay(v.v2)} – ${formatAnswersDisplay(v.v3)} (${v.meaning})`,
      column: 'right',
      matched: false,
    }));

    setLeftItems(shuffleArray(lefts));
    setRightItems(shuffleArray(rights));
  }, [verbsKey, pairCount]);

  const handleSelectLeft = (id: string) => {
    const item = leftItems.find(i => i.id === id);
    if (!item || item.matched) return;
    setSelectedLeftId(id);

    if (selectedRightId) {
      checkPair(id, selectedRightId);
    }
  };

  const handleSelectRight = (id: string) => {
    const item = rightItems.find(i => i.id === id);
    if (!item || item.matched) return;
    setSelectedRightId(id);

    if (selectedLeftId) {
      checkPair(selectedLeftId, id);
    }
  };

  const checkPair = (lId: string, rId: string) => {
    const leftItem = leftItems.find(i => i.id === lId);
    const rightItem = rightItems.find(i => i.id === rId);

    if (!leftItem || !rightItem) return;

    if (leftItem.verbId === rightItem.verbId) {
      // MATCHED!
      soundEffects.playCorrect(soundEnabled);
      setLeftItems(prev => prev.map(i => i.id === lId ? { ...i, matched: true } : i));
      setRightItems(prev => prev.map(i => i.id === rId ? { ...i, matched: true } : i));
      setSelectedLeftId(null);
      setSelectedRightId(null);
      setMatchedCount(prev => prev + 1);
      setScore(prev => prev + 100);

      // Check win
      if (matchedCount + 1 === leftItems.length) {
        const totalTime = Date.now() - startTime;
        const totalAttempts = leftItems.length + wrongAttempts;
        const accuracy = Math.round((leftItems.length / totalAttempts) * 100);

        const results: AnswerResult[] = leftItems.map(item => ({
          verbId: item.verbId,
          gameType: 'matching',
          isCorrect: true,
          userAnswer: item.text,
          correctAnswers: [item.text],
          responseTime: Math.round(totalTime / leftItems.length),
          timestamp: Date.now(),
        }));

        setTimeout(() => {
          onCompleteSession(results, score + 100, accuracy);
        }, 500);
      }
    } else {
      // WRONG MATCH
      soundEffects.playWrong(soundEnabled);
      setWrongPairIds([lId, rId]);
      setWrongAttempts(prev => prev + 1);

      setTimeout(() => {
        setWrongPairIds(null);
        setSelectedLeftId(null);
        setSelectedRightId(null);
      }, 500);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onExit} className="text-xs font-bold text-slate-500 hover:text-rose-600">
          Thoát game
        </button>
        <div className="flex items-center gap-4 text-xs font-extrabold">
          <span className="text-slate-500">Ghép đúng: {matchedCount} / {leftItems.length}</span>
          <span className="text-brand-600 dark:text-brand-400">⭐ Điểm: {score}</span>
        </div>
      </div>

      <div className="glass-card p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">Nối từ tương ứng</h3>
          <p className="text-xs font-bold text-slate-500">
            Chạm chọn 1 item ở cột trái và 1 item tương ứng ở cột phải để hoàn thành cặp.
          </p>
        </div>

        {/* Two Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Left Column (V1) */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase block mb-2 text-center">Cột A: Từ V1</span>
            {leftItems.map(item => {
              const isSelected = selectedLeftId === item.id;
              const isWrong = wrongPairIds && wrongPairIds[0] === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectLeft(item.id)}
                  disabled={item.matched}
                  className={`w-full p-4 rounded-2xl border-2 font-black text-base text-center transition-all ${
                    item.matched
                      ? 'bg-emerald-100/60 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 opacity-60'
                      : isWrong
                      ? 'bg-rose-500 text-white border-rose-500 animate-shake'
                      : isSelected
                      ? 'bg-brand-500 text-white border-brand-500 shadow-md shadow-brand-500/20 scale-[1.02]'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-brand-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.text}</span>
                    {item.matched && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column (V2-V3 & Meaning) */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase block mb-2 text-center">Cột B: Dạng V2–V3 & Nghĩa</span>
            {rightItems.map(item => {
              const isSelected = selectedRightId === item.id;
              const isWrong = wrongPairIds && wrongPairIds[1] === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectRight(item.id)}
                  disabled={item.matched}
                  className={`w-full p-4 rounded-2xl border-2 font-bold text-sm text-center transition-all ${
                    item.matched
                      ? 'bg-emerald-100/60 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 opacity-60'
                      : isWrong
                      ? 'bg-rose-500 text-white border-rose-500 animate-shake'
                      : isSelected
                      ? 'bg-brand-500 text-white border-brand-500 shadow-md shadow-brand-500/20 scale-[1.02]'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-brand-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.text}</span>
                    {item.matched && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
