import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { LevelsPage } from './pages/LevelsPage';
import { LevelGamesPage } from './pages/LevelGamesPage';
import { GamePlayPage } from './pages/GamePlayPage';
import { ReviewPage } from './pages/ReviewPage';
import { DictionaryPage } from './pages/DictionaryPage';
import { StatisticsPage } from './pages/StatisticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { FlashcardView } from './components/flashcards/FlashcardView';
import { getLevelById } from './data/levelsData';
import { IRREGULAR_VERBS } from './data/verbsData';
import { GameType } from './types/game';
import { useProgress } from './hooks/useProgress';

export const App: React.FC = () => {
  // Simple hash-based router for 100% reliable GitHub Pages deployment without 404s
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || '/';
  });

  const { progress } = useProgress();

  // Apply dark mode theme on initial boot based on settings
  useEffect(() => {
    if (progress.settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (progress.settings.theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // System preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [progress.settings.theme]);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentRoute(hash || '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (route: string) => {
    window.location.hash = route;
    setCurrentRoute(route);
  };

  const renderContent = () => {
    // 1. Home
    if (currentRoute === '/' || currentRoute === '') {
      return <HomePage onNavigate={navigate} />;
    }

    // 2. Levels list
    if (currentRoute === '/levels') {
      return <LevelsPage onNavigate={navigate} />;
    }

    // 3. Dictionary
    if (currentRoute === '/dictionary') {
      return <DictionaryPage />;
    }

    // 4. Review mistakes
    if (currentRoute === '/review') {
      return (
        <ReviewPage
          onNavigate={navigate}
          onLaunchMistakeGame={() => navigate('/game/mistake_review')}
        />
      );
    }

    // 5. Statistics
    if (currentRoute === '/statistics') {
      return <StatisticsPage />;
    }

    // 6. Settings
    if (currentRoute === '/settings') {
      return <SettingsPage />;
    }

    // 7. Standalone game launch: e.g. /game/mistake_review or /game/odd_one_out
    if (currentRoute.startsWith('/game/')) {
      const gType = currentRoute.replace('/game/', '') as GameType;
      return (
        <GamePlayPage
          gameType={gType}
          allVerbs={IRREGULAR_VERBS}
          onNavigate={navigate}
        />
      );
    }

    // 8. Level specific routes: /level/:levelId, /level/:levelId/learn, /level/:levelId/games, /level/:levelId/game/:gameType
    const levelMatch = currentRoute.match(/^\/level\/(\d+)(?:\/(learn|games|game\/([a-z_]+)))?$/);
    if (levelMatch) {
      const levelId = parseInt(levelMatch[1], 10);
      const subAction = levelMatch[2];
      const gameTypeParam = levelMatch[3] as GameType;

      const level = getLevelById(levelId);
      if (!level) {
        return (
          <div className="max-w-md mx-auto p-8 text-center glass-card my-12 space-y-4">
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Màn học không tồn tại (Level {levelId})
            </h2>
            <button
              onClick={() => navigate('/levels')}
              className="px-4 py-2 rounded-xl bg-brand-600 text-white font-bold text-xs"
            >
              Quay lại danh sách 18 Màn
            </button>
          </div>
        );
      }

      const levelVerbs = IRREGULAR_VERBS.filter(v => v.level === levelId);

      // Learn subpage
      if (subAction === 'learn') {
        return (
          <FlashcardView
            verbs={levelVerbs}
            levelTitle={level.title}
            soundEnabled={progress.settings.soundEnabled}
            onBackToLevel={() => navigate('/levels')}
            onStartGames={() => navigate(`/level/${levelId}/games`)}
          />
        );
      }

      // Games selector subpage
      if (subAction === 'games') {
        return (
          <LevelGamesPage
            levelId={levelId}
            onNavigate={navigate}
            onSelectGame={(lId, gType) => navigate(`/level/${lId}/game/${gType}`)}
          />
        );
      }

      // Active level game
      if (subAction && subAction.startsWith('game/')) {
        return (
          <GamePlayPage
            levelId={levelId}
            gameType={gameTypeParam}
            allVerbs={IRREGULAR_VERBS}
            onNavigate={navigate}
          />
        );
      }

      // Default level landing -> open LevelGamesPage
      return (
        <LevelGamesPage
          levelId={levelId}
          onNavigate={navigate}
          onSelectGame={(lId, gType) => navigate(`/level/${lId}/game/${gType}`)}
        />
      );
    }

    // Fallback 404
    return (
      <div className="max-w-md mx-auto p-8 text-center glass-card my-12 space-y-4">
        <h2 className="text-xl font-black text-slate-900 dark:text-white">
          Trang không tồn tại (404)
        </h2>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 rounded-xl bg-brand-600 text-white font-bold text-xs"
        >
          Về Trang chủ
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      <Navbar currentRoute={currentRoute} onNavigate={navigate} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};
export default App;
