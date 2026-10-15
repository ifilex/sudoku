import React from 'react';
import { Edit3, Eraser, RotateCcw, Lightbulb } from 'lucide-react';
import { CellState, LanguageCode } from '../types';
import { translations } from '../i18n/translations';

interface NumberKeypadProps {
  onNumberInput: (num: number) => void;
  onErase: () => void;
  onToggleNotes: () => void;
  notesMode: boolean;
  onUndo: () => void;
  canUndo: boolean;
  onSmartHint: () => void;
  board: CellState[][];
  language: LanguageCode;
}

export const NumberKeypad: React.FC<NumberKeypadProps> = ({
  onNumberInput,
  onErase,
  onToggleNotes,
  notesMode,
  onUndo,
  canUndo,
  onSmartHint,
  board,
  language,
}) => {
  const t = translations[language] || translations.es;

  // Calculate count of placed digits (1-9) on board
  const digitCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  board.forEach((row) => {
    row.forEach((cell) => {
      if (cell.value >= 1 && cell.value <= 9 && !cell.isError) {
        digitCounts[cell.value] = (digitCounts[cell.value] || 0) + 1;
      }
    });
  });

  return (
    <div id="number-keypad-container" className="w-full max-w-[500px] mx-auto flex flex-col gap-3 mt-3">
      {/* Function Action Bar: Undo, Erase, Pencil Notes, Smart Hint */}
      <div id="keypad-actions" className="grid grid-cols-4 gap-2">
        <button
          id="btn-keypad-undo"
          onClick={onUndo}
          disabled={!canUndo}
          className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-semibold transition-all ${
            canUndo
              ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200 active:scale-95 cursor-pointer shadow-md'
              : 'bg-slate-900/50 border-slate-800/60 text-slate-600 cursor-not-allowed'
          }`}
        >
          <RotateCcw className="w-5 h-5 mb-0.5" />
          <span>{t.undo}</span>
        </button>

        <button
          id="btn-keypad-erase"
          onClick={onErase}
          className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold active:scale-95 transition-all shadow-md cursor-pointer"
        >
          <Eraser className="w-5 h-5 mb-0.5 text-rose-400" />
          <span>{t.erase}</span>
        </button>

        <button
          id="btn-keypad-notes"
          onClick={onToggleNotes}
          className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer shadow-md active:scale-95 ${
            notesMode
              ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 ring-2 ring-amber-500/40 shadow-amber-500/20'
              : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
          }`}
        >
          <Edit3 className={`w-5 h-5 mb-0.5 ${notesMode ? 'text-amber-400 animate-bounce' : ''}`} />
          <span>{t.notes}</span>
        </button>

        <button
          id="btn-keypad-hint"
          onClick={onSmartHint}
          className="flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 border border-cyan-400/30 text-white text-xs font-bold active:scale-95 transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
        >
          <Lightbulb className="w-5 h-5 mb-0.5 text-yellow-300 animate-pulse" />
          <span>{t.smartHint}</span>
        </button>
      </div>

      {/* Touch Number Pad (1-9) */}
      <div id="digit-buttons-grid" className="grid grid-cols-9 gap-1.5 sm:gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
          const placedCount = digitCounts[num] || 0;
          const isComplete = placedCount >= 9;

          return (
            <button
              key={`btn-num-${num}`}
              id={`btn-num-${num}`}
              onClick={() => onNumberInput(num)}
              disabled={isComplete}
              className={`relative flex flex-col items-center justify-center py-2.5 sm:py-3 rounded-xl border text-lg sm:text-2xl font-black transition-all cursor-pointer shadow-md select-none touch-manipulation ${
                isComplete
                  ? 'bg-slate-900/60 border-slate-800/80 text-slate-600 cursor-not-allowed opacity-50'
                  : 'bg-slate-800 hover:bg-indigo-600 border-slate-700 hover:border-indigo-500 text-white active:scale-90 hover:shadow-indigo-500/20'
              }`}
            >
              <span>{num}</span>
              <span className={`text-[9px] font-bold mt-0.5 ${isComplete ? 'text-slate-600' : 'text-slate-400'}`}>
                {Math.max(0, 9 - placedCount)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
