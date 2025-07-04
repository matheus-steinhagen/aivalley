import { World } from "./World";
import type { CellType } from "./World";

export class Agent {
  // DIRECTION
  private x: number;
  private y: number;
  private moves: number = 0;
  private lastDirection: string = "Nenhuma";
  private failedAttempts: number = 0;
  private world: World;

  //MEMORY
  private memory: { x: number; y: number }[] = [];
  private memoryLimit: number = 5;

  //STATUS
  private maxStatus: number[];
  private health: number;
  private water: number;
  private food: number;
  private energy: number;
  private mood: number;

  private need:number = 0;
  private actionName: string = "Nenhuma";
  private alive:boolean = true;

  constructor(world: World, position:number[], maxStatus: number[]) {
    this.world = world;
    [this.x, this.y] = [...position]; //Posição inicial
    this.maxStatus = maxStatus;
    [this.health, this.water, this.food, this.energy, this.mood] = [...maxStatus];
    this.rememberPosition(this.x, this.y);
  }

  //------------------------------
  // GETTERS
  //------------------------------

  //Position
  public getX(): number {
    return this.x;
  }
  public getY(): number {
    return this.y;
  }
  public getMemory(): { x: number; y: number }[] {
    return this.memory;
  }
  public getMoves(): number {
    return this.moves;
  }
  public getLastDirection(): string {
    return this.lastDirection;
  }
  public getFailedAttempts(): number {
    return this.failedAttempts;
  }

  //Status
  public getHealth(): number {
    return this.health;
  }
  public getWater(): number {
    return this.water;
  }
  public getFood(): number {
    return this.food;
  }
  public getEnergy(): number {
    return this.energy;
  }
  public getMood(): number {
    return this.mood;
  }
  public getNeedName(): string {
    return ['Água', 'Comida', 'Descanso', 'Exploração'][this.need];
  }
  public getActionName(): string {
    return this.actionName;
  }

  public isAlive(): boolean {
    return this.alive;
  }

  private hasTypeAtCurrentPosition(type:CellType):boolean{
    const cell = this.world.getCell(this.x, this.y)
    return !!cell && cell.types.includes(type)
  }

  //Ambiente
  public isAtHome(): boolean {
    return this.hasTypeAtCurrentPosition("home")
  }
  public isAtWaterPoint(): boolean {
    return this.hasTypeAtCurrentPosition("water")
  }
  public isAtFoodPoint(): boolean {
    return this.hasTypeAtCurrentPosition("food")
  }
  public isAtRestPoint(): boolean {
    return this.hasTypeAtCurrentPosition("rest")
  }

  private clampStats(): void {
    const [mh, mw, mf, me, mm] = this.maxStatus;
    this.health = Math.max(0, Math.min(mh, this.health));
    this.water = Math.max(0, Math.min(mw, this.water));
    this.food = Math.max(0, Math.min(mf, this.food));
    this.energy = Math.max(0, Math.min(me, this.energy));
    this.mood = Math.max(0, Math.min(mm, this.mood));
  }

  private rememberPosition(x: number, y: number): void {
    this.memory.push({ x, y });
    if (this.memory.length > this.memoryLimit) {
      this.memory.shift(); //Remove posição mais antiga
    }
  }

  private getNeedUrgency(ratio: number): number {
    if (ratio >= 0.75) return 0;
    if (ratio >= 0.5) return 1;
    if (ratio >= 0.25) return 2;
    return 3;
  }

  private getUrgencyLevels():{id:number, ratio:number, urgency:number}[]{
    const [mh, mw, mf, me, mm] = this.maxStatus;

    const ratios = [
      this.water / mw,
      this.food / mf,
      this.energy / me,
      this.mood / mm,
    ];

    return ratios.map((ratio, i) => ({
      id: i,
      ratio,
      urgency: this.getNeedUrgency(ratio),
    }));    
  }

  public instinctiveNeeds(currentNeed: number):number {

    const urgencies = this.getUrgencyLevels();

    // Se ainda precisa continuar a necessidade anterior
    if (
      currentNeed === 0 && urgencies[0].ratio < 0.95 && this.isAtWaterPoint()
      || currentNeed === 1 && urgencies[1].ratio < 0.95 && this.isAtFoodPoint()
      || currentNeed === 2 && urgencies[2].ratio < 0.95 && this.isAtRestPoint()
    ) {
      return currentNeed;
    }

    // Caso contrário, escolher nova necessidade com base na urgência
    const critical = urgencies.filter(n => n.urgency === 3);
    if(critical.length > 0) return critical.sort((a, b) => a.ratio - b.ratio)[0].id;

    const low = urgencies.filter(n => n.urgency === 2);
    if(low.length > 0) return low.sort((a, b) => a.ratio - b.ratio)[0].id;

    const moderate = urgencies.filter(n => n.urgency === 1 && (
      (n.id === 0 && this.isAtWaterPoint()) ||
      (n.id === 1 && this.isAtFoodPoint()) ||
      (n.id === 2 && this.isAtRestPoint())
    ));
    if(moderate.length > 0) return moderate.sort((a, b) => a.ratio - b.ratio)[0].id;

    return 3;
  }

  //------------------------------
  // SETTERS
  //------------------------------

  private directionName(dir: { dx: number; dy: number }): string {
    if (dir.dx === 0 && dir.dy === 0) return "Parado";
    if (dir.dx === 0 && dir.dy === -1) return "Cima";
    if (dir.dx === 0 && dir.dy === 1) return "Baixo";
    if (dir.dx === -1 && dir.dy === 0) return "Esquerda";
    if (dir.dx === 1 && dir.dy === 0) return "Direita";
    return "Desconhecida";
  }

  public makeNextMove(): void {
    const [mh, mw, mf, me, mm] = this.maxStatus;
    const isAtHome = this.isAtHome();
    this.need = this.instinctiveNeeds(this.need);

    switch (this.need) {
      case 0:
        if (this.isAtWaterPoint()) this.drink(isAtHome);
        else this.walk(isAtHome);
        break;

      case 1:
        if (this.isAtFoodPoint()) this.eat(isAtHome);
        else this.walk(isAtHome);
        break;

      case 2:
        if (this.isAtRestPoint()) this.rest(isAtHome);
        else this.walk(isAtHome);
        break;

      case 3:
        this.walk(isAtHome);
        break;

      default:
        this.stay(isAtHome);
        break;
    }

    this.clampStats();
    this.applyNeglectPenalty();
    
    if(this.health <= 0) this.alive = false;
  }

  public walk(isAtHome: boolean): void {
    if (isAtHome) {
      this.water -= 2;
      this.food -= 2;
      this.energy -= 1;
      this.mood -= 0; // neutro
    } else {
      this.water -= 6;
      this.food -= 4;
      this.energy -= 6;
      this.mood -= 2;
    }
    this.actionName = "Andando";

    const directions = [
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 },
    ];

    let TriedDirections: boolean[] = [false, false, false, false];

    while (true) {
      const options = directions
        .map((_, i) => i)
        .filter((i) => !TriedDirections[i]);

      if (options.length === 0) return;

      const choice = options[Math.floor(Math.random() * options.length)];
      TriedDirections[choice] = true;

      const newX = this.x + directions[choice].dx;
      const newY = this.y + directions[choice].dy;

      //Verificar disponibilidade da direção escolhida
      if (!this.world.isWithinBounds(newX, newY)) {
        this.failedAttempts++;
        continue;
      }

      const cell = this.world.getCell(newX, newY);
      if(cell && cell.types.includes("obstacle")){
        this.failedAttempts++;
        continue;
      }

      this.x = newX;
      this.y = newY;

      if(cell && cell.types.includes("damage")) this.health -= 10;

      this.lastDirection = this.directionName(directions[choice]);
      this.moves++;
      this.rememberPosition(this.x, this.y);

      return;
    }
  }

  public rest(isAtHome: boolean): void {
    if (isAtHome) {
      this.health +=4
      this.energy += 20;
      this.mood -= 1;
      this.food -= 1;
      this.water -= 2;
    } else {
      this.health +=2
      this.energy += 10;
      this.mood -= 2;
      this.food -= 2;
      this.water -= 4;
    }
    this.actionName = "Descansando";
  }

  public eat(isAtHome: boolean): void {
    if (isAtHome) {
      this.health +=4
      this.food += 20;
      this.energy += 2;
      this.mood += 2;

      this.water -= 1;
    } else {
      this.health +=2
      this.food += 10;
      this.energy += 1;
      this.mood += 1;

      this.water -= 1;
    }
    this.actionName = "Comendo";
  }

  public drink(isAtHome: boolean): void {
    if (isAtHome) {
      this.health +=4
      this.water += 20;
      this.energy += 2;
      this.mood += 2;

      this.food -= 1;
    } else {
      this.health +=2
      this.water += 10;
      this.energy += 1;
      this.mood += 1;

      this.food -= 1;
    }
    this.actionName = "Bebendo";
  }

  public stay(isAtHome: boolean): void {
    if (isAtHome) {
      this.water -= 1;
      this.food -= 1;
      this.energy -= 0;
      this.mood -= 1;
    } else {
      this.water -= 3;
      this.food -= 2;
      this.energy -= 1;
      this.mood -= 2;
    }
  }

  public applyNeglectPenalty():void{
    const [mh] = this.maxStatus;
    const urgencies = this.getUrgencyLevels();

    let damage = 0;

    urgencies.forEach(u => {
      if(u.urgency === 3) damage += 2;
      else if(u.urgency === 2) damage += 1;
    });

    if(damage > 0) this.health -= damage;
    if(this.health <= 0) this.health = 0;
  }
}
