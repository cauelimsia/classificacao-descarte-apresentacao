# Classificação e Descarte — apresentação

Deck web da atividade prática **Classificação e Descarte** (cenário TechNova Solutions),
disciplina Introdução à Segurança da Informação (Martha Falcão Wyden, Prof. Ranyere Lima).

**Ver no ar:** https://cauelimsia.github.io/classificacao-descarte-apresentacao/

## O que tem de interessante

- Engine de slides própria em JavaScript puro: cada slide é um objeto de dados, o resto é derivado
- **Modo quiz para a sala**: cada ativo aparece sem rótulo, a turma opina e o botão
  "Revelar classificação" mostra o veredito com justificativa e método de descarte
- Deep-link por hash (`#/3` abre direto o primeiro ativo), navegação por teclado e touch
- Notas do apresentador embutidas (tecla `N`)
- Fundo de partículas em canvas na capa, nas cores da identidade Wyden

## Rodar local

É estático, basta servir a pasta:

```bash
npx serve .
```

## Navegação

| Tecla | Ação |
|---|---|
| `←` `→` / espaço | slide anterior / próximo |
| `Home` / `End` | primeiro / último slide |
| `N` | notas do apresentador |
