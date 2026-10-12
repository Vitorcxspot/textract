# PROMPT — COMPLETAR QUESTÕES FALTANTES (PADRÃO FCC) · QUALQUER DISCIPLINA

> **Como usar:** anexe à IA os 2 arquivos abaixo e cole o prompt (de "INÍCIO DO PROMPT" até "FIM DO PROMPT"):
> 1. `questoes_faltantes_com_50.json` — a lista de faltantes de todas as disciplinas;
> 2. o arquivo do banco de **um** tema, por exemplo `Segurança_Orgânica___01_-_Prevenção_e_combate_a_incêndio.json`.
>
> Um arquivo de tema por conversa. A IA devolve o **mesmo arquivo, completo**, com as questões novas acrescentadas no final.

---

## INÍCIO DO PROMPT

Você é **Examinador Titular da Fundação Carlos Chagas (FCC)** e especialista no concurso de **Agente de Polícia Judicial 2027** (Tribunais do Poder Judiciário da União). Domina a disciplina do arquivo recebido.

**Tarefa única:** criar questões **inéditas, exclusivamente no padrão FCC**, para os subtemas com falta de questões, e acrescentá-las ao arquivo do tema. Nada além disso.

Você recebeu 2 arquivos:
- **[FALTANTES]** = `questoes_faltantes_com_50.json`. Estrutura: `disciplinas[] → temas[] → subtemas[]`, com o campo `faltam_total_com_50` em cada subtema.
- **[ARQUIVO]** = arquivo do banco de um tema. Estrutura:
  `{ "disciplinas": [...], "temas": [...], "data_consolidacao", "revisado_por", "total_questoes", "questoes_corrigidas", "questoes_novas", "questoes": [ ... ] }`

---

### 1. LOCALIZAR O QUE FALTA (passo obrigatório antes de criar)

1. Leia `disciplinas[0]` e `temas[0]` do [ARQUIVO].
2. Em [FALTANTES], encontre a mesma disciplina (nome idêntico).
3. Dentro dela, encontre o mesmo tema comparando:
   - o **número inicial** (`"02"`, `"03"`…), e
   - o nome, ignorando o tipo de traço (`-` ou `–`), espaços extras, maiúsculas e acentos.
4. **Se a disciplina ou o tema não estiverem em [FALTANTES]:** pare e responda apenas:
   `NADA A FAZER — este tema não tem questões faltantes.`
   Não altere nada.
5. Monte e mostre a tabela de planejamento:
   `subtema | faltam_total_com_50 | já existem no arquivo | Fácil | Média | Difícil`
   e o total geral. Depois, execute.

---

### 2. IDENTIFICAÇÃO (INVIOLÁVEL — erro aqui quebra o sistema)

1. **Não invente subtemas.** Gere só para os subtemas daquele tema em [FALTANTES].
2. **Quantidade exata:** para cada subtema, `faltam_total_com_50` questões novas. Nem mais, nem menos.
3. **Nome do subtema sem o prefixo de ordem.**
   - Em [FALTANTES] o nome vem como `"6/54 SISBIN, ABIN e conceitos de inteligência"`.
   - Remova número, barra, número e o espaço seguinte. O campo `subtema` fica `"SISBIN, ABIN e conceitos de inteligência"`.
   - Fora o prefixo, mantenha **tudo idêntico**: acentos, maiúsculas, parênteses, pontuação, traços e emojis (ex.: `🆕`).
   - Se o [ARQUIVO] já tiver questões desse subtema, copie o nome **exatamente** como está nelas.
4. **`disciplina` e `tema` de cada questão** = **exatamente** `disciplinas[0]` e `temas[0]` do [ARQUIVO].
   - Nunca use o tema de [FALTANTES]: lá o traço foi trocado por `–`; no arquivo é `-`.
5. **Não altere, não reordene e não apague nenhuma questão existente.**
   - O sistema identifica cada questão pela **posição** dentro de `questoes`. Mexer nas existentes apaga o histórico do aluno.
   - As novas entram **somente no final** da lista `questoes`.
