import { World } from "./World";
import { Agent } from "./Agent";

export function render(world:World, agents:Agent[]) {

  //Identifica o canvas
  const canvas = document.getElementById("aivalley") as HTMLCanvasElement;
  if (!canvas) return;

  //Aciona o pincel
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  //Determinando o tamanho do Canvas
  const cellSize = world.getCellSize();
  canvas.width = world.getWidth() * cellSize;
  canvas.height = world.getHeight() * cellSize;

  ctx.clearRect(0, 0, canvas.width, canvas.height); //Limpando o canvas

  //Cores por tipo
  const typeColors: Record<string, string> = {
    empty: "#fff",
    trail: "#eee",
    water: "aqua",
    food: "tomato",
    rest: "beige",
    obstacle: "#555",
    damage: "purple",
    agent: "blue",
  }

  for(let y = 0; y < world.getHeight(); y++){
    for(let x = 0; x < world.getWidth(); x++){
      const cell = world.getCell(x, y);
      if(!cell) continue;

      const mainType = cell.types[cell.types.length -1] || "empty";
      ctx.fillStyle = typeColors[mainType] || "#ccc";
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);

      ctx.strokeStyle = "#ccc";
      ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }

  //Desenhar o agente
  ctx.fillStyle = typeColors["agent"];
  for(const agent of agents){
    ctx.fillRect(agent.getX() * cellSize, agent.getY() * cellSize, cellSize, cellSize);
  }
  
}
