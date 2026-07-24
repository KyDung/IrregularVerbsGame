import React, { useState, useEffect, useRef } from 'react';
import { IrregularVerb } from '../types/verb';
import { AnswerResult } from '../types/game';
import { isAnswerCorrect, formatAnswersDisplay } from '../utils/answerNormalizer';
import { shuffleArray } from '../utils/distractorGenerator';
import { CheckCircle2, XCircle, Volume2, ArrowRight, HelpCircle, RotateCcw } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface InputGameProps {
  verbs: IrregularVerb[];
  questionCount?: number;
  soundEnabled?: boolean;
  onCompleteSession: (results: AnswerResult[], score: number, accuracyPercent: number) => void;
  onExit: () => void;
}

export const InputGame: React.FC<InputGameProps> = ({
  verbs,
  questionCount = 20,
  soundEnabled = true,
  onCompleteSession,
  onExit,
}) => {
  const [targetVerbs, setTargetVerbs] = useState<IrregularVerb[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [v2Input, setV2Input] = useState('');
  const [v3Input, setV3Input] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [v2IsCorrect, setV2IsCorrect] = useState<boolean | null>(null);
  const [v3IsCorrect, setV3IsCorrect] = useState<boolean | null>(null);
  const [answers, setAnswers] = useState<AnswerResult[]>([]);
  const [score, setScore] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const v2InputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const shuffled = shuffleArray([...verbs]).slice(0, Math.min(questionCount, verbs.length));
    setTargetVerbs(shuffled);
    setQuestionStartTime(Date.now());
  }, [verbs, questionCount]);

  useEffect(() => {
    if (!isAnswered && v2InputRef.current) {
      v2InputRef.current.focus();
    }
  }, [currentIndex, isAnswered]);

  const currentVerb = targetVerbs[currentIndex];
  if (!currentVerb) {
    return <div className="p-8 text-center font-bold text-slate-500">Đang tạo lượt chơi...</div>;
  }

  const handleCheck = () => {
    if (isAnswered) return;

    const responseTime = Date.now() - questionStartTime;
    const v2Valid = isAnswerCorrect(v2Input, currentVerb.v2);
    const v3Valid = isAnswerCorrect(v3Input, currentVerb.v3);
    const isBothCorrect = v2Valid && v3Valid;

    setV2IsCorrect(v2Valid);
    setV3IsCorrect(v3Valid);
    setIsAnswered(true);

    if (isBothCorrect) {
      soundEffects.playCorrect(soundEnabled);
      setScore(prev => prev + 100);
    } else {
      soundEffects.playWrong(soundEnabled);
    }

    const result: AnswerResult = {
      verbId: currentVerb.id,
      gameType: 'input',
      isCorrect: isBothCorrect,
      userAnswer: `V2: ${v2Input || '(trống)'}, V3: ${v3Input || '(trống)'}`,
      correctAnswers: [
        `V2: ${formatAnswersDisplay(currentVerb.v2)}`,
        `V3: ${formatAnswersDisplay(currentVerb.v3)}`,
      ],
      responseTime,
      timestamp: Date.now(),
    };

    setAnswers(prev => [...prev, result]);
  };

  const handleIDontKnow = () => {
    setV2Input('');
    setV3Input('');
    setV2IsCorrect(false);
    setV3IsCorrect(false);
    setIsAnswered(true);
    soundEffects.playWrong(soundEnabled);

    const result: AnswerResult = {
      verbId: currentVerb.id,
      gameType: 'input',
      isCorrect: false,
      userAnswer: 'Không biết',
      correctAnswers: [
        `V2: ${formatAnswersDisplay(currentVerb.v2)}`,
        `V3: ${formatAnswersDisplay(currentVerb.v3)}`,
      ],
      responseTime: Date.now() - questionStartTime,
      timestamp: Date.now(),
    };

    setAnswers(prev => [...prev, result]);
  };

  const handleNext = () => {
    if (currentIndex < targetVerbs.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setV2Input('');
      setV3Input('');
      setV2IsCorrect(null);
      setV3IsCorrect(null);
      setIsAnswered(false);
      setQuestionStartTime(Date.now());
    } else {
      const finalAnswers = answers;
      const correctCount = finalAnswers.filter(a => a.isCorrect).length;
      const accuracyPercent = Math.round((correctCount / targetVerbs.length) * 100);
      onCompleteSession(finalAnswers, score, accuracyPercent);
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleRetryThisQuestion = () => {
    setIsAnswered(false);
    setV2IsCorrect(null);
    setV3IsCorrect(null);
    setTimeout(() => {
      v2InputRef.current?.focus();
    }, 100);
  };

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <button onClick={onExit} className="text-xs font-bold text-slate-500 hover:text-rose-600">
          Thoát game
        </button>
        <span className="text-brand-600 dark:text-brand-400 font-extrabold text-xs">
          ⭐ Điểm: {score}
        </span>
      </div>

      {/* Progress */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs font-bold text-slate-400">
          <span>Câu {currentIndex + 1} / {targetVerbs.length}</span>
          <span>Nhập V2 và V3</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-brand-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + 1) / targetVerbs.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="glass-card p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Động từ nguyên thể (V1)</span>
          <div className="flex items-center justify-center gap-3">
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              {currentVerb.v1}
            </h3>
            <button
              onClick={() => speak(currentVerb.v1)}
              className="p-2 rounded-full bg-brand-50 dark:bg-slate-800 text-brand-600 dark:text-brand-400 hover:scale-110 transition-transform"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
          <p className="text-base font-bold text-slate-600 dark:text-slate-300">
            Nghĩa: {currentVerb.meaning}
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          {/* V2 Input */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">
              Dạng Quá khứ đơn (V2)
            </label>
            <div className="relative">
              <input
                ref={v2InputRef}
                type="text"
                value={v2Input}
                onChange={e => setV2Input(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (!isAnswered ? handleCheck() : handleNext())}
                disabled={isAnswered}
                placeholder="Nhập V2 (ví dụ: wrote)"
                className={`w-full px-4 py-3 rounded-xl border-2 font-bold text-base bg-white dark:bg-slate-800 focus:outline-none transition-colors ${
                  v2IsCorrect === true
                    ? 'border-emerald-500 text-emerald-700 dark:text-emerald-300'
                    : v2IsCorrect === false
                    ? 'border-rose-500 text-rose-700 dark:text-rose-300'
                    : 'border-slate-200 dark:border-slate-700 focus:border-brand-500'
                }`}
              />
              {v2IsCorrect === true && <CheckCircle2 className="w-5 h-5 text-emerald-500 absolute right-3 top-3.5" />}
              {v2IsCorrect === false && <XCircle className="w-5 h-5 text-rose-500 absolute right-3 top-3.5" />}
            </div>
            {isAnswered && v2IsCorrect === false && (
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 pl-1">
                Đáp án V2 đúng: {formatAnswersDisplay(currentVerb.v2)}
              </p>
            )}
          </div>

          {/* V3 Input */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">
              Dạng Quá khứ phân từ (V3)
            </label>
            <div className="relative">
              <input
                type="text"
                value={v3Input}
                onChange={e => setV3Input(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (!isAnswered ? handleCheck() : handleNext())}
                disabled={isAnswered}
                placeholder="Nhập V3 (ví dụ: written)"
                className={`w-full px-4 py-3 rounded-xl border-2 font-bold text-base bg-white dark:bg-slate-800 focus:outline-none transition-colors ${
                  v3IsCorrect === true
                    ? 'border-emerald-500 text-emerald-700 dark:text-emerald-300'
                    : v3IsCorrect === false
                    ? 'border-rose-500 text-rose-700 dark:text-rose-300'
                    : 'border-slate-200 dark:border-slate-700 focus:border-brand-500'
                }`}
              />
              {v3IsCorrect === true && <CheckCircle2 className="w-5 h-5 text-emerald-500 absolute right-3 top-3.5" />}
              {v3IsCorrect === false && <XCircle className="w-5 h-5 text-rose-500 absolute right-3 top-3.5" />}
            </div>
            {isAnswered && v3IsCorrect === false && (
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 pl-1">
                Đáp án V3 đúng: {formatAnswersDisplay(currentVerb.v3)}
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        {!isAnswered ? (
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleIDontKnow}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 font-bold text-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <HelpCircle className="w-4 h-4" /> Tôi không biết
            </button>
            <button
              onClick={handleCheck}
              className="flex-1 py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-md shadow-brand-500/20 transition-all"
            >
              Kiểm tra (Enter)
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleRetryThisQuestion}
              className="py-3.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-sm flex items-center justify-center gap-2 transition-colors border border-slate-200 dark:border-slate-700"
            >
              <RotateCcw className="w-4 h-4" /> Nhập lại câu này
            </button>

            <button
              onClick={handleNext}
              className="py-3.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-black text-sm shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <span>{currentIndex < targetVerbs.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
