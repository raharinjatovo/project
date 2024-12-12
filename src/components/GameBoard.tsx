import React from 'react';
import { useGameLogic } from '../hooks/useGameLogic';
import { Square } from './Square';
import { Play } from 'lucide-react';

export const GameBoard: React.FC = () => {
  const { 
    board, 
    score, 
    highScore, 
    gameOver, 
    isPlaying,
    startGame, 
    direction, 
    setDirection 
  } = useGameLogic();

  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Prevent scrolling with arrow keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }

      if (!isPlaying) return;

      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, setDirection, isPlaying]);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex gap-8 items-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">Score</h2>
          <p className="text-3xl font-bold text-green-600">{score}</p>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">High Score</h2>
          <p className="text-3xl font-bold text-purple-600">{highScore}</p>
        </div>
      </div>

      <div className="relative">
        <div 
          className="grid bg-gray-100 border-2 border-gray-300 rounded-lg overflow-hidden"
          style={{
            gridTemplateColumns: `repeat(${board[0].length}, minmax(0, 1fr))`,
            gap: '1px',
          }}
        >
          {board.map((row, i) =>
            row.map((cell, j) => (
              <Square key={`${i}-${j}`} value={cell} />
            ))
          )}
        </div>

        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
            <button
              onClick={startGame}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-lg font-semibold"
            >
              <Play className="w-5 h-5" />
              Start Game
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <h2 className="text-white text-2xl font-bold mb-4">Game Over!</h2>
              <button
                onClick={startGame}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-lg font-semibold"
              >
                <Play className="w-5 h-5" />
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};