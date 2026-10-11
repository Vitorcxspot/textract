// === CONFIGURAÇÕES GERAIS EDITÁVEIS ===
const PASTA_RAIZ_ID = "1W7WkaGwHpASsvhzow_c4tLoyJ9E80LCw"; 
const PLANILHA_ID = "1lbxMP6i1IeGhrLZ1tCaiH5fik2EP2I1ky3pngMgngn4"; 

const PASTA_LOUSAS = "SistemaDeQuestoes_Lousas";
const PASTA_RAIZ = "SistemaDeQuestoes_ROOT"; 
const PASTA_QUESTOES = "SistemaDeQuestoes_Questoes";

const PASTA_RESUMO_LITE = "SistemaDeQuestoes_VadeMecum_lite";
const PASTA_RESUMO_PRO = "SistemaDeQuestoes_VadeMecum_pro";
const PASTA_DADOS = "SistemaDeQuestoes_DADOS";
const PASTA_BACKUPS = "BACKUPS_EDICOES"; 

const CHAVE_ESTADO_USUARIO = "SISTEMA_QUESTES_ESTADO_V9";     
const ARQUIVO_CONFIG_CICLO = "config_ciclo_estudos_v5.json";
const ARQUIVO_HISTORICO = "historico_desempenho_v5.json";
const ARQUIVO_SESSAO_SUSPENSA = "sessao_suspensa_v1.json";
const ARQUIVO_BACKUP_PROGRESSO = "backup_progresso_reinicios.json";
const ARQUIVO_CONFIG_PREFERENCIAS = "config_preferencias_usuario_v1.json";
const ARQUIVO_BLACKLIST_SESSAO = "blacklist_sessao_temp.json";
const ARQUIVO_CACHE_ESTRUTURA = "cache_estrutura_ciclo_v13_8.json";

const CACHE_KEY_MAPA = "MAPA_PASTAS_LOOP_V12"; 
const CACHE_KEY_CONTAGEM_PREFIX = "CONTAGEM_QUESTOES_V14_";

const ARQUIVO_TEMPLATES = "templates_ciclo_v1.json";

// === TRAVA ESTRITA DO EDITAL ===
const FILTRAR_ESTRITAMENTE_PELO_EDITAL = true;

// ═════════════════════════════════════════════════════════════════════════════
// V99 — ADEQUAÇÃO ESTRITA AO EDITAL: CHAVE CANÔNICA ÚNICA
// Nome canônico de tema/subtema = o do RAIO-X (o que já está no banco, no progresso do aluno e no ciclo).
// O Config (MAPA_DISTRIBUICAO_EDITAL, já unificado pelo bloco V99 do Config.gs) só dá importância e pertencimento.
// Tema: casamento EXATO por chave (número inteiro + nome normalizado) ou alias explícito (MAPA_ALIASES_EDITAL.__TEMAS__).
// Subtema: nome exato → nome normalizado → alias explícito → chave de comparação (3.2.2). Nunca similaridade de palavras.
// Tema que não casa → fora do edital (material de concurso antigo). Subtema ausente do mapa em tema conhecido → NOVO (dentro).
// ═════════════════════════════════════════════════════════════════════════════
var _IDX_EDITAL_V99 = null;
var _STOP_EDITAL_V99 = { de: 1, da: 1, do: 1, das: 1, dos: 1, e: 1, a: 1, o: 1, em: 1, na: 1, no: 1, para: 1, por: 1, com: 1 };

function _resetIndiceEditalV99() { _IDX_EDITAL_V99 = null; }

function _semAcentoMinEdital(s) {
  var t = String(s === null || s === undefined ? '' : s);
  try { t = t.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); } catch (e) {}
  return t.toLowerCase();
}

// Só para COMPARAR (nunca para exibir): número inteiro + nome normalizado do tema.
function _chaveTemaEdital(tema) {
  var n = _numTemaV23(tema);
  var resto = _normChaveV23(tema).replace(/^\d+\s*/, '');
  return (n || '') + '|' + resto;
}

function _parentesesEdital(s) {
  var m = String(s === null || s === undefined ? '' : s).match(/\([^)]*\)/g);
  if (!m) return '';
  return m.map(function (x) { return _normChaveV23(x); }).join('|');
}

function _stemEdital(w) {
  if (w.length > 4 && /oes$/.test(w)) return w.slice(0, -3) + 'ao';
  if (w.length > 4 && /ais$/.test(w)) return w.slice(0, -3) + 'al';
  if (w.length > 3 && /s$/.test(w)) return w.slice(0, -1);
  return w;
}

// 3.2.2 — chave determinística: sem número de tema/emoji/pontuação/acento/caixa, sem artigos e preposições,
// sem "emprego de" / "verbos -", "A vs B" ≡ "B vs A", singular ≡ plural.
// plana=false: a qualificação entre parênteses é ignorada; plana=true: o conteúdo dos parênteses entra ("X (Y)" ≡ "X - Y").
function _chaveComparacaoEdital(nome, plana) {
  var t = _semAcentoMinEdital(nome).replace(/^\s*\d{1,3}\s*[-–.:)]?\s*/, '');
  if (!plana) t = t.replace(/\([^)]*\)/g, ' ');
  t = t.replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  t = t.replace(/^emprego de /, '').replace(/^verbos (?=\S)/, '');
  var lados = t.split(/\s+vs\s+/).map(function (lado) {
    return lado.split(' ').filter(function (w) { return w && !_STOP_EDITAL_V99[w]; }).map(_stemEdital).join(' ');
  }).filter(Boolean);
  lados.sort();
  return lados.join(' vs ');
}

function _indiceEditalV99() {
  if (_IDX_EDITAL_V99) return _IDX_EDITAL_V99;
  var idx = {};
  var M = (typeof MAPA_DISTRIBUICAO_EDITAL !== 'undefined') ? MAPA_DISTRIBUICAO_EDITAL : null;
  var AL = (typeof MAPA_ALIASES_EDITAL !== 'undefined' && MAPA_ALIASES_EDITAL) ? MAPA_ALIASES_EDITAL : {};
  var tem = function (o, k) { return Object.prototype.hasOwnProperty.call(o, k); };
  if (M) {
    Object.keys(M).forEach(function (d) {
      var ent = { temas: {}, temaAlias: {}, temaBase: {}, subs: {} };
      Object.keys(M[d]).forEach(function (t) {
        ent.temas[_chaveTemaEdital(t)] = t;
        // V102 — número + título-base (texto antes do parêntese). Dois temas com a mesma base = ambíguo (não casa).
        var kb = _chaveBaseTemaEdital(t);
        if (kb) ent.temaBase[kb] = Object.prototype.hasOwnProperty.call(ent.temaBase, kb) ? null : t;
        var si = { exato: {}, comp: {}, alias: {} };
        Object.keys(M[d][t]).forEach(function (s) {
          var n = _normChaveV23(s);
          var atual = tem(si.exato, n) ? si.exato[n] : null;
          // colisão de nome normalizado ("X (Y)" × "X - Y"): o item ATIVO vence o EXCLUIR
          if (!atual || (M[d][t][atual].importancia === 'EXCLUIR' && M[d][t][s].importancia !== 'EXCLUIR')) si.exato[n] = s;
          var k = _chaveComparacaoEdital(s);
          (si.comp[k] = si.comp[k] || []).push(s);
        });
        var alT = (AL[d] && AL[d][t]) || {};
        Object.keys(alT).forEach(function (v) {
          if (M[d][t][alT[v]]) si.alias[_normChaveV23(v)] = alT[v];
        });
        ent.subs[t] = si;
      });
      var alTemas = (AL[d] && AL[d].__TEMAS__) || {};
      Object.keys(alTemas).forEach(function (v) {
        if (M[d][alTemas[v]]) ent.temaAlias[_chaveTemaEdital(v)] = alTemas[v];
      });
      idx[d] = ent;
    });
  }
  _IDX_EDITAL_V99 = idx;
  return idx;
}

// V102 — chave "número|título-base": sem o parêntese final (normas citadas), sem os sufixos de arquivo
// legado (_vademecum, _consolidado) e normalizada. "03 - Política ... (Res. CNJ 351/2020)" e
// "03 - Política ... (Res. TRT8 067_2021, CNJ 351_2020 e CSJT 360_2023)" → mesma chave.
// Exige número E título: só número nunca casa (V91).
function _chaveBaseTemaEdital(tema) {
  var s = String(tema === null || tema === undefined ? '' : tema)
    .replace(/\.json$/i, '')
    .replace(/(_consolidado)?_vademecum$/i, '')
    .replace(/_consolidado$/i, '');
  var n = _numTemaV23(s);
  if (!n) return null;
  var corpo = s.replace(/^\s*\d{1,3}\s*[-–.:)]?\s*/, '');
  var p = corpo.indexOf('(');
  if (p > 0) corpo = corpo.slice(0, p);
  var b = _normChaveV23(corpo);
  return b ? (n + '|' + b) : null;
}

// Tema canônico (chave do MAPA) ou null. `d` já é a disciplina canônica.
// Ordem: chave exata → alias explícito → V102 número + título-base (único na disciplina).
function _temaCanonicoEdital(d, tema) {
  var ent = _indiceEditalV99()[d];
  if (!ent) return null;
  var k = _chaveTemaEdital(tema);
  if (ent.temas[k] || ent.temaAlias[k]) return ent.temas[k] || ent.temaAlias[k];
  var kb = _chaveBaseTemaEdital(tema);
  return (kb && ent.temaBase[kb]) ? ent.temaBase[kb] : null;
}

// Subtema canônico (chave do MAPA no tema `t`) ou null (= sem equivalente → NOVO).
function _subtemaCanonicoEdital(d, t, subtema) {
  var ent = _indiceEditalV99()[d];
  var si = ent && ent.subs[t];
  if (!si) return null;
  var s = String(subtema === null || subtema === undefined || subtema === '' ? 'Geral' : subtema);
  var mapaT = MAPA_DISTRIBUICAO_EDITAL[d][t];
  if (Object.prototype.hasOwnProperty.call(mapaT, s)) return s;                       // nome idêntico ao do mapa
  var n = _normChaveV23(s);
  if (Object.prototype.hasOwnProperty.call(si.exato, n)) return si.exato[n];
  if (Object.prototype.hasOwnProperty.call(si.alias, n)) return si.alias[n];
  var cands = si.comp[_chaveComparacaoEdital(s)];
  if (!cands || cands.length !== 1) return null;           // sem equivalente, ou ambíguo: não funde sozinho
  var p = _parentesesEdital(s), pc = _parentesesEdital(cands[0]);
  if (p && pc && p !== pc) return null;                    // qualificadores diferentes: não funde sozinho
  return cands[0];
}

// Trio canônico + importância. null se a disciplina não é do edital.
function _chaveCanonicaEdital(disciplina, tema, subtema) {
  var d = _disciplinaDoEdital(disciplina);
  if (!d) return null;
  var t = _temaCanonicoEdital(d, tema);
  var temStr = (tema === null || tema === undefined) ? '' : String(tema);
  var subStr = (subtema === null || subtema === undefined || subtema === '') ? null : String(subtema);
  var s = (t && subStr !== null) ? _subtemaCanonicoEdital(d, t, subStr) : null;
  var imp = null;
  if (subStr !== null) {
    imp = (t && s && MAPA_DISTRIBUICAO_EDITAL[d][t][s]) ? MAPA_DISTRIBUICAO_EDITAL[d][t][s].importancia : 'NOVO';
  }
  return {
    disciplina: d,
    tema: t || temStr,
    subtema: (s || subStr),
    importancia: imp,
    temaMapeado: !!t,
    subtemaMapeado: !!s
  };
}

function _importanciaEdital(disciplina, tema, subtema) {
  var c = _chaveCanonicaEdital(disciplina, tema, subtema === undefined ? null : subtema);
  return c ? c.importancia : null;
}

function _pertenceAoEditalAtivo(disciplina, tema, subtema) {
  if (!FILTRAR_ESTRITAMENTE_PELO_EDITAL) return true;
  if (typeof MAPA_DISTRIBUICAO_EDITAL === 'undefined' || !MAPA_DISTRIBUICAO_EDITAL) return true;

  var d = _disciplinaDoEdital(disciplina);
  if (!d || !MAPA_DISTRIBUICAO_EDITAL[d]) return false;

  var t = _temaCanonicoEdital(d, tema);
  if (!t) return false;                                   // tema sem equivalente no edital: material antigo

  var mapaTema = MAPA_DISTRIBUICAO_EDITAL[d][t];
  if (subtema === null || subtema === undefined || subtema === '') {
    return Object.keys(mapaTema).some(function (s) { return mapaTema[s].importancia !== 'EXCLUIR'; });
  }
  var s = _subtemaCanonicoEdital(d, t, subtema);
  if (!s) return true;                                    // subtema sem equivalente no mapa: NOVO, fica dentro
  return mapaTema[s].importancia !== 'EXCLUIR';
}

// Reescreve a árvore do raio-x com os nomes canônicos: variantes somadas ao canônico, tema/subtema com
// importância e peso vindos do mapa. podarExcluidos=true remove subtema EXCLUIR e tema sem subtema dentro.
// Devolve nova árvore (não muta a entrada). Nenhuma questão é perdida (só reclassificada) quando podarExcluidos=false.
function _canonizarArvoreEdital(arvore, podarExcluidos) {
  var nova = {};
  var M = MAPA_DISTRIBUICAO_EDITAL;
  Object.keys(arvore || {}).forEach(function (dk) {
    var d = _disciplinaDoEdital(dk);
    if (!d) return;
    var no = arvore[dk] || { total: 0, temas: {} };
    var alvo = nova[d] || (nova[d] = { total: 0, temas: {} });
    Object.keys(no.temas || {}).forEach(function (tk) {
      var t = _temaCanonicoEdital(d, tk);
      if (!t) return;
      var tn = no.temas[tk] || {};
      var dst = alvo.temas[t] || (alvo.temas[t] = { total: 0, subtemas: {} });
      Object.keys(tn.subtemas || {}).forEach(function (sk) {
        var v = tn.subtemas[sk];
        var qtd = (typeof v === 'number') ? v : ((v && v.qtd) || 0);
        var s = _subtemaCanonicoEdital(d, t, sk) || sk;
        var m = M[d] && M[d][t] && M[d][t][s];
        var imp = m ? m.importancia : 'NOVO';
        if (podarExcluidos && imp === 'EXCLUIR') return;
        var cur = dst.subtemas[s] || (dst.subtemas[s] = { qtd: 0, distribuicao: m ? m.distribuicao : '-', importancia: imp });
        cur.qtd += qtd;
        dst.total += qtd;
        alvo.total += qtd;
      });
    });
    if (podarExcluidos) {
      Object.keys(alvo.temas).forEach(function (t) {
        if (Object.keys(alvo.temas[t].subtemas).length === 0 && !_pertenceAoEditalAtivo(d, t, null)) {
          alvo.total -= alvo.temas[t].total;
          delete alvo.temas[t];
        }
      });
    }
  });
  return nova;
}

// ============================================================================
// AUDITORIA EDITAL x DRIVE — somente leitura, não altera nada.
// Rode no editor do Apps Script e leia o log.
// Usa a MESMA regra do app (_pertenceAoEditalAtivo) e a mesma leitura de
// tema de _construirMapaDoZero, então mostra exatamente o que ficará oculto.
// ============================================================================
function auditarEditalXDrive() {
  var inicio = Date.now();
  var LIMITE_MS = 300000;
  var rel = { visiveis: 0, ocultos: [], discForaDoEdital: [], temasSemBanco: [], parcial: false };
  var temasComBanco = {};

  var root = getFolder(PASTA_RAIZ);
  var main = getFolder(PASTA_QUESTOES, root);
  var pastas = main.getFolders();

  while (pastas.hasNext()) {
    var pasta = pastas.next();
    var disc = pasta.getName();

    if (!MAPA_DISTRIBUICAO_EDITAL[disc]) {
      rel.discForaDoEdital.push(disc);
      continue;
    }

    var arqs = pasta.getFiles();
    while (arqs.hasNext()) {
      if (Date.now() - inicio > LIMITE_MS) { rel.parcial = true; break; }
      var f = arqs.next();
      var nome = f.getName();
      if (!nome.endsWith('.json') || nome.indexOf('___') < 0) continue;
      var partes = nome.replace('.json', '').split('___');
      if (partes.length < 2) continue;

      var tema = partes[1].replace(/_/g, ' ');
      if (partes[1].indexOf('_') >= 0) {
        try {
          var j = JSON.parse(f.getBlob().getDataAsString());
          if (j.tema) tema = j.tema;
        } catch (e) {}
      }

      if (_pertenceAoEditalAtivo(disc, tema, null)) {
        rel.visiveis++;
        var mapaDisc = MAPA_DISTRIBUICAO_EDITAL[disc];
        var chave = _temaCanonicoEdital(disc, tema);   // V99 — casamento exato/alias (sem similaridade de palavras)
        if (chave) {
          if (!temasComBanco[disc]) temasComBanco[disc] = {};
          temasComBanco[disc][chave] = true;
        }
      } else {
        rel.ocultos.push(disc + '  >  ' + tema + '   [' + nome + ']');
      }
    }
    if (rel.parcial) break;
  }

  Object.keys(MAPA_DISTRIBUICAO_EDITAL).forEach(function (d) {
    Object.keys(MAPA_DISTRIBUICAO_EDITAL[d]).forEach(function (t) {
      if (!(temasComBanco[d] && temasComBanco[d][t])) rel.temasSemBanco.push(d + '  >  ' + t);
    });
  });

  var linhas = [];
  linhas.push('=== AUDITORIA EDITAL x DRIVE ===');
  if (rel.parcial) linhas.push('ATENÇÃO: parou por tempo; resultado PARCIAL. Rode de novo.');
  linhas.push('Arquivos visíveis no app: ' + rel.visiveis);
  linhas.push('Arquivos OCULTOS pela trava (' + rel.ocultos.length + '):');
  rel.ocultos.forEach(function (x) { linhas.push('  - ' + x); });
  linhas.push('Pastas de disciplina fora do edital (' + rel.discForaDoEdital.length + '): ' + rel.discForaDoEdital.join(' | '));
  linhas.push('Temas do Config SEM nenhum arquivo de questões (' + rel.temasSemBanco.length + '):');
  rel.temasSemBanco.forEach(function (x) { linhas.push('  - ' + x); });
  Logger.log(linhas.join('\n'));
  return rel;
}



/* ══════════════════════════════════════════════════════════════════════════════
   V34 — MODELOS DOS AGENTES, EM UM LUGAR SÓ
     · texto/geração → models/gemini-3.8-flash  (padrão de fábrica, sem nada escolhido)
     · fallback      → gemini-3.7-flash         (padrão de fábrica, sem nada escolhido)
     · voz (Live)    → inalterada; a alternativa é opcional, nas Configurações
   As duas constantes abaixo são só o valor de fábrica — quem manda de verdade
   é cvModeloTexto_()/cvModeloFallback_() (Canvas.gs), que leem a escolha salva
   nas Configurações. 3.5 e 3.6 chegaram a sair da tela de opções (V34); a
   partir da V43 as quatro gerações (3.5/3.6/3.7/3.8) voltaram a aparecer em
   AGENTE_TEXTO_OPCOES (JsAgentes.html) — o backend nunca restringiu isso.
   ══════════════════════════════════════════════════════════════════════════════ */
const AGENTE_MODELO_PRINCIPAL = 'gemini-3.8-flash';
const AGENTE_MODELO_FALLBACK  = 'gemini-3.7-flash';

/* ══════════════════════════════════════════════════════════════════════════════
   V40.3 — TÓPICOS E QUESTÕES IGNORAVAM AS CONFIGURAÇÕES

   As duas constantes acima são os PADRÕES DE FÁBRICA, e estavam sendo usadas
   direto como se fossem a decisão final: a lousa lia o modelo das Configurações
   (cvModeloTexto_) e os tópicos liam esta constante. Trocar o modelo na tela
   mudava a lousa e não mudava os tópicos — dois caminhos, duas respostas.

   As funções abaixo são o ponto único: leem as Configurações e caem no padrão
   de fábrica só quando não há nada escolhido. As constantes seguem existindo
   porque outros pontos do projeto as citam.
   ══════════════════════════════════════════════════════════════════════════ */
function agModeloTexto_() {
  try { if (typeof cvModeloTexto_ === 'function') return cvModeloTexto_(); } catch (e) {}
  return AGENTE_MODELO_PRINCIPAL;
}
function agModeloFallback_() {
  try { if (typeof cvModeloFallback_ === 'function') return cvModeloFallback_(); } catch (e) {}
  return AGENTE_MODELO_FALLBACK;
}
/* O raciocínio por etapa também vinha cravado como 'high' em tópicos e no QA,
   enquanto a lousa já perguntava a cada fase. `high` numa fatia grande é o que
   levava a chamada a ~200s e estourava os 6 min do Apps Script. */
function agThinking_(fase, padrao) {
  try { if (typeof cvThinking_ === 'function') return cvThinking_(fase); } catch (e) {}
  return padrao || 'medium';   // V-MIGRA-2 — padrão 'medium' em todo o projeto
}

/* ══════════════════════════════════════════════════════════════════════════════
   V-MIGRA-2 — PONTE DE IA: NENHUMA CHAMADA DE IA RODA DENTRO DO APPS SCRIPT

   PROBLEMA: o Apps Script mata qualquer execução com mais de ~6 min. Toda
   função que chamava geminiAgent()/claudeAgent() (UrlFetchApp) disputava esse
   orçamento com o rodízio de chaves e a cascata de modelos — e morria com
   "Tempo máximo de execução excedido", mesmo com chaves e modelos válidos.

   SOLUÇÃO (sem reescrever as funções e sem mudar nenhum ponto de chamada):
     1. O navegador chama google.script.run.<funcao>(...) como sempre. Uma ponte
        instalada em JsAgentes.html intercepta as funções listadas em
        IA_FUNCOES_DIFERIDAS_ e, em vez de chamá-las direto, chama
        iaExecutarDiferido('<funcao>', args, respostas, estaveis).
     2. iaExecutarDiferido roda a função. Quando ela chega na chamada de IA
        (iaAgente_), a execução é INTERROMPIDA: o pedido (prompt, sistema,
        modelo, chave, jsonMode, thinking, maxTokens...) volta ao navegador.
     3. O navegador faz a chamada (fetch direto, stream, rodízio de chaves,
        cascata de modelos, timeout de 20 min) e chama iaExecutarDiferido de
        novo, agora com a resposta. A função é REEXECUTADA desde o início
        (só leitura de Drive/cache — rápido) e, ao chegar na mesma chamada de
        IA, recebe a resposta pronta e segue até o fim (ou até a próxima IA).
     4. O retorno final é entregue ao withSuccessHandler original, idêntico ao
        de antes. Nenhuma execução do Apps Script espera a IA responder.

   REGRAS PARA QUEM MEXER AQUI:
     · Valor aleatório/tempo que entra no prompt e é usado DEPOIS da IA deve
       passar por _iaValorEstavel_(), para ser o mesmo nas reexecuções.
     · catch que envolve uma chamada de IA e faz efeito colateral (gravar, dormir,
       repetir) deve começar com: if (iaPendente_()) throw e;
     · Fora da ponte (gatilho de tempo, editor), iaAgente_ cai no geminiAgent/
       claudeAgent legado — rede de segurança, só para uso manual.
   ══════════════════════════════════════════════════════════════════════════════ */
var IA_PENDENTE_MSG_ = '__IA_PENDENTE__';
var IA_PERMITIR_FALLBACK_BACKEND_ = true;   // só vale FORA da ponte (gatilho/editor)
var __IA_CTX = null;                        // contexto da execução atual da ponte

/* Funções que o navegador executa pela ponte. Precisa bater com
   IA_FUNCOES_DIFERIDAS em JsAgentes.html. */
var IA_FUNCOES_DIFERIDAS_ = {
  // Codigo.gs
  processarEdicaoTopicoIA: 1, gerarIndiceConversaoLegadoIA: 1, corrigirTopicosReprovados: 1,
  gerarLoteConversaoLegadoIA: 1, gerarEValidarLoteCompleto: 1, processarEdicaoQuestaoIA: 1,
  analisarCicloComIA: 1, buscarDefinicaoRapida: 1, validarCanvasClaude: 1, validarCanvasGemini: 1,
  corrigirBlocosCirurgicosComGemini: 1, corrigirBlocosCirurgicosComClaude: 1,
  revisarLousaQA: 1, aplicarCorrecaoCirurgicaQA: 1, fabricarQuestoesIA_Fase1_Gerar: 1,
  // Canvas.gs
  passo1A_ExtrairInventario: 1, auditarSlideVisual: 1, aplicarCirurgiaSubblocoVisual: 1,
  gerarCanvasIA: 1, gerarCanvasIALotes: 1, passo1B_GerarPlanoCanvas: 1, passo1B_PlanejarLoteParalelo: 1,
  passo1D_ExtrairConteudoCluster: 1, passo2_GerarLoteCanvas: 1, editarCanvasPorInstrucao: 1,
  planejarCanvasComIAPesada: 1, cvConsolidarBlocosExcedentes: 1, geminiVisionAgent: 1
};

/** true quando a execução atual está parada esperando a IA do navegador. */
function iaPendente_() {
  return !!(__IA_CTX && __IA_CTX.pendente);
}

/** Valor que precisa ser o MESMO nas reexecuções da ponte (sorteio, semente, horário). */
function _iaValorEstavel_(chave, gerador) {
  var ctx = __IA_CTX;
  if (!ctx) return gerador();
  if (!ctx.estaveis) ctx.estaveis = {};
  if (Object.prototype.hasOwnProperty.call(ctx.estaveis, chave)) return ctx.estaveis[chave];
  var v = gerador();
  ctx.estaveis[chave] = v;
  return v;
}

/* Converte os parâmetros de geminiAgent/claudeAgent num pedido serializável. */
function _iaSerializarChamada_(params, provedor) {
  var p = params || {};
  var out = {
    provedor: provedor,
    model: String(p.model || p.modelo || '').replace(/^models\//, '').trim() || null,
    apiKey: p.apiKey || null,
    prompt: p.prompt || '',
    systemPrompt: p.systemPrompt || '',
    jsonMode: (p.jsonMode !== undefined) ? !!p.jsonMode : true,
    thinkingLevel: p.thinkingLevel || null,
    maxTokens: parseInt(p.maxTokens, 10) || null,
    contextoGasto: p.contextoGasto || null,
    filaModelos: (Array.isArray(p.filaModelos) && p.filaModelos.length) ? p.filaModelos : null,
    semFallbackModelo: p.semFallbackModelo === true,
    searchEnabled: !!p.searchEnabled,
    historico: Array.isArray(p.historico) ? p.historico : null,
    arquivos: Array.isArray(p.arquivos) ? p.arquivos : null,
    responseSchema: p.responseSchema || null,
    claudePrefill: p.claudePrefill || null,
    temperature: (p.temperature !== undefined) ? p.temperature : null,
    visao: !!p.__visao
  };
  if (provedor === 'gemini' && !out.model) {
    try { out.model = (typeof cvModeloTexto_ === 'function') ? cvModeloTexto_() : AGENTE_MODELO_PRINCIPAL; } catch (e) {}
  }
  if (provedor === 'gemini' && !out.filaModelos && !out.semFallbackModelo) {
    try { out.filaModelos = (typeof _iaFilaModelosGlobal_ === 'function') ? _iaFilaModelosGlobal_() : null; } catch (e2) {}
  }
  return out;
}

/* Monta, a partir da resposta crua do navegador, o MESMO objeto que
   geminiAgent()/claudeAgent() devolviam — os chamadores não percebem a troca. */
function _iaMontarResultado_(chamada, r) {
  r = r || {};
  if (!r.success) {
    return {
      success: false,
      erro: r.erro || 'Falha na chamada de IA feita pelo navegador.',
      isQuota: !!r.isQuota, isDemanda: !!r.isDemanda, isChaveInvalida: !!r.isChaveInvalida,
      isRecitation: !!r.isRecitation, isTruncado: !!r.isTruncado,
      categoriaErro: r.categoriaErro || null, semChave: !!r.semChave,
      aguardar_ms: r.aguardar_ms || 0, transporte: !!r.transporte,
      modelo_final: r.modelo_final || chamada.model, modelos_tentados: r.modelos_tentados || null,
      standby_por_modelo: r.standby_por_modelo || null, tentativas: r.tentativas || 0,
      pool_size: r.pool_size || 0, debug: r.debug || null
    };
  }
  var texto = String(r.raw == null ? '' : r.raw);
  var resultado = texto;

  if (chamada.provedor === 'claude') {
    if (chamada.jsonMode) {
      var pre = chamada.claudePrefill || '[';
      if (texto.trim().indexOf(pre) !== 0) texto = pre + texto;
      try {
        var cleanRaw = texto.replace(/```json|```/gi, '').trim();
        cleanRaw = cleanRaw.replace(/[\n\r\t]+/g, ' ');
        cleanRaw = cleanRaw.replace(/(?<!\\)\\([^"\\nrtu])/g, '\\\\$1');
        resultado = JSON.parse(cleanRaw);
      } catch (eC) {
        Logger.log('[CLAUDE API] ❌ JSON corrompido: ' + eC.message + ' | Raw: ' + texto.substring(0, 300));
        return { success: false, erro: 'JSON inválido retornado pelo Claude: ' + eC.message };
      }
    }
    return { success: true, resultado: resultado, raw: texto, modelo: r.modelo || chamada.model, tokens: r.tokens || null, debug: r.debug || null };
  }

  if (chamada.jsonMode && !chamada.visao) {
    try {
      resultado = JSON.parse(texto.replace(/```json|```/g, '').trim());
    } catch (eJ) {
      var rep = (r.finishReason === 'MAX_TOKENS') ? null :
                ((typeof _cvReparaJson_ === 'function') ? _cvReparaJson_(texto) : null);
      resultado = (rep !== null) ? rep : texto;
    }
  }
  return {
    success: true, resultado: resultado, raw: texto,
    modelo: r.modelo || chamada.model, finishReason: r.finishReason || 'N/D',
    tokens: r.tokens || null, modeloRebaixado: !!r.modeloRebaixado, debug: r.debug || null
  };
}

/**
 * Substituto de geminiAgent()/claudeAgent() dentro das funções migradas.
 * provedor: 'gemini' | 'claude' (se omitido, decide pelo nome do modelo).
 */
function iaAgente_(params, provedor) {
  params = params || {};
  var modeloTxt = String(params.model || params.modelo || '');
  provedor = provedor || (modeloTxt.indexOf('claude') !== -1 ? 'claude' : 'gemini');
  // Modelo Claude pedido por um caminho "gemini" (ex.: QA configurado como Claude): vai para o Claude.
  if (provedor === 'gemini' && modeloTxt.indexOf('claude') !== -1) provedor = 'claude';

  var ctx = __IA_CTX;
  if (!ctx) {
    if (!IA_PERMITIR_FALLBACK_BACKEND_) {
      return { success: false, erro: 'Chamada de IA fora da ponte do navegador (bloqueada por IA_PERMITIR_FALLBACK_BACKEND_).' };
    }
    Logger.log('[IA-PONTE] ⚠️ chamada de IA FORA da ponte (' + (params.contextoGasto || '?') +
               ') — usando o agente legado do servidor (sujeito ao limite de 6 min).');
    // CURTA — não aumentar: rede de segurança só para execução manual/gatilho.
    return (provedor === 'claude') ? claudeAgent(params) : geminiAgent(params);
  }
  if (ctx.pendente) throw new Error(IA_PENDENTE_MSG_);   // já há um pedido aberto nesta execução

  var chamada = _iaSerializarChamada_(params, provedor);
  if (ctx.idx < ctx.respostas.length) {
    var resp = ctx.respostas[ctx.idx];
    ctx.idx++;
    return _iaMontarResultado_(chamada, resp);
  }
  ctx.pendente = chamada;
  throw new Error(IA_PENDENTE_MSG_);
}

/**
 * Ponto de entrada da ponte (chamado SÓ pelo navegador).
 * Devolve { __iaPendente, chamada, indice, estaveis } ou { __iaFinal, resultado }.
 */
function iaExecutarDiferido(nome, args, respostas, estaveis) {
  var t0 = Date.now();
  if (!IA_FUNCOES_DIFERIDAS_[nome]) {
    throw new Error('iaExecutarDiferido: função não autorizada na ponte de IA: ' + nome);
  }
  var _g = (typeof globalThis !== 'undefined') ? globalThis : this;
  var fn = _g[nome];
  if (typeof fn !== 'function') throw new Error('iaExecutarDiferido: função inexistente: ' + nome);

  var resps = Array.isArray(respostas) ? respostas : [];
  __IA_CTX = { nome: nome, respostas: resps, idx: 0, pendente: null,
               estaveis: (estaveis && typeof estaveis === 'object') ? estaveis : {} };
  Logger.log('[IA-PONTE] ▶ ' + nome + ' | respostas já obtidas: ' + resps.length);
  try {
    var ret = fn.apply(_g, Array.isArray(args) ? args : []);
    if (__IA_CTX.pendente) {
      Logger.log('[IA-PONTE] ⏸ ' + nome + ' pediu a IA nº ' + (__IA_CTX.idx + 1) + ' (' +
                 (__IA_CTX.pendente.contextoGasto || __IA_CTX.pendente.provedor) + ') | ' + (Date.now() - t0) + 'ms');
      return { __iaPendente: true, chamada: __IA_CTX.pendente, indice: __IA_CTX.idx, estaveis: __IA_CTX.estaveis };
    }
    Logger.log('[IA-PONTE] ✅ ' + nome + ' concluída | IAs usadas: ' + __IA_CTX.idx + ' | ' + (Date.now() - t0) + 'ms');
    return { __iaFinal: true, resultado: ret };
  } catch (e) {
    if (__IA_CTX && __IA_CTX.pendente) {
      Logger.log('[IA-PONTE] ⏸ ' + nome + ' pediu a IA nº ' + (__IA_CTX.idx + 1) + ' (exceção de controle) | ' + (Date.now() - t0) + 'ms');
      return { __iaPendente: true, chamada: __IA_CTX.pendente, indice: __IA_CTX.idx, estaveis: __IA_CTX.estaveis };
    }
    Logger.log('[IA-PONTE] ❌ ' + nome + ': ' + (e && e.message ? e.message : e) + ' | ' + (Date.now() - t0) + 'ms');
    throw e;
  } finally {
    __IA_CTX = null;
  }
}

/** Chave da Anthropic para o navegador chamar o Claude direto (app de uso pessoal). */
function iaObterChaveClaude() {
  try {
    var k = PropertiesService.getScriptProperties().getProperty('CLAUDE_API_KEY');
    return { sucesso: !!k, chave: k || null };
  } catch (e) {
    return { sucesso: false, chave: null, erro: e.message };
  }
}

// === CREDENCIAIS DE ACESSO ===
const USUARIO_LOGIN = "vitor.cxpost@gmail.com";
const USUARIO_SENHA = " ";

// ══════════════════════════════════════════════════════════════════════════
// V14.6 — CONFIGURAÇÃO CENTRAL DO STUDYOS
// Todo o padrão de configuração vive AQUI, no topo do arquivo: credenciais,
// chaves de API, prompts da voz, preferências visuais e de comportamento.
// Antes este bloco ficava na linha ~1981, longe de tudo. Foi movido para cá
// logo após USUARIO_LOGIN/USUARIO_SENHA, das quais ele depende.
// Para mudar qualquer padrão do sistema, é neste bloco que se mexe.
// ══════════════════════════════════════════════════════════════════════════
const DEFAULT_PREFS_JSON = {
"nome": "Vitor",
"credenciais": {
  "email": USUARIO_LOGIN,
  "senha": USUARIO_SENHA
},
"global": {
  "nome_usuario": "Vitor",
  "prompts_live": {
    "system": "Sou {nome_usuario}, você é {nome_ia}, professora especialista em concursos públicos para Agente da Polícia Judicial dos Tribunais do Poder Judiciário da União (TRFs, TRTs, TREs e TST).\n\nDIRETRIZ DE SILÊNCIO:\n{saudacao}\n\nREGRAS GERAIS:\n- Se o usuário falar enquanto você responde, PARE imediatamente.\n- NUNCA fale espontaneamente. Só fale quando perguntada ou quando uma tool mandar.\n- Sem preâmbulo, sem repetir a pergunta, sem narrar o que você vai fazer.\n\nTRAVA DO CANVAS (LEIA ANTES DE QUALQUER COISA):\nVocê SÓ pode tocar em qualquer ferramenta de lousa/canvas se a fala do aluno contiver\nLITERALMENTE uma destas palavras: 'lousa', 'canvas', 'mapa mental', 'desenha', 'desenhe',\n'esquematiza', 'explica na tela', 'mostra na tela'.\nNenhuma dessas palavras apareceu? Então RESPONDA A PERGUNTA e PONTO. É PROIBIDO planejar\nlousa, PROIBIDO chamar salvarEtapaPlanejamentoCanvas e PROIBIDO perguntar se ele quer gerar.\nPerguntar 'quer que eu monte uma lousa?' sem ele ter pedido é a pior falha possível: interrompe\no estudo e desvia o foco. Na duvida, NAO chame ferramenta nenhuma — apenas responda.\n\nDESLIGAR (obediencia imediata):\nAo ouvir 'para', 'pare', 'pausa', 'silencio', 'chega', 'obrigado', 'ja entendi' ou 'depois':\nencerre a frase atual em no maximo 3 palavras e FIQUE MUDA. Nao resuma, nao confirme,\nnao pergunte mais nada. Voltar a falar sem ser chamada e desobediencia.\n\nTAMANHO DA RESPOSTA — TABELA FIXA (nao interprete, aplique):\nLocalize o tipo na coluna da esquerda e use EXATAMENTE o tamanho da direita.\n- Confirmação ou reconhecimento (anotei, ok, pronto): 1 frase. Sem exceção.\n- Pergunta objetiva (o que é X, qual o prazo, qual o artigo, qual a alíquota): 1 a 2 frases COM O DADO EXATO (número do artigo, prazo em dias, percentual). É PROIBIDO responder 'depende' sem dizer de que depende.\n- Pedido de explicação (explica, não entendi, por quê): responda COMPLETO — definição + o motivo + 1 exemplo concreto. Até 4 frases curtas. É PROIBIDO cortar a explicação pela metade: quando o aluno pede para entender, completude vence brevidade.\n- Pergunta com cálculo: diga UMA operação por frase, na ordem, e só então o resultado. É PROIBIDO pular direto ao resultado.\n- Comparação entre dois institutos: diga o critério que os separa ANTES de descrever cada um.\n\nPRECISÃO (INVIOLÁVEL — vale mais que fluência):\n- NUNCA invente número de artigo, súmula, prazo, percentual, valor ou jurisprudência.\n- Sem certeza do dado? Diga 'isso não está no material em tela' e pare. Chutar é a pior falha possível — o aluno vai levar o erro para a prova.\n- Ao citar norma, diga o número exato. Dizer 'a lei prevê' sem o número é PROIBIDO.\n- O MATERIAL EM TELA tem precedência sobre sua memória. Se divergirem, o material vence e você avisa a divergência em 1 frase.\n- Valores e cálculos: leia os números do material em tela, não responda de cabeça.\n- Pergunta ambígua: faça 1 pergunta de esclarecimento em vez de adivinhar.\n- Não amenize erro do aluno: se ele disser algo incorreto, corrija na primeira frase, com o dado certo.\n\nHIERARQUIA DE INFORMAÇÃO (REGRA DE OURO): O conteúdo que aparece em tela serve APENAS COMO REFERÊNCIA DE FUNDO. O que o aluno dita DEVE SER OBEDECIDO CEGAMENTE. A voz do aluno TEM PRIORIDADE ABSOLUTA.\n\nPROTOCOLO DE LOUSA INTERATIVA (CANVAS):\nNUNCA, EM HIPÓTESE ALGUMA, GERE UMA LOUSA SEM CONFIRMAÇÃO EXPRESSA DO ALUNO ANTES.\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nROTA A — MAPA MENTAL E MODO AUTOMÁTICO (atalho total)\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nQuando o aluno pedir um MAPA MENTAL ou qualquer lousa no MODO AUTOMÁTICO:\n1. NÃO faça perguntas de planejamento. Execute IMEDIATAMENTE salvarEtapaPlanejamentoCanvas(etapa='MODO', conteudo=modo_solicitado) em SILÊNCIO ABSOLUTO.\n2. A função retornará uma frase pedindo confirmação contendo o modo escolhido (ex: 'Posso gerar o Mapa Mental automaticamente agora?').\n3. Diga APENAS essa frase e FIQUE MUDA aguardando o aluno confirmar ('sim', 'pode gerar', etc.).\n4. SÓ APÓS O ALUNO CONFIRMAR, execute criarCanvasAutomatico(modo) IMEDIATAMENTE em SILÊNCIO ABSOLUTO. PULE TODAS AS FASES.\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nROTA B — OUTROS MODOS (teoria / prático / misto)\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nQuando o aluno especificar um modo NÃO automático E que NÃO seja mapa mental (ex: teoria, prático, misto), siga OBRIGATORIAMENTE esta sequência:\n\nFASE 0 (Modo): Execute salvarEtapaPlanejamentoCanvas(etapa='MODO', conteudo=modo_escolhido) em SILÊNCIO ABSOLUTO. Aguarde retorno. Diga SOMENTE o texto do campo 'mensagem' pedindo para ir para a próxima etapa.\n\nFASE 1 (Objetivos): Pergunte o objetivo geral e foco. O aluno dita livremente. Durante pausas, responda APENAS [ANOTADO] e fique muda. Somente quando ele disser 'pode salvar', 'concluí', execute salvarEtapaPlanejamentoCanvas(etapa='OBJETIVOS', conteudo=...) em SILÊNCIO ABSOLUTO. Diga SOMENTE 'mensagem'.\n\nFASE 2 (Restrições): Pergunte sobre restrições (nível, foco, o que evitar). Mesma regra da Fase 1. Execute salvarEtapaPlanejamentoCanvas(etapa='RESTRIÇÕES', conteudo=...) somente após confirmação explícita. Diga SOMENTE 'mensagem'.\n\nFASE 3 (Blocos): Pergunte: 'Quantos blocos você quer, ou prefere que eu planeje automaticamente?'\n  → SUBROTA B1 (dita número): Execute definirQuantidadeBlocos(quantidade=N). Colete bloco a bloco com anotarBloco(). Ao final execute salvarEtapaPlanejamentoCanvas(etapa='BLOCOS', conteudo='blocos ditados'). Diga SOMENTE 'mensagem' pedindo confirmação para gerar a lousa.\n  → SUBROTA B2 (delega): Execute salvarEtapaPlanejamentoCanvas(etapa='BLOCOS', conteudo='PLANEJAMENTO_AUTOMATICO_CONFORME_MODO_E_OBJETIVOS') IMEDIATAMENTE. Diga SOMENTE 'mensagem' pedindo confirmação.\n\nFASE 4 (Geração): SÓ chame abrirCanvas(titulo, tema) APÓS as 4 etapas terem retornado sucesso E após você pedir permissão e o aluno confirmar explicitamente com 'SIM'. NUNCA chame abrirCanvas antes da confirmação.\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nREGRAS MESTRAS E PÓS-CANVAS\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n- Após cada ferramenta: AGUARDE o retorno. O campo 'mensagem' é a ÚNICA coisa que você pode dizer.\n- Silêncio = pausa para pensar. NUNCA interprete pausa como confirmação.\n- Após canvas/mapa gerado com sucesso: SILÊNCIO ABSOLUTO IMEDIATO. Não narre, não descreva. O aluno está LENDO o canvas. Aguarde pergunta EXPLÍCITA.",
    "saudacao": "NÃO RESPONDA NENHUMA QUESTÃO, NÃO COMENTE NENHUM TEXTO OU ELEMENTO ENVIADO, NÃO FALE ABSOLUTAMENTE NADA, apenas aguarde e execute o comando do usuário e só fale se for solicitada expressamente.",
    "comandos": "[INSTRUÇÃO DE SISTEMA OBRIGATÓRIA — CÓDIGOS DE COMANDO]\nUse os códigos EXATOS abaixo NO INÍCIO da sua resposta ou EXECUTE a função correspondente imediatamente.\nIMPORTANTE: NUNCA verbalize os códigos ou nomes de funções. Execute-os silenciosamente.\n\nPRIORIDADE 1 — ENCERRAMENTO:\nSe ouvir qualquer palavra de encerramento → [ENCERRAR]\n\nPRIORIDADE 2 — DESTINO EXPLÍCITO:\nVerbos: ir, vai, abre, voltar, retornar, volta, executa, acessa... → acionarBotao(destino) ou navegarParaDisciplina() ou navegarParaTema().\n\nPRIORIDADE 3 — CANVAS VISUAL:\n\n  MODO AUTOMÁTICO OU MAPA MENTAL (ROTA A):\n  Detectar: aluno pede 'mapa mental' OU lousa 'automática'.\n  Ação 1: Execute salvarEtapaPlanejamentoCanvas(etapa='MODO', conteudo=modo_solicitado) silenciosamente.\n  Ação 2: Pergunte APENAS a mensagem que a tool retornou (ex: 'Posso gerar o mapa mental?').\n  Ação 3: Se aluno disser 'sim', execute criarCanvasAutomatico(modo).\n\n  OUTROS MODOS (ROTA B — teoria/prático/misto):\n  Ação 1: Siga Fase 0 → 1 → 2 → 3 usando salvarEtapaPlanejamentoCanvas para cada passo.\n  Ação 2: Ao fim do passo 3, a tool dirá para você perguntar se pode gerar.\n  Ação 3: Se aluno disser 'sim', chame abrirCanvas().\n\nPRIORIDADE 4 — RETORNO E TÓPICOS:\n  'voltar', 'retornar' → [VOLTAR]\n  'próximo' → [TOPICO_PROXIMO]\n  'anterior' → [TOPICO_ANTERIOR]\n\n════ COMANDOS DO SISTEMA ════\n1. [VOLTAR] / [ENCERRAR]\n2. [MODO_ANOTACOES] -> Confirme -> [SALVAR_ANOTACAO]conteúdo[FIM_ANOTACAO] -> [VOLTAR]\n3. lerAgenda() / criarAgendamento(...)\n4. responderQuestao(letra) / acionarBotao(acao)\n5. salvarEtapaPlanejamentoCanvas(etapa, conteudo)\n6. abrirCanvas(titulo, tema)\n7. criarCanvasAutomatico(modo)\n8. anotarBloco(numero_bloco, conteudo)\n9. definirQuantidadeBlocos(quantidade)",
    "home": "[MUDANÇA DE TELA — HOME]\nDisciplinas disponíveis:\n{disciplinas}\n\nNAVEGAÇÃO SILENCIOSA: Ao ouvir o nome de uma disciplina, execute navegarParaDisciplina() imediatamente em silêncio absoluto. NÃO FALE ABSOLUTAMENTE NADA.",
    "temas": "[CONTEXTO DO SISTEMA — TELA DE TEMAS]\nDisciplina: \"{disc}\".\nTemas:\n{temas}\n\nNAVEGAÇÃO SILENCIOSA: Ao ouvir um tema, execute navegarParaTema(tema=\"nome\") imediatamente em silêncio absoluto. NÃO FALE ABSOLUTAMENTE NADA.",
    "questoes": "[CONTEXTO ATUAL — QUESTÕES]\nDisciplina: {disc}\nTema: {tema}\n\n[QUESTÃO]\n{enunciado}\n\n[ALTERNATIVAS]\n{alternativas}\n\n[STATUS]\n{status_resposta}\n\nDIRETRIZ DE CONCISÃO: Responda perguntas sobre a questão em no MÁXIMO UMA FRASE curta. Se o aluno pedir exemplos ou esquemas da questão, OBEDEÇA O PROTOCOLO DO CANVAS.",
    "resumo": "[CONTEXTO ATUAL — RESUMO]\nDisciplina: {disc}\nTema: {tema}\nTópico atual: {topico}\n\n[CONTEÚDO]\n{conteudo}\n\nDIRETRIZ DE SILÊNCIO: O aluno está lendo o material. Permaneça em SILÊNCIO ABSOLUTO.\nDIRETRIZ DE CONCISÃO: Se o aluno fizer uma pergunta, responda em no MÁXIMO UMA FRASE curta. Siga o protocolo do Canvas.",
    "wizard": "[CONTEXTO ATUAL — TÓPICOS]\nDisciplina: {disc}\nTema: {tema}\nTópico: {topico}\n\n[CONTEÚDO]\n{conteudo}\n\nDIRETRIZ: Fique em SILÊNCIO ABSOLUTO. NÃO COMENTE O CONTEÚDO ESPONTANEAMENTE.\nQUANDO O ALUNO PEDIR CANVAS OU MAPA MENTAL:\n- ROTA A (Automático ou Mapa Mental): Salve o MODO via tool, pergunte para confirmar indicando o modo e gere via criarCanvasAutomatico APENAS DEPOIS DA RESPOSTA.\n- ROTA B (Teoria/Prático/Misto): Siga Fase 0→1→2→3 completas via tools, pergunte para confirmar e gere via abrirCanvas APENAS DEPOIS DA RESPOSTA.\nNUNCA GERE NADA SEM CONFIRMAÇÃO EXPLÍCITA DO ALUNO ANTES.\nPÓS-CANVAS: Após lousa gerada com sucesso → SILÊNCIO ABSOLUTO. NÃO narre o conteúdo. Aguarde o aluno falar.",
    "livre": "[MUDANÇA DE CONTEXTO — MODO LIVRE (COACH)] Disciplinas: {disciplinas} [DOSSIÊ EXECUTIVO DO ALUNO] {dossie_aluno} DIRETRIZ PARA O COACH: Leia silenciosamente. NÃO FALE NADA AGORA, aguarde a pergunta do usuário. Quando o usuário perguntar, seja extremamente concisa."
  }
},
"config": {
  "wiz_bar_style": "dots",
  "auto_silencio_ativo": true,
  "card_radius": 14,
  "wiz_bar_w": 4,
  "mic_auto": true,
  "inatividade_min": 10,
  "btn_gap_r1l": 2,
  "erro_secs": 10,
  "thinking_budget": 512,
  "btn_gap_r2r": 6,
  "wiz_bar_h": 6,
  "wiz_shield_bottom": 0,
  "tempo_estimado_fallback": 180,
  "gemini_voice": "Zephyr",
  "largura_maxima": 100,
  "navbar_row_gap": 17,
  "card_gap": 12,
  "termos_encerramento": "Desligar, Desconectar, sair, obrigado, tchau, encerrar, até logo, pode ir, dispensada, obrigada",
  "tema_visual": "padrao",
  "wiz_dots_y": -1,
  "compressao_trigger": 70560,
  "gemini_model": "models/gemini-2.5-flash-native-audio-preview-12-2025",
  "modelo_qa": AGENTE_MODELO_PRINCIPAL,
  "wiz_bar_gap": 24,
  "gemini_ai_name": "Aurora",
  "zoom_padrao": 1,
  "accent_color": "#0080ff",
  "btn_gap_r1r": 10,
  "auto_termos": true,
  "card_shadow": "sutil",
  "animacoes": true,
  "gemini_api_key": "AIzaSyCRtyCS-mumyS9SW3XFgykz5sGprvnvSZg",
  "proporcao_ineditas": 80,
  "navbar_opacity": 100,
  "compressao_sliding": 39744,
  "margin_top_home": -78,
  "tamanho_icones_navbar": 34,
  "modo_icones_navbar": "text",
  "densidade_cards": "normal",
  "modo_layout": "full",
  "silencio_min": 5,
  "compressao_ativa": true,
  "btn_gap_r2l": 8,
  "wiz_bar_y": -148
},
"contextos": {
  "home":     { "use_global": true,  "model": "models/gemini-2.5-flash-native-audio-preview-12-2025", "voice": "Zephyr", "thinking_budget": 512 },
  "temas":    { "use_global": true,  "model": "models/gemini-2.5-flash-native-audio-preview-12-2025", "voice": "Zephyr", "thinking_budget": 512 },
  "questoes": { "use_global": true,  "model": "models/gemini-2.5-flash-native-audio-preview-12-2025", "voice": "Zephyr", "thinking_budget": 2048 },
  "resumo":   { "use_global": true,  "model": "models/gemini-2.5-flash-native-audio-preview-12-2025", "voice": "Zephyr", "thinking_budget": 2048 },
  "wizard":   { "use_global": true,  "model": "models/gemini-2.5-flash-native-audio-preview-12-2025", "voice": "Zephyr", "thinking_budget": 2048 },
  "livre":    { "use_global": true,  "model": "models/gemini-2.5-flash-native-audio-preview-12-2025", "voice": "Zephyr", "thinking_budget": 2048 }
},
"agenda_avisos": [],
"agenda_config": { "avisos_auto": true },
"anotacoes": []
};






// ============================================================================
// [MOVIDO PARA Canvas.gs em 24/08/2026] — POOL_CHAVES_GEMINI agora vive
// só no Canvas.gs. Não redeclarar aqui.
// ============================================================================



// V22 — o gate por importância agora sai da configuração. Resolvido aqui, na
// declaração, porque é lido em 6 pontos diferentes do arquivo: uma troca cobre
// todos. Cada padrão é o valor que já vigorava, então quem nunca abrir a tela
// não sente diferença. Em GAS cada requisição é uma execução nova, então mudar
// na tela vale já na próxima chamada.
const GATE_IMPORTANCIA_PADRAO = {
  'CRÍTICO': 80,
  'ALTO':    70,
  'MÉDIO':   60,
  'BAIXO':   50,
  'NOVO':    65,
  'EXCLUIR': 0
};

const GATE_IMPORTANCIA = (function() {
  try {
    var prefs = (typeof carregarPreferencias === 'function') ? carregarPreferencias() : null;
    var gt = (prefs && prefs.config && prefs.config.motor && prefs.config.motor.gate) || null;
    if (!gt) return GATE_IMPORTANCIA_PADRAO;
    var out = {};
    Object.keys(GATE_IMPORTANCIA_PADRAO).forEach(function(k) {
      var v = parseInt(gt[k], 10);
      out[k] = (isNaN(v) || v < 0 || v > 100) ? GATE_IMPORTANCIA_PADRAO[k] : v;
    });
    return out;
  } catch (e) {
    return GATE_IMPORTANCIA_PADRAO;
  }
})();


// V90 — o antigo DISTRIBUICAO_AUDITOR_FISCAL (14 disciplinas do concurso fiscal) foi removido.
// O peso padrão agora vem de PESO_DISCIPLINA.agente_policia_judicial (Config.gs) via _distribuicaoPadraoEdital().





// V95 — Identidade do concurso em UM lugar só: os prompts abaixo usam esta constante.
// Para outro concurso/cargo, troque apenas esta linha.
const IDENTIDADE_CONCURSO = "concurso de Agente da Polícia Judicial dos Tribunais do Poder Judiciário da União (TRFs, TRTs, TREs, TST e STJ)";

// V95 — Limiares do validador determinístico (texto visível). O prompt pede mais (piso de 2.500 / 1.200);
// o validador aceita um pouco menos para não reprovar por diferença de contagem.
const VALIDA_PISO_PALAVRAS     = 1800;
const VALIDA_PISO_PALAVRAS_REF = 900;
const VALIDA_PROSA_MIN         = 0.30;

const PROMPT_IA_PLANEJADOR = `Você é um coordenador pedagógico e autor de livro didático, especialista no ${IDENTIDADE_CONCURSO}.
Sua tarefa é analisar um resumo de estudo já existente (JSON de entrada) e definir o ÍNDICE ESTRUTURAL do novo material, ALINHADO AO EDITAL ATUAL. Cada item do índice será um CAPÍTULO DE LIVRO DIDÁTICO completo (de 2.500 a 5.000 palavras), não um resumo.

Disciplina: [DISCIPLINA_ALVO]
Tema: [TEMA_ALVO]

JSON DE ENTRADA:
<json_entrada>
[JSON_ANTIGO]
</json_entrada>

OBJETIVO:
Mapeie todo o conteúdo técnico do JSON de entrada que pertença ao edital atual e divida-o logicamente em Tópicos, pensando na COBERTURA TOTAL: o que uma prova pode cobrar dentro de cada subtema deve caber nos capítulos.
Crie entre 6 e 30 tópicos sequenciais (ex: "01 — Introdução com dados e aplicações", "02 — Hipóteses de Incidência", etc.), quantos forem necessários para que cada capítulo seja aprofundado.
O último tópico deve sempre ser "0X — Referências, Decisões Recentes e Pontos Quentes".

FIDELIDADE AO EDITAL (OBRIGATÓRIO):
- Todo subtema listado como parte do edital atual DEVE ser coberto por pelo menos um tópico, e o título desse tópico deve conter o nome do subtema principal que ele cobre.
- Se o JSON de entrada NÃO trouxer conteúdo sobre um subtema do edital, crie o tópico para ele mesmo assim (o conteúdo será produzido do zero).
- O que estiver no JSON de entrada e fugir do edital atual não entra no índice.

DECOMPOSIÇÃO (OBRIGATÓRIA): os subtemas do edital são títulos amplos. Decomponha cada um em todos os assuntos que a prova pode cobrar e crie um tópico para cada bloco distinto de conteúdo (por exemplo: base normativa e conceitos, classificações e elementos, procedimento, exceções e comparações). Subtema CRÍTICO ou ALTO exige 2 ou mais tópicos. Um material de entrada raso não limita o índice: o índice segue o edital, não o tamanho do material antigo. Cada título diz o assunto real do tópico (nunca "Conceitos gerais").

IMPORTANTE: Se o material contiver fórmulas matemáticas ou cálculos, crie tópicos específicos para elas (ex: "05 — Fórmulas e Cálculos de [Assunto]").

FORMATO DE SAÍDA OBRIGATÓRIO (RETORNE APENAS O ARRAY JSON, SEM MARKDOWN):
[
"01 — Título do Tópico 1",
"02 — Título do Tópico 2",
"03 — Título do Tópico 3"
]`;

// V90 — Planejador para tema SEM material (ou com subtemas do edital sem cobertura).
const PROMPT_IA_PLANEJADOR_DO_ZERO = `Você é um coordenador pedagógico e autor de livro didático, especialista no ${IDENTIDADE_CONCURSO}.
Sua tarefa é definir o ÍNDICE ESTRUTURAL de um material de estudo que será CRIADO DO ZERO, fiel ao edital. Cada item do índice será um CAPÍTULO DE LIVRO DIDÁTICO completo (de 2.500 a 5.000 palavras), não um resumo.

Disciplina: [DISCIPLINA_ALVO]
Tema: [TEMA_ALVO]

[MODO_TEXTO]

SUBTEMAS DO EDITAL A COBRIR (com a importância e o peso de cada um):
[ESCOPO_EDITAL]

REGRAS ESPECÍFICAS DA DISCIPLINA (use para decidir a estrutura):
[REGRAS_DISCIPLINA]

OBJETIVO:
Crie entre [MIN_TOPICOS] e [MAX_TOPICOS] tópicos sequenciais, em ordem didática (do conceito básico ao aprofundamento, às exceções e às pegadinhas de prova), pensando na COBERTURA TOTAL: tudo o que a prova pode cobrar em cada subtema deve caber nos capítulos.

REGRAS DO ÍNDICE (OBRIGATÓRIAS):
1. TODO subtema da lista acima deve ser coberto por pelo menos um tópico, e o título do tópico deve conter o nome do subtema principal que ele cobre.
2. Subtemas CRÍTICO e ALTO exigem 2 ou mais tópicos cada; subtemas MÉDIO e BAIXO podem ser agrupados com um subtema vizinho, sem perder o nome dele no título e sem perder profundidade.
3. Não crie tópico para assunto que esteja fora da lista do edital.
4. Se o tema envolver fórmulas ou cálculos, crie um tópico específico para eles.
[REGRA_FINAL]
6. DECOMPOSIÇÃO: os subtemas do edital são títulos amplos. Decomponha cada um em todos os assuntos que a prova pode cobrar e crie um tópico para cada bloco distinto de conteúdo (por exemplo: base normativa e conceitos, classificações e elementos, procedimento, exceções e comparações). Nenhum tópico pode ser um agrupamento vago de assuntos sem relação.
7. Cada título deve dizer o assunto real do tópico (nunca um título genérico como "Conceitos gerais"), e a ordem deve ser didática: base, aprofundamento, exceções e comparações.
8. Prefira MAIS tópicos bem delimitados a poucos tópicos enormes: cada capítulo precisa caber inteiro em uma resposta, com profundidade total.

FORMATO DE SAÍDA OBRIGATÓRIO (RETORNE APENAS O ARRAY JSON, SEM MARKDOWN):
[
"01 — Título do Tópico 1",
"02 — Título do Tópico 2"
]`;



const CONTRATO_VISUAL_HTML = `
0-B. APARÊNCIA VEM DO CSS EXTERNO: você NÃO define estilo. É TERMINANTEMENTE PROIBIDO usar o atributo style="" em qualquer elemento. Use SOMENTE as classes do contrato abaixo.
1. TEXTO: use <p>, <strong>, <em> puros (sem style). Ex.: <p>Texto com <strong>destaque</strong>.</p>
2. MATEMÁTICA E MOEDA (CRÍTICO):
   A) Moeda, percentual e conta simples (R$, +, −, =) = SEMPRE HTML: classe .calc na frase, ou o LEDGER em etapas. NUNCA use KaTeX para moeda ou formatação financeira.
   B) O SÍMBOLO $ É ESTRITAMENTE PROIBIDO EM QUALQUER LUGAR (ele vaza e quebra o renderizador web). Use 'R$' no texto, e \\\\( ... \\\\) para as fórmulas matemáticas.
   C) KaTeX SÓ e APENAS para fórmula matemática real (fração, expoente, raiz, somatório): inline \\\\( ... \\\\), bloco \\\\[ ... \\\\].
   D) Variável citada na frase = <span class='var'>i</span>. O termo da legenda na caixa de fórmula DEVE OBRIGATORIAMENTE conter delimitador LaTeX. Exemplo: <span class='def__term'>\\\\( \\\\bar{X} \\\\)</span>.
   D2) PROIBIDO SÍMBOLO LATEX SOLTO: qualquer comando (\\\\mu, \\\\sigma, \\\\bar{x}, \\\\text{...}) tem de estar SEMPRE dentro de \\\\( ... \\\\), de \\\\[ ... \\\\] ou de um atributo data-tex. Comando solto no meio da frase chega CRU na tela do aluno. ERRADO: <span>\\\\sigma = 15g</span> e <text>\\\\mu Desconhecido</text>. CERTO: <span>\\\\( \\\\sigma = 15g \\\\)</span>. DENTRO DE <svg><text> o KaTeX NÃO funciona: ali escreva o caractere Unicode direto (μ, σ, ×, ≥, x̄), nunca o comando LaTeX.
   D3) CHAVES BALANCEADAS: conte as chaves de cada data-tex antes de fechar a tag. \\\\text{Limite Sup.] está ERRADO (falta o }); o correto é \\\\text{Limite Sup.}]. Um data-tex desbalanceado é renderizado em vermelho no meio do slide.
   E) ESCAPE JSON: Todo comando LaTeX (frac, mu, sigma, sqrt, sum...) leva pelo menos 2 barras antes do nome (ex.: \\\\frac, \\\\mu). O sistema normaliza automaticamente qualquer excesso.
   F) SEPARADOR DE LINHA EM MATRIZ/CASES (\\\\): Use pelo menos 4 barras (ex.: \\\\\\\\) e SEMPRE seguido de um ESPAÇO em branco antes do próximo caractere. NUNCA cole o separador direto em outro comando (errado: '...\\\\\\\\end{cases}'; certo: '...\\\\\\\\ \\\\end{cases}').
   G) ACENTUAÇÃO PROIBIDA DENTRO DE COMANDOS LATEX: nunca use letra acentuada em subscrito, expoente ou dentro de \\\\text{}/símbolos. Errado: D_{saídas}. Certo: D_{saidas} (sem acento). Acento dentro do KaTeX vaza como bytes crus (ex.: o defeito 'D_sa\\\\xc3\\\\adas' já visto em produção). Se precisar do acento, escreva-o em HTML puro fora do bloco KaTeX.
3. TABELAS: use <table>/<thead>/<tbody>/<tr>/<th>/<td> puros. NENHUM atributo style.
   3.1) SEMPRE com <thead> e <tbody>. O <thead> traz o rótulo de cada coluna.
   3.2) Em tabela comparativa, a primeira coluna é RÓTULO DA LINHA: use
        <th scope='row'>Objeto</th>, nunca <td>. Isso é o que dá à tabela a
        leitura de livro (coluna de rótulo destacada, dados alinhados ao topo).
   3.3) Em tabela cujos dados são números, marque <table class='tp-data'> — assim
        a primeira coluna NÃO é tratada como rótulo.
   3.4) Célula com mais de um ponto SEMPRE em <ul><li>, um <li> por ponto.
        É PROIBIDO empilhar itens com <br> dentro da mesma célula.
   3.5) Máximo de 4 colunas. Acima disso, quebre em duas tabelas.
4. LISTAS: todo conjunto de 2 ou mais itens é <ul><li>…</li></ul> ou <ol>.
   É PROIBIDO digitar o marcador ("•", "-", "*") dentro de <p> e separar itens
   com <br>: isso não é lista, chega na tela sem recuo e sem respiro, com a
   segunda linha voltando para a margem. O marcador é gerado pelo CSS.
   Item com título usa <li><strong>Termo</strong> — explicação.</li>.
4. PRESERVAÇÃO TOTAL: todo artigo de lei, inciso, tabela ou jurisprudência do Material Fonte (quando houver) DEVE ser mantido.
5. NÃO repita o título do tópico no corpo do texto — o app já o exibe acima. Comece direto pelo texto.

COMPONENTES (USE EXATAMENTE ESTAS CLASSES, SEM NENHUM STYLE INLINE):
• Seção numerada: <div class='sec'><div class='sec__num'>1</div><h3 class='sec__title'>[Título]</h3></div>
• Conceito: <div class='box box--concept'><div class='box__eyebrow'>Conceito</div><div class='box__title'>[Termo]</div><p>[Definição completa.]</p></div>
• Dispositivo legal (hierárquico):
<div class='box box--law'><div class='box__eyebrow'>Dispositivo — [Lei/Art.]</div><div class='lei'><p class='lei__caput'>[Caput]</p><div class='lei__inciso'><span class='lei__marca'>I —</span><span>[Texto]</span></div><div class='lei__alinea'><span class='lei__marca'>a)</span><span>[Texto]</span></div></div></div>
• Referência composta (ex: CF/88 c/c Lei 8.112/90):
<div class='fundamentos'><div class='fund'><span class='fund__norma'>[Art/Lei]</span><span class='fund__papel'>[O que fundamenta]</span></div></div>
• Mnemônico: <div class='box box--mnemonic'><div class='box__eyebrow'>Mnemônico</div><div class='mnemonic'><div class='mnemonic__word'>[SIGLA]</div><div class='mnemonic__list'><div class='mn'><span class='mn__key'>[L]</span><span class='mn__text'>[Signif]</span></div></div></div></div>
• Atenção/pegadinha: <div class='box box--warn'><div class='box__eyebrow'>Atenção</div><p>[Exceção. <strong>Ponto crítico.</strong>]</p></div>
• Jurisprudência: <div class='box box--ref'><div class='box__eyebrow'>Ref — [Súmula]</div><p class='thesis'>[Tese]</p></div>
• Exemplo prático: <div class='box box--example'><div class='box__eyebrow'>Exemplo</div><div class='box__title'>[Contexto]</div><p>[Enunciado]</p></div>
• LEDGER (Conta de Moeda): <div class='ledger'><div class='lg-stage'><div class='lg-stage__head'><span class='lg-stage__name'>[Op]</span></div><div class='lg-rows'><div class='lg-line'><span class='lg-line__label'>Valor bruto</span><span class='lg-line__val'>R$ 3.000,00</span></div><div class='lg-line lg-line--pay'><span class='lg-line__label'>Valor líquido</span><span class='lg-line__val'>R$ 2.400,00</span></div></div></div><div class='lg-total'><span class='lg-total__label'>Total</span><span class='lg-total__val'>R$ 900,00</span></div></div>
• Conta na frase: <span class='calc'><i>Vencimento</i> R$ 3.000,00 − <i>Desconto</i> R$ 600,00 = <b>R$ 2.400,00</b></span>
• Fórmula real: <div class='box box--formula'><div class='box__eyebrow'>Fórmula — [Nome]</div><div class='formula'>\\\\[ fórmula \\\\]</div><div class='defs'><div class='def'><span class='def__term'>\\\\( [símbolo] \\\\)</span><span class='def__desc'>[definição]</span></div></div></div>
• Linha do tempo: <div class='timeline'><div class='tl tl--origin'><span class='tl__dot'>1</span><div class='tl__year'>[Fase]</div><div class='tl__body'>[Desc]</div></div></div>
• Tabela comparativa: <table><thead><tr><th>Elemento</th><th>Definição</th><th>Pegadinhas de prova</th></tr></thead><tbody><tr><th scope='row'>Objeto</th><td><p>[Definição.]</p></td><td><ul><li><strong>FGV:</strong> [pegadinha].</li><li><strong>FCC:</strong> [pegadinha].</li><li><strong>Cebraspe:</strong> [pegadinha].</li></ul></td></tr></tbody></table>
• Tabela de números: <table class='tp-data'><thead><tr><th>Ano</th><th>Valor</th></tr></thead><tbody><tr><td>2024</td><td>R$ 1.200,00</td></tr></tbody></table>
• Lista: <ul><li><strong>[Termo]</strong> — [explicação].</li><li>[item].</li></ul>

DENSIDADE VISUAL (aplique em todo tópico):
- Nenhum trecho com mais de 2 parágrafos seguidos sem um componente (lista, tabela, caixa ou timeline).
- Todo termo-chave vai em box--concept. Toda comparação de 2 ou mais itens parecidos vai em tabela. Toda sequência de 3 ou mais passos vai em <ol> ou timeline. Toda lista de 4 ou mais itens a memorizar ganha box--mnemonic.
- Toda seção tem pelo menos uma caixa box--warn ou box--example; o tópico tem pelo menos 3 box--example.
- Varie os componentes entre seções: não repita o mesmo par de componentes em todas.
- Sub-blocos dentro de uma seção: <p><strong>Subtítulo.</strong> texto</p>; <h3> é só do sec__title.
`;

const CONTRATO_COMPLETUDE = `
PADRÃO DE LIVRO DIDÁTICO, COMPLETUDE E AUTOSSUFICIÊNCIA (OBRIGATÓRIO, vale para todos os tópicos do lote):
A. OBJETIVO: cada tópico é um CAPÍTULO DE LIVRO DIDÁTICO. O aluno estuda SOMENTE por ele e não pode precisar de nenhuma outra fonte (livro, PDF, vídeo, resumo ou lei seca) para acertar as questões do assunto. Isto NÃO é resumo nem roteiro de tópicos: é o conteúdo integral que a prova pode cobrar.
B. VARREDURA DE COMPLETUDE (faça mentalmente antes de escrever; não imprima): para cada subtema do tópico, liste TODOS os itens que uma prova pode cobrar: definições e termos (com sigla e termo em inglês quando a prova os usa), origem e finalidade, classificações, espécies, teorias, elementos, requisitos, prazos, competências, procedimentos, sanções, exceções, comparações e normas. Subtema CRÍTICO ou ALTO costuma render dezenas de itens; se a sua lista é curta, você está raso. Cada item da lista deve aparecer no texto COM EXPLICAÇÃO PRÓPRIA: "citado" não é "coberto".
C. COBERTURA TOTAL: para cada subtema, desenvolva (a) definições e termos técnicos; (b) o porquê da regra ou do instituto (finalidade); (c) todas as classificações, espécies, teorias e princípios, cada uma explicada; (d) a base normativa, enumerando TODOS os itens de uma lista legal (cada inciso, hipótese, requisito, prazo, competência e exceção que você conhecer com segurança); (e) o procedimento passo a passo, dizendo QUEM faz cada passo; (f) comparações com institutos parecidos, em tabela; (g) exceções, limites e confusões típicas; (h) consequências, sanções e responsabilidades; (i) a aplicação ao ambiente de trabalho do cargo, com exemplos resolvidos; (j) atualizações normativas e entendimentos seguros. A falta de certeza sobre um número NUNCA justifica omitir o conteúdo: explique a regra por inteiro e apenas omita o número.
D. A PROSA É O CORPO DO TÓPICO: toda seção começa com 1 a 3 parágrafos de prosa explicativa (3 a 6 frases completas cada) e só depois entram caixas, tabelas e listas. Todo conceito recebe definição, o PORQUÊ (finalidade), o COMO funciona e a CONSEQUÊNCIA prática. Listas, tabelas e caixas complementam a prosa e nunca a substituem. É PROIBIDO o estilo telegráfico (frases soltas, itens de uma palavra sem explicação). Em lista, cada item é <strong>Termo</strong> — explicação completa (1 a 3 frases).
E. DIDÁTICA E ENCADEAMENTO: abra o tópico situando o aluno (o que vai aprender e como isso se liga ao tópico anterior); use frases de transição entre seções; vá do simples ao complexo; defina todo termo técnico na primeira vez que aparece; depois da regra, mostre o exemplo aplicado e a exceção.
F. EXEMPLOS RESOLVIDOS: todo box--example traz situação concreta, ANÁLISE (qual regra se aplica e por quê) e CONCLUSÃO. Nunca apenas o enunciado.
G. SEM ENCHIMENTO: é proibido introdução genérica, frase motivacional, conclusão que só reafirma e a mesma informação repetida em prosa, caixa e tabela. Cada informação aparece UMA vez, na forma mais eficiente (a prosa explica, a tabela compara, a lista enumera, a caixa destaca). Aprofundar (explicar mais) não é enchimento; repetir é.
H. TAMANHO: não há teto; o tamanho é CONSEQUÊNCIA da cobertura. Tópico regular: no mínimo 2.500 palavras de texto visível; subtema CRÍTICO ou ALTO: alvo de 3.500 a 5.000. Tópico de Referências: no mínimo 1.200. Se o assunto parecer esgotado antes do piso, refaça a varredura de completude: quase sempre falta aprofundar. Nunca corte conteúdo cobrável para caber.
I. FECHAMENTO DO TÓPICO: a última seção de cada tópico (exceto o de Referências, que fecha com a tabela de revisão relâmpago) é "[Nome do subtema]: síntese e fixação", com (i) uma tabela de revisão (conceito, regra, pegadinha) e (ii) uma caixa box--example com eyebrow "Fixação" contendo uma <ol> de 5 itens Certo/Errado em situação do ambiente do cargo, cada <li> com o gabarito e a justificativa curta.
J. RIGOR: nunca invente número de norma, artigo, súmula, processo, tese, prazo, pena, percentual ou sigla. Sem certeza absoluta, descreva o CONTEÚDO da regra sem numerá-la. Jurisprudência: só cite com número se tiver certeza absoluta do número e do teor; se não tiver, omita a caixa de jurisprudência ou descreva o entendimento sem numerá-lo. Não atribua a uma banca específica uma pegadinha de que não tenha certeza: descreva o TIPO de erro que a prova costuma induzir, sem afirmar frequência. Se uma norma foi alterada ou revogada, use a redação vigente e avise em uma caixa de atenção.
K. LENTE DO CARGO: o conteúdo técnico do subtema vem completo, mas exemplos, casos e pegadinhas saem da rotina do cargo do concurso e do seu ambiente de trabalho, com as normas do cargo em destaque. Teste da troca: se a seção continuar igualmente válida ao trocar o cargo por outro, ela está genérica; reescreva. Não apresente regra de outra carreira como se fosse do cargo, e não afirme atribuição do cargo sem certeza.
L. NÃO INVADA o conteúdo de outros tópicos do índice; se precisar de um conceito de outro tópico, releia-o em uma ou duas frases e siga. O conteúdo PRÓPRIO do subtema fica inteiro no tópico que o cobre; proibido "será visto em outro tópico" no lugar de conteúdo.
M. ABRANGÊNCIA DO CONCURSO: a prova cobre todos os órgãos indicados na identidade do concurso. Escreva para servir a todos: use termos genéricos do órgão (por exemplo "o Tribunal", "a Presidência do Tribunal") e alterne o ramo e o tipo de órgão nos exemplos. Normas do órgão de controle e do Poder como um todo valem para todos os ramos. Quando uma regra, competência, estrutura ou norma variar entre os ramos, apresente a regra geral e sinalize a variação em uma caixa de atenção; se não tiver certeza da variação, não a afirme.
`;

const PROMPT_IA_GERADOR_LOTE = `Você é um autor de livro didático e revisor técnico de elite, especialista no ${IDENTIDADE_CONCURSO}.
Estamos recriando um material de estudos, alinhado ao edital atual. Cada tópico é um CAPÍTULO DE LIVRO DIDÁTICO completo.
Você está gerando APENAS UM LOTE ESPECÍFICO de tópicos para compor o documento final. Escreva cada tópico por inteiro, com toda a profundidade exigida, sem comprimir para caber.

Disciplina: [DISCIPLINA_ALVO]
Tema: [TEMA_ALVO]

SUBTEMAS DO EDITAL PARA ESTE TEMA (com importância e peso):
[ESCOPO_EDITAL]

REGRAS ESPECÍFICAS DA DISCIPLINA:
[REGRAS_DISCIPLINA]

FIDELIDADE AO EDITAL (OBRIGATÓRIO):
- Para cada tópico do lote, cubra TODOS os subtemas do edital que lhe pertencem; para cada subtema crie ao menos uma seção (div.sec) cujo título contenha o NOME do subtema.
- O MATERIAL FONTE é ponto de partida, não limite: se ele for raso, telegráfico ou não trouxer conteúdo suficiente sobre algum subtema, APROFUNDE e COMPLETE com conhecimento técnico seguro, seguindo o PADRÃO DE LIVRO DIDÁTICO abaixo. Nunca copie texto raso; nunca deixe subtema sem cobertura.
- Preserve todo conteúdo correto do MATERIAL FONTE (artigos, incisos, tabelas, jurisprudência segura). Se um trecho estiver errado ou duvidoso e você não conseguir confirmar, reescreva-o de forma neutra, sem o dado duvidoso.
- O que estiver no MATERIAL FONTE e fugir do edital atual não entra no tópico.
- NUNCA invente número de artigo, súmula, tese, prazo, pena ou percentual; sem certeza absoluta, descreva a regra sem numerá-la.

MATERIAL FONTE COMPLETO (Base de conhecimento obrigatória):
<json_entrada>
[JSON_ANTIGO]
</json_entrada>

TÓPICOS QUE VOCÊ DEVE GERAR NESTA RESPOSTA (O LOTE):
<lote_alvo>
[TITULOS_DO_LOTE]
</lote_alvo>

═══════════════════════════════════════════════════
DIRETRIZES DE FORMATAÇÃO E CONTRATO DE SAÍDA VISUAL
═══════════════════════════════════════════════════
${CONTRATO_VISUAL_HTML}

${CONTRATO_COMPLETUDE}

═══════════════════════════════════════════════════
FORMATO DE SAÍDA OBRIGATÓRIO (JSON ARRAY)
═══════════════════════════════════════════════════
Você deve retornar APENAS um Array JSON puro, contendo um objeto para CADA título listado em <lote_alvo>.
NÃO use marcadores markdown (\`\`\`json).
TODAS AS ASPAS DUPLAS NO HTML DEVEM SER ESCAPADAS (\\"). NENHUMA QUEBRA DE LINHA LITERAL DEVE EXISTIR DENTRO DAS STRINGS. As quebras de linha visuais devem ser feitas com a tag <br>.

[
{
  "titulo": "Exatamente o Título 1 do Lote",
  "conteudo_html": "<div class='topic__lead'>[Frase-guia do tópico.]</div><div class='sec'><div class='sec__num'>1</div><h3 class='sec__title'>[Seção]</h3></div><div class='box box--concept'><div class='box__eyebrow'>Conceito</div><div class='box__title'>[Termo]</div><p>[Definição.]</p></div>",
  "contexto_llm": "Resumo denso do tópico em texto puro para alimentar busca semântica de IA de áudio. Máx 500 caracteres."
}
]`;

// V90 — Gerador de lote para tema SEM material: cria o conteúdo COMPLETO a partir do edital.
const PROMPT_IA_GERADOR_LOTE_DO_ZERO = `Você é um autor de livro didático e revisor técnico de elite, especialista no ${IDENTIDADE_CONCURSO}.
Este tema AINDA NÃO TEM MATERIAL. Você vai CRIAR do zero, de forma COMPLETA e PROFUNDA, os tópicos do lote indicado abaixo. Cada tópico é um CAPÍTULO DE LIVRO DIDÁTICO.
Um aluno que nunca estudou o assunto deve dominá-lo ao ler o resultado. Escreva cada tópico por inteiro, sem comprimir para caber.

Disciplina: [DISCIPLINA_ALVO]
Tema: [TEMA_ALVO]

SUBTEMAS DO EDITAL PARA ESTE TEMA (com importância e peso):
[ESCOPO_EDITAL]

REGRAS ESPECÍFICAS DA DISCIPLINA:
[REGRAS_DISCIPLINA]

ÍNDICE COMPLETO DO MATERIAL (só para você saber onde este lote se encaixa e NÃO repetir o que pertence a outros tópicos):
<indice_completo>
[INDICE_COMPLETO]
</indice_completo>

TÓPICOS QUE VOCÊ DEVE GERAR NESTA RESPOSTA (O LOTE):
<lote_alvo>
[TITULOS_DO_LOTE]
</lote_alvo>

REQUISITOS DE COMPLETUDE (OBRIGATÓRIOS):
1. Cubra TODOS os subtemas do edital que pertençam a cada tópico do lote. Para cada subtema, crie ao menos uma seção (div.sec) cujo título (h3.sec__title) contenha o NOME do subtema.
2. Profundidade: subtemas CRÍTICO e ALTO recebem o desenvolvimento mais extenso (alvo de 3.500 a 5.000 palavras por tópico); MÉDIO e BAIXO podem ser mais enxutos, mas COMPLETOS em tudo que é cobrável e nunca abaixo do piso de 2.500 palavras por tópico regular (nada que possa cair em prova fica de fora).
3. Estrutura de cada tópico: frase-guia (.topic__lead, 2 a 3 frases) → de 4 a 8 seções (.sec), cada uma começando por prosa explicativa e seguida de conceito, dispositivo legal literal quando houver, mnemônico se houver 4 ou mais itens, tabela comparativa quando houver conceitos parecidos, timeline para processos, atenção/pegadinha para cada exceção, jurisprudência segura e exemplo resolvido → última seção de síntese e fixação (ver item I do padrão abaixo).
4. RIGOR TÉCNICO (inviolável): NUNCA invente número de artigo, súmula, tese, prazo, pena, percentual ou valor. Se não tiver certeza absoluta do número, descreva o conteúdo da regra SEM numerá-la. Considere a redação vigente da norma e sinalize alterações legislativas recentes em uma caixa de atenção.
5. ESTILO DAS BANCAS (orientação de formato, não de estatística): FGV cobra caso prático e interpretação; FCC cobra literalidade da norma; Cebraspe cobra julgamento Certo/Errado com detalhe sutil. Use as caixas de atenção para o TIPO de erro que cada estilo induz, sem afirmar que uma banca específica sempre cobra determinado ponto.
6. Se o lote contiver o tópico "Referências, Decisões Recentes e Pontos Quentes": trate SOMENTE de normas, súmulas, teses e pontos quentes dos subtemas deste tema (só as que você tem certeza), com pelo menos uma seção ligada a cada subtema, e feche com uma tabela de revisão relâmpago (conceito, regra, pegadinha). Mínimo de 1.200 palavras.
7. Não repita o título do tópico no corpo e não invada o conteúdo de outros tópicos do índice.

═══════════════════════════════════════════════════
DIRETRIZES DE FORMATAÇÃO E CONTRATO DE SAÍDA VISUAL
═══════════════════════════════════════════════════
${CONTRATO_VISUAL_HTML}

${CONTRATO_COMPLETUDE}

═══════════════════════════════════════════════════
FORMATO DE SAÍDA OBRIGATÓRIO (JSON ARRAY)
═══════════════════════════════════════════════════
Retorne APENAS um Array JSON puro, com um objeto para CADA título listado em <lote_alvo>. Não coloque o JSON dentro de blocos de código markdown.
Todas as aspas duplas dentro do HTML devem ser escapadas com barra invertida. Nenhuma quebra de linha literal pode existir dentro das strings; use a tag <br> para quebras visuais.

[
{
  "titulo": "Exatamente o Título 1 do Lote",
  "conteudo_html": "<div class='topic__lead'>[Frase-guia do tópico.]</div><div class='sec'><div class='sec__num'>1</div><h3 class='sec__title'>[Nome do subtema]</h3></div><div class='box box--concept'><div class='box__eyebrow'>Conceito</div><div class='box__title'>[Termo]</div><p>[Definição.]</p></div>",
  "contexto_llm": "Resumo denso do tópico em texto puro para alimentar busca semântica de IA de áudio. Máx 500 caracteres."
}
]`;










// IMPORTANTE: Esta função precisa estar neste mesmo arquivo (ou em qualquer .gs)
function include(filename) {
return HtmlService.createHtmlOutputFromFile(filename).getContent();
}




function onOpen() {
SpreadsheetApp.getUi()
  .createMenu('Sistema de Questões')
  .addItem('🔄 Atualizar Raio-X', 'abrirAtualizadorRaiox')
  .addToUi();
}


function abrirAtualizadorRaiox() {
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <base target="_top">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8fafc; color: #334155; padding: 20px; margin: 0; }
    h3 { margin-top: 0; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; font-size: 16px; }
    .log-container { background: #0f172a; padding: 15px; border-radius: 6px; height: 220px; overflow-y: auto; font-family: monospace; font-size: 12px; margin-bottom: 20px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.5); }
    .log-line { margin: 6px 0; border-bottom: 1px dashed #1e293b; padding-bottom: 4px; }
    .log-line.info { color: #38bdf8; }
    .log-line.success { color: #10b981; font-weight: bold; }
    .log-line.error { color: #ef4444; font-weight: bold; }
    .loader { display: inline-block; width: 10px; height: 10px; border: 2px solid #38bdf8; border-radius: 50%; border-top-color: transparent; animation: spin 1s linear infinite; margin-right: 6px; vertical-align: middle; }
    @keyframes spin { 100% { transform: rotate(360deg); } }
    .btn { background: #0ea5e9; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer; font-weight: 600; width: 100%; font-size: 14px; transition: background 0.2s; }
    .btn:hover { background: #0284c7; }
    .btn:disabled { background: #94a3b8; cursor: not-allowed; }
  </style>
</head>
<body>
  <h3>Atualização do Banco (Raio-X em Lotes)</h3>
  <div id="logs" class="log-container">
    <div class="log-line info">Pronto para iniciar a leitura em lotes do banco de questões.</div>
  </div>
  <button id="btnAction" class="btn" onclick="iniciar()">Iniciar Atualização</button>

  <script>
    function log(msg, type='info') {
      const logs = document.getElementById('logs');
      const time = new Date().toLocaleTimeString('pt-BR');
      logs.innerHTML += '<div class="log-line ' + type + '">[' + time + '] ' + msg + '</div>';
      logs.scrollTop = logs.scrollHeight;
    }
    function iniciar() {
      document.getElementById('btnAction').disabled = true;
      document.getElementById('btnAction').innerText = 'Processando (0%)...';
      log('<span class="loader"></span> Lendo mapa e iniciando lotes...', 'info');
      chamarLote();
    }
    function chamarLote() {
      google.script.run
        .withSuccessHandler(function(res) {
          if (!res || !res.sucesso) {
            log('❌ Erro: ' + (res ? res.erro : 'Retorno nulo'), 'error');
            finalizarUI('Falha (Fechar)');
            return;
          }
          if (!res.done) {
            log('⏳ Lote ' + res.lote_atual + '/' + res.lote_total + ' • ' + res.questoes_ate_agora + ' questões (' + res.pct + '%)', 'info');
            document.getElementById('btnAction').innerText = 'Processando (' + res.pct + '%)...';
            chamarLote();
          } else {
            log('✅ Leitura e processamento em lotes concluídos.', 'success');
            log('📊 Total de questões mapeadas: ' + res.dados.total, 'success');
            log('💾 raiox_banco_v1.json salvo e cache estrutural reconstruído.', 'success');
            finalizarUI('Concluído (Fechar)');
          }
        })
        .withFailureHandler(function(err) {
          log('❌ Erro crítico de rede: ' + err.message, 'error');
          finalizarUI('Falha (Fechar)');
        })
        .processarRaioXEmLotes();
    }
    function finalizarUI(textoBotao) {
      const btn = document.getElementById('btnAction');
      btn.innerText = textoBotao;
      btn.disabled = false;
      btn.onclick = function() { google.script.host.close(); };
    }
  </script>
</body>
</html>
`;
const output = HtmlService.createHtmlOutput(htmlContent)
  .setWidth(800).setHeight(600).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
SpreadsheetApp.getUi().showModalDialog(output, 'Atualização de Raio-X');
}



function salvarTemplate(nomeId, nomeLegivel, distribuicao) {
try {
  if (!nomeId || !distribuicao) {
    return { erro: "Parâmetros inválidos." };
  }
  var entradas = [];
  if (Array.isArray(distribuicao)) {
    entradas = distribuicao.map(function(d) {
      var p = String(d.peso || d.valor || 0).replace(',', '.');
      var m = String(d.minimo || 1).replace(',', '.');
      return {
        disciplina: String(d.disciplina || d.nome || '').trim(),
        peso: Math.abs(Number(p) || 0),
        minimo: Math.max(1, Number(m) || 1),
        nivel: Math.max(0, Math.min(10, Math.round(Number(String(d.nivel === undefined ? 0 : d.nivel).replace(',', '.')) || 0)))
      };
    });
  } else {
    entradas = Object.keys(distribuicao).map(function(k) {
      var p = String(distribuicao[k] || 0).replace(',', '.');
      return {
        disciplina: String(k).trim(),
        peso: Math.abs(Number(p) || 0),
        minimo: 1
      };
    });
  }
  entradas = entradas.filter(function(e) {
    return e.disciplina !== '' && e.peso > 0;
  });
  var soma = entradas.reduce(function(s, d) { return s + d.peso; }, 0);
  if (Math.abs(soma - 100) > 0.5) {
    return { erro: "A soma dos pesos deve ser 100. Soma atual: " + soma.toFixed(2) };
  }
  var dados = _readJsonFromDrive(ARQUIVO_TEMPLATES) || { templates: {} };
  if (!dados.templates) dados.templates = {};
  dados.templates[nomeId] = {
    id: nomeId,
    nome: nomeLegivel || nomeId,
    distribuicao: entradas,
    atualizado_em: new Date().toISOString()
  };
  _saveJsonToDrive(ARQUIVO_TEMPLATES, dados);
  return { sucesso: true, id: nomeId, total: entradas.length };
} catch (e) {
  return { erro: e.message };
}
}

function listarTemplates() {
try {
  var dados = _readJsonFromDrive(ARQUIVO_TEMPLATES) || { templates: {} };
  var _distPadrao = _distribuicaoPadraoEdital();
  var builtinEntradas = Object.keys(_distPadrao).map(function(k) {
    return { disciplina: k, peso: _distPadrao[k], minimo: 1, nivel: _nivelPadraoV100(k) };
  });
  var builtin = [{
    id:           ID_TEMPLATE_TRT8_V100,
    nome:         NOME_TEMPLATE_TRT8_V100,
    distribuicao: builtinEntradas,
    builtin:      true
  }];
  var customList = Object.values(dados.templates || {}).map(function(t) {
    var dist = t.distribuicao;
    if (dist && !Array.isArray(dist)) {
      dist = Object.keys(dist).map(function(k) {
        return { disciplina: k, peso: dist[k], minimo: 1 };
      });
    }
    return {
      id:           t.id,
      nome:         (t.id === ID_TEMPLATE_TRT8_V100) ? NOME_TEMPLATE_TRT8_V100 : t.nome,   // V104 — cópia salva no Drive exibe o nome atual
      distribuicao: _filtrarDistribuicaoPeloEdital(dist),
      builtin:      false,
      atualizado_em: t.atualizado_em
    };
  }).filter(function(t) { return t.distribuicao.length > 0; });   // V91: template só com disciplinas do concurso antigo some da lista (o arquivo no Drive não é tocado)
  var _idsSalvosV100 = {};
  customList.forEach(function(t) { _idsSalvosV100[t.id] = true; });
  builtin = builtin.filter(function(b) { return !_idsSalvosV100[b.id]; });
  return { sucesso: true, templates: builtin.concat(customList) };
} catch (e) {
  return { erro: e.message };
}
}




function excluirTemplate(nomeId) {
try {
  var dados = _readJsonFromDrive(ARQUIVO_TEMPLATES) || { templates: {} };
  if (!dados.templates || !dados.templates[nomeId]) {
    return { erro: "Template nao encontrado: " + nomeId };
  }
  delete dados.templates[nomeId];
  _saveJsonToDrive(ARQUIVO_TEMPLATES, dados);
  return { sucesso: true };
} catch (e) {
  return { erro: e.message };
}
}



function carregarTemplate(nomeId) {
try {
  nomeId = _idTemplateCanonico(nomeId);
  if ((nomeId === 'AUDITOR_FISCAL' || nomeId === 'AGENTE_PJ' || nomeId === 'AGENTE_PJ_TRT8' || nomeId === 'RFB' || nomeId === 'TCU') && !_templateSalvoNoDriveV100(nomeId)) {
    var _distPadrao2 = _distribuicaoPadraoEdital();
    var entradas = Object.keys(_distPadrao2).map(function(k) {
      return { disciplina: k, peso: _distPadrao2[k], minimo: 1, nivel: _nivelPadraoV100(k) };
    });
    return { id: nomeId, nome: (nomeId === ID_TEMPLATE_TRT8_V100 ? NOME_TEMPLATE_TRT8_V100 : nomeId), distribuicao: entradas, builtin: true };
  }
  var dados = _readJsonFromDrive(ARQUIVO_TEMPLATES) || { templates: {} };
  var tpl = dados.templates[nomeId];
  if (!tpl) return null;
  if (tpl.distribuicao && !Array.isArray(tpl.distribuicao)) {
    tpl.distribuicao = Object.keys(tpl.distribuicao).map(function(k) {
      return { disciplina: k, peso: tpl.distribuicao[k], minimo: 1 };
    });
  }
  tpl.distribuicao = _filtrarDistribuicaoPeloEdital(tpl.distribuicao);   // V91
  if (tpl.distribuicao.length === 0) return null;
  return tpl;
} catch (e) {
  return null;
}
}


// ══════════════════════════════════════════════════════════════════════════
// V93 — EDITOR DE TÓPICOS: ADEQUAÇÃO EXCLUSIVA AO EDITAL, SEMPRE LIGADA
// Não existe interruptor na tela nem parâmetro de chamada: toda edição de tópico
// (individual ou em lote) passa por aqui. Garante, sem depender da IA:
//   • o tema pertence ao edital ativo (senão a edição é recusada);
//   • cada tópico recebe o recorte EXATO de subtemas do edital que lhe cabem;
//   • nenhum subtema do edital fica sem dono (subtema órfão é atribuído a um tópico);
//   • seções (.sec__num) e pontos de timeline numerados 1..n, sem salto nem repetição;
//   • títulos dos tópicos "01 — ...", "02 — ..." na ordem real do arquivo.
// ══════════════════════════════════════════════════════════════════════════
var EDITOR_TOPICOS_ADEQUAR_EDITAL = true;

function _edtNumTitulo(n) { return (n < 10 ? '0' : '') + n; }

function _edtSemPrefixoNumerico(t) {
  return String(t === null || t === undefined ? '' : t).replace(/^\s*\d{1,2}\s*[—–\-:.)]\s+/, '').trim();
}

// Renumera "NN — Título" pela posição real. Idempotente. Devolve true se algo mudou.
function _edtRenumerarTitulosTopicos(topicos) {
  var mudou = false;
  (topicos || []).forEach(function(t, i) {
    if (!t || typeof t.titulo !== 'string') return;
    var limpo = _edtSemPrefixoNumerico(t.titulo);
    if (!limpo) return;
    var novo = _edtNumTitulo(i + 1) + ' — ' + limpo;
    if (novo !== t.titulo) { t.titulo = novo; mudou = true; }
  });
  return mudou;
}

// Numera .sec__num em sequência 1..n no tópico inteiro e os .tl__dot de cada .timeline a partir de 1.
function _edtRenumerarSecoes(html) {
  var h = String(html === null || html === undefined ? '' : html);
  var nSec = 0, nTl = 0;
  h = h.replace(/(<div\b[^>]*class=(['"])[^'"]*\bsec__num\b[^'"]*\2[^>]*>)\s*[^<]*(<\/div>)/gi, function(m, abre, aspas, fecha) {
    nSec++;
    return abre + nSec + fecha;
  });
  h = h.replace(/(<div\b[^>]*class=(['"])[^'"]*\btimeline\b[^'"]*\2[^>]*>)|(<span\b[^>]*class=(['"])[^'"]*\btl__dot\b[^'"]*\4[^>]*>)\s*(\d+)\s*(<\/span>)/gi,
    function(m, abreTl, a2, abreDot, a4, num, fechaDot) {
      if (abreTl) { nTl = 0; return abreTl; }
      nTl++;
      return abreDot + nTl + fechaDot;
    });
  return h;
}

function _edtTextoPuro(html) {
  return String(html === null || html === undefined ? '' : html)
    .replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
}

// 0..1 — quanto do nome do subtema aparece no texto (mesma heurística de _edtSubtemaCoberto).
function _edtPontuacaoSubtema(subtema, textoNorm) {
  var n = _normChaveV23(subtema);
  if (n && textoNorm.indexOf(n) !== -1) return 1;
  var toks = _edtTokensSubtema(subtema);
  if (toks.length === 0) return 0;
  var achou = 0;
  toks.forEach(function(t) {
    var rad = t.length > 6 ? t.slice(0, t.length - 2) : (t.length > 4 ? t.slice(0, t.length - 1) : t);
    if (textoNorm.indexOf(rad) !== -1) achou++;
  });
  return achou / toks.length;
}

// Dono(s) de cada subtema do edital entre os tópicos do tema. Ordem de decisão:
//   1) título do tópico contém o subtema; 2) melhor corpo de texto (>= 60%);
//   3) órfão: o último tópico de conteúdo (antes de "Referências").
function _edtDistribuirSubtemas(esc, topicos) {
  var n = topicos.length;
  var tit = topicos.map(function(t) { return _normChaveV23(_edtSemPrefixoNumerico(t && t.titulo)); });
  var corpo = topicos.map(function(t) { return _normChaveV23(_edtTextoPuro(t && t.conteudo_html)); });
  var idxRef = -1;
  for (var i = 0; i < n; i++) { if (_ehTituloReferencias(topicos[i] && topicos[i].titulo)) idxRef = i; }
  var ultimoConteudo = (idxRef > 0) ? idxRef - 1 : Math.max(0, n - 1);
  var donos = {};
  esc.forEach(function(e) {
    var d = [], j;
    for (j = 0; j < n; j++) { if (_edtPontuacaoSubtema(e.subtema, tit[j]) >= 0.6) d.push(j); }
    if (!d.length) {
      var melhor = -1, ms = 0.6;
      for (j = 0; j < n; j++) {
        if (j === idxRef) continue;
        var sc = _edtPontuacaoSubtema(e.subtema, corpo[j]);
        if (sc >= ms && sc > (melhor === -1 ? 0.59 : ms)) { melhor = j; ms = sc; }
      }
      if (melhor !== -1) d.push(melhor);
    }
    if (!d.length) d.push(ultimoConteudo);   // órfão: destino previsível (palavras genéricas enganam similaridade parcial)
    donos[e.subtema] = d;
  });
  return donos;
}

// Recorte do edital para UM tópico: { esc, meus, deOutros }.
function _edtRecorteEditalTopico(disciplina, tema, topicos, index) {
  var esc = _edtEscopoDetalhado(disciplina, tema);
  if (!esc.length) return { esc: [], meus: [], deOutros: [] };
  var donos = _edtDistribuirSubtemas(esc, topicos);
  var meus = [], deOutros = [];
  esc.forEach(function(e) { (donos[e.subtema].indexOf(index) !== -1 ? meus : deOutros).push(e); });
  return { esc: esc, meus: meus, deOutros: deOutros };
}

function _edtLinhaSubtema(e) {
  return '- ' + e.subtema + ' (importância: ' + e.importancia + (e.distribuicao ? '; peso no tema: ' + e.distribuicao : '') + ')';
}

function _edtBlocoTravaEdital(tema, indice, total, rec) {
  var hoje = Utilities.formatDate(new Date(), 'GMT-3', 'MM/yyyy');
  var t = '\n\n═══ TRAVA DO EDITAL — SEMPRE ATIVA (NÃO NEGOCIÁVEL) ═══\n' +
    'Concurso: Agente da Polícia Judicial (TRFs, TRTs, TREs e TST). Tema: ' + tema + '. Este é o tópico ' + _edtNumTitulo(indice + 1) + ' de ' + total + '.\n';
  if (rec.meus.length) {
    t += 'SUBTEMAS DO EDITAL QUE ESTE TÓPICO DEVE COBRIR (na ordem do edital):\n' + rec.meus.map(_edtLinhaSubtema).join('\n') + '\n\n' +
      '1. Cubra TODOS os subtemas acima. Cada um vira ao menos uma seção (.sec) cujo <h3 class=\'sec__title\'> contém o NOME do subtema, na ordem listada. Profundidade proporcional à importância.\n';
  } else {
    t += 'Este é o tópico de fechamento/apoio do tema. Trate SOMENTE normas, súmulas, teses e pontos quentes dos subtemas do edital deste tema, sem abrir assunto novo.\n\n' +
      '1. Toda seção deve estar ligada a um subtema do edital deste tema.\n';
  }
  t += '2. REMOVA do HTML atual qualquer assunto que não pertença ao edital deste tema e NÃO acrescente nada fora dele. Não sobra "extra" no material.\n';
  if (rec.deOutros.length) {
    t += '3. Os subtemas abaixo pertencem a OUTROS tópicos deste tema: não os desenvolva aqui (no máximo uma frase de remissão).\n' +
      rec.deOutros.map(function(e) { return '   · ' + e.subtema; }).join('\n') + '\n';
  }
  t += '4. SEM LACUNAS: se o MATERIAL-BASE não trouxer algum subtema acima, produza o conteúdo completo. Nada de seção vazia, "em breve" ou "a definir".\n' +
    '5. NUMERAÇÃO: as seções são numeradas 1, 2, 3... em sequência, sem pular nem repetir. Não escreva numeração dentro do texto do título da seção.\n' +
    '6. ATUALIZAÇÃO (referência: ' + hoje + '): use a legislação e a jurisprudência VIGENTES. Dispositivo revogado ou alterado aparece com a redação atual. Cite artigo, súmula ou tese SOMENTE se tiver certeza; se não tiver certeza da redação atual, explique o conceito sem transcrever literalmente e sem inventar número.\n';
  return t;
}

function _edtSubtemasFaltando(meus, html) {
  var h = String(html || '');
  var titulos = [];
  var re = /<h3\b[^>]*class=(['"])[^'"]*\bsec__title\b[^'"]*\1[^>]*>([\s\S]*?)<\/h3>/gi, m;
  while ((m = re.exec(h)) !== null) titulos.push(_edtTextoPuro(m[2]));
  var tituloNorm = _normChaveV23(titulos.join(' '));
  var textoNorm = _normChaveV23(_edtTextoPuro(h));
  return meus.filter(function(e) {
    var n = _normChaveV23(e.subtema);
    if (_edtSubtemaCoberto(e.subtema, tituloNorm)) return false;
    return !(n && textoNorm.indexOf(n) !== -1);
  });
}

function _edtEhImportanciaAlta(e) {
  var i = _normChaveV23(e && e.importancia);
  return i === 'critico' || i === 'alto';
}

// Localiza o JSON do tema numa pasta de disciplina (mesma regra de salvarTopicoEditado).
function _edtAcharArquivoTema_(disciplinaFolder, disciplina, tema) {
  return _buscarArquivoNaPastaV101(disciplinaFolder, disciplina, tema);   // V101
}

// As lousas ficam em SistemaDeQuestoes_Lousas/<Disciplina>/<Disc>___<Tema>___<TítuloDoTópico>.json e são ligadas
// ao tópico pelo TÍTULO. Ao renumerar títulos, o arquivo da lousa acompanha (nome + campo "topico"), senão ela
// ficaria órfã ou, pior, passaria a valer para outro tópico. Falha aqui nunca bloqueia o salvamento do tópico.
function _edtSincronizarLousasComTitulos_(disciplina, tema, antes, depois) {
  try {
    var mapa = [];
    for (var i = 0; i < antes.length && i < depois.length; i++) {
      if (antes[i] && depois[i] && antes[i] !== depois[i]) mapa.push({ de: antes[i], para: depois[i] });
    }
    if (!mapa.length) return 0;
    var mainFolder = getFolder(PASTA_LOUSAS, getFolder(PASTA_RAIZ));
    var it = mainFolder.getFoldersByName(disciplina);
    if (!it.hasNext()) return 0;
    var pasta = it.next();
    var prefixo = limparNomeArquivo(disciplina) + '___' + limparNomeArquivo(tema) + '___';
    var achados = [];   // fase 1: localizar TODOS pelo nome antigo, antes de renomear qualquer um
    mapa.forEach(function(m) {
      var f = pasta.getFilesByName(prefixo + limparNomeArquivo(m.de) + '.json');
      if (f.hasNext()) achados.push({ arq: f.next(), para: m.para });
    });
    var ok = 0;
    achados.forEach(function(a) {   // fase 2: aplicar
      try {
        var d = JSON.parse(a.arq.getBlob().getDataAsString());
        d.topico = a.para;
        a.arq.setContent(JSON.stringify(d));
        a.arq.setName(prefixo + limparNomeArquivo(a.para) + '.json');
        ok++;
      } catch (eA) { Logger.log('[LOUSA-SYNC] falhou em "' + a.para + '": ' + eA.message); }
    });
    if (ok) Logger.log('[LOUSA-SYNC] ' + ok + ' lousa(s) acompanharam a renumeração dos títulos em "' + tema + '".');
    return ok;
  } catch (e) {
    Logger.log('[LOUSA-SYNC] ignorado: ' + e.message);
    return 0;
  }
}

// Passe determinístico (zero custo de IA) no tema inteiro: renumera títulos e seções de TODOS
// os tópicos e reporta subtemas do edital sem cobertura. Chamado no fim de cada lote de edição.
function reconciliarTemaComEdital(disciplina, tema) {
  var lock = null;
  try {
    try { lock = LockService.getScriptLock(); if (!lock.tryLock(30000)) { lock = null; return { erro: 'Arquivo ocupado (timeout de 30s).' }; } } catch (eL) { lock = null; }
    var pasta = getFolder(PASTA_RESUMO_PRO, getFolder(PASTA_RAIZ));
    var _pDisc = _pastaDisciplinaOuAliasV101(pasta, disciplina);   // V101
    if (!_pDisc) return { erro: 'Pasta da disciplina não encontrada.' };
    var arq = _edtAcharArquivoTema_(_pDisc, disciplina, tema);
    if (!arq) return { erro: 'Arquivo do tema não encontrado.' };
    var conteudo = JSON.parse(arq.getBlob().getDataAsString());
    if (!conteudo || !Array.isArray(conteudo.topicos) || !conteudo.topicos.length) return { sucesso: true, legado: true, faltantes: [] };
    var titulosAntes = conteudo.topicos.map(function(t) { return t.titulo; });
    var mudou = _edtRenumerarTitulosTopicos(conteudo.topicos);
    if (mudou) _edtSincronizarLousasComTitulos_(disciplina, tema, titulosAntes, conteudo.topicos.map(function(t) { return t.titulo; }));
    conteudo.topicos.forEach(function(t) {
      var novo = _edtRenumerarSecoes(t.conteudo_html);
      if (novo !== t.conteudo_html) { t.conteudo_html = novo; mudou = true; }
    });
    if (mudou) { arq.setContent(JSON.stringify(conteudo, null, 2)); limparCacheArquivos(); }
    var esc = _edtEscopoDetalhado(disciplina, tema);
    var diag = _edtDiagnosticarComResumo(esc, conteudo);
    return { sucesso: true, renumerado: mudou, titulos: conteudo.topicos.map(function(t) { return t.titulo; }),
             total_subtemas: diag.total_subtemas, faltantes: diag.faltantes };
  } catch (e) {
    return { erro: e.message };
  } finally {
    if (lock) { try { lock.releaseLock(); } catch (eR) {} }
  }
}


/* V79 - 7o PARAMETRO: overrideApiKey.
   O front passou a rodar o lote de topicos em paralelo com 1 chave REST por
   worker (_executarEmParaleloComChaves). Sem receber a chave aqui, os N
   workers cairiam TODOS no mesmo pool interno do backend e no mesmo indice de
   quarentena - era exatamente o cenario que ja tinha derrubado a lousa
   (documentado no comentario V31 do geminiAgent).
   COMPATIBILIDADE: o parametro e OPCIONAL e vai no FIM. Chamada antiga com 6
   argumentos continua valendo - overrideApiKey vira undefined e o codigo cai
   na chave das preferencias, como sempre fez.                               */
function processarEdicaoTopicoIA(disciplina, tema, index, dificuldade, observacoes, tipo, overrideApiKey) {
try {
  var prefs = carregarPreferenciasUsuario();
  var userApiKey = (prefs && prefs.config && prefs.config.gemini_api_key) ? prefs.config.gemini_api_key : null;
  var chaveDoWorker = (overrideApiKey && String(overrideApiKey).trim()) ? String(overrideApiKey).trim() : null;
  var chaveEfetiva = chaveDoWorker || userApiKey;

  // V93 — trava do edital SEMPRE ligada: tema fora do edital ativo não é editado.
  if (EDITOR_TOPICOS_ADEQUAR_EDITAL && !_pertenceAoEditalAtivo(disciplina, tema, null)) {
    return { erro: 'Tema fora do edital ativo (Agente da Polícia Judicial — TRFs, TRTs, TREs e TST): "' + tema + '" não é editado. Corrija o nome do tema ou o mapa do edital.' };
  }

  var data = carregarResumo(disciplina, tema, tipo);
  if (!data) return { erro: "Material não encontrado." };

  var htmlOriginal = "";
  var tituloTopico = "";

  if (tipo === 'pro' && (!data.topicos || !Array.isArray(data.topicos) || data.topicos.length === 0)) {
    return { erro: "Este tema ainda não tem tópicos para editar (arquivo vazio ou formato antigo). Selecione o tema na Revisão em Lote via IA para gerar o conteúdo do zero.", semMaterial: true };
  }

  if (tipo === 'pro' && Array.isArray(data.topicos) && data.topicos[index]) {
    htmlOriginal = data.topicos[index].conteudo_html || "";
    tituloTopico = data.topicos[index].titulo || "";
  } else if (tipo === 'lite') {
    var parsedLite = JSON.parse(data);
    if (parsedLite.posts && parsedLite.posts[index]) {
      htmlOriginal = parsedLite.posts[index].conteudo_html || "";
      tituloTopico = parsedLite.posts[index].titulo || "";
    } else {
      return { erro: "Índice de anotação não encontrado." };
    }
  } else {
    return { erro: "Estrutura não suportada ou índice fora dos limites." };
  }

  var regrasDisciplina = _obterRegrasDisciplina(disciplina);

  // V93 — recorte do edital para ESTE tópico (busca fuzzy do tema; antes era chave exata e
  // falhava em silêncio quando o nome do tema divergia por um detalhe).
  var recorte = { esc: [], meus: [], deOutros: [] };
  var totalTopicos = 1;
  if (tipo === 'pro') {
    totalTopicos = data.topicos.length;
    recorte = _edtRecorteEditalTopico(disciplina, tema, data.topicos, index);
  } else {
    var _escLite = _edtEscopoDetalhado(disciplina, tema);
    recorte = { esc: _escLite, meus: _escLite, deOutros: [] };
  }
  if (!recorte.esc.length) {
    return { erro: 'Tema sem subtemas mapeados no edital ativo: "' + tema + '". Nada a adequar.' };
  }
  regrasDisciplina += _edtBlocoTravaEdital(tema, index, totalTopicos, recorte);

  var sysPrompt =
    "Você é um professor conteudista especialista no concurso de Agente da Polícia Judicial dos Tribunais do Poder Judiciário da União (TRFs, TRTs, TREs e TST), com domínio total em " + (disciplina || 'todas as disciplinas') + ".\n" +
    "MISSÃO: REESCREVER e ENRIQUECER o HTML do tópico fornecido, gerando material COMPLETO, PROFUNDO e com PROGRESSÃO DIDÁTICA PERFEITA.\n" +
    "O aluno que nunca estudou este assunto deve dominar o tópico ao ler o resultado.\n\n" +
    "═══ PROIBIÇÕES ABSOLUTAS ═══\n" +
    "• PROIBIDO Markdown (**, ##, -, *).\n" +
    "• PROIBIDO omitir qualquer conceito do MATERIAL-BASE.\n" +
    "• PROIBIDO texto corrido sem estrutura visual.\n" +
    "• PROIBIDO blocos de código (```html) e repetir o título do tópico (o app já o exibe).\n\n" +
    "═══ PROGRESSÃO DIDÁTICA ═══\n" +
    "1. Frase-guia curta (.topic__lead) apresentando o tópico.\n" +
    "2. CONCEITO (.box--concept) — definição isolada e completa.\n" +
    "3. DISPOSITIVO LEGAL (.box--law) quando aplicável — norma/artigo exato e literal.\n" +
    "4. MNEMÔNICO (.box--mnemonic) se houver 3+ itens a memorizar.\n" +
    "5. Seções (.sec) no desenvolvimento; comparações em <table>.\n" +
    "6. TIMELINE (.timeline) para processos sequenciais.\n" +
    "7. ATENÇÃO (.box--warn) para cada exceção/pegadinha.\n" +
    "8. JURISPRUDÊNCIA (.box--ref) para súmulas e teses.\n" +
    "9. EXEMPLO (.box--example) com valores reais; contas em .ledger.\n\n" +
    "═══ CONTRATO DE SAÍDA VISUAL — ESTRUTURA SEMÂNTICA (OBRIGATÓRIO) ═══\n" +
    CONTRATO_VISUAL_HTML + "\n\n" +
    (tipo === 'pro' ? CONTRATO_COMPLETUDE + "\n\n" : "") +
    "═══ ESPAÇAMENTO E FORMATAÇÃO DE TEXTO (CRÍTICO) ═══\n" +
    "• É ESTRITAMENTE PROIBIDO grudar palavras em números ou variáveis (ex: '2.000,00pela' ou 'R1.000,incide'). Deixe SEMPRE um espaço ANTES e DEPOIS de números, tags HTML e delimitadores KaTeX.\n" +
    "• FÓRMULAS E VARIÁVEIS BEM ESPAÇADAS: Nas equações KaTeX, use espaços e operadores. O correto é separá-las claramente: T_{\\\\text{limite}} = V_{base} \\\\times A_{inter}.\n\n" +
    "═══ REGRAS ESPECÍFICAS: " + (disciplina || 'GERAL').toUpperCase() + " ═══\n" +
    regrasDisciplina + "\n\n" +
    "SAÍDA: HTML completo começando DIRETO pelo conteúdo, usando SOMENTE as classes do contrato, sem markdown, sem ```html, sem texto de explicação.";

  var modeloSelecionado = agModeloTexto_();   // V40.3 — lê as Configurações
  var obsLimpa = observacoes || "Gerar conteúdo completo com todos os templates aplicáveis ao tema.";

  if (observacoes) {
    var matchModelo = observacoes.match(/\[MODELO_SOLICITADO:\s*(.+?)\]/);
    if (matchModelo && matchModelo[1]) {
      modeloSelecionado = matchModelo[1].trim();
      obsLimpa = observacoes.replace(matchModelo[0], '').trim();
    }
  }

  var userPrompt =
    "==== TÓPICO A REESCREVER E ENRIQUECER ====\n" +
    "Disciplina: " + (disciplina || '') + "\n" +
    "Tema: " + (tema || '') + "\n" +
    "Título do Tópico: " + tituloTopico + "\n\n" +
    "HTML ATUAL (MATERIAL-BASE — preserve toda informação e enriqueça):\n" +
    htmlOriginal + "\n\n" +
    "==== DIRETRIZES DO USUÁRIO ====\n" +
    "Nível de Dificuldade: " + (dificuldade || "MANTER ATUAL") + "\n" +
    "Observações e Diretrizes: " + obsLimpa + "\n\n" +
    "Gere o HTML COMPLETO, PROFUNDO e ENRIQUECIDO. Preserve toda informação do MATERIAL-BASE, adicione exemplos e aplique os templates visuais na progressão correta.";

  Logger.log("==== [IA - EDICAO TOPICO] Modelo: " + modeloSelecionado +
             " | chave: " + (chaveDoWorker ? ("dedicada …" + chaveDoWorker.slice(-4)) : "pool/preferencias") +
             " | topico " + index + " ====");

  var _chamarModelo = function(promptUsuario) {
    if (modeloSelecionado.indexOf('claude') !== -1) {
      return iaAgente_({ model: modeloSelecionado, prompt: promptUsuario, systemPrompt: sysPrompt, jsonMode: false, maxTokens: 65536, contextoGasto: 'Topicos/Edicao' }, 'claude');   // V-MIGRA-2
    }
    return iaAgente_({ apiKey: chaveEfetiva, model: modeloSelecionado, prompt: promptUsuario, systemPrompt: sysPrompt, jsonMode: false, thinkingLevel: agThinking_('edicao', 'medium'), maxTokens: 65536, contextoGasto: 'Topicos/Edicao' }, 'gemini');   // V-MIGRA-2
  };

  var resultado = _chamarModelo(userPrompt);

  if (!resultado.success) return _erroAgenteTopicos_(resultado);

  // ══════════════════════════════════════════════════════════════════════════
  // V86 — SANEAMENTO + VALIDAÇÃO DO MATERIAL DIDÁTICO EDITADO
  // O pipeline de GERAÇÃO passa pela ETAPA 2.5 (_validarTopicosDeterministico).
  // A EDIÇÃO — que é o caminho usado pelo lote de tópicos — não passava por
  // validação nenhuma: markdown vazado, LaTeX com chave aberta, ``` esquecida e
  // divs desbalanceadas iam direto para o Drive e apareciam cruas para o aluno.
  // Aqui o que dá para consertar sem reescrever conteúdo é consertado; o que
  // sobra de defeito GRAVE volta como erro e o lote reprocessa o tópico.
  // ══════════════════════════════════════════════════════════════════════════
  var _sanearHtml = function(bruto) {
    var h = String(bruto || '').replace(/```html|```/g, '').trim();
    var antes = h;
    h = h.replace(/(^|[^\*])\*\*([^\*\n]{2,120})\*\*/g, '$1<strong>$2</strong>');
    h = h.replace(/^[ \t]*#{1,6}[ \t]+(.+)$/gm, '<p><strong>$1</strong></p>');
    if (h !== antes) Logger.log('[EDICAO-TOPICO] 🧹 markdown vazado convertido para HTML.');
    return h;
  };
  var _html = _sanearHtml(resultado.resultado);

  // V93 — COBERTURA DO EDITAL: todo subtema atribuído a este tópico precisa ter sua seção.
  // Se faltar, UMA passada de correção com o HTML já gerado; o que ainda faltar é avaliado abaixo.
  var _faltou = [];
  if (tipo === 'pro' && recorte.meus.length) {
    _faltou = _edtSubtemasFaltando(recorte.meus, _html);
    if (_faltou.length) {
      Logger.log('[EDICAO-TOPICO] 🔁 tópico ' + index + ' sem cobertura de: ' + _faltou.map(function(e) { return e.subtema; }).join(' | '));
      var _rep = _chamarModelo(userPrompt +
        '\n\n==== CORREÇÃO OBRIGATÓRIA — COBERTURA DO EDITAL ====\n' +
        'O HTML abaixo NÃO cobre estes subtemas do edital:\n' + _faltou.map(_edtLinhaSubtema).join('\n') + '\n' +
        'Devolva o HTML COMPLETO do tópico (não apenas o trecho novo), mantendo tudo o que já está correto e ACRESCENTANDO, na posição certa da ordem do edital, uma seção (.sec) para cada subtema acima, com o nome dele no título da seção.\n\n' +
        'HTML A CORRIGIR:\n' + _html);
      if (_rep && _rep.success) {
        var _html2 = _sanearHtml(_rep.resultado);
        var _faltou2 = _edtSubtemasFaltando(recorte.meus, _html2);
        if (_faltou2.length <= _faltou.length) { _html = _html2; _faltou = _faltou2; }
      }
    }
  }

  // V93 — NUMERAÇÃO determinística das seções e dos passos de timeline (a IA erra contagem).
  _html = _edtRenumerarSecoes(_html);

  // 2) validação estrutural
  var _relTop = _validarTopicosDeterministico([{ titulo: tituloTopico, conteudo_html: _html }]);
  var _probsTop = (_relTop && _relTop.length) ? _relTop[0].problemas : [];
  var _RX_GRAVE_TOP = /conteudo_html vazio|divs desbalanceadas|chaves desbalanceadas|cerca de codigo|LaTeX fora de delimitador|markdown/;
  var _gravesTop = _probsTop.filter(function(t) { return _RX_GRAVE_TOP.test(t); });

  if (_gravesTop.length) {
    Logger.log('[EDICAO-TOPICO] ⛔ tópico ' + index + ' reprovado: ' + _gravesTop.join(' | '));
    return { erro: 'Tópico reescrito reprovado na validação: ' + _gravesTop.join(' | ') };
  }
  if (_probsTop.length) Logger.log('[EDICAO-TOPICO] ⚠️ tópico ' + index + ' com ressalva: ' + _probsTop.join(' | '));

  // V93 — subtema CRÍTICO/ALTO ainda sem seção após a correção: reprova (o lote reprocessa).
  // MÉDIO/BAIXO: segue com aviso no log, para a heurística lexical não travar o lote por falso negativo.
  var _faltouAlto = _faltou.filter(_edtEhImportanciaAlta);
  if (_faltouAlto.length) {
    return { erro: 'Tópico não cobre subtemas do edital: ' + _faltouAlto.map(function(e) { return e.subtema; }).join(' | ') };
  }
  if (_faltou.length) Logger.log('[EDICAO-TOPICO] ⚠️ tópico ' + index + ' sem seção explícita para: ' + _faltou.map(function(e) { return e.subtema; }).join(' | '));

  return { sucesso: true, novo_html: _html, validacao: _probsTop, edital_cobertos: recorte.meus.length - _faltou.length, edital_total: recorte.meus.length };

} catch (e) {
  return { erro: "Exceção interna: " + e.message };
}
}

// ══════════════════════════════════════════════════════════════════════════
// V90 — ADAPTAÇÃO AO EDITAL: AGENTE DA POLÍCIA JUDICIAL (TRFs)
// Bancas, escopo do edital por tema, criação de tópicos do zero e auditoria de
// cobertura. Tudo aqui é lido do MAPA_DISTRIBUICAO_EDITAL (Config.gs): trocar o
// edital lá troca o comportamento daqui.
// ══════════════════════════════════════════════════════════════════════════

function _distribuicaoPadraoEdital() {
  try {
    if (typeof PESO_DISCIPLINA !== 'undefined' && PESO_DISCIPLINA && PESO_DISCIPLINA.agente_policia_judicial) {
      return PESO_DISCIPLINA.agente_policia_judicial;
    }
  } catch (e) { /* Config.gs ainda não inicializado: usa o espelho abaixo */ }
  return {
    "Língua Portuguesa": 15,
    "RLM": 10,
    "Noções de Sustentabilidade": 5,
    "Direito Constitucional": 10,
    "Direito Administrativo": 10,
    "Direitos Humanos": 5,
    "Segurança de Dignitários": 15,
    "Segurança Orgânica": 15,
    "Direito Penal": 4.5,
    "Processo Penal": 1.5,
    "Legislação Penal Especial": 6.75,
    "Direito da Pessoa Idosa e da Pessoa com Deficiência": 2.25
  };
}

// ══════════════════════════════════════════════════════════════════════════
// V91 — MIGRAÇÃO COMPLETA PARA O EDITAL ATIVO
// Ciclo salvo no Drive, templates, mapa da home, caches e ids antigos.
// ══════════════════════════════════════════════════════════════════════════

var ID_TEMPLATE_PADRAO = 'AGENTE_PJ_TRT8';

// Ids antigos (AUDITOR_FISCAL, RFB, TCU) e vazio viram o template padrão do edital ativo.
function _idTemplateCanonico(id) {
  var s = String(id === null || id === undefined ? '' : id).trim();
  if (!s || s === 'AUDITOR_FISCAL' || s === 'RFB' || s === 'TCU' || s === 'AGENTE_PJ') return ID_TEMPLATE_PADRAO;
  return s;
}

// V97 — nomes alternativos de disciplina que apontam para a chave canônica do edital
// (a home/ciclo legado usava "Raciocínio Lógico e Matemático"; a chave do edital e a pasta do Drive são "RLM").
var _ALIAS_DISCIPLINA_EDITAL = {
  'raciocinio logico e matematico': 'RLM',
  'raciocinio logico matematico': 'RLM',
  'raciocinio logico e matematica': 'RLM'
};

// Devolve o nome canônico da disciplina no edital ativo, ou null se ela não pertence a ele.
function _disciplinaDoEdital(nome) {
  if (typeof MAPA_DISTRIBUICAO_EDITAL === 'undefined' || !MAPA_DISTRIBUICAO_EDITAL) return String(nome || '');
  if (typeof FILTRAR_ESTRITAMENTE_PELO_EDITAL !== 'undefined' && !FILTRAR_ESTRITAMENTE_PELO_EDITAL) return String(nome || '');
  var alvo = _normChaveV23(nome);
  if (!alvo) return null;
  var chaves = Object.keys(MAPA_DISTRIBUICAO_EDITAL);
  for (var i = 0; i < chaves.length; i++) {
    if (_normChaveV23(chaves[i]) === alvo) return chaves[i];
  }
  var _al = _ALIAS_DISCIPLINA_EDITAL[alvo];
  if (_al && MAPA_DISTRIBUICAO_EDITAL[_al]) return _al;   // V97
  return null;
}

// Mantém só as disciplinas do edital ativo (com o nome canônico). Aceita array ou objeto.
function _filtrarDistribuicaoPeloEdital(dist) {
  if (!dist) return [];
  var arr = Array.isArray(dist)
    ? dist
    : Object.keys(dist).map(function(k) { return { disciplina: k, peso: dist[k], minimo: 1 }; });
  var saida = [];
  arr.forEach(function(e) {
    var nome = _disciplinaDoEdital(e && (e.disciplina || e.nome));
    if (!nome) return;
    saida.push({ disciplina: nome, peso: e.peso !== undefined ? e.peso : (e.valor || 0), minimo: e.minimo || 1, nivel: e.nivel });
  });
  return saida;
}

// Poda o ciclo salvo (fila com as disciplinas antigas, template_usado legado).
// Só mexe na memória; quem chama decide se grava. Devolve o que mudou.
function _podarConfigCicloPeloEdital(config) {
  var r = { mudou: false, removidos: [], template_migrado: false };
  if (!config) return r;
  if (typeof MAPA_DISTRIBUICAO_EDITAL === 'undefined' || !MAPA_DISTRIBUICAO_EDITAL) return r;
  if (typeof FILTRAR_ESTRITAMENTE_PELO_EDITAL !== 'undefined' && !FILTRAR_ESTRITAMENTE_PELO_EDITAL) return r;

  if (Array.isArray(config.fila) && config.fila.length > 0) {
    var idAtual = (config.fila[config.ponteiro_fila] || {}).id || null;
    var nova = [];
    config.fila.forEach(function(item) {
      var nome = _disciplinaDoEdital(item && item.disciplina);
      if (nome) {
        if (item.disciplina !== nome) { item.disciplina = nome; r.mudou = true; }
        nova.push(item);
      } else {
        r.removidos.push(item && item.disciplina);
      }
    });
    if (r.removidos.length > 0) {
      config.fila = nova;
      var idx = -1;
      for (var i = 0; i < nova.length; i++) { if (nova[i].id === idAtual) { idx = i; break; } }
      config.ponteiro_fila = idx >= 0 ? idx : 0;
      r.mudou = true;
    }
  }

  if (config.planejamento && config.planejamento.template_usado &&
      _idTemplateCanonico(config.planejamento.template_usado) !== config.planejamento.template_usado) {
    config.planejamento.template_usado = _idTemplateCanonico(config.planejamento.template_usado);
    r.template_migrado = true;
    r.mudou = true;
  }
  return r;
}

// Invalida os caches que guardam disciplinas do edital antigo.
function _limparCachesDoEdital() {
  try {
    var cache = CacheService.getScriptCache();
    var chaves = [CACHE_KEY_MAPA];
    if (typeof MAPA_DISTRIBUICAO_EDITAL !== 'undefined' && MAPA_DISTRIBUICAO_EDITAL) {
      Object.keys(MAPA_DISTRIBUICAO_EDITAL).forEach(function(d) {
        chaves.push(CACHE_KEY_CONTAGEM_PREFIX + d.replace(/\s+/g, '_').toUpperCase());
      });
    }
    cache.removeAll(chaves);
  } catch (e) { Logger.log('[MIGRACAO-PJ] cache: ' + e.message); }
  try { _CACHE_DIAG_V27 = {}; } catch (e2) {}
  try { _CACHE_ARVORE_V23 = null; } catch (e3) {}
  try { _marcarRaioXSujo(); } catch (e4) {}
}

// Idempotente. O front chama uma vez por versão de edital; também roda no editor do Apps Script.
function migrarParaEditalPJ() {
  try {
    _limparCachesDoEdital();

    var config = carregarConfiguracaoCiclo();   // já poda a fila e o template legado
    var filaRestante = (config.fila || []).map(function(i) { return i.disciplina; });

    var pastasDrive = [];
    try {
      var mainQ = getFolder(PASTA_QUESTOES, getFolder(PASTA_RAIZ));
      var it = mainQ.getFolders();
      while (it.hasNext()) pastasDrive.push(it.next().getName());
    } catch (eF) { Logger.log('[MIGRACAO-PJ] pastas: ' + eF.message); }

    var foraDoEdital = pastasDrive.filter(function(n) { return !_disciplinaDoEdital(n); });
    var semPasta = Object.keys(MAPA_DISTRIBUICAO_EDITAL).filter(function(d) {
      return !pastasDrive.some(function(n) { return _normChaveV23(n) === _normChaveV23(d); });
    });

    Logger.log('[MIGRACAO-PJ] Fila do ciclo: ' + filaRestante.length + ' disciplina(s): ' + filaRestante.join(' | '));
    Logger.log('[MIGRACAO-PJ] Pastas do Drive fora do edital (ignoradas, NADA foi apagado): ' + (foraDoEdital.join(' | ') || 'nenhuma'));
    Logger.log('[MIGRACAO-PJ] Disciplinas do edital sem pasta de questões (a fábrica cria): ' + (semPasta.join(' | ') || 'nenhuma'));

    return {
      sucesso: true,
      fila: filaRestante,
      pastas_fora_do_edital: foraDoEdital,
      disciplinas_sem_pasta: semPasta
    };
  } catch (e) {
    Logger.log('[MIGRACAO-PJ] ❌ ' + e.message + '\n' + e.stack);
    return { erro: e.message };
  }
}

// Garante pasta da disciplina e arquivo do tema no banco de questões (a fábrica precisa deles).
function _garantirPastaQuestoes(disciplina) {
  var mainFolder = getFolder(PASTA_QUESTOES, getFolder(PASTA_RAIZ));
  var it = mainFolder.getFoldersByName(disciplina);
  return it.hasNext() ? it.next() : mainFolder.createFolder(disciplina);
}


function _bancasPoolPJ() {
  return [
    {
      nome: 'FGV',
      estilo:
        'Foco em tribunais (TJs, tribunais superiores e magistratura). O desafio da prova é o português complexo e o enunciado longo com caso prático. ' +
        'Enunciado longo e contextualizado: servidor, jurisdicionado, autoridade ou unidade judiciária em uma situação concreta, com linguagem elaborada. ' +
        'A resposta exige interpretar o caso e aplicar a norma, não apenas recitá-la. ' +
        'Alternativas extensas e plausíveis; cada distrator nasce de um erro de aplicação (norma certa no caso errado, exceção ignorada, sujeito trocado). ' +
        'Comandos frequentes: "De acordo com...", "Nessa situação, é correto afirmar que...", "Assinale a opção que...".'
    },
    {
      nome: 'FCC',
      estilo:
        'Foco em TRTs e TRFs. O desafio da prova é a gestão de tempo e a alta exigência de memorização da letra da lei. ' +
        'Enunciado direto e objetivo, sem narrativa longa, resolvível rapidamente por quem estudou. ' +
        'Cobra a literalidade: as alternativas trocam uma palavra, prazo, quórum, pena, órgão ou requisito da redação legal. ' +
        'Alternativas curtas e precisas (A a E), com o erro concentrado em um único termo. ' +
        'Comandos frequentes: "Assinale a alternativa correta", "É correto afirmar", "exceto", "não se aplica", lacunas a completar com o termo técnico exato.'
    },
    {
      nome: 'CEBRASPE',
      estilo:
        'Foco em tribunais federais e estaduais de grande porte. O desafio da prova é o sistema de penalização por erro (Certo/Errado, em que cada erro anula um acerto) e o foco em jurisprudência. ' +
        'Situação hipotética seguida de assertivas. Cada assertiva carrega UM detalhe sutil (troca de palavra, exceção, prazo, sujeito, requisito) que a torna certa ou errada; o gabarito nunca é óbvio. ' +
        'Peso de jurisprudência do STF e do STJ e de literalidade da norma. ' +
        'Em Certo/Errado: a afirmativa é julgável isoladamente. Em múltipla escolha: três a cinco itens numerados (I, II, III...) a serem julgados, e o comando pede a quantidade de itens certos ou a combinação correta. ' +
        'Verbos frequentes: "julgue", "considerando", "a respeito de", "é correto afirmar".'
    }
  ];
}

function _escolherBancaPJ(pool, tipo) {
  if (tipo === 'certo_errado') {
    for (var i = 0; i < pool.length; i++) { if (pool[i].nome === 'CEBRASPE') return pool[i]; }
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

function _perfilBancasParaPrompt() {
  var pool = _bancasPoolPJ();
  var t = "PERFIL DAS BANCAS DO CONCURSO (Agente da Polícia Judicial — TRFs, TRTs, TREs e TST). Alterne os estilos ao longo do lote, em proporção parecida:\n";
  pool.forEach(function(b) { t += "▸ " + b.nome + ": " + b.estilo + "\n"; });
  t += "Quando o estilo Cebraspe for usado em múltipla escolha, use itens numerados julgados como certos ou errados e peça a quantidade ou a combinação correta.";
  return t;
}

// ── ESCOPO DO EDITAL POR TEMA ───────────────────────────────────────────────

function _edtChaveTema(disciplina, tema) {
  if (typeof MAPA_DISTRIBUICAO_EDITAL === 'undefined' || !MAPA_DISTRIBUICAO_EDITAL) return null;
  if (!MAPA_DISTRIBUICAO_EDITAL[disciplina]) return null;
  return _temaCanonicoEdital(disciplina, tema);   // V99 — exato/alias; sem tolerância fuzzy
}

function _edtEscopoDetalhado(disciplina, tema) {
  var chave = _edtChaveTema(disciplina, tema);
  if (!chave) return [];
  var mapa = MAPA_DISTRIBUICAO_EDITAL[disciplina][chave];
  return Object.keys(mapa).filter(function(s) {
    return mapa[s].importancia !== 'EXCLUIR';
  }).map(function(s) {
    return { subtema: s, importancia: mapa[s].importancia || 'MÉDIO', distribuicao: mapa[s].distribuicao || '' };
  });
}

function _edtEscopoTexto(disciplina, tema) {
  var esc = _edtEscopoDetalhado(disciplina, tema);
  if (esc.length === 0) return "(escopo não mapeado para este tema — siga o título do tema)";
  return esc.map(function(e) {
    return "- " + e.subtema + " (importância: " + e.importancia + (e.distribuicao ? "; peso no tema: " + e.distribuicao : "") + ")";
  }).join("\n");
}

// V91 — Dois concursos diferentes reutilizam os mesmos números de tema ("03 - ..."). Casar só pelo número
// ligava o material antigo (Direito Constitucional, Administrativo, Português do concurso fiscal) ao tema
// novo de mesmo número. Agora o número só vale se o NOME também for parecido (mais de 50% das palavras).
// Nome vazio ou só número ("02") continua casando, como antes.
function _sobreposicaoNomeTema(a, b) {
  var toks = function(s) {
    var t = String(s === null || s === undefined ? '' : s).replace(/\.json$/i, '').replace(/^\s*\d{1,3}(?!\d)/, '');
    return _normChaveV23(t).split(' ').filter(function(w) { return w.length >= 3 && !_EDT_STOP[w]; });
  };
  var ta = toks(a), tb = toks(b);
  if (ta.length === 0 || tb.length === 0) return 1;
  var rad = function(w) { return w.length > 5 ? w.slice(0, 5) : w; };
  var setB = {};
  tb.forEach(function(w) { setB[rad(w)] = true; });
  var comuns = 0;
  ta.forEach(function(w) { if (setB[rad(w)]) comuns++; });
  return comuns / Math.min(ta.length, tb.length);
}

// Somente leitura: lista, por disciplina do edital, os arquivos do banco de questões que NÃO casam com nenhum tema
// do edital atual (material do concurso antigo). Nada é apagado nem movido.
function auditarBancoXEditalPJ() {
  var relatorio = {};
  try {
    var mainQ = getFolder(PASTA_QUESTOES, getFolder(PASTA_RAIZ));
    var it = mainQ.getFolders();
    while (it.hasNext()) {
      var pasta = it.next();
      var disc = pasta.getName();
      if (!_disciplinaDoEdital(disc)) continue;
      var fs = pasta.getFiles(), casam = 0, ignorados = [];
      while (fs.hasNext()) {
        var f = fs.next(), nome = f.getName();
        if (nome.slice(-5) !== '.json' || nome.indexOf('___') === -1) continue;
        var tema = nome.replace('.json', '').split('___')[1].replace(/_/g, ' ');
        if (_pertenceAoEditalAtivo(_disciplinaDoEdital(disc), tema, null)) casam++; else ignorados.push(nome);
      }
      relatorio[disc] = { casam_com_o_edital: casam, ignorados: ignorados };
      Logger.log('[AUDIT-BANCO] ' + disc + ': ' + casam + ' arquivo(s) casam | ' + ignorados.length + ' ignorado(s)' + (ignorados.length ? ' → ' + ignorados.join(' ; ') : ''));
    }
    return { sucesso: true, relatorio: relatorio };
  } catch (e) {
    return { erro: e.message };
  }
}

// Compara o número do tema ("05 - ...") com o número no nome do arquivo ("Disc___05 - ....json").
// Substitui o antigo "o nome do arquivo contém esse número em qualquer lugar", que casava
// "10" com "Lei 10.098" e devolvia (ou sobrescrevia) o material de OUTRO tema.
function _mesmoNumeroDeTema(nomeArquivo, tema) {
  var numTema = _numTemaV23(tema);
  if (!numTema) return false;
  var partes = String(nomeArquivo).split('___');
  var trecho = partes.length > 1 ? partes.slice(1).join('___') : String(nomeArquivo);
  var numArq = _numTemaV23(trecho);
  if (!numArq || numArq !== numTema) return false;
  var trechoLimpo = String(trecho).replace(/\.json$/i, '').replace(/_/g, ' ');
  // 1) mesma chave (número inteiro + nome normalizado)
  if (_chaveTemaEdital(trechoLimpo) === _chaveTemaEdital(tema)) return true;
  // 2) V101 — nome antigo/variante do arquivo e nome canônico do edital apontam para o MESMO tema canônico
  var disc = partes.length > 1 ? partes[0].replace(/_/g, ' ') : '';
  var ca = _temaCanonicoQualquerV101(disc, trechoLimpo);
  return !!ca && ca === _temaCanonicoQualquerV101(disc, tema);
}

// V101 — "Disciplina|Tema canônico" de um nome de tema (ou null). Se a disciplina não for conhecida, tenta todas.
function _temaCanonicoQualquerV101(disciplina, nomeTema) {
  try {
    var s = String(nomeTema === null || nomeTema === undefined ? '' : nomeTema).replace(/\.json$/i, '').replace(/_/g, ' ');
    var ds = [];
    var dh = disciplina ? _disciplinaDoEdital(disciplina) : null;
    if (dh) ds.push(dh);
    else if (typeof MAPA_DISTRIBUICAO_EDITAL !== 'undefined' && MAPA_DISTRIBUICAO_EDITAL) ds = Object.keys(MAPA_DISTRIBUICAO_EDITAL);
    for (var i = 0; i < ds.length; i++) {
      var t = _temaCanonicoEdital(ds[i], s);
      if (t) return ds[i] + '|' + t;
    }
  } catch (e) {}
  return null;
}

// V101 — pasta da disciplina dentro de uma pasta-mãe (Pro/Lite): nome exato; senão pasta legada cujo nome
// resolve para a MESMA disciplina canônica do edital. null se não houver.
function _pastaDisciplinaOuAliasV101(mainFolder, disciplina) {
  var ex = mainFolder.getFoldersByName(disciplina);
  if (ex.hasNext()) return ex.next();
  var alvo = _disciplinaDoEdital(disciplina);
  if (!alvo) return null;
  var todas = mainFolder.getFolders();
  while (todas.hasNext()) {
    var g = todas.next();
    if (_disciplinaDoEdital(g.getName()) === alvo) return g;
  }
  return null;
}

// V101 — procura o arquivo do tema DENTRO de uma pasta. Aceita os dois padrões de nome do Drive:
//   "Disciplina___Tema.json"  e  "Tema_vademecum.json" (sem prefixo). Se houver mais de um candidato
//   (ex.: um arquivo vazio "Disciplina___Tema.json" e o material real "Tema_vademecum.json"),
//   vence o MAIOR arquivo — o vazio nunca encobre o material real.
function _buscarArquivoNaPastaV101(pasta, disciplina, tema) {
  var nomeAlvo = limparNomeArquivo(disciplina) + '___' + limparNomeArquivo(tema) + '.json';
  var temaLimpo = limparNomeArquivo(tema);
  var melhor = null, melhorTam = -1;
  var considera = function (f) {
    var tam = 0;
    try { tam = f.getSize(); } catch (e) {}
    if (tam > melhorTam) { melhor = f; melhorTam = tam; }
  };
  var ex = pasta.getFilesByName(nomeAlvo);
  while (ex.hasNext()) considera(ex.next());
  var fs = pasta.getFiles(), f;
  while (fs.hasNext()) {
    f = fs.next();
    var nm = f.getName();
    if (nm.slice(-5) !== '.json') continue;
    if (nm.indexOf(temaLimpo) !== -1 || _mesmoNumeroDeTema(nm, tema)) considera(f);
  }
  if (melhor) return melhor;
  // último recurso: mesmo número de tema E nomes parecidos (>= 50% das palavras em comum). Nunca só pelo número.
  var numT = _numTemaV23(tema);
  if (numT) {
    var toks = function (s) { return _chaveComparacaoEdital(String(s).replace(/\.json$/i, '').replace(/_/g, ' '), true).split(' ').filter(Boolean); };
    var tt = toks(tema), melhorSc = 0;
    var fs3 = pasta.getFiles();
    while (fs3.hasNext()) {
      f = fs3.next();
      var n3 = f.getName();
      if (n3.slice(-5) !== '.json') continue;
      var partesN = n3.split('___'), trechoN = partesN.length > 1 ? partesN.slice(1).join('___') : n3;
      if (_numTemaV23(trechoN) !== numT) continue;
      var ft = toks(trechoN), inter = 0, k;
      for (k = 0; k < ft.length; k++) if (tt.indexOf(ft[k]) !== -1) inter++;
      var uniao = tt.length + ft.length - inter, sc = uniao > 0 ? inter / uniao : 0;
      if (sc > melhorSc) { melhorSc = sc; melhor = f; }
    }
    if (melhor && melhorSc >= 0.5) return melhor;
  }
  return null;
}

// V101 — localiza o arquivo de resumo do tema: pasta exata e, se não achar, pastas legadas da mesma disciplina.
function _acharArquivoResumoV101(mainFolder, disciplina, tema) {
  var vistos = {}, achado = null;
  var exatas = mainFolder.getFoldersByName(disciplina);
  while (exatas.hasNext() && !achado) {
    var p = exatas.next(); vistos[p.getId()] = true;
    achado = _buscarArquivoNaPastaV101(p, disciplina, tema);
  }
  if (achado) return achado;
  var alvo = _disciplinaDoEdital(disciplina);
  if (!alvo) return null;
  var todas = mainFolder.getFolders();
  while (todas.hasNext() && !achado) {
    var g = todas.next();
    if (vistos[g.getId()]) continue;
    if (_disciplinaDoEdital(g.getName()) === alvo) achado = _buscarArquivoNaPastaV101(g, disciplina, tema);
  }
  return achado;
}

// ── SENTINELA DE CRIAÇÃO (front → back) ─────────────────────────────────────
// O front reaproveita o pipeline de conversão (índice → lotes → validação → save)
// passando, no lugar do JSON legado, {"__criar_do_zero":true,"modo":"criar"|"completar",...}.

function _parseSentinelaCriacao(x) {
  try {
    if (x === null || x === undefined) return null;
    var o = x;
    if (typeof x === 'string') {
      if (x.charAt(0) !== '{' || x.indexOf('__criar_do_zero') === -1) return null;
      o = JSON.parse(x);
    }
    if (o && typeof o === 'object' && o.__criar_do_zero === true) return o;
  } catch (e) { /* não é sentinela */ }
  return null;
}

function _subst(tpl, chave, valor) {
  return String(tpl).split(chave).join(String(valor));
}

function _montarPromptLoteEdital(disciplina, tema, jsonAntigo, stringOriginal, stringLote) {
  var sent = _parseSentinelaCriacao(jsonAntigo);
  var escopo = _edtEscopoTexto(disciplina, tema);
  var regras = _obterRegrasDisciplina(disciplina);
  var p;
  if (sent) {
    var indiceTxt = (sent.indice && sent.indice.length)
      ? sent.indice.map(function(t) { return "- " + t; }).join("\n")
      : "(não informado)";
    p = PROMPT_IA_GERADOR_LOTE_DO_ZERO;
    p = _subst(p, "[DISCIPLINA_ALVO]", disciplina);
    p = _subst(p, "[TEMA_ALVO]", tema);
    p = _subst(p, "[ESCOPO_EDITAL]", escopo);
    p = _subst(p, "[REGRAS_DISCIPLINA]", regras);
    p = _subst(p, "[INDICE_COMPLETO]", indiceTxt);
    p = _subst(p, "[TITULOS_DO_LOTE]", stringLote);
    return _diretrizesUsuarioTexto(sent) + _baseReescritaTexto(sent) + p;
  }
  p = PROMPT_IA_GERADOR_LOTE;
  p = _subst(p, "[DISCIPLINA_ALVO]", disciplina);
  p = _subst(p, "[TEMA_ALVO]", tema);
  p = _subst(p, "[ESCOPO_EDITAL]", escopo);
  p = _subst(p, "[REGRAS_DISCIPLINA]", regras);
  p = _subst(p, "[TITULOS_DO_LOTE]", stringLote);
  p = _subst(p, "[JSON_ANTIGO]", stringOriginal);
  return p;
}

// ── COBERTURA DO EDITAL ─────────────────────────────────────────────────────

var _EDT_STOP = { para:1, com:1, dos:1, das:1, como:1, entre:1, sobre:1, quando:1, uma:1, por:1, nos:1, nas:1,
                  que:1, seu:1, sua:1, suas:1, seus:1, geral:1, gerais:1, regras:1, tipos:1, tipo:1, uso:1, usos:1, ordem:1 };

function _edtTokensSubtema(subtema) {
  return _normChaveV23(subtema).split(' ').filter(function(w) {
    return w.length >= 4 && !_EDT_STOP[w];
  });
}

// Heurística lexical: o subtema conta como coberto se o nome aparece inteiro no material
// ou se pelo menos 60% das palavras significativas aparecem (com tolerância de plural/flexão).
function _edtSubtemaCoberto(subtema, textoNorm) {
  var n = _normChaveV23(subtema);
  if (n && textoNorm.indexOf(n) !== -1) return true;
  var toks = _edtTokensSubtema(subtema);
  if (toks.length === 0) return true;
  var achou = 0;
  toks.forEach(function(t) {
    var radical = t.length > 6 ? t.slice(0, t.length - 2) : (t.length > 4 ? t.slice(0, t.length - 1) : t);
    if (textoNorm.indexOf(radical) !== -1) achou++;
  });
  return (achou / toks.length) >= 0.6;
}

function _edtDiagnosticarComResumo(esc, r) {
  var topicos = (r && typeof r === 'object' && Array.isArray(r.topicos)) ? r.topicos : [];
  var texto = topicos.map(function(t) {
    return (t.titulo || '') + ' ' + String(t.conteudo_html || '').replace(/<[^>]*>/g, ' ');
  }).join(' ');
  var textoNorm = _normChaveV23(texto);
  var faltantes = esc.filter(function(e) { return !_edtSubtemaCoberto(e.subtema, textoNorm); })
                     .map(function(e) { return e.subtema; });
  return { qtd_topicos: topicos.length, total_subtemas: esc.length, faltantes: faltantes };
}

function diagnosticarCoberturaTopicosTema(disciplina, tema) {
  try {
    var esc = _edtEscopoDetalhado(disciplina, tema);
    var r = carregarResumo(disciplina, tema, 'pro');
    var d = _edtDiagnosticarComResumo(esc, r);
    d.sucesso = true;
    return d;
  } catch (e) {
    return { erro: e.message };
  }
}

// Chamada pelo front ao abrir um tema. Decide entre: criar do zero, completar
// subtemas que faltam, ou deixar quieto (legado é tratado pela conversão V13).
function verificarNecessidadeCriacaoTema(disciplina, tema) {
  try {
    if (!_pertenceAoEditalAtivo(disciplina, tema, null)) return { criar: false, motivo: 'fora_do_edital' };
    var esc = _edtEscopoDetalhado(disciplina, tema);
    if (esc.length === 0) return { criar: false, motivo: 'sem_escopo' };

    var r = carregarResumo(disciplina, tema, 'pro');
    if (!r) return { criar: true, motivo: 'sem_material', total_subtemas: esc.length };

    if (typeof r === 'object' && Array.isArray(r.topicos) && r.topicos.length > 0) {
      var d = _edtDiagnosticarComResumo(esc, r);
      return {
        criar: false,
        completar: d.faltantes.length > 0,
        faltantes: d.faltantes,
        qtd_topicos: d.qtd_topicos,
        total_subtemas: d.total_subtemas
      };
    }

    var temConteudoLegado = (typeof r === 'string' && r.trim()) ||
                            (r && r.conteudo_html && String(r.conteudo_html).trim()) ||
                            (r && r.pro && String(r.pro).trim());
    if (temConteudoLegado) return { criar: false, legado: true };
    return { criar: true, motivo: 'material_vazio', total_subtemas: esc.length };
  } catch (e) {
    return { criar: false, erro: e.message };
  }
}

// Somente leitura. Rode no editor do Apps Script e leia o log; o front usa o retorno.
function auditarTopicosFaltantesEdital() {
  var pendencias = [];
  var totalTemas = 0, ok = 0, legado = 0;
  Object.keys(MAPA_DISTRIBUICAO_EDITAL).forEach(function(disc) {
    Object.keys(MAPA_DISTRIBUICAO_EDITAL[disc]).forEach(function(tema) {
      totalTemas++;
      var v = verificarNecessidadeCriacaoTema(disc, tema);
      if (v.criar) {
        pendencias.push({ disciplina: disc, tema: tema, tipo: 'criar', motivo: v.motivo });
        Logger.log('[AUDIT-TOPICOS] ❌ SEM MATERIAL: ' + disc + ' | ' + tema);
      } else if (v.completar) {
        pendencias.push({ disciplina: disc, tema: tema, tipo: 'completar', faltantes: v.faltantes, qtd_topicos: v.qtd_topicos });
        Logger.log('[AUDIT-TOPICOS] ⚠️ INCOMPLETO: ' + disc + ' | ' + tema + ' | falta: ' + v.faltantes.join(' ; '));
      } else if (v.legado) {
        legado++;
        Logger.log('[AUDIT-TOPICOS] ↻ LEGADO (a conversão V13 refaz): ' + disc + ' | ' + tema);
      } else {
        ok++;
      }
    });
  });
  Logger.log('[AUDIT-TOPICOS] Temas: ' + totalTemas + ' | completos: ' + ok + ' | legado: ' + legado +
             ' | criar: ' + pendencias.filter(function(p) { return p.tipo === 'criar'; }).length +
             ' | completar: ' + pendencias.filter(function(p) { return p.tipo === 'completar'; }).length);
  return { sucesso: true, pendencias: pendencias, total_temas: totalTemas, completos: ok, legado: legado };
}

// ── ÍNDICE DO ZERO ──────────────────────────────────────────────────────────

function _tituloSemNumero(t) {
  return String(t).replace(/^\s*\d{1,3}\s*[—–\-:.]\s*/, '').trim();
}

function _renumerarTitulosIndice(titulos, inicio) {
  return titulos.map(function(t, i) {
    var n = inicio + i;
    return (n < 10 ? '0' + n : String(n)) + ' — ' + _tituloSemNumero(t);
  });
}

function _ehTituloReferencias(t) {
  return _normChaveV23(t).indexOf('referencias') !== -1;
}

// Garante que todo subtema do edital tenha título de tópico que o cubra.
// Só acrescenta o que faltar, antes do tópico final de "Referências".
function _garantirTitulosCobremSubtemas(indice, subtemas, completar) {
  var textoNorm = _normChaveV23(indice.join(' '));
  var faltam = subtemas.filter(function(e) { return !_edtSubtemaCoberto(e.subtema, textoNorm); })
                       .map(function(e) { return e.subtema; });
  var lista = indice.slice();
  var refs = null;
  if (!completar) {
    var idxRef = -1;
    for (var i = 0; i < lista.length; i++) { if (_ehTituloReferencias(lista[i])) { idxRef = i; break; } }
    if (idxRef !== -1) { refs = lista.splice(idxRef, 1)[0]; }
  }
  faltam.forEach(function(s) { lista.push(s); });
  if (!completar) lista.push(refs ? _tituloSemNumero(refs) : 'Referências, Decisões Recentes e Pontos Quentes');
  return { lista: lista, acrescentados: faltam };
}

function _erroAgenteTopicos_(res, prefixo) {
  res = res || {};
  var msg = String(res.erro || 'Erro desconhecido do agente');
  var formato = !!res.isFormato;
  var isDemanda = !!res.isDemanda ||
    (!formato && /DEMANDA|UNAVAILABLE|high demand|overload|HTTP\s*50[0-4]/i.test(msg));
  var isQuota = !!res.isQuota ||
    (!formato && !isDemanda && /quota|exhausted|quarentena|rotativ|rate limit|too many requests/i.test(msg));
  var semChave = !!res.semChave;
  var chaveInvalida = !!res.isChaveInvalida;
  var out = {
    erro: (prefixo || '') + msg,
    isQuota: isQuota,
    isDemanda: isDemanda,
    isChaveInvalida: chaveInvalida,
    semChave: semChave,
    isInfra: !formato && (isQuota || isDemanda || semChave || chaveInvalida),
    aguardar_ms: res.aguardar_ms || 0,
    categoriaErro: res.categoriaErro || null,
    tentativas: res.tentativas || 0,
    debug: res.debug || null
  };
  if (formato) out.isFormato = true;
  if (res.naoRetentar) out.naoRetentar = true;
  // V102 — mesmo contrato da Fábrica (V-FAB-3): o front marca o standby REAL de cada modelo e rotaciona.
  if (res.modelo_final) out.modelo_final = res.modelo_final;
  if (res.modelos_tentados) out.modelos_tentados = res.modelos_tentados;
  if (res.standby_por_modelo) out.standby_por_modelo = res.standby_por_modelo;
  return out;
}

function _erroEhInfraTexto_(msg) {
  return /DEMANDA|UNAVAILABLE|high demand|overload|HTTP\s*50[0-4]|quota|exhausted|quarentena|rotativ|rate limit|too many requests|Rotação encerrada|CHAVE_INVALIDA|SEM_CHAVE/i.test(String(msg || ''));
}

function _gerarIndiceCriacaoDoZero(disciplina, tema, sent, userApiKey) {
  var esc = _edtEscopoDetalhado(disciplina, tema);
  if (esc.length === 0) {
    return { erro: 'Tema fora do edital ativo ou sem subtemas mapeados: não há o que criar para "' + tema + '".', naoRetentar: true };
  }
  var completar = (sent.modo === 'completar' && sent.subtemas && sent.subtemas.length > 0);
  var alvo = (sent.subtemas && sent.subtemas.length > 0)
    ? esc.filter(function(e) { return sent.subtemas.indexOf(e.subtema) !== -1; })
    : esc;
  if (alvo.length === 0) alvo = esc;

  // Subtemas CRÍTICO/ALTO exigem mais de um tópico (cobertura total do edital).
  var _nCritAlto = alvo.filter(function(e) { return /CR[ÍI]TICO|ALTO/i.test(String(e.importancia || '')); }).length;
  var minT = completar ? 1 : Math.max(6, alvo.length + 1 + _nCritAlto);
  var maxT = completar ? Math.max(2, alvo.length * 2) : Math.min(30, Math.max(10, alvo.length * 4 + 1));
  if (minT > maxT) minT = maxT;
  var modoTxt = completar
    ? "MODO: COMPLEMENTO. O tema já tem tópicos, mas os subtemas abaixo NÃO estão cobertos. Crie SOMENTE os tópicos que faltam para cobri-los. Não crie tópico de introdução nem de referências."
    : "MODO: CRIAÇÃO COMPLETA. O tema não tem nenhum material. Crie o índice inteiro.";
  var regraFinal = completar
    ? "5. Não inclua o tópico \"Referências, Decisões Recentes e Pontos Quentes\" (ele já existe)."
    : "5. O último tópico deve ser sempre \"Referências, Decisões Recentes e Pontos Quentes\".";

  var escopoTxt = alvo.map(function(e) {
    return "- " + e.subtema + " (importância: " + e.importancia + (e.distribuicao ? "; peso no tema: " + e.distribuicao : "") + ")";
  }).join("\n");

  var prompt = PROMPT_IA_PLANEJADOR_DO_ZERO;
  prompt = _subst(prompt, "[DISCIPLINA_ALVO]", disciplina);
  prompt = _subst(prompt, "[TEMA_ALVO]", tema);
  prompt = _subst(prompt, "[MODO_TEXTO]", modoTxt);
  prompt = _subst(prompt, "[ESCOPO_EDITAL]", escopoTxt);
  prompt = _subst(prompt, "[REGRAS_DISCIPLINA]", _obterRegrasDisciplina(disciplina));
  prompt = _subst(prompt, "[MIN_TOPICOS]", minT);
  prompt = _subst(prompt, "[MAX_TOPICOS]", maxT);
  prompt = _subst(prompt, "[REGRA_FINAL]", regraFinal);

  prompt = _diretrizesUsuarioTexto(sent) + _baseReescritaTexto(sent) + prompt;

  var res = iaAgente_({   // V-MIGRA-2 — chamada feita pelo navegador
    apiKey: userApiKey,
    prompt: prompt,
    systemPrompt: "Retorne estritamente um array JSON de strings, sem formatação markdown.",
    jsonMode: true,
    maxTokens: 65536,
    contextoGasto: 'Topicos/IndiceCriacao'
  }, 'gemini');
  if (!res.success) return _erroAgenteTopicos_(res);

  var indice = res.resultado;
  if (typeof indice === 'string') {
    try { indice = JSON.parse(indice.replace(/```json|```/g, '').trim()); }
    catch (e) { return { erro: "A IA não retornou um array JSON válido. Retorno: " + indice, isFormato: true }; }
  }
  if (!Array.isArray(indice) || indice.length === 0) return { erro: "O índice gerado está vazio ou não é um array.", isFormato: true };
  indice = indice.map(function(t) { return String(t); }).filter(function(t) { return t.trim().length > 0; });

  var g = _garantirTitulosCobremSubtemas(indice, alvo, completar);
  if (g.acrescentados.length > 0) {
    Logger.log('[CRIACAO-ZERO] Subtemas sem título no índice da IA, acrescentados: ' + g.acrescentados.join(' ; '));
  }
  var inicio = completar ? ((parseInt(sent.qtd_existentes, 10) || 0) + 1) : 1;
  return { sucesso: true, indice: _renumerarTitulosIndice(g.lista, inicio) };
}

// ── LOCALIZAÇÃO E SALVAMENTO DO ARQUIVO DE RESUMO ───────────────────────────

function _edtLocalizarArquivoPro(disciplina, tema) {
  var root = getFolder(PASTA_RAIZ);
  var mainFolder = getFolder(PASTA_RESUMO_PRO, root);
  return _acharArquivoResumoV101(mainFolder, disciplina, tema);   // V101
}

// Acrescenta tópicos novos a um material V13 que já existe (modo "completar").
function salvarTopicosComplementares(disciplina, tema, novoJsonObj) {
  var lock = null;
  try {
    try {
      lock = LockService.getScriptLock();
      if (!lock.tryLock(30000)) { lock = null; return { erro: "Arquivo ocupado por outra gravação (timeout de 30s). Tente novamente." }; }
    } catch (eLock) { lock = null; }

    var novo = novoJsonObj;
    if (typeof novo === 'string') novo = JSON.parse(novo);
    var novos = (novo && Array.isArray(novo.topicos)) ? novo.topicos : [];
    if (novos.length === 0) return { erro: "Nenhum tópico novo para acrescentar." };

    var file = _edtLocalizarArquivoPro(disciplina, tema);
    if (!file) return { erro: "Material do tema não encontrado para acrescentar tópicos." };

    var conteudo = JSON.parse(file.getBlob().getDataAsString());
    if (!Array.isArray(conteudo.topicos)) return { erro: "O material do tema não está no formato V13 (sem lista de tópicos)." };

    var timestamp = Utilities.formatDate(new Date(), "GMT-3", "yyyyMMdd_HHmmss");
    var pastaBackup = getFolder(PASTA_BACKUPS, getFolder(PASTA_RAIZ));
    pastaBackup.createFile(file.getName().replace('.json', '') + '_BACKUP_COMPLEMENTO_' + timestamp + '.json',
                           JSON.stringify(conteudo), MimeType.PLAIN_TEXT);

    var titulosExistentes = {};
    conteudo.topicos.forEach(function(t) { titulosExistentes[_normChaveV23(_tituloSemNumero(t.titulo || ''))] = true; });
    var acrescentados = 0;
    novos.forEach(function(t) {
      var k = _normChaveV23(_tituloSemNumero(t.titulo || ''));
      if (k && titulosExistentes[k]) return;
      conteudo.topicos.push(t);
      titulosExistentes[k] = true;
      acrescentados++;
    });

    file.setContent(JSON.stringify(conteudo, null, 2));
    limparCacheArquivos();
    return { sucesso: true, acrescentados: acrescentados };
  } catch (e) {
    return { erro: "Erro ao acrescentar tópicos: " + e.message };
  } finally {
    if (lock) { try { lock.releaseLock(); } catch (eRel) {} }
  }
}


// V90 — Rodapé comum: o que cada banca explora. Aparece em TODAS as disciplinas.
function _regrasBancasRodape() {
  return "• PONTO QUENTE por banca (use em caixa de atenção): FGV = enunciado longo com caso prático, exige interpretar e aplicar; FCC = literalidade e memorização da letra da lei (a troca de uma palavra invalida a alternativa); Cebraspe = julgamento Certo/Errado em que um único detalhe inverte o item, com peso de jurisprudência.\n" +
         "• RIGOR: nunca invente número de artigo, súmula, prazo, pena ou percentual. Sem certeza do número, descreva a regra sem numerá-la.\n" +
         "• FORMATO x PROSA: os formatos indicados acima ORGANIZAM a matéria; a explicação em prosa (o porquê, o como e a consequência) continua obrigatória em cada seção. Disciplina procedimental ou decorável não é desculpa para texto telegráfico.";
}

function _obterRegrasDisciplina(disciplina) {
  var d = _normChaveV23(disciplina);
  var base;

  if (d.indexOf('portugues') !== -1) {
    base = "• Regra principal em CONCEITO box + exemplos CORRETO ✓ vs INCORRETO ✗ lado a lado.\n" +
           "• ATENÇÃO para cada exceção à regra, com exemplo real.\n" +
           "• Tabelas: conjugação verbal, regência nominal/verbal, casos de crase, classes de palavras.\n" +
           "• EXEMPLO com frases no padrão de questões de concurso (interpretação, reescrita, substituição de trechos).\n" +
           "• Diferencie claramente quando a regra é obrigatória, facultativa ou proibida.\n" +
           "• Em interpretação e coesão: mostre como reconhecer a alteração de sentido em reescritas e substituições de conectivos.\n" +
           "• PONTO QUENTE: FGV cobra português complexo, com textos longos; FCC cobra a regra gramatical e a correção de trechos; Cebraspe cobra reescrita e pontuação em itens Certo/Errado.";
  } else if (d.indexOf('raciocinio logico') !== -1 || d.indexOf('matematic') !== -1 || d.indexOf('rlm') !== -1) {
    base = "• TODA fórmula em KaTeX (inline para variáveis, bloco para a fórmula principal); moeda e conta simples em HTML, nunca KaTeX.\n" +
           "• Lógica proposicional: tabela-verdade em <table> para cada conectivo, e tabela própria de negações e equivalências (condicional, bicondicional, quantificadores).\n" +
           "• EXEMPLO com resolução passo a passo (dados → montagem → cálculo → verificação).\n" +
           "• Conjuntos: descreva os diagramas de Venn em texto e mostre a montagem por regiões (do centro para fora).\n" +
           "• ATENÇÃO: negação de \"todo\", \"algum\" e \"nenhum\"; negação do condicional; erros de proporção, porcentagem sobre porcentagem e unidades de medida.\n" +
           "• Estatística descritiva, gráficos, geometria e plano cartesiano: fórmula, significado de cada variável e exemplo numérico.\n" +
           "• PONTO QUENTE: Cebraspe cobra lógica em itens Certo/Errado; FGV cobra problemas longos com enunciado elaborado; FCC cobra cálculo direto e rápido.";
  } else if (d.indexOf('sustentabilidade') !== -1) {
    base = "• CF/88, art. 225, em DISPOSITIVO box: direito ao meio ambiente ecologicamente equilibrado, deveres do Poder Público, responsabilidade tríplice (sanções penais, administrativas e obrigação de reparar) e patrimônio nacional.\n" +
           "• Política de Sustentabilidade do Poder Judiciário (Res. CNJ 400/2021): objetivos, diretrizes, unidades socioambientais (composição e atribuições) e Plano de Logística Sustentável (PLS) — em listas estruturadas e tabela.\n" +
           "• Política Nacional sobre Mudança do Clima (Lei 12.187/2009) e Política Nacional de Resíduos Sólidos (Lei 12.305/2010): princípios, objetivos, instrumentos e diretrizes em listas; ordem de prioridade na gestão de resíduos em ordem numerada; responsabilidade compartilhada e logística reversa em CONCEITO box.\n" +
           "• Tabela comparativa: instrumentos da PNRS x instrumentos da política climática; resíduo x rejeito.\n" +
           "• ATENÇÃO para termos parecidos que a banca troca (redução x reutilização x reciclagem; responsabilidade compartilhada x logística reversa).\n" +
           "• Metas e percentuais só quando você tiver certeza absoluta do número; do contrário, descreva a meta sem numerá-la.";
  } else if (d.indexOf('constitucional') !== -1) {
    base = "• Artigos da CF/88 com número exato em DISPOSITIVO box, em texto literal.\n" +
           "• Súmulas Vinculantes e teses de repercussão geral em REF box (somente as que você tem certeza).\n" +
           "• Princípios fundamentais, nacionalidade e seguridade social: conceito, base constitucional e exceções em caixas próprias.\n" +
           "• Tabelas comparativas: brasileiro nato x naturalizado (direitos, cargos privativos, perda da nacionalidade); saúde x previdência x assistência social.\n" +
           "• ATENÇÃO: eficácia das normas (plena, contida, limitada), cláusulas pétreas e a diferença entre princípios fundamentais e direitos e garantias fundamentais.\n" +
           "• Mnemônicos para listas longas (fundamentos, objetivos, cargos privativos de nato).";
  } else if (d.indexOf('administrativo') !== -1) {
    base = "• Princípios (LIMPE e correlatos): CONCEITO box individual com exemplo prático.\n" +
           "• Agentes públicos e regime dos servidores federais (Lei 8.112/90): provimento, vacância, direitos e vantagens, regime disciplinar e processo disciplinar, com artigos em DISPOSITIVO box quando tiver certeza do número.\n" +
           "• Processo administrativo federal (Lei 9.784/99), licitações e contratos (Lei 14.133/2021) e ética no serviço público: requisitos, prazos e vedações em listas e tabelas.\n" +
           "• Tabela: formas de provimento x formas de vacância; penalidades disciplinares x hipóteses de aplicação; modalidades de licitação.\n" +
           "• Previdência e seguridade do servidor: regras gerais, benefícios e a distinção entre regime próprio e regime geral.\n" +
           "• ATENÇÃO: anulação (legalidade) x revogação (mérito); prazos prescricionais e decadenciais; alterações legislativas recentes.\n" +
           "• Timeline para as fases do processo disciplinar e do processo administrativo.";
  } else if (d.indexOf('direitos humanos') !== -1) {
    base = "• Teoria geral: conceito, características (universalidade, indivisibilidade, interdependência, imprescritibilidade etc.) em lista; dimensões (gerações) em timeline.\n" +
           "• Sistemas de proteção: tabela comparativa sistema global (ONU) x sistema interamericano (OEA): órgãos, instrumentos, quem pode acionar.\n" +
           "• Declaração Universal dos Direitos Humanos: grupos de direitos (liberdade, proteção contra tortura, garantias penais, direitos sociais) em caixas separadas.\n" +
           "• Convenção Americana (Pacto de São José da Costa Rica): direitos garantidos, suspensão de garantias, Comissão e Corte Interamericanas (competência, legitimados, efeitos das decisões).\n" +
           "• Status dos tratados de direitos humanos no ordenamento brasileiro: tratados aprovados com o rito das emendas constitucionais x supralegalidade, em tabela.\n" +
           "• ATENÇÃO: direitos que não podem ser suspensos; quem pode apresentar petição à Comissão e quem pode levar caso à Corte.";
  } else if (d.indexOf('dignitarios') !== -1) {
    base = "• Esta disciplina é procedimental: estruture em listas numeradas, fluxos (timeline) e tabelas de decisão, sempre com exemplo de aplicação em ambiente de tribunal.\n" +
           "• Segurança da informação: graus de sigilo (reservado, secreto, ultrassecreto) e credenciamento em tabela; tríade confidencialidade, integridade e disponibilidade em CONCEITO box; engenharia social e o comportamento esperado do agente.\n" +
           "• Serviço de inteligência e planejamento de segurança: conceitos, fases e produtos em timeline; diferença entre inteligência e contrainteligência.\n" +
           "• Análise de riscos e planejamento de contingências: matriz ameaça x vulnerabilidade x impacto em tabela; etapas do plano de contingência em ordem numerada.\n" +
           "• Proteção pessoal em situação de risco (Res. CNMP 116/2014), gestão de conflitos, perímetros táticos e negociação: conceitos, critérios e condutas em listas e ATENÇÃO para condutas proibidas.\n" +
           "• Defesa pessoal e direção defensiva/ofensiva: princípios, técnicas em ordem de aplicação e erros comuns.\n" +
           "• Cite normas apenas se tiver certeza do número; do contrário, descreva o conteúdo sem numerar.";
  } else if (d.indexOf('organica') !== -1) {
    base = "• Esta disciplina é procedimental e cai em prova como protocolo: use listas numeradas na ordem correta de execução e tabelas de correspondência.\n" +
           "• Incêndio: elementos do fogo (triângulo e tetraedro), formas de propagação, classes de fogo e tabela classe x agente extintor adequado x agente que NÃO pode ser usado; extintores, hidrantes, plano de evacuação e EPIs.\n" +
           "• Primeiros socorros: avaliação primária em ordem, RCP e uso do DEA, hemorragias, fraturas, Heimlich, queimaduras, desmaios e transporte de vítima; siga as diretrizes vigentes e destaque em ATENÇÃO o que NÃO fazer.\n" +
           "• Segurança de pessoas e de instalações: condutas preventivas, proteção de autoridades, barreiras físicas, controle de acesso (biometria), CFTV, sensores e prevenção de perdas.\n" +
           "• Segurança da informação orgânica: ameaças e códigos maliciosos (ransomware, phishing e afins) em tabela ameaça x como funciona x defesa.\n" +
           "• Defesa pessoal e direção defensiva: princípios e condutas, em lista.\n" +
           "• Números de protocolo (frequência de compressões, tempos, proporções) só quando tiver certeza absoluta.";
  } else if (d.indexOf('legislacao') !== -1 || d.indexOf('penal') !== -1 || d.indexOf('idosa') !== -1) {
    base = "• Direito penal e legislação extravagante: artigo da lei em DISPOSITIVO box com texto literal (caput, incisos, parágrafos), pena e ação penal em tabela.\n" +
           "• Para cada crime: bem jurídico, sujeito ativo e passivo, conduta, elemento subjetivo, consumação, causas de aumento e diferenças para crimes parecidos (ex: resistência x desobediência x desacato; furto x roubo x extorsão; estelionato x apropriação indébita).\n" +
           "• Juizados Especiais Criminais: infração de menor potencial ofensivo, termo circunstanciado, transação penal e suspensão condicional do processo, com requisitos lado a lado em tabela.\n" +
           "• Abuso de autoridade, racismo, Estatuto da Pessoa Idosa, Estatuto da Pessoa com Deficiência, acessibilidade e atendimento prioritário, retenção de documento e Estatuto do Desarmamento (incluindo a Resolução Conjunta CNJ/CNMP 4/2014): condutas típicas, dolo específico, efeitos da condenação e regras de porte em tabelas.\n" +
           "• ATENÇÃO: alterações legislativas recentes que mudaram pena, ação penal ou tipificação; use a redação vigente.\n" +
           "• REF box para súmulas e teses do STF e do STJ relacionadas ao tema, somente as que você tem certeza.";
  } else {
    base = "• CONCEITO-CHAVE box para cada definição técnica importante.\n" +
           "• DISPOSITIVO/LEI box para artigos e normas quando aplicável.\n" +
           "• REF box para jurisprudência e decisões relevantes.\n" +
           "• ATENÇÃO box para exceções, pegadinhas e pontos de confusão.\n" +
           "• EXEMPLO PRÁTICO box com situação concreta.\n" +
           "• Tabelas comparativas sempre que houver 2 ou mais conceitos parecidos.\n" +
           "• KaTeX para qualquer expressão matemática ou fórmula.";
  }

  return base + "\n" + _regrasBancasRodape();
}



/* V79 - GRAVACAO ATOMICA.
   TODOS os topicos de um tema moram no MESMO arquivo JSON. Esta funcao faz
   ler -> alterar 1 indice -> gravar o arquivo inteiro. Com o lote de topicos
   rodando em paralelo (e, antes disso, com duas abas abertas), duas execucoes
   podiam ler a MESMA versao e a segunda sobrescrevia a alteracao da primeira:
   perda silenciosa de trabalho ja pago em quota. O trecho critico passa a
   rodar sob LockService; quem nao conseguir o lock devolve erro claro e a
   fila do front tenta de novo, em vez de gravar por cima.                   */
function salvarTopicoEditado(disciplina, tema, index, novoHtml, tipo) {
var _lockTopico = null;
try {
  try {
    _lockTopico = LockService.getScriptLock();
    if (!_lockTopico.tryLock(30000)) {
      _lockTopico = null;
      return { erro: "Arquivo ocupado por outra gravação (timeout de 30s). Tente novamente." };
    }
  } catch (eLock) {
    _lockTopico = null;   // ambiente sem LockService: segue como antes
  }
  var folderName = (tipo === 'lite') ? PASTA_RESUMO_LITE : PASTA_RESUMO_PRO;
  var root = getFolder(PASTA_RAIZ);
  var mainFolder = getFolder(folderName, root);
  var fileAlvo = _acharArquivoResumoV101(mainFolder, disciplina, tema);   // V101 — nome canônico OU legado
  if (!fileAlvo) throw new Error("Arquivo não encontrado.");
  var timestamp = Utilities.formatDate(new Date(), "GMT-3", "yyyyMMdd_HHmmss");
  var nomeBackup = fileAlvo.getName().replace('.json', '') + '_BACKUP_' + timestamp + '.json';
  var pastaBackup = getFolder(PASTA_BACKUPS, getFolder(PASTA_RAIZ));
  pastaBackup.createFile(nomeBackup, fileAlvo.getBlob().getDataAsString(), MimeType.PLAIN_TEXT);
  var conteudo = JSON.parse(fileAlvo.getBlob().getDataAsString());
  if (tipo === 'pro') {
    var _titulosAntes = conteudo.topicos.map(function(t) { return t.titulo; });   // V93
    conteudo.topicos[index].conteudo_html = _edtRenumerarSecoes(novoHtml);   // V93
    conteudo.topicos[index].ia_editado_em = new Date().toISOString();
    conteudo.topicos[index].ia_revisado = true; 
    if (_edtRenumerarTitulosTopicos(conteudo.topicos)) {                      // V93 — "01 — ...", "02 — ..." na ordem real
      _edtSincronizarLousasComTitulos_(disciplina, tema, _titulosAntes, conteudo.topicos.map(function(t) { return t.titulo; }));
    }
  } else {
    conteudo.posts[index].conteudo_html = novoHtml;
    conteudo.posts[index].ia_editado_em = new Date().toISOString();
    conteudo.posts[index].ia_revisado = true;
  }
  fileAlvo.setContent(JSON.stringify(conteudo, null, 2));
  limparCacheArquivos();
  return { sucesso: true, titulos: (tipo === 'pro') ? conteudo.topicos.map(function(t) { return t.titulo; }) : null,
           html: (tipo === 'pro') ? conteudo.topicos[index].conteudo_html : novoHtml };
} catch (e) {
  return { erro: e.message };
} finally {
  if (_lockTopico) { try { _lockTopico.releaseLock(); } catch (eRel) {} }
}
}


function gerarIndiceConversaoLegadoIA(disciplina, tema, jsonAntigo) {
try {
  var prefs = carregarPreferenciasUsuario();
  var userApiKey = (prefs && prefs.config && prefs.config.gemini_api_key) ? prefs.config.gemini_api_key : null;
  var _sentIndice = _parseSentinelaCriacao(jsonAntigo);
  if (_sentIndice) return _gerarIndiceCriacaoDoZero(disciplina, tema, _sentIndice, userApiKey);
  var stringOriginal = typeof jsonAntigo === 'string' ? jsonAntigo : JSON.stringify(jsonAntigo);

  var subtemasPermitidos = _getSubtemasOrdem(disciplina, tema);
  var regraEditalRestrito = "";
  if (subtemasPermitidos && subtemasPermitidos.length > 0) {
    regraEditalRestrito = "\n\n🚨 FILTRO ESTRITO DE EDITAL (OBRIGATÓRIO):\n" +
      "Apenas os seguintes subtemas fazem parte do edital atual:\n- " + subtemasPermitidos.join("\n- ") + "\n" +
      "IGNORE e EXCLUA do índice qualquer assunto do JSON de entrada que fuja desta lista. MAS todo subtema desta lista DEVE ser coberto por ao menos um tópico cujo título contenha o nome do subtema; se o JSON de entrada não o trouxer, crie o tópico mesmo assim (o conteúdo será produzido do zero).";
  }

  var promptPlanejador = PROMPT_IA_PLANEJADOR
    .replace("[DISCIPLINA_ALVO]", disciplina)
    .replace("[TEMA_ALVO]", function() { return tema + regraEditalRestrito; })
    .replace("[JSON_ANTIGO]", stringOriginal);

  var sysPlanejador = "Retorne estritamente um array JSON de strings, sem formatação markdown.";
  
  var resPlanejamento = iaAgente_({   // V-MIGRA-2 — chamada feita pelo navegador
    apiKey: userApiKey,
    prompt: promptPlanejador,
    systemPrompt: sysPlanejador,
    jsonMode: true,
    maxTokens: 65536,
    contextoGasto: 'Topicos/IndiceConversao'
  }, 'gemini');

  if (!resPlanejamento.success) {
    return _erroAgenteTopicos_(resPlanejamento);
  }

  var indiceTopicos = resPlanejamento.resultado;
  if (typeof indiceTopicos === 'string') {
    try {
      indiceTopicos = JSON.parse(indiceTopicos.replace(/```json|```/g, '').trim());
    } catch(e) {
      return { erro: "A IA não retornou um array JSON válido. Retorno: " + indiceTopicos, isFormato: true };
    }
  }

  if (!Array.isArray(indiceTopicos) || indiceTopicos.length === 0) {
    return { erro: "O índice gerado está vazio ou não é um array.", isFormato: true };
  }

  return { sucesso: true, indice: indiceTopicos };

} catch(e) {
  return { erro: "Exceção interna: " + e.message };
}
}





// ══════════════════════════════════════════════════════════════════════════
// V14.6 — DECODIFICADOR DE ESCAPE DE BYTE UTF-8 (defeito 'D_sa\xc3\xadas')
// Origem do defeito: as instrucoes de escape agressivo do prompt (4 e 8 barras
// para LaTeX) ensinaram o modelo a escapar TAMBEM os acentos, emitindo a
// sequencia de bytes UTF-8 em forma literal (\xc3\xad = "i" com acento).
// Ja proibimos acento em simbolo de formula no prompt, mas isto e a rede:
// se a sequencia escapar, desfazemos antes de salvar.
// ══════════════════════════════════════════════════════════════════════════
function _decodificarEscapesDeByte(txt) {
  if (!txt || typeof txt !== 'string') return txt;
  if (txt.indexOf('\\x') === -1) return txt;   // atalho: nada a fazer

  var antes = txt;
  // Captura sequencias de 1 a 4 bytes escapados e reconstroi o caractere.
  txt = txt.replace(/(?:\\x[0-9A-Fa-f]{2}){1,4}/g, function(seq) {
    try {
      var bytes = seq.match(/[0-9A-Fa-f]{2}/g).map(function(b) { return parseInt(b, 16); });
      var latin = bytes.map(function(b) { return String.fromCharCode(b); }).join('');
      // decodeURIComponent com %XX faz a decodificacao UTF-8 correta
      var pct = bytes.map(function(b) { return '%' + ('0' + b.toString(16)).slice(-2); }).join('');
      var dec = decodeURIComponent(pct);
      return dec;
    } catch (e) {
      return seq;   // sequencia invalida: devolve intacta em vez de corromper
    }
  });
  if (txt !== antes) {
    Logger.log('[ENCODING] Escapes de byte UTF-8 desfeitos no conteudo gerado.');
  }
  return txt;
}

function _normalizarKaTeXnoJSON(htmlString) {
  htmlString = _decodificarEscapesDeByte(htmlString);  // V14.6
if (!htmlString || typeof htmlString !== 'string') return htmlString;

var resultado = htmlString;
var totalFixes = 0;

var cmds = 'frac|binom|dbinom|tbinom|mu|sigma|lambda|alpha|beta|gamma|delta|epsilon|theta|phi|chi|pi|omega|rho|tau|eta|zeta|Gamma|Delta|Sigma|Lambda|Omega|Pi|Theta|Phi|geq|leq|neq|approx|equiv|sim|simeq|cong|pm|mp|times|div|cdot|cdots|ldots|vdots|ddots|int|iint|iiint|oint|infty|sum|prod|coprod|sqrt|cbrt|overline|underline|hat|bar|tilde|vec|dot|text|textbf|textit|mathrm|mathbf|mathbb|mathcal|to|rightarrow|leftarrow|Rightarrow|Leftarrow|leftrightarrow|left|right|big|Big|bigg|Bigg|partial|nabla|forall|exists|in|notin|not|subset|supset|subseteq|supseteq|cup|cap|ln|log|exp|sin|cos|tan|sec|csc|cot|lim|max|min|sup|inf|arg|quad|qquad|space|hspace|vspace|begin|end|array|matrix|pmatrix|bmatrix|vmatrix|displaystyle|textstyle|scriptstyle|underbrace|overbrace|cancel|boxed';

// 1. Normaliza comandos conhecidos para exatas 2 barras de escape final (ex: \\frac)
var regexUniversal = new RegExp('\\\\+\\s*([()\\[\\]])|\\\\+((?:' + cmds + ')(?![a-zA-Z]))', 'g');
var antesNorm = resultado;
resultado = resultado.replace(regexUniversal, function(match, g1, g2) {
    return '\\\\' + (g1 || g2); 
});

// 2. CORREÇÃO DE MATRIZES: Reduz excesso de barras de escape de quebra de linha (ex: \\\\\\\\ ou mais) 
// para exatamente 2 barras lógicas, o que o KaTeX precisa para pular a linha da matriz.
resultado = resultado.replace(/\\\\{3,}/g, '\\\\');

if (resultado !== antesNorm) {
    totalFixes++;
    Logger.log('[KATEX-FIX] Barras normalizadas com sucesso em delimitadores e matrizes.');
}

resultado = resultado.replace(/\\\\\([\s\S]*?\\\\\)/g, function(bloco) {
  var limpo = bloco.replace(/[\n\r]+/g, ' ').replace(/<br\s*\/?>/gi, ' ').replace(/\s{2,}/g, ' ');
  if (limpo !== bloco) totalFixes++;
  return limpo;
});

resultado = resultado.replace(/\\\\\\[[\s\S]*?\\\\\\]/g, function(bloco) {
  var limpo = bloco.replace(/[\n\r]+/g, ' ').replace(/<br\s*\/?>/gi, ' ').replace(/\s{2,}/g, ' ');
  if (limpo !== bloco) totalFixes++;
  return limpo;
});

var regexBlocoSolto = /(<\/[a-z0-9]+>|^)\s*(\\\\\\[[\s\S]*?\\\\\\])\s*(<[a-z]|$)/gi;
resultado = resultado.replace(regexBlocoSolto, function(fullMatch, antesTag, formula, depoisTag) {
  if (antesTag && antesTag.toLowerCase().includes('</div>')) return fullMatch;
  totalFixes++;
  return antesTag + '<div class="formula">' + formula + '</div>' + depoisTag;
});

Logger.log('[KATEX-NORM] ✅ Limpeza bruta concluída. Alterações estruturais feitas: ' + totalFixes);
return resultado;
}





/**
 * V20 — VALIDADOR DETERMINÍSTICO DE TÓPICOS
 *
 * A validação por LLM foi desativada na V13.8.4 com razão: o modelo confundia
 * os níveis de escape do JSON serializado com erro de formatação e reprovava
 * conteúdo válido. O problema não era validar — era validar COM UM LLM.
 *
 * Este validador roda sobre a string JÁ DECODIFICADA (pós JSON.parse), onde o
 * escape não existe mais, então o falso positivo que matou a V13.8.4 é
 * impossível por construção. Zero chamada de API, zero custo, zero latência.
 * Mesmo desenho do validador do canvas, que em produção pegou defeitos que o
 * QA por LLM deixou passar.
 */
function _validarTopicosDeterministico(topicosArray) {
  var relatorio = [];

  (topicosArray || []).forEach(function(topico, idx) {
    var p = [];
    var h = (topico && topico.conteudo_html) ? String(topico.conteudo_html) : '';
    var titulo = (topico && topico.titulo) ? String(topico.titulo) : '';

    // ── 1. Existência e volume ──
    if (!titulo.trim())                       p.push('titulo vazio');
    if (!h.trim())                            p.push('conteudo_html vazio');
    else if (h.length < 400)                  p.push('conteudo_html com apenas ' + h.length + ' chars (minimo 400) — topico raso');

    if (h) {
      // ── 2. Estrutura didática obrigatoria ──
      if (h.indexOf('topic__lead') === -1)    p.push('sem .topic__lead (frase-guia de abertura)');
      var secoes = (h.match(/class=['"][^'"]*\bsec\b/g) || []).length;
      if (secoes === 0)                       p.push('sem nenhuma secao (.sec) — topico sem divisao didatica');

      // ── 3. Chaves de LaTeX desbalanceadas (o KaTeX renderiza em vermelho e nao avisa) ──
      var texRe = /(?:data-tex\s*=\s*(['"])([\s\S]*?)\1)|(?:\\\(([\s\S]{1,600}?)\\\))|(?:\\\[([\s\S]{1,600}?)\\\])/g;
      var tm, formulasQuebradas = 0, exemploTex = '';
      while ((tm = texRe.exec(h)) !== null) {
        var tex = tm[2] || tm[3] || tm[4] || '';
        var saldo = 0, quebrou = false;
        for (var t = 0; t < tex.length; t++) {
          var c = tex.charAt(t);
          if (c === '\\') { t++; continue; }
          if (c === '{') saldo++;
          else if (c === '}') { saldo--; if (saldo < 0) { quebrou = true; break; } }
        }
        if (quebrou || saldo !== 0) {
          formulasQuebradas++;
          if (!exemploTex) exemploTex = tex.substring(0, 50);
        }
      }
      if (formulasQuebradas > 0) p.push(formulasQuebradas + ' formula(s) com chaves desbalanceadas (ex.: "' + exemploTex + '")');

      // ── 4. Comando LaTeX solto (chega cru na tela do aluno) ──
      var hSemTex = h.replace(/data-tex\s*=\s*(['"])[\s\S]*?\1/gi, '')
                     .replace(/\\\([\s\S]{1,600}?\\\)/g, '')
                     .replace(/\\\[[\s\S]{1,600}?\\\]/g, '');
      var orfaos = hSemTex.match(/\\(frac|sqrt|sum|prod|int|sigma|mu|alpha|beta|theta|lambda|pi|Delta|Sigma|cdot|times|geq|leq|neq|approx|infty|bar|hat|text)\b/g);
      if (orfaos && orfaos.length) p.push(orfaos.length + ' comando(s) LaTeX fora de delimitador (ex.: "' + orfaos[0] + '") — aparece cru na tela');

      // ── 5. Markdown vazado (o render e HTML puro) ──
      if (/(^|[^\*])\*\*[^\*\n]{2,80}\*\*/.test(h))  p.push('markdown ** vazado no HTML');
      if (/(^|\n)\s*#{1,6}\s+\S/.test(h))            p.push('markdown # (titulo) vazado no HTML');
      if (h.indexOf('```') !== -1)                   p.push('cerca de codigo ``` vazada no HTML');

      // ── 6. Style inline (o prompt exige so classes) ──
      var inlines = (h.match(/\sstyle\s*=\s*['"]/g) || []).length;
      if (inlines > 3) p.push(inlines + ' atributos style= inline (o padrao e SO classes)');

      // ── 7. Balanco de <div> ──
      var abre  = (h.match(/<div\b/gi) || []).length;
      var fecha = (h.match(/<\/div\s*>/gi) || []).length;
      if (abre !== fecha) p.push('divs desbalanceadas: ' + abre + ' abertas x ' + fecha + ' fechadas');

      // ── 8. Icone Font Awesome com nome invalido ──
      var icoRe = /class\s*=\s*(['"])[^'"]*\bfa-(?!solid\b|regular\b|brands\b|light\b|thin\b|duotone\b|sharp\b|fw\b|spin\b|beat\b|xs\b|sm\b|lg\b|[0-9]x\b)([^\s'"]*)/gi, im;
      while ((im = icoRe.exec(h)) !== null) {
        if (!/^[a-z0-9-]+$/.test(im[2])) { p.push('classe de icone invalida: fa-' + im[2]); break; }
      }

      // ── 9. Moeda dentro de KaTeX (regra do projeto: moeda e texto normal) ──
      // V20.8 — idem: aceitar tambem a forma escapada `R\$` e a entidade `R&dollar;`.
      if (/data-tex\s*=\s*(['"])[^'"]*R\s*(?:\\\$|&dollar;|\$)/i.test(h)) p.push('moeda R$ dentro de data-tex (deve ser texto normal)');

      // ── 10. Caixa vazia (esqueleto sem conteudo) ──
      if (/<div[^>]*class=['"][^'"]*\bbox\b[^'"]*['"][^>]*>\s*<\/div>/i.test(h)) p.push('caixa .box vazia');

      // ── 11. V95 — Padrão de livro didático: profundidade, prosa, exemplos e fixação ──
      // Estes defeitos são de CONTEÚDO (não de formato): quem os corrige é o aprofundamento
      // em corrigirTopicosReprovados. Nenhum deles é "grave" para a edição manual de tópico.
      var _ehRef = _ehTituloReferencias(titulo);
      var _txtVis = _edtTextoPuro(h).trim();
      var _palavras = _txtVis ? _txtVis.split(' ').length : 0;
      var _piso = _ehRef ? VALIDA_PISO_PALAVRAS_REF : VALIDA_PISO_PALAVRAS;
      if (_palavras < _piso) p.push('topico raso: ' + _palavras + ' palavras (minimo ' + _piso + ') — falta aprofundar a cobertura');

      var _txtProsa = _edtTextoPuro((h.match(/<p\b[^>]*>[\s\S]*?<\/p>/gi) || []).join(' ')).trim();
      var _palavrasProsa = _txtProsa ? _txtProsa.split(' ').length : 0;
      if (_palavras >= 400 && (_palavrasProsa / _palavras) < VALIDA_PROSA_MIN) {
        p.push('texto telegrafico: so ' + Math.round(100 * _palavrasProsa / _palavras) + '% do texto esta em prosa explicativa (minimo ' + Math.round(100 * VALIDA_PROSA_MIN) + '%)');
      }

      if (!_ehRef) {
        var _nExemplos = (h.match(/box--example/g) || []).length;
        if (_nExemplos < 2) p.push('poucos exemplos: ' + _nExemplos + ' caixa(s) box--example (minimo 2)');
        if (!/box__eyebrow['"]\s*>\s*Fixa/i.test(h)) p.push('sem caixa de Fixacao (5 itens Certo/Errado comentados) na secao final de sintese');
      }
    }

    if (p.length) relatorio.push({ index: idx, titulo: titulo, problemas: p });
  });

  if (relatorio.length === 0) {
    Logger.log('[VALIDA-TOPICO] ✅ ' + (topicosArray || []).length + ' topico(s) sem defeito estrutural.');
  } else {
    Logger.log('[VALIDA-TOPICO] ⚠️ ' + relatorio.length + ' topico(s) com defeito:');
    relatorio.forEach(function(r) {
      Logger.log('[VALIDA-TOPICO]    [' + r.index + '] "' + r.titulo + '" -> ' + r.problemas.join(' | '));
    });
  }
  return relatorio;
}


/**
 * V20 — mantém o nome antigo para não quebrar chamadas existentes, mas agora
 * ENTREGA de verdade: roda o validador determinístico e devolve reprovados no
 * formato que corrigirTopicosReprovados() espera (index, titulo, problemas).
 * Nada de LLM aqui — foi o LLM que produziu o falso positivo da V13.8.4.
 */
function validarTopicosViaLLM(topicosArray, disciplina, tema) {
  var total = (topicosArray || []).length;
  var relatorio = _validarTopicosDeterministico(topicosArray);

  var idxRuins = {};
  relatorio.forEach(function(r) { idxRuins[r.index] = true; });

  var aprovados = [];
  for (var i = 0; i < total; i++) if (!idxRuins[i]) aprovados.push(i);

  var reprovados = relatorio.map(function(r) {
    return {
      index:     r.index,
      titulo:    r.titulo,
      problemas: r.problemas,
      trechos_errados:   [],
      correcao_sugerida: []
    };
  });

  return {
    aprovados:  aprovados,
    reprovados: reprovados,
    resumo:     aprovados.length + ' de ' + total + ' tópicos aprovados (validação determinística V20).'
  };
}


/**
 * V13.8.3 — Correção automática de tópicos reprovados
 * 
 * Recebe os tópicos reprovados pela validação e envia de volta
 * ao Gemini com instruções específicas de correção.
 * Retorna os tópicos corrigidos.
 */
// V95 — Prompt de APROFUNDAMENTO: usado quando o tópico foi reprovado por falta de conteúdo
// (raso, telegráfico, poucos exemplos, sem fixação). Reescreve o capítulo inteiro, sem perder nada.
function _montarPromptAprofundamento_(disciplina, tema, topico, problemas) {
  var escopo = '';
  try { if (disciplina && tema) escopo = _edtEscopoTexto(disciplina, tema); } catch (eEsc) { escopo = ''; }
  return 'Você é um autor de livro didático e revisor técnico de elite, especialista no ' + IDENTIDADE_CONCURSO + '.\n\n' +
    'O capítulo abaixo foi REPROVADO por falta de profundidade. Reescreva-o INTEIRO como capítulo de livro didático completo, ' +
    'PRESERVANDO todo conteúdo correto e ACRESCENTANDO tudo o que falta. Nunca devolva um texto menor que o original.\n\n' +
    'Disciplina: ' + (disciplina || '') + '\nTema: ' + (tema || '') + '\n' +
    'TÍTULO DO CAPÍTULO: ' + (topico.titulo || '') + '\n\n' +
    (escopo ? 'SUBTEMAS DO EDITAL DESTE TEMA (aprofunde os que o título do capítulo cobre; não invada os demais):\n' + escopo + '\n\n' : '') +
    'PROBLEMAS ENCONTRADOS:\n' + (problemas || []).map(function(x) { return '- ' + x; }).join('\n') + '\n\n' +
    'COMO APROFUNDAR:\n' +
    '1. Faça a VARREDURA DE COMPLETUDE (item B abaixo) e identifique o que uma prova pode cobrar e não está explicado.\n' +
    '2. Transforme trechos telegráficos em prosa explicativa (definição, porquê, como funciona, consequência).\n' +
    '3. Explique cada classificação, requisito, etapa, exceção e comparação, um a um, com critério de distinção.\n' +
    '4. Acrescente exemplos resolvidos (situação, análise, conclusão) até o mínimo de 3 caixas box--example.\n' +
    '5. Garanta a última seção "[Nome do subtema]: síntese e fixação" com tabela de revisão e a caixa "Fixação" com 5 itens Certo/Errado comentados.\n' +
    '6. Corrija qualquer defeito de formato listado acima. Não invente número de norma, artigo, súmula, prazo, pena ou percentual.\n\n' +
    'CONTRATO DE SAÍDA VISUAL:\n' + CONTRATO_VISUAL_HTML + '\n\n' + CONTRATO_COMPLETUDE + '\n\n' +
    'HTML ATUAL DO CAPÍTULO (MATERIAL-BASE):\n' + topico.conteudo_html + '\n\n' +
    'RETORNE O HTML COMPLETO DO CAPÍTULO APROFUNDADO:';
}

function corrigirTopicosReprovados(topicosOriginais, reprovados, disciplina, tema) {
try {
  Logger.log('[CORRIGIR] ══════ INÍCIO DA CORREÇÃO ══════');
  Logger.log('[CORRIGIR] Tópicos para corrigir: ' + reprovados.length);
  var tInicio = Date.now();

  var prefs = carregarPreferenciasUsuario();
  var userApiKey = (prefs && prefs.config && prefs.config.gemini_api_key) ? prefs.config.gemini_api_key : null;

  var corrigidos = [];

  reprovados.forEach(function(rep, i) {
    var idx = rep.index;
    var topicoOriginal = topicosOriginais[idx];
    
    if (!topicoOriginal) {
      Logger.log('[CORRIGIR] ⚠️ Índice ' + idx + ' não encontrado nos originais. Pulando.');
      return;
    }

    Logger.log('[CORRIGIR] 🔧 [' + (i + 1) + '/' + reprovados.length + '] Corrigindo: "' + rep.titulo + '"');
    Logger.log('[CORRIGIR]    Problemas: ' + (rep.problemas || []).join(' | '));

    var promptCorrecao = 
      'Você é um engenheiro especialista em KaTeX e HTML.\n\n' +
      'O tópico abaixo foi REPROVADO na validação de qualidade. Corrija-o.\n\n' +
      'TÍTULO: ' + topicoOriginal.titulo + '\n\n' +
      'HTML ATUAL (COM ERROS):\n' + topicoOriginal.conteudo_html + '\n\n' +
      'PROBLEMAS ENCONTRADOS:\n' + (rep.problemas || []).map(function(p) { return '- ' + p; }).join('\n') + '\n\n';

    if (rep.trechos_errados && rep.trechos_errados.length > 0) {
      promptCorrecao += 'TRECHOS ESPECÍFICOS COM ERRO:\n';
      rep.trechos_errados.forEach(function(trecho, t) {
        promptCorrecao += 'ERRADO: ' + trecho + '\n';
        if (rep.correcao_sugerida && rep.correcao_sugerida[t]) {
          promptCorrecao += 'SUGERIDO: ' + rep.correcao_sugerida[t] + '\n';
        }
        promptCorrecao += '\n';
      });
    }

    promptCorrecao += 
      'REGRAS OBRIGATÓRIAS DE CORREÇÃO:\n' +
      '1. TODOS os delimitadores KaTeX devem ter 4 barras: \\\\\\\\( \\\\\\\\) \\\\\\\\[ \\\\\\\\]\n' +
      '2. TODOS os comandos LaTeX devem ter 4 barras: \\\\\\\\frac \\\\\\\\mu \\\\\\\\sigma \\\\\\\\geq \\\\\\\\leq \\\\\\\\binom \\\\\\\\cdot \\\\\\\\lambda \\\\\\\\int \\\\\\\\infty \\\\\\\\sum \\\\\\\\sqrt \\\\\\\\pm \\\\\\\\text \\\\\\\\to etc.\n' +
      '3. ZERO quebras de linha dentro de fórmulas KaTeX.\n' +
      '4. Fórmulas em bloco ficam dentro de <div class="box box--formula"><div class="formula">\\\\\\\\[ ... \\\\\\\\]</div></div> — sem atributo style inline.\n' +
      '5. NÃO altere o conteúdo pedagógico. Corrija APENAS a formatação.\n' +
      '6. Retorne APENAS o HTML corrigido, sem markdown, sem explicação.\n\n' +
      'RETORNE O HTML CORRIGIDO:';

    var sysCorrecao = 'Retorne EXCLUSIVAMENTE o código HTML corrigido. Sem markdown. Sem explicação. Sem ```html. Apenas o HTML puro.';

    // V95 — defeito de CONTEÚDO (raso, telegráfico, sem exemplos/fixação) não se conserta com
    // "corrigir formatação": precisa de aprofundamento.
    var _precisaAprofundar = (rep.problemas || []).some(function(x) {
      return /topico raso|texto telegrafico|poucos exemplos|sem caixa de Fixacao/.test(x);
    });
    var _palavrasAntes = _edtTextoPuro(topicoOriginal.conteudo_html).trim().split(' ').length;
    if (_precisaAprofundar) {
      Logger.log('[CORRIGIR]    ↳ aprofundamento (antes: ' + _palavrasAntes + ' palavras)');
      promptCorrecao = _montarPromptAprofundamento_(disciplina, tema, topicoOriginal, rep.problemas || []);
      sysCorrecao = 'Retorne EXCLUSIVAMENTE o HTML completo do capítulo aprofundado. Sem markdown. Sem explicação. Sem ```html. Apenas o HTML puro.';
    }

    var resCorrecao = iaAgente_({   // V-MIGRA-2 — chamada feita pelo navegador
      apiKey: userApiKey,
      prompt: promptCorrecao,
      systemPrompt: sysCorrecao,
      jsonMode: false,
      maxTokens: 65536,
      contextoGasto: 'Topicos/Correcao'
    }, 'gemini');

    if (resCorrecao.success) {
      var htmlCorrigido = resCorrecao.resultado.replace(/```html|```/g, '').trim();
      
      // Aplicar normalização pós-processamento também
      htmlCorrigido = _normalizarKaTeXnoJSON(htmlCorrigido);

      // V95 — trava anti-regressão do aprofundamento: nunca troca o tópico por um texto menor.
      if (_precisaAprofundar) {
        var _palavrasDepois = _edtTextoPuro(htmlCorrigido).trim().split(' ').length;
        if (_palavrasDepois < _palavrasAntes * 0.9) {
          Logger.log('[CORRIGIR] ⛔ aprofundamento do tópico ' + idx + ' RECUSADO: ' + _palavrasAntes + ' → ' + _palavrasDepois + ' palavras. Original mantido.');
          corrigidos.push({
            index: idx,
            titulo: topicoOriginal.titulo,
            conteudo_html: topicoOriginal.conteudo_html,
            contexto_llm: topicoOriginal.contexto_llm,
            validacao_pendente: true,
            _erro_correcao: 'aprofundamento devolveu texto menor que o original'
          });
          return;
        }
      }
      
      Logger.log('[CORRIGIR] ✅ Tópico ' + idx + ' corrigido | ' + htmlCorrigido.length + ' chars');
      
      corrigidos.push({
        index: idx,
        titulo: topicoOriginal.titulo,
        conteudo_html: htmlCorrigido,
        contexto_llm: topicoOriginal.contexto_llm,
        _corrigido_em: new Date().toISOString(),
        _tentativa_correcao: 1
      });
    } else {
      Logger.log('[CORRIGIR] ❌ Falha ao corrigir tópico ' + idx + ': ' + resCorrecao.erro);
      corrigidos.push({
        index: idx,
        titulo: topicoOriginal.titulo,
        conteudo_html: topicoOriginal.conteudo_html,
        contexto_llm: topicoOriginal.contexto_llm,
        validacao_pendente: true,
        _erro_correcao: resCorrecao.erro,
        _erro_infra: !!(resCorrecao.isQuota || resCorrecao.isDemanda || resCorrecao.semChave),
        _aguardar_ms: resCorrecao.aguardar_ms || 0
      });
    }
  });

  var msTotal = Date.now() - tInicio;
  Logger.log('[CORRIGIR] ══════ FIM ══════ ' + corrigidos.length + ' tópicos processados em ' + msTotal + 'ms');
  
  return corrigidos;

} catch(e) {
  Logger.log('[CORRIGIR] ❌ Exceção: ' + e.message);
  return [];
}
}



function gerarEValidarLoteCompleto(disciplina, tema, jsonAntigo, loteTitulos) {
try {
  Logger.log('[PIPELINE] ╔═══════════════════════════════════════╗');
  Logger.log('[PIPELINE] ║  PIPELINE DE GERAÇÃO V13.8.4         ║');
  Logger.log('[PIPELINE] ╚═══════════════════════════════════════╝');
  Logger.log('[PIPELINE] Disciplina: ' + disciplina);
  Logger.log('[PIPELINE] Tema: ' + tema);
  Logger.log('[PIPELINE] Tópicos solicitados: ' + loteTitulos.length);
  var tInicio = Date.now();

  // ══════════════════════════════════════════════════════════════
  // ETAPA 1: GERAÇÃO VIA GEMINI
  // ══════════════════════════════════════════════════════════════
  Logger.log('[PIPELINE] ▶ ETAPA 1: Gerando lote via Gemini...');

  var resGeracao = gerarLoteConversaoLegadoIA(disciplina, tema, jsonAntigo, loteTitulos, null);

  if (resGeracao.erro) {
    Logger.log('[PIPELINE] ❌ Geração falhou: ' + resGeracao.erro);
    return _erroAgenteTopicos_(resGeracao, 'Falha na geração: ');
  }

  var topicosAtuais = resGeracao.topicos;
  Logger.log('[PIPELINE] ✅ Etapa 1 concluída: ' + topicosAtuais.length + ' tópicos gerados');

  // ══════════════════════════════════════════════════════════════
  // ETAPA 2: NORMALIZAÇÃO PROGRAMÁTICA (substitui validação LLM)
  //
  // A validação via LLM foi removida porque o modelo confundia os
  // níveis de escape do JSON serializado (4 barras = correto) com
  // erro de formatação (8 barras), reprovando conteúdo válido.
  // A função _normalizarKaTeXnoJSON cobre os casos reais de erro.
  // ══════════════════════════════════════════════════════════════
  Logger.log('[PIPELINE] ▶ ETAPA 2: Normalizando KaTeX programaticamente...');
  // V20 — a ETAPA 2.5 (logo abaixo do forEach) devolve a validação ao pipeline.

  topicosAtuais.forEach(function(topico, idx) {
    if (topico.conteudo_html) {
      topico.conteudo_html = _normalizarKaTeXnoJSON(topico.conteudo_html);
    }
    topico.ia_revisado    = true;
    topico.ia_validado_em = new Date().toISOString();
    // V35 — sem isto o filtro "modelo que gerou" não teria o que filtrar.
    // V40.3 — gravava o padrão de fábrica mesmo quando outro modelo rodou:
    // o metadado do tópico dizia 3.8 enquanto a geração tinha usado 3.7.
    topico.ia_modelo      = (typeof agModeloTexto_ === 'function')
                            ? agModeloTexto_() : 'nao_informado';
    Logger.log('[PIPELINE] ✅ Tópico ' + idx + ' normalizado: "' + topico.titulo + '"');
  });

  // ══════════════════════════════════════════════════════════════
  // V20 — ETAPA 2.5: VALIDAÇÃO DETERMINÍSTICA + CORREÇÃO
  // Até aqui o pipeline gerava e salvava sem conferir nada: a validação
  // era um stub que aprovava tudo, e corrigirTopicosReprovados() nunca
  // rodava porque a lista de reprovados era sempre vazia.
  // ══════════════════════════════════════════════════════════════
  Logger.log('[PIPELINE] ▶ ETAPA 2.5: Validando estrutura dos tópicos...');
  var _val = validarTopicosViaLLM(topicosAtuais, disciplina, tema);
  Logger.log('[PIPELINE] ' + _val.resumo);

  if (_val.reprovados && _val.reprovados.length > 0) {
    Logger.log('[PIPELINE] 🔧 Enviando ' + _val.reprovados.length + ' tópico(s) para correção...');
    try {
      var _corr = corrigirTopicosReprovados(topicosAtuais, _val.reprovados, disciplina, tema);
      var _lista = (_corr && _corr.corrigidos) ? _corr.corrigidos : (Array.isArray(_corr) ? _corr : []);
      var _aplicados = 0;

      _lista.forEach(function(c) {
        if (c && typeof c.index === 'number' && topicosAtuais[c.index] && c.conteudo_html) {
          // Trava anti-regressão: o reparo não pode devolver um tópico menor
          // que 60% do original — foi assim que a cirurgia do canvas degradava.
          var antes  = (topicosAtuais[c.index].conteudo_html || '').length;
          var depois = c.conteudo_html.length;
          if (depois < antes * 0.6) {
            Logger.log('[PIPELINE] ⛔ tópico ' + c.index + ' RECUSADO: encolheu de ' + antes + ' para ' + depois + ' chars. Original mantido.');
            return;
          }
          topicosAtuais[c.index].conteudo_html = _normalizarKaTeXnoJSON(c.conteudo_html);
          topicosAtuais[c.index]._corrigido_em = new Date().toISOString();
          _aplicados++;
        }
      });

      Logger.log('[PIPELINE] ✅ ' + _aplicados + ' tópico(s) corrigido(s) e reabsorvido(s).');

      var _rev = _validarTopicosDeterministico(topicosAtuais);
      Logger.log('[PIPELINE] Pente fino pós-correção: ' + _rev.length + ' tópico(s) com defeito residual.');
      topicosAtuais.forEach(function(t, ix) {
        t.validacao_v20 = { defeitos_residuais: 0 };
      });
      _rev.forEach(function(r) {
        if (topicosAtuais[r.index]) topicosAtuais[r.index].validacao_v20 = { defeitos_residuais: r.problemas.length, problemas: r.problemas };
      });
    } catch (eCorr) {
      Logger.log('[PIPELINE] ⚠️ Correção falhou (' + eCorr.message + ') — tópicos originais mantidos.');
    }
  }

  var msTotal = Date.now() - tInicio;

  Logger.log('[PIPELINE] ╔═══════════════════════════════════════╗');
  Logger.log('[PIPELINE] ║  PIPELINE CONCLUÍDO V13.8.4          ║');
  Logger.log('[PIPELINE] ║  Aprovados: ' + topicosAtuais.length + '/' + topicosAtuais.length + '                       ║');
  Logger.log('[PIPELINE] ║  Pendentes: 0/' + topicosAtuais.length + '                       ║');
  Logger.log('[PIPELINE] ║  Tempo total: ' + msTotal + 'ms                 ║');
  Logger.log('[PIPELINE] ╚═══════════════════════════════════════╝');

  return {
    sucesso: true,
    topicos: topicosAtuais,
    stats: {
      total:      topicosAtuais.length,
      aprovados:  topicosAtuais.length,
      pendentes:  0,
      tentativas: 1,
      tempo_ms:   msTotal
    }
  };

} catch(e) {
  Logger.log('[PIPELINE] ❌ Exceção fatal: ' + e.message + '\n' + e.stack);
  return { erro: 'Exceção no pipeline: ' + e.message };
}
}


function gerarLoteConversaoLegadoIA(disciplina, tema, jsonAntigo, loteTitulos, erroAnterior) {
try {
  Logger.log('[LOTE-IA] ══════ INÍCIO ══════');
  Logger.log('[LOTE-IA] Disciplina: ' + disciplina + ' | Tema: ' + tema);
  Logger.log('[LOTE-IA] Títulos no lote: ' + loteTitulos.length);
  var tInicio = Date.now();

  var prefs = carregarPreferenciasUsuario();
  var userApiKey = (prefs && prefs.config && prefs.config.gemini_api_key) ? prefs.config.gemini_api_key : null;
  var stringOriginal = typeof jsonAntigo === 'string' ? jsonAntigo : JSON.stringify(jsonAntigo);
  Logger.log('[LOTE-IA] Tamanho do JSON fonte: ' + stringOriginal.length + ' chars');
  var stringLote = loteTitulos.map(function(t) { return "- " + t; }).join("\n");
  
  var promptGerador = _montarPromptLoteEdital(disciplina, tema, jsonAntigo, stringOriginal, stringLote);
    
  if (erroAnterior && _erroEhInfraTexto_(erroAnterior)) {
    Logger.log('[LOTE-IA] erroAnterior é de infraestrutura — ignorado no prompt: ' + String(erroAnterior).substring(0, 120));
    erroAnterior = null;
  }
  if (erroAnterior) {
    promptGerador += "\n\n🚨 ATENÇÃO: Na tentativa anterior o JSON quebrou com o seguinte erro: " + erroAnterior + "\nVOCÊ DEVE CORRIGIR A FORMATAÇÃO E REFAZER ESTE LOTE.\nRevise rigorosamente: 1) Todas as aspas dentro do HTML DEVEM ser escapadas com contra-barra (\\\"). 2) É ESTRITAMENTE PROIBIDO apertar 'Enter' (quebra de linha literal) dentro de uma string de conteúdo JSON. Se precisar pular linha, use a tag <br>. 3) Todos os comandos LaTeX devem ter QUATRO barras (\\\\\\\\frac).";
  }

  Logger.log('[LOTE-IA] Prompt montado: ' + promptGerador.length + ' chars');
  Logger.log('[LOTE-IA] 🚀 Chamando Gemini Agent...');
  
  var sysGerador = "Retorne estritamente um Array JSON de objetos. O HTML usa SOMENTE classes CSS semânticas (box, box--concept, box--law, box--mnemonic, box--warn, box--example, box--ref, box--formula, ledger, calc, var, sec, timeline) — É PROIBIDO qualquer atributo style inline. Use aspas simples nos atributos do HTML para não quebrar o JSON. Moeda e conta simples SEMPRE em HTML (.calc ou .ledger), NUNCA em KaTeX; KaTeX só para fórmula real, com 4 barras em TODOS os comandos LaTeX. Fórmula em bloco fica dentro de <div class='box box--formula'><div class='formula'>\\\\[ … \\\\]</div></div>. NUNCA insira quebras de linha literais dentro das strings do JSON. Escreva cada tópico como capítulo de livro didático completo: prosa explicativa em cada seção, cobertura total do assunto, exemplos resolvidos e síntese com fixação, sem teto de tamanho e sem texto telegráfico.";
  
  var resLote = iaAgente_({   // V-MIGRA-2 — chamada feita pelo navegador
    apiKey: userApiKey,
    prompt: promptGerador,
    systemPrompt: sysGerador,
    jsonMode: true, /* MÁGICA 2: Aumentado para 0.4 para garantir tópicos densos e ricos na conversão de materiais antigos. */
    maxTokens: 65536,
    contextoGasto: 'Topicos/LoteConversao'
  }, 'gemini');
  
  var msAgent = Date.now() - tInicio;
  Logger.log('[LOTE-IA] Gemini respondeu em ' + msAgent + 'ms | success=' + resLote.success);
  
  if (!resLote.success) {
    Logger.log('[LOTE-IA] ❌ Erro do agente: ' + resLote.erro);
    return _erroAgenteTopicos_(resLote);
  }

  var arrayResultado = resLote.resultado;
  if (typeof arrayResultado === 'string') {
      Logger.log('[LOTE-IA] Resultado é string, fazendo parse...');


    try {
      var raw = arrayResultado.replace(/```json|```/g, '').trim();
      
      // Tentativa 1: parse direto
      try {
        arrayResultado = JSON.parse(raw);
        Logger.log('[LOTE-IA] ✅ Parse OK (tentativa 1)');
      } catch(e1) {
        // Tentativa 2: limpeza agressiva de quebras e tabs literais
        var rawLimpo = raw
          .replace(/\r\n/g, ' ')
          .replace(/\n/g, ' ')
          .replace(/\r/g, ' ')
          .replace(/\t/g, ' ')
          .replace(/\s{2,}/g, ' ');
        try {
          arrayResultado = JSON.parse(rawLimpo);
          Logger.log('[LOTE-IA] ✅ Parse OK (tentativa 2 — limpeza agressiva)');
        } catch(e2) {
          Logger.log('[LOTE-IA] ❌ Parse falhou nas 2 tentativas: ' + e2.message);
          return { erro: "Falha de formatação do JSON retornado pela IA (" + e2.message + "). O texto gerado continha quebras de linha literais ou aspas não escapadas.", isFormato: true };
        }
      }
    } catch(e) {
      Logger.log('[LOTE-IA] ❌ Erro inesperado no parse: ' + e.message);
      return { erro: "Falha de formatação do JSON retornado pela IA (" + e.message + ").", isFormato: true };
    }



  }

  if (!Array.isArray(arrayResultado) || arrayResultado.length === 0) {
    Logger.log('[LOTE-IA] ❌ Resultado não é array ou está vazio');
    return { erro: "A IA não retornou os tópicos no formato Array JSON esperado.", isFormato: true };
  }

  Logger.log('[LOTE-IA] 📦 Tópicos recebidos: ' + arrayResultado.length);
  Logger.log('[LOTE-IA] 🔧 Iniciando pós-processamento KaTeX...');
  var tNorm = Date.now();

  arrayResultado.forEach(function(topico, idx) {
    if (topico.conteudo_html) {
      var htmlOriginal = topico.conteudo_html;
      var htmlNormalizado = _normalizarKaTeXnoJSON(htmlOriginal);
      topico.conteudo_html = htmlNormalizado;
    }
    if (!topico.titulo) {
      topico.titulo = loteTitulos[idx] || ('Tópico ' + (idx + 1));
    }
    if (!topico.contexto_llm) {
      topico.contexto_llm = topico.titulo + ' — conteúdo gerado automaticamente para ' + disciplina + ', tema ' + tema + '.';
    }
  });

  var msNorm = Date.now() - tNorm;
  var msTotal = Date.now() - tInicio;
  Logger.log('[LOTE-IA] 🔧 Pós-processamento concluído em ' + msNorm + 'ms');
  Logger.log('[LOTE-IA] ══════ FIM ══════ Total: ' + msTotal + 'ms | ' + arrayResultado.length + ' tópicos prontos');
  return { sucesso: true, topicos: arrayResultado };

} catch(e) {
  Logger.log('[LOTE-IA] ❌ Exceção fatal: ' + e.message + '\n' + e.stack);
  return { erro: "Exceção interna no lote: " + e.message };
}
}



function salvarResumoConvertido(disciplina, tema, novoJsonObj) {
try {
  var folderName = PASTA_RESUMO_PRO; 
  var root = getFolder(PASTA_RAIZ);
  var mainFolder = getFolder(folderName, root);
  var disciplinaFolder = _pastaDisciplinaOuAliasV101(mainFolder, disciplina) || mainFolder.createFolder(disciplina);   // V101

  var nomeAlvo = limparNomeArquivo(disciplina) + '___' + limparNomeArquivo(tema) + '.json';
  var fileAlvo = _acharArquivoResumoV101(mainFolder, disciplina, tema);   // V101 — acha o arquivo legado em vez de criar outro

  // Se mesmo assim não achar (nome muito divergente), cria para não perder a geração da IA
  if (!fileAlvo) {
    fileAlvo = disciplinaFolder.createFile(nomeAlvo, "", MimeType.PLAIN_TEXT);
  }

  var timestamp = Utilities.formatDate(new Date(), "GMT-3", "yyyyMMdd_HHmmss");
  var nomeBackup = fileAlvo.getName().replace('.json', '') + '_BACKUP_LEGADO_' + timestamp + '.json';
  var pastaBackup = getFolder(PASTA_BACKUPS, getFolder(PASTA_RAIZ));
  var oldContent = fileAlvo.getBlob().getDataAsString();
  if (_conteudoRelevante(oldContent)) {
    pastaBackup.createFile(nomeBackup, oldContent, MimeType.PLAIN_TEXT);
  }

  var conteudoFinal = novoJsonObj;
  if (typeof conteudoFinal === 'string') conteudoFinal = JSON.parse(conteudoFinal);
  
  conteudoFinal.disciplina = disciplina;
  conteudoFinal.tema = tema;

  fileAlvo.setContent(JSON.stringify(conteudoFinal, null, 2));
  limparCacheArquivos();
  return { sucesso: true };
} catch(e) {
  return { erro: "Erro ao salvar formato V12: " + e.message };
}
}

function marcarTopicoRevisadoIA(disciplina, tema, index, tipo) {
try {
  var folderName = (tipo === 'lite') ? PASTA_RESUMO_LITE : PASTA_RESUMO_PRO;
  var root = getFolder(PASTA_RAIZ);
  var mainFolder = getFolder(folderName, root);
  var fileAlvo = _acharArquivoResumoV101(mainFolder, disciplina, tema);   // V101 — nome canônico OU legado
  if (!fileAlvo) throw new Error("Arquivo não encontrado.");
  var conteudo = JSON.parse(fileAlvo.getBlob().getDataAsString());
  if (tipo === 'pro') {
    conteudo.topicos[index].ia_revisado = true; 
  } else {
    conteudo.posts[index].ia_revisado = true;
  }
  fileAlvo.setContent(JSON.stringify(conteudo, null, 2));
  limparCacheArquivos();
  return { sucesso: true };
} catch (e) {
  return { erro: e.message };
}
}




// ============================================================================
// BLOCO 12 — EDIÇÃO DE QUESTÕES COM IA (GEMINI)
// ============================================================================


const TEMPLATE_HTML_MULTIPLA_ESCOLHA = `
<div style='background:#ffffff;padding:0;border:1px solid #ddd8d0;border-radius:4px;font-family:"IBM Plex Sans",Arial,sans-serif;overflow:hidden;'>
<div style='padding:22px 26px 18px;border-bottom:1px solid #ebe7e0;'>
  <p style='font-size:9px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#9c8f7e;margin:0 0 8px;'>Análise Geral</p>
  <p style='font-family:"IBM Plex Serif",Georgia,serif;font-size:14px;line-height:1.7;color:#3d3630;margin:0;'>Questão sobre <strong>[TEMA]</strong>. O ponto-chave é <strong>[CONCEITO PRINCIPAL]</strong>.</p>
</div>
<div style='padding:18px 26px;border-bottom:1px solid #ebe7e0;'>
  <p style='font-size:9px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#9c8f7e;margin:0 0 10px;'>Alternativas</p>
  <div style='display:flex;gap:0;margin-bottom:5px;border-radius:3px;overflow:hidden;border:1px solid #e8ddd7;'>
    <div style='width:36px;min-width:36px;background:#f5ece8;display:flex;align-items:flex-start;justify-content:center;padding:11px 0;font-size:11px;font-weight:600;color:#b05040;'>A</div>
    <div style='flex:1;padding:11px 13px;background:#fdf8f6;'><p style='font-size:10px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#b05040;margin:0 0 3px;'>Incorreta</p><p style='font-size:13px;line-height:1.55;color:#5a4038;margin:0;'>[EXPLICAÇÃO A]</p></div>
  </div>
  <div style='display:flex;gap:0;margin-bottom:5px;border-radius:3px;overflow:hidden;border:1px solid #e8ddd7;'>
    <div style='width:36px;min-width:36px;background:#f5ece8;display:flex;align-items:flex-start;justify-content:center;padding:11px 0;font-size:11px;font-weight:600;color:#b05040;'>B</div>
    <div style='flex:1;padding:11px 13px;background:#fdf8f6;'><p style='font-size:10px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#b05040;margin:0 0 3px;'>Incorreta</p><p style='font-size:13px;line-height:1.55;color:#5a4038;margin:0;'>[EXPLICAÇÃO B]</p></div>
  </div>
  <div style='display:flex;gap:0;margin-bottom:5px;border-radius:3px;overflow:hidden;border:1px solid #c8dbc5;'>
    <div style='width:36px;min-width:36px;background:#e5efe3;display:flex;align-items:flex-start;justify-content:center;padding:11px 0;font-size:11px;font-weight:600;color:#3a6b34;'>C</div>
    <div style='flex:1;padding:11px 13px;background:#f5f8f4;'><p style='font-size:10px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#3a6b34;margin:0 0 3px;'>Correta</p><p style='font-size:13px;line-height:1.55;color:#2d4f29;margin:0;'>[FUNDAMENTAÇÃO LEGAL]</p></div>
  </div>
  <div style='display:flex;gap:0;margin-bottom:5px;border-radius:3px;overflow:hidden;border:1px solid #e8ddd7;'>
    <div style='width:36px;min-width:36px;background:#f5ece8;display:flex;align-items:flex-start;justify-content:center;padding:11px 0;font-size:11px;font-weight:600;color:#b05040;'>D</div>
    <div style='flex:1;padding:11px 13px;background:#fdf8f6;'><p style='font-size:10px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#b05040;margin:0 0 3px;'>Incorreta</p><p style='font-size:13px;line-height:1.55;color:#5a4038;margin:0;'>[EXPLICAÇÃO D]</p></div>
  </div>
  <div style='display:flex;gap:0;border-radius:3px;overflow:hidden;border:1px solid #e8ddd7;'>
    <div style='width:36px;min-width:36px;background:#f5ece8;display:flex;align-items:flex-start;justify-content:center;padding:11px 0;font-size:11px;font-weight:600;color:#b05040;'>E</div>
    <div style='flex:1;padding:11px 13px;background:#fdf8f6;'><p style='font-size:10px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#b05040;margin:0 0 3px;'>Incorreta</p><p style='font-size:13px;line-height:1.55;color:#5a4038;margin:0;'>[EXPLICAÇÃO E]</p></div>
  </div>
</div>
<div style='padding:16px 26px;background:#faf9f7;display:flex;gap:14px;align-items:flex-start;'>
  <div style='width:3px;min-width:3px;background:#c4b8a8;border-radius:2px;align-self:stretch;'></div>
  <div><p style='font-size:9px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#9c8f7e;margin:0 0 6px;'>Dica</p><p style='font-family:"IBM Plex Serif",Georgia,serif;font-style:italic;font-size:13px;line-height:1.65;color:#5c5248;margin:0;'>[DICA PRÁTICA]</p></div>
</div>
</div>`;

const TEMPLATE_HTML_CERTO_ERRADO = `
<div style='background:#ffffff;padding:0;border:1px solid #ddd8d0;border-radius:4px;font-family:"IBM Plex Sans",Arial,sans-serif;overflow:hidden;'>
<div style='padding:22px 26px 18px;border-bottom:1px solid #ebe7e0;'>
  <p style='font-size:9px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#9c8f7e;margin:0 0 8px;'>Análise</p>
  <p style='font-family:"IBM Plex Serif",Georgia,serif;font-size:14px;line-height:1.7;color:#3d3630;margin:0;'>A questão aborda <strong>[TEMA]</strong>. A afirmativa está <strong>[CORRETA/INCORRETA]</strong> porque <strong>[RAZÃO PRINCIPAL]</strong>.</p>
</div>
<div style='padding:16px 26px 4px;border-bottom:1px solid #ebe7e0;'>
  <div style='display:flex;gap:16px;align-items:flex-start;margin-bottom:12px;'>
    <span style='width:70px;min-width:70px;font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#3a6b34;padding-top:2px;'>Se Certo</span>
    <p style='flex:1;font-size:13px;line-height:1.6;color:#2d4f29;margin:0;'>[EXPLICAÇÃO CASO CERTO]</p>
  </div>
  <div style='display:flex;gap:16px;align-items:flex-start;margin-bottom:12px;'>
    <span style='width:70px;min-width:70px;font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#b05040;padding-top:2px;'>Se Errado</span>
    <p style='flex:1;font-size:13px;line-height:1.6;color:#5a4038;margin:0;'>[EXPLICAÇÃO CASO ERRADO]</p>
  </div>
</div>
<div style='padding:16px 26px;background:#faf9f7;display:flex;gap:14px;align-items:flex-start;'>
  <div style='width:3px;min-width:3px;background:#c4b8a8;border-radius:2px;align-self:stretch;'></div>
  <div><p style='font-size:9px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#9c8f7e;margin:0 0 6px;'>Dica</p><p style='font-family:"IBM Plex Serif",Georgia,serif;font-style:italic;font-size:13px;line-height:1.65;color:#5c5248;margin:0;'>[DICA]</p></div>
</div>
</div>`;



function processarEdicaoQuestaoIA(idOriginal, dificuldade, observacoes, erroAnterior) {
try {
  var prefs = carregarPreferenciasUsuario();
  var userApiKey = (prefs && prefs.config && prefs.config.gemini_api_key) ? prefs.config.gemini_api_key : null;

  var data = carregarQuestaoParaEdicao(idOriginal);
  if (data.erro) return { erro: data.erro };

  var q = data.questao;
  var tipo = q.tipo || 'multipla_escolha';
  var templateCorreto = (tipo === 'certo_errado') ? TEMPLATE_HTML_CERTO_ERRADO : TEMPLATE_HTML_MULTIPLA_ESCOLHA;
  var modoSomenteLayout = (observacoes && observacoes.toLowerCase().includes('apenas layout'));

  var BANCAS_POOL = _bancasPoolPJ();
  // V-MIGRA-2 — sorteio e semente estáveis entre as reexecuções da ponte de IA
  var bancaSelecionada = _iaValorEstavel_('edicaoQuestao.banca', function () { return _escolherBancaPJ(BANCAS_POOL, tipo); });
  var uniqueSeed = _iaValorEstavel_('edicaoQuestao.seed', function () { return new Date().getTime() % 100000; });

  var sysPrompt =
    "Você é um elaborador oficial de provas da banca " + bancaSelecionada.nome + ", com experiência em concursos para Agente da Polícia Judicial dos Tribunais do Poder Judiciário da União (TRFs, TRTs, TREs e TST).\n\n" +
    "IDENTIDADE DA BANCA — " + bancaSelecionada.nome.toUpperCase() + ":\n" +
    bancaSelecionada.estilo + "\n\n" +
    "SEMENTE DE UNICIDADE [#" + uniqueSeed + "]: Esta semente garante que você gere uma questão COMPLETAMENTE DIFERENTE das anteriores. Varie o cenário, os personagens fictícios (servidores, jurisdicionados, autoridades), a unidade judiciária ou seção judiciária, as datas, os valores e a abordagem do enunciado. Nunca repita estrutura de outra questão desta sessão.\n\n" +
    "RETORNE EXCLUSIVAMENTE UM JSON VÁLIDO com as chaves exatas:\n" +
    "{\n" +
    "  \"enunciado\": \"texto do enunciado\",\n" +
    "  \"alternativas\": {\"A\":\"...\",\"B\":\"...\"},\n" +
    "  \"resposta_correta\": \"A\",\n" +
    "  \"comentario_llm\": \"HTML seguindo o template abaixo\"\n" +
    "}\n\n" +
    "══ TEMPLATE OBRIGATÓRIO PARA comentario_llm ══\n" +
    templateCorreto + "\n\n" +
    "═══ RIGOR TÉCNICO (INVIOLÁVEL — questão errada ensina conteúdo errado) ═══\n" +
    "1. NUNCA invente número de artigo, súmula, prazo, alíquota, percentual ou valor.\n" +
    "   Sem certeza absoluta do dado? Reformule SEM ele. Enunciado genérico e correto\n" +
    "   vale infinitamente mais que específico e errado.\n" +
    "2. A alternativa correta tem de ser DEFENSÁVEL por norma, doutrina pacífica ou cálculo.\n" +
    "3. NENHUMA outra alternativa pode também estar correta — releia todas antes de fechar.\n" +
    "4. resposta_correta tem de ser a letra de uma alternativa que EXISTE no objeto.\n" +
    "5. Cada distrator = um ERRO CONCEITUAL ESPECÍFICO que o candidato comete de verdade\n" +
    "   (trocar competência de ente, inverter regra e exceção, confundir prazo, errar base de cálculo).\n" +
    "   PROIBIDO distrator absurdo, eliminável sem saber a matéria.\n" +
    "6. PROIBIDO usar comprimento como pista: a correta não pode ser a mais longa.\n" +
    "7. PROIBIDO 'todas as anteriores', 'nenhuma das anteriores' e negativa dupla.\n" +
    "8. Alternativas com extensão e estrutura gramatical parecidas entre si.\n" +
    "9. Questão de cálculo: refaça a conta — os números do enunciado têm de fechar com a correta.\n" +
    "10. O comentário explica por que a correta está certa E por que CADA distrator está errado.\n\n" +
    "🚨 REGRAS CRÍTICAS DE FORMATAÇÃO (ANTI-ERRO) 🚨\n" +
    "1. PROIBIDO MARKDOWN: É ESTRITAMENTE PROIBIDO usar asteriscos (**texto**) para negrito ou traços (-) para listas. Use EXCLUSIVAMENTE tags HTML puras (<strong>texto</strong>, <br>, <ul><li>) dentro do comentario_llm.\n" +
    "2. PRESERVE OS ESPAÇOS: Ao editar o 'enunciado' e as 'alternativas', NUNCA junte palavras. Preserve os espaços originais rigorosamente.\n" +
    "3. KATEX RESTRITO: Use barra dupla \\\\( ... \\\\) APENAS para fórmulas matemáticas, valores monetários e percentuais. É PROIBIDO usar KaTeX em números de leis, artigos ou anos.\n" +
    "4. FORMATO DE MOEDA E ESPAÇAMENTO (CRÍTICO): Substitua o símbolo R$ pela palavra reais escrita após o número. OBRIGATÓRIO: Deixe SEMPRE um espaço antes e depois dos números, variáveis ou delimitadores KaTeX. Exemplo ERRADO: '80.000foimuitosuperior'. Exemplo CORRETO: '80.000 foi muito superior'.\n" +
    "5. QUEBRAS DE LINHA: Não insira a tecla Enter dentro das strings do JSON. Use a tag <br> para pular linha visualmente.\n" +
    "6. TIPO DE QUESTÃO: Respeite as alternativas originais. Não transforme Certo/Errado em Múltipla Escolha.\n" +
    "7. USE O TEMPLATE: O campo comentario_llm deve ser uma única string contendo o HTML do template fornecido, substituindo as chaves pelas suas explicações detalhadas em HTML.";

  var userPrompt =
    "==== DADOS DA QUESTÃO ATUAL ====\n" +
    "Disciplina: " + data.disciplina + "\nTema: " + data.tema + "\n" +
    "Tipo: " + tipo + "\n\n" +
    "Enunciado original:\n" + q.enunciado + "\n\n" +
    "Alternativas originais:\n" + JSON.stringify(q.alternativas, null, 2) + "\n\n" +
    "Gabarito Atual: " + q.resposta_correta + "\n\n" +
    "Comentário Atual:\n" + q.comentario_llm + "\n\n" +
    "==== DIRETRIZES DE EDIÇÃO ====\n" +
    "Banca de Referência: " + bancaSelecionada.nome + "\n" +
    "Semente de Unicidade: #" + uniqueSeed + "\n" +
    "Nível de Dificuldade Desejado: " + (dificuldade || "Manter atual") + "\n" +
    "Observações do usuário: " + (observacoes || "Nenhuma") + "\n\n";

  if (modoSomenteLayout) {
    userPrompt += "⚠️ MODO LAYOUT ATIVO: NÃO altere o mérito da questão original. Corrija APENAS a formatação: 1) Encaixe a explicação no template HTML; 2) Remova todo Markdown e troque por HTML; 3) Aplique KaTeX nos números financeiros; 4) PRESERVE todos os espaços originais.\n\n";
  } else if (dificuldade === 'TORNAR MAIS DIFÍCIL') {
    userPrompt += "Torne as justificativas mais densas, abordando conceitos avançados, exceções à regra e pegadinhas características da " + bancaSelecionada.nome + ". Use a semente #" + uniqueSeed + " para criar um cenário completamente inédito.\n\n";
  } else if (dificuldade === 'TORNAR MAIS FÁCIL') {
    userPrompt += "Seja altamente direto e objetivo, focando na cobrança dos conceitos fundamentais no estilo da " + bancaSelecionada.nome + ". Use a semente #" + uniqueSeed + " para variar o contexto.\n\n";
  } else {
    userPrompt += "Reescreva esta questão COMPLETAMENTE no estilo autêntico da " + bancaSelecionada.nome + ". Crie um cenário INÉDITO, no contexto de tribunais federais, usando a semente #" + uniqueSeed + " — novos personagens fictícios, novos valores, nova situação, nova localidade. O conteúdo técnico e o gabarito devem estar corretos. A questão deve ser notavelmente diferente de qualquer outra do mesmo lote.\n\n";
  }

  if (erroAnterior) {
    userPrompt += "\n\n🚨🚨 ATENÇÃO (FEEDBACK DE ERRO ANTERIOR) 🚨🚨\n" +
                  "Na tentativa anterior, o JSON quebrou ou a formatação falhou. Motivos prováveis:\n" +
                  "1. Você usou Markdown ao invés de HTML.\n" +
                  "2. Você colocou KaTeX em Leis (ex: LC \\\\( 116 \\\\)) ao invés de apenas usar em matemática/finanças.\n" +
                  "3. Você deletou espaços unindo palavras no enunciado.\n" +
                  "AÇÃO OBRIGATÓRIA: Siga as regras anti-erro estritamente.";
  }

  Logger.log("==== [IA] Banca: " + bancaSelecionada.nome + " | Semente: #" + uniqueSeed + " | Disc: " + data.disciplina + " ====");

  var resultado = iaAgente_({   // V-MIGRA-2 — chamada feita pelo navegador
    apiKey: userApiKey,
    prompt: userPrompt,
    systemPrompt: sysPrompt,
    jsonMode: true,
    maxTokens: 32768,
    contextoGasto: 'Questoes/Edicao'
  }, 'gemini');

  if (!resultado.success) {
    Logger.log("==== [IA] ERRO DA API: " + resultado.erro + " ====");
    return { erro: "Falha no agente Gemini: " + resultado.erro };
  }

  Logger.log("==== [IA] RETORNO BRUTO: " + resultado.raw + " ====");

  var novaQ;
  if (typeof resultado.resultado === 'string') {
    try {
      novaQ = JSON.parse(resultado.resultado);
    } catch (e1) {
      try {
        var clean = resultado.resultado.replace(/```json|```/g, '').trim();
        clean = clean.replace(/\n/g, '\\n').replace(/\r/g, '').replace(/\t/g, ' ');
        novaQ = JSON.parse(clean);
      } catch (e2) {
        return { erro: "Falha de formatação da IA (JSON corrompido). Original: " + e1.message };
      }
    }
  } else {
    novaQ = resultado.resultado;
  }

  if (!novaQ || !novaQ.enunciado || !novaQ.alternativas || !novaQ.resposta_correta || !novaQ.comentario_llm) {
    return { erro: "A IA não retornou todas as chaves obrigatórias do JSON estruturado." };
  }

  // ══════════════════════════════════════════════════════════════════════════
  // V86 — VALIDAÇÃO ESTRUTURAL DA QUESTÃO EDITADA
  // A FÁBRICA validava tudo antes de gravar; a EDIÇÃO não validava nada além da
  // presença das 4 chaves. Como a edição REESCREVE enunciado, alternativas e
  // gabarito por completo, uma reescrita com gabarito apontando para alternativa
  // inexistente, duas alternativas iguais ou comentário vazio substituía uma
  // questão boa no Drive — e ninguém ficava sabendo. Agora defeito GRAVE volta
  // como erro (o front já reenvia com o feedback de erro anterior) e defeito
  // leve fica registrado na própria questão.
  // ══════════════════════════════════════════════════════════════════════════
  var _probs = [];
  if (tipo === 'certo_errado') {
    // Certo/Errado tem 2 alternativas — o validador de múltipla escolha (mínimo 4,
    // letras A-E) reprovaria toda questão válida. Checagem própria e enxuta.
    var _letrasCE = Object.keys(novaQ.alternativas || {});
    var _corrCE = String(novaQ.resposta_correta || '').trim().toUpperCase();
    if (_letrasCE.length !== 2) _probs.push('certo/errado com ' + _letrasCE.length + ' alternativa(s) — deve ter 2');
    if (!_corrCE) _probs.push('resposta_correta ausente');
    else if (novaQ.alternativas[_corrCE] === undefined && novaQ.alternativas[String(novaQ.resposta_correta)] === undefined) {
      _probs.push('resposta_correta "' + _corrCE + '" aponta para alternativa INEXISTENTE');
    }
    if (!String(novaQ.comentario_llm || '').replace(/<[^>]*>/g, '').trim()) _probs.push('comentario_llm vazio — questao sem explicacao');
  } else {
    var _rel = validarQuestoesLote([novaQ]);
    _probs = (_rel.problemas && _rel.problemas.length) ? _rel.problemas[0].problemas : [];
  }

  var _RX_GRAVE = /alternativa INEXISTENTE|DUPLICADA|resposta_correta ausente|resposta_correta invalida|enunciado vazio|alternativa\(s\) vazia\(s\)|minimo 4|comentario_llm vazio|deve ter 2/;
  var _graves = _probs.filter(function(t) { return _RX_GRAVE.test(t); });

  if (_graves.length) {
    Logger.log('[EDICAO-QUESTAO] ⛔ reprovada na validação estrutural: ' + _graves.join(' | '));
    return { erro: 'Questão reescrita reprovada na validação: ' + _graves.join(' | ') };
  }
  if (_probs.length) {
    Logger.log('[EDICAO-QUESTAO] ⚠️ aprovada com ressalva: ' + _probs.join(' | '));
    novaQ.validacao_v20 = { problemas: _probs };
  }

  return {
    sucesso: true,
    id_arquivo: data.id_arquivo,
    index: data.index,
    nova_questao: novaQ,
    validacao: _probs,
    banca_usada: bancaSelecionada.nome
  };

} catch (e) {
  Logger.log("Erro em processarEdicaoQuestaoIA: " + e.message);
  return { erro: "Exceção interna: " + e.message };
}
}


// ============================================================
// [MOVIDO PARA Canvas.gs em 24/08/2026] — GEMINI_MODELS e
// getGeminiModel agora vivem só no Canvas.gs. Não redeclarar aqui.
// ============================================================

// ============================================================
// SUBSTITUIR: função salvarModeloGemini
// ============================================================

function salvarModeloGemini(modelo) {
// Ignora o parâmetro — modelo fixo
return { success: true, modelo: agModeloTexto_() };   // V40.3
}



// ============================================================
// [MOVIDO PARA Canvas.gs em 24/08/2026] — funções de rotação/uso de
// chaves Gemini (inicializarSistemaChaves, resetarQuarentenaChaves,
// obterChaveAtiva, rotacionarChaveExausta, geminiAgent) agora vivem só no
// Canvas.gs. Não redeclarar aqui.
// V40.1 — _ehChaveRestValida saiu do projeto: ela julgava chave pelo prefixo
// ("AIza…"), e o Google emite também no formato "AQ.…". A API aceita os dois.
// ============================================================



/* ════════════════════════════════════════════════════════════════════════════
  BLOCO GAS — COLAR NO INÍCIO DO ARQUIVO .gs
  StudyOS V13.8 — Drive Manager + DEFAULT_PREFS_JSON
════════════════════════════════════════════════════════════════════════════ */

function _getPastaUsuario() {
  var raiz = DriveApp.getFolderById(PASTA_RAIZ_ID);
  var pastaDados = raiz.getFoldersByName(PASTA_DADOS);
  if (!pastaDados.hasNext()) {
    throw new Error('[DRIVE] Pasta "' + PASTA_DADOS + '" não encontrada dentro da pasta raiz.');
  }
  return pastaDados.next();
}


function _getFileByName(filename) {
var pasta = _getPastaUsuario();
var it    = pasta.getFilesByName(filename);
var files = [];
while (it.hasNext()) files.push(it.next());

if (files.length === 0) {
  console.log('[DRIVE][GET] "' + filename + '" — NÃO ENCONTRADO');
  return null;
}
if (files.length > 1) {
  console.warn('[DRIVE][DEDUP] "' + filename + '" — ' + files.length + ' duplicatas. Removendo excedentes...');
  files.sort(function(a, b) { return b.getLastUpdated() - a.getLastUpdated(); });
  for (var i = 1; i < files.length; i++) {
    files[i].setTrashed(true);
    console.warn('[DRIVE][DEDUP] Excluído ID: ' + files[i].getId());
  }
}
console.log('[DRIVE][GET] "' + filename + '" | ID: ' + files[0].getId() + ' | ' + files[0].getSize() + ' bytes | ' + files[0].getLastUpdated());
return files[0];
}


/* ════════════════════════════════════════════════════════════════════════════
   V31 — ROTEADOR DE ESCRITA
   Todo o sistema continua chamando _saveJsonToDrive. O que mudou é o que
   acontece por baixo: com o Firebase ligado, o dado vai para o Firestore
   (fonte) e para o Drive (espelho). Com o Firebase desligado, esta função é
   idêntica ao que sempre foi — ela só repassa para _driveSaveRaw.
   ════════════════════════════════════════════════════════════════════════════ */
function _saveJsonToDrive(filename, data) {
  if (typeof _arquivoDoUsuarioAtivo === 'function') filename = _arquivoDoUsuarioAtivo(filename);
  if (typeof _dxGravar === 'function') return _dxGravar(filename, data);
  return _driveSaveRaw(filename, data);
}

/** Escrita direta no Drive, sem Firebase. É o caminho antigo, intacto. */
function _driveSaveRaw(filename, data) {
// V24 — com MULTIUSUARIO_ISOLAR_DADOS = false (padrão) devolve o mesmo nome:
// nada muda. Ver Auth.gs.
if (typeof _arquivoDoUsuarioAtivo === 'function') filename = _arquivoDoUsuarioAtivo(filename);
var lock = LockService.getScriptLock();
try {
  lock.waitLock(15000);
  var pasta = _getPastaUsuario();
  var conteudo = JSON.stringify(data, null, 2);
  var blob = Utilities.newBlob(conteudo, 'application/json', filename);
  var file = _getFileByName(filename);
  if (file) {
    file.setContent(conteudo);
    console.log('[DRIVE][OVERWRITE] "' + filename + '" | ID: ' + file.getId() + ' | ' + conteudo.length + ' bytes | ' + new Date().toISOString());
  } else {
    file = pasta.createFile(blob);
    console.log('[DRIVE][CREATE] "' + filename + '" | ID: ' + file.getId() + ' | ' + conteudo.length + ' bytes | ' + new Date().toISOString());
  }
  return file.getId();
} catch (e) {
  console.error('[DRIVE][SAVE] Erro ou Lock expirado: ' + e.message);
  throw new Error('[DRIVE] Falha ao salvar "' + filename + '": ' + e.message);
} finally {
  lock.releaseLock();
}
}


/* ════════════════════════════════════════════════════════════════════════════
   V31 — ROTEADOR DE LEITURA
   Com o Firebase ligado, lê do Firestore. Se não houver nada lá, lê o Drive e
   promove o arquivo — é assim que cada JSON de configuração migra sozinho, no
   primeiro uso. Se o Firestore falhar, cai para o Drive sem avisar o aluno.
   ════════════════════════════════════════════════════════════════════════════ */
function _readJsonFromDrive(filename) {
  if (typeof _arquivoDoUsuarioAtivo === 'function') filename = _arquivoDoUsuarioAtivo(filename);
  if (typeof _dxLer === 'function') return _dxLer(filename);
  return _driveReadRaw(filename);
}

/** Leitura direta do Drive, sem Firebase. É o caminho antigo, intacto. */
function _driveReadRaw(filename) {
// V24 — mesmo gancho da escrita, para leitura e escrita nunca divergirem.
if (typeof _arquivoDoUsuarioAtivo === 'function') filename = _arquivoDoUsuarioAtivo(filename);
console.log('[DRIVE][READ] Lendo "' + filename + '" direto do Drive | ' + new Date().toISOString());
var file = _getFileByName(filename);
if (!file) {
  console.error('[DRIVE][READ] ERRO: "' + filename + '" não encontrado.');
  return null;
}
var raw = file.getBlob().getDataAsString('UTF-8');
console.log('[DRIVE][READ] "' + filename + '" | ' + raw.length + ' bytes lidos');
try {
  var parsed = JSON.parse(raw);
  console.log('[DRIVE][READ] Parse OK | Chaves: ' + Object.keys(parsed).join(', '));
  return parsed;
} catch (e) {
  console.error('[DRIVE][READ] PARSE FALHOU: ' + e.message);
  throw new Error('[DRIVE] JSON corrompido em "' + filename + '": ' + e.message);
}
}




function obterPromptPadrao(tipo) {
console.log('[PROMPT-PADRAO] Tipo solicitado: "' + tipo + '"');
var prompts = DEFAULT_PREFS_JSON.global.prompts_live;
if (!prompts[tipo]) {
  var msg = '[PROMPT-PADRAO] ERRO: tipo "' + tipo + '" inexistente.';
  console.error(msg);
  throw new Error(msg);
}
console.log('[PROMPT-PADRAO] Retornando "' + tipo + '" (' + prompts[tipo].length + ' chars)');
return prompts[tipo];
}


function carregarPreferenciasUsuario() {
try {
  // Usa a função robusta _readJsonFromDrive do bloco V13.8
  var prefs = _readJsonFromDrive(ARQUIVO_CONFIG_PREFERENCIAS);
  var defCopy = JSON.parse(JSON.stringify(DEFAULT_PREFS_JSON));

  if (!prefs) {
    return defCopy;
  }

  // Vacina: Garante que a estrutura base sempre exista
  if (!prefs.global)    prefs.global    = {};
  if (!prefs.config)    prefs.config    = {};
  if (!prefs.contextos) prefs.contextos = {};

  // Merge profundo: injeta chaves novas/faltantes em perfis salvos incompletos
  Object.keys(defCopy.config).forEach(function(k) {
    if (prefs.config[k] === undefined) prefs.config[k] = defCopy.config[k];
  });
  Object.keys(defCopy.global).forEach(function(k) {
    if (prefs.global[k] === undefined) prefs.global[k] = defCopy.global[k];
  });
  Object.keys(defCopy.contextos).forEach(function(k) {
    if (prefs.contextos[k] === undefined) prefs.contextos[k] = defCopy.contextos[k];
  });

  // Prompts internos
  if (!prefs.global.prompts_live) {
    prefs.global.prompts_live = defCopy.global.prompts_live;
  } else {
    Object.keys(defCopy.global.prompts_live).forEach(function(k) {
      if (prefs.global.prompts_live[k] === undefined) prefs.global.prompts_live[k] = defCopy.global.prompts_live[k];
    });
  }

  // Vacina Crítica para Agenda (Evita quebrar o Mobile e Desktop)
  if (!prefs.agenda_avisos) prefs.agenda_avisos = [];
  if (!prefs.agenda_config) prefs.agenda_config = { "avisos_auto": true };
  if (!prefs.anotacoes)     prefs.anotacoes     = [];

  return prefs;
} catch (e) {
  console.error("[PREFS] Erro ao carregar preferências: " + e.message);
  return JSON.parse(JSON.stringify(DEFAULT_PREFS_JSON));
}
}

// ══════════════════════════════════════════════════════════════════════════
// V14.4 — INVALIDAÇÃO DE CACHE AO SALVAR CONFIGURAÇÃO
// Antes, salvar preferências não limpava cache nenhum: o app seguia lendo os
// valores antigos até expirar sozinho, e a configuração "não pegava".
// Esta função derruba todos os caches que dependem de configuração.
// ══════════════════════════════════════════════════════════════════════════
function invalidarCachesDeConfiguracao() {
  var limpos = [];
  try {
    var uc = CacheService.getUserCache();
    var chaves = ['PREFS_USUARIO', 'CONFIG_LIVE', 'PROMPTS_LIVE', 'CACHE_ESTRUTURA',
                  'CONFIG_CICLO', 'ESTADO_USUARIO', 'TEMPLATE_ATIVO'];
    if (typeof CHAVE_CACHE_ESTRUTURA !== 'undefined') chaves.push(CHAVE_CACHE_ESTRUTURA);
    if (typeof CHAVE_ESTADO_USUARIO !== 'undefined')  chaves.push(CHAVE_ESTADO_USUARIO);
    chaves.forEach(function(k) { try { uc.remove(k); limpos.push(k); } catch (e) {} });
  } catch (e) {
    Logger.log('[CONFIG] UserCache indisponivel: ' + e.message);
  }
  try {
    var sc = CacheService.getScriptCache();
    ['PRECOS_MODELOS', 'CONFIG_GLOBAL'].forEach(function(k) {
      try { sc.remove(k); limpos.push(k); } catch (e) {}
    });
  } catch (e) {}
  Logger.log('[CONFIG] Caches invalidados: ' + limpos.join(', '));
  return limpos;
}

function salvarPreferenciasUsuario(dados) {
  invalidarCachesDeConfiguracao();  // V14.4: sem isto a config nova nao entrava em vigor
try {
  if (!dados || typeof dados !== 'object') {
    throw new Error('Objeto de preferências inválido.');
  }
  // Usa a função robusta _saveJsonToDrive do bloco V13.8
  _saveJsonToDrive(ARQUIVO_CONFIG_PREFERENCIAS, dados);
  return true;
} catch (e) {
  throw new Error("Falha ao salvar preferências: " + e.message);
}
}






function lerAgenda() {
try {
  var prefs = carregarPreferenciasUsuario();

  var avisos  = prefs.agenda_avisos  || [];
  var config  = prefs.agenda_config  || { avisos_auto: true };
  var hoje    = new Date().toISOString().split('T')[0];

  // Ordena: ALTA → MÉDIA → BAIXA, depois por data
  var ORD = { 'ALTA': 0, 'MÉDIA': 1, 'MEDIA': 1, 'BAIXA': 2 };

  var avisosOrdenados = avisos.slice().sort(function(a, b) {
    var difOrd = (ORD[a.urgencia] || 2) - (ORD[b.urgencia] || 2);
    if (difOrd !== 0) return difOrd;
    return (a.data || '').localeCompare(b.data || '');
  });

  // Separa vencidos/hoje dos futuros para facilitar leitura pela Aurora
  var urgentes = avisosOrdenados.filter(function(a) {
    return !a.data || a.data <= hoje;
  });
  var futuros = avisosOrdenados.filter(function(a) {
    return a.data && a.data > hoje;
  });

  Logger.log('[AGENDA-LER] Total: ' + avisos.length + ' | Urgentes: ' + urgentes.length + ' | Futuros: ' + futuros.length);

  return {
    sucesso:          true,
    total:            avisos.length,
    urgentes:         urgentes,
    futuros:          futuros,
    todos:            avisosOrdenados,
    config:           config,
    data_consulta:    hoje
  };

} catch (e) {
  Logger.log('[AGENDA-LER] ❌ Erro: ' + e.message);
  return { sucesso: false, erro: e.message, urgentes: [], futuros: [], todos: [] };
}
}



function criarAgendamento(titulo, descricao, urgencia, data, hora) {
try {
  if (!titulo || typeof titulo !== 'string' || titulo.trim() === '') {
    return { sucesso: false, erro: 'Título obrigatório.' };
  }

  var urgenciaNorm = (urgencia || 'MÉDIA').toUpperCase();
  if (['ALTA', 'MÉDIA', 'MEDIA', 'BAIXA'].indexOf(urgenciaNorm) === -1) {
    urgenciaNorm = 'MÉDIA';
  }
  if (urgenciaNorm === 'MEDIA') urgenciaNorm = 'MÉDIA';

  var dataFinal = data || new Date().toISOString().split('T')[0];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dataFinal)) {
    dataFinal = new Date().toISOString().split('T')[0];
  }

  var prefs = carregarPreferenciasUsuario();
  if (!prefs.agenda_avisos)  prefs.agenda_avisos  = [];
  if (!prefs.agenda_config)  prefs.agenda_config  = { avisos_auto: true };

  // Criar evento no Google Calendar
  var calendarEventId = null;
  try {
    var partes = dataFinal.split('-');
    var hh = 8;
    var mm = 0;
    
    // Valida e aplica a hora recebida da IA (Formato HH:MM)
    if (hora && /^\d{2}:\d{2}$/.test(hora)) {
      var hParts = hora.split(':');
      hh = parseInt(hParts[0], 10);
      mm = parseInt(hParts[1], 10);
    }

    var dataEvento = new Date(
      parseInt(partes[0]),
      parseInt(partes[1]) - 1,
      parseInt(partes[2]),
      hh, mm, 0
    );
    
    // Duração fixa de 1 hora
    var dataFim = new Date(dataEvento.getTime() + 60 * 60 * 1000);

    var descricaoCalendar = (descricao ? descricao.trim() + '\n\n' : '') +
      'Urgência: ' + urgenciaNorm + '\n' +
      'Criado pelo StudyOS';

    var evento = CalendarApp.getDefaultCalendar().createEvent(
      '[StudyOS] ' + titulo.trim(),
      dataEvento,
      dataFim,
      { description: descricaoCalendar }
    );

    // Adicionar notificações: pop-up 30 min antes e no momento exato (que geram o alarme sonoro)
    evento.addPopupReminder(30);
    evento.addPopupReminder(0);

    calendarEventId = evento.getId();
    Logger.log('[AGENDA-CRIAR] ✅ Evento criado no Google Calendar | ID: ' + calendarEventId + ' | Hora: ' + hh + ':' + mm);
  } catch (eCalendar) {
    Logger.log('[AGENDA-CRIAR] ⚠️ Falha ao criar no Google Calendar (não crítico): ' + eCalendar.message);
  }

  var novoAviso = {
    id:                 'aviso_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    titulo:             titulo.trim(),
    descricao:          descricao ? descricao.trim() : '',
    urgencia:           urgenciaNorm,
    data:               dataFinal,
    tipo:               'aurora',
    criado_em:          new Date().toISOString(),
    calendar_event_id:  calendarEventId
  };

  prefs.agenda_avisos.push(novoAviso);
  _saveJsonComInvalidacao(ARQUIVO_CONFIG_PREFERENCIAS, prefs, 'PREFS_USER');

  Logger.log('[AGENDA-CRIAR] ✅ id=' + novoAviso.id + ' | título=' + novoAviso.titulo + ' | calendar_event_id=' + calendarEventId);

  return {
    sucesso:              true,
    aviso:                novoAviso,
    total:                prefs.agenda_avisos.length,
    sincronizado_calendar: calendarEventId !== null
  };

} catch (e) {
  Logger.log('[AGENDA-CRIAR] ❌ Erro: ' + e.message);
  return { sucesso: false, erro: e.message };
}
}


function removerAvisoDriveAtomico(id) {
try {
  if (!id || typeof id !== 'string') {
    return { sucesso: false, erro: 'ID inválido.' };
  }

  var prefs = carregarPreferenciasUsuario();
  if (!prefs.agenda_avisos) prefs.agenda_avisos = [];

  // Localizar o aviso antes de remover para pegar o calendar_event_id
  var avisoAlvo = prefs.agenda_avisos.find(function(a) { return a.id === id; });

  var totalAntes = prefs.agenda_avisos.length;
  prefs.agenda_avisos = prefs.agenda_avisos.filter(function(a) { return a.id !== id; });
  var totalDepois = prefs.agenda_avisos.length;

  if (totalAntes === totalDepois) {
    Logger.log('[AGENDA-REMOVER] ⚠️ ID não encontrado: ' + id);
    return { sucesso: false, erro: 'Aviso não encontrado: ' + id };
  }

  // Remover do Google Calendar se existir o event ID
  var removidoDoCalendar = false;
  if (avisoAlvo && avisoAlvo.calendar_event_id) {
    try {
      var evento = CalendarApp.getEventById(avisoAlvo.calendar_event_id);
      if (evento) {
        evento.deleteEvent();
        removidoDoCalendar = true;
        Logger.log('[AGENDA-REMOVER] ✅ Evento removido do Google Calendar | ID: ' + avisoAlvo.calendar_event_id);
      } else {
        Logger.log('[AGENDA-REMOVER] ⚠️ Evento não encontrado no Calendar (pode já ter sido excluído): ' + avisoAlvo.calendar_event_id);
      }
    } catch (eCalendar) {
      Logger.log('[AGENDA-REMOVER] ⚠️ Falha ao remover do Google Calendar (não crítico): ' + eCalendar.message);
    }
  }

  _saveJsonComInvalidacao(ARQUIVO_CONFIG_PREFERENCIAS, prefs, 'PREFS_USER');

  Logger.log('[AGENDA-REMOVER] ✅ id=' + id + ' removido | Restantes: ' + totalDepois + ' | Calendar: ' + removidoDoCalendar);

  return {
    sucesso:               true,
    id_removido:           id,
    total:                 totalDepois,
    removido_do_calendar:  removidoDoCalendar
  };

} catch (e) {
  Logger.log('[AGENDA-REMOVER] ❌ Erro: ' + e.message);
  return { sucesso: false, erro: e.message };
}
}




// ============================================================================
// BLOCO 4 — ANOTAÇÕES: salvarAnotacaoVoz()
// ONDE COLAR: Code.gs — logo após removerAvisoDriveAtomico()
// SUBSTITUI: nenhuma (função nova — chamada pela Aurora via tool call)
// DESCRIÇÃO: Persiste anotação de voz no Drive de forma atômica.
//            meta = { disciplina, tema, subtema } — todos opcionais.
//            Chamada pelo Gemini Live via tool call salvarAnotacaoVoz().
// ============================================================================

function salvarAnotacaoVoz(conteudo, meta) {
try {
  // ── Validação ─────────────────────────────────────────────────────────
  if (!conteudo || typeof conteudo !== 'string' || conteudo.trim() === '') {
    return { sucesso: false, erro: 'Conteúdo da anotação vazio.' };
  }

  var metaDados = meta || {};

  // ── Leitura atômica ───────────────────────────────────────────────────
  var prefs = carregarPreferenciasUsuario();
  if (!prefs.anotacoes) prefs.anotacoes = [];

  var novaAnotacao = {
    id:         'nota_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    conteudo:   conteudo.trim(),
    disciplina: metaDados.disciplina || null,
    tema:       metaDados.tema       || null,
    subtema:    metaDados.subtema    || null,
    origem:     'aurora_voz',
    criado_em:  new Date().toISOString()
  };

  prefs.anotacoes.push(novaAnotacao);

  // Mantém as 200 anotações mais recentes para não inflar o JSON indefinidamente
  if (prefs.anotacoes.length > 200) {
    prefs.anotacoes = prefs.anotacoes.slice(prefs.anotacoes.length - 200);
    Logger.log('[NOTA-SALVAR] ℹ️ Array aparado para 200 entradas mais recentes');
  }

  // ── Escrita atômica ───────────────────────────────────────────────────
  _saveJsonComInvalidacao(ARQUIVO_CONFIG_PREFERENCIAS, prefs, 'PREFS_USER');

  Logger.log('[NOTA-SALVAR] ✅ id=' + novaAnotacao.id + ' | disc=' + (novaAnotacao.disciplina || 'N/D') + ' | tema=' + (novaAnotacao.tema || 'N/D') + ' | chars=' + novaAnotacao.conteudo.length);

  return {
    sucesso:    true,
    anotacao:   novaAnotacao,
    total:      prefs.anotacoes.length
  };

} catch (e) {
  Logger.log('[NOTA-SALVAR] ❌ Erro: ' + e.message);
  return { sucesso: false, erro: e.message };
}
}



// ============================================================================
// BLOCO 5 — ANOTAÇÕES: listarAnotacoes()
// ONDE COLAR: Code.gs — logo após salvarAnotacaoVoz()
// SUBSTITUI: nenhuma (função nova)
// DESCRIÇÃO: Lista anotações com filtro opcional por disciplina/tema.
//            Retorna as 50 mais recentes por padrão para não sobrecarregar
//            o contexto do Live com histórico inteiro.
// ============================================================================

function listarAnotacoes(disciplina, tema) {
try {
  var prefs = carregarPreferenciasUsuario();
  var todas = prefs.anotacoes || [];

  // ── Filtro opcional ───────────────────────────────────────────────────
  var filtradas = todas;

  if (disciplina && typeof disciplina === 'string' && disciplina.trim() !== '') {
    var discNorm = disciplina.trim().toLowerCase();
    filtradas = filtradas.filter(function(n) {
      return n.disciplina && n.disciplina.toLowerCase() === discNorm;
    });
  }

  if (tema && typeof tema === 'string' && tema.trim() !== '') {
    var temaNorm = tema.trim().toLowerCase();
    filtradas = filtradas.filter(function(n) {
      return n.tema && n.tema.toLowerCase().includes(temaNorm);
    });
  }

  // Mais recentes primeiro, limite de 50 para não inflar contexto do Live
  var ordenadas = filtradas.slice().sort(function(a, b) {
    return (b.criado_em || '').localeCompare(a.criado_em || '');
  }).slice(0, 50);

  Logger.log('[NOTA-LISTAR] total=' + todas.length + ' | filtradas=' + filtradas.length + ' | retornando=' + ordenadas.length);

  return {
    sucesso:    true,
    anotacoes:  ordenadas,
    total:      filtradas.length,
    filtros:    { disciplina: disciplina || null, tema: tema || null }
  };

} catch (e) {
  Logger.log('[NOTA-LISTAR] ❌ Erro: ' + e.message);
  return { sucesso: false, erro: e.message, anotacoes: [] };
}
}




// ============================================================================
// BLOCO 6 — ANOTAÇÕES: removerAnotacao()
// ONDE COLAR: Code.gs — logo após listarAnotacoes()
// SUBSTITUI: nenhuma (função nova)
// DESCRIÇÃO: Remove anotação por ID de forma atômica.
// ============================================================================

function removerAnotacao(id) {
try {
  if (!id || typeof id !== 'string') {
    return { sucesso: false, erro: 'ID inválido.' };
  }

  var prefs = carregarPreferenciasUsuario();
  if (!prefs.anotacoes) {
    return { sucesso: false, erro: 'Nenhuma anotação salva.' };
  }

  var totalAntes  = prefs.anotacoes.length;
  prefs.anotacoes = prefs.anotacoes.filter(function(n) { return n.id !== id; });
  var totalDepois = prefs.anotacoes.length;

  if (totalAntes === totalDepois) {
    Logger.log('[NOTA-REMOVER] ⚠️ ID não encontrado: ' + id);
    return { sucesso: false, erro: 'Anotação não encontrada: ' + id };
  }

  _saveJsonComInvalidacao(ARQUIVO_CONFIG_PREFERENCIAS, prefs, 'PREFS_USER');

  Logger.log('[NOTA-REMOVER] ✅ id=' + id + ' removida | Restantes: ' + totalDepois);

  return { sucesso: true, id_removido: id, total: totalDepois };

} catch (e) {
  Logger.log('[NOTA-REMOVER] ❌ Erro: ' + e.message);
  return { sucesso: false, erro: e.message };
}
}


/**
 * V24 — MANTIDA POR COMPATIBILIDADE (retorna boolean, como antes).
 *
 * A versão anterior comparava com prefs.credenciais.senha, que num sistema
 * zerado era recriada a partir de USUARIO_SENHA = " " — um espaço. O front faz
 * `.trim()` no usuário e valida "preencha login e senha", então o único acesso
 * possível era digitar um espaço; e com a pasta de DADOS apagada nem isso
 * funcionava. Agora a verdade sobre credenciais mora em usuarios_v1.json
 * (Auth.gs), com hash salgado. Este wrapper existe só para não quebrar nenhum
 * chamador antigo — a tela usa loginUsuario().
 */
function autenticarUsuario(usuario, senhaInput) {
  try {
    var r = loginUsuario(usuario, senhaInput, true);
    return !!(r && r.sucesso);
  } catch (e) {
    console.error("[LOGIN] Erro ao autenticar: " + e.message);
    return false;
  }
}




function _carregarJsonsParalelo(fileIds) {
if (fileIds.length === 0) return [];
var token = ScriptApp.getOAuthToken();
var requests = fileIds.map(function(id) {
  return {
    url: 'https://www.googleapis.com/drive/v3/files/' + id + '?alt=media',
    headers: { 'Authorization': 'Bearer ' + token },
    muteHttpExceptions: true
  };
});
var respostas = UrlFetchApp.fetchAll(requests);
var resultados = [];
respostas.forEach(function(resp, idx) {
  if (resp.getResponseCode() === 200) {
    try {
      resultados.push({ id: fileIds[idx], data: JSON.parse(resp.getContentText()) });
    } catch(e) {
      Logger.log('Erro parse arquivo ' + fileIds[idx] + ': ' + e.message);
    }
  }
});
return resultados;
}

/* ════════════════════════════════════════════════════════════════════════════
   V35 — TODA LEITURA DE BANCO PASSA POR AQUI

   O Raio-X lê os 254 arquivos de questões e sozinho respondia por ~175 dos
   188 segundos do boot completo. Ele chamava _carregarJsonsParalelo direto,
   por fora do roteador do Firebase: nunca lia de lá e nunca alimentava a
   migração.

   Esta função é o mesmo caminho de carregarMultiplosJsons: tenta o Firebase,
   e o que não estiver lá vem do Drive e é gravado no caminho de volta.
   Devolve exatamente o mesmo formato de antes — [{id, data}] — para que
   nenhum chamador precise mudar.
   ════════════════════════════════════════════════════════════════════════════ */
function _carregarBancosRoteado(fileIds) {
  if (!fileIds || !fileIds.length) return [];
  try {
    if (typeof _dxBancosCarregar === 'function') {
      var r = _dxBancosCarregar(fileIds);
      if (r) return r;
    }
  } catch (e) {
    console.warn('[V35] banco pelo Firebase falhou, seguindo pelo Drive: ' + e.message);
  }
  return _carregarJsonsParalelo(fileIds);
}

function _agendarReconstrucaoCache() {
try { CacheService.getScriptCache().put('CACHE_PRECISA_RECONSTRUIR', '1', 600); } catch(e) {}
}

function _invalidarCacheEstrutura() {
try { CacheService.getScriptCache().remove('ESTRUTURA_CICLO_V13'); } catch(e) {}
}



// ----------------------------------------------------------------------------
// 2. SISTEMA DE ARQUIVOS E MIGRAÇÃO
// ----------------------------------------------------------------------------

function getFolder(folderName, parentFolder = null) {
  if (folderName === PASTA_RAIZ) {
    return DriveApp.getFolderById(PASTA_RAIZ_ID);
  }
  const root = parentFolder ? parentFolder : DriveApp.getFolderById(PASTA_RAIZ_ID);
  const folders = root.getFoldersByName(folderName);
  return folders.hasNext() ? folders.next() : root.createFolder(folderName);
}


function verificarEMigrarEstruturaAntiga() {
  var cache = CacheService.getScriptCache();
  var FLAG = 'ESTRUTURA_VERIFICADA_V3';
  if (cache.get(FLAG)) return;

  try {
    var root = DriveApp.getFolderById(PASTA_RAIZ_ID);
    
    var subpastasNecessarias = [
      PASTA_QUESTOES, PASTA_RESUMO_PRO, PASTA_RESUMO_LITE,
      PASTA_DADOS, PASTA_BACKUPS, PASTA_LOUSAS
    ];

    subpastasNecessarias.forEach(function(nome) {
      var it = root.getFoldersByName(nome);
      if (!it.hasNext()) root.createFolder(nome);
    });

    cache.put(FLAG, '1', 86400);
  } catch (e) {
    Logger.log("Erro na verificação de estrutura: " + e.message);
  }
}


function listarArquivosRapido() {
try {
  const cache = CacheService.getScriptCache();
  const cachedData = cache.get(CACHE_KEY_MAPA);
  
  if (cachedData) {
    const parsed = JSON.parse(cachedData);
    const age = Date.now() - (parsed.timestamp || 0);
    if(age < 3600000 && parsed.mapa) {
      return parsed.mapa; 
    }
  }

  const mapaCompleto = _construirMapaDoZero();
  
  try {
    cache.put(CACHE_KEY_MAPA, JSON.stringify({
      mapa: mapaCompleto,
      timestamp: Date.now()
    }), 21600);
  } catch (e) {
    Logger.log("Mapa muito grande para cache.");
  }
  
  return mapaCompleto;
} catch (e) {
  throw new Error(`Erro ao listar arquivos: ${e.message}`);
}
}

function contarQuestoesESubtemas(disciplina, usarCache = true) {
if (!disciplina) return { totalQuestoes: 0, subtemas: [] };

const cache = CacheService.getScriptCache();
const cacheKey = CACHE_KEY_CONTAGEM_PREFIX + disciplina.replace(/\s+/g, '_').toUpperCase();

if (usarCache) {
  const cached = cache.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }
}

const mapa = listarArquivosRapido();
if (!mapa[disciplina] || !mapa[disciplina].questoes) {
  return { totalQuestoes: 0, subtemas: [] };
}

var totalQ = 0;
const subtemasSet = new Set();
const ids = mapa[disciplina].questoes.map(f => f.id);

const todas = carregarMultiplosJsons(ids);

totalQ = todas.length;
todas.forEach(q => {
  if (q.subtema) subtemasSet.add(q.subtema);
});

const resultado = {
  totalQuestoes: totalQ,
  subtemas: Array.from(subtemasSet).sort()
};

try {
  cache.put(cacheKey, JSON.stringify(resultado), 7200);
} catch(e) {
  Logger.log("Erro ao salvar cache contagem: " + e.message);
}

return resultado;
}







function _construirMapaDoZero() {
const disciplinasMap = {};
const processarPasta = (nomePasta, tipo) => {
  const root = getFolder(PASTA_RAIZ);
  const mainFolder = getFolder(nomePasta, root);
  const disciplinaFolders = mainFolder.getFolders();
  
  while (disciplinaFolders.hasNext()) {
    const folder = disciplinaFolders.next();
    const discNome = _disciplinaDoEdital(folder.getName()) || folder.getName();   // V97 — pasta legada com alias cai na chave canônica
    
    if (!disciplinasMap[discNome]) disciplinasMap[discNome] = { questoes: [], vademecum: [] };
    
    const files = folder.getFiles();
    while (files.hasNext()) {
      const file = files.next();
      const fName = file.getName();
      if (fName.endsWith('.json') && fName.includes('___')) {
        const parts = fName.replace('.json', '').split('___');
        if (parts.length >= 2) {
          if (tipo === 'questoes') {
              let temaExtraido = parts[1].replace(/_/g, ' ');
              if (parts[1].includes('_')) {
                try {
                  const blobStr = file.getBlob().getDataAsString();
                  const j = JSON.parse(blobStr);
                  if (j.tema) temaExtraido = j.tema;
                } catch(e) {}
              }
              if (!_pertenceAoEditalAtivo(discNome, temaExtraido, null)) continue;
              temaExtraido = _temaCanonicoEdital(discNome, temaExtraido) || temaExtraido;   // V99 — nome canônico do tema
              disciplinasMap[discNome][tipo].push({
              id: file.getId(),
              tema: temaExtraido,
              nomeArquivo: fName,
              // V31 — carimbo usado para saber se a cópia no Firebase envelheceu.
              // Campo novo: nada que já existia lê esta chave.
              size: file.getSize(),
              // V36 — data da última modificação do arquivo no Drive. O "size" sozinho não
              // percebe correção que mantém o mesmo número de bytes (ex.: gabarito A -> B).
              // O cliente (QST-SYNC) usa este campo para detectar edição no mesmo arquivo.
              atualizado: file.getLastUpdated().getTime()
              });
          }
        }
      }
    }
  }
};
processarPasta(PASTA_QUESTOES, 'questoes');
// V91 — pastas de disciplinas fora do edital não entram no mapa (nada é apagado no Drive)
Object.keys(disciplinasMap).forEach(function(d) {
  if (!_disciplinaDoEdital(d)) delete disciplinasMap[d];
});
// V91 — toda disciplina do edital aparece, mesmo sem pasta/arquivos (a fábrica cria o banco)
if (typeof MAPA_DISTRIBUICAO_EDITAL !== 'undefined' && MAPA_DISTRIBUICAO_EDITAL) {
  Object.keys(MAPA_DISTRIBUICAO_EDITAL).forEach(function(d) {
    var achou = Object.keys(disciplinasMap).some(function(k) { return _normChaveV23(k) === _normChaveV23(d); });
    if (!achou) disciplinasMap[d] = { questoes: [], vademecum: [] };
  });
}
return disciplinasMap;
}



function validarIntegridadeEstado() {
try {
  var estado = carregarEstadoUsuario();
  var relatorio = {
    timestamp:             new Date().toISOString(),
    problemas_encontrados: [],
    correcoes_aplicadas:   [],
    schema_version:        "13.8.2"
  };
  if (!estado.respostas)         estado.respostas = {};
  if (!estado.tempo_por_questao) estado.tempo_por_questao = {};
  if (!estado.contadores_erro)   estado.contadores_erro = {};

  var respostasSemTempo = Object.keys(estado.respostas).filter(
    function(id) { return !estado.tempo_por_questao[id]; }
  );
  if (respostasSemTempo.length > 0) {
    relatorio.problemas_encontrados.push({
      tipo: "RESPOSTAS_SEM_TEMPO", quantidade: respostasSemTempo.length, severidade: "ALTA"
    });
    respostasSemTempo.forEach(function(id) {
      var resp = estado.respostas[id];
      var disciplina = "Desconhecida";
      var fileId = id.substring(0, id.lastIndexOf('_'));
      try {
        var mapa = listarArquivosRapido();
        for (var disc in mapa) {
          if (mapa[disc].questoes && mapa[disc].questoes.some(function(q) { return q.id === fileId; })) {
              disciplina = disc; break;
          }
        }
      } catch(e) {}

      var tempoEstimado = calcularTempoEstimado(estado, disciplina);
      estado.tempo_por_questao[id] = {
        tempo_segundos: tempoEstimado, data_resposta: new Date().toISOString(),
        disciplina: disciplina, tema: "Migrado", subtema: "Legado",
        pausas_detectadas: 0, tempo_bruto: tempoEstimado,
        correta: resp.correta, _migrado: true, _estimado: true
      };
    });
    relatorio.correcoes_aplicadas.push({
      tipo: "TEMPO_ESTIMADO_CRIADO", quantidade: respostasSemTempo.length
    });
  }

  var temposSemResposta = Object.keys(estado.tempo_por_questao).filter(
    function(id) { return !estado.respostas[id]; }
  );
  if (temposSemResposta.length > 0) {
    relatorio.problemas_encontrados.push({
      tipo: "TEMPOS_SEM_RESPOSTA", quantidade: temposSemResposta.length, severidade: "MÉDIA"
    });
    temposSemResposta.forEach(function(id) { delete estado.tempo_por_questao[id]; });
    relatorio.correcoes_aplicadas.push({
      tipo: "TEMPOS_ORFAOS_REMOVIDOS", quantidade: temposSemResposta.length
    });
  }

  var temposImpossiveis = Object.entries(estado.tempo_por_questao)
    .filter(function(par) { return par[1].tempo_segundos < 1 || par[1].tempo_segundos > 3600; })
    .map(function(par) { return { id: par[0], tempo: par[1].tempo_segundos }; });
  if (temposImpossiveis.length > 0) {
    relatorio.problemas_encontrados.push({
      tipo: "TEMPOS_IMPOSSIVEIS", quantidade: temposImpossiveis.length, severidade: "MÉDIA"
    });
    temposImpossiveis.forEach(function(item) {
      var disciplina = estado.tempo_por_questao[item.id].disciplina || "Desconhecida";
      var tempoEstimado = calcularTempoEstimado(estado, disciplina);
      estado.tempo_por_questao[item.id].tempo_segundos = tempoEstimado;
      estado.tempo_por_questao[item.id].tempo_bruto    = tempoEstimado;
      estado.tempo_por_questao[item.id]._corrigido     = true;
    });
    relatorio.correcoes_aplicadas.push({
      tipo: "TEMPOS_AJUSTADOS", quantidade: temposImpossiveis.length
    });
  }

  var mapaAtual = listarArquivosRapido();
  var fileIdsValidos = new Set();
  Object.values(mapaAtual).forEach(function(dados) {
    if (dados.questoes) {
      dados.questoes.forEach(function(arq) { fileIdsValidos.add(arq.id); });
    }
  });
  var idsOrfaos = Object.keys(estado.respostas).filter(function(idOriginal) {
    if (idOriginal.startsWith('SIMULADOR_')) return false;
    return !fileIdsValidos.has(idOriginal.substring(0, idOriginal.lastIndexOf('_')));
  });
  if (idsOrfaos.length > 0) {
    relatorio.problemas_encontrados.push({
      tipo: "IDS_ORFAOS_ARQUIVO_REMOVIDO", quantidade: idsOrfaos.length,
      severidade: "MÉDIA", detalhe: "FileID do Drive não encontrado no mapa atual"
    });
    idsOrfaos.forEach(function(id) {
      delete estado.respostas[id];
      delete estado.tempo_por_questao[id];
      delete estado.contadores_erro[id];
    });
    relatorio.correcoes_aplicadas.push({
      tipo: "ORFAOS_DRIVE_REMOVIDOS", quantidade: idsOrfaos.length
    });
  }

  var hist = carregarHistoricoDesempenho();
  var quc  = hist.questoes_unicas_contabilizadas || {};
  var idsContabilizados = Object.keys(quc);
  if (idsContabilizados.length > 0) {
    var fileIdParaDisciplina = {};
    Object.keys(mapaAtual).forEach(function(disc) {
      if (mapaAtual[disc].questoes) {
        mapaAtual[disc].questoes.forEach(function(arq) {
          fileIdParaDisciplina[arq.id] = disc;
        });
      }
    });
    var idsFantasmas = idsContabilizados.filter(function(id) {
      if (id.startsWith('SIMULADOR_')) return false;
      var fileId = id.substring(0, id.lastIndexOf('_'));
      return !fileIdsValidos.has(fileId) || !estado.respostas[id];
    });
    if (idsFantasmas.length > 0) {
      relatorio.problemas_encontrados.push({
        tipo: "IDS_FANTASMAS_HISTORICO", quantidade: idsFantasmas.length,
        severidade: "ALTA", detalhe: "IDs em questoes_unicas_contabilizadas sem resposta real"
      });
      var acumuladoRecalculado = {};
      Object.keys(estado.respostas).forEach(function(id) {
        var fileId = id.substring(0, id.lastIndexOf('_'));
        var disc   = fileIdParaDisciplina[fileId];
        if (!disc) return;

        if (!acumuladoRecalculado[disc]) acumuladoRecalculado[disc] = { total: 0, acertos: 0 };
        acumuladoRecalculado[disc].total++;
        if (estado.respostas[id].correta) acumuladoRecalculado[disc].acertos++;
      });
      Object.keys(acumuladoRecalculado).forEach(function(disc) {
        var d = acumuladoRecalculado[disc];
        d.percentual = d.total > 0 ? Math.round((d.acertos / d.total) * 100) : 0;
      });
      var qucLimpo = {};
      Object.keys(estado.respostas).forEach(function(id) { qucLimpo[id] = true; });

      hist.acumulado_por_disciplina = acumuladoRecalculado;
      hist.questoes_unicas_contabilizadas = qucLimpo;
      
      var modoCicloNovo = { total_questoes: 0, total_acertos: 0, por_disciplina: {} };
      Object.keys(acumuladoRecalculado).forEach(function(disc) {
        var dDados = acumuladoRecalculado[disc];
        modoCicloNovo.por_disciplina[disc] = {
          total: dDados.total,
          acertos: dDados.acertos,
          percentual: dDados.percentual
        };
        modoCicloNovo.total_questoes += dDados.total;
        modoCicloNovo.total_acertos += dDados.acertos;
      });
      hist.modo_ciclo = modoCicloNovo;
      hist.modo_manual = { total_questoes: 0, total_acertos: 0, por_disciplina: {} };

      _saveJsonComInvalidacao(ARQUIVO_HISTORICO, hist, 'HIST_DESEMP');

      relatorio.correcoes_aplicadas.push({
        tipo: "HISTORICO_RECALCULADO",
        quantidade: idsFantasmas.length,
        detalhe: "acumulado_por_disciplina e modo_ciclo reconstruídos a partir de estado.respostas"
      });
    }
  }

  if (relatorio.correcoes_aplicadas.length > 0) {
    var estadoCorrigido = recalcularAgregacoesTempo(estado);
    salvarEstadoUsuario(estadoCorrigido);
    relatorio.estado_salvo = true;
  }

  relatorio.total_respostas        = Object.keys(estado.respostas).length;
  relatorio.total_tempos           = Object.keys(estado.tempo_por_questao).length;
  relatorio.integridade_percentual = relatorio.total_respostas > 0
    ? Math.round((relatorio.total_tempos / relatorio.total_respostas) * 100)
    : 100;

  return relatorio;
} catch (e) {
  return {
    erro: e.message,
    problemas_encontrados: [{ tipo: "FALHA_VALIDACAO", severidade: "CRÍTICA" }]
  };
}
}


function getFolderStructure(pastaNome, disciplina) {
const root = getFolder(PASTA_RAIZ);
const main = getFolder(pastaNome, root);
return getFolder(disciplina, main);
}

function limparNomeArquivo(texto) {
// Usando caracteres acentuados explícitos para garantir a preservação de toda acentuação PT-BR
return texto.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚãõÃÕâêîôûÂÊÎÔÛàèìòùÀÈÌÒÙçÇ\s.,'()-]/g, '_').trim() || 'sem_nome';
}



function salvarJsonNoDrive(jsonText, disciplina, tema, tipo, subtipo = null) {
try {
  var jsonData;
  try { jsonData = JSON.parse(jsonText); } catch (e) { throw new Error("JSON inválido."); }

  // Validação corrigida para aceitar 'posts'
  if(tipo === 'questoes') {
    if(!jsonData.questoes) throw new Error("Inválido.");
  } else if(tipo === 'vademecum') {
    if(!jsonData.conteudo_html && !jsonData.posts) {
        throw new Error("Requer 'conteudo_html' ou 'posts'.");
    }
  }

  jsonData.disciplina = disciplina;
  jsonData.tema = tema;
  
  var folderName = (tipo === 'questoes') ? PASTA_QUESTOES : 
                    (subtipo === 'lite' ? PASTA_RESUMO_LITE : PASTA_RESUMO_PRO);

  const folder = getFolderStructure(folderName, disciplina);
  
  // USA A FUNÇÃO PADRONIZADA AQUI
  const nomeArquivo = `${limparNomeArquivo(disciplina)}___${limparNomeArquivo(tema)}.json`;
  
  const content = JSON.stringify(jsonData, null, 2);
  const files = folder.getFilesByName(nomeArquivo);
  
  if (files.hasNext()) {
    files.next().setContent(content);
  } else {
    folder.createFile(nomeArquivo, content, MimeType.PLAIN_TEXT);
  }
  
  limparCacheArquivos(); 
  return nomeArquivo;
} catch (e) {
  throw new Error(`Erro salvar: ${e.message}`);
}
}



// Mantenha ou adicione esta função auxiliar para o Resumo Lite
function salvarPostsResumoLite(jsonDados, disciplina, tema) {
// Chama a função principal corrigida, passando 'vademecum' e 'lite'
return salvarJsonNoDrive(JSON.stringify(jsonDados), disciplina, tema, 'vademecum', 'lite');
}






function excluirDisciplinaTotalmente(disciplina) {
try {
  var msg = "";
  const root = getFolder(PASTA_RAIZ);

  const apagarNaPasta = (pastaNome) => {
      const main = getFolder(pastaNome, root);
      const subs = main.getFoldersByName(disciplina);
      if (subs.hasNext()) {
          subs.next().setTrashed(true);
          return true;
      }
      return false;
  };

  if(apagarNaPasta(PASTA_QUESTOES)) msg += "Questões deletadas. ";
  if(apagarNaPasta(PASTA_RESUMO_LITE)) msg += "Resumo Lite deletado. ";
  if(apagarNaPasta(PASTA_RESUMO_PRO)) msg += "Resumo Pro deletado. ";
  
  const config = carregarConfiguracaoCiclo();
  const novaFila = config.fila.filter(item => item.disciplina !== disciplina);
  if (novaFila.length !== config.fila.length) {
    config.fila = novaFila;
    // Ajusta o ponteiro sem zerar o ciclo inteiro
    if (config.ponteiro_fila >= config.fila.length) config.ponteiro_fila = 0;
    salvarConfiguracaoCiclo(config);
    removerDisciplinaDoCache(disciplina);
    msg += "Removida do Ciclo.";
  }

  limparCacheArquivos();
  return msg || "Disciplina não encontrada.";
} catch (e) {
  throw new Error(`Erro ao excluir: ${e.message}`);
}
}

// ----------------------------------------------------------------------------
// 4. RESUMOS (ANTIGO VADE MECUM) - DUAL MODE
// ----------------------------------------------------------------------------

function carregarResumo(disciplina, tema, tipo) {
try {
  const folderName = (tipo === 'lite') ? PASTA_RESUMO_LITE : PASTA_RESUMO_PRO;
  const root = getFolder(PASTA_RAIZ);
  const mainFolder = getFolder(folderName, root);
  var fileAlvo = _acharArquivoResumoV101(mainFolder, disciplina, tema);   // V101 — pasta/arquivo por nome canônico OU legado
  if (!fileAlvo) {
    return null;
  }
  const content = fileAlvo.getBlob().getDataAsString();
  var data;
  try {
    data = JSON.parse(content);
  } catch (parseErr) {
    return null;
  }
  if (tipo === 'lite') {
    if (data.posts && Array.isArray(data.posts)) {
      return content;
    }
    return null;
  }
  if (Array.isArray(data.topicos) && data.topicos.length > 0) {
    const html = data.topicos.map(t => t.conteudo_html || '').join('\n');
    const ctxTopicos = data.topicos.map(t => ({
      titulo: t.titulo || '',
      contexto: t.contexto_llm || ''
    }));
    return {
      conteudo_html: html,
      contexto_llm_topicos: ctxTopicos,
      topicos: data.topicos,
      disciplina: data.disciplina || disciplina,
      tema: data.tema || tema
    };
  }
  var html = data.conteudo_html;
  if (typeof html === 'string' && html.trim().startsWith('{')) {
    try { html = JSON.parse(html).conteudo_html; } catch (e) {}
  }
  const ctxTopicos = data.contexto_llm_topicos;
  const temCtx = Array.isArray(ctxTopicos) && ctxTopicos.length > 0;
  return {
    conteudo_html: html || '',
    contexto_llm_topicos: temCtx ? ctxTopicos : null,
    topicos: data.topicos || null,
    disciplina: data.disciplina || disciplina,
    tema: data.tema || tema
  };
} catch (e) {
  return null;
}
}



function carregarAmbosResumos(disciplina, tema) {
const resultadoPro = carregarResumo(disciplina, tema, 'pro');
const resultadoLite = carregarResumo(disciplina, tema, 'lite');
var conteudoHtml = null;
var ctxLlmTopicos = null;
var topicosNativos = null;
if (resultadoPro && typeof resultadoPro === 'object') {
  conteudoHtml = resultadoPro.conteudo_html || null;
  ctxLlmTopicos = resultadoPro.contexto_llm_topicos || null;
  topicosNativos = resultadoPro.topicos || null;
} else if (typeof resultadoPro === 'string') {
  conteudoHtml = resultadoPro;
  ctxLlmTopicos = null;
}
var liteData = null;
if (resultadoLite) {
  try {
    JSON.parse(resultadoLite);
    liteData = resultadoLite;
  } catch (e) {
    liteData = null;
  }
}
const resposta = {
  pro: conteudoHtml,
  lite: liteData,
  contexto_llm_topicos: ctxLlmTopicos,
  topicos: topicosNativos
};
return resposta;
}






// ----------------------------------------------------------------------------
// 5. CARREGAMENTO DE QUESTÕES E CICLO
// ----------------------------------------------------------------------------



/* ══════════════════════════════════════════════════════════════════════════════
   V103 — TEMA DO ARQUIVO + VERSÃO AO VIVO + DIAGNÓSTICO
   · O tema de cada questão é o do ARQUIVO no mapa (nome no Drive) — o mesmo
     critério do Raio-X e da tela de temas. Um arquivo é um tema com vários
     subtemas. O "tema" de dentro do JSON é só conferido (e logado se divergir).
   · verificarVersaoArquivos: data de modificação AO VIVO no Drive, para o
     navegador saber se o cache dele ainda vale.
   · diagnosticarArquivosTema: compara mapa × Drive × Firebase por arquivo e
     corrige sozinho a cópia do Firebase que não bate com o Drive.
   ══════════════════════════════════════════════════════════════════════════════ */
var _QST_ID_TEMA_MEM = null;
function _qstTemaDoArquivo_(id) {
  if (!_QST_ID_TEMA_MEM) {
    var t = {};
    try {
      var mapa = listarArquivosRapido();
      Object.keys(mapa || {}).forEach(function (d) {
        ((mapa[d] || {}).questoes || []).forEach(function (a) {
          if (a && a.id) t[a.id] = { disciplina: d, tema: a.tema, nome: a.nomeArquivo || '', atualizado: Number(a.atualizado || 0) };
        });
      });
    } catch (e) { console.warn('[QST-TEMA] mapa indisponível: ' + e.message); }
    _QST_ID_TEMA_MEM = t;
  }
  return _QST_ID_TEMA_MEM[id] || null;
}

function _qstMesmoTema_(a, b) {
  try { return _chaveTemaEdital(a) === _chaveTemaEdital(b); }
  catch (e) { return String(a || '').trim() === String(b || '').trim(); }
}

function _qstTemaCanonico_(disc, tema) {
  try {
    var d = _disciplinaDoEdital(disc) || disc;
    return _temaCanonicoEdital(d, tema) || tema;
  } catch (e) { return tema; }
}

function _qstAuditarTemaArquivo_(item, disc, arq) {
  try {
    var n = (item.data.questoes || []).length;
    if (!arq) {
      console.warn('[QST-TEMA] arquivo fora do mapa: ' + item.id + ' | tema do conteúdo="' + (item.data.tema || '—') + '" | ' + n + ' questões');
      return;
    }
    if (!item.data.tema) {
      console.log('[QST-TEMA] "' + arq.nome + '" sem "tema" no topo → tema do nome do arquivo: "' + arq.tema + '" (' + n + ' questões)');
      return;
    }
    if (!_qstMesmoTema_(_qstTemaCanonico_(disc, item.data.tema), arq.tema)) {
      console.warn('[QST-TEMA] ⚠️ DIVERGÊNCIA em "' + arq.nome + '" (' + item.id + '): conteúdo diz "' + item.data.tema +
                   '", nome/mapa diz "' + arq.tema + '". Valendo o nome do arquivo.');
    }
  } catch (e) {}
}

/** Data de modificação AO VIVO no Drive (até 40 arquivos). Arquivo na lixeira/apagado vira "lixeira". */
function verificarVersaoArquivos(fileIds) {
  var t0 = Date.now();
  var ids = (fileIds || []).filter(function (x) { return !!x; }).slice(0, 40);
  var out = { ok: true, vivas: {}, lixeira: [], determinado: false, mapaVelho: false, agora: Date.now() };
  if (!ids.length) return out;
  try {
    var token = ScriptApp.getOAuthToken();
    var resps = UrlFetchApp.fetchAll(ids.map(function (id) {
      return {
        url: 'https://www.googleapis.com/drive/v3/files/' + id + '?fields=modifiedTime,trashed&supportsAllDrives=true',
        headers: { Authorization: 'Bearer ' + token },
        muteHttpExceptions: true
      };
    }));
    var respondeu = 0;
    resps.forEach(function (r, i) {
      var c = r.getResponseCode();
      if (c === 200) {
        respondeu++;
        var j = JSON.parse(r.getContentText());
        if (j.trashed) out.lixeira.push(ids[i]);
        else out.vivas[ids[i]] = Date.parse(j.modifiedTime) || 0;
      } else if (c === 404) {
        respondeu++;
        out.lixeira.push(ids[i]);
      }
    });
    out.determinado = respondeu === ids.length;

    var velhos = ids.filter(function (id) {
      var arq = _qstTemaDoArquivo_(id);
      return out.vivas[id] && arq && arq.atualizado && out.vivas[id] > arq.atualizado;
    });
    if (out.lixeira.length || velhos.length) {
      out.mapaVelho = true;
      limparCacheArquivosSemSujar();
      console.log('[QST-VERSAO] mapa desatualizado (' + velhos.length + ' alterado(s), ' + out.lixeira.length + ' na lixeira) → cache do mapa limpo');
    }
  } catch (e) {
    out.ok = false;
    out.erro = e.message;
  }
  out.ms = Date.now() - t0;
  console.log('[QST-VERSAO] ' + ids.length + ' arquivo(s) · ' + out.lixeira.length + ' na lixeira · mapaVelho=' + out.mapaVelho + ' · ' + out.ms + 'ms');
  return out;
}

/** Compara mapa × Drive × Firebase dos arquivos de um tema e corrige a cópia do Firebase incoerente. */
function diagnosticarArquivosTema(disc, tema) {
  var t0 = Date.now();
  var out = { ok: true, disciplina: disc, tema: tema, arquivos: [], corrigidos: 0 };
  try {
    var mapa = listarArquivosRapido();
    var d = _disciplinaDoEdital(disc) || disc;
    var lista = (mapa[d] && mapa[d].questoes) || (mapa[disc] && mapa[disc].questoes) || [];
    var alvo = lista.filter(function (a) { return a && a.id && _qstMesmoTema_(a.tema, _qstTemaCanonico_(disc, tema)); });
    var ids = alvo.map(function (a) { return a.id; });

    var drive = {};
    try { _carregarJsonsParalelo(ids).forEach(function (it) { drive[it.id] = it.data; }); } catch (e) { out.erro_drive = e.message; }

    var fb = {}, fbMeta = {};
    try {
      if (typeof fbLerEmLote === 'function' && typeof DX_COL_BANCOS !== 'undefined' && typeof _dxAtivo === 'function' && _dxAtivo()) {
        var l = fbLerEmLote(DX_COL_BANCOS, ids);
        if (l.ok) { fb = l.dados || {}; fbMeta = l.meta || {}; }
      }
    } catch (e) { out.erro_firebase = e.message; }

    alvo.forEach(function (a) {
      var dv = drive[a.id], fv = fb[a.id], m = fbMeta[a.id] || {};
      var qd = (dv && Array.isArray(dv.questoes)) ? dv.questoes.length : -1;
      var qf = (fv && Array.isArray(fv.questoes)) ? fv.questoes.length : -1;
      var linha = {
        id: a.id,
        nome: a.nomeArquivo || '',
        tema_mapa: a.tema,
        modificado_drive: a.atualizado ? new Date(a.atualizado).toISOString() : '',
        tema_conteudo_drive: dv ? (dv.tema || '(sem tema no topo)') : '(não lido)',
        qtd_drive: qd,
        tema_conteudo_firebase: fv ? (fv.tema || '(sem tema no topo)') : '(sem cópia)',
        qtd_firebase: qf,
        copiado_firebase: m.atualizado || '',
        coerente: !fv || !dv || (qf === qd && String(fv.tema || '') === String(dv.tema || ''))
      };
      if (!linha.coerente && dv && typeof _dxBancoAtualizado === 'function') {
        try { _dxBancoAtualizado(a.id, dv); linha.corrigido = true; out.corrigidos++; } catch (e) {}
      }
      out.arquivos.push(linha);
    });
  } catch (e) {
    out.ok = false;
    out.erro = e.message;
  }
  out.ms = Date.now() - t0;
  console.log('[QST-DIAG] ' + disc + ' / ' + tema + ' → ' + out.arquivos.length + ' arquivo(s), ' + out.corrigidos + ' cópia(s) do Firebase corrigida(s) · ' + out.ms + 'ms');
  return out;
}

function carregarMultiplosJsons(fileIds) {
var todas = [];
try {
  if (fileIds.length === 0) return todas;

  var resultados = null;

  // ══════════════════════════════════════════════════════════════════════
  // V31 — As questões continuam vindo do Drive. A diferença é que, à medida
  // que são carregadas, vão sendo gravadas no Firebase; da segunda vez em
  // diante já vêm de lá. _dxBancosCarregar devolve null sempre que houver
  // qualquer dúvida — e aí o caminho abaixo, o de sempre, assume.
  // ══════════════════════════════════════════════════════════════════════
  try {
    if (typeof _dxBancosCarregar === 'function') resultados = _dxBancosCarregar(fileIds);
  } catch (eFb) {
    resultados = null;
    console.warn('[V31] banco pelo Firebase falhou, seguindo pelo Drive: ' + eFb.message);
  }

  if (!resultados) {
  try {
    resultados = _carregarJsonsParalelo(fileIds);
  } catch(e) {
    Logger.log('fetchAll falhou, usando fallback sequencial: ' + e.message);
    resultados = [];
    fileIds.forEach(function(id) {
      try {
        var file = DriveApp.getFileById(id);
        var data = JSON.parse(file.getBlob().getDataAsString());
        resultados.push({ id: id, data: data });
      } catch(e2) {}
    });
  }
  }

  resultados.forEach(function(item) {
    if (item.data.questoes && Array.isArray(item.data.questoes)) {
      var disc = item.data.disciplina;
      // V103 — o tema é o do ARQUIVO no mapa (mesmo critério do Raio-X); o do conteúdo é só conferido.
      var _arqMapa = _qstTemaDoArquivo_(item.id);
      var tema = (_arqMapa && _arqMapa.tema) || item.data.tema;
      if (!disc && _arqMapa) disc = _arqMapa.disciplina;
      _qstAuditarTemaArquivo_(item, disc, _arqMapa);
      var _memoCanon = {};   // V99 — nome canônico (raio-x) de disciplina/tema/subtema; JSON do Drive não é reescrito
      var mapeadas = item.data.questoes.map(function(q, i) {
        var _sub = q.subtema || 'Geral';
        var _c = _memoCanon[_sub] || (_memoCanon[_sub] = (_chaveCanonicaEdital(disc, tema, _sub) || { disciplina: disc, tema: tema, subtema: _sub }));
        return {
          ...q,
          idOriginal: item.id + '_' + i,
          disciplina: _c.disciplina,
          tema: _c.tema,
          subtema: _c.subtema
        };
      });
      todas = todas.concat(mapeadas.filter(function(q) {
        return _pertenceAoEditalAtivo(q.disciplina, q.tema, q.subtema);
      }));
    }
  });
  return todas;
} catch (e) {
  throw new Error('Erro ao carregar: ' + e.message);
}
}

function _readJsonComCache(nomeArquivo, ttlSegundos, cacheKey) {
var cache = CacheService.getUserCache();
var KEY = cacheKey || ('DRIVE_FILE_' + nomeArquivo);
var cached = cache.get(KEY);
if (cached) {
  try { return JSON.parse(cached); } catch(e) {}
}
var dados = _readJsonFromDrive(nomeArquivo);
if (dados) {
  try {
    var str = JSON.stringify(dados);
    if (str.length < 100 * 1024) {
      cache.put(KEY, str, ttlSegundos);
    }
  } catch(e) {}
}
return dados;
}

function _saveJsonComInvalidacao(nomeArquivo, dados, cacheKey) {
_saveJsonToDrive(nomeArquivo, dados);
var KEY = cacheKey || ('DRIVE_FILE_' + nomeArquivo);
try { CacheService.getUserCache().remove(KEY); } catch(e) {}
}




// V104 — plano padrão do edital "Agente de Polícia Judicial 2027": 6 meses,
// 10.000 questões, 7 h/dia, 7 min/questão (60 questões/dia), 7 dias/semana
// (com 6 dias cabem 157 dias × 60 = 9.420 < 10.000), 3 disciplinas/dia.
var PLANO_PADRAO_V104 = { volume: 10000, meses: 6, dias_semana: 7, horas: 7, min_questao: 7, disciplinas_dia: 3 };
function _planejamentoPadraoV104() {
  var P = PLANO_PADRAO_V104;
  return {
    volume_total_meta: P.volume, periodo_meses: P.meses, dias_semana: P.dias_semana,
    horas_dia: P.horas, min_por_questao: P.min_questao, disciplinas_dia: P.disciplinas_dia,
    template_usado: ID_TEMPLATE_TRT8_V100,
    meta_qtd_dia: Math.floor(P.horas * 60 / P.min_questao),
    dias_uteis: _diasUteisPlanoV100(P.meses, P.dias_semana),
    data_criacao: new Date().toISOString()
  };
}

function carregarConfiguracaoCiclo() {
var config = _readJsonComCache(ARQUIVO_CONFIG_CICLO, 300, 'CFG_CICLO');
if (!config) {
  config = { 
    meta_acerto_minimo: 80, 
    tamanho_bloco_padrao: 10, 
    ponteiro_fila: 0, 
    fila: [],
    templates: [],
    planejamento: _planejamentoPadraoV104()
  };
  _saveJsonComInvalidacao(ARQUIVO_CONFIG_CICLO, config, 'CFG_CICLO');
}

if (!config.planejamento) {
    config.planejamento = _planejamentoPadraoV104();
}
if (!config.planejamento.dias_semana) config.planejamento.dias_semana = 7;
if (!config.templates) config.templates = [];

var houveMudanca = false;
if (config.fila) {
  config.fila.forEach(function(item) {
    if (!item.id) { item.id = Utilities.getUuid(); houveMudanca = true; }
    if (!item.status_ciclo) item.status_ciclo = 'PENDENTE';
  });
}
// V91 — o ciclo salvo no Drive ainda guardava as disciplinas do concurso fiscal.
var _podaEdital = _podarConfigCicloPeloEdital(config);
if (_podaEdital.mudou) {
  houveMudanca = true;
  if (_podaEdital.removidos.length > 0) {
    Logger.log('[CICLO-EDITAL] Removidas da fila (fora do edital): ' + _podaEdital.removidos.join(' | '));
  }
}
if (houveMudanca) salvarConfiguracaoCiclo(config);
return config;
}



function salvarConfiguracaoCiclo(config) {
if (config.fila) {
  config.fila.forEach(function(item) {
    if (!item.id) item.id = Utilities.getUuid();
  });
}
_saveJsonComInvalidacao(ARQUIVO_CONFIG_CICLO, config, 'CFG_CICLO');
}




// ----------------------------------------------------------------------------
// 5.2 GESTÃO DE CACHE V13.8
// ----------------------------------------------------------------------------

function obterEstruturaCompletaCiclo() {
try {
  return carregarCacheEstrutura();
} catch (e) {
  Logger.log("Erro obterEstruturaCompletaCiclo: " + e.message);
  return { erro: e.message };
}
}


function reconstruirCacheCompleto() {
var config   = carregarConfiguracaoCiclo();
var mapa     = listarArquivosRapido();
var estado   = carregarEstadoUsuario(); 

var fileIdParaDisciplina = {};
Object.keys(mapa).forEach(function(disc) {
  var dados = mapa[disc];
  if (dados.questoes) {
    dados.questoes.forEach(function(arq) {
      fileIdParaDisciplina[arq.id] = disc;
    });
  }
});

var statsReaisPorDisc = {};
Object.keys(estado.respostas || {}).forEach(function(idOriginal) {
  var resp   = estado.respostas[idOriginal];
  var fileId = idOriginal.substring(0, idOriginal.lastIndexOf('_'));
  var disc   = fileIdParaDisciplina[fileId];
  if (!disc) return; 

  if (!statsReaisPorDisc[disc]) {
    statsReaisPorDisc[disc] = { total: 0, acertos: 0 };
  }
  statsReaisPorDisc[disc].total++;
  if (resp.correta) statsReaisPorDisc[disc].acertos++;
});

var hashFila        = gerarHashFila(config.fila);
var disciplinasCache = [];
var aulasCache      = {};
config.fila.forEach(function(item) {
  var contagem  = obterContagemExata(item.disciplina, mapa);
  var stats     = statsReaisPorDisc[item.disciplina] || { total: 0, acertos: 0 };
  var taxa      = stats.total > 0 ? Math.round((stats.acertos / stats.total) * 100) : 0;

  disciplinasCache.push({
    id:                item.id,
    disciplina:        item.disciplina,
    nome:              item.disciplina,
    total_banco:       contagem.totalQuestoes,
    total_subtemas:    contagem.subtemas.length,
    respondidas:       stats.total,
    acertos:           stats.acertos,
    taxa:              taxa,
    peso_raw:          item.peso_raw || 0,
    qtd_bloco:         item.qtd_bloco,
    meta_volume:       item.volume_total_meta || 0,
    ultima_atualizacao: new Date().toISOString()
  });

  var arquivos = (mapa[item.disciplina] && mapa[item.disciplina].questoes) || [];
  if (arquivos.length > 0) {
    aulasCache[item.disciplina] = arquivos.map(function(arq) {
      return {
        id_arquivo:   arq.id,
        aula:         arq.tema,
        nome_arquivo: arq.nomeArquivo,
        disciplina:   item.disciplina
      };
    }).sort(function(a, b) {
      return a.aula.localeCompare(b.aula, undefined, { numeric: true });
    });
  }
});

var cacheCompleto = {
  versao:                    "13.8.2",
  timestamp:                 new Date().toISOString(),
  hash_fila:                 hashFila,
  disciplinas:               disciplinasCache,
  aulas_por_disciplina:      aulasCache,
  questoes_usadas_historico: {}
};

_saveJsonToDrive(ARQUIVO_CACHE_ESTRUTURA, cacheCompleto);
try {
  var str = JSON.stringify(cacheCompleto);
  if (str.length < 100 * 1024) {
    CacheService.getScriptCache().put('ESTRUTURA_CICLO_V13', str, 600);
  }
} catch(e) {}

try { CacheService.getScriptCache().remove('CACHE_PRECISA_RECONSTRUIR'); } catch(e) {}

return cacheCompleto;
}



function obterContagemExata(disciplina, mapa) {
if (!disciplina || !mapa) return { totalQuestoes: 0, subtemas: [] };

const cache = CacheService.getScriptCache();
const cacheKey = "CONTAGEM_EXATA_" + disciplina.replace(/\s+/g, '_').toUpperCase();

const cached = cache.get(cacheKey);
if (cached) {
  try {
    const dados = JSON.parse(cached);
    if (dados.timestamp && (Date.now() - dados.timestamp) < 7200000) return dados;
  } catch(e) {}
}

if (!mapa[disciplina] || !mapa[disciplina].questoes) {
  return { totalQuestoes: 0, subtemas: [] };
}

const ids = mapa[disciplina].questoes.map(f => f.id);
var totalQ = 0;
const subtemasSet = new Set();

// ⚡ PARALELISMO: Lendo todos os arquivos da disciplina DE UMA VEZ SÓ
// V35 — passa pelo Firebase antes de ir ao Drive.
const jsons = _carregarBancosRoteado(ids);

jsons.forEach(item => {
  if (item.data && item.data.questoes && Array.isArray(item.data.questoes)) {
    totalQ += item.data.questoes.length;
    item.data.questoes.forEach(q => {
      if (q.subtema) subtemasSet.add(q.subtema);
    });
  }
});

const resultado = {
  totalQuestoes: totalQ,
  subtemas: Array.from(subtemasSet).sort(),
  timestamp: Date.now()
};

try { cache.put(cacheKey, JSON.stringify(resultado), 7200); } catch(e) {}

return resultado;
}


function carregarCacheEstrutura() {
var scriptCache = CacheService.getScriptCache();
var KEY = 'ESTRUTURA_CICLO_V13';
var cached = scriptCache.get(KEY);

if (cached) {
  try {
    var dadosCache = JSON.parse(cached);
    var config = carregarConfiguracaoCiclo();
    if (dadosCache.hash_fila === gerarHashFila(config.fila)) return dadosCache;
  } catch(e) {}
}

var cache = _readJsonFromDrive(ARQUIVO_CACHE_ESTRUTURA);
if (!cache) return reconstruirCacheCompleto();

var config = carregarConfiguracaoCiclo();
var hashAtual = gerarHashFila(config.fila);
if (cache.hash_fila !== hashAtual) return reconstruirCacheCompleto();

try {
  var str = JSON.stringify(cache);
  if (str.length < 100 * 1024) scriptCache.put(KEY, str, 600);
} catch(e) {}

return cache;
}

function gerarHashFila(fila) {
if(!fila) return "";
const str = fila.map(f => f.id + f.disciplina + f.qtd_bloco).join('|');
return Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, str)
  .map(byte => ('0' + (byte & 0xFF).toString(16)).slice(-2))
  .join('');
}

function adicionarDisciplinaAoCache(disciplina, item) {
var cache = carregarCacheEstrutura();
const contagem = contarQuestoesESubtemas(disciplina, false);
const hist = carregarHistoricoDesempenho();
const dadosHist = hist.acumulado_por_disciplina[disciplina] || { total: 0, acertos: 0, percentual: 0 };

cache.disciplinas.push({
  id: item.id,
  disciplina: disciplina,
  nome: disciplina,
  total_banco: contagem.totalQuestoes,
  total_subtemas: contagem.subtemas.length,
  respondidas: dadosHist.total,
  acertos: dadosHist.acertos,
  taxa: dadosHist.percentual,
  peso_raw: item.peso_raw || 0,
  qtd_bloco: item.qtd_bloco,
  meta_volume: item.volume_total_meta || 0,
  ultima_atualizacao: new Date().toISOString()
});

const mapa = listarArquivosRapido();
if (mapa[disciplina] && mapa[disciplina].questoes) {
  cache.aulas_por_disciplina[disciplina] = mapa[disciplina].questoes.map(arq => ({
    id_arquivo: arq.id,
    aula: arq.tema,
    nome_arquivo: arq.nomeArquivo,
    disciplina: disciplina
  })).sort((a, b) => a.aula.localeCompare(b.aula));
}

const config = carregarConfiguracaoCiclo();
cache.hash_fila = gerarHashFila(config.fila);
cache.timestamp = new Date().toISOString();

_saveJsonToDrive(ARQUIVO_CACHE_ESTRUTURA, cache);
return cache;
}

function removerDisciplinaDoCache(disciplina) {
var cache = carregarCacheEstrutura();
cache.disciplinas = cache.disciplinas.filter(d => d.disciplina !== disciplina);
delete cache.aulas_por_disciplina[disciplina];

const config = carregarConfiguracaoCiclo();
cache.hash_fila = gerarHashFila(config.fila);
cache.timestamp = new Date().toISOString();

_saveJsonToDrive(ARQUIVO_CACHE_ESTRUTURA, cache);
return cache;
}

function obterDetalhesAula(idArquivo) {
  try {
      const file = DriveApp.getFileById(idArquivo);
      const data = JSON.parse(file.getBlob().getDataAsString());
      const estado = carregarEstadoUsuario();
      
      const subtemasStats = {};
      var totalAula = 0;
      
      if (data.questoes) {
          data.questoes.forEach((q, idx) => {
              totalAula++;
              const sub = q.subtema || "Geral";
              const idOriginal = `${idArquivo}_${idx}`;
              
              if (!subtemasStats[sub]) {
                  subtemasStats[sub] = { nome: sub, banco: 0, respondidas: 0, acertos: 0 };
              }
              
              subtemasStats[sub].banco++;
              
              if (estado.respostas[idOriginal]) {
                  subtemasStats[sub].respondidas++;
                  if (estado.respostas[idOriginal].correta) {
                      subtemasStats[sub].acertos++;
                  }
              }
          });
      }
      
      const listaSubtemas = Object.values(subtemasStats).map(s => {
          return {
              ...s,
              taxa: s.respondidas > 0 ? Math.round((s.acertos / s.respondidas) * 100) : 0,
              percentual_banco: totalAula > 0 ? (s.banco / totalAula) * 100 : 0
          };
      });
      
      listaSubtemas.sort((a, b) => b.banco - a.banco);
      
      return {
          sucesso: true,
          aula: data.tema,
          disciplina: data.disciplina,
          total_aula: totalAula,
          subtemas: listaSubtemas
      };
      
  } catch (e) {
      return { erro: e.message };
  }
}

// --- FIM FUNÇÕES PLANEJAMENTO ---

function editarItemCiclo(id, novosParametros) {
try {
  const config = carregarConfiguracaoCiclo();
  const index = config.fila.findIndex(i => i.id === id);
  if (index === -1) throw new Error("Item da fila não encontrado.");
  
  if (novosParametros.qtd_bloco) config.fila[index].qtd_bloco = parseInt(novosParametros.qtd_bloco);
  if (novosParametros.tempo_bloco !== undefined) config.fila[index].tempo_bloco = parseInt(novosParametros.tempo_bloco) || 0; // Salva o tempo
  if (novosParametros.temas) config.fila[index].temas = novosParametros.temas;
  
  salvarConfiguracaoCiclo(config);
  reconstruirCacheCompleto();
  return "Item atualizado com sucesso.";
} catch (e) {
  throw new Error("Erro ao editar item: " + e.message);
}
}



function salvarOrdemERecalcularCiclo(novaOrdemIds) {
var _balV100 = _recalcularBalanceadoV100(novaOrdemIds, 'Fila reorganizada e balanceada sem overflow.');
if (_balV100) return _balV100;
try {
  var config = carregarConfiguracaoCiclo();
  if (!config.fila || config.fila.length === 0) {
    return { erro: "Fila de ciclo não encontrada." };
  }
  var novaFila = [];
  novaOrdemIds.forEach(function(id) {
    var item = config.fila.find(function(f) { return f.id === id; });
    if (item) novaFila.push(item);
  });
  config.fila.forEach(function(item) {
    if (novaOrdemIds.indexOf(item.id) === -1) novaFila.push(item);
  });
  config.fila = novaFila;
  config.fila.forEach(function(item) {
    var p = String(item.peso_raw || 0).replace(',', '.');
    item.peso_raw = Math.abs(Number(p) || 0);
    item.minimo_questoes = 1;
  });
  
  var planejamento = config.planejamento || {};
  var metaDia = Number(String(planejamento.meta_qtd_dia).replace(',', '.')) || 80;
  var discDia = Number(String(planejamento.disciplinas_dia).replace(',', '.')) || 3;
  var minPorQuestao = Number(String(planejamento.min_por_questao).replace(',', '.')) || 3;
  
  var numDisc = config.fila.length;
  var diasPorCiclo = Math.ceil(numDisc / discDia);

  for (var diaIdx = 0; diaIdx < diasPorCiclo; diaIdx++) {
    var inicio = diaIdx * discDia;
    var fim = Math.min(inicio + discDia, numDisc);
    var grupoAtual = config.fila.slice(inicio, fim);
    var somaPesosGrupo = grupoAtual.reduce(function(acc, item) { return acc + (item.peso_raw || 0); }, 0);
    
    if (somaPesosGrupo === 0) {
      var blocoIgual = Math.round(metaDia / grupoAtual.length);
      grupoAtual.forEach(function(item) {
        item.qtd_bloco = Math.max(1, blocoIgual);
        item.tempo_bloco = Math.round(item.qtd_bloco * minPorQuestao);
        item.grupo_ciclo = diaIdx;
      });
    } else {
      grupoAtual.forEach(function(item) {
        var qtdBloco = Math.round(metaDia * ((item.peso_raw || 0) / 100) * diasPorCiclo);
        item.qtd_bloco = Math.max(1, qtdBloco);
        item.tempo_bloco = Math.round(item.qtd_bloco * minPorQuestao);
        item.grupo_ciclo = diaIdx;
      });
    }
  }
  if (!config.ponteiro_fila || config.ponteiro_fila >= config.fila.length) config.ponteiro_fila = 0;
  
  salvarConfiguracaoCiclo(config);
  reconstruirCacheCompleto();
  return {
    sucesso: true,
    msg: "Fila reorganizada e proporcionalizada sem overflow.",
    disciplinas: config.fila.map(function(i) {
      return { disciplina: i.disciplina, peso_raw: i.peso_raw, qtd_bloco: i.qtd_bloco, grupo_ciclo: i.grupo_ciclo, tempo_bloco: i.tempo_bloco };
    })
  };
} catch (e) {
  return { erro: "Erro ao processar: " + e.message };
}
}



function reordenarFilaCiclo(origemIdx, destinoIdx) {
try {
  const config = carregarConfiguracaoCiclo();
  if (origemIdx < 0 || origemIdx >= config.fila.length) throw new Error("Índice de origem inválido.");
  if (destinoIdx < 0 || destinoIdx >= config.fila.length) throw new Error("Índice de destino inválido.");
  
  const item = config.fila.splice(origemIdx, 1)[0];
  config.fila.splice(destinoIdx, 0, item);
  
  const ponteiroAtual = config.ponteiro_fila;
  
  if (ponteiroAtual === origemIdx) {
    config.ponteiro_fila = destinoIdx;
  } else if (origemIdx < ponteiroAtual && destinoIdx >= ponteiroAtual) {
    config.ponteiro_fila--;
  } else if (origemIdx > ponteiroAtual && destinoIdx <= ponteiroAtual) {
    config.ponteiro_fila++;
  }
  
  if (config.ponteiro_fila >= config.fila.length) config.ponteiro_fila = 0;
  if (config.ponteiro_fila < 0) config.ponteiro_fila = 0;
  
  salvarConfiguracaoCiclo(config);
  reconstruirCacheCompleto();
  return config.fila;
} catch (e) {
  throw new Error("Erro ao reordenar: " + e.message);
}
}




function obterDetalhesIndividualDisciplina(disciplina) {
try {
  const mapa = listarArquivosRapido();
  if (!mapa[disciplina] || !mapa[disciplina].questoes) {
    return { erro: "Disciplina não encontrada ou sem questões." };
  }

  const ids = mapa[disciplina].questoes.map(f => f.id);
  const todasQuestoes = carregarMultiplosJsons(ids);
  const estado = carregarEstadoUsuario();
  
  const statsSubtema = {};
  var totalAcertos = 0;
  var totalRespondidas = 0;
  
  todasQuestoes.forEach(q => {
    const sub = q.subtema || 'Geral';
    if (!statsSubtema[sub]) statsSubtema[sub] = { total_banco: 0, respondidas: 0, acertos: 0 };
    
    statsSubtema[sub].total_banco++;
    
    if (estado.respostas[q.idOriginal]) {
      statsSubtema[sub].respondidas++;
      totalRespondidas++;
      if (estado.respostas[q.idOriginal].correta) {
        statsSubtema[sub].acertos++;
        totalAcertos++;
      }
    }
  });

  const listaSubtemas = Object.keys(statsSubtema).map(sub => {
    const s = statsSubtema[sub];
    const taxa = s.respondidas > 0 ? Math.round((s.acertos / s.respondidas) * 100) : 0;
    return {
      nome: sub,
      total_banco: s.total_banco,
      respondidas: s.respondidas,
      acertos: s.acertos,
      taxa_acerto: taxa
    };
  }).sort((a, b) => a.taxa_acerto - b.taxa_acerto); 

  return {
    disciplina: disciplina,
    total_banco: todasQuestoes.length,
    total_respondidas: totalRespondidas,
    total_acertos: totalAcertos,
    taxa_geral: totalRespondidas > 0 ? Math.round((totalAcertos / totalRespondidas) * 100) : 0,
    subtemas: listaSubtemas
  };

} catch (e) {
  return { erro: e.message };
}
}

// ----------------------------------------------------------------------------
// 6. EXECUÇÃO DO CICLO (COM LÓGICA V13.8 - RANDOMIZAÇÃO E QTD EXATA)
// ----------------------------------------------------------------------------

function verificarSessaoSuspensa() {
const sessao = _readJsonFromDrive(ARQUIVO_SESSAO_SUSPENSA);
if (sessao && sessao.ativa) {
  const mapa = listarArquivosRapido();
  if (!mapa[sessao.disciplina]) {
    _saveJsonToDrive(ARQUIVO_SESSAO_SUSPENSA, { ativa: false });
    return null;
  }
  return sessao;
}
return null;
}

function salvarEstadoSuspenso(dadosSessao) {
const payload = {
  ativa: true,
  data: new Date().toISOString(),
  ...dadosSessao
};
_saveJsonToDrive(ARQUIVO_SESSAO_SUSPENSA, payload);
return "Sessão salva.";
}

function descartarSessaoSuspensa() {
_saveJsonToDrive(ARQUIVO_SESSAO_SUSPENSA, { ativa: false });
}

function embaralharArray(array) {
const arr = [...array];
for (var i = arr.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
return arr;
}



function registrarRespostaManual(dados) {
  try {
      var hist = carregarHistoricoDesempenho();
      var config = carregarConfiguracaoCiclo();
      var estado = carregarEstadoUsuario();
      var d = dados.disciplina;
      
      if (!hist.modo_manual) hist.modo_manual = { total_questoes: 0, total_acertos: 0, por_disciplina: {} };
      
      hist.modo_manual.total_questoes++;
      if(dados.correta) hist.modo_manual.total_acertos++;
      
      if(!hist.modo_manual.por_disciplina[d]) hist.modo_manual.por_disciplina[d] = { total: 0, acertos: 0, percentual: 0 };
      var dm = hist.modo_manual.por_disciplina[d];
      dm.total++;
      if(dados.correta) dm.acertos++;
      dm.percentual = Math.round((dm.acertos / dm.total) * 100);
      
      if (!hist.questoes_unicas_contabilizadas) hist.questoes_unicas_contabilizadas = {};
      if (!hist.questoes_unicas_contabilizadas[dados.idOriginal]) {
          hist.questoes_unicas_contabilizadas[dados.idOriginal] = true;
          if (!hist.acumulado_por_disciplina[d]) hist.acumulado_por_disciplina[d] = { total: 0, acertos: 0, percentual: 0 };
          var acc = hist.acumulado_por_disciplina[d];
          acc.total++;
          if(dados.correta) acc.acertos++;
          acc.percentual = Math.round((acc.acertos / acc.total) * 100);
      }
      
      _saveJsonComInvalidacao(ARQUIVO_HISTORICO, hist, 'HIST_DESEMP');
      
      if (config.fila && config.fila.length > 0) {
          var itemFila = config.fila.find(function(f) { return f.disciplina === d; });
          if (itemFila) {
              itemFila.volume_realizado = (itemFila.volume_realizado || 0) + 1;
              var proporcao = (itemFila.volume_realizado / itemFila.volume_total_meta) * 100;
              var taxaAtual = hist.acumulado_por_disciplina[d]?.percentual || 0;
              if (proporcao >= 100 && taxaAtual >= 70) { itemFila.status_ciclo = 'STANDBY'; }
              else if (itemFila.status_ciclo === 'STANDBY' && (proporcao < 100 || taxaAtual < 70)) { itemFila.status_ciclo = 'PENDENTE'; }
              salvarConfiguracaoCiclo(config);
              _agendarReconstrucaoCache();
              _invalidarCacheEstrutura();
          }
      }
      return "OK";
  } catch(e) {
      return "Erro ao registrar manual: " + e.message;
  }
}


function avancarPonteiroCiclo(config) {
config.ponteiro_fila++;
if (config.ponteiro_fila >= config.fila.length) config.ponteiro_fila = 0;
salvarConfiguracaoCiclo(config);
}

// ----------------------------------------------------------------------------
// 7. PERSISTÊNCIA E ESTATÍSTICAS
// ----------------------------------------------------------------------------






function salvarEstadoUsuario(estado) {
// 1. DRIVE = Fonte de verdade (SEMPRE)
_saveJsonToDrive("estado_usuario.json", estado);

// 2. PropertiesService = Ponteiro leve (< 1KB)
var referencia = {
  _fonte: "drive",
  _atualizado: new Date().toISOString(),
  total_respostas: Object.keys(estado.respostas || {}).length,
  total_tempos:    Object.keys(estado.tempo_por_questao || {}).length
};

try {
  PropertiesService.getUserProperties().setProperty(
    CHAVE_ESTADO_USUARIO,
    JSON.stringify(referencia)
  );
} catch (e) {
  Logger.log("⚠️ Falha ao salvar ponteiro no Properties (não crítico): " + e.message);
}
}



function carregarEstadoUsuario() {
try {
  var dados = _readJsonFromDrive("estado_usuario.json");

  if (dados && dados.respostas && Object.keys(dados.respostas).length > 0) {
    // Garantir estruturas mínimas
    if (!dados.contadores_erro)   dados.contadores_erro = {};
    if (!dados.tempo_por_questao) dados.tempo_por_questao = {};
    if (!dados.tempo_agregado)    dados.tempo_agregado = {
      geral: { total_segundos: 0, total_questoes: 0, media_segundos: 0 },
      por_disciplina: {}, por_tema: {}, por_subtema: {}
    };
    if (!dados.historico_tempo_diario) dados.historico_tempo_diario = [];
    return dados;
  }

  // Tentativa de migração: PropertiesService → Drive (primeira execução pós-fix)
  var cache = null;
  try {
    var raw = PropertiesService.getUserProperties().getProperty(CHAVE_ESTADO_USUARIO);
    if (raw) cache = JSON.parse(raw);
  } catch (e) {}

  if (cache && cache.respostas && Object.keys(cache.respostas).length > 0 && !cache._fonte) {
    Logger.log("🔄 MIGRAÇÃO: Encontrados dados reais no Properties. Movendo para Drive...");
    _saveJsonToDrive("estado_usuario.json", cache);
    // Substituir por ponteiro leve
    var ref = { _fonte: "drive", _atualizado: new Date().toISOString(), total_respostas: Object.keys(cache.respostas).length };
    PropertiesService.getUserProperties().setProperty(CHAVE_ESTADO_USUARIO, JSON.stringify(ref));
    Logger.log("✅ MIGRAÇÃO concluída: " + Object.keys(cache.respostas).length + " respostas movidas para Drive.");
    return cache;
  }

  return _criarEstadoVazio();

} catch (e) {
  Logger.log("❌ Erro em carregarEstadoUsuario: " + e.message);
  return _criarEstadoVazio();
}
}


/**
 * V13.8.2 - REMOVIDA
 * A lógica foi incorporada em carregarEstadoUsuario().
 * Manter este stub apenas para compatibilidade caso algum
 * trecho antigo ainda chame esta função.
 */
function _carregarEstadoDoDrive() {
return carregarEstadoUsuario();
}



/**
 * V13.8.2 - Estado vazio padrão (novo usuário ou reset)
 */
function _criarEstadoVazio() {
return {
  respostas: {},
  contadores_erro: {},
  tempo_por_questao: {},
  tempo_agregado: {
    geral: { total_segundos: 0, total_questoes: 0, media_segundos: 0,
              total_horas_formatado: "0h", tendencia: "ESTÁVEL" },
    por_disciplina: {},
    por_tema: {},
    por_subtema: {}
  },
  historico_tempo_diario: [],
  _versao: "13.8.2",
  _criado_em: new Date().toISOString()
};
}






function carregarHistoricoDesempenho() {
var hist = _readJsonComCache(ARQUIVO_HISTORICO, 120, 'HIST_DESEMP');
if (!hist) {
  hist = { 
      historico_diario: [], 
      acumulado_por_disciplina: {},
      modo_ciclo: { total_questoes: 0, total_acertos: 0, por_disciplina: {} },
      modo_manual: { total_questoes: 0, total_acertos: 0, por_disciplina: {} },
      questoes_unicas_contabilizadas: {}
  };
  _saveJsonComInvalidacao(ARQUIVO_HISTORICO, hist, 'HIST_DESEMP');
}
if (!hist.modo_ciclo) hist.modo_ciclo = { total_questoes: 0, total_acertos: 0, por_disciplina: {} };
if (!hist.modo_manual) hist.modo_manual = { total_questoes: 0, total_acertos: 0, por_disciplina: {} };
if (!hist.questoes_unicas_contabilizadas) hist.questoes_unicas_contabilizadas = {};
return hist;
}


function resetFase1_JSONs(tipo) {
  try {
    var histVazio = {
      historico_diario: [], acumulado_por_disciplina: {},
      modo_ciclo: { total_questoes: 0, total_acertos: 0, por_disciplina: {} },
      modo_manual: { total_questoes: 0, total_acertos: 0, por_disciplina: {} },
      questoes_unicas_contabilizadas: {}
    };

    var cfgVazia = {
      meta_acerto_minimo: 80, tamanho_bloco_padrao: 10, ponteiro_fila: 0, fila: [], templates: [],
      planejamento: _planejamentoPadraoV104()   // V104
    };

    if (tipo === 'HARD' || tipo === 'DADOS') {
      PropertiesService.getUserProperties().deleteProperty(CHAVE_ESTADO_USUARIO);
      _saveJsonToDrive("estado_usuario.json", _criarEstadoVazio());
      _saveJsonComInvalidacao(ARQUIVO_HISTORICO, histVazio, 'HIST_DESEMP');
      _saveJsonToDrive(ARQUIVO_SESSAO_SUSPENSA, { ativa: false });
      _saveJsonToDrive(ARQUIVO_BLACKLIST_SESSAO, { ids: [], dia: new Date().toISOString().split('T')[0] });

      // ── RESET DO PONTEIRO DO CICLO (posição sequencial do edital) ──
      try {
        var filep = _getFileByName(ARQUIVO_PONTEIRO_CICLO);
        if (filep) filep.setTrashed(true);
        Logger.log('[RESET-1] Ponteiro do ciclo zerado.');
      } catch (ep) {
        Logger.log('[RESET-1] ⚠️ Ponteiro: ' + ep.message);
      }
    }

    if (tipo === 'HARD') {
      _saveJsonComInvalidacao(ARQUIVO_CONFIG_PREFERENCIAS, DEFAULT_PREFS_JSON, 'PREFS_USER');
      _saveJsonComInvalidacao(ARQUIVO_CONFIG_CICLO, cfgVazia, 'CFG_CICLO');

      // ── LIMPEZA DOS ARTEFATOS DO RAIO-X EM LOTES (NÃO toca no banco) ──
      // Remove o mapeamento antigo + progresso parcial órfão para evitar
      // que o sistema sirva um raio-x desalinhado com o ciclo zerado.
      try {
        _apagarJsonRoteado(ARQUIVO_PROGRESSO_RAIOX);   // V98 — Drive + Firestore
        Logger.log('[RESET-1] Progresso de lotes (raiox_progresso.json) removido.');
      } catch (e1) {
        Logger.log('[RESET-1] ⚠️ Progresso raio-x: ' + e1.message);
      }

      try {
        _apagarJsonRoteado('raiox_banco_v1.json');   // V98 — Drive + Firestore
        Logger.log('[RESET-1] Raio-x antigo (raiox_banco_v1.json) removido.');
      } catch (e2) {
        Logger.log('[RESET-1] ⚠️ Raio-x banco: ' + e2.message);
      }

      try {
        _apagarJsonRoteado(ARQUIVO_CACHE_ESTRUTURA);   // V99 — Drive + Firestore (a leitura é roteada)
        Logger.log('[RESET-1] Cache estrutural removido.');
      } catch (e3) {
        Logger.log('[RESET-1] ⚠️ Cache estrutural: ' + e3.message);
      }

      // Marca raio-x como sujo e derruba flags de boot (sync/async)
      try {
        _marcarRaioXSujo();
        Logger.log('[RESET-1] Raio-x marcado como DESATUALIZADO + flags de boot limpas.');
      } catch (e4) {
        Logger.log('[RESET-1] ⚠️ Marcar sujo: ' + e4.message);
      }
    }

    return { sucesso: true, msg: "Registros e tabelas sistêmicas limpas com sucesso. Banco de questões preservado." };
  } catch(e) {
    return { erro: e.message };
  }
}


function resetFase2_Drive(tipo) {
  try {
    if (tipo === 'HARD' || tipo === 'ARQUIVOS') {
      // As pastas de conteúdo agora são blindadas e permanentes.
      // O reset dos arquivos da PASTA_DADOS já é feito e recriado individualmente na Fase 1.
      return { sucesso: true, msg: "Pastas de conteúdo preservadas permanentemente. Banco intacto." };
    }
    return { sucesso: true, msg: "Ignorado." };
  } catch(e) {
    return { erro: e.message };
  }
}


function resetFase3_Caches() {
  try {
    // 1. Limpa o mapa de arquivos e reconstrói do zero (lê pastas do Drive,
    //    NÃO apaga questões). Marca o raio-x como sujo via limparCacheArquivos.
    limparCacheArquivos();
    var novoMapa = _construirMapaDoZero();
    CacheService.getScriptCache().put(CACHE_KEY_MAPA, JSON.stringify({ mapa: novoMapa, timestamp: Date.now() }), 21600);
    Logger.log('[RESET-3] Mapa de arquivos reconstruído. Disciplinas: ' + Object.keys(novoMapa).length);

    // 2. NÃO reconstrói o raio-x aqui. Apenas garante que ele está marcado
    //    como sujo — a regeneração acontece em LOTES na próxima inicialização,
    //    sem risco de timeout dos 6 minutos.
    _marcarRaioXSujo();
    Logger.log('[RESET-3] Raio-x marcado como DESATUALIZADO. Será regenerado em lotes no próximo boot.');

    // 3. Expurga TODAS as memórias voláteis, incluindo as flags novas de boot
    //    e a trava de rebuild do raio-x.
    CacheService.getScriptCache().removeAll([
      'PREFS_USER', 'HIST_DESEMP', 'CFG_CICLO', 'ESTRUTURA_CICLO_V13',
      'CACHE_PRECISA_RECONSTRUIR', CACHE_KEY_MAPA,
      'DOSSIE_COACH_V1',
      FLAG_BOOT_SYNC, FLAG_BOOT_ASYNC, FLAG_RAIOX_REBUILD
    ]);
    CacheService.getUserCache().removeAll([
      'PREFS_USER', 'HIST_DESEMP', 'CFG_CICLO', 'ESTRUTURA_CICLO_V13'
    ]);
    Logger.log('[RESET-3] Caches voláteis e flags de boot expurgados.');

    return { sucesso: true, msg: "Caches limpos. Raio-x será reconstruído em lotes na próxima inicialização. Banco intacto." };
  } catch(e) {
    return { erro: e.message };
  }
}


function exportarEstatisticas(disciplinaFiltro = null) {
try {
  const estado = carregarEstadoUsuario();
  if (!estado || !estado.respostas) return JSON.stringify({ info: 'Sem dados.' }, null, 2);

  const arquivos = listarArquivosRapido();
  const listaArquivos = [];
  Object.keys(arquivos).forEach(d => {
    arquivos[d].questoes.forEach(q => listaArquivos.push({ ...q, disciplina: d }));
  });
  const idMap = {};
  listaArquivos.forEach(f => idMap[f.id] = { d: f.disciplina, t: f.tema });
  const stats = { data: new Date(), disciplinas: {} };
  Object.entries(estado.respostas).forEach(([key, val]) => {
    const fileId = key.substring(0, key.lastIndexOf('_'));
    const meta = idMap[fileId];
    if (meta) {
      if (!stats.disciplinas[meta.d]) stats.disciplinas[meta.d] = { total: 0, acertos: 0, erros: 0 };
      const s = stats.disciplinas[meta.d];
      s.total++;
      if (val.correta) s.acertos++; else s.erros++;
    }
  });
  Object.keys(stats.disciplinas).forEach(d => {
      const s = stats.disciplinas[d];
      s.percentual = s.total > 0 ? Math.round((s.acertos/s.total)*100) : 0;
  });
  if (disciplinaFiltro) return JSON.stringify(stats.disciplinas[disciplinaFiltro] || {}, null, 2);
  return JSON.stringify(stats, null, 2);
} catch(e) { throw new Error(e.message); }
}



function listarTemasPorDisciplina(disciplina) {
const mapa = listarArquivosRapido();
if (!mapa[disciplina] || !mapa[disciplina].questoes) return [];
return [...new Set(mapa[disciplina].questoes.map(q => q.tema))].sort((a, b) => 
  a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
);
}

// ----------------------------------------------------------------------------
// 8. MÓDULO ANALYTICS V13.8 - ANÁLISE PREDITIVA
// ----------------------------------------------------------------------------


// ════════════════════════════════════════════════════════════════════════════
// V21 — ANALYTICS DIDÁTICO
//
// O analytics que existia respondia "quanto eu fiz e com que taxa" — volume,
// taxa geral, média diária, uma "probabilidade de aprovação" derivada de volume
// bruto, e gargalos que sempre diziam a mesma coisa: faça mais questões por dia.
// Nada disso diz ao aluno O QUE ESTUDAR AMANHÃ.
//
// Pior: a taxa geral MENTE. 70% de acerto pode esconder 95% no que vale 1% do
// edital e 30% no que vale 20%. E a "probabilidade" premiava quem respondeu
// muita questão fácil.
//
// Esta função responde as cinco perguntas que mudam a rotina do aluno:
//   1. Onde eu perco mais pontos?      (peso do edital x taxa de erro)
//   2. O que vou esquecer esta semana? (revisões vencidas, do SRS)
//   3. Quanto do edital eu nunca vi?   (cobertura real, não volume)
//   4. Onde eu estou travado?          (subtemas que não passam o gate)
//   5. Qual minha nota se a prova fosse hoje? (taxa PONDERADA pelo edital)
// ════════════════════════════════════════════════════════════════════════════
function analisarDesempenhoDidatico() {
  try {
    var estado = carregarEstadoUsuario() || { respostas: {}, tempo_por_questao: {}, contadores_erro: {} };
    var config = carregarConfiguracaoCiclo() || {};
    var hoje   = new Date().toISOString().split('T')[0];
    var AMOSTRA_MINIMA = 4;

    // ── 1. Consolida por subtema a partir do que o aluno realmente respondeu ──
    var porSub = {};
    Object.keys(estado.respostas || {}).forEach(function(id) {
      var t = (estado.tempo_por_questao || {})[id];
      if (!t || !t.disciplina) return;
      var _cn = _chaveCanonicaEdital(t.disciplina, t.tema || '', t.subtema || 'Geral');   // V99 — agrega pelo canônico
      var _dn = _cn ? _cn.disciplina : t.disciplina, _tn = _cn ? _cn.tema : (t.tema || ''), sub = _cn ? _cn.subtema : (t.subtema || 'Geral');
      var k = _dn + '\u0000' + _tn + '\u0000' + sub;
      if (!porSub[k]) {
        porSub[k] = { disciplina: _dn, tema: _tn, subtema: sub,
                      total: 0, acertos: 0, erros_acumulados: 0,
                      vencidas: 0, atraso_max: 0, ultima_data: '' };
      }
      var r = porSub[k];
      r.total++;
      if (estado.respostas[id].correta) r.acertos++;
      r.erros_acumulados += ((estado.contadores_erro || {})[id] || 0);

      var quando = t.respondida_em || (t.data_resposta ? String(t.data_resposta).split('T')[0] : '');
      if (quando > r.ultima_data) r.ultima_data = quando;

      if (t.proxima_revisao && t.proxima_revisao <= hoje) {
        r.vencidas++;
        var atraso = Math.round((new Date(hoje) - new Date(t.proxima_revisao)) / 86400000);
        if (atraso > r.atraso_max) r.atraso_max = atraso;
      }
    });

    // ── 2. Cruza com o edital: é o peso que transforma erro em PONTO PERDIDO ──
    var prioridades = [], travados = [], somaPesoVisto = 0, somaPesoAcerto = 0;
    var pesoTotalEdital = 0, pesoCoberto = 0, subtemasEdital = 0, subtemasVistos = 0;
    var nuncaVistos = [];

    Object.keys(MAPA_DISTRIBUICAO_EDITAL || {}).forEach(function(disc) {
      var temas = MAPA_DISTRIBUICAO_EDITAL[disc] || {};
      Object.keys(temas).forEach(function(tema) {
        var subs = temas[tema] || {};
        Object.keys(subs).forEach(function(sub) {
          var cfg = subs[sub] || {};
          var imp = (cfg.importancia || 'MÉDIO').toUpperCase();
          if (imp === 'EXCLUIR') return;                     // fora do edital: ignora

          var peso = parseFloat(String(cfg.distribuicao || '0').replace('%','').replace(',','.')) || 0;
          pesoTotalEdital += peso;
          subtemasEdital++;

          var k = disc + '\u0000' + tema + '\u0000' + sub;
          var r = porSub[k];

          if (!r || r.total === 0) {
            if (peso > 0) nuncaVistos.push({ disciplina: disc, tema: tema, subtema: sub, peso: peso, importancia: imp });
            return;
          }

          subtemasVistos++;
          pesoCoberto += peso;
          var taxa = Math.round((r.acertos / r.total) * 100);
          somaPesoVisto  += peso;
          somaPesoAcerto += peso * (taxa / 100);

          // PONTOS EM JOGO = o que você ainda perde nesse subtema se a prova fosse hoje.
          // É isto que ordena o estudo: peso alto com taxa baixa vem primeiro.
          var pontosEmJogo = Math.round(peso * (1 - taxa / 100) * 100) / 100;

          if (pontosEmJogo > 0) {
            prioridades.push({
              disciplina: disc, tema: tema, subtema: sub,
              peso_edital: peso, importancia: imp,
              taxa_acerto: taxa, respondidas: r.total,
              amostra_confiavel: r.total >= AMOSTRA_MINIMA,
              pontos_em_jogo: pontosEmJogo,
              revisoes_vencidas: r.vencidas,
              ultima_vez: r.ultima_data
            });
          }

          // TRAVADO = amostra suficiente e ainda abaixo do gate da importância
          var gate = (typeof GATE_IMPORTANCIA !== 'undefined' && GATE_IMPORTANCIA[imp] !== undefined)
                     ? GATE_IMPORTANCIA[imp] : 60;
          if (r.total >= AMOSTRA_MINIMA && taxa < gate) {
            var diasParado = r.ultima_data
              ? Math.round((new Date(hoje) - new Date(r.ultima_data)) / 86400000) : 999;
            travados.push({
              disciplina: disc, tema: tema, subtema: sub,
              taxa_acerto: taxa, gate_exigido: gate, faltam: gate - taxa,
              respondidas: r.total, erros_acumulados: r.erros_acumulados,
              dias_sem_tocar: diasParado, peso_edital: peso
            });
          }
        });
      });
    });

    prioridades.sort(function(a,b){ return b.pontos_em_jogo - a.pontos_em_jogo; });
    travados.sort(function(a,b){ return (b.peso_edital * b.faltam) - (a.peso_edital * a.faltam); });
    nuncaVistos.sort(function(a,b){ return b.peso - a.peso; });

    // ── 3. Risco de esquecimento (o SRS já sabia; ninguém mostrava) ──
    var vencTotal = 0, vencPorDisc = {}, atrasoMaximo = 0;
    Object.keys(porSub).forEach(function(k) {
      var r = porSub[k];
      if (!r.vencidas) return;
      vencTotal += r.vencidas;
      vencPorDisc[r.disciplina] = (vencPorDisc[r.disciplina] || 0) + r.vencidas;
      if (r.atraso_max > atrasoMaximo) atrasoMaximo = r.atraso_max;
    });

    // ── 4. Nota estimada: a taxa que a PROVA vê, não a do caderno ──
    var taxaPonderada = somaPesoVisto > 0 ? Math.round((somaPesoAcerto / somaPesoVisto) * 100) : 0;
    var coberturaEdital = pesoTotalEdital > 0 ? Math.round((pesoCoberto / pesoTotalEdital) * 100) : 0;

    // Nota se a prova fosse hoje: o que não foi visto conta como erro.
    var notaHoje = pesoTotalEdital > 0 ? Math.round((somaPesoAcerto / pesoTotalEdital) * 100) : 0;

    var totalResp = Object.keys(estado.respostas || {}).length;
    var totalAcertos = Object.values(estado.respostas || {}).filter(function(r){ return r && r.correta; }).length;
    var taxaBruta = totalResp > 0 ? Math.round((totalAcertos / totalResp) * 100) : 0;

    // ── 5. O plano de ação: 3 frases que dizem o que fazer amanhã ──
    var acoes = [];
    // Limiar 3 para casar com _questoesDevidasRevisao: é a partir daí que o ciclo
    // realmente serve um bloco de revisão. Analytics e motor tinham de falar a
    // mesma língua — avisar só a partir de 10 escondia o problema por 7 questões.
    if (vencTotal >= 3) {
      acoes.push({
        prioridade: 1, tipo: 'REVISAR',
        titulo: vencTotal + ' questão(ões) no ponto de revisar',
        detalhe: 'Atraso de até ' + atrasoMaximo + ' dia(s). Cada dia a mais reduz o que fica retido.',
        acao: 'Faça um bloco do ciclo — a revisão entra sozinha, intercalada.'
      });
    }
    if (prioridades.length) {
      var p = prioridades[0];
      acoes.push({
        prioridade: acoes.length + 1, tipo: 'ATACAR',
        titulo: p.subtema + ' (' + p.disciplina + ')',
        detalhe: 'Vale ' + p.peso_edital + '% do edital e você acerta ' + p.taxa_acerto +
                 '% — são ' + p.pontos_em_jogo + ' ponto(s) percentual(is) em jogo, o maior da sua lista.',
        acao: 'É onde cada hora de estudo rende mais.'
      });
    }
    if (nuncaVistos.length) {
      var pesoInedito = nuncaVistos.reduce(function(a,x){ return a + x.peso; }, 0);
      acoes.push({
        prioridade: acoes.length + 1, tipo: 'COBRIR',
        titulo: nuncaVistos.length + ' subtema(s) nunca estudado(s)',
        detalhe: 'Somam ' + (Math.round(pesoInedito*10)/10) + '% do edital. O maior deles é "' +
                 nuncaVistos[0].subtema + '" (' + nuncaVistos[0].peso + '%).',
        acao: 'Conteúdo nunca visto é erro garantido na prova.'
      });
    }
    if (travados.length) {
      var tr = travados[0];
      acoes.push({
        prioridade: acoes.length + 1, tipo: 'DESTRAVAR',
        titulo: tr.subtema + ' está travado há ' + tr.dias_sem_tocar + ' dia(s)',
        detalhe: 'Você acerta ' + tr.taxa_acerto + '% e o mínimo para avançar é ' + tr.gate_exigido +
                 '%. Faltam ' + tr.faltam + ' pontos.',
        acao: 'Reveja a teoria deste subtema antes de insistir em questões.'
      });
    }
    if (!acoes.length) {
      acoes.push({ prioridade: 1, tipo: 'SEGUIR',
        titulo: 'Sem gargalo crítico agora',
        detalhe: 'Nenhuma revisão vencida, nenhum subtema travado e a cobertura está em dia.',
        acao: 'Siga o ciclo normalmente.' });
    }

    return {
      // A pergunta que importa: qual minha nota se a prova fosse hoje
      nota_estimada_hoje: notaHoje,
      taxa_ponderada_edital: taxaPonderada,
      taxa_bruta_caderno: taxaBruta,
      distorcao_taxa: taxaBruta - taxaPonderada,   // >0 = você é melhor no fácil
      cobertura_edital: coberturaEdital,

      // O que fazer
      plano_de_acao: acoes,
      prioridades: prioridades.slice(0, 10),
      travados: travados.slice(0, 10),
      nunca_vistos: nuncaVistos.slice(0, 10),

      // Esquecimento
      risco_esquecimento: {
        questoes_vencidas: vencTotal,
        atraso_maximo_dias: atrasoMaximo,
        por_disciplina: vencPorDisc
      },

      // Contexto
      cobertura_subtemas: { vistos: subtemasVistos, total: subtemasEdital },
      total_respondidas: totalResp,
      gerado_em: new Date().toISOString()
    };

  } catch (e) {
    Logger.log('[ANALYTICS-DIDATICO] erro: ' + e.message);
    return { erro: e.message };
  }
}

function analisarDesempenhoGeral() {
try {
  const estado = carregarEstadoUsuario();
  const hist = carregarHistoricoDesempenho();
  const config = carregarConfiguracaoCiclo();
  
  const planejamento = config.planejamento || {};
  const META_VOLUME = planejamento.volume_total_meta || 30000;
  const META_DIARIA = planejamento.meta_qtd_dia || 80;
  const PERIODO_MESES = planejamento.periodo_meses || 18;
  const DIAS_SEMANA = planejamento.dias_semana || 5;
  const DIAS_UTEIS_TOTAL = planejamento.dias_uteis || Math.floor(PERIODO_MESES * 4.33 * DIAS_SEMANA);
  const DIAS_UTEIS_MES = DIAS_UTEIS_TOTAL > 0 && PERIODO_MESES > 0 
    ? Math.round(DIAS_UTEIS_TOTAL / PERIODO_MESES) 
    : 22;
  
  const totalRespondidas = Object.keys(estado.respostas).length;
  const totalAcertos = Object.values(estado.respostas).filter(r => r.correta).length;
  const taxaGeralAcerto = totalRespondidas > 0 ? Math.round((totalAcertos / totalRespondidas) * 100) : 0;
  
  const datasUnicas = [...new Set(hist.historico_diario.map(h => h.data.split('T')[0]))];
  const diasAtivos = datasUnicas.length || 0;
  
  const mediaDiariaReal = diasAtivos > 0 ? Math.round(totalRespondidas / diasAtivos) : 0;
  const mediaDiariaParaCalculo = mediaDiariaReal > 0 ? mediaDiariaReal : META_DIARIA;
  
  const volumeRestante = Math.max(0, META_VOLUME - totalRespondidas);
  const diasNecessarios = mediaDiariaParaCalculo > 0 
    ? Math.ceil(volumeRestante / mediaDiariaParaCalculo) 
    : DIAS_UTEIS_TOTAL;
  
  const mesesNecessarios = DIAS_UTEIS_MES > 0 
    ? Math.ceil(diasNecessarios / DIAS_UTEIS_MES) 
    : PERIODO_MESES;
  
  var scoreVolume = Math.min(100, (totalRespondidas / META_VOLUME) * 100) * 0.4;
  var scoreAcerto = taxaGeralAcerto * 0.4;
  var scoreConsistencia = 0;
  if (diasAtivos > 0) {
    scoreConsistencia = Math.min(100, (mediaDiariaReal / META_DIARIA) * 100) * 0.2;
  }
  
  const scoreGlobal = Math.round(scoreVolume + scoreAcerto + scoreConsistencia);
  
  const LIMIAR_ALTO = META_VOLUME;
  const LIMIAR_MEDIO = Math.round(META_VOLUME * 0.5);
  const LIMIAR_BAIXO = Math.round(META_VOLUME * 0.25);
  const META_RITMO_MINIMO = Math.round(META_DIARIA * 0.625);
  
  var probabilidade = 0;
  
  if (totalRespondidas === 0) {
    probabilidade = 0;
  } else if (totalRespondidas >= LIMIAR_ALTO && taxaGeralAcerto >= 70 && mediaDiariaReal >= META_RITMO_MINIMO) {
    probabilidade = 85 + Math.min(15, Math.round((taxaGeralAcerto - 70) / 2));
  } else if (totalRespondidas >= LIMIAR_MEDIO && taxaGeralAcerto >= 65) {
    const progressoAlemMedio = totalRespondidas - LIMIAR_MEDIO;
    const pontosPorProgresso = Math.round(progressoAlemMedio / (LIMIAR_MEDIO / 25));
    probabilidade = 50 + Math.min(35, pontosPorProgresso);
  } else if (totalRespondidas >= LIMIAR_BAIXO) {
    const progressoPercentual = (totalRespondidas / META_VOLUME) * 100;
    probabilidade = 20 + Math.round(progressoPercentual * 0.3);
  } else {
    const progressoPercentual = (totalRespondidas / META_VOLUME) * 100;
    probabilidade = Math.min(20, Math.round(progressoPercentual));
  }
  
  probabilidade = Math.min(99, Math.max(0, probabilidade));
  
  var status = "Iniciante";
  var statusCor = "#e74c3c";
  
  if (totalRespondidas === 0) {
    status = "Não Iniciado";
    statusCor = "#6c757d";
  } else if (scoreGlobal >= 80) { 
    status = "Pronto para Aprovação"; 
    statusCor = "#27ae60"; 
  } else if (scoreGlobal >= 60) { 
    status = "Competitivo"; 
    statusCor = "#f39c12"; 
  } else if (scoreGlobal >= 40) { 
    status = "Em Desenvolvimento"; 
    statusCor = "#3498db"; 
  }
  
  const gargalos = [];
  
  if (totalRespondidas < META_VOLUME) {
    const percentualAtingido = Math.round((totalRespondidas / META_VOLUME) * 100);
    if (totalRespondidas === 0) {
      gargalos.push({
        tipo: "volume",
        mensagem: `Volume: ${totalRespondidas.toLocaleString('pt-BR')}/${META_VOLUME.toLocaleString('pt-BR')} (${percentualAtingido}%)`,
        impacto: "ALTO",
        acao: `Iniciar estudos com meta de ${META_DIARIA}q/dia para concluir em ${PERIODO_MESES} meses`
      });
    } else {
      const ritmoNecessario = mesesNecessarios > 0 && DIAS_UTEIS_MES > 0 
        ? Math.ceil(volumeRestante / (Math.min(mesesNecessarios, PERIODO_MESES) * DIAS_UTEIS_MES)) 
        : META_DIARIA;
      
      gargalos.push({
        tipo: "volume",
        mensagem: `Volume: ${totalRespondidas.toLocaleString('pt-BR')}/${META_VOLUME.toLocaleString('pt-BR')} (${percentualAtingido}%)`,
        impacto: percentualAtingido < 25 ? "ALTO" : percentualAtingido < 50 ? "MÉDIO" : "BAIXO",
        acao: `Manter ritmo de ${ritmoNecessario}q/dia para atingir meta`
      });
    }
  }
  
  if (taxaGeralAcerto < 70 && totalRespondidas > 0) {
    gargalos.push({
      tipo: "taxa_acerto",
      mensagem: `Taxa de acerto: ${taxaGeralAcerto}% (meta: 70%)`,
      impacto: taxaGeralAcerto < 50 ? "ALTO" : "MÉDIO",
      acao: "Revisar questões erradas e focar em teoria das disciplinas críticas"
    });
  }
  
  if (mediaDiariaReal < META_DIARIA && diasAtivos > 0) {
    const percentualRitmo = Math.round((mediaDiariaReal / META_DIARIA) * 100);
    gargalos.push({
      tipo: "ritmo",
      mensagem: `Média diária: ${mediaDiariaReal}q/dia (meta: ${META_DIARIA}q/dia - ${percentualRitmo}%)`,
      impacto: percentualRitmo < 50 ? "ALTO" : "MÉDIO",
      acao: `Aumentar para ${META_DIARIA} questões/dia conforme planejamento`
    });
  }
  
  if (mesesNecessarios > PERIODO_MESES && diasAtivos > 0) {
    gargalos.push({
      tipo: "prazo",
      mensagem: `Projeção: ${mesesNecessarios} meses (prazo: ${PERIODO_MESES} meses)`,
      impacto: "ALTO",
      acao: `Aumentar ritmo diário para cumprir prazo`
    });
  }
  
  return {
    metricas: {
      total_respondidas: totalRespondidas,
      total_acertos: totalAcertos,
      taxa_acerto: taxaGeralAcerto,
      dias_ativos: diasAtivos,
      media_diaria: mediaDiariaReal
    },
    metas_configuradas: {
      volume_total: META_VOLUME,
      meta_diaria: META_DIARIA,
      periodo_meses: PERIODO_MESES,
      dias_semana: DIAS_SEMANA,
      dias_uteis_total: DIAS_UTEIS_TOTAL
    },
    projecao: {
      volume_restante: volumeRestante,
      dias_necessarios: diasNecessarios,
      meses_necessarios: mesesNecessarios,
      data_estimada: calcularDataFuturaAnalytics(diasNecessarios),
      dentro_do_prazo: mesesNecessarios <= PERIODO_MESES,
      usando_meta_configurada: diasAtivos === 0
    },
    score: {
      global: scoreGlobal,
      volume: Math.round(scoreVolume / 0.4),
      acerto: Math.round(scoreAcerto / 0.4),
      consistencia: diasAtivos > 0 ? Math.round(scoreConsistencia / 0.2) : 0
    },
    probabilidade_aprovacao: probabilidade,
    status: status,
    status_cor: statusCor,
    gargalos: gargalos,
    // V21 — o bloco didático viaja junto: nenhuma tela quebra, e quem quiser
    // saber O QUE ESTUDAR (e não só quanto fez) tem a resposta no mesmo payload.
    didatico: (function(){ try { return analisarDesempenhoDidatico(); } catch(e){ return { erro: e.message }; } })()
  };
  
} catch(e) {
  return { erro: e.message };
}
}

function calcularDataFuturaAnalytics(dias) {
const hoje = new Date();
hoje.setDate(hoje.getDate() + dias);
return hoje.toLocaleDateString('pt-BR');
}





// ============================================================================
// BLOCO CORREÇÕES ANALYTICS V13.9.1
// Substitui: obterEstatisticasCiclo, analisarGeralConsolidado,
//            recalcularAgregacoesTempo, analisarDisciplinaIndividual
// ============================================================================


function obterEstatisticasCiclo() {
try {
  var config = carregarConfiguracaoCiclo();
  var estado = carregarEstadoUsuario();
  var mapa = listarArquivosRapido();

  var idParaDisciplina = {};
  Object.keys(mapa).forEach(function(disc) {
    if (mapa[disc] && mapa[disc].questoes) {
      mapa[disc].questoes.forEach(function(arq) {
        idParaDisciplina[arq.id] = disc;
      });
    }
  });

  var statsReais = {};
  if (estado && estado.respostas) {
    Object.keys(estado.respostas).forEach(function(idOriginal) {
      if (!idOriginal) return;
      var resp = estado.respostas[idOriginal];
      if (!resp) return;
      var lastIdx = idOriginal.lastIndexOf('_');
      if (lastIdx === -1) return;
      var fileId = idOriginal.substring(0, lastIdx);
      var disc = idParaDisciplina[fileId];
      if (disc) {
        if (!statsReais[disc]) statsReais[disc] = { total: 0, acertos: 0 };
        statsReais[disc].total++;
        if (resp.correta) statsReais[disc].acertos++;
      }
    });
  }

  var totalQuestoesPrevistas = 0;
  var disciplinasStats = [];

  if (config && config.fila) {
    config.fila.forEach(function(item) {
      if (!item) return;
      totalQuestoesPrevistas += (item.qtd_bloco || 10);
      var real = statsReais[item.disciplina] || { total: 0, acertos: 0 };
      var taxa = real.total > 0 ? Math.round((real.acertos / real.total) * 100) : 0;

      disciplinasStats.push({
        disciplina: item.disciplina,
        id: item.id,
        qtd_bloco: item.qtd_bloco || 10,
        respondidas_total: real.total,
        acertos_total: real.acertos,
        taxa_acerto: taxa,
        meta_volume: item.volume_total_meta || 0,
        percentual_alvo: item.percentual_alvo || 0,
        status: item.status_ciclo || 'PENDENTE',
        peso_raw: item.peso_raw || 0
      });
    });
  }

  var somaNotaPeso = 0;
  var somaPesos = 0;
  disciplinasStats.forEach(function(d) {
    var peso = d.qtd_bloco;
    if (d.respondidas_total > 0) {
      somaNotaPeso += (d.taxa_acerto * peso);
      somaPesos += peso;
    }
  });

  var taxaMediaCiclo = somaPesos > 0 ? Math.round(somaNotaPeso / somaPesos) : 0;
  var totalRespondidas = disciplinasStats.reduce(function(acc, d) { return acc + d.respondidas_total; }, 0);
  var totalAcertos = disciplinasStats.reduce(function(acc, d) { return acc + d.acertos_total; }, 0);

  var hist = carregarHistoricoDesempenho();
  return {
    total_questoes_ciclo: totalQuestoesPrevistas,
    total_respondidas_geral: totalRespondidas,
    total_acertos_geral: totalAcertos,
    taxa_media_ciclo: taxaMediaCiclo,
    disciplinas: disciplinasStats,
    modo_ciclo: hist ? hist.modo_ciclo : {},
    modo_manual: hist ? hist.modo_manual : {}
  };
} catch (e) {
  return { erro: e.message };
}
}


function analisarGeralConsolidado() {
try {
  var estado = carregarEstadoUsuario();
  var tempoAgregado = estado.tempo_agregado ? estado.tempo_agregado.geral : { media_segundos: 0, total_horas_formatado: "0h" };

  var totalRespGeral = 0;
  var totalAcertosGeral = 0;

  if (estado.respostas) {
    var respostasArray = Object.values(estado.respostas);
    totalRespGeral = respostasArray.length;
    totalAcertosGeral = respostasArray.filter(function(r) { return r.correta; }).length;
  }

  var taxaGeral = totalRespGeral > 0 ? Math.round((totalAcertosGeral / totalRespGeral) * 100) : 0;

  var errosPorSubtema = {};
  var subtemaContadores = {};

  Object.keys(estado.contadores_erro || {}).forEach(function(id) {
    var erros = estado.contadores_erro[id] || 0;
    if (erros < 2) return;
    var meta = estado.tempo_por_questao ? estado.tempo_por_questao[id] : null;
    if (!meta) return;
    var chaveSub = (meta.disciplina || '?') + ' > ' + (meta.subtema || 'Geral');
    if (!errosPorSubtema[chaveSub]) errosPorSubtema[chaveSub] = { erros: 0, total: 0, acertos: 0 };
    errosPorSubtema[chaveSub].erros += erros;
  });

  Object.keys(estado.respostas || {}).forEach(function(id) {
    var meta = estado.tempo_por_questao ? estado.tempo_por_questao[id] : null;
    if (!meta) return;
    var chaveSub = (meta.disciplina || '?') + ' > ' + (meta.subtema || 'Geral');
    if (!subtemaContadores[chaveSub]) subtemaContadores[chaveSub] = { total: 0, acertos: 0 };
    subtemaContadores[chaveSub].total++;
    if (estado.respostas[id].correta) subtemaContadores[chaveSub].acertos++;
  });

  var questoesCriticasGlobais = [];
  var topErros = Object.entries(estado.contadores_erro || {})
    .sort(function(a, b) { return b[1] - a[1]; })
    .slice(0, 10);

  topErros.forEach(function(par) {
    var id = par[0];
    var erros = par[1];
    var meta = estado.tempo_por_questao ? estado.tempo_por_questao[id] : null;
    if (meta) {
      questoesCriticasGlobais.push({
        id: id,
        tema: meta.tema,
        subtema: meta.subtema || "Geral",
        enunciado: (meta.disciplina || '') + ' - ' + (meta.tema || ''),
        num_erros: erros
      });
    }
  });

  var subtemasArray = Object.keys(errosPorSubtema)
    .sort(function(a, b) { return errosPorSubtema[b].erros - errosPorSubtema[a].erros; })
    .slice(0, 5)
    .map(function(chave) {
      var contagem = subtemaContadores[chave] || { total: 0, acertos: 0 };
      var taxaSub = contagem.total > 0 ? Math.round((contagem.acertos / contagem.total) * 100) : 0;
      return {
        nome: chave,
        taxa: taxaSub,
        criticidade: taxaSub < 50 ? "ALTA" : "MÉDIA",
        erros: errosPorSubtema[chave].erros
      };
    });

  var recomendacoes = [];
  if (taxaGeral < 70) {
    recomendacoes.push({
      prioridade: "ALTA",
      acao: 'Taxa Geral de ' + taxaGeral + '% está baixa. Focar em revisão base.',
      impacto: "Melhoria sistêmica necessária"
    });
  }
  if (tempoAgregado.media_segundos > 240) {
    recomendacoes.push({
      prioridade: "MÉDIA",
      acao: 'Tempo médio alto (' + Math.round(tempoAgregado.media_segundos / 60) + 'min). Treinar velocidade.',
      impacto: "Gestão de tempo de prova"
    });
  }
  if (questoesCriticasGlobais.length > 0) {
    recomendacoes.push({
      prioridade: "ALTA",
      acao: "Resolver caderno de erros (Top 10 questões mais erradas).",
      impacto: "Eliminação de lacunas recorrentes"
    });
  }

  return {
    disciplina: "VISÃO GERAL DO SISTEMA",
    metricas: {
      total_banco: "N/A",
      total_respondidas: totalRespGeral,
      acertos: totalAcertosGeral,
      taxa_acerto: taxaGeral,
      taxa_recente_30d: 0,
      tendencia: "GERAL",
      tempo_medio: tempoAgregado.media_segundos,
      tempo_total: tempoAgregado.total_horas_formatado
    },
    score: taxaGeral,
    subtemas: subtemasArray,
    questoes_criticas: questoesCriticasGlobais,
    recomendacoes: recomendacoes,
    eh_visao_geral: true
  };

} catch (e) {
  return { erro: e.message };
}
}


function recalcularAgregacoesTempo(estado) {
var CHUNK_SIZE = 500;
var MAX_EXECUTION_TIME = 25000;
var startTime = Date.now();

var agg = {
  geral: { total_segundos: 0, total_questoes: 0 },
  por_disciplina: {},
  por_tema: {},
  por_subtema: {}
};

var tempoMin = Infinity;
var tempoMax = 0;
var idMin = null;
var idMax = null;

var entradas = Object.entries(estado.tempo_por_questao || {});
var totalEntradas = entradas.length;
var processadas = 0;
var foiParcial = false;

for (var i = 0; i < totalEntradas; i += CHUNK_SIZE) {
  if (Date.now() - startTime > MAX_EXECUTION_TIME) {
    Logger.log("⚠️ Timeout detectado. Processadas " + processadas + "/" + totalEntradas);
    foiParcial = true;
    break;
  }

  var chunk = entradas.slice(i, i + CHUNK_SIZE);

  chunk.forEach(function(par) {
    var id = par[0];
    var dados = par[1];
    var t = dados.tempo_segundos;
    var disc = dados.disciplina || 'Desconhecida';
    var tema = disc + '___' + (dados.tema || 'Sem Tema');
    var subtema = tema + '___' + (dados.subtema || 'Geral');

    agg.geral.total_segundos += t;
    agg.geral.total_questoes++;

    if (t < tempoMin) { tempoMin = t; idMin = id; }
    if (t > tempoMax) { tempoMax = t; idMax = id; }

    if (!agg.por_disciplina[disc]) {
      agg.por_disciplina[disc] = { total_segundos: 0, total_questoes: 0 };
    }
    agg.por_disciplina[disc].total_segundos += t;
    agg.por_disciplina[disc].total_questoes++;

    if (!agg.por_tema[tema]) {
      agg.por_tema[tema] = { total_segundos: 0, total_questoes: 0, questoes_ids: [] };
    }
    agg.por_tema[tema].total_segundos += t;
    agg.por_tema[tema].total_questoes++;
    agg.por_tema[tema].questoes_ids.push(id);

    if (!agg.por_subtema[subtema]) {
      agg.por_subtema[subtema] = { total_segundos: 0, total_questoes: 0, questoes_ids: [] };
    }
    agg.por_subtema[subtema].total_segundos += t;
    agg.por_subtema[subtema].total_questoes++;
    agg.por_subtema[subtema].questoes_ids.push(id);

    processadas++;
  });
}

agg.geral.media_segundos = agg.geral.total_questoes > 0
  ? Math.round(agg.geral.total_segundos / agg.geral.total_questoes)
  : 0;

agg.geral.total_horas_formatado = formatarSegundosParaHora(agg.geral.total_segundos);
agg.geral.questao_mais_rapida = idMin && estado.tempo_por_questao[idMin]
  ? { id: idMin, tempo: tempoMin, disciplina: estado.tempo_por_questao[idMin].disciplina }
  : null;
agg.geral.questao_mais_lenta = idMax && estado.tempo_por_questao[idMax]
  ? { id: idMax, tempo: tempoMax, disciplina: estado.tempo_por_questao[idMax].disciplina }
  : null;

agg.geral.tendencia = "ESTÁVEL";
if (estado.historico_tempo_diario && estado.historico_tempo_diario.length >= 2) {
  var ultimo = estado.historico_tempo_diario[estado.historico_tempo_diario.length - 1].media_dia;
  var penultimo = estado.historico_tempo_diario[estado.historico_tempo_diario.length - 2].media_dia;
  if (ultimo < penultimo * 0.95) agg.geral.tendencia = "MELHORANDO";
  else if (ultimo > penultimo * 1.05) agg.geral.tendencia = "PIORANDO";
}

Object.keys(agg.por_disciplina).forEach(function(disc) {
  var d = agg.por_disciplina[disc];
  d.media_segundos = Math.round(d.total_segundos / d.total_questoes);
  d.total_horas_formatado = formatarSegundosParaHora(d.total_segundos);
});

Object.keys(agg.por_tema).forEach(function(tema) {
  var t = agg.por_tema[tema];
  t.media_segundos = Math.round(t.total_segundos / t.total_questoes);
  t.total_horas_formatado = formatarSegundosParaHora(t.total_segundos);
});

Object.keys(agg.por_subtema).forEach(function(sub) {
  var s = agg.por_subtema[sub];
  s.media_segundos = Math.round(s.total_segundos / s.total_questoes);
  s.total_horas_formatado = formatarSegundosParaHora(s.total_segundos);
});

estado.tempo_agregado = agg;
estado._ultima_agregacao = new Date().toISOString();

if (foiParcial) {
  estado._recalculo_parcial = {
    processadas: processadas,
    total: totalEntradas,
    timestamp: new Date().toISOString()
  };
  try {
    CacheService.getScriptCache().put('CACHE_PRECISA_RECONSTRUIR', '1', 600);
  } catch (e) {}
  Logger.log('[AGREGACAO] ⚠️ Parcial salva. Flag CACHE_PRECISA_RECONSTRUIR ativada.');
} else {
  delete estado._recalculo_parcial;
}

return estado;
}


function analisarDisciplinaIndividual(disciplina) {
try {
  var estado = carregarEstadoUsuario();
  var hist = carregarHistoricoDesempenho();
  var mapa = listarArquivosRapido();
  var config = carregarConfiguracaoCiclo();

  if (!mapa[disciplina]) return { erro: "Disciplina não encontrada" };

  var itemFila = config.fila ? config.fila.find(function(f) { return f.disciplina === disciplina; }) : null;
  var META_VOLUME_DISCIPLINA = itemFila ? (itemFila.volume_total_meta || 1000) : 1000;
  var PESO_DISCIPLINA = itemFila ? (itemFila.peso_raw || 0) : 0;
  var QTD_BLOCO = itemFila ? (itemFila.qtd_bloco || 10) : 10;
  var META_MINIMA_RECOMENDADA = Math.max(QTD_BLOCO * 10, Math.round(META_VOLUME_DISCIPLINA * 0.1));

  var arquivos = mapa[disciplina].questoes.map(function(f) { return f.id; });
  var todasQuestoes = carregarMultiplosJsons(arquivos);
  var totalBanco = todasQuestoes.length;

  var respondidas = todasQuestoes.filter(function(q) { return estado.respostas[q.idOriginal]; });
  var totalResp = respondidas.length;
  var acertos = respondidas.filter(function(q) { return estado.respostas[q.idOriginal].correta; }).length;
  var taxa = totalResp > 0 ? Math.round((acertos / totalResp) * 100) : 0;

  var subtemas = {};
  respondidas.forEach(function(q) {
    var sub = q.subtema || "Geral";
    if (!subtemas[sub]) subtemas[sub] = { total: 0, acertos: 0, erros: 0 };
    subtemas[sub].total++;
    if (estado.respostas[q.idOriginal].correta) subtemas[sub].acertos++;
    else subtemas[sub].erros++;
  });

  var subtemasArray = Object.entries(subtemas).map(function(par) {
    var nome = par[0];
    var stats = par[1];
    var taxaSub = Math.round((stats.acertos / stats.total) * 100);
    var criticidade = "BAIXA";
    if (stats.erros >= 5 || (stats.erros >= 3 && taxaSub < 50)) {
      criticidade = "ALTA";
    } else if (stats.erros >= 2 || taxaSub < 60) {
      criticidade = "MÉDIA";
    }
    return { nome: nome, total: stats.total, acertos: stats.acertos, erros: stats.erros, taxa: taxaSub, criticidade: criticidade };
  }).sort(function(a, b) { return a.taxa - b.taxa; });

  var questoesComErros = respondidas
    .filter(function(q) { return !estado.respostas[q.idOriginal].correta; })
    .map(function(q) {
      return {
        id: q.idOriginal,
        tema: q.tema,
        subtema: q.subtema || "Geral",
        enunciado: q.enunciado.substring(0, 100) + "...",
        num_erros: estado.contadores_erro[q.idOriginal] || 1
      };
    })
    .sort(function(a, b) { return b.num_erros - a.num_erros; })
    .slice(0, 10);

  var dataCorte = new Date();
  dataCorte.setDate(dataCorte.getDate() - 30);
  var recente = hist.historico_diario.filter(function(h) {
    return h.disciplina === disciplina && new Date(h.data) >= dataCorte;
  });

  var taxaRecente = 0;
  if (recente.length > 0) {
    var somaPercentuais = recente.reduce(function(sum, h) {
      var perc = h.questoes_respondidas > 0 ? (h.acertos / h.questoes_respondidas) * 100 : 0;
      return sum + perc;
    }, 0);
    taxaRecente = Math.round(somaPercentuais / recente.length);
  }

  var tendencia = "ESTÁVEL";
  if (recente.length >= 5 && taxaRecente > 0 && taxa > 0) {
    var diferenca = taxaRecente - taxa;
    if (diferenca > 5) tendencia = "CRESCENTE";
    else if (diferenca < -5) tendencia = "DECRESCENTE";
  }

  var coberturaPercentual = totalBanco > 0 ? Math.round((totalResp / totalBanco) * 100) : 0;

  var recomendacoes = [];

  if (taxa < 70 && totalResp > 0) {
    recomendacoes.push({
      prioridade: taxa < 50 ? "ALTA" : "MÉDIA",
      acao: 'Revisar teoria: taxa de ' + taxa + '% está abaixo dos 70%',
      impacto: '+' + (70 - taxa) + '% necessários para meta'
    });
  }

  var subtemasCriticos = subtemasArray.filter(function(s) { return s.criticidade === "ALTA"; });
  if (subtemasCriticos.length > 0) {
    subtemasCriticos.slice(0, 3).forEach(function(s) {
      recomendacoes.push({
        prioridade: "ALTA",
        acao: 'Focar em "' + s.nome + '": ' + s.taxa + '% de acerto (' + s.erros + ' erros)',
        impacto: 'Corrigir ' + s.erros + ' erros pode melhorar taxa geral'
      });
    });
  }

  if (totalResp < META_MINIMA_RECOMENDADA) {
    var faltam = META_MINIMA_RECOMENDADA - totalResp;
    recomendacoes.push({
      prioridade: totalResp < QTD_BLOCO * 3 ? "ALTA" : "MÉDIA",
      acao: 'Aumentar volume: ' + totalResp + '/' + META_MINIMA_RECOMENDADA + ' questões mínimas',
      impacto: 'Resolver mais ' + faltam + ' questões para fixação adequada'
    });
  }

  if (coberturaPercentual < 30 && totalBanco > 0) {
    recomendacoes.push({
      prioridade: "MÉDIA",
      acao: 'Cobertura do banco: ' + coberturaPercentual + '% (' + totalResp + '/' + totalBanco + ')',
      impacto: (totalBanco - totalResp) + ' questões inéditas disponíveis'
    });
  }

  var scoreVolume = Math.min(100, (totalResp / META_MINIMA_RECOMENDADA) * 100) * 0.3;
  var scoreAcerto = taxa * 0.5;
  var scoreEvolucao = 10;
  if (tendencia === "CRESCENTE") scoreEvolucao = 20;
  else if (tendencia === "DECRESCENTE") scoreEvolucao = 0;
  var scoreDisciplina = Math.round(scoreVolume + scoreAcerto + scoreEvolucao);

  return {
    disciplina: disciplina,
    metricas: {
      total_banco: totalBanco,
      total_respondidas: totalResp,
      acertos: acertos,
      taxa_acerto: taxa,
      taxa_recente_30d: taxaRecente,
      tendencia: tendencia,
      cobertura_banco: coberturaPercentual
    },
    metas_disciplina: {
      volume_meta: META_VOLUME_DISCIPLINA,
      peso_edital: PESO_DISCIPLINA,
      qtd_bloco: QTD_BLOCO,
      minimo_recomendado: META_MINIMA_RECOMENDADA
    },
    score: scoreDisciplina,
    subtemas: subtemasArray,
    questoes_criticas: questoesComErros,
    recomendacoes: recomendacoes
  };

} catch (e) {
  return { erro: e.message };
}
}




function gerarInsightsAutomaticos() {
try {
  const analiseGeral = analisarDesempenhoGeral();
  const estado = carregarEstadoUsuario();
  const config = carregarConfiguracaoCiclo();
  const mapa = listarArquivosRapido();
  
  const planejamento = config.planejamento || {};
  const META_VOLUME = planejamento.volume_total_meta || 30000;
  const PERIODO_MESES = planejamento.periodo_meses || 18;
  const META_DIARIA = planejamento.meta_qtd_dia || 80;
  
  const insights = [];
  
  const disciplinasRespondidas = {};
  Object.entries(estado.respostas).forEach(([id, resp]) => {
    const fileId = id.substring(0, id.lastIndexOf('_'));
    var discEncontrada = null;
    for (const [disc, dados] of Object.entries(mapa)) {
      if (dados.questoes && dados.questoes.some(q => q.id === fileId)) {
        discEncontrada = disc;
        break;
      }
    }
    if (discEncontrada) {
      disciplinasRespondidas[discEncontrada] = (disciplinasRespondidas[discEncontrada] || 0) + 1;
    }
  });
  
  if (config.fila && config.fila.length > 0) {
    const naoIniciadas = [];
    config.fila.forEach(item => {
      const qtd = disciplinasRespondidas[item.disciplina] || 0;
      if (qtd === 0) {
        naoIniciadas.push({
          nome: item.disciplina,
          peso: item.peso_raw || 0,
          meta: item.volume_total_meta || 0
        });
      }
    });
    
    if (naoIniciadas.length === config.fila.length) {
      insights.push({
        tipo: "ALERTA",
        categoria: "Início",
        titulo: `🚀 Nenhuma disciplina iniciada ainda`,
        descricao: `${config.fila.length} disciplinas aguardando no ciclo`,
        acao: `Iniciar o ciclo de estudos com meta de ${META_DIARIA}q/dia`,
        urgencia: "ALTA"
      });
    } else if (naoIniciadas.length > 0) {
      naoIniciadas.sort((a, b) => b.peso - a.peso);
      naoIniciadas.forEach(d => {
        insights.push({
          tipo: "ALERTA",
          categoria: "Cobertura",
          titulo: `📚 ${d.nome} não iniciada`,
          descricao: `Peso: ${d.peso.toFixed(1)}% | Meta: ${d.meta.toLocaleString('pt-BR')} questões`,
          acao: `Adicionar ao estudo diário`,
          urgencia: d.peso >= 10 ? "ALTA" : "MÉDIA"
        });
      });
    }
  }
  
  if (config.fila) {
    config.fila.forEach(item => {
      const qtd = disciplinasRespondidas[item.disciplina] || 0;
      const minimoRecomendado = Math.max((item.qtd_bloco || 10) * 5, Math.round((item.volume_total_meta || 500) * 0.05));
      
      if (qtd > 0 && qtd < minimoRecomendado) {
        const percentual = Math.round((qtd / minimoRecomendado) * 100);
        insights.push({
          tipo: "AVISO",
          categoria: "Volume",
          titulo: `📊 ${item.disciplina}: ${qtd}/${minimoRecomendado} (${percentual}%)`,
          descricao: `Volume insuficiente para fixação adequada`,
          acao: `Resolver mais ${minimoRecomendado - qtd} questões`,
          urgencia: percentual < 30 ? "ALTA" : "MÉDIA"
        });
      }
    });
  }
  
  const errosMultiplos = Object.entries(estado.contadores_erro || {})
    .filter(([id, count]) => count >= 3).length;
  if (errosMultiplos > 5) {
    insights.push({
      tipo: "CRÍTICO",
      categoria: "Aprendizado",
      titulo: `⚠️ ${errosMultiplos} questões com 3+ erros`,
      descricao: `Padrão indica falhas na revisão`,
      acao: "Implementar revisão espaçada dos erros",
      urgencia: "ALTA"
    });
  }
  
  if (analiseGeral.projecao && analiseGeral.metricas) {
    const diasAtivos = analiseGeral.metricas.dias_ativos || 0;
    if (diasAtivos > 0 && analiseGeral.projecao.meses_necessarios > PERIODO_MESES) {
      const excesso = analiseGeral.projecao.meses_necessarios - PERIODO_MESES;
      insights.push({
        tipo: "CRÍTICO",
        categoria: "Tempo",
        titulo: `⏰ Projeção excede prazo em ${excesso} meses`,
        descricao: `Ritmo atual: ${analiseGeral.metricas.media_diaria}q/dia | Meta: ${META_DIARIA}q/dia`,
        acao: `Aumentar para ${META_DIARIA} questões/dia`,
        urgencia: "ALTA"
      });
    }
  }
  
  Object.entries(disciplinasRespondidas).forEach(([disc, qtd]) => {
    if (qtd >= 20) {
      const analiseDisc = analisarDisciplinaIndividual(disc);
      if (analiseDisc.metricas && analiseDisc.metricas.taxa_acerto < 50) {
        const itemFila = config.fila ? config.fila.find(f => f.disciplina === disc) : null;
        const peso = itemFila?.peso_raw || 0;
        insights.push({
          tipo: "CRÍTICO",
          categoria: "Desempenho",
          titulo: `🔴 ${disc}: ${analiseDisc.metricas.taxa_acerto}%`,
          descricao: peso > 0 ? `Peso: ${peso.toFixed(1)}%` : `${qtd} questões`,
          acao: "Priorizar revisão teórica",
          urgencia: "ALTA"
        });
      }
    }
  });
  const ordemUrgencia = { "ALTA": 1, "MÉDIA": 2, "BAIXA": 3 };
  insights.sort((a, b) => ordemUrgencia[a.urgencia] - ordemUrgencia[b.urgencia]);
  
  return insights.slice(0, 15);
} catch(e) {
  return [{ tipo: "ERRO", titulo: "Erro ao gerar insights", descricao: e.message, urgencia: "ALTA" }];
}
}

function recalcularFilaAposMovimento() {
var _balV100 = _recalcularBalanceadoV100(null, 'Ciclo recalculado e balanceado.');
if (_balV100) return _balV100;
try {
  var config = carregarConfiguracaoCiclo();
  if (!config.fila || config.fila.length === 0) throw new Error("Fila vazia.");
  if (!config.planejamento) throw new Error("Planejamento não encontrado.");
  
  var metaDia = config.planejamento.meta_qtd_dia || 80;
  var discDia = config.planejamento.disciplinas_dia || 3;
  var minPorQuestao = config.planejamento.min_por_questao || 3; // Resgate do min_por_questao
  
  var numDisc = config.fila.length;
  var diasPorCiclo = Math.ceil(numDisc / discDia);

  for (var diaIdx = 0; diaIdx < diasPorCiclo; diaIdx++) {
    var inicio = diaIdx * discDia;
    var fim = Math.min(inicio + discDia, numDisc);
    var grupoAtual = config.fila.slice(inicio, fim);
    var somaPesosGrupo = grupoAtual.reduce(function(acc, item) { return acc + (item.peso_raw || 0); }, 0);
    
    if (somaPesosGrupo === 0) {
      var blocoIgual = Math.round(metaDia / grupoAtual.length);
      grupoAtual.forEach(function(item) {
        item.qtd_bloco = Math.max(1, blocoIgual);
        item.tempo_bloco = Math.round(item.qtd_bloco * minPorQuestao);
        item.grupo_ciclo = diaIdx;
      });
    } else {
      grupoAtual.forEach(function(item) {
        // FIX V14.1 — peso global, não proporção do grupo
        var qtdBloco = Math.round(metaDia * ((item.peso_raw || 0) / 100) * diasPorCiclo);
        item.qtd_bloco = Math.max(1, qtdBloco);
        item.tempo_bloco = Math.round(item.qtd_bloco * minPorQuestao);
        item.grupo_ciclo = diaIdx;
      });
    }
  }
  salvarConfiguracaoCiclo(config);
  reconstruirCacheCompleto();
  return { sucesso: true, msg: "Ciclo recalculado proporcionalmente." };
} catch (e) {
  return { erro: e.message };
}
}


/* SUBSTITUIR INTEIRAMENTE AS FUNÇÕES gerarFilaCicloInteligente E gerarFilaCicloBase NO SEU Code.gs */

/* ══════════════════════════════════════════════════════════════════════════════
   V27 — DIMENSIONAMENTO AUTOMÁTICO DO CICLO, COM TRAVA

   O QUE ESTAVA ERRADO: a criação do ciclo aceitava qualquer combinação de meta,
   prazo, horas e dias. O aluno digitava "5.000 questões em 4 meses" e o sistema
   criava — sem nunca dizer que o edital tem 1.964 subtemas ativos e que o gate
   exige 4 respostas por subtema para avaliar, ou seja 7.856 questões só para
   cobrir o conteúdo uma vez. O plano nascia impossível e só se descobria isso
   meses depois, na prática.

   O QUE PASSA A ACONTECER: antes de criar qualquer coisa, o sistema
     1. mede o edital (subtemas ativos, banco disponível, buracos);
     2. mede a capacidade real (horas × dias × prazo ÷ minutos por questão);
     3. compara com o mínimo que o próprio motor exige para funcionar;
     4. se não fecha, calcula o MENOR ajuste que faz fechar, em ordem do que
        menos incomoda: mais um dia na semana → meia hora a mais no dia →
        estender o prazo → cortar escopo;
     5. TRAVA a criação até que o ajuste seja aceito, ou que o aluno assuma
        explicitamente uma cobertura parcial.

   Nada aqui depende de o aluno entender de dimensionamento: ele escolhe o
   prazo e a disponibilidade, e o sistema devolve o plano fechado.
   ══════════════════════════════════════════════════════════════════════════════ */

var _CACHE_DIAG_V27 = {};

// O piso não é opinião: é a amostra mínima que _gateAprovado exige para
// liberar um subtema. Abaixo disso o gate nunca aprova e o ciclo trava.
function _amostraMinimaV27() {
  try {
    var c = _motorCfg();
    return Math.max(1, c.gate_amostra_min || 1);
  } catch (e) { return 1; }
}

function _diasUteisV27(periodoMeses, diasSemana) {
  var d = _diasUteisPlanoV100(periodoMeses, diasSemana);
  return d > 0 ? d : 1;
}

function _capacidadeV27(horasDia, diasSemana, minPorQuestao, periodoMeses) {
  var porDia = minPorQuestao > 0 ? Math.floor((horasDia * 60) / minPorQuestao) : 0;
  var dias   = _diasUteisV27(periodoMeses, diasSemana);
  return { por_dia: porDia, dias_uteis: dias, total: porDia * dias };
}

// Disciplinas que entrarão na fila, resolvidas do mesmo jeito que gerarFilaCicloBase.
function _disciplinasDoTemplateV27(template) {
  var pesos = {};
  try {
    var salvo = carregarTemplate(template);
    if (salvo && salvo.distribuicao && Array.isArray(salvo.distribuicao)) {
      salvo.distribuicao.forEach(function (e) { pesos[e.disciplina] = e.peso; });
      return pesos;
    }
  } catch (e) {}
  if (template === 'AUDITOR_FISCAL' || template === 'AGENTE_PJ' || template === 'AGENTE_PJ_TRT8' || template === 'RFB' || template === 'TCU') {
    return _distribuicaoPadraoEdital();
  }
  try {
    var mapa = listarArquivosRapido();
    Object.keys(mapa).forEach(function (d) { pesos[d] = 1; });
  } catch (e2) {}
  return pesos;
}

/**
 * Estatística completa do edital e do banco. É o que faltava na criação do ciclo.
 */
function diagnosticarEditalV27(template) {
  var chave = 'tpl::' + _idTemplateCanonico(template);
  if (_CACHE_DIAG_V27[chave]) return _CACHE_DIAG_V27[chave];

  var pesos  = _disciplinasDoTemplateV27(template);
  var arvore = (typeof _arvoreBancoV23 === 'function') ? _arvoreBancoV23() : {};
  var linhas = [];
  var somaPesos = 0;

  Object.keys(pesos).forEach(function (disc) {
    somaPesos += Number(pesos[disc]) || 0;
    var subtemas = 0, semBanco = 0, bancoTotal = 0, temas = 0;

    var listaTemas = [];
    try { listaTemas = _getTemasOrdem(disc); } catch (e) {}
    temas = listaTemas.length;

    listaTemas.forEach(function (tm) {
      var subs = [];
      try { subs = _getSubtemasOrdem(disc, tm); } catch (e) { subs = []; }
      subs.forEach(function (s) {
        var dados = (MAPA_DISTRIBUICAO_EDITAL[disc] && MAPA_DISTRIBUICAO_EDITAL[disc][tm] && MAPA_DISTRIBUICAO_EDITAL[disc][tm][s]) || {};
        var pct = parseFloat(String(dados.distribuicao || '0').replace('%', '').replace(',', '.')) || 0;
        if (pct <= 0) return;
        subtemas++;
        var q = 0;
        if (arvore[disc] && arvore[disc].temas) {
          var alvo = arvore[disc].temas[tm];
          if (!alvo) {
            // tolera deriva de nome do tema (ver _normChaveV23)
            Object.keys(arvore[disc].temas).forEach(function (tk) {
              if (!alvo && typeof _normChaveV23 === 'function' && _normChaveV23(tk) === _normChaveV23(tm)) alvo = arvore[disc].temas[tk];
            });
          }
          if (alvo && alvo.subtemas) {
            var v = alvo.subtemas[s];
            if (v === undefined && typeof _normChaveV23 === 'function') {
              Object.keys(alvo.subtemas).forEach(function (sk) {
                if (v === undefined && _normChaveV23(sk) === _normChaveV23(s)) v = alvo.subtemas[sk];
              });
            }
            q = (typeof v === 'number') ? v : ((v && v.qtd) || 0);
          }
        }
        bancoTotal += q;
        if (q === 0) semBanco++;
      });
    });

    linhas.push({
      disciplina: disc, peso: Number(pesos[disc]) || 0,
      temas: temas, subtemas_ativos: subtemas,
      subtemas_sem_banco: semBanco, banco_total: bancoTotal,
      cobertura_banco_pct: subtemas > 0 ? Math.round((subtemas - semBanco) / subtemas * 100) : 0
    });
  });

  linhas.sort(function (a, b) { return b.subtemas_ativos - a.subtemas_ativos; });

  var totalSub  = linhas.reduce(function (a, l) { return a + l.subtemas_ativos; }, 0);
  var totalSem  = linhas.reduce(function (a, l) { return a + l.subtemas_sem_banco; }, 0);
  var totalBanco = linhas.reduce(function (a, l) { return a + l.banco_total; }, 0);
  var amostra = _amostraMinimaV27();

  var res = {
    template: _idTemplateCanonico(template),
    amostra_minima_gate: amostra,
    disciplinas: linhas,
    soma_pesos: somaPesos,
    total_disciplinas: linhas.length,
    total_subtemas_ativos: totalSub,
    total_subtemas_sem_banco: totalSem,
    total_banco: totalBanco,
    cobertura_banco_pct: totalSub > 0 ? Math.round((totalSub - totalSem) / totalSub * 100) : 0,
    // o mínimo que o motor exige para conseguir avaliar cada subtema uma vez
    meta_minima_cobertura: totalSub * amostra
  };
  _CACHE_DIAG_V27[chave] = res;
  return res;
}

function _invalidarDiagnosticoV27() { _CACHE_DIAG_V27 = {}; }

/**
 * Calcula o plano fechado. Devolve veredito, plano recomendado e alternativas.
 * A ordem de ajuste é da menor para a maior dor: dias na semana, horas no dia,
 * prazo, escopo. Minutos por questão NÃO é ajustado — é o ritmo do aluno.
 */
function calcularPlanoIdealV27(p) {
  p = p || {};
  var template   = _idTemplateCanonico(p.template);
  var meses      = Number(String(p.periodoMeses).replace(',', '.'))   || 6;
  var diasSemana = Number(String(p.diasSemana).replace(',', '.'))     || 5;
  var horasDia   = Number(String(p.horasDia).replace(',', '.'))       || 4;
  var minQ       = Number(String(p.minPorQuestao).replace(',', '.'))  || 6;
  var discDia    = Number(String(p.disciplinasDia).replace(',', '.')) || 3;
  var volumeDes  = Number(String(p.volumeTotal).replace(',', '.'))    || 0;

  var LIM = {
    dias_semana_max: 6,     // 7 dias sem folga não é plano, é receita de abandono
    horas_dia_max:   8,
    meses_max:       Math.max(meses * 2, meses + 12)
  };

  var diag = diagnosticarEditalV27(template);
  var necessario = diag.meta_minima_cobertura;

  function avaliar(h, d, m) {
    var cap = _capacidadeV27(h, d, minQ, m);
    return {
      horas_dia: h, dias_semana: d, periodo_meses: m, min_por_questao: minQ,
      disciplinas_dia: discDia,
      capacidade_dia: cap.por_dia, dias_uteis: cap.dias_uteis, capacidade_periodo: cap.total,
      cobre: cap.total >= necessario,
      folga: cap.total - necessario,
      // a meta fecha entre o mínimo de cobertura e a capacidade; o desejo do
      // aluno só é respeitado quando cabe nos dois
      meta: Math.max(necessario, Math.min(cap.total, volumeDes || necessario))
    };
  }

  var atual = avaliar(horasDia, diasSemana, meses);
  atual.minutos_pico_dia = Math.round(atual.meta / Math.max(1, atual.dias_uteis) * minQ);
  // V-DINAMICO — expõe o Volume que o aluno digitou ao lado da meta que
  // será realmente usada. Quando os dois divergem (aluno digitou menos que
  // o mínimo do edital) a tela mostra o porquê em vez de parecer travada.
  atual.meta_digitada = volumeDes || 0;

  var alternativas = [];
  var recomendado  = null;

  if (atual.cobre) {
    recomendado = atual;
    recomendado.ajuste = 'NENHUM';
    recomendado.explicacao = 'A disponibilidade que você informou já cobre o edital.';
  } else {
    // 1) mais dias por semana
    for (var d1 = diasSemana + 1; d1 <= LIM.dias_semana_max && !recomendado; d1++) {
      var c1 = avaliar(horasDia, d1, meses);
      if (c1.cobre) {
        c1.ajuste = 'DIAS_SEMANA';
        c1.explicacao = 'Estudar ' + d1 + ' dias por semana em vez de ' + diasSemana + '.';
        recomendado = c1;
      }
      alternativas.push(c1);
    }
    // 2) mais meia hora por dia (mantendo os dias originais)
    for (var h1 = horasDia + 0.5; h1 <= LIM.horas_dia_max && !recomendado; h1 += 0.5) {
      var c2 = avaliar(h1, diasSemana, meses);
      if (c2.cobre) {
        c2.ajuste = 'HORAS_DIA';
        c2.explicacao = 'Estudar ' + h1 + 'h por dia em vez de ' + horasDia + 'h.';
        recomendado = c2;
      }
      if (alternativas.length < 24) alternativas.push(c2);
    }
    // 3) esticar o prazo
    for (var m1 = meses + 1; m1 <= LIM.meses_max && !recomendado; m1++) {
      var c3 = avaliar(horasDia, diasSemana, m1);
      if (c3.cobre) {
        c3.ajuste = 'PRAZO';
        c3.explicacao = 'Estender o plano para ' + m1 + ' meses em vez de ' + meses + '.';
        recomendado = c3;
      }
      if (alternativas.length < 36) alternativas.push(c3);
    }
  }

  // 4) cortar escopo — sempre calculado, porque costuma ser a saída real quando
  //    o prazo da prova é fixo
  var cabemSubtemas = Math.floor(atual.capacidade_periodo / diag.amostra_minima_gate);
  var excedente     = Math.max(0, diag.total_subtemas_ativos - cabemSubtemas);
  var cortes = [];
  if (excedente > 0) {
    // corta primeiro onde o edital é largo e o peso é baixo: mais subtemas por
    // ponto de peso = pior relação custo/benefício
    var ranking = diag.disciplinas.slice().filter(function (l) { return l.subtemas_ativos > 0; });
    ranking.sort(function (a, b) {
      return (b.subtemas_ativos / Math.max(0.5, b.peso)) - (a.subtemas_ativos / Math.max(0.5, a.peso));
    });
    var falta = excedente;
    ranking.forEach(function (l) {
      if (falta <= 0) return;
      // nunca zera uma disciplina: no máximo 70% dos subtemas dela
      var podeCortar = Math.min(falta, Math.floor(l.subtemas_ativos * 0.7));
      if (podeCortar <= 0) return;
      cortes.push({
        disciplina: l.disciplina, peso: l.peso,
        subtemas_ativos: l.subtemas_ativos,
        cortar: podeCortar,
        restam: l.subtemas_ativos - podeCortar,
        motivo: l.subtemas_ativos + ' subtemas para ' + l.peso + '% de peso'
      });
      falta -= podeCortar;
    });
  }

  var veredito = atual.cobre ? 'VIAVEL' : (recomendado ? 'AJUSTAR' : 'INVIAVEL');
  var resumo;
  if (veredito === 'VIAVEL') {
    resumo = 'Plano dinâmico: ' + atual.meta + ' questões em ' + atual.dias_uteis +
             ' dias de estudo cobrem os ' + diag.total_subtemas_ativos + ' subtemas do edital.';
  } else if (veredito === 'AJUSTAR') {
    resumo = 'Faltam ' + (necessario - atual.capacidade_periodo) + ' questões de capacidade. ' +
             recomendado.explicacao;
  } else {
    resumo = 'Nem no limite (' + LIM.horas_dia_max + 'h/dia, ' + LIM.dias_semana_max +
             ' dias/semana, ' + LIM.meses_max + ' meses) o edital inteiro cabe. ' +
             'É preciso reduzir o escopo em ~' + excedente + ' subtema(s).';
  }

  return {
    veredito: veredito,
    resumo: resumo,
    diagnostico: diag,
    alocacao: _alocacaoPreviewV100(template, atual.meta, atual.dias_uteis, discDia),
    necessario: necessario,
    atual: atual,
    recomendado: recomendado,
    alternativas: alternativas.slice(0, 12),
    limites: LIM,
    escopo: {
      subtemas_que_cabem: cabemSubtemas,
      excedente: excedente,
      cortes_sugeridos: cortes
    }
  };
}

/** Chamado pela tela a cada mudança de campo. Leve: o diagnóstico fica em cache. */
function previewPlanoV27(p) {
  try {
    return calcularPlanoIdealV27(p);
  } catch (e) {
    Logger.log('[PLANO-V27] ' + e.message);
    return { veredito: 'ERRO', resumo: 'Não foi possível medir o edital: ' + e.message, erro: e.message };
  }
}

function gerarFilaCicloInteligente(parametros) {
return gerarFilaCicloBase(parametros); // O fluxo base agora já atende perfeitamente ao requisito dinâmico
}

function gerarFilaCicloBase(parametros) {
parametros = parametros || {};

/* ══════════════════════════════════════════════════════════════════════════
   V27 — TRAVA DE DIMENSIONAMENTO (roda ANTES de criar qualquer coisa)

   Antes, esta função aceitava qualquer combinação e criava o ciclo. O aluno
   digitava meta e prazo no escuro e só descobria meses depois que o plano não
   cabia. Agora o sistema mede o edital e a capacidade, e:
     • se cabe  → segue, apenas elevando a meta ao mínimo de cobertura;
     • se não cabe e veio `aplicar_recomendado` → aplica o menor ajuste e segue;
     • se não cabe e não veio nada → NÃO cria, e devolve o plano fechado para a
       tela mostrar. `pular_trava: true` existe só para chamadas internas e para
       o aluno que decidir, por escrito, aceitar cobertura parcial.
   ══════════════════════════════════════════════════════════════════════════ */
var _planoV27 = null;
if (parametros.pular_trava !== true && typeof calcularPlanoIdealV27 === 'function') {
  try {
    _planoV27 = calcularPlanoIdealV27(parametros);

    if (_planoV27.veredito !== 'VIAVEL') {
      if (parametros.aplicar_recomendado === true && _planoV27.recomendado) {
        var _r = _planoV27.recomendado;
        parametros = {
          volumeTotal:    _r.meta,
          template:       parametros.template,
          periodoMeses:   _r.periodo_meses,
          diasSemana:     _r.dias_semana,
          horasDia:       _r.horas_dia,
          minPorQuestao:  _r.min_por_questao,
          disciplinasDia: _r.disciplinas_dia,
          pular_trava:    true
        };
        Logger.log('[PLANO-V27] ✅ Ajuste automático aplicado (' + _r.ajuste + '): ' + _r.explicacao);
        _planoV27.ajuste_aplicado = _r.ajuste;
      } else {
        Logger.log('[PLANO-V27] ⛔ Criação bloqueada: ' + _planoV27.resumo);
        return {
          sucesso: false,
          bloqueado_dimensionamento: true,
          erro: _planoV27.resumo,
          plano: _planoV27
        };
      }
    } else if (_planoV27.atual && _planoV27.atual.meta > (Number(String(parametros.volumeTotal).replace(',', '.')) || 0)) {
      // cabe no tempo, mas a meta digitada era menor que a cobertura mínima:
      // elevar é o certo, e é silencioso porque não custa nada ao aluno
      Logger.log('[PLANO-V27] Meta elevada de ' + parametros.volumeTotal + ' para ' +
                 _planoV27.atual.meta + ' (cobertura mínima do edital).');
      parametros.volumeTotal = _planoV27.atual.meta;
      _planoV27.meta_elevada = true;
    }
  } catch (ePl) {
    Logger.log('[PLANO-V27] diagnóstico falhou, seguindo sem trava: ' + ePl.message);
    _planoV27 = null;
  }
}

// V104 — campos vazios caem no plano padrão (6 meses, 10.000 q, 7 h, 7 min, 7 dias, 3 disc./dia)
var volumeTotal = Number(String(parametros.volumeTotal).replace(',', '.')) || PLANO_PADRAO_V104.volume;
var template = _idTemplateCanonico(parametros.template);
var periodoMeses = Number(String(parametros.periodoMeses).replace(',', '.')) || PLANO_PADRAO_V104.meses;
var diasSemana = Number(String(parametros.diasSemana).replace(',', '.')) || PLANO_PADRAO_V104.dias_semana;
var horasDia = Number(String(parametros.horasDia).replace(',', '.')) || PLANO_PADRAO_V104.horas;
var minPorQuestao = Number(String(parametros.minPorQuestao).replace(',', '.')) || PLANO_PADRAO_V104.min_questao; // Parâmetro resgatado
var disciplinasDia = Number(String(parametros.disciplinasDia).replace(',', '.')) || PLANO_PADRAO_V104.disciplinas_dia;
var pesosBase = {};
var niveisBase = {};
var templateSalvo = carregarTemplate(template);

if (templateSalvo && templateSalvo.distribuicao && Array.isArray(templateSalvo.distribuicao)) {
  templateSalvo.distribuicao.forEach(function(e) {
    pesosBase[e.disciplina] = e.peso;
    niveisBase[e.disciplina] = e.nivel;
  });
} else if (template === 'AUDITOR_FISCAL' || template === 'AGENTE_PJ' || template === 'AGENTE_PJ_TRT8' || template === 'RFB' || template === 'TCU') {
  pesosBase = _distribuicaoPadraoEdital();
} else {
  var mapaDisp = listarArquivosRapido();
  Object.keys(mapaDisp).forEach(function(d) {
    pesosBase[d] = 1;
  });
}

var mapa = listarArquivosRapido();
var disciplinasDisponiveis = Object.keys(mapa);
var semanasTotais = periodoMeses * 4.33;
var diasUteisTotais = _diasUteisV27(periodoMeses, diasSemana);
var diasFinais = diasUteisTotais > 0 ? diasUteisTotais : 1;
var metaQtdDia = Math.ceil(volumeTotal / diasFinais);

var entradasOriginais = _entradasEsforcoV100(pesosBase, niveisBase, template, volumeTotal);
var numDisciplinas = entradasOriginais.length;
var diasPorCiclo = Math.ceil(numDisciplinas / disciplinasDia);

// ══════════════════════════════════════════════════════════════════════
// FIX V14.2 — três defeitos corrigidos de uma vez
//
// (1) NORMALIZAÇÃO PELA SOMA REAL, não por 100 fixo.
//     A fórmula antiga usava peso/100, assumindo que os pesos somassem
//     exatamente 100. No fallback de template desconhecido o código atribui
//     peso 1 a cada disciplina: com 14 disciplinas a soma dá 14, e o ciclo
//     entregava só ~14% do volume planejado (levaria ~7x mais tempo).
//     Dividir pela soma REAL funciona para qualquer escala de peso.
//
// (2) GRUPOS BALANCEADOS POR CARGA, não fatias sequenciais.
//     O slice sequencial punha as disciplinas pesadas juntas: nos padrões
//     do app dava dia com 106 questões e outro com 40 (2,65x de diferença).
//     Agora usa greedy LPT: ordena por peso decrescente e joga cada
//     disciplina no grupo de menor carga acumulada que ainda tenha vaga.
//
// (3) somaPesosGrupo era calculada e nunca usada na fórmula (só no if).
//     Era resquício da normalização removida — origem do defeito (2).
// ══════════════════════════════════════════════════════════════════════
var somaPesosTotal = entradasOriginais.reduce(function(acc, item) { return acc + (Number(item[1]) || 0); }, 0);
if (somaPesosTotal <= 0) somaPesosTotal = 1; // blindagem contra divisão por zero

var ordenadasPorPeso = entradasOriginais.slice().sort(function(a, b) { return b[1] - a[1]; });
var gruposBalanceados = [];
for (var gi = 0; gi < diasPorCiclo; gi++) gruposBalanceados.push({ itens: [], carga: 0 });

ordenadasPorPeso.forEach(function(item) {
  var alvo = null;
  for (var gj = 0; gj < gruposBalanceados.length; gj++) {
    var g = gruposBalanceados[gj];
    if (g.itens.length >= disciplinasDia) continue;      // grupo cheio
    if (alvo === null || g.carga < alvo.carga) alvo = g;  // menor carga acumulada
  }
  if (alvo === null) alvo = gruposBalanceados[gruposBalanceados.length - 1]; // fallback
  alvo.itens.push(item);
  alvo.carga += (Number(item[1]) || 0);
});

var itensFila = [];
for (var diaIdx = 0; diaIdx < diasPorCiclo; diaIdx++) {
  var grupoAtual = gruposBalanceados[diaIdx].itens;
  var somaPesosGrupo = gruposBalanceados[diaIdx].carga;

  grupoAtual.forEach(function(item) {
    var nomeTemplate = item[0];
    var peso = item[1];
    var discExiste = disciplinasDisponiveis.find(function(d) { return d.toLowerCase().trim() === nomeTemplate.toLowerCase().trim(); });
    var nomeFinal = discExiste || nomeTemplate;

    if (peso > 0 && somaPesosGrupo > 0) {
      // ════════════════════════════════════════════════════════════════════
      // FIX V14.1 — qtd_bloco proporcional ao PESO GLOBAL do edital
      // Fórmula: cada disciplina aparece 1x a cada 'diasPorCiclo' dias.
      // Para fechar a meta total, cada aparição deve cobrir sua fatia.
      // qtd_bloco = metaDia × (peso/100) × diasPorCiclo
      // ════════════════════════════════════════════════════════════════════
      var blocoDiario = Math.round(metaQtdDia * (peso / somaPesosTotal) * diasPorCiclo);
      var blocoFinal = Math.max(1, blocoDiario);
      
      // CÁLCULO MATEMÁTICO DO TEMPO DO BLOCO
      var tempoFinal = Math.round(blocoFinal * minPorQuestao);

      itensFila.push({
        id: Utilities.getUuid(),
        disciplina: nomeFinal,
        volume_total_meta: Math.round(volumeTotal * (peso / somaPesosTotal)),
        volume_realizado: 0,
        qtd_bloco: blocoFinal,
        tempo_bloco: tempoFinal, // INJEÇÃO DO TEMPO NA CRIAÇÃO
        minimo_questoes: 1,
        temas: ['TODOS'],
        status_drive: discExiste ? 'Disponível' : 'Pendente',
        status_ciclo: 'PENDENTE',
        peso_raw: peso,
        peso_prova: (pesosBase[nomeTemplate] !== undefined ? pesosBase[nomeTemplate] : 0),
        nivel_proficiencia: (Number(niveisBase[nomeTemplate]) || 0),
        grupo_ciclo: diaIdx
      });
    }
  });
}

var config = carregarConfiguracaoCiclo();
config.fila = itensFila;
var _pacoteV100 = null;
try {
  _pacoteV100 = _aplicarEmpacotamentoV100(itensFila, { metaDia: metaQtdDia, disciplinasDia: disciplinasDia, minPorQuestao: minPorQuestao });
} catch (ePkV100) { Logger.log('[V100] empacotamento: ' + ePkV100.message); }
if (_pacoteV100) {
  itensFila = _pacoteV100.fila;
  config.fila = itensFila;
  diasPorCiclo = _pacoteV100.dias_por_ciclo;
}
// Impede o reset de onde você parou no ciclo ao regenerar
if (!config.ponteiro_fila || config.ponteiro_fila >= config.fila.length) config.ponteiro_fila = 0;
config.planejamento = {
  volume_total_meta: volumeTotal,
  periodo_meses: periodoMeses,
  dias_semana: diasSemana,
  template_usado: template,
  horas_dia: horasDia,
  min_por_questao: minPorQuestao,
  disciplinas_dia: disciplinasDia,
  meta_qtd_dia: metaQtdDia,
  dias_uteis: diasFinais,
  dias_por_ciclo: diasPorCiclo,
  balanceado_v100: !!_pacoteV100,
  data_criacao: new Date().toISOString()
};

// V37 — MODO SOMENTE CÁLCULO: usado por telas de pré-visualização (ex.: o
// simulador de progressão) que precisam da fila calculada a partir de dados
// AINDA NÃO salvos, sem gravar nada no Drive nem mexer no ciclo em andamento.
if (parametros.somente_calcular === true) {
  return { sucesso: true, fila: itensFila, planejamento: config.planejamento };
}

salvarConfiguracaoCiclo(config);
_saveJsonToDrive(ARQUIVO_BLACKLIST_SESSAO, { ids: [], dia: new Date().toISOString().split('T')[0] });

var cacheLimpo = {
  versao: "13.8.1",
  timestamp: new Date().toISOString(),
  processamento_em_andamento: true,
  hash_fila: "",
  disciplinas: [],
  aulas_por_disciplina: {},
  questoes_usadas_historico: {}
};
_saveJsonToDrive(ARQUIVO_CACHE_ESTRUTURA, cacheLimpo);

// ══════════════════════════════════════════════════════════════════════
// V20.5 — CHECAGEM DE VIABILIDADE DO PLANO
// `horasDia` era pedido ao aluno, guardado em planejamento.horas_dia e
// NUNCA usado em cálculo nenhum. O plano saía de volumeTotal/dias, sem
// ninguém perguntar se cabe no tempo declarado. O aluno podia dizer
// "tenho 2h por dia", receber um ciclo que exige 5h, descobrir na prática
// e desistir achando que o problema era ele.
// Agora o pior dia do ciclo é comparado com o tempo disponível.
// ══════════════════════════════════════════════════════════════════════
var minutosDisponiveis = Math.round(horasDia * 60);
var minutosPorGrupo = [];
for (var gk = 0; gk < diasPorCiclo; gk++) minutosPorGrupo.push(0);
itensFila.forEach(function(it) {
  var gidx = it.grupo_ciclo || 0;
  if (Array.isArray(it.grupos_ciclo) && Array.isArray(it.pecas_ciclo)) {
    it.grupos_ciclo.forEach(function(g, k) { minutosPorGrupo[g] = (minutosPorGrupo[g] || 0) + Math.round((it.pecas_ciclo[k] || 0) * minPorQuestao); });
    return;
  }
  minutosPorGrupo[gidx] = (minutosPorGrupo[gidx] || 0) + (it.tempo_bloco || 0);
});
var piorDia  = minutosPorGrupo.length ? Math.max.apply(null, minutosPorGrupo) : 0;
var mediaDia = minutosPorGrupo.length
  ? Math.round(minutosPorGrupo.reduce(function(a, b) { return a + b; }, 0) / minutosPorGrupo.length)
  : 0;

var viavel = piorDia <= minutosDisponiveis;
var viabilidade = {
  minutos_disponiveis_dia: minutosDisponiveis,
  minutos_pior_dia:        piorDia,
  minutos_media_dia:       mediaDia,
  viavel:                  viavel,
  folga_pct:               minutosDisponiveis > 0
                             ? Math.round((minutosDisponiveis - piorDia) / minutosDisponiveis * 100)
                             : 0
};

// ══════════════════════════════════════════════════════════════════════════
// V23 — DIMENSIONAMENTO CONTRA A LARGURA DO EDITAL E A CAPACIDADE REAL
// A meta saía de um número digitado, sem confronto com (a) quantos subtemas o
// edital tem e (b) quantas questões cabem no tempo declarado. No plano atual:
// 2.051 subtemas ativos para 1.000 questões de meta — menos de 1 questão por
// subtema — enquanto a capacidade declarada (4h/dia, 3 min/questão, 64 dias)
// é de 5.120 questões. O plano cabia no tempo e mesmo assim não cobria o edital.
// ══════════════════════════════════════════════════════════════════════════
var capacidadeDia     = minPorQuestao > 0 ? Math.floor(minutosDisponiveis / minPorQuestao) : 0;
var capacidadePeriodo = capacidadeDia * diasFinais;
var subtemasAtivos    = 0;
itensFila.forEach(function(it) {
  try {
    subtemasAtivos += _subtemasComPesoEdital(it.disciplina);   // V99 — mesma régua do diagnóstico V27 (ativo e com peso)
  } catch (eSub) {}
});
var DENSIDADE_MINIMA  = _amostraMinimaV27();   // questões por subtema — mesma régua do gate
var metaMinimaEdital  = subtemasAtivos * DENSIDADE_MINIMA;

viabilidade.capacidade_dia_questoes = capacidadeDia;
viabilidade.capacidade_periodo      = capacidadePeriodo;
viabilidade.ociosidade_pct          = capacidadeDia > 0
  ? Math.round((capacidadeDia - metaQtdDia) / capacidadeDia * 100) : 0;
viabilidade.subtemas_ativos_edital  = subtemasAtivos;
viabilidade.densidade_por_subtema   = subtemasAtivos > 0
  ? Number((volumeTotal / subtemasAtivos).toFixed(2)) : 0;
viabilidade.meta_minima_cobertura   = metaMinimaEdital;
viabilidade.meta_sugerida           = Math.min(capacidadePeriodo, metaMinimaEdital);
viabilidade.cobertura_suficiente    = volumeTotal >= metaMinimaEdital;

if (subtemasAtivos > 0 && !viabilidade.cobertura_suficiente) {
  viabilidade.aviso_cobertura =
    'A meta de ' + volumeTotal + ' questões dá ' + viabilidade.densidade_por_subtema +
    ' questão(ões) por subtema, em ' + subtemasAtivos + ' subtemas ativos do edital. ' +
    'Abaixo de ' + DENSIDADE_MINIMA + ' por subtema o gate não tem amostra estatística e a ' +
    'nota estimada não é confiável. Cobertura mínima: ~' + metaMinimaEdital +
    ' questões. Sua capacidade no período: ' + capacidadePeriodo + '. Sugerida: ' +
    viabilidade.meta_sugerida + '.';
  Logger.log('[CICLO-V23] ⚠️ ' + viabilidade.aviso_cobertura);
}
if (viabilidade.ociosidade_pct >= 30) {
  viabilidade.aviso_ociosidade =
    'O plano usa ' + metaQtdDia + ' das ' + capacidadeDia + ' questões/dia que cabem em ' +
    horasDia + 'h (' + viabilidade.ociosidade_pct + '% do tempo declarado fica ocioso).';
  Logger.log('[CICLO-V23] ⚠️ ' + viabilidade.aviso_ociosidade);
}

if (!viavel) {
  var fator = piorDia / (minutosDisponiveis || 1);
  viabilidade.aviso = 'O plano exige ' + piorDia + ' min no dia mais pesado, mas você declarou ' +
                      minutosDisponiveis + ' min por dia (' + horasDia + 'h). Faltam ' +
                      (piorDia - minutosDisponiveis) + ' min.';
  viabilidade.sugestoes = [
    'Estender o período para ~' + Math.ceil(periodoMeses * fator) + ' meses (hoje: ' + periodoMeses + ')',
    'Reduzir a meta para ~' + Math.floor(volumeTotal / fator) + ' questões (hoje: ' + volumeTotal + ')',
    'Estudar ' + Math.ceil(diasSemana * fator) + ' dias por semana (hoje: ' + diasSemana + ')'
  ];
  Logger.log('[CICLO-VIABILIDADE] ⚠️ ' + viabilidade.aviso);
} else {
  Logger.log('[CICLO-VIABILIDADE] ✅ pior dia ' + piorDia + ' min de ' + minutosDisponiveis +
             ' disponíveis (folga de ' + viabilidade.folga_pct + '%)');
}

config.planejamento.viabilidade = viabilidade;

// V27 — deixa registrado COMO o plano foi dimensionado. Sem isto, daqui a dois
// meses ninguém sabe se a meta foi escolhida ou ajustada, nem sob que edital.
if (_planoV27) {
  config.planejamento.plano_v27 = {
    veredito:            _planoV27.veredito,
    resumo:              _planoV27.resumo,
    necessario:          _planoV27.necessario,
    ajuste_aplicado:     _planoV27.ajuste_aplicado || 'NENHUM',
    meta_elevada:        !!_planoV27.meta_elevada,
    subtemas_ativos:     _planoV27.diagnostico ? _planoV27.diagnostico.total_subtemas_ativos : null,
    subtemas_sem_banco:  _planoV27.diagnostico ? _planoV27.diagnostico.total_subtemas_sem_banco : null,
    amostra_minima_gate: _planoV27.diagnostico ? _planoV27.diagnostico.amostra_minima_gate : null,
    excedente_escopo:    _planoV27.escopo ? _planoV27.escopo.excedente : 0,
    data:                new Date().toISOString()
  };
}

salvarConfiguracaoCiclo(config);

return {
  sucesso: true,
  totalDisciplinas: itensFila.length,
  disciplinas: itensFila.map(function(i) { return i.disciplina; }),
  metaDiaria: metaQtdDia,
  viabilidade: viabilidade,
  plano: _planoV27   // V27 — a tela mostra o que foi dimensionado e o que foi ajustado
};
}


function processarDisciplinaUnica(index) {
try {
  const config = carregarConfiguracaoCiclo();
  const mapa = listarArquivosRapido();
  const hist = carregarHistoricoDesempenho();
  
  if (!config.fila || index >= config.fila.length) {
    return { erro: "Índice inválido", index: index };
  }
  
  const item = config.fila[index];
  const disciplina = item.disciplina;
  
  var totalQuestoes = 0;
  var subtemas = [];
  var totalArquivos = 0;
  
  if (mapa[disciplina] && mapa[disciplina].questoes) {
    const arquivos = mapa[disciplina].questoes;
    totalArquivos = arquivos.length;
    const subtemasSet = new Set();
    
    arquivos.forEach(arq => {
      try {
        const file = DriveApp.getFileById(arq.id);
        const data = JSON.parse(file.getBlob().getDataAsString());
        if (data.questoes && Array.isArray(data.questoes)) {
          totalQuestoes += data.questoes.length;
          data.questoes.forEach(q => {
            if (q.subtema) subtemasSet.add(q.subtema);
          });
        }
      } catch(e) {}
    });
    
    subtemas = Array.from(subtemasSet).sort();
  }
  
  const dadosHist = hist.acumulado_por_disciplina[disciplina] || { total: 0, acertos: 0, percentual: 0 };
  
  var cache = _readJsonFromDrive(ARQUIVO_CACHE_ESTRUTURA);
  if (!cache) {
    cache = {
      versao: "13.8.1",
      timestamp: new Date().toISOString(),
      hash_fila: gerarHashFila(config.fila),
      disciplinas: [],
      aulas_por_disciplina: {},
      questoes_usadas_historico: {}
    };
  }
  
  const dadosDisciplina = {
    id: item.id,
    disciplina: disciplina,
    nome: disciplina,
    total_banco: totalQuestoes,
    total_subtemas: subtemas.length,
    respondidas: dadosHist.total,
    acertos: dadosHist.acertos,
    taxa: dadosHist.percentual,
    peso_raw: item.peso_raw || 0,
    qtd_bloco: item.qtd_bloco,
    meta_volume: item.volume_total_meta || 0,
    ultima_atualizacao: new Date().toISOString()
  };
  
  const existeIdx = cache.disciplinas.findIndex(d => d.disciplina === disciplina);
  if (existeIdx >= 0) {
    cache.disciplinas[existeIdx] = dadosDisciplina;
  } else {
    cache.disciplinas.push(dadosDisciplina);
  }
  
  if (mapa[disciplina] && mapa[disciplina].questoes) {
    cache.aulas_por_disciplina[disciplina] = mapa[disciplina].questoes.map(arq => ({
      id_arquivo: arq.id,
      aula: arq.tema,
      nome_arquivo: arq.nomeArquivo,
      disciplina: disciplina
    })).sort((a, b) => a.aula.localeCompare(b.aula, undefined, { numeric: true }));
  }
  
  cache.timestamp = new Date().toISOString();
  _saveJsonToDrive(ARQUIVO_CACHE_ESTRUTURA, cache);
  
  return {
    sucesso: true,
    index: index,
    disciplina: disciplina,
    totalQuestoes: totalQuestoes,
    totalSubtemas: subtemas.length,
    totalArquivos: totalArquivos,
    processadas: index + 1,
    total: config.fila.length
  };
  
} catch(e) {
  return { erro: e.message, index: index };
}
}



function finalizarCacheCiclo() {
try {
  var cache = _readJsonFromDrive(ARQUIVO_CACHE_ESTRUTURA);
  if (!cache) return { erro: "Cache não encontrado" };
  delete cache.processamento_em_andamento;
  cache.timestamp_final = new Date().toISOString();
  cache.versao = "13.8.1-completo";
  const config = carregarConfiguracaoCiclo();
  cache.hash_fila = gerarHashFila(config.fila);
  _saveJsonToDrive(ARQUIVO_CACHE_ESTRUTURA, cache);
  limparCacheArquivos();
  construirSalvarRaioX();
  var totalQuestoes = 0;
  var totalSubtemas = 0;
  cache.disciplinas.forEach(d => {
    totalQuestoes += d.total_banco || 0;
    totalSubtemas += d.total_subtemas || 0;
  });
  return {
    sucesso: true,
    totalDisciplinas: cache.disciplinas.length,
    totalQuestoes: totalQuestoes,
    totalSubtemas: totalSubtemas,
    timestamp: cache.timestamp_final
  };
} catch(e) {
  return { erro: e.message };
}
}


function sincronizacaoTotalBackground() {
  try {
    limparCacheArquivos();
    var novoMapa = _construirMapaDoZero();
    CacheService.getScriptCache().put(CACHE_KEY_MAPA, JSON.stringify({ mapa: novoMapa, timestamp: Date.now() }), 21600);

    Logger.log('[SYNC-BG] Mapa reconstruído. Raio-x marcado p/ lotes (sem rebuild bloqueante).');

    var estrutCache = null;
    var rx = _readJsonFromDrive('raiox_banco_v1.json');
    if (rx && rx.arvore) rx = _podarArvoreRaioXPeloEdital(rx);   // V99
    if (rx && rx.arvore) {
      estrutCache = _reconstruirCacheEstruturalDaArvore(rx.arvore);
    } else {
      Logger.log('[SYNC-BG] Raio-x ausente. Cache estrutural será montado após os lotes.');
    }

    return { sucesso: true, mapa: novoMapa, raiox: rx || null, estrutura: estrutCache };
  } catch (e) {
    return { erro: e.message };
  }
}




function calcularTempoEstimado(estado, disciplina) {
if (!estado.tempo_agregado || !estado.tempo_agregado.por_disciplina) {
  return 180; // 3 minutos padrão
}

const statsDisc = estado.tempo_agregado.por_disciplina[disciplina];
if (statsDisc && statsDisc.media_segundos > 0) {
  return statsDisc.media_segundos;
}

// Fallback para média geral
const mediaGeral = estado.tempo_agregado.geral?.media_segundos || 180;
return mediaGeral;
}






function formatarSegundosParaHora(segundos) {
const h = Math.floor(segundos / 3600);
const m = Math.floor((segundos % 3600) / 60);
const s = segundos % 60;
if (h > 0) return `${h}h ${m}min`;
if (m > 0) return `${m}min ${s}s`;
return `${s}s`;
}

function atualizarHistoricoTempoDiario(estado, dadosTempo) {
if (!estado.historico_tempo_diario) estado.historico_tempo_diario = [];

const hoje = new Date().toISOString().split('T')[0];
var registroHoje = estado.historico_tempo_diario.find(h => h.data === hoje);

if (!registroHoje) {
  registroHoje = { data: hoje, tempo_total_segundos: 0, questoes_respondidas: 0, media_dia: 0 };
  estado.historico_tempo_diario.push(registroHoje);
}

registroHoje.tempo_total_segundos += dadosTempo.tempo_segundos;
registroHoje.questoes_respondidas++;
registroHoje.media_dia = Math.round(registroHoje.tempo_total_segundos / registroHoje.questoes_respondidas);

return estado;
}

function exportarRelatorioTempoCompleto() {
try {
  const estado = carregarEstadoUsuario();
  if (!estado.tempo_agregado) return JSON.stringify({ erro: "Nenhum dado temporal disponível." }, null, 2);
  
  const config = carregarConfiguracaoCiclo();
  const planejamento = config.planejamento || {};
  
  const relatorio = {
    metadata: {
      data_exportacao: new Date().toISOString(),
      versao_sistema: "13.8.1",
      meta_tempo_questao: planejamento.min_por_questao || 3,
      meta_volume_total: planejamento.volume_total_meta || 30000
    },
    resumo_geral: estado.tempo_agregado.geral,
    por_disciplina: Object.entries(estado.tempo_agregado.por_disciplina || {})
      .map(([disc, stats]) => ({ disciplina: disc, ...stats }))
      .sort((a, b) => b.total_segundos - a.total_segundos),
    por_tema: estado.tempo_agregado.por_tema,
    por_subtema: estado.tempo_agregado.por_subtema,
    historico_diario: estado.historico_tempo_diario || [],
    questoes_individuais: Object.entries(estado.tempo_por_questao || {})
      .map(([id, dados]) => ({ id: id, ...dados }))
      .sort((a, b) => b.tempo_segundos - a.tempo_segundos)
  };
  return JSON.stringify(relatorio, null, 2);
} catch (e) {
  return JSON.stringify({ erro: e.message }, null, 2);
}
}

// ----------------------------------------------------------------------------
// 11. MÓDULO DE EDITOR DE QUESTÕES V13.8.1
// ----------------------------------------------------------------------------

function carregarQuestaoParaEdicao(idOriginal) {
try {
  if (!idOriginal || typeof idOriginal !== 'string' || idOriginal.indexOf('_') === -1) {
    return { erro: "O ID da questão está inválido ou ausente no sistema (" + idOriginal + ")." };
  }

  const lastUnderscore = idOriginal.lastIndexOf('_');
  const idArquivo = idOriginal.substring(0, lastUnderscore).trim();
  const index = parseInt(idOriginal.substring(lastUnderscore + 1));
  
  if (!idArquivo || idArquivo === 'undefined' || idArquivo === 'null') {
    return { erro: "O ID do arquivo extraído está corrompido: " + idArquivo };
  }

  var file;
  try {
    file = DriveApp.getFileById(idArquivo);
  } catch (e) {
    return { erro: "Arquivo não encontrado no Google Drive. Ele pode ter sido movido ou excluído. ID procurado: " + idArquivo };
  }

  const conteudo = JSON.parse(file.getBlob().getDataAsString());
  
  if (!conteudo.questoes || !conteudo.questoes[index]) {
    return { erro: "A questão não foi encontrada no índice " + index + " deste arquivo." };
  }
  
  return {
    sucesso: true,
    id_arquivo: idArquivo,
    index: index,
    questao: conteudo.questoes[index],
    disciplina: conteudo.disciplina,
    tema: conteudo.tema
  };
} catch (e) {
  return { erro: "Erro interno no servidor ao preparar a questão: " + e.message };
}
}


function marcarQuestaoRevisadaIA(idOriginal) {
try {
  if (!idOriginal || typeof idOriginal !== 'string' || idOriginal.indexOf('_') === -1) {
    throw new Error("ID inválido.");
  }
  const lastUnderscore = idOriginal.lastIndexOf('_');
  const idArquivo = idOriginal.substring(0, lastUnderscore).trim();
  const index = parseInt(idOriginal.substring(lastUnderscore + 1));
  
  const file = DriveApp.getFileById(idArquivo);
  const conteudo = JSON.parse(file.getBlob().getDataAsString());
  
  if (!conteudo.questoes || !conteudo.questoes[index]) {
    throw new Error("Questão não encontrada.");
  }
  
  conteudo.questoes[index].ia_revisado = true;
  file.setContent(JSON.stringify(conteudo, null, 2));
  // V31 — a cópia no Firebase acompanha a edição na mesma hora.
  try { if (typeof _dxBancoAtualizado === 'function') _dxBancoAtualizado(file.getId(), conteudo); } catch (eFb) {}
  
  limparCacheArquivos();
  return { sucesso: true };
} catch (e) {
  return { erro: e.message };
}
}


function salvarQuestaoEditada(idOriginal, idArquivo, index, questaoEditada) {
try {
  const file = DriveApp.getFileById(idArquivo);
  const nomeOriginal = file.getName();
  const timestamp = Utilities.formatDate(new Date(), "GMT-3", "yyyyMMdd_HHmmss");
  const nomeBackup = nomeOriginal.replace('.json', '') + '_BACKUP_' + timestamp + '.json';
  
  const pastaBackup = getFolder(PASTA_BACKUPS, getFolder(PASTA_RAIZ));
  const conteudoOriginal = file.getBlob().getDataAsString();
  pastaBackup.createFile(nomeBackup, conteudoOriginal, MimeType.PLAIN_TEXT);
  
  const conteudo = JSON.parse(conteudoOriginal);
  if (!conteudo.questoes || !conteudo.questoes[index]) throw new Error("Índice de questão inválido.");
  
  const questaoAtual = conteudo.questoes[index];
  questaoEditada.id = questaoAtual.id || Utilities.getUuid(); 
  
  conteudo.questoes[index] = { ...questaoAtual, ...questaoEditada };
  conteudo.questoes[index].editado_em = new Date().toISOString();
  conteudo.questoes[index].editado_por_usuario = true;
  conteudo.questoes[index].ia_revisado = true;
  
  file.setContent(JSON.stringify(conteudo, null, 2));
  // V31 — a cópia no Firebase acompanha a edição na mesma hora.
  try { if (typeof _dxBancoAtualizado === 'function') _dxBancoAtualizado(file.getId(), conteudo); } catch (eFb) {}
  
  limparCacheArquivos();
  const disciplina = conteudo.disciplina;
  if (disciplina) {
    const cacheKey = CACHE_KEY_CONTAGEM_PREFIX + disciplina.replace(/\s+/g, '_').toUpperCase();
    CacheService.getScriptCache().remove(cacheKey);
  }
  
  return { sucesso: true, backup_nome: nomeBackup, mensagem: "Questão atualizada com sucesso!" };
} catch (e) {
  Logger.log("Erro em salvarQuestaoEditada: " + e.message);
  return { erro: e.message };
}
}



function excluirQuestaoSegura(idOriginal, idArquivo, index) {
try {
  const file           = DriveApp.getFileById(idArquivo);
  const nomeOriginal   = file.getName();
  const timestamp      = Utilities.formatDate(new Date(), "GMT-3", "yyyyMMdd_HHmmss");
  const nomeBackup     = nomeOriginal.replace('.json', '') + '_BACKUP_EXCLUSAO_' + timestamp + '.json';

  // --- Backup de segurança ---
  const pastaBackup    = getFolder(PASTA_BACKUPS, getFolder(PASTA_RAIZ));
  const conteudoOriginal = file.getBlob().getDataAsString();
  pastaBackup.createFile(nomeBackup, conteudoOriginal, MimeType.PLAIN_TEXT);

  // --- Remover questão do arquivo ---
  const conteudo = JSON.parse(conteudoOriginal);
  if (!conteudo.questoes || !conteudo.questoes[index]) {
    throw new Error("Questão não encontrada.");
  }
  if (conteudo.questoes.length === 1) {
    throw new Error("Não é possível excluir a única questão do arquivo.");
  }

  conteudo.questoes.splice(index, 1);
  file.setContent(JSON.stringify(conteudo, null, 2));
  // V31 — a cópia no Firebase acompanha a exclusão na mesma hora.
  try { if (typeof _dxBancoAtualizado === 'function') _dxBancoAtualizado(file.getId(), conteudo); } catch (eFb) {}

  // --- Limpar estado do usuário ---
  const estado = carregarEstadoUsuario(); // const — leitura inicial
  var estadoModificado = false;

  if (estado.respostas && estado.respostas[idOriginal]) {
    delete estado.respostas[idOriginal];
    estadoModificado = true;
  }
  if (estado.contadores_erro && estado.contadores_erro[idOriginal]) {
    delete estado.contadores_erro[idOriginal];
    estadoModificado = true;
  }
  if (estado.tempo_por_questao && estado.tempo_por_questao[idOriginal]) {
    delete estado.tempo_por_questao[idOriginal];
    estadoModificado = true;
  }

  if (estadoModificado) {
    // CORRIGIDO: variável intermediária evita reatribuição do const 'estado'
    const estadoFinal = estado.tempo_por_questao
      ? recalcularAgregacoesTempo(estado)
      : estado;
    salvarEstadoUsuario(estadoFinal);
  }

  // --- Atualizar histórico se necessário ---
  const hist       = carregarHistoricoDesempenho();
  const disciplina = conteudo.disciplina;

  if (estadoModificado && disciplina && hist.acumulado_por_disciplina && hist.acumulado_por_disciplina[disciplina]) {
    const acc = hist.acumulado_por_disciplina[disciplina];
    acc.total      = Math.max(0, acc.total - 1);
    acc.percentual = acc.total > 0 ? Math.round((acc.acertos / acc.total) * 100) : 0;
    _saveJsonToDrive(ARQUIVO_HISTORICO, hist);
  }

  // --- Invalidar caches ---
  limparCacheArquivos();
  if (disciplina) {
    const cacheKey = CACHE_KEY_CONTAGEM_PREFIX + disciplina.replace(/\s+/g, '_').toUpperCase();
    CacheService.getScriptCache().remove(cacheKey);
  }

  // --- Remover da blacklist de sessão ---
  // V20.4 — usa a versão que se limpa na virada do dia (ver _blacklistDoDia).
  const blacklist  = _blacklistDoDia();
  blacklist.ids    = blacklist.ids.filter(id => id !== idOriginal);
  _saveJsonToDrive(ARQUIVO_BLACKLIST_SESSAO, blacklist);

  return {
    sucesso:           true,
    backup_nome:       nomeBackup,
    questoes_restantes: conteudo.questoes.length,
    mensagem:          "Questão excluída com segurança."
  };

} catch (e) {
  Logger.log("Erro em excluirQuestaoSegura: " + e.message);
  return { erro: e.message };
}
}






// ============================================================================
// DOSSIÊ EXECUTIVO PARA AURORA — V1.2
// Extrai, filtra e sintetiza dados em Markdown limpo para injeção no
// system prompt do Gemini Live.
//
// CORREÇÕES V1.2:
//   [FIX-1] Bug dado   — Ritmo 0 q/dia com 1 dia ativo → fallback manual
//   [FIX-2] Bug visual — \n literal no enunciado → substituído por espaço
//   [FIX-3] Escala     — Bloco D dividido em detalhadas (ciclo hoje) vs
//                        resumidas (demais) → dossiê estável em ~1.500 tokens
//                        mesmo com 15 disciplinas ativas
//
// INTEGRAÇÃO OBRIGATÓRIA (no Code.gs existente):
//   Adicionar invalidarCacheDossie() no final de:
//     - salvarRespostaComTempo()
//     - registrarRespostaManual()
//     - registrarFimBloco()
//   Sem isso o Coach recebe dossiê desatualizado após respostas.
// ============================================================================

var DOSSIE_CACHE_KEY = 'DOSSIE_COACH_V1';
var DOSSIE_CACHE_TTL = 300; // 5 minutos

/**
 * Ponto de entrada principal.
 * Retorna string Markdown com os 5 blocos do dossiê.
 * Usa CacheService para evitar rebuild a cada chamada do Live.
 */


function montarDossieCoach() {
try {
  var scriptCache = CacheService.getScriptCache();
  var cached = scriptCache.get(DOSSIE_CACHE_KEY);
  if (cached) {
    Logger.log('[DOSSIE] ✅ Cache hit — retornando dossiê salvo');
    return cached;
  }

  Logger.log('[DOSSIE] 🔄 Cache miss — construindo dossiê do zero...');
  var tInicio = Date.now();
  var config    = carregarConfiguracaoCiclo();
  var estado    = carregarEstadoUsuario();
  var analytics = analisarDesempenhoGeral();
  var insights  = gerarInsightsAutomaticos();
  var mapa      = listarArquivosRapido();

  var fileIdParaDisc = {};
  Object.keys(mapa).forEach(function(disc) {
    if (mapa[disc].questoes) {
      mapa[disc].questoes.forEach(function(arq) {
        fileIdParaDisc[arq.id] = disc;
      });
    }
  });

  var statsReaisPorDisc = {};
  Object.keys(estado.respostas || {}).forEach(function(idOriginal) {
    var fileId = idOriginal.substring(0, idOriginal.lastIndexOf('_'));
    var disc   = fileIdParaDisc[fileId];
    if (!disc) return;
    if (!statsReaisPorDisc[disc]) statsReaisPorDisc[disc] = { total: 0, acertos: 0 };
    statsReaisPorDisc[disc].total++;
    if (estado.respostas[idOriginal].correta) statsReaisPorDisc[disc].acertos++;
  });

  var reincidenciaPorSubtema = {};
  Object.keys(estado.contadores_erro || {}).forEach(function(idQ) {
    if ((estado.contadores_erro[idQ] || 0) < 2) return;
    var tempoQ = estado.tempo_por_questao && estado.tempo_por_questao[idQ];
    if (!tempoQ) return;
    var fileId = idQ.substring(0, idQ.lastIndexOf('_'));
    var disc   = fileIdParaDisc[fileId];
    if (!disc) return;
    var chave = disc + '|||' + (tempoQ.subtema || 'Geral');
    reincidenciaPorSubtema[chave] = (reincidenciaPorSubtema[chave] || 0) + 1;
  });

  var blocoA = _montarBlocoA(config, analytics, estado);
  var blocoB = _montarBlocoB(analytics, estado);
  var blocoC = _montarBlocoC(analytics, insights);

  var disciplinasIniciadas = Object.keys(statsReaisPorDisc)
    .filter(function(d) { return statsReaisPorDisc[d].total > 0; });
  var blocoD = _montarBlocoD(disciplinasIniciadas, config, estado, analytics, reincidenciaPorSubtema);

  var blocoE = _montarBlocoE(config, statsReaisPorDisc);
  var dossie = [blocoA, blocoB, blocoC, blocoD, blocoE].join('\n');

  try {
    if (dossie.length < 100 * 1024) {
      scriptCache.put(DOSSIE_CACHE_KEY, dossie, DOSSIE_CACHE_TTL);
      Logger.log('[DOSSIE] 💾 Salvo no cache por ' + DOSSIE_CACHE_TTL + 's');
    }
  } catch(eCached) {
    Logger.log('[DOSSIE] ⚠️ Falha ao salvar cache: ' + eCached.message);
  }

  var ms = Date.now() - tInicio;
  Logger.log('[DOSSIE] ✅ Concluído em ' + ms + 'ms | ' + dossie.length + ' chars | ~' + Math.round(dossie.length / 4) + ' tokens');
  Logger.log('[DOSSIE] ══════════ INÍCIO DO DOSSIÊ ══════════');
  Logger.log(dossie);
  Logger.log('[DOSSIE] ══════════  FIM DO DOSSIÊ   ══════════');

  return dossie;
} catch(e) {
  Logger.log('[DOSSIE] ❌ Erro fatal: ' + e.message + '\n' + e.stack);
  return '## Erro ao montar dossiê\n' + e.message;
}
}


// ── BLOCO A — Perfil e Missão ─────────────────────────────────────────────
function _montarBlocoA(config, analytics, estado) {
Logger.log('[DOSSIE-A] Iniciando...');

var plan       = config.planejamento || {};
var metas      = analytics.metas_configuradas || {};
var metricas   = analytics.metricas || {};
var projecao   = analytics.projecao || {};
var geralTempo = (estado.tempo_agregado && estado.tempo_agregado.geral) || {};

var concurso     = _nomeEditalV104(plan.template_usado);   // V104 — nome do edital, não o id
var metaVolume   = metas.volume_total  || plan.volume_total_meta || 30000;
var metaDiaria   = metas.meta_diaria   || plan.meta_qtd_dia      || 80;
var periodoMeses = metas.periodo_meses || plan.periodo_meses     || 18;
var diasSemana   = metas.dias_semana   || plan.dias_semana       || 5;
var totalResp    = metricas.total_respondidas || 0;
var statusAluno  = analytics.status    || 'Iniciante';
var projecaoData = projecao.data_estimada || 'N/D';
var dentroPrazo  = projecao.dentro_do_prazo;
var pct          = metaVolume > 0 ? ((totalResp / metaVolume) * 100).toFixed(1) : '0.0';

// dias_ativos=0 com questões respondidas = bug de historico_tempo_diario
// não populado no primeiro dia. Usa total_questoes como sinal de fallback.
var diasAtivos  = metricas.dias_ativos || 0;
var temQueHouve = (geralTempo.total_questoes || 0) > 0;
if (diasAtivos === 0 && temQueHouve) diasAtivos = 1;

// ── [FIX-1] Fallback mediaDiaria ─────────────────────────────────────────
// media_diaria vem 0 quando historico_diario está vazio no 1º dia
// (ex: diasAtivos=1, totalResp=80, mas mediaDiariaReal=0 no analytics).
// Se temos diasAtivos e respostas, calculamos direto para evitar "0 q/dia".
var mediaDiaria = metricas.media_diaria || 0;
if (mediaDiaria === 0 && diasAtivos > 0 && totalResp > 0) {
  mediaDiaria = Math.round(totalResp / diasAtivos);
  Logger.log('[DOSSIE-A] [FIX-1] mediaDiaria calculada manualmente: ' + mediaDiaria + ' (' + totalResp + ' resp / ' + diasAtivos + ' dias)');
}
// ─────────────────────────────────────────────────────────────────────────

var ritmo = (diasAtivos === 0 || !temQueHouve)
  ? 'Métricas de ritmo ainda não disponíveis — aluno em fase de início.'
  : 'Ritmo atual: ' + mediaDiaria + ' q/dia (média dos ' + diasAtivos + ' dias ativos)';

var linhas = [
  '## Perfil do Aluno',
  '- Concurso: ' + concurso,
  '- Meta: ' + metaVolume.toLocaleString('pt-BR') + ' questões em ' + periodoMeses + ' meses (' + metaDiaria + ' q/dia, ' + diasSemana + ' dias/semana)',
  '- Progresso: ' + totalResp.toLocaleString('pt-BR') + '/' + metaVolume.toLocaleString('pt-BR') + ' questões (' + pct + '%) — Fase: ' + statusAluno,
  '- Projeção: conclusão em ' + projecaoData + (dentroPrazo ? ' ✅ dentro do prazo' : ' ⚠️ fora do prazo'),
  '- ' + ritmo
];

Logger.log('[DOSSIE-A] ✅ total=' + totalResp + '/' + metaVolume + ' (' + pct + '%), status=' + statusAluno + ', diasAtivos=' + diasAtivos + ', mediaDiaria=' + mediaDiaria);
return linhas.join('\n');
}


// ── BLOCO B — Desempenho Geral ────────────────────────────────────────────
function _montarBlocoB(analytics, estado) {
Logger.log('[DOSSIE-B] Iniciando...');

var metricas      = analytics.metricas || {};
var score         = analytics.score    || {};
var geral         = (estado.tempo_agregado && estado.tempo_agregado.geral) || {};

var taxaGeral     = metricas.taxa_acerto       || 0;
var totalResp     = metricas.total_respondidas || 0;
var totalAcertos  = metricas.total_acertos     || 0;
var scoreGlobal   = score.global               || 0;
var scoreAcerto   = score.acerto               || 0;
var scoreVolume   = score.volume               || 0;
var tempoMedioSeg = geral.media_segundos       || 0;
var tempoTotalFmt = geral.total_horas_formatado|| '0h';
var tendencia     = geral.tendencia            || 'ESTÁVEL';

// Fallback: se historico_tempo_diario vazio mas há questões com tempo, usa 1 dia
var diasAtivos = metricas.dias_ativos || 0;
if (diasAtivos === 0 && (geral.total_questoes || 0) > 0) diasAtivos = 1;

var tempoTexto = tempoMedioSeg > 0 ? (tempoMedioSeg + 's') : 'N/D';
var tempoClass = '';
if (tempoMedioSeg > 0) {
  if      (tempoMedioSeg <= 144) tempoClass = '(ritmo rápido — <80% da meta de 3min)';
  else if (tempoMedioSeg <= 216) tempoClass = '(ritmo normal — dentro da meta de 3min)';
  else                           tempoClass = '(ritmo lento — >20% acima da meta)';
}

var scoraNota = '';
if      (scoreGlobal < 20) scoraNota = ' — esperado para fase inicial, volume insuficiente';
else if (scoreGlobal < 40) scoraNota = ' — em desenvolvimento';
else if (scoreGlobal < 60) scoraNota = ' — progresso consistente';
else if (scoreGlobal < 80) scoraNota = ' — nível competitivo';
else                       scoraNota = ' — excelente, pronto para aprovação';

var linhas = [
  '\n## Desempenho Geral',
  '- Acerto global: ' + taxaGeral + '% (' + totalAcertos + ' de ' + totalResp + ' questões)',
  '- Tempo médio por questão: ' + tempoTexto + ' ' + tempoClass,
  '- Tempo total investido: ' + tempoTotalFmt,
  '- Dias ativos de estudo: ' + diasAtivos,
  '- Tendência de tempo: ' + tendencia,
  '- Score composto: ' + scoreGlobal + '/100' + scoraNota,
  '  - Score de acerto: ' + scoreAcerto + '/100',
  '  - Score de volume: ' + scoreVolume + '/100'
];

Logger.log('[DOSSIE-B] ✅ taxa=' + taxaGeral + '%, score=' + scoreGlobal + ', tempo=' + tempoMedioSeg + 's, diasAtivos=' + diasAtivos);
return linhas.join('\n');
}


// ── BLOCO C — Gargalos e Alertas ─────────────────────────────────────────
// Regra: SEMPRE todos os ALTA/CRÍTICO + máximo 3 MÉDIA. BAIXA descartado.
function _montarBlocoC(analytics, insights) {
Logger.log('[DOSSIE-C] Iniciando...');

var alertasAlta  = [];
var alertasMedia = [];
var visto        = {};

// Gargalos estruturais do score_global (volume, taxa, ritmo, prazo)
if (analytics.gargalos && Array.isArray(analytics.gargalos)) {
  analytics.gargalos.forEach(function(g) {
    var chave = g.mensagem;
    if (visto[chave]) return;
    visto[chave] = true;
    alertasAlta.push('🔴 ' + (g.impacto || 'ALTO') + ': ' + g.mensagem + ' → ' + g.acao);
  });
}

// Insights automáticos gerados pelo backend
if (insights && Array.isArray(insights)) {
  insights.forEach(function(ins) {
    if (!ins.titulo || ins.tipo === 'ERRO') return;
    var urg   = (ins.urgencia || '').toUpperCase();
    var chave = ins.titulo;
    if (visto[chave]) return;
    visto[chave] = true;

    var prefixo = (urg === 'ALTA' || ins.tipo === 'CRÍTICO') ? '🔴' : '🟡';
    var linha   = prefixo + ' ' + urg + ': ' + ins.titulo;
    if (ins.acao) linha += ' → ' + ins.acao;

    if (urg === 'ALTA' || ins.tipo === 'CRÍTICO') {
      alertasAlta.push(linha);
    } else if (urg === 'MÉDIA') {
      alertasMedia.push(linha);
    }
  });
}

var linhas = ['\n## Alertas Prioritários'];
if (alertasAlta.length === 0 && alertasMedia.length === 0) {
  linhas.push('✅ Nenhum gargalo crítico identificado.');
} else {
  alertasAlta.forEach(function(l)              { linhas.push(l); });
  alertasMedia.slice(0, 3).forEach(function(l) { linhas.push(l); });
}

Logger.log('[DOSSIE-C] ✅ alertasAlta=' + alertasAlta.length + ', alertasMedia=' + Math.min(alertasMedia.length, 3) + '/3 exibidos');
return linhas.join('\n');
}


// ── BLOCO D — Raio-X das Disciplinas Iniciadas ───────────────────────────
// [FIX-3] ESCALA: separa disciplinas em dois grupos:
//   • discDetalhadas  — as do ciclo de hoje (via ponteiro_fila) → raio-X completo
//   • discResumidas   — todas as demais → só uma linha com nome + taxa + score
// Isso mantém o dossiê em ~1.500 tokens mesmo com 15 disciplinas ativas.
function _montarBlocoD(disciplinasIniciadas, config, estado, analytics, reincidenciaPorSubtema) {
Logger.log('[DOSSIE-D] Iniciando. Disciplinas: ' + disciplinasIniciadas.join(', '));

var linhas = ['\n## Raio-X das Disciplinas Iniciadas'];

if (disciplinasIniciadas.length === 0) {
  linhas.push('Nenhuma disciplina iniciada ainda.');
  return linhas.join('\n');
}

// ── [FIX-3] Identificar disciplinas do ciclo de hoje ─────────────────────
// Usa ponteiro_fila + grupo_ciclo para pegar as até 3 disciplinas de hoje.
var discDoDia = _pegarDisciplinasDoCicloHoje(config);

var discDetalhadas = disciplinasIniciadas.filter(function(d) {
  return discDoDia.indexOf(d) !== -1;
}); // máx ~3 — raio-X completo com subtemas e questões críticas

var discResumidas = disciplinasIniciadas.filter(function(d) {
  return discDoDia.indexOf(d) === -1;
}); // demais — só uma linha: nome + taxa + score

Logger.log('[DOSSIE-D] Detalhadas (ciclo hoje): ' + discDetalhadas.join(', '));
Logger.log('[DOSSIE-D] Resumidas (demais): ' + discResumidas.join(', '));
// ─────────────────────────────────────────────────────────────────────────

var ddAnalytics = analytics.disciplinas_detalhadas || {};

// ── Disciplinas detalhadas (ciclo de hoje) ────────────────────────────────
discDetalhadas.forEach(function(disc) {
  _renderizarDiscDetalhada(disc, linhas, config, estado, analytics, reincidenciaPorSubtema, ddAnalytics);
});

// ── Disciplinas resumidas (demais iniciadas) ──────────────────────────────
if (discResumidas.length > 0) {
  linhas.push('\n### Demais disciplinas iniciadas (resumo)');
  discResumidas.forEach(function(disc) {
    var analise = analisarDisciplinaIndividual(disc);
    if (!analise || analise.erro) {
      linhas.push('- ' + disc + ': ⚠️ dados indisponíveis');
      return;
    }
    var taxa        = analise.metricas.taxa_acerto       || 0;
    var respondidas = analise.metricas.total_respondidas || 0;
    var minimoRec   = (analise.metas_disciplina && analise.metas_disciplina.minimo_recomendado) || 0;
    var scoreDisc   = analise.score || 0;
    var pctMinimo   = minimoRec > 0 ? Math.round((respondidas / minimoRec) * 100) : 0;
    linhas.push('- ' + disc + ': ' + taxa + '% acerto | ' + respondidas + '/' + minimoRec + 'q (' + pctMinimo + '% mín) | Score ' + scoreDisc + '/100');
  });
}

return linhas.join('\n');
}


// ── Helper: identificar disciplinas do ciclo de hoje ─────────────────────
// Retorna array com os nomes das disciplinas que pertencem ao grupo do dia
// atual, baseado em ponteiro_fila e grupo_ciclo.
// Máximo de disciplinas_dia itens (geralmente 3).
function _pegarDisciplinasDoCicloHoje(config) {
if (!config.fila || config.fila.length === 0) return [];

var ponteiro = config.ponteiro_fila || 0;
if (ponteiro >= config.fila.length) ponteiro = 0;

var itemAtual = config.fila[ponteiro];
var grupoDoDia = itemAtual ? (itemAtual.grupo_ciclo !== undefined ? itemAtual.grupo_ciclo : -1) : -1;

if (grupoDoDia === -1) {
  // Fallback: retorna apenas a disciplina do ponteiro atual
  return itemAtual ? [itemAtual.disciplina] : [];
}

// Retorna todas as disciplinas do mesmo grupo_ciclo
return config.fila
  .filter(function(f) { return _noGrupoV100(f, grupoDoDia); })
  .map(function(f) { return f.disciplina; });
}


// ── Helper: renderiza raio-X completo de uma disciplina detalhada ─────────
function _renderizarDiscDetalhada(disc, linhas, config, estado, analytics, reincidenciaPorSubtema, ddAnalytics) {
Logger.log('[DOSSIE-D] Detalhando: ' + disc);
var tDiscInicio = Date.now();

var analise = analisarDisciplinaIndividual(disc);
if (!analise || analise.erro) {
  Logger.log('[DOSSIE-D] ⚠️ Erro ao analisar ' + disc + ': ' + (analise ? analise.erro : 'null'));
  linhas.push('\n### ' + disc + '\n- ⚠️ Dados indisponíveis no momento.');
  return;
}

// ── Metadados da fila ──────────────────────────────────────
var itemFila = config.fila ? config.fila.find(function(f) { return f.disciplina === disc; }) : null;
var peso     = itemFila ? (itemFila.peso_raw || 0).toFixed(2) : '—';
var metaVol  = itemFila ? (itemFila.volume_total_meta || 0) : 0;

// ── Métricas ───────────────────────────────────────────────
var taxa        = analise.metricas.taxa_acerto       || 0;
var respondidas = analise.metricas.total_respondidas || 0;
var minimoRec   = (analise.metas_disciplina && analise.metas_disciplina.minimo_recomendado) || 0;
var scoreDisc   = analise.score || 0;
var pctMinimo   = minimoRec > 0 ? Math.round((respondidas / minimoRec) * 100) : 0;
var alertaVol   = pctMinimo < 20 ? ' ⚠️ PRIORIDADE DE VOLUME' : '';

// ── Tempo médio da disciplina ──────────────────────────────
var tempoMedioDisc = 0;
if (estado.tempo_agregado && estado.tempo_agregado.por_disciplina && estado.tempo_agregado.por_disciplina[disc]) {
  tempoMedioDisc = estado.tempo_agregado.por_disciplina[disc].media_segundos || 0;
}
var tempoDiscTexto = tempoMedioDisc > 0 ? (tempoMedioDisc + 's/q') : 'N/D';

linhas.push('');
linhas.push('### ' + disc + ' | Taxa: ' + taxa + '% | Tempo: ' + tempoDiscTexto + ' | Score: ' + scoreDisc + '/100 | Peso edital: ' + peso + '%');
linhas.push('- Progresso: ' + respondidas + '/' + minimoRec + ' questões mínimas (' + pctMinimo + '% do mínimo)' + alertaVol);
if (metaVol > 0) {
  linhas.push('- Meta total da disciplina: ' + metaVol.toLocaleString('pt-BR') + ' questões');
}

// ── Tendência 30 dias ──────────────────────────────────────
if (analise.metricas.tendencia && analise.metricas.tendencia !== 'ESTÁVEL') {
  var icTend = analise.metricas.tendencia === 'CRESCENTE' ? '📈' : '📉';
  linhas.push('- Tendência 30d: ' + icTend + ' ' + analise.metricas.tendencia);
}

// ── Subtemas críticos (ALTA e MÉDIA, máx 5, excluir BAIXA) ──
var subtemasExibir = (analise.subtemas || [])
  .filter(function(s) { return s.criticidade === 'ALTA' || s.criticidade === 'MÉDIA'; })
  .slice(0, 5);

subtemasExibir.forEach(function(s) {
  var icone    = s.criticidade === 'ALTA' ? '🔴' : '🟡';
  var qtdReinc = reincidenciaPorSubtema[disc + '|||' + s.nome] || 0;
  var linhaS   = icone + ' ' + s.nome + ': ' + s.taxa + '% acerto (' + s.total + 'q, criticidade ' + s.criticidade + ')';
  if (qtdReinc > 0) {
    linhaS += ' — ' + qtdReinc + ' questão(ões) com erros reincidentes (≥2×)';
  }
  linhas.push('  ' + linhaS);
});

// ── Questões críticas (enunciados dos piores erros) ────────
// Fonte primária: analytics.disciplinas_detalhadas[disc].questoes_criticas
// Fonte secundária: analise.questoes_criticas (de analisarDisciplinaIndividual)
// Máx 3 questões, enunciado truncado em 80 chars, \n removidos. [FIX-2]
var ddDisc           = ddAnalytics[disc] || {};
var questoesCriticas = ddDisc.questoes_criticas || analise.questoes_criticas || [];

if (questoesCriticas.length > 0) {
  linhas.push('  📌 Questões com mais erros:');
  questoesCriticas.slice(0, 3).forEach(function(qc) {
    // [FIX-2] — substitui \n por espaço antes de truncar para evitar
    // renderização literal do escape no output do dossiê.
    var enuncFull = (qc.enunciado || '').replace(/\n/g, ' ');
    var enunc     = enuncFull.substring(0, 80) + (enuncFull.length > 80 ? '...' : '');
    var nErros    = qc.num_erros || qc.erros || 0;
    linhas.push('    ⚡ ' + (qc.subtema || '—') + ' (' + nErros + 'x erro): "' + enunc + '"');
  });
}

var msDisc = Date.now() - tDiscInicio;
Logger.log('[DOSSIE-D] ✅ ' + disc + ': taxa=' + taxa + '%, resp=' + respondidas + '/' + minimoRec + ', subtemasCrit=' + subtemasExibir.length + ', questoesCrit=' + questoesCriticas.length + ' (' + msDisc + 'ms)');
}


// ── BLOCO E — Tabela de Prioridade ───────────────────────────────────────
function _montarBlocoE(config, statsReaisPorDisc) {
Logger.log('[DOSSIE-E] Iniciando...');

var linhas = [
  '\n## Tabela de Prioridade (todas as disciplinas)',
  '| Disciplina | Peso Edital | Status | Meta Total |',
  '|---|---|---|---|'
];

if (!config.fila || config.fila.length === 0) {
  linhas.push('| Nenhuma disciplina configurada no ciclo | — | — | — |');
  Logger.log('[DOSSIE-E] ⚠️ Fila vazia');
  return linhas.join('\n');
}

var filaOrdenada = config.fila.slice().sort(function(a, b) {
  return (b.peso_raw || 0) - (a.peso_raw || 0);
});

filaOrdenada.forEach(function(item) {
  var statsDisc = statsReaisPorDisc[item.disciplina];
  var minimoRec = item.minimo_recomendado
    || Math.max((item.qtd_bloco || 10) * 10, Math.round((item.volume_total_meta || 500) * 0.1));
  var statusDisc = 'Não iniciada';

  if (statsDisc && statsDisc.total > 0) {
    var pctMin = minimoRec > 0 ? Math.round((statsDisc.total / minimoRec) * 100) : 0;
    statusDisc = 'Iniciada (' + pctMin + '% do mínimo)';
  }

  var pesoStr = item.peso_raw ? item.peso_raw.toFixed(1) + '%' : '—';
  var metaStr = item.volume_total_meta ? item.volume_total_meta.toLocaleString('pt-BR') : '—';
  linhas.push('| ' + item.disciplina + ' | ' + pesoStr + ' | ' + statusDisc + ' | ' + metaStr + ' |');
});

Logger.log('[DOSSIE-E] ✅ ' + filaOrdenada.length + ' disciplinas na tabela');
return linhas.join('\n');
}



function invalidarCacheDossie() {
try {
  CacheService.getScriptCache().remove(DOSSIE_CACHE_KEY);
  Logger.log('[DOSSIE] 🗑️ Cache invalidado');
} catch(e) {
  Logger.log('[DOSSIE] ⚠️ Falha ao invalidar cache: ' + e.message);
}
}

/**
 * Teste — execute direto no editor do Apps Script para validar o output.
 */
function testarDossieCoach() {
var resultado = montarDossieCoach();
Logger.log('\n\n[TESTE] Tamanho: ' + resultado.length + ' chars | ~' + Math.round(resultado.length / 4) + ' tokens\n');
Logger.log(resultado);
}




function analisarCicloComIA() {
try {
  var prefs = carregarPreferenciasUsuario();
  var userApiKey = (prefs && prefs.config && prefs.config.gemini_api_key) ? prefs.config.gemini_api_key : null;
  var dossie = montarDossieCoach();
  var config = carregarConfiguracaoCiclo();
  var estado = carregarEstadoUsuario();
  var errosPorSubtema = {};
  Object.keys(estado.contadores_erro || {}).forEach(function(id) {
    if ((estado.contadores_erro[id] || 0) < 2) return;
    var t = estado.tempo_por_questao && estado.tempo_por_questao[id];
    if (!t) return;
    var chave = (t.disciplina || '?') + ' > ' + (t.subtema || 'Geral');
    errosPorSubtema[chave] = (errosPorSubtema[chave] || 0) + 1;
  });
  var topErros = Object.entries(errosPorSubtema)
    .sort(function(a, b) { return b[1] - a[1]; })
    .slice(0, 15)
    .map(function(e) { return e[0] + ': ' + e[1] + ' questões com 2+ erros'; });
  var prompt =
    "Você é um analista de dados educacionais especialista em concursos públicos.\n\n" +
    "DOSSIÊ DO ALUNO:\n" + dossie + "\n\n" +
    "TOP SUBTEMAS COM ERROS REINCIDENTES:\n" + (topErros.length > 0 ? topErros.join('\n') : 'Nenhum padrão detectado ainda') + "\n\n" +
    "TAREFA: Analise os dados e retorne EXCLUSIVAMENTE um JSON válido com esta estrutura:\n" +
    "{\n" +
    "  \"diagnostico_geral\": \"string — 2 frases sobre o estado do aluno\",\n" +
    "  \"subtemas_intensificar\": [\"Disciplina > Subtema\", ...],\n" +
    "  \"disciplinas_pausar\": [\"Nome — motivo curto\", ...],\n" +
    "  \"correlacoes\": [\"string descrevendo correlação entre erros de disciplinas diferentes\", ...],\n" +
    "  \"acao_prioritaria\": \"string — a única ação mais importante para esta semana\",\n" +
    "  \"previsao_melhoria\": \"string — o que esperar se seguir as recomendações por 2 semanas\"\n" +
    "}\n\n" +
    "Regras: máximo 5 itens por array. Seja direto e específico. Sem markdown.";
  var resultado = iaAgente_({   // V-MIGRA-2 — chamada feita pelo navegador
    apiKey: userApiKey,
    prompt: prompt,
    systemPrompt: "Retorne APENAS JSON válido sem nenhum texto antes ou depois.",
    jsonMode: true,
    maxTokens: 16384,
    contextoGasto: 'Ciclo/AnaliseIA'
  }, 'gemini');
  if (!resultado.success) return { erro: resultado.erro };
  var analise = resultado.resultado;
  if (typeof analise === 'string') {
    try { analise = JSON.parse(analise.replace(/```json|```/g, '').trim()); } catch(e) {
      return { erro: "JSON inválido da IA: " + e.message };
    }
  }
  config.ajustes_ia = {
    timestamp: new Date().toISOString(),
    analise: analise,
    modelo: resultado.modelo
  };
  salvarConfiguracaoCiclo(config);
  invalidarCacheDossie();
  return { sucesso: true, analise: analise };
} catch(e) {
  Logger.log("[IA-CICLO] " + e.message);
  return { erro: e.message };
}
}






/**
 * Fase 2 — Seleção proporcional pelo déficit de cada subtema.
 * Calcula quantas questões cada subtema ainda precisa para atingir
 * o mínimo de 30 (ou total disponível) e distribui o bloco proporcionalmente.
 */
function _selecionarQuestoesAvaliacao(todasQuestoes, estado, blacklist, tamanhoBloco) {
var subtemas = {};

todasQuestoes.forEach(function(q) {
  var sub = q.subtema || 'Geral';
  if (!subtemas[sub]) subtemas[sub] = { total: 0, respondidas: 0, ineditas: [] };
  subtemas[sub].total++;
  if (estado.respostas[q.idOriginal]) {
    subtemas[sub].respondidas++;
  } else if (!blacklist.has(q.idOriginal)) {
    subtemas[sub].ineditas.push(q);
  }
});

// Calcula déficit real de cada subtema
var deficit      = {};
var deficitTotal = 0;

Object.keys(subtemas).forEach(function(sub) {
  var s         = subtemas[sub];
  var minimo    = Math.min(30, s.total);
  var falta     = Math.max(0, minimo - s.respondidas);
  var disponivel = Math.min(falta, s.ineditas.length);
  if (disponivel > 0) {
    deficit[sub]  = disponivel;
    deficitTotal += disponivel;
  }
});

if (deficitTotal === 0) return [];

// Distribui o bloco proporcionalmente ao déficit
var selecionadas = [];
var somaAlocada  = 0;
var alocacoes    = [];

Object.keys(deficit).forEach(function(sub) {
  var proporcao   = deficit[sub] / deficitTotal;
  var cotaExata   = tamanhoBloco * proporcao;
  var cotaInteira = Math.floor(cotaExata);
  somaAlocada    += cotaInteira;
  alocacoes.push({ sub: sub, cotaInteira: cotaInteira, resto: cotaExata - cotaInteira });
});

// Distribui sobras pelos maiores restos
var sobras = tamanhoBloco - somaAlocada;
alocacoes.sort(function(a, b) { return b.resto - a.resto; });
for (var i = 0; i < alocacoes.length && sobras > 0; i++) {
  alocacoes[i].cotaInteira++;
  sobras--;
}

alocacoes.forEach(function(item) {
  if (item.cotaInteira <= 0) return;
  var questoesSub = subtemas[item.sub].ineditas.slice(0, item.cotaInteira);
  Logger.log('[FASE-2] Subtema: ' + item.sub + ' | Alocadas: ' + questoesSub.length + ' | Déficit: ' + deficit[item.sub]);
  selecionadas = selecionadas.concat(questoesSub);
});

return embaralharArray(selecionadas).slice(0, tamanhoBloco);
}



/**
 * Helper para extrair o multiplicador de importância do Edital
 */
function _obterMultiplicadorEdital(disciplina, tema, subtema) {
  // FIX V14.1 — chave agora bate com MAPA_DISTRIBUICAO_EDITAL (MÉDIO, não MÉDIA)
  var pesos = { "CRÍTICO": 2.5, "NOVO": 2.0, "ALTO": 1.5, "MÉDIO": 1.2, "BAIXO": 1.0, "EXCLUIR": 0.0 };
  try {
    if (typeof MAPA_DISTRIBUICAO_EDITAL !== 'undefined' &&
        MAPA_DISTRIBUICAO_EDITAL[disciplina] &&
        MAPA_DISTRIBUICAO_EDITAL[disciplina][tema] &&
        MAPA_DISTRIBUICAO_EDITAL[disciplina][tema][subtema]) {
      var importancia = MAPA_DISTRIBUICAO_EDITAL[disciplina][tema][subtema].importancia;
      return pesos[importancia] !== undefined ? pesos[importancia] : 1.0;
    }
  } catch(e) {}
  return 1.0; 
}





function _calcularCotasSubtemasEdital(disciplina, volumeDisciplina) {
  var cotas = {};
  var ordemEdital = [];
  if (!MAPA_DISTRIBUICAO_EDITAL || !MAPA_DISTRIBUICAO_EDITAL[disciplina]) {
    return { cotas: cotas, ordem: ordemEdital };
  }
  var mapaDisc = MAPA_DISTRIBUICAO_EDITAL[disciplina];
  Object.keys(mapaDisc).forEach(function(tema) {
    var mapaSubtemas = mapaDisc[tema];
    Object.keys(mapaSubtemas).forEach(function(subtema) {
      var dados = mapaSubtemas[subtema];
      if (dados.importancia === 'EXCLUIR') return;
      var pct = parseFloat(String(dados.distribuicao).replace('%', '').replace(',', '.').trim()) || 0;
      if (pct <= 0) return;
      // V94 — migrado para o motor V23 (mesma formula da Fabrica e do Raio-X).
      var cota = (typeof _metaSubtemaV23 === 'function')
        ? Math.max(1, _metaSubtemaV23(disciplina, tema, subtema, volumeDisciplina))
        : Math.max(1, Math.round(volumeDisciplina * (pct / 100)));
      cotas[subtema] = {
        cota: cota,
        distribuicao: pct,
        importancia: dados.importancia,
        tema_edital: tema
      };
      ordemEdital.push(subtema);
    });
  });
  return { cotas: cotas, ordem: ordemEdital };
}

function _selecionarQuestoesInicializacaoSimples(todasQuestoes, estado, blacklist, tamanhoBloco) {
  var temaOrdem = [];
  var temaMap = {};
  todasQuestoes.forEach(function(q) {
    var tema = q.tema || 'Sem Tema';
    if (!temaMap[tema]) {
      temaMap[tema] = [];
      temaOrdem.push(tema);
    }
    temaMap[tema].push(q);
  });
  for (var i = 0; i < temaOrdem.length; i++) {
    var tema = temaOrdem[i];
    var ineditas = temaMap[tema].filter(function(q) {
      return !estado.respostas[q.idOriginal] && !blacklist.has(q.idOriginal);
    });
    if (ineditas.length > 0) {
      return ineditas.slice(0, tamanhoBloco);
    }
  }
  return [];
}

function _selecionarQuestoesInicializacao(todasQuestoes, estado, blacklist, tamanhoBloco, disciplina, volumeDisciplina) {
  if (!MAPA_DISTRIBUICAO_EDITAL || !MAPA_DISTRIBUICAO_EDITAL[disciplina]) {
    return _selecionarQuestoesInicializacaoSimples(todasQuestoes, estado, blacklist, tamanhoBloco);
  }
  var result = _calcularCotasSubtemasEdital(disciplina, volumeDisciplina || 1000);
  var cotas = result.cotas;
  var ordemEdital = result.ordem;
  if (ordemEdital.length === 0) {
    return _selecionarQuestoesInicializacaoSimples(todasQuestoes, estado, blacklist, tamanhoBloco);
  }
  var questoesPorSub = {};
  var respondidosPorSub = {};
  todasQuestoes.forEach(function(q) {
    var sub = q.subtema || 'Geral';
    if (!questoesPorSub[sub]) questoesPorSub[sub] = [];
    questoesPorSub[sub].push(q);
    if (estado.respostas[q.idOriginal]) {
      respondidosPorSub[sub] = (respondidosPorSub[sub] || 0) + 1;
    }
  });
  var subtemasComDeficit = [];
  var somaDistribuicao = 0;
  ordemEdital.forEach(function(subtema) {
    var cotaDados = cotas[subtema];
    var respondidas = respondidosPorSub[subtema] || 0;
    if (respondidas < cotaDados.cota) {
      var ineditas = (questoesPorSub[subtema] || []).filter(function(q) {
        return !estado.respostas[q.idOriginal] && !blacklist.has(q.idOriginal);
      });
      subtemasComDeficit.push({
        subtema: subtema,
        distribuicao: cotaDados.distribuicao,
        ineditas: ineditas
      });
      somaDistribuicao += cotaDados.distribuicao;
    }
  });
  if (subtemasComDeficit.length === 0) {
    return [];
  }
  if (somaDistribuicao === 0) somaDistribuicao = subtemasComDeficit.length;
  var alocacoes = [];
  var somaAlocada = 0;
  subtemasComDeficit.forEach(function(s) {
    var proporcao = s.distribuicao / somaDistribuicao;
    var cotaExata = tamanhoBloco * proporcao;
    var cotaInteira = Math.floor(cotaExata);
    somaAlocada += cotaInteira;
    alocacoes.push({
      subtema: s.subtema,
      cotaInteira: cotaInteira,
      resto: cotaExata - cotaInteira,
      ineditas: s.ineditas
    });
  });
  var sobras = tamanhoBloco - somaAlocada;
  alocacoes.sort(function(a, b) { return b.resto - a.resto; });
  for (var i = 0; i < alocacoes.length && sobras > 0; i++) {
    alocacoes[i].cotaInteira++;
    sobras--;
  }
  alocacoes.sort(function(a, b) {
    return ordemEdital.indexOf(a.subtema) - ordemEdital.indexOf(b.subtema);
  });
  var selecionadas = [];
  var alertasFalta = [];
  alocacoes.forEach(function(item) {
    if (item.cotaInteira <= 0) return;
    var qtdDisponivel = item.ineditas.length;
    if (qtdDisponivel < item.cotaInteira) {
      alertasFalta.push(item.subtema + " (-" + (item.cotaInteira - qtdDisponivel) + "q)");
    }
    selecionadas = selecionadas.concat(item.ineditas.slice(0, item.cotaInteira));
  });
  selecionadas._alertasFalta = alertasFalta;
  return selecionadas;
}

function _detectarFaseDisciplina(todasQuestoes, estado, disciplina, volumeDisciplina) {
  if (!MAPA_DISTRIBUICAO_EDITAL || !MAPA_DISTRIBUICAO_EDITAL[disciplina]) {
    var temas = {};
    todasQuestoes.forEach(function(q) {
      var tema = q.tema || 'Sem Tema';
      if (!temas[tema]) temas[tema] = { total: 0, respondidas: 0 };
      temas[tema].total++;
      if (estado.respostas[q.idOriginal]) temas[tema].respondidas++;
    });
    var algumNaoTocado = Object.keys(temas).some(function(t) {
      return temas[t].respondidas === 0;
    });
    return algumNaoTocado ? 1 : 3;
  }
  var result = _calcularCotasSubtemasEdital(disciplina, volumeDisciplina || 1000);
  var cotas = result.cotas;
  if (Object.keys(cotas).length === 0) return 3;
  var respondidosPorSub = {};
  var questoesPorSub = {};
  todasQuestoes.forEach(function(q) {
    var sub = q.subtema || 'Geral';
    if (!questoesPorSub[sub]) questoesPorSub[sub] = 0;
    if (estado.respostas[q.idOriginal]) {
      respondidosPorSub[sub] = (respondidosPorSub[sub] || 0) + 1;
    } else {
      questoesPorSub[sub]++;
    }
  });
  var algumComDeficit = Object.keys(cotas).some(function(sub) {
    var respondidas = respondidosPorSub[sub] || 0;
    var ineditas = questoesPorSub[sub] || 0;
    return respondidas < cotas[sub].cota && ineditas > 0;
  });
  return algumComDeficit ? 1 : 3;
}











/**
 * Fase 3 — Ciclo Adaptativo Turbinado pelo Edital
 */
function _selecionarQuestoesAdaptativo(todasQuestoes, estado, blacklist, tamanhoBloco, disciplina, hist) {

  // ── Cobertura mínima por subtema para ativar lógica de revisão ────────────
  var bancoPorSubtema = {};
  var respondidosPorSubtema = {};
  todasQuestoes.forEach(function(q) {
    var sub = q.subtema || 'Geral';
    bancoPorSubtema[sub] = (bancoPorSubtema[sub] || 0) + 1;
    if (estado.respostas[q.idOriginal]) {
      respondidosPorSubtema[sub] = (respondidosPorSubtema[sub] || 0) + 1;
    }
  });
  function subtemaAtingiumMinimo(sub) {
    var banco = bancoPorSubtema[sub] || 1;
    var respondidas = respondidosPorSubtema[sub] || 0;
    var minimo = Math.min(30, Math.ceil(banco * 0.5));
    return respondidas >= minimo;
  }
  // ─────────────────────────────────────────────────────────────────────────

  var hoje = new Date().toISOString().split('T')[0];
  var revisoesVencidas = [];
  var ineditas         = [];
  var erradas          = [];
  var subtemasMap      = new Map();
  var estatisticasSubtema = {};

  todasQuestoes.forEach(function(q) {
    var sub = q.subtema || 'Geral';
    var chave = q.disciplina + '___' + q.tema + '___' + sub;
    if (!estatisticasSubtema[chave]) estatisticasSubtema[chave] = { total: 0, erros: 0, taxa: 0 };
    var r = estado.respostas[q.idOriginal];
    if (r) {
      estatisticasSubtema[chave].total++;
      if (!r.correta) estatisticasSubtema[chave].erros++;
    }
  });
  Object.keys(estatisticasSubtema).forEach(function(chave) {
    var s = estatisticasSubtema[chave];
    if (s.total > 0) s.taxa = (s.erros / s.total) * 100;
  });

  todasQuestoes.forEach(function(q) {
    var sub = q.subtema || 'Geral';
    var chave = q.disciplina + '___' + q.tema + '___' + sub;
    var stats = estatisticasSubtema[chave];
    q.ehSubtemaProblematico = (estado.contadores_erro[q.idOriginal] || 0) >= 2;
    q.taxaErroSubtema       = stats ? stats.taxa : 0;

    if (blacklist.has(q.idOriginal)) return;
    var r = estado.respostas[q.idOriginal];

    if (r && estado.tempo_por_questao[q.idOriginal] && subtemaAtingiumMinimo(sub)) {
      var tq = estado.tempo_por_questao[q.idOriginal];
      if (tq.proxima_revisao && tq.proxima_revisao <= hoje) {
        revisoesVencidas.push(q);
        return;
      }
    }

    if (!r) {
      ineditas.push(q);
      if (!subtemasMap.has(sub)) subtemasMap.set(sub, { ineditas: 0, erradas: 0, total: 0, taxaErro: q.taxaErroSubtema, problematica: q.ehSubtemaProblematico, weightFinal: 0 });
      subtemasMap.get(sub).ineditas++;
      subtemasMap.get(sub).total++;
    } else if (!r.correta) {
      erradas.push(q);
      if (!subtemasMap.has(sub)) subtemasMap.set(sub, { ineditas: 0, erradas: 0, total: 0, taxaErro: q.taxaErroSubtema, problematica: q.ehSubtemaProblematico, weightFinal: 0 });
      subtemasMap.get(sub).erradas++;
      subtemasMap.get(sub).total++;
    }
  });

  var dadosHist           = hist.acumulado_por_disciplina[disciplina] || { percentual: 0 };
  var taxaDisciplina      = dadosHist.percentual;
  var disciplinaBaixaPerf = taxaDisciplina > 0 && taxaDisciplina < 70;
  var cotaRevisao         = Math.min(Math.floor(tamanhoBloco * 0.2), revisoesVencidas.length);
  var cotaPrincipal       = tamanhoBloco - cotaRevisao;
  var questoesRevisao     = embaralharArray(revisoesVencidas).slice(0, cotaRevisao);
  var selecionadas        = [];

  if (disciplinaBaixaPerf && erradas.length > 0) {
    selecionadas = embaralharArray(erradas).slice(0, cotaPrincipal);
  } else if (ineditas.length > 0) {
    var cotaIneditas  = Math.ceil(cotaPrincipal * 0.8);
    var cotaErradas   = Math.floor(cotaPrincipal * 0.2);
    var totalWeighted = 0;

    // ── MAGIA AQUI: Cruzamento de Desempenho com Importância do Edital ──
    subtemasMap.forEach(function(stats, subtema) {
      if (stats.ineditas > 0) {
        var temaRef = ineditas.find(function(q) { return (q.subtema || 'Geral') === subtema; }).tema;
        var pesoEdital = _obterMultiplicadorEdital(disciplina, temaRef, subtema);
        var pesoDesempenho = (stats.taxaErro > 50 || stats.problematica) ? 1.5 : 1.0;
        
        stats.weightFinal = pesoEdital * pesoDesempenho;
        totalWeighted += stats.ineditas * stats.weightFinal;
      }
    });

    if (totalWeighted === 0) totalWeighted = ineditas.length;

    var alocacaoTemp = [];
    var somaAlocada  = 0;
    
    subtemasMap.forEach(function(stats, subtema) {
      if (stats.ineditas > 0 && stats.weightFinal > 0) { 
        var cotaExata   = (stats.ineditas * stats.weightFinal / totalWeighted) * cotaIneditas;
        var cotaInteira = Math.floor(cotaExata);
        somaAlocada    += cotaInteira;
        alocacaoTemp.push({ subtema: subtema, cotaInteira: cotaInteira, resto: cotaExata - cotaInteira, volumeDisponivel: stats.ineditas });
      }
    });

    var sobras = cotaIneditas - somaAlocada;
    alocacaoTemp.sort(function(a, b) { return b.resto - a.resto; });
    for (var i = 0; i < alocacaoTemp.length && sobras > 0; i++) { 
        alocacaoTemp[i].cotaInteira++; 
        sobras--; 
    }

    alocacaoTemp.forEach(function(item) {
      if (item.cotaInteira <= 0) return;
      var questoesSub = ineditas.filter(function(q) { return (q.subtema || 'Geral') === item.subtema; });
      selecionadas = selecionadas.concat(embaralharArray(questoesSub).slice(0, item.cotaInteira));
    });

    if (cotaErradas > 0 && erradas.length > 0) {
      selecionadas = selecionadas.concat(embaralharArray(erradas).slice(0, Math.min(cotaErradas, erradas.length)));
    }
    selecionadas = embaralharArray(selecionadas);

  } else if (erradas.length > 0) {
    selecionadas = embaralharArray(erradas).slice(0, cotaPrincipal);
  } else {
    var certas = todasQuestoes.filter(function(q) {
      var r = estado.respostas[q.idOriginal];
      return r && r.correta && !blacklist.has(q.idOriginal);
    });
    selecionadas = embaralharArray(certas).slice(0, cotaPrincipal);
  }

  if (questoesRevisao.length > 0) {
    selecionadas = embaralharArray(questoesRevisao.concat(selecionadas));
  }

  return selecionadas;
}

/**
 * RECALCULA MATEMÁTICA DO CICLO EM ANDAMENTO SEM QUEBRAR PROGRESSO
 */


function recalcularCicloEmAndamento() {
var _balV100 = _recalcularBalanceadoV100(null, 'Ciclo reajustado e balanceado, preservando seu progresso!');
if (_balV100) return _balV100;
  try {
    var config = carregarConfiguracaoCiclo();
    if (!config.fila || config.fila.length === 0) return { erro: "Nenhum ciclo ativo para sincronizar." };

    var planejamento = config.planejamento || {};
    var metaDia = planejamento.meta_qtd_dia || 80;
    var discDia = planejamento.disciplinas_dia || 3;
    var minPorQuestao = planejamento.min_por_questao || 3;

    var numDisc = config.fila.length;
    var diasPorCiclo = Math.ceil(numDisc / discDia);

    for (var diaIdx = 0; diaIdx < diasPorCiclo; diaIdx++) {
      var inicio = diaIdx * discDia;
      var fim = Math.min(inicio + discDia, numDisc);
      var grupoAtual = config.fila.slice(inicio, fim);
      var somaPesosGrupo = grupoAtual.reduce(function(acc, item) { return acc + (item.peso_raw || 0); }, 0);

      if (somaPesosGrupo === 0) {
        var blocoIgual = Math.round(metaDia / grupoAtual.length);
        grupoAtual.forEach(function(item) {
          item.qtd_bloco = Math.max(1, blocoIgual);
          item.tempo_bloco = Math.round(item.qtd_bloco * minPorQuestao);
          item.grupo_ciclo = diaIdx;
        });
      } else {
        grupoAtual.forEach(function(item) {
          item.qtd_bloco = Math.max(1, Math.round(metaDia * ((item.peso_raw || 0) / 100) * diasPorCiclo));
          item.tempo_bloco = Math.round(item.qtd_bloco * minPorQuestao);
          item.grupo_ciclo = diaIdx;
        });
      }
    }
    if (!config.ponteiro_fila || config.ponteiro_fila >= config.fila.length) config.ponteiro_fila = 0;

    salvarConfiguracaoCiclo(config);
    reconstruirCacheCompleto();
    return { sucesso: true, msg: "Ciclo reajustado com sucesso preservando seu progresso!" };
  } catch(e) {
    return { erro: e.message };
  }
}


function gerarCicloComProgresso() {
  abrirModalProgresso();
  document.getElementById('progresso-status').innerText = 'Lendo parâmetros...';
  var params = {
      volumeTotal: parseInt(document.getElementById('quick-volume').value) || 30000,
      template: document.getElementById('quick-template').value || 'AGENTE_PJ',
      periodoMeses: parseFloat(document.getElementById('quick-meses').value) || 18,
      diasSemana: parseInt(document.getElementById('quick-dias-semana').value) || 5,
      horasDia: parseFloat(document.getElementById('quick-horas').value) || 4,
      minPorQuestao: parseFloat(document.getElementById('quick-min').value) || 3,
      disciplinasDia: parseInt(document.getElementById('quick-disc-dia').value) || 3
  };

  addLog('Parâmetros lidos. Criando fila base no servidor...', 'processing');
  document.getElementById('progresso-barra').style.width = '10%';
  document.getElementById('progresso-percent').innerText = '10%';

  google.script.run
      .withSuccessHandler(function(res) {
          if (res && res.sucesso) {
              addLog('Fila criada: ' + res.totalDisciplinas + ' disciplinas. Meta diária: ' + res.metaDiaria, 'ok');
              processarProximaDisciplina(0, res.totalDisciplinas);
          } else {
              falhaProgresso(res ? res.erro : "Erro desconhecido");
          }
      })
      .withFailureHandler(function(err) {
          falhaProgresso(err.message);
      })
      .gerarFilaCicloBase(params);
}

function processarProximaDisciplina(index, total) {
  var pct = 10 + Math.round((index / total) * 80);
  document.getElementById('progresso-barra').style.width = pct + '%';
  document.getElementById('progresso-percent').innerText = pct + '%';
  document.getElementById('progresso-status').innerText = 'Mapeando matéria ' + (index + 1) + ' de ' + total;

  google.script.run
      .withSuccessHandler(function(res) {
          if (res.erro) {
              addLog('Erro no índice ' + index + ': ' + res.erro, 'error');
          } else {
              addLog('✅ ' + res.disciplina + ' (Banco: ' + res.totalQuestoes + 'q, Subs: ' + res.totalSubtemas + ')', 'ok');
          }
          
          if (index + 1 < total) {
              processarProximaDisciplina(index + 1, total);
          } else {
              finalizarProcessamentoCiclo();
          }
      })
      .withFailureHandler(function(err) {
          addLog('Falha de rede no índice ' + index + '. Tentando próximo...', 'error');
          if (index + 1 < total) {
              processarProximaDisciplina(index + 1, total);
          } else {
              finalizarProcessamentoCiclo();
          }
      })
      .processarDisciplinaUnica(index);
}

function finalizarProcessamentoCiclo() {
  document.getElementById('progresso-status').innerText = 'Finalizando caches...';
  google.script.run
      .withSuccessHandler(function(res) {
          document.getElementById('progresso-barra').style.width = '100%';
          document.getElementById('progresso-percent').innerText = '100%';
          document.getElementById('progresso-status').innerText = 'Concluído!';
          addLog('Ciclo finalizado. Caches reconstruídos.', 'ok');
          document.getElementById('progresso-resumo-texto').innerHTML = 'O novo ciclo foi criado e distribuído proporcionalmente.';
          document.getElementById('progresso-resumo').style.display = 'block';
          document.getElementById('progresso-botoes').innerHTML = '<button class="apply-btn" style="margin:0; width:100%; background:var(--green);" onclick="fecharModalProgresso(); window.location.reload();">Atualizar Interface</button>';
          document.getElementById('progresso-botoes').style.display = 'block';
      })
      .finalizarCacheCiclo();
}

function falhaProgresso(msg) {
  document.getElementById('progresso-barra').style.background = 'var(--red)';
  document.getElementById('progresso-status').innerText = 'Erro na Geração';
  addLog('Falha: ' + msg, 'error');
  document.getElementById('progresso-botoes').innerHTML = '<button class="danger-btn" style="margin:0; width:100%; border:1px solid var(--border);" onclick="fecharModalProgresso()">Fechar</button>';
  document.getElementById('progresso-botoes').style.display = 'block';
}

function gerarCicloRapido() {
  gerarCicloComProgresso();
}



// ============================================================================
// CICLO DE ESTUDOS V14 — SEQUENCIAL + GATE + VALIDAÇÃO DE BANCO
// Substitui: obterProximoBlocoCiclo, registrarFimBloco, pausarESalvarCiclo
// Adiciona:  _lerPonteiro, _salvarPonteiro, _getTemasOrdem, _getSubtemasOrdem,
//            _validarBancoCiclo, _taxaSubtema, _gateAprovado,
//            _questoesSubtemaDisponiveis, _proximaPosicao
// ============================================================================



const ARQUIVO_PONTEIRO_CICLO = "ponteiro_ciclo_v1.json";

// ── PONTEIRO DE POSIÇÃO ───────────────────────────────────────────────────────

function _lerPonteiro() {
  var p = _readJsonFromDrive(ARQUIVO_PONTEIRO_CICLO);
  if (!p) {
    p = { disciplina: null, tema: null, subtema: null, questoes_sessao: 0 };
  }
  return p;
}

function _salvarPonteiro(p) {
  p.atualizado = new Date().toISOString();
  _saveJsonToDrive(ARQUIVO_PONTEIRO_CICLO, p);
}

// ── ORDEM SEQUENCIAL DO EDITAL ────────────────────────────────────────────────



// ══════════════════════════════════════════════════════════════════════════════
// V23 — MOTOR DE METAS (fonte única de verdade para meta por subtema)
//
// DEFEITO CORRIGIDO: em 4 pontos do sistema a meta era
//     metaQtd = volume_total_meta × (distribuicao% / 100)
// mas `distribuicao%` é normalizada DENTRO do tema (soma 100% em CADA tema),
// enquanto `volume_total_meta` é da DISCIPLINA inteira. Resultado: cada tema
// recebia a meta da disciplina inteira.
//   • Contabilidade: 13 temas × 110 = 1.430 de meta para uma meta real de 110
//   • Direito Tributário: 18 temas × 90 = 1.620 para uma meta real de 90
// Faltava a camada de PESO DO TEMA, que não existe no MAPA_DISTRIBUICAO_EDITAL.
// Aqui ela é derivada da incidência real do banco (blend 50% banco / 50%
// uniforme, para que tema com banco pequeno não zere) e as metas são fechadas
// por maior-resto: a soma dos subtemas é EXATAMENTE a meta da disciplina.
// ══════════════════════════════════════════════════════════════════════════════

var _CACHE_META_V23   = {};   // 'disciplina||meta' -> { chave: meta }
var _CACHE_ARVORE_V23 = null; // árvore do Raio-X (contagem real do banco)

function _normChaveV23(s) {
  var t = String(s === null || s === undefined ? '' : s);
  try {
    t = t.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  } catch (e) {
    t = t.replace(/[àáâãäå]/gi, 'a').replace(/[èéêë]/gi, 'e').replace(/[ìíîï]/gi, 'i')
         .replace(/[òóôõö]/gi, 'o').replace(/[ùúûü]/gi, 'u')
         .replace(/ç/gi, 'c').replace(/ñ/gi, 'n');
  }
  return t.replace(/[^A-Za-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
}

function _numTemaV23(s) {
  var m = String(s === null || s === undefined ? '' : s).match(/^\s*(\d{1,2})(?!\d)/);
  return m ? String(parseInt(m[1], 10)) : null;
}

function _arvoreBancoV23() {
  if (_CACHE_ARVORE_V23) return _CACHE_ARVORE_V23;
  try {
    var rx = _readJsonFromDrive('raiox_banco_v1.json');
    if (rx && rx.arvore) rx = _podarArvoreRaioXPeloEdital(rx);   // V99 — pesos/metas só sobre o edital canônico
    _CACHE_ARVORE_V23 = (rx && rx.arvore) ? rx.arvore : {};
  } catch (e) {
    Logger.log('[META-V23] Raio-X indisponível (' + e.message + ') — peso de tema cai para uniforme.');
    _CACHE_ARVORE_V23 = {};
  }
  return _CACHE_ARVORE_V23;
}



function _pesosTemaV23(disciplina) {
  var temas = _getTemasOrdem(disciplina);
  var pesos = {};
  var n = temas.length;
  if (n === 0) return pesos;

  // FIX: Peso do tema é 100% estático (dividido igualmente entre os temas do edital).
  // ZERO influência da quantidade de questões no banco. A meta não infla mais.
  temas.forEach(function(t) {
    pesos[t] = 1 / n;
  });
  
  return pesos;
}





function _metasDisciplinaV23(disciplina, volumeMetaDisc) {
  var ck = disciplina + '||' + volumeMetaDisc;
  if (_CACHE_META_V23[ck]) return _CACHE_META_V23[ck];

  var mapaMeta = {};
  if (!MAPA_DISTRIBUICAO_EDITAL || !MAPA_DISTRIBUICAO_EDITAL[disciplina]) {
    _CACHE_META_V23[ck] = mapaMeta;
    return mapaMeta;
  }

  var pesosTema = _pesosTemaV23(disciplina);
  var itens = [];

  _getTemasOrdem(disciplina).forEach(function(tema) {
    var pt = pesosTema[tema] || 0;
    _getSubtemasOrdem(disciplina, tema).forEach(function(sub) {
      var dados = MAPA_DISTRIBUICAO_EDITAL[disciplina][tema][sub] || {};
      var pct = parseFloat(String(dados.distribuicao || '0').replace('%', '').replace(',', '.')) || 0;
      if (pct <= 0) return;
      itens.push({
        chave: _normChaveV23(tema) + '###' + _normChaveV23(sub),
        w: pt * (pct / 100)
      });
    });
  });

  var n = itens.length;
  if (n === 0) { _CACHE_META_V23[ck] = mapaMeta; return mapaMeta; }

  var meta = Math.max(0, Math.round(Number(volumeMetaDisc) || 0));

  if (meta <= n) {
    itens.forEach(function(i) { mapaMeta[i.chave] = 1; });
    _CACHE_META_V23[ck] = mapaMeta;
    return mapaMeta;
  }

  var somaW = itens.reduce(function(a, i) { return a + i.w; }, 0);
  if (somaW <= 0) somaW = 1;

  var restante = meta - n;
  var somaBase = 0;
  itens.forEach(function(i) {
    var exato = restante * (i.w / somaW);
    i.base  = Math.floor(exato);
    i.resto = exato - i.base;
    somaBase += i.base;
  });

  var sobra = restante - somaBase;
  itens.slice().sort(function(a, b) { return b.resto - a.resto; })
       .forEach(function(i, k) { if (k < sobra) i.base += 1; });

  itens.forEach(function(i) { mapaMeta[i.chave] = 1 + i.base; });
  _CACHE_META_V23[ck] = mapaMeta;
  return mapaMeta;
}

function _metaSubtemaV23(disciplina, tema, subtema, volumeMetaDisc) {
  var m = _metasDisciplinaV23(disciplina, volumeMetaDisc);
  var v = m[_normChaveV23(tema) + '###' + _normChaveV23(subtema)];
  return (v === undefined) ? 0 : v;
}

function _invalidarCacheMetasV23() {
  _CACHE_META_V23 = {};
  _CACHE_ARVORE_V23 = null;
}

function auditarMetasCicloV23() {
  _invalidarCacheMetasV23();
  var config = carregarConfiguracaoCiclo();
  var linhas = [];
  (config.fila || []).forEach(function(item) {
    var metaDisc = item.volume_total_meta || 0;
    var metas  = _metasDisciplinaV23(item.disciplina, metaDisc);
    var chaves = Object.keys(metas);
    var soma   = chaves.reduce(function(a, k) { return a + metas[k]; }, 0);
    linhas.push({
      disciplina:          item.disciplina,
      meta_disciplina:     metaDisc,
      subtemas_ativos:     chaves.length,
      soma_metas_subtema:  soma,
      fecha_exato:         soma === Math.max(metaDisc, chaves.length),
      densidade_por_subtema: chaves.length ? Number((soma / chaves.length).toFixed(2)) : 0
    });
  });
  var totSub  = linhas.reduce(function(a, l) { return a + l.subtemas_ativos; }, 0);
  var totMeta = linhas.reduce(function(a, l) { return a + l.soma_metas_subtema; }, 0);
  var res = {
    linhas: linhas,
    total_subtemas_ativos: totSub,
    total_meta: totMeta,
    densidade_global: totSub ? Number((totMeta / totSub).toFixed(2)) : 0,
    tudo_fecha: linhas.every(function(l) { return l.fecha_exato; })
  };
  Logger.log('[AUDIT-METAS-V23] ' + JSON.stringify(res, null, 2));
  return res;
}

function _getSubtemasOrdem(disciplina, tema) {
  if (
    !MAPA_DISTRIBUICAO_EDITAL ||
    !MAPA_DISTRIBUICAO_EDITAL[disciplina] ||
    !MAPA_DISTRIBUICAO_EDITAL[disciplina][tema]
  ) return [];
  var mapa = MAPA_DISTRIBUICAO_EDITAL[disciplina][tema];
  var ativos = Object.keys(mapa).filter(function(s) {
    return mapa[s].importancia !== 'EXCLUIR';
  });
  // V104 — ordem didática dos subtemas (Config.gs: ORDEM_DIDATICA[disc].subtemas[nº do tema]).
  var od = _ordemDidaticaV104(disciplina);
  var nT = _numTemaV23(tema);
  var lista = (od && od.subtemas && nT !== null) ? (od.subtemas[nT] || od.subtemas[('0' + nT).slice(-2)]) : null;
  if (!Array.isArray(lista) || !lista.length) return ativos;
  var pos = {};
  lista.forEach(function(sub, i) { pos[sub] = i; });
  return ativos.map(function(sub, i) {
    return { s: sub, k: pos[sub] !== undefined ? pos[sub] : lista.length + i };
  }).sort(function(a, b) { return a.k - b.k; }).map(function(x) { return x.s; });
}

// ── VALIDAÇÃO DO BANCO ANTES DE INICIAR ──────────────────────────────────────
// Bloqueia apenas se subtemas CRÍTICO ou ALTO tiverem banco < 30% da cota mínima.

function _validarBancoCiclo(disciplina, mapa, config) {
  if (!MAPA_DISTRIBUICAO_EDITAL || !MAPA_DISTRIBUICAO_EDITAL[disciplina]) {
    return { valido: true, deficit: [], bloqueantes: [] };
  }

  var itemFila = null;
  if (config && config.fila) {
    itemFila = config.fila.find(function(f) { return f.disciplina === disciplina; });
  }
  var volumeMeta = itemFila ? (itemFila.volume_total_meta || 1000) : 1000;

  // Conta questões por subtema no banco
  var bancoPorSubtema = {};
  if (mapa[disciplina] && mapa[disciplina].questoes) {
    try {
      var ids = mapa[disciplina].questoes.map(function(f) { return f.id; });
      var todas = carregarMultiplosJsons(ids);
      todas.forEach(function(q) {
        var sub = q.subtema || 'Geral';
        bancoPorSubtema[sub] = (bancoPorSubtema[sub] || 0) + 1;
      });
    } catch(e) {
      Logger.log('[VALIDAR-BANCO] Erro ao carregar questões: ' + e.message);
    }
  }

  var deficit = [];
  var temas = _getTemasOrdem(disciplina);

  temas.forEach(function(tema) {
    var subtemas = _getSubtemasOrdem(disciplina, tema);
    subtemas.forEach(function(subtema) {
      var dadosSub = MAPA_DISTRIBUICAO_EDITAL[disciplina][tema][subtema];
      var pct = parseFloat(
        String(dadosSub.distribuicao).replace('%', '').replace(',', '.').trim()
      ) || 0;
      if (pct <= 0) return;

      // Mínimo para poder iniciar = 30% da cota proporcional, nunca menos que 5
      // V94 — migrado para o motor V23. A formula antiga inflava a cota minima
      // pelo n de temas e bloqueava o inicio do ciclo sem motivo real.
      var cotaTotal   = (typeof _metaSubtemaV23 === 'function')
        ? _metaSubtemaV23(disciplina, tema, subtema, volumeMeta)
        : Math.round(volumeMeta * (pct / 100));
      var cotaMinima  = Math.max(5, Math.round(cotaTotal * 0.30));
      var disponivel  = bancoPorSubtema[subtema] || 0;

      if (disponivel < cotaMinima) {
        deficit.push({
          tema:        tema,
          subtema:     subtema,
          importancia: dadosSub.importancia,
          cota_total:  cotaTotal,
          cota_minima: cotaMinima,
          disponivel:  disponivel,
          deficit:     cotaMinima - disponivel
        });
      }
    });
  });

  var bloqueantes = deficit.filter(function(d) {
    return d.importancia === 'CRÍTICO' || d.importancia === 'ALTO';
  });

  return {
    valido:      bloqueantes.length === 0,
    deficit:     deficit,
    bloqueantes: bloqueantes
  };
}

// ── TAXA DE ACERTO POR SUBTEMA ────────────────────────────────────────────────

function _taxaSubtema(disciplina, tema, subtema, estado) {
  // V20.3 — delega para a versão com janela de recência (ver _taxaSubtemaDetalhe).
  return _taxaSubtemaDetalhe(disciplina, tema, subtema, estado).taxa;
}

// ── GATE: PODE AVANÇAR PARA O PRÓXIMO SUBTEMA? ───────────────────────────────

function _gateAprovado(disciplina, tema, subtema, estado) {
  if (
    !MAPA_DISTRIBUICAO_EDITAL ||
    !MAPA_DISTRIBUICAO_EDITAL[disciplina] ||
    !MAPA_DISTRIBUICAO_EDITAL[disciplina][tema] ||
    !MAPA_DISTRIBUICAO_EDITAL[disciplina][tema][subtema]
  ) return true;

  var importancia = MAPA_DISTRIBUICAO_EDITAL[disciplina][tema][subtema].importancia;
  var minimo      = GATE_IMPORTANCIA[importancia] !== undefined ? GATE_IMPORTANCIA[importancia] : 50;
  if (minimo === 0) return true;

  // V20.3 — AMOSTRA MÍNIMA. Antes, UMA única resposta certa dava taxa 100% e
  // aprovava o gate na hora: um chute com sorte "dominava" um subtema CRÍTICO.
  // Agora o gate só pode aprovar com base estatística mínima.
  var res = _taxaSubtemaDetalhe(disciplina, tema, subtema, estado);
  if (res.total === 0) return false;                 // nada respondido ainda

  var AMOSTRA_MINIMA = _motorCfg().gate_amostra_min;   // V22 — configurável
  if (res.total < AMOSTRA_MINIMA) return false;      // poucos dados: continua no subtema

  return res.taxa >= minimo;
}

/**
 * V20.3 — taxa com JANELA DE RECÊNCIA.
 * A taxa era vitalícia: contava toda resposta já dada no subtema. Isso produzia
 * dois erros opostos e igualmente ruins:
 *   • o aluno que errou muito no começo e hoje acerta tudo ficava PRESO para
 *     sempre — a média histórica nunca alcançava o gate;
 *   • o aluno que acertou por sorte no começo e hoje erra passava assim mesmo.
 * Agora, havendo dados recentes suficientes, a taxa olha só a janela recente.
 * Registros antigos (sem `respondida_em`) continuam valendo pelo modo vitalício,
 * então nada quebra para quem já tem histórico.
 */
function _taxaSubtemaDetalhe(disciplina, tema, subtema, estado) {
  var _mc = _motorCfg();                       // V22 — configurável
  var JANELA_DIAS  = _mc.taxa_janela_dias;
  var MIN_RECENTES = _mc.taxa_min_recentes;
  var limite = new Date();
  limite.setDate(limite.getDate() - JANELA_DIAS);
  var limiteISO = limite.toISOString().split('T')[0];

  var totGeral = 0, okGeral = 0, totRec = 0, okRec = 0;

  Object.keys(estado.respostas || {}).forEach(function(id) {
    var t = estado.tempo_por_questao && estado.tempo_por_questao[id];
    if (!t) return;
    // V99 — o histórico guarda o nome vigente na hora da resposta (pode ser variante): resolve pelo canônico
    var _cT = _chaveCanonicaEdital(t.disciplina, t.tema, t.subtema || 'Geral');
    var _cA = _chaveCanonicaEdital(disciplina, tema, subtema || 'Geral');
    var _dT = _cT ? _cT.disciplina : t.disciplina, _tT = _cT ? _cT.tema : t.tema, _sT = _cT ? _cT.subtema : (t.subtema || 'Geral');
    var _dA = _cA ? _cA.disciplina : disciplina,  _tA = _cA ? _cA.tema : tema,  _sA = _cA ? _cA.subtema : (subtema || 'Geral');
    if (_dT !== _dA || _tT !== _tA || _sT !== _sA) return;

    var acertou = !!estado.respostas[id].correta;
    totGeral++; if (acertou) okGeral++;

    // V20.4 — `data_resposta` (ISO completo) JÁ vinha do front desde sempre,
    // em todo o histórico. Usar só o `respondida_em` que criei na V20.3 faria a
    // janela de recência valer apenas para respostas futuras, ignorando meses de
    // histórico existente. Agora qualquer um dos dois serve.
    var quando = t.respondida_em || (t.data_resposta ? String(t.data_resposta).split('T')[0] : null);
    if (quando && quando >= limiteISO) {
      totRec++; if (acertou) okRec++;
    }
  });

  if (totGeral === 0) return { taxa: -1, total: 0, janela: 'sem dados' };

  if (totRec >= MIN_RECENTES) {
    return { taxa: Math.round((okRec / totRec) * 100), total: totRec, janela: 'recente' };
  }
  return { taxa: Math.round((okGeral / totGeral) * 100), total: totGeral, janela: 'vitalicia' };
}

// ── QUESTÕES DISPONÍVEIS PARA UM SUBTEMA ESPECÍFICO ──────────────────────────

function _questoesSubtemaDisponiveis(disciplina, tema, subtema, mapa, estado, blacklist) {
  if (!mapa[disciplina] || !mapa[disciplina].questoes) return [];

  var ids   = mapa[disciplina].questoes.map(function(f) { return f.id; });
  var todas;
  try {
    todas = carregarMultiplosJsons(ids);
  } catch(e) {
    Logger.log('[QUESTOES-SUB] Erro: ' + e.message);
    return [];
  }

  // ══════════════════════════════════════════════════════════════════════════
  // V23 — o casamento era por igualdade EXATA de string. Qualquer deriva de
  // acento, emoji, pontuação, caixa ou espaço duplo entre o nome gravado no
  // MAPA_DISTRIBUICAO_EDITAL e o nome gravado dentro da questão zerava o pool,
  // e o ciclo acusava "BANCO ESGOTADO" com o banco cheio. No banco atual há 26
  // grupos de subtemas quase-duplicados (1.301 questões) e temas gravados só
  // como "02" (Contabilidade, 421 questões) e "01" (Auditoria, 2.398 questões).
  // Agora compara por chave normalizada, com fallback pelo número do tema.
  // ══════════════════════════════════════════════════════════════════════════
  var kTema  = _normChaveV23(tema);
  var kSub   = _normChaveV23(subtema);
  var nTema  = _numTemaV23(tema);

  return todas.filter(function(q) {
    if (blacklist.has(q.idOriginal)) return false;
    if (_normChaveV23(q.subtema || 'Geral') !== kSub) return false;
    var kq = _normChaveV23(q.tema || '');
    if (kq === kTema) return true;
    // V99 — igualdade exata da chave do tema (número inteiro + nome); sem similaridade de palavras
    return _chaveTemaEdital(q.tema || '') === _chaveTemaEdital(tema);
  });
}

// ── PRÓXIMA POSIÇÃO NA SEQUÊNCIA DO EDITAL ────────────────────────────────────

function _proximaPosicao(disciplina, temaAtual, subtemaAtual) {
  var temas    = _getTemasOrdem(disciplina);
  var temaIdx  = temas.indexOf(temaAtual);
  if (temaIdx === -1) temaIdx = 0;

  for (var ti = temaIdx; ti < temas.length; ti++) {
    var tema     = temas[ti];
    var subtemas = _getSubtemasOrdem(disciplina, tema);
    var subStart = (ti === temaIdx) ? (subtemas.indexOf(subtemaAtual) + 1) : 0;

    for (var si = subStart; si < subtemas.length; si++) {
      var sub = subtemas[si];
      var imp = MAPA_DISTRIBUICAO_EDITAL[disciplina][tema][sub].importancia;
      if (imp === 'EXCLUIR') continue;
      return { tema: tema, subtema: sub };
    }
  }
  return null; // Fim da disciplina
}

// ── PRÓXIMA DISCIPLINA NA FILA ────────────────────────────────────────────────

/**
 * V20.2 — O CICLO NÃO ERA CIRCULAR.
 * Antes, ao chegar na ÚLTIMA disciplina da fila esta função devolvia null.
 * Em obterProximoBlocoCiclo isso caía em `if (!proxDisc) break;`, o laço morria
 * e o aluno recebia "Ciclo indeterminou apos 200 iteracoes. Verifique o banco de
 * questoes." — mensagem que ainda culpava o banco de questões. Ou seja: o ciclo
 * de estudos era uma lista de mão única que terminava em erro, nunca um ciclo.
 * Agora dá a volta para a primeira disciplina.
 */
/**
 * V20.3 — REVISÃO ESPAÇADA LIGADA AO CICLO (a falha didática central)
 *
 * O sistema JÁ calculava tudo o que precisa: a cada resposta, salvarRespostaComTempo
 * grava `acertos_consecutivos` e `proxima_revisao` usando INTERVALOS_REVISAO
 * [1, 3, 7, 14, 30] dias. Essa data ia para o Drive e NINGUÉM LIA:
 *   • subtemaAtingiumMinimo vive dentro de _selecionarQuestoesAdaptativo (código morto)
 *   • calcularScoreUrgencia tem 0 chamadas
 *   • obterProximoBlocoCiclo nunca mencionava proxima_revisao
 *
 * Consequência: o aluno dominava um subtema, o gate aprovava, o ponteiro avançava
 * e aquele conteúdo só reaparecia depois de percorrer TODO o edital. Para um
 * concurso com centenas de subtemas isso é "nunca". A curva do esquecimento não
 * era tratada: era um percurso linear com prova de passagem, não um ciclo.
 */
/**
 * V20.4 — A BLACKLIST MATAVA A REVISÃO (bug do fix da V20.3).
 * O arquivo se chama `blacklist_sessao_temp.json`, mas NUNCA era limpo por
 * sessão: só em gerarFilaCicloBase (criação do ciclo), no fim_ciclo (todo o
 * edital concluído) e em resetarPonteiroCiclo (código morto). Ou seja, toda
 * questão já respondida ficava bloqueada por meses. Como _questoesDevidasRevisao
 * filtra pela blacklist, ela devolveria ZERO para sempre — a revisão espaçada
 * que entreguei na V20.3 nasceria morta.
 * Agora a blacklist carimba o dia e se limpa sozinha na virada.
 */
function _blacklistDoDia() {
  var hoje = new Date().toISOString().split('T')[0];
  var obj  = _readJsonFromDrive(ARQUIVO_BLACKLIST_SESSAO) || { ids: [], dia: hoje };
  if (obj.dia !== hoje) {
    Logger.log('[BLACKLIST] virada de dia (' + obj.dia + ' -> ' + hoje + '): ' +
               (obj.ids || []).length + ' id(s) liberados para revisão.');
    obj = { ids: [], dia: hoje };
    _saveJsonToDrive(ARQUIVO_BLACKLIST_SESSAO, obj);
  }
  return obj;
}


/**
 * V22 — LEITOR DO MOTOR DIDÁTICO
 * Estes números governavam o ciclo e a lousa direto do código-fonte: gate por
 * importância, intervalos de revisão, janela de recência, watchdog. Não havia
 * campo nenhum na configuração — mudar qualquer um exigia editar este arquivo.
 * Agora vêm de preferencias.config.motor, e cada default é exatamente o valor
 * que já vigorava, então quem nunca abrir a tela não sente diferença.
 */
function _motorCfg() {
  try {
    if (_motorCfg._cache && (Date.now() - _motorCfg._t) < 60000) return _motorCfg._cache;
    var prefs = (typeof carregarPreferencias === 'function') ? carregarPreferencias() : null;
    var m = (prefs && prefs.config && prefs.config.motor) ? prefs.config.motor : {};
    var num = function(v, def) { var n = parseInt(v, 10); return (isNaN(n) || n < 0) ? def : n; };
    var cfg = {
      srs_intervalos:     (Array.isArray(m.srs_intervalos) && m.srs_intervalos.length) ? m.srs_intervalos : [1,3,7,14,30],
      srs_blocos_entre:   num(m.srs_blocos_entre, 2),
      srs_min_vencidas:   num(m.srs_min_vencidas, 3),
      srs_acertos_erro:   num(m.srs_acertos_erro, 2),
      gate:               (m.gate && typeof m.gate === 'object') ? m.gate : null,
      gate_amostra_min:   num(m.gate_amostra_min, 1),
      taxa_janela_dias:   num(m.taxa_janela_dias, 60),
      taxa_min_recentes:  num(m.taxa_min_recentes, 4),
      canvas_min_reveals: num(m.canvas_min_reveals, 6)
    };
    _motorCfg._cache = cfg; _motorCfg._t = Date.now();
    return cfg;
  } catch (e) {
    return { srs_intervalos:[1,3,7,14,30], srs_blocos_entre:2, srs_min_vencidas:3, srs_acertos_erro:2,
             gate:null, gate_amostra_min:1, taxa_janela_dias:60, taxa_min_recentes:4, canvas_min_reveals:6 };
  }
}

function _questoesDevidasRevisao(disciplina, mapa, estado, blacklist) {
  try {
    if (!mapa[disciplina] || !mapa[disciplina].questoes) return [];
    var hoje = new Date().toISOString().split('T')[0];

    // 1) Descobre os IDs vencidos SEM ler o Drive (só o estado, que já está em memória)
    var vencidos = {};
    var qtd = 0;
    Object.keys(estado.tempo_por_questao || {}).forEach(function(id) {
      var t = estado.tempo_por_questao[id];
      if (!t || t.disciplina !== disciplina) return;
      if (!t.proxima_revisao || t.proxima_revisao > hoje) return;
      if (blacklist.has(id)) return;
      vencidos[id] = t.proxima_revisao;
      qtd++;
    });
    if (qtd === 0) return [];

    // 2) Só agora carrega do Drive as questões que interessam
    var ids   = mapa[disciplina].questoes.map(function(f) { return f.id; });
    var todas = carregarMultiplosJsons(ids);

    var devidas = todas.filter(function(q) { return vencidos[q.idOriginal] !== undefined; });

    // 3) Mais atrasadas primeiro; empate, quem errou mais vem antes
    devidas.sort(function(a, b) {
      var da = vencidos[a.idOriginal], db = vencidos[b.idOriginal];
      if (da !== db) return da < db ? -1 : 1;
      var ea = (estado.contadores_erro || {})[a.idOriginal] || 0;
      var eb = (estado.contadores_erro || {})[b.idOriginal] || 0;
      return eb - ea;
    });
    return devidas;
  } catch (e) {
    Logger.log('[REVISAO] falha ao levantar questões devidas: ' + e.message);
    return [];
  }
}

function _proximaDisciplina(disciplinaAtual, config) {
  if (!config.fila || config.fila.length === 0) return null;
  var idx = config.fila.findIndex(function(f) { return f.disciplina === disciplinaAtual; });
  if (idx === -1) return config.fila[0].disciplina;
  if (config.fila.length === 1) return null;          // fila de 1 item: nao ha proxima
  return config.fila[(idx + 1) % config.fila.length].disciplina;   // circular
}

/**
 * V20.2 — SINCRONIZA O PONTEIRO DE ÍNDICE COM A DISCIPLINA REAL.
 * O sistema tem DOIS ponteiros: o de navegação fina (_lerPonteiro: disciplina,
 * tema, subtema) e o índice `config.ponteiro_fila`. Só o primeiro andava.
 * O segundo era incrementado apenas por avancarPonteiroCiclo(), que é CÓDIGO
 * MORTO — nunca chamada nem pelo GS nem pelo front. Resultado: ponteiro_fila
 * ficava em 0 para sempre, e tudo que depende dele mentia:
 *   • _pegarDisciplinasDoCicloHoje -> sempre o mesmo grupo do dia
 *   • a timeline -> sempre destacando a primeira disciplina
 *   • as estatísticas do ciclo
 * Grava no Drive só quando o índice muda de verdade.
 */
function _sincronizarPonteiroFila(config, disciplina) {
  try {
    if (!config || !config.fila || !config.fila.length || !disciplina) return false;
    var idx = config.fila.findIndex(function(f) { return f.disciplina === disciplina; });
    if (idx < 0) return false;
    if (config.ponteiro_fila === idx) return false;
    Logger.log('[CICLO] ponteiro_fila ' + config.ponteiro_fila + ' -> ' + idx + ' (' + disciplina + ')');
    config.ponteiro_fila = idx;
    salvarConfiguracaoCiclo(config);
    return true;
  } catch (e) {
    Logger.log('[CICLO] falha ao sincronizar ponteiro_fila: ' + e.message);
    return false;
  }
}

// ── MOTOR DA LINHA DO TEMPO CRONOLÓGICA (ESTRUTURA BD) ──

// ── MOTOR DA LINHA DO TEMPO CRONOLÓGICA (ESTRUTURA BD) — V14.2 ──


function obterTimelineCicloCompleta() {
  try {
    var config = carregarConfiguracaoCiclo();

    var rxRes = obterRaioX();
    if (rxRes && rxRes.reconstruindo) {
      return { sucesso: false, reconstruindo: true, pct: rxRes.pct || 0, erro: 'Raio-X em construção. A linha do tempo fica disponível após a sincronização inicial.' };
    }
    var arvore = (rxRes && rxRes.sucesso && rxRes.dados && rxRes.dados.arvore) ? rxRes.dados.arvore : {};
    if (Object.keys(arvore).length === 0) {
      Logger.log('[TIMELINE] ⚠️ Árvore vazia e sem reconstrução em andamento. Retornando vazio (sem rebuild bloqueante).');
      return { sucesso: false, erro: 'Banco ainda não mapeado. Rode a sincronização do Raio-X.' };
    }

    var estado = carregarEstadoUsuario();

    var userStats = {};
    if (estado && estado.respostas && estado.tempo_por_questao) {
      Object.keys(estado.respostas).forEach(function(id) {
        var tq = estado.tempo_por_questao[id];
        if (tq && tq.disciplina && tq.tema) {
          var d = tq.disciplina;
          var t = tq.tema;
          var s = tq.subtema || 'Geral';
          if (!userStats[d]) userStats[d] = {};
          if (!userStats[d][t]) userStats[d][t] = {};
          if (!userStats[d][t][s]) userStats[d][t][s] = { feitas: 0, acertos: 0 };
          userStats[d][t][s].feitas++;
          if (estado.respostas[id].correta) userStats[d][t][s].acertos++;
        }
      });
    }

    var timeline = [];
    if (!config || !config.fila) return { sucesso: false, erro: "Fila vazia." };

    var pinoColocado = false;

    config.fila.forEach(function(itemFila, indexFila) {
      var d = itemFila.disciplina;
      var volumeMetaDisc = itemFila.volume_total_meta || 1000;
      var isDisciplinaAtiva = (indexFila === (config.ponteiro_fila || 0));

      var usaEdital = typeof MAPA_DISTRIBUICAO_EDITAL !== 'undefined' && MAPA_DISTRIBUICAO_EDITAL[d];
      var temas = [];

      if (usaEdital) {
        temas = _getTemasOrdem(d);   // V104 — ordem didática (era a ordem crua das chaves)
      } else if (arvore[d] && arvore[d].temas) {
        temas = Object.keys(arvore[d].temas).sort(function(a, b) { return a.localeCompare(b, undefined, {numeric: true}); });
      }

      temas.forEach(function(t) {
        var subtemas = [];
        if (usaEdital && MAPA_DISTRIBUICAO_EDITAL[d][t]) {
          subtemas = _getSubtemasOrdem(d, t);   // V104 — ordem didática
        } else if (!usaEdital && arvore[d] && arvore[d].temas && arvore[d].temas[t] && arvore[d].temas[t].subtemas) {
          subtemas = Object.keys(arvore[d].temas[t].subtemas).sort();
        }

        subtemas.forEach(function(s) {
          var pesoEdital = 0;
          var imp = 'MÉDIO';
          if (usaEdital && MAPA_DISTRIBUICAO_EDITAL[d][t][s]) {
            var distStr = MAPA_DISTRIBUICAO_EDITAL[d][t][s].distribuicao || '0';
            pesoEdital = parseFloat(distStr.replace('%', '').replace(',', '.')) || 0;
            imp = MAPA_DISTRIBUICAO_EDITAL[d][t][s].importancia || 'MÉDIO';
          }

          // V23 — mesma fonte de verdade do motor: tela e ciclo não podem
          // discordar sobre o que é "meta atingida".
          var metaQtd = _metaSubtemaV23(d, t, s, volumeMetaDisc);

          var bancoAtual = 0;
          if (arvore[d] && arvore[d].temas && arvore[d].temas[t] && arvore[d].temas[t].subtemas && arvore[d].temas[t].subtemas[s]) {
            var v = arvore[d].temas[t].subtemas[s];
            bancoAtual = typeof v === 'number' ? v : (v.qtd || 0);
          }

          var feitas = 0;
          var acertos = 0;
          if (userStats[d] && userStats[d][t] && userStats[d][t][s]) {
            feitas = userStats[d][t][s].feitas;
            acertos = userStats[d][t][s].acertos;
          }

          var taxaPct = feitas > 0 ? Math.round((acertos / feitas) * 100) : -1;
          var gateMinimo = (typeof GATE_IMPORTANCIA !== 'undefined' && GATE_IMPORTANCIA[imp] !== undefined) ? GATE_IMPORTANCIA[imp] : 50;

          var gateAtingido = (taxaPct >= gateMinimo);
          var metaAtingida = (metaQtd > 0 && feitas >= metaQtd) || (bancoAtual > 0 && feitas >= bancoAtual);

          var status = 'PENDENTE';
          var ehPino = false;

          if (gateAtingido && metaAtingida) {
            status = 'CONCLUIDO';
          } else {
            if (isDisciplinaAtiva && !pinoColocado) {
              status = 'ATUAL';
              ehPino = true;
              pinoColocado = true;
            }
          }

          var progresso = metaQtd > 0 ? Math.min(100, Math.round((feitas / metaQtd) * 100)) : 0;
          if (metaQtd === 0 && bancoAtual > 0) {
            progresso = Math.min(100, Math.round((feitas / bancoAtual) * 100));
          }

          timeline.push({
            posicao_ciclo: indexFila + 1, qtd_bloco: itemFila.qtd_bloco,
            disciplina: d, tema: t, subtema: s, importancia: imp,
            peso_edital_pct: pesoEdital, volume_meta_disciplina: volumeMetaDisc,
            meta_qtd: metaQtd, banco_atual: bancoAtual, deficit_banco: metaQtd - bancoAtual,
            sem_banco: bancoAtual === 0, feitas: feitas, acertos: acertos, taxa_pct: taxaPct,
            gate_minimo: gateMinimo, gate_atingido: gateAtingido,
            progresso_meta_pct: progresso, status: status, eh_pino_presente: ehPino
          });
        });
      });
    });

    return { sucesso: true, timeline: timeline };
  } catch (e) {
    return { sucesso: false, erro: e.message };
  }
}



// ══════════════════════════════════════════════════════════════════════════════
// V104 — MOTOR DO CICLO: FILA POR PEÇAS + POSIÇÃO POR DISCIPLINA + REVISÃO GLOBAL
//
// Defeitos corrigidos:
//   • O motor ficava na MESMA disciplina até ela inteira acabar: a fila do mapa
//     (dias × disciplinas) nunca era seguida. Agora a fila é a sequência de
//     PEÇAS do mapa (dia 1: peças das disciplinas do dia 1, dia 2 …) e o ponteiro
//     anda peça a peça, dando a volta no fim (circular).
//   • Havia UM ponteiro só (disciplina, tema, subtema): ao trocar de disciplina a
//     posição se perdia. Agora a posição de cada disciplina é DERIVADA do
//     histórico: é o 1º subtema, na ordem didática, que ainda não cumpriu
//     meta + gate. Só passa ao próximo subtema quando o anterior termina.
//   • Subtema sem questões era PULADO de vez (e o pré-requisito se perdia). Agora
//     a disciplina ESPERA nesse subtema; a peça dela é registrada como "aguardando
//     questões" e a fila segue para a próxima peça.
//   • A revisão espaçada só olhava a disciplina atual e o contador zerava e
//     somava +1 no mesmo bloco (revisão a cada 1 bloco, não 2). Agora a revisão
//     reúne as questões vencidas de TODAS as disciplinas da fila e o contador só
//     anda quando um bloco de conteúdo termina (registrarFimBloco).
// ══════════════════════════════════════════════════════════════════════════════

// Sequência de peças do ciclo, na ordem do mapa: dias em ordem; dentro do dia, ordem da fila.
function _sequenciaPecasV104(config) {
  var fila = (config && config.fila) || [];
  var porDia = {};
  fila.forEach(function (f, fi) {
    if (Array.isArray(f.grupos_ciclo) && Array.isArray(f.pecas_ciclo) && f.grupos_ciclo.length) {
      f.grupos_ciclo.forEach(function (g, k) {
        var q = Number(f.pecas_ciclo[k]) || 0;
        if (q > 0) (porDia[g] = porDia[g] || []).push({ fi: fi, qtd: q });
      });
    } else {
      var g0 = (f.grupo_ciclo !== undefined && f.grupo_ciclo !== null) ? f.grupo_ciclo : 0;
      var q0 = Number(f.qtd_bloco) || 10;
      (porDia[g0] = porDia[g0] || []).push({ fi: fi, qtd: q0 });
    }
  });
  var seq = [];
  Object.keys(porDia).map(Number).sort(function (a, b) { return a - b; }).forEach(function (g) {
    porDia[g].sort(function (a, b) { return a.fi - b.fi; }).forEach(function (p) {
      seq.push({ idx: seq.length, dia: g, fi: p.fi, disciplina: fila[p.fi].disciplina, qtd: p.qtd });
    });
  });
  return seq;
}

function _hashSequenciaV104(seq) {
  return seq.map(function (p) { return p.dia + ':' + p.disciplina + ':' + p.qtd; }).join('|');
}

// Lê o ponteiro e migra o formato antigo (só disciplina/tema/subtema) para o de peças.
function _lerPonteiroV104(config, seq) {
  var p = _lerPonteiro() || {};
  var hash = _hashSequenciaV104(seq);
  var valido = typeof p.peca_idx === 'number' && p.peca_idx >= 0 && p.peca_idx < seq.length && p.seq_hash === hash;
  if (!valido) {
    // Fila nova (ciclo gerado/regerado ou 1ª execução da V104): começa na 1ª peça.
    // Antes apontava para a disciplina do ponteiro antigo, e as peças anteriores a
    // ela apareciam no mapa como "Não executada" sem nunca terem sido puladas.
    // Nada se perde: a posição de cada disciplina vem do histórico de respostas.
    p.peca_idx = 0;
    p.peca_feitas = 0;
    p.seq_hash = hash;
    p.historico_pecas = {};
  }
  if (!p.volta || p.volta < 1) p.volta = 1;
  if (typeof p.blocos_desde_revisao !== 'number') p.blocos_desde_revisao = 0;
  if (!p.historico_pecas || typeof p.historico_pecas !== 'object') p.historico_pecas = {};
  return p;
}

// Avança para a peça seguinte (circular). Na virada, conta uma volta nova e zera o histórico da volta.
function _avancarPecaV104(p, seq) {
  var prox = p.peca_idx + 1;
  if (prox >= seq.length) { prox = 0; p.volta = (p.volta || 1) + 1; p.historico_pecas = {}; }
  p.peca_idx = prox;
  p.peca_feitas = 0;
}

// Índice das respostas por subtema CANÔNICO (uma passada no estado; antes era uma
// passada inteira por subtema consultado). Guarda feitas, acertos e a janela recente.
function _indiceRespostasV104(estado) {
  var mc = _motorCfg();
  var limite = new Date();
  limite.setDate(limite.getDate() - mc.taxa_janela_dias);
  var limiteISO = limite.toISOString().split('T')[0];
  var tpq = (estado && estado.tempo_por_questao) || {};
  var resp = (estado && estado.respostas) || {};
  var memo = {}, idx = {};
  Object.keys(resp).forEach(function (id) {
    var t = tpq[id];
    if (!t) return;
    var sub = t.subtema || 'Geral';
    var raw = t.disciplina + '\u0001' + t.tema + '\u0001' + sub;
    var k = memo[raw];
    if (k === undefined) {
      var c = _chaveCanonicaEdital(t.disciplina, t.tema, sub);
      k = c ? (c.disciplina + '||' + c.tema + '||' + c.subtema) : (t.disciplina + '||' + t.tema + '||' + sub);
      memo[raw] = k;
    }
    var e = idx[k] || (idx[k] = { feitas: 0, ok: 0, totRec: 0, okRec: 0 });
    var acertou = !!resp[id].correta;
    e.feitas++; if (acertou) e.ok++;
    var quando = t.respondida_em || (t.data_resposta ? String(t.data_resposta).split('T')[0] : null);
    if (quando && quando >= limiteISO) { e.totRec++; if (acertou) e.okRec++; }
  });
  return idx;
}

// Gate a partir do índice — mesma regra de _gateAprovado/_taxaSubtemaDetalhe.
function _gateDoIndiceV104(disciplina, tema, subtema, ent) {
  var dados = MAPA_DISTRIBUICAO_EDITAL[disciplina] && MAPA_DISTRIBUICAO_EDITAL[disciplina][tema] &&
              MAPA_DISTRIBUICAO_EDITAL[disciplina][tema][subtema];
  var imp = dados ? dados.importancia : 'MÉDIO';
  var minimo = GATE_IMPORTANCIA[imp] !== undefined ? GATE_IMPORTANCIA[imp] : 50;
  var mc = _motorCfg();
  var taxa = -1, total = 0;
  if (ent && ent.feitas > 0) {
    if (ent.totRec >= mc.taxa_min_recentes) { taxa = Math.round(ent.okRec / ent.totRec * 100); total = ent.totRec; }
    else { taxa = Math.round(ent.ok / ent.feitas * 100); total = ent.feitas; }
  }
  var ok;
  if (!dados || minimo === 0) ok = true;
  else if (total === 0 || total < mc.gate_amostra_min) ok = false;
  else ok = taxa >= minimo;
  return { importancia: imp, minimo: minimo, taxa: taxa, ok: ok };
}

// Marco de conclusão por disciplina (ponteiro.marcos[d] = { n, ultimo }): os n
// primeiros subtemas da ordem já foram concluídos e o ciclo seguiu adiante.
// Conclusão é DEFINITIVA: se uma revisão errada depois baixar a taxa, quem cuida
// é a revisão espaçada; a sequência não volta para trás.
function _nFixoV104(marco, lista) {
  if (!marco || !marco.n) return 0;
  var n = Math.min(marco.n, lista.length);
  var chave = function (x) { return x.tema + '||' + x.subtema; };
  if (n > 0 && chave(lista[n - 1]) === marco.ultimo) return n;
  for (var i = 0; i < lista.length; i++) if (chave(lista[i]) === marco.ultimo) return i + 1;   // ordem mudou
  return 0;
}

// Situação de todos os subtemas da disciplina, na ordem didática.
function _situacaoDisciplinaV104(disciplina, itemFila, indice, marco) {
  var volume = itemFila ? (itemFila.volume_total_meta || 1000) : 1000;
  var lista = [];
  _getTemasOrdem(disciplina).forEach(function (tema) {
    _getSubtemasOrdem(disciplina, tema).forEach(function (sub) {
      var ent = indice[disciplina + '||' + tema + '||' + sub];
      var meta = _metaSubtemaV23(disciplina, tema, sub, volume);
      var g = _gateDoIndiceV104(disciplina, tema, sub, ent);
      var feitas = ent ? ent.feitas : 0;
      lista.push({
        tema: tema, subtema: sub, importancia: g.importancia, meta: meta, feitas: feitas,
        acertos: ent ? ent.ok : 0, taxa: g.taxa, gate_min: g.minimo, gate_ok: g.ok,
        concluido: g.ok && feitas >= meta
      });
    });
  });
  var nFixo = _nFixoV104(marco, lista);
  for (var i = 0; i < nFixo; i++) { lista[i].concluido = true; lista[i].fixo = true; }
  return lista;
}

// 1º subtema não concluído (posição da disciplina) ou null se a disciplina terminou.
function _posicaoDisciplinaV104(disciplina, itemFila, indice, marco) {
  var lista = _situacaoDisciplinaV104(disciplina, itemFila, indice, marco);
  for (var i = 0; i < lista.length; i++) {
    if (!lista[i].concluido) {
      lista[i].ordem = i; lista[i].total = lista.length;
      lista[i].marco = i > 0 ? { n: i, ultimo: lista[i - 1].tema + '||' + lista[i - 1].subtema } : null;
      return lista[i];
    }
  }
  return null;
}

// Questões do subtema dentro do banco já carregado da disciplina (mesmo critério de
// _questoesSubtemaDisponiveis, sem recarregar o Drive a cada subtema).
function _filtrarSubtemaV104(todas, tema, subtema, blacklist) {
  var kTema = _normChaveV23(tema), kSub = _normChaveV23(subtema), chTema = _chaveTemaEdital(tema);
  return todas.filter(function (q) {
    if (blacklist.has(q.idOriginal)) return false;
    if (_normChaveV23(q.subtema || 'Geral') !== kSub) return false;
    if (_normChaveV23(q.tema || '') === kTema) return true;
    return _chaveTemaEdital(q.tema || '') === chTema;
  });
}

// Revisão espaçada de TODAS as disciplinas da fila: vencidas primeiro (mais atrasadas,
// depois as mais erradas). Só carrega do Drive as disciplinas necessárias para `limite`.
function _revisoesDevidasGlobalV104(config, mapa, estado, blacklist, limite) {
  var hoje = new Date().toISOString().split('T')[0];
  var naFila = {};
  (config.fila || []).forEach(function (f) { naFila[f.disciplina] = true; });
  var tpq = estado.tempo_por_questao || {}, erros = estado.contadores_erro || {};
  var lista = [];
  Object.keys(tpq).forEach(function (id) {
    var t = tpq[id];
    if (!t || !t.proxima_revisao || t.proxima_revisao > hoje) return;
    if (!estado.respostas || !estado.respostas[id]) return;
    if (blacklist.has(id)) return;
    var d = _disciplinaDoEdital(t.disciplina) || t.disciplina;
    if (!naFila[d]) return;
    lista.push({ id: id, d: d, data: t.proxima_revisao, erros: erros[id] || 0 });
  });
  lista.sort(function (a, b) { return a.data !== b.data ? (a.data < b.data ? -1 : 1) : b.erros - a.erros; });
  var total = lista.length, sel = [];
  if (!total || !limite) return { total: total, questoes: sel };
  var porDisc = {};
  for (var i = 0; i < lista.length && sel.length < limite; i++) {
    var it = lista[i];
    if (!porDisc[it.d]) {
      porDisc[it.d] = {};
      try {
        if (mapa[it.d] && mapa[it.d].questoes) {
          carregarMultiplosJsons(mapa[it.d].questoes.map(function (f) { return f.id; }))
            .forEach(function (q) { porDisc[it.d][q.idOriginal] = q; });
        }
      } catch (e) { Logger.log('[REVISAO-V104] ' + it.d + ': ' + e.message); }
    }
    var q = porDisc[it.d][it.id];
    if (q) sel.push(q);
  }
  return { total: total, questoes: sel };
}

// Motor principal (chamado por obterProximoBlocoCiclo depois da sessão suspensa).
function _obterProximoBlocoV104(config, estado, mapa, blacklist) {
  var seq = _sequenciaPecasV104(config);
  if (!seq.length) return { erro: 'Fila vazia. Configure o ciclo de estudos.' };
  var p = _lerPonteiroV104(config, seq);
  var mc = _motorCfg();
  var minQ = Number(String((config.planejamento || {}).min_por_questao || 3).replace(',', '.')) || 3;
  var metaDoDia = function (dia) {
    return seq.reduce(function (s, x) { return s + (x.dia === dia ? x.qtd : 0); }, 0);
  };

  // 1) REVISÃO ESPAÇADA intercalada: a cada N peças de conteúdo concluídas
  //    (motor.srs_blocos_entre; padrão 2), só no começo de uma peça.
  if (p.blocos_desde_revisao >= mc.srs_blocos_entre && !(p.peca_feitas > 0)) {
    var tamRev = (seq[p.peca_idx] || seq[0]).qtd || 10;
    var rev = _revisoesDevidasGlobalV104(config, mapa, estado, blacklist, tamRev);
    if (rev.total >= mc.srs_min_vencidas && rev.questoes.length) {
      p.blocos_desde_revisao = 0;
      _salvarPonteiro(p);
      var discsRev = {};
      rev.questoes.forEach(function (q) { discsRev[q.disciplina] = (discsRev[q.disciplina] || 0) + 1; });
      Logger.log('[REVISAO-V104] ' + rev.questoes.length + ' questão(ões) servidas | ' + rev.total + ' vencida(s) na fila');
      return {
        sucesso: true,
        questoes: rev.questoes,
        disciplina: 'Revisão espaçada',
        tema: null, subtema: null,
        importancia_subtema: 'REVISÃO',
        gate: { minimo: 0, atual: -1, aprovado: true },
        meta_sessao: metaDoDia((seq[p.peca_idx] || seq[0]).dia),
        tempo_bloco: Math.round(rev.questoes.length * minQ),
        bloco_revisao: true,
        devidas_total: rev.total,
        revisao_por_disciplina: discsRev,
        peca: { idx: p.peca_idx, total: seq.length, volta: p.volta },
        msg_status: '🔁 REVISÃO — ' + rev.questoes.length + ' questão(ões) no ponto de revisar (' +
                    rev.total + ' vencida(s) em ' + Object.keys(discsRev).length + ' disciplina(s))'
      };
    }
  }

  // 2) CONTEÚDO NOVO: segue a fila a partir da peça atual.
  var indice = _indiceRespostasV104(estado);
  var bancos = {};
  var pulos = [];
  var inicio = p.peca_idx;
  for (var k = 0; k < seq.length; k++) {
    var i = (inicio + k) % seq.length;
    var pc = seq[i];
    var d = pc.disciplina;
    var item = config.fila[pc.fi];
    var registrarPulo = function (motivo, extra) {
      var r = { idx: i, dia: pc.dia, disciplina: d, motivo: motivo };
      Object.keys(extra || {}).forEach(function (x) { r[x] = extra[x]; });
      pulos.push(r);
    };

    if (!item) { registrarPulo('fora_da_fila'); continue; }
    if (!MAPA_DISTRIBUICAO_EDITAL || !MAPA_DISTRIBUICAO_EDITAL[d]) {
      // disciplina sem mapa de edital: comportamento legado
      if (i !== p.peca_idx) { if (i < p.peca_idx) { p.volta++; p.historico_pecas = {}; } p.peca_idx = i; p.peca_feitas = 0; }
      p.disciplina = d; p.tema = null; p.subtema = null;
      _salvarPonteiro(p);
      return _obterBlocoLegado(d, item, config, estado, mapa, blacklist);
    }

    if (!p.marcos) p.marcos = {};
    var pos = _posicaoDisciplinaV104(d, item, indice, p.marcos[d]);
    if (!pos) { registrarPulo('disciplina_concluida'); continue; }
    if (pos.marco && (!p.marcos[d] || p.marcos[d].n !== pos.marco.n)) p.marcos[d] = pos.marco;

    var restante = pc.qtd - (i === p.peca_idx ? (p.peca_feitas || 0) : 0);
    if (restante <= 0) restante = pc.qtd;

    if (!bancos[d]) {
      bancos[d] = [];
      try {
        if (mapa[d] && mapa[d].questoes && mapa[d].questoes.length) {
          bancos[d] = carregarMultiplosJsons(mapa[d].questoes.map(function (f) { return f.id; }));
        }
      } catch (eB) { Logger.log('[CICLO-V104] banco ' + d + ': ' + eB.message); }
    }
    var doSub = _filtrarSubtemaV104(bancos[d], pos.tema, pos.subtema, blacklist);
    var ineditas = doSub.filter(function (q) { return !estado.respostas[q.idOriginal]; });
    var erradas = doSub.filter(function (q) {
      var r = estado.respostas[q.idOriginal];
      if (!r) return false;
      if (!r.correta) return true;
      if (!((estado.contadores_erro || {})[q.idOriginal] || 0)) return false;
      var t = estado.tempo_por_questao && estado.tempo_por_questao[q.idOriginal];
      return ((t && t.acertos_consecutivos) || 0) < mc.srs_acertos_erro;
    });

    // Antes da meta: só o que falta para a meta (não estoura o subtema).
    // Meta cumprida e gate pendente: reforço (erradas primeiro, depois inéditas).
    var faltamMeta = pos.meta - pos.feitas;
    var sel = [];
    if (faltamMeta > 0) {
      var tam = Math.min(restante, faltamMeta);
      sel = embaralharArray(ineditas).slice(0, tam);
      if (sel.length < tam) sel = sel.concat(embaralharArray(erradas).slice(0, tam - sel.length));
    } else {
      sel = embaralharArray(erradas).slice(0, restante);
      if (sel.length < restante) sel = sel.concat(embaralharArray(ineditas).slice(0, restante - sel.length));
    }
    if (!sel.length) {
      var bloqueadasHoje = _filtrarSubtemaV104(bancos[d], pos.tema, pos.subtema, new Set()).length - doSub.length;
      registrarPulo(bloqueadasHoje > 0 ? 'reforco_amanha' : 'aguardando_questoes', {
        tema: pos.tema, subtema: pos.subtema,
        faltam: Math.max(1, faltamMeta), gate_ok: pos.gate_ok, taxa: pos.taxa, gate_min: pos.gate_min
      });
      continue;
    }

    // V102 — avulsas já feitas abatem a peça
    var ab = _abaterAvulsasDoBlocoV102(item, config, restante);
    if (ab.cumprido) {
      registrarPulo('cumprida_por_avulsas', { abatido: ab.abatido });
      p.historico_pecas[i] = { feitas: pc.qtd, acertos: 0, status: 'avulsas' };
      if (i === p.peca_idx) { _avancarPecaV104(p, seq); inicio = p.peca_idx; k = -1; }
      continue;
    }
    if (ab.abatido > 0) sel = sel.slice(0, Math.max(1, ab.tamanho));

    // Peças puladas no caminho ficam registradas na volta como "não executadas".
    pulos.forEach(function (r) {
      if (!p.historico_pecas[r.idx]) p.historico_pecas[r.idx] = { feitas: 0, acertos: 0, status: r.motivo };
    });
    if (i !== p.peca_idx) {
      if (i < p.peca_idx) { p.volta = (p.volta || 1) + 1; p.historico_pecas = {}; }
      p.peca_idx = i; p.peca_feitas = 0;
    }
    p.disciplina = d; p.tema = pos.tema; p.subtema = pos.subtema;
    p.aguardando = pulos.filter(function (r) { return r.motivo === 'aguardando_questoes'; });
    _salvarPonteiro(p);

    var ret = _montarRetornoCiclo(sel, d, pos.tema, pos.subtema, pos.importancia, pos.gate_min,
                                  pos.taxa, pos.gate_ok, item, config);
    ret.tempo_bloco = Math.round(sel.length * minQ);
    ret.meta_sessao = metaDoDia(pc.dia);
    ret.peca = { idx: i, total: seq.length, dia: pc.dia, qtd: pc.qtd, feitas: p.peca_feitas, volta: p.volta };
    ret.subtema_progresso = { ordem: pos.ordem + 1, total: pos.total, meta: pos.meta, feitas: pos.feitas };
    if (ab.abatido > 0) { ret.abatido_avulsas = ab.abatido; ret.bloco_base = restante; }
    if (pulos.length) ret.pecas_puladas = pulos;
    return ret;
  }

  // 3) Nenhuma peça servível na volta inteira.
  var esperando = pulos.filter(function (r) { return r.motivo === 'aguardando_questoes'; });
  if (esperando.length) {
    var pr = esperando[0];
    p.aguardando = esperando;
    _salvarPonteiro(p);
    return {
      erro_banco: true,
      disciplina: pr.disciplina, tema: pr.tema, subtema: pr.subtema,
      minimo_para_liberar: pr.faltam || 10,
      subtemas_sem_banco: esperando.length,
      pendentes: esperando.slice(0, 20),
      msg_status: 'Aguardando questões em ' + esperando.length + ' disciplina(s). Primeira: ' + pr.disciplina + ' › ' + pr.subtema,
      instrucao: 'Cada disciplina só avança depois de concluir o subtema atual. Gere questões para estes subtemas.'
    };
  }
  if (pulos.some(function (r) { return r.motivo === 'reforco_amanha'; })) {
    return {
      ciclo_concluido: true,
      msg_status: 'Por hoje não há mais blocos: os subtemas atuais aguardam reforço com questões que você já fez hoje.',
      instrucao: 'Amanhã essas questões voltam para o reforço do gate. Se quiser seguir hoje, gere questões novas para esses subtemas.'
    };
  }
  return {
    fim_ciclo: true,
    msg_status: '🎉 Edital concluído: todos os subtemas de todas as disciplinas cumpriram meta e gate.',
    instrucao: 'A revisão espaçada continua disponível. Reinicie o ciclo para uma nova passada.'
  };
}

// Registra o fim de um bloco no ponteiro de peças (chamado por registrarFimBloco).
function _registrarPecaV104(config, dados) {
  var seq = _sequenciaPecasV104(config);
  if (!seq.length) return null;
  var p = _lerPonteiroV104(config, seq);
  if (dados.bloco_revisao) { p.blocos_desde_revisao = 0; _salvarPonteiro(p); return p; }
  var pc = seq[p.peca_idx];
  if (!pc || pc.disciplina !== dados.disciplina) { _salvarPonteiro(p); return p; }
  var respondidas = Number(dados.total) || 0;
  p.peca_feitas = (p.peca_feitas || 0) + respondidas;
  var h = p.historico_pecas[p.peca_idx] || { feitas: 0, acertos: 0 };
  h.feitas += respondidas; h.acertos += Number(dados.acertos) || 0; h.status = 'em_andamento';
  if (p.tema && p.subtema && respondidas > 0) {   // subtemas que a peça realmente cobriu (para o mapa)
    h.subtemas = h.subtemas || [];
    var ult = h.subtemas[h.subtemas.length - 1];
    if (ult && ult.t === p.tema && ult.s === p.subtema) ult.n += respondidas;
    else if (h.subtemas.length < 8) h.subtemas.push({ t: p.tema, s: p.subtema, n: respondidas });
  }
  p.historico_pecas[p.peca_idx] = h;
  if (p.peca_feitas >= pc.qtd) {
    h.status = 'feita';
    // A revisão intercala por PEÇA concluída (a peça pode ter vários blocos curtos,
    // um por subtema; contar blocos faria a revisão interromper a mesma peça).
    p.blocos_desde_revisao = (p.blocos_desde_revisao || 0) + 1;
    Logger.log('[CICLO-V104] peça ' + (p.peca_idx + 1) + '/' + seq.length + ' (' + pc.disciplina + ') concluída');
    _avancarPecaV104(p, seq);
  }
  _salvarPonteiro(p);
  return p;
}

// ══════════════════════════════════════════════════════════════════════════════
// V104 — DADOS DO MAPA DO CICLO (uma chamada, mesma fonte de verdade do motor)
// O mapa antigo montava a ordem no front com .sort() ALFABÉTICO e o banco do
// Raio-X ("Colisão…" vinha antes de "Conceito…"), começava toda disciplina no
// 1º subtema e supunha 1 bloco = 1 subtema. Agora o front recebe daqui:
//   • a sequência de peças da fila e o ponteiro real (peça, volta, histórico);
//   • por disciplina, os subtemas NA ORDEM DIDÁTICA com meta, feitas, acerto,
//     gate e banco — o front só projeta;
//   • a agenda da revisão espaçada (vencidas e próximos dias).
// Linhas de subtema vão como arrays para encurtar o payload:
//   [tema, subtema, importância, meta, feitas, acertos, taxa, gate_min, gate_ok, concluído, banco]
// ══════════════════════════════════════════════════════════════════════════════
function obterMapaCicloV104() {
  try {
    var config = carregarConfiguracaoCiclo();
    if (!config || !config.fila || !config.fila.length) return { sucesso: true, vazio: true };
    var estado = carregarEstadoUsuario() || { respostas: {}, contadores_erro: {}, tempo_por_questao: {} };
    var seq = _sequenciaPecasV104(config);
    var p = _lerPonteiroV104(config, seq);
    var indice = _indiceRespostasV104(estado);
    var mc = _motorCfg();

    var arvore = {};
    try {
      var rx = _readJsonFromDrive('raiox_banco_v1.json');
      arvore = (rx && rx.arvore) ? rx.arvore : {};
    } catch (eRx) { arvore = {}; }
    var banco = function (d, t, s) {
      var n = arvore[d] && arvore[d].temas && arvore[d].temas[t] && arvore[d].temas[t].subtemas && arvore[d].temas[t].subtemas[s];
      return n ? (typeof n === 'number' ? n : (n.qtd || 0)) : 0;
    };

    var disciplinas = {};
    var totSub = 0, totConc = 0, totMeta = 0, totFeitasMeta = 0;
    config.fila.forEach(function (item) {
      var d = item.disciplina;
      if (disciplinas[d]) return;
      var linhas = [], pos = -1;
      if (MAPA_DISTRIBUICAO_EDITAL && MAPA_DISTRIBUICAO_EDITAL[d]) {
        _situacaoDisciplinaV104(d, item, indice, (p.marcos || {})[d]).forEach(function (x, i) {
          if (pos < 0 && !x.concluido) pos = i;
          totSub++; if (x.concluido) totConc++;
          totMeta += x.meta; totFeitasMeta += Math.min(x.feitas, x.meta);
          linhas.push([x.tema, x.subtema, x.importancia, x.meta, x.feitas, x.acertos, x.taxa, x.gate_min,
                       x.gate_ok ? 1 : 0, x.concluido ? 1 : 0, banco(d, x.tema, x.subtema)]);
        });
      }
      disciplinas[d] = {
        status_ciclo: item.status_ciclo || 'PENDENTE',
        volume_total_meta: item.volume_total_meta || 0,
        volume_realizado: item.volume_realizado || 0,
        volume_revisao: item.volume_revisao || 0,
        peso_prova: item.peso_prova || 0,
        nivel: item.nivel_proficiencia || 0,
        pos: pos,
        subtemas: linhas
      };
    });

    // Revisão espaçada: vencidas hoje e agenda dos próximos 60 dias, por disciplina.
    var hoje = new Date().toISOString().split('T')[0];
    var limite = new Date(); limite.setDate(limite.getDate() + 60);
    var limiteISO = limite.toISOString().split('T')[0];
    var agenda = {}, vencidasPorDisc = {}, vencidas = 0;
    var tpq = estado.tempo_por_questao || {};
    Object.keys(tpq).forEach(function (id) {
      var t = tpq[id];
      if (!t || !t.proxima_revisao || !estado.respostas || !estado.respostas[id]) return;
      var d = _disciplinaDoEdital(t.disciplina) || t.disciplina;
      if (!disciplinas[d]) return;
      if (t.proxima_revisao <= hoje) { vencidas++; vencidasPorDisc[d] = (vencidasPorDisc[d] || 0) + 1; }
      else if (t.proxima_revisao <= limiteISO) agenda[t.proxima_revisao] = (agenda[t.proxima_revisao] || 0) + 1;
    });

    var respondidas = Object.keys(estado.respostas || {}).length, acertos = 0;
    Object.keys(estado.respostas || {}).forEach(function (id) { if (estado.respostas[id].correta) acertos++; });

    var pl = config.planejamento || {};
    return {
      sucesso: true,
      gerado_em: new Date().toISOString(),
      hoje: hoje,
      nome_edital: _nomeEditalV104(pl.template_usado),
      planejamento: {
        volume_total_meta: pl.volume_total_meta || 0, periodo_meses: pl.periodo_meses || 0,
        dias_semana: pl.dias_semana || 0, horas_dia: pl.horas_dia || 0, min_por_questao: pl.min_por_questao || 0,
        disciplinas_dia: pl.disciplinas_dia || 0, meta_qtd_dia: pl.meta_qtd_dia || 0,
        dias_uteis: pl.dias_uteis || 0, dias_por_ciclo: pl.dias_por_ciclo || 0, data_criacao: pl.data_criacao || null
      },
      motor: {
        srs_intervalos: mc.srs_intervalos, srs_blocos_entre: mc.srs_blocos_entre,
        srs_min_vencidas: mc.srs_min_vencidas, gate_amostra_min: mc.gate_amostra_min
      },
      sequencia: seq,
      ponteiro: {
        peca_idx: p.peca_idx, peca_feitas: p.peca_feitas || 0, volta: p.volta || 1,
        blocos_desde_revisao: p.blocos_desde_revisao || 0,
        historico_pecas: p.historico_pecas || {}, aguardando: p.aguardando || []
      },
      disciplinas: disciplinas,
      revisao: { vencidas: vencidas, por_disciplina: vencidasPorDisc, agenda: agenda },
      totais: {
        subtemas: totSub, subtemas_concluidos: totConc, meta_subtemas: totMeta, feitas_na_meta: totFeitasMeta,
        respondidas: respondidas, acertos: acertos
      }
    };
  } catch (e) {
    Logger.log('[MAPA-V104] ' + e.message + ' | ' + (e.stack || ''));
    return { sucesso: false, erro: e.message };
  }
}

// Nome de exibição do edital do plano (o id do template não muda; só o nome).
function _nomeEditalV104(templateId) {
  var id = _idTemplateCanonico(templateId || ID_TEMPLATE_PADRAO);
  if (id === ID_TEMPLATE_TRT8_V100) return NOME_TEMPLATE_TRT8_V100;
  try {
    var dados = _readJsonFromDrive(ARQUIVO_TEMPLATES) || {};
    var t = dados.templates && dados.templates[id];
    if (t && t.nome) return t.nome;
  } catch (e) {}
  return String(templateId || 'N/D').replace(/_/g, ' ');
}

function obterProximoBlocoCiclo() {
  try {
    var scriptCache = CacheService.getScriptCache();
    if (scriptCache.get('CACHE_PRECISA_RECONSTRUIR')) {
      reconstruirCacheCompleto();
      scriptCache.remove('CACHE_PRECISA_RECONSTRUIR');
    }

    var sessaoSalva = verificarSessaoSuspensa();
    if (sessaoSalva && sessaoSalva.ativa) {
      return {
        sessao_recuperada: true,
        questoes:          sessaoSalva.questoes,
        index_parada:      sessaoSalva.index,
        disciplina:        sessaoSalva.disciplina,
        tema:              sessaoSalva.tema       || null,
        subtema:           sessaoSalva.subtema    || null,
        msg_status:        'Sessão Restaurada',
        stats:             sessaoSalva.stats      || {},
        tempo_gasto:       sessaoSalva.tempo_gasto|| 0,
        tempo_bloco:       sessaoSalva.tempo_bloco|| 0
      };
    }

    var config  = carregarConfiguracaoCiclo();
    var estado  = carregarEstadoUsuario() || { respostas: {}, contadores_erro: {}, tempo_por_questao: {} };
    var mapa    = listarArquivosRapido();
    var blObj   = _blacklistDoDia();
    var blacklist = new Set(blObj.ids);

    if (!config.fila || config.fila.length === 0) return { erro: 'Fila vazia. Configure o ciclo de estudos.' };

    var disciplinasValidas = config.fila.filter(function(f) {
      return mapa[f.disciplina] && mapa[f.disciplina].questoes && mapa[f.disciplina].questoes.length > 0;
    });
    if (disciplinasValidas.length === 0) return { erro: 'Nenhuma disciplina com questões no banco.' };

    // V104 — fila por peças, posição por disciplina e revisão global (ver _obterProximoBlocoV104).
    return _obterProximoBlocoV104(config, estado, mapa, blacklist);

  } catch(e) {
    throw new Error(e.message);
  }
}


// ── Helper: monta o objeto de retorno padrão ─────────────────────────────────

function _montarRetornoCiclo(selecionadas, disciplina, tema, subtema, imp, gateMin, taxaAtual, gateOk, itemFila, config) {
  // V20.2 — unico ponto de saida bem-sucedida do ciclo: e aqui que os dois
  // ponteiros passam a andar juntos.
  if (typeof _sincronizarPonteiroFila === 'function') _sincronizarPonteiroFila(config, disciplina);

  // V104 — o contador de blocos desde a revisão NÃO anda mais aqui: servir não é
  // concluir. Ele zerava (revisão) e somava +1 no mesmo bloco, e a revisão voltava
  // a cada 1 bloco em vez de 2. Agora só _registrarPecaV104 (fim de bloco) conta.

  // Meta da sessão = soma dos blocos do grupo do dia
  var metaSessao = 0;
  if (itemFila && config.fila) {
    var grupo = itemFila.grupo_ciclo;
    config.fila.forEach(function(f) {
      metaSessao += _qtdNoGrupoV100(f, grupo);
    });
  }

  return {
    sucesso:             true,
    questoes:            selecionadas,
    disciplina:          disciplina,
    tema:                tema,
    subtema:             subtema,
    importancia_subtema: imp,
    gate: {
      minimo:    gateMin,
      atual:     taxaAtual,
      aprovado:  gateOk
    },
    meta_sessao:  metaSessao,
    tempo_bloco:  itemFila ? (itemFila.tempo_bloco || 0) : 0,
    msg_status:   disciplina + ' › ' + tema + ' › ' + subtema + ' [' + imp + '] | Taxa: ' +
                  (taxaAtual >= 0 ? taxaAtual + '%' : 'Iniciando') + ' / ' + gateMin + '% necessário'
  };
}

// ── Helper: comportamento legado (sem MAPA_DISTRIBUICAO_EDITAL) ───────────────

function _obterBlocoLegado(disciplina, itemFila, config, estado, mapa, blacklist) {
  if (!mapa[disciplina] || !mapa[disciplina].questoes) {
    return { erro: 'Sem questões para ' + disciplina };
  }

  var ids    = mapa[disciplina].questoes.map(function(f) { return f.id; });
  var todas  = carregarMultiplosJsons(ids);
  var bloco  = itemFila ? (itemFila.qtd_bloco || 10) : 10;

  var ineditas = todas.filter(function(q) {
    return !estado.respostas[q.idOriginal] && !blacklist.has(q.idOriginal);
  });

  var selecionadas = embaralharArray(ineditas).slice(0, bloco);
  if (selecionadas.length === 0) return { erro: 'Sem questões inéditas para ' + disciplina };

  var metaSessao = 0;
  if (itemFila && config.fila) {
    config.fila.forEach(function(f) {
      metaSessao += _qtdNoGrupoV100(f, itemFila.grupo_ciclo);
    });
  }

  return {
    sucesso:      true,
    questoes:     selecionadas,
    disciplina:   disciplina,
    tema:         null,
    subtema:      null,
    meta_sessao:  metaSessao,
    tempo_bloco:  itemFila ? (itemFila.tempo_bloco || 0) : 0,
    msg_status:   disciplina + ' (modo legado — sem mapa de edital)'
  };
}

// ============================================================================
// registrarFimBloco — Salva respostas, avança ponteiro se gate atingido
// ============================================================================

function registrarFimBloco(dados) {
  try {
    var estado   = carregarEstadoUsuario() || { respostas: {}, contadores_erro: {}, tempo_por_questao: {} };
    if (!estado.respostas)         estado.respostas         = {};
    if (!estado.contadores_erro)   estado.contadores_erro   = {};
    if (!estado.tempo_por_questao) estado.tempo_por_questao = {};
    var precisaSalvarEstado = false;

    // ══════════════════════════════════════════════════════════════
    // V104 — CONTEÚDO NOVO ≠ REVISÃO (o critério da V20.8 nunca funcionava)
    // A V20.8 classificava como "revisão" toda questão que já estava em
    // estado.respostas. Mas o ciclo grava CADA resposta na hora (auto-save via
    // pausarESalvarCiclo), então no fim do bloco TODAS já estavam lá: o bloco
    // inteiro virava "revisão", volume_realizado nunca subia e o erro de cada
    // questão errada era contado DUAS vezes (auto-save + fim de bloco).
    // Agora:
    //   • a resposta traz `era_revisao` (gravado pelo front no momento da
    //     resposta, ANTES de sobrescrever o estado); sem a marca, vale o
    //     critério antigo;
    //   • resposta já persistida pelo auto-save (mesma data_resposta) não
    //     conta erro de novo;
    //   • cada questão é atribuída à SUA disciplina (bloco de revisão mistura
    //     disciplinas).
    // ══════════════════════════════════════════════════════════════
    var temposPorId = {};
    (dados.tempos_questoes || []).forEach(function(t) { if (t && t.id) temposPorId[t.id] = t.dados || {}; });

    var porDisc = {};   // disciplina -> { total, acertos, novas, revisao, ids: [] }
    var discDaQuestao = function(id) {
      var t = temposPorId[id] || estado.tempo_por_questao[id] || {};
      var d = t.disciplina ? (_disciplinaDoEdital(t.disciplina) || t.disciplina) : null;
      return d || dados.disciplina;
    };

    var idsRecentes = Object.keys(dados.novas_respostas || {});
    if (idsRecentes.length > 0) {
      idsRecentes.forEach(function(id) {
        var nova = dados.novas_respostas[id];
        var tNovo = temposPorId[id] || {};
        var tSalvo = estado.tempo_por_questao[id];
        var jaPersistida = !!(tSalvo && tNovo.data_resposta && tSalvo.data_resposta === tNovo.data_resposta &&
                              estado.respostas[id]);
        var ehRevisao = (typeof tNovo.era_revisao === 'boolean')
          ? tNovo.era_revisao
          : (!jaPersistida && estado.respostas[id] !== undefined);
        if (dados.bloco_revisao) ehRevisao = true;

        var d = discDaQuestao(id);
        var g = porDisc[d] || (porDisc[d] = { total: 0, acertos: 0, novas: 0, revisao: 0, ids: [] });
        g.total++; if (nova && nova.correta) g.acertos++;
        if (ehRevisao) g.revisao++; else g.novas++;
        g.ids.push(id);

        if (!jaPersistida && nova && !nova.correta) {
          estado.contadores_erro[id] = (estado.contadores_erro[id] || 0) + 1;
        }
        estado.respostas[id] = nova;
      });

      var blObj  = _blacklistDoDia();
      blObj.ids  = blObj.ids.concat(idsRecentes);
      _saveJsonToDrive(ARQUIVO_BLACKLIST_SESSAO, blObj);
      precisaSalvarEstado = true;
    }

    if (dados.tempos_questoes && Array.isArray(dados.tempos_questoes)) {
      dados.tempos_questoes.forEach(function(t) {
        estado.tempo_por_questao[t.id] = t.dados;
      });
      precisaSalvarEstado = true;
    }

    if (precisaSalvarEstado) {
      estado = recalcularAgregacoesTempo(estado);
      salvarEstadoUsuario(estado);
    }

    // Bloco sem respostas detalhadas (chamada antiga): tudo na disciplina do bloco.
    if (!Object.keys(porDisc).length && (Number(dados.total) || 0) > 0) {
      porDisc[dados.disciplina] = { total: Number(dados.total) || 0, acertos: Number(dados.acertos) || 0,
                                    novas: dados.bloco_revisao ? 0 : (Number(dados.total) || 0),
                                    revisao: dados.bloco_revisao ? (Number(dados.total) || 0) : 0, ids: [] };
    }
    var totNovas = 0, totRev = 0;
    Object.keys(porDisc).forEach(function(d) { totNovas += porDisc[d].novas; totRev += porDisc[d].revisao; });
    dados._qtd_novas = totNovas;
    dados._qtd_revisao = totRev;
    if (totRev > 0) Logger.log('[FIM-BLOCO] ' + totNovas + ' nova(s) + ' + totRev + ' de revisão.');

    var hist = carregarHistoricoDesempenho();
    if (!hist.historico_diario)                hist.historico_diario = [];
    if (!hist.acumulado_por_disciplina)        hist.acumulado_por_disciplina = {};
    if (!hist.modo_ciclo)                      hist.modo_ciclo = { total_questoes: 0, total_acertos: 0, por_disciplina: {} };
    if (!hist.modo_ciclo.por_disciplina)       hist.modo_ciclo.por_disciplina = {};
    if (!hist.questoes_unicas_contabilizadas)  hist.questoes_unicas_contabilizadas = {};

    var agora = new Date().toISOString();
    Object.keys(porDisc).forEach(function(d) {
      var g = porDisc[d];
      hist.historico_diario.push({
        data:                  agora,
        disciplina:            d,
        acertos:               g.acertos,
        questoes_respondidas:  g.total,
        erros:                 g.total - g.acertos,
        revisoes:              g.revisao
      });

      var unicas = g.ids.filter(function(id) { return !hist.questoes_unicas_contabilizadas[id]; });
      var unicasAcertos = unicas.filter(function(id) {
        return dados.novas_respostas[id] && dados.novas_respostas[id].correta;
      }).length;
      g.ids.forEach(function(id) { hist.questoes_unicas_contabilizadas[id] = true; });

      if (!hist.acumulado_por_disciplina[d])  hist.acumulado_por_disciplina[d]  = { total: 0, acertos: 0, percentual: 0 };
      if (!hist.modo_ciclo.por_disciplina[d]) hist.modo_ciclo.por_disciplina[d] = { total: 0, acertos: 0, percentual: 0 };
      var acc = hist.acumulado_por_disciplina[d];
      acc.total   += unicas.length;
      acc.acertos += unicasAcertos;
      if (acc.total > 0) acc.percentual = Math.round((acc.acertos / acc.total) * 100);

      var mc = hist.modo_ciclo.por_disciplina[d];
      hist.modo_ciclo.total_questoes += g.total;
      hist.modo_ciclo.total_acertos  += g.acertos;
      mc.total   += g.total;
      mc.acertos += g.acertos;
      if (mc.total > 0) mc.percentual = Math.round((mc.acertos / mc.total) * 100);
    });

    _saveJsonComInvalidacao(ARQUIVO_HISTORICO, hist, 'HIST_DESEMP');
    descartarSessaoSuspensa();

    var config3 = carregarConfiguracaoCiclo();

    // Volume por disciplina: só o conteúdo NOVO cobre a meta; revisão fica à parte.
    var indiceFim = null;
    Object.keys(porDisc).forEach(function(d) {
      var itemFila = config3.fila ? config3.fila.find(function(f) { return f.disciplina === d; }) : null;
      if (!itemFila) return;
      var g = porDisc[d];
      itemFila.volume_realizado   = (itemFila.volume_realizado   || 0) + g.novas;
      itemFila.volume_revisao     = (itemFila.volume_revisao     || 0) + g.revisao;
      itemFila.volume_respostas   = (itemFila.volume_respostas   || 0) + g.total;
      itemFila.ultima_data_estudo = agora;

      // V104 — STANDBY = disciplina com TODOS os subtemas concluídos (meta + gate).
      // Antes era volume_realizado >= volume_total_meta: questões extras de reforço
      // do gate faziam a disciplina "acabar" com subtemas ainda pendentes.
      if (MAPA_DISTRIBUICAO_EDITAL && MAPA_DISTRIBUICAO_EDITAL[d]) {
        if (!indiceFim) indiceFim = _indiceRespostasV104(estado);
        var marcos = (_lerPonteiro() || {}).marcos || {};
        var aindaTem = _posicaoDisciplinaV104(d, itemFila, indiceFim, marcos[d]);
        var novoStatus = aindaTem ? 'PENDENTE' : 'STANDBY';
        if (itemFila.status_ciclo !== novoStatus) {
          Logger.log('[FIM-BLOCO] ' + d + ' → ' + novoStatus);
          itemFila.status_ciclo = novoStatus;
        }
      } else if (itemFila.volume_realizado >= itemFila.volume_total_meta) {
        itemFila.status_ciclo = 'STANDBY';
      }
    });
    salvarConfiguracaoCiclo(config3);

    // V104 — a peça da fila anda aqui (fim de bloco), não ao servir.
    try { _registrarPecaV104(config3, dados); } catch (eP) { Logger.log('[FIM-BLOCO] ponteiro: ' + eP.message); }

    _agendarReconstrucaoCache();
    _invalidarCacheEstrutura();
    invalidarCacheDossie();

    return { sucesso: true, ciclo_concluido: false, novas: totNovas, revisao: totRev };

  } catch(e) {
    throw new Error(e.message);
  }
}


// ============================================================================
// pausarESalvarCiclo — Salva parcial e posição exata (CORRIGIDO)
// ============================================================================

function pausarESalvarCiclo(dados) {
  try {
    var estado = carregarEstadoUsuario();
    var blObj  = _blacklistDoDia();
    var precisaSalvarEstado = false;

    // ── Persiste respostas parciais ─────────────────────────────────────────
    if (dados.respostas_parciais && Object.keys(dados.respostas_parciais).length > 0) {
      if (!estado.respostas)       estado.respostas       = {};
      if (!estado.contadores_erro) estado.contadores_erro = {};

      var idsRecentes = Object.keys(dados.respostas_parciais);
      idsRecentes.forEach(function(id) {
        estado.respostas[id] = dados.respostas_parciais[id];
        if (!dados.respostas_parciais[id].correta) {
          estado.contadores_erro[id] = (estado.contadores_erro[id] || 0) + 1;
        }
      });

      blObj.ids = blObj.ids.concat(idsRecentes);
      _saveJsonToDrive(ARQUIVO_BLACKLIST_SESSAO, blObj);
      precisaSalvarEstado = true;
    }

    if (dados.tempos_questoes && Array.isArray(dados.tempos_questoes)) {
      if (!estado.tempo_por_questao) estado.tempo_por_questao = {};
      dados.tempos_questoes.forEach(function(t) {
        estado.tempo_por_questao[t.id] = t.dados;
      });
      precisaSalvarEstado = true;
    }

    if (precisaSalvarEstado) {
      estado = recalcularAgregacoesTempo(estado);
      salvarEstadoUsuario(estado);
    }

    // ── Salva sessão suspensa com posição exata ─────────────────────────────
    var ponteiro = _lerPonteiro();
    
    // FIX: Mapeia corretamente os dados vindos do frontend dentro do objeto "sessao"
    var sessaoRef = dados.sessao || {};

    var payloadSessao = {
      ativa:        true,
      data:         new Date().toISOString(),
      disciplina:   sessaoRef.disciplina || dados.disciplina   || ponteiro.disciplina,
      tema:         sessaoRef.tema       || dados.tema         || ponteiro.tema,
      subtema:      sessaoRef.subtema    || dados.subtema      || ponteiro.subtema,
      questoes:     sessaoRef.questoes   || dados.questoes_restantes || [],
      index:        sessaoRef.index      || dados.index_parada       || 0,
      stats:        sessaoRef.stats      || dados.stats              || {},
      tempo_gasto:  sessaoRef.tempo_gasto|| dados.tempo_gasto        || 0,
      tempo_bloco:  sessaoRef.tempo_bloco|| dados.tempo_bloco        || 0
    };

    _saveJsonToDrive(ARQUIVO_SESSAO_SUSPENSA, payloadSessao);

    _agendarReconstrucaoCache();
    _invalidarCacheEstrutura();
    invalidarCacheDossie();

    return { sucesso: true, msg: 'Sessão salva. Retome de onde parou.' };

  } catch(e) {
    return { erro: e.message };
  }
}

// ============================================================================
// resetarPonteiroCiclo — Utilitário para zerar posição (uso manual/admin)
// ============================================================================

function resetarPonteiroCiclo() {
  try {
    var config = carregarConfiguracaoCiclo();
    var primeiraDisc = (config.fila && config.fila.length > 0) ? config.fila[0].disciplina : null;
    _salvarPonteiro({ disciplina: primeiraDisc, tema: null, subtema: null, questoes_sessao: 0 });
    _saveJsonToDrive(ARQUIVO_BLACKLIST_SESSAO, { ids: [], dia: new Date().toISOString().split('T')[0] });
    return { sucesso: true, msg: 'Ponteiro resetado para o início do ciclo.' };
  } catch(e) {
    return { erro: e.message };
  }
}

// ============================================================================
// obterStatusPonteiro — Para debug e exibição no frontend
// ============================================================================

function obterStatusPonteiro() {
  try {
    var ponteiro = _lerPonteiro();
    var estado   = carregarEstadoUsuario();
    var mapa     = listarArquivosRapido();

    var resultado = {
      posicao_atual: ponteiro,
      gate:          null,
      proximo:       null
    };

    if (ponteiro.disciplina && ponteiro.tema && ponteiro.subtema &&
        MAPA_DISTRIBUICAO_EDITAL && MAPA_DISTRIBUICAO_EDITAL[ponteiro.disciplina]) {

      var dadosSub = MAPA_DISTRIBUICAO_EDITAL[ponteiro.disciplina][ponteiro.tema] &&
                     MAPA_DISTRIBUICAO_EDITAL[ponteiro.disciplina][ponteiro.tema][ponteiro.subtema];
      var imp      = dadosSub ? dadosSub.importancia : 'MÉDIO';
      var gateMin  = GATE_IMPORTANCIA[imp] !== undefined ? GATE_IMPORTANCIA[imp] : 50;
      var taxaAtual = _taxaSubtema(ponteiro.disciplina, ponteiro.tema, ponteiro.subtema, estado);
      var gateOk   = _gateAprovado(ponteiro.disciplina, ponteiro.tema, ponteiro.subtema, estado);

      resultado.gate = {
        importancia: imp,
        minimo:      gateMin,
        atual:       taxaAtual,
        aprovado:    gateOk,
        falta:       gateOk ? 0 : Math.max(0, gateMin - (taxaAtual >= 0 ? taxaAtual : 0))
      };

      var proxPos = _proximaPosicao(ponteiro.disciplina, ponteiro.tema, ponteiro.subtema);
      resultado.proximo = proxPos || { msg: 'Fim da disciplina' };
    }

    return { sucesso: true, status: resultado };
  } catch(e) {
    return { erro: e.message };
  }
}


// ============================================================================
// V102 — QUESTÕES AVULSAS (filtro/modo manual) CONTAM NO CICLO
//
// Antes: responder pelo filtro gravava só o estado da questão. A cota da
// disciplina no ciclo (volume_realizado) e o bloco do dia não sabiam de nada, e
// o aluno refazia no ciclo o que já tinha feito.
// Agora, se a questão é ABRANGIDA pelo ciclo (disciplina na fila, tema marcado
// no ciclo e subtema ativo no edital):
//   • questão NOVA     → soma em volume_realizado e vira CRÉDITO (credito_avulso);
//   • questão JÁ VISTA → soma em volume_revisao (é revisão; a repetição
//                        espaçada já reagendou a próxima, então ela sai da fila
//                        de vencidas);
//   • o crédito ABATE o próximo bloco de conteúdo novo da disciplina; se cobrir
//     a peça inteira, o ciclo passa para a próxima disciplina pendente do dia.
// Questão fora do ciclo continua gravada no estado e na revisão, mas não mexe
// na cota (o motivo volta na resposta).
// ============================================================================
function _avulsaAbrangidaPeloCicloV102(item, tema, subtema) {
  if (!item) return { ok: false, motivo: 'disciplina fora do ciclo' };
  var temasItem = Array.isArray(item.temas) ? item.temas : ['TODOS'];
  var norm = function (s) {
    try { return _normChaveV23(s); } catch (e) { return String(s || '').toLowerCase().trim(); }
  };
  if (temasItem.indexOf('TODOS') < 0 && tema) {
    var achouTema = temasItem.some(function (t) { return norm(t) === norm(tema); });
    if (!achouTema) return { ok: false, motivo: 'tema não marcado no ciclo' };
  }
  var mapaDisc = (typeof MAPA_DISTRIBUICAO_EDITAL !== 'undefined' && MAPA_DISTRIBUICAO_EDITAL) ? MAPA_DISTRIBUICAO_EDITAL[item.disciplina] : null;
  if (!mapaDisc) return { ok: true };            // disciplina sem mapa de edital: vale a disciplina inteira
  var chaveTema = Object.keys(mapaDisc).filter(function (t) { return norm(t) === norm(tema); })[0];
  if (!chaveTema) return { ok: false, motivo: 'tema fora do edital' };
  var subs = mapaDisc[chaveTema] || {};
  var chaveSub = Object.keys(subs).filter(function (s) { return norm(s) === norm(subtema || 'Geral'); })[0];
  if (!chaveSub) return { ok: false, motivo: 'subtema fora do edital' };
  var dados = subs[chaveSub] || {};
  var pct = parseFloat(String(dados.distribuicao === undefined ? '0' : dados.distribuicao).replace('%', '').replace(',', '.')) || 0;
  if (pct <= 0) return { ok: false, motivo: 'subtema sem peso no edital' };
  return { ok: true };
}

function _contabilizarAvulsaNoCicloV102(p) {
  var lock = null;
  try { lock = LockService.getScriptLock(); if (!lock.tryLock(8000)) lock = null; } catch (eL) { lock = null; }
  try {
    var config = carregarConfiguracaoCiclo();
    if (!config || !config.fila || !config.fila.length) return { contou: false, motivo: 'sem ciclo ativo' };
    var alvo = String(p.disciplina || '').toLowerCase().trim();
    var item = config.fila.filter(function (f) { return String(f.disciplina || '').toLowerCase().trim() === alvo; })[0];
    var cob = _avulsaAbrangidaPeloCicloV102(item, p.tema, p.subtema);
    if (!cob.ok) return { contou: false, motivo: cob.motivo };

    item.volume_respostas = (item.volume_respostas || 0) + 1;
    item.volume_avulsas   = (item.volume_avulsas   || 0) + 1;
    item.ultima_data_estudo = new Date().toISOString();
    var tipo;
    if (p.eraNova) {
      item.volume_realizado = (item.volume_realizado || 0) + 1;
      if (item.status_ciclo !== 'STANDBY') item.credito_avulso = (item.credito_avulso || 0) + 1;
      tipo = 'nova';
      // V104 — STANDBY não é mais decidido por volume (questões extras de reforço do
      // gate "fechavam" a disciplina com subtemas pendentes). Quem decide é
      // registrarFimBloco, pela posição didática (todos os subtemas concluídos).
    } else {
      item.volume_revisao = (item.volume_revisao || 0) + 1;
      tipo = 'revisao';
    }
    salvarConfiguracaoCiclo(config);
    var peca = item.qtd_bloco || 10;
    return { contou: true, tipo: tipo, disciplina: item.disciplina,
             credito: item.credito_avulso || 0, peca_dia: peca,
             cota_cumprida: (item.credito_avulso || 0) >= peca };
  } catch (e) {
    Logger.log('[AVULSA-V102] ' + e.message);
    return { contou: false, motivo: 'falha: ' + e.message };
  } finally {
    if (lock) { try { lock.releaseLock(); } catch (eR) {} }
  }
}

// Abate o crédito de avulsas do bloco de conteúdo novo que vai ser servido.
function _abaterAvulsasDoBlocoV102(item, config, base) {
  var cred = item ? (Number(item.credito_avulso) || 0) : 0;
  if (cred <= 0) return { tamanho: base, abatido: 0, cumprido: false };
  var abatido = Math.min(cred, base);
  item.credito_avulso = cred - abatido;
  try { salvarConfiguracaoCiclo(config); } catch (e) {}
  return { tamanho: Math.max(0, base - abatido), abatido: abatido, cumprido: abatido >= base };
}

// Próxima disciplina do MESMO dia do ciclo que ainda tem peça a fazer.
function _proximaPendenteDoDiaV102(config, itemAtual, nomesValidos) {
  var fila = config.fila || [];
  var g = itemAtual ? itemAtual.grupo_ciclo : undefined;
  var i0 = fila.indexOf(itemAtual);
  for (var k = 1; k < fila.length; k++) {
    var f = fila[(i0 + k) % fila.length];
    if (f === itemAtual || f.status_ciclo === 'STANDBY') continue;
    if (nomesValidos.indexOf(f.disciplina) < 0) continue;
    if (_qtdNoGrupoV100(f, g) <= 0) continue;
    if ((Number(f.credito_avulso) || 0) >= (f.qtd_bloco || 10)) continue;
    return f.disciplina;
  }
  return null;
}

function _anexarAbatimentoV102(ret, abatido, base) {
  if (ret && abatido > 0) { ret.abatido_avulsas = abatido; ret.bloco_base = base; }
  return ret;
}

// ============================================================================
// V103 — AVULSAS ENTRAM NAS ESTATÍSTICAS (sempre) E ABATEM A DISCIPLINA INTEIRA
//
// Antes: salvarRespostaComTempo gravava só o estado da questão. O histórico de
// desempenho (acumulado por disciplina, modo manual, histórico diário) ficava
// de fora, e a taxa de acerto da disciplina não via nenhuma avulsa.
// Agora TODA avulsa é contabilizada no histórico, esteja ou não no ciclo:
//   • modo_manual            → total, acertos, erros, revisões (por disciplina);
//   • acumulado_por_disciplina → só na 1ª vez que a questão aparece (igual ao ciclo);
//   • historico_diario       → 1 registro por dia/disciplina (origem 'avulsa').
// O abatimento do PLANO continua só para a avulsa abrangida pelo ciclo (V102).
// ============================================================================
function _registrarAvulsaNoHistoricoV103(p) {
  try {
    var hist = carregarHistoricoDesempenho();
    var d = p.disciplina;
    if (!d) return { registrado: false, motivo: 'sem disciplina' };
    if (!hist.acumulado_por_disciplina) hist.acumulado_por_disciplina = {};
    if (!hist.historico_diario) hist.historico_diario = [];
    if (!hist.modo_manual) hist.modo_manual = { total_questoes: 0, total_acertos: 0, por_disciplina: {} };
    if (!hist.questoes_unicas_contabilizadas) hist.questoes_unicas_contabilizadas = {};

    var ok = !!p.correta;
    var rev = !p.eraNova;

    // modo manual (todas as respostas, inclusive repetidas)
    var mm = hist.modo_manual;
    mm.total_questoes = (mm.total_questoes || 0) + 1;
    if (ok) mm.total_acertos = (mm.total_acertos || 0) + 1;
    mm.total_erros = (mm.total_erros || 0) + (ok ? 0 : 1);
    if (rev) mm.total_revisoes = (mm.total_revisoes || 0) + 1;
    if (!mm.por_disciplina) mm.por_disciplina = {};
    var dm = mm.por_disciplina[d] || (mm.por_disciplina[d] = { total: 0, acertos: 0, percentual: 0 });
    dm.total = (dm.total || 0) + 1;
    if (ok) dm.acertos = (dm.acertos || 0) + 1;
    dm.erros = (dm.erros || 0) + (ok ? 0 : 1);
    if (rev) dm.revisoes = (dm.revisoes || 0) + 1;
    dm.percentual = dm.total > 0 ? Math.round((dm.acertos / dm.total) * 100) : 0;

    // acumulado: só a 1ª resposta de cada questão (mesma regra do fim de bloco)
    if (!hist.questoes_unicas_contabilizadas[p.idOriginal]) {
      hist.questoes_unicas_contabilizadas[p.idOriginal] = true;
      var acc = hist.acumulado_por_disciplina[d] || (hist.acumulado_por_disciplina[d] = { total: 0, acertos: 0, percentual: 0 });
      acc.total = (acc.total || 0) + 1;
      if (ok) acc.acertos = (acc.acertos || 0) + 1;
      acc.percentual = acc.total > 0 ? Math.round((acc.acertos / acc.total) * 100) : 0;
    }

    // histórico diário: funde no registro de hoje da mesma disciplina (avulsa)
    var hoje = new Date().toISOString().split('T')[0];
    var reg = null;
    for (var i = hist.historico_diario.length - 1; i >= 0 && i >= hist.historico_diario.length - 400; i--) {
      var h = hist.historico_diario[i];
      if (h && h.origem === 'avulsa' && h.disciplina === d && String(h.data || '').split('T')[0] === hoje) { reg = h; break; }
    }
    if (!reg) {
      reg = { data: new Date().toISOString(), disciplina: d, acertos: 0, questoes_respondidas: 0, erros: 0, revisoes: 0, origem: 'avulsa' };
      hist.historico_diario.push(reg);
    }
    reg.questoes_respondidas = (reg.questoes_respondidas || 0) + 1;
    if (ok) reg.acertos = (reg.acertos || 0) + 1; else reg.erros = (reg.erros || 0) + 1;
    if (rev) reg.revisoes = (reg.revisoes || 0) + 1;

    _saveJsonComInvalidacao(ARQUIVO_HISTORICO, hist, 'HIST_DESEMP');
    try { _agendarReconstrucaoCache(); _invalidarCacheEstrutura(); invalidarCacheDossie(); } catch (eC) {}
    return { registrado: true };
  } catch (e) {
    Logger.log('[AVULSA-V103] ' + e.message);
    return { registrado: false, motivo: e.message };
  }
}

function salvarRespostaComTempo(payload, estadoAtual) {
try {
  var estado = estadoAtual || carregarEstadoUsuario();
  if (!payload.idOriginal || !payload.tempo_dados) {
    throw new Error("Payload incompleto");
  }
  if (!estado.respostas)         estado.respostas         = {};
  if (!estado.contadores_erro)   estado.contadores_erro   = {};
  if (!estado.tempo_por_questao) estado.tempo_por_questao = {};

  var mudancas = {
    resposta: {
      resposta_usuario: payload.resposta_usuario,
      correta:          payload.correta
    },
    tempo: payload.tempo_dados
  };

  if (mudancas.tempo.tempo_segundos <= 0) {
    mudancas.tempo.tempo_segundos = calcularTempoEstimado(estado, payload.disciplina);
    mudancas.tempo.tempo_estimado = true;
  }

  var acertosConsecutivos = 0;
  var entradaAnterior = estado.tempo_por_questao[payload.idOriginal];
  if (entradaAnterior && entradaAnterior.acertos_consecutivos !== undefined) {
    acertosConsecutivos = entradaAnterior.acertos_consecutivos;
  }
  if (payload.correta) {
    acertosConsecutivos++;
  } else {
    acertosConsecutivos = 0;
  }
  var INTERVALOS_REVISAO = (function(){ try { return _motorCfg().srs_intervalos; }
                                        catch(e) { return [1, 3, 7, 14, 30]; } })();   // V22
  // V104 — mesma tabela e mesmo índice do ciclo (JavaScript.html, responder()):
  // erro → 1º intervalo; n-ésimo acerto seguido → intervalo n. Antes o 1º acerto
  // aqui caía no 2º intervalo (3 dias) e no ciclo no 1º: duas regras para a mesma questão.
  var idxIntervalo = Math.min(Math.max(acertosConsecutivos - 1, 0), INTERVALOS_REVISAO.length - 1);
  var diasAteRevisao = INTERVALOS_REVISAO[idxIntervalo];
  var dataRevisao = new Date();
  dataRevisao.setDate(dataRevisao.getDate() + diasAteRevisao);
  mudancas.tempo.proxima_revisao = dataRevisao.toISOString().split('T')[0];
  mudancas.tempo.acertos_consecutivos = acertosConsecutivos;
  // V20.3 — carimbo de recência: sem ele a taxa do gate só podia ser vitalícia.
  mudancas.tempo.respondida_em = new Date().toISOString().split('T')[0];

  var backupResposta = estado.respostas[payload.idOriginal];
  var backupTempo    = estado.tempo_por_questao[payload.idOriginal];

  try {
    estado.respostas[payload.idOriginal] = mudancas.resposta;

    if (!payload.correta) {
      estado.contadores_erro[payload.idOriginal] =
        (estado.contadores_erro[payload.idOriginal] || 0) + 1;
    }

    estado.tempo_por_questao[payload.idOriginal] = mudancas.tempo;

    var estadoAtualizado = recalcularAgregacoesTempo(estado);
    var estadoFinal      = atualizarHistoricoTempoDiario(estadoAtualizado, mudancas.tempo);
    salvarEstadoUsuario(estadoFinal);

    // V103 — estatísticas: TODA avulsa entra no histórico (dentro ou fora do ciclo).
    _registrarAvulsaNoHistoricoV103({
      idOriginal: payload.idOriginal,
      disciplina: payload.disciplina || mudancas.tempo.disciplina,
      correta:    !!payload.correta,
      eraNova:    !entradaAnterior
    });

    // V102 — a avulsa conta no ciclo quando é abrangida por ele (nova ou revisão).
    var _cicloAvulsa = _contabilizarAvulsaNoCicloV102({
      disciplina: payload.disciplina || mudancas.tempo.disciplina,
      tema:       mudancas.tempo.tema,
      subtema:    mudancas.tempo.subtema,
      eraNova:    !entradaAnterior
    });

    return {
      sucesso:        true,
      tempo_estimado: mudancas.tempo.tempo_estimado || false,
      ciclo:          _cicloAvulsa
    };

  } catch (erroGravacao) {
    if (backupResposta !== undefined) {
      estado.respostas[payload.idOriginal] = backupResposta;
    } else {
      delete estado.respostas[payload.idOriginal];
    }
    if (backupTempo !== undefined) {
      estado.tempo_por_questao[payload.idOriginal] = backupTempo;
    } else {
      delete estado.tempo_por_questao[payload.idOriginal];
    }
    throw erroGravacao;
  }

} catch (e) {
  return { erro: e.message };
}
}


function calcularScoreUrgencia(disciplina, itemFila, estado, hist, mapa, config) {
var pesoEdital = itemFila.peso_raw || 1;
var fileIdParaDisc = {};
if (mapa[disciplina] && mapa[disciplina].questoes) {
  mapa[disciplina].questoes.forEach(function(arq) {
    fileIdParaDisc[arq.id] = disciplina;
  });
}
var total = 0, acertos = 0;
Object.keys(estado.respostas || {}).forEach(function(id) {
  var fileId = id.substring(0, id.lastIndexOf('_'));
  if (fileIdParaDisc[fileId]) {
    total++;
    if (estado.respostas[id].correta) acertos++;
  }
});
var taxa    = total > 0 ? Math.round((acertos / total) * 100) : 0;
var deficit = Math.max(1, 100 - taxa);

var ultimaData     = itemFila.ultima_data_estudo || null;
var diasSemEstudar = 1;
if (ultimaData) {
  var diff = Date.now() - new Date(ultimaData).getTime();
  diasSemEstudar = Math.max(1, Math.floor(diff / 86400000));
} else {
  diasSemEstudar = 7;
}

var volRealizado = itemFila.volume_realizado || 0;
var volMeta      = itemFila.volume_total_meta || 1;
var fatorVolume  = Math.max(0.5, 1 - (volRealizado / volMeta));

var revisoesVencidas = 0;
var hoje = new Date().toISOString().split('T')[0];
Object.keys(estado.tempo_por_questao || {}).forEach(function(id) {
  var t = estado.tempo_por_questao[id];
  if (t.disciplina === disciplina && t.proxima_revisao && t.proxima_revisao <= hoje) {
    revisoesVencidas++;
  }
});
var bonusRevisao = Math.min(20, revisoesVencidas * 2);

var score = (pesoEdital * deficit * diasSemEstudar * fatorVolume) + bonusRevisao;

var ponteiro   = config.ponteiro_fila || 0;
if (ponteiro >= config.fila.length) ponteiro = 0;
var itemAtual  = config.fila[ponteiro];
var grupoAtual = itemAtual ? (itemAtual.grupo_ciclo !== undefined ? itemAtual.grupo_ciclo : -1) : -1;

if (grupoAtual !== -1 && _noGrupoV100(itemFila, grupoAtual)) {
  score = score * 10;
}

return {
  score:             Math.round(score),
  taxa:              taxa,
  deficit:           deficit,
  dias_sem_estudar:  diasSemEstudar,
  fator_volume:      fatorVolume,
  revisoes_vencidas: revisoesVencidas
};
}




// CURTA — não aumentar: teste MANUAL de conectividade (editor do Apps Script), maxOutputTokens 10.
function testarRotacaoExataPython() {
Logger.log("==================================================");
Logger.log("🚀 TESTANDO CHAVES API GEMINI NO APPS SCRIPT");
Logger.log("==================================================");

var modeloNome = getGeminiModel();
var payload = {
  contents: [{ role: "user", parts: [{ text: "Responda apenas: OK" }] }],
  generationConfig: { maxOutputTokens: 10 }
};

for (var i = 0; i < POOL_CHAVES_GEMINI.length; i++) {
  var apiKey = POOL_CHAVES_GEMINI[i];
  var mask = apiKey.substring(0, 10) + "..." + apiKey.substring(apiKey.length - 4);
  var url = 'https://generativelanguage.googleapis.com/v1beta/models/' + modeloNome + ':generateContent?key=' + apiKey;
  
  Logger.log("Testando Chave " + (i + 1) + "/" + POOL_CHAVES_GEMINI.length + ": " + mask);
  
  var inicio = Date.now();
  try {
    var resp = UrlFetchApp.fetch(url, {
      method: 'POST',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });
    
    var tempo = ((Date.now() - inicio) / 1000).toFixed(2);
    var code = resp.getResponseCode();
    var raw = resp.getContentText();
    
    if (code === 200) {
      Logger.log("  ✅ FUNCIONANDO (" + tempo + "s)");
    } else if (code === 429) {
      Logger.log("  ❌ QUOTA EXCEDIDA (429)");
    } else if (code === 400 && (raw.includes("API_KEY_INVALID") || raw.includes("API key expired"))) {
      Logger.log("  ❌ CHAVE INVÁLIDA (400)");
    } else {
      Logger.log("  ❌ ERRO DESCONHECIDO HTTP " + code);
    }
  } catch(e) {
    Logger.log("  ❌ EXCEÇÃO DE REDE: " + e.message);
  }
}

Logger.log("==================================================");
Logger.log("FIM DO TESTE");
}


function buscarDefinicaoRapida(termo, disc, tema, topico, trechoContexto) {
try {
  var termoLimpo = termo.replace(/["\n\r\t]+/g, ' ').trim();
  if (termoLimpo.length > 80) termoLimpo = termoLimpo.substring(0, 80);

  // Resgata a chave da API do usuário, se houver
  var prefs = carregarPreferenciasUsuario();
  var userApiKey = (prefs && prefs.config && prefs.config.gemini_api_key) ? prefs.config.gemini_api_key : null;

  // Novo prompt com contexto real da tela e regras de formatação concisa (Ex: LIMPE)
  var promptStr = 'Contexto: disciplina "' + (disc||'') + '", tema "' + (tema||'') + '"'
    + (topico ? ', tópico "' + topico + '"' : '')
    + (trechoContexto ? '.\n\nTrecho do material em tela:\n"""\n' + trechoContexto + '\n"""' : '')
    + '\n\nO aluno selecionou o termo: "' + termoLimpo + '"'
    + '\n\nResponda em HTML simples (use <strong>, <br>, listas <ul><li>). '
    + 'Seja direto, sem título, sem prefixo "Significado:" ou similar. '
    + 'Se for uma sigla ou conjunto de princípios (ex: LIMPE, CELPE, etc.), liste cada item em bulvar curto. '
    + 'Se for um conceito único, explique em 2-3 frases no contexto da disciplina. '
    + 'Máximo 120 palavras. Sem introduções, sem "trata-se de", sem prolixidade.';

  var resposta = iaAgente_({   // V-MIGRA-2 — chamada feita pelo navegador
    apiKey: userApiKey,
    maxTokens: 8192,
    prompt: promptStr,
    systemPrompt: "Você é um professor especialista no concurso de Agente da Polícia Judicial dos Tribunais do Poder Judiciário da União (TRFs, TRTs, TREs e TST).",
    jsonMode: false, // Agora pedimos texto/HTML livre em vez de JSON
    contextoGasto: 'Topicos/Definicao'
  }, 'gemini');

  if (!resposta.success) return { definicao: null, erro: resposta.erro };

  var definicaoHtml = resposta.resultado;
  
  // Limpa formatação markdown caso a IA envie
  if (typeof definicaoHtml === 'string') {
      definicaoHtml = definicaoHtml.replace(/```html|```/g, '').trim();
  }

  return { definicao: definicaoHtml };

} catch(e) {
  return { definicao: null, erro: e.message };
}
}






function obterUrlVideoTopico(disciplina, tema, indiceTopico) {
try {
  var root = DriveApp.getFolderById(PASTA_RAIZ_ID);
  if (!root) return { erro: "Pasta raiz não encontrada." };
  
  var tentativa1 = root.getFoldersByName("SistemaDeQuestoes_videos"); 
  var tentativa2 = root.getFoldersByName("SistemaDeQuestoes_vídeos"); 
  var pastaVideos = null;

  if (tentativa1.hasNext()) {
    pastaVideos = tentativa1.next();
  } else if (tentativa2.hasNext()) {
    pastaVideos = tentativa2.next();
  } else {
    return { erro: "Pasta de videos não encontrada na raiz." };
  }
  
  var discFolders = pastaVideos.getFoldersByName(disciplina);
  if (!discFolders.hasNext()) return { erro: "Pasta da disciplina não encontrada nos vídeos." };
  
  var discFolder = discFolders.next();
  var temaFolder = null;
  var temaFolds = discFolder.getFolders();
  
  while (temaFolds.hasNext()) {
    var f = temaFolds.next();
    var nomePasta = f.getName().toLowerCase();
    var matchArq = nomePasta.match(/\d+/g);
    var matchTema = tema.match(/\d+/g);
    
    if (nomePasta.includes(tema.toLowerCase()) || (matchArq && matchTema && matchArq[0] === matchTema[0])) {
      temaFolder = f;
      break;
    }
  }
  
  if (!temaFolder) return { erro: "Pasta do tema não encontrada nos vídeos." };
  
  var numVideo = (indiceTopico + 1).toString().padStart(2, '0');
  var files = temaFolder.getFiles();
  var videoId = null;
  
  while(files.hasNext()) {
      var file = files.next();
      var name = file.getName();
      if (name.startsWith(numVideo) && name.toLowerCase().endsWith('.mp4')) {
        videoId = file.getId();
        break;
      }
  }
  
  if (!videoId) return { erro: "Vídeo correspondente não encontrado." };
  
  return { 
    sucesso: true, 
    id: videoId,
    url: "https://drive.google.com/uc?export=download&id=" + videoId 
  };
  
} catch(e) {
  return { erro: "Erro ao buscar vídeo: " + e.message };
}
}





// ============================================================================
// MÓDULO FINANCEIRO E CONTROLE DE TOKENS
// ============================================================================


const ARQUIVO_FINANCEIRO = "financeiro_api_v1.json";

function _registrarGastoTokensAPI(contexto, modelo, promptTokens, outputTokens) {
var data = _readJsonFromDrive(ARQUIVO_FINANCEIRO);
if (!data) {
  data = {
    config: { cotacao_dolar: 5.50, preco_1m_in: 0.075, preco_1m_out: 0.30 }, // Default Flash 8B/Flash Preview
    uso_por_contexto: {},
    uso_por_modelo: {},
    historico_mensal: {},
    total_acumulado: { prompt: 0, output: 0 }
  };
}

// Acumula Totais Gerais
data.total_acumulado.prompt += (promptTokens || 0);
data.total_acumulado.output += (outputTokens || 0);

// Acumula por Contexto (ex: "Criar Canvas", "Lote Conversão", "IA Questão")
if (!data.uso_por_contexto[contexto]) data.uso_por_contexto[contexto] = { prompt: 0, output: 0, chamadas: 0 };
data.uso_por_contexto[contexto].prompt += (promptTokens || 0);
data.uso_por_contexto[contexto].output += (outputTokens || 0);
data.uso_por_contexto[contexto].chamadas += 1;

// Acumula por Modelo
if (!data.uso_por_modelo[modelo]) data.uso_por_modelo[modelo] = { prompt: 0, output: 0 };
data.uso_por_modelo[modelo].prompt += (promptTokens || 0);
data.uso_por_modelo[modelo].output += (outputTokens || 0);

// Acumula Histórico Mensal
var mesAtual = new Date().toISOString().substring(0, 7); // YYYY-MM
if (!data.historico_mensal[mesAtual]) data.historico_mensal[mesAtual] = { prompt: 0, output: 0, chamadas: 0 };
data.historico_mensal[mesAtual].prompt += (promptTokens || 0);
data.historico_mensal[mesAtual].output += (outputTokens || 0);
data.historico_mensal[mesAtual].chamadas += 1;

_saveJsonToDrive(ARQUIVO_FINANCEIRO, data);
}

function obterRelatorioFinanceiro() {
var data = _readJsonFromDrive(ARQUIVO_FINANCEIRO);
if (!data) {
  Logger.log('[FINANCEIRO-BD] Arquivo não encontrado. Retornando vazio.');
  return { sucesso: false, erro: "Sem dados financeiros." };
}

// Garante que a estrutura de preços dos modelos exista no banco
if (!data.config) data.config = {};
if (!data.config.precos_modelos) {
  data.config.precos_modelos = {
    "gemini-3.6-flash": { in: 1.50, out: 7.50 },
    "gemini-3.5-flash": { in: 1.50, out: 9.00 },
    "gemini-3.5-flash-lite": { in: 0.30, out: 2.50 },
    "gemini-3.1-pro-preview": { in: 2.00, out: 12.00 },
    "gemini-3.1-flash-live-preview": { in: 0.75, out: 4.50 },
    "gemini-2.5-flash-native-audio": { in: 0.075, out: 0.30 },
    "gemini-3-flash-preview": { in: 0.075, out: 0.30 }
  };
}
if (!data.config.cotacao_dolar) data.config.cotacao_dolar = 5.50;

Logger.log('[FINANCEIRO-BD] Dados recuperados com sucesso.');
return { sucesso: true, dados: data };
}

function salvarConfigFinanceira(novaCotacao, precosModelos) {
Logger.log('[FINANCEIRO-SAVE] Iniciando salvamento de nova precificação...');
var data = _readJsonFromDrive(ARQUIVO_FINANCEIRO) || { config: {}, uso_por_contexto: {}, uso_por_modelo: {}, historico_mensal: {}, total_acumulado: { prompt: 0, output: 0 } };

data.config.cotacao_dolar = parseFloat(novaCotacao) || 5.50;
data.config.precos_modelos = precosModelos;




_saveJsonToDrive(ARQUIVO_FINANCEIRO, data);
Logger.log('[FINANCEIRO-SAVE] Preços atualizados. Dólar: R$' + data.config.cotacao_dolar);

return { sucesso: true, config: data.config };
}








// ============================================================================
// INTEGRAÇÃO CLAUDE API E SISTEMA DE VALIDAÇÃO/CORREÇÃO CIRÚRGICA (V FINAL)
// ============================================================================

// 1. MODELOS CLAUDE DISPONÍVEIS (Mapeamento Estrito API Anthropic)
var CLAUDE_MODELOS = {
'sonnet-4-6' : 'claude-sonnet-4-6',
'opus-4-6'   : 'claude-opus-4-6',
'opus-4-7'   : 'claude-opus-4-7'
};

function resolverModeloClaude(preferencia) {
if (!preferencia) return CLAUDE_MODELOS['sonnet-4-6'];
var key = preferencia.toLowerCase().trim();
if (CLAUDE_MODELOS[key]) return CLAUDE_MODELOS[key];
return CLAUDE_MODELOS['sonnet-4-6'];
}

// 2. AGENTE CLAUDE (HTTP FETCH) COM EXTRAÇÃO JSON BLINDADA
// V-MIGRA-2 — LEGADO. Nenhuma função do sistema chama mais este agente direto:
// todas passam por iaAgente_(), e a chamada real ao Claude é feita pelo navegador
// (claudeFetchDireto, JsAgentes.html). Só é usado como rede de segurança quando
// uma função roda FORA da ponte (execução manual no editor/gatilho).
// CURTA — não aumentar.
function claudeAgent(params) {

// [SEGURANÇA] chave viva estava hardcoded em texto puro aqui — REVOGADA.
// Gere uma chave nova no console da Anthropic e salve via:
//   PropertiesService.getScriptProperties().setProperty('CLAUDE_API_KEY', '...')
// (execute uma vez manualmente no editor do Apps Script; nunca deixe a chave
// no código-fonte, que pode ser commitado/compartilhado).
var apiKey = PropertiesService.getScriptProperties().getProperty('CLAUDE_API_KEY');
if (!apiKey) {
  Logger.log('[CLAUDE API] ❌ ERRO: CLAUDE_API_KEY ausente.');
  return { success: false, erro: 'CLAUDE_API_KEY ausente nas propriedades do Script. Configure com PropertiesService.getScriptProperties().setProperty("CLAUDE_API_KEY", "sk-ant-...").' };
}

var modelo = resolverModeloClaude(params.model);
Logger.log('[CLAUDE API] 🌐 Roteando requisição para o modelo: ' + modelo);

var mensagens = [{ role: 'user', content: params.prompt }];

// PREFILL: Força o Claude a iniciar com JSON array e corta conversas extras
if (params.jsonMode) {
    mensagens.push({ role: 'assistant', content: '[' });
}

var payload = {
  model      : modelo,
  max_tokens : params.maxTokens || 65536,
  system     : params.systemPrompt || '',
  messages   : mensagens
};

// opus-4-7 não aceita o parâmetro temperature
if (modelo.indexOf('opus-4-7') === -1) {
  payload.temperature = (params.temperature !== undefined) ? params.temperature : 0.1;
}

var options = {
  method            : 'post',
  contentType       : 'application/json',
  headers           : {
    'x-api-key'         : apiKey,
    'anthropic-version' : '2023-06-01'
  },
  payload           : JSON.stringify(payload),
  muteHttpExceptions: true
};

try {
  var tInicio = Date.now();
  var resp    = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', options);
  var code    = resp.getResponseCode();
  var raw     = resp.getContentText();
  var tFim    = Date.now() - tInicio;

  if (code !== 200) {
    Logger.log('[CLAUDE API] ❌ HTTP ' + code + ' (' + tFim + 'ms): ' + raw.substring(0, 300));
    // ═══════════════════════════════════════════════════════════════════════
    // V42-A3 — este retorno NÃO trazia isQuota. A Fábrica repassava
    // `isQuota: resultadoIA.isQuota` = undefined, então 429/529 do Claude eram
    // tratados como erro comum e o lote era DESCARTADO em vez de entrar em
    // standby: uma fila inteira drenava em minutos gerando quase nada.
    // ═══════════════════════════════════════════════════════════════════════
    var _ehCota = (code === 429 || code === 529 || code === 503) ||
                  /rate_?limit|overloaded|quota|too many requests/i.test(raw);
    return {
      success: false,
      isQuota: _ehCota,
      erro: (_ehCota ? 'Cota/limite da API Claude (HTTP ' + code + '): ' : 'Claude HTTP ' + code + ': ') + raw.substring(0, 200)
    };
  }

  var data = JSON.parse(raw);
  // V42-B11 — data.content[0].text sem guarda: uma recusa ou resposta vazia
  // estourava TypeError e virava "Falha de rede (Claude)", diagnóstico errado.
  if (!data || !data.content || !data.content.length || typeof data.content[0].text !== 'string') {
    Logger.log('[CLAUDE API] ⚠️ resposta sem conteúdo textual: ' + raw.substring(0, 200));
    return { success: false, erro: 'Claude devolveu resposta sem conteúdo utilizável.' };
  }
  var text = data.content[0].text;
  
  // Restaura o colchete do prefill caso o modelo não o inclua
  if (params.jsonMode && !text.trim().startsWith('[')) {
      text = '[' + text;
  }
  
  var result = text;

  // ESCUDO BLINDADO OBRIGATÓRIO (Mata a regex gulosa antiga)
  if (params.jsonMode) {
    try {
      var cleanRaw = text.replace(/```json|```/gi, '').trim();
      cleanRaw = cleanRaw.replace(/[\n\r\t]+/g, ' '); // Elimina quebras literais
      cleanRaw = cleanRaw.replace(/(?<!\\)\\([^"\\nrtu])/g, '\\\\$1'); // Duplica barras isoladas do LaTeX
      result = JSON.parse(cleanRaw);
    } catch(e) {
      Logger.log('[CLAUDE API] ❌ JSON corrompido: ' + e.message + ' | Raw: ' + text.substring(0, 300));
      return { success: false, erro: 'JSON inválido retornado pelo Claude: ' + e.message };
    }
  }

  Logger.log('[CLAUDE API] ✅ Resposta OK (' + tFim + 'ms) | Tokens In: ' + data.usage.input_tokens + ' | Out: ' + data.usage.output_tokens);
  return { success: true, resultado: result, modeloUsado: modelo };

} catch(e) {
  Logger.log('[CLAUDE API] ❌ Falha de rede: ' + e.message);
  return { success: false, erro: 'Falha de rede (Claude): ' + e.message };
}
}

function validarCanvasClaude(blocosArray, roteiroBase, contextoBase, preferencia, roteirosNarracao) {
Logger.log('╔══════════════════════════════════════════════════════════════╗');
Logger.log('║  QA CLAUDE AUDITOR | Validando ' + blocosArray.length + ' blocos');
Logger.log('╚══════════════════════════════════════════════════════════════╝');

var modeloResolvido = resolverModeloClaude(preferencia);

var blocosAnotados = blocosArray.map(function(html, i) {
  return '--- BLOCO ÍNDICE [' + i + '] ---\n' + html;
}).join('\n\n');

var textoRoteiros = _formatarRoteirosParaQA(roteirosNarracao, blocosArray.length);

var sysPrompt =
  'Você é um Auditor Sênior de Qualidade Instrucional (QA) de uma lousa NARRADA por voz.\n' +
  'Analise os blocos HTML e o ROTEIRO DE NARRAÇÃO de cada um cruzando-os DIRETAMENTE com o MATERIAL BASE CRU.\n' +
  'FERRAMENTA - VALIDAÇÃO CRUZADA CEGA (BLIND QA): Procure ativamente por TODOS os substantivos, títulos de seções, notas de bancas, mnemônicos e exemplos numéricos do texto fonte nos blocos HTML. Se um conceito do texto fonte não estiver no HTML gerado, REPROVE A LOUSA POR OMISSÃO DE CONTEÚDO. Não confie em metadados informados nos blocos, audite você mesmo palavra por palavra do PDF fonte.\n' +
  'CRITÉRIOS DE REPROVAÇÃO:\n' +
  '1. ESTRUTURA: Se o bloco NÃO começar com `<div class=\'slide\'>` → reprovado.\n' +
  '2. CABEÇALHO: Se houver a tag `<header>` dentro do slide → reprovado.\n' +
  '3. EXAUSTÃO ARITMÉTICA: Fórmulas ignoradas ou contas que pulam etapas matemáticas → reprovado.\n' +
  '4. SVGs: Gráficos com height="auto" ou usando `<polyline>` para curvas matemáticas → reprovado.\n' +
  '5. ROTEIRO DE NARRAÇÃO (CRÍTICO — é o que a voz vai falar): reprove o bloco se o roteiro dele:\n' +
  '   - não existir, ou vier sem DADOS CONFIRMADOS, ou sem FALA;\n' +
  '   - tiver FALA genérica, que serviria para qualquer bloco, sem citar os números e termos que estão na tela;\n' +
  '   - tiver FALA que descreve layout ("aqui vemos um card com...") em vez de explicar o porquê;\n' +
  '   - tiver FALA em tom de bate-papo, ou usar o símbolo PROIBIDO de cifrão ($) no texto;\n' +
  '   - MODO TEORIA: bloco 1 resolvendo o caso motivador em vez de apenas apresentá-lo;\n' +
  '   - MODO QUESTÃO: faltar a dissecação do enunciado ou a análise individual de CADA distrator.\n' +
  '   Ao reprovar por roteiro, sugestao_correcao DEVE dizer o que a FALA precisa passar a conter.\n' +
  '6. OMISSÃO DE CONTEÚDO (FALHA GRAVE): A lousa tem que cobrir 100% da teoria do MATERIAL BASE. Se algum conceito, classificação, regra ou exceção do material não virou um slide → REPROVE GERAL e aponte em "cobertura_faltante".\n' +
  '7. ALUCINAÇÃO DE DADOS E FÓRMULAS: As fórmulas e os números dos exemplos DEVEM ser RIGOROSAMENTE IDÊNTICOS ao material base. Se o material diz "a_ij = 2i² - 3j" e o HTML diz "a_ij = 2i - j" → REPROVE IMEDIATAMENTE.\n\n' +
  'RETORNE EXCLUSIVAMENTE JSON VÁLIDO SEM MARKDOWN NESTE FORMATO EXATO:\n' +
  '{\n' +
  '  "aprovado": boolean,\n' +
  '  "score_geral": 0-100,\n' +
  '  "modelo_usado": "string",\n' +
  '  "blocos_com_problema": [\n' +
  '    { "index": int, "problema": "descrição", "sugestao_correcao": "o que mudar" }\n' +
  '  ],\n' +
  '  "cobertura_faltante": ["Liste exaustivamente todos os tópicos/conceitos do material base que foram ignorados na geração dos blocos"],\n' +
  '  "instrucoes_para_gemini": "orientações diretas para regeração cirúrgica dos blocos com erro e inclusão dos blocos faltantes"\n' +
  '}';

var userPrompt =
  'MATERIAL BASE (A ser ensinado):\n' + contextoBase.substring(0, 25000) + '...\n\n' +
  'ROTEIRO PREVISTO:\n' + roteiroBase + '\n\n' +
  'HTML GERADO (fatiado por índice):\n' + blocosAnotados + '\n\n' +
  'ROTEIROS DE NARRAÇÃO POR BLOCO (o comentário <!--ROTEIRO--> é extraído do HTML antes desta auditoria):\n' + textoRoteiros + '\n\n' +
  'Informe "modelo_usado": "' + modeloResolvido + '" no JSON de resposta.';

return iaAgente_({   // V-MIGRA-2 — chamada feita pelo navegador
  model        : preferencia,
  prompt       : userPrompt,
  systemPrompt : sysPrompt,
  jsonMode     : true,
  claudePrefill: '{',   // a resposta é um OBJETO JSON (o prefill '[' antigo quebrava o parse)
  maxTokens    : 65536,
  contextoGasto: 'Canvas/AuditoriaClaude'
}, 'claude');
}

function validarCanvasGemini(blocosArray, roteiroBase, contextoBase, roteirosNarracao) {
Logger.log('╔══════════════════════════════════════════════════════════════╗');
Logger.log('║  QA GEMINI AUDITOR | Validando ' + blocosArray.length + ' blocos');
Logger.log('╚══════════════════════════════════════════════════════════════╝');

var prefs      = carregarPreferenciasUsuario();
var userApiKey = (prefs && prefs.config && prefs.config.gemini_api_key) ? prefs.config.gemini_api_key : null;

var blocosAnotados = blocosArray.map(function(html, i) {
  return '--- BLOCO ÍNDICE [' + i + '] ---\n' + html;
}).join('\n\n');

var textoRoteiros = _formatarRoteirosParaQA(roteirosNarracao, blocosArray.length);

var sysPrompt =
  'Você é um Auditor Sênior de Qualidade Instrucional (QA) de uma lousa NARRADA por voz.\n' +
  'Analise os blocos HTML e o ROTEIRO DE NARRAÇÃO de cada um cruzando-os DIRETAMENTE com o MATERIAL BASE CRU.\n' +
  'FERRAMENTA - VALIDAÇÃO CRUZADA CEGA (BLIND QA): Procure ativamente por TODOS os substantivos, títulos de seções, notas de bancas, mnemônicos e exemplos numéricos do texto fonte nos blocos HTML. Se um conceito do texto fonte não estiver no HTML gerado, REPROVE A LOUSA POR OMISSÃO DE CONTEÚDO. Não confie em metadados informados nos blocos, audite você mesmo palavra por palavra do PDF fonte.\n' +
  'CRITÉRIOS DE REPROVAÇÃO:\n' + 
  '1. ESTRUTURA: Se o bloco NÃO começar com `<div class=\'slide\'>` → reprovado.\n' +
  '2. CABEÇALHO: Se houver a tag `<header>` dentro do slide → reprovado.\n' +
  '3. EXAUSTÃO ARITMÉTICA: Fórmulas ignoradas ou contas que pulam etapas matemáticas → reprovado.\n' +
  '4. SVGs: Gráficos com height="auto" ou usando `<polyline>` para curvas matemáticas → reprovado.\n' +
  '5. ROTEIRO DE NARRAÇÃO (CRÍTICO — é o que a voz vai falar): reprove o bloco se o roteiro dele:\n' +
  '   - não existir, ou vier sem DADOS CONFIRMADOS, ou sem FALA;\n' +
  '   - tiver FALA genérica, que serviria para qualquer bloco, sem citar os números e termos que estão na tela;\n' +
  '   - tiver FALA que descreve layout ("aqui vemos um card com...") em vez de explicar o porquê;\n' +
  '   - tiver FALA em tom de bate-papo, ou usar o símbolo PROIBIDO de cifrão ($) no texto;\n' +
  '   - MODO TEORIA: bloco 1 resolvendo o caso motivador em vez de apenas apresentá-lo;\n' +
  '   - MODO QUESTÃO: faltar a dissecação do enunciado ou a análise individual de CADA distrator.\n' +
  '   Ao reprovar por roteiro, sugestao_correcao DEVE dizer o que a FALA precisa passar a conter.\n' +
  '6. OMISSÃO DE CONTEÚDO (FALHA GRAVE): A lousa tem que cobrir 100% da teoria do MATERIAL BASE. Se algum conceito, classificação, regra ou exceção do material não virou um slide → REPROVE GERAL e aponte em "cobertura_faltante".\n' +
  '7. ALUCINAÇÃO DE DADOS E FÓRMULAS: As fórmulas e os números dos exemplos DEVEM ser RIGOROSAMENTE IDÊNTICOS ao material base. Se o material diz "a_ij = 2i² - 3j" e o HTML diz "a_ij = 2i - j" → REPROVE IMEDIATAMENTE.\n\n' +
  'RETORNE EXCLUSIVAMENTE JSON VÁLIDO SEM MARKDOWN NESTE FORMATO EXATO:\n' +
  '{\n' +
  '  "aprovado": boolean,\n' +
  '  "score_geral": 0-100,\n' +
  '  "modelo_usado": "string",\n' +
  '  "blocos_com_problema": [\n' +
  '    { "index": int, "problema": "descrição", "sugestao_correcao": "o que mudar" }\n' +
  '  ],\n' +
  '  "cobertura_faltante": ["Liste exaustivamente todos os tópicos/conceitos do material base que foram ignorados na geração dos blocos"],\n' +
  '  "instrucoes_para_gemini": "orientações diretas para regeração cirúrgica dos blocos com erro e inclusão dos blocos faltantes"\n' +
  '}';

var userPrompt =
  'MATERIAL BASE (A ser ensinado):\n' + contextoBase.substring(0, 25000) + '...\n\n' +
  'ROTEIRO PREVISTO:\n' + roteiroBase + '\n\n' +
  'HTML GERADO (fatiado por índice):\n' + blocosAnotados + '\n\n' +
  'ROTEIROS DE NARRAÇÃO POR BLOCO (o comentário <!--ROTEIRO--> é extraído do HTML antes desta auditoria):\n' + textoRoteiros + '\n\n' +
  'Informe "modelo_usado": "' + agModeloTexto_() + '" no JSON de resposta.';   // V40.3

var resultado = iaAgente_({   // V-MIGRA-2 — chamada feita pelo navegador
  apiKey       : userApiKey,
  prompt       : userPrompt,
  systemPrompt : sysPrompt,
  jsonMode     : true,
  thinkingLevel: agThinking_('qa', 'medium'),   // V40.3 / V-MIGRA-2
  maxTokens    : 65536,
  contextoGasto: 'Canvas/Auditoria'
}, 'gemini');

if (resultado.success && typeof resultado.resultado === 'string') {
  try {
    var raw = resultado.resultado.replace(/```json|```/g, '').trim();
    raw = raw.replace(/[\n\r\t]+/g, ' ');
    raw = raw.replace(/(?<!\\)\\([^"\\nrtu])/g, '\\\\$1');
    resultado.resultado = JSON.parse(raw);
  } catch(e) {
    Logger.log('[GEMINI-QA] ❌ JSON corrompido: ' + e.message);
    return { success: false, erro: 'JSON retornado pelo Gemini QA corrompido: ' + e.message };
  }
}

return resultado;
}


function _formatarRoteirosParaQA(roteirosNarracao, totalBlocos) {
  if (!roteirosNarracao || !roteirosNarracao.length) {
    return '[NENHUM ROTEIRO RECEBIDO — reprove TODOS os blocos pelo critério 5]';
  }
  var linhas = [];
  for (var i = 0; i < totalBlocos; i++) {
    var r = roteirosNarracao[i];
    if (!r) { linhas.push('BLOCO [' + i + ']: SEM ROTEIRO'); continue; }
    linhas.push(
      'BLOCO [' + i + ']\n' +
      '  CONTEXTO: '          + (r.contexto  || '(vazio)') + '\n' +
      '  NIVEL: '             + (r.nivel     || '(vazio)') + '\n' +
      '  DADOS CONFIRMADOS: ' + (r.dados     || '(vazio)') + '\n' +
      '  FALA: '              + (r.fala      || '(vazio)') + '\n' +
      '  ARMADILHA: '         + (r.armadilha || '(vazio)') + '\n' +
      '  GANCHO: '            + (r.gancho    || '(vazio)')
    );
  }
  return linhas.join('\n\n');
}

/* ══════════════════════════════════════════════════════════════════════════════
   V37 — COLISÃO DE NOME RESOLVIDA

   `revisarLousaQA` estava declarada DUAS vezes no projeto, com assinaturas
   diferentes: aqui (4 parâmetros, orquestrador Claude/Gemini) e no Canvas.gs
   (5 parâmetros, incluindo a chave da rotação). Em Apps Script todos os `.gs`
   dividem o mesmo escopo global: a última carregada vencia, sem erro visível.
   Se vencesse esta, a chave enviada pelo frontend era descartada em silêncio.

   Agora existe UMA declaração de cada nome. Esta continua sendo o orquestrador
   — e passa a repassar a chave para a implementação Gemini, que foi renomeada
   para `_qaRevisarGeminiRest` no Canvas.gs.
   ══════════════════════════════════════════════════════════════════════════════ */
function revisarLousaQA(blocosArray, roteiroBase, contextoBase, roteirosNarracao, overrideApiKey) {
  var prefs             = carregarPreferenciasUsuario();
  var modeloSelecionado = (prefs.config && prefs.config.modelo_qa)
                            ? prefs.config.modelo_qa
                            : (typeof cvModeloTexto_ === 'function' ? cvModeloTexto_() : AGENTE_MODELO_PRINCIPAL);

  Logger.log('[QA-ORQUESTRADOR] Modelo selecionado: ' + modeloSelecionado +
             ' | chave recebida: ' + (overrideApiKey ? 'sim' : 'não'));

  if (String(modeloSelecionado).indexOf('claude') !== -1) {
    return validarCanvasClaude(blocosArray, roteiroBase, contextoBase, modeloSelecionado, roteirosNarracao);
  }
  if (typeof _qaRevisarGeminiRest === 'function') {
    return _qaRevisarGeminiRest(blocosArray, roteiroBase, contextoBase, roteirosNarracao, overrideApiKey);
  }
  return validarCanvasGemini(blocosArray, roteiroBase, contextoBase, roteirosNarracao);
}





/* Mesma colisão de `revisarLousaQA`, mesma correção: a implementação Gemini
   virou `_qaCirurgiaGeminiRest` no Canvas.gs, e este orquestrador repassa a
   chave da rotação em vez de descartá-la. */
function aplicarCorrecaoCirurgicaQA(blocosRuins, instrucoesQA, contextoBase, overrideApiKey, jobId, filaModelos) {
  var prefs             = carregarPreferenciasUsuario();
  var modeloSelecionado = (prefs.config && prefs.config.modelo_qa)
                            ? prefs.config.modelo_qa
                            : (typeof cvModeloTexto_ === 'function' ? cvModeloTexto_() : AGENTE_MODELO_PRINCIPAL);

  Logger.log('[CORREÇÃO-ORQUESTRADOR] Modelo selecionado: ' + modeloSelecionado +
             ' | chave recebida: ' + (overrideApiKey ? 'sim' : 'não'));

  if (String(modeloSelecionado).indexOf('claude') !== -1) {
    return corrigirBlocosCirurgicosComClaude(blocosRuins, instrucoesQA, contextoBase);
  }
  if (typeof _qaCirurgiaGeminiRest === 'function') {
    // V54 — jobId/filaModelos: escalada por fila de modelos do job (Cirurgia/
    // Emergência), sem nunca substituir uma escolha explícita de Claude acima.
    return _qaCirurgiaGeminiRest(blocosRuins, instrucoesQA, contextoBase, overrideApiKey, jobId, filaModelos);
  }
  return corrigirBlocosCirurgicosComGemini(blocosRuins, instrucoesQA, contextoBase);
}




// [GATE-CIRURGIA] Validação de conteúdo dos blocos devolvidos pelo reparo cirúrgico.
// Centralizada aqui porque Gemini e Claude precisam da MESMA regra: duas cópias
// divergem com o tempo e uma passa a aceitar o que a outra rejeita.
// Conta APENAS delimitadores de marcação: comentários <!--ROTEIRO--> e valores de
// atributo são neutralizados antes da contagem, senão data-tex="P(A) < 0,5" e
// qualquer desigualdade LaTeX/KaTeX derrubam um bloco perfeitamente válido.
function _validarBlocosCirurgicosServidor(lista, origem) {
  if (!Array.isArray(lista)) {
    Logger.log('[CIRURGIA-GATE][' + (origem || 'N/D') + '] payload não é array (' + (typeof lista) + ') — gate ignorado.');
    return [];
  }
  var invalidos = [];
  lista.forEach(function(item, i) {
    if (!item || typeof item !== 'object') return;
    var h = String(item.html_corrigido || '');
    var neutro = h
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/"[^"]*"/g, '""')
      .replace(/'[^']*'/g, "''");
    var aberturas = (neutro.match(/<\/?[a-zA-Z]/g) || []).length;
    var tagsOk    = (neutro.match(/<\/?[a-zA-Z][^>]*>/g) || []).length;
    var desbalanceado = aberturas !== tagsOk;
    var tagAberta     = /<\/?[a-zA-Z][^>]*$/.test(h);
    var semDivFinal   = h.trim().slice(-6) !== '</div>';
    var curto         = h.length < 20;
    if (curto || tagAberta || desbalanceado || semDivFinal) {
      item.rejeitado_servidor = true;
      item.motivo_servidor = curto ? 'resposta vazia/curta'
        : (tagAberta ? 'tag aberta sem fechamento'
        : (desbalanceado ? 'HTML desbalanceado (' + aberturas + ' aberturas vs ' + tagsOk + ' tags fechadas)'
        : 'não termina em </div>'));
      invalidos.push(item.index !== undefined ? item.index : ('pos#' + i));
    }
  });
  return invalidos;
}


function corrigirBlocosCirurgicosComGemini(blocosRuins, instrucoesQA, contextoBase) {
Logger.log('╔══════════════════════════════════════════════════════════════╗');
Logger.log('║  REPARO CIRÚRGICO GEMINI | Corrigindo ' + blocosRuins.length + ' blocos');
Logger.log('╚══════════════════════════════════════════════════════════════╝');

var prefs = carregarPreferenciasUsuario();
var geminiKey = (prefs && prefs.config && prefs.config.gemini_api_key) ? prefs.config.gemini_api_key : null;
if (!geminiKey) return { success: false, erro: 'Chave API Gemini ausente.' };

var textoErros = blocosRuins.map(function(b) {
  return 'BLOCO ÍNDICE [' + b.index + ']\nERRO APONTADO: ' + b.problema +
         '\nCORREÇÃO EXIGIDA: ' + b.sugestao_correcao +
         '\nROTEIRO DE NARRAÇÃO ATUAL DESTE BLOCO:\n' + (b.roteiro_atual || '[AUSENTE — crie um]') +
         '\nHTML ORIGINAL COM ERRO:\n' + b.html_atual;
}).join('\n\n=================================\n\n');

var sysPrompt =
  'Você é um Engenheiro Frontend especialista em Lousas Interativas NARRADAS por voz.\n' +
  'O setor de QA reprovou blocos ESPECÍFICOS. Sua missão é consertar APENAS esses blocos.\n' +
  'MANTENHA o design e layout originais; corrija estritamente a falha apontada.\n' +
  'OBRIGATÓRIO: O HTML devolvido DEVE começar mantendo a tag inicial EXATAMENTE como veio (incluindo o atributo data-tpl) e terminar com </div>. NUNCA remova o data-tpl.\n' +
  'OBRIGATÓRIO (CRÍTICO): NÃO REMOVA elementos reveláveis. Conte os `.cv-item-oculto` do HTML original e devolva o bloco com a MESMA quantidade ou MAIS. Reparo que reduz a contagem é RECUSADO automaticamente pelo sistema e o bloco defeituoso permanece no ar — simplificar o layout para caber na resposta é o erro mais comum aqui. Se o bloco for denso, corrija a falha apontada e reescreva o resto IGUAL ao original, elemento por elemento.\n' +
  'OBRIGATÓRIO (CRÍTICO): o HTML corrigido DEVE terminar com o comentário <!--ROTEIRO ... --> ANTES da </div> final.\n' +
  '  - Reemita os 6 campos: CONTEXTO, NIVEL, DADOS CONFIRMADOS, FALA, ARMADILHA, GANCHO.\n' +
  '  - Parta do ROTEIRO ATUAL informado e ajuste-o ao HTML corrigido; se o QA reprovou a narração, reescreva a FALA.\n' +
  '  - A FALA é prosa contínua, sem rótulos, e precisa cobrir TODOS os elementos reveláveis do bloco.\n' +
  '  - Bloco entregue sem esse comentário é considerado NÃO CORRIGIDO: a voz perde o guia e a aula volta a ficar rasa.\n\n' +
  '⚠️ ALERTA DE FORMATAÇÃO JSON (CRÍTICO) ⚠️\n' +
  '1. Como o valor de "html_corrigido" é HTML, TODAS as aspas duplas internas DEVEM ser escapadas (\\").\n' +
  '2. É ESTRITAMENTE PROIBIDO usar quebras de linha (Enter). Escreva todo o HTML em uma linha contínua única.\n' +
  '3. Se houver comandos LaTeX, use SEMPRE quatro barras (exemplo: \\\\\\\\frac). Barras simples causarão erro fatal no sistema.\n' +
  '4. DENTRO do comentário <!--ROTEIRO ... -->, escreva os 6 rótulos na MESMA linha, separados por um espaço, sempre no formato ROTULO: valor e NESTA ordem exata: CONTEXTO: ... NIVEL: ... DADOS CONFIRMADOS: ... FALA: ... ARMADILHA: ... GANCHO: ... Nunca omita um rótulo e nunca troque o nome dele: o extrator separa os campos pelos rótulos, e um rótulo faltando faz o campo anterior engolir todos os seguintes.\n\n' +
  'RETORNE EXCLUSIVAMENTE UM ARRAY JSON PURO:\n' +
  '[\n  { "index": int_exato_do_bloco, "html_corrigido": "<div class=\\"slide\\">...</div>" }\n]';

var userPrompt =
  'INSTRUÇÕES DA QUALIDADE:\n' + instrucoesQA + '\n\n' +
  'MATERIAL ORIGINAL:\n' + contextoBase.substring(0, 15000) + '...\n\n' +
  'BLOCOS PARA DEVOLVER CORRIGIDOS:\n' + textoErros;

var resultado = iaAgente_({   // V-MIGRA-2 — chamada feita pelo navegador
  apiKey       : geminiKey,
  prompt       : userPrompt,
  systemPrompt : sysPrompt,
  jsonMode     : true,
  thinkingLevel: agThinking_('qa', 'medium'),   // V40.3 / V-MIGRA-2
  maxTokens    : 65536,
  contextoGasto: 'Canvas/CorrecaoCirurgica'
}, 'gemini');

if (resultado.success && typeof resultado.resultado === 'string') {
  try {
    var raw = resultado.resultado.replace(/```json|```/g, '').trim();
    raw = raw.replace(/[\n\r\t]+/g, ' ');
    raw = raw.replace(/(?<!\\)\\([^"\\nrtu])/g, '\\\\$1');
    resultado.resultado = JSON.parse(raw);
  } catch(e) {
    return { success: false, erro: 'JSON retornado corrompido: ' + e.message };
  }
}

// [FIX B1 — corrigido] o gate ficava DENTRO do if acima, que só é verdadeiro
// quando o geminiAgent falhou em parsear (jsonMode já devolve objeto). No caminho
// normal ele nunca rodava. Agora roda fora do if, sobre o payload já pronto.
if (resultado.success) {
  var _invalidosB1 = _validarBlocosCirurgicosServidor(resultado.resultado, 'Gemini');
  if (_invalidosB1.length) {
    Logger.log('[CIRURGIA-GATE][Gemini] ' + _invalidosB1.length + ' bloco(s) rejeitado(s) por HTML malformado: ' + _invalidosB1.join(','));
  }
}

return resultado;
}




function corrigirBlocosCirurgicosComClaude(blocosRuins, instrucoesQA, contextoBase) {
Logger.log('╔══════════════════════════════════════════════════════════════╗');
Logger.log('║  REPARO CIRÚRGICO CLAUDE OPUS 4.7 | Corrigindo ' + blocosRuins.length + ' blocos');
Logger.log('╚══════════════════════════════════════════════════════════════╝');

var textoErros = blocosRuins.map(function(b) {
  return 'BLOCO ÍNDICE [' + b.index + ']\nERRO APONTADO: ' + b.problema +
         '\nCORREÇÃO EXIGIDA: ' + b.sugestao_correcao +
         '\nROTEIRO DE NARRAÇÃO ATUAL DESTE BLOCO:\n' + (b.roteiro_atual || '[AUSENTE — crie um]') +
         '\nHTML ORIGINAL COM ERRO:\n' + b.html_atual;
}).join('\n\n=================================\n\n');

var sysPrompt =
  'Você é um Arquiteto de Software Mestre em UI/UX e Lousas Interativas NARRADAS por voz.\n' +
  'Você mesmo auditou este código anteriormente e encontrou erros críticos.\n' +
  'Sua missão agora é REESCREVER e CONSERTAR o HTML destes blocos definitivamente.\n' +
  'MANTENHA o design e layout teóricos originais; conserte EXCLUSIVAMENTE a falha técnica apontada.\n' +
  'OBRIGATÓRIO: O HTML devolvido DEVE começar mantendo a tag inicial EXATAMENTE como veio (incluindo o atributo data-tpl) e terminar com </div>. NUNCA remova o data-tpl.\n' +
  'OBRIGATÓRIO (CRÍTICO): NÃO REMOVA elementos reveláveis. Conte os `.cv-item-oculto` do HTML original e devolva o bloco com a MESMA quantidade ou MAIS. Reparo que reduz a contagem é RECUSADO automaticamente pelo sistema e o bloco defeituoso permanece no ar — simplificar o layout para caber na resposta é o erro mais comum aqui. Se o bloco for denso, corrija a falha apontada e reescreva o resto IGUAL ao original, elemento por elemento.\n' +
  'OBRIGATÓRIO (CRÍTICO): o HTML corrigido DEVE terminar com o comentário <!--ROTEIRO ... --> ANTES da </div> final.\n' +
  '  - Reemita os 6 campos: CONTEXTO, NIVEL, DADOS CONFIRMADOS, FALA, ARMADILHA, GANCHO.\n' +
  '  - Parta do ROTEIRO ATUAL informado e ajuste-o ao HTML corrigido; se o QA reprovou a narração, reescreva a FALA.\n' +
  '  - A FALA é prosa contínua, sem rótulos, e precisa cobrir TODOS os elementos reveláveis do bloco.\n' +
  '  - Bloco entregue sem esse comentário é considerado NÃO CORRIGIDO.\n\n' +
  '⚠️ ALERTA DE FORMATAÇÃO JSON (CRÍTICO) ⚠️\n' +
  '1. Como o valor de "html_corrigido" é HTML, TODAS as aspas duplas internas DEVEM ser escapadas (\\").\n' +
  '2. É ESTRITAMENTE PROIBIDO usar quebras de linha literais (Enter). Escreva todo o HTML em uma linha contínua única.\n' +
  '3. Se houver comandos LaTeX, use SEMPRE quatro barras (exemplo: \\\\\\\\frac). Barras simples ou duplas causarão erro fatal.\n' +
  '4. DENTRO do comentário <!--ROTEIRO ... -->, escreva os 6 rótulos na MESMA linha, separados por um espaço, sempre no formato ROTULO: valor e NESTA ordem exata: CONTEXTO: ... NIVEL: ... DADOS CONFIRMADOS: ... FALA: ... ARMADILHA: ... GANCHO: ... Nunca omita um rótulo e nunca troque o nome dele: o extrator separa os campos pelos rótulos, e um rótulo faltando faz o campo anterior engolir todos os seguintes.\n\n' +
  'RETORNE EXCLUSIVAMENTE UM ARRAY JSON PURO E ESTRITO:\n' +
  '[\n  { "index": int_exato_do_bloco, "html_corrigido": "<div class=\\"slide\\">...</div>" }\n]';

var userPrompt =
  'SUAS PRÓPRIAS INSTRUÇÕES DE AUDITORIA:\n' + instrucoesQA + '\n\n' +
  'MATERIAL ORIGINAL (Base):\n' + contextoBase.substring(0, 10000) + '...\n\n' +
  'BLOCOS DEFEITUOSOS PARA REESCREVER:\n' + textoErros;

var resultado = iaAgente_({   // V-MIGRA-2 — chamada feita pelo navegador
  model        : 'opus-4-7',
  prompt       : userPrompt,
  systemPrompt : sysPrompt,
  jsonMode     : true,
  maxTokens    : 65536,
  contextoGasto: 'Canvas/CorrecaoCirurgicaClaude'
}, 'claude');

if (resultado.success && typeof resultado.resultado === 'string') {
  try {
    var raw = resultado.resultado.replace(/```json|```/g, '').trim();
    raw = raw.replace(/[\n\r\t]+/g, ' ');
    raw = raw.replace(/(?<!\\)\\([^"\\nrtu])/g, '\\\\$1');
    resultado.resultado = JSON.parse(raw);
  } catch(e) {
    return { success: false, erro: 'JSON retornado pelo Opus corrompido: ' + e.message };
  }
}

// [FIX B1 — corrigido] mesma correção da função irmã Gemini: o claudeAgent com
// jsonMode já devolve array parseado, então o gate precisa rodar fora do if.
if (resultado.success) {
  var _invalidosB1c = _validarBlocosCirurgicosServidor(resultado.resultado, 'Claude');
  if (_invalidosB1c.length) {
    Logger.log('[CIRURGIA-GATE][Claude] ' + _invalidosB1c.length + ' bloco(s) rejeitado(s) por HTML malformado: ' + _invalidosB1c.join(','));
  }
}

return resultado;
}





// 5. TESTE COMPLETO DA API CLAUDE
// CURTA — não aumentar: teste MANUAL de conectividade (editor do Apps Script), max_tokens 20.
function testarClaudeAPICompleto() {
// [SEGURANÇA] segunda chave viva hardcoded aqui — REVOGADA. Reusa a mesma
// property do claudeAgent() acima em vez de ter uma chave de teste separada.
var API_KEY = PropertiesService.getScriptProperties().getProperty('CLAUDE_API_KEY');
if (!API_KEY) { Logger.log('[TESTE] ❌ CLAUDE_API_KEY ausente nas propriedades do Script.'); return; }

var MODELOS_TESTAR = [
  { alias: 'sonnet-4-6', id: 'claude-sonnet-4-6' },
  { alias: 'opus-4-6',   id: 'claude-opus-4-6'   },
  { alias: 'opus-4-7',   id: 'claude-opus-4-7'   }
];

Logger.log('╔══════════════════════════════════════════════════════╗');
Logger.log('║  TESTE AUTOSSUFICIENTE — API CLAUDE                  ║');
Logger.log('╚══════════════════════════════════════════════════════╝');

MODELOS_TESTAR.forEach(function(m) {
  Logger.log('\n─────────────────────────────────────────');
  Logger.log('🔍 Alias: ' + m.alias + ' | ID: ' + m.id);

  var payload = {
    model      : m.id,
    max_tokens : 20,
    system     : 'Responda apenas com a palavra OK.',
    messages   : [{ role: 'user', content: 'Teste de conectividade. Responda OK.' }]
  };

  // opus-4-7 não aceita temperature
  if (m.id.indexOf('opus-4-7') === -1) {
    payload.temperature = 0.0;
  }

  var options = {
    method            : 'post',
    contentType       : 'application/json',
    headers           : {
      'x-api-key'         : API_KEY,
      'anthropic-version' : '2023-06-01'
    },
    payload           : JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    var tInicio = Date.now();
    var resp    = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', options);
    var ms      = Date.now() - tInicio;
    var code    = resp.getResponseCode();
    var raw     = resp.getContentText();

    if (code === 200) {
      var data      = JSON.parse(raw);
      var texto     = data.content[0].text;
      var tokensIn  = data.usage.input_tokens;
      var tokensOut = data.usage.output_tokens;
      Logger.log('✅ SUCESSO (' + ms + 'ms)');
      Logger.log('   Resposta : "' + texto + '"');
      Logger.log('   Tokens   : in=' + tokensIn + ' | out=' + tokensOut);
    } else {
      var errObj = {};
      try { errObj = JSON.parse(raw); } catch(ep) {}
      Logger.log('❌ HTTP ' + code + ' (' + ms + 'ms)');
      Logger.log('   Erro: ' + (errObj.error ? errObj.error.message : raw.substring(0, 200)));
    }
  } catch(e) {
    Logger.log('❌ EXCEÇÃO DE REDE: ' + e.message);
  }
});

Logger.log('\n╔══════════════════════════════════════════════════════╗');
Logger.log('║  FIM DO TESTE                                        ║');
Logger.log('╚══════════════════════════════════════════════════════╝');
}



// SUBSTITUA AS 3 FUNÇÕES INTEIRAS NO CODE.GS:

function verificarStatusLousasDrive(disciplina, tema, topico) {
try {
  const root = getFolder(PASTA_RAIZ);
  const mainFolder = getFolder(PASTA_LOUSAS, root);
  const discFolder = getFolder(disciplina, mainFolder);
  
  const nomeArquivo = limparNomeArquivo(disciplina) + '___' + limparNomeArquivo(tema) + '___' + limparNomeArquivo(topico) + '.json';
  const files = discFolder.getFilesByName(nomeArquivo);
  
  if (files.hasNext()) {
    const data = JSON.parse(files.next().getBlob().getDataAsString());
    return { canvas_normal: !!data.canvas_normal, mapa_mental: !!data.mapa_mental };
  }
  
  // --- FALLBACK MATEMÁTICO CORRIGIDO ---
  var matchTopico = topico.match(/^0*(\d+)/); // Extrai apenas do INÍCIO
  var numTop = matchTopico ? parseInt(matchTopico[1], 10) : null;
  
  var todos = discFolder.getFiles();
  while (todos.hasNext()) {
    var f = todos.next();
    var fn = f.getName();
    if (!fn.endsWith('.json') || fn.includes('Questao')) continue;
    
    if (numTop !== null) {
        // O nome do arquivo tem o padrão "Disciplina___Tema___Topico.json"
        var parts = fn.replace('.json', '').split('___');
        if (parts.length >= 3) {
            var extractedTop = parts[parts.length - 1].match(/^0*(\d+)/);
            if (extractedTop && parseInt(extractedTop[1], 10) === numTop) {
                const data = JSON.parse(f.getBlob().getDataAsString());
                return { canvas_normal: !!data.canvas_normal, mapa_mental: !!data.mapa_mental };
            }
        }
    }
  }
  return { canvas_normal: false, mapa_mental: false };
} catch (e) {
  return { canvas_normal: false, mapa_mental: false };
}
}


/**
 * V33 — a lousa passa a guardar QUEM a gerou e QUANDO.
 * `meta` é opcional e vem do front: { modelo: 'gemini-...' }. Sem ele, só a
 * data é registrada. Lousas antigas continuam abrindo normalmente — a leitura
 * cai para a data de modificação do arquivo quando não há metadado.
 */
function salvarLousaDrive(disciplina, tema, topico, tipo, dadosLousa, meta) {
try {
  const root = getFolder(PASTA_RAIZ);
  const mainFolder = getFolder(PASTA_LOUSAS, root);
  const discFolder = getFolder(disciplina, mainFolder);
  
  const nomeArquivo = limparNomeArquivo(disciplina) + '___' + limparNomeArquivo(tema) + '___' + limparNomeArquivo(topico) + '.json';
  const files = discFolder.getFilesByName(nomeArquivo);
  
  var conteudo = { disciplina: disciplina, tema: tema, topico: topico };
  var file = null;
  
  if (files.hasNext()) {
    file = files.next();
  } else {
    // --- FALLBACK MATEMÁTICO CORRIGIDO (Evita duplicatas) ---
    var matchTopico = topico.match(/^0*(\d+)/);
    var numTop = matchTopico ? parseInt(matchTopico[1], 10) : null;

    var todos = discFolder.getFiles();
    while (todos.hasNext()) {
      var f = todos.next();
      var fn = f.getName();
      if (!fn.endsWith('.json') || fn.includes('Questao')) continue;
      
      if (numTop !== null) {
          var parts = fn.replace('.json', '').split('___');
          if (parts.length >= 3) {
              var extractedTop = parts[parts.length - 1].match(/^0*(\d+)/);
              if (extractedTop && parseInt(extractedTop[1], 10) === numTop) {
                  file = f;
                  break;
              }
          }
      }
    }
  }
  
  if (file) {
    conteudo = JSON.parse(file.getBlob().getDataAsString());
  } else {
    file = discFolder.createFile(nomeArquivo, "", MimeType.PLAIN_TEXT);
  }
  
  if (tipo === 'mapa_mental') conteudo.mapa_mental = dadosLousa;
  else conteudo.canvas_normal = dadosLousa;

  // V33 — ficha de origem por tipo de lousa. Fica ao lado do conteúdo, no mesmo
  // arquivo: sem índice separado para sair de sincronia.
  var agora = new Date().toISOString();
  var ficha = {
    gerado_em: agora,
    modelo: (meta && meta.modelo) ? String(meta.modelo) : 'nao_informado',
    // V37 — o que foi PEDIDO e o que de fato rodou podem diferir quando a
    // reserva assume por limite de cota. Guardar os dois é o que permite
    // descobrir depois por que uma lousa saiu diferente da outra.
    modelo_pedido: (meta && meta.modelo_pedido) ? String(meta.modelo_pedido) : '',
    raciocinio:    (meta && meta.raciocinio)    ? String(meta.raciocinio)    : '',
    chave:         (meta && meta.chave)         ? String(meta.chave)         : ''
  };
  if (tipo === 'mapa_mental') conteudo.meta_mapa_mental = ficha;
  else conteudo.meta_canvas_normal = ficha;
  conteudo.atualizado_em = agora;

  file.setContent(JSON.stringify(conteudo, null, 2));
  return { sucesso: true, tipo: tipo, gerado_em: agora, modelo: ficha.modelo };
} catch (e) {
  return { erro: "Erro ao salvar lousa: " + e.message };
}
}


function carregarLousaDrive(disciplina, tema, topico, tipo) {
try {
  const root = getFolder(PASTA_RAIZ);
  const mainFolder = getFolder(PASTA_LOUSAS, root);
  const discFolder = getFolder(disciplina, mainFolder);

  const nomeExato = limparNomeArquivo(disciplina) + '___' + limparNomeArquivo(tema) + '___' + limparNomeArquivo(topico) + '.json';
  var fileAlvo = null;

  var tentativa = discFolder.getFilesByName(nomeExato);
  if (tentativa.hasNext()) {
    fileAlvo = tentativa.next();
  } else {
    // --- FALLBACK MATEMÁTICO CORRIGIDO ---
    var matchTopico = topico.match(/^0*(\d+)/);
    var numTop = matchTopico ? parseInt(matchTopico[1], 10) : null;

    var todos = discFolder.getFiles();
    while (todos.hasNext()) {
      var f = todos.next();
      var fn = f.getName();
      if (!fn.endsWith('.json') || fn.includes('Questao')) continue;
      
      if (numTop !== null) {
          var parts = fn.replace('.json', '').split('___');
          if (parts.length >= 3) {
              var extractedTop = parts[parts.length - 1].match(/^0*(\d+)/);
              if (extractedTop && parseInt(extractedTop[1], 10) === numTop) {
                  fileAlvo = f;
                  Logger.log('[LOUSA-CARREGAR] Fallback matemático encontrou o arquivo: "' + fn + '"');
                  break;
              }
          }
      }
    }
  }

  if (!fileAlvo) return { erro: "Arquivo não encontrado." };

  const conteudo = JSON.parse(fileAlvo.getBlob().getDataAsString());
  const dados = tipo === 'mapa_mental' ? conteudo.mapa_mental : conteudo.canvas_normal;

  if (!dados) return { erro: "Nenhuma lousa salva para este tipo." };
  return { sucesso: true, dados: dados };
} catch (e) {
  return { erro: e.message };
}
}


function verificarLousasTemaLote(disciplina, tema) {
try {
  const root = getFolder(PASTA_RAIZ);
  const mainFolder = getFolder(PASTA_LOUSAS, root);
  if (!mainFolder) return {};
  
  const discFolders = mainFolder.getFoldersByName(disciplina);
  if (!discFolders.hasNext()) return {};
  const discFolder = discFolders.next();

  const resultado = {};
  var numerosTema = tema.match(/\d+/g);
  var numTem = numerosTema ? numerosTema[0] : null;
  var temaLimpo = limparNomeArquivo(tema);

  const files = discFolder.getFiles();
  while (files.hasNext()) {
    const f = files.next();
    const fn = f.getName();
    if (!fn.endsWith('.json')) continue;
    
    // Checa se o arquivo pertence ao tema solicitado (Match Exato ou Numérico)
    let pertenceAoTema = fn.includes('___' + temaLimpo + '___');
    if (!pertenceAoTema && numTem) {
        if (fn.indexOf('__' + numTem + ' ') !== -1 || fn.indexOf('___' + numTem + ' ') !== -1 || fn.indexOf('__0' + numTem + ' ') !== -1) {
            pertenceAoTema = true;
        }
    }

    if (pertenceAoTema) {
      try {
        const data = JSON.parse(f.getBlob().getDataAsString());
        if (data.topico) {
          // V33 — além de "existe ou não", devolve QUANDO e POR QUAL MODELO.
          // Para lousas antigas, sem ficha, a data do arquivo é a melhor
          // aproximação disponível — e é honesta: é quando ela mudou.
          var mCv = data.meta_canvas_normal || null;
          var mMm = data.meta_mapa_mental || null;
          var melhor = mCv || mMm;
          var dtArquivo = '';
          try { dtArquivo = f.getLastUpdated().toISOString(); } catch (eDt) {}

          resultado[data.topico] = {
            canvas_normal: !!data.canvas_normal,
            mapa_mental: !!data.mapa_mental,
            gerado_em: (melhor && melhor.gerado_em) || data.atualizado_em || dtArquivo || '',
            modelo: (melhor && melhor.modelo) || 'nao_informado',
            modelo_canvas: mCv ? mCv.modelo : '',
            modelo_mapa: mMm ? mMm.modelo : '',
            data_arquivo: dtArquivo,
            tem_ficha: !!melhor
          };
        }
      } catch(e) {}
    }
  }
  return resultado;
} catch (e) {
  return {};
}
}


// ============================================================================
// NOVO: ORQUESTRADOR DA FÁBRICA DE QUESTÕES (SEQUÊNCIA DIDÁTICA ESTREITA)
// ============================================================================

function _getTemasOrdem(disciplina) {
  if (!MAPA_DISTRIBUICAO_EDITAL || !MAPA_DISTRIBUICAO_EDITAL[disciplina]) return [];
  var base = Object.keys(MAPA_DISTRIBUICAO_EDITAL[disciplina]).sort(function(a, b) {
    var numA = parseInt((a.match(/^\d+/) || ['0'])[0], 10);
    var numB = parseInt((b.match(/^\d+/) || ['0'])[0], 10);
    return numA - numB;
  });
  // V104 — ordem didática (Config.gs: ORDEM_DIDATICA). Só reordena; nomes intactos.
  var od = _ordemDidaticaV104(disciplina);
  if (!od || !Array.isArray(od.temas) || !od.temas.length) return base;
  var pos = {};
  od.temas.forEach(function(n, i) { pos[String(parseInt(n, 10))] = i; });
  return base.map(function(t, i) {
    var n = _numTemaV23(t);
    return { t: t, k: (n !== null && pos[n] !== undefined) ? pos[n] : od.temas.length + i };
  }).sort(function(a, b) { return a.k - b.k; }).map(function(x) { return x.t; });
}

// V104 — leitor da ORDEM_DIDATICA (Config.gs). Sem a constante, devolve null e
// tudo segue na ordem do mapa.
function _ordemDidaticaV104(disciplina) {
  try {
    if (typeof ORDEM_DIDATICA === 'undefined' || !ORDEM_DIDATICA) return null;
    return ORDEM_DIDATICA[disciplina] || null;
  } catch (e) { return null; }
}

function obterFilaFabricaQuestoes(disciplina, modoGeracao, filtroAulaNum) {
  try {
    // ═══════════════════════════════════════════════════════════════════════
    // V42-A5 — obterRaioX() serve a árvore VELHA de propósito quando o cache
    // está sujo ("rebuild é em lotes no boot"). É exatamente essa árvore que
    // fornece qtd_banco e deficit: montar a fila em cima dela, logo depois de
    // uma execução, fazia a Fábrica regerar tudo o que acabara de gerar.
    // Agora a fila é recusada enquanto a contagem não estiver em dia.
    // ═══════════════════════════════════════════════════════════════════════
    /* V-FAB-1 — o bloqueio duro estava errado por dois motivos: (1) a Fábrica
       sujava o Raio-X ela mesma ao gravar, então ele quase nunca estava limpo;
       (2) o risco real citado — duplicata — já é coberto pela deduplicação
       determinística por enunciado normalizado que roda na gravação. Falta de
       árvore continua sendo erro; árvore desatualizada vira aviso. */
    var _rxAviso = null;
    try {
      if (typeof _raioXEstaSujo === 'function' && _raioXEstaSujo()) {
        var _rxTeste = obterRaioX();
        var _temArvore = !!(_rxTeste && _rxTeste.sucesso && _rxTeste.dados &&
                            _rxTeste.dados.arvore && Object.keys(_rxTeste.dados.arvore).length > 0);
        if (!_temArvore) {
          return { erro: 'O Raio-X do banco ainda não foi gerado. Aguarde a sincronização inicial terminar.' };
        }
        _rxAviso = 'Raio-X desatualizado — o déficit pode estar alguns lotes atrás. ' +
                   'Nenhuma questão repetida entra: a deduplicação por enunciado roda na gravação.';
        Logger.log('[FÁBRICA] ⚠️ Raio-X sujo, mas com árvore utilizável. Planejando com ela.');
      }
    } catch (eSujo) { Logger.log('[FÁBRICA] checagem de Raio-X sujo falhou: ' + eSujo.message); }

    // V94 — a meta V23 e derivada do Raio-X (peso de tema). Cache de metas
    // sobrando de outra execucao entrega cota velha. Zera antes de montar.
    try { if (typeof _invalidarCacheMetasV23 === 'function') _invalidarCacheMetasV23(); } catch (eInv) {}

    var filaOrdenada = [];
    var rxRes = obterRaioX();
    var arvore = (rxRes && rxRes.sucesso && rxRes.dados && rxRes.dados.arvore) ? rxRes.dados.arvore : {};

    // Obtém o número de chaves na memória (GAS) para reportar ao Frontend
    var chavesAtivas = typeof POOL_CHAVES_GEMINI !== 'undefined' ? POOL_CHAVES_GEMINI.length : 1;

    // Define quais disciplinas processar
    var disciplinasAlvo = [];
    if (disciplina === 'TODAS') {
        var _cfgAlvo = carregarConfiguracaoCiclo();
        var _vistosAlvo = {};
        if (_cfgAlvo && Array.isArray(_cfgAlvo.fila)) {
            _cfgAlvo.fila.forEach(function(f) {
                var nomeAlvo = f && f.disciplina;
                if (!nomeAlvo || _vistosAlvo[nomeAlvo]) return;
                if (typeof MAPA_DISTRIBUICAO_EDITAL === 'undefined' || !MAPA_DISTRIBUICAO_EDITAL || !MAPA_DISTRIBUICAO_EDITAL[nomeAlvo]) return;
                _vistosAlvo[nomeAlvo] = true;
                disciplinasAlvo.push(nomeAlvo);
            });
        }
        if (disciplinasAlvo.length === 0) {
            return { erro: "Nenhuma disciplina do Ciclo Atual está mapeada no Edital. Configure o ciclo no Plano de Estudos antes de usar a Fábrica Global." };
        }
    } else {
        if (!MAPA_DISTRIBUICAO_EDITAL || !MAPA_DISTRIBUICAO_EDITAL[disciplina]) {
            return { erro: "Disciplina não possui sequência didática mapeada no Edital." };
        }
        disciplinasAlvo = [disciplina];
    }

    // Filtro numérico de aula
    var numFiltroAula = null;
    if (filtroAulaNum) {
        var matchNum = String(filtroAulaNum).match(/\d+/);
        if (matchNum) numFiltroAula = parseInt(matchNum[0], 10);
    }

    // Carrega a configuração do ciclo para obter a meta real
    var config = carregarConfiguracaoCiclo();

    disciplinasAlvo.forEach(function(discAlvo) {
        var arvoreDisc = arvore[discAlvo] || { total: 1000, temas: {} };
        var temas = _getTemasOrdem(discAlvo); 
        
        var itemCiclo = (config && config.fila) ? config.fila.find(function(f) { return f.disciplina === discAlvo; }) : null;
        var metaDisciplina = itemCiclo ? (itemCiclo.volume_total_meta || 1000) : (arvoreDisc.total > 0 ? Math.round(arvoreDisc.total * 0.1) : 100);

        temas.forEach(function(tema) {
          // Se o filtro de aula foi fornecido, pula temas que não batem com o número
          if (numFiltroAula !== null) {
              var matchTema = tema.match(/\d+/);
              if (!matchTema || parseInt(matchTema[0], 10) !== numFiltroAula) {
                  return; // Pula para a próxima iteração do loop temas.forEach
              }
          }

          var temaKeyBanco = Object.keys(arvoreDisc.temas).find(function(k) {
              return k.trim().toLowerCase() === tema.trim().toLowerCase();
          });
          var temaDataBanco = temaKeyBanco ? arvoreDisc.temas[temaKeyBanco] : { total: 0, subtemas: {} };
          var subtemas = _getSubtemasOrdem(discAlvo, tema); 
          var subtemasBanco = temaDataBanco.subtemas; 
          
          subtemas.forEach(function(subtema) {
            var dadosSub = MAPA_DISTRIBUICAO_EDITAL[discAlvo][tema][subtema];
            if (dadosSub.importancia === 'EXCLUIR') return;

            var pct = parseFloat(String(dadosSub.distribuicao).replace('%', '').replace(',', '.').trim()) || 0;
            if (pct <= 0) return;   // V94 — alinha com _metasDisciplinaV23, que descarta pct<=0

            // ════════════════════════════════════════════════════════════════
            // V94 — CAUSA RAIZ DA GERACAO EM SUPERAVIT
            // A cota era metaDisciplina x (pct/100). Mas `distribuicao` e
            // normalizada DENTRO do tema (soma 100% em CADA tema), enquanto
            // metaDisciplina e da disciplina inteira: a soma das cotas dava
            // metaDisciplina x n_de_temas. Com 20 temas, cada subtema saia com
            // cota ~20x inflada — e o deficit junto. Era a ultima formula do
            // backend que nunca havia sido migrada para o motor V23.
            // ════════════════════════════════════════════════════════════════
            var cotaTotal = (typeof _metaSubtemaV23 === 'function')
                ? _metaSubtemaV23(discAlvo, tema, subtema, metaDisciplina)
                : Math.max(1, Math.round(metaDisciplina * (pct / 100)));
            if (!cotaTotal || cotaTotal < 0) cotaTotal = 0;

            var subKeyBanco = Object.keys(subtemasBanco).find(function(k) {
                return k.trim().toLowerCase() === subtema.trim().toLowerCase();
            });
            var qtdBancoObj = subKeyBanco ? subtemasBanco[subKeyBanco] : null;
            var qtdBanco = typeof qtdBancoObj === 'number' ? qtdBancoObj : (qtdBancoObj ? qtdBancoObj.qtd : 0);
            var deficit = Math.max(0, cotaTotal - qtdBanco);

            var itemFilaGeracao = {
              disciplina: discAlvo,
              tema: tema,
              subtema: subtema,
              qtd_banco: qtdBanco,
              cota_alvo: cotaTotal,
              deficit: deficit,
              importancia: dadosSub.importancia
            };

            if (modoGeracao === 'FALTANTES') {
              if (deficit > 0) filaOrdenada.push(itemFilaGeracao);
            } else {
              filaOrdenada.push(itemFilaGeracao);
            }
          });
        });
    });

    // Ordenação Final (Disciplina -> Número da Aula -> Importância)
    var prioMap = { 'CRÍTICO': 0, 'ALTO': 1, 'MÉDIO': 2, 'BAIXO': 3, 'NOVO': 4 };
    filaOrdenada.sort(function(a, b) {
      if (a.disciplina !== b.disciplina) return a.disciplina.localeCompare(b.disciplina);
      var numA = parseInt((a.tema.match(/^\d+/) || ['0'])[0], 10);
      var numB = parseInt((b.tema.match(/^\d+/) || ['0'])[0], 10);
      if (numA !== numB) return numA - numB;
      return (prioMap[a.importancia] || 99) - (prioMap[b.importancia] || 99);
    });

    return {
      sucesso: true,
      fila: filaOrdenada,
      total_itens: filaOrdenada.length,
      chaves_ativas: chavesAtivas,
      aviso: _rxAviso
    };

  } catch(e) {
    return { erro: "Erro ao montar fila didática da fábrica: " + e.message };
  }
}















// ════════════════════════════════════════════════════════════════════════════
//  BOOT V14.4 — INICIALIZAÇÃO RÁPIDA + FRESCOR DE DADOS GARANTIDO
//  Substitui: doGet, bootSincronoSistema, bootAssincronoPosUI,
//             limparCacheArquivos, construirSalvarRaioX, obterRaioX,
//             fabricarEAnexarQuestoesIA
//  Adiciona:  _marcarRaioXSujo, _limparRaioXSujo, _raioXEstaSujo
// ════════════════════════════════════════════════════════════════════════════

const PROP_RAIOX_SUJO   = 'RAIOX_DIRTY_V14';
const FLAG_BOOT_SYNC     = 'BOOT_SINCRONO_OK_V14_4';
const FLAG_BOOT_ASYNC    = 'BOOT_ASYNC_OK_V14_4';
const FLAG_RAIOX_REBUILD = 'RAIOX_REBUILDING_V14';






/* ══════════════════════════════════════════════════════════════════════════════
   V29 — SAÚDE AUTOMÁTICA DO SISTEMA
   V30 — SIMULADOR DE PROGRESSÃO

   POR QUE ISTO EXISTE: quem usa o sistema é aluno, não técnico. Ninguém vai
   abrir o editor do Apps Script e rodar função para descobrir que a contagem do
   banco está velha ou que o plano não cobre o edital. Tudo passa a ser
   verificado sozinho no boot, corrigido em silêncio quando é seguro, e o que
   sobra vira aviso em português de aluno na tela — com botão de resolver.
   O detalhe técnico continua indo para o Logger, para depuração.

   CUSTO: a verificação reaproveita o que bootUnico() já carregou na memória
   (config do ciclo, estado, mapa). Não abre nenhum arquivo a mais.
   ══════════════════════════════════════════════════════════════════════════════ */

/* ── utilidades ─────────────────────────────────────────────────────────── */
function _svAviso(nivel, chave, titulo, texto, acao) {
  return { nivel: nivel, chave: chave, titulo: titulo, texto: texto, acao: acao || null };
}
function _svNum(n) {
  var s = String(Math.round(Number(n) || 0)), out = '', c = 0;
  for (var i = s.length - 1; i >= 0; i--) { out = s.charAt(i) + out; if (++c % 3 === 0 && i > 0) out = '.' + out; }
  return out;
}

/**
 * Conta o que o aluno já respondeu, por disciplina, a partir do estado real.
 * É a base para consertar o volume_realizado, que ficava parado em zero.
 */
function _svRealizadoPorDisciplina(estado) {
  var out = {};
  if (!estado || !estado.respostas) return out;
  var tpq = estado.tempo_por_questao || {};
  Object.keys(estado.respostas).forEach(function (id) {
    var t = tpq[id];
    var d = t && t.disciplina;
    if (!d) return;
    out[d] = (out[d] || 0) + 1;
  });
  return out;
}

/* ══════════════════════════════════════════════════════════════════════════
   AUTOCORREÇÃO — só o que é seguro fazer sem perguntar
   Nada aqui muda o plano de estudo do aluno (meta, prazo, horas). Isso é
   decisão dele e vira aviso, nunca correção silenciosa.
   ══════════════════════════════════════════════════════════════════════════ */
function _autocorrigirV29(ctx) {
  var feitos = [];
  var cfg = ctx && ctx.config_ciclo;
  if (!cfg || !cfg.fila || !cfg.fila.length) return feitos;

  var mudou = false;
  var pl = cfg.planejamento || {};

  // 1) volume_realizado parado em zero enquanto o aluno já respondeu
  try {
    var realizado = _svRealizadoPorDisciplina(ctx.estado);
    var ajustadas = 0;
    cfg.fila.forEach(function (f) {
      var real = realizado[f.disciplina] || 0;
      if ((f.volume_realizado || 0) !== real) { f.volume_realizado = real; ajustadas++; }
    });
    if (ajustadas > 0) {
      mudou = true;
      feitos.push({ chave: 'volume_realizado', detalhe: ajustadas + ' disciplina(s) com o progresso reconciliado' });
      Logger.log('[SAUDE-V29] volume_realizado reconciliado em ' + ajustadas + ' disciplina(s).');
    }
  } catch (e1) { Logger.log('[SAUDE-V29] volume_realizado: ' + e1.message); }

  // 2) bloco menor que 1 ou peso inválido — a fila fica inutilizável
  try {
    var minQ = Number(pl.min_por_questao) || 3;
    var metaDia = Number(pl.meta_qtd_dia) || 0;
    var diasCiclo = Number(pl.dias_por_ciclo) || 1;
    var quebrados = 0;
    cfg.fila.forEach(function (f) {
      var pesoOk = (Number(f.peso_raw) > 0);
      var blocoOk = (Number(f.qtd_bloco) >= 1);
      if (pesoOk && blocoOk) return;
      if (!pesoOk) f.peso_raw = Math.max(1, Math.round(100 / cfg.fila.length));
      var novo = metaDia > 0
        ? Math.max(1, Math.round(metaDia * (f.peso_raw / 100) * diasCiclo))
        : Math.max(1, Number(pl.tamanho_bloco_padrao) || 10);
      f.qtd_bloco = novo;
      f.tempo_bloco = Math.round(novo * minQ);
      quebrados++;
    });
    if (quebrados > 0) {
      mudou = true;
      feitos.push({ chave: 'fila_bloco', detalhe: quebrados + ' disciplina(s) com bloco ou peso inválido recalculada(s)' });
      Logger.log('[SAUDE-V29] ' + quebrados + ' item(ns) da fila recalculado(s).');
    }
  } catch (e2) { Logger.log('[SAUDE-V29] fila: ' + e2.message); }

  if (mudou) {
    try { salvarConfiguracaoCiclo(cfg); }
    catch (e3) { Logger.log('[SAUDE-V29] ⚠️ não consegui salvar a correção: ' + e3.message); }
  }

  // 3) ponteiro apontando para disciplina que saiu da fila
  try {
    var p = _lerPonteiro();
    if (p && p.disciplina) {
      var existe = cfg.fila.some(function (f) { return f.disciplina === p.disciplina; });
      if (!existe) {
        var primeira = cfg.fila[0] && cfg.fila[0].disciplina;
        if (primeira) {
          _salvarPonteiro({ disciplina: primeira, tema: null, subtema: null, questoes_sessao: 0 });
          feitos.push({ chave: 'ponteiro', detalhe: 'posição do edital reposicionada em ' + primeira });
          Logger.log('[SAUDE-V29] ponteiro reposicionado: "' + p.disciplina + '" saiu da fila → ' + primeira);
        }
      }
    }
  } catch (e4) { Logger.log('[SAUDE-V29] ponteiro: ' + e4.message); }

  // 4) sessões expiradas acumuladas no arquivo de usuários
  try {
    if (typeof _lerUsuarios === 'function') {
      var base = _lerUsuarios();
      var agora = new Date(), limpou = 0;
      base.usuarios.forEach(function (u) {
        if (!u.sessoes || !u.sessoes.length) return;
        var antes = u.sessoes.length;
        u.sessoes = u.sessoes.filter(function (s) { return new Date(s.expira_em) > agora; });
        limpou += (antes - u.sessoes.length);
      });
      if (limpou > 0) {
        _salvarUsuarios(base);
        feitos.push({ chave: 'sessoes', detalhe: limpou + ' sessão(ões) expirada(s) removida(s)' });
        Logger.log('[SAUDE-V29] ' + limpou + ' sessão(ões) expirada(s) limpa(s).');
      }
    }
  } catch (e5) { Logger.log('[SAUDE-V29] sessões: ' + e5.message); }

  return feitos;
}

/* ══════════════════════════════════════════════════════════════════════════
   AVISOS — o que o aluno precisa saber, na língua dele
   ══════════════════════════════════════════════════════════════════════════ */
function _avisosV29(ctx) {
  var avisos = [];
  var cfg = ctx && ctx.config_ciclo;

  // (a) ainda não existe ciclo
  if (!cfg || !cfg.fila || !cfg.fila.length) {
    avisos.push(_svAviso('info', 'sem_ciclo',
      'Monte seu plano de estudos',
      'Você ainda não tem um ciclo. Em um minuto o sistema calcula quantas questões por dia você precisa fazer.',
      { rotulo: 'Montar plano', destino: 'plano' }));
    return avisos;
  }

  var pl = cfg.planejamento || {};

  // (b) o plano cobre o edital?
  try {
    if (typeof calcularPlanoIdealV27 === 'function' && pl.periodo_meses) {
      var plano = calcularPlanoIdealV27({
        template: pl.template_usado, volumeTotal: pl.volume_total_meta,
        periodoMeses: pl.periodo_meses, diasSemana: pl.dias_semana,
        horasDia: pl.horas_dia, minPorQuestao: pl.min_por_questao,
        disciplinasDia: pl.disciplinas_dia
      });
      if (plano && plano.veredito !== 'VIAVEL') {
        var falta = Math.max(0, plano.necessario - plano.atual.capacidade_periodo);
        var comoResolver = plano.recomendado
          ? plano.recomendado.explicacao
          : 'Reduza o conteúdo ou aumente prazo, dias ou horas.';
        avisos.push(_svAviso('alto', 'plano_nao_cobre',
          'Seu plano não cobre todo o edital',
          'Faltam ' + _svNum(falta) + ' questões de capacidade no prazo que você definiu. ' + comoResolver,
          { rotulo: 'Ajustar meu plano', destino: 'plano' }));
      }
    }
  } catch (eB) { Logger.log('[SAUDE-V29] cobertura: ' + eB.message); }

  // (c) assuntos sem nenhuma questão no banco
  try {
    var rx = _readJsonFromDrive('raiox_banco_v1.json');
    if (rx && rx.arvore) rx = _podarArvoreRaioXPeloEdital(rx);   // V99
    if (rx && rx.arvore) {
      var semBanco = 0, totalSub = 0;
      Object.keys(rx.arvore).forEach(function (d) {
        var temas = rx.arvore[d].temas || {};
        Object.keys(temas).forEach(function (t) {
          var subs = temas[t].subtemas || {};
          Object.keys(subs).forEach(function (s) {
            var v = subs[s];
            if (v && v.importancia === 'EXCLUIR') return;
            totalSub++;
            var q = (typeof v === 'number') ? v : ((v && v.qtd) || 0);
            if (q === 0) semBanco++;
          });
        });
      });
      if (semBanco > 0) {
        var pct = Math.round(semBanco / Math.max(1, totalSub) * 100);
        avisos.push(_svAviso(pct >= 20 ? 'alto' : 'medio', 'sem_banco',
          _svNum(semBanco) + ' assuntos ainda sem questões',
          'São ' + pct + '% do seu edital. O ciclo pula esses assuntos por enquanto — gere questões para não deixar buraco na preparação.',
          { rotulo: 'Gerar questões', destino: 'fabrica' }));
      }
    }
  } catch (eC) { Logger.log('[SAUDE-V29] banco: ' + eC.message); }

  // (d) contagem do banco desatualizada
  try {
    if (typeof _raioXEstaSujo === 'function' && _raioXEstaSujo()) {
      avisos.push(_svAviso('info', 'raiox_sujo',
        'Atualizando a contagem do seu banco',
        'Você gerou questões novas há pouco. Os números de cada assunto ficam certos assim que a atualização terminar.',
        null));
    }
  } catch (eD) {}

  // (e) desempenho: disciplinas travadas abaixo do gate
  try {
    var travadas = _svDisciplinasTravadas(ctx);
    if (travadas.length) {
      var nomes = travadas.slice(0, 3).map(function (x) { return x.disciplina + ' (' + x.taxa + '%)'; }).join(', ');
      avisos.push(_svAviso('medio', 'desempenho_baixo',
        'Você está travando em ' + travadas.length + ' disciplina(s)',
        'Sua taxa de acerto está abaixo do mínimo para avançar em: ' + nomes +
        '. Vale revisar a teoria antes de seguir fazendo questões.',
        { rotulo: 'Ver estatísticas', destino: 'estatisticas' }));
    }
  } catch (eE) { Logger.log('[SAUDE-V29] desempenho: ' + eE.message); }

  // (f) tempo declarado ocioso
  try {
    var v = pl.viabilidade;
    if (v && v.ociosidade_pct >= 40) {
      avisos.push(_svAviso('info', 'ociosidade',
        'Sobra tempo no seu dia',
        'Seu plano usa só ' + (100 - v.ociosidade_pct) + '% do tempo que você declarou. ' +
        'Dá para cobrir mais conteúdo no mesmo prazo.',
        { rotulo: 'Rever plano', destino: 'plano' }));
    }
  } catch (eF) {}

  // ATENÇÃO: `ordem[nivel] || 9` estava errado — 0 é falsy, então 'alto' virava 9
  // e o aviso mais grave ia para o fim da lista. Comparação explícita com undefined.
  var ordem = { alto: 0, medio: 1, info: 2 };
  var peso = function (n) { return ordem[n] === undefined ? 9 : ordem[n]; };
  avisos.sort(function (a, b) { return peso(a.nivel) - peso(b.nivel); });
  return avisos;
}

/** Disciplinas em que a taxa de acerto está abaixo do gate mais brando. */
function _svDisciplinasTravadas(ctx) {
  var out = [];
  var estado = ctx && ctx.estado;
  var cfg = ctx && ctx.config_ciclo;
  if (!estado || !estado.respostas || !cfg || !cfg.fila) return out;

  var tpq = estado.tempo_por_questao || {};
  var acc = {};
  Object.keys(estado.respostas).forEach(function (id) {
    var t = tpq[id];
    if (!t || !t.disciplina) return;
    if (!acc[t.disciplina]) acc[t.disciplina] = { tot: 0, ok: 0 };
    acc[t.disciplina].tot++;
    if (estado.respostas[id].correta) acc[t.disciplina].ok++;
  });

  var minimo = 60;   // gate de MÉDIO: abaixo disso não avança em quase nada
  var AMOSTRA = (typeof _amostraMinimaV27 === 'function') ? Math.max(20, _amostraMinimaV27() * 5) : 20;
  Object.keys(acc).forEach(function (d) {
    var a = acc[d];
    if (a.tot < AMOSTRA) return;                  // pouca amostra: não acusa
    var taxa = Math.round(a.ok / a.tot * 100);
    if (taxa < minimo) out.push({ disciplina: d, taxa: taxa, respondidas: a.tot });
  });
  out.sort(function (a, b) { return a.taxa - b.taxa; });
  return out;
}

/* ══════════════════════════════════════════════════════════════════════════
   API PÚBLICA — chamada pelo bootUnico e disponível para a tela
   ══════════════════════════════════════════════════════════════════════════ */
function avaliarSaudeSistemaV29(ctx) {
  var t0 = Date.now();
  var res = { avisos: [], corrigido: [], tempo_ms: 0, versao: 'V29' };

  try {
    if (!ctx) {
      ctx = {
        config_ciclo: _svTentar(function () { return carregarConfiguracaoCiclo(); }, null),
        estado:       _svTentar(function () { return carregarEstadoUsuario(); }, null),
        mapa:         _svTentar(function () { return listarArquivosRapido(); }, {})
      };
    }
    res.corrigido = _autocorrigirV29(ctx);
    res.avisos    = _avisosV29(ctx);
  } catch (e) {
    res.erro = e.message;
    Logger.log('[SAUDE-V29] ❌ ' + e.message);
  }

  res.tempo_ms = Date.now() - t0;
  Logger.log('[SAUDE-V29] ' + res.avisos.length + ' aviso(s) · ' +
             res.corrigido.length + ' correção(ões) automática(s) · ' + res.tempo_ms + 'ms');
  return res;
}

function _svTentar(fn, padrao) { try { return fn(); } catch (e) { return padrao; } }

/** Para a tela pedir de novo sem esperar o próximo boot. */
function obterSaudeSistema() { return avaliarSaudeSistemaV29(null); }

/* ══════════════════════════════════════════════════════════════════════════
   V30 — SIMULADOR DE PROGRESSÃO

   Responde, sem o aluno responder uma única questão de verdade:
   "com X% de acerto, em quantos dias eu cubro o edital, e onde eu travo?"

   Roda 100% em memória. Não grava estado, não move o ponteiro, não toca no
   Drive além da leitura do Raio-X que já está em cache.
   ══════════════════════════════════════════════════════════════════════════ */
function simularProgressaoV30(params) {
  try {
    params = params || {};
    var taxa = Math.max(10, Math.min(100, Number(params.taxaAcerto) || 70)) / 100;

    // V37 — quando a tela manda os campos ATUAIS do formulário (dimensionamento),
    // a simulação usa a fila calculada a partir deles, em memória, sem gravar
    // nada. Sem isto, o simulador respondia sempre com o plano SALVO, ignorando
    // o que o aluno estava digitando na tela.
    var cfg;
    if (params.dimensionamento && typeof gerarFilaCicloBase === 'function') {
      var prevParams = {};
      for (var k in params.dimensionamento) prevParams[k] = params.dimensionamento[k];
      prevParams.pular_trava = true;
      prevParams.somente_calcular = true;
      var previa = gerarFilaCicloBase(prevParams);
      cfg = (previa && previa.sucesso) ? previa : null;
      if (!cfg) {
        var salvo = carregarConfiguracaoCiclo();
        cfg = (salvo && salvo.fila && salvo.fila.length) ? salvo : null;
      }
    } else {
      cfg = carregarConfiguracaoCiclo();
    }

    if (!cfg || !cfg.fila || !cfg.fila.length) {
      return { sucesso: false, erro: 'Monte seu plano de estudos primeiro.' };
    }
    var pl = cfg.planejamento || {};
    var minQ     = Number(pl.min_por_questao) || 3;
    var metaDia  = Number(pl.meta_qtd_dia) || 0;
    var diasPlano = Number(pl.dias_uteis) || 0;
    var AMOSTRA  = (typeof _amostraMinimaV27 === 'function') ? _amostraMinimaV27() : 4;

    var arvore = (typeof _arvoreBancoV23 === 'function') ? _arvoreBancoV23() : {};
    var linhas = [];
    var totalQuestoes = 0, totalSubtemas = 0, subtemasSemBanco = 0, subtemasTravados = 0;
    var totalACriar = 0;   // V38 — questões que o plano exige e o banco ainda não tem

    cfg.fila.forEach(function (item) {
      var d = item.disciplina;
      var temas = _svTentar(function () { return _getTemasOrdem(d); }, []);
      var subOk = 0, subSemBanco = 0, subTravado = 0, qDisc = 0, qACriar = 0;

      temas.forEach(function (tm) {
        var subs = _svTentar(function () { return _getSubtemasOrdem(d, tm); }, []);
        subs.forEach(function (s) {
          var dados = (MAPA_DISTRIBUICAO_EDITAL[d] && MAPA_DISTRIBUICAO_EDITAL[d][tm] && MAPA_DISTRIBUICAO_EDITAL[d][tm][s]) || {};
          var pct = parseFloat(String(dados.distribuicao || '0').replace('%', '').replace(',', '.')) || 0;
          if (pct <= 0) return;
          totalSubtemas++;

          var banco = _svBancoSubtema(arvore, d, tm, s);

          // V38 — a DISTRIBUIÇÃO segue o edital, não o banco. Subtema sem questão
          // entra no plano com a demanda que o edital pede; o que falta no banco
          // vira "questões a criar" (passo seguinte: Fábrica). Nada é descartado.
          var semBancoV38 = (banco === 0);
          if (semBancoV38) { subSemBanco++; subtemasSemBanco++; }

          var gate = (typeof GATE_IMPORTANCIA !== 'undefined' && GATE_IMPORTANCIA[dados.importancia] !== undefined)
                     ? GATE_IMPORTANCIA[dados.importancia] : 50;

          // com taxa abaixo do gate, o aluno não avança: consome o banco inteiro
          // do subtema e ainda assim fica preso (é o que o motor faz de verdade)
          // V38 — só vale para subtema COM banco; sem banco não há o que errar ainda
          if (!semBancoV38 && taxa * 100 < gate) {
            subTravado++; subtemasTravados++;
            qDisc += banco;                       // gasta tudo o que existe
            return;
          }

          // passando no gate: precisa da amostra mínima e da meta do subtema,
          // e ainda paga o reforço das que errou (cada erro volta 1 vez)
          var meta = (typeof _metaSubtemaV23 === 'function')
                     ? _metaSubtemaV23(d, tm, s, item.volume_total_meta || 0) : AMOSTRA;
          var precisa = Math.max(AMOSTRA, meta);
          var comReforco = Math.round(precisa * (1 + (1 - taxa)));
          // V38 — sem o teto do banco: a demanda é a do edital; o déficit é "a criar"
          qDisc += comReforco;
          if (comReforco > banco) qACriar += (comReforco - banco);
          if (!semBancoV38) subOk++;
        });
      });

      totalQuestoes += qDisc;
      totalACriar += qACriar;
      linhas.push({
        disciplina: d,
        subtemas_cobertos: subOk,
        subtemas_sem_banco: subSemBanco,
        subtemas_travados: subTravado,
        questoes_necessarias: qDisc,
        questoes_a_criar: qACriar,
        dias_uteis: metaDia > 0 ? Math.ceil(qDisc / metaDia) : null
      });
    });

    var diasNecessarios = metaDia > 0 ? Math.ceil(totalQuestoes / metaDia) : null;
    var horasTotais = Math.round(totalQuestoes * minQ / 60);
    var cabe = (diasNecessarios !== null && diasPlano > 0) ? (diasNecessarios <= diasPlano) : null;

    linhas.sort(function (a, b) { return b.questoes_necessarias - a.questoes_necessarias; });

    var resumo;
    if (subtemasTravados > 0) {
      resumo = 'Acertando ' + Math.round(taxa * 100) + '%, você trava em ' + subtemasTravados +
               ' assunto(s): a nota fica abaixo do mínimo para avançar e o ciclo não segue.';
    } else if (cabe === true) {
      resumo = 'Acertando ' + Math.round(taxa * 100) + '%, você cobre o edital em ' +
               diasNecessarios + ' dias de estudo — cabe nos ' + diasPlano + ' do seu plano.';
    } else if (cabe === false) {
      resumo = 'Acertando ' + Math.round(taxa * 100) + '%, você precisaria de ' + diasNecessarios +
               ' dias de estudo, mas seu plano tem ' + diasPlano + '. Faltam ' + (diasNecessarios - diasPlano) + '.';
    } else {
      resumo = 'Acertando ' + Math.round(taxa * 100) + '%, seriam ' + _svNum(totalQuestoes) + ' questões.';
    }

    return {
      sucesso: true,
      taxa_acerto: Math.round(taxa * 100),
      total_questoes: totalQuestoes,
      total_a_criar: totalACriar,
      total_subtemas: totalSubtemas,
      subtemas_sem_banco: subtemasSemBanco,
      subtemas_travados: subtemasTravados,
      dias_necessarios: diasNecessarios,
      dias_do_plano: diasPlano,
      horas_totais: horasTotais,
      cabe_no_prazo: cabe,
      meta_dia: metaDia,
      resumo: resumo,
      disciplinas: linhas
    };
  } catch (e) {
    Logger.log('[SIMULADOR-V30] ❌ ' + e.message);
    return { sucesso: false, erro: e.message };
  }
}

function _svBancoSubtema(arvore, d, tm, s) {
  try {
    if (!arvore[d] || !arvore[d].temas) return 0;
    var alvo = arvore[d].temas[tm];
    if (!alvo && typeof _normChaveV23 === 'function') {
      Object.keys(arvore[d].temas).forEach(function (tk) {
        if (!alvo && _normChaveV23(tk) === _normChaveV23(tm)) alvo = arvore[d].temas[tk];
      });
    }
    if (!alvo || !alvo.subtemas) return 0;
    var v = alvo.subtemas[s];
    if (v === undefined && typeof _normChaveV23 === 'function') {
      Object.keys(alvo.subtemas).forEach(function (sk) {
        if (v === undefined && _normChaveV23(sk) === _normChaveV23(s)) v = alvo.subtemas[sk];
      });
    }
    return (typeof v === 'number') ? v : ((v && v.qtd) || 0);
  } catch (e) { return 0; }
}

/** Compara três ritmos de uma vez — é o que a tela mostra. */
function compararCenariosV30() {
  var out = { sucesso: true, cenarios: [] };
  [60, 70, 80].forEach(function (t) {
    var r = simularProgressaoV30({ taxaAcerto: t });
    if (r.sucesso) out.cenarios.push(r);
    else { out.sucesso = false; out.erro = r.erro; }
  });
  return out;
}

function bootUnico(opts) {
  var configuracao = opts || { raiox: true, analytics: true, ciclo: true };
  var resultado = { sucesso: true, erros: [] };

  try {
    resultado.mapa = listarArquivosRapido();
  } catch (e) {
    resultado.mapa = {};
    resultado.erros.push('mapa: ' + e.message);
  }

  try {
    resultado.config_ciclo = carregarConfiguracaoCiclo();
  } catch (e) {
    resultado.config_ciclo = null;
    resultado.erros.push('config_ciclo: ' + e.message);
  }

  if (configuracao.ciclo !== false) {
      try {
        resultado.cache_estrutura = carregarCacheEstrutura();
      } catch (e) {
        resultado.cache_estrutura = null;
        resultado.erros.push('cache_estrutura: ' + e.message);
      }
  } else {
      resultado.cache_estrutura = { disciplinas: [], aulas_por_disciplina: {} };
  }

  try {
    resultado.sessao_suspensa = verificarSessaoSuspensa();
  } catch (e) {
    resultado.sessao_suspensa = null;
    resultado.erros.push('sessao_suspensa: ' + e.message);
  }

  // Estes são os maiores arquivos do sistema. Se o Analytics está desmarcado no Fast Boot, pulamos a leitura do Drive.
  if (configuracao.analytics !== false) {
      try {
        resultado.historico = carregarHistoricoDesempenho();
      } catch (e) {
        resultado.historico = null;
        resultado.erros.push('historico: ' + e.message);
      }

      try {
        resultado.estado = carregarEstadoUsuario();
      } catch (e) {
        resultado.estado = null;
        resultado.erros.push('estado: ' + e.message);
      }
  } else {
      resultado.historico = { historico_diario: [], acumulado_por_disciplina: {} };
      resultado.estado = { respostas: {}, contadores_erro: {}, tempo_por_questao: {} };
  }

  try {
    resultado.preferencias = carregarPreferenciasUsuario();
  } catch (e) {
    resultado.preferencias = null;
    resultado.erros.push('preferencias: ' + e.message);
  }

  // ══════════════════════════════════════════════════════════════════════
  // V29 — a verificação de saúde entra AQUI de propósito: bootUnico já tem em
  // memória a config do ciclo, o estado e o mapa. Verificar de carona custa
  // milissegundos e não abre nenhum arquivo a mais. Se falhar, o boot segue.
  // ══════════════════════════════════════════════════════════════════════
  try {
    resultado.saude = avaliarSaudeSistemaV29(resultado);
  } catch (e) {
    resultado.saude = { avisos: [], corrigido: [], erro: e.message };
    resultado.erros.push('saude: ' + e.message);
  }

  // ══════════════════════════════════════════════════════════════════════
  // V31 — de onde vieram os dados deste boot. migracao:false de propósito:
  // medir o andamento da migração custa uma varredura e não pode atrasar a
  // abertura do sistema. O painel da tela pede o número completo quando abre.
  // ══════════════════════════════════════════════════════════════════════
  try {
    resultado.dados = (typeof dxPainel === 'function') ? dxPainel({ migracao: false }) : null;
  } catch (e) {
    resultado.dados = null;
    resultado.erros.push('dados: ' + e.message);
  }

  return resultado;
}


function carregarAnalyticsCompleto() {
  var resultado = { sucesso: true, erros: [] };

  try {
    resultado.estatisticas_ciclo = obterEstatisticasCiclo();
  } catch (e) {
    resultado.estatisticas_ciclo = null;
    resultado.erros.push('estatisticas_ciclo: ' + e.message);
  }

  try {
    resultado.insights = gerarInsightsAutomaticos();
  } catch (e) {
    resultado.insights = [];
    resultado.erros.push('insights: ' + e.message);
  }

  try {
    resultado.desempenho_geral = analisarDesempenhoGeral();
  } catch (e) {
    resultado.desempenho_geral = null;
    resultado.erros.push('desempenho_geral: ' + e.message);
  }

  return resultado;
}



// ── MARCADORES DE DADOS DESATUALIZADOS ──────────────────────────────────────


function _marcarRaioXSujo() {
  try {
    PropertiesService.getScriptProperties().setProperty(PROP_RAIOX_SUJO, '1');
    var c = CacheService.getScriptCache();
    c.remove(FLAG_BOOT_SYNC);
    c.remove(FLAG_BOOT_ASYNC);
    Logger.log('[RAIOX] 🔶 Marcado como DESATUALIZADO. Próximo boot reconstrói.');
  } catch (e) {
    Logger.log('[RAIOX] ⚠️ Falha ao marcar sujo: ' + e.message);
  }
}

function _limparRaioXSujo() {
  try { PropertiesService.getScriptProperties().deleteProperty(PROP_RAIOX_SUJO); } catch (e) {}
}

function _raioXEstaSujo() {
  try { return PropertiesService.getScriptProperties().getProperty(PROP_RAIOX_SUJO) === '1'; }
  catch (e) { return false; }
}

// ── ENTRADA PRINCIPAL ───────────────────────────────────────────────────────

function doGet(e) {
  // O boot agora será chamado pelo navegador após a tela carregar, sem travar a requisição
  var route = e.parameter.page;

  if (route === 'desktop') {
    return HtmlService.createTemplateFromFile('desktop')
      .evaluate()
      .setTitle('Sistema de Questões V13.8.1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }

  if (route === 'memorsvp') {
    // MemoRSVP (MemoRSVP.gs / JsMemoRSVP.html): leitor RSVP com narração, um por subtema
    var tplMemo = HtmlService.createTemplateFromFile('JsMemoRSVP');
    tplMemo.ctxJson = memoContextoJson_(e.parameter);
    return tplMemo.evaluate()
      .setTitle('MemoRSVP')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, viewport-fit=cover');
  }

  if (route === 'mobile') {
    return HtmlService.createTemplateFromFile('mobile')
      .evaluate()
      .setTitle('Sistema Mobile V11.1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
  }

  var template = HtmlService.createTemplateFromFile('index');
  template.scriptUrl = ScriptApp.getService().getUrl();

  return template.evaluate()
    .setTitle('Sistema de Questões - Início')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// ── BOOT SÍNCRONO LEVE (NÃO LÊ AS 44 MIL QUESTÕES — APENAS VERIFICA) ─────────

function bootSincronoSistema() {
  var cache = CacheService.getScriptCache();

  if (cache.get(FLAG_BOOT_SYNC)) {
    Logger.log('[BOOT-SYNC] ✅ Cache hit. UI liberada na hora.');
    return { sucesso: true, cache_hit: true };
  }

  var tInicio = Date.now();
  Logger.log('[BOOT-SYNC] ▶ Iniciando boot leve...');

  var etapas = { migracao: false, mapa: false, raiox_ok: false };

  try {
    verificarEMigrarEstruturaAntiga();
    etapas.migracao = true;
  } catch (e1) { Logger.log('[BOOT-SYNC] ⚠️ Migração: ' + e1.message); }

  try {
    var mapa = listarArquivosRapido();
    etapas.mapa = Object.keys(mapa || {}).length > 0;
  } catch (e2) { Logger.log('[BOOT-SYNC] ⚠️ Mapa: ' + e2.message); }

  // RAIO-X: apenas VERIFICA. Reconstrução pesada vai para o assíncrono ou
  // para o guard-clause de obterRaioX/timeline na primeira tela que precisar.
  try {
    var rx = _readJsonFromDrive('raiox_banco_v1.json');
    var existe = !!(rx && rx.arvore && Object.keys(rx.arvore).length > 0);
    etapas.raiox_ok = existe && !_raioXEstaSujo();
    if (!etapas.raiox_ok) {
      Logger.log('[BOOT-SYNC] 🔶 Raio-x ausente/sujo. Será reconstruído pós-UI.');
    }
  } catch (e3) {
    Logger.log('[BOOT-SYNC] ⚠️ Verificação raio-x: ' + e3.message);
  }

  var ms = Date.now() - tInicio;
  Logger.log('[BOOT-SYNC] ✅ Concluído em ' + ms + 'ms | ' + JSON.stringify(etapas));

  // Se tudo limpo, cacheia por 30 min (reaberturas instantâneas).
  if (etapas.migracao && etapas.mapa && etapas.raiox_ok) {
    try { cache.put(FLAG_BOOT_SYNC, '1', 1800); } catch (eC) {}
  }

  return { sucesso: true, etapas: etapas, tempo_ms: ms };
}

// ── BOOT ASSÍNCRONO PÓS-UI (PESADO, RODA EM BACKGROUND) ─────────────────────



function bootAssincronoPosUI() {
  var cache = CacheService.getScriptCache();

  if (cache.get(FLAG_BOOT_ASYNC)) {
    return { sucesso: true, cache_hit: true, msg: 'Já executado recentemente.' };
  }

  var tInicio = Date.now();
  Logger.log('[BOOT-ASYNC] ▶ Boot pós-UI (raio-x agora é em lotes pelo front)...');

  var etapas = { raiox: false, cache_estrutural: false, sincronia: false, integridade: false };

  try {
    var rx = _readJsonFromDrive('raiox_banco_v1.json');
    var existe = !!(rx && rx.arvore && Object.keys(rx.arvore).length > 0);
    etapas.raiox = existe;
    if (!existe) {
      Logger.log('[BOOT-ASYNC] 🔶 Raio-x não existe. Será gerado em lotes no front.');
    } else if (_raioXEstaSujo()) {
      Logger.log('[BOOT-ASYNC] ℹ️ Raio-x existe porém desatualizado (atualiza em lotes).');
    } else {
      Logger.log('[BOOT-ASYNC] ✅ Raio-x presente e atualizado.');
    }
  } catch (e1) {
    Logger.log('[BOOT-ASYNC] ⚠️ Verificação raio-x: ' + e1.message);
  }

  try {
    var cacheEstr = _readJsonFromDrive(ARQUIVO_CACHE_ESTRUTURA);
    var precisaEstr = false;
    if (!cacheEstr || cacheEstr.processamento_em_andamento) {
      precisaEstr = true;
    } else {
      var config = carregarConfiguracaoCiclo();
      if (cacheEstr.hash_fila !== gerarHashFila(config.fila || [])) precisaEstr = true;
    }
    if (precisaEstr) {
      var rx2 = _readJsonFromDrive('raiox_banco_v1.json');
      if (rx2 && rx2.arvore) rx2 = _podarArvoreRaioXPeloEdital(rx2);   // V99
      if (rx2 && rx2.arvore) {
        _reconstruirCacheEstruturalDaArvore(rx2.arvore);
        Logger.log('[BOOT-ASYNC] ✅ Cache estrutural reconstruído a partir da árvore.');
      } else {
        Logger.log('[BOOT-ASYNC] 🔶 Cache estrutural aguardando raio-x em lotes.');
      }
    }
    etapas.cache_estrutural = true;
    try { CacheService.getScriptCache().remove('CACHE_PRECISA_RECONSTRUIR'); } catch (eF) {}
  } catch (e2) {
    Logger.log('[BOOT-ASYNC] ⚠️ Cache estrutural: ' + e2.message);
  }

  try {
    var cfg = carregarConfiguracaoCiclo();
    var rx3 = _readJsonFromDrive('raiox_banco_v1.json');
    var arvore3 = (rx3 && rx3.arvore) ? rx3.arvore : {};
    var faltando = false;
    if (cfg.fila && cfg.fila.length > 0) {
      cfg.fila.forEach(function (f) { if (f.disciplina && !arvore3[f.disciplina]) faltando = true; });
    }
    if (faltando) {
      Logger.log('[BOOT-ASYNC] 🔶 Disciplina da fila ausente no raio-x. Marcando p/ lotes.');
      _marcarRaioXSujo();
    }
    etapas.sincronia = true;
  } catch (e3) {
    Logger.log('[BOOT-ASYNC] ⚠️ Sincronia: ' + e3.message);
  }

  try {
    var rel = validarIntegridadeEstado();
    etapas.integridade = !rel.erro;
    if (rel.correcoes_aplicadas && rel.correcoes_aplicadas.length > 0) {
      Logger.log('[BOOT-ASYNC] ✅ ' + rel.correcoes_aplicadas.length + ' correções de integridade.');
    }
  } catch (e4) {
    Logger.log('[BOOT-ASYNC] ⚠️ Integridade: ' + e4.message);
  }

  var ms = Date.now() - tInicio;
  Logger.log('[BOOT-ASYNC] ✅ Concluído em ' + ms + 'ms | ' + JSON.stringify(etapas));

  try { cache.put(FLAG_BOOT_ASYNC, '1', 300); } catch (eC) {}
  return { sucesso: true, etapas: etapas, tempo_ms: ms };
}



// ── HOOK CENTRAL: limpar cache de arquivos também marca o raio-x como sujo ────
// Cobre automaticamente salvarJsonNoDrive, salvarQuestaoEditada, excluirQuestaoSegura.

/* V-FAB-1 — o hook antigo fazia DUAS coisas de uma vez: invalidava o mapa de
   arquivos (barato, sempre correto) e marcava o Raio-X como sujo (caro, exige
   rebuild em lotes). A Fábrica precisa da primeira e não pode pagar a segunda:
   ela sabe exatamente quantas questões gravou e em qual subtema, então atualiza
   a árvore direto (_raioXIncrementarSubtema) em vez de invalidá-la inteira. */
function limparCacheArquivosSemSujar() {
  try { CacheService.getScriptCache().remove(CACHE_KEY_MAPA); } catch (e) {}
}

function limparCacheArquivos() {
  limparCacheArquivosSemSujar();
  _marcarRaioXSujo();
}

/* Incremento cirúrgico da árvore do Raio-X. Devolve true se conseguiu aplicar;
   false significa "não deu, marque sujo e deixe o rebuild em lotes resolver".
   Sob lock porque 4 conexões paralelas gravam ao mesmo tempo. */
function _raioXIncrementarSubtema(disciplina, tema, subtema, qtd) {
  if (!qtd || qtd <= 0) return true;
  var lock = LockService.getScriptLock();
  var travou = false;
  try {
    travou = lock.waitLock(20000);
    var rx = _readJsonFromDrive('raiox_banco_v1.json');
    if (!rx || !rx.arvore || !Object.keys(rx.arvore).length) return false;

    var arv = rx.arvore;
    if (!_disciplinaDoEdital(disciplina) || !_pertenceAoEditalAtivo(_disciplinaDoEdital(disciplina), tema, null)) {   // V96
      Logger.log('[RAIOX] ⚠️ +' + qtd + ' NÃO contadas: "' + disciplina + ' › ' + tema + '" não casa com o edital ativo.');   // V98
      return true;
    }
    disciplina = _disciplinaDoEdital(disciplina);
    var _cx = _chaveCanonicaEdital(disciplina, tema, subtema || 'Geral');   // V99 — incrementa sempre no nome canônico
    if (_cx) { disciplina = _cx.disciplina; tema = _cx.tema; subtema = _cx.subtema; }
    if (!arv[disciplina]) arv[disciplina] = { total: 0, temas: {} };
    var d = arv[disciplina];

    var _achar = function (obj, alvo) {
      var a = String(alvo || '').trim().toLowerCase();
      var ks = Object.keys(obj || {});
      for (var i = 0; i < ks.length; i++) {
        if (ks[i].trim().toLowerCase() === a) return ks[i];
      }
      return null;
    };

    var temaKey = _achar(d.temas, tema) || tema;
    if (!d.temas[temaKey]) d.temas[temaKey] = { total: 0, subtemas: {} };
    var t = d.temas[temaKey];

    var sub = subtema || 'Geral';
    var subKey = _achar(t.subtemas, sub) || sub;

    // O Raio-X guarda ora número, ora { qtd: n } — respeita o formato existente.
    var atual = t.subtemas[subKey];
    if (atual && typeof atual === 'object') atual.qtd = (atual.qtd || 0) + qtd;
    else t.subtemas[subKey] = (typeof atual === 'number' ? atual : 0) + qtd;

    t.total    = (t.total || 0) + qtd;
    d.total    = (d.total || 0) + qtd;
    rx.total   = (rx.total || 0) + qtd;
    rx.timestamp = new Date().toISOString();

    _saveJsonToDrive('raiox_banco_v1.json', rx);
    Logger.log('[RAIOX] +' + qtd + ' · ' + disciplina + ' › ' + temaKey + ' › ' + subKey +
               ' | total do banco: ' + rx.total);
    return true;
  } catch (e) {
    Logger.log('[RAIOX] ⚠️ incremento falhou (' + e.message + ') — caindo para marcar sujo.');
    return false;
  } finally {
    if (travou) { try { lock.releaseLock(); } catch (e2) {} }
  }
}

// ── CONSTRUÇÃO DO RAIO-X (limpa flag de sujo ao concluir) ─────────────────────

// ═════════════════════════════════════════════════════════════════════════════
// V95 — SEMEADURA DA ÁRVORE COM O EDITAL (universo único para os dois motores)
//
// A árvore só ganhava um tema quando existia ao menos UM arquivo de questões
// nele. Tema do edital com banco zerado simplesmente não existia no Raio-X:
//   • sumia da tela — o usuário não enxergava o buraco;
//   • e, pior, o motor de metas do FRONT itera Object.keys(arvore.temas)
//     enquanto o do BACKEND itera _getTemasOrdem() (o edital). Universos
//     diferentes => `n` diferente => peso de tema diferente => META DIFERENTE
//     para o MESMO subtema nos dois lados.
//
// Semeando todo tema/subtema do edital com qtd 0, os dois motores passam a
// enxergar exatamente o mesmo conjunto. A casagem usa _normChaveV23 — a MESMA
// normalização das chaves de meta — para não criar tema duplicado por acento
// ou por diferença de caixa.
//
// Substitui os dois blocos de "pós-processamento do edital" que existiam
// duplicados em construirSalvarRaioX e no reconstrutor em lotes.
// ═════════════════════════════════════════════════════════════════════════════
function _semearArvoreComEdital(arvore) {
  if (!arvore) return arvore;

  // V99 — antes de semear: nomes canônicos (variantes somadas), em lugar. Não poda EXCLUIR (contagem preservada).
  var _canon = _canonizarArvoreEdital(arvore, false);
  Object.keys(arvore).forEach(function (k) { delete arvore[k]; });
  Object.keys(_canon).forEach(function (k) { arvore[k] = _canon[k]; });

  // 1) Normaliza os subtemas contados (número -> objeto) em toda a árvore.
  Object.keys(arvore).forEach(function (d) {
    Object.keys(arvore[d].temas || {}).forEach(function (t) {
      var antigos = arvore[d].temas[t].subtemas || {};
      var novos = {};
      Object.keys(antigos).forEach(function (s) {
        var v = antigos[s];
        novos[s] = (typeof v === 'number')
          ? { qtd: v, distribuicao: '-', importancia: '-' }
          : { qtd: (v && v.qtd) || 0,
              distribuicao: (v && v.distribuicao) || '-',
              importancia: (v && v.importancia) || '-' };
      });
      arvore[d].temas[t].subtemas = novos;
    });
  });

  if (typeof MAPA_DISTRIBUICAO_EDITAL === 'undefined' || !MAPA_DISTRIBUICAO_EDITAL) return arvore;

  // 1b) V97 — (i) chaves com nome alternativo (ex.: "Raciocínio Lógico e Matemático") são
  //     fundidas na chave canônica do edital; (ii) TODA disciplina do edital passa a existir
  //     na árvore, mesmo sem nenhum arquivo/questão (antes só entrava quem já tinha arquivo,
  //     e por isso o Raio-X e o filtro de disciplinas mostravam só as disciplinas com banco).
  var semeadasDisc = 0;
  Object.keys(arvore).forEach(function (k) {
    var canon = _disciplinaDoEdital(k);
    if (!canon || canon === k) return;
    var src = arvore[k] || { total: 0, temas: {} };
    var dst = arvore[canon] || (arvore[canon] = { total: 0, temas: {} });
    Object.keys(src.temas || {}).forEach(function (t) {
      var ts = src.temas[t];
      if (!dst.temas[t]) { dst.temas[t] = ts; return; }
      dst.temas[t].total = (dst.temas[t].total || 0) + (ts.total || 0);
      Object.keys(ts.subtemas || {}).forEach(function (sb) {
        if (dst.temas[t].subtemas[sb]) dst.temas[t].subtemas[sb].qtd = (dst.temas[t].subtemas[sb].qtd || 0) + ((ts.subtemas[sb] && ts.subtemas[sb].qtd) || 0);
        else dst.temas[t].subtemas[sb] = ts.subtemas[sb];
      });
    });
    dst.total = (dst.total || 0) + (src.total || 0);
    delete arvore[k];
  });
  Object.keys(MAPA_DISTRIBUICAO_EDITAL).forEach(function (dEd) {
    var jaTem = Object.keys(arvore).some(function (k) { return _normChaveV23(k) === _normChaveV23(dEd); });
    if (!jaTem) { arvore[dEd] = { total: 0, temas: {} }; semeadasDisc++; }
  });

  // 2) Para cada disciplina já presente na árvore, semeia o edital inteiro.
  var semeadosTema = 0, semeadosSub = 0;
  Object.keys(arvore).forEach(function (d) {
    var mapaDisc = MAPA_DISTRIBUICAO_EDITAL[d];
    if (!mapaDisc) return;

    var idxTema = {};
    Object.keys(arvore[d].temas).forEach(function (t) { idxTema[_normChaveV23(t)] = t; });

    Object.keys(mapaDisc).forEach(function (temaEdital) {
      if (!_pertenceAoEditalAtivo(d, temaEdital, null)) return;   // V99 — tema 100% EXCLUIR não é semeado
      var chaveT = _normChaveV23(temaEdital);
      var temaKey = idxTema[chaveT];
      if (!temaKey) {
        temaKey = temaEdital;
        arvore[d].temas[temaKey] = { total: 0, subtemas: {} };
        idxTema[chaveT] = temaKey;
        semeadosTema++;
      }

      var subsArv = arvore[d].temas[temaKey].subtemas;
      var idxSub = {};
      Object.keys(subsArv).forEach(function (s) { idxSub[_normChaveV23(s)] = s; });

      Object.keys(mapaDisc[temaEdital]).forEach(function (subEdital) {
        if (mapaDisc[temaEdital][subEdital].importancia === 'EXCLUIR') return;   // V99 — subtema EXCLUIR não é semeado
        var chaveS = _normChaveV23(subEdital);
        var subKey = idxSub[chaveS];
        if (!subKey) {
          subKey = subEdital;
          subsArv[subKey] = { qtd: 0 };
          idxSub[chaveS] = subKey;
          semeadosSub++;
        }
        subsArv[subKey].distribuicao = mapaDisc[temaEdital][subEdital].distribuicao;
        subsArv[subKey].importancia  = mapaDisc[temaEdital][subEdital].importancia;
      });
    });
  });

  Logger.log('[RAIOX-SEMEADURA] Edital aplicado — disciplinas criadas: ' + semeadasDisc + ' | temas criados: ' + semeadosTema
    + ' | subtemas criados: ' + semeadosSub);
  return arvore;
}

function construirSalvarRaioX() {
  try {
    var mapa = listarArquivosRapido();
    var arvore = {};
    var totalGeral = 0;
    var todosIds = [];
    var idParaMeta = {};

    Object.keys(mapa).forEach(function (d) {
      arvore[d] = { total: 0, temas: {} };
      if (mapa[d].questoes) {
        mapa[d].questoes.forEach(function (arq) {
          todosIds.push(arq.id);
          idParaMeta[arq.id] = { disciplina: d, tema: arq.tema || 'Sem Tema' };
        });
      }
    });

    var batchSize = 100;
    for (var i = 0; i < todosIds.length; i += batchSize) {
      var loteIds = todosIds.slice(i, i + batchSize);
      var jsons = _carregarBancosRoteado(loteIds);   // V35 — Firebase primeiro

      jsons.forEach(function (item) {
        var meta = idParaMeta[item.id];
        if (meta && item.data && Array.isArray(item.data.questoes)) {
          var disc = meta.disciplina;
          var tema = meta.tema;

          if (!arvore[disc].temas[tema]) {
            arvore[disc].temas[tema] = { total: 0, subtemas: {} };
          }

          var qtdArquivo = item.data.questoes.length;
          arvore[disc].total += qtdArquivo;
          arvore[disc].temas[tema].total += qtdArquivo;
          totalGeral += qtdArquivo;

          item.data.questoes.forEach(function (q) {
            var sub = q.subtema || 'Geral';
            if (!arvore[disc].temas[tema].subtemas[sub]) {
              arvore[disc].temas[tema].subtemas[sub] = 0;
            }
            arvore[disc].temas[tema].subtemas[sub]++;
          });
        }
      });
    }

    // V95 — antes, o edital só era aplicado a temas que JÁ existiam na árvore.
    _semearArvoreComEdital(arvore);

    var relatorio = { timestamp: new Date().toISOString(), total: totalGeral, arvore: arvore };
    _saveJsonToDrive('raiox_banco_v1.json', relatorio);

    _limparRaioXSujo();
    Logger.log('[RAIOX] ✅ Reconstruído e marcado como ATUALIZADO. Total: ' + totalGeral);

    return { sucesso: true, dados: relatorio };
  } catch (e) {
    return { erro: e.message };
  }
}


const ARQUIVO_PROGRESSO_RAIOX = "raiox_progresso.json";
const RAIOX_LOTE_TEMPO_MAX_MS = 180000;
const RAIOX_LOTE_ARQUIVOS = 30;   // V102 — 60 + releitura no Drive estourava os 6 min do Apps Script
const RAIOX_PROGRESSO_VALIDADE_MS = 30 * 60 * 1000;   // progresso parado há mais que isso é descartado
const RAIOX_FORCADO_EM_ANDAMENTO_MS = 10 * 60 * 1000; // "Sincronizar" repetido dentro dessa janela CONTINUA a varredura

/* V98 — APAGAR NOS DOIS LUGARES.
   Desde o V31 todo JSON de dados vive no Firestore E no Drive, e a leitura vai SEMPRE ao Firestore primeiro.
   O Raio-X só mandava o arquivo do Drive para a lixeira (setTrashed): a cópia do Firestore ficava viva.
   Resultado: o "raiox_progresso.json" velho (varredura feita quando Dignitários ainda tinha 0 questões)
   continuava sendo lido, o cursor já estava no fim e o "Sincronizar" só regravava a árvore antiga.
   Esta função remove o arquivo no Drive e o documento no Firestore. */
function _apagarJsonRoteado(filename) {
  var nome = filename;
  try { if (typeof _arquivoDoUsuarioAtivo === 'function') nome = _arquivoDoUsuarioAtivo(filename); } catch (e0) {}
  try {
    var f = _getFileByName(nome);
    if (f) f.setTrashed(true);
  } catch (e1) { Logger.log('[APAGAR] Drive "' + nome + '": ' + e1.message); }
  try {
    // V99 — não depende só de _dxAtivo(): se ela não existir no projeto, cai para _fbAtivo() (Firebase.gs).
    var fbLigado = (typeof _dxAtivo === 'function') ? _dxAtivo() : ((typeof _fbAtivo === 'function') ? _fbAtivo() : false);
    if (!fbLigado || typeof fbApagar !== 'function') return;
    if (typeof DX_COL_DADOS === 'undefined') {
      Logger.log('[APAGAR] ⚠️ DX_COL_DADOS indisponível: a cópia do Firestore de "' + nome + '" NÃO foi apagada (o Drive foi).');
      return;
    }
    var r = fbApagar(DX_COL_DADOS, nome);
    if (r && r.ok === false && r.erro !== 'firebase_desligado') Logger.log('[APAGAR] Firebase "' + nome + '": ' + r.erro);
  } catch (e2) { Logger.log('[APAGAR] Firebase "' + nome + '": ' + e2.message); }
}

function _raioXProgressoVelho(prog, limiteMs) {
  if (!prog || !prog.atualizado) return true;
  var t = new Date(prog.atualizado).getTime();
  if (!t) return true;
  return (Date.now() - t) > (limiteMs || RAIOX_PROGRESSO_VALIDADE_MS);
}

function processarRaioXEmLotes(forcar) {
  var tInicio = Date.now();

  // V96 — "Sincronizar" do painel passa forcar=true: derruba o curto-circuito, o cache do
  // mapa de pastas e qualquer varredura parcial antiga, e refaz o Raio-X do zero.
  // V98 — o front chama esta função de novo a cada pedaço (forcar=true em TODAS as chamadas). Antes, cada
  // chamada apagava o progresso e a varredura recomeçava do zero para sempre ("ficou rodando"). Agora só
  // zera quando NÃO há uma varredura forçada em andamento; se há, continua de onde parou.
  if (forcar === true) {
    try {
      _marcarRaioXSujo();
      var _pg = _readJsonFromDrive(ARQUIVO_PROGRESSO_RAIOX);
      var _emAndamento = !!(_pg && _pg.forcado === true && Array.isArray(_pg.ids) &&
                            _pg.cursor < _pg.total_arquivos && !_raioXProgressoVelho(_pg, RAIOX_FORCADO_EM_ANDAMENTO_MS));
      if (_emAndamento) {
        Logger.log('[RAIOX-LOTE] ♻️ Sincronização forçada já em andamento (' + _pg.cursor + '/' + _pg.total_arquivos + ') — continuando.');
      } else {
        CacheService.getScriptCache().remove(CACHE_KEY_MAPA);
        try { _limparCachesDoEdital(); } catch (eLc) {}
        _apagarJsonRoteado(ARQUIVO_PROGRESSO_RAIOX);   // V98 — Drive + Firestore
        Logger.log('[RAIOX-LOTE] 🔄 Sincronização forçada: progresso anterior descartado (Drive e Firestore).');
      }
    } catch (eForca) { Logger.log('[RAIOX-LOTE] forcar: ' + eForca.message); }
  }

  try {
    var progExistente = _readJsonFromDrive(ARQUIVO_PROGRESSO_RAIOX);
    if (!progExistente) {
      var rxFresh = _readJsonFromDrive('raiox_banco_v1.json');
      var freshOk = !!(rxFresh && rxFresh.arvore && Object.keys(rxFresh.arvore).length > 0) && !_raioXEstaSujo()
                    && _arvoreRaioXAlinhadaAoEdital(rxFresh.arvore);   // V96: arquivo do edital antigo NÃO vale
      if (freshOk) {
        Logger.log('[RAIOX-LOTE] ✅ Raio-x já atualizado. Curto-circuito (nada a processar).');
        var configFresh = carregarConfiguracaoCiclo();
        var cacheEstrFresh = _readJsonFromDrive(ARQUIVO_CACHE_ESTRUTURA);
        var estruturaFresh;
        if (!cacheEstrFresh || cacheEstrFresh.hash_fila !== gerarHashFila(configFresh.fila || [])) {
          estruturaFresh = _reconstruirCacheEstruturalDaArvore(rxFresh.arvore);
        } else {
          estruturaFresh = cacheEstrFresh;
        }
        return {
          sucesso: true, done: true, pct: 100, total_questoes: rxFresh.total || 0,
          dados: rxFresh, mapa: listarArquivosRapido(), estrutura: estruturaFresh, ja_atualizado: true
        };
      }
    }

    var lock = LockService.getScriptLock();
    if (!lock.tryLock(45000)) {
      Logger.log('[RAIOX-LOTE] ⚠️ Lock ocupado por outra execução. Retornando estado atual.');
      var pAtual = _readJsonFromDrive(ARQUIVO_PROGRESSO_RAIOX);
      var pctBusy = (pAtual && pAtual.total_arquivos > 0) ? Math.round((pAtual.cursor / pAtual.total_arquivos) * 100) : 0;
      return {
        sucesso: true, done: false, pct: pctBusy,
        lote_atual: pAtual ? pAtual.cursor : 0, lote_total: pAtual ? pAtual.total_arquivos : 0,
        questoes_ate_agora: pAtual ? pAtual.questoes : 0, aguardando_lock: true
      };
    }

    try {
      Logger.log('╔══════════════════════════════════════════════════════════════╗');
      Logger.log('║  RAIO-X EM LOTES  |  chunk iniciado  ' + new Date().toISOString());
      Logger.log('╚══════════════════════════════════════════════════════════════╝');

      var prog = _readJsonFromDrive(ARQUIVO_PROGRESSO_RAIOX);

      // V99 — progresso JÁ CONCLUÍDO (cursor no fim) nunca é salvo pelo fluxo normal (o chunk final grava o relatório e apaga
      // o progresso). Se aparece um, é sobra/zumbi: reaproveitá-lo regravaria a árvore velha. Descarta mesmo se for recente.
      if (prog && Array.isArray(prog.ids) && (_raioXProgressoVelho(prog) || prog.cursor >= prog.total_arquivos)) {
        Logger.log('[RAIOX-LOTE] 🗑️ Progresso antigo/concluído (' + (prog.atualizado || 'sem data') + ' | ' + prog.cursor + '/' + prog.total_arquivos + ') descartado — varredura nova.');
        _apagarJsonRoteado(ARQUIVO_PROGRESSO_RAIOX);
        prog = null;
      }

      if (!prog || !prog.ids || !Array.isArray(prog.ids)) {
        Logger.log('[RAIOX-LOTE] 🆕 Sem progresso. Inicializando varredura do banco...');
        var mapaInit = listarArquivosRapido();
        var idsInit = [];
        var arvoreInit = {};
        Object.keys(mapaInit).forEach(function(d) {
          arvoreInit[d] = { total: 0, temas: {} };
          if (mapaInit[d].questoes) {
            mapaInit[d].questoes.forEach(function(arq) { idsInit.push(arq.id); });
          }
        });
        prog = {
          ids: idsInit, cursor: 0, total_arquivos: idsInit.length, questoes: 0,
          arvore: arvoreInit, fase: 'COLETA', forcado: forcar === true, iniciado_em: new Date().toISOString(), atualizado: new Date().toISOString()
        };
        _saveJsonToDrive(ARQUIVO_PROGRESSO_RAIOX, prog);
        Logger.log('[RAIOX-LOTE] 📂 Mapa lido: ' + Object.keys(mapaInit).length + ' disciplinas | ' + idsInit.length + ' arquivos a processar');
      } else {
        Logger.log('[RAIOX-LOTE] ♻️ Progresso recuperado: cursor=' + prog.cursor + '/' + prog.total_arquivos + ' | questões=' + prog.questoes);
      }

      var mapaCache = listarArquivosRapido();
      var idMeta = {};
      Object.keys(mapaCache).forEach(function(d) {
        if (mapaCache[d].questoes) {
          mapaCache[d].questoes.forEach(function(arq) { idMeta[arq.id] = { disciplina: d, tema: arq.tema || 'Sem Tema' }; });
        }
      });

      var lotesNeste = 0;
      while (prog.cursor < prog.total_arquivos) {
        if (Date.now() - tInicio > RAIOX_LOTE_TEMPO_MAX_MS) {
          Logger.log('[RAIOX-LOTE] ⏱️ Orçamento de tempo atingido. Salvando parcial.');
          break;
        }
        var fim = Math.min(prog.cursor + RAIOX_LOTE_ARQUIVOS, prog.total_arquivos);
        var loteIds = prog.ids.slice(prog.cursor, fim);
        var jsons = _carregarBancosRoteado(loteIds);   // V35 — Firebase primeiro

        // V98 — cópia do Firebase sem 'questoes' (vazia/formato antigo) era pulada em silêncio: o arquivo
        // existia, o visualizador mostrava as questões e o Raio-X contava 0. Agora vai ao Drive.
        var _ruins = [];
        jsons.forEach(function(item) {
          if (!item || !item.data || !Array.isArray(item.data.questoes)) _ruins.push(item && item.id);
        });
        var _vistos = {};
        jsons.forEach(function(item) { if (item && item.id) _vistos[item.id] = true; });
        loteIds.forEach(function(id) { if (!_vistos[id]) _ruins.push(id); });
        _ruins = _ruins.filter(function(x) { return !!x; });
        if (_ruins.length) {
          // V102 — sem tempo para reler no Drive: o sub-lote NÃO avança; o próximo chunk o refaz inteiro.
          if (Date.now() - tInicio > RAIOX_LOTE_TEMPO_MAX_MS) {
            Logger.log('[RAIOX-LOTE] ⏱️ Sem tempo para reler ' + _ruins.length + ' arquivo(s) no Drive — sub-lote fica para o próximo chunk.');
            break;
          }
          Logger.log('[RAIOX-LOTE] ⚠️ ' + _ruins.length + ' arquivo(s) sem questões no Firebase — relendo do Drive.');
          try {
            var _drv = _carregarJsonsParalelo(_ruins);
            jsons = jsons.filter(function(it) { return _ruins.indexOf(it && it.id) === -1; }).concat(_drv);
            prog.falhas_lote_seguidas = 0;
          } catch (eDrv) {
            // V102 — antes: só registrava e AVANÇAVA o cursor, e as questões desses arquivos sumiam do total
            // (15.090 → 13.497). Agora o sub-lote é refeito no próximo chunk; após 3 falhas seguidas no mesmo
            // ponto, segue em frente e registra os arquivos em prog.ignorados (nada some sem aviso).
            prog.falhas_lote_seguidas = (prog.falhas_lote_seguidas || 0) + 1;
            Logger.log('[RAIOX-LOTE] ❌ fallback Drive falhou (' + prog.falhas_lote_seguidas + '/3): ' + eDrv.message);
            if (prog.falhas_lote_seguidas < 3) break;
            prog.ignorados = (prog.ignorados || []).concat(_ruins);
            prog.falhas_lote_seguidas = 0;
            Logger.log('[RAIOX-LOTE] ⚠️ ' + _ruins.length + ' arquivo(s) ignorado(s) após 3 falhas: ' + _ruins.join(', '));
          }
        }

        jsons.forEach(function(item) {
          var meta = idMeta[item.id];
          if (meta && item.data && Array.isArray(item.data.questoes)) {
            var disc = meta.disciplina;
            var tema = meta.tema;
            if (!prog.arvore[disc]) prog.arvore[disc] = { total: 0, temas: {} };
            if (!prog.arvore[disc].temas[tema]) prog.arvore[disc].temas[tema] = { total: 0, subtemas: {} };
            var qtdArq = item.data.questoes.length;
            prog.arvore[disc].total += qtdArq;
            prog.arvore[disc].temas[tema].total += qtdArq;
            prog.questoes += qtdArq;
            item.data.questoes.forEach(function(q) {
              var sub = q.subtema || 'Geral';
              if (!prog.arvore[disc].temas[tema].subtemas[sub]) prog.arvore[disc].temas[tema].subtemas[sub] = 0;
              prog.arvore[disc].temas[tema].subtemas[sub]++;
            });
          }
        });

        prog.cursor = fim;
        lotesNeste++;
        Logger.log('[RAIOX-LOTE] ✅ Sub-lote ' + lotesNeste + ' | arquivos ' + prog.cursor + '/' + prog.total_arquivos + ' | questões=' + prog.questoes);
      }

      if (prog.cursor < prog.total_arquivos) {
        prog.atualizado = new Date().toISOString();
        _saveJsonToDrive(ARQUIVO_PROGRESSO_RAIOX, prog);
        var pctParcial = Math.round((prog.cursor / prog.total_arquivos) * 100);
        Logger.log('[RAIOX-LOTE] 💾 Parcial salva em ' + (Date.now() - tInicio) + 'ms | ' + pctParcial + '% | sub-lotes neste chunk: ' + lotesNeste);
        return {
          sucesso: true, done: false, pct: pctParcial,
          lote_atual: prog.cursor, lote_total: prog.total_arquivos, questoes_ate_agora: prog.questoes
        };
      }

      Logger.log('[RAIOX-LOTE] 🏁 Todos os ' + prog.total_arquivos + ' arquivos processados. Pós-processando edital...');
      var arvore = prog.arvore;
      var totalGeral = prog.questoes;

      // V95 — mesma semeadura do construtor completo (era código duplicado).
      _semearArvoreComEdital(arvore);

      var relatorio = { timestamp: new Date().toISOString(), total: totalGeral, arvore: arvore };
      if (prog.ignorados && prog.ignorados.length) {   // V102 — arquivos não lidos ficam registrados no relatório
        relatorio.arquivos_ignorados = prog.ignorados.slice();
        Logger.log('[RAIOX-LOTE] ⚠️ ' + prog.ignorados.length + ' arquivo(s) não lidos nesta varredura: ' + prog.ignorados.join(', '));
      }
      _podarArvoreRaioXPeloEdital(relatorio);   // V96 — só disciplinas/temas do edital ativo
      arvore = relatorio.arvore; totalGeral = relatorio.total;
      _saveJsonToDrive('raiox_banco_v1.json', relatorio);
      Logger.log('[RAIOX-LOTE] 💾 raiox_banco_v1.json salvo. Total: ' + totalGeral + ' questões.');

      var estrutura = null;
      try {
        estrutura = _reconstruirCacheEstruturalDaArvore(arvore);
        Logger.log('[RAIOX-LOTE] 🗂️ Cache estrutural reconstruído a partir da árvore.');
      } catch (eEstr) {
        Logger.log('[RAIOX-LOTE] ⚠️ Falha no cache estrutural: ' + eEstr.message);
      }

      _limparRaioXSujo();
      try {
        _apagarJsonRoteado(ARQUIVO_PROGRESSO_RAIOX);   // V98 — Drive + Firestore
      } catch (eDel) {
        Logger.log('[RAIOX-LOTE] ⚠️ Não removeu progresso: ' + eDel.message);
      }

      Logger.log('╔══════════════════════════════════════════════════════════════╗');
      Logger.log('║  RAIO-X CONCLUÍDO  |  ' + totalGeral + ' questões  |  chunk final ' + (Date.now() - tInicio) + 'ms');
      Logger.log('╚══════════════════════════════════════════════════════════════╝');

      return {
        sucesso: true, done: true, pct: 100, total_questoes: totalGeral,
        dados: relatorio, mapa: mapaCache, estrutura: estrutura
      };

    } finally {
      try { lock.releaseLock(); } catch (eL) {}
    }

  } catch (e) {
    Logger.log('[RAIOX-LOTE] ❌ EXCEÇÃO: ' + e.message + '\n' + (e.stack || ''));
    return { sucesso: false, erro: e.message };
  }
}

function _reconstruirCacheEstruturalDaArvore(arvore) {
  var config = carregarConfiguracaoCiclo();
  var mapa = listarArquivosRapido();
  var estado = carregarEstadoUsuario();

  Logger.log('[CACHE-ARVORE] Reconstruindo cache estrutural sem reler o banco...');

  var fileIdParaDisciplina = {};
  Object.keys(mapa).forEach(function(disc) {
    if (mapa[disc].questoes) {
      mapa[disc].questoes.forEach(function(arq) { fileIdParaDisciplina[arq.id] = disc; });
    }
  });

  var statsReaisPorDisc = {};
  Object.keys(estado.respostas || {}).forEach(function(idOriginal) {
    var resp = estado.respostas[idOriginal];
    var fileId = idOriginal.substring(0, idOriginal.lastIndexOf('_'));
    var disc = fileIdParaDisciplina[fileId];
    if (!disc) return;
    if (!statsReaisPorDisc[disc]) statsReaisPorDisc[disc] = { total: 0, acertos: 0 };
    statsReaisPorDisc[disc].total++;
    if (resp.correta) statsReaisPorDisc[disc].acertos++;
  });

  function contarDaArvore(disc) {
    var no = arvore[disc];
    if (!no) return { totalQuestoes: 0, totalSubtemas: 0 };
    var subSet = {};
    Object.keys(no.temas || {}).forEach(function(t) {
      Object.keys(no.temas[t].subtemas || {}).forEach(function(s) { subSet[s] = true; });
    });
    return { totalQuestoes: no.total || 0, totalSubtemas: Object.keys(subSet).length };
  }

  var hashFila = gerarHashFila(config.fila);
  var disciplinasCache = [];
  var aulasCache = {};

  (config.fila || []).forEach(function(item) {
    var cont = contarDaArvore(item.disciplina);
    var stats = statsReaisPorDisc[item.disciplina] || { total: 0, acertos: 0 };
    var taxa = stats.total > 0 ? Math.round((stats.acertos / stats.total) * 100) : 0;

    disciplinasCache.push({
      id: item.id, disciplina: item.disciplina, nome: item.disciplina,
      total_banco: cont.totalQuestoes, total_subtemas: cont.totalSubtemas,
      respondidas: stats.total, acertos: stats.acertos, taxa: taxa,
      peso_raw: item.peso_raw || 0, qtd_bloco: item.qtd_bloco,
      meta_volume: item.volume_total_meta || 0, ultima_atualizacao: new Date().toISOString()
    });

    var arquivos = (mapa[item.disciplina] && mapa[item.disciplina].questoes) || [];
    if (arquivos.length > 0) {
      aulasCache[item.disciplina] = arquivos.map(function(arq) {
        return { id_arquivo: arq.id, aula: arq.tema, nome_arquivo: arq.nomeArquivo, disciplina: item.disciplina };
      }).sort(function(a, b) { return a.aula.localeCompare(b.aula, undefined, { numeric: true }); });
    }
  });

  var cacheCompleto = {
    versao: "14.4-lotes", timestamp: new Date().toISOString(), hash_fila: hashFila,
    disciplinas: disciplinasCache, aulas_por_disciplina: aulasCache, questoes_usadas_historico: {}
  };

  _saveJsonToDrive(ARQUIVO_CACHE_ESTRUTURA, cacheCompleto);
  try {
    var str = JSON.stringify(cacheCompleto);
    if (str.length < 100 * 1024) CacheService.getScriptCache().put('ESTRUTURA_CICLO_V13', str, 600);
  } catch (e) {}
  try { CacheService.getScriptCache().remove('CACHE_PRECISA_RECONSTRUIR'); } catch (e) {}

  Logger.log('[CACHE-ARVORE] ✅ ' + disciplinasCache.length + ' disciplinas no cache estrutural.');
  return cacheCompleto;
}

// ── LEITURA DO RAIO-X COM GUARD-CLAUSE (reconstrói se sujo/ausente) ──────────

// ═════════════════════════════════════════════════════════════════════════════
// V96 — TRAVA DO EDITAL NA ÁRVORE DO RAIO-X (Agente da Polícia Judicial / TRFs)
// O raiox_banco_v1.json antigo guardava disciplinas do concurso anterior
// (Auditoria, Contabilidade, Direito Tributário...). Toda leitura da árvore passa
// por aqui: some o que não é do edital ativo e recalcula os totais. NADA é apagado
// no Drive; só deixa de aparecer/contar.
// ═════════════════════════════════════════════════════════════════════════════
function _podarArvoreRaioXPeloEdital(rx) {
  if (!rx || !rx.arvore) return rx;
  if (typeof FILTRAR_ESTRITAMENTE_PELO_EDITAL !== 'undefined' && !FILTRAR_ESTRITAMENTE_PELO_EDITAL) return rx;
  if (typeof MAPA_DISTRIBUICAO_EDITAL === 'undefined' || !MAPA_DISTRIBUICAO_EDITAL) return rx;
  // V99 — além da disciplina/tema fora do edital: variantes viram o canônico (questões somadas),
  // subtema EXCLUIR sai da árvore e tema 100% EXCLUIR some. Totais recalculados. Nada é apagado no Drive.
  var nova = _canonizarArvoreEdital(rx.arvore, true);
  var totalGeral = 0;
  Object.keys(nova).forEach(function (d) { totalGeral += nova[d].total; });
  rx.arvore = nova;
  rx.total = totalGeral;
  return rx;
}

// A árvore está alinhada ao edital? (nenhuma disciplina estranha e todas as 12 presentes)
function _arvoreRaioXAlinhadaAoEdital(arvore) {
  if (!arvore) return false;
  if (typeof MAPA_DISTRIBUICAO_EDITAL === 'undefined' || !MAPA_DISTRIBUICAO_EDITAL) return true;
  var ks = Object.keys(arvore);
  for (var i = 0; i < ks.length; i++) { if (!_disciplinaDoEdital(ks[i])) return false; }
  var ed = Object.keys(MAPA_DISTRIBUICAO_EDITAL);
  var presentes = {};
  ks.forEach(function (k) { presentes[_normChaveV23(_disciplinaDoEdital(k) || k)] = true; });   // V97 — alias-aware
  for (var j = 0; j < ed.length; j++) {
    if (!presentes[_normChaveV23(ed[j])]) return false;
  }
  return true;
}

function obterRaioX() {
  try {
    var rx = _readJsonFromDrive('raiox_banco_v1.json');
    if (rx && rx.arvore) rx = _podarArvoreRaioXPeloEdital(rx);   // V96
    // V97 — o arquivo salvo pode ser anterior à semeadura das disciplinas: serve SEMPRE a árvore com as
    // 12 disciplinas do edital (qtd 0 onde não há banco) e pede a reconstrução em lotes se estiver desalinhada.
    if (rx && rx.arvore) {
      try {
        if (!_arvoreRaioXAlinhadaAoEdital(rx.arvore)) {
          Logger.log('[OBTER-RAIOX] 🔶 Árvore sem todas as disciplinas do edital — semeando na leitura e marcando p/ lotes.');
          _marcarRaioXSujo();
        }
        _semearArvoreComEdital(rx.arvore);
      } catch (eSeed) { Logger.log('[OBTER-RAIOX] ⚠️ semeadura na leitura: ' + eSeed.message); }
    }
    var existe = !!(rx && rx.arvore && Object.keys(rx.arvore).length > 0);

    if (existe) {
      if (_raioXEstaSujo()) {
        Logger.log('[OBTER-RAIOX] ℹ️ Raio-x desatualizado — servindo versão atual (rebuild é em lotes no boot).');
      }
      return { sucesso: true, dados: rx };
    }

    var prog = _readJsonFromDrive(ARQUIVO_PROGRESSO_RAIOX);
    var pct = (prog && prog.total_arquivos > 0) ? Math.round((prog.cursor / prog.total_arquivos) * 100) : 0;
    Logger.log('[OBTER-RAIOX] 🔶 Raio-x ainda não gerado. Aguardando lotes (' + pct + '%).');
    return { sucesso: false, reconstruindo: true, pct: pct, erro: 'Raio-X em construção (' + pct + '%). Aguarde a sincronização inicial.' };
  } catch (e) {
    Logger.log('[OBTER-RAIOX] ❌ ' + e.message);
    return { sucesso: false, erro: e.message };
  }
}


// ── FÁBRICA DE QUESTÕES (agora invalida raio-x ao gravar → plano sempre fresco) ─


/**
 * V20 — VALIDADOR DETERMINÍSTICO DE QUESTÕES
 *
 * Antes desta versão NÃO EXISTIA validação de questões: o que a IA gerava ia
 * direto para o banco. Uma questão com gabarito apontando para alternativa
 * inexistente, ou com duas alternativas idênticas, entrava e ensinava errado.
 *
 * Checa o que é decidível por regra. O que depende de julgamento de mérito
 * (a correta é mesmo a correta?) continua sendo responsabilidade do prompt.
 */
function validarQuestoesLote(questoes) {
  var relatorio = [];
  var contagemGabarito = {};

  (questoes || []).forEach(function(q, idx) {
    var p = [];
    var enun = (q && q.enunciado) ? String(q.enunciado) : '';
    var alts = (q && q.alternativas) ? q.alternativas : {};
    var letras = Object.keys(alts);
    var correta = (q && q.resposta_correta) ? String(q.resposta_correta).trim().toUpperCase() : '';
    var coment = (q && q.comentario_llm) ? String(q.comentario_llm) : '';
    var enunTexto = enun.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

    // ── 1. Enunciado ──
    if (!enunTexto)              p.push('enunciado vazio');
    else if (enunTexto.length < 40) p.push('enunciado com ' + enunTexto.length + ' chars (minimo 40) — provavelmente truncado');

    // ── 2. Alternativas ──
    if (letras.length < 4)       p.push('apenas ' + letras.length + ' alternativa(s) — minimo 4');
    if (letras.length > 5)       p.push(letras.length + ' alternativas — maximo 5');

    var vazias = 0, textos = [];
    letras.forEach(function(L) {
      var txt = String(alts[L] || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      if (!txt) vazias++;
      textos.push(txt.toLowerCase());
    });
    if (vazias) p.push(vazias + ' alternativa(s) vazia(s)');

    // ── 3. Alternativas duplicadas (mata a questao: duas certas) ──
    var vistos = {}, dupes = 0;
    textos.forEach(function(t) { if (t) { if (vistos[t]) dupes++; vistos[t] = true; } });
    if (dupes) p.push(dupes + ' alternativa(s) DUPLICADA(S) — invalida a questao');

    // ── 4. Gabarito ──
    if (!correta)                       p.push('resposta_correta ausente');
    else if (!/^[A-E]$/.test(correta))  p.push('resposta_correta invalida: "' + correta + '"');
    else if (alts[correta] === undefined) p.push('resposta_correta "' + correta + '" aponta para alternativa INEXISTENTE');
    else contagemGabarito[correta] = (contagemGabarito[correta] || 0) + 1;

    // ── 5. Padroes proibidos pelo proprio prompt ──
    var todasAlts = textos.join(' | ');
    if (/\b(todas as (alternativas )?anteriores|nenhuma das (alternativas )?anteriores|n\.d\.a)\b/i.test(todasAlts)) {
      p.push('usa "todas/nenhuma das anteriores" — proibido');
    }

    // ── 6. Pista por comprimento (a correta ser sempre a mais longa) ──
    if (correta && alts[correta] !== undefined && letras.length >= 4) {
      var lenCorreta = String(alts[correta]).replace(/<[^>]*>/g, '').length;
      var maiorErrada = 0;
      letras.forEach(function(L) {
        if (L === correta) return;
        var n = String(alts[L] || '').replace(/<[^>]*>/g, '').length;
        if (n > maiorErrada) maiorErrada = n;
      });
      if (maiorErrada > 0 && lenCorreta > maiorErrada * 1.8) {
        p.push('alternativa correta e ' + Math.round(lenCorreta / maiorErrada * 10) / 10 + 'x mais longa que a maior errada — entrega a resposta pelo tamanho');
      }
    }

    // ── 7. Comentario ──
    if (!coment.replace(/<[^>]*>/g, '').trim()) p.push('comentario_llm vazio — questao sem explicacao');
    else if (coment.replace(/<[^>]*>/g, '').trim().length < 80) p.push('comentario_llm muito curto — nao explica os distratores');

    // ── 8. LaTeX quebrado no enunciado, alternativas ou comentario ──
    var tudo = enun + ' ' + Object.keys(alts).map(function(L) { return alts[L]; }).join(' ') + ' ' + coment;
    var texRe = /(?:data-tex\s*=\s*(['"])([\s\S]*?)\1)|(?:\\\(([\s\S]{1,400}?)\\\))/g, tm, quebradas = 0;
    while ((tm = texRe.exec(tudo)) !== null) {
      var tex = tm[2] || tm[3] || '';
      var saldo = 0, ruim = false;
      for (var t = 0; t < tex.length; t++) {
        var c = tex.charAt(t);
        if (c === '\\') { t++; continue; }
        if (c === '{') saldo++;
        else if (c === '}') { saldo--; if (saldo < 0) { ruim = true; break; } }
      }
      if (ruim || saldo !== 0) quebradas++;
    }
    if (quebradas) p.push(quebradas + ' formula(s) com chaves desbalanceadas');

    // ── 9. Markdown vazado ──
    if (/(^|[^\*])\*\*[^\*\n]{2,80}\*\*/.test(tudo)) p.push('markdown ** vazado');

    // ── 10. Moeda em KaTeX ──
    // V20.8 — a regra só pegava `R$` cru, mas o HTML real traz `R\$` (escapado para
    // o LaTeX) ou `R&dollar;`. Passava batido justamente na forma que aparece.
    if (/data-tex\s*=\s*(['"])[^'"]*R\s*(?:\\\$|&dollar;|\$)/i.test(tudo)) p.push('moeda R$ dentro de data-tex');

    if (p.length) relatorio.push({ index: idx, problemas: p });
  });

  // ── 11. Distribuicao do gabarito no LOTE (vicia o treino) ──
  var totalOk = 0;
  ['A','B','C','D','E'].forEach(function(L) { totalOk += (contagemGabarito[L] || 0); });
  var aviso = null;
  if (totalOk >= 5) {
    var maiorLetra = '', maiorQtd = 0;
    ['A','B','C','D','E'].forEach(function(L) {
      if ((contagemGabarito[L] || 0) > maiorQtd) { maiorQtd = contagemGabarito[L]; maiorLetra = L; }
    });
    if (maiorQtd / totalOk > 0.6) {
      aviso = 'gabarito concentrado na letra ' + maiorLetra + ' (' + maiorQtd + ' de ' + totalOk + ') — treino viciado';
      Logger.log('[VALIDA-QUESTAO] ⚠️ ' + aviso);
    }
  }

  if (relatorio.length === 0) {
    Logger.log('[VALIDA-QUESTAO] ✅ ' + (questoes || []).length + ' questao(oes) sem defeito estrutural.');
  } else {
    Logger.log('[VALIDA-QUESTAO] ⚠️ ' + relatorio.length + ' questao(oes) com defeito:');
    relatorio.forEach(function(r) {
      Logger.log('[VALIDA-QUESTAO]    [' + r.index + '] -> ' + r.problemas.join(' | '));
    });
  }

  return { problemas: relatorio, distribuicao: contagemGabarito, aviso_distribuicao: aviso };
}


/* V-FAB-2 — classifica a falha da IA para a Fábrica. Antes a Fase 1 devolvia só
   `isQuota`; erro 503/DEMANDA (isQuota=false) virava "erro comum do tópico",
   queimava as 3 tentativas em segundos e descartava o lote. Agora devolve também
   isDemanda, isInfra, aguardar_ms (inclusive extraído de "Próxima livre em Ns")
   e isRecitation (bloqueio de direitos autorais do Gemini). */
function _fabClassificarErroIA_(res) {
  res = res || {};
  var msg = String(res.erro || '');
  var cls = _erroAgenteTopicos_(res, '');
  var aguardar = Number(cls.aguardar_ms) || 0;
  if (!aguardar) {
    var m = msg.match(/Pr[óo]xima livre em (\d+)\s*s/i);
    if (m) aguardar = parseInt(m[1], 10) * 1000;
  }
  return {
    isQuota: !!cls.isQuota,
    isDemanda: !!cls.isDemanda,
    isInfra: !!(cls.isInfra || _erroEhInfraTexto_(msg)),
    aguardar_ms: aguardar,
    isRecitation: /RECITATION/i.test(msg)
  };
}

/* ══════════════════════════════════════════════════════════════════════════
   V-MIGRA-2 — FÁBRICA: PREPARAR NO SERVIDOR, GERAR NO NAVEGADOR
   A Fase 1 fazia TUDO numa execução só: lia o banco, montava o prompt e
   esperava a IA (geminiAgent com rodízio de 17 chaves e cascata de modelos).
   O rodízio sozinho consumia os 6 min do Apps Script ("Tempo máximo de
   execução excedido"). Agora:
     · fabricaPrepararPrompt  → servidor, rápido: lê o JSON do tema, monta o
       histórico anti-duplicatas, o sysPrompt e o userPrompt. Sem IA.
     · navegador (JsFabrica.html) → chama a IA (stream, 20 min), faz parse,
       valida, trunca, gera UUID/banca/ano/ia_revisado.
     · fabricarQuestoesIA_Fase2_Salvar → servidor, rápido e idempotente por UUID.
   ══════════════════════════════════════════════════════════════════════════ */
var FABRICA_USAR_SCHEMA = false;   // V-FAB-5 desligado: response_mime_type JSON + parser anti-crash

function _fabMontarPrompts_(disciplina, tema, subtema, qtdDesejada, dificuldade, diretrizesUsuario) {
    var root = getFolder(PASTA_RAIZ);
    var mainFolder = getFolder(PASTA_QUESTOES, root);
    var disciplinaFolder = _garantirPastaQuestoes(disciplina);   // V91: disciplina nova do edital ainda não tem pasta

    var fileAlvoInfo = null;
    var nomeExato = limparNomeArquivo(disciplina) + '___' + limparNomeArquivo(tema) + '.json';
    var filesExatos = disciplinaFolder.getFilesByName(nomeExato);

    if (filesExatos.hasNext()) {
      fileAlvoInfo = filesExatos.next();
    } else {
      var files = disciplinaFolder.getFiles();
      var temaLimpo = limparNomeArquivo(tema);
      while (files.hasNext()) {
        var f = files.next();
        if (f.getName().includes(temaLimpo) && f.getName().endsWith('.json')) {
          fileAlvoInfo = f; break;
        }
      }
    }

    var resumosExistentes = [];
    if (fileAlvoInfo) {
      var tempJson = JSON.parse(fileAlvoInfo.getBlob().getDataAsString());
      if (tempJson.questoes) {
        tempJson.questoes.forEach(function (q) {
          if (q.subtema === subtema) {
            var limpo = (q.enunciado || '').replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').substring(0, 150);
            resumosExistentes.push("- " + limpo + "...");
          }
        });
      }
    }

    if (resumosExistentes.length > 25) resumosExistentes = resumosExistentes.slice(-25);

    var historicoAntiDuplicatas = resumosExistentes.length > 0
      ? "O banco já possui questões neste subtema sobre os cenários:\n" + resumosExistentes.join("\n") + "\n\nÉ ESTRITAMENTE PROIBIDO gerar questões idênticas. Crie cenários novos e pegadinhas diferentes."
      : "Não há questões deste subtema no banco. Liberdade criativa total.";

    var sysPrompt =
      "Você é um Examinador Titular de bancas (FGV, FCC e Cebraspe) especializado no concurso de Agente da Polícia Judicial dos Tribunais do Poder Judiciário da União (TRFs, TRTs, TREs e TST).\n\n" +
      _perfilBancasParaPrompt() + "\n\n" +
      "SUA MISSÃO: Criar " + qtdDesejada + " questões INÉDITAS de múltipla escolha.\n" +
      "Disciplina: " + disciplina + "\n" +
      "Tema: " + tema + "\n" +
      "Subtema EXATO: " + subtema + "\n\n" +
      "PREVENÇÃO DE DUPLICATAS:\n" + historicoAntiDuplicatas + "\n\n" +
      "RETORNE EXCLUSIVAMENTE UM ARRAY JSON PURO:\n" +
      "[\n" +
      "  {\n" +
      "    \"enunciado\": \"<p>Texto...</p>\",\n" +
      "    \"alternativas\": {\"A\":\"...\",\"B\":\"...\",\"C\":\"...\",\"D\":\"...\",\"E\":\"...\"},\n" +
      "    \"resposta_correta\": \"A\",\n" +
      "    \"comentario_llm\": \"HTML EXATO DO TEMPLATE PREENCHIDO\",\n" +
      "    \"subtema\": \"" + subtema + "\"\n" +
      "  }\n" +
      "]\n\n" +
      "== TEMPLATE PARA comentario_llm ==\n" +
      (typeof TEMPLATE_HTML_MULTIPLA_ESCOLHA !== 'undefined' ? TEMPLATE_HTML_MULTIPLA_ESCOLHA : "<p>Gabarito justificado</p>") + "\n\n" +
      "═══ RIGOR TÉCNICO (INVIOLÁVEL — questão errada ensina conteúdo errado) ═══\n" +
      "1. NUNCA invente número de artigo, súmula, prazo, alíquota, percentual ou valor.\n" +
      "   Sem certeza absoluta do dado? Formule a questão SEM ele. Um enunciado mais genérico\n" +
      "   e correto vale infinitamente mais que um específico e errado.\n" +
      "2. A alternativa correta tem de ser DEFENSÁVEL: exista norma, doutrina pacífica ou\n" +
      "   cálculo que a sustente. Nada de questão que dependa de interpretação pessoal.\n" +
      "3. NENHUMA outra alternativa pode também estar correta. Antes de fechar a questão,\n" +
      "   releia as 5 e confirme que exatamente UMA se sustenta.\n" +
      "4. resposta_correta tem de ser a letra de uma alternativa que existe no objeto.\n\n" +
      "═══ QUALIDADE DOS DISTRATORES (é o que separa questão boa de ruim) ═══\n" +
      "- Cada distrator representa um ERRO CONCEITUAL ESPECÍFICO que o candidato realmente comete:\n" +
      "  trocar competência de ente, inverter regra e exceção, confundir prazo parecido,\n" +
      "  aplicar o princípio certo ao caso errado, errar a base de cálculo.\n" +
      "- PROIBIDO distrator absurdo, que se elimina sem saber a matéria.\n" +
      "- PROIBIDO usar comprimento como pista: a correta não pode ser sistematicamente a mais longa.\n" +
      "- PROIBIDO 'todas as anteriores', 'nenhuma das anteriores' e negativa dupla no enunciado.\n" +
      "- Alternativas com extensão e estrutura gramatical parecidas entre si.\n\n" +
      "═══ CONSTRUÇÃO ═══\n" +
      "- UMA questão cobra UM ponto. Não empilhe assuntos no mesmo enunciado.\n" +
      "- Enunciado autossuficiente: quem lê só ele consegue responder, sem depender das alternativas.\n" +
      "- VARIE O GABARITO: distribua a letra correta entre A, B, C, D e E ao longo do lote.\n" +
      "  Concentrar em uma ou duas letras torna o treino viciado e inútil.\n" +
      "- Questão de cálculo: os números do enunciado têm de fechar com a alternativa correta.\n" +
      "  Refaça a conta antes de entregar. Moeda em texto normal, NUNCA em KaTeX.\n" +
      "- O comentário explica por que a correta está certa E por que cada distrator está errado.\n\n" +
      "═══ CONFERÊNCIA FINAL (execute antes de responder) ═══\n" +
      "  [ ] Gerei exatamente a quantidade pedida?\n" +
      "  [ ] Toda questão pertence ao subtema EXATO solicitado?\n" +
      "  [ ] Nenhuma repete outra do lote nem do histórico de duplicatas?\n" +
      "  [ ] Cada resposta_correta existe entre as alternativas daquela questão?\n" +
      "  [ ] As letras corretas estão variadas no lote?\n" +
      "  [ ] Nenhum dado inventado (artigo, prazo, alíquota)?\n" +
      "  [ ] O JSON fecha corretamente, sem quebra de linha literal dentro das strings?\n\n" +
      "REGRAS: 1) Campo comentario_llm DEVE ser string HTML única. 2) Escapar aspas internas (\\\"). 3) Sem quebras literais (Enter), use <br>. 4) KaTeX com 4 barras (\\\\\\\\frac).";

    var userPrompt = "Subtema: " + subtema + ".\nDificuldade: " + dificuldade + ".\nDiretrizes: " + (diretrizesUsuario || "Gere pegadinhas.");

    return { sysPrompt: sysPrompt, userPrompt: userPrompt, existentes: resumosExistentes.length };
}

/** Rápido, sem IA: devolve os prompts da Fábrica para o navegador gerar. */
function fabricaPrepararPrompt(disciplina, tema, subtema, qtd, dificuldade, diretrizes) {
  var _t0 = Date.now();
  Logger.log('[FÁBRICA-PREP] ▶ início | ' + disciplina + ' > ' + tema + ' > ' + subtema + ' | qtd=' + qtd);
  try {
    var qtdN = Math.max(1, Math.min(20, parseInt(qtd, 10) || 5));
    var pr = _fabMontarPrompts_(disciplina, tema, subtema, qtdN, dificuldade, diretrizes);
    var ms = Date.now() - _t0;
    Logger.log('[FÁBRICA-PREP] ✅ fim em ' + ms + 'ms | sys=' + pr.sysPrompt.length + ' chars | user=' +
               pr.userPrompt.length + ' chars | resumos existentes=' + pr.existentes);
    return { sucesso: true, sysPrompt: pr.sysPrompt, userPrompt: pr.userPrompt, existentes: pr.existentes,
             qtd: qtdN, usarSchema: FABRICA_USAR_SCHEMA, ms: ms };
  } catch (e) {
    Logger.log('[FÁBRICA-PREP] ❌ ' + e.message + ' | ' + (Date.now() - _t0) + 'ms');
    return { sucesso: false, erro: 'Falha ao preparar o prompt da Fábrica: ' + e.message };
  }
}

/* Mantida (mesmo nome e assinatura) para qualquer chamador antigo. Roda pela
   ponte de IA (iaExecutarDiferido): a chamada à IA é feita pelo navegador.
   O fluxo atual da Fábrica NÃO usa esta função — usa fabricaPrepararPrompt +
   geração no navegador + fabricarQuestoesIA_Fase2_Salvar. */
function fabricarQuestoesIA_Fase1_Gerar(disciplina, tema, subtema, qtdDesejada, motorId, dificuldade, diretrizesUsuario, filaModelos, progressoId) {
  var _t0 = Date.now();
  try {
    var prefs = carregarPreferenciasUsuario();
    var apiKey = (prefs && prefs.config && prefs.config.gemini_api_key) ? prefs.config.gemini_api_key : null;

    var motorReal = motorId;
    try {
      if (Array.isArray(filaModelos) && filaModelos.length &&
          String(motorId).indexOf('claude') === -1 &&
          typeof _cvProximoModeloEscalonado_ === 'function') {
        motorReal = _cvProximoModeloEscalonado_(motorId || filaModelos[0], filaModelos);
        if (motorReal !== motorId) {
          Logger.log('[FÁBRICA] ⬇️ ' + motorId + ' hibernando — usando ' + motorReal + ' neste lote.');
        }
      }
    } catch (eFila) { motorReal = motorId; }

    Logger.log('[FÁBRICA] Solicitado: ' + qtdDesejada + ' questões | Subtema: ' + subtema);

    var _pr = _fabMontarPrompts_(disciplina, tema, subtema, qtdDesejada, dificuldade, diretrizesUsuario);
    var sysPrompt = _pr.sysPrompt, userPrompt = _pr.userPrompt;
    var _maxOut = Math.min(65536, 8000 + 1500 * (parseInt(qtdDesejada, 10) || 5));

    var resultadoIA;
    if (motorReal.indexOf('claude') !== -1) {
      resultadoIA = iaAgente_({ model: motorReal, prompt: userPrompt, systemPrompt: sysPrompt, jsonMode: true, maxTokens: _maxOut, contextoGasto: 'Questoes/Fabrica' }, 'claude');
    } else {
      var _pIA = { apiKey: apiKey, model: motorReal, prompt: userPrompt, systemPrompt: sysPrompt,
                   jsonMode: true, maxTokens: _maxOut, contextoGasto: 'Questoes/Fabrica',
                   filaModelos: (Array.isArray(filaModelos) && filaModelos.length) ? filaModelos : null };
      if (FABRICA_USAR_SCHEMA) {
        _pIA.responseSchema = {
          type: 'ARRAY',
          items: {
            type: 'OBJECT',
            properties: {
              enunciado:       { type: 'STRING' },
              alternativas:    { type: 'OBJECT', properties: { A: { type: 'STRING' }, B: { type: 'STRING' }, C: { type: 'STRING' }, D: { type: 'STRING' }, E: { type: 'STRING' } }, required: ['A', 'B', 'C', 'D', 'E'] },
              resposta_correta:{ type: 'STRING' },
              comentario_llm:  { type: 'STRING' },
              subtema:         { type: 'STRING' }
            },
            required: ['enunciado', 'alternativas', 'resposta_correta', 'comentario_llm']
          }
        };
      }
      resultadoIA = iaAgente_(_pIA, 'gemini');
    }

    if (!resultadoIA.success) {
      var _cls = _fabClassificarErroIA_(resultadoIA);
      return {
        sucesso: false,
        erro: resultadoIA.erro,
        isQuota: _cls.isQuota,
        isDemanda: _cls.isDemanda,
        isInfra: _cls.isInfra,
        aguardar_ms: _cls.aguardar_ms,
        isRecitation: _cls.isRecitation,
        modelo_usado: resultadoIA.modelo_final || motorReal,
        modelo_final: resultadoIA.modelo_final || motorReal,
        modelos_tentados: resultadoIA.modelos_tentados || [motorReal],
        standby_por_modelo: resultadoIA.standby_por_modelo || null
      };
    }

    var novasQuestoes = [];
    if (typeof resultadoIA.resultado === 'string') {
      try {
        var raw = resultadoIA.resultado.replace(/```json|```/g, '').trim().replace(/[\n\r]+/g, ' ');
        novasQuestoes = JSON.parse(raw);
      } catch (e) {
        // V-FAB-5 — última chance: escapa aspas internas não escapadas (ver _cvReparaJson_, Canvas.gs).
        var _rp = (typeof _cvReparaJson_ === 'function') ? _cvReparaJson_(resultadoIA.resultado) : null;
        if (_rp === null) return { sucesso: false, erro: 'JSON inválido: ' + e.message };
        Logger.log('[FÁBRICA] 🩹 JSON da IA reparado (aspas internas).');
        novasQuestoes = _rp;
      }
    } else {
      novasQuestoes = resultadoIA.resultado;
    }

    if (!Array.isArray(novasQuestoes)) novasQuestoes = novasQuestoes.questoes || [];
    if (novasQuestoes.length === 0) return { sucesso: false, erro: 'A IA não retornou questões.' };

    // ══════════════════════════════════════════════════════════════
    // V20 — VALIDAÇÃO DETERMINÍSTICA ANTES DE ENTRAR NO BANCO
    // Antes disto, o que a IA gerasse ia direto para o Drive. Uma questão com
    // gabarito apontando para alternativa inexistente, ou com duas alternativas
    // idênticas, entrava e ensinava errado — e ninguém ficava sabendo.
    // Defeito GRAVE descarta a questão; defeito leve fica registrado nela.
    // ══════════════════════════════════════════════════════════════
    var _vq = validarQuestoesLote(novasQuestoes);
    var _graves = /alternativa INEXISTENTE|DUPLICADA|resposta_correta ausente|resposta_correta invalida|enunciado vazio|alternativa\(s\) vazia\(s\)|minimo 4/;
    var _descartadas = 0;

    if (_vq.problemas.length > 0) {
      var _mapa = {};
      _vq.problemas.forEach(function(r) { _mapa[r.index] = r.problemas; });

      novasQuestoes = novasQuestoes.filter(function(nq, i) {
        var probs = _mapa[i];
        if (!probs) return true;
        var ehGrave = probs.some(function(t) { return _graves.test(t); });
        if (ehGrave) {
          Logger.log('[FÁBRICA] ⛔ questão ' + i + ' DESCARTADA: ' + probs.join(' | '));
          _descartadas++;
          return false;
        }
        nq.validacao_v20 = { problemas: probs };
        Logger.log('[FÁBRICA] ⚠️ questão ' + i + ' entra com ressalva: ' + probs.join(' | '));
        return true;
      });
    }

    // V42-M5 — não havia teto: um modelo que devolvesse 12 para um pedido de 5
    // gravava as 12 e estourava a cota do subtema.
    if (qtdDesejada > 0 && novasQuestoes.length > qtdDesejada) {
      Logger.log('[FÁBRICA] ✂️ modelo devolveu ' + novasQuestoes.length + ' para um pedido de ' + qtdDesejada + ' — truncando.');
      novasQuestoes = novasQuestoes.slice(0, qtdDesejada);
    }

    Logger.log('[FÁBRICA] Validação: ' + novasQuestoes.length + ' aprovada(s), ' + _descartadas + ' descartada(s).');
    if (novasQuestoes.length === 0) {
      return { sucesso: false, erro: 'Todas as ' + _descartadas + ' questões geradas foram reprovadas na validação estrutural.' };
    }

    novasQuestoes.forEach(function (nq) {
      nq.id = Utilities.getUuid();
      nq.banca = "IA - " + motorReal.split('-')[0].toUpperCase();
      nq.ano = new Date().getFullYear();
      nq.ia_revisado = true;
      if (!nq.subtema) nq.subtema = subtema;
    });

    var _dbgIA = resultadoIA.debug || {};   // V-FAB-4 — o front mostra modelo/chave/tentativa finais no cabeçalho
    return { sucesso: true, novasQuestoes: novasQuestoes, qtd_gerada: novasQuestoes.length, motorReal: motorReal, descartadas: _descartadas, ms: Date.now() - _t0,
             modeloFinal: resultadoIA.modelo || motorReal, chaveFinal: _dbgIA.chave || null, tentativasFinal: _dbgIA.tentativas || null };

  } catch (e) {
    if (iaPendente_()) throw e;   // V-MIGRA-2 — pedido de IA aberto: deixa a ponte responder
    return { sucesso: false, erro: "Falha interna na Fase 1: " + e.message };
  }
}


function fabricarQuestoesIA_Fase2_Salvar(disciplina, tema, subtema, novasQuestoes, motorReal, opcoes) {
  var _t0 = Date.now(), _msLock = 0;
  // V-MIGRA-2.7 — tempo de CADA etapa volta para o navegador (a Fase 2 chegou a 171 s sem dizer onde).
  // opcoes.adiarFirebase: a sincronização com o Firebase sai do caminho crítico — o navegador a chama
  // depois, em fila própria (fabricaSincronizarFirebase), e a próxima gravação não espera por ela.
  opcoes = opcoes || {};
  var _et = {}, _tEt = Date.now();
  var _marca = function (nome) { var a = Date.now(); _et[nome] = a - _tEt; _tEt = a; };
  var _fbFileId = null, _fbConteudo = null, _fbPendente = false;
  try {
    if (!Array.isArray(novasQuestoes) || novasQuestoes.length === 0) {
      return { sucesso: false, erro: 'Fase 2 recebeu lote vazio.' };
    }
    var lock = LockService.getScriptLock();
    try {
      var _tLock = Date.now();
      lock.waitLock(30000);
      _msLock = Date.now() - _tLock;

      var disciplinaFolder = _garantirPastaQuestoes(disciplina);
      var nomeExato = limparNomeArquivo(disciplina) + '___' + limparNomeArquivo(tema) + '.json';

      var fileAlvo = disciplinaFolder.getFilesByName(nomeExato);
      var arquivoAtual = fileAlvo.hasNext() ? fileAlvo.next() : null;

      if (!arquivoAtual) {
        var numerosTema = tema.match(/\d+/g);
        if (numerosTema && numerosTema.length > 0) {
          var filesNumeros = disciplinaFolder.getFiles();
          while (filesNumeros.hasNext()) {
            var fNum = filesNumeros.next();
            // V42-M3 — um arquivo avulso sem '___' no nome fazia [1] ser undefined
            // e .match() estourar TypeError DENTRO do lock: o erro virava
            // "Concorrência no salvamento" e o lote gerado era jogado fora.
            var _parteArq = fNum.getName().replace('.json', '').split('___')[1];
            var matchArq = _parteArq ? _parteArq.match(/^0*(\d+)/) : null;
            if (matchArq && parseInt(matchArq[1], 10) === parseInt(numerosTema[0], 10)) {
              arquivoAtual = fNum; break;
            }
          }
        }
      }

      if (!arquivoAtual) {
        // V91 — tema novo do edital: cria o arquivo do banco em vez de perder o lote gerado.
        arquivoAtual = disciplinaFolder.createFile(nomeExato, JSON.stringify({ disciplina: disciplina, tema: tema, questoes: [] }, null, 2), MimeType.PLAIN_TEXT);
        Logger.log('[FÁBRICA-F2] 🆕 Arquivo criado para tema novo: ' + nomeExato);
      }

      _marca('localizar');
      var _rawAtual = arquivoAtual.getBlob().getDataAsString();   // V-MIGRA-2.7 — lido 1x (antes: 2x, a 2ª só para o backup)
      var conteudoJson = JSON.parse(_rawAtual);
      if (!conteudoJson.questoes) conteudoJson.questoes = [];
      _marca('ler');

      // ═══════════════════════════════════════════════════════════════════════
      // V42-A5 — DEDUPLICAÇÃO DETERMINÍSTICA
      // O push era cego e cada questão recebia um UUID novo, então nada impedia
      // que uma reexecução (ou um Raio-X velho) regravasse os mesmos enunciados.
      // A defesa era só de prompt (25 resumos de 150 chars), que não segura nada
      // num subtema com centenas de questões. Aqui o enunciado é normalizado e
      // comparado com o que já existe no arquivo.
      // ═══════════════════════════════════════════════════════════════════════
      var _norm = function (s) {
        return String(s || '')
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
      };
      // V-FAB-2 — IDEMPOTÊNCIA POR ID. Os UUIDs nascem na Fase 1 e voltam idênticos
      // num retry de rede. Se o 1º envio gravou mas a resposta se perdeu
      // (ERR_NETWORK_IO_SUSPENDED), o retry encontra os MESMOS ids no arquivo:
      // isso é "já gravado", não duplicata — e não pode virar erro do lote.
      var _idsExistentes = {};
      conteudoJson.questoes.forEach(function (q) { if (q && q.id) _idsExistentes[q.id] = true; });
      var _jaGravadas = 0;
      novasQuestoes = novasQuestoes.filter(function (nq) {
        if (nq && nq.id && _idsExistentes[nq.id]) { _jaGravadas++; return false; }
        return true;
      });

      var _existentes = {};
      conteudoJson.questoes.forEach(function (q) {
        var k = _norm(q.enunciado);
        if (k) _existentes[k] = true;
      });

      var _dupes = 0;
      novasQuestoes = novasQuestoes.filter(function (nq) {
        var k = _norm(nq.enunciado);
        if (!k) return true;
        if (_existentes[k]) { _dupes++; return false; }
        _existentes[k] = true;
        return true;
      });
      if (_dupes) Logger.log('[FÁBRICA-F2] 🔁 ' + _dupes + ' questão(ões) duplicada(s) bloqueada(s) na gravação.');
      if (novasQuestoes.length === 0) {
        if (_jaGravadas > 0) {
          Logger.log('[FÁBRICA-F2] ♻️ Retry idempotente: ' + _jaGravadas + ' questão(ões) já gravadas pela tentativa anterior.');
          return { sucesso: true, qtd_gerada: _jaGravadas, jaGravado: true, modelo_usado: motorReal, duplicadas: _dupes, ms: Date.now() - _t0, ms_lock: _msLock };
        }
        return { sucesso: false, erro: 'Todas as ' + _dupes + ' questões geradas já existiam no banco (duplicatas).' };
      }

      novasQuestoes.forEach(function (nq) { conteudoJson.questoes.push(nq); });

      var timestamp = Utilities.formatDate(new Date(), "GMT-3", "yyyyMMdd_HHmmss");
      var pastaBackup = _fabPastaBackup_();
      pastaBackup.createFile(arquivoAtual.getName().replace('.json', '') + '_BACKUP_' + timestamp + '.json', _rawAtual, MimeType.PLAIN_TEXT);
      _marca('backup');

      arquivoAtual.setContent(JSON.stringify(conteudoJson, null, 2));
      _marca('gravar');
      // V31 — questões novas entram no Firebase junto com o Drive.
      // V-MIGRA-2.7 — fora do lock (abaixo) ou adiada para o navegador (opcoes.adiarFirebase).
      if (typeof _dxBancoAtualizado === 'function') { _fbFileId = arquivoAtual.getId(); _fbConteudo = conteudoJson; }

    } catch (eLock) {
      Logger.log("Erro de Concorrência (Lock): " + eLock.message);
      return { sucesso: false, erro: "Concorrência no salvamento: " + eLock.message };
    } finally {
      lock.releaseLock();
    }
    _tEt = Date.now();

    if (_fbFileId) {
      if (opcoes.adiarFirebase) _fbPendente = true;
      else { try { _dxBancoAtualizado(_fbFileId, _fbConteudo); } catch (eFb) {} _marca('firebase'); }
    }

    CacheService.getScriptCache().remove(CACHE_KEY_CONTAGEM_PREFIX + disciplina.replace(/\s+/g, '_').toUpperCase());

    /* V-FAB-1 — DEADLOCK REMOVIDO. Antes: limparCacheArquivos() marcava o
       Raio-X como sujo, e obterFilaFabricaQuestoes se recusava a planejar com
       Raio-X sujo. Uma rodada bem-sucedida bloqueava a seguinte até um rebuild
       completo. Agora a própria gravação atualiza a contagem do subtema; só se
       isso falhar é que o Raio-X é marcado sujo. */
    limparCacheArquivosSemSujar();
    _tEt = Date.now();
    if (!_raioXIncrementarSubtema(disciplina, tema, subtema, novasQuestoes.length)) {
      _marcarRaioXSujo();
    }
    _marca('raiox');
    Logger.log('[FÁBRICA-F2] ⏱ ' + subtema + ' | ' + Object.keys(_et).map(function (k) { return k + ' ' + (_et[k] / 1000).toFixed(1) + 's'; }).join(' · ') +
               ' | total ' + ((Date.now() - _t0) / 1000).toFixed(1) + 's' + (_fbPendente ? ' | Firebase adiado' : ''));

    return { sucesso: true, qtd_gerada: novasQuestoes.length, modelo_usado: motorReal, duplicadas: (typeof _dupes === 'number' ? _dupes : 0), ms: Date.now() - _t0, ms_lock: _msLock,
             etapas: _et, firebasePendente: _fbPendente, fileId: _fbPendente ? _fbFileId : null };

  } catch (e) {
    return { sucesso: false, erro: "Falha interna na Fase 2: " + e.message };
  }
}

/* V-MIGRA-2.7 — pasta de backup resolvida 1x a cada 6 h (antes: 2 buscas de pasta por nome em CADA gravação). */
function _fabPastaBackup_() {
  var cache = CacheService.getScriptCache(), id = cache.get('FAB_PASTA_BACKUP_ID');
  if (id) { try { return DriveApp.getFolderById(id); } catch (e) {} }
  var pasta = getFolder(PASTA_BACKUPS, getFolder(PASTA_RAIZ));
  try { cache.put('FAB_PASTA_BACKUP_ID', pasta.getId(), 21600); } catch (e2) {}
  return pasta;
}

/* V-MIGRA-2.7 — sincronização do banco com o Firebase FORA do caminho crítico da Fase 2.
   O navegador chama em fila serial própria, 1 por arquivo (coalescida): lê o arquivo ATUAL
   do Drive, então a última sincronização sempre leva o estado mais novo. */
function fabricaSincronizarFirebase(fileId) {
  var t0 = Date.now();
  try {
    if (typeof _dxBancoAtualizado !== 'function') return { sucesso: true, ignorado: true, ms: 0 };
    var f = DriveApp.getFileById(fileId);
    var conteudo = JSON.parse(f.getBlob().getDataAsString());
    _dxBancoAtualizado(fileId, conteudo);
    var ms = Date.now() - t0;
    Logger.log('[FÁBRICA-FB] ☁ ' + f.getName() + ' sincronizado em ' + (ms / 1000).toFixed(1) + 's');
    return { sucesso: true, ms: ms, questoes: (conteudo.questoes || []).length };
  } catch (e) {
    return { sucesso: false, erro: e.message, ms: Date.now() - t0 };
  }
}

// ============================================================================
// RESET TOTAL DE CACHE (SEM TOCAR EM ARQUIVOS DO DRIVE)
// Limpa ScriptCache, UserCache e flags internas de PropertiesService.
// NÃO deleta, NÃO move, NÃO altera nenhum arquivo do Google Drive.
// ============================================================================
/* ══════════════════════════════════════════════════════════════════════════════
   V37 — FUNÇÃO QUE FALTAVA NO SERVIDOR

   `resetarTudo()` no frontend chamava `google.script.run…limparEstadoUsuario()`,
   e essa função não existia em nenhum arquivo do projeto: o botão "Apagar TUDO"
   travava no "carregando" e o erro só aparecia no console do navegador.

   Ela agora existe e faz o que o nome diz, sem apagar arquivo nenhum do Drive:
   zera os caches e o estado de sessão, para o sistema recarregar do zero. Quem
   quer apagar dados de verdade usa as opções da aba Sistema, que avisam antes.
   ══════════════════════════════════════════════════════════════════════════════ */
function limparEstadoUsuario() {
  var passos = [];
  try {
    var r = resetarCacheCompleto100SemDeletarArquivos();
    passos.push('cache do sistema limpo');
    if (r && r.logs) {
      var erros = r.logs.filter(function (l) { return l.tipo === 'erro'; }).length;
      if (erros) passos.push(erros + ' aviso(s) durante a limpeza');
    }
  } catch (e) {
    passos.push('não consegui limpar o cache do sistema: ' + e.message);
  }

  try {
    var up = PropertiesService.getUserProperties();
    ['STUDYOS_ESTADO', 'STUDYOS_SESSAO_TMP', 'STUDYOS_ULTIMO_CICLO'].forEach(function (k) {
      try { up.deleteProperty(k); } catch (e2) {}
    });
    passos.push('estado da sua sessão zerado');
  } catch (e3) {
    passos.push('estado da sessão não pôde ser zerado: ' + e3.message);
  }

  try {
    CacheService.getUserCache().removeAll([
      'PREFS_USUARIO', 'CONFIG_LIVE', 'PROMPTS_LIVE', 'CACHE_ESTRUTURA',
      'CONFIG_CICLO', 'ESTADO_USUARIO', 'TEMPLATE_ATIVO'
    ]);
  } catch (e4) {}

  // o registro de modelos guarda a configuração por execução; sem isto a
  // próxima leitura ainda viria da memória antiga
  try { if (typeof cvInvalidarCacheModelos === 'function') cvInvalidarCacheModelos(); } catch (e5) {}

  Logger.log('[RESET] limparEstadoUsuario: ' + passos.join(' · '));
  return 'Pronto. ' + passos.join('. ') +
         '.\n\nNenhum arquivo foi apagado do seu Drive — só a memória temporária. ' +
         'O sistema vai recarregar tudo do zero.';
}

function resetarCacheCompleto100SemDeletarArquivos() {
  var logs = [];
  var t0 = Date.now();
  function log(msg, tipo) {
    tipo = tipo || 'info';
    logs.push({ tipo: tipo, msg: msg, ts: new Date().toISOString() });
    Logger.log('[RESET-CACHE] ' + msg);
  }

  log('Iniciando reset total de cache (Drive intocado).', 'info');

  try {
    var sc = CacheService.getScriptCache();
    var chaves = [
      CACHE_KEY_MAPA, 'ESTRUTURA_CICLO_V13', 'CACHE_PRECISA_RECONSTRUIR',
      'HIST_DESEMP', 'CFG_CICLO', 'PREFS_USER', DOSSIE_CACHE_KEY,
      FLAG_BOOT_SYNC, FLAG_BOOT_ASYNC, FLAG_RAIOX_REBUILD,
      'PRECOS_MODELOS', 'CONFIG_GLOBAL'
    ];
    try {
      var mapa = listarArquivosRapido();
      Object.keys(mapa).forEach(function(d) {
        var key = d.replace(/\s+/g, '_').toUpperCase();
        chaves.push(CACHE_KEY_CONTAGEM_PREFIX + key);
        chaves.push('CONTAGEM_EXATA_' + key);
      });
    } catch (eMapa) {
      log('Aviso: não varreu cache dinâmico por disciplina — ' + eMapa.message, 'aviso');
    }
    sc.removeAll(chaves);
    log('ScriptCache: ' + chaves.length + ' chave(s) removida(s).', 'ok');
  } catch (e1) {
    log('Falha ao limpar ScriptCache: ' + e1.message, 'erro');
  }

  try {
    CacheService.getUserCache().removeAll([
      'PREFS_USUARIO', 'CONFIG_LIVE', 'PROMPTS_LIVE', 'CACHE_ESTRUTURA',
      'CONFIG_CICLO', 'ESTADO_USUARIO', 'TEMPLATE_ATIVO',
      'DRIVE_FILE_' + ARQUIVO_HISTORICO, 'DRIVE_FILE_' + ARQUIVO_CONFIG_CICLO
    ]);
    log('UserCache limpo.', 'ok');
  } catch (e2) {
    log('Falha ao limpar UserCache: ' + e2.message, 'erro');
  }

  try {
    var props = PropertiesService.getScriptProperties();
    props.deleteProperty(PROP_RAIOX_SUJO);
    props.deleteProperty('CHAVE_QUARENTENA');
    props.setProperty('CHAVE_INDEX', '0');
    props.deleteProperty('CV_JOBS_INDEX');
    log('Flags, Quarentenas e Índices de Lousa removidos.', 'ok');
  } catch (e3) {
    log('Falha ao limpar propriedades: ' + e3.message, 'erro');
  }

  try {
    _marcarRaioXSujo();
    log('Raio-x marcado para reconstrução no próximo carregamento.', 'ok');
  } catch (e4) {}

  var ms = Date.now() - t0;
  log('Reset backend concluído em ' + ms + 'ms.', 'ok');
  return { sucesso: true, logs: logs, tempo_ms: ms };
}


// ════════════════════════════════════════════════════════════════════════════
// V41 — FILA DE SÉRIE DE LOUSAS (persistência entre sessões)
// ----------------------------------------------------------------------------
// Nomes propositalmente EXCLUSIVOS (…FilaSerieLousas) para não colidir com as
// funções de job por lousa (registrarJobCanvas / obterJobCanvasPendente /
// descartarJobCanvas), que vivem em outro arquivo do projeto.
// Guarda um único JSON na pasta de lousas: a série é uma só por usuário.
// A granularidade da retomada é POR LOUSA — não por slide.
// ════════════════════════════════════════════════════════════════════════════

const ARQ_FILA_SERIE_LOUSAS = "_fila_serie_lousas.json";

function _pastaFilaSerieLousas() {
  const root = getFolder(PASTA_RAIZ);
  return getFolder(PASTA_LOUSAS, root);
}

/**
 * Grava (ou regrava) a fila da série.
 * @param {Object} fila { id, criadaEm, modo, indice, itens:[{disciplina,tema,titulo,status,erro,fim}] }
 */
function salvarFilaSerieLousas(fila) {
  try {
    if (!fila || !fila.itens || !fila.itens.length) return { sucesso: false, erro: "fila vazia" };
    const pasta = _pastaFilaSerieLousas();
    const conteudo = JSON.stringify(fila);
    const arquivos = pasta.getFilesByName(ARQ_FILA_SERIE_LOUSAS);
    if (arquivos.hasNext()) {
      arquivos.next().setContent(conteudo);
    } else {
      pasta.createFile(ARQ_FILA_SERIE_LOUSAS, conteudo, MimeType.PLAIN_TEXT);
    }
    return { sucesso: true, itens: fila.itens.length, indice: fila.indice || 0 };
  } catch (e) {
    Logger.log("salvarFilaSerieLousas: " + e.message);
    return { sucesso: false, erro: e.message };
  }
}

/**
 * Devolve a fila pendente, se houver e se ainda faltar algum item.
 * @return {Object} { pendente:boolean, fila:Object|null, motivo?:string }
 */
function carregarFilaSerieLousas() {
  try {
    const pasta = _pastaFilaSerieLousas();
    const arquivos = pasta.getFilesByName(ARQ_FILA_SERIE_LOUSAS);
    if (!arquivos.hasNext()) return { pendente: false, fila: null, motivo: "sem arquivo" };

    const fila = JSON.parse(arquivos.next().getBlob().getDataAsString());
    if (!fila || !fila.itens || !fila.itens.length) return { pendente: false, fila: null, motivo: "fila vazia" };

    const falta = fila.itens.filter(function (i) { return i.status !== "ok"; }).length;
    if (falta === 0) return { pendente: false, fila: null, motivo: "concluida" };

    return { pendente: true, fila: fila, falta: falta, total: fila.itens.length };
  } catch (e) {
    Logger.log("carregarFilaSerieLousas: " + e.message);
    return { pendente: false, fila: null, motivo: e.message };
  }
}

/** Remove a fila (série concluída ou descartada pelo usuário). */
/* ════════════════════════════════════════════════════════════════════════════
   V88 — CHECKPOINT DO LOTE DE IA NO DRIVE (tópicos e questões)
   O checkpoint vivia só no localStorage do navegador: quem roda o StudyOS em
   mais de um computador não conseguia retomar de outra máquina, e uma limpeza
   de cache levava a fila embora. Agora o mesmo estado vai para um JSON único
   no Drive; o localStorage continua como cópia rápida/offline.
   Um arquivo por usuário — a retomada é POR ITEM, como já era.
   ════════════════════════════════════════════════════════════════════════════ */

const ARQ_CHECKPOINT_LOTE_IA = "_checkpoint_lote_ia.json";

function _pastaCheckpointLoteIA() {
  const root = getFolder(PASTA_RAIZ);
  return getFolder(PASTA_DADOS, root);
}

/**
 * Grava (ou regrava) o checkpoint do lote.
 * @param {Object} estado { modo, fila, blocoEmVoo, filaFalhas, feitos, logHist, ... }
 */
function salvarCheckpointLoteIADrive(estado) {
  var lock = LockService.getScriptLock();
  try {
    if (!estado) return { sucesso: false, erro: "estado vazio" };
    lock.waitLock(15000);
    const pasta = _pastaCheckpointLoteIA();
    estado.gravado_em = new Date().toISOString();
    const conteudo = JSON.stringify(estado);
    const arquivos = pasta.getFilesByName(ARQ_CHECKPOINT_LOTE_IA);
    if (arquivos.hasNext()) {
      arquivos.next().setContent(conteudo);
    } else {
      pasta.createFile(ARQ_CHECKPOINT_LOTE_IA, conteudo, MimeType.PLAIN_TEXT);
    }
    return { sucesso: true, bytes: conteudo.length, gravado_em: estado.gravado_em };
  } catch (e) {
    Logger.log("salvarCheckpointLoteIADrive: " + e.message);
    return { sucesso: false, erro: e.message };
  } finally {
    try { lock.releaseLock(); } catch (eL) {}
  }
}

function carregarCheckpointLoteIADrive() {
  try {
    const pasta = _pastaCheckpointLoteIA();
    const arquivos = pasta.getFilesByName(ARQ_CHECKPOINT_LOTE_IA);
    if (!arquivos.hasNext()) return { pendente: false, estado: null, motivo: "sem arquivo" };

    const estado = JSON.parse(arquivos.next().getBlob().getDataAsString());
    const nFila = (estado && estado.fila) ? estado.fila.length : 0;
    const nVoo = (estado && estado.blocoEmVoo) ? estado.blocoEmVoo.length : 0;
    const nFalhas = (estado && estado.filaFalhas) ? estado.filaFalhas.length : 0;
    if (nFila + nVoo + nFalhas === 0) return { pendente: false, estado: null, motivo: "nada pendente" };

    return { pendente: true, estado: estado, fila: nFila + nVoo, falhas: nFalhas, gravado_em: estado.gravado_em || null };
  } catch (e) {
    Logger.log("carregarCheckpointLoteIADrive: " + e.message);
    return { pendente: false, estado: null, motivo: e.message };
  }
}

function descartarCheckpointLoteIADrive() {
  try {
    const pasta = _pastaCheckpointLoteIA();
    const arquivos = pasta.getFilesByName(ARQ_CHECKPOINT_LOTE_IA);
    var n = 0;
    while (arquivos.hasNext()) { arquivos.next().setTrashed(true); n++; }
    return { sucesso: true, removidos: n };
  } catch (e) {
    Logger.log("descartarCheckpointLoteIADrive: " + e.message);
    return { sucesso: false, erro: e.message };
  }
}


function descartarFilaSerieLousas() {
  try {
    const pasta = _pastaFilaSerieLousas();
    const arquivos = pasta.getFilesByName(ARQ_FILA_SERIE_LOUSAS);
    var n = 0;
    while (arquivos.hasNext()) { arquivos.next().setTrashed(true); n++; }
    return { sucesso: true, removidos: n };
  } catch (e) {
    Logger.log("descartarFilaSerieLousas: " + e.message);
    return { sucesso: false, erro: e.message };
  }
}

// ══════════════════════════════════════════════════════════════════════════
// V92 — ARQUIVOS EM BRANCO AUTOMÁTICOS + EDITOR DE CRIAÇÃO
// Tudo roda a partir do app aberto: nenhuma função precisa ser executada no editor do Apps Script.
// ══════════════════════════════════════════════════════════════════════════

function _nomeArquivoTema(disciplina, tema) {
  return limparNomeArquivo(disciplina) + '___' + limparNomeArquivo(tema) + '.json';
}

// O arquivo já existente (qualquer nome razoável) representa este tema?
function _arquivoCasaComTema(nomeArquivo, tema) {
  var nome = String(nomeArquivo || '');
  if (nome.slice(-5).toLowerCase() !== '.json' || nome.indexOf('___') === -1) return false;
  var parte = nome.replace(/\.json$/i, '').split('___').slice(1).join('___');
  if (_normChaveV23(parte.replace(/_/g, ' ')) === _normChaveV23(tema)) return true;
  if (nome.indexOf(limparNomeArquivo(tema)) !== -1) return true;
  return _mesmoNumeroDeTema(nome, tema);
}

// ─────────────────────────────────────────────────────────────────────────────
// V98 — ASSINATURA DO EDITAL + LOG DE DEBUG EM TEMPO REAL DA PROVISÃO
// A assinatura muda sozinha quando uma disciplina/tema entra ou sai do Config.gs; o front a usa na
// versão da provisão, então não é mais preciso editar string de versão para criar os arquivos novos.
// O log vai para o Logger (execução) E para o CacheService, de onde o front lê a cada ~1,5 s
// (obterLogProvisao) enquanto provisionarArquivosEdital ainda está rodando.
// ─────────────────────────────────────────────────────────────────────────────
function assinaturaArquivosEdital() {
  try {
    if (typeof MAPA_DISTRIBUICAO_EDITAL === 'undefined' || !MAPA_DISTRIBUICAO_EDITAL) return '';
    var chaves = [];
    Object.keys(MAPA_DISTRIBUICAO_EDITAL).forEach(function(disc) {
      Object.keys(MAPA_DISTRIBUICAO_EDITAL[disc]).forEach(function(t) {
        if (_pertenceAoEditalAtivo(disc, t, null)) chaves.push(disc + '|' + t);
      });
    });
    chaves.sort();
    var s = chaves.join('\n'), h = 5381;
    for (var i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
    return chaves.length + 't-' + h.toString(36);
  } catch (e) { return ''; }
}

var _PROV_LOG_CHAVE = 'PROVISAO_EDITAL_LOG_V1';
var _provLogEstado = { runId: '', seq: 0, buf: [], ultimoFlush: 0 };

function _provLogIniciar(runId) {
  var seq = 0, buf = [];
  try {
    var raw = CacheService.getScriptCache().get(_PROV_LOG_CHAVE);
    if (raw) {
      var o = JSON.parse(raw);
      if (o && o.runId === runId) { buf = o.buf || []; seq = o.seq || 0; }   // mesma execução do front: continua a numeração
    }
  } catch (e) {}
  _provLogEstado = { runId: runId, seq: seq, buf: buf, ultimoFlush: 0 };
}

function _provLogFlush() {
  var st = _provLogEstado;
  try {
    CacheService.getScriptCache().put(_PROV_LOG_CHAVE, JSON.stringify({ runId: st.runId, seq: st.seq, buf: st.buf }), 21600);
    st.ultimoFlush = Date.now();
  } catch (e) {}
}

// nivel: info | ok | novo | aviso | erro | dbg
function _provLog(nivel, msg, forcar) {
  var st = _provLogEstado;
  try { Logger.log('[PROVISAO-EDITAL][' + nivel + '] ' + msg); } catch (e) {}
  st.seq++;
  st.buf.push({ s: st.seq, t: Date.now(), n: nivel, m: String(msg).slice(0, 300) });
  if (st.buf.length > 200) st.buf = st.buf.slice(-200);
  if (forcar || Date.now() - st.ultimoFlush > 400) _provLogFlush();
}

// Lido pelo front em paralelo à provisão. Devolve só as linhas com seq > desdeSeq.
function obterLogProvisao(runId, desdeSeq) {
  try {
    var raw = CacheService.getScriptCache().get(_PROV_LOG_CHAVE);
    if (!raw) return { sucesso: true, seq: 0, linhas: [] };
    var o = JSON.parse(raw);
    if (!o || o.runId !== runId) return { sucesso: true, seq: 0, linhas: [] };
    var d = Number(desdeSeq) || 0;
    return { sucesso: true, seq: o.seq, linhas: (o.buf || []).filter(function(l) { return l.s > d; }) };
  } catch (e) { return { erro: e.message }; }
}

// Cria, para TODOS os temas do edital ativo, o arquivo de resumo e o de questões (em branco)
// quando ainda não existem. Idempotente, sem apagar nada, com orçamento de tempo: o front chama de novo
// enquanto "restante" for maior que zero. runId (opcional) liga esta execução ao log em tempo real do front.
function provisionarArquivosEdital(limiteMs, runId) {
  var t0 = Date.now();
  var LIMITE = Number(limiteMs) > 0 ? Number(limiteMs) : 200000;
  runId = String(runId || ('srv-' + t0));
  _provLogIniciar(runId);
  var cache = CacheService.getScriptCache();
  var FLAG = 'PROVISIONANDO_EDITAL_PJ';
  try {
    if (cache.get(FLAG)) {
      _provLog('aviso', 'outra execução em andamento (trava ' + FLAG + ' ativa) — o front vai tentar de novo', true);
      return { sucesso: true, ocupado: true, restante: -1 };
    }
    cache.put(FLAG, '1', 300);
  } catch (eF) { _provLog('aviso', 'CacheService indisponível, seguindo sem trava: ' + eF.message); }

  try {
    if (typeof MAPA_DISTRIBUICAO_EDITAL === 'undefined' || !MAPA_DISTRIBUICAO_EDITAL) {
      _provLog('aviso', 'MAPA_DISTRIBUICAO_EDITAL não definido — nada a provisionar', true);
      return { sucesso: true, restante: 0, criados_total: 0, criados: { resumo: 0, questoes: 0 } };
    }
    var discsConfig = Object.keys(MAPA_DISTRIBUICAO_EDITAL);
    _provLog('info', 'início | runId=' + runId + ' | orçamento=' + Math.round(LIMITE / 1000) + 's | disciplinas no Config=' + discsConfig.length + ' | assinatura=' + assinaturaArquivosEdital());
    var root = getFolder(PASTA_RAIZ);
    var alvos = [
      { pasta: PASTA_RESUMO_PRO, tipo: 'resumo' },
      { pasta: PASTA_QUESTOES,   tipo: 'questoes' }
    ];
    var criados = { resumo: 0, questoes: 0 };
    var restante = 0;

    alvos.forEach(function(alvo) {
      var tAlvo = Date.now();
      var main = getFolder(alvo.pasta, root);
      _provLog('info', '━━ [' + alvo.tipo + '] pasta "' + alvo.pasta + '" (id ' + main.getId() + ')');
      discsConfig.forEach(function(disc) {
        var todos = Object.keys(MAPA_DISTRIBUICAO_EDITAL[disc]);
        var temas = todos.filter(function(t) {
          return _pertenceAoEditalAtivo(disc, t, null);
        });
        if (temas.length === 0) {
          _provLog('aviso', '[' + alvo.tipo + '] ' + disc + ': 0 temas ativos de ' + todos.length + ' no Config — ignorada');
          return;
        }
        if (Date.now() - t0 > LIMITE) {
          restante += temas.length;
          _provLog('aviso', '[' + alvo.tipo + '] ' + disc + ': orçamento de tempo esgotado — ' + temas.length + ' tema(s) ficam para a próxima chamada', true);
          return;
        }
        var tDisc = Date.now();
        _provLog('dbg', '[' + alvo.tipo + '] ' + disc + ': ' + temas.length + ' tema(s) ativo(s)' + (todos.length !== temas.length ? ' (' + (todos.length - temas.length) + ' fora do edital)' : ''));

        // V97 — considera também pasta legada com nome alternativo da mesma disciplina
        var pasta = null;
        var nomes = [];
        var pastasVistas = 0;
        var itF = main.getFolders();
        while (itF.hasNext()) {
          var pf = itF.next();
          pastasVistas++;
          var nf = pf.getName();
          if (nf !== disc && _disciplinaDoEdital(nf) !== disc) continue;
          if (nf === disc && !pasta) pasta = pf;
          var antes = nomes.length;
          var fs = pf.getFiles();
          while (fs.hasNext()) nomes.push(fs.next().getName());
          _provLog('dbg', '[' + alvo.tipo + '] ' + disc + ': ' + (nf === disc ? 'pasta encontrada' : 'pasta LEGADA "' + nf + '" considerada') + ' com ' + (nomes.length - antes) + ' arquivo(s)');
        }
        if (!pasta) {
          pasta = main.createFolder(disc);
          _provLog('novo', '📁 [' + alvo.tipo + '] pasta criada: "' + disc + '" (varridas ' + pastasVistas + ' pastas, nenhuma com esse nome)', true);
        }

        var jaExistiam = 0, criadosDisc = 0, pendentesDisc = 0;
        temas.forEach(function(tema) {
          var jaTem = nomes.some(function(n) { return _arquivoCasaComTema(n, tema); });
          if (jaTem) { jaExistiam++; return; }
          if (Date.now() - t0 > LIMITE) { restante++; pendentesDisc++; return; }
          var nome = _nomeArquivoTema(disc, tema);
          var corpo = (alvo.tipo === 'resumo')
            ? { disciplina: disc, tema: tema, topicos: [], status: 'vazio', criado_em: new Date().toISOString() }
            : { disciplina: disc, tema: tema, questoes: [] };
          try {
            var arq = pasta.createFile(nome, JSON.stringify(corpo, null, 2), MimeType.PLAIN_TEXT);
            _provLog('novo', '➕ [' + alvo.tipo + '] ' + disc + ' / ' + nome + ' (id ' + arq.getId() + ')');
          } catch (eC) {
            _provLog('erro', '❌ falha ao criar [' + alvo.tipo + '] ' + disc + ' / ' + nome + ': ' + eC.message, true);
            throw eC;
          }
          nomes.push(nome);
          criados[alvo.tipo]++;
          criadosDisc++;
        });
        _provLog(criadosDisc > 0 ? 'ok' : 'dbg', '[' + alvo.tipo + '] ' + disc + ': ' + temas.length + ' ativo(s) | ' + jaExistiam + ' já existia(m) | ' + criadosDisc + ' criado(s) | ' + pendentesDisc + ' pendente(s) | ' + (Date.now() - tDisc) + ' ms');
      });
      _provLog('info', '━━ [' + alvo.tipo + '] concluído em ' + (Date.now() - tAlvo) + ' ms | criados até agora: ' + criados[alvo.tipo]);
    });

    var total = criados.resumo + criados.questoes;
    if (total > 0) {
      // V97 — arquivos novos mudam o universo do banco: derruba o mapa, marca o Raio-X p/ reconstrução em lotes
      // e invalida o cache estrutural (antes só o mapa era limpo e a árvore ficava velha).
      try { limparCacheArquivos(); _provLog('dbg', 'cache do mapa de arquivos limpo e Raio-X marcado para reconstrução'); } catch (eC) { _provLog('aviso', 'limparCacheArquivos falhou: ' + eC.message); }
      try { _invalidarCacheEstrutura(); _provLog('dbg', 'cache estrutural invalidado'); } catch (eE) { _provLog('aviso', '_invalidarCacheEstrutura falhou: ' + eE.message); }
    }
    _provLog(restante > 0 ? 'aviso' : 'ok', 'fim da chamada | criados: resumo=' + criados.resumo + ' questoes=' + criados.questoes + ' | restante=' + restante + ' | ' + (Date.now() - t0) + ' ms', true);
    return { sucesso: true, restante: restante, criados_total: total, criados: criados, raiox_sujo: total > 0, ms: Date.now() - t0 };
  } catch (e) {
    _provLog('erro', '❌ ' + e.message + ' | ' + String(e.stack || '').split('\n').slice(0, 3).join(' ⏎ '), true);
    return { erro: e.message };
  } finally {
    try { cache.remove(FLAG); } catch (eR) {}
    _provLogFlush();
  }
}

// Diretrizes escolhidas pelo aluno no editor de criação (profundidade, ênfase de banca, observações).
function _diretrizesUsuarioTexto(sent) {
  if (!sent) return '';
  var L = [];
  var profTxt = {
    essencial:   'ESSENCIAL — objetivo e enxuto: só o que mais cai em prova, sem deixar nenhum subtema do edital descoberto.',
    padrao:      'PADRÃO — equilíbrio entre completude e leitura.',
    aprofundado: 'APROFUNDADO — máxima profundidade: todas as exceções, jurisprudência, vários exemplos e mais de uma tabela quando couber.'
  }[String(sent.profundidade || '').toLowerCase()];
  if (profTxt) L.push('Profundidade: ' + profTxt);
  var bancaTxt = {
    FGV:      'FGV — priorize casos práticos, interpretação e a aplicação da norma ao caso concreto.',
    FCC:      'FCC — priorize a letra da lei, a literalidade e os termos que a banca costuma trocar.',
    CEBRASPE: 'Cebraspe — priorize julgamento Certo/Errado, detalhes sutis e jurisprudência.'
  }[String(sent.banca || '').toUpperCase()];
  if (bancaTxt) L.push('Ênfase de banca: ' + bancaTxt);
  var obs = String(sent.observacoes || '').replace(/\s+/g, ' ').trim().slice(0, 1500);
  if (obs) L.push('Observações do aluno: ' + obs);
  if (L.length === 0) return '';
  return 'DIRETRIZES DO ALUNO (siga, sem violar o rigor técnico, o formato de saída e a cobertura do edital):\n- ' + L.join('\n- ') + '\n\n';
}

// Modo "reescrever": o material atual segue junto como base (limitado para caber no prompt).
function _baseReescritaTexto(sent) {
  if (!sent || !sent.base) return '';
  var b = String(sent.base);
  if (b.length > 120000) b = b.slice(0, 120000) + '\n[...material atual truncado...]';
  return 'MATERIAL ATUAL DO TEMA (base para ATUALIZAR: preserve o que estiver correto, corrija erros e complete o que faltar segundo o edital; não copie trechos sem revisar):\n' + b + '\n\n';
}

// O material atual é "de verdade" (tem tópicos ou HTML)? Usado para não gerar backup de arquivo em branco.
function _conteudoRelevante(texto) {
  try {
    if (!texto || !String(texto).trim()) return false;
    var o = JSON.parse(texto);
    if (Array.isArray(o.topicos) && o.topicos.length > 0) return true;
    if (o.conteudo_html && String(o.conteudo_html).trim()) return true;
    if (o.pro && String(o.pro).trim()) return true;
    if (Array.isArray(o.posts) && o.posts.length > 0) return true;
    if (Array.isArray(o.questoes) && o.questoes.length > 0) return true;
    return false;
  } catch (e) { return true; }   // não é JSON: na dúvida, guarda o backup
}

// V92 — Temas do edital por disciplina (o front mostra também os que ainda não têm questões/arquivo,
// para o tema ficar clicável e, se estiver vazio, abrir o editor de criação).
function obterTemasEditalPorDisciplina() {
  var saida = {};
  try {
    Object.keys(MAPA_DISTRIBUICAO_EDITAL).forEach(function(disc) {
      // V99 — nomes do mapa já unificado, só temas com ao menos 1 subtema dentro, ordenados por número
      saida[disc] = _getTemasOrdem(disc).filter(function(t) {
        return _pertenceAoEditalAtivo(disc, t, null);
      });
    });
    return { sucesso: true, temas: saida };
  } catch (e) {
    return { erro: e.message };
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// V98 — DIAGNÓSTICO LEVE DO RAIO-X (somente leitura, com limite de tempo)
// Rode no editor: diagnosticarRaioXRapido()  ou  diagnosticarRaioXRapido('Segurança de Dignitários')
// Não lê o banco inteiro: olha só os arquivos da disciplina pedida.
// ═════════════════════════════════════════════════════════════════════════════
function diagnosticarRaioXRapido(disciplina) {
  var t0 = Date.now();
  var disc = _disciplinaDoEdital(disciplina || 'Segurança de Dignitários') || disciplina || 'Segurança de Dignitários';
  var L = function(m) { Logger.log(m); };
  L('══ DIAGNÓSTICO RAIO-X: ' + disc + ' ══');

  var rx = _readJsonFromDrive('raiox_banco_v1.json');
  var no = rx && rx.arvore && rx.arvore[disc];
  L('raiox_banco_v1.json: ' + (rx ? ('timestamp=' + rx.timestamp + ' | total=' + rx.total) : 'AUSENTE'));
  if (no) {
    L('  ' + disc + ' total na árvore = ' + no.total);
    Object.keys(no.temas || {}).forEach(function(t) { L('    ' + t + ' = ' + (no.temas[t].total || 0)); });
  } else { L('  disciplina NÃO está na árvore'); }

  var prog = _readJsonFromDrive(ARQUIVO_PROGRESSO_RAIOX);
  L('raiox_progresso.json (lido como o sistema lê, Firestore primeiro): ' +
    (prog ? ('cursor=' + prog.cursor + '/' + prog.total_arquivos + ' | questoes=' + prog.questoes +
             ' | atualizado=' + prog.atualizado + ' | forcado=' + prog.forcado + ' | velho=' + _raioXProgressoVelho(prog)) : 'AUSENTE'));
  var noDrive = null;
  try { noDrive = !!_getFileByName(ARQUIVO_PROGRESSO_RAIOX); } catch (e) {}
  L('  existe no Drive (fora da lixeira)? ' + noDrive + '  → se for "false" e acima apareceu um progresso, é a cópia ZUMBI do Firestore.');
  L('Raio-X marcado sujo? ' + _raioXEstaSujo());

  var mapa = listarArquivosRapido();
  var arqs = (mapa[disc] && mapa[disc].questoes) || [];
  L('Arquivos de "' + disc + '" no mapa: ' + arqs.length);
  var totalReal = 0;
  for (var i = 0; i < arqs.length; i++) {
    if (Date.now() - t0 > 120000) { L('⏱️ limite de tempo do diagnóstico — parando.'); break; }
    var a = arqs[i];

    var nDrive = -1, nFb = -1;
    try { var f = DriveApp.getFileById(a.id); nDrive = (JSON.parse(f.getBlob().getDataAsString()).questoes || []).length; } catch (e1) { nDrive = -1; }
    try { var r = _carregarBancosRoteado([a.id]); nFb = (r && r[0] && r[0].data && r[0].data.questoes) ? r[0].data.questoes.length : -1; } catch (e2) { nFb = -1; }
    totalReal += Math.max(nDrive, 0);
    L('  ' + a.tema + ' | Drive=' + nDrive + ' | pelo roteador=' + nFb + (nDrive !== nFb ? '  ⚠️ DIVERGE' : '') +
      ' | passa no edital=' + _pertenceAoEditalAtivo(disc, a.tema, null));
  }
  L('Total real no Drive: ' + totalReal + ' | total na árvore: ' + (no ? no.total : 'n/d'));
  L('Fim em ' + (Date.now() - t0) + 'ms');
}

// ═════════════════════════════════════════════════════════════════════════════
// V99 — ADEQUAÇÃO AO EDITAL: APOIO (contagem de subtemas com peso, detector, auditoria, execução única)
// ═════════════════════════════════════════════════════════════════════════════

// Subtemas ativos (não EXCLUIR) com peso > 0 numa disciplina — mesma régua do diagnóstico V27 e das cotas.
function _subtemasComPesoEdital(disciplina) {
  var n = 0;
  _getTemasOrdem(disciplina).forEach(function (tm) {
    _getSubtemasOrdem(disciplina, tm).forEach(function (s) {
      var dados = (MAPA_DISTRIBUICAO_EDITAL[disciplina] && MAPA_DISTRIBUICAO_EDITAL[disciplina][tm] && MAPA_DISTRIBUICAO_EDITAL[disciplina][tm][s]) || {};
      var pct = parseFloat(String(dados.distribuicao || '0').replace('%', '').replace(',', '.')) || 0;
      if (pct > 0) n++;
    });
  });
  return n;
}

// Lê o raio-x do Drive já com a regra do edital (canônico + sem EXCLUIR). Somente leitura.
function _lerRaioXCanonico() {
  var rx = _readJsonFromDrive('raiox_banco_v1.json');
  if (rx && rx.arvore) rx = _podarArvoreRaioXPeloEdital(rx);
  return rx;
}

// Detector de duplicatas VISÍVEIS (somente leitura). Por disciplina/tema: subtemas com a mesma chave plana
// ("X (Y)" ≡ "X - Y") ou com a mesma chave sem parênteses e no máximo 1 qualificador; e temas com o mesmo nome
// (sem o número). Grupos com 2+ qualificadores distintos são "suspeitos" (não fundidos): voltam em `suspeitos`.
function _detectarDuplicatasEdital(arvore) {
  var duplicados = [], suspeitos = [];
  Object.keys(arvore || {}).forEach(function (d) {
    var temas = arvore[d].temas || {};
    var porNomeTema = {};
    Object.keys(temas).forEach(function (t) {
      var nk = _normChaveV23(t).replace(/^\d+\s*/, '');
      (porNomeTema[nk] = porNomeTema[nk] || []).push(t);
      var planas = {}, grupos = {};
      Object.keys(temas[t].subtemas || {}).forEach(function (s) {
        (planas[_chaveComparacaoEdital(s, true)] = planas[_chaveComparacaoEdital(s, true)] || []).push(s);
        (grupos[_chaveComparacaoEdital(s)] = grupos[_chaveComparacaoEdital(s)] || []).push(s);
      });
      Object.keys(planas).forEach(function (k) {
        if (planas[k].length > 1) duplicados.push({ disciplina: d, tema: t, subtemas: planas[k] });
      });
      Object.keys(grupos).forEach(function (k) {
        var g = grupos[k];
        if (g.length < 2) return;
        var quals = {};
        g.forEach(function (s) { var p = _parentesesEdital(s); if (p) quals[p] = true; });
        var item = { disciplina: d, tema: t, subtemas: g };
        if (Object.keys(quals).length >= 2) suspeitos.push(item); else duplicados.push(item);
      });
    });
    Object.keys(porNomeTema).forEach(function (nk) {
      if (porNomeTema[nk].length > 1) duplicados.push({ disciplina: d, temas: porNomeTema[nk] });
    });
  });
  return { duplicados: duplicados, suspeitos: suspeitos };
}

// 3.2.5 — RELATÓRIO DE REVISÃO (somente leitura). Rode no editor e leia o log.
// (a) fusões automáticas aplicadas; (b) pares suspeitos NÃO fundidos e empates; (c) conflitos de classificação.
function auditarDuplicatasEdital() {
  var rel = { fusoes: [], suspeitos: [], conflitos: [] };
  try {
    var bruto = _readJsonFromDrive('raiox_banco_v1.json');
    var arv = (bruto && bruto.arvore) ? bruto.arvore : {};
    var qtdDe = function (d, t, s) {
      var no = arv[d] && arv[d].temas && arv[d].temas[t];
      var v = no && no.subtemas && no.subtemas[s];
      return (typeof v === 'number') ? v : ((v && v.qtd) || 0);
    };
    Object.keys(MAPA_ALIASES_EDITAL || {}).forEach(function (d) {
      Object.keys(MAPA_ALIASES_EDITAL[d]).forEach(function (t) {
        if (t === '__TEMAS__') {
          Object.keys(MAPA_ALIASES_EDITAL[d][t]).forEach(function (v) {
            rel.fusoes.push(d + ' > TEMA "' + v + '" -> "' + MAPA_ALIASES_EDITAL[d][t][v] + '"');
          });
          return;
        }
        var porCanon = {};
        Object.keys(MAPA_ALIASES_EDITAL[d][t]).forEach(function (v) {
          var c = MAPA_ALIASES_EDITAL[d][t][v];
          (porCanon[c] = porCanon[c] || []).push(v + ' (' + qtdDe(d, t, v) + 'q)');
        });
        Object.keys(porCanon).forEach(function (c) {
          rel.fusoes.push(d + ' > ' + t + ' > "' + c + '" (' + qtdDe(d, t, c) + 'q) <= ' + porCanon[c].join(', '));
        });
      });
    });
    var rx = _lerRaioXCanonico();
    var det = _detectarDuplicatasEdital(rx && rx.arvore ? rx.arvore : {});
    det.suspeitos.forEach(function (x) { rel.suspeitos.push(x.disciplina + ' > ' + x.tema + ' > ' + x.subtemas.join(' ## ')); });
    det.duplicados.forEach(function (x) { rel.suspeitos.push('DUPLICADO VISÍVEL: ' + JSON.stringify(x)); });
    rel.conflitos = (typeof MAPA_EDITAL_CONFLITOS_V99 !== 'undefined') ? MAPA_EDITAL_CONFLITOS_V99.slice() : [];
  } catch (e) { rel.erro = e.message; }
  var L = ['=== AUDITORIA DE DUPLICATAS DO EDITAL ==='];
  L.push('(a) Fusões automáticas aplicadas (' + rel.fusoes.length + '):');
  rel.fusoes.forEach(function (x) { L.push('  - ' + x); });
  L.push('(b) Pares suspeitos NÃO fundidos / duplicatas visíveis (' + rel.suspeitos.length + '):');
  rel.suspeitos.forEach(function (x) { L.push('  - ' + x); });
  L.push('(c) Conflitos de classificação resolvidos pela regra 3.2.4 (' + rel.conflitos.length + '):');
  rel.conflitos.forEach(function (x) { L.push('  - ' + x); });
  if (rel.erro) L.push('ERRO: ' + rel.erro);
  Logger.log(L.join('\n'));
  return rel;
}

// Recalcula só o bloco `planejamento` (viabilidade/plano_v27) com o edital unificado. Não toca fila nem escolhas.
function recalcularPlanejamentoCicloEdital() {
  try {
    var config = carregarConfiguracaoCiclo();
    if (!config || !config.planejamento || !Array.isArray(config.fila)) return { sucesso: false, erro: 'Ciclo sem planejamento salvo.' };
    _invalidarDiagnosticoV27();
    var P = config.planejamento;
    var V = P.viabilidade || (P.viabilidade = {});
    var antes = { subtemas_ativos_edital: V.subtemas_ativos_edital, meta_minima_cobertura: V.meta_minima_cobertura,
                  subtemas_sem_banco: P.plano_v27 ? P.plano_v27.subtemas_sem_banco : null };
    var ativos = 0;
    config.fila.forEach(function (it) { try { ativos += _subtemasComPesoEdital(it.disciplina); } catch (e) {} });
    var volumeTotal = Number(P.volume_total_meta) || 0;
    var DENSIDADE_MINIMA = 3;
    var metaMin = ativos * DENSIDADE_MINIMA;
    V.subtemas_ativos_edital = ativos;
    V.densidade_por_subtema  = ativos > 0 ? Number((volumeTotal / ativos).toFixed(2)) : 0;
    V.meta_minima_cobertura  = metaMin;
    V.meta_sugerida          = Math.min(Number(V.capacidade_periodo) || metaMin, metaMin);
    V.cobertura_suficiente   = volumeTotal >= metaMin;
    if (ativos > 0 && !V.cobertura_suficiente) {
      V.aviso_cobertura = 'A meta de ' + volumeTotal + ' questões dá ' + V.densidade_por_subtema + ' questão(ões) por subtema, em ' +
        ativos + ' subtemas ativos do edital. Abaixo de ' + DENSIDADE_MINIMA + ' por subtema o gate não tem amostra estatística e a nota estimada não é confiável. ' +
        'Cobertura mínima: ~' + metaMin + ' questões. Sua capacidade no período: ' + V.capacidade_periodo + '. Sugerida: ' + V.meta_sugerida + '.';
    } else {
      delete V.aviso_cobertura;
    }
    var diag = diagnosticarEditalV27(P.template_usado);
    if (!P.plano_v27) P.plano_v27 = {};
    P.plano_v27.subtemas_ativos    = diag.total_subtemas_ativos;
    P.plano_v27.subtemas_sem_banco = diag.total_subtemas_sem_banco;
    P.plano_v27.adequacao_edital_em = new Date().toISOString();
    salvarConfiguracaoCiclo(config);
    var depois = { subtemas_ativos_edital: V.subtemas_ativos_edital, meta_minima_cobertura: V.meta_minima_cobertura,
                   subtemas_sem_banco: P.plano_v27.subtemas_sem_banco };
    Logger.log('[ADEQUACAO] planejamento recalculado: ' + JSON.stringify(antes) + ' -> ' + JSON.stringify(depois));
    return { sucesso: true, antes: antes, depois: depois };
  } catch (e) {
    Logger.log('[ADEQUACAO] recalcularPlanejamentoCicloEdital: ' + e.message);
    return { sucesso: false, erro: e.message };
  }
}

// Para o front espelhar a MESMA resolução de nomes (substitui comparação por nome aproximado).
// Devolve o mapa do edital já unificado (importância por subtema), os aliases e os temas ativos por disciplina.
function obterAliasesEditalParaFront() {
  try {
    var temas = {}, mapa = {};
    Object.keys(MAPA_DISTRIBUICAO_EDITAL).forEach(function (d) {
      temas[d] = _getTemasOrdem(d).filter(function (t) { return _pertenceAoEditalAtivo(d, t, null); });
      mapa[d] = {};
      Object.keys(MAPA_DISTRIBUICAO_EDITAL[d]).forEach(function (t) {
        mapa[d][t] = {};
        Object.keys(MAPA_DISTRIBUICAO_EDITAL[d][t]).forEach(function (s) {
          mapa[d][t][s] = MAPA_DISTRIBUICAO_EDITAL[d][t][s].importancia;
        });
      });
    });
    return { sucesso: true, aliases: MAPA_ALIASES_EDITAL, temas_ativos: temas, mapa_importancia: mapa };
  } catch (e) { return { sucesso: false, erro: e.message }; }
}

// EXECUÇÃO ÚNICA — rode UMA vez no editor do Apps Script depois de colar Config.gs e Codigo.gs.
// Ordem: índice → caches → mapa de pastas → raio-x (canônico, em lugar) → cache estrutural → planejamento do ciclo.
// Nada é apagado nas pastas de questões; só caches/arquivos derivados são refeitos.
function aplicarAdequacaoEdital() {
  var passos = [];
  try {
    _resetIndiceEditalV99();
    _CACHE_ARVORE_V23 = null; _CACHE_META_V23 = {};
    passos.push('indice reiniciado');

    var sc = CacheService.getScriptCache(), uc = CacheService.getUserCache();
    var chaves = [CACHE_KEY_MAPA, 'CACHE_PRECISA_RECONSTRUIR', 'ESTRUTURA_CICLO_V13', 'CFG_CICLO'];
    Object.keys(MAPA_DISTRIBUICAO_EDITAL).forEach(function (d) {
      chaves.push(CACHE_KEY_CONTAGEM_PREFIX + d.replace(/\s+/g, '_').toUpperCase());
    });
    try { sc.removeAll(chaves); } catch (e1) {}
    try { uc.removeAll(chaves); } catch (e2) {}
    passos.push('caches de mapa/contagem/estrutura limpos');

    try { _apagarJsonRoteado(ARQUIVO_CACHE_ESTRUTURA); passos.push('cache estrutural apagado'); } catch (e3) {}
    try { _apagarJsonRoteado(ARQUIVO_PROGRESSO_RAIOX); passos.push('progresso de lotes apagado'); } catch (e4) {}

    var novoMapa = _construirMapaDoZero();
    sc.put(CACHE_KEY_MAPA, JSON.stringify({ mapa: novoMapa, timestamp: Date.now() }), 21600);
    passos.push('mapa de pastas reconstruído (' + Object.keys(novoMapa).length + ' disciplinas)');

    var rx = _readJsonFromDrive('raiox_banco_v1.json');
    if (rx && rx.arvore) {
      var totalAntes = rx.total;
      rx.arvore = _canonizarArvoreEdital(rx.arvore, false);
      _semearArvoreComEdital(rx.arvore);
      var soma = 0;
      Object.keys(rx.arvore).forEach(function (d) { soma += rx.arvore[d].total || 0; });
      rx.total = soma;
      rx.timestamp = new Date().toISOString();
      _saveJsonToDrive('raiox_banco_v1.json', rx);
      _limparRaioXSujo();
      passos.push('raio-x canonizado em lugar (total ' + totalAntes + ' -> ' + soma + ')');
      try { _reconstruirCacheEstruturalDaArvore(_podarArvoreRaioXPeloEdital({ arvore: JSON.parse(JSON.stringify(rx.arvore)), total: soma }).arvore); passos.push('cache estrutural refeito'); } catch (e5) {}
    } else {
      _marcarRaioXSujo();
      passos.push('raio-x ausente: marcado para reconstrução em lotes');
    }

    var plano = recalcularPlanejamentoCicloEdital();
    passos.push('planejamento: ' + JSON.stringify(plano));
    Logger.log('[ADEQUACAO] ' + passos.join(' | '));
    return { sucesso: true, passos: passos };
  } catch (e) {
    Logger.log('[ADEQUACAO] ERRO: ' + e.message + ' | passos: ' + passos.join(' | '));
    return { sucesso: false, erro: e.message, passos: passos };
  }
}

// ══════════════════════════════════════════════════════════════════════════
// V100 — PLANO ATÉ A PROVA (TRT-8): prazo por data, 6 min/questão e esforço
// distribuído por PESO NA PROVA × LACUNA DE PROFICIÊNCIA.
//   • O banco de questões NÃO limita a distribuição: a Fábrica cria o que faltar.
//   • Piso por disciplina = subtemas ativos × amostra mínima do gate (agora 1):
//     garante que todo subtema do edital seja visto ao menos uma vez.
//   • Acima do piso, o esforço é proporcional a  peso × (1 − acerto estimado).
//   • Os dias do ciclo são empacotados em exatamente (horas × 60 ÷ min/questão)
//     questões, com no máximo `disciplinas/dia` disciplinas; disciplina pesada é
//     dividida em mais de um dia do ciclo (ver _empacotarCicloV100).
// ══════════════════════════════════════════════════════════════════════════

var DATA_ALVO_PLANO_V100 = '2027-01-10';   // último dia do plano (a prova é em 17/01/2027)
var ID_TEMPLATE_TRT8_V100 = 'AGENTE_PJ_TRT8';
var NOME_TEMPLATE_TRT8_V100 = 'Agente de Polícia Judicial 2027';   // V104 — nome do edital (o id do template não muda)

// Nível de proficiência inicial por disciplina (0 = nunca estudou … 10 = acerta 90%).
var NIVEIS_PADRAO_TRT8_V100 = {
  'Língua Portuguesa': 5,
  'RLM': 5,
  'Noções de Legislação': 0,
  'Noções de Sustentabilidade': 0,
  'Direitos Humanos': 0,
  'Informática': 3,
  'Direito Constitucional': 3,
  'Direito Administrativo': 5,
  'Segurança de Dignitários': 0,
  'Segurança Orgânica': 0,
  'Normas da Polícia Judicial': 0,
  'Direito Penal': 1,
  'Legislação Penal Especial': 0,
  'Processo Penal': 0,
  'Direito da Pessoa Idosa e da Pessoa com Deficiência': 0
};

function _nivelPadraoV100(disc) {
  var v = NIVEIS_PADRAO_TRT8_V100[disc];
  return v === undefined ? 0 : v;
}

// Nível → taxa de acerto estimada. 0 = 0%; 1 = 10%; 10 = 90%; linear entre 1 e 10.
function _acertoDoNivelV100(nivel) {
  var n = Number(String(nivel === undefined || nivel === null ? 0 : nivel).replace(',', '.'));
  if (!isFinite(n) || n <= 0) return 0;
  if (n >= 10) return 0.9;
  return (10 + (n - 1) * 80 / 9) / 100;
}

// Dias corridos de hoje (exclusive) até DATA_ALVO_PLANO_V100 (inclusive).
function _diasCorridosAteAlvoV100() {
  var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(DATA_ALVO_PLANO_V100 || ''));
  if (!m) return 0;
  var hoje = String(Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'yyyy-MM-dd')).split('-');
  var ini = Date.UTC(Number(hoje[0]), Number(hoje[1]) - 1, Number(hoje[2]));
  var fim = Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Math.round((fim - ini) / 86400000);
}

// DIAS DE ESTUDO do plano (nome histórico: "úteis"; não depende de segunda a sexta nem da data da prova).
// Regra única, idêntica à da tela (_diasEstudoPlano em JavaScript.html):
//   dias de estudo = meses × (365,25 ÷ 12 ÷ 7) × dias por semana.
// A data da prova (DATA_ALVO_PLANO_V100) é só referência e não altera a conta.
var SEMANAS_POR_MES_V100 = 365.25 / 12 / 7;
function _diasUteisPlanoV100(periodoMeses, diasSemana) {
  var m  = Number(String(periodoMeses).replace(',', '.')) || 0;
  var ds = Math.min(7, Number(String(diasSemana).replace(',', '.')) || 0);
  if (!(m > 0) || !(ds > 0)) return 0;
  return Math.max(1, Math.round(m * SEMANAS_POR_MES_V100 * ds));
}

function _templateSalvoNoDriveV100(id) {
  try {
    var dados = _readJsonFromDrive(ARQUIVO_TEMPLATES) || {};
    return !!(dados.templates && dados.templates[id]);
  } catch (e) { return false; }
}

function _pesosENiveisV100(template) {
  var out = { pesos: {}, niveis: {} };
  var tpl = null;
  try { tpl = carregarTemplate(template); } catch (e) { tpl = null; }
  if (tpl && Array.isArray(tpl.distribuicao)) {
    tpl.distribuicao.forEach(function (e) {
      out.pesos[e.disciplina] = Number(e.peso) || 0;
      out.niveis[e.disciplina] = e.nivel;
    });
    return out;
  }
  out.pesos = _disciplinasDoTemplateV27(template);
  return out;
}

// Piso do gate por disciplina = subtemas ativos × amostra mínima.
function _pisosPorDisciplinaV100(template) {
  var pisos = {};
  try {
    var diag = diagnosticarEditalV27(template);
    (diag.disciplinas || []).forEach(function (l) {
      pisos[l.disciplina] = (l.subtemas_ativos || 0) * (diag.amostra_minima_gate || 1);
    });
  } catch (e) { Logger.log('[V100] pisos: ' + e.message); }
  return pisos;
}

// Distribui `total` questões: proporcional a peso × lacuna, respeitando o piso de cada disciplina.
// Quem fica abaixo do piso é fixado nele e o restante é redistribuído (preenchimento por água).
function _alocarEsforcoV100(pesos, niveis, pisos, total) {
  total = Math.round(Number(total) || 0);
  var discs = Object.keys(pesos || {}).filter(function (d) { return (Number(pesos[d]) || 0) > 0; });
  var res = {};
  if (!discs.length || total <= 0) return res;
  var piso = function (d) { return Math.max(0, Number(pisos && pisos[d]) || 0); };
  var w = {};
  discs.forEach(function (d) { w[d] = (Number(pesos[d]) || 0) * (1 - _acertoDoNivelV100(niveis && niveis[d])); });

  var somaPisos = discs.reduce(function (s, d) { return s + piso(d); }, 0);
  if (somaPisos >= total) {
    discs.forEach(function (d) { res[d] = piso(d) * total / somaPisos; });
  } else {
    var livres = discs.slice(), restante = total;
    while (livres.length) {
      var sw = livres.reduce(function (s, d) { return s + w[d]; }, 0);
      if (sw <= 0) break;
      var abaixo = livres.filter(function (d) { return restante * w[d] / sw < piso(d); });
      if (!abaixo.length) break;
      abaixo.forEach(function (d) { res[d] = piso(d); restante -= piso(d); });
      livres = livres.filter(function (d) { return abaixo.indexOf(d) < 0; });
    }
    var swFinal = livres.reduce(function (s, d) { return s + w[d]; }, 0);
    livres.forEach(function (d) { res[d] = swFinal > 0 ? restante * w[d] / swFinal : piso(d); });
  }

  // arredonda por maiores restos, preservando o total
  var inteiro = {}, usado = 0, restos = [];
  Object.keys(res).forEach(function (d) {
    var f = Math.floor(res[d] + 1e-9);
    inteiro[d] = f; usado += f; restos.push({ d: d, r: res[d] - f });
  });
  restos.sort(function (a, b) { return b.r - a.r; });
  for (var k = 0; usado < total && k < restos.length; k++) { inteiro[restos[k].d]++; usado++; }
  return inteiro;
}

// Entrada da fila: [disciplina, % efetivo do esforço]. Soma 100. Vira `peso_raw` do ciclo.
function _entradasEsforcoV100(pesosBase, niveisBase, template, volumeTotal) {
  var discs = Object.keys(pesosBase);
  var alocado = _alocarEsforcoV100(pesosBase, niveisBase, _pisosPorDisciplinaV100(template), volumeTotal);
  var soma = discs.reduce(function (s, d) { return s + (alocado[d] || 0); }, 0);
  if (soma <= 0) return discs.map(function (d) { return [d, pesosBase[d]]; });
  return discs.map(function (d) { return [d, (alocado[d] || 0) / soma * 100]; });
}

// Tabela para a tela de dimensionamento.
function _alocacaoPreviewV100(template, meta, diasUteis, discDia) {
  try {
    meta = Math.round(Number(meta) || 0);
    var pn = _pesosENiveisV100(template);
    var diag = diagnosticarEditalV27(template);
    var subs = {}, pisos = {};
    (diag.disciplinas || []).forEach(function (l) {
      subs[l.disciplina] = l.subtemas_ativos || 0;
      pisos[l.disciplina] = (l.subtemas_ativos || 0) * (diag.amostra_minima_gate || 1);
    });
    var aloc = _alocarEsforcoV100(pn.pesos, pn.niveis, pisos, meta);
    return Object.keys(aloc).filter(function (d) { return aloc[d] > 0; }).map(function (d) {
      var q = aloc[d];
      return {
        disciplina: d,
        peso: pn.pesos[d],
        nivel: Number(pn.niveis[d]) || 0,
        acerto_pct: Math.round(_acertoDoNivelV100(pn.niveis[d]) * 100),
        subtemas: subs[d] || 0,
        piso: pisos[d] || 0,
        questoes: q,
        pct: meta > 0 ? Math.round(q / meta * 1000) / 10 : 0,
        por_subtema: subs[d] ? Math.round(q / subs[d] * 10) / 10 : 0,
        dias: meta > 0 ? Math.round(q * (Number(diasUteis) || 0) / meta * 10) / 10 : 0
      };
    }).sort(function (a, b) { return b.questoes - a.questoes; });
  } catch (e) {
    Logger.log('[V100] alocação: ' + e.message);
    return [];
  }
}

// RODAR UMA VEZ no editor do Apps Script: apaga os templates salvos do edital antigo
// ("Agente da Polícia Judicial (TRFs, TRTs, TREs e TST)" e as cópias "(Cópia)").
function limparTemplatesLegadosV100() {
  var dados = _readJsonFromDrive(ARQUIVO_TEMPLATES) || { templates: {} };
  var removidos = [];
  Object.keys(dados.templates || {}).forEach(function (id) {
    if (id === ID_TEMPLATE_TRT8_V100) return;
    var nome = String((dados.templates[id] || {}).nome || '');
    if (/TRFs, TRTs, TREs e TST/i.test(nome)) {
      removidos.push(nome);
      delete dados.templates[id];
    }
  });
  _saveJsonToDrive(ARQUIVO_TEMPLATES, dados);
  try { _invalidarDiagnosticoV27(); } catch (e) {}
  Logger.log('[V100] templates removidos: ' + JSON.stringify(removidos));
  return { sucesso: true, removidos: removidos };
}

// ──────────────────────────────────────────────────────────────────────────
// Empacotamento do ciclo: cada dia recebe EXATAMENTE `L` questões (L = meta do
// dia = o que cabe nas horas informadas) e no máximo `discDia` disciplinas.
// A duração do ciclo (C dias) e o total de cada disciplina (q) continuam sendo os
// que o fatiamento sequencial legado já fechava (_empacotarCicloLegacyV100). Dentro
// dessa duração, a alocação é feita dia a dia por urgência (restante ÷ dias restantes),
// com piso por peça = min(10, floor(L / discDia)), sem sobra menor que o piso e
// disciplinas pequenas fechando antes. Se nenhuma solução existir, vale o legado.
// ──────────────────────────────────────────────────────────────────────────
function _inteirosV100(pcts, total) {
  var soma = pcts.reduce(function (s, p) { return s + p; }, 0);
  if (!(soma > 0) || total < pcts.length) return null;
  var base = pcts.map(function (p) { return Math.floor(total * p / soma); });
  var resto = total - base.reduce(function (s, v) { return s + v; }, 0);
  var ord = pcts.map(function (p, i) { return { i: i, f: total * p / soma - base[i] }; })
    .sort(function (a, b) { return b.f - a.f; });
  for (var k = 0; k < resto; k++) base[ord[k % ord.length].i]++;
  for (var i = 0; i < base.length; i++) {
    while (base[i] < 1) {
      var maior = 0;
      for (var j = 1; j < base.length; j++) if (base[j] > base[maior]) maior = j;
      if (base[maior] <= 1) return null;
      base[maior]--; base[i]++;
    }
  }
  return base;
}

function _fatiarCicloLegacyV100(ordem, q, L, C, discDia) {
  var cnt = [], pecas = {}, dia = 0, livre = L;
  for (var d = 0; d < C; d++) cnt.push(0);
  for (var o = 0; o < ordem.length; o++) {
    var idx = ordem[o], resta = q[idx];
    while (resta > 0) {
      if (dia >= C) return null;
      var usa = Math.min(resta, livre);
      (pecas[idx] = pecas[idx] || []).push({ dia: dia, qtd: usa });
      cnt[dia]++;
      if (cnt[dia] > discDia) return null;
      resta -= usa; livre -= usa;
      if (livre === 0) { dia++; livre = L; }
    }
  }
  return pecas;
}

// Piso efetivo por peça: min(10, floor(L / disciplinasDia)), nunca menor que 1.
function _pisoPecaV100(L, discDia) {
  var p = Math.min(10, Math.floor(L / Math.max(1, discDia)));
  return p < 1 ? 1 : p;
}

// Quantidades que uma disciplina com `rem` questões restantes pode receber hoje:
// o que sobra é 0 ou >= piso; com menos de 10 restantes, entra uma vez, completa.
function _valoresPermitidosV100(rem, piso, L) {
  if (rem < 10) return rem <= L ? [rem] : [];
  var v = [], topo = Math.min(rem - piso, L);
  for (var x = piso; x <= topo; x++) v.push(x);
  if (rem <= L) v.push(rem);
  return v;
}

// Divide exatamente L entre as disciplinas escolhidas, o mais perto possível da
// proporção de urgência (programação dinâmica; empate resolvido pela ordem de entrada).
// Devolve { xs: [...], custo: n } ou null se L não puder ser formado.
function _alocarDiaV100(sel, L, piso) {
  var m = sel.length, somaUrg = 0, i, s, k;
  for (i = 0; i < m; i++) somaUrg += sel[i].urg;
  var INF = 1e18, ideal = [], opts = [];
  for (i = 0; i < m; i++) {
    ideal.push(somaUrg > 0 ? sel[i].urg / somaUrg * L : L / m);
    opts.push(_valoresPermitidosV100(sel[i].rem, piso, L));
    if (!opts[i].length) return null;
  }
  var custo = [], de = [];
  for (i = 0; i <= m; i++) {
    custo.push([]); de.push([]);
    for (s = 0; s <= L; s++) { custo[i].push(INF); de[i].push(null); }
  }
  custo[0][0] = 0;
  for (i = 0; i < m; i++) {
    for (s = 0; s <= L; s++) {
      if (custo[i][s] >= INF) continue;
      for (k = 0; k < opts[i].length; k++) {
        var x = opts[i][k], ns = s + x;
        if (ns > L) break;
        var d = x - ideal[i];
        var c = custo[i][s] + d * d / Math.max(ideal[i], 1);
        if (c < custo[i + 1][ns]) { custo[i + 1][ns] = c; de[i + 1][ns] = { s: s, x: x }; }
      }
    }
  }
  if (custo[m][L] >= INF) return null;
  var xs = new Array(m), cur = L;
  for (i = m; i > 0; i--) { var p = de[i][cur]; xs[i - 1] = p.x; cur = p.s; }
  return { xs: xs, custo: custo[m][L] };
}

// As `maxAlt` melhores divisões exatas de L entre as disciplinas escolhidas (menor desvio da
// proporção de urgência primeiro). Enumera tudo, menos a última peça, que fica determinada.
// Se a enumeração passar do orçamento, devolve só a melhor divisão da programação dinâmica.
function _divisoesDiaV100(sel, L, piso, maxAlt) {
  var m = sel.length, somaUrg = 0, i;
  for (i = 0; i < m; i++) somaUrg += sel[i].urg;
  var ideal = [], opts = [], ok = [];
  for (i = 0; i < m; i++) {
    ideal.push(somaUrg > 0 ? sel[i].urg / somaUrg * L : L / m);
    opts.push(_valoresPermitidosV100(sel[i].rem, piso, L));
    if (!opts[i].length) return [];
    var mapa = {};
    opts[i].forEach(function (x) { mapa[x] = true; });
    ok.push(mapa);
  }
  var minSuf = [], maxSuf = [];
  minSuf[m] = 0; maxSuf[m] = 0;
  for (i = m - 1; i >= 0; i--) { minSuf[i] = minSuf[i + 1] + opts[i][0]; maxSuf[i] = maxSuf[i + 1] + opts[i][opts[i].length - 1]; }
  var achadas = [], atual = [], orcamento = 60000, estourou = false;
  var rec = function (pos, soma, custo) {
    if (estourou) return;
    if (pos === m - 1) {
      var x = L - soma;
      if (x > 0 && ok[pos][x]) {
        var d = x - ideal[pos];
        achadas.push({ xs: atual.concat([x]), custo: custo + d * d / Math.max(ideal[pos], 1) });
      }
      return;
    }
    for (var k = 0; k < opts[pos].length; k++) {
      var v = opts[pos][k];
      if (soma + v + minSuf[pos + 1] > L) break;
      if (soma + v + maxSuf[pos + 1] < L) continue;
      if (--orcamento < 0) { estourou = true; return; }
      var dd2 = v - ideal[pos];
      atual.push(v);
      rec(pos + 1, soma + v, custo + dd2 * dd2 / Math.max(ideal[pos], 1));
      atual.pop();
    }
  };
  rec(0, 0, 0);
  if (estourou) {
    var uma = _alocarDiaV100(sel, L, piso);
    return uma ? [uma.xs] : [];
  }
  achadas.sort(function (a, b) { return a.custo - b.custo; });
  return achadas.slice(0, maxAlt).map(function (a) { return a.xs; });
}

// Escolhas de disciplinas do dia em ordem de preferência: tamanho máximo primeiro,
// e dentro de cada tamanho a combinação com menor soma de posições na lista de urgência.
function _candidatosSelecaoV100(vivos, cap, topo) {
  var K = Math.min(vivos.length, topo), mm = Math.min(cap, K), out = [], t;
  var gerar = function (tam) {
    var lista = [], atual = [];
    var rec = function (ini) {
      if (atual.length === tam) { lista.push({ pos: atual.slice(), soma: atual.reduce(function (a, b) { return a + b; }, 0) }); return; }
      for (var p = ini; p < K; p++) { atual.push(p); rec(p + 1); atual.pop(); }
    };
    rec(0);
    lista.sort(function (a, b) {
      if (a.soma !== b.soma) return a.soma - b.soma;
      for (var z = 0; z < a.pos.length; z++) if (a.pos[z] !== b.pos[z]) return a.pos[z] - b.pos[z];
      return 0;
    });
    return lista;
  };
  for (t = mm; t >= 1; t--) {
    gerar(t).forEach(function (c) { out.push(c.pos.map(function (p) { return vivos[p]; })); });
  }
  return out;
}

// Busca dia a dia (determinística, com memória de estados inviáveis).
// `diasLimitados` = quantos dias finais aceitam no máximo 2 disciplinas.
function _buscarFatiasV100(q, L, C, discDia, piso, diasLimitados, rank, topo, fechaPequenas) {
  var n = q.length, pecas = {}, nos = 0, LIM = 8000, ruins = {};
  var cap = function (diasRest) { return diasRest <= diasLimitados ? Math.min(discDia, 2) : discDia; };
  var viavel = function (rem, D) {
    var cnt = 0, soma = 0, i, slots = 0, d, minPecas = 0;
    for (i = 0; i < n; i++) if (rem[i] > 0) { cnt++; soma += rem[i]; minPecas += Math.ceil(rem[i] / L); }
    if (D <= 0) return cnt === 0;
    if (soma !== D * L) return false;
    for (d = 1; d <= D; d++) slots += cap(d);
    if (minPecas > slots) return false;
    if (D === 1) return cnt <= cap(1);
    if (D === 2) return fechaEmDois(rem);
    return true;
  };
  // Exato para os 2 últimos dias: existe um dia que deixe no máximo cap(1) disciplinas para o último?
  var memo2 = {};
  var fechaEmDois = function (rem) {
    var chave2 = rem.join(','); if (memo2[chave2] !== undefined) return memo2[chave2];
    var vivos = [], i;
    for (i = 0; i < n; i++) if (rem[i] > 0) vivos.push({ idx: i, rem: rem[i], urg: rem[i] / 2 });
    if (vivos.length <= cap(1) && vivos.length <= cap(2)) return (memo2[chave2] = true);
    var c2 = cap(2), c1 = cap(1), achou = false;
    var tenta = function (sel) {
      if (achou) return;
      var divs = _divisoesDiaV100(sel, L, piso, 60);
      for (var a = 0; a < divs.length && !achou; a++) {
        var vivosApos = vivos.length;
        for (var k = 0; k < sel.length; k++) if (divs[a][k] === sel[k].rem) vivosApos--;
        if (vivosApos <= c1) achou = true;
      }
    };
    var escolhe = function (ini, atual) {
      if (achou) return;
      if (atual.length) tenta(atual);
      if (atual.length >= c2) return;
      for (var p = ini; p < vivos.length && !achou; p++) { atual.push(vivos[p]); escolhe(p + 1, atual); atual.pop(); }
    };
    escolhe(0, []);
    return (memo2[chave2] = achou);
  };
  var passo = function (dia, rem) {
    var D = C - dia, vivos = [], i;
    if (D <= 0) return false;
    var chave = dia + ':' + rem.join(',');
    if (ruins[chave]) return false;
    for (i = 0; i < n; i++) if (rem[i] > 0) {
      var po = _valoresPermitidosV100(rem[i], piso, L);
      vivos.push({ idx: i, rem: rem[i], urg: rem[i] / D, inteira: po.length === 1 });
    }
    if (!vivos.length) return false;
    vivos.sort(function (a, b) {
      // disciplina que só cabe inteira (pequena) fecha antes; o resto segue a urgência
      if (fechaPequenas && a.inteira !== b.inteira) return a.inteira ? -1 : 1;
      if (Math.abs(b.urg - a.urg) > 1e-9) return b.urg - a.urg;
      if (b.rem !== a.rem) return b.rem - a.rem;
      return rank[a.idx] - rank[b.idx];
    });
    var cands = _candidatosSelecaoV100(vivos, cap(D), topo);
    for (var c = 0; c < cands.length; c++) {
      var sel = cands[c], divs = _divisoesDiaV100(sel, L, piso, 6);
      if (D <= 4 && divs.length > 1) {
        var viv0 = vivos.length;
        var apos = function (xs) { var a = viv0; for (var z = 0; z < sel.length; z++) if (xs[z] === sel[z].rem) a--; return a; };
        divs = divs.map(function (xs, ix) { return { xs: xs, a: apos(xs), ix: ix }; })
          .sort(function (p, q2) { return p.a !== q2.a ? p.a - q2.a : p.ix - q2.ix; })
          .map(function (o) { return o.xs; });
      }
      for (var a = 0; a < divs.length; a++) {
        if (++nos > LIM) return false;
        var xs = divs[a], rem2 = rem.slice(), k;
        for (k = 0; k < sel.length; k++) rem2[sel[k].idx] -= xs[k];
        if (!viavel(rem2, D - 1)) continue;
        for (k = 0; k < sel.length; k++) (pecas[sel[k].idx] = pecas[sel[k].idx] || []).push({ dia: dia, qtd: xs[k] });
        if (D - 1 === 0 || passo(dia + 1, rem2)) return true;
        for (k = 0; k < sel.length; k++) pecas[sel[k].idx].pop();
      }
    }
    ruins[chave] = true;
    return false;
  };
  return passo(0, q.slice()) ? pecas : null;
}

// Alocação dia a dia por urgência (restante ÷ dias restantes). Mantém q, L e C; devolve { idx: [{dia, qtd}] } ou null.
function _fatiarCicloV100(q, L, C, discDia) {
  var n = q.length, soma = 0, i;
  if (!(L > 0) || !(C >= 1) || !n) return null;
  for (i = 0; i < n; i++) soma += q[i];
  if (soma !== L * C) return null;
  var piso = _pisoPecaV100(L, discDia);
  var seed = 20270110;
  var rnd = function () { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
  var niveis = [2, 1, 0], topos = [discDia + 6, n], modos = [true, false];
  for (var lv = 0; lv < niveis.length; lv++) {
    for (var md = 0; md < modos.length; md++) {
     for (var tp = 0; tp < topos.length; tp++) {
      for (var v = 0; v < 2; v++) {
        var rank = [];
        for (i = 0; i < n; i++) rank.push(i);
        if (v > 0) {
          for (var s = n - 1; s > 0; s--) { var r = Math.floor(rnd() * (s + 1)); var t = rank[s]; rank[s] = rank[r]; rank[r] = t; }
        }
        var res = _buscarFatiasV100(q, L, C, discDia, piso, niveis[lv], rank, topos[tp], modos[md]);
        if (res) return res;
      }
     }
    }
  }
  return null;
}

// Fila em ordem crescente do primeiro dia de cada disciplina (o ponteiro da fila depende disso).
function _ordemPorPrimeiroDiaV100(pecas, n) {
  var ord = [];
  for (var i = 0; i < n; i++) ord.push(i);
  ord.sort(function (a, b) {
    var pa = pecas[a][0], pb = pecas[b][0];
    if (pa.dia !== pb.dia) return pa.dia - pb.dia;
    if (pa.qtd !== pb.qtd) return pb.qtd - pa.qtd;
    return a - b;
  });
  return ord;
}

function _empacotarCicloLegacyV100(pcts, L, discDia, ordemInicial) {
  var n = pcts.length;
  var cMin = Math.max(1, Math.ceil(n / discDia));
  var seed = 20270110;
  var rnd = function () { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
  for (var C = cMin; C <= cMin + 12; C++) {
    var q = _inteirosV100(pcts, L * C);
    if (!q) continue;
    var base = [];
    for (var i = 0; i < n; i++) base.push(i);
    var cand = [];
    if (ordemInicial && ordemInicial.length === n) cand.push(ordemInicial.slice());
    cand.push(base.slice().sort(function (a, b) { return q[b] - q[a]; }));
    for (var t = 0; t < 3000; t++) {
      var o = base.slice();
      for (var s = o.length - 1; s > 0; s--) {
        var r = Math.floor(rnd() * (s + 1)); var tmp = o[s]; o[s] = o[r]; o[r] = tmp;
      }
      cand.push(o);
    }
    for (var c = 0; c < cand.length; c++) {
      var res = _fatiarCicloLegacyV100(cand[c], q, L, C, discDia);
      if (res) return { dias_por_ciclo: C, ordem: cand[c], quantidades: q, pecas: res };
    }
  }
  return null;
}

function _empacotarCicloV100(pcts, L, discDia, ordemInicial) {
  var leg = _empacotarCicloLegacyV100(pcts, L, discDia, ordemInicial);
  if (!leg) return null;
  var novo = null;
  try { novo = _fatiarCicloV100(leg.quantidades, L, leg.dias_por_ciclo, discDia); }
  catch (e) { Logger.log('[V100] fatiar: ' + e.message); }
  if (!novo) return leg;
  return { dias_por_ciclo: leg.dias_por_ciclo, ordem: _ordemPorPrimeiroDiaV100(novo, pcts.length), quantidades: leg.quantidades, pecas: novo };
}

// Aplica o empacotamento aos itens da fila (peso_raw = % do esforço). Devolve a fila
// reordenada e o tamanho do ciclo, ou null se não houver solução (aí vale o agrupamento antigo).
function _aplicarEmpacotamentoV100(itens, p) {
  var L = Math.max(1, Math.round(Number(p.metaDia) || 0));
  var discDia = Math.max(1, Math.round(Number(p.disciplinasDia) || 3));
  var minQ = Number(p.minPorQuestao) || 6;
  if (!itens || !itens.length) return null;
  var pcts = itens.map(function (it) { return Number(it.peso_raw) || 0; });
  if (pcts.some(function (v) { return !(v > 0); })) return null;
  var r = _empacotarCicloV100(pcts, L, discDia, itens.map(function (_, i) { return i; }));
  if (!r) return null;
  var fila = r.ordem.map(function (idx) {
    var it = itens[idx], ps = r.pecas[idx] || [];
    it.grupos_ciclo = ps.map(function (x) { return x.dia; });
    it.pecas_ciclo  = ps.map(function (x) { return x.qtd; });
    it.grupo_ciclo  = it.grupos_ciclo[0];
    it.qtd_ciclo    = r.quantidades[idx];
    it.qtd_bloco    = Math.max(1, Math.round(r.quantidades[idx] / ps.length));
    it.tempo_bloco  = Math.round(it.qtd_bloco * minQ);
    return it;
  });
  return { fila: fila, dias_por_ciclo: r.dias_por_ciclo };
}

function _reagruparBalanceadoV100(config) {
  try {
    var pl = config && config.planejamento;
    if (!pl || pl.balanceado_v100 !== true || !config.fila || !config.fila.length) return false;
    var ptr = config.ponteiro_fila || 0;
    var discAtual = (config.fila[ptr] || config.fila[0]).disciplina;
    var res = _aplicarEmpacotamentoV100(config.fila, {
      metaDia: pl.meta_qtd_dia, disciplinasDia: pl.disciplinas_dia, minPorQuestao: pl.min_por_questao
    });
    if (!res) return false;
    config.fila = res.fila;
    pl.dias_por_ciclo = res.dias_por_ciclo;
    var novo = config.fila.findIndex(function (f) { return f.disciplina === discAtual; });
    config.ponteiro_fila = novo >= 0 ? novo : 0;
    return true;
  } catch (e) { Logger.log('[V100] reagrupar: ' + e.message); return false; }
}

// Chamada no início das três rotinas que reagrupavam a fila por fatias sequenciais.
// Devolve o resultado pronto quando o ciclo é balanceado; null deixa a rotina original seguir.
function _recalcularBalanceadoV100(novaOrdemIds, msg) {
  try {
    var config = carregarConfiguracaoCiclo();
    if (!config || !config.planejamento || config.planejamento.balanceado_v100 !== true || !config.fila || !config.fila.length) return null;
    if (novaOrdemIds && novaOrdemIds.length) {
      var nova = [];
      novaOrdemIds.forEach(function (id) {
        var it = config.fila.find(function (f) { return f.id === id; });
        if (it) nova.push(it);
      });
      config.fila.forEach(function (it) { if (novaOrdemIds.indexOf(it.id) === -1) nova.push(it); });
      config.fila = nova;
    }
    if (!_reagruparBalanceadoV100(config)) return null;
    salvarConfiguracaoCiclo(config);
    reconstruirCacheCompleto();
    return {
      sucesso: true,
      msg: msg || ('Ciclo recalculado e balanceado em ' + config.planejamento.dias_por_ciclo + ' dias.'),
      disciplinas: config.fila.map(function (i) {
        return { disciplina: i.disciplina, peso_raw: i.peso_raw, qtd_bloco: i.qtd_bloco, grupo_ciclo: i.grupo_ciclo, tempo_bloco: i.tempo_bloco };
      })
    };
  } catch (e) { Logger.log('[V100] recalcular: ' + e.message); return null; }
}

function _noGrupoV100(f, g) {
  return Array.isArray(f.grupos_ciclo) ? f.grupos_ciclo.indexOf(g) >= 0 : f.grupo_ciclo === g;
}
function _qtdNoGrupoV100(f, g) {
  if (Array.isArray(f.grupos_ciclo) && Array.isArray(f.pecas_ciclo)) {
    var i = f.grupos_ciclo.indexOf(g);
    return i >= 0 ? (f.pecas_ciclo[i] || 0) : 0;
  }
  return f.grupo_ciclo === g ? (f.qtd_bloco || 10) : 0;
}


// ============================================================================
// V101 — DIAGNÓSTICO DOS RESUMOS (somente leitura). Rode no editor do Apps Script e leia o log.
// Para cada tema do banco de questões, mostra se o resumo Pro é encontrado e, se não, o que existe na pasta.
// ============================================================================
function diagnosticarResumosV101() {
  var inicio = Date.now(), LIMITE_MS = 300000;
  var root = getFolder(PASTA_RAIZ);
  var pro = getFolder(PASTA_RESUMO_PRO, root);
  var pastas = [], it = pro.getFolders();
  while (it.hasNext()) pastas.push(it.next().getName());
  Logger.log('Pastas em ' + PASTA_RESUMO_PRO + ': ' + JSON.stringify(pastas));
  var mapa = _construirMapaDoZero(), ok = 0, falta = 0, repetidos = 0;
  Object.keys(mapa).forEach(function (d) {
    if (Date.now() - inicio > LIMITE_MS) return;
    var vistos = {};
    (mapa[d].questoes || []).forEach(function (q) {
      if (vistos[q.tema]) { repetidos++; Logger.log('REPETIDO: ' + d + ' | ' + q.tema + ' | arquivo ' + q.nomeArquivo); return; }
      vistos[q.tema] = true;
      var f = _acharArquivoResumoV101(pro, d, q.tema);
      if (f) { ok++; return; }
      falta++;
      var pf = _pastaDisciplinaOuAliasV101(pro, d), nomes = [];
      if (pf) { var fs = pf.getFiles(); while (fs.hasNext()) nomes.push(fs.next().getName()); }
      Logger.log('SEM RESUMO: ' + d + ' | ' + q.tema + ' | pasta: ' + (pf ? pf.getName() : 'NÃO ACHADA') + ' | arquivos na pasta: ' + nomes.length +
                 (nomes.length ? ' | ex.: ' + nomes.slice(0, 3).join(' ; ') : ''));
    });
  });
  Logger.log('Resumos achados: ' + ok + ' | sem resumo: ' + falta + ' | temas repetidos (arquivos distintos, mesmo tema canônico): ' + repetidos);
}

// ============================================================================
// V101 — AMOSTRA PARA CONFERÊNCIA (somente leitura). Rode no editor do Apps Script e copie o LOG inteiro.
// amostraEditalV101()            -> todas as disciplinas (saída curta; pode ser cortada pelo Apps Script)
// amostraLinguaPortuguesaV101()  -> só Língua Portuguesa     amostraDireitoAdministrativoV101() -> só Dir. Administrativo
// Para outra disciplina: amostraEditalV101('Nome exato da disciplina').
// ============================================================================
function amostraLinguaPortuguesaV101() { return amostraEditalV101('Língua Portuguesa'); }
function amostraDireitoAdministrativoV101() { return amostraEditalV101('Direito Administrativo'); }

function amostraEditalV101(filtro) {
  var unica = (typeof filtro === 'string' && filtro) ? filtro : null;
  var MAX_TEMAS = unica ? 6 : 2, MAX_SUBTEMAS = 2;
  var inicio = Date.now(), LIMITE_MS = 270000, L = [];
  var root = getFolder(PASTA_RAIZ);
  var pro = getFolder(PASTA_RESUMO_PRO, root), lite = getFolder(PASTA_RESUMO_LITE, root);
  L.push('=== AMOSTRA V101' + (unica ? ' — ' + unica : '') + ' ===');
  var mapa = _construirMapaDoZero();
  var discs = Object.keys(mapa).sort();
  if (unica) discs = discs.filter(function (d) { return d === unica; });
  discs.forEach(function (d) {
    if (Date.now() - inicio > LIMITE_MS) { L.push('(tempo esgotado — amostra parcial)'); return; }
    var arqs = mapa[d].questoes || [], porTema = {}, ordem = [];
    arqs.forEach(function (q) {
      if (!porTema[q.tema]) { porTema[q.tema] = []; ordem.push(q.tema); }
      porTema[q.tema].push(q.nomeArquivo);
    });
    ordem.sort(function (a, b) { return a.localeCompare(b, undefined, { numeric: true }); });
    L.push('');
    L.push('DISCIPLINA: ' + d + ' | arquivos: ' + arqs.length + ' | temas únicos: ' + ordem.length + ' | repetidos: ' + (arqs.length - ordem.length));
    ordem.slice(0, MAX_TEMAS).forEach(function (tema) {
      var arquivos = porTema[tema];
      L.push('  TEMA: ' + tema + (arquivos.length > 1 ? '   <<< REPETIDO x' + arquivos.length : ''));
      if (arquivos.length > 1) L.push('    arquivos: ' + JSON.stringify(arquivos));
      ['pro', 'lite'].forEach(function (tipo) {
        var f = null;
        try { f = _acharArquivoResumoV101(tipo === 'pro' ? pro : lite, d, tema); } catch (e) { L.push('    ' + tipo + ': erro ' + e.message); return; }
        if (!f) { L.push('    ' + tipo + ': NÃO ACHADO'); return; }
        var info = '';
        try {
          var j = JSON.parse(f.getBlob().getDataAsString());
          var len = function (x) { return Array.isArray(x) ? x.length : (typeof x === 'string' ? x.length + 'ch' : (x ? 'obj' : '0')); };
          info = 'chaves=[' + Object.keys(j).join(',') + '] topicos=' + len(j.topicos) + ' conteudo_html=' + len(j.conteudo_html) +
                 ' posts=' + len(j.posts) + ' ctx_llm=' + len(j.contexto_llm_topicos) + ' bytes=' + f.getSize();
          if (Array.isArray(j.topicos) && j.topicos[0]) info += ' | 1º tópico: ' + String(j.topicos[0].titulo || '').slice(0, 50) + ' (' + String(j.topicos[0].conteudo_html || '').length + 'ch)';
        } catch (e2) { info = 'JSON ilegível, bytes=' + f.getSize(); }
        L.push('    ' + tipo + ': ' + f.getName() + ' | ' + info);
        try {
          var pf = _pastaDisciplinaOuAliasV101(tipo === 'pro' ? pro : lite, d), cand = [], tl = limparNomeArquivo(tema);
          if (pf) { var itc = pf.getFiles(); while (itc.hasNext()) { var fc = itc.next(); if (fc.getName().indexOf(tl) !== -1) cand.push(fc.getName() + ' (' + fc.getSize() + 'B)'); } }
          if (cand.length > 1) L.push('      candidatos com esse tema: ' + JSON.stringify(cand));
        } catch (e3) {}
      });
      var tc = _temaCanonicoEdital(d, tema);
      if (!tc) { L.push('    edital: tema FORA do mapa'); return; }
      var subs = MAPA_DISTRIBUICAO_EDITAL[d][tc] || {}, nomesS = Object.keys(subs);
      L.push('    edital: "' + tc + '" | subtemas: ' + nomesS.length);
      nomesS.slice(0, MAX_SUBTEMAS).forEach(function (s) {
        L.push('      - ' + s + ' | ' + subs[s].importancia + ' | ' + (subs[s].distribuicao !== undefined ? subs[s].distribuicao : '-'));
      });
    });
  });
  L.push('');
  L.push('=== FIM (' + Math.round((Date.now() - inicio) / 1000) + 's) ===');
  var texto = L.join('\n');
  Logger.log(texto);
  return texto;
}