import { Grid } from "./Grid";

export class MemoryAgent {
  private x: number; //Posição x do agente
  private y: number; //Posição y do agente
  private grid: Grid; //VIsão do agente
  private memory: { x: number; y: number }[] = []; //Memória do agente
  private memoryLimit: number = 5; //Limite da memória

  private moves:number = 0;
  private lastDirection:string = 'Nenhuma';
  private failedAttempts:number = 0;

  constructor(grid: Grid) {
    this.x = 0;
    this.y = 0; //Posição inicial
    this.grid = grid;
    this.rememberPosition(this.x, this.y);
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public getMemory():{ x:number, y:number }[]{
    return this.memory;
  }

  public getMoves():number{
    return this.moves;
  }

  public getLastDirection():string{
    return this.lastDirection;
  }

  public getFailedAttempts():number{
    return this.failedAttempts;
  }

  private directionName(dir:{dx:number, dy:number}):string{
    if (dir.dx === 0 && dir.dy === -1) return 'Cima';
    if (dir.dx === 0 && dir.dy === 1) return 'Baixo';
    if (dir.dx === -1 && dir.dy === 0) return 'Esquerda';
    if (dir.dx === 1 && dir.dy === 0) return 'Direita';
    return 'Desconhecida';
  }

  public makeNextMove(): void {
    const directions = [
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 },
    ];

    let TriedAll = false;
    let TriedDirections: boolean[] = [false, false, false, false];

    while (!TriedAll) {
      const notTriedDirections = directions
        .map((_, i) => i)
        .filter((i) => !TriedDirections[i]);

      //Tentou todas as direções sem sucesso
      if (notTriedDirections.length === 0) {
        TriedAll = true;
        return;
      }

      //Escolher direção
      const chosenDirection =
        notTriedDirections[
          Math.floor(Math.random() * notTriedDirections.length)
        ];
      TriedDirections[chosenDirection] = true;

      const newX = this.x + directions[chosenDirection].dx;
      const newY = this.y + directions[chosenDirection].dy;

      //Verificar disponibilidade da direção escolhida
      if (!this.grid.isWithinBounds(newX, newY)) {
        this.failedAttempts++;
        continue;
      }

      //Verificar se local já é conhecido
      if (this.alreadyVisited(newX, newY)) {
        this.failedAttempts++;
        continue;
      }

      this.x = newX;
      this.y = newY;
      this.lastDirection = this.directionName(directions[chosenDirection]);
      this.moves++;
      this.rememberPosition(this.x, this.y);
      return;
    }
  }

  private rememberPosition(x: number, y: number): void {
    this.memory.push({ x, y });
    if (this.memory.length > this.memoryLimit) {
      this.memory.shift(); //Remove posição mais antiga
    }
  }

  private alreadyVisited(x: number, y: number): boolean {
    return this.memory.some((pos) => pos.x === x && pos.y === y);
  }
}
