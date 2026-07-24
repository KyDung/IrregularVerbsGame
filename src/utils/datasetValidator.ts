import { IrregularVerb } from '../types/verb';
import { LEVELS } from '../data/levelsData';

export interface ValidationReport {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  totalVerbs: number;
  levelCounts: Record<number, number>;
}

export function validateVerbDataset(verbs: IrregularVerb[]): ValidationReport {
  const errors: string[] = [];
  const warnings: string[] = [];
  const levelCounts: Record<number, number> = {};

  // Initialize level counts
  for (let i = 1; i <= 18; i++) {
    levelCounts[i] = 0;
  }

  // 1. Total count check
  if (verbs.length !== 360) {
    errors.push(`Dataset length is ${verbs.length}, but expected exactly 360 verbs.`);
  }

  const seenIds = new Set<string>();

  verbs.forEach((verb, idx) => {
    // 2. ID check
    if (!verb.id) {
      errors.push(`Verb at index ${idx} is missing an ID.`);
    } else if (seenIds.has(verb.id)) {
      errors.push(`Duplicate verb ID found: "${verb.id}".`);
    } else {
      seenIds.add(verb.id);
    }

    // 3. V1, V2, V3, Meaning checks
    if (!verb.v1 || verb.v1.trim() === '') {
      errors.push(`Verb "${verb.id}" is missing V1.`);
    }
    if (!Array.isArray(verb.v2) || verb.v2.length === 0) {
      errors.push(`Verb "${verb.id}" must have at least one V2 form.`);
    } else {
      const v2Set = new Set(verb.v2);
      if (v2Set.size !== verb.v2.length) {
        warnings.push(`Verb "${verb.id}" has duplicate items in V2 array.`);
      }
    }
    if (!Array.isArray(verb.v3) || verb.v3.length === 0) {
      errors.push(`Verb "${verb.id}" must have at least one V3 form.`);
    } else {
      const v3Set = new Set(verb.v3);
      if (v3Set.size !== verb.v3.length) {
        warnings.push(`Verb "${verb.id}" has duplicate items in V3 array.`);
      }
    }
    if (!verb.meaning || verb.meaning.trim() === '') {
      errors.push(`Verb "${verb.id}" is missing Vietnamese meaning.`);
    }

    // 4. Level check
    if (!verb.level || verb.level < 1 || verb.level > 18) {
      errors.push(`Verb "${verb.id}" has invalid level: ${verb.level}. Must be 1-18.`);
    } else {
      levelCounts[verb.level] = (levelCounts[verb.level] || 0) + 1;
    }
  });

  // 5. Level balance check (each level must have 20 verbs)
  Object.entries(levelCounts).forEach(([lvl, count]) => {
    if (count !== 20) {
      errors.push(`Level ${lvl} has ${count} verbs, expected exactly 20.`);
    }
  });

  // 6. Check LEVELS metadata alignment
  if (LEVELS.length !== 18) {
    errors.push(`LEVELS metadata count is ${LEVELS.length}, expected 18.`);
  }

  LEVELS.forEach(level => {
    if (level.verbIds.length !== 20) {
      errors.push(`Level metadata ${level.id} has ${level.verbIds.length} verbIds, expected 20.`);
    }
  });

  const isValid = errors.length === 0;

  if (process.env.NODE_ENV === 'development') {
    if (!isValid) {
      console.error('[Dataset Validator] Validation FAILED:', errors);
    } else if (warnings.length > 0) {
      console.warn('[Dataset Validator] Validation Warnings:', warnings);
    } else {
      console.log('[Dataset Validator] Dataset PASSED all checks (360 verbs, 18 levels of 20).');
    }
  }

  return {
    isValid,
    errors,
    warnings,
    totalVerbs: verbs.length,
    levelCounts,
  };
}