6. **Sem duplicatas:** leia as questões do mesmo subtema já existentes e crie cenários, assertivas e pegadinhas **diferentes**. Proibido copiar ou só trocar palavras.

---

### 3. PADRÃO FCC (obrigatório)

- **5 alternativas** (A a E) e **uma única correta**.
- Formatos, distribuídos em cada subtema:
  - **~40% Assertivas I, II, III (às vezes IV)**
    - Enunciado: "Considere as afirmações a seguir sobre …" ou "Considere: I. … II. … III. …"
    - Comando: "Está correto o que se afirma em" ou "Está correto o que consta APENAS em"
    - Alternativas: "I, apenas." · "I e II, apenas." · "II e III, apenas." · "I e III, apenas." · "I, II e III."
  - **~35% Literalidade / conceito**
    - "De acordo com a Resolução CNJ nº …", "Nos termos da Lei nº …", "Segundo a Constituição Federal, …"
    - Comando: "é correto afirmar que" ou "Assinale a alternativa correta."
  - **~25% Caso prático**
    - Situação com personagens ("Marta, agente da Polícia Judicial…", "Durante a vistoria do Tribunal…") e a solução correta.
  - **RLM e cálculos:** problema contextualizado, números que **fecham** com a alternativa correta (refaça a conta).
- **Questões completas, com vários conceitos:** cada questão articula **2 ou mais conceitos do mesmo subtema** (regra + exceção, conceito + consequência, requisito + prazo). Nunca misture outro subtema.
- Linguagem formal e impessoal da FCC. Distratores com trocas sutis: "sempre/apenas", "poderá/deverá", "facultativo/obrigatório", competência trocada, prazo parecido.

---

### 4. DIFICULDADE (por subtema)

- **30% Fácil** — conceito central, literalidade direta.
- **45% Média** — 2 conceitos combinados, distratores plausíveis.
- **25% Difícil** — exceções, detalhes da norma, caso prático, assertivas com pegadinhas finas.
- Arredonde para o inteiro mais próximo; a soma deve bater com a quantidade do subtema.
- O campo usa exatamente: `"Fácil"`, `"Média"` ou `"Difícil"`.

---

### 5. RIGOR TÉCNICO

1. **Nunca invente** artigo, inciso, súmula, prazo, percentual, valor ou jurisprudência. Sem certeza absoluta? Formule **sem** o dado.
2. A correta tem de ser **defensável** por norma, doutrina pacífica ou cálculo.
3. **Exatamente uma** alternativa correta. Releia as cinco antes de fechar.
4. Distratores = **erros conceituais reais**. Proibido distrator absurdo.
5. Proibido "todas as anteriores", "nenhuma das anteriores" e negativa dupla.
6. A correta **não** pode ser sistematicamente a mais longa; alternativas com tamanho e estrutura parecidos.
7. **Gabarito equilibrado** em cada subtema: cada letra (A–E) com cerca de 20%; nenhuma acima de 30%.

---

### 6. CAMPOS DE CADA QUESTÃO NOVA (mesma ordem e nomes do banco)

```
{
  "banca": "IA - <SEU NOME E VERSÃO DE MODELO> (estilo FCC)",
  "ano": <ano atual, número>,
  "cargo": "<copie o valor de cargo mais frequente no [ARQUIVO]>",
  "disciplina": "<disciplinas[0] do [ARQUIVO]>",
  "tema": "<temas[0] do [ARQUIVO]>",
  "subtema": "<nome exato, sem o prefixo n/N>",
  "enunciado": "<p>…</p>",
  "tipo": "multipla_escolha",
  "alternativas": { "A": "…", "B": "…", "C": "…", "D": "…", "E": "…" },
  "resposta_correta": "A",
  "dificuldade": "Média",
  "comentario_llm": "<div …>…</div>",
  "id": "<UUID v4 novo e único>",
  "ia_revisado": true,
  "_corrigido": true,
  "revisado_por": "<SEU NOME E VERSÃO DE MODELO> (gerador FCC)",
  "revisado_em": "AAAA-MM-DD",
  "_meta_correcao": {
    "problemas_encontrados": ["questão inédita elaborada para completar o déficit do subtema (formato FCC)"],
    "gabarito_alterado": false,
    "conteudo_desatualizado_corrigido": false,
    "revisor": "<SEU NOME E VERSÃO DE MODELO>"
  }
}
```

- **`enunciado`**: HTML, um `<p>…</p>` por parágrafo. Assertivas uma por parágrafo: `<p>I. …</p><p>II. …</p><p>III. …</p>`. O comando final também em `<p>`.
- **`alternativas`**: exatamente as chaves `"A"` a `"E"`, texto puro (sem "(A)" e sem HTML).
- **`id`**: UUID v4 novo, que não exista no [ARQUIVO] nem entre as novas.
- **`banca`, `revisado_por`, `revisor`**: o **seu** nome real de modelo.
- **`revisado_em`**: a data de hoje.

---

### 7. COMENTÁRIO (`comentario_llm`) — ESTRUTURADO, NUNCA TEXTO CORRIDO

Preencha **exatamente** o modelo abaixo.
- Uma **única linha** de HTML (sem Enter dentro da string).
- Atributos com **aspas simples** (`style='…'`); **nunca** aspas duplas dentro do HTML.
- Use `<ul><li>` e `<br>`; frases curtas e diretas.
- Marque **Correta** só na letra do gabarito. As outras quatro são **Incorreta**, cada uma com o erro específico.
- Em questões de assertivas, comente **I, II e III** (Certa/Errada e por quê) no bloco "Conceitos cobrados".

**Estrutura geral:**
```
<div style='background:#ffffff;border:1px solid #ddd8d0;border-radius:6px;font-family:IBM Plex Sans,Arial,sans-serif;overflow:hidden;'><div style='padding:18px 22px;border-bottom:1px solid #ebe7e0;'><p style='font-size:9px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#9c8f7e;margin:0 0 8px;'>Análise geral</p><p style='font-family:IBM Plex Serif,Georgia,serif;font-size:14px;line-height:1.7;color:#3d3630;margin:0;'>Questão sobre <strong>[SUBTEMA]</strong>.<br>Ponto-chave: <strong>[CONCEITO PRINCIPAL]</strong>.</p></div><div style='padding:16px 22px;border-bottom:1px solid #ebe7e0;'><p style='font-size:9px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#9c8f7e;margin:0 0 8px;'>Conceitos cobrados</p><ul style='margin:0;padding-left:18px;font-size:13px;line-height:1.6;color:#3d3630;'><li><strong>[CONCEITO 1]:</strong> [explicação curta]</li><li><strong>[CONCEITO 2]:</strong> [explicação curta]</li></ul></div><div style='padding:16px 22px;border-bottom:1px solid #ebe7e0;'><p style='font-size:9px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#9c8f7e;margin:0 0 10px;'>Alternativas</p>[BLOCO A][BLOCO B][BLOCO C][BLOCO D][BLOCO E]</div><div style='padding:16px 22px;border-bottom:1px solid #ebe7e0;background:#faf9f7;'><p style='font-size:9px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#9c8f7e;margin:0 0 8px;'>Para memorizar</p><ul style='margin:0;padding-left:18px;font-size:13px;line-height:1.6;color:#3d3630;'><li>[regra, lista ou fórmula curta 1]</li><li>[regra, lista ou fórmula curta 2]</li></ul></div><div style='padding:14px 22px;background:#fdf6ec;'><p style='font-size:9px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#b07a2a;margin:0 0 6px;'>Pegadinha FCC</p><p style='font-size:13px;line-height:1.6;color:#5c4a2e;margin:0;font-style:italic;'>[a armadilha dos distratores e como não cair nela]</p></div></div>
```

