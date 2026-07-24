import React, { useState, useMemo } from 'react';
import { IRREGULAR_VERBS } from '../data/verbsData';
import { IrregularVerb } from '../types/verb';
import { useProgress } from '../hooks/useProgress';
import { VerbCard } from '../components/dictionary/VerbCard';
import { VerbDetailModal } from '../components/dictionary/VerbDetailModal';
import { Search, Filter, Volume2, BookOpen } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export const DictionaryPage: React.FC = () => {
  const { progress } = useProgress();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPattern, setSelectedPattern] = useState<string>('all');
  const [activeVerb, setActiveVerb] = useState<IrregularVerb | null>(null);

  const filteredVerbs = useMemo(() => {
    return IRREGULAR_VERBS.filter(verb => {
      // 1. Search filter
      const query = searchTerm.toLowerCase().trim();
      if (query) {
        const matchV1 = verb.v1.toLowerCase().includes(query);
        const matchV2 = verb.v2.some(v => v.toLowerCase().includes(query));
        const matchV3 = verb.v3.some(v => v.toLowerCase().includes(query));
        const matchMeaning = verb.meaning.toLowerCase().includes(query);
        if (!matchV1 && !matchV2 && !matchV3 && !matchMeaning) {
          return false;
        }
      }

      // 2. Level filter
      if (selectedLevel !== 'all' && verb.level !== selectedLevel) {
        return false;
      }

      // 3. Status filter
      if (selectedStatus !== 'all') {
        const mastery = progress.verbMastery[verb.id];
        const status = mastery?.status || 'new';
        if (status !== selectedStatus) return false;
      }

      // 4. Pattern filter
      if (selectedPattern === 'v1=v2=v3') {
        if (verb.patternGroup !== 'v1=v2=v3') return false;
      } else if (selectedPattern === 'v2=v3') {
        if (verb.patternGroup !== 'v2=v3') return false;
      } else if (selectedPattern === 'variants') {
        if (!verb.variants || verb.variants.length === 0) return false;
      }

      return true;
    });
  }, [searchTerm, selectedLevel, selectedStatus, selectedPattern, progress.verbMastery]);

  const speak = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } else {
      soundEffects.playCorrect(progress.settings.soundEnabled);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Từ điển 360 Động từ bất quy tắc
        </h1>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Tra cứu toàn bộ 360 động từ, biến thể Anh-Mỹ, ghi chú ngữ pháp và thống kê ghi nhớ cá nhân.
        </p>
      </div>

      {/* Filter Control Bar */}
      <div className="glass-card p-4 sm:p-6 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Tìm theo V1, V2, V3 hoặc nghĩa tiếng Việt..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold text-sm focus:outline-none focus:border-brand-500 transition-colors"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold">
          {/* Level Filter */}
          <div>
            <label className="block text-slate-500 mb-1">Màn học</label>
            <select
              value={selectedLevel}
              onChange={e => setSelectedLevel(e.target.value === 'all' ? 'all' : parseInt(e.target.value, 10))}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              <option value="all">Tất cả 18 Màn (360 từ)</option>
              {Array.from({ length: 18 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Màn {i + 1} (20 từ)
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-slate-500 mb-1">Trạng thái ghi nhớ</label>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="new">Từ mới (Chưa học)</option>
              <option value="learning">Đang học (&lt; 50 điểm)</option>
              <option value="reviewing">Đang ôn tập (50 - 80 điểm)</option>
              <option value="mastered">Đã thuộc (&gt; 80 điểm)</option>
            </select>
          </div>

          {/* Pattern Filter */}
          <div>
            <label className="block text-slate-500 mb-1">Mẫu biến đổi đặc biệt</label>
            <select
              value={selectedPattern}
              onChange={e => setSelectedPattern(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              <option value="all">Tất cả mẫu từ</option>
              <option value="v1=v2=v3">V1 = V2 = V3 (cut - cut - cut)</option>
              <option value="v2=v3">V2 = V3 (build - built - built)</option>
              <option value="variants">Có nhiều biến thể Anh - Mỹ</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>Hiển thị {filteredVerbs.length} / 360 động từ</span>
      </div>

      {/* Verbs Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredVerbs.map(verb => (
          <VerbCard
            key={verb.id}
            verb={verb}
            mastery={progress.verbMastery[verb.id]}
            onClick={v => setActiveVerb(v)}
            onPlaySound={speak}
          />
        ))}
      </div>

      {/* Detail Modal */}
      <VerbDetailModal
        verb={activeVerb}
        mastery={activeVerb ? progress.verbMastery[activeVerb.id] : undefined}
        isOpen={activeVerb !== null}
        onClose={() => setActiveVerb(null)}
        soundEnabled={progress.settings.soundEnabled}
      />
    </div>
  );
};
