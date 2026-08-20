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

## Passar os slides pelo celular

O deck aceita um controle remoto: o notebook projeta e o celular avança. Precisa rodar o
servidor local (só biblioteca padrão do Python, sem instalar nada):

```bash
python servidor-controle.py
```

Ele imprime os dois endereços:

- **notebook** — `http://localhost:8000/` (é este que vai no projetor)
- **celular** — `http://<ip-do-notebook>:8000/controle`

O celular mostra o slide atual, a nota do apresentador, o que vem a seguir e um botão grande
de avançar — que avisa quando o toque vai *revelar a classificação* em vez de trocar de slide.
A tela do celular não apaga durante a apresentação (Wake Lock).

Os dois precisam estar na mesma rede. **Se a wi-fi da sala for ruim ou isolar os dispositivos,
ligue o roteador do celular e conecte o notebook nele** — aí a rede é sua e não depende da
faculdade. Nada disso usa internet: o tráfego é só entre os dois aparelhos.

No GitHub Pages não existe servidor, então o controle simplesmente não conecta e o deck
funciona normal por teclado e touch.

## Navegação

| Tecla | Ação |
|---|---|
| `←` `→` / espaço | slide anterior / próximo |
| `Home` / `End` | primeiro / último slide |
| `N` | notas do apresentador |
| `PageUp` / `PageDown` | também navegam — é o que um clicker Bluetooth genérico envia |
