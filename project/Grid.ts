export class Grid{
    private x:number;
    private y:number;
    private cellSize:number;

    constructor(x:number, y:number, cellSize:number){
        this.x = x;
        this.y = y;
        this.cellSize = cellSize;
    }

    isWithinBounds(x:number, y:number): boolean{
        return(
            x >= 0 &&
            y >= 0 &&
            x < this.x &&
            y < this.y
        );
    }

    getCellSize():number{
        return this.cellSize;
    }

    getCanvasDimensions(): {x:number, y:number}{
        return{
            x: this.x * this.cellSize,
            y: this.y * this.cellSize
        };
    }

    getX():number{
        return this.x
    }

    getY():number{
        return this.y
    }
}