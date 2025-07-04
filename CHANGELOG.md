Todas as alterações importantes deste projeto serão documentadas aqui.


## [v3.0] - 2025-07-04

### Adicionado
- Sistema de **dano por negligência** com base em urgência das necessidades
- Morte por negligência
- Segundo agente com movimentação independente
- Obstáculos no mapa (bloqueiam movimentação)
- Células de dano (atravessáveis, causam dano)
- Painel lateral exibe status em tempo real
- Novo sistema visual de renderização para tipos de célula

### Corrigido
- Agente não ignora mais obstáculos ao caminhar
- Dano de célula "damage" agora é aplicado corretamente

### Alterado
- Reorganização dos arquivos: `Grid.ts` e `MemoryAgent.ts` foram removidos, substituídos por estrutura mais consolidada
- Substituição do antigo mundo por nova classe `World` com geração procedural
- Refatoração interna do agente para maior clareza e separação de responsabilidades


## [2.0] - 2025-07-03

### Adicionado
- Sistema de necessidades com níveis de urgência (Saciado, Moderado, Baixo, Crítico)
- Priorização de necessidades baseada na urgência e na presença de pontos de recurso no mapa
- Ações visuais correspondentes à necessidade atual
- Painel informativo com status do agente e ação atual
- Valor máximo de status personalizado por agente
- Decisões conscientes com base em necessidade (em vez de comportamento aleatório)
- Sistema de ações instintivas com lógica consistente e expansível

### Modificado
- Agente deixa de agir com base apenas na sorte e passa a tomar decisões com lógica
- A ação “andar” agora consome recursos e não ocorre se o agente estiver saciando uma necessidade
- Substituição do uso de strings por enums/números em propriedades de estado interno


## [1.0] - 2025-07-02

### Adicionado
- Mapa com grid 10x10
- Ponto inicial fixo do agente
- Movimento aleatório com tentativa e erro
- Sistema de energia, humor, fome e sede
- Redução de status ao andar ou ficar parado
- Locais fixos para saciar fome, sede e energia
- Painel de visualização básica dos status
