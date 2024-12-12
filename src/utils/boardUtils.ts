import { BOARD_SIZE, Position, Board } from '../constants/gameConstants';

export const createEmptyBoard = (): Board => 
  Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));

export const generateFoodPosition = (snake: Position[]): Position => {
  let newFood: Position;
  do {
    newFood = [
      Math.floor(Math.random() * BOARD_SIZE),
      Math.floor(Math.random() * BOARD_SIZE),
    ] as Position;
  } while (
    snake.some(([x, y]) => x === newFood[0] && y === newFood[1])
  );
  return newFood;
};

export const updateBoard = (snake: Position[], food: Position): Board => {
  const newBoard = createEmptyBoard();
  snake.forEach(([x, y]) => {
    newBoard[x][y] = 'snake';
  });
  newBoard[food[0]][food[1]] = 'food';
  return newBoard;
};