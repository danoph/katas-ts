export class Game {
    constructor(public grid) {}

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

    gridConverter() {

    }

    tick() {
        let newGrid = [];
        let newRow = [];
        for (let rowIndex in this.grid) {
            const row = this.grid[+rowIndex]

            for (let cellIndex in row) {
                const cellString = row[+cellIndex];
                const living = cellString === '.';
                const cell = living ? new LiveCell() : new DeadCell();
                const neighbors = this.getNeighbors(+cellIndex, +rowIndex);
                const liveNeighborCount = neighbors.filter(neighbor => neighbor === '.').length;
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
    constructor(public isLiving: boolean) {}

    toString() {
        return this.isLiving ? "." : " ";
    }
}

class LiveCell {
    isLiving = true;
}

class DeadCell {
    isLiving = false;
}

// class PeriodCell extends Cell {
//     constructor() {
//         super();
//         this.isLiving = this.cell === '.' ? true : false;
//     }
// }

