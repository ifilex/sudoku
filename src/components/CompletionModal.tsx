import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Clock, Brain, Sparkles, CheckCircle2 } from 'lucide-react';
import { CognitiveMetrics, LanguageCode } from '../types';
import { translations } from '../i18n/translations';

interface CompletionModalProps {
  elapsedTime: number;
  mistakesCount: number;
  hintsUsed: number;
  metrics: CognitiveMetrics;
  onPlayAgain: () => void;
  language: LanguageCode;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  elapsedTime,
  mistakesCount,
  hintsUsed,
  metrics,
  onPlayAgain,
  language,
}) => {
  const t = translations[language] || translations.es;

  useEffect(() => {
    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.log('Confetti burst');
    }
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div id="completion-modal-overlay" className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div id="completion-modal-card" className="w-full max-w-md bg-gradient-to-b from-slate-900 to-indigo-950 border border-indigo-500/40 rounded-3xl p-6 shadow-2xl flex flex-col items-center gap-5 text-center text-slate-100">
        {/* Trophy Icon */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-indigo-600 to-cyan-400 p-1 shadow-xl shadow-amber-500/20 flex items-center justify-center">
          <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
            <Trophy className="w-10 h-10 text-amber-400 animate-bounce" />
          </div>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-2xl font-black bg-gradient-to-r from-amber-200 via-white to-cyan-200 bg-clip-text text-transparent">
            {t.congratsTitle}
          </h2>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            {t.congratsMessage}
          </p>
        </div>

        {/* Cognitive Points Gain Banner */}
        <div className="w-full bg-indigo-900/40 border border-indigo-500/30 rounded-2xl p-4 flex items-center justify-around">
          <div className="flex flex-col items-center">
            <Brain className="w-5 h-5 text-indigo-300 mb-1" />
            <span className="text-[10px] text-indigo-300 uppercase font-semibold">{t.memoryIndex}</span>
            <span className="text-lg font-black text-white">{metrics.memoryIndex}</span>
          </div>

          <div className="w-px h-8 bg-indigo-800/80" />

          <div className="flex flex-col items-center">
            <Sparkles className="w-5 h-5 text-amber-400 mb-1" />
            <span className="text-[10px] text-amber-300 uppercase font-semibold">{t.overallAgility}</span>
            <span className="text-lg font-black text-amber-300">+{metrics.overallAgility} pts</span>
          </div>

          <div className="w-px h-8 bg-indigo-800/80" />

          <div className="flex flex-col items-center">
            <Clock className="w-5 h-5 text-cyan-400 mb-1" />
            <span className="text-[10px] text-cyan-300 uppercase font-semibold">{t.time}</span>
            <span className="text-lg font-black text-white">{formatTime(elapsedTime)}</span>
          </div>
        </div>

        {/* Secondary Details */}
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
          <span>{t.mistakes}: <strong className="text-rose-400">{mistakesCount}</strong></span>
          <span>Pistas: <strong className="text-cyan-400">{hintsUsed}</strong></span>
        </div>

        {/* Play Again Button */}
        <button
          onClick={onPlayAgain}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>{t.playAgain}</span>
        </button>
      </div>
    </div>
  );
};
