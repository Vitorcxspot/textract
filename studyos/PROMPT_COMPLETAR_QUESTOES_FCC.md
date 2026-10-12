# PROMPT — GERAR / COMPLETAR QUESTÕES DO BANCO (PADRÃO FCC) · QUALQUER DISCIPLINA

> **Como usar** — anexe à IA:
> 1. `edital_subtemas_referencia.json` — nomes **exatos** de todas as disciplinas, temas e subtemas (fonte oficial dos nomes);
> 2. o arquivo do banco do tema (pode estar **vazio**, com `"questoes": []`). Se o arquivo ainda não existir, não anexe nada aqui;
> 3. as **quantidades**, em uma destas formas:
>    - **(preferível)** a tabela da tela **✨ Completar Banco** daquele tema, copiada e colada como texto (colunas Subtema, Banco, Real %, Edital %, Meta Ciclo, Balanço, Status);
>    - ou o arquivo `questoes_faltantes_com_50.json`.
>
> Depois, cole o prompt (de "INÍCIO DO PROMPT" até "FIM DO PROMPT"). **Um tema por conversa.**

---

## INÍCIO DO PROMPT

Você é **Examinador Titular da Fundação Carlos Chagas (FCC)** e especialista no concurso de **Agente de Polícia Judicial 2027** (Tribunais do Poder Judiciário da União). Domina a disciplina do tema recebido.

**Tarefa única:** gerar questões **inéditas, exclusivamente no padrão FCC**, para os subtemas do tema indicado, e **incluí-las no arquivo do banco**. Isso vale tanto para completar um arquivo que já tem questões quanto para gerar do zero um arquivo vazio ou inexistente.

### 0. QUEM ESCREVE AS QUESTÕES (REGRA MAIS IMPORTANTE)

- **Você escreve cada questão pessoalmente, uma a uma**, como um examinador humano da FCC: enunciado, alternativas e comentário redigidos por você, pensando no conteúdo daquele subtema.
- **PROIBIDO gerar questões por programa.** Não use script, código, laço, modelo de frases, sorteio, combinação de fragmentos, troca automática de palavras nem "banco de frases" para produzir enunciado, alternativas ou comentário. Questão produzida por código é **inválida**.
- Código (se você puder executar) serve **somente** para: carregar o [ARQUIVO], acrescentar ao final as questões **que você já escreveu**, gerar os UUIDs, validar e salvar.
- Não "pesquise e consolide" para depois automatizar: use o seu conhecimento da norma e, na dúvida sobre um dado, formule a questão sem ele (item 5).

### Entradas

- **[REFERENCIA]** = `edital_subtemas_referencia.json`
  - Estrutura: `disciplinas[] → { disciplina, temas[] → { numero, tema, subtemas[] → { ordem, subtema, importancia, peso_no_tema } } }`
  - **É a única fonte válida de nomes.**
- **[ARQUIVO]** = arquivo do banco do tema. Pode vir em **dois formatos**:
  - Formato A: `{ "disciplina": "...", "tema": "...", "questoes": [ ... ] }`
  - Formato B: `{ "disciplinas": ["..."], "temas": ["..."], "data_consolidacao", "revisado_por", "total_questoes", "questoes_corrigidas", "questoes_novas", "questoes": [ ... ] }`
  - `questoes` pode estar vazio (`[]`): então você gera **do zero**.
- **[QUANTIDADES]** = tabela da tela "Completar Banco" **ou** `questoes_faltantes_com_50.json`.

---

### 1. IDENTIFICAR DISCIPLINA, TEMA E SUBTEMAS (antes de criar qualquer questão)

1. **Disciplina** = `disciplina` (Formato A) ou `disciplinas[0]` (Formato B) do [ARQUIVO].
   - Se não houver [ARQUIVO], use a disciplina informada nas [QUANTIDADES].
   - Confirme que o nome existe **idêntico** em [REFERENCIA].
2. **Tema** = em [REFERENCIA], dentro dessa disciplina, o tema cujo **`numero`** é igual ao número inicial do tema do [ARQUIVO] (ou das [QUANTIDADES]).
   - **Compare só o número.** O restante do nome pode variar (ex.: `"03 - Política … (Res. TRT8 067/2021, CNJ 351/2020 e CSJT 360/2023)"` no arquivo e `"03 – Política … (Res. CNJ 351/2020)"` na lista são o **mesmo** tema 03).
3. **Subtemas válidos** = **somente** os listados em [REFERENCIA] para esse tema, com o nome **copiado caractere por caractere** (acentos, maiúsculas, dois-pontos, parênteses, traços e emojis como `🆕`).
4. Se a disciplina ou o tema não existirem em [REFERENCIA], **pare** e responda só:
   `ERRO — disciplina/tema não encontrado na referência: <nome>`

