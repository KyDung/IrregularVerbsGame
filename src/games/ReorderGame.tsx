import React, { useState, useEffect } from 'react';
import { IrregularVerb } from '../types/verb';
import { ReorderQuestion, AnswerResult } from '../types/game';
import { formatAnswersDisplay, isAnswerCorrect } from '../utils/answerNormalizer';
import { shuffleArray } from '../utils/distractorGenerator';
import { CheckCircle2, XCircle, ArrowRight, MoveLeft, MoveRight } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface ReorderGameProps {
  verbs: IrregularVerb[];
  questionCount?: number;
  soundEnabled?: boolean;
  onCompleteSession: (results: AnswerResult[], score: number, accuracyPercent: number) => void;
  onExit: () => void;
}

interface ReorderCardItem {
  id: string;
  text: string;
}

export const ReorderGame: React.FC<ReorderGameProps> = ({
  verbs,
  questionCount = 20,
  soundEnabled = true,
  onCompleteSession,
  onExit,
}) => {
  const [questions, setQuestions] = useState<ReorderQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSequence, setCurrentSequence] = useState<ReorderCardItem[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [answers, setAnswers] = useState<AnswerResult[]>([]);
  const [score, setScore] = useState(0);

  const verbsKey = verbs.map(v => v.id).join(',');

  useEffect(() => {
    const selectedVerbs = shuffleArray([...verbs]).slice(0, Math.min(questionCount, verbs.length));

    const generated: ReorderQuestion[] = selectedVerbs.map((verb, idx) => {
      const items: { id: string; text: string; formTag: 'v1' | 'v2' | 'v3' }[] = [
        { id: `item_v1_${verb.id}_${idx}`, text: verb.v1, formTag: 'v1' },
        { id: `item_v2_${verb.id}_${idx}`, text: verb.v2[0], formTag: 'v2' },
        { id: `item_v3_${verb.id}_${idx}`, text: verb.v3[0], formTag: 'v3' },
      ];

      return {
        id: `reorder_${verb.id}_${idx}`,
        verb,
        shuffledForms: shuffleArray(items),
        correctOrder: ['v1', 'v2', 'v3'],
      };
    });

    setQuestions(generated);
  }, [verbsKey, questionCount]);

  useEffect(() => {
    const currentQ = questions[currentIndex];
    if (currentQ) {
      const cardItems: ReorderCardItem[] = currentQ.shuffledForms.map(item => ({
        id: item.id,
        text: item.text,
      }));
      setCurrentSequence(cardItems);
      setIsAnswered(false);
      setIsCorrect(null);
    }
  }, [currentIndex, questions]);

  const currentQ = questions[currentIndex];
  if (!currentQ) return <div className="p-8 text-center font-bold text-slate-500">Khởi tạo game Sắp xếp...</div>;

  const moveLeft = (index: number) => {
    if (index <= 0 || isAnswered) return;
    const newArr = [...currentSequence];
    [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
    setCurrentSequence(newArr);
  };

  const moveRight = (index: number) => {
    if (index >= currentSequence.length - 1 || isAnswered) return;
    const newArr = [...currentSequence];
    [newArr[index], newArr[index + 1]] = [newArr[index + 1], newArr[index]];
    setCurrentSequence(newArr);
  };

  const handleCheckOrder = () => {
    if (isAnswered || currentSequence.length < 3) return;

    const pos0Text = currentSequence[0].text;
    const pos1Text = currentSequence[1].text;
    const pos2Text = currentSequence[2].text;

    // Evaluate text at each position against the required verb forms:
    // Position 0 must be valid V1
    // Position 1 must be valid V2
    // Position 2 must be valid V3
    const isV1Correct = isAnswerCorrect(pos0Text, [currentQ.verb.v1]);
    const isV2Correct = isAnswerCorrect(pos1Text, currentQ.verb.v2);
    const isV3Correct = isAnswerCorrect(pos2Text, currentQ.verb.v3);

    const correct = isV1Correct && isV2Correct && isV3Correct;

    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      soundEffects.playCorrect(soundEnabled);
      setScore(prev => prev + 100);
    } else {
      soundEffects.playWrong(soundEnabled);
    }

    const result: AnswerResult = {
      verbId: currentQ.verb.id,
      gameType: 'reorder',
      isCorrect: correct,
      userAnswer: currentSequence.map(i => i.text).join(' → '),
      correctAnswers: [`${currentQ.verb.v1} → ${formatAnswersDisplay(currentQ.verb.v2)} → ${formatAnswersDisplay(currentQ.verb.v3)}`],
      responseTime: 0,
      timestamp: Date.now(),
    };

    setAnswers(prev => [...prev, result]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
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
          <span>Sắp xếp theo thứ tự V1 → V2 → V3</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-brand-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="glass-card p-6 sm:p-8 space-y-6 text-center">
        <div className="space-y-1">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            Đổi vị trí 3 thẻ bên dưới theo thứ tự V1 → V2 → V3
          </h3>
          <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
            Nghĩa: {currentQ.verb.meaning}
          </p>
        </div>

        {/* 3 Interactive Cards Container */}
        <div className="grid grid-cols-3 gap-3">
          {currentSequence.map((item, idx) => {
            const formLabels = ['V1 (Nguyên thể)', 'V2 (Quá khứ)', 'V3 (Phân từ)'];
            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-between gap-3 transition-all ${
                  isAnswered
                    ? isCorrect
                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-md'
                      : 'bg-rose-500 text-white border-rose-500'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white shadow-sm'
                }`}
              >
                <span className="text-[10px] font-extrabold uppercase opacity-80">
                  {formLabels[idx]}
                </span>

                <span className="text-xl sm:text-2xl font-black">{item.text}</span>

                {/* Move Buttons */}
                {!isAnswered && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveLeft(idx)}
                      disabled={idx === 0}
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-200"
                      title="Sang trái"
                    >
                      <MoveLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveRight(idx)}
                      disabled={idx === currentSequence.length - 1}
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-200"
                      title="Sang phải"
                    >
                      <MoveRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        {!isAnswered ? (
          <button
            onClick={handleCheckOrder}
            className="w-full py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-black text-base shadow-lg shadow-brand-500/20"
          >
            Xác nhận thứ tự
          </button>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className={`p-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 ${
              isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
            }`}>
              {isCorrect ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
              <span>{isCorrect ? 'Sắp xếp chính xác!' : 'Chưa đúng thứ tự V1 → V2 → V3'}</span>
            </div>

            {!isCorrect && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-left space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase">Thứ tự đúng:</span>
                <p className="text-base font-extrabold text-slate-900 dark:text-white">
                  {currentQ.verb.v1} → {formatAnswersDisplay(currentQ.verb.v2)} → {formatAnswersDisplay(currentQ.verb.v3)}
                </p>
              </div>
            )}

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
