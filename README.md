# Classificação e Descarte — apresentação

Deck web da atividade prática **Classificação e Descarte** (cenário TechNova Solutions),
disciplina Introdução à Segurança da Informação (Martha Falcão Wyden, Prof. Ranyere Lima).

**Ver no ar:** https://cauelimsia.github.io/classificacao-descarte-apresentacao/

## O que tem de interessante

- Engine de slides própria em JavaScript puro: cada slide é um objeto de dados, o resto é derivado
- **Modo quiz para a sala**: cada ativo aparece sem rótulo, a turma opina e o botão
  "Revelar classificação" mostra o veredito com justificativa e método de descarte
- **Simulado ENADE**: as 10 questões discursivas da atividade, uma por slide. A pergunta fica à
  esquerda, a sala responde, e a seta abre nossa resposta à direita — com a fundamentação em
  ISO 27001/27002 e LGPD, que é o que vale metade da nota
- Deep-link por hash (`#/3` abre direto o primeiro ativo), navegação por teclado e touch
- Notas do apresentador embutidas (tecla `N`)
- Fundo de partículas em canvas na capa, nas cores da identidade Wyden

## Rodar local

É estático, basta servir a pasta:

```bash
npx serve .
```

## Passar os slides pelo celular

Nada para instalar na máquina que projeta — ela só abre o link do GitHub Pages.

1. Na máquina do projetor, abra https://cauelimsia.github.io/classificacao-descarte-apresentacao/
2. No canto superior direito aparece um **código de 4 caracteres**
3. No celular, abra `https://cauelimsia.github.io/classificacao-descarte-apresentacao/controle.html`
   e digite o código
4. Pareou, o cartão do código encolhe e o celular passa a comandar

O celular mostra o slide atual, a nota do apresentador, o que vem a seguir e um botão grande
de avançar — que avisa quando o toque vai *revelar a classificação* em vez de trocar de slide.
A tela do celular não apaga durante a apresentação (Wake Lock).

Atalho: `.../controle.html#sala=ABCD` já entra pareado, dá para deixar salvo antes da aula.
O último código também fica no `localStorage` do celular, então reabrir a página reconecta sozinho.

### Como funciona

Os dois lados falam por MQTT sobre WebSocket num broker público
(`broker.emqx.io`), nos tópicos `wyden/deck/<CODIGO>/acao` e `.../estado`. O estado é
publicado com `retain`, então o celular abre já sincronizado. O código sorteado fica no
`sessionStorage` do deck — um F5 no meio da apresentação não derruba o pareamento.

O broker é público e sem autenticação: quem souber o código consegue passar os slides.
Para uma apresentação de aula isso é aceitável, mas não coloque nada sensível no canal.
Se o broker cair, o deck continua funcionando normal no teclado — o controle é um extra.

### Plano B: sem internet, servidor local

Se a internet da sala não colaborar e você puder rodar algo na máquina que projeta, existe um
servidor em Python (só biblioteca padrão) que faz o mesmo pela rede local:

```bash
python servidor-controle.py
```

Ele imprime os dois endereços — `http://localhost:8000/` para o projetor e
`http://<ip-do-notebook>:8000/controle` para o celular. Os dois precisam estar na mesma rede;
se a wi-fi da faculdade isolar os dispositivos, ligue o roteador do celular e conecte o
notebook nele.

## Navegação

| Tecla | Ação |
|---|---|
| `←` `→` / espaço | slide anterior / próximo |
| `Home` / `End` | primeiro / último slide |
| `N` | notas do apresentador |
| `C` | mostra/esconde o cartão com o código do controle |
| `PageUp` / `PageDown` | também navegam — é o que um clicker Bluetooth genérico envia |