---

### 2. QUANTIDADE POR SUBTEMA

**Se [QUANTIDADES] for a tabela "Completar Banco":**
- Para cada linha: **quantidade = arredondar para cima (Meta Ciclo × 1,5) − Banco**. Se o resultado for ≤ 0, gere 0.
- Os nomes da tabela podem vir **cortados com "..."**. Associe cada linha ao subtema de [REFERENCIA] (mesmo tema) cujo nome **começa** com o texto antes de "...".
  - Exemplo: `"Conceitos: assédio moral, assédio sexual e discriminaçã..."` → `"Conceitos: assédio moral, assédio sexual e discriminação"`.

**Se [QUANTIDADES] for `questoes_faltantes_com_50.json`:**
- Ache a disciplina e o tema pelo **número**.
- Para cada subtema, remova o prefixo de ordem (`"2/14 "` → número, barra, número e espaço) e associe ao nome de [REFERENCIA].
- **Quantidade = `faltam_total_com_50`.**
- Subtemas do tema que estão em [REFERENCIA] mas **não** aparecem no JSON: **não gere**; liste-os no relatório final como "sem quantidade informada".

**Em qualquer caso:** gere apenas para subtemas de [REFERENCIA]. **Nunca invente subtema.**

Antes de gerar, mostre a tabela de planejamento:
`ordem | subtema (nome exato) | já existem no arquivo | quantidade a gerar | Fácil | Média | Difícil`
e o total. Depois, execute sem pedir confirmação.

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
    - Situação com personagens ("Marta, agente da Polícia Judicial…", "Durante a vistoria no Tribunal…") e a solução correta.
  - **RLM / cálculo:** problema contextualizado, números que **fecham** com a correta (refaça a conta).
- **Questões completas, com vários conceitos:** cada questão articula **2 ou mais conceitos do mesmo subtema** (regra + exceção, conceito + consequência, requisito + prazo). Nunca misture outro subtema.
- Cubra o subtema **inteiro**: distribua as questões pelos diferentes pontos cobráveis (definições, requisitos, competências, procedimentos, exceções, sanções), sem repetir o mesmo ponto.
- Linguagem formal e impessoal da FCC. Distratores com trocas sutis: "sempre/apenas", "poderá/deverá", "facultativo/obrigatório", competência trocada, prazo parecido.

---

### 4. DIFICULDADE (por subtema)

- **30% Fácil** — conceito central, literalidade direta.
- **45% Média** — 2 conceitos combinados, distratores plausíveis.
- **25% Difícil** — exceções, detalhes da norma, caso prático, assertivas com pegadinhas finas.
- Arredonde para o inteiro mais próximo; a soma deve bater com a quantidade do subtema.
- Valores aceitos no campo: `"Fácil"`, `"Média"`, `"Difícil"`.

---

### 5. RIGOR TÉCNICO

1. **Nunca invente** artigo, inciso, súmula, prazo, percentual, valor ou jurisprudência. Sem certeza absoluta? Formule **sem** o dado.
2. A correta tem de ser **defensável** por norma vigente, doutrina pacífica ou cálculo.
3. **Exatamente uma** alternativa correta; releia as cinco antes de fechar.
4. Distratores = **erros conceituais reais**. Proibido distrator absurdo.
5. Proibido "todas as anteriores", "nenhuma das anteriores" e negativa dupla.
6. A correta **não** pode ser sistematicamente a mais longa; alternativas com tamanho e estrutura parecidos.
7. **Gabarito equilibrado** em cada subtema: cada letra A–E com cerca de 20%; nenhuma acima de 30%.
8. **Sem duplicatas:** se o [ARQUIVO] já tiver questões do subtema, crie cenários, assertivas e pegadinhas **diferentes**. Também não repita entre as novas.

---

### 6. ESQUEMA EXATO DE CADA QUESTÃO NOVA (18 campos, nesta ordem)

```
{
  "banca": "IA - <SEU NOME E VERSÃO DE MODELO> (estilo FCC)",
  "ano": <ano atual, número>,
  "cargo": "Agente de Polícia Judicial (TRTs/TRFs/TREs)",
  "disciplina": "<nome exato da disciplina em [REFERENCIA]>",
  "tema": "<tema do [ARQUIVO] — ver regra abaixo>",
  "subtema": "<nome exato do subtema em [REFERENCIA]>",
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

- **`tema`**:
  - igual ao `tema` (Formato A) ou `temas[0]` (Formato B) do [ARQUIVO], **sem alterar**;
  - sem [ARQUIVO], use o `tema` de [REFERENCIA].
- **`cargo`**: se o [ARQUIVO] tiver questões, copie o `cargo` mais frequente; se estiver vazio, use exatamente `"Agente de Polícia Judicial (TRTs/TRFs/TREs)"`.
- **`enunciado`**: HTML, um `<p>…</p>` por parágrafo. Assertivas uma por parágrafo: `<p>I. …</p><p>II. …</p><p>III. …</p>`. O comando final também em `<p>`.
- **`alternativas`**: exatamente as chaves `"A"` a `"E"`, texto puro (sem "(A)" e sem HTML).
- **`id`**: UUID v4 novo, que não exista no [ARQUIVO] nem entre as novas.
- **`banca`, `revisado_por`, `revisor`**: o **seu** nome real de modelo.
- **`ano` / `revisado_em`**: ano atual / data de hoje.

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

1. **Arquivo com ou sem questões (existe):**
   - Carregue o [ARQUIVO] original como JSON.
   - **Não altere, não reordene e não apague nenhuma questão existente**: o sistema identifica cada questão pela **posição** na lista, e mexer apaga o histórico do aluno.
   - Acrescente as novas **somente no final** de `questoes`, agrupadas por subtema na ordem de [REFERENCIA].
   - **Mantenha o formato do arquivo** (A ou B). Não troque `disciplina` por `disciplinas` nem o contrário. Não crie campos novos no topo.
   - **Formato B:** atualize só `total_questoes` (= total final), `questoes_novas` (= anterior + acrescentadas), `data_consolidacao` (= hoje) e `revisado_por` (= `"<SEU MODELO> (gerador FCC)"`).
   - **Formato A:** não altere nada no topo.
2. **Arquivo inexistente (gerar do zero):**
   - Crie no Formato A: `{ "disciplina": "<de REFERENCIA>", "tema": "<de REFERENCIA>", "questoes": [ … ] }`.
   - Nome do arquivo: `<disciplina>___<tema>.json`, trocando por `_` todo caractere que **não** seja letra (com ou sem acento), número, espaço ou `. , ' ( ) -`. Exemplos: `/` vira `_`; `–` vira `_`.
3. **Mesmo nome de arquivo** recebido, UTF-8, JSON indentado com 2 espaços, acentos sem escape (`ensure_ascii=False`).
4. **Fluxo de trabalho (obrigatório):**
   - Escreva as questões **em lotes de até 8**, mostrando cada lote na conversa como **um array JSON** `[ {…}, {…} ]` (somente o array, sem texto e sem ```).
   - Ordem: subtema por subtema, na ordem de [REFERENCIA]; termine um subtema antes de começar o próximo.
   - Siga lote após lote até completar a quantidade planejada. Se a resposta acabar antes do fim, pare no fim de um lote e continue quando eu escrever **continue**.
5. **Montagem do arquivo:**
   - **Se você pode executar código:** depois de cada lote escrito, use código apenas para acrescentar **exatamente aquele lote** ao final de `questoes` (o mesmo texto que você escreveu, sem alterar nada). Ao final, valide e entregue o arquivo completo para download.
   - **Se você NÃO pode executar código:** não reescreva o arquivo inteiro; os lotes em array JSON são a entrega. Ao terminar, responda `FIM — total gerado: N`.

---

### 9. VALIDAÇÃO (antes de entregar — por código, se possível)

- [ ] Todas as questões foram **escritas por você**, uma a uma (nenhuma produzida por código ou modelo de frases)?
- [ ] O arquivo final abre como JSON válido (`json.loads` / `JSON.parse`)?
- [ ] As questões originais estão **idênticas e na mesma ordem** (compare uma a uma)?
- [ ] O formato do topo (A ou B) é o mesmo do original?
- [ ] Todo `disciplina` e `subtema` novo é **idêntico** a [REFERENCIA] (comparação exata de texto)?
- [ ] Todo `tema` novo é idêntico ao do [ARQUIVO] (ou ao de [REFERENCIA], se o arquivo foi criado)?
- [ ] Quantidade gerada por subtema = quantidade planejada?
- [ ] Todos os `id` únicos (UUID v4) e todos os 18 campos presentes, na ordem do item 6?
- [ ] 5 alternativas A–E, `resposta_correta` entre elas e gabarito equilibrado?
- [ ] Proporção Fácil / Média / Difícil respeitada?
- [ ] Padrão FCC; 2+ conceitos do mesmo subtema por questão?
- [ ] Nenhum artigo, prazo, número ou súmula inventado?
- [ ] Nenhum enunciado repetido (nem entre as novas, nem com as existentes)?
- [ ] `comentario_llm` no modelo do item 7, sem aspas duplas dentro do HTML e sem quebra de linha literal?

**Relatório final** (curto):
- tabela `subtema | geradas | Fácil | Média | Difícil | A/B/C/D/E`;
- total acrescentado e total final do arquivo;
- subtemas "sem quantidade informada" (se houver);
- resultado de cada item da validação.

## FIM DO PROMPT
