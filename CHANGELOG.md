Todas as alterações importantes deste projeto serão documentadas aqui.


## [2.0] - 2025-07-03

### Adicionado
- Sistema de necessidades com níveis de urgência (Saciado, Moderado, Baixo, Crítico)
- Priorização de necessidades baseada na urgência e na presença de pontos de recurso no mapa
- Ações visuais correspondentes à necessidade atual
- Painel informativo com status do agente e ação atual
- Valor máximo de status personalizado por agente
- Sistema de ações instintivas com lógica consistente e expansível

### Modificado
- A ação “andar” agora consome recursos e não ocorre se o agente estiver saciando uma necessidade
- Substituição do uso de strings por enums/números em propriedades de estado interno


## [1.0] - 2025-07-02

### Adicionado
- Mapa com grid 10x10
- Ponto inicial fixo do agente
- Movimento aleatório com tentativa e erro
- Painel de visualização básica dos status
