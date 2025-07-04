export type CellType = 'empty' | 'home' | 'water' | 'food' | 'rest' | 'obstacle' | 'damage' | 'trail' | 'agent'
interface WorldCell{
    x:number;
    y:number;
    types:CellType[];
    discovered?:boolean;
    resourceCount?:number;
    damage?:number;
}

export class World{
    private width: number;
    private height: number;
    private cellSize: number;
    private cells: WorldCell[][] = []

    constructor(width:number, height:number, cellSize:number){
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        this.generateEmptyWorld()
        this.generateWorldFeatures();
    }

    private generateEmptyWorld():void{
        this.cells = [];
        for(let y = 0; y < this.height; y++){
            const row:WorldCell[] = [];
            for(let x = 0; x < this.width; x++){
                row.push({x,y,types:['empty']})
            }
            this.cells.push(row)
        }
    }

    //------------------------------
    // GETTERS
    //------------------------------

    public getCell(x:number, y:number):WorldCell | null{
        if(this.isWithinBounds(x,y)) return this.cells[y][x]
        return null;
    }
    public getCellSize():number{
        return this.cellSize;
    }
    public getWidth():number{
        return this.width;
    }
    public getHeight():number{
        return this.height;
    }

    //------------------------------
    // SETTERS
    //------------------------------

    isWithinBounds(x:number, y:number): boolean{
        return x >= 0 && y >= 0 && x < this.width && y < this.height
    }

    addType(x:number, y:number, type:CellType):void{
        const cell = this.getCell(x, y);
        if(cell && !cell.types.includes(type)) cell.types.push(type);
    }

    removeType(x:number, y:number, type:CellType):void{
        const cell = this.getCell(x, y)
        if(cell) cell.types = cell.types.filter(t => t !== type)
    }

    public generateWorldFeatures(config?:{
        foodCount?: number;
        waterCount?: number;
        restCount?: number;
        obstacleCount?: number;
        damageZonesCount?: number;
    }):void{
        const{
            foodCount = 5,
            waterCount = 5,
            restCount = 3,
            obstacleCount = 16,
            damageZonesCount = 4,
        } = config || {};

        this.placeRandomCells("water", waterCount);
        this.placeRandomCells("food", foodCount);
        this.placeRandomCells("rest", restCount);
        this.placeRandomCells("obstacle", obstacleCount);
        this.placeRandomCells("damage", damageZonesCount, true);
    }

    private placeRandomCells(
        type:CellType,
        count:number,
        allowOverlap:boolean = false
    ):void{
        let placed = 0;
        while(placed < count){
            const x = Math.floor(Math.random() * this.width);
            const y = Math.floor(Math.random() * this.height);
            const cell = this.getCell(x,y);

            if(!cell) continue;
            if(!allowOverlap && !cell.types.includes("empty")) continue;

            if(cell.types.includes("empty")) cell.types = [];
            
            cell.types.push(type)
            placed++;
        }
    }

    public print():void{
        for(let row of this.cells){
            console.log(row.map(cell => cell.types[0][0]).join(" "));
        }
    }

}