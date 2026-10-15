import React from 'react';
import { Lightbulb, CheckCircle2, X, Brain } from 'lucide-react';
import { LanguageCode, SmartHint } from '../types';
import { translations } from '../i18n/translations';

interface SmartHintModalProps {
  hint: SmartHint | null;
  onClose: () => void;
  onApplyHint: (hint: SmartHint) => void;
  language: LanguageCode;
}

export const SmartHintModal: React.FC<SmartHintModalProps> = ({
  hint,
  onClose,
  onApplyHint,
  language,
}) => {
  if (!hint) return null;
  const t = translations[language] || translations.es;

  return (
    <div id="smart-hint-modal-overlay" className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div id="smart-hint-modal-card" className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl p-5 shadow-2xl shadow-cyan-950/50 flex flex-col gap-4 text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-cyan-300 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-100">{t.hintTitle}</h3>
              <p className="text-xs font-semibold text-cyan-400">{hint.technique}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Explanation Text */}
        <div className="bg-slate-950/80 rounded-xl p-3.5 border border-slate-800 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <Brain className="w-4 h-4 text-indigo-400" />
            <span>{t.hintExplanation}:</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed">
            {hint.explanation}
          </p>
        </div>

        {/* Action Highlights */}
        <div className="flex items-center justify-between text-xs font-medium text-slate-400 bg-indigo-950/30 px-3 py-2 rounded-lg border border-indigo-900/40">
          <span>Casilla: Fila {hint.row + 1}, Columna {hint.col + 1}</span>
          <span className="font-bold text-indigo-300">Número a colocar: {hint.value}</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            {t.hintClose}
          </button>
          <button
            onClick={() => onApplyHint(hint)}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/20 flex items-center justify-center gap-1.5 transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{t.hintApply} ({hint.value})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
