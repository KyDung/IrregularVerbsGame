import React, { useState } from 'react';
import { 
  BookOpen, 
  Layers, 
  Search, 
  BookmarkCheck, 
  BarChart3, 
  Settings, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  Flame,
  Menu,
  X
} from 'lucide-react';
import { useProgress } from '../../hooks/useProgress';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const { progress, settings, updateSettings } = useProgress();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      document.documentElement.classList.remove('dark');
      updateSettings({ theme: 'light' });
    } else {
      document.documentElement.classList.add('dark');
      updateSettings({ theme: 'dark' });
    }
  };

  const uniqueWrongCount = new Set(progress.mistakes.map(m => m.verbId)).size;

  const navItems = [
    { id: '/', label: 'Trang chủ', icon: BookOpen },
    { id: '/levels', label: '18 Màn học', icon: Layers },
    { id: '/dictionary', label: 'Từ điển 360', icon: Search },
    { id: '/review', label: 'Ôn từ sai', icon: BookmarkCheck, badge: uniqueWrongCount },
    { id: '/statistics', label: 'Thống kê', icon: BarChart3 },
    { id: '/settings', label: 'Cài đặt', icon: Settings },
  ];

  const handleNavClick = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('/')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-blue-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              360
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-brand-700 to-blue-600 dark:from-white dark:via-brand-300 dark:to-blue-400 bg-clip-text text-transparent">
                Irregular Verbs
              </span>
              <span className="hidden sm:inline-block ml-1.5 text-xs px-2 py-0.5 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 font-bold">
                PRO
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.id || (item.id !== '/' && currentRoute.startsWith(item.id));
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'bg-brand-50 dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs font-bold rounded-full bg-amber-500 text-white animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2">
            {/* Streak Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900/50 text-amber-600 dark:text-amber-400 text-xs font-bold">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-bounce-short" />
              <span>{progress.dailyStreak} ngày</span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={settings.soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
              aria-label="Toggle Sound"
            >
              {settings.soundEnabled ? <Volume2 className="w-5 h-5 text-brand-500" /> : <VolumeX className="w-5 h-5 opacity-60" />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Đổi giao diện Sáng / Tối"
              aria-label="Toggle Theme"
            >
              <Sun className="w-5 h-5 hidden dark:block text-amber-400" />
              <Moon className="w-5 h-5 block dark:hidden text-slate-700" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle Mobile Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id || (item.id !== '/' && currentRoute.startsWith(item.id));
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${isActive ? 'bg-white text-brand-600' : 'bg-amber-500 text-white'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
