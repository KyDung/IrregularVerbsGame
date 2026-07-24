import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { IrregularVerb } from '../types/verb';
import { GameType, AnswerResult } from '../types/game';
import { getLevelById } from '../data/levelsData';
import { QuizGame } from '../games/QuizGame';
import { InputGame } from '../games/InputGame';
import { MissingFormsGame } from '../games/MissingFormsGame';
import { MatchingGame } from '../games/MatchingGame';
import { TrueFalseGame } from '../games/TrueFalseGame';
import { OddOneOutGame } from '../games/OddOneOutGame';
import { ReorderGame } from '../games/ReorderGame';
import { MistakeReviewGame } from '../games/MistakeReviewGame';
import { MixedChallengeGame } from '../games/MixedChallengeGame';
import { useProgress } from '../hooks/useProgress';
import { Modal } from '../components/layout/Modal';
import { Trophy, CheckCircle2, XCircle, RotateCcw, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface GamePlayPageProps {
  levelId?: number;
  gameType: GameType;
  allVerbs: IrregularVerb[];
  onNavigate: (route: string) => void;
}

export const GamePlayPage: React.FC<GamePlayPageProps> = ({
  levelId,
  gameType,
  allVerbs,
  onNavigate,
}) => {
  const { progress, recordAnswerResult, updateLevelSessionResult } = useProgress();
  const [sessionResults, setSessionResults] = useState<AnswerResult[] | null>(null);
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionAccuracy, setSessionAccuracy] = useState(0);
  const [unlockedNextLevel, setUnlockedNextLevel] = useState(false);

  // Filter level verbs if levelId is provided
  const levelVerbs = levelId
    ? allVerbs.filter(v => v.level === levelId)
    : allVerbs.slice(0, 20);

  const levelInfo = levelId ? getLevelById(levelId) : undefined;

  const handleCompleteSession = (
    results: AnswerResult[],
    score: number,
    accuracyPercent: number
  ) => {
    // Record individual answer results into progress & mistakeBook
    results.forEach(res => {
      recordAnswerResult(
        res.verbId,
        res.gameType,
        res.isCorrect,
        res.userAnswer,
        res.correctAnswers,
        res.responseTime
      );
    });

    let isUnlocked = false;
    if (levelId) {
      const res = updateLevelSessionResult(levelId, score, accuracyPercent);
      isUnlocked = res.unlockedNext;
    }

    setSessionResults(results);
    setSessionScore(score);
    setSessionAccuracy(accuracyPercent);
    setUnlockedNextLevel(isUnlocked);

    // Trigger celebratory confetti if passed!
    if (accuracyPercent >= 70) {
      soundEffects.playLevelComplete(progress.settings.soundEnabled);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Fallback if confetti fails
      }
    }
  };

  const handleReplay = () => {
    setSessionResults(null);
    setSessionScore(0);
    setSessionAccuracy(0);
  };

  const currentMistakesInSession = sessionResults?.filter(r => !r.isCorrect) || [];

  return (
    <div className="py-6">
      {/* Active Game Component Render */}
      {!sessionResults && (
        <>
          {gameType === 'quiz' && (
            <QuizGame
              verbs={levelVerbs}
              allVerbs={allVerbs}
              mistakeHistory={progress.mistakes}
              soundEnabled={progress.settings.soundEnabled}
              onCompleteSession={handleCompleteSession}
              onExit={() => onNavigate(levelId ? `/level/${levelId}/games` : '/levels')}
            />
          )}

          {gameType === 'input' && (
            <InputGame
              verbs={levelVerbs}
              soundEnabled={progress.settings.soundEnabled}
              onCompleteSession={handleCompleteSession}
              onExit={() => onNavigate(levelId ? `/level/${levelId}/games` : '/levels')}
            />
          )}

          {gameType === 'missing' && (
            <MissingFormsGame
              verbs={levelVerbs}
              soundEnabled={progress.settings.soundEnabled}
              onCompleteSession={handleCompleteSession}
              onExit={() => onNavigate(levelId ? `/level/${levelId}/games` : '/levels')}
            />
          )}

          {gameType === 'matching' && (
            <MatchingGame
              verbs={levelVerbs}
              soundEnabled={progress.settings.soundEnabled}
              onCompleteSession={handleCompleteSession}
              onExit={() => onNavigate(levelId ? `/level/${levelId}/games` : '/levels')}
            />
          )}

          {gameType === 'true_false' && (
            <TrueFalseGame
              verbs={levelVerbs}
              allVerbs={allVerbs}
              soundEnabled={progress.settings.soundEnabled}
              onCompleteSession={handleCompleteSession}
              onExit={() => onNavigate(levelId ? `/level/${levelId}/games` : '/levels')}
            />
          )}

          {gameType === 'reorder' && (
            <ReorderGame
              verbs={levelVerbs}
              soundEnabled={progress.settings.soundEnabled}
              onCompleteSession={handleCompleteSession}
              onExit={() => onNavigate(levelId ? `/level/${levelId}/games` : '/levels')}
            />
          )}

          {gameType === 'mistake_review' && (
            <MistakeReviewGame
              allVerbs={allVerbs}
              mistakes={progress.mistakes}
              soundEnabled={progress.settings.soundEnabled}
              onCompleteSession={handleCompleteSession}
              onExit={() => onNavigate('/review')}
            />
          )}

          {gameType === 'mixed' && (
            <MixedChallengeGame
              verbs={levelVerbs}
              allVerbs={allVerbs}
              soundEnabled={progress.settings.soundEnabled}
              onCompleteSession={handleCompleteSession}
              onExit={() => onNavigate(levelId ? `/level/${levelId}/games` : '/levels')}
            />
          )}
        </>
      )}

      {/* Post-Game Summary Modal */}
      {sessionResults && (
        <Modal isOpen={true} onClose={handleReplay} title="Kết quả lượt chơi" maxWidth="lg">
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-500 flex items-center justify-center mx-auto shadow-md">
              <Trophy className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                {sessionAccuracy >= 70 ? '🎉 Xuất sắc! Hoàn thành lượt chơi' : 'Cố gắng lên!'}
              </h3>
              <p className="text-xs font-bold text-slate-500">
                {levelInfo ? levelInfo.title : 'Thử thách tự do'}
              </p>
            </div>

            {/* Score & Accuracy Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-brand-50 dark:bg-slate-800">
                <span className="text-xs font-bold text-brand-600 dark:text-brand-400 block">Tổng điểm</span>
                <span className="text-xl font-black text-slate-900 dark:text-white">{sessionScore}</span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-slate-800">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">Độ chính xác</span>
                <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">{sessionAccuracy}%</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800">
                <span className="text-xs font-bold text-slate-500 block">Số câu đúng</span>
                <span className="text-xl font-black text-slate-900 dark:text-white">
                  {sessionResults.filter(r => r.isCorrect).length} / {sessionResults.length}
                </span>
              </div>
            </div>

            {/* Unlocked Next Level Notification */}
            {unlockedNextLevel && levelId && levelId < 18 && (
              <div className="p-4 rounded-2xl bg-emerald-500 text-white font-bold text-sm shadow-md animate-pulse flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Chúc mừng! Bạn đã mở khóa Màn {levelId + 1}!</span>
              </div>
            )}

            {/* Action buttons */}
            <div className="space-y-2 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleReplay}
                  className="py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-sm flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" /> Chơi lại
                </button>

                {currentMistakesInSession.length > 0 && (
                  <button
                    onClick={() => onNavigate('/review')}
                    className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20"
                  >
                    <BookOpen className="w-4 h-4" /> Ôn câu sai ({currentMistakesInSession.length})
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onNavigate(levelId ? `/level/${levelId}/games` : '/levels')}
                  className="py-3 px-4 rounded-xl bg-slate-200 dark:bg-slate-700 font-bold text-sm text-slate-800 dark:text-slate-200"
                >
                  Đổi dạng game
                </button>

                {levelId && levelId < 18 ? (
                  <button
                    onClick={() => onNavigate(`/level/${levelId + 1}/games`)}
                    className="py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm flex items-center justify-center gap-1.5 shadow-md shadow-brand-500/20"
                  >
                    <span>Sang Màn {levelId + 1}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate('/levels')}
                    className="py-3 px-4 rounded-xl bg-brand-600 text-white font-bold text-sm"
                  >
                    Về danh sách màn
                  </button>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
