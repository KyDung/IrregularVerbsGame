import React, { useState, useEffect } from 'react';
import { IrregularVerb } from '../types/verb';
import { AnswerResult } from '../types/game';
import { isAnswerCorrect, formatAnswersDisplay } from '../utils/answerNormalizer';
import { shuffleArray } from '../utils/distractorGenerator';
import { CheckCircle2, XCircle, ArrowRight, HelpCircle, RotateCcw } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface MissingFormsGameProps {
  verbs: IrregularVerb[];
  questionCount?: number;
  soundEnabled?: boolean;
  onCompleteSession: (results: AnswerResult[], score: number, accuracyPercent: number) => void;
  onExit: () => void;
}

type Mode = 'v1_missing_v2v3' | 'v2_missing_v1v3' | 'v3_missing_v1v2' | 'v1v2_missing_v3';

interface QuestionConfig {
  verb: IrregularVerb;
  mode: Mode;
  givenForms: { label: string; value: string }[];
  missingForms: { key: 'v1' | 'v2' | 'v3'; label: string; validAnswers: string[] }[];
}

export const MissingFormsGame: React.FC<MissingFormsGameProps> = ({
  verbs,
  questionCount = 20,
  soundEnabled = true,
  onCompleteSession,
  onExit,
}) => {
  const [questions, setQuestions] = useState<QuestionConfig[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [isAnswered, setIsAnswered] = useState(false);
  const [fieldResults, setFieldResults] = useState<Record<string, boolean>>({});
  const [answers, setAnswers] = useState<AnswerResult[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const modes: Mode[] = ['v1_missing_v2v3', 'v2_missing_v1v3', 'v3_missing_v1v2', 'v1v2_missing_v3'];
    const shuffledVerbs = shuffleArray([...verbs]).slice(0, Math.min(questionCount, verbs.length));

    const generated: QuestionConfig[] = shuffledVerbs.map((verb, idx) => {
      const mode = modes[idx % modes.length];

      if (mode === 'v2_missing_v1v3') {
        return {
          verb,
          mode,
          givenForms: [{ label: 'V2 (Quá khứ đơn)', value: formatAnswersDisplay(verb.v2) }],
          missingForms: [
            { key: 'v1', label: 'Dạng V1 (Nguyên thể)', validAnswers: [verb.v1] },
            { key: 'v3', label: 'Dạng V3 (Phân từ hai)', validAnswers: verb.v3 },
          ],
        };
      }

      if (mode === 'v3_missing_v1v2') {
        return {
          verb,
          mode,
          givenForms: [{ label: 'V3 (Phân từ hai)', value: formatAnswersDisplay(verb.v3) }],
          missingForms: [
            { key: 'v1', label: 'Dạng V1 (Nguyên thể)', validAnswers: [verb.v1] },
            { key: 'v2', label: 'Dạng V2 (Quá khứ đơn)', validAnswers: verb.v2 },
          ],
        };
      }

      if (mode === 'v1v2_missing_v3') {
        return {
          verb,
          mode,
          givenForms: [
            { label: 'V1', value: verb.v1 },
            { label: 'V2', value: formatAnswersDisplay(verb.v2) },
          ],
          missingForms: [
            { key: 'v3', label: 'Dạng V3 còn thiếu', validAnswers: verb.v3 },
          ],
        };
      }

      // Default: v1_missing_v2v3
      return {
        verb,
        mode,
        givenForms: [{ label: 'V1 (Nguyên thể)', value: verb.v1 }],
        missingForms: [
          { key: 'v2', label: 'Dạng V2 (Quá khứ đơn)', validAnswers: verb.v2 },
          { key: 'v3', label: 'Dạng V3 (Phân từ hai)', validAnswers: verb.v3 },
        ],
      };
    });

    setQuestions(generated);
  }, [verbs, questionCount]);

  const currentQ = questions[currentIndex];
  if (!currentQ) return <div className="p-8 text-center font-bold text-slate-500">Đang khởi tạo game...</div>;

  const handleInputChange = (key: string, val: string) => {
    setUserInputs(prev => ({ ...prev, [key]: val }));
  };

  const handleCheck = () => {
    if (isAnswered) return;

    const resultsMap: Record<string, boolean> = {};
    let allCorrect = true;

    currentQ.missingForms.forEach(f => {
      const inputVal = userInputs[f.key] || '';
      const isCorrect = isAnswerCorrect(inputVal, f.validAnswers);
      resultsMap[f.key] = isCorrect;
      if (!isCorrect) allCorrect = false;
    });

    setFieldResults(resultsMap);
    setIsAnswered(true);

    if (allCorrect) {
      soundEffects.playCorrect(soundEnabled);
      setScore(prev => prev + 100);
    } else {
      soundEffects.playWrong(soundEnabled);
    }

    const result: AnswerResult = {
      verbId: currentQ.verb.id,
      gameType: 'missing',
      isCorrect: allCorrect,
      userAnswer: JSON.stringify(userInputs),
      correctAnswers: currentQ.missingForms.map(f => `${f.label}: ${formatAnswersDisplay(f.validAnswers)}`),
      responseTime: 0,
      timestamp: Date.now(),
    };

    setAnswers(prev => [...prev, result]);
  };

  const handleIDontKnow = () => {
    const resultsMap: Record<string, boolean> = {};
    currentQ.missingForms.forEach(f => {
      resultsMap[f.key] = false;
    });
    setFieldResults(resultsMap);
    setIsAnswered(true);
    soundEffects.playWrong(soundEnabled);

    const result: AnswerResult = {
      verbId: currentQ.verb.id,
      gameType: 'missing',
      isCorrect: false,
      userAnswer: 'Không biết',
      correctAnswers: currentQ.missingForms.map(f => `${f.label}: ${formatAnswersDisplay(f.validAnswers)}`),
      responseTime: 0,
      timestamp: Date.now(),
    };

    setAnswers(prev => [...prev, result]);
  };

  const handleRetryThisQuestion = () => {
    setIsAnswered(false);
    setFieldResults({});
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserInputs({});
      setIsAnswered(false);
      setFieldResults({});
    } else {
      const finalAnswers = answers;
      const correctCount = finalAnswers.filter(a => a.isCorrect).length;
      const accuracyPercent = Math.round((correctCount / questions.length) * 100);
      onCompleteSession(finalAnswers, score, accuracyPercent);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button onClick={onExit} className="text-xs font-bold text-slate-500 hover:text-rose-600">
          Thoát game
        </button>
        <span className="text-brand-600 dark:text-brand-400 font-extrabold text-xs">⭐ Điểm: {score}</span>
      </div>

      {/* Progress */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs font-bold text-slate-400">
          <span>Câu {currentIndex + 1} / {questions.length}</span>
          <span>Điền các dạng còn thiếu</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-brand-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Card */}
      <div className="glass-card p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Thông tin đã cho</span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {currentQ.givenForms.map((g, idx) => (
              <div key={idx} className="px-4 py-2 rounded-xl bg-brand-50 dark:bg-slate-800 border border-brand-200 dark:border-slate-700">
                <span className="text-xs font-bold text-brand-600 dark:text-brand-400 block">{g.label}</span>
                <span className="text-xl font-black text-slate-900 dark:text-white">{g.value}</span>
              </div>
            ))}
          </div>
          <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
            Nghĩa tiếng Việt: {currentQ.verb.meaning}
          </p>
        </div>

        {/* Inputs for missing forms */}
        <div className="space-y-4">
          {currentQ.missingForms.map(f => {
            const isCorrect = fieldResults[f.key];
            return (
              <div key={f.key} className="space-y-1">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">
                  {f.label}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={userInputs[f.key] || ''}
                    onChange={e => handleInputChange(f.key, e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (!isAnswered ? handleCheck() : handleNext())}
                    disabled={isAnswered}
                    placeholder={`Nhập ${f.label}...`}
                    className={`w-full px-4 py-3 rounded-xl border-2 font-bold text-base bg-white dark:bg-slate-800 focus:outline-none transition-colors ${
                      isCorrect === true
                        ? 'border-emerald-500 text-emerald-700 dark:text-emerald-300'
                        : isCorrect === false
                        ? 'border-rose-500 text-rose-700 dark:text-rose-300'
                        : 'border-slate-200 dark:border-slate-700 focus:border-brand-500'
                    }`}
                  />
                  {isCorrect === true && <CheckCircle2 className="w-5 h-5 text-emerald-500 absolute right-3 top-3.5" />}
                  {isCorrect === false && <XCircle className="w-5 h-5 text-rose-500 absolute right-3 top-3.5" />}
                </div>
                {isAnswered && isCorrect === false && (
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 pl-1">
                    Đáp án đúng: {formatAnswersDisplay(f.validAnswers)}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Action buttons */}
        {!isAnswered ? (
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleIDontKnow}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 font-bold text-sm flex items-center justify-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4" /> Bỏ qua
            </button>
            <button
              onClick={handleCheck}
              className="flex-1 py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-md shadow-brand-500/20"
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
              className="py-3.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-black text-sm shadow-lg flex items-center justify-center gap-2"
            >
              <span>{currentIndex < questions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
