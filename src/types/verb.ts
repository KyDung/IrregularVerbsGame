export interface VerbVariant {
  form: string;
  region?: 'UK' | 'US' | 'both';
  note?: string;
}

export interface Pronunciation {
  v1?: string;
  v2?: string;
  v3?: string;
}

export type PatternGroup =
  | 'v1=v2=v3'
  | 'v2=v3'
  | 'v1=v3'
  | 'v1!=v2!=v3'
  | 'vowel_change'
  | 'en_suffix'
  | 'mixed';

export interface IrregularVerb {
  id: string;
  v1: string;
  v2: string[];
  v3: string[];
  meaning: string;
  level: number; // 1 - 18
  frequency?: 'common' | 'medium' | 'rare';
  notes?: string;
  pronunciation?: Pronunciation;
  patternGroup?: PatternGroup;
  variants?: VerbVariant[];
  validFormPairs?: Array<{
    v2: string;
    v3: string;
  }>;
}

export interface LevelInfo {
  id: number;
  title: string;
  description: string;
  verbIds: string[];
  unlockedByDefault: boolean;
}
