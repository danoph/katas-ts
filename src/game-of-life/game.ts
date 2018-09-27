export class Game {
    constructor(public grid) {}

    tick(){
        let newGrid = [];
        let newRow = [];

        for (let rowIndex in this.grid) {
            const row = this.grid[+rowIndex]

            for (let cellIndex in row) {
                const cell = row[+cellIndex]    
                const neighbors = this.getNeighbors(+cellIndex, +rowIndex);
                const liveNeighborCount = neighbors.filter(neighbor => neighbor === '.').length;
                if (cell === '.') {
                    if (liveNeighborCount < 2 || liveNeighborCount > 3) {
                        newRow.push(' ');
                    } else {
                        newRow.push('.');
                    }
                } else {
                    if (liveNeighborCount === 3) {
                        newRow.push('.');
                    } else {
                        newRow.push(' ');
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

        if (y <= this.grid.length - 1) {
            let upperRightNeighbor;
            let upperNeighbor;
            let upperLeftNeighbor;
            let lowerRightNeighbor;
            let lowerLeftNeighbor;
            let leftNeighbor;
            let rightNeighbor;
            let lowerNeighbor;

            if (y != 0) {
                upperNeighbor = this.grid[y-1][x];
                if (x !== this.grid[y].length - 1) {
                    upperRightNeighbor = this.grid[y-1][x+1];    
                }
                if (x != 0) {
                    upperLeftNeighbor = this.grid[y-1][x-1];
                }
            }
            if (x != 0) {
                leftNeighbor = this.grid[y][x-1];
            }

            if (x !== this.grid[y].length - 1) {
                rightNeighbor = this.grid[y][x+1];
            }
            
            if (y !== this.grid.length - 1) {
                lowerNeighbor = this.grid[y+1][x];
            }

            if (y !== this.grid.length - 1 && x !== 0) {
                lowerLeftNeighbor = this.grid[y+1][x-1];
            }
            
            if (y !== this.grid.length - 1 && x !== this.grid[y].length - 1) {
                lowerRightNeighbor = this.grid[y+1][x+1];    
            }

            neighbors.push(
                rightNeighbor, 
                lowerNeighbor, 
                lowerRightNeighbor, 
                upperLeftNeighbor, 
                upperRightNeighbor, 
                upperNeighbor, 
                lowerLeftNeighbor, 
                leftNeighbor
            );
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
