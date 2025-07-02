import { Grid } from "./Grid";

export class MemoryAgent {
  private x: number; //Posição x do agente
  private y: number; //Posição y do agente
  private grid: Grid; //VIsão do agente
  private memory: { x: number; y: number }[] = []; //Memória do agente
  private memoryLimit: number = 5; //Limite da memória

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
        continue;
      }

      //Verificar se local já é conhecido
      if (this.alreadyVisited(newX, newY)) {
        continue;
      }

      this.x = newX;
      this.y = newY;
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
