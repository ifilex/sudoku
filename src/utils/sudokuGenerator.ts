import { CellState, Difficulty, SmartHint } from '../types';

export function createEmptyBoard(): number[][] {
  return Array.from({ length: 9 }, () => Array(9).fill(0));
}

export function isValidPlacement(board: number[][], row: number, col: number, val: number): boolean {
  if (val === 0) return true;
  for (let c = 0; c < 9; c++) {
    if (c !== col && board[row][c] === val) return false;
  }
  for (let r = 0; r < 9; r++) {
    if (r !== row && board[r][col] === val) return false;
  }
  const boxStartRow = Math.floor(row / 3) * 3;
  const boxStartCol = Math.floor(col / 3) * 3;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const curRow = boxStartRow + r;
      const curCol = boxStartCol + c;
      if ((curRow !== row || curCol !== col) && board[curRow][curCol] === val) {
        return false;
      }
    }
  }
  return true;
}

export function solveSudoku(board: number[][]): boolean {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) {
        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
        for (const num of nums) {
          if (isValidPlacement(board, r, c, num)) {
            board[r][c] = num;
            if (solveSudoku(board)) return true;
            board[r][c] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

export function countSolutions(board: number[][], count = { value: 0 }): number {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValidPlacement(board, r, c, num)) {
            board[r][c] = num;
            countSolutions(board, count);
            board[r][c] = 0;
            if (count.value >= 2) return count.value;
          }
        }
        return count.value;
      }
    }
  }
  count.value++;
  return count.value;
}

export function generateSudoku(difficulty: Difficulty): {
  initialBoard: number[][];
  solution: number[][];
} {
  const solution = createEmptyBoard();
  solveSudoku(solution);

  const initialBoard = solution.map((row) => [...row]);

  let cluesToKeep: number;
  switch (difficulty) {
    case 'easy':
      cluesToKeep = 40;
      break;
    case 'medium':
      cluesToKeep = 34;
      break;
    case 'hard':
      cluesToKeep = 28;
      break;
    case 'expert':
      cluesToKeep = 24;
      break;
    case 'master':
      cluesToKeep = 20;
      break;
    default:
      cluesToKeep = 34;
  }

  const cellsToRemove = 81 - cluesToKeep;
  const cellIndices: number[] = Array.from({ length: 81 }, (_, i) => i).sort(
    () => Math.random() - 0.5
  );

  let removed = 0;
  for (const index of cellIndices) {
    if (removed >= cellsToRemove) break;
    const r = Math.floor(index / 9);
    const c = index % 9;
    const tempVal = initialBoard[r][c];
    initialBoard[r][c] = 0;

    // Check unique solution
    const copy = initialBoard.map((row) => [...row]);
    if (countSolutions(copy, { value: 0 }) !== 1) {
      initialBoard[r][c] = tempVal; // put back if non-unique
    } else {
      removed++;
    }
  }

  return { initialBoard, solution };
}

export function getCandidates(board: number[][], row: number, col: number): number[] {
  if (board[row][col] !== 0) return [];
  const candidates: number[] = [];
  for (let num = 1; num <= 9; num++) {
    if (isValidPlacement(board, row, col, num)) {
      candidates.push(num);
    }
  }
  return candidates;
}

export function getSmartHint(
  currentBoard: CellState[][],
  solution: number[][]
): SmartHint | null {
  const currentGrid = currentBoard.map((row) => row.map((cell) => cell.value));

  // 1. First check if user entered any incorrect digits
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = currentGrid[r][c];
      if (val !== 0 && val !== solution[r][c]) {
        return {
          row: r,
          col: c,
          value: solution[r][c],
          technique: 'Correction Required',
          techniqueKey: 'error_correction',
          explanation: `The cell at Row ${r + 1}, Column ${c + 1} contains digit ${val}, which is incorrect for this board. Erasing this digit will unblock the puzzle.`,
        };
      }
    }
  }

  // Calculate candidates for all empty cells
  const candidateMap: Record<string, number[]> = {};
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (currentGrid[r][c] === 0) {
        candidateMap[`${r},${c}`] = getCandidates(currentGrid, r, c);
      }
    }
  }

  // 2. Check Naked Single (Cell has exactly 1 valid candidate)
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (currentGrid[r][c] === 0) {
        const candidates = candidateMap[`${r},${c}`] || [];
        if (candidates.length === 1) {
          const val = candidates[0];
          return {
            row: r,
            col: c,
            value: val,
            technique: 'Naked Single',
            techniqueKey: 'naked_single',
            explanation: `In Row ${r + 1}, Column ${c + 1}, all other digits (1-9) are eliminated by intersecting Row, Column, or 3x3 Box. Only digit ${val} can fit here.`,
            relatedCells: getRelatedFilledCells(currentGrid, r, c),
          };
        }
      }
    }
  }

  // 3. Check Hidden Single in 3x3 Box
  for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
    const startR = Math.floor(boxIndex / 3) * 3;
    const startC = (boxIndex % 3) * 3;
    for (let num = 1; num <= 9; num++) {
      const possibleCells: Array<{ r: number; c: number }> = [];
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          const curR = startR + r;
          const curC = startC + c;
          if (currentGrid[curR][curC] === 0) {
            const candidates = candidateMap[`${curR},${curC}`] || [];
            if (candidates.includes(num)) {
              possibleCells.push({ r: curR, c: curC });
            }
          }
        }
      }
      if (possibleCells.length === 1) {
        const target = possibleCells[0];
        return {
          row: target.r,
          col: target.c,
          value: num,
          technique: 'Hidden Single in 3x3 Box',
          techniqueKey: 'hidden_single_box',
          explanation: `In the 3x3 Box #${boxIndex + 1}, digit ${num} cannot go anywhere else except Row ${target.r + 1}, Column ${target.c + 1}.`,
          relatedCells: getRelatedFilledCells(currentGrid, target.r, target.c),
        };
      }
    }
  }

  // 4. Check Hidden Single in Row
  for (let r = 0; r < 9; r++) {
    for (let num = 1; num <= 9; num++) {
      const possibleCols: number[] = [];
      for (let c = 0; c < 9; c++) {
        if (currentGrid[r][c] === 0) {
          const candidates = candidateMap[`${r},${c}`] || [];
          if (candidates.includes(num)) {
            possibleCols.push(c);
          }
        }
      }
      if (possibleCols.length === 1) {
        const col = possibleCols[0];
        return {
          row: r,
          col: col,
          value: num,
          technique: 'Hidden Single in Row',
          techniqueKey: 'hidden_single_row',
          explanation: `In Row ${r + 1}, digit ${num} is eliminated from all other columns in this row. It must be placed at Column ${col + 1}.`,
          relatedCells: getRelatedFilledCells(currentGrid, r, col),
        };
      }
    }
  }

  // 5. Check Hidden Single in Column
  for (let c = 0; c < 9; c++) {
    for (let num = 1; num <= 9; num++) {
      const possibleRows: number[] = [];
      for (let r = 0; r < 9; r++) {
        if (currentGrid[r][c] === 0) {
          const candidates = candidateMap[`${r},${c}`] || [];
          if (candidates.includes(num)) {
            possibleRows.push(r);
          }
        }
      }
      if (possibleRows.length === 1) {
        const row = possibleRows[0];
        return {
          row: row,
          col: c,
          value: num,
          technique: 'Hidden Single in Column',
          techniqueKey: 'hidden_single_col',
          explanation: `In Column ${c + 1}, digit ${num} can only be placed at Row ${row + 1}.`,
          relatedCells: getRelatedFilledCells(currentGrid, row, c),
        };
      }
    }
  }

  // 6. Fallback: Solution Direct Target
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (currentGrid[r][c] === 0) {
        const targetVal = solution[r][c];
        return {
          row: r,
          col: c,
          value: targetVal,
          technique: 'Logical Elimination',
          techniqueKey: 'logical_elimination',
          explanation: `By scanning row ${r + 1} and column ${c + 1}, digit ${targetVal} is the mathematically required candidate for this position.`,
          relatedCells: getRelatedFilledCells(currentGrid, r, c),
        };
      }
    }
  }

  return null;
}

function getRelatedFilledCells(board: number[][], row: number, col: number): Array<{ row: number; col: number }> {
  const related: Array<{ row: number; col: number }> = [];
  const boxR = Math.floor(row / 3) * 3;
  const boxC = Math.floor(col / 3) * 3;

  for (let i = 0; i < 9; i++) {
    if (board[row][i] !== 0) related.push({ row, col: i });
    if (board[i][col] !== 0) related.push({ row: i, col });
  }

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const curR = boxR + r;
      const curC = boxC + c;
      if (board[curR][curC] !== 0 && !related.some((cell) => cell.row === curR && cell.col === curC)) {
        related.push({ row: curR, col: curC });
      }
    }
  }

  return related;
}
