import React from 'react';
import { Brain, Flame, Trophy, HelpCircle, Settings, BarChart2, Play } from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../i18n/translations';

interface NavbarProps {
  currentTab: 'play' | 'stats' | 'challenges' | 'tutorial' | 'settings';
  setCurrentTab: (tab: 'play' | 'stats' | 'challenges' | 'tutorial' | 'settings') => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  streakDays: number;
}

const languagesList: { code: LanguageCode; name: string; flag: string }[] = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  streakDays,
}) => {
  const t = translations[language] || translations.es;

  return (
    <header id="navbar-header" className="w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100 sticky top-0 z-30 shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2">
        {/* Logo & App Title */}
        <div id="nav-brand" className="flex items-center gap-2.5 cursor-pointer" onClick={() => setCurrentTab('play')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500 p-0.5 shadow-md shadow-indigo-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Brain className="w-5 h-5 text-indigo-400 animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="font-bold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
              {t.appName}
            </h1>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Center Navigation Tabs */}
        <nav id="nav-tabs" className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800/80 overflow-x-auto max-w-full">
          <button
            id="tab-btn-play"
            onClick={() => setCurrentTab('play')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              currentTab === 'play'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>{t.tabPlay}</span>
          </button>

          <button
            id="tab-btn-stats"
            onClick={() => setCurrentTab('stats')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              currentTab === 'stats'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>{t.tabStats}</span>
          </button>

          <button
            id="tab-btn-challenges"
            onClick={() => setCurrentTab('challenges')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              currentTab === 'challenges'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>{t.tabChallenges}</span>
          </button>

          <button
            id="tab-btn-tutorial"
            onClick={() => setCurrentTab('tutorial')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              currentTab === 'tutorial'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t.tabTutorial}</span>
          </button>

          <button
            id="tab-btn-settings"
            onClick={() => setCurrentTab('settings')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              currentTab === 'settings'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{t.tabSettings}</span>
          </button>
        </nav>

        {/* Right Section: Streak Badge & Language Selector */}
        <div id="nav-right-controls" className="flex items-center gap-2">
          {/* Daily Streak */}
          <div
            id="daily-streak-badge"
            title={`${streakDays} ${t.streakDays}`}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold"
          >
            <Flame className="w-4 h-4 fill-amber-400 text-amber-500 animate-bounce" />
            <span>{streakDays}d</span>
          </div>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <select
              id="language-select-dropdown"
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded-lg px-2.5 py-1.5 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer appearance-none pr-7"
            >
              {languagesList.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-slate-900 text-slate-200">
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">
              ▼
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
