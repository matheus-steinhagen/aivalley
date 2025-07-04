# 🧠 AI Valley

> ✅ **Versão 3.0 concluída e estável**  
> 🧪 Versões anteriores disponíveis nas branches `v1` e `v2`

Simulação visual de agentes inteligentes com memória, necessidades básicas e interação em um mundo dinâmico 2D.


## 🎯 Propósito

**AI Valley** é um laboratório pessoal com estrutura profissional, criado para:

- 🏗️ Explorar **Arquitetura de Software escalável**
- 🧠 Estudar **Inteligência Artificial em simulações**
- 💻 Aprimorar habilidades com **JavaScript, TypeScript, JSON**
- 🔁 Construir um **framework SPA autoral** reutilizável


## ⚙️ Framework SPA — `steinFrontWorks.js v0.1`

O projeto utiliza o `steinFrontWorks.js`, um **Single Page Application Framework** criado do zero.

### 🔧 Características principais:
- 🚦 Roteador autoral (`router.ts`)
- 🧩 Carregamento dinâmico de templates HTML
- 🔁 Injeção de scripts por componente
- 📁 Separação clara entre **engine** (`bridge/`) e **domínio do projeto** (`project/`)


## 🧠 Agentes Inteligentes

### `Agent.ts`

Cada agente possui:

- **Necessidades básicas**: sede, fome, energia, humor
- **Vida (`health`)**: reduzida por negligência ou armadilhas
- **Movimento autônomo** com decisões instintivas


## 🌍 Mundo 2D Dinâmico

### `World.ts`

- Gera mapa com **células aleatórias** a cada nova partida
- Cada célula pode conter:
  - 🟦 Água
  - 🍎 Comida
  - 🛏️ Descanso
  - 💀 Armadilhas (causam dano)
  - ⛔ Obstáculos (impassáveis)
- Gerador garante que itens não apareçam sobre obstáculos


## 📊 Sistema de Necessidades

- Urgência calculada por porcentagem da necessidade
- Necessidades críticas ou zeradas causam **dano por negligência**
- HUD exibe status do agente em tempo real:
  - Vida, sede, fome, energia, humor, necessidade atual


## ☠️ Morte e Reinício

- Toda partida é única: novo mundo, novos desafios


## 👥 Multi-agente

- Até dois agentes convivendo no mesmo mundo
- Cada um com autonomia completa


## 🧪 Painel inferior

- Exibe:
  - Status do agente
  - Necessidade ativa
  - Última direção


## 🌀 Game Loop

- Executado a cada 500ms
- Cada ciclo:
  1. Agente escolhe uma ação com base em suas urgências
  2. Ação afeta seus status
  3. Painel é atualizado
  4. Mundo é re-renderizado no canvas


## ✅ Entregas concluídas — v3.0

- ✅ Mundo aleatório e persistente
- ✅ Agentes com decisão instintiva
- ✅ Obstáculos e armadilhas funcionais
- ✅ Sistema de dano por negligência calibrado
- ✅ Loop de morte funcional
- ✅ Painel de status reativo


## 🧭 Roteiro Futuro (v4+)

- [ ] Separação completa entre **ambiente**, **recursos**, **agentes** e **ações**
- [ ] Dados de tipos (`food`, `water`, `rest`, etc.) em arquivos `.json`
- [ ] Células do mapa visuais com sprites distintos
- [ ] Sistema de coleta de **itens** com inventário
- [ ] Sistema de **missões internas e desejos espontâneos**
- [ ] Sistema de **golpes**, evolução e combate entre agentes
- [ ] Persistência local (`localStorage`) ou sincronização com servidor
- [ ] Suporte a múltiplos mapas (biomas diferentes)


## 🚀 Como Executar

```bash
git clone https://github.com/matheus-steinhagen/ai-valley.git
cd ai-valley
npm install
npm run dev
```
Acesse em http://localhost:5173


## 📦 Requisitos

- Node.js v18 ou superior
- Navegador moderno com suporte a ES Modules


## 🧠 Dica para Contribuintes

Você pode clonar a branch `main` (v3.0) e iniciar sua própria linha de evolução!

Se preferir v2.0 e v1.0 também disponíveis

> Em breve: `CONTRIBUTING.md` com:
> - Regras de estilo e arquitetura
> - Como adicionar novos tipos de células
> - Como criar novos agentes e comportamentos


## 👨‍💻 Autor

**Matheus Steinhagen**  
Desenvolvedor autodidata com foco em:

- 🧱 Arquitetura de Software
- 🧠 Inteligência Artificial Aplicada
- 🔐 Cibersegurança e minimalismo digital


## 📄 Licença

MIT — Este projeto é livre para estudo, uso e modificação.  
**Créditos são sempre bem-vindos!**
