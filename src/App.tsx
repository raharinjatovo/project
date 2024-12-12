import React from 'react';
import { GameBoard } from './components/GameBoard';
import { Gamepad2 } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Gamepad2 className="w-8 h-8 text-green-600" />
          <h1 className="text-4xl font-bold text-gray-800">Snake Game</h1>
        </div>
        <p className="text-gray-600">Use arrow keys to control the snake</p>
      </div>
      
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <GameBoard />
      </div>
    </div>
  );
}

export default App;