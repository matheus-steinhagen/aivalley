import { Grid } from "./Grid";
import { Agent } from "./Agent";

export function render(grid:Grid, agent:Agent) {

  //Identifica o canvas
  const canvas = document.getElementById("aivalley") as HTMLCanvasElement;
  if (!canvas) return;

  //Aciona o pincel
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const { x:width, y:height } = grid.getCanvasDimensions(); //Resgata as dimensões do canvas passadas no grid

  canvas.width = width;
  canvas.height = height;

  ctx.clearRect(0, 0, width, height); //Limpando o canvas

  //Desenhar linhas da grid
  ctx.strokeStyle = "#ccc";
  ctx.beginPath();

  for (let x = 0; x <= grid.getX(); x++) {
    const px = x * grid.getCellSize();
    ctx.moveTo(px, 0);
    ctx.lineTo(px, height);
  }

  for (let y = 0; y <= grid.getY(); y++) {
    const py = y * grid.getCellSize();
    ctx.moveTo(0, py);
    ctx.lineTo(width, py);
  }

  ctx.stroke();

  //Desenhar o agente
  ctx.fillStyle = "blue";
  const agentSize = grid.getCellSize();
  const agentX = agent.getX() * agentSize;
  const agentY = agent.getY() * agentSize;
  ctx.fillRect(agentX, agentY, agentSize, agentSize);
}
