import { Position, BOARD_SIZE } from '../constants/gameConstants';

export const checkCollision = (head: Position, snake: Position[]): boolean => {
  return (
    head[0] < 0 ||
    head[0] >= BOARD_SIZE ||
    head[1] < 0 ||
    head[1] >= BOARD_SIZE ||
    snake.some(
      ([x, y], index) => index !== 0 && x === head[0] && y === head[1]
    )
  );
};