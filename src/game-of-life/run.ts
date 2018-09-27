import { Game } from './game';

const startingGrid = [
    ['.', ' ', '.', ' ', '.', ' '],
    [' ', '.', ' ', '.', ' ', '.'],
    ['.', ' ', '.', ' ', '.', ' '],
    [' ', '.', ' ', '.', ' ', '.'],
    ['.', ' ', '.', ' ', '.', ' '],
    [' ', '.', ' ', '.', ' ', '.']
];

const game = new Game(startingGrid);
game.start();