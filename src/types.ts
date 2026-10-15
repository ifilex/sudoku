export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert' | 'master';

export type LanguageCode = 'es' | 'en' | 'de' | 'fr' | 'it' | 'pt' | 'zh' | 'ja' | 'ru';

export interface CellState {
  row: number;
  col: number;
  value: number; // 0 for empty, 1-9 for filled
  solutionValue: number;
  isInitial: boolean;
  notes: number[]; // candidates 1-9
  isError?: boolean;
}

export interface SudokuMove {
  row: number;
  col: number;
  prevValue: number;
  newValue: number;
  prevNotes: number[];
  newNotes: number[];
}

export interface SmartHint {
  row: number;
  col: number;
  value: number;
  technique: string;
  techniqueKey: string;
  explanation: string;
  relatedCells?: Array<{ row: number; col: number }>;
}

export interface CognitiveMetrics {
  memoryIndex: number; // 0 - 100
  focusScore: number; // 0 - 100
  processingSpeed: number; // seconds per correct move
  logicScore: number; // 0 - 100
  overallAgility: number; // 0 - 100
}

export interface GameState {
  board: CellState[][];
  solution: number[][];
  initialBoard: number[][];
  difficulty: Difficulty;
  elapsedTime: number; // in seconds
  isPaused: boolean;
  isCompleted: boolean;
  notesMode: boolean;
  mistakesCount: number;
  hintsUsed: number;
  history: SudokuMove[];
  historyIndex: number;
  lastUpdated: string; // ISO date string
}

export interface DailyStatEntry {
  date: string; // YYYY-MM-DD
  gamesPlayed: number;
  gamesWon: number;
  totalTimeSeconds: number;
  bestTimeSeconds: Record<Difficulty, number | null>;
  totalMistakes: number;
  totalHints: number;
  cognitiveMetrics: CognitiveMetrics;
  difficultyBreakdown: Record<Difficulty, number>;
}

export interface WeeklyChallenge {
  id: string;
  weekNumber: number;
  year: number;
  titleKey: string;
  descKey: string;
  difficulty: Difficulty;
  targetCount: number;
  currentCount: number;
  completed: boolean;
  badgeIcon: string;
  rewardPoints: number;
}

export interface UserPreferences {
  language: LanguageCode;
  autoCheckErrors: boolean;
  highlightMatchingNumbers: boolean;
  highlightRowColBox: boolean;
  autoClearNotes: boolean;
  soundEffects: boolean;
  theme: 'dark-cognitive' | 'light-slate' | 'amber-focus';
}

export interface AICognitiveInsight {
  summary: string;
  strengths: string[];
  focusAreas: string[];
  tip: string;
}
