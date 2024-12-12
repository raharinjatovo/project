import { useState, useEffect, useCallback } from 'react';
import { 
  INITIAL_SNAKE_POSITION, 
  GAME_SPEED,
  Direction,
  Position,
  Board 
} from '../constants/gameConstants';
import { generateFoodPosition, updateBoard } from '../utils/boardUtils';
import { checkCollision } from '../utils/collisionUtils';
import { getNextHead } from '../utils/movementUtils';

export const useGameLogic = () => {
  const [board, setBoard] = useState<Board>(() => updateBoard(INITIAL_SNAKE_POSITION, [5, 5]));
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE_POSITION);
  const [food, setFood] = useState<Position>([5, 5]);
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const moveSnake = useCallback(() => {
    if (gameOver || !isPlaying) return;

    const head = getNextHead(snake[0], direction);

    if (checkCollision(head, snake)) {
      setGameOver(true);
      setIsPlaying(false);
      setHighScore(prev => Math.max(prev, score));
      return;
    }

    const newSnake = [head];
    const ateFood = head[0] === food[0] && head[1] === food[1];

    if (ateFood) {
      setScore(prev => prev + 1);
      setFood(generateFoodPosition(newSnake));
    }

    for (let i = 0; i < snake.length - (ateFood ? 0 : 1); i++) {
      newSnake.push([...snake[i]]);
    }

    setSnake(newSnake);
  }, [snake, direction, food, gameOver, isPlaying, score]);

  const startGame = useCallback(() => {
    setSnake(INITIAL_SNAKE_POSITION);
    setDirection('RIGHT');
    setGameOver(false);
    setIsPlaying(true);
    setScore(0);
    setFood(generateFoodPosition(INITIAL_SNAKE_POSITION));
  }, []);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  useEffect(() => {
    setBoard(updateBoard(snake, food));
  }, [snake, food]);

  return {
    board,
    score,
    highScore,
    gameOver,
    isPlaying,
    startGame,
    direction,
    setDirection,
  };
};