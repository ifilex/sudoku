import { useState, useEffect, useCallback, useRef } from 'react';
import {
  CellState,
  Difficulty,
  GameState,
  LanguageCode,
  SmartHint,
  SudokuMove,
  UserPreferences,
  WeeklyChallenge,
} from './types';
import { translations } from './i18n/translations';
import { generateSudoku, getSmartHint, isValidPlacement } from './utils/sudokuGenerator';
import { calculateCognitiveMetrics } from './utils/cognitiveCalculator';
import {
  clearSavedGame,
  defaultPreferences,
  getDailyStreak,
  loadCurrentGame,
  loadDailyStats,
  loadPreferences,
  loadWeeklyChallenges,
  recordGameCompletion,
  saveCurrentGame,
  savePreferences,
  saveWeeklyChallenges,
} from './utils/storage';

import { Navbar } from './components/Navbar';
import { SudokuBoard } from './components/SudokuBoard';
import { NumberKeypad } from './components/NumberKeypad';
import { SmartHintModal } from './components/SmartHintModal';
import { CognitiveStatsView } from './components/CognitiveStatsView';
import { WeeklyChallengesView } from './components/WeeklyChallengesView';
import { InteractiveTutorial } from './components/InteractiveTutorial';
import { SettingsModal } from './components/SettingsModal';
import { CompletionModal } from './components/CompletionModal';

import { Play, Pause, RotateCcw, Brain } from 'lucide-react';

