interface PeriodInputGrid {
    type: string;
    grid: string[][];
}

interface NumbersInputGrid {
    type: string;
    grid: number[][];
}

export class Game {
    grid: Cell[][];

    constructor(grid: PeriodInputGrid | NumbersInputGrid) {
        this.grid = this.convertGrid(grid);
    }

    start() {
        setInterval(() => {
            console.clear();
            this.tick();
            for (let row of this.grid) {
                let rowString = '';
                for (let cell of row) {
                    rowString += cell.toString();
                }
                console.log(rowString);
            }
        }, 100);
    }

    stringOutput() {
        return this.grid.map(row => row.map(cell => cell.stringOutput()));
    }

    convertGrid(inputGrid) {
        let magicString;
        if (inputGrid.type === 'periods') {
            magicString = '.';
        }
        if (inputGrid.type === 'numbers') {
            magicString = 1;
        }
        return inputGrid.grid.map(row => row.map(cell => cell === magicString ? new LiveCell() : new DeadCell()));
    }
 
    tick() {
        let newGrid = [];
        let newRow = [];
        for (let rowIndex in this.grid) {
            const row = this.grid[+rowIndex]

            for (let cellIndex in row) {
                const cell = row[+cellIndex];
                const neighbors = this.getNeighbors(+cellIndex, +rowIndex);
                const liveNeighborCount = neighbors.filter(neighbor => neighbor.isLiving).length;
                if (cell.isLiving) {
                    if (liveNeighborCount < 2 || liveNeighborCount > 3) {
                        newRow.push(new DeadCell());
                    } else {
                        newRow.push(new LiveCell());
                    }
                } else {
                    if (liveNeighborCount === 3) {
                        newRow.push(new LiveCell());
                    } else {
                        newRow.push(new DeadCell());
                    }
                }
            }
            newGrid.push(newRow);
            newRow = [];
        }
        
        this.grid = newGrid;
    }

    // return a cell or undefined
    getCellAt(x, y) {
        return this.grid[y] && this.grid[y][x];
    }

    getNeighbors(x, y) {
      return [
        this.getCellAt(x+1,y-1),
        this.getCellAt(x,y-1),
        this.getCellAt(x-1,y-1),
        this.getCellAt(x+1,y+1),
        this.getCellAt(x-1,y+1),
        this.getCellAt(x-1,y),
        this.getCellAt(x+1,y),
        this.getCellAt(x,y+1)
      ].filter(cell => cell);
    }
}

class Cell {
    isLiving: boolean;

    stringOutput() {
        return this.isLiving ? "." : " ";
    }
}

class LiveCell extends Cell {
    isLiving = true;
}

class DeadCell extends Cell {
    isLiving = false;
}

