import { describe, it, expect } from 'vitest';
import { normalizeAnswer, extractUserAnswerVariants, isAnswerCorrect } from '../utils/answerNormalizer';

describe('answerNormalizer', () => {
  it('should normalize casing and extra spaces', () => {
    expect(normalizeAnswer('   WROTE   ')).toBe('wrote');
    expect(normalizeAnswer('Written   Book')).toBe('written book');
    expect(normalizeAnswer('  GOTTEN  ')).toBe('gotten');
  });

  it('should extract multiple user variants accurately', () => {
    expect(extractUserAnswerVariants('learned / learnt')).toEqual(['learned', 'learnt']);
    expect(extractUserAnswerVariants('learned, learnt')).toEqual(['learned', 'learnt']);
    expect(extractUserAnswerVariants('learned; learnt')).toEqual(['learned', 'learnt']);
    expect(extractUserAnswerVariants('learned hoặc learnt')).toEqual(['learned', 'learnt']);
  });

  it('should correctly validate single and multi-variant user answers', () => {
    const validAnswers = ['learned', 'learnt'];

    expect(isAnswerCorrect('learned', validAnswers)).toBe(true);
    expect(isAnswerCorrect('LEARNT', validAnswers)).toBe(true);
    expect(isAnswerCorrect('learned / learnt', validAnswers)).toBe(true);
    expect(isAnswerCorrect('  learnt  ', validAnswers)).toBe(true);
    expect(isAnswerCorrect('learn', validAnswers)).toBe(false);
    expect(isAnswerCorrect('wrong', validAnswers)).toBe(false);
  });
});