export default function App() {
  // Navigation & Preferences State
  const [currentTab, setCurrentTab] = useState<'play' | 'stats' | 'challenges' | 'tutorial' | 'settings'>('play');
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [streakDays, setStreakDays] = useState(0);

  // Game Board & Logic State
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [board, setBoard] = useState<CellState[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [initialBoard, setInitialBoard] = useState<number[][]>([]);

  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [notesMode, setNotesMode] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [mistakesCount, setMistakesCount] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);

  const [history, setHistory] = useState<SudokuMove[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Smart Hint Engine State
  const [activeHint, setActiveHint] = useState<SmartHint | null>(null);
  const [smartHintCell, setSmartHintCell] = useState<{ row: number; col: number } | null>(null);
  const [relatedHintCells, setRelatedHintCells] = useState<Array<{ row: number; col: number }>>([]);

  // Stats & Weekly Challenges State
  const [weeklyChallenges, setWeeklyChallenges] = useState<WeeklyChallenge[]>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Initial Application Load
  useEffect(() => {
    const loadedPrefs = loadPreferences();
    setPreferences(loadedPrefs);
    setStreakDays(getDailyStreak());
    setWeeklyChallenges(loadWeeklyChallenges());

    const savedGame = loadCurrentGame();
    if (savedGame && !savedGame.isCompleted) {
      setBoard(savedGame.board);
      setSolution(savedGame.solution);
      setInitialBoard(savedGame.initialBoard);
      setDifficulty(savedGame.difficulty);
      setElapsedTime(savedGame.elapsedTime);
      setIsPaused(savedGame.isPaused);
      setNotesMode(savedGame.notesMode);
      setMistakesCount(savedGame.mistakesCount);
      setHintsUsed(savedGame.hintsUsed);
      setHistory(savedGame.history);
      setHistoryIndex(savedGame.historyIndex);
    } else {
      startNewGame('medium');
    }
  }, []);

  // 2. Start New Game
  const startNewGame = useCallback((diff: Difficulty) => {
    const { initialBoard: initB, solution: solB } = generateSudoku(diff);
    
    const newBoardState: CellState[][] = initB.map((row, rIdx) =>
      row.map((val, cIdx) => ({
        row: rIdx,
        col: cIdx,
        value: val,
        solutionValue: solB[rIdx][cIdx],
        isInitial: val !== 0,
        notes: [],
        isError: false,
      }))
    );

    setDifficulty(diff);
    setInitialBoard(initB);
    setSolution(solB);
    setBoard(newBoardState);
    setSelectedCell(null);
    setElapsedTime(0);
    setIsPaused(false);
    setIsCompleted(false);
    setMistakesCount(0);
    setHintsUsed(0);
    setHistory([]);
    setHistoryIndex(-1);
    setActiveHint(null);
    setSmartHintCell(null);
    setRelatedHintCells([]);

    clearSavedGame();
  }, []);

  // 3. Timer Effect
  useEffect(() => {
    if (!isPaused && !isCompleted && board.length > 0) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, isCompleted, board.length]);

  // 4. Auto-save Effect
  useEffect(() => {
    if (board.length === 0 || isCompleted) return;

    const gameState: GameState = {
      board,
      solution,
      initialBoard,
      difficulty,
      elapsedTime,
      isPaused,
      isCompleted,
      notesMode,
      mistakesCount,
      hintsUsed,
      history,
      historyIndex,
      lastUpdated: new Date().toISOString(),
    };

    saveCurrentGame(gameState);
  }, [
    board,
    solution,
    initialBoard,
    difficulty,
    elapsedTime,
    isPaused,
    isCompleted,
    notesMode,
    mistakesCount,
    hintsUsed,
    history,
    historyIndex,
  ]);

  // 5. Check Game Board Completion
  const checkCompletion = useCallback(
    (currentBoard: CellState[][]) => {
      let isFull = true;
      let hasErrors = false;

      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          const cell = currentBoard[r][c];
          if (cell.value === 0) {
            isFull = false;
            break;
          }
          if (cell.value !== cell.solutionValue) {
            hasErrors = true;
          }
        }
        if (!isFull) break;
      }

      if (isFull && !hasErrors) {
        setIsCompleted(true);
        clearSavedGame();

        // Calculate total notes
        let totalNotesCount = 0;
        currentBoard.forEach((r) => r.forEach((c) => (totalNotesCount += c.notes.length)));

        // Calculate cognitive metrics
        const totalMoves = history.length;
        const cognitiveMetrics = calculateCognitiveMetrics(
          difficulty,
          elapsedTime,
          totalMoves,
          mistakesCount,
          hintsUsed,
          totalNotesCount
        );

        // Record Statistics
        recordGameCompletion(
          difficulty,
          elapsedTime,
          mistakesCount,
          hintsUsed,
          cognitiveMetrics.memoryIndex,
          cognitiveMetrics.focusScore,
          cognitiveMetrics.processingSpeed,
          cognitiveMetrics.logicScore,
          cognitiveMetrics.overallAgility
        );

        setStreakDays(getDailyStreak());

        // Update weekly challenges
        const currentChallenges = loadWeeklyChallenges();
        const updatedChallenges = currentChallenges.map((ch) => {
          let progressInc = 0;
          if (ch.id === 'wc_memory_boost' && mistakesCount === 0) {
            progressInc = 1;
          } else if (ch.id === 'wc_speed_agility' && elapsedTime < 480 && difficulty === 'hard') {
            progressInc = 1;
          } else if (ch.id === 'wc_master_deduction' && hintsUsed === 0 && (difficulty === 'expert' || difficulty === 'master')) {
            progressInc = 1;
          } else if (ch.id === 'wc_pencil_free' && totalNotesCount === 0) {
            progressInc = 1;
          }

          if (progressInc > 0) {
            const newCount = ch.currentCount + progressInc;
            return {
              ...ch,
              currentCount: newCount,
              completed: newCount >= ch.targetCount,
            };
          }
          return ch;
        });

        setWeeklyChallenges(updatedChallenges);
        saveWeeklyChallenges(updatedChallenges);
      }
    },
    [difficulty, elapsedTime, history.length, mistakesCount, hintsUsed]
  );

  // 6. Handle Cell Value Input
  const handleInputNumber = useCallback(
    (num: number) => {
      if (!selectedCell || isPaused || isCompleted) return;
      const { row, col } = selectedCell;
      const targetCell = board[row][col];

      if (targetCell.isInitial) return;

      const newBoard = board.map((rArr) => rArr.map((c) => ({ ...c, notes: [...c.notes] })));

      if (notesMode) {
        // Toggle candidate note
        const existingNotes = newBoard[row][col].notes;
        if (existingNotes.includes(num)) {
          newBoard[row][col].notes = existingNotes.filter((n) => n !== num);
        } else {
          newBoard[row][col].notes = [...existingNotes, num].sort();
        }
      } else {
        // Direct value entry
        const prevVal = targetCell.value;
        const prevNotes = targetCell.notes;

        if (prevVal === num) return; // same number

        const isWrong = preferences.autoCheckErrors && num !== targetCell.solutionValue;
        if (isWrong) {
          setMistakesCount((prev) => prev + 1);
        }

        newBoard[row][col].value = num;
        newBoard[row][col].isError = isWrong;
        newBoard[row][col].notes = [];

        // Auto clear candidate notes in row, column, box
        if (preferences.autoClearNotes && !isWrong) {
          const boxR = Math.floor(row / 3) * 3;
          const boxC = Math.floor(col / 3) * 3;

          for (let i = 0; i < 9; i++) {
            newBoard[row][i].notes = newBoard[row][i].notes.filter((n) => n !== num);
            newBoard[i][col].notes = newBoard[i][col].notes.filter((n) => n !== num);
          }

          for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
              newBoard[boxR + r][boxC + c].notes = newBoard[boxR + r][boxC + c].notes.filter(
                (n) => n !== num
              );
            }
          }
        }

        // Record history move
        const move: SudokuMove = {
          row,
          col,
          prevValue: prevVal,
          newValue: num,
          prevNotes,
          newNotes: [],
        };

        const newHist = history.slice(0, historyIndex + 1);
        setHistory([...newHist, move]);
        setHistoryIndex(newHist.length);
      }

      setBoard(newBoard);
      setSmartHintCell(null);
      setRelatedHintCells([]);
      checkCompletion(newBoard);
    },
    [
      selectedCell,
      isPaused,
      isCompleted,
      board,
      notesMode,
      preferences.autoCheckErrors,
      preferences.autoClearNotes,
      history,
      historyIndex,
      checkCompletion,
    ]
  );

  // 7. Handle Erase Cell
  const handleErase = useCallback(() => {
    if (!selectedCell || isPaused || isCompleted) return;
    const { row, col } = selectedCell;
    const targetCell = board[row][col];

    if (targetCell.isInitial || (targetCell.value === 0 && targetCell.notes.length === 0)) return;

    const newBoard = board.map((rArr) => rArr.map((c) => ({ ...c, notes: [...c.notes] })));

    const prevVal = targetCell.value;
    const prevNotes = targetCell.notes;

    newBoard[row][col].value = 0;
    newBoard[row][col].notes = [];
    newBoard[row][col].isError = false;

    const move: SudokuMove = {
      row,
      col,
      prevValue: prevVal,
      newValue: 0,
      prevNotes,
      newNotes: [],
    };

    const newHist = history.slice(0, historyIndex + 1);
    setHistory([...newHist, move]);
    setHistoryIndex(newHist.length);

    setBoard(newBoard);
    setSmartHintCell(null);
    setRelatedHintCells([]);
  }, [selectedCell, isPaused, isCompleted, board, history, historyIndex]);

  // 8. Handle Undo
  const handleUndo = useCallback(() => {
    if (historyIndex < 0 || isPaused || isCompleted) return;

    const lastMove = history[historyIndex];
    const { row, col, prevValue, prevNotes } = lastMove;

    const newBoard = board.map((rArr) => rArr.map((c) => ({ ...c, notes: [...c.notes] })));
    newBoard[row][col].value = prevValue;
    newBoard[row][col].notes = prevNotes;
    newBoard[row][col].isError =
      preferences.autoCheckErrors && prevValue !== 0 && prevValue !== solution[row][col];

    setBoard(newBoard);
    setHistoryIndex((prev) => prev - 1);
    setSelectedCell({ row, col });
    setSmartHintCell(null);
    setRelatedHintCells([]);
  }, [historyIndex, isPaused, isCompleted, history, board, preferences.autoCheckErrors, solution]);

  // 9. Handle Request Smart Hint
  const handleRequestSmartHint = useCallback(() => {
    if (isCompleted || isPaused) return;

    const hint = getSmartHint(board, solution);
    if (hint) {
      setActiveHint(hint);
      setSmartHintCell({ row: hint.row, col: hint.col });
      setSelectedCell({ row: hint.row, col: hint.col });
      if (hint.relatedCells) {
        setRelatedHintCells(hint.relatedCells);
      }
      setHintsUsed((prev) => prev + 1);
    }
  }, [isCompleted, isPaused, board, solution]);

  // 10. Handle Apply Smart Hint
  const handleApplySmartHint = (hint: SmartHint) => {
    const { row, col, value } = hint;
    const newBoard = board.map((rArr) => rArr.map((c) => ({ ...c, notes: [...c.notes] })));

    newBoard[row][col].value = value;
    newBoard[row][col].isError = false;
    newBoard[row][col].notes = [];

    setBoard(newBoard);
    setActiveHint(null);
    setSmartHintCell(null);
    setRelatedHintCells([]);

    checkCompletion(newBoard);
  };

  // 11. Keyboard Shortcuts Support for PC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentTab !== 'play' || isPaused || isCompleted) return;

      if (e.key >= '1' && e.key <= '9') {
        handleInputNumber(parseInt(e.key, 10));
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        handleErase();
      } else if (e.key.toLowerCase() === 'n') {
        setNotesMode((prev) => !prev);
      } else if (e.key.toLowerCase() === 'u') {
        handleUndo();
      } else if (e.key.toLowerCase() === 'h') {
        handleRequestSmartHint();
      } else if (e.key === 'ArrowUp' && selectedCell) {
        setSelectedCell({ row: Math.max(0, selectedCell.row - 1), col: selectedCell.col });
      } else if (e.key === 'ArrowDown' && selectedCell) {
        setSelectedCell({ row: Math.min(8, selectedCell.row + 1), col: selectedCell.col });
      } else if (e.key === 'ArrowLeft' && selectedCell) {
        setSelectedCell({ row: selectedCell.row, col: Math.max(0, selectedCell.col - 1) });
      } else if (e.key === 'ArrowRight' && selectedCell) {
        setSelectedCell({ row: selectedCell.row, col: Math.min(8, selectedCell.col + 1) });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    currentTab,
    isPaused,
    isCompleted,
    selectedCell,
    handleInputNumber,
    handleErase,
    handleUndo,
    handleRequestSmartHint,
  ]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const t = translations[preferences.language] || translations.es;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Header Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={preferences.language}
        setLanguage={(lang) => setPreferences((prev) => ({ ...prev, language: lang }))}
        streakDays={streakDays}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 flex flex-col justify-center">
        {currentTab === 'play' && (
          <div id="play-view-container" className="flex flex-col gap-4">
            {/* Top Game Dashboard Controls: Difficulty, Time, Mistakes, Pause */}
            <div id="game-status-bar" className="w-full max-w-[500px] mx-auto bg-slate-900 border border-slate-800 p-3 rounded-2xl shadow-xl flex items-center justify-between gap-2">
              {/* Difficulty Selector */}
              <select
                id="difficulty-selector"
                value={difficulty}
                onChange={(e) => startNewGame(e.target.value as Difficulty)}
                className="bg-slate-950 border border-slate-700 text-indigo-300 font-extrabold text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="easy">{t.easy}</option>
                <option value="medium">{t.medium}</option>
                <option value="hard">{t.hard}</option>
                <option value="expert">{t.expert}</option>
                <option value="master">{t.master}</option>
              </select>

              {/* Timer & Pause */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono font-bold text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{formatTime(elapsedTime)}</span>
                </div>

                <button
                  id="btn-pause-resume"
                  onClick={() => setIsPaused((prev) => !prev)}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  {isPaused ? <Play className="w-4 h-4 fill-slate-300" /> : <Pause className="w-4 h-4" />}
                </button>
              </div>

              {/* Mistakes Counter */}
              <div className="flex items-center gap-1 bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-800 text-xs font-bold text-slate-300">
                <span className="text-slate-400">{t.mistakes}:</span>
                <span className={mistakesCount > 0 ? 'text-rose-400' : 'text-slate-200'}>{mistakesCount}</span>
              </div>

              {/* New Game Button */}
              <button
                id="btn-new-game"
                onClick={() => startNewGame(difficulty)}
                className="p-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 transition-colors"
                title={t.newGame}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Board / Pause Overlay */}
            {!isPaused ? (
              <SudokuBoard
                board={board}
                selectedCell={selectedCell}
                onSelectCell={(r, c) => setSelectedCell({ row: r, col: c })}
                highlightMatchingNumbers={preferences.highlightMatchingNumbers}
                highlightRowColBox={preferences.highlightRowColBox}
                smartHintCell={smartHintCell}
                relatedHintCells={relatedHintCells}
              />
            ) : (
              <div className="w-full max-w-[500px] aspect-square mx-auto bg-slate-900 border-2 border-slate-700/80 rounded-2xl flex flex-col items-center justify-center gap-4 text-center p-6 shadow-2xl">
                <Brain className="w-12 h-12 text-indigo-400 animate-pulse" />
                <div>
                  <h3 className="text-lg font-bold text-slate-100">Juego en Pausa</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Tu tiempo de procesamiento cognitivo está pausado.
                  </p>
                </div>
                <button
                  onClick={() => setIsPaused(false)}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  {t.resume}
                </button>
              </div>
            )}

            {/* Touch Number Keypad Controls */}
            {!isPaused && (
              <NumberKeypad
                onNumberInput={handleInputNumber}
                onErase={handleErase}
                onToggleNotes={() => setNotesMode((prev) => !prev)}
                notesMode={notesMode}
                onUndo={handleUndo}
                canUndo={historyIndex >= 0}
                onSmartHint={handleRequestSmartHint}
                board={board}
                language={preferences.language}
              />
            )}
          </div>
        )}

        {/* Cognitive Stats View */}
        {currentTab === 'stats' && (
          <CognitiveStatsView
            stats={loadDailyStats()}
            streakDays={streakDays}
            language={preferences.language}
          />
        )}

        {/* Weekly Challenges View */}
        {currentTab === 'challenges' && (
          <WeeklyChallengesView
            challenges={weeklyChallenges}
            language={preferences.language}
          />
        )}

        {/* Tutorial View */}
        {currentTab === 'tutorial' && (
          <InteractiveTutorial
            language={preferences.language}
            onStartPlay={() => setCurrentTab('play')}
          />
        )}

        {/* Settings View */}
        {currentTab === 'settings' && (
          <SettingsModal
            preferences={preferences}
            onUpdatePreferences={(updated) => {
              const newPrefs = { ...preferences, ...updated };
              setPreferences(newPrefs);
              savePreferences(newPrefs);
            }}
            onResetData={() => {
              localStorage.clear();
              setPreferences(defaultPreferences);
              setStreakDays(0);
              startNewGame('medium');
            }}
            language={preferences.language}
          />
        )}
      </main>

      {/* Smart Hint Explanation Modal */}
      {activeHint && (
        <SmartHintModal
          hint={activeHint}
          onClose={() => {
            setActiveHint(null);
            setSmartHintCell(null);
            setRelatedHintCells([]);
          }}
          onApplyHint={handleApplySmartHint}
          language={preferences.language}
        />
      )}

      {/* Completion Celebration Modal */}
      {isCompleted && (
        <CompletionModal
          elapsedTime={elapsedTime}
          mistakesCount={mistakesCount}
          hintsUsed={hintsUsed}
          metrics={calculateCognitiveMetrics(
            difficulty,
            elapsedTime,
            history.length,
            mistakesCount,
            hintsUsed,
            0
          )}
          onPlayAgain={() => startNewGame(difficulty)}
          language={preferences.language}
        />
      )}
    </div>
  );
}
