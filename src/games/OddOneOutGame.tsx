import React, { useState, useEffect } from 'react';
import { IrregularVerb, PatternGroup } from '../types/verb';
import { OddOneOutQuestion, AnswerResult } from '../types/game';
import { formatAnswersDisplay } from '../utils/answerNormalizer';
import { shuffleArray } from '../utils/distractorGenerator';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface OddOneOutGameProps {
  allVerbs: IrregularVerb[];
  questionCount?: number;
  soundEnabled?: boolean;
  onCompleteSession: (results: AnswerResult[], score: number, accuracyPercent: number) => void;
  onExit: () => void;
}

const PATTERN_LABELS: Record<PatternGroup, string> = {
  'v1=v2=v3': 'Cả 3 dạng V1, V2, V3 giống hệt nhau (cut - cut - cut)',
  'v2=v3': 'Dạng V2 và V3 giống hệt nhau (build - built - built)',
  'v1=v3': 'Dạng V1 và V3 giống hệt nhau (come - came - come)',
  'v1!=v2!=v3': 'Cả 3 dạng V1, V2, V3 khác nhau hoàn toàn',
  'vowel_change': 'Đổi nguyên âm i -> a -> u (sing - sang - sung)',
  'en_suffix': 'V3 có hậu tố -en / -n (write - wrote - written)',
  'mixed': 'Dạng biến đổi đặc biệt',
};

export const OddOneOutGame: React.FC<OddOneOutGameProps> = ({
  allVerbs,
  questionCount = 20,
  soundEnabled = true,
  onCompleteSession,
  onExit,
}) => {
  const [questions, setQuestions] = useState<OddOneOutQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVerbId, setSelectedVerbId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answers, setAnswers] = useState<AnswerResult[]>([]);
  const [score, setScore] = useState(0);

  const allVerbsKey = allVerbs.map(v => v.id).join(',');

  useEffect(() => {
    const patternGroups: PatternGroup[] = ['v1=v2=v3', 'v2=v3', 'en_suffix', 'vowel_change'];
    const generated: OddOneOutQuestion[] = [];

    patternGroups.forEach((group, idx) => {
      const sameGroupVerbs = allVerbs.filter(v => v.patternGroup === group);
      const diffGroupVerbs = allVerbs.filter(v => v.patternGroup && v.patternGroup !== group);

      if (sameGroupVerbs.length >= 3 && diffGroupVerbs.length >= 1) {
        const threeSame = shuffleArray(sameGroupVerbs).slice(0, 3);
        const oneDiff = shuffleArray(diffGroupVerbs)[0];

        const fourVerbs = shuffleArray([...threeSame, oneDiff]);

        generated.push({
          id: `odd_${idx}`,
          verbs: fourVerbs,
          targetVerbId: oneDiff.id,
          patternGroup: group,
          explanation: `3 từ còn lại cùng thuộc nhóm: ${PATTERN_LABELS[group]}.`,
        });
      }
    });

    setQuestions(shuffleArray(generated).slice(0, questionCount));
  }, [allVerbsKey, questionCount]);

  const currentQ = questions[currentIndex];
  if (!currentQ) return <div className="p-8 text-center font-bold text-slate-500">Khởi tạo game Tìm từ khác nhóm...</div>;

  const handleSelectVerb = (verbId: string) => {
    if (isAnswered) return;

    const isCorrect = verbId === currentQ.targetVerbId;
    setSelectedVerbId(verbId);
    setIsAnswered(true);

    if (isCorrect) {
      soundEffects.playCorrect(soundEnabled);
      setScore(prev => prev + 100);
    } else {
      soundEffects.playWrong(soundEnabled);
    }

    const result: AnswerResult = {
      verbId,
      gameType: 'odd_one_out',
      isCorrect,
      userAnswer: verbId,
      correctAnswers: [currentQ.targetVerbId],
      responseTime: 0,
      timestamp: Date.now(),
    };

    setAnswers(prev => [...prev, result]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedVerbId(null);
      setIsAnswered(false);
    } else {
      const finalAnswers = answers;
      const correctCount = finalAnswers.filter(a => a.isCorrect).length;
      const accuracyPercent = Math.round((correctCount / questions.length) * 100);
      onCompleteSession(finalAnswers, score, accuracyPercent);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onExit} className="text-xs font-bold text-slate-500 hover:text-rose-600">
          Thoát game
        </button>
        <span className="text-brand-600 dark:text-brand-400 font-extrabold text-xs">⭐ Điểm: {score}</span>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs font-bold text-slate-400">
          <span>Câu {currentIndex + 1} / {questions.length}</span>
          <span>Tìm từ khác nhóm quy luật</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-brand-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="glass-card p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            Chọn 1 động từ KHÔNG CÙNG quy luật biến đổi với 3 từ còn lại
          </h3>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentQ.verbs.map(verb => {
            const isSelected = selectedVerbId === verb.id;
            const isTarget = verb.id === currentQ.targetVerbId;

            let cardStyle = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-brand-400';

            if (isAnswered) {
              if (isTarget) {
                cardStyle = 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20';
              } else if (isSelected) {
                cardStyle = 'bg-rose-500 text-white border-rose-500 animate-shake';
              } else {
                cardStyle = 'opacity-40 bg-slate-100 dark:bg-slate-800 border-transparent';
              }
            }

            return (
              <button
                key={verb.id}
                onClick={() => handleSelectVerb(verb.id)}
                disabled={isAnswered}
                className={`p-5 rounded-2xl border-2 font-bold text-left space-y-2 transition-all ${cardStyle}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black">{verb.v1}</span>
                  {isAnswered && isTarget && <CheckCircle2 className="w-6 h-6 text-white shrink-0" />}
                  {isAnswered && isSelected && !isTarget && <XCircle className="w-6 h-6 text-white shrink-0" />}
                </div>

                <div className="text-xs space-y-0.5 opacity-90">
                  <div>V2: {formatAnswersDisplay(verb.v2)}</div>
                  <div>V3: {formatAnswersDisplay(verb.v3)}</div>
                  <div className="font-semibold pt-1 border-t border-white/20">{verb.meaning}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation area */}
        {isAnswered && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-fade-in">
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 space-y-1">
              <span className="text-xs font-bold text-amber-800 dark:text-amber-300 block">💡 Giải thích mẫu biến đổi</span>
              <p className="text-sm font-bold text-amber-900 dark:text-amber-200">
                {currentQ.explanation}
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
