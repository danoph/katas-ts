export class Game {
    constructor(public grid) {}

    tick(){
        let newGrid = [];
        let newRow = [];

        for (let rowIndex in this.grid) {
            const row = this.grid[+rowIndex]

            for (let cellIndex in row) {
                const cell = row[+cellIndex]    
                if (cell === '.') {
                    const neighbors = this.getNeighbors(+cellIndex, +rowIndex);
                    const liveNeighborCount = neighbors.filter(neighbor => neighbor === '.').length;
                    if (liveNeighborCount < 2) {
                        newRow.push(' ');
                    } else {
                        newRow.push('.');
                    }
                }
            }
            newGrid.push(newRow);
            newRow = [];
        }
        
        this.grid = newGrid;
    }

    getNeighbors(x, y) {
        let neighbors = [];

        if (y < this.grid.length - 1) {
            const rightNeighbor = this.grid[y][x+1];
            const lowerNeighbor = this.grid[y+1][x];
            const lowerRightNeighbor = this.grid[y+1][x+1];

            neighbors.push(rightNeighbor, lowerNeighbor, lowerRightNeighbor);
        }
        return neighbors;   
    }
}

class Cell {
    living: boolean;
    constructor(private isAlive) {
        this.living = isAlive;
    }
}

// 12 x 12
