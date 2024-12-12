import { Direction, Position } from '../constants/gameConstants';

export const getNextHead = (currentHead: Position, direction: Direction): Position => {
  const head = [...currentHead] as Position;
  
  switch (direction) {
    case 'UP':
      head[0] -= 1;
      break;
    case 'DOWN':
      head[0] += 1;
      break;
    case 'LEFT':
      head[1] -= 1;
      break;
    case 'RIGHT':
      head[1] += 1;
      break;
  }
  
  return head;
};