import { Agent } from "./Agent";

export function updateStatus(agent: Agent): void {
  const panel = document.getElementById("status-panel");
  console.log("Importado");
  if (!panel) return;

  panel.innerHTML = `
        <strong>Status do Agente</strong><br>
        Vida: ${agent.getHealth()}<br>
        Sede: ${agent.getWater()}<br>
        Fome: ${agent.getFood()}<br>
        Energia: ${agent.getEnergy()}<br>
        Humor: ${agent.getMood()}
        <hr />
        Ação:  ${agent.getActionName()}<br>
        Necessidade:  ${agent.getNeedName()}
        <hr />
        Posição atual: (${agent.getX()}, ${agent.getY()})<br>
        Movimentos totais: ${agent.getMoves()}<br>
        Direção recente: ${agent.getLastDirection()}<br>
        Tentativas inválidas: ${agent.getFailedAttempts()}<br>
        Memória (últimas posições):<br>
        <ul>
            ${agent
              .getMemory()
              .map((pos) => `<li>(${pos.x}, ${pos.y})</li>`)
              .join("")}
        </ul>
    `;
}
