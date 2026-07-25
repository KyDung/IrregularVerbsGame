import React, { useState, useEffect } from 'react';
import { IrregularVerb } from '../types/verb';
import { TrueFalseQuestion, AnswerResult } from '../types/game';
import { formatAnswersDisplay } from '../utils/answerNormalizer';
import { shuffleArray } from '../utils/distractorGenerator';
import { CheckCircle2, XCircle, ArrowRight, ThumbsUp, ThumbsDown } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface TrueFalseGameProps {
  verbs: IrregularVerb[];
  allVerbs: IrregularVerb[];
  questionCount?: number;
  soundEnabled?: boolean;
  onCompleteSession: (results: AnswerResult[], score: number, accuracyPercent: number) => void;
  onExit: () => void;
}

export const TrueFalseGame: React.FC<TrueFalseGameProps> = ({
  verbs,
  allVerbs,
  questionCount = 20,
  soundEnabled = true,
  onCompleteSession,
  onExit,
}) => {
  const [questions, setQuestions] = useState<TrueFalseQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedUserAnswer, setSelectedUserAnswer] = useState<boolean | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answers, setAnswers] = useState<AnswerResult[]>([]);
  const [score, setScore] = useState(0);

  const verbsKey = verbs.map(v => v.id).join(',');
  const allVerbsKey = allVerbs.map(v => v.id).join(',');

  useEffect(() => {
    const selectedVerbs = shuffleArray([...verbs]).slice(0, Math.min(questionCount, verbs.length));
    const generated: TrueFalseQuestion[] = [];

    selectedVerbs.forEach((verb, idx) => {
      // 50% chance true, 50% chance false
      const isTrue = idx % 2 === 0;

      if (isTrue) {
        generated.push({
          id: `tf_${verb.id}_${idx}`,
          verb,
          triad: {
            v1: verb.v1,
            v2: verb.v2[0],
            v3: verb.v3[0],
          },
          meaning: verb.meaning,
          isCorrectTriad: true,
          correctTriad: {
            v1: verb.v1,
            v2: formatAnswersDisplay(verb.v2),
            v3: formatAnswersDisplay(verb.v3),
          },
        });
      } else {
        // Create realistic incorrect triad by swapping V2 or V3 from another real verb
        const otherVerb = allVerbs.find(v => v.id !== verb.id && v.v2[0] !== verb.v2[0]) || allVerbs[0];
        const swapV2 = idx % 3 === 0;

        const fakeV2 = swapV2 ? otherVerb.v2[0] : verb.v2[0];
        const fakeV3 = swapV2 ? verb.v3[0] : otherVerb.v3[0];

        generated.push({
          id: `tf_${verb.id}_${idx}`,
          verb,
          triad: {
            v1: verb.v1,
            v2: fakeV2,
            v3: fakeV3,
          },
          meaning: verb.meaning,
          isCorrectTriad: false,
          correctTriad: {
            v1: verb.v1,
            v2: formatAnswersDisplay(verb.v2),
            v3: formatAnswersDisplay(verb.v3),
          },
        });
      }
    });

    setQuestions(generated);
  }, [verbsKey, allVerbsKey, questionCount]);

  const currentQ = questions[currentIndex];
  if (!currentQ) return <div className="p-8 text-center font-bold text-slate-500">Khởi tạo game Đúng / Sai...</div>;

  const handleChoose = (userChoice: boolean) => {
    if (isAnswered) return;

    const isCorrect = userChoice === currentQ.isCorrectTriad;
    setSelectedUserAnswer(userChoice);
    setIsAnswered(true);

    if (isCorrect) {
      soundEffects.playCorrect(soundEnabled);
      setScore(prev => prev + 100);
    } else {
      soundEffects.playWrong(soundEnabled);
    }

    const result: AnswerResult = {
      verbId: currentQ.verb.id,
      gameType: 'true_false',
      isCorrect,
      userAnswer: userChoice ? 'Đúng' : 'Sai',
      correctAnswers: [currentQ.isCorrectTriad ? 'Đúng' : 'Sai'],
      responseTime: 0,
      timestamp: Date.now(),
    };

    setAnswers(prev => [...prev, result]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedUserAnswer(null);
      setIsAnswered(false);
    } else {
      const finalAnswers = answers;
      const correctCount = finalAnswers.filter(a => a.isCorrect).length;
      const accuracyPercent = Math.round((correctCount / questions.length) * 100);
      onCompleteSession(finalAnswers, score, accuracyPercent);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onExit} className="text-xs font-bold text-slate-500 hover:text-rose-600">
          Thoát game
        </button>
        <span className="text-brand-600 dark:text-brand-400 font-extrabold text-xs">⭐ Điểm: {score}</span>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs font-bold text-slate-400">
          <span>Câu {currentIndex + 1} / {questions.length}</span>
          <span>Đúng hay Sai?</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-brand-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="glass-card p-6 sm:p-8 space-y-6 text-center">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Bộ 3 dạng động từ bên dưới ĐÚNG hay SAI?
        </span>

        {/* Triad Display */}
        <div className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-800/80 space-y-2 border border-slate-200 dark:border-slate-700">
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-wide">
            {currentQ.triad.v1} — {currentQ.triad.v2} — {currentQ.triad.v3}
          </div>
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
            Nghĩa: {currentQ.meaning}
          </p>
        </div>

        {/* Action Buttons */}
        {!isAnswered ? (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleChoose(true)}
              className="py-5 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <ThumbsUp className="w-6 h-6" /> ĐÚNG
            </button>
            <button
              onClick={() => handleChoose(false)}
              className="py-5 px-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black text-xl shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <ThumbsDown className="w-6 h-6" /> SAI
            </button>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className={`p-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2 ${
              selectedUserAnswer === currentQ.isCorrectTriad ? 'bg-emerald-500' : 'bg-rose-500'
            }`}>
              {selectedUserAnswer === currentQ.isCorrectTriad ? (
                <>
                  <CheckCircle2 className="w-6 h-6" /> Bạn trả lời ĐÚNG!
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6" /> Bạn trả lời SAI!
                </>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-left space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Bộ 3 dạng chuẩn chính xác:</span>
              <p className="text-base font-extrabold text-slate-900 dark:text-white">
                {currentQ.correctTriad.v1} — {currentQ.correctTriad.v2} — {currentQ.correctTriad.v3}
              </p>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-black text-base shadow-lg flex items-center justify-center gap-2"
            >
              <span>{currentIndex < questions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
