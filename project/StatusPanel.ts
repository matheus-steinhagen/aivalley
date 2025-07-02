import { MemoryAgent } from "./MemoryAgent";

export function updateStatus(agent:MemoryAgent):void{
    const panel = document.getElementById('status-panel')
    console.log("Importado")
    if(!panel) return

    panel.innerHTML = `
        <strong>Status do Agente</strong><br>
        Posição atual: (${agent.getX()}, ${agent.getY()})<br>
        Movimentos totais: ${agent.getMoves()}<br>
        Direção recente: ${agent.getLastDirection()}<br>
        Tentativas inválidas: ${agent.getFailedAttempts()}<br>
        Memória (últimas posições):<br>
        <ul>
            ${agent.getMemory()
                .map(pos => `<li>(${pos.x}, ${pos.y})</li>`)
                .join("")}
        </ul>
    `
}