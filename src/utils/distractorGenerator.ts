import { IrregularVerb } from '../types/verb';
import { MistakeRecord } from '../types/progress';
import { normalizeAnswer } from './answerNormalizer';

/**
 * Calculates Levenshtein distance between two strings
 */
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Fisher-Yates array shuffle algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export type DistractorFormType = 'v1' | 'v2' | 'v3' | 'pair' | 'meaning';

/**
 * Gets candidate string values for a verb given a form type
 */
function getFormValues(verb: IrregularVerb, formType: DistractorFormType): string[] {
  switch (formType) {
    case 'v1':
      return [verb.v1];
    case 'v2':
      return verb.v2;
    case 'v3':
      return verb.v3;
    case 'pair':
      // Pair of V2 – V3, e.g. "went – gone"
      return verb.v2.flatMap(v2 => verb.v3.map(v3 => `${v2} – ${v3}`));
    case 'meaning':
      return [verb.meaning];
    default:
      return [verb.v1];
  }
}

/**
 * Generates smart, high-difficulty distractor options for quiz questions.
 * Enforces strict safety rules: no dual correct answers, no duplicates, smart scoring.
 */
export function generateDistractors(
  targetVerb: IrregularVerb,
  formType: DistractorFormType,
  allVerbs: IrregularVerb[],
  currentLevelVerbs: IrregularVerb[] = [],
  count: number = 3,
  mistakeHistory: MistakeRecord[] = []
): string[] {
  const validTargetAnswers = getFormValues(targetVerb, formType).map(v => normalizeAnswer(v));
  const mistakeVerbIds = new Set(mistakeHistory.map(m => m.verbId));
  const currentLevelVerbIds = new Set(currentLevelVerbs.map(v => v.id));

  const candidates: { text: string; score: number }[] = [];
  const addedTexts = new Set<string>();

  const evaluateAndAddCandidate = (text: string, candidateVerb: IrregularVerb) => {
    const normText = normalizeAnswer(text);

    // Rule 1: Cannot match any valid target answer!
    if (validTargetAnswers.includes(normText)) return;

    // Rule 2: Cannot duplicate an already added option!
    if (addedTexts.has(normText)) return;

    let score = 0;

    // Same level bonus (+10)
    if (currentLevelVerbIds.has(candidateVerb.id)) {
      score += 10;
    }

    // Learner mistake history bonus (+20)
    if (mistakeVerbIds.has(candidateVerb.id)) {
      score += 20;
    }

    // Same transformation pattern bonus (+20)
    if (
      targetVerb.patternGroup &&
      candidateVerb.patternGroup &&
      targetVerb.patternGroup === candidateVerb.patternGroup
    ) {
      score += 20;
    }

    // Spelling similarity bonus
    const primaryTargetAnswer = validTargetAnswers[0] || '';
    const dist = levenshteinDistance(normText, primaryTargetAnswer);
    if (dist <= 4) {
      score += 20 - dist * 3;
    }

    if (Math.abs(normText.length - primaryTargetAnswer.length) <= 2) {
      score += 5;
    }

    addedTexts.add(normText);
    candidates.push({ text, score });
  };

  // Special Pair Distractors: generate reversed/swapped and near-miss V2-V3 combinations for high difficulty!
  if (formType === 'pair') {
    const targetV2 = targetVerb.v2[0];
    const targetV3 = targetVerb.v3[0];

    // Candidate 1: Swapped V3 – V2 if V2 != V3
    if (targetV2 !== targetV3) {
      evaluateAndAddCandidate(`${targetV3} – ${targetV2}`, targetVerb);
    }

    // Candidate 2: Repeated V2 – V2 if V2 != V3
    if (targetV2 !== targetV3) {
      evaluateAndAddCandidate(`${targetV2} – ${targetV2}`, targetVerb);
    }

    // Candidate 3: Near-miss pairings using target V2/V3 combined with other verbs' forms
    allVerbs.forEach(v => {
      if (v.id === targetVerb.id) return;
      if (v.v3[0] !== targetV3) {
        evaluateAndAddCandidate(`${targetV2} – ${v.v3[0]}`, v);
      }
      if (v.v2[0] !== targetV2) {
        evaluateAndAddCandidate(`${v.v2[0]} – ${targetV3}`, v);
      }
    });
  }

  // Step 1: Scan current level verbs
  currentLevelVerbs.forEach(verb => {
    if (verb.id === targetVerb.id) return;
    const forms = getFormValues(verb, formType);
    forms.forEach(form => evaluateAndAddCandidate(form, verb));
  });

  // Step 2: Scan all verbs
  allVerbs.forEach(verb => {
    if (verb.id === targetVerb.id || currentLevelVerbIds.has(verb.id)) return;
    const forms = getFormValues(verb, formType);
    forms.forEach(form => evaluateAndAddCandidate(form, verb));
  });

  // Step 3: Sort candidates by score descending and select top distractor choices
  candidates.sort((a, b) => b.score - a.score);

  const topPoolSize = Math.max(count * 4, 12);
  const topPool = candidates.slice(0, topPoolSize);
  const selectedDistractors: string[] = [];

  const shuffledPool = shuffleArray(topPool);
  for (const item of shuffledPool) {
    if (selectedDistractors.length >= count) break;
    selectedDistractors.push(item.text);
  }

  // Fallback if needed
  if (selectedDistractors.length < count) {
    for (const item of candidates) {
      if (selectedDistractors.length >= count) break;
      if (!selectedDistractors.includes(item.text)) {
        selectedDistractors.push(item.text);
      }
    }
  }

  return selectedDistractors;
}
