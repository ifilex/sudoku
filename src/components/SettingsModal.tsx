import React from 'react';
import { Settings, Check, Trash2, Globe, Eye, Palette } from 'lucide-react';
import { LanguageCode, UserPreferences } from '../types';
import { translations } from '../i18n/translations';

interface SettingsModalProps {
  preferences: UserPreferences;
  onUpdatePreferences: (updated: Partial<UserPreferences>) => void;
  onResetData: () => void;
  language: LanguageCode;
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

export const SettingsModal: React.FC<SettingsModalProps> = ({
  preferences,
  onUpdatePreferences,
  onResetData,
  language,
}) => {
  const t = translations[language] || translations.es;

  return (
    <div id="settings-view" className="w-full max-w-2xl mx-auto p-4 flex flex-col gap-6 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
          <Settings className="w-7 h-7 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{t.settingsTitle}</h2>
          <p className="text-xs text-slate-400">{t.appSubtitle}</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
        {/* Language Selector */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <Globe className="w-5 h-5 text-indigo-400" />
            <div>
              <p className="text-sm font-bold">{t.languageSelect}</p>
              <p className="text-xs text-slate-400">9 idiomas disponibles</p>
            </div>
          </div>

          <select
            value={preferences.language}
            onChange={(e) => onUpdatePreferences({ language: e.target.value as LanguageCode })}
            className="bg-slate-950 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            {languagesList.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Assistance Toggles */}
        <div className="flex flex-col gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Eye className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="text-sm font-bold">{t.autoCheckErrors}</p>
                <p className="text-xs text-slate-400">Destaca números incorrectos en rojo al instante</p>
              </div>
            </div>
            <button
              onClick={() => onUpdatePreferences({ autoCheckErrors: !preferences.autoCheckErrors })}
              className={`w-12 h-6 rounded-full transition-all relative ${
                preferences.autoCheckErrors ? 'bg-indigo-600' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
                  preferences.autoCheckErrors ? 'right-0.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Check className="w-5 h-5 text-amber-400" />
              <div>
                <p className="text-sm font-bold">{t.highlightMatchingNumbers}</p>
                <p className="text-xs text-slate-400">Resalta casillas con la misma cifra seleccionada</p>
              </div>
            </div>
            <button
              onClick={() =>
                onUpdatePreferences({ highlightMatchingNumbers: !preferences.highlightMatchingNumbers })
              }
              className={`w-12 h-6 rounded-full transition-all relative ${
                preferences.highlightMatchingNumbers ? 'bg-indigo-600' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
                  preferences.highlightMatchingNumbers ? 'right-0.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Eye className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="text-sm font-bold">{t.highlightRowColBox}</p>
                <p className="text-xs text-slate-400">Sombra suave en fila, columna y región activa</p>
              </div>
            </div>
            <button
              onClick={() =>
                onUpdatePreferences({ highlightRowColBox: !preferences.highlightRowColBox })
              }
              className={`w-12 h-6 rounded-full transition-all relative ${
                preferences.highlightRowColBox ? 'bg-indigo-600' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
                  preferences.highlightRowColBox ? 'right-0.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Check className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-sm font-bold">{t.autoClearNotes}</p>
                <p className="text-xs text-slate-400">Borra candidatos al colocar un número definitivo</p>
              </div>
            </div>
            <button
              onClick={() => onUpdatePreferences({ autoClearNotes: !preferences.autoClearNotes })}
              className={`w-12 h-6 rounded-full transition-all relative ${
                preferences.autoClearNotes ? 'bg-indigo-600' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
                  preferences.autoClearNotes ? 'right-0.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Visual Theme Selection */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <Palette className="w-5 h-5 text-cyan-400" />
            <div>
              <p className="text-sm font-bold">{t.themeSelect}</p>
              <p className="text-xs text-slate-400">Ajusta el contraste para proteger tu vista</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onUpdatePreferences({ theme: 'dark-cognitive' })}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                preferences.theme === 'dark-cognitive'
                  ? 'bg-indigo-600 text-white border-indigo-400'
                  : 'bg-slate-950 text-slate-400 border-slate-800'
              }`}
            >
              Dark Cognitive
            </button>
            <button
              onClick={() => onUpdatePreferences({ theme: 'amber-focus' })}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                preferences.theme === 'amber-focus'
                  ? 'bg-amber-600 text-white border-amber-400'
                  : 'bg-slate-950 text-slate-400 border-slate-800'
              }`}
            >
              Amber Focus
            </button>
          </div>
        </div>

        {/* Reset Data Button */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-sm font-bold text-rose-400">{t.resetData}</p>
            <p className="text-xs text-slate-400">Borra partidas guardadas y estadísticas acumuladas</p>
          </div>

          <button
            onClick={() => {
              if (window.confirm(t.resetConfirm)) {
                onResetData();
              }
            }}
            className="px-4 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800/80 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Restablecer Todo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
