import { describe, it, expect } from 'vitest';
import { generateDistractors } from '../utils/distractorGenerator';
import { IRREGULAR_VERBS } from '../data/verbsData';

describe('distractorGenerator', () => {
  it('should generate distractors without dual correct answers or duplicates', () => {
    const targetVerb = IRREGULAR_VERBS.find(v => v.id === 'write')!;
    const distractors = generateDistractors(
      targetVerb,
      'v2',
      IRREGULAR_VERBS,
      IRREGULAR_VERBS.slice(0, 20),
      3
    );

    expect(distractors).toHaveLength(3);
    const uniqueDistractors = new Set(distractors.map(d => d.toLowerCase()));
    expect(uniqueDistractors.size).toBe(3);

    // Target answer "wrote" must not be in distractors!
    expect(uniqueDistractors.has('wrote')).toBe(false);
  });
});
