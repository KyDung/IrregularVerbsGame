import { describe, it, expect } from 'vitest';
import { validateVerbDataset } from '../utils/datasetValidator';
import { IRREGULAR_VERBS } from '../data/verbsData';

describe('datasetValidator', () => {
  it('should pass dataset validation with 360 verbs and 18 levels', () => {
    const report = validateVerbDataset(IRREGULAR_VERBS);
    expect(report.isValid).toBe(true);
    expect(report.errors).toHaveLength(0);
    expect(report.totalVerbs).toBe(360);

    for (let i = 1; i <= 18; i++) {
      expect(report.levelCounts[i]).toBe(20);
    }
  });
});
