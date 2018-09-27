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
            grid = [
                ['.', ' ', '.', ' ', '.', ' '],
                [' ', '.', ' ', '.', ' ', '.'],
                ['.', ' ', '.', ' ', '.', ' '],
                [' ', '.', ' ', '.', ' ', '.'],
                ['.', ' ', '.', ' ', '.', ' '],
                [' ', '.', ' ', '.', ' ', '.']
            ];
            game = new Game(grid);
        })
        
        it('will have 6 rows of cells', () => {  
            expect(game.grid.length).toEqual(6);
        });

        it('first cell will be dead', () => {
            game.tick();
            expect(game.grid[0][0]).toEqual(' ');
        });

        it('will blow up', () => {
            game.tick();
            expect(game.grid[5][5]).toEqual(' ');
        });

        it('will die if has more than 3 living neighbors', () => {
            game.tick();
            expect(game.grid[2][2]).toEqual(' ');
        });

        it('lives if it has 2 or 3 living neighbors', () => {
            game.tick();
            expect(game.grid[2][0]).toEqual('.');
            console.log(game.grid);
            expect(game.grid[5][1]).toEqual('.');
        });

        it('will create a living cell if it has exactly 3 live neighbors', () => {
            game.tick();
            expect(game.grid[1][0]).toEqual('.');
        });

    })
})