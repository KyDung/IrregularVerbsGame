import { VerbMastery, MasteryStatus } from '../types/progress';

export function calculateVerbMastery(
  previousMastery: VerbMastery | undefined,
  isCorrect: boolean,
  responseTimeMs: number
): VerbMastery {
  const current = previousMastery || {
    seenCount: 0,
    correctCount: 0,
    wrongCount: 0,
    correctStreak: 0,
    averageResponseTime: 0,
    lastReviewedAt: Date.now(),
    masteryScore: 0,
    status: 'new',
  };

  const newSeenCount = current.seenCount + 1;
  const newCorrectCount = current.correctCount + (isCorrect ? 1 : 0);
  const newWrongCount = current.wrongCount + (isCorrect ? 0 : 1);
  const newStreak = isCorrect ? current.correctStreak + 1 : 0;

  // Running average for response time
  const newAvgTime = Math.round(
    (current.averageResponseTime * current.seenCount + responseTimeMs) / newSeenCount
  );

  // Score computation (0 - 100)
  const accuracyRatio = newCorrectCount / newSeenCount;
  let score = accuracyRatio * 60; // Up to 60 points from accuracy ratio

  // Streak bonus up to 25 points (5 points per consecutive streak up to 5)
  score += Math.min(newStreak * 5, 25);

  // Speed bonus up to 15 points (answering under 3 seconds)
  if (isCorrect && responseTimeMs < 3000) {
    const speedPoints = Math.max(0, 15 - Math.floor(responseTimeMs / 300));
    score += speedPoints;
  }

  // Cap score between 0 and 100
  const finalScore = Math.max(0, Math.min(100, Math.round(score)));

  // Status determination
  let status: MasteryStatus = 'new';

  if (newSeenCount < 2) {
    status = 'new';
  } else if (finalScore >= 80 && newStreak >= 2 && newCorrectCount >= 3) {
    status = 'mastered';
  } else if (finalScore >= 50) {
    status = 'reviewing';
  } else {
    status = 'learning';
  }

  return {
    seenCount: newSeenCount,
    correctCount: newCorrectCount,
    wrongCount: newWrongCount,
    correctStreak: newStreak,
    averageResponseTime: newAvgTime,
    lastReviewedAt: Date.now(),
    masteryScore: finalScore,
    status,
  };
}
