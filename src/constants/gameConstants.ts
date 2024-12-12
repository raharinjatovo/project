export const BOARD_SIZE = 20;
export const INITIAL_SNAKE_POSITION: [number, number][] = [[10, 10]];
export const GAME_SPEED = 150;

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type Position = [number, number];
export type Board = (null | 'snake' | 'food')[][];