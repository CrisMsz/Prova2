# Aula 18/09 — Hooks: useState e useEffect

Material do aluno: [**https://roveda.dev/materiais/hooks**](https://roveda.dev/materiais/hooks). Este README é o
roteiro da aula; o que está na página não se repete aqui.

O app da aula 7 (três telas, tudo estático) ganha a primeira reação: a tela
passa a responder ao toque e ao que o usuário digita. Vocabulário da
aula: **estado**, **re-render** e **efeito**.

## Rodar

```bash
npm install
npm start
```

## Roteiro

**1. O problema: a tela não muda** (Passos 1–2 da página). Abrir `notas.js`,
trocar `8,5` por uma variável `let nota = 8.5` e um `Button` que faz
`nota = nota + 1`. Não muda nada. É o gancho: variável comum não avisa o React.

**2. `useState`** (Passos 3–4, tela notas). `const [nota, setNota] = useState(8.5)`. Mostrar o par, a desestruturação, e que `setNota` re-renderiza.
Depois o toggle "Mostrar detalhes" para o estado booleano.

**3. `TextInput` controlado** (Passo 5, tela perfil). `value={nome}` +
`onChangeText={setNome}`. O nome da home não muda: cada tela tem o próprio
estado. Compartilhar estado entre telas fica para outra aula.

**4. `useEffect`** (Passos 6–7). Primeiro o `console.log` de `notas.js` com
`[nota]`: apertar o botão, ver o terminal. Trocar para `[]`: só loga na
abertura. Tirar a lista: loga em todo re-render, inclusive no toggle. Depois o
"perfil abriu / perfil fechou" com `[]` + limpeza: abrir o perfil, voltar,
olhar o terminal.

**Três formas de JS usadas no código:** `const [a, b] = ...` (a é o
primeiro item, b o segundo), `() => { ... }` (função sem nome) e
`onPress={aumentarNota}` (sem parênteses: o botão chama).

Regra de ouro: *estado é o que muda com o tempo e aparece na tela;
efeito é o que acontece depois que a tela desenhou.*