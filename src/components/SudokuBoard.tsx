import React from 'react';
import { CellState } from '../types';

interface SudokuBoardProps {
  board: CellState[][];
  selectedCell: { row: number; col: number } | null;
  onSelectCell: (row: number, col: number) => void;
  highlightMatchingNumbers: boolean;
  highlightRowColBox: boolean;
  smartHintCell: { row: number; col: number } | null;
  relatedHintCells: Array<{ row: number; col: number }>;
}

export const SudokuBoard: React.FC<SudokuBoardProps> = ({
  board,
  selectedCell,
  onSelectCell,
  highlightMatchingNumbers,
  highlightRowColBox,
  smartHintCell,
  relatedHintCells,
}) => {
  const selectedValue =
    selectedCell && board[selectedCell.row][selectedCell.col].value !== 0
      ? board[selectedCell.row][selectedCell.col].value
      : null;

  return (
    <div id="sudoku-board-container" className="w-full max-w-[500px] aspect-square mx-auto p-1.5 bg-slate-900 rounded-2xl border-2 border-slate-700/80 shadow-2xl shadow-indigo-950/50 flex items-center justify-center select-none touch-manipulation">
      <div className="grid grid-cols-9 grid-rows-9 w-full h-full gap-0 bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
        {board.map((rowArr, rIdx) =>
          rowArr.map((cell, cIdx) => {
            const isSelected = selectedCell?.row === rIdx && selectedCell?.col === cIdx;
            
            const isSameRow = highlightRowColBox && selectedCell?.row === rIdx;
            const isSameCol = highlightRowColBox && selectedCell?.col === cIdx;
            const isSameBox =
              highlightRowColBox &&
              selectedCell &&
              Math.floor(selectedCell.row / 3) === Math.floor(rIdx / 3) &&
              Math.floor(selectedCell.col / 3) === Math.floor(cIdx / 3);

            const isRelatedGroup = isSameRow || isSameCol || isSameBox;

            const isSameNumber =
              highlightMatchingNumbers &&
              selectedValue !== null &&
              cell.value === selectedValue;

            const isHintCell = smartHintCell?.row === rIdx && smartHintCell?.col === cIdx;
            const isRelatedHint = relatedHintCells.some(
              (c) => c.row === rIdx && c.col === cIdx
            );

            // Borders for 3x3 blocks
            const borderRight = (cIdx + 1) % 3 === 0 && cIdx < 8 ? 'border-r-2 border-r-indigo-500/60' : 'border-r border-r-slate-700/50';
            const borderBottom = (rIdx + 1) % 3 === 0 && rIdx < 8 ? 'border-b-2 border-b-indigo-500/60' : 'border-b border-b-slate-700/50';

            // Background & text styling logic
            let bgStyle = 'bg-slate-900';
            let textColor = cell.isInitial ? 'text-slate-100 font-extrabold' : 'text-indigo-300 font-bold';

            if (cell.isError) {
              bgStyle = 'bg-rose-950/80';
              textColor = 'text-rose-400 font-extrabold animate-pulse';
            } else if (isHintCell) {
              bgStyle = 'bg-cyan-500/30 ring-2 ring-cyan-400 animate-bounce';
              textColor = 'text-cyan-200 font-extrabold';
            } else if (isSelected) {
              bgStyle = 'bg-indigo-600/90 ring-2 ring-indigo-400 shadow-md shadow-indigo-500/50';
              textColor = 'text-white font-black scale-105';
            } else if (isSameNumber) {
              bgStyle = 'bg-amber-500/25 ring-1 ring-amber-400/60';
              textColor = cell.isInitial ? 'text-amber-200 font-extrabold' : 'text-amber-300 font-bold';
            } else if (isRelatedHint) {
              bgStyle = 'bg-cyan-950/40';
            } else if (isRelatedGroup) {
              bgStyle = 'bg-slate-800/90';
            }

            return (
              <button
                key={`cell-${rIdx}-${cIdx}`}
                id={`sudoku-cell-${rIdx}-${cIdx}`}
                onClick={() => onSelectCell(rIdx, cIdx)}
                className={`relative flex items-center justify-center transition-all duration-150 aspect-square text-lg sm:text-2xl ${borderRight} ${borderBottom} ${bgStyle} ${textColor} hover:bg-indigo-900/30 active:scale-95`}
              >
                {cell.value !== 0 ? (
                  <span>{cell.value}</span>
                ) : (
                  /* Pencil Candidates Grid (3x3) */
                  <div className="grid grid-cols-3 grid-rows-3 w-full h-full p-0.5 pointer-events-none">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <div
                        key={`note-${num}`}
                        className="flex items-center justify-center text-[8px] sm:text-[10px] leading-none text-slate-400 font-medium opacity-80"
                      >
                        {cell.notes.includes(num) ? num : ''}
                      </div>
                    ))}
                  </div>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
