import { CognitiveMetrics, Difficulty } from '../types';

export function calculateCognitiveMetrics(
  difficulty: Difficulty,
  elapsedTimeSeconds: number,
  totalMoves: number,
  mistakesCount: number,
  hintsUsed: number,
  notesCount: number
): CognitiveMetrics {
  // Base weights depending on difficulty
  const difficultyMultiplier: Record<Difficulty, number> = {
    easy: 1.0,
    medium: 1.25,
    hard: 1.5,
    expert: 1.8,
    master: 2.1,
  };

  const mult = difficultyMultiplier[difficulty] || 1.0;

  // 1. Focus & Precision Score (0-100)
  // Penalizes mistakes heavily.
  const accuracyRatio = totalMoves > 0 ? Math.max(0, (totalMoves - mistakesCount * 2) / totalMoves) : 1;
  const focusScore = Math.min(100, Math.round(accuracyRatio * 100));

  // 2. Memory Index (0-100)
  // Higher if fewer notes used (relying on mental working memory), fewer hints used, and fewer mistakes.
  const baseMemory = 100 - notesCount * 1.5 - hintsUsed * 10 - mistakesCount * 12;
  const memoryIndex = Math.min(100, Math.max(20, Math.round(baseMemory * (1 + (mult - 1) * 0.2))));

  // 3. Processing Speed (seconds per filled correct cell)
  const totalCorrectPlaced = Math.max(1, totalMoves - mistakesCount);
  const processingSpeed = Math.round((elapsedTimeSeconds / totalCorrectPlaced) * 10) / 10;

  // 4. Logic Score (0-100)
  // Rewards solving harder puzzles with zero or minimal hints.
  const hintPenalty = hintsUsed * 15;
  const rawLogic = (100 - hintPenalty - mistakesCount * 8) * mult;
  const logicScore = Math.min(100, Math.max(15, Math.round(rawLogic)));

  // 5. Overall Agility Score (0-100)
  const overallAgility = Math.min(
    100,
    Math.round(focusScore * 0.3 + memoryIndex * 0.3 + logicScore * 0.4)
  );

  return {
    memoryIndex,
    focusScore,
    processingSpeed,
    logicScore,
    overallAgility,
  };
}
