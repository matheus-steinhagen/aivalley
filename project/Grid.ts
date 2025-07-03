export class Grid{
    private x:number;
    private y:number;
    private cellSize:number;

    constructor(x:number, y:number, cellSize:number){
        this.x = x;
        this.y = y;
        this.cellSize = cellSize;
    }

  //------------------------------
  // GETTERS
  //------------------------------

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

  //------------------------------
  // SETTERS
  //------------------------------

    isWithinBounds(x:number, y:number): boolean{
        return(
            x >= 0 &&
            y >= 0 &&
            x < this.x &&
            y < this.y
        );
    }

    isHome(x:number, y:number){
        return x==0 && y==0;
    }

    isRestPoint(x:number, y:number){
        return x==0 && y==0;
    }

    isWaterPoint(x:number, y:number){
        return x==2 && y==2;
    }

    isFoodPoint(x:number, y:number){
        return x==4 && y==4;
    }
}