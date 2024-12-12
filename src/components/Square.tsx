import React from 'react';

interface SquareProps {
  value: 'snake' | 'food' | null;
}

export const Square: React.FC<SquareProps> = ({ value }) => {
  const getSquareClass = () => {
    switch (value) {
      case 'snake':
        return 'bg-green-500';
      case 'food':
        return 'bg-red-500';
      default:
        return 'bg-white';
    }
  };

  return (
    <div
      className={`w-6 h-6 ${getSquareClass()}`}
    />
  );
};