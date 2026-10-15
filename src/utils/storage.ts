import {
  DailyStatEntry,
  GameState,
  UserPreferences,
  WeeklyChallenge,
} from '../types';

const GAME_SAVE_KEY = 'cognitive_sudoku_current_game';
const DAILY_STATS_KEY = 'cognitive_sudoku_daily_stats';
const PREFERENCES_KEY = 'cognitive_sudoku_preferences';
const WEEKLY_CHALLENGES_KEY = 'cognitive_sudoku_weekly_challenges';

export const defaultPreferences: UserPreferences = {
  language: 'es',
  autoCheckErrors: true,
  highlightMatchingNumbers: true,
  highlightRowColBox: true,
  autoClearNotes: true,
  soundEffects: true,
  theme: 'dark-cognitive',
};

// --- Game State Auto-Save ---
export function saveCurrentGame(state: GameState): void {
  try {
    localStorage.setItem(GAME_SAVE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save game state to localStorage:', err);
  }
}

export function loadCurrentGame(): GameState | null {
  try {
    const raw = localStorage.getItem(GAME_SAVE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as GameState;
  } catch (err) {
    console.error('Failed to load current game state:', err);
    return null;
  }
}

export function clearSavedGame(): void {
  try {
    localStorage.removeItem(GAME_SAVE_KEY);
  } catch (err) {
    console.error('Failed to clear saved game:', err);
  }
}

// --- Preferences ---
export function savePreferences(prefs: UserPreferences): void {
  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
  } catch (err) {
    console.error('Failed to save user preferences:', err);
  }
}

export function loadPreferences(): UserPreferences {
  try {
    const raw = localStorage.getItem(PREFERENCES_KEY);
    if (!raw) return defaultPreferences;
    return { ...defaultPreferences, ...JSON.parse(raw) };
  } catch (err) {
    return defaultPreferences;
  }
}

// --- Daily Statistics ---
export function loadDailyStats(): DailyStatEntry[] {
  try {
    const raw = localStorage.getItem(DAILY_STATS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as DailyStatEntry[];
  } catch (err) {
    console.error('Failed to load daily stats:', err);
    return [];
  }
}

export function recordGameCompletion(
  difficulty: string,
  timeSeconds: number,
  mistakes: number,
  hints: number,
  memoryIndex: number,
  focusScore: number,
  processingSpeed: number,
  logicScore: number,
  overallAgility: number
): void {
  try {
    const statsList = loadDailyStats();
    const todayStr = new Date().toISOString().slice(0, 10);

    let todayEntry = statsList.find((entry) => entry.date === todayStr);

    if (!todayEntry) {
      todayEntry = {
        date: todayStr,
        gamesPlayed: 0,
        gamesWon: 0,
        totalTimeSeconds: 0,
        bestTimeSeconds: {
          easy: null,
          medium: null,
          hard: null,
          expert: null,
          master: null,
        },
        totalMistakes: 0,
        totalHints: 0,
        cognitiveMetrics: {
          memoryIndex: 0,
          focusScore: 0,
          processingSpeed: 0,
          logicScore: 0,
          overallAgility: 0,
        },
        difficultyBreakdown: {
          easy: 0,
          medium: 0,
          hard: 0,
          expert: 0,
          master: 0,
        },
      };
      statsList.push(todayEntry);
    }

    todayEntry.gamesPlayed += 1;
    todayEntry.gamesWon += 1;
    todayEntry.totalTimeSeconds += timeSeconds;
    todayEntry.totalMistakes += mistakes;
    todayEntry.totalHints += hints;

    const diffKey = difficulty as keyof typeof todayEntry.bestTimeSeconds;
    const currentBest = todayEntry.bestTimeSeconds[diffKey];
    if (currentBest === null || timeSeconds < currentBest) {
      todayEntry.bestTimeSeconds[diffKey] = timeSeconds;
    }

    todayEntry.difficultyBreakdown[diffKey] =
      (todayEntry.difficultyBreakdown[diffKey] || 0) + 1;

    // Rolling cognitive metrics update
    todayEntry.cognitiveMetrics = {
      memoryIndex: Math.round(
        (todayEntry.cognitiveMetrics.memoryIndex * (todayEntry.gamesWon - 1) + memoryIndex) / todayEntry.gamesWon
      ),
      focusScore: Math.round(
        (todayEntry.cognitiveMetrics.focusScore * (todayEntry.gamesWon - 1) + focusScore) / todayEntry.gamesWon
      ),
      processingSpeed:
        Math.round(
          ((todayEntry.cognitiveMetrics.processingSpeed * (todayEntry.gamesWon - 1) + processingSpeed) / todayEntry.gamesWon) * 10
        ) / 10,
      logicScore: Math.round(
        (todayEntry.cognitiveMetrics.logicScore * (todayEntry.gamesWon - 1) + logicScore) / todayEntry.gamesWon
      ),
      overallAgility: Math.round(
        (todayEntry.cognitiveMetrics.overallAgility * (todayEntry.gamesWon - 1) + overallAgility) / todayEntry.gamesWon
      ),
    };

    localStorage.setItem(DAILY_STATS_KEY, JSON.stringify(statsList));
  } catch (err) {
    console.error('Failed to record game completion:', err);
  }
}

export function getDailyStreak(): number {
  const stats = loadDailyStats();
  if (stats.length === 0) return 0;

  const datesWithWins = new Set(
    stats.filter((s) => s.gamesWon > 0).map((s) => s.date)
  );

  let streak = 0;
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);

    if (datesWithWins.has(dateStr)) {
      streak++;
    } else if (i === 0) {
      // If user hasn't played today yet, check yesterday to keep streak intact
      continue;
    } else {
      break;
    }
  }

  return streak;
}

// --- Weekly Challenges ---
export const initialWeeklyChallenges: WeeklyChallenge[] = [
  {
    id: 'wc_memory_boost',
    weekNumber: 31,
    year: 2026,
    titleKey: 'Memory Marathon',
    descKey: 'Solve 3 Sudokus in Medium or Hard difficulty with 0 mistakes.',
    difficulty: 'medium',
    targetCount: 3,
    currentCount: 0,
    completed: false,
    badgeIcon: 'Brain',
    rewardPoints: 150,
  },
  {
    id: 'wc_speed_agility',
    weekNumber: 31,
    year: 2026,
    titleKey: 'Speed & Logic Blitz',
    descKey: 'Complete a Hard puzzle in under 8 minutes.',
    difficulty: 'hard',
    targetCount: 1,
    currentCount: 0,
    completed: false,
    badgeIcon: 'Zap',
    rewardPoints: 200,
  },
  {
    id: 'wc_master_deduction',
    weekNumber: 31,
    year: 2026,
    titleKey: 'Master Cognitive Deduction',
    descKey: 'Solve an Expert or Master puzzle without requesting any hints.',
    difficulty: 'expert',
    targetCount: 1,
    currentCount: 0,
    completed: false,
    badgeIcon: 'Award',
    rewardPoints: 300,
  },
  {
    id: 'wc_pencil_free',
    weekNumber: 31,
    year: 2026,
    titleKey: 'Pure Working Memory',
    descKey: 'Solve 2 Easy or Medium puzzles using zero candidate pencil notes.',
    difficulty: 'easy',
    targetCount: 2,
    currentCount: 0,
    completed: false,
    badgeIcon: 'Sparkles',
    rewardPoints: 180,
  },
];

export function loadWeeklyChallenges(): WeeklyChallenge[] {
  try {
    const raw = localStorage.getItem(WEEKLY_CHALLENGES_KEY);
    if (!raw) return initialWeeklyChallenges;
    return JSON.parse(raw) as WeeklyChallenge[];
  } catch (err) {
    return initialWeeklyChallenges;
  }
}

export function saveWeeklyChallenges(challenges: WeeklyChallenge[]): void {
  try {
    localStorage.setItem(WEEKLY_CHALLENGES_KEY, JSON.stringify(challenges));
  } catch (err) {
    console.error('Failed to save weekly challenges:', err);
  }
}
