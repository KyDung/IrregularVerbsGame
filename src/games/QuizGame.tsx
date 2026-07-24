import React, { useState, useEffect } from 'react';
import { IrregularVerb } from '../types/verb';
import { QuizQuestion, AnswerResult } from '../types/game';
import { MistakeRecord } from '../types/progress';
import { generateDistractors, shuffleArray } from '../utils/distractorGenerator';
import { formatAnswersDisplay } from '../utils/answerNormalizer';
import { CheckCircle2, XCircle, Volume2, ArrowRight } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface QuizGameProps {
  verbs: IrregularVerb[];
  allVerbs: IrregularVerb[];
  questionCount?: number;
  timeLimit?: number; // seconds per question, 0 = no limit
  mistakeHistory?: MistakeRecord[];
  soundEnabled?: boolean;
  onCompleteSession: (results: AnswerResult[], score: number, accuracyPercent: number) => void;
  onExit: () => void;
}

export const QuizGame: React.FC<QuizGameProps> = ({
  verbs,
  allVerbs,
  questionCount = 20,
  timeLimit = 0,
  mistakeHistory = [],
  soundEnabled = true,
  onCompleteSession,
  onExit,
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answers, setAnswers] = useState<AnswerResult[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  // Generate questions batch stably ONCE on mount
  // EVERY question in Quiz directly practices both V2 and V3 forms!
  useEffect(() => {
    const generated: QuizQuestion[] = [];
    const shuffledVerbs = shuffleArray([...verbs]).slice(0, Math.min(questionCount, verbs.length));

    shuffledVerbs.forEach((verb, idx) => {
      const v2Str = formatAnswersDisplay(verb.v2);
      const v3Str = formatAnswersDisplay(verb.v3);
      const correctAnswer = `${v2Str} – ${v3Str}`;
      const validAnswers = [correctAnswer];
      const prompt = `Cặp dạng quá khứ V2 – V3 của "${verb.v1}" là gì?`;

      const distractors = generateDistractors(
        verb,
        'pair',
        allVerbs,
        verbs,
        3,
        mistakeHistory
      );

      const options = shuffleArray([correctAnswer, ...distractors]);
      const correctOptionIndex = options.indexOf(correctAnswer);

      generated.push({
        id: `q_pair_${verb.id}_${idx}`,
        verb,
        type: 'v1_to_v2',
        prompt,
        subPrompt: `Nghĩa: ${verb.meaning}`,
        correctAnswer,
        allValidAnswers: validAnswers,
        options,
        correctOptionIndex,
        explanation: verb.notes,
      });
    });

    setQuestions(generated);
    setQuestionStartTime(Date.now());
    if (timeLimit > 0) setTimeLeft(timeLimit);
  }, [verbs, allVerbs, questionCount, mistakeHistory, timeLimit]);

  // Timer countdown if enabled
  useEffect(() => {
    if (timeLimit <= 0 || isAnswered || questions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSelectOption(-1); // Time out answer
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, isAnswered, timeLimit, questions]);

  // Keyboard 1-4 option listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnswered) return;
      if (['1', '2', '3', '4'].includes(e.key)) {
        const optionIndex = parseInt(e.key, 10) - 1;
        handleSelectOption(optionIndex);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, currentIndex, questions]);

  const currentQ = questions[currentIndex];
  if (!currentQ) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-500 font-bold">
        Đang khởi tạo bộ 20 câu hỏi V2–V3...
      </div>
    );
  }

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    const responseTime = Date.now() - questionStartTime;
    const isCorrect = index === currentQ.correctOptionIndex;
    const userAnswerText = index >= 0 ? currentQ.options[index] : 'Hết thời gian';

    setSelectedOptionIndex(index);
    setIsAnswered(true);

    if (isCorrect) {
      soundEffects.playCorrect(soundEnabled);
      const newStreak = streak + 1;
      const speedBonus = responseTime < 3000 ? Math.max(0, 15 - Math.floor(responseTime / 300)) : 0;
      const points = 100 + speedBonus + Math.min(newStreak * 5, 25);
      setScore(prev => prev + points);
      setStreak(newStreak);
    } else {
      soundEffects.playWrong(soundEnabled);
      setStreak(0);
    }

    const result: AnswerResult = {
      verbId: currentQ.verb.id,
      gameType: 'quiz',
      isCorrect,
      userAnswer: userAnswerText,
      correctAnswers: currentQ.allValidAnswers,
      responseTime,
      timestamp: Date.now(),
      promptText: currentQ.prompt,
    };

    setAnswers(prev => [...prev, result]);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOptionIndex(null);
      setIsAnswered(false);
      setQuestionStartTime(Date.now());
      if (timeLimit > 0) setTimeLeft(timeLimit);
    } else {
      // Finished all questions
      const finalAnswers = answers;
      const correctCount = finalAnswers.filter(a => a.isCorrect).length;
      const accuracyPercent = Math.round((correctCount / questions.length) * 100);
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

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Top Header bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onExit}
          className="text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors"
        >
          Thoát game
        </button>

        <div className="flex items-center gap-4 text-xs font-extrabold">
          {timeLimit > 0 && (
            <span className={`px-2.5 py-1 rounded-full ${timeLeft <= 3 ? 'bg-rose-100 text-rose-600 animate-bounce' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
              ⏱️ {timeLeft}s
            </span>
          )}
          <span className="text-amber-500">🔥 Chuỗi: {streak}</span>
          <span className="text-brand-600 dark:text-brand-400">⭐ Điểm: {score}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs font-bold text-slate-400">
          <span>Câu {currentIndex + 1} / {questions.length}</span>
          <span>Quiz V2 – V3 Chuyên sâu</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-brand-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="glass-card p-6 sm:p-8 space-y-6 text-center">
        <div className="space-y-2">
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest block">
            Chọn cặp quá khứ V2 – V3 chính xác
          </span>
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {currentQ.prompt}
            </h3>
            <button
              onClick={() => speak(currentQ.verb.v1)}
              className="p-1.5 rounded-full text-slate-400 hover:text-brand-500 transition-colors"
              title="Nghe phát âm"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
            Nghĩa: {currentQ.verb.meaning}
          </p>
        </div>

        {/* 4 Choices */}
        <div className="grid grid-cols-1 gap-3">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOptionIndex === idx;
            const isCorrectOption = idx === currentQ.correctOptionIndex;

            let buttonStyle = 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700/80';

            if (isAnswered) {
              if (isCorrectOption) {
                buttonStyle = 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20';
              } else if (isSelected) {
                buttonStyle = 'bg-rose-500 text-white border-rose-500 animate-shake';
              } else {
                buttonStyle = 'opacity-40 bg-slate-100 dark:bg-slate-800 border-transparent';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-2xl border-2 font-black text-base sm:text-lg flex items-center justify-between transition-all ${buttonStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${
                    isAnswered && isCorrectOption ? 'bg-white/20 text-white' : 'bg-slate-200/70 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {idx + 1}
                  </span>
                  <span>{option}</span>
                </div>

                {isAnswered && isCorrectOption && <CheckCircle2 className="w-6 h-6 text-white shrink-0" />}
                {isAnswered && isSelected && !isCorrectOption && <XCircle className="w-6 h-6 text-white shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Feedback area */}
        {isAnswered && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-fade-in">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-left space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Đáp án chuẩn xác</span>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {currentQ.verb.v1} → {formatAnswersDisplay(currentQ.verb.v2)} → {formatAnswersDisplay(currentQ.verb.v3)} ({currentQ.verb.meaning})
              </p>
              {currentQ.explanation && (
                <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                  💡 {currentQ.explanation}
                </p>
              )}
            </div>

            <button
              onClick={handleNextQuestion}
              className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-black text-base shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <span>{currentIndex < questions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả lượt chơi'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
