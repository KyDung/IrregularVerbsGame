/**
 * Normalizes a user string answer by:
 * - Lowercasing
 * - Trimming whitespace
 * - Replacing multiple consecutive spaces with a single space
 */
export function normalizeAnswer(input: string): string {
  if (!input) return '';
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

/**
 * Splits user input string if they typed multiple variants using separators like /, ;, comma or ' or '
 */
export function extractUserAnswerVariants(input: string): string[] {
  const normalized = normalizeAnswer(input);
  if (!normalized) return [];

  // Split by /, ;, comma, or ' hoac ' / ' or '
  const rawParts = normalized.split(/[/;,]|\bhoặc\b|\bor\b/g);
  return rawParts
    .map(part => part.trim())
    .filter(part => part.length > 0);
}

/**
 * Validates if the user input matches any of the accepted valid answers.
 * If user entered multiple items separated by slash/comma, any valid single match is accepted.
 */
export function isAnswerCorrect(
  userAnswer: string | string[],
  validAnswers: string[]
): boolean {
  if (!userAnswer) return false;

  const normalizedValidAnswers = validAnswers.map(ans => normalizeAnswer(ans));

  if (Array.isArray(userAnswer)) {
    return userAnswer.some(uAns => {
      const uNorm = normalizeAnswer(uAns);
      return normalizedValidAnswers.includes(uNorm);
    });
  }

  const userVariants = extractUserAnswerVariants(userAnswer);
  if (userVariants.length === 0) return false;

  // If any variant typed by user is in valid answers, accept!
  return userVariants.some(variant => normalizedValidAnswers.includes(variant));
}

/**
 * Formats valid answers into a clean display string (e.g., "learned / learnt")
 */
export function formatAnswersDisplay(answers: string[]): string {
  if (!answers || answers.length === 0) return '';
  return Array.from(new Set(answers)).join(' / ');
}
