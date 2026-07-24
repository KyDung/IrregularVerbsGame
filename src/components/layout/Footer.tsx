import React from 'react';
import { Sparkles, Github, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-500" />
          <span className="font-medium text-slate-700 dark:text-slate-300">
            Irregular Verbs 360
          </span>
          <span>•</span>
          <span>Ứng dụng luyện tập 360 động từ bất quy tắc tiếng Anh chuẩn hóa.</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            Xây dựng với <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> cho người học tiếng Anh
          </span>
          <span>•</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-brand-600 dark:hover:text-brand-400 font-medium transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Pages Compatible</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