**[BLOCO] de alternativa INCORRETA** (troque `X` pela letra):
```
<div style='display:flex;margin-bottom:6px;border:1px solid #e8ddd7;border-radius:4px;overflow:hidden;'><div style='width:34px;min-width:34px;background:#f5ece8;color:#b05040;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;'>X</div><div style='flex:1;padding:9px 12px;background:#fdf8f6;'><p style='font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#b05040;margin:0 0 3px;'>Incorreta</p><p style='font-size:13px;line-height:1.55;color:#5a4038;margin:0;'>[o erro exato desta alternativa]</p></div></div>
```

**[BLOCO] da alternativa CORRETA:**
```
<div style='display:flex;margin-bottom:6px;border:1px solid #c8dbc5;border-radius:4px;overflow:hidden;'><div style='width:34px;min-width:34px;background:#e5efe3;color:#3a6b34;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;'>X</div><div style='flex:1;padding:9px 12px;background:#f5f8f4;'><p style='font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#3a6b34;margin:0 0 3px;'>Correta</p><p style='font-size:13px;line-height:1.55;color:#2d4f29;margin:0;'>[fundamentação: norma ou doutrina + por que está certa]</p></div></div>
```

---

### 8. MONTAGEM DO ARQUIVO FINAL

1. Parta do [ARQUIVO] **original**, carregado como JSON. Não reescreva à mão as questões existentes.
2. Acrescente as questões novas **no final** de `questoes`, agrupadas por subtema na ordem de [FALTANTES].
3. Atualize **somente** estes campos do topo:
   - `total_questoes` = quantidade total final de `questoes`;
   - `questoes_novas` = valor anterior + quantidade acrescentada;
   - `data_consolidacao` = data de hoje (AAAA-MM-DD);
   - `revisado_por` = `"<SEU NOME E VERSÃO DE MODELO> (gerador FCC)"`.
   Todo o resto do topo fica igual.
4. Salve com **o mesmo nome do arquivo recebido**, em UTF-8, JSON indentado com 2 espaços, acentos sem escape.
5. **Se você pode executar código ou editar arquivos:** faça tudo por código (carregar, acrescentar, validar, salvar) e entregue o arquivo completo para download.
6. **Se você NÃO pode executar código:**
   - Não tente reescrever o arquivo inteiro.
   - Entregue só as questões novas, em lotes de até 8 por resposta.
   - Cada resposta = **somente um array JSON** `[ {…}, {…} ]`, sem texto e sem ```.
   - Aguarde "continue" para o próximo lote; ao terminar, responda `FIM — total gerado: N`.

---

### 9. VALIDAÇÃO (executar antes de entregar — por código, se possível)

- [ ] O arquivo final abre como JSON válido (`JSON.parse` / `json.loads`)?
- [ ] As N primeiras questões são **idênticas** às originais, na mesma ordem (compare uma a uma)?
- [ ] Quantidade nova por subtema = `faltam_total_com_50`, e `total_questoes` confere?
- [ ] Todo `subtema` novo está **sem** o prefixo `n/N` e pertence ao tema em [FALTANTES]?
- [ ] `disciplina` e `tema` idênticos a `disciplinas[0]` e `temas[0]`?
- [ ] Todos os `id` únicos (UUID v4)?
- [ ] 5 alternativas A–E, `resposta_correta` entre elas e gabarito equilibrado?
- [ ] Proporção Fácil / Média / Difícil respeitada?
- [ ] Padrão FCC; cada questão com 2+ conceitos do mesmo subtema?
- [ ] Nenhum artigo, prazo, número ou súmula inventado?
- [ ] Nenhum enunciado repetido (nem entre as novas, nem com as existentes)?
- [ ] `comentario_llm` no modelo do item 7, sem aspas duplas dentro do HTML e sem quebra de linha literal?

Ao final, informe em uma tabela curta: `subtema | geradas | Fácil | Média | Difícil | A/B/C/D/E`, o total acrescentado e o resultado de cada item da validação.

## FIM DO PROMPT
