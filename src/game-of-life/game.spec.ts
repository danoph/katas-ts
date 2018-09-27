import { Game } from './game';

/***********************************************************************************************
1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
2. Any live cell with more than three live neighbours dies, as if by overcrowding.
3. Any live cell with two or three live neighbours lives on to the next generation.
4. Any dead cell with exactly three live neighbours becomes a live cell.
************************************************************************************************/

fdescribe('Game of Life', () => {
    let game;
    let grid;

    describe('Generates cells', () => {
        beforeEach(() => {
            grid = {
                type: 'periods',
                grid: [
                    ['.', ' ', '.', ' ', '.', ' '],
                    [' ', '.', ' ', '.', ' ', '.'],
                    ['.', ' ', '.', ' ', '.', ' '],
                    [' ', '.', ' ', '.', ' ', '.'],
                    ['.', ' ', '.', ' ', '.', ' '],
                    [' ', '.', ' ', '.', ' ', '.']
                ]
            };

            game = new Game(grid);
        })
        
        it('will have 6 rows of cells', () => {  
            expect(game.grid.length).toEqual(6);
        });

        it('first cell will be dead', () => {
            game.tick();
            expect(game.grid[0][0].isLiving).toEqual(false);
        });

        it('will blow up', () => {
            game.tick();
            expect(game.grid[5][5].isLiving).toEqual(false);
        });

        it('will die if has more than 3 living neighbors', () => {
            game.tick();
            expect(game.grid[2][2].isLiving).toEqual(false);
        });

        it('lives if it has 2 or 3 living neighbors', () => {
            game.tick();
            expect(game.grid[2][0].isLiving).toEqual(true);
            expect(game.grid[5][1].isLiving).toEqual(true);
        });

        it('will create a living cell if it has exactly 3 live neighbors', () => {
            game.tick();
            expect(game.grid[1][0].isLiving).toEqual(true);
        });

    })

    describe('passing in 0 and 1 grid', () => {
        beforeEach(() => {
            grid = {
                type: 'numbers',
                grid: [
                    [0,0,0,0,0],
                    [0,0,1,0,0],
                    [0,0,1,0,0],
                    [0,0,1,0,0],
                    [0,0,0,0,0],
                ]
            };

            game = new Game(grid);
        })

        it('translates grid correctly', () => {
            expect(game.stringOutput()).toEqual([
              [' ',' ',' ',' ',' '],
              [' ',' ','.',' ',' '],
              [' ',' ','.',' ',' '],
              [' ',' ','.',' ',' '],
              [' ',' ',' ',' ',' '],
            ]);
        })
    })
})
