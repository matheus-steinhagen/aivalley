# 🧠 AI Valley

> ✅ **Versão 1.0 concluída e estável**
> 🌱 Para versões futuras ou experimentais, utilize a branch `v2`.

Simulação visual de agentes inteligentes com memória curta em um mundo 2D baseado em grid.

## 🎯 Propósito
**AI Valley** é um laboratório pessoal — mas feito com estrutura e propósito profissional.
Criado com foco em:

- 🏗️ Arquitetura de Software moderna
- 🧠 Inteligência Artificial aplicada de forma didática
- 🛠️ Engenharia com JavaScript, TypeScript, Node e JSON
- 🧪 Construção de um **framework SPA autoral** e reutilizável

## ⚙️ Framework SPA — `steinFrontWorks.js v0.1`
Este projeto utiliza o **`steinFrontWorks.js`**, um **Single Page Application Framework** desenvolvido do zero por Matheus Steinhagen.

### 🔧 Principais características:

- 🚦 Roteador autoral (`router.ts`)
- 🧩 Carregamento dinâmico de **layouts** e **componentes HTML**
- 🔁 Injeção automática de templates e scripts (via ES Modules)
- 📁 Separação limpa entre **engine do app** (`bridge/`) e **lógica do projeto** (`project/`)
- 💡 Base ideal para evoluir em múltiplas direções, de jogos a dashboards

## 🧠 Agente Inteligente

### `MemoryAgent.ts`
- Guarda posição atual no grid (`x`, `y`)
- Move-se aleatoriamente em 4 direções (↑ ↓ ← →)
- Evita movimentos repetidos (memória curta)
- Verifica limites do grid antes de se mover

## 🌍 Mundo 2D

### `Grid.ts`
- Define um mundo com 10x10 células de 32px
- Calcula dimensões do canvas automaticamente
- Fornece métodos para validar posições

## 🖼️ Renderização com Canvas

### `Renderer.ts`
- Usa a API Canvas 2D do HTML5
- Desenha o agente como um quadrado azul
- Atualiza a visualização a cada movimento

## 🔁 Game Loop

- Executado com `setInterval` a cada 500ms
- O agente realiza uma ação por ciclo
- O canvas é redesenhado com base na nova posição

> ⏳ O loop inicia somente após o carregamento completo dos scripts (`scripts:ready`), garantindo estabilidade e sincronização.

## 📦 Requisitos

- Node.js v18 ou superior
- Navegador moderno com suporte a ES Modules

## 🚀 Como Executar

```bash
git clone https://github.com/matheus-steinhagen/ai-valley.git
cd ai-valley
npm install
npm run dev
```
Acesse em http://localhost:5173 (ou a porta configurada).

## ✅ Primeira Entrega — Checkpoint Concluído
- ✅ Grid funcional com agente móvel
- ✅ Renderização 2D estável
- ✅ Lógica de movimentação com memória
- ✅ Estrutura modular e pronta para expansão
- ✅ Documentação completa
- ✅ Framework SPA autoral funcionando

## 🧭 Roteiro Futuro - próximas versões
- 🔲 Visualização das linhas do grid
- 🧱 Obstáculos no mundo
- 🧠 Múltiplos agentes com comportamentos distintos
- 🎯 Objetivos no mapa (coletar, alcançar, evitar)
- 📚 Aprendizado por reforço simples (Q-Learning)
- ⏯️ Interface de controle: start / pause / reset
- 🧊 Animações suaves e renderização otimizada

## 🧠 Dica para Contribuintes
Você pode clonar a branch main (v1.0) e criar sua própria linha evolutiva!
> Em breve: arquivo CONTRIBUTING.md com:
> 1. Como rodar o projeto
> 2. Como adicionar agentes, regras, componentes
> 3. Regras de estilo e arquitetura

## 👨‍💻 Autor
**Matheus Steinhagen**
Desenvolvedor autodidata com foco em:
- 🧱 Arquitetura de Software
- 🧠 Inteligência Artificial Aplicada
- 🔐 Cibersegurança

## 📄 Licença
MIT — Este projeto é livre para estudo, uso e modificação.
Créditos são bem-vindos. 🤝

## 💬 Notas Finais
Se você também está estudando IA, arquitetura de software ou quer aprender a programar jogos com JS moderno, este projeto foi feito para ser um ponto de partida — claro, modular e inspirador.
