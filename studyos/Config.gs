/* =====================================================================================
   CONFIG.GS — MAPA DE ESTUDO: AGENTE DA POLÍCIA JUDICIAL — TRT-8 (Edital 01/2026, FCC) — UNIFICADO
   15 disciplinas · 194 temas (142 ativos, 1265 subtemas ativos)
   Prova: Conhecimentos Gerais (20 questões, peso 1) + Conhecimentos Específicos (40 questões, peso 2)
   => pontos: gerais 20% / específicos 80% (PESO_DISCIPLINA já em % do total de pontos).
   REGRA-MÃE: chaves Disciplina > Tema > Subtema IDÊNTICAS às do banco (raio-x) sempre que existiam;
   chaves novas só onde o edital pede e o banco não tem. EXCLUIR = fora do edital novo (mantido para casar tags).
   GERAIS: Língua Portuguesa, RLM, Noções de Legislação (nova), Noções de Sustentabilidade, Direitos Humanos, Informática.
   ESPECÍFICOS: Direito Constitucional, Direito Administrativo, Segurança de Dignitários, Segurança Orgânica,
   Normas da Polícia Judicial (nova), Direito Penal, Legislação Penal Especial, Processo Penal, Direito da Pessoa Idosa e da PcD.
   Pesos de disciplina e de tema são ESTIMATIVAS editáveis (o edital não divide as questões).
   AJUSTE 05/10/2026 (estudo multi-tribunal): itens exclusivos do TRT-8/Justiça do Trabalho marcados EXCLUIR (chaves mantidas p/ casar tags):
   Noções de Legislação 01 e 02; subtemas CSJT 360/2023 (tema 03) e CSJT 368/2023 (tema 04); Normas da Polícia Judicial 06 (CSJT 315/2021 e 432/2026).
   Pesos de tema e distribuições dos subtemas renormalizados p/ 100%; ORDEM_DE_ESTUDO e MARCOS_DE_COBERTURA recalculados. PESO_DISCIPLINA inalterado.
   AJUSTE 06/10/2026 (estudo multi-tribunal, sem itens de tribunal específico): títulos dos temas 03 e 04 de Noções de Legislação passaram a citar só normas do CNJ;
   reativados: Res. CNJ 351/2020 (tema 03), Planilhas e Apresentações Google (Informática 11), Direito Penal Parte Geral (temas 01, 02, 03 e 34; jurisprudência 🆕 segue EXCLUIR)
   e CTB Cap. XX (novo subtema em Segurança de Dignitários 13). Pesos de subtema/tema, ORDEM_DE_ESTUDO e MARCOS_DE_COBERTURA recalculados.
   AJUSTE 06/10/2026 (batimento com a lista do curso Polícia Judicial): reativados 256 subtemas já existentes (Constitucional, Administrativo, Processo Penal, Leg. Penal Especial, Informática, Direitos Humanos, Seg. Dignitários 02),
   sem criar nem renomear chave; sem duplicar subtema na disciplina; 🆕 de jurisprudência seguem EXCLUIR; Comitê de Incentivo à Participação Institucional Feminina (Noções de Legislação 04) → EXCLUIR.
   Pesos de subtema/tema, ORDEM_DE_ESTUDO e MARCOS_DE_COBERTURA recalculados (pesos de tema são ESTIMATIVAS a reestimar).
   Variantes de subtema (MAPA_ALIASES_EDITAL) já foram unificadas na geração; o bloco final é idempotente.
   ===================================================================================== */

const MAPA_DISTRIBUICAO_EDITAL = {
  "Língua Portuguesa": {
    "01 - Sintaxe da Oração": {
      "Sujeito": {
        "distribuicao": "8.2%",
        "importancia": "ALTO"
      },
      "Sujeito Indeterminado": {
        "distribuicao": "8.6%",
        "importancia": "ALTO"
      },
      "Partícula SE": {
        "distribuicao": "8.6%",
        "importancia": "ALTO"
      },
      "Sujeito Oracional": {
        "distribuicao": "2.9%",
        "importancia": "BAIXO"
      },
      "Predicado": {
        "distribuicao": "8.6%",
        "importancia": "ALTO"
      },
      "Predicativo do Sujeito": {
        "distribuicao": "5.7%",
        "importancia": "MÉDIO"
      },
      "Predicativo do Objeto": {
        "distribuicao": "2.9%",
        "importancia": "BAIXO"
      },
      "Transitividade Verbal": {
        "distribuicao": "8.6%",
        "importancia": "ALTO"
      },
      "Objeto Direto": {
        "distribuicao": "8.6%",
        "importancia": "ALTO"
      },
      "Objeto Indireto": {
        "distribuicao": "8.6%",
        "importancia": "ALTO"
      },
      "Adjunto Adnominal vs Complemento Nominal": {
        "distribuicao": "8.6%",
        "importancia": "ALTO"
      },
      "Aposto": {
        "distribuicao": "8.6%",
        "importancia": "ALTO"
      },
      "Vocativo": {
        "distribuicao": "2.9%",
        "importancia": "BAIXO"
      },
      "Adjunto Adverbial": {
        "distribuicao": "5.7%",
        "importancia": "MÉDIO"
      },
      "Agente da Passiva": {
        "distribuicao": "2.9%",
        "importancia": "BAIXO"
      },
      "Pronomes Relativos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Voz Passiva Analítica": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Voz Passiva Sintética": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Regência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Manual da Presidência – Simplificação sintática em atos normativos (3ª Ed., 2018)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Pronomes Oblíquos (Função Sintática)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Ortografia": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Verbos Impessoais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Verbo Haver e Existir": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Orações Subordinadas Substantivas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concordância Verbal - Verbo Haver e Existir": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sintaxe": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Termos Oração": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Período Composto": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Adjetivos - Locução Adjetiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Orações Coordenadas Conclusivas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Regência e Crase": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sintaxe Geral": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concordância Verbal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "02 - Morfologia": {
      "Pronomes Relativos": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      },
      "Pronomes Pessoais": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      },
      "Pronomes de Tratamento": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      },
      "Pronomes Demonstrativos": {
        "distribuicao": "3.4%",
        "importancia": "BAIXO"
      },
      "Pronomes Indefinidos": {
        "distribuicao": "3.4%",
        "importancia": "BAIXO"
      },
      "Pronomes Possessivos": {
        "distribuicao": "3.4%",
        "importancia": "BAIXO"
      },
      "Pronomes": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      },
      "Colocação Pronominal": {
        "distribuicao": "10.6%",
        "importancia": "ALTO"
      },
      "Conjunções - Valor Semântico": {
        "distribuicao": "10.3%",
        "importancia": "ALTO"
      },
      "Preposições (Valor Semântico)": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      },
      "Formação de Palavras": {
        "distribuicao": "10.3%",
        "importancia": "ALTO"
      },
      "Substantivos - Gênero": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      },
      "Substantivos - Plural de Compostos": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      },
      "Adjetivos - Flexão de Grau": {
        "distribuicao": "3.4%",
        "importancia": "BAIXO"
      },
      "Classes de Palavras": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      },
      "Advérbios - Valor Semântico": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 STF - Padrão formal da Língua Portuguesa como patrimônio imaterial (2020)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Verbos - Flexão Irregular": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Artigos - Substantivação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Verbos - Tempos e Modos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Conjugação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Substantivos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Semântica Verbal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Significado Palavras": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concordância Verbal e Nominal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concordância Nominal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Advérbios - Interrogativos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Verbos Abundantes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Semântica": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Numerais - Flexão": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Morfologia - Interjeições": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Voz Passiva Sintética": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Modo Imperativo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Interjeições": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Verbos - Imperativo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Verbos - Particípio Duplo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Numerais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Verbos - Voz Passiva Analítica": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Adjetivos Pátrios": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Adjetivos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Artigos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Advérbios": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Verbos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Substantivos - Coletivos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Adjetivos - Locução Adjetiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Verbos - Vozes Verbais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Adjunto Adnominal vs Complemento Nominal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Correlação Verbal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concordância Verbal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Orações Subordinadas Adverbiais Proporcionais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Flexão Nominal (gênero, número e grau)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "03 - Morfologia II: Verbos": {
      "Vozes Verbais": {
        "distribuicao": "20.0%",
        "importancia": "ALTO"
      },
      "Correlação Verbal": {
        "distribuicao": "26.6%",
        "importancia": "CRÍTICO"
      },
      "Verbos - Tempos e Modos": {
        "distribuicao": "20.0%",
        "importancia": "ALTO"
      },
      "Verbos Irregulares": {
        "distribuicao": "13.3%",
        "importancia": "MÉDIO"
      },
      "Verbos Abundantes": {
        "distribuicao": "6.7%",
        "importancia": "BAIXO"
      },
      "Gerúndio": {
        "distribuicao": "6.7%",
        "importancia": "BAIXO"
      },
      "Locuções Verbais": {
        "distribuicao": "6.7%",
        "importancia": "BAIXO"
      },
      "Concordância Verbal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Partícula SE": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Manual de Redação da Presidência – Uniformização de tempos verbais oficiais (3ª Ed., 2018)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concordância Verbal - Partícula SE": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Significado Palavras": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Semântica Verbal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Verbos Impessoais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concordância Verbal - Verbo 'Haver' (Tempo)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sintaxe Verbal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concordância com 'Se' (IIS)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Agente da Passiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concordância com Pronome Relativo QUE": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Verbos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Verbo Haver e Existir": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concordância Verbal - Verbo Haver e Existir": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "04 - Sintaxe do período": {
      "Orações Subordinadas Adverbiais Concessivas": {
        "distribuicao": "10.8%",
        "importancia": "CRÍTICO"
      },
      "Orações Subordinadas Adverbiais Condicionais": {
        "distribuicao": "11.1%",
        "importancia": "CRÍTICO"
      },
      "Orações Subordinadas Adverbiais Causais": {
        "distribuicao": "8.3%",
        "importancia": "ALTO"
      },
      "Orações Subordinadas Adverbiais Temporais": {
        "distribuicao": "5.6%",
        "importancia": "MÉDIO"
      },
      "Orações Subordinadas Adverbiais Finais": {
        "distribuicao": "5.6%",
        "importancia": "MÉDIO"
      },
      "Orações Subordinadas Adverbiais Consecutivas": {
        "distribuicao": "5.6%",
        "importancia": "MÉDIO"
      },
      "Orações Subordinadas Adverbiais Conformativas": {
        "distribuicao": "5.6%",
        "importancia": "MÉDIO"
      },
      "Orações Subordinadas Adverbiais Proporcionais": {
        "distribuicao": "2.8%",
        "importancia": "BAIXO"
      },
      "Orações Subordinadas Adverbiais Comparativas": {
        "distribuicao": "2.8%",
        "importancia": "BAIXO"
      },
      "Orações Subordinadas Substantivas": {
        "distribuicao": "8.3%",
        "importancia": "ALTO"
      },
      "Orações Subordinadas Adjetivas": {
        "distribuicao": "8.3%",
        "importancia": "ALTO"
      },
      "Orações Coordenadas Adversativas": {
        "distribuicao": "5.6%",
        "importancia": "MÉDIO"
      },
      "Orações Coordenadas Aditivas": {
        "distribuicao": "5.6%",
        "importancia": "MÉDIO"
      },
      "Orações Coordenadas Alternativas": {
        "distribuicao": "2.8%",
        "importancia": "BAIXO"
      },
      "Orações Coordenadas Conclusivas": {
        "distribuicao": "5.6%",
        "importancia": "MÉDIO"
      },
      "Orações Coordenadas Explicativas": {
        "distribuicao": "5.6%",
        "importancia": "MÉDIO"
      },
      "Conjunções - Valor Semântico": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Paralelismo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 CF/88, art. 37 - Clareza e objetividade na linguagem estatal (Princípio da Publicidade)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Orações Adverbiais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Conectivos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Reescrita": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Conjunções Coordenativas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Pronomes Relativos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "05 - Concordância": {
      "Concordância Verbal": {
        "distribuicao": "7.6%",
        "importancia": "CRÍTICO"
      },
      "Concordância Verbal - Verbo Haver": {
        "distribuicao": "5.2%",
        "importancia": "ALTO"
      },
      "Concordância Verbal - Verbo Fazer": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Concordância Verbal - Verbo Ser": {
        "distribuicao": "5.2%",
        "importancia": "ALTO"
      },
      "Concordância Verbal - Verbo Parecer": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Concordância com a Partícula SE": {
        "distribuicao": "5.2%",
        "importancia": "ALTO"
      },
      "Concordância Verbal - Sujeito Coletivo": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Concordância Verbal - Expressões Partitivas": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Concordância Verbal - Porcentagem": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Concordância Verbal - Mais de um": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Concordância Verbal - Nem um nem outro": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Concordância Verbal (Conjunção OU)": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Concordância Verbal - Sujeito Composto Posposto": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Concordância Verbal - Pronome Relativo QUEM": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Concordância Verbal (Pronome Relativo QUE)": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Concordância Verbal - Expressão 'Um dos que'": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Concordância Verbal - Haja Vista": {
        "distribuicao": "1.7%",
        "importancia": "BAIXO"
      },
      "Concordância Nominal": {
        "distribuicao": "6.9%",
        "importancia": "CRÍTICO"
      },
      "Concordância Nominal - Palavra 'Meio'": {
        "distribuicao": "5.2%",
        "importancia": "ALTO"
      },
      "Concordância Nominal - Anexo e Incluso": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Concordância Nominal - Obrigado": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Concordância Nominal - Só e A sós": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Concordância Nominal - Menos e Alerta": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Concordância Nominal - É proibido/É necessário": {
        "distribuicao": "5.2%",
        "importancia": "ALTO"
      },
      "Concordância Nominal - Tal qual": {
        "distribuicao": "1.7%",
        "importancia": "BAIXO"
      },
      "Concordância Nominal (Caro/Barato)": {
        "distribuicao": "1.7%",
        "importancia": "BAIXO"
      },
      "🆕 STF - Uso padrão da língua portuguesa no serviço público (2024)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concordância Verbal - Voz Passiva Sintética": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concordância Verbal na Passiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concordância com Pronome de Tratamento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "06 - Regência e Crase": {
      "Regência Verbal": {
        "distribuicao": "17.6%",
        "importancia": "ALTO"
      },
      "Regência Nominal": {
        "distribuicao": "17.6%",
        "importancia": "ALTO"
      },
      "Crase": {
        "distribuicao": "23.6%",
        "importancia": "CRÍTICO"
      },
      "Crase Facultativa e Proibida": {
        "distribuicao": "17.6%",
        "importancia": "ALTO"
      },
      "Crase em Locuções e Pronomes": {
        "distribuicao": "11.8%",
        "importancia": "MÉDIO"
      },
      "Regência e Crase": {
        "distribuicao": "11.8%",
        "importancia": "MÉDIO"
      },
      "Paralelismo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 STF - Aplicação estrita da norma culta na Educação e Administração (2021)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "07 - Pontuação": {
      "Pontuação": {
        "distribuicao": "28.6%",
        "importancia": "CRÍTICO"
      },
      "Vírgula em Orações Subordinadas": {
        "distribuicao": "21.4%",
        "importancia": "ALTO"
      },
      "Ponto e Vírgula": {
        "distribuicao": "14.3%",
        "importancia": "MÉDIO"
      },
      "Vírgula no período simples (sujeito, adjuntos deslocados, vocativo e aposto)": {
        "distribuicao": "21.4%",
        "importancia": "ALTO"
      },
      "Dois-pontos, travessão, parênteses, aspas e reticências": {
        "distribuicao": "14.3%",
        "importancia": "MÉDIO"
      },
      "Reescrita": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Aposto": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Conectivos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 STF - Padrão formal e linguagem oficial neutra (2021)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "08 - Ortografia Oficial": {
      "Acentuação": {
        "distribuicao": "26.7%",
        "importancia": "CRÍTICO"
      },
      "Ortografia": {
        "distribuicao": "20.0%",
        "importancia": "ALTO"
      },
      "Hífen": {
        "distribuicao": "20.0%",
        "importancia": "ALTO"
      },
      "Acordo Ortográfico": {
        "distribuicao": "13.3%",
        "importancia": "MÉDIO"
      },
      "Emprego do Porquê": {
        "distribuicao": "13.3%",
        "importancia": "MÉDIO"
      },
      "Fonologia": {
        "distribuicao": "6.7%",
        "importancia": "BAIXO"
      },
      "Pronomes Relativos (Onde vs Aonde)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 STF - Vedação ao uso de linguagem neutra em documentos oficiais (2023)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crase": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Semântica": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Pontuação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Clareza": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Significado Palavras": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Norma Culta": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Interpretação Textual": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "09 - Coesão e Coerência": {
      "Coesão": {
        "distribuicao": "57.1%",
        "importancia": "CRÍTICO"
      },
      "Coesão e Coerência": {
        "distribuicao": "42.9%",
        "importancia": "ALTO"
      },
      "Conjunções": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Interpretação Textual": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Significado Palavras": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Lei 14.129/2021 – Redação de serviços públicos com coerência e simplicidade (art. 5º)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Semântica": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Preposições (Valor Semântico)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Reescrita": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "10 - Semântica e Tipos de Textos": {
      "Figuras Linguagem": {
        "distribuicao": "15.0%",
        "importancia": "ALTO"
      },
      "Discurso": {
        "distribuicao": "15.0%",
        "importancia": "ALTO"
      },
      "Intertextualidade": {
        "distribuicao": "10.0%",
        "importancia": "MÉDIO"
      },
      "Denotação e Conotação": {
        "distribuicao": "15.0%",
        "importancia": "ALTO"
      },
      "Sinonímia e Antonímia": {
        "distribuicao": "15.0%",
        "importancia": "ALTO"
      },
      "Significado Palavras": {
        "distribuicao": "10.0%",
        "importancia": "MÉDIO"
      },
      "Gêneros Textuais": {
        "distribuicao": "10.0%",
        "importancia": "MÉDIO"
      },
      "Tipologia Textual": {
        "distribuicao": "10.0%",
        "importancia": "MÉDIO"
      },
      "🆕 Inconstitucionalidade de lei sobre linguagem neutra oficial (STF, 2021)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Conjunções - Valor Semântico": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Advérbios - Valor Semântico": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Coesão": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Coesão e Coerência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Ortografia": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Morfologia": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Preposições (Valor Semântico)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Interpretação Textual": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Formação de Palavras - Derivação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "11 - Compreensão e Interpretação Textual": {
      "Interpretação Textual": {
        "distribuicao": "28.6%",
        "importancia": "CRÍTICO"
      },
      "Inferência": {
        "distribuicao": "21.4%",
        "importancia": "ALTO"
      },
      "Ideia Central": {
        "distribuicao": "14.3%",
        "importancia": "MÉDIO"
      },
      "Argumentação": {
        "distribuicao": "14.3%",
        "importancia": "MÉDIO"
      },
      "Relação do texto com o contexto histórico": {
        "distribuicao": "14.3%",
        "importancia": "MÉDIO"
      },
      "Não-Verbal": {
        "distribuicao": "7.1%",
        "importancia": "BAIXO"
      },
      "Tipologia Textual": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Coesão": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Princípio da linguagem clara no atendimento público (Lei 14.129/2021, art. 3º)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Conjunções - Valor Semântico": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Funções Linguísticas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Intertextualidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Semântica": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Discurso": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Gêneros Textuais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Coesão e Coerência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Orações Subordinadas Adverbiais Condicionais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Adjetivos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Significado Palavras": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Variação Linguística": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Figuras Linguagem": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Estilística": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Reescrita": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "12 - Reescrita de frases": {
      "Reescrita": {
        "distribuicao": "20.0%",
        "importancia": "CRÍTICO"
      },
      "Organização e reorganização de orações e períodos": {
        "distribuicao": "15.0%",
        "importancia": "ALTO"
      },
      "Equivalência e transformação de estruturas": {
        "distribuicao": "15.0%",
        "importancia": "ALTO"
      },
      "Norma Culta": {
        "distribuicao": "15.0%",
        "importancia": "ALTO"
      },
      "Emprego de Tempos e Modos": {
        "distribuicao": "10.0%",
        "importancia": "MÉDIO"
      },
      "Conectivos": {
        "distribuicao": "15.0%",
        "importancia": "ALTO"
      },
      "Sintaxe": {
        "distribuicao": "10.0%",
        "importancia": "MÉDIO"
      },
      "Interpretação Textual": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Lei 14.129/2021 – Governo Digital e uso de linguagem clara na Administração (art. 5º)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Semântica": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Verbos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Pontuação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Regência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concordância Verbal - Verbo 'Haver' (Existir)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Significado Palavras": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Morfologia": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Verbos - Vozes Verbais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "13 - Redação Oficial (Manual de Redação da Presidência da República)": {
      "Características e princípios da redação oficial": {
        "distribuicao": "28.6%",
        "importancia": "CRÍTICO"
      },
      "Pronomes de tratamento, vocativos e fechos": {
        "distribuicao": "28.6%",
        "importancia": "CRÍTICO"
      },
      "Ofício, memorando e e-mail (estrutura e uso)": {
        "distribuicao": "28.6%",
        "importancia": "CRÍTICO"
      },
      "Aviso, exposição de motivos, mensagem e telegrama": {
        "distribuicao": "7.1%",
        "importancia": "BAIXO"
      },
      "Atos normativos (decreto, portaria) e padronização": {
        "distribuicao": "7.1%",
        "importancia": "BAIXO"
      }
    }
  },
  "RLM": {
    "02 - Sequências e Estruturas Lógicas": {
      "Raciocínio verbal e relações arbitrárias entre pessoas, lugares, objetos ou eventos": {
        "distribuicao": "9.1%",
        "importancia": "ALTO"
      },
      "Associações Lógicas": {
        "distribuicao": "9.1%",
        "importancia": "ALTO"
      },
      "Verdades e Mentiras": {
        "distribuicao": "9.1%",
        "importancia": "ALTO"
      },
      "Sequências Numéricas": {
        "distribuicao": "12.0%",
        "importancia": "CRÍTICO"
      },
      "Sequências de Letras": {
        "distribuicao": "9.1%",
        "importancia": "ALTO"
      },
      "Sequências de Figuras": {
        "distribuicao": "9.1%",
        "importancia": "ALTO"
      },
      "Sequências Cíclicas": {
        "distribuicao": "9.1%",
        "importancia": "ALTO"
      },
      "Ordenação Lógica": {
        "distribuicao": "9.1%",
        "importancia": "ALTO"
      },
      "Orientação Espacial": {
        "distribuicao": "9.1%",
        "importancia": "ALTO"
      },
      "Calendários e Ciclos": {
        "distribuicao": "9.1%",
        "importancia": "ALTO"
      },
      "Formação de conceitos e discriminação de elementos": {
        "distribuicao": "6.1%",
        "importancia": "MÉDIO"
      },
      "Ordenação Lógica e Raciocínio Temporal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sequências Alfanuméricas e de Letras": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Raciocínio analítico multivariável – Estilo CEBRASPE/FGV em provas SEFAZ (perfil de questões longas, SEFAZ-SP 2026)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Argumentação Lógica": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Negação da Condicional": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Disjunção Exclusiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Problemas Aritméticos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Razão e Proporção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Negação de Conjunção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Análise Combinatória": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Falácias Lógicas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Equivalência Lógica da Condicional": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Argumentos Lógicos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Casa dos Pombos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio Fundamental da Contagem": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Problemas com Três Conjuntos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Silogismos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Combinatória": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Tabela-Verdade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lógica Proposicional": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Mínimo Múltiplo Comum (MMC)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Equivalência Lógica": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Problemas com Dois Conjuntos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Diagramas Lógicos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Negação de Proposições Categóricas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Negação de Quantificadores": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Permutações com Restrição": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Problemas de Idade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Equivalência da Condicional": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Permutações Simples": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Tautologia": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Problemas com Conjuntos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Contrapositiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Geometria Plana - Áreas e Perímetros": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Conceito de Proposição": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Orientação espacial e temporal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "03 - Lógica de Argumentação": {
      "Validade de Argumentos": {
        "distribuicao": "22.2%",
        "importancia": "CRÍTICO"
      },
      "Silogismos": {
        "distribuicao": "22.2%",
        "importancia": "CRÍTICO"
      },
      "Silogismo Hipotético": {
        "distribuicao": "16.7%",
        "importancia": "ALTO"
      },
      "Silogismo Disjuntivo": {
        "distribuicao": "11.1%",
        "importancia": "MÉDIO"
      },
      "Diagramas Lógicos": {
        "distribuicao": "16.7%",
        "importancia": "ALTO"
      },
      "Falácias Lógicas": {
        "distribuicao": "11.1%",
        "importancia": "MÉDIO"
      },
      "Diagramas Lógicos e Diagramas de Venn": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Premissas implícitas em argumentos longos – Padrão CEBRASPE C/E em provas fiscais (SEFAZ-RJ 2025)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Equivalência Lógica": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Operações Lógicas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Problemas Lógicos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Disjunção Exclusiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Condições Necessárias e Suficientes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Problemas Lógicos - Verdades e Mentiras": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Associações Lógicas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Conceitos Iniciais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Negação de Conjunção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Negação de Proposições Categóricas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Negação de Quantificadores": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Equivalência da Condicional": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Negação de Proposições": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Equivalência Lógica da Condicional": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Teoria dos Conjuntos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Verdades e Mentiras": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Equivalência da Bicondicional": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Negação de Proposições Compostas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Problemas com Conjuntos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Negação de Condicional": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Contrapositiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Operações com Conjuntos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Conceito de Proposição": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Tabela-Verdade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lógica Proposicional": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "04 - Lógica de Proposições": {
      "Conceito de Proposição": {
        "distribuicao": "7.1%",
        "importancia": "ALTO"
      },
      "Conectivos Lógicos": {
        "distribuicao": "9.7%",
        "importancia": "CRÍTICO"
      },
      "Bicondicional": {
        "distribuicao": "7.1%",
        "importancia": "ALTO"
      },
      "Tabela-Verdade": {
        "distribuicao": "7.1%",
        "importancia": "ALTO"
      },
      "Tautologia": {
        "distribuicao": "4.8%",
        "importancia": "MÉDIO"
      },
      "Equivalência da Condicional": {
        "distribuicao": "9.5%",
        "importancia": "CRÍTICO"
      },
      "Equivalência Lógica": {
        "distribuicao": "7.1%",
        "importancia": "ALTO"
      },
      "Equivalência da Bicondicional": {
        "distribuicao": "4.8%",
        "importancia": "MÉDIO"
      },
      "Negação de Condicional": {
        "distribuicao": "7.1%",
        "importancia": "ALTO"
      },
      "Negação de Conjunção": {
        "distribuicao": "4.8%",
        "importancia": "MÉDIO"
      },
      "Negação de Disjunção": {
        "distribuicao": "4.8%",
        "importancia": "MÉDIO"
      },
      "Negação de Bicondicional": {
        "distribuicao": "4.8%",
        "importancia": "MÉDIO"
      },
      "Negação de Proposições Compostas": {
        "distribuicao": "7.1%",
        "importancia": "ALTO"
      },
      "Negação de Quantificadores": {
        "distribuicao": "7.1%",
        "importancia": "ALTO"
      },
      "Condições Necessárias e Suficientes": {
        "distribuicao": "7.1%",
        "importancia": "ALTO"
      },
      "Equivalências Lógicas (De Morgan, Distributiva, Implicação)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Tautologia, Contradição e Contingência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Conceito de Proposição e Conectivos Lógicos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Negação de quantificadores combinada com conectivos compostos – Padrão FGV/FCC em provas fiscais (SEFAZ-MG 2023; SEFAZ-RJ 2025)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Argumentação Lógica": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípios Lógicos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Problemas Lógicos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Validade de Argumentos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Teoria dos Conjuntos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Verdades e Mentiras": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Dedução Lógica": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Argumentos Lógicos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Silogismo Hipotético": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Silogismos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Argumentação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lógica de Argumentação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Diagramas Lógicos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Silogismos Categóricos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "05 - Matemática Básica, Números Inteiros e Racionais": {
      "Operações com Inteiros": {
        "distribuicao": "12.0%",
        "importancia": "ALTO"
      },
      "Números Racionais": {
        "distribuicao": "12.0%",
        "importancia": "ALTO"
      },
      "Frações": {
        "distribuicao": "12.0%",
        "importancia": "ALTO"
      },
      "Operações com Decimais": {
        "distribuicao": "8.0%",
        "importancia": "MÉDIO"
      },
      "Potenciação e Radiciação": {
        "distribuicao": "8.0%",
        "importancia": "MÉDIO"
      },
      "Expressões numéricas": {
        "distribuicao": "12.0%",
        "importancia": "ALTO"
      },
      "Divisibilidade": {
        "distribuicao": "12.0%",
        "importancia": "ALTO"
      },
      "Mínimo Múltiplo Comum (MMC)": {
        "distribuicao": "12.0%",
        "importancia": "ALTO"
      },
      "Máximo Divisor Comum (MDC)": {
        "distribuicao": "12.0%",
        "importancia": "ALTO"
      },
      "Problemas Aritméticos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Cálculo de inconsistências fiscais via MDC/MMC – Situações-problema contextualizadas (perfil FGV em provas fiscais recentes)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sequências Numéricas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Frações e Porcentagem": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sequências Cíclicas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Cálculo Reverso de Porcentagem": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Aumentos e Descontos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Proporcionalidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Razão e Proporção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Porcentagem": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Unidades de Medida": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Variação Percentual e Lucro": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Médias Aritméticas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Análise Combinatória": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Escalas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Equações de 1º Grau": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Calendários e Ciclos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Raciocínio Temporal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Ordenação Lógica": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Aumentos e Descontos Sucessivos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Casa dos Pombos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Divisão Proporcional": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Álgebra": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Cálculo de Porcentagem": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sistemas Lineares": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Comercial": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Regra de Três Simples": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "06 - Problemas Aritméticos e Equações": {
      "Problemas Aritméticos": {
        "distribuicao": "30.0%",
        "importancia": "ALTO"
      },
      "Equações de 1º Grau": {
        "distribuicao": "30.0%",
        "importancia": "ALTO"
      },
      "Problemas de Idade": {
        "distribuicao": "20.0%",
        "importancia": "MÉDIO"
      },
      "Problemas de Percurso": {
        "distribuicao": "10.0%",
        "importancia": "BAIXO"
      },
      "Problemas de Intervalos": {
        "distribuicao": "10.0%",
        "importancia": "BAIXO"
      },
      "Equações de 2º Grau": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Modelagem algébrica de infrações tributárias – Questões contextuais SEFAZ (perfil FGV/FCC em provas fiscais recentes)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Razão e Proporção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Proporção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Problemas Lógicos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Conjuntos e Frações": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Frações": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Porcentagem": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Médias Aritméticas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Raciocínio Temporal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Contagem": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Progressões": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Problemas com Conjuntos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Divisão Proporcional": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Problemas com Porcentagem": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Números Inteiros": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Divisibilidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sistemas Lineares": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "07 - Números e Grandezas Proporcionais": {
      "Razão e Proporção": {
        "distribuicao": "21.1%",
        "importancia": "CRÍTICO"
      },
      "Grandezas Proporcionais": {
        "distribuicao": "10.5%",
        "importancia": "MÉDIO"
      },
      "Divisão Proporcional": {
        "distribuicao": "15.8%",
        "importancia": "ALTO"
      },
      "Divisão Proporcional Inversa": {
        "distribuicao": "10.5%",
        "importancia": "MÉDIO"
      },
      "Divisão Proporcional Composta": {
        "distribuicao": "10.5%",
        "importancia": "MÉDIO"
      },
      "Regra de Três Simples": {
        "distribuicao": "15.8%",
        "importancia": "ALTO"
      },
      "Regra de Três Composta": {
        "distribuicao": "15.8%",
        "importancia": "ALTO"
      },
      "🆕 Rateio de despesas e multas em divisão proporcional composta – Aplicação fiscal (perfil FGV/FCC em provas SEFAZ recentes)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Raciocínio Temporal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Cálculo Reverso de Porcentagem": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Aumentos e Descontos Sucessivos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Números Racionais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Problemas Aritméticos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Frações": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Porcentagem": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Unidades de Medida": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Misturas e Concentração": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lucro e Variação de Custo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Problemas de Percurso": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Escalas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "08 - Porcentagem e Cálculo com Porcentagem": {
      "Porcentagem": {
        "distribuicao": "23.6%",
        "importancia": "CRÍTICO"
      },
      "Aumentos e Descontos": {
        "distribuicao": "23.5%",
        "importancia": "CRÍTICO"
      },
      "Aumentos e Descontos Sucessivos": {
        "distribuicao": "17.6%",
        "importancia": "ALTO"
      },
      "Cálculo Reverso de Porcentagem": {
        "distribuicao": "17.6%",
        "importancia": "ALTO"
      },
      "Variação Percentual e Lucro": {
        "distribuicao": "11.8%",
        "importancia": "MÉDIO"
      },
      "Gráficos de Setores e Porcentagem": {
        "distribuicao": "5.9%",
        "importancia": "BAIXO"
      },
      "Aplicações Tributárias (Alíquotas, Impostos, Base de Cálculo)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Matemática Financeira Básica (Juros Simples e Compostos)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Resolução de problemas envolvendo alíquotas e base de cálculo – Padrão FGV em provas SEFAZ (SEFAZ-SP 2026; SEFAZ-RJ 2025)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Variação de Base Salarial": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Demografia e Porcentagem": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Razão e Proporção Percentual": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Problemas Aritméticos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Razão e Proporção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Probabilidade Simples": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Frações": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Conceitos Básicos e Variação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Operações com Decimais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Probabilidade e Porcentagem": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Porcentagem e Intervalos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Equações de 1º Grau": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Porcentagem e Conjuntos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Geometria e Porcentagem": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Probabilidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Eleições e Porcentagem": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Álgebra": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sistemas e Porcentagem": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Produtividade e Porcentagem": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Geometria": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Cálculo com Fórmulas e Porcentagem": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Misturas e Concentração": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Teoria dos Conjuntos e Porcentagem": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Matemática Financeira": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "13 - Noções de Estatística": {
      "Média aritmética simples e ponderada": {
        "distribuicao": "20.0%",
        "importancia": "CRÍTICO"
      },
      "Moda e mediana": {
        "distribuicao": "20.0%",
        "importancia": "CRÍTICO"
      },
      "Amplitude e desvio médio": {
        "distribuicao": "15.0%",
        "importancia": "ALTO"
      },
      "Variância e desvio padrão": {
        "distribuicao": "15.0%",
        "importancia": "ALTO"
      },
      "Leitura de gráficos: histograma, setores e infográficos": {
        "distribuicao": "15.0%",
        "importancia": "ALTO"
      },
      "Leitura e interpretação de tabelas": {
        "distribuicao": "15.0%",
        "importancia": "ALTO"
      },
      "Medidas de tendência central (moda, mediana, média simples e ponderada)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Medidas de dispersão (desvio médio, amplitude, variância e desvio padrão)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Leitura e interpretação de gráficos (histogramas, setores, infográficos) e tabelas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "01 - Operações com Conjuntos": {
      "Problemas com Dois Conjuntos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Problemas com Três Conjuntos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Operações com Conjuntos (União, Interseção, Diferença, Complementar)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Diagramas de Venn": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Conjuntos aplicados à probabilidade condicional – Perfil FGV/CEBRASPE em provas fiscais recentes (SEFAZ-MG 2023; SEFAZ-RJ 2025)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Teoria dos Conjuntos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Porcentagem e Conjuntos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Probabilidade e Conjuntos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Interseção de Conjuntos Numéricos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Diferença Simétrica": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "União de Conjuntos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Conjunto Complementar": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Diferença de Conjuntos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Teoria dos Conjuntos e Porcentagem": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Subconjuntos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Problemas com Conjuntos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "09 - Princípios de Contagem e Análise Combinatória": {
      "Combinações Simples e com Restrição": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio Fundamental da Contagem": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Arranjos Simples": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Permutações Simples e com Repetição": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Permutações com Restrição e Circulares": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Contagem em cenários de fiscalização e auditoria – Questões contextualizadas (perfil FGV em provas SEFAZ recentes)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Combinações": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Permutações com Repetição": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Permutações Circulares": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Arranjos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Contagem": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Problemas com Dois Conjuntos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Permutações Simples": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Casa dos Pombos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Associações Lógicas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Permutações": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Análise Combinatória": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Combinações com Restrição": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Aritmética": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Permutações com Restrição": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Combinações Simples": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "10 - Noções de probabilidade": {
      "Probabilidade Simples e do Complementar": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Probabilidade Condicional": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Probabilidade de Eventos Independentes e Sucessivos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Probabilidade e Análise Combinatória Aplicada": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Probabilidade Total e Teorema de Bayes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Distribuição de probabilidade aplicada à amostragem de notas fiscais – Perfil FGV/FCC em provas SEFAZ recentes (SEFAZ-SP 2026)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Probabilidade Simples": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Probabilidade de Eventos Independentes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Probabilidade e Conjuntos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Probabilidade da União": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Probabilidade Total": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Probabilidade em Anagramas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Análise Combinatória e Probabilidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Probabilidade Sem Reposição": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Probabilidade da União de Eventos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Probabilidade de Eventos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio Fundamental da Contagem": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Probabilidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Probabilidade Binomial": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Probabilidade Condicional e Eventos Sucessivos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Distribuições": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Probabilidade do Complementar": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Probabilidade e Combinação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "11 - Noções de Geometria": {
      "Geometria Espacial – Volumes (Prismas, Cubos, Cilindros, Pirâmides)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Geometria Plana – Triângulos e Teorema de Pitágoras": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Unidades de Medida e Conversões": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Geometria Analítica Básica": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Otimização de áreas e volumes em logística fiscal – Questões contextualizadas (perfil FGV em provas SEFAZ recentes)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Geometria Plana - Áreas e Perímetros": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Geometria Espacial - Volume de Prismas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Geometria Plana - Triângulos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Geometria Espacial - Cubos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Geometria Espacial - Cilindros": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Geometria Espacial": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Geometria Plana": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Geometria Plana - Trapézios": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Geometria e Porcentagem": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Geometria Plana - Polígonos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Geometria Espacial - Pirâmides": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Unidades de Medida": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Geometria Plana - Círculos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Geometria Plana - Teorema de Pitágoras": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Geometria Analítica": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Geometria Plana - Triângulos Isósceles": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "12 - Matrizes e Sistemas Lineares": {
      "Sistemas Lineares Homogêneos e Discussão por Determinantes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Aplicações de Matrizes (Regra de Cramer, Escalonamento)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Modelagem de sistemas lineares em auditoria contábil e cruzamento de dados fiscais – Perfil FGV em provas SEFAZ recentes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Matrizes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Razão e Proporção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Operações com Matrizes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sistemas Lineares": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Determinantes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    }
  },
  "Noções de Legislação": {
    "01 - Código de Ética do TRT-8 (Res. TRT8 88/2012)": {
      "Princípios e valores éticos do servidor": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Deveres e vedações": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Comissão de Ética: composição e atribuições": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Apuração de condutas e medidas aplicáveis": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "02 - Regimento Interno do TRT-8 (atualizado em 22/06/2026)": {
      "Órgãos do Tribunal (Pleno, Seções, Turmas, Presidência, Vice-Presidência e Corregedoria)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Competências do Tribunal Pleno e da Presidência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Composição e funcionamento das Turmas e Seções Especializadas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sessões e disposições gerais de julgamento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "03 - Política de Prevenção e Enfrentamento da Violência, do Assédio e da Discriminação (Res. CNJ 351/2020)": {
      "Conceitos: assédio moral, assédio sexual e discriminação": {
        "distribuicao": "30.7%",
        "importancia": "CRÍTICO"
      },
      "Princípios, diretrizes e objetivos da política": {
        "distribuicao": "23.1%",
        "importancia": "ALTO"
      },
      "Recebimento e apuração de denúncias": {
        "distribuicao": "23.1%",
        "importancia": "ALTO"
      },
      "Res. CNJ 351/2020": {
        "distribuicao": "23.1%",
        "importancia": "ALTO"
      }
    },
    "04 - Perspectiva de Gênero e Equidade (Res. CNJ 492/2023)": {
      "Perspectiva de gênero no Poder Judiciário (Res. CNJ 492/2023)": {
        "distribuicao": "100.0%",
        "importancia": "ALTO"
      },
      "Comitê de Incentivo à Participação Institucional Feminina": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Programa de Equidade de Raça, Gênero e Diversidade na Justiça do Trabalho (Res. CSJT 368/2023)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "05 - Tribunal Penal Internacional (Estatuto de Roma e Decreto 4.388/2002)": {
      "Criação, natureza e complementaridade (arts. 1º a 4º)": {
        "distribuicao": "14.3%",
        "importancia": "MÉDIO"
      },
      "Crimes de competência do TPI: genocídio, contra a humanidade, de guerra e agressão (arts. 5º a 8º bis)": {
        "distribuicao": "28.6%",
        "importancia": "CRÍTICO"
      },
      "Jurisdição, admissibilidade e exercício da competência (arts. 11 a 21)": {
        "distribuicao": "21.4%",
        "importancia": "ALTO"
      },
      "Princípios gerais de direito penal (arts. 22 a 33)": {
        "distribuicao": "21.4%",
        "importancia": "ALTO"
      },
      "Organização, processo, penas e cooperação (Partes 4 a 13)": {
        "distribuicao": "14.3%",
        "importancia": "MÉDIO"
      }
    },
    "06 - Carta das Nações Unidas e Estatuto da Corte Internacional de Justiça (Decreto 19.841/1945)": {
      "Propósitos e princípios (arts. 1º e 2º)": {
        "distribuicao": "27.2%",
        "importancia": "ALTO"
      },
      "Assembleia Geral e Conselho de Segurança (arts. 9º a 32)": {
        "distribuicao": "27.3%",
        "importancia": "ALTO"
      },
      "Solução pacífica de controvérsias e ação em caso de ameaça à paz (arts. 33 a 51)": {
        "distribuicao": "27.3%",
        "importancia": "ALTO"
      },
      "Corte Internacional de Justiça e Estatuto da CIJ (arts. 92 a 96; art. 38 do Estatuto)": {
        "distribuicao": "18.2%",
        "importancia": "MÉDIO"
      }
    }
  },
  "Noções de Sustentabilidade": {
    "02 - Política de Sustentabilidade do Poder Judiciário": {
      "Objetivos e diretrizes da Res. 400/2021": {
        "distribuicao": "36.3%",
        "importancia": "CRÍTICO"
      },
      "Unidades socioambientais (composição e atribuições)": {
        "distribuicao": "27.3%",
        "importancia": "ALTO"
      },
      "Plano de Logística Sustentável (PLS)": {
        "distribuicao": "36.4%",
        "importancia": "CRÍTICO"
      }
    },
    "01 - Meio ambiente na Constituição": {
      "Direito ao meio ambiente ecologicamente equilibrado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Deveres do Poder Público e práticas cruéis": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Responsabilidade tríplice e patrimônio nacional": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "03 - Política Nacional sobre Mudança do Clima": {
      "Princípios e objetivos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Diretrizes e Instrumentos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Metas de redução de emissões": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "04 - Política Nacional de Resíduos Sólidos": {
      "Princípios, objetivos e instrumentos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Ordem de prioridade na gestão de resíduos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Responsabilidade compartilhada e logística reversa": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    }
  },
  "Direitos Humanos": {
    "01 - Teoria geral dos direitos humanos": {
      "Conceito e características (universalidade, etc)": {
        "distribuicao": "23.6%",
        "importancia": "CRÍTICO"
      },
      "Evolução e dimensões (gerações)": {
        "distribuicao": "17.6%",
        "importancia": "ALTO"
      },
      "Fundamentos filosóficos dos direitos humanos": {
        "distribuicao": "11.8%",
        "importancia": "MÉDIO"
      },
      "Fontes, classificação, princípios e características": {
        "distribuicao": "17.6%",
        "importancia": "ALTO"
      },
      "Interpretação dos tratados de direitos humanos": {
        "distribuicao": "11.8%",
        "importancia": "MÉDIO"
      },
      "Colisão entre direitos humanos e teorias de solução": {
        "distribuicao": "17.6%",
        "importancia": "ALTO"
      }
    },
    "03 - Declaração Universal dos Direitos Humanos": {
      "Preâmbulo, igualdade e não discriminação (arts. 1º e 2º)": {
        "distribuicao": "16.7%",
        "importancia": "MÉDIO"
      },
      "Direitos fundamentais, liberdade e proteção contra tortura": {
        "distribuicao": "33.3%",
        "importancia": "CRÍTICO"
      },
      "Garantias penais e direitos sociais": {
        "distribuicao": "25.0%",
        "importancia": "ALTO"
      },
      "Liberdade de pensamento, religião, expressão e direitos políticos (arts. 18 a 21)": {
        "distribuicao": "16.7%",
        "importancia": "MÉDIO"
      },
      "Deveres da pessoa e limites ao exercício dos direitos (arts. 28 a 30)": {
        "distribuicao": "8.3%",
        "importancia": "BAIXO"
      }
    },
    "05 - Direitos Humanos na Constituição Federal": {
      "Art. 5º, §§ 2º a 4º: tratados e status normativo": {
        "distribuicao": "57.1%",
        "importancia": "CRÍTICO"
      },
      "Controle de convencionalidade (difuso e concentrado)": {
        "distribuicao": "42.9%",
        "importancia": "ALTO"
      },
      "Princípios fundamentais e relações internacionais (arts. 1º e 4º)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "06 - Pacto Internacional sobre Direitos Econômicos, Sociais e Culturais (PIDESC)": {
      "Direitos econômicos, sociais e culturais garantidos": {
        "distribuicao": "44.5%",
        "importancia": "CRÍTICO"
      },
      "Realização progressiva e mecanismos de monitoramento": {
        "distribuicao": "33.3%",
        "importancia": "ALTO"
      },
      "Protocolos facultativos ao PIDESC": {
        "distribuicao": "22.2%",
        "importancia": "MÉDIO"
      }
    },
    "08 - Pacto Internacional sobre Direitos Civis e Políticos (PIDCP)": {
      "Direitos civis e políticos garantidos": {
        "distribuicao": "50.0%",
        "importancia": "CRÍTICO"
      },
      "Comitê de Direitos Humanos e mecanismos de monitoramento": {
        "distribuicao": "25.0%",
        "importancia": "MÉDIO"
      },
      "Protocolos facultativos ao PIDCP": {
        "distribuicao": "25.0%",
        "importancia": "MÉDIO"
      }
    },
    "09 - Pessoas com deficiência (Res. CSJT 386/2024, art. 6º)": {
      "Lei Brasileira de Inclusão (Lei 13.146/2015): conceito e avaliação biopsicossocial": {
        "distribuicao": "18.4%",
        "importancia": "CRÍTICO"
      },
      "Lei Brasileira de Inclusão: direitos fundamentais, acessibilidade e discriminação": {
        "distribuicao": "13.6%",
        "importancia": "ALTO"
      },
      "Cão-guia (Lei 11.126/2005)": {
        "distribuicao": "9.1%",
        "importancia": "MÉDIO"
      },
      "Símbolo de identificação da pessoa com deficiência auditiva (Lei 8.160/1991)": {
        "distribuicao": "4.5%",
        "importancia": "BAIXO"
      },
      "Apoio e integração social (Lei 7.853/1989 e Decreto 3.298/1999)": {
        "distribuicao": "13.6%",
        "importancia": "ALTO"
      },
      "Acessibilidade e atendimento prioritário (Decreto 5.296/2004)": {
        "distribuicao": "13.6%",
        "importancia": "ALTO"
      },
      "Direitos e garantias constitucionais da pessoa com deficiência": {
        "distribuicao": "13.6%",
        "importancia": "ALTO"
      },
      "Acessibilidade e prioridade de atendimento (Leis 10.098/2000 e 10.048/2000)": {
        "distribuicao": "13.6%",
        "importancia": "ALTO"
      }
    },
    "02 - Sistemas de proteção": {
      "Sistema global (ONU) x Sistema interamericano (OEA)": {
        "distribuicao": "100.0%",
        "importancia": "MÉDIO"
      }
    },
    "04 - Convenção Americana sobre Direitos Humanos": {
      "Pacto de São José: Direitos materiais garantidos": {
        "distribuicao": "33.4%",
        "importancia": "MÉDIO"
      },
      "Suspensão de garantias e Status dos tratados": {
        "distribuicao": "33.3%",
        "importancia": "MÉDIO"
      },
      "Comissão e Corte Interamericanas": {
        "distribuicao": "33.3%",
        "importancia": "MÉDIO"
      }
    },
    "07 - Regras de Mandela (Regras Mínimas da ONU para o Tratamento de Presos)": {
      "Regras gerais e princípios (dignidade e não discriminação)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Categorias de presos, disciplina, sanções e restrições": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Cuidados de saúde, revistas e inspeção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    }
  },
  "Informática": {
    "01 - Redes de computadores, Internet e Intranet": {
      "Conceitos de redes e topologias": {
        "distribuicao": "21.9%",
        "importancia": "ALTO"
      },
      "Protocolos de rede (TCP/IP, HTTP, DNS, FTP, e-mail)": {
        "distribuicao": "21.8%",
        "importancia": "ALTO"
      },
      "Internet, Intranet e Extranet": {
        "distribuicao": "29.0%",
        "importancia": "CRÍTICO"
      },
      "Equipamentos e meios de transmissão": {
        "distribuicao": "7.3%",
        "importancia": "BAIXO"
      },
      "Internet das Coisas (IoT)": {
        "distribuicao": "20.0%",
        "importancia": "MÉDIO"
      }
    },
    "02 - Navegadores web, correio eletrônico e mídias sociais": {
      "Navegadores web (Edge, Chrome, Firefox, Safari)": {
        "distribuicao": "26.7%",
        "importancia": "CRÍTICO"
      },
      "Mecanismos de busca na internet (Google e Bing)": {
        "distribuicao": "13.3%",
        "importancia": "MÉDIO"
      },
      "Gmail (Google Workspace): configurações rápidas, painel de visualização e marcadores": {
        "distribuicao": "20.0%",
        "importancia": "ALTO"
      },
      "Correio eletrônico (Microsoft Outlook)": {
        "distribuicao": "20.0%",
        "importancia": "MÉDIO"
      },
      "Ferramentas de mídias sociais (LinkedIn, Facebook, X, Instagram, WhatsApp)": {
        "distribuicao": "20.0%",
        "importancia": "MÉDIO"
      }
    },
    "06 - Sistemas operacionais (Windows 10/11 e mobile)": {
      "Windows: área de trabalho, Explorador de Arquivos e Configurações": {
        "distribuicao": "30.0%",
        "importancia": "CRÍTICO"
      },
      "Windows: atalhos e gerenciamento de arquivos e pastas": {
        "distribuicao": "22.5%",
        "importancia": "ALTO"
      },
      "Organização de arquivos, pastas e programas": {
        "distribuicao": "22.5%",
        "importancia": "ALTO"
      },
      "Sistemas operacionais mobile (iOS e Android)": {
        "distribuicao": "25.0%",
        "importancia": "MÉDIO"
      }
    },
    "08 - Segurança da informação": {
      "Conceitos básicos (confidencialidade, integridade, disponibilidade, autenticidade)": {
        "distribuicao": "16.7%",
        "importancia": "ALTO"
      },
      "Vírus, worms e outras pragas virtuais": {
        "distribuicao": "22.1%",
        "importancia": "CRÍTICO"
      },
      "Antivírus, firewall e antispyware": {
        "distribuicao": "16.7%",
        "importancia": "ALTO"
      },
      "Autenticação de dois fatores e gestão de senhas": {
        "distribuicao": "16.7%",
        "importancia": "ALTO"
      },
      "Segurança em redes (firewall, VPN, criptografia)": {
        "distribuicao": "11.1%",
        "importancia": "MÉDIO"
      },
      "Riscos, incidentes e problemas": {
        "distribuicao": "5.6%",
        "importancia": "BAIXO"
      },
      "Backup (tipos e estratégias)": {
        "distribuicao": "11.1%",
        "importancia": "MÉDIO"
      },
      "Monitoramento de tráfego de rede": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "10 - Google Workspace: Agenda, Tarefas e Meet": {
      "Google Agenda: eventos, convidados, horários, anexos e videoconferência": {
        "distribuicao": "44.5%",
        "importancia": "CRÍTICO"
      },
      "Google Tarefas": {
        "distribuicao": "22.2%",
        "importancia": "MÉDIO"
      },
      "Google Meet": {
        "distribuicao": "33.3%",
        "importancia": "ALTO"
      }
    },
    "11 - Google Drive e Documentos Google": {
      "Google Drive: criar, editar e compartilhar arquivos; permissões": {
        "distribuicao": "44.5%",
        "importancia": "CRÍTICO"
      },
      "Documentos Google (editor de texto)": {
        "distribuicao": "33.3%",
        "importancia": "ALTO"
      },
      "Planilhas e Apresentações Google": {
        "distribuicao": "22.2%",
        "importancia": "MÉDIO"
      }
    },
    "03 - Editor de textos (Microsoft Word)": {
      "Formatação e estilos": {
        "distribuicao": "33.4%",
        "importancia": "MÉDIO"
      },
      "Revisão, tabelas e sumário": {
        "distribuicao": "33.3%",
        "importancia": "MÉDIO"
      },
      "Atalhos e configuração de página": {
        "distribuicao": "33.3%",
        "importancia": "MÉDIO"
      }
    },
    "04 - Planilhas eletrônicas (Microsoft Excel)": {
      "Fórmulas e funções": {
        "distribuicao": "33.4%",
        "importancia": "MÉDIO"
      },
      "Referências, formatação e gráficos": {
        "distribuicao": "33.3%",
        "importancia": "MÉDIO"
      },
      "Tabelas dinâmicas, filtros e classificação": {
        "distribuicao": "33.3%",
        "importancia": "MÉDIO"
      }
    },
    "05 - Apresentações (Microsoft PowerPoint)": {
      "Slides, slide mestre e transições": {
        "distribuicao": "50.0%",
        "importancia": "MÉDIO"
      },
      "Recursos de apresentação e formatos de arquivo": {
        "distribuicao": "50.0%",
        "importancia": "MÉDIO"
      }
    },
    "07 - Hardware e software": {
      "Hardware (processador, memórias, armazenamento e periféricos)": {
        "distribuicao": "50.0%",
        "importancia": "MÉDIO"
      },
      "Software (básico, aplicativos e licenças)": {
        "distribuicao": "50.0%",
        "importancia": "MÉDIO"
      }
    },
    "09 - Gestão de documentos eletrônicos": {
      "Conceitos e sistemas de gestão de documentos eletrônicos": {
        "distribuicao": "100.0%",
        "importancia": "MÉDIO"
      }
    }
  },
  "Direito Constitucional": {
    "01 - Nacionalidade": {
      "Tipos": {
        "distribuicao": "30.0%",
        "importancia": "ALTO"
      },
      "Cidadania": {
        "distribuicao": "20.0%",
        "importancia": "MÉDIO"
      },
      "Extradição": {
        "distribuicao": "20.0%",
        "importancia": "MÉDIO"
      },
      "🆕 EC 131/2023 – Novas regras sobre a perda da nacionalidade brasileira (2023)": {
        "distribuicao": "20.0%",
        "importancia": "MÉDIO"
      },
      "Símbolos": {
        "distribuicao": "10.0%",
        "importancia": "BAIXO"
      },
      "Direitos Fundamentais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Direitos Políticos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "02 - Direitos Políticos": {
      "Direitos Políticos": {
        "distribuicao": "10.4%",
        "importancia": "ALTO"
      },
      "Partidos Políticos": {
        "distribuicao": "10.3%",
        "importancia": "ALTO"
      },
      "Cidadania": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      },
      "Democracia": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      },
      "Restrições": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      },
      "Sufrágio": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      },
      "Mandato Eletivo": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      },
      "Ações Judiciais": {
        "distribuicao": "3.4%",
        "importancia": "BAIXO"
      },
      "Tribunais de Contas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Direitos Fundamentais": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      },
      "Remédios Constitucionais": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      },
      "Ação Popular": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      },
      "Direitos Sociais": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      },
      "Direitos Trabalhistas": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      },
      "🆕 STF Tema 1199 – Retroatividade da lei de improbidade e direitos políticos (2022)": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      }
    },
    "03 - Direitos e Garantias Fundamentais (Teoria Geral)": {
      "Teoria Geral": {
        "distribuicao": "8.8%",
        "importancia": "ALTO"
      },
      "Tratados Internacionais": {
        "distribuicao": "9.4%",
        "importancia": "ALTO"
      },
      "Aplicabilidade": {
        "distribuicao": "9.4%",
        "importancia": "ALTO"
      },
      "Colisão Direitos": {
        "distribuicao": "6.3%",
        "importancia": "MÉDIO"
      },
      "Direitos Fundamentais": {
        "distribuicao": "6.3%",
        "importancia": "MÉDIO"
      },
      "Garantias Fundamentais": {
        "distribuicao": "6.3%",
        "importancia": "MÉDIO"
      },
      "Cláusulas Pétreas": {
        "distribuicao": "6.3%",
        "importancia": "MÉDIO"
      },
      "Dignidade Humana": {
        "distribuicao": "6.3%",
        "importancia": "MÉDIO"
      },
      "Eficácia": {
        "distribuicao": "6.3%",
        "importancia": "MÉDIO"
      },
      "Restrições": {
        "distribuicao": "3.1%",
        "importancia": "BAIXO"
      },
      "Direitos Políticos": {
        "distribuicao": "6.3%",
        "importancia": "MÉDIO"
      },
      "Efetividade Direitos": {
        "distribuicao": "6.3%",
        "importancia": "MÉDIO"
      },
      "Povos Indígenas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Inviolabilidades": {
        "distribuicao": "6.3%",
        "importancia": "MÉDIO"
      },
      "Judicialização": {
        "distribuicao": "6.3%",
        "importancia": "MÉDIO"
      },
      "🆕 STF Tema 1046 – Validade de norma coletiva que limita direito trabalhista (2022)": {
        "distribuicao": "6.3%",
        "importancia": "MÉDIO"
      }
    },
    "04 - Direitos e garantias fundamentais (Direitos em espécie - introdução)": {
      "Vida": {
        "distribuicao": "7.0%",
        "importancia": "ALTO"
      },
      "Inviolabilidades": {
        "distribuicao": "6.7%",
        "importancia": "ALTO"
      },
      "Liberdades": {
        "distribuicao": "6.7%",
        "importancia": "ALTO"
      },
      "Intimidade": {
        "distribuicao": "6.7%",
        "importancia": "ALTO"
      },
      "Garantias Processuais": {
        "distribuicao": "6.7%",
        "importancia": "ALTO"
      },
      "Igualdade": {
        "distribuicao": "6.7%",
        "importancia": "ALTO"
      },
      "Propriedade": {
        "distribuicao": "6.7%",
        "importancia": "ALTO"
      },
      "Direitos Fundamentais": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "Informação": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "Teoria Geral": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "Dignidade Humana": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "Resposta": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "Petição": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "Assistência Jurídica": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "Legalidade": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "🆕 STF Tema 225 – Compartilhamento de dados fiscais/bancários com o Fisco sem autorização (2021)": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "Aplicabilidade": {
        "distribuicao": "2.2%",
        "importancia": "BAIXO"
      },
      "Disposições Gerais": {
        "distribuicao": "2.2%",
        "importancia": "BAIXO"
      },
      "Herança": {
        "distribuicao": "2.2%",
        "importancia": "BAIXO"
      },
      "Consumidor": {
        "distribuicao": "2.2%",
        "importancia": "BAIXO"
      },
      "Cidadania": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "Súmula Vinculante": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "05 - Direitos e Garantias Fundamentais (Direitos em espécie)": {
      "Propriedade": {
        "distribuicao": "6.2%",
        "importancia": "ALTO"
      },
      "Inviolabilidades": {
        "distribuicao": "5.8%",
        "importancia": "ALTO"
      },
      "Garantias Processuais": {
        "distribuicao": "5.8%",
        "importancia": "ALTO"
      },
      "Direito Penal": {
        "distribuicao": "5.8%",
        "importancia": "ALTO"
      },
      "Habeas Corpus": {
        "distribuicao": "5.8%",
        "importancia": "ALTO"
      },
      "Mandado Segurança": {
        "distribuicao": "5.8%",
        "importancia": "ALTO"
      },
      "Habeas Data": {
        "distribuicao": "5.8%",
        "importancia": "ALTO"
      },
      "🆕 STF – Limites à entrada forçada em domicílio para fins fiscais e penais (2021)": {
        "distribuicao": "5.8%",
        "importancia": "ALTO"
      },
      "Direitos Fundamentais": {
        "distribuicao": "3.8%",
        "importancia": "MÉDIO"
      },
      "Segurança Jurídica": {
        "distribuicao": "3.8%",
        "importancia": "MÉDIO"
      },
      "Liberdade": {
        "distribuicao": "3.8%",
        "importancia": "MÉDIO"
      },
      "Extradição": {
        "distribuicao": "3.8%",
        "importancia": "MÉDIO"
      },
      "Petição": {
        "distribuicao": "3.8%",
        "importancia": "MÉDIO"
      },
      "Ação Popular": {
        "distribuicao": "3.8%",
        "importancia": "MÉDIO"
      },
      "Injunção": {
        "distribuicao": "3.8%",
        "importancia": "MÉDIO"
      },
      "Igualdade": {
        "distribuicao": "3.8%",
        "importancia": "MÉDIO"
      },
      "Informação": {
        "distribuicao": "3.8%",
        "importancia": "MÉDIO"
      },
      "Assistência Jurídica": {
        "distribuicao": "3.8%",
        "importancia": "MÉDIO"
      },
      "Teoria Geral": {
        "distribuicao": "3.8%",
        "importancia": "MÉDIO"
      },
      "Remédios Constitucionais": {
        "distribuicao": "3.8%",
        "importancia": "MÉDIO"
      },
      "Gerais": {
        "distribuicao": "1.9%",
        "importancia": "BAIXO"
      },
      "Ação Pública": {
        "distribuicao": "1.9%",
        "importancia": "BAIXO"
      },
      "Herança": {
        "distribuicao": "1.9%",
        "importancia": "BAIXO"
      },
      "Cidadania": {
        "distribuicao": "1.9%",
        "importancia": "BAIXO"
      }
    },
    "06 - Remédios Constitucionais": {
      "Mandado Segurança": {
        "distribuicao": "14.2%",
        "importancia": "CRÍTICO"
      },
      "Habeas Data": {
        "distribuicao": "14.3%",
        "importancia": "CRÍTICO"
      },
      "Habeas Corpus": {
        "distribuicao": "14.3%",
        "importancia": "CRÍTICO"
      },
      "Injunção": {
        "distribuicao": "10.7%",
        "importancia": "ALTO"
      },
      "Ação Popular": {
        "distribuicao": "10.7%",
        "importancia": "ALTO"
      },
      "Remédios Constitucionais": {
        "distribuicao": "7.1%",
        "importancia": "MÉDIO"
      },
      "Petição": {
        "distribuicao": "7.1%",
        "importancia": "MÉDIO"
      },
      "Direitos Fundamentais": {
        "distribuicao": "3.6%",
        "importancia": "BAIXO"
      },
      "Garantias Processuais": {
        "distribuicao": "3.6%",
        "importancia": "BAIXO"
      },
      "Disposições Gerais": {
        "distribuicao": "3.6%",
        "importancia": "BAIXO"
      },
      "Ação Pública": {
        "distribuicao": "3.6%",
        "importancia": "BAIXO"
      },
      "Informação": {
        "distribuicao": "3.6%",
        "importancia": "BAIXO"
      },
      "Igualdade": {
        "distribuicao": "3.6%",
        "importancia": "BAIXO"
      }
    },
    "07 - Direitos Sociais": {
      "Direitos Sociais": {
        "distribuicao": "9.1%",
        "importancia": "ALTO"
      },
      "Direitos Trabalhistas": {
        "distribuicao": "8.8%",
        "importancia": "ALTO"
      },
      "Greve": {
        "distribuicao": "8.8%",
        "importancia": "ALTO"
      },
      "Direitos Fundamentais": {
        "distribuicao": "5.9%",
        "importancia": "MÉDIO"
      },
      "Sindicais": {
        "distribuicao": "5.9%",
        "importancia": "MÉDIO"
      },
      "Segurança Pública": {
        "distribuicao": "5.9%",
        "importancia": "MÉDIO"
      },
      "Eficácia": {
        "distribuicao": "5.9%",
        "importancia": "MÉDIO"
      },
      "Educação": {
        "distribuicao": "5.9%",
        "importancia": "MÉDIO"
      },
      "Teoria Geral": {
        "distribuicao": "5.9%",
        "importancia": "MÉDIO"
      },
      "Moradia": {
        "distribuicao": "5.9%",
        "importancia": "MÉDIO"
      },
      "🆕 STF – Desconto de remuneração de servidor público em greve (2022)": {
        "distribuicao": "5.9%",
        "importancia": "MÉDIO"
      },
      "Grupos Vulneráveis": {
        "distribuicao": "2.9%",
        "importancia": "BAIXO"
      },
      "Lazer": {
        "distribuicao": "2.9%",
        "importancia": "BAIXO"
      },
      "Igualdade": {
        "distribuicao": "2.9%",
        "importancia": "BAIXO"
      },
      "Efetividade Direitos": {
        "distribuicao": "2.9%",
        "importancia": "BAIXO"
      },
      "Judicialização": {
        "distribuicao": "2.9%",
        "importancia": "BAIXO"
      },
      "Alimentação": {
        "distribuicao": "2.9%",
        "importancia": "BAIXO"
      },
      "Seguridade Social": {
        "distribuicao": "2.9%",
        "importancia": "BAIXO"
      },
      "Aplicabilidade": {
        "distribuicao": "2.9%",
        "importancia": "BAIXO"
      },
      "Renda Básica": {
        "distribuicao": "2.9%",
        "importancia": "BAIXO"
      },
      "Água": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Servidores Públicos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Povos Indígenas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Família": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "08 - Constituição: Conceito, Estrutura e Objeto": {
      "Interpretação": {
        "distribuicao": "10.0%",
        "importancia": "ALTO"
      },
      "Eficácia": {
        "distribuicao": "10.0%",
        "importancia": "ALTO"
      },
      "🆕 STF – Limites da interpretação conforme a Constituição pelo STF (2023)": {
        "distribuicao": "6.7%",
        "importancia": "MÉDIO"
      },
      "Vigência das normas constitucionais": {
        "distribuicao": "6.7%",
        "importancia": "MÉDIO"
      },
      "Preâmbulo": {
        "distribuicao": "8.4%",
        "importancia": "MÉDIO"
      },
      "Supremacia": {
        "distribuicao": "8.4%",
        "importancia": "MÉDIO"
      },
      "História Constitucional": {
        "distribuicao": "8.3%",
        "importancia": "MÉDIO"
      },
      "Estrutura": {
        "distribuicao": "8.3%",
        "importancia": "MÉDIO"
      },
      "Classificação": {
        "distribuicao": "8.3%",
        "importancia": "MÉDIO"
      },
      "Cláusulas Pétreas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Controle de Constitucionalidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Constitucionalismo": {
        "distribuicao": "8.3%",
        "importancia": "MÉDIO"
      },
      "Poder Constituinte": {
        "distribuicao": "8.3%",
        "importancia": "MÉDIO"
      },
      "Conceito": {
        "distribuicao": "8.3%",
        "importancia": "MÉDIO"
      },
      "Controle Concentrado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "09 - Classificações das Constituições": {
      "Classificação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Supremacia": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Preâmbulo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Poder Constituinte": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Constitucionalismo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Emendas Constitucionais": {
        "distribuicao": "100.0%",
        "importancia": "MÉDIO"
      },
      "🆕 STF – Bloco de constitucionalidade: normas de reprodução obrigatória como parâmetro de controle": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "10 - Poder Constituinte Originário": {
      "Poder Constituinte": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Tratados Internacionais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Emendas Constitucionais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 STF – Limites materiais ao poder constituinte decorrente estadual (2021)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "11 - Poderes Constituídos (derivados) / Reforma Constitucional": {
      "Reforma Constitucional": {
        "distribuicao": "50.0%",
        "importancia": "MÉDIO"
      },
      "Mutação Constitucional": {
        "distribuicao": "50.0%",
        "importancia": "MÉDIO"
      },
      "Poder Constituinte": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Tratados Internacionais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "12 - Aplicabilidade das normas constitucionais": {
      "Aplicabilidade": {
        "distribuicao": "60.0%",
        "importancia": "ALTO"
      },
      "🆕 STF – Normas de eficácia contida: restrição por lei posterior e aplicabilidade imediata": {
        "distribuicao": "40.0%",
        "importancia": "MÉDIO"
      }
    },
    "13 - Princípios Fundamentais da CF/88": {
      "Fundamentos": {
        "distribuicao": "8.6%",
        "importancia": "ALTO"
      },
      "Objetivos": {
        "distribuicao": "9.1%",
        "importancia": "ALTO"
      },
      "Princípios Gerais": {
        "distribuicao": "6.1%",
        "importancia": "MÉDIO"
      },
      "Relações Internacionais": {
        "distribuicao": "6.1%",
        "importancia": "MÉDIO"
      },
      "Formas Estado": {
        "distribuicao": "6.1%",
        "importancia": "MÉDIO"
      },
      "Forma Governo": {
        "distribuicao": "6.1%",
        "importancia": "MÉDIO"
      },
      "Relações Interpoderes": {
        "distribuicao": "6.1%",
        "importancia": "MÉDIO"
      },
      "Teoria Geral": {
        "distribuicao": "6.1%",
        "importancia": "MÉDIO"
      },
      "Separação Poderes": {
        "distribuicao": "6.1%",
        "importancia": "MÉDIO"
      },
      "Federalismo": {
        "distribuicao": "6.1%",
        "importancia": "MÉDIO"
      },
      "Soberania": {
        "distribuicao": "6.1%",
        "importancia": "MÉDIO"
      },
      "Democracia": {
        "distribuicao": "6.1%",
        "importancia": "MÉDIO"
      },
      "Cidadania": {
        "distribuicao": "6.1%",
        "importancia": "MÉDIO"
      },
      "Dignidade Humana": {
        "distribuicao": "6.1%",
        "importancia": "MÉDIO"
      },
      "🆕 STF – Competência comum e concorrente de Estados e Municípios em medidas sanitárias (federalismo cooperativo)": {
        "distribuicao": "6.1%",
        "importancia": "MÉDIO"
      },
      "Sistemas": {
        "distribuicao": "3.0%",
        "importancia": "BAIXO"
      },
      "Cláusulas Pétreas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Interpretação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Preâmbulo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Direitos Fundamentais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Colisão Direitos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "14 - Organização Político-Administrativa do Estado": {
      "Competências": {
        "distribuicao": "16.0%",
        "importancia": "CRÍTICO"
      },
      "Federalismo": {
        "distribuicao": "12.0%",
        "importancia": "ALTO"
      },
      "Municípios": {
        "distribuicao": "12.0%",
        "importancia": "ALTO"
      },
      "Estados": {
        "distribuicao": "12.0%",
        "importancia": "ALTO"
      },
      "Vedações Federativas": {
        "distribuicao": "12.0%",
        "importancia": "ALTO"
      },
      "Formas Estado": {
        "distribuicao": "8.0%",
        "importancia": "MÉDIO"
      },
      "Bens Públicos": {
        "distribuicao": "8.0%",
        "importancia": "MÉDIO"
      },
      "Organização Territorial": {
        "distribuicao": "8.0%",
        "importancia": "MÉDIO"
      },
      "Distrito Federal": {
        "distribuicao": "12.0%",
        "importancia": "ALTO"
      },
      "Intervenção Estadual": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "15 - Intervenção": {
      "Intervenção Federal": {
        "distribuicao": "50.0%",
        "importancia": "MÉDIO"
      },
      "Direitos Sociais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Poder Constituinte": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Intervenção Estadual": {
        "distribuicao": "50.0%",
        "importancia": "MÉDIO"
      }
    },
    "16 - Poder Legislativo": {
      "Estrutura": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Funcionamento": {
        "distribuicao": "20.0%",
        "importancia": "MÉDIO"
      },
      "Congressistas": {
        "distribuicao": "20.0%",
        "importancia": "MÉDIO"
      },
      "Competências": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Responsabilidade Presidencial": {
        "distribuicao": "20.0%",
        "importancia": "MÉDIO"
      },
      "Separação Poderes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Eleições": {
        "distribuicao": "20.0%",
        "importancia": "MÉDIO"
      },
      "Comissões": {
        "distribuicao": "20.0%",
        "importancia": "MÉDIO"
      },
      "Municípios": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Estados": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 STF – Limites da imunidade parlamentar material (2021)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "17 - Processo Legislativo": {
      "Processo Legislativo": {
        "distribuicao": "14.3%",
        "importancia": "MÉDIO"
      },
      "Medidas Provisórias": {
        "distribuicao": "14.3%",
        "importancia": "MÉDIO"
      },
      "Espécies Normativas": {
        "distribuicao": "14.3%",
        "importancia": "MÉDIO"
      },
      "Iniciativa": {
        "distribuicao": "14.3%",
        "importancia": "MÉDIO"
      },
      "Sanção e Veto": {
        "distribuicao": "14.3%",
        "importancia": "MÉDIO"
      },
      "Disposições Gerais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Emendas Constitucionais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Legalidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Cláusulas Pétreas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Emendas": {
        "distribuicao": "14.3%",
        "importancia": "MÉDIO"
      },
      "Comissões": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípios": {
        "distribuicao": "14.2%",
        "importancia": "MÉDIO"
      },
      "Controle de Constitucionalidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "18 - Comissões Parlamentares de Inquérito (CPI)": {
      "Comissões": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Dignidade Humana": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Poderes": {
        "distribuicao": "25.0%",
        "importancia": "MÉDIO"
      },
      "Âmbito": {
        "distribuicao": "25.0%",
        "importancia": "MÉDIO"
      },
      "Regras": {
        "distribuicao": "25.0%",
        "importancia": "MÉDIO"
      },
      "Relatório": {
        "distribuicao": "25.0%",
        "importancia": "MÉDIO"
      },
      "Conceito": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Fundamentos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 STF – Limites de CPI estadual na quebra de sigilo bancário (2022)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "19 - Fiscalização contábil, financeira e orçamentária": {
      "TCU": {
        "distribuicao": "33.4%",
        "importancia": "MÉDIO"
      },
      "Tribunais de Contas": {
        "distribuicao": "33.3%",
        "importancia": "MÉDIO"
      },
      "Controle": {
        "distribuicao": "33.3%",
        "importancia": "MÉDIO"
      },
      "🆕 STF Tema 899 – Prescritibilidade da pretensão de ressarcimento ao erário (2020)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "20 - Poder Executivo": {
      "Atribuições Presidenciais": {
        "distribuicao": "14.3%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade Presidencial": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Estados": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sucessão Presidencial": {
        "distribuicao": "14.3%",
        "importancia": "MÉDIO"
      },
      "Ministros": {
        "distribuicao": "14.3%",
        "importancia": "MÉDIO"
      },
      "Eleição Presidencial": {
        "distribuicao": "14.3%",
        "importancia": "MÉDIO"
      },
      "Tribunais Superiores": {
        "distribuicao": "14.3%",
        "importancia": "MÉDIO"
      },
      "Processo Legislativo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Forma Governo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Executivo Federalismo": {
        "distribuicao": "14.3%",
        "importancia": "MÉDIO"
      },
      "Municípios": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sanção e Veto": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Relações Interpoderes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Conselhos Nacionais": {
        "distribuicao": "14.2%",
        "importancia": "MÉDIO"
      },
      "Medidas Provisórias": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sistemas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Iniciativa": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 STF – Crime de responsabilidade e autorização para processar Governador (2021)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "21 - Poder Judiciário": {
      "Organização Judiciária": {
        "distribuicao": "16.7%",
        "importancia": "MÉDIO"
      },
      "CNJ": {
        "distribuicao": "16.7%",
        "importancia": "MÉDIO"
      },
      "Tribunais Superiores": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Tribunais de Contas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Magistratura": {
        "distribuicao": "16.7%",
        "importancia": "MÉDIO"
      },
      "Autonomia Judiciária": {
        "distribuicao": "16.7%",
        "importancia": "MÉDIO"
      },
      "Súmula Vinculante": {
        "distribuicao": "16.6%",
        "importancia": "MÉDIO"
      },
      "Justiça Federal": {
        "distribuicao": "16.6%",
        "importancia": "MÉDIO"
      },
      "Comissões": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "22 - Funções Essenciais à Justiça": {
      "Disposições Gerais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Advocacia Pública": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Defensoria Pública": {
        "distribuicao": "50.0%",
        "importancia": "MÉDIO"
      },
      "Ministério Público": {
        "distribuicao": "50.0%",
        "importancia": "MÉDIO"
      },
      "Princípios": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "23 - Defesa do Estado e das Instituições Democráticas": {
      "Segurança Pública": {
        "distribuicao": "20.0%",
        "importancia": "ALTO"
      },
      "Órgãos de Segurança": {
        "distribuicao": "20.0%",
        "importancia": "ALTO"
      },
      "Estados de Crise": {
        "distribuicao": "20.0%",
        "importancia": "MÉDIO"
      },
      "Forças Armadas": {
        "distribuicao": "20.0%",
        "importancia": "MÉDIO"
      },
      "Conselhos Nacionais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Direitos Políticos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Conselhos": {
        "distribuicao": "20.0%",
        "importancia": "MÉDIO"
      },
      "🆕 STF – Atuação das Forças Armadas na garantia da lei e da ordem (2020)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "24 - Controle de Constitucionalidade - Parte 1/2": {
      "Controle Concentrado": {
        "distribuicao": "14.9%",
        "importancia": "CRÍTICO"
      },
      "Controle de Constitucionalidade": {
        "distribuicao": "11.1%",
        "importancia": "ALTO"
      },
      "Reserva Plenário": {
        "distribuicao": "11.1%",
        "importancia": "ALTO"
      },
      "Controle Difuso": {
        "distribuicao": "11.1%",
        "importancia": "ALTO"
      },
      "Legitimidade": {
        "distribuicao": "11.1%",
        "importancia": "ALTO"
      },
      "Sistemas": {
        "distribuicao": "7.4%",
        "importancia": "MÉDIO"
      },
      "Momentos": {
        "distribuicao": "7.4%",
        "importancia": "MÉDIO"
      },
      "Competência": {
        "distribuicao": "7.4%",
        "importancia": "MÉDIO"
      },
      "Inconstitucionalidade": {
        "distribuicao": "7.4%",
        "importancia": "MÉDIO"
      },
      "Amicus Curiae": {
        "distribuicao": "7.4%",
        "importancia": "MÉDIO"
      },
      "Capacidade Postulatória": {
        "distribuicao": "3.7%",
        "importancia": "BAIXO"
      },
      "Poder Constituinte": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Controle Administrativo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "25 - Controle de Constitucionalidade - Parte 2/2": {
      "Controle Concentrado": {
        "distribuicao": "17.6%",
        "importancia": "CRÍTICO"
      },
      "Controle Difuso": {
        "distribuicao": "13.0%",
        "importancia": "ALTO"
      },
      "Efeitos": {
        "distribuicao": "13.0%",
        "importancia": "ALTO"
      },
      "Inconstitucionalidade": {
        "distribuicao": "8.7%",
        "importancia": "MÉDIO"
      },
      "Amicus Curiae": {
        "distribuicao": "8.7%",
        "importancia": "MÉDIO"
      },
      "Processo Decisório": {
        "distribuicao": "8.7%",
        "importancia": "MÉDIO"
      },
      "Controle de Constitucionalidade": {
        "distribuicao": "8.7%",
        "importancia": "MÉDIO"
      },
      "Advocacia Pública": {
        "distribuicao": "4.3%",
        "importancia": "BAIXO"
      },
      "Controle Geral": {
        "distribuicao": "4.3%",
        "importancia": "BAIXO"
      },
      "Arguição de Descumprimento de Preceito Fundamental (ADPF)": {
        "distribuicao": "13.0%",
        "importancia": "ALTO"
      },
      "Poder Constituinte": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Deficiência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "26 - Controle concentrado de constitucionalidade nos Estados": {
      "Controle de Constitucionalidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Controle Concentrado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 STF – Norma de reprodução obrigatória como parâmetro no controle estadual (2021)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "27 - Ordem Econômica": {
      "Princípios": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Intervenção Estatal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípios Gerais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Meio Ambiente": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concorrência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Consumidor": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Política Urbana": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Política Agrícola": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 STF – Livre iniciativa e intervenção estatal via tabelamento de preços (2021)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Fomento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Soberania": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Capital Estrangeiro": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "28 - Ordem Social": {
      "Meio Ambiente": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Educação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Povos Indígenas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Família": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Cultura": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Ciência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Deficiência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Grupos Vulneráveis": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 STF Tema 1031 – Marco temporal das terras indígenas e reflexos econômicos (2023)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Grupos Especiais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Povos Quilombolas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Desporto": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "29 - Federalismo Fiscal": {
      "Repartição Tributária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Funções Econômicas e Descentralização": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Descentralização": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Desequilíbrios Federativos e Transferências": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 EC 132/2023 – Impactos da Reforma Tributária na Repartição de Receitas (2023)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    }
  },
  "Direito Administrativo": {
    "23 - Lei das Estatais - Lei 13.303-2016": {
      "Empresas Públicas e Sociedades de Economia Mista": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Governança": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Matriz de Riscos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Lei 13.303/16 (Art. 17, § 2º) - STF (2023) - Validade das restrições para nomeação de diretores": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Critérios de Desempate": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "12 - Serviços Públicos, Concessão e Parceria Público-Privada": {
      "Serviço Público": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Parcerias Público-Privadas (PPP)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípios do Serviço Público": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção da Concessão": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Equilíbrio Econômico-Financeiro": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 STF (2023) - Limites e requisitos constitucionais na devolução de concessões": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Rescisão por Iniciativa da Concessionária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Licitação de Concessões": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Agências Reguladoras": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Encampação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Delegação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Bens Reversíveis": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Controle": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Terceirização": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Responsabilidade Civil": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "PPP": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Regime Jurídico Administrativo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Arbitragem em Concessões": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Intervenção na Concessão": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Organização Administrativa": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Controle Administrativo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Licitações": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Repartição de Riscos nas PPPs": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção por Advento do Termo Contratual": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Subconcessão": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Atualidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Terceiro Setor": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Publicidade e Promoção Pessoal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Marco Regulatório (Lei 13.019/14)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sociedade de Propósito Específico (SPE)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Limites das PPPs": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Responsabilidade de Concessionárias": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Direitos dos Usuários": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concessão Patrocinada": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Fundo Garantidor de PPPs (FGP)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Serviços Públicos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Permissão de Serviço Público": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Garantias nas PPPs": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "05 - Agências Executivas e Reguladoras": {
      "Agências Reguladoras": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Poder Normativo das Agências Reguladoras": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Agências Reguladoras - Quarentena": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Natureza Jurídica e Características das Agências Reguladoras": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 STF Tema 725 – Licitude da terceirização de atividade-fim e responsabilidade do tomador": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Agências Executivas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Administração Indireta": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Distinção entre Agências Executivas e Reguladoras": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Agências Executivas - Qualificação e Contrato de Gestão": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "08 - Atos Administrativos I: Conceito, Requisitos, Atributos": {
      "Conceito de Ato Administrativo": {
        "distribuicao": "2.8%",
        "importancia": "ALTO"
      },
      "Elementos do Ato Administrativo": {
        "distribuicao": "2.9%",
        "importancia": "ALTO"
      },
      "Atributos do Ato Administrativo": {
        "distribuicao": "2.9%",
        "importancia": "ALTO"
      },
      "Atributos - Presunção de Legitimidade": {
        "distribuicao": "2.9%",
        "importancia": "ALTO"
      },
      "Teoria dos Motivos Determinantes": {
        "distribuicao": "2.9%",
        "importancia": "ALTO"
      },
      "Atributos - Imperatividade": {
        "distribuicao": "2.9%",
        "importancia": "ALTO"
      },
      "Atributos - Tipicidade": {
        "distribuicao": "2.9%",
        "importancia": "ALTO"
      },
      "Vícios do Ato Administrativo": {
        "distribuicao": "2.9%",
        "importancia": "ALTO"
      },
      "Convalidação dos Atos Administrativos": {
        "distribuicao": "2.9%",
        "importancia": "ALTO"
      },
      "Elementos: Motivo vs Motivação": {
        "distribuicao": "2.9%",
        "importancia": "ALTO"
      },
      "Competência e Delegação": {
        "distribuicao": "2.9%",
        "importancia": "ALTO"
      },
      "Motivação": {
        "distribuicao": "2.9%",
        "importancia": "ALTO"
      },
      "Elementos: Competência": {
        "distribuicao": "2.9%",
        "importancia": "ALTO"
      },
      "Atos Discricionários": {
        "distribuicao": "2.9%",
        "importancia": "ALTO"
      },
      "Elementos: Objeto": {
        "distribuicao": "2.9%",
        "importancia": "ALTO"
      },
      "Elementos: Forma": {
        "distribuicao": "2.9%",
        "importancia": "ALTO"
      },
      "Elementos e Vícios do Ato Administrativo": {
        "distribuicao": "2.9%",
        "importancia": "ALTO"
      },
      "Anulação e Revogação": {
        "distribuicao": "2.9%",
        "importancia": "ALTO"
      },
      "Elementos: Finalidade": {
        "distribuicao": "2.9%",
        "importancia": "ALTO"
      },
      "Espécies de Atos Administrativos": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Atributos - Autoexecutoriedade": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Requisitos - Competência": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Requisitos - Finalidade": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Requisitos - Objeto": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Requisitos - Forma": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Poder Vinculado vs Discricionário": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Conceito - Silêncio Administrativo": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Atributos - Presunção de Veracidade": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Requisitos - Motivo": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Abuso de Poder: Desvio de Finalidade": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Atributos: Veracidade vs Legitimidade": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Atos Administrativos": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Abuso de Poder: Excesso de Poder": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Classificação dos Atos Administrativos": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Controle Judicial": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Atributos: Exigibilidade": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Atos Vinculados": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Abuso de Poder": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "🆕 STF (2023) - Limites do controle jurisdicional de atos discricionários em concursos": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Atributos do Poder de Polícia": {
        "distribuicao": "1.0%",
        "importancia": "BAIXO"
      },
      "Poder Hierárquico - Avocação": {
        "distribuicao": "1.0%",
        "importancia": "BAIXO"
      },
      "Conceito - Fato Administrativo": {
        "distribuicao": "1.0%",
        "importancia": "BAIXO"
      },
      "Conceito - Atos da Administração": {
        "distribuicao": "1.0%",
        "importancia": "BAIXO"
      },
      "Elementos: Avocação": {
        "distribuicao": "1.0%",
        "importancia": "BAIXO"
      },
      "Agente de Fato": {
        "distribuicao": "1.0%",
        "importancia": "BAIXO"
      },
      "Processo Administrativo": {
        "distribuicao": "1.0%",
        "importancia": "BAIXO"
      },
      "Controle Administrativo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "14 - Intervenção do Estado na Propriedade Privada": {
      "Desapropriação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Servidão Administrativa": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Limitação Administrativa": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Requisição Administrativa": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Tombamento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 STJ (2022) - Percentual e incidência de juros compensatórios em desapropriação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Desapropriação Sanção Urbana": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Desapropriação Indireta": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Desapropriação - Tredestinação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Ocupação Temporária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Desapropriação por Interesse Social": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Direito de Extensão": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Competência na Desapropriação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Desapropriação Confiscatória": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Intervenção Estatal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "22 - Lei Anticorrupção - Lei 12.846/2013": {
      "Responsabilidade Objetiva e Individual": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sanções Administrativas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Responsabilidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Processo Administrativo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Desconsideração": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sanções": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Atos Lesivos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Disposições Gerais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Acordo de Leniência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sucessão Empresarial": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Leniência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Dosimetria das Sanções": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Decreto 11.129/2022 - Novas balizas para programas de integridade e dosimetria na leniência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "01 - Administração Pública (CF, art. 37 a 41)": {
      "Concurso Público": {
        "distribuicao": "4.4%",
        "importancia": "ALTO"
      },
      "Funções de Confiança e Cargos em Comissão": {
        "distribuicao": "4.0%",
        "importancia": "ALTO"
      },
      "Contratação Temporária": {
        "distribuicao": "4.0%",
        "importancia": "ALTO"
      },
      "Acumulação de Cargos": {
        "distribuicao": "4.0%",
        "importancia": "ALTO"
      },
      "Remuneração e Subsídio": {
        "distribuicao": "4.0%",
        "importancia": "ALTO"
      },
      "Teto Remuneratório Geral": {
        "distribuicao": "4.0%",
        "importancia": "ALTO"
      },
      "Princípios da Administração Pública": {
        "distribuicao": "4.0%",
        "importancia": "ALTO"
      },
      "Validade do Concurso Público": {
        "distribuicao": "2.7%",
        "importancia": "MÉDIO"
      },
      "Reserva de Vagas para PCD": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Publicidade e Promoção Pessoal": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Revisão Geral Anual": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Acesso a Cargos Públicos": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Vedação de Vinculação": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Acumulação de Proventos e Vencimentos": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "🆕 STF Tema 1224 (2023) - Permissão de acumulação e teto remuneratório isolado para profissionais da saúde": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "🆕 STF (2023) - Permissão de acumulação e teto remuneratório isolado para profissionais da saúde": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Cargos e Funções": {
        "distribuicao": "1.3%",
        "importancia": "BAIXO"
      },
      "Direito de Greve e Associação Sindical": {
        "distribuicao": "1.3%",
        "importancia": "BAIXO"
      },
      "Criação de Entidades": {
        "distribuicao": "1.3%",
        "importancia": "BAIXO"
      },
      "Vencimentos dos Poderes": {
        "distribuicao": "1.3%",
        "importancia": "BAIXO"
      },
      "Subsidiárias e Participação em Empresas": {
        "distribuicao": "1.3%",
        "importancia": "BAIXO"
      },
      "Fixação de Vencimentos": {
        "distribuicao": "1.3%",
        "importancia": "BAIXO"
      },
      "Acumulação de Cargos - Professor": {
        "distribuicao": "1.3%",
        "importancia": "BAIXO"
      },
      "Provimento": {
        "distribuicao": "1.3%",
        "importancia": "BAIXO"
      },
      "Conceito de Agente Público": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Agentes Públicos": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Regime de Pessoal nas Estatais": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Estabilidade": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Servidor em Mandato Eletivo": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Perda do Cargo do Servidor Estável": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Estágio Probatório": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Disponibilidade e Aproveitamento": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Sanções de Improbidade": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade Civil do Estado": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Mandatos Eletivos - Vereador": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Prescrição de Ilícitos Administrativos": {
        "distribuicao": "1.3%",
        "importancia": "BAIXO"
      },
      "Reintegração de Servidor": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Direitos Sociais do Servidor": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Acesso a Informações Privilegiadas": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Mandatos Eletivos": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      }
    },
    "09 - Atos Administrativos: Classificação, Espécies e Extinção": {
      "Anulação e Revogação": {
        "distribuicao": "5.5%",
        "importancia": "ALTO"
      },
      "Extinção dos Atos Administrativos": {
        "distribuicao": "4.5%",
        "importancia": "ALTO"
      },
      "Classificação dos Atos Administrativos": {
        "distribuicao": "4.5%",
        "importancia": "ALTO"
      },
      "Espécies de Atos Administrativos": {
        "distribuicao": "4.5%",
        "importancia": "ALTO"
      },
      "Convalidação dos Atos Administrativos": {
        "distribuicao": "4.5%",
        "importancia": "ALTO"
      },
      "Convalidação de Atos": {
        "distribuicao": "4.5%",
        "importancia": "ALTO"
      },
      "Vícios do Ato Administrativo": {
        "distribuicao": "4.5%",
        "importancia": "ALTO"
      },
      "Extinção": {
        "distribuicao": "4.5%",
        "importancia": "ALTO"
      },
      "🆕 LINDB (Arts. 20 a 30) - Consequencialismo e modulação na anulação de atos": {
        "distribuicao": "4.5%",
        "importancia": "ALTO"
      },
      "Atos Discricionários": {
        "distribuicao": "3.0%",
        "importancia": "MÉDIO"
      },
      "Atos Administrativos": {
        "distribuicao": "3.0%",
        "importancia": "MÉDIO"
      },
      "Teoria dos Motivos Determinantes": {
        "distribuicao": "3.0%",
        "importancia": "MÉDIO"
      },
      "Autotutela": {
        "distribuicao": "3.0%",
        "importancia": "MÉDIO"
      },
      "Poder Vinculado vs Discricionário": {
        "distribuicao": "3.0%",
        "importancia": "MÉDIO"
      },
      "Atributos do Ato Administrativo": {
        "distribuicao": "3.0%",
        "importancia": "MÉDIO"
      },
      "Abuso de Poder: Desvio de Finalidade": {
        "distribuicao": "3.0%",
        "importancia": "MÉDIO"
      },
      "Princípio da Autotutela": {
        "distribuicao": "3.0%",
        "importancia": "MÉDIO"
      },
      "Conceito - Silêncio Administrativo": {
        "distribuicao": "3.0%",
        "importancia": "MÉDIO"
      },
      "Controle Judicial": {
        "distribuicao": "3.0%",
        "importancia": "MÉDIO"
      },
      "Abuso de Poder": {
        "distribuicao": "3.0%",
        "importancia": "MÉDIO"
      },
      "Elementos do Ato Administrativo": {
        "distribuicao": "3.0%",
        "importancia": "MÉDIO"
      },
      "Vícios": {
        "distribuicao": "3.0%",
        "importancia": "MÉDIO"
      },
      "Classificação": {
        "distribuicao": "3.0%",
        "importancia": "MÉDIO"
      },
      "Elementos": {
        "distribuicao": "3.0%",
        "importancia": "MÉDIO"
      },
      "Atos Vinculados": {
        "distribuicao": "3.0%",
        "importancia": "MÉDIO"
      },
      "Agente de Fato": {
        "distribuicao": "1.5%",
        "importancia": "BAIXO"
      },
      "Poder de Polícia": {
        "distribuicao": "1.5%",
        "importancia": "BAIXO"
      },
      "Controle Legislativo": {
        "distribuicao": "1.5%",
        "importancia": "BAIXO"
      },
      "Poder Regulamentar": {
        "distribuicao": "1.5%",
        "importancia": "BAIXO"
      },
      "Conceito - Fato Administrativo": {
        "distribuicao": "1.5%",
        "importancia": "BAIXO"
      },
      "Poder Disciplinar": {
        "distribuicao": "1.5%",
        "importancia": "BAIXO"
      },
      "Atributos - Autoexecutoriedade": {
        "distribuicao": "1.5%",
        "importancia": "BAIXO"
      },
      "Autorização de Uso": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Regime Jurídico Administrativo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Contratos Administrativos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Responsabilidade Civil do Estado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "07 - Poderes da Administração Pública": {
      "Poder de Polícia": {
        "distribuicao": "6.4%",
        "importancia": "CRÍTICO"
      },
      "Poder de Polícia vs Judiciária": {
        "distribuicao": "3.9%",
        "importancia": "ALTO"
      },
      "Poderes Administrativos": {
        "distribuicao": "3.9%",
        "importancia": "ALTO"
      },
      "Poder de Polícia e Delegação": {
        "distribuicao": "3.9%",
        "importancia": "ALTO"
      },
      "Abuso de Poder: Excesso de Poder": {
        "distribuicao": "3.9%",
        "importancia": "ALTO"
      },
      "Poder de Polícia - Conceito": {
        "distribuicao": "3.9%",
        "importancia": "ALTO"
      },
      "Poder Vinculado vs Discricionário": {
        "distribuicao": "3.9%",
        "importancia": "ALTO"
      },
      "Abuso de Poder": {
        "distribuicao": "3.9%",
        "importancia": "ALTO"
      },
      "Poder Disciplinar": {
        "distribuicao": "3.9%",
        "importancia": "ALTO"
      },
      "Atributos do Poder de Polícia": {
        "distribuicao": "3.9%",
        "importancia": "ALTO"
      },
      "Poder Hierárquico": {
        "distribuicao": "3.9%",
        "importancia": "ALTO"
      },
      "Abuso de Poder: Desvio de Finalidade": {
        "distribuicao": "3.9%",
        "importancia": "ALTO"
      },
      "Poder Regulamentar": {
        "distribuicao": "3.9%",
        "importancia": "ALTO"
      },
      "Abuso de Poder - Omissão": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Poder Disciplinar - Discrecionariedade": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Poder de Polícia - Limites": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Poder Hierárquico - Avocação": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Poder de Polícia - Sanção": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Poder de Polícia - Delegação a Particulares": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Atributos - Autoexecutoriedade": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Poder Hierárquico - Delegação": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Ciclo do Poder de Polícia": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Poder de Polícia - Coercibilidade": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Poder Regulamentar - Limites": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Poder Disciplinar - Devido Processo": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Poder de Polícia - Prescrição": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "🆕 STF Tema 532 (2020) - Constitucionalidade da delegação do poder de polícia a estatais (capital majoritariamente público)": {
        "distribuicao": "2.6%",
        "importancia": "MÉDIO"
      },
      "Poder Hierárquico - Ordens": {
        "distribuicao": "1.3%",
        "importancia": "BAIXO"
      },
      "Poder de Polícia - Taxas": {
        "distribuicao": "1.3%",
        "importancia": "BAIXO"
      },
      "Poder Hierárquico - Supervisão": {
        "distribuicao": "1.3%",
        "importancia": "BAIXO"
      },
      "Poder de Polícia - Prescritivo vs Concreto": {
        "distribuicao": "1.3%",
        "importancia": "BAIXO"
      },
      "Poder Disciplinar - Relação com Hierárquico": {
        "distribuicao": "1.3%",
        "importancia": "BAIXO"
      },
      "Poderes e deveres do administrador público": {
        "distribuicao": "3.9%",
        "importancia": "ALTO"
      },
      "Autotutela": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Organização Administrativa": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Processo Administrativo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Atributos do Ato Administrativo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Conceito - Silêncio Administrativo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "15 - Responsabilidade Civil do Estado": {
      "Responsabilidade Civil do Estado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Responsabilidade por Atos de Custodiados": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Excludentes de Responsabilidade": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade de Concessionárias": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Direito de Regresso": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade por Atos Legislativos": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Elementos da Responsabilidade": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Teorias da Responsabilidade": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade por Atos Judiciais": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade Civil - Presos Foragidos": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade por Fenômenos Naturais": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade por Custódia": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade do Agente Público (LINDB)": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Prescrição": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Teoria do Risco Integral": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade por Atos de Agentes de Fato": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade por Atos de Notários": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade por Atos Lícitos": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade por Omissão Específica": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade de Empresas Públicas": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade por Atos de Agentes Fora da Função": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Denunciação da Lide": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade por Atos de Multidões": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade por Erro Médico": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade por Suicídio de Detento": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade por Atos de Terceiros (Balas Perdidas)": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade por Atos de Consórcios Públicos": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade por Atos de Agentes Cedidos": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade por Atos de Animais do Estado": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade por Atos de Terceiros (Presos em Saída Temporária)": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade por Atos de Agências Reguladoras": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade por Atos de Terceiros (Danos em Manifestações)": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Teoria do Risco Administrativo": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade por Omissão": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade de Notários": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade Civil e Penal": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Teoria da Dupla Garantia": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade Civil do Agente": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade por Atos de Terceiros": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade por Omissão Genérica": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Danos por Obras Públicas": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade por Atos Administrativos Anulados": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade por Omissão Legislativa": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade por Atos de Terceiros (Terrorismo)": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade por Atos de Agentes Fora do Horário": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade por Danos Ambientais": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Fundamentos Constitucionais": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Danos por Presos Custodiados": {
        "distribuicao": "1.8%",
        "importancia": "MÉDIO"
      },
      "Danos por Foragidos": {
        "distribuicao": "1.8%",
        "importancia": "MÉDIO"
      },
      "Imprescritibilidade": {
        "distribuicao": "1.8%",
        "importancia": "MÉDIO"
      },
      "Bala Perdida": {
        "distribuicao": "1.8%",
        "importancia": "MÉDIO"
      },
      "Nomeação Tardia em Concurso": {
        "distribuicao": "1.8%",
        "importancia": "MÉDIO"
      },
      "Intervenção no Domínio Econômico": {
        "distribuicao": "1.8%",
        "importancia": "MÉDIO"
      },
      "Independência de Instâncias": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Culpa Concorrente": {
        "distribuicao": "1.8%",
        "importancia": "MÉDIO"
      },
      "🆕 STF (2024) - Responsabilidade estatal por vítima de bala perdida em operações": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "20 - Convênios e instrumentos congêneres": {
      "Lei 13.019/2014 (MROSC)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Consórcios Públicos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Termo de Execução Descentralizada (TED)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Diferenças entre Convênios e Contratos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Acórdão TCU 153/2023 - Procedimentos para devolução de saldos de convênios federais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Vedações - Condenados": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Vedações - Fins Lucrativos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Regras Gerais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Vedações": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Retenção de Parcelas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Chamamento Público": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Execução": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Competência para Assinatura": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Execução Excepcional": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Alteração e Extinção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Diferença Convênio x MROSC": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Vedações de Valor": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "SICONV / Plataforma +Brasil": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Vedações e Cláusulas Obrigatórias": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Contrapartida": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Responsabilidade dos Gestores": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Devolução de Saldos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "MROSC - Acordo de Cooperação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Plano de Trabalho": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "MROSC - Seleção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Contrato de Repasse": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Conceito e Natureza Jurídica": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "MROSC - Termos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Publicidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Protocolo de Intenções": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Prestação de Contas - Prazos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Alteração do Objeto": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Consórcios - Contrato de Programa": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Rendimentos de Aplicação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Conceito": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Fiscalização": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Aplicação Financeira": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Consórcios - Contrato de Rateio": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Natureza dos Recursos e Prestação de Contas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "10 - Processo Administrativo - Lei 9.784/1999": {
      "Recursos": {
        "distribuicao": "4.1%",
        "importancia": "CRÍTICO"
      },
      "Anulação e Revogação": {
        "distribuicao": "5.0%",
        "importancia": "CRÍTICO"
      },
      "Princípios Administrativos": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Competência e Delegação": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Impedimentos": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Motivação": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Prazos": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Dever de Decidir": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Convalidação dos Atos Administrativos": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Instrução": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Comunicação dos Atos": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Direitos do Administrado": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Deveres do Administrado": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Início do Processo": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Suspeição": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Revisão": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Competência": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Recursos Administrativos e Reformatio in Pejus": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Impedimentos e Suspeição": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Prioridade de Tramitação": {
        "distribuicao": "2.5%",
        "importancia": "MÉDIO"
      },
      "Legitimidade": {
        "distribuicao": "2.5%",
        "importancia": "MÉDIO"
      },
      "Elementos: Avocação": {
        "distribuicao": "2.5%",
        "importancia": "MÉDIO"
      },
      "Forma dos Atos": {
        "distribuicao": "2.5%",
        "importancia": "MÉDIO"
      },
      "Reformatio in Pejus": {
        "distribuicao": "2.5%",
        "importancia": "MÉDIO"
      },
      "Âmbito de Aplicação": {
        "distribuicao": "2.5%",
        "importancia": "MÉDIO"
      },
      "Processo Administrativo": {
        "distribuicao": "2.5%",
        "importancia": "MÉDIO"
      },
      "Extinção": {
        "distribuicao": "2.5%",
        "importancia": "MÉDIO"
      },
      "Poder Hierárquico - Avocação": {
        "distribuicao": "2.5%",
        "importancia": "MÉDIO"
      },
      "🆕 STJ (2021) - Inaplicabilidade do prazo decadencial para anular atos inconstitucionais": {
        "distribuicao": "2.5%",
        "importancia": "MÉDIO"
      },
      "Sanções e Disposições Finais (arts. 68 e 69)": {
        "distribuicao": "1.3%",
        "importancia": "BAIXO"
      },
      "Responsabilidade Civil do Estado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "19 - Contratos Administrativos na NLLC": {
      "Formalização dos Contratos": {
        "distribuicao": "5.4%",
        "importancia": "ALTO"
      },
      "Alteração Unilateral": {
        "distribuicao": "5.0%",
        "importancia": "ALTO"
      },
      "Equilíbrio Econômico-Financeiro": {
        "distribuicao": "5.0%",
        "importancia": "ALTO"
      },
      "Extinção do Contrato": {
        "distribuicao": "5.0%",
        "importancia": "ALTO"
      },
      "Sanções Administrativas": {
        "distribuicao": "5.0%",
        "importancia": "ALTO"
      },
      "Duração dos Contratos": {
        "distribuicao": "5.0%",
        "importancia": "ALTO"
      },
      "Execução": {
        "distribuicao": "5.0%",
        "importancia": "ALTO"
      },
      "Sanções": {
        "distribuicao": "5.0%",
        "importancia": "ALTO"
      },
      "Fiscalização": {
        "distribuicao": "5.0%",
        "importancia": "ALTO"
      },
      "🆕 Lei 14.133/21 (Art. 137) - Direitos do contratado e cláusula de retomada na inexecução": {
        "distribuicao": "5.0%",
        "importancia": "ALTO"
      },
      "Contratos Administrativos": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Eficácia do Contrato": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Subcontratação": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Vedações e Cláusulas Obrigatórias": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade do Contratado": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Sanção de Multa": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Exceção do Contrato não Cumprido": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Sanções - Proibição de Contratar": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Recursos": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Publicidade do Contrato": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Ocupação Temporária": {
        "distribuicao": "1.7%",
        "importancia": "BAIXO"
      },
      "Cláusulas Exorbitantes": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Seguro-Garantia e Cláusula de Retomada": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Garantias Contratuais": {
        "distribuicao": "5.0%",
        "importancia": "ALTO"
      },
      "Nulidade dos Contratos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Prerrogativas da Administração": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Controvérsias": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Controle Externo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "04 - Organização Administrativa": {
      "Desconcentração Administrativa": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Autarquias": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sociedades de Economia Mista": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Teoria do Órgão": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Controle e Supervisão Ministerial": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Empresa Pública": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Agências Reguladoras": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Organizações Sociais (OS)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Órgãos Públicos - Classificação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Fundações Públicas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Subsidiárias": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Consórcios Públicos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Centralização Administrativa": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Empresas Públicas e Sociedades de Economia Mista": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "OSCIP": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Responsabilidade Civil do Estado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sociedade de Economia Mista - Foro": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Agências Reguladoras - Quarentena": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Descentralização por Outorga vs Colaboração": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Órgãos Públicos - Capacidade Processual": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Serviços Sociais Autônomos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Marco Regulatório (Lei 13.019/14)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Terceiro Setor": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Administração Indireta": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Descentralização e Desconcentração": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Organização Administrativa": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Administração Indireta - Autarquias": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Administração Pública": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Administração Direta": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Distinção entre Agências Executivas e Reguladoras": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Natureza Jurídica e Características das Agências Reguladoras": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Agências Executivas - Qualificação e Contrato de Gestão": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Terceiro Setor - Organizações Sociais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Órgãos Públicos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sentidos da Administração Pública (Formal vs Material)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Administração Direta - Órgãos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Empresas Públicas - Regime Jurídico": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Tutela Administrativa": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Terceiro Setor - Sistema S": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Subsidiárias de Estatais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Privilégios das Autarquias": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Desconcentração Vertical vs Horizontal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Administração Indireta - Bens": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Terceiro Setor - OSCIP": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Poder de Polícia e Delegação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Poder Hierárquico": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Regime de Pessoal nas Estatais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Órgãos Públicos - Conceito": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Organização Administrativa - Geral": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Descentralização": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Agências Executivas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Desconcentração": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Prerrogativas das Autarquias": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 STF ADI 5624 – Alienação de controle de estatais e de subsidiárias: exigência de licitação e de autorização legislativa": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "11 - Agentes Públicos. Disposições doutrinárias e constitucionais": {
      "Requisição": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Acumulação de Cargos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Irredutibilidade de Vencimentos": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Remuneração": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Agentes Honoríficos": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Concurso Público": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Funções de Confiança e Cargos em Comissão": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Acesso a Cargos por Estrangeiros": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Acesso a Cargos Públicos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Cargos Comissionados": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Avaliação de Desempenho": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Reintegração": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Direito de Greve dos Servidores Públicos": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Perda do Cargo do Servidor Estável": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Estabilidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Previdência": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Teoria do Órgão": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Poder Disciplinar": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Agentes Públicos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Contratação Temporária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Teto Remuneratório Geral": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Servidor em Mandato Eletivo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Aposentadoria Compulsória": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Improbidade Administrativa": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Regime Jurídico": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Cargos em Comissão e Funções de Confiança": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Remuneração e Subsídio": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Teto Remuneratório em Estatais": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade Civil do Agente": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Cargos e Funções": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Conceito de Agente Público": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Formas de Provimento": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Classificação de Agentes Públicos": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Mandatos Eletivos - Vereador": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Nepotismo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Direito de Regresso": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Validade do Concurso Público": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Reserva de Vagas para PCD": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Publicidade e Promoção Pessoal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sanções de Improbidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Disponibilidade": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Readaptação": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Reversão": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Agentes Delegados": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Sindicatos e Servidores": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Acumulação de Proventos e Cargo": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Concurso e Cadastro de Reserva": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Recondução": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Remuneração e Teto": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Provimento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Vacância": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Vícios do Ato Administrativo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Independência de Instâncias": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Abuso de Poder: Desvio de Finalidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Responsabilidade Civil do Estado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Direito de Greve e Sindicalização": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Disponibilidade e Aproveitamento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Estágio Probatório": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 STF (2022) - Servidor temporário sucessivamente prorrogado e direitos rescisórios": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lei 8.112/1990 - Regime disciplinar (deveres, proibições, penalidades e PAD)": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      },
      "Lei 8.112/1990 - Direitos e vantagens, licenças e afastamentos": {
        "distribuicao": "3.3%",
        "importancia": "MÉDIO"
      }
    },
    "06 - Entidades paraestatais e Terceiro setor": {
      "Organizações Sociais (OS)": {
        "distribuicao": "5.6%",
        "importancia": "MÉDIO"
      },
      "Serviços Sociais Autônomos": {
        "distribuicao": "5.6%",
        "importancia": "MÉDIO"
      },
      "Terceiro Setor": {
        "distribuicao": "5.6%",
        "importancia": "MÉDIO"
      },
      "OSCIP": {
        "distribuicao": "5.6%",
        "importancia": "MÉDIO"
      },
      "Marco Regulatório (Lei 13.019/14)": {
        "distribuicao": "5.6%",
        "importancia": "MÉDIO"
      },
      "Entidades Paraestatais": {
        "distribuicao": "5.6%",
        "importancia": "MÉDIO"
      },
      "Administração Indireta": {
        "distribuicao": "5.6%",
        "importancia": "MÉDIO"
      },
      "Terceiro Setor - Organizações Sociais": {
        "distribuicao": "5.6%",
        "importancia": "MÉDIO"
      },
      "Terceiro Setor - Sistema S": {
        "distribuicao": "5.6%",
        "importancia": "MÉDIO"
      },
      "Terceiro Setor - OSCIP": {
        "distribuicao": "5.6%",
        "importancia": "MÉDIO"
      },
      "Conselho de Administração das OS": {
        "distribuicao": "5.5%",
        "importancia": "MÉDIO"
      },
      "Remuneração nas OSCIPs": {
        "distribuicao": "5.5%",
        "importancia": "MÉDIO"
      },
      "Desqualificação de OS": {
        "distribuicao": "5.5%",
        "importancia": "MÉDIO"
      },
      "Fundações de Apoio": {
        "distribuicao": "5.5%",
        "importancia": "MÉDIO"
      },
      "MROSC - Acordo de Cooperação": {
        "distribuicao": "5.5%",
        "importancia": "MÉDIO"
      },
      "Poder de Polícia no Terceiro Setor": {
        "distribuicao": "5.5%",
        "importancia": "MÉDIO"
      },
      "Chamamento Público": {
        "distribuicao": "5.5%",
        "importancia": "MÉDIO"
      },
      "Agências Reguladoras": {
        "distribuicao": "5.5%",
        "importancia": "MÉDIO"
      },
      "🆕 STF ADI 1923 (2015) - Requisitos de dispensa de licitação e controle de Organizações Sociais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "21 - Lei de Improbidade Administrativa (Lei 8.429/92, alterada pela Lei 14.230/21)": {
      "Enriquecimento Ilícito": {
        "distribuicao": "4.1%",
        "importancia": "CRÍTICO"
      },
      "Sanções de Improbidade": {
        "distribuicao": "4.2%",
        "importancia": "CRÍTICO"
      },
      "Prejuízo ao Erário": {
        "distribuicao": "4.2%",
        "importancia": "CRÍTICO"
      },
      "Atos contra Princípios": {
        "distribuicao": "4.2%",
        "importancia": "CRÍTICO"
      },
      "Improbidade Administrativa": {
        "distribuicao": "3.1%",
        "importancia": "ALTO"
      },
      "Elemento Subjetivo": {
        "distribuicao": "3.1%",
        "importancia": "ALTO"
      },
      "Sanções - Perda da Função": {
        "distribuicao": "3.1%",
        "importancia": "ALTO"
      },
      "Princípios - Rol Taxativo": {
        "distribuicao": "3.1%",
        "importancia": "ALTO"
      },
      "Enriquecimento Ilícito - Evolução Patrimonial": {
        "distribuicao": "3.1%",
        "importancia": "ALTO"
      },
      "Sanções - Multa Civil": {
        "distribuicao": "3.1%",
        "importancia": "ALTO"
      },
      "Sanções - Proibição de Contratar": {
        "distribuicao": "3.1%",
        "importancia": "ALTO"
      },
      "Atos contra Princípios - Publicidade": {
        "distribuicao": "3.1%",
        "importancia": "ALTO"
      },
      "Sanções - Suspensão de Direitos Políticos": {
        "distribuicao": "3.1%",
        "importancia": "ALTO"
      },
      "Sanções - Individualização": {
        "distribuicao": "3.1%",
        "importancia": "ALTO"
      },
      "Atos contra Princípios - Exame": {
        "distribuicao": "3.1%",
        "importancia": "ALTO"
      },
      "Ressarcimento ao Erário": {
        "distribuicao": "3.1%",
        "importancia": "ALTO"
      },
      "Dano In Re Ipsa": {
        "distribuicao": "2.1%",
        "importancia": "MÉDIO"
      },
      "Dano Irrelevante": {
        "distribuicao": "2.1%",
        "importancia": "MÉDIO"
      },
      "🆕 STF Tema 1199 (2022) - Irretroatividade da nova LIA para atos culposos com condenação definitiva": {
        "distribuicao": "2.1%",
        "importancia": "MÉDIO"
      },
      "Princípio da Eficiência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Independência de Instâncias": {
        "distribuicao": "2.1%",
        "importancia": "MÉDIO"
      },
      "Absolvição Criminal": {
        "distribuicao": "2.1%",
        "importancia": "MÉDIO"
      },
      "Sujeito Ativo (Terceiro)": {
        "distribuicao": "2.1%",
        "importancia": "MÉDIO"
      },
      "Declaração Patrimonial": {
        "distribuicao": "2.1%",
        "importancia": "MÉDIO"
      },
      "Publicidade e Promoção Pessoal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Improbidade Administrativa e Prescrição": {
        "distribuicao": "1.0%",
        "importancia": "BAIXO"
      },
      "Acordo de Não Persecução Cível": {
        "distribuicao": "2.1%",
        "importancia": "MÉDIO"
      },
      "Nepotismo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sucessão": {
        "distribuicao": "2.1%",
        "importancia": "MÉDIO"
      },
      "Indisponibilidade de Bens": {
        "distribuicao": "2.1%",
        "importancia": "MÉDIO"
      },
      "Divergência Interpretativa": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Legitimidade Ativa": {
        "distribuicao": "2.1%",
        "importancia": "MÉDIO"
      },
      "Disposições Gerais": {
        "distribuicao": "2.1%",
        "importancia": "MÉDIO"
      },
      "Prescrição Intercorrente": {
        "distribuicao": "3.1%",
        "importancia": "ALTO"
      },
      "Conceito de Agente Público": {
        "distribuicao": "2.1%",
        "importancia": "MÉDIO"
      },
      "Entidades Lesadas": {
        "distribuicao": "2.1%",
        "importancia": "MÉDIO"
      },
      "Indisponibilidade - Limites": {
        "distribuicao": "2.1%",
        "importancia": "MÉDIO"
      },
      "Pessoa Jurídica e LIA": {
        "distribuicao": "2.1%",
        "importancia": "MÉDIO"
      },
      "Interrupção da Prescrição": {
        "distribuicao": "4.2%",
        "importancia": "CRÍTICO"
      },
      "Sujeitos Passivos": {
        "distribuicao": "2.1%",
        "importancia": "MÉDIO"
      },
      "Medidas Cautelares": {
        "distribuicao": "2.1%",
        "importancia": "MÉDIO"
      },
      "Processo Administrativo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "25 - Ética Profissional do Servidor Público. Conflito de Interesses no Serviço Público.": {
      "Código de Ética Profissional (Decreto nº 1.171/1994)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Prestação de Contas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lei de Conflito de Interesses (Lei nº 12.813/2013)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Ética": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Poder Hierárquico": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Decreto 11.090/2022 - Reorganização do Sistema de Gestão da Ética e papel da CEP": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "24 - Lei Geral de Proteção de Dados - LGPD": {
      "Tratamento pelo Poder Público": {
        "distribuicao": "9.3%",
        "importancia": "CRÍTICO"
      },
      "Princípios do Tratamento": {
        "distribuicao": "6.7%",
        "importancia": "ALTO"
      },
      "Dados Pessoais Sensíveis": {
        "distribuicao": "6.7%",
        "importancia": "ALTO"
      },
      "Requisitos para o Tratamento": {
        "distribuicao": "6.7%",
        "importancia": "ALTO"
      },
      "Direitos do Titular": {
        "distribuicao": "6.7%",
        "importancia": "ALTO"
      },
      "Bases Legais": {
        "distribuicao": "6.7%",
        "importancia": "ALTO"
      },
      "Compartilhamento de Dados Públicos": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "Âmbito de Aplicação": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "Conceitos e Definições": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "Tratamento": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "Fundamentos da Proteção de Dados": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "Dados de Crianças e Adolescentes": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "Agentes Tratamento": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "Sanções Administrativas": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "Encarregado de Dados (DPO)": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "Segurança": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "Autoridade Nacional (ANPD)": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "Aplicação Territorial": {
        "distribuicao": "2.2%",
        "importancia": "BAIXO"
      },
      "Exceções de Aplicabilidade": {
        "distribuicao": "2.2%",
        "importancia": "BAIXO"
      },
      "Transferência Internacional": {
        "distribuicao": "2.2%",
        "importancia": "BAIXO"
      },
      "Responsabilidade Civil": {
        "distribuicao": "2.2%",
        "importancia": "BAIXO"
      },
      "Legislação Correlata": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Parecer CD/ANPD (2023) - Compartilhamento de dados públicos e limites de fiscalização": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "18 - Lei 14.133/21 - Nova Lei de Licitações e Contratos": {
      "Inexigibilidade de Licitação": {
        "distribuicao": "3.2%",
        "importancia": "CRÍTICO"
      },
      "Dispensa por Valor": {
        "distribuicao": "3.7%",
        "importancia": "CRÍTICO"
      },
      "Objetivos da Licitação": {
        "distribuicao": "2.8%",
        "importancia": "ALTO"
      },
      "Princípios": {
        "distribuicao": "2.8%",
        "importancia": "ALTO"
      },
      "Fases da Licitação": {
        "distribuicao": "2.8%",
        "importancia": "ALTO"
      },
      "Modalidades de Licitação": {
        "distribuicao": "2.8%",
        "importancia": "ALTO"
      },
      "Diálogo Competitivo": {
        "distribuicao": "2.8%",
        "importancia": "ALTO"
      },
      "Contratação Direta": {
        "distribuicao": "2.8%",
        "importancia": "ALTO"
      },
      "Sanções Administrativas": {
        "distribuicao": "2.8%",
        "importancia": "ALTO"
      },
      "Formalização dos Contratos": {
        "distribuicao": "2.8%",
        "importancia": "ALTO"
      },
      "Fases": {
        "distribuicao": "2.8%",
        "importancia": "ALTO"
      },
      "Modalidades": {
        "distribuicao": "2.8%",
        "importancia": "ALTO"
      },
      "Edital": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Pregão": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Credenciamento": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Duração dos Contratos": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Matriz de Riscos": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Extinção do Contrato": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Princípios da Administração Pública": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Objetivos": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Execução": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Artigos de Luxo": {
        "distribuicao": "0.9%",
        "importancia": "BAIXO"
      },
      "Contratação de Artistas": {
        "distribuicao": "0.9%",
        "importancia": "BAIXO"
      },
      "🆕 IN SEGES/ME nº 73/2022 - Regras rigorosas de pesquisa de preços para aquisições públicas": {
        "distribuicao": "0.9%",
        "importancia": "BAIXO"
      },
      "Anulação, Revogação e Recursos Administrativos (arts. 71 e 164 a 168)": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Âmbito de Aplicação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Critérios de Julgamento": {
        "distribuicao": "2.2%",
        "importancia": "MÉDIO"
      },
      "Critérios de Desempate": {
        "distribuicao": "2.2%",
        "importancia": "MÉDIO"
      },
      "PNCP": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Prazos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Modos de Disputa": {
        "distribuicao": "2.2%",
        "importancia": "MÉDIO"
      },
      "Procedimentos Auxiliares": {
        "distribuicao": "2.2%",
        "importancia": "MÉDIO"
      },
      "Tratamento Diferenciado": {
        "distribuicao": "2.2%",
        "importancia": "MÉDIO"
      },
      "Agentes Públicos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Participação": {
        "distribuicao": "2.2%",
        "importancia": "MÉDIO"
      },
      "Definições Legais": {
        "distribuicao": "2.2%",
        "importancia": "MÉDIO"
      },
      "Publicidade do Edital": {
        "distribuicao": "2.2%",
        "importancia": "MÉDIO"
      },
      "Garantias Contratuais": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Cláusulas Exorbitantes": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Controle das Contratações": {
        "distribuicao": "2.2%",
        "importancia": "MÉDIO"
      },
      "Alienação de Bens": {
        "distribuicao": "2.2%",
        "importancia": "MÉDIO"
      },
      "Contratação de Software": {
        "distribuicao": "2.2%",
        "importancia": "MÉDIO"
      },
      "Habilitação": {
        "distribuicao": "2.8%",
        "importancia": "ALTO"
      },
      "Vigência": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Aplicação": {
        "distribuicao": "2.2%",
        "importancia": "MÉDIO"
      },
      "Julgamento": {
        "distribuicao": "1.9%",
        "importancia": "MÉDIO"
      },
      "Alienação": {
        "distribuicao": "2.2%",
        "importancia": "MÉDIO"
      },
      "Alienação de Bens Públicos": {
        "distribuicao": "2.2%",
        "importancia": "MÉDIO"
      },
      "Serviços": {
        "distribuicao": "2.2%",
        "importancia": "MÉDIO"
      }
    },
    "02 - Estado, Governo e Administração Pública": {
      "Regime Jurídico Administrativo": {
        "distribuicao": "4.7%",
        "importancia": "ALTO"
      },
      "🆕 LINDB (Arts. 20 a 30) - Consequencialismo e segurança jurídica no Direito Público": {
        "distribuicao": "4.7%",
        "importancia": "ALTO"
      },
      "Princípios da Administração Pública": {
        "distribuicao": "3.1%",
        "importancia": "MÉDIO"
      },
      "Sentidos da Administração Pública (Formal vs Material)": {
        "distribuicao": "3.1%",
        "importancia": "MÉDIO"
      },
      "Administração Pública em Sentido Amplo e Estrito": {
        "distribuicao": "3.1%",
        "importancia": "MÉDIO"
      },
      "Conceito de Governo": {
        "distribuicao": "3.1%",
        "importancia": "MÉDIO"
      },
      "Administração Pública": {
        "distribuicao": "3.1%",
        "importancia": "MÉDIO"
      },
      "Administração Pública e Governo": {
        "distribuicao": "3.1%",
        "importancia": "MÉDIO"
      },
      "Administração Pública em Sentido Objetivo": {
        "distribuicao": "3.1%",
        "importancia": "MÉDIO"
      },
      "Princípios Administrativos": {
        "distribuicao": "3.1%",
        "importancia": "MÉDIO"
      },
      "Sistemas Administrativos": {
        "distribuicao": "3.5%",
        "importancia": "MÉDIO"
      },
      "Critérios de Definição do Direito Administrativo": {
        "distribuicao": "3.5%",
        "importancia": "MÉDIO"
      },
      "Fontes do Direito Administrativo": {
        "distribuicao": "3.5%",
        "importancia": "MÉDIO"
      },
      "Direito Administrativo": {
        "distribuicao": "3.5%",
        "importancia": "MÉDIO"
      },
      "Conceito e Natureza Jurídica": {
        "distribuicao": "3.5%",
        "importancia": "MÉDIO"
      },
      "Funções Estatais": {
        "distribuicao": "3.5%",
        "importancia": "MÉDIO"
      },
      "Conceito de Estado e seus Elementos": {
        "distribuicao": "3.5%",
        "importancia": "MÉDIO"
      },
      "Funções do Estado e Tripartição de Poderes": {
        "distribuicao": "3.5%",
        "importancia": "MÉDIO"
      },
      "Agentes Públicos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Republicano": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Escola do Serviço Público": {
        "distribuicao": "3.5%",
        "importancia": "MÉDIO"
      },
      "Costumes como Fonte": {
        "distribuicao": "3.5%",
        "importancia": "MÉDIO"
      },
      "Classificação de Agentes Públicos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Codificação e Autonomia": {
        "distribuicao": "3.5%",
        "importancia": "MÉDIO"
      },
      "Estado e Nação": {
        "distribuicao": "3.5%",
        "importancia": "MÉDIO"
      },
      "Súmulas Vinculantes como Fonte": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Poderes do Estado e Funções": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Concurso Público": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Conceito de Povo e População": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Critério da Excludência (Residual)": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Soberania Interna e Externa": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Princípios Gerais do Direito como Fonte": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      },
      "Doutrina como Fonte": {
        "distribuicao": "3.4%",
        "importancia": "MÉDIO"
      }
    },
    "17 - Contratos Administrativos": {
      "Alteração Unilateral": {
        "distribuicao": "5.0%",
        "importancia": "ALTO"
      },
      "Duração dos Contratos": {
        "distribuicao": "5.7%",
        "importancia": "ALTO"
      },
      "Execução": {
        "distribuicao": "5.7%",
        "importancia": "ALTO"
      },
      "Alteração": {
        "distribuicao": "5.7%",
        "importancia": "ALTO"
      },
      "Formalização dos Contratos": {
        "distribuicao": "5.7%",
        "importancia": "ALTO"
      },
      "Sanções Administrativas": {
        "distribuicao": "5.7%",
        "importancia": "ALTO"
      },
      "Equilíbrio Econômico-Financeiro": {
        "distribuicao": "5.7%",
        "importancia": "ALTO"
      },
      "Extinção do Contrato": {
        "distribuicao": "5.7%",
        "importancia": "ALTO"
      },
      "Sanções": {
        "distribuicao": "5.7%",
        "importancia": "ALTO"
      },
      "Fiscalização": {
        "distribuicao": "5.7%",
        "importancia": "ALTO"
      },
      "Inexigibilidade de Licitação": {
        "distribuicao": "5.7%",
        "importancia": "ALTO"
      },
      "Subcontratação": {
        "distribuicao": "3.8%",
        "importancia": "MÉDIO"
      },
      "Contratos Administrativos": {
        "distribuicao": "3.8%",
        "importancia": "MÉDIO"
      },
      "Publicidade do Contrato": {
        "distribuicao": "3.8%",
        "importancia": "MÉDIO"
      },
      "Responsabilidade Trabalhista": {
        "distribuicao": "3.8%",
        "importancia": "MÉDIO"
      },
      "Contratação Direta": {
        "distribuicao": "3.8%",
        "importancia": "MÉDIO"
      },
      "Exceção do Contrato não Cumprido": {
        "distribuicao": "3.8%",
        "importancia": "MÉDIO"
      },
      "PNCP": {
        "distribuicao": "1.9%",
        "importancia": "BAIXO"
      },
      "Cláusulas Exorbitantes": {
        "distribuicao": "5.7%",
        "importancia": "ALTO"
      },
      "Garantias Contratuais": {
        "distribuicao": "3.8%",
        "importancia": "MÉDIO"
      },
      "Nulidade dos Contratos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Seguro-Garantia e Cláusula de Retomada": {
        "distribuicao": "3.8%",
        "importancia": "MÉDIO"
      },
      "Extinção da Concessão": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 STJ (2022) - Fixação de honorários contra Fazenda Pública em lides contratuais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "16 - Controle da Administração Pública": {
      "Controle Externo": {
        "distribuicao": "14.9%",
        "importancia": "CRÍTICO"
      },
      "Controle Judicial": {
        "distribuicao": "11.1%",
        "importancia": "ALTO"
      },
      "Controle Legislativo": {
        "distribuicao": "11.1%",
        "importancia": "ALTO"
      },
      "Controle Administrativo": {
        "distribuicao": "11.1%",
        "importancia": "ALTO"
      },
      "Controle Interno": {
        "distribuicao": "11.1%",
        "importancia": "ALTO"
      },
      "Controle": {
        "distribuicao": "7.4%",
        "importancia": "MÉDIO"
      },
      "Autotutela": {
        "distribuicao": "7.4%",
        "importancia": "MÉDIO"
      },
      "🆕 STF Tema 899 (2020) - Prescritibilidade da pretensão de ressarcimento ao erário por decisão de Tribunal de Contas": {
        "distribuicao": "7.4%",
        "importancia": "MÉDIO"
      },
      "Controle e Supervisão Ministerial": {
        "distribuicao": "3.7%",
        "importancia": "BAIXO"
      },
      "Anulação e Revogação": {
        "distribuicao": "3.7%",
        "importancia": "BAIXO"
      },
      "Recursos": {
        "distribuicao": "3.7%",
        "importancia": "BAIXO"
      },
      "Classificações do Controle da Administração": {
        "distribuicao": "7.4%",
        "importancia": "MÉDIO"
      },
      "Direito de Greve dos Servidores Públicos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Organização Administrativa": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Acesso a Informações Privilegiadas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Poder de Polícia - Taxas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "13 - Bens Públicos": {
      "Regime Jurídico dos Bens Públicos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Uso de Bem Público por Particular": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Alienação de Bens Públicos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Imprescritibilidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 STF (2018) - Imprescritibilidade da pretensão reipersecutória sobre bens públicos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Bens Reversíveis": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Bens da União": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Uso Remunerado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Aquisição de Bens Públicos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Alienação - Dispensa de Licitação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Afetação e Desafetação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Classificação dos Bens Públicos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Regime Jurídico Administrativo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Bens de Empresas Estatais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Terras Indígenas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Zona Costeira": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Servidão Administrativa": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Desapropriação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Alienação de Bens Móveis": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Bens Dominicais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Desapropriação - Tredestinação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Não Onerabilidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Autorização de Uso": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Terras Devolutas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concessão de Direito Real de Uso": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Conceitos Gerais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Impenhorabilidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "03 - Princípios Administrativos": {
      "Princípio da Impessoalidade": {
        "distribuicao": "10.0%",
        "importancia": "CRÍTICO"
      },
      "Legalidade": {
        "distribuicao": "10.0%",
        "importancia": "CRÍTICO"
      },
      "Publicidade": {
        "distribuicao": "7.5%",
        "importancia": "ALTO"
      },
      "Princípio da Eficiência": {
        "distribuicao": "7.5%",
        "importancia": "ALTO"
      },
      "Publicidade e Promoção Pessoal": {
        "distribuicao": "7.5%",
        "importancia": "ALTO"
      },
      "Princípio da Moralidade": {
        "distribuicao": "7.5%",
        "importancia": "ALTO"
      },
      "Princípio da Segurança Jurídica": {
        "distribuicao": "5.0%",
        "importancia": "MÉDIO"
      },
      "Princípio da Autotutela": {
        "distribuicao": "5.0%",
        "importancia": "MÉDIO"
      },
      "Regime Jurídico Administrativo": {
        "distribuicao": "5.0%",
        "importancia": "MÉDIO"
      },
      "Princípios da Administração Pública": {
        "distribuicao": "5.0%",
        "importancia": "MÉDIO"
      },
      "Nepotismo": {
        "distribuicao": "5.0%",
        "importancia": "MÉDIO"
      },
      "Motivação": {
        "distribuicao": "5.0%",
        "importancia": "MÉDIO"
      },
      "Contraditório": {
        "distribuicao": "5.0%",
        "importancia": "MÉDIO"
      },
      "Princípios Administrativos": {
        "distribuicao": "5.0%",
        "importancia": "MÉDIO"
      },
      "🆕 SV 13 STF (2008) - Aplicação recente e exceções no cargo de natureza política": {
        "distribuicao": "5.0%",
        "importancia": "MÉDIO"
      },
      "Classificação Princípios": {
        "distribuicao": "2.5%",
        "importancia": "BAIXO"
      },
      "Republicano": {
        "distribuicao": "2.5%",
        "importancia": "BAIXO"
      },
      "Cláusulas Exorbitantes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípios do Serviço Público": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Agente de Fato": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "26 - Lei de Acesso à Informação - Lei 12.527/2011": {
      "Classificação da informação e sigilo": {
        "distribuicao": "33.4%",
        "importancia": "ALTO"
      },
      "Acesso, transparência ativa e passiva": {
        "distribuicao": "33.3%",
        "importancia": "MÉDIO"
      },
      "Procedimento de acesso e recursos": {
        "distribuicao": "33.3%",
        "importancia": "MÉDIO"
      }
    },
    "27 - LINDB - Decreto-Lei 4.657/1942": {
      "Arts. 20 a 30 (consequencialismo, segurança jurídica e decisões públicas)": {
        "distribuicao": "66.7%",
        "importancia": "CRÍTICO"
      },
      "Vigência, aplicação e interpretação das normas (arts. 1º a 19)": {
        "distribuicao": "33.3%",
        "importancia": "MÉDIO"
      }
    }
  },
  "Segurança de Dignitários": {
    "01 - Segurança da informação": {
      "Graus de sigilo e credenciamento": {
        "distribuicao": "26.7%",
        "importancia": "CRÍTICO"
      },
      "Confidencialidade, integridade e disponibilidade": {
        "distribuicao": "20.0%",
        "importancia": "ALTO"
      },
      "Engenharia social e comportamento do agente": {
        "distribuicao": "13.3%",
        "importancia": "MÉDIO"
      },
      "Política Nacional de Segurança da Informação": {
        "distribuicao": "20.0%",
        "importancia": "ALTO"
      },
      "Ameaças, vulnerabilidades e atributos básicos da informação": {
        "distribuicao": "20.0%",
        "importancia": "ALTO"
      }
    },
    "02 - Serviço de inteligência": {
      "SISBIN, ABIN e conceitos de inteligência": {
        "distribuicao": "21.8%",
        "importancia": "ALTO"
      },
      "Inteligência x Investigação / Fontes de coleta": {
        "distribuicao": "14.6%",
        "importancia": "MÉDIO"
      },
      "Metodologia, documentos e estados mentais": {
        "distribuicao": "21.8%",
        "importancia": "ALTO"
      },
      "Controle da atividade de inteligência (controle parlamentar e democrático)": {
        "distribuicao": "20.0%",
        "importancia": "MÉDIO"
      },
      "Política Nacional de Inteligência (PNI): finalidade e utilização": {
        "distribuicao": "21.8%",
        "importancia": "ALTO"
      }
    },
    "03 - Planejamento de segurança": {
      "Níveis (estratégico, tático, operacional) e Fases": {
        "distribuicao": "40.0%",
        "importancia": "CRÍTICO"
      },
      "Conceito, princípios e metodologia do planejamento de segurança": {
        "distribuicao": "30.0%",
        "importancia": "ALTO"
      },
      "Modularidade e faseamento": {
        "distribuicao": "30.0%",
        "importancia": "ALTO"
      }
    },
    "04 - Segurança corporativa estratégica": {
      "Defesa em profundidade e controle de instalações": {
        "distribuicao": "40.0%",
        "importancia": "MÉDIO"
      },
      "Segurança física e segurança da gestão de áreas e instalações": {
        "distribuicao": "60.0%",
        "importancia": "ALTO"
      }
    },
    "05 - Técnicas, táticas e operacionalização": {
      "Equipe de proteção e Advance (Reconhecimento)": {
        "distribuicao": "26.6%",
        "importancia": "CRÍTICO"
      },
      "Deslocamento, formação, embarque e desembarque": {
        "distribuicao": "26.7%",
        "importancia": "CRÍTICO"
      },
      "Reação a atentado (cobertura e evacuação)": {
        "distribuicao": "20.0%",
        "importancia": "ALTO"
      },
      "Comportamento e atuação do agente de segurança; objeto e modus operandi": {
        "distribuicao": "26.7%",
        "importancia": "CRÍTICO"
      }
    },
    "06 - Análise de riscos": {
      "Matriz de risco (Probabilidade x Impacto)": {
        "distribuicao": "30.0%",
        "importancia": "ALTO"
      },
      "Ameaça, vulnerabilidade e diagnóstico": {
        "distribuicao": "20.0%",
        "importancia": "MÉDIO"
      },
      "Riscos, ameaças, danos e perdas": {
        "distribuicao": "30.0%",
        "importancia": "ALTO"
      },
      "Métodos de aplicação e segurança dos ativos": {
        "distribuicao": "20.0%",
        "importancia": "MÉDIO"
      }
    },
    "07 - Planejamento de contingências": {
      "Gerenciamento de crises e procedimentos emergenciais": {
        "distribuicao": "25.0%",
        "importancia": "MÉDIO"
      },
      "Necessidade, planejamento e componentes do plano de contingência": {
        "distribuicao": "37.5%",
        "importancia": "ALTO"
      },
      "Manejo de emergência": {
        "distribuicao": "37.5%",
        "importancia": "ALTO"
      }
    },
    "08 - Proteção pessoal em situação de risco (Res. CNMP 116/2014)": {
      "Regras de proteção a membros e análise dinâmica": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Planejamento tático-logístico institucional": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "09 - Gestão de conflitos: elementos e critérios": {
      "Negociação e critérios de ação": {
        "distribuicao": "30.0%",
        "importancia": "ALTO"
      },
      "Fases da resposta e tipologia de risco": {
        "distribuicao": "20.0%",
        "importancia": "MÉDIO"
      },
      "Elementos operacionais essenciais do gerenciamento de crises": {
        "distribuicao": "30.0%",
        "importancia": "ALTO"
      },
      "Noções de comando e controle": {
        "distribuicao": "20.0%",
        "importancia": "MÉDIO"
      }
    },
    "10 - Perímetros táticos e negociação": {
      "Isolamento, posto de comando e técnicas de negociação": {
        "distribuicao": "100.0%",
        "importancia": "CRÍTICO"
      }
    },
    "11 - Defesa pessoal": {
      "Princípios, bloqueios e uso progressivo da força": {
        "distribuicao": "14.3%",
        "importancia": "MÉDIO"
      },
      "Uso da força: Lei 13.060/2014 e Decreto 12.341/2024": {
        "distribuicao": "28.6%",
        "importancia": "CRÍTICO"
      },
      "Portaria MJSP 855/2025 (Comitê Nacional de Monitoramento do Uso da Força)": {
        "distribuicao": "14.3%",
        "importancia": "MÉDIO"
      },
      "Princípios Básicos de Havana sobre Uso da Força e Armas de Fogo (PBUFAF, 1990)": {
        "distribuicao": "21.4%",
        "importancia": "ALTO"
      },
      "Código de Conduta da ONU (Res. 34/169) e Manual UNODC 2021": {
        "distribuicao": "21.4%",
        "importancia": "ALTO"
      }
    },
    "12 - Direção defensiva e ofensiva": {
      "Direção defensiva (condições e previsão)": {
        "distribuicao": "25.0%",
        "importancia": "MÉDIO"
      },
      "Direção evasiva (comboios e saída de emboscada)": {
        "distribuicao": "50.0%",
        "importancia": "CRÍTICO"
      },
      "Direção ofensiva": {
        "distribuicao": "25.0%",
        "importancia": "MÉDIO"
      }
    },
    "13 - Legislação de trânsito (normas de circulação, infrações e penalidades)": {
      "Normas de circulação e conduta (CTB)": {
        "distribuicao": "14.1%",
        "importancia": "CRÍTICO"
      },
      "Infrações de trânsito": {
        "distribuicao": "10.3%",
        "importancia": "ALTO"
      },
      "Penalidades e medidas administrativas": {
        "distribuicao": "10.3%",
        "importancia": "ALTO"
      },
      "Sistema Nacional de Trânsito e disposições preliminares (CTB, Caps. I e II)": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      },
      "Pedestres, cidadão e educação para o trânsito (CTB, Caps. IV a VI)": {
        "distribuicao": "3.4%",
        "importancia": "BAIXO"
      },
      "Sinalização, engenharia e fiscalização (CTB, Caps. VII e VIII)": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      },
      "Veículos, registro e licenciamento (CTB, Caps. IX a XIII)": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      },
      "Habilitação (CTB, Cap. XIV)": {
        "distribuicao": "10.3%",
        "importancia": "ALTO"
      },
      "Processo administrativo de trânsito (CTB, Cap. XVIII)": {
        "distribuicao": "3.4%",
        "importancia": "BAIXO"
      },
      "Crimes de trânsito (CTB, Cap. XIX)": {
        "distribuicao": "10.3%",
        "importancia": "ALTO"
      },
      "Disposições finais e transitórias (CTB, Cap. XX)": {
        "distribuicao": "3.4%",
        "importancia": "BAIXO"
      },
      "Anexo I do CTB (conceitos e definições)": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      },
      "Resoluções do CONTRAN": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      }
    },
    "14 - Cerimonial público e ordem geral de precedência (Decreto 70.274/1972)": {
      "Ordem geral de precedência": {
        "distribuicao": "60.0%",
        "importancia": "ALTO"
      },
      "Hasteamento da Bandeira Nacional e normas de cerimonial": {
        "distribuicao": "40.0%",
        "importancia": "MÉDIO"
      }
    }
  },
  "Segurança Orgânica": {
    "01 - Prevenção e combate a incêndio": {
      "Elementos do fogo, propagação e classes": {
        "distribuicao": "28.5%",
        "importancia": "CRÍTICO"
      },
      "Extintores, hidrantes e métodos de extinção": {
        "distribuicao": "28.6%",
        "importancia": "CRÍTICO"
      },
      "Plano de evacuação e EPIs": {
        "distribuicao": "14.3%",
        "importancia": "MÉDIO"
      },
      "NR-23 (Portaria MTP 2.769/2022): texto atual e saídas de emergência": {
        "distribuicao": "28.6%",
        "importancia": "CRÍTICO"
      }
    },
    "02 - Primeiros socorros": {
      "Avaliação primária e RCP/DEA": {
        "distribuicao": "20.0%",
        "importancia": "CRÍTICO"
      },
      "Hemorragias, fraturas e manobra de Heimlich": {
        "distribuicao": "20.0%",
        "importancia": "CRÍTICO"
      },
      "Queimaduras, desmaios e transporte de vítima": {
        "distribuicao": "15.0%",
        "importancia": "ALTO"
      },
      "Conceitos, sinalização do local e acionamento de recursos": {
        "distribuicao": "15.0%",
        "importancia": "ALTO"
      },
      "Estado de choque, sinais vitais e avaliação secundária": {
        "distribuicao": "15.0%",
        "importancia": "ALTO"
      },
      "Primeiros socorros no trânsito: motociclista e remoção do capacete": {
        "distribuicao": "15.0%",
        "importancia": "ALTO"
      }
    },
    "03 - Segurança de pessoas": {
      "Condutas preventivas e proteção de autoridades": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "04 - Segurança de instalações e patrimonial": {
      "Barreiras físicas e controle de acesso (biometria)": {
        "distribuicao": "42.8%",
        "importancia": "ALTO"
      },
      "CFTV, sensores e prevenção de perdas": {
        "distribuicao": "28.6%",
        "importancia": "MÉDIO"
      },
      "Emprego de inteligência artificial nos sistemas de proteção": {
        "distribuicao": "28.6%",
        "importancia": "MÉDIO"
      }
    },
    "05 - Segurança de informações (Orgânica)": {
      "Ameaças e códigos maliciosos (ransomware, phishing)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "06 - Defesa pessoal e direção defensiva (Orgânica)": {
      "Revisão de defesa e direção": {
        "distribuicao": "100.0%",
        "importancia": "BAIXO"
      }
    }
  },
  "Normas da Polícia Judicial": {
    "01 - Poder de polícia e atribuições da Polícia Judicial (Res. CNJ 344/2020 e 430/2021)": {
      "Poder de polícia administrativa dos tribunais": {
        "distribuicao": "36.3%",
        "importancia": "CRÍTICO"
      },
      "Atribuições dos agentes e inspetores da Polícia Judicial": {
        "distribuicao": "36.4%",
        "importancia": "CRÍTICO"
      },
      "Instrumentos de menor potencial ofensivo e porte mínimo": {
        "distribuicao": "27.3%",
        "importancia": "ALTO"
      }
    },
    "02 - Política e Sistema Nacional de Segurança do Judiciário (Res. CNJ 435/2021 e 515/2023)": {
      "Política Nacional de Segurança do Poder Judiciário": {
        "distribuicao": "50.0%",
        "importancia": "ALTO"
      },
      "Sistema Nacional de Segurança e comitês de segurança": {
        "distribuicao": "50.0%",
        "importancia": "ALTO"
      }
    },
    "03 - Uniformes e identificação funcional (Res. CNJ 379/2021 e 380/2021)": {
      "Uniformes: social, operacional, de instrutor e de educação física": {
        "distribuicao": "50.0%",
        "importancia": "MÉDIO"
      },
      "Conjunto de identificação e documento de porte de arma institucional": {
        "distribuicao": "50.0%",
        "importancia": "MÉDIO"
      }
    },
    "04 - Sistema de Inteligência de Segurança Institucional (Res. CNJ 383/2021)": {
      "SInSIPJ: estrutura e atribuições": {
        "distribuicao": "100.0%",
        "importancia": "MÉDIO"
      }
    },
    "05 - Porte de arma institucional (Res. CNJ 467/2022 e 566/2024)": {
      "Regulamentação do art. 6º, XI, e do art. 7º-A do Estatuto do Desarmamento": {
        "distribuicao": "50.0%",
        "importancia": "ALTO"
      },
      "Requisitos e condições do porte institucional": {
        "distribuicao": "50.0%",
        "importancia": "ALTO"
      }
    },
    "06 - Res. CSJT 315/2021 e 432/2026 (segurança institucional na Justiça do Trabalho)": {
      "Medidas de segurança e poder de polícia na Justiça do Trabalho": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Armas institucionais: porte, uso, controle e aquisição": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Atribuições dos agentes e Grupo de Apoio à Segurança (GAS)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Alterações da Res. CSJT 315/2021 pela Res. CSJT 432/2026": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    }
  },
  "Direito Penal": {
    "01 - Aplicação da Lei Penal e Princípios do Direito Penal": {
      "Princípios do Direito Penal": {
        "distribuicao": "11.2%",
        "importancia": "ALTO"
      },
      "Tempo e Lugar": {
        "distribuicao": "3.7%",
        "importancia": "BAIXO"
      },
      "Aplicação da Lei Penal no Tempo": {
        "distribuicao": "7.4%",
        "importancia": "MÉDIO"
      },
      "Princípio da Legalidade": {
        "distribuicao": "11.1%",
        "importancia": "ALTO"
      },
      "Lei no Espaço": {
        "distribuicao": "7.4%",
        "importancia": "MÉDIO"
      },
      "Princípio da Insignificância": {
        "distribuicao": "11.1%",
        "importancia": "ALTO"
      },
      "Princípio da Intranscendência": {
        "distribuicao": "3.7%",
        "importancia": "BAIXO"
      },
      "Lei Penal no Tempo": {
        "distribuicao": "7.4%",
        "importancia": "MÉDIO"
      },
      "Aplicação da Lei Penal (regras gerais e interpretação)": {
        "distribuicao": "7.4%",
        "importancia": "MÉDIO"
      },
      "Conflito Aparente de Normas": {
        "distribuicao": "3.7%",
        "importancia": "BAIXO"
      },
      "Penas": {
        "distribuicao": "7.4%",
        "importancia": "MÉDIO"
      },
      "Lei no Tempo": {
        "distribuicao": "7.4%",
        "importancia": "MÉDIO"
      },
      "Tempo e Lugar do Crime": {
        "distribuicao": "3.7%",
        "importancia": "BAIXO"
      },
      "Lei Penal no Espaço (Territorialidade e Extraterritorialidade)": {
        "distribuicao": "7.4%",
        "importancia": "MÉDIO"
      },
      "🆕 Tema 1182/STF – Aplicação retroativa do ANPP a processos sem trânsito em julgado (RE 1.353.385, set/2023)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Aplicação retroativa do ANPP a processos sem trânsito em julgado (set/2023)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "02 - Teoria Geral do Delito - Fato Típico e seus Elementos": {
      "Dolo e Culpa": {
        "distribuicao": "10.5%",
        "importancia": "ALTO"
      },
      "Teoria do Erro (de tipo e de proibição)": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      },
      "Culpabilidade": {
        "distribuicao": "10.3%",
        "importancia": "ALTO"
      },
      "Teoria do Crime": {
        "distribuicao": "10.3%",
        "importancia": "ALTO"
      },
      "Iter Criminis (Consumação, Tentativa, Desistência, Arrependimento)": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      },
      "Conceito de Crime": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      },
      "Conduta (ação e omissão)": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      },
      "Ilicitude (Antijuridicidade e Excludentes)": {
        "distribuicao": "10.3%",
        "importancia": "ALTO"
      },
      "Concurso de Pessoas": {
        "distribuicao": "10.3%",
        "importancia": "ALTO"
      },
      "Concurso de Crimes": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      },
      "Nexo Causal": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      },
      "Conceito Analítico de Crime": {
        "distribuicao": "6.9%",
        "importancia": "MÉDIO"
      },
      "🆕 STJ AgRg no AREsp 2.167.732 – Teoria da Cegueira Deliberada em Lavagem/Crimes Tributários (STJ, out/2022)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 STJ – Teoria da Cegueira Deliberada em Lavagem/Crimes Tributários (STJ, out/2022)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "03 - Ação Penal": {
      "Ação Pública": {
        "distribuicao": "25.0%",
        "importancia": "MÉDIO"
      },
      "Ação Penal (disposições gerais, decadência, renúncia, perdão)": {
        "distribuicao": "25.0%",
        "importancia": "MÉDIO"
      },
      "Ação Privada": {
        "distribuicao": "12.5%",
        "importancia": "BAIXO"
      },
      "Ação Penal Privada (exclusiva, personalíssima, subsidiária)": {
        "distribuicao": "12.5%",
        "importancia": "BAIXO"
      },
      "Ação Penal Pública (incondicionada e condicionada)": {
        "distribuicao": "25.0%",
        "importancia": "MÉDIO"
      },
      "🆕 Súmula 714/STF – Concorrência de legitimidade na ofensa a funcionário público propter officium (STF, set/2003)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "04 - Crimes Contra a Pessoa I (Art. 121 a 136 do CP)": {
      "Homicídio (simples, privilegiado, qualificado, culposo)": {
        "distribuicao": "11.8%",
        "importancia": "CRÍTICO"
      },
      "Omissão de Socorro": {
        "distribuicao": "8.8%",
        "importancia": "ALTO"
      },
      "Lesão Corporal (leve, grave, gravíssima, seguida de morte)": {
        "distribuicao": "8.8%",
        "importancia": "ALTO"
      },
      "Homicídio Qualificado": {
        "distribuicao": "8.8%",
        "importancia": "ALTO"
      },
      "Homicídio Qualificado e Feminicídio": {
        "distribuicao": "8.8%",
        "importancia": "ALTO"
      },
      "Periclitação da Vida e da Saúde (omissão de socorro e correlatos)": {
        "distribuicao": "8.8%",
        "importancia": "ALTO"
      },
      "Crimes contra a Pessoa": {
        "distribuicao": "5.9%",
        "importancia": "MÉDIO"
      },
      "Infanticídio": {
        "distribuicao": "5.9%",
        "importancia": "MÉDIO"
      },
      "Suicídio": {
        "distribuicao": "5.9%",
        "importancia": "MÉDIO"
      },
      "Aborto": {
        "distribuicao": "5.9%",
        "importancia": "MÉDIO"
      },
      "Crimes Contra a Vida (induzimento, infanticídio, aborto)": {
        "distribuicao": "5.9%",
        "importancia": "MÉDIO"
      },
      "🆕 Lei 14.811/2024 – Crime de Bullying e induzimento ao suicídio em redes (Lei 14811, 2024)": {
        "distribuicao": "5.9%",
        "importancia": "MÉDIO"
      },
      "🆕 Lei 14.811/2024 – Bullying como crime e induzimento ao suicídio em redes sociais (Lei 14.811, jan/2024)": {
        "distribuicao": "5.9%",
        "importancia": "MÉDIO"
      },
      "Rixa": {
        "distribuicao": "2.9%",
        "importancia": "BAIXO"
      }
    },
    "05 - Dos crimes contra a pessoa II - Art. 138 a 153 do CP": {
      "Crime de Perseguição (Stalking)": {
        "distribuicao": "9.0%",
        "importancia": "ALTO"
      },
      "Crimes contra a Honra (calúnia, difamação, injúria)": {
        "distribuicao": "9.4%",
        "importancia": "ALTO"
      },
      "Inviolabilidade de Domicílio": {
        "distribuicao": "9.4%",
        "importancia": "ALTO"
      },
      "Crime de Perseguição – Stalking (Art. 147-A)": {
        "distribuicao": "9.4%",
        "importancia": "ALTO"
      },
      "Crimes contra a Liberdade Individual (constrangimento ilegal, ameaça, sequestro)": {
        "distribuicao": "9.4%",
        "importancia": "ALTO"
      },
      "🆕 Tema 1055/STF – Inviolabilidade de domicílio e licitude da entrada policial sem mandado (RE 1.342.077, mar/2021)": {
        "distribuicao": "9.4%",
        "importancia": "ALTO"
      },
      "Liberdade Pessoal": {
        "distribuicao": "6.3%",
        "importancia": "MÉDIO"
      },
      "Crimes contra a Inviolabilidade do Domicílio, Correspondência e Segredo": {
        "distribuicao": "6.3%",
        "importancia": "MÉDIO"
      },
      "Crimes contra Agentes Públicos e Liberdade Individual": {
        "distribuicao": "6.3%",
        "importancia": "MÉDIO"
      },
      "🆕 Inviolabilidade de domicílio e licitude da entrada policial sem mandado (mar/2021)": {
        "distribuicao": "6.3%",
        "importancia": "MÉDIO"
      },
      "Violência Psicológica contra a Mulher (Art. 147-B)": {
        "distribuicao": "3.1%",
        "importancia": "BAIXO"
      },
      "Sequestro, Trabalho Análogo ao de Escravo e Tráfico de Pessoas (Arts. 148 a 149-A)": {
        "distribuicao": "3.1%",
        "importancia": "BAIXO"
      },
      "Denunciação Caluniosa": {
        "distribuicao": "6.3%",
        "importancia": "MÉDIO"
      },
      "Furto": {
        "distribuicao": "6.3%",
        "importancia": "MÉDIO"
      }
    },
    "06 - Crimes contra o Patrimônio": {
      "Furto (simples, qualificado, privilegiado, noturno)": {
        "distribuicao": "6.9%",
        "importancia": "ALTO"
      },
      "Apropriação Indébita": {
        "distribuicao": "6.7%",
        "importancia": "ALTO"
      },
      "Roubo Majorado": {
        "distribuicao": "6.7%",
        "importancia": "ALTO"
      },
      "Estelionato": {
        "distribuicao": "6.7%",
        "importancia": "ALTO"
      },
      "Extorsão": {
        "distribuicao": "6.7%",
        "importancia": "ALTO"
      },
      "Receptação": {
        "distribuicao": "6.7%",
        "importancia": "ALTO"
      },
      "Roubo": {
        "distribuicao": "6.7%",
        "importancia": "ALTO"
      },
      "Roubo e Roubo Majorado": {
        "distribuicao": "6.7%",
        "importancia": "ALTO"
      },
      "Extorsão mediante Sequestro": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "Crimes em Espécie": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "Cheque sem Fundos": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "Crimes contra o Patrimônio": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "Imunidades Penais": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "Disposições Gerais": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "Disposições Gerais dos Crimes contra o Patrimônio": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "Extorsão e Extorsão Mediante Sequestro": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "Imunidades Penais Absolutas e Relativas (Art. 181 e 182)": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "🆕 Lei 13.964/2019 – Estelionato como ação penal pública condicionada à representação (Lei 13.964, dez/2019)": {
        "distribuicao": "4.4%",
        "importancia": "MÉDIO"
      },
      "Dano e Usurpação (Arts. 161 a 167)": {
        "distribuicao": "2.2%",
        "importancia": "BAIXO"
      }
    },
    "07 - Crimes Contra a Dignidade Sexual": {
      "Estupro de Vulnerável": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Estupro": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Dignidade Sexual": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Fraude Sexual": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Ação Penal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Assédio Sexual (Art. 216-A)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Exploração Sexual": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Causas de Aumento de Pena": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Corrupção de Menores": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Legislação Especial": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Leis Penais Especiais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Lei 14.245/2021 – Lei Mariana Ferrer, coação no curso do processo (Lei 14.245, nov/2021)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Causas de Aumento de Pena nos Crimes Sexuais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Estupro e Estupro de Vulnerável": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Dignidade Sexual (disposições gerais e classificação)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Violação Sexual Mediante Fraude (Art. 215)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Ação Penal nos Crimes Sexuais (pública incondicionada – Lei 13.718/2018)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Corrupção de Menores e Satisfação de Lascívia": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "08 - Dos Crimes Contra a Fé Pública": {
      "Moeda Falsa (Art. 289)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Fé Pública": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Falsificação de Documento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Consunção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Falsidade Documental (pública e particular – Art. 297-298)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Falsa Identidade (Art. 307)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Falsidade Ideológica (Art. 299)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Adulteração": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Saúde Pública": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Ordem Tributária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Insignificância": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Administração Pública": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Adulteração de Sinal Identificador de Veículo (Art. 311)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Disposições Gerais dos Crimes contra a Fé Pública": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Súmula 104/STJ – Competência da Justiça Estadual para falsificação visando sonegar tributo estadual (STJ, mai/1994, cobrada em provas recentes)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Consunção na Fé Pública (falso x crime-fim)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Uso de Documento Falso (Art. 304)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "09 - Crimes Contra a Administração Pública": {
      "Corrupção Passiva": {
        "distribuicao": "4.1%",
        "importancia": "CRÍTICO"
      },
      "Peculato (próprio, impróprio, culposo, mediante erro de outrem)": {
        "distribuicao": "5.0%",
        "importancia": "CRÍTICO"
      },
      "Desacato": {
        "distribuicao": "5.0%",
        "importancia": "CRÍTICO"
      },
      "Resistência, Desobediência e Desacato (crimes praticados por particular)": {
        "distribuicao": "5.0%",
        "importancia": "CRÍTICO"
      },
      "Advocacia Administrativa": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Crimes Praticados por Funcionários Públicos": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Concussão": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Resistência": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Sigilo Funcional": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Tráfico Influência": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Corrupção": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Condescendência Criminosa": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Disposições Gerais": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Corrupção Ativa e Passiva (visão integrada)": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Advocacia Administrativa e Violação de Sigilo Funcional": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Tráfico de Influência e Exploração de Prestígio": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Crimes Praticados por Funcionário Público em Geral (Art. 312-327)": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Crimes Practicados por Funcionário Público em Geral (Art. 312-327)": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Condescendência Criminosa e Prevaricação": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Concussão e Corrupção Passiva": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Crimes contra a Administração Pública": {
        "distribuicao": "2.5%",
        "importancia": "MÉDIO"
      },
      "🆕 Súmula 599/STJ – Inaplicabilidade da insignificância aos crimes contra a Administração Pública (STJ, nov/2017)": {
        "distribuicao": "2.5%",
        "importancia": "MÉDIO"
      },
      "Sonegação Previdenciária": {
        "distribuicao": "1.3%",
        "importancia": "BAIXO"
      },
      "Conceito de Funcionário Público (Art. 327)": {
        "distribuicao": "3.8%",
        "importancia": "ALTO"
      },
      "Violência Arbitrária, Abandono de Função e Exercício Funcional Ilegal (Arts. 322 a 324)": {
        "distribuicao": "2.5%",
        "importancia": "MÉDIO"
      },
      "Usurpação de Função Pública, Contrabando e Descaminho (Arts. 328, 334 e 334-A)": {
        "distribuicao": "2.5%",
        "importancia": "MÉDIO"
      },
      "Peculato Eletrônico, Extravio de Documento e Emprego Irregular de Verbas (Arts. 313-A, 313-B, 314 e 315)": {
        "distribuicao": "2.5%",
        "importancia": "MÉDIO"
      },
      "Falso Testemunho": {
        "distribuicao": "2.5%",
        "importancia": "MÉDIO"
      }
    },
    "10 - Crimes contra a Administração Pública - Capítulo II-A e Capítulo II-B": {
      "Licitações": {
        "distribuicao": "20.0%",
        "importancia": "CRÍTICO"
      },
      "Crimes em Licitações e Contratos Administrativos (Art. 337-E a 337-P CP)": {
        "distribuicao": "15.0%",
        "importancia": "ALTO"
      },
      "🆕 Lei 14.133/2021 – Nova Lei de Licitações e tipos penais transferidos para o CP (Lei 14.133, abr/2021)": {
        "distribuicao": "15.0%",
        "importancia": "ALTO"
      },
      "Corrupção Internacional": {
        "distribuicao": "10.0%",
        "importancia": "MÉDIO"
      },
      "Exploração Prestígio": {
        "distribuicao": "10.0%",
        "importancia": "MÉDIO"
      },
      "Corrupção Internacional Ativa": {
        "distribuicao": "10.0%",
        "importancia": "MÉDIO"
      },
      "Crimes Praticados por Particular contra Administração Pública Estrangeira (Art. 337-B a 337-D)": {
        "distribuicao": "10.0%",
        "importancia": "MÉDIO"
      },
      "Crimes Practicados por Particular contra Administração Pública Estrangeira (Art. 337-B a 337-D)": {
        "distribuicao": "10.0%",
        "importancia": "MÉDIO"
      }
    },
    "11 - Crimes contra as Finanças Públicas": {
      "Finanças Públicas": {
        "distribuicao": "15.0%",
        "importancia": "ALTO"
      },
      "Contratação de Operação de Crédito Irregular (Art. 359-A)": {
        "distribuicao": "15.0%",
        "importancia": "ALTO"
      },
      "Inscrição de Despesa Não Empenhada e Assunção de Obrigação no Último Ano de Mandato": {
        "distribuicao": "15.0%",
        "importancia": "ALTO"
      },
      "Ordenação de Despesa Não Autorizada e Oferta Pública de Crédito sem Autorização": {
        "distribuicao": "15.0%",
        "importancia": "ALTO"
      },
      "Crimes contra as Finanças Públicas (Art. 359-A a 359-H – Lei 10.028/2000)": {
        "distribuicao": "15.0%",
        "importancia": "ALTO"
      },
      "Crimes contra a Administração Pública": {
        "distribuicao": "5.0%",
        "importancia": "BAIXO"
      },
      "Exploração Prestígio": {
        "distribuicao": "5.0%",
        "importancia": "BAIXO"
      },
      "Falso Testemunho": {
        "distribuicao": "5.0%",
        "importancia": "BAIXO"
      },
      "🆕 Lei Complementar 178/2021 – Reflexos na responsabilização fiscal de gestores (LC 178, jan/2021)": {
        "distribuicao": "10.0%",
        "importancia": "MÉDIO"
      }
    },
    "12 - Crimes contra a Administração da Justiça": {
      "Exercício Arbitrário": {
        "distribuicao": "8.4%",
        "importancia": "ALTO"
      },
      "Favorecimento": {
        "distribuicao": "8.6%",
        "importancia": "ALTO"
      },
      "Denunciação Caluniosa (Art. 339)": {
        "distribuicao": "8.6%",
        "importancia": "ALTO"
      },
      "Coação Processual": {
        "distribuicao": "8.6%",
        "importancia": "ALTO"
      },
      "Coação no Curso do Processo (Art. 344)": {
        "distribuicao": "8.6%",
        "importancia": "ALTO"
      },
      "Exercício Arbitrário das Próprias Razões (Art. 345-346)": {
        "distribuicao": "8.6%",
        "importancia": "ALTO"
      },
      "Favorecimento Pessoal e Favorecimento Real (Art. 348-349)": {
        "distribuicao": "8.6%",
        "importancia": "ALTO"
      },
      "Fraude Processual e Sonegação Probatória (Art. 347)": {
        "distribuicao": "8.6%",
        "importancia": "ALTO"
      },
      "Sonegação Probatória": {
        "distribuicao": "5.7%",
        "importancia": "MÉDIO"
      },
      "Disposições Gerais": {
        "distribuicao": "5.7%",
        "importancia": "MÉDIO"
      },
      "Exploração Prestígio": {
        "distribuicao": "5.7%",
        "importancia": "MÉDIO"
      },
      "Disposições Gerais do Capítulo (Falsa Identidade Processual, Auto-acusação Falsa)": {
        "distribuicao": "5.7%",
        "importancia": "MÉDIO"
      },
      "Falso Testemunho e Comunicação Falsa de Crime (Arts. 340 e 342)": {
        "distribuicao": "5.7%",
        "importancia": "MÉDIO"
      },
      "Fuga de Preso, Evasão e Motim (Arts. 351 a 354)": {
        "distribuicao": "2.9%",
        "importancia": "BAIXO"
      },
      "🆕 Lei 12.850/2013 – Obstrução de Justiça em Organização Criminosa (Lei 12.850, ago/2013)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "13 - Dos crimes contra o estado democrático de direito": {
      "Soberania Nacional": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Estado Democrático": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Processo Eleitoral": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sabotagem (Art. 359-R)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Disposições Gerais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra o Funcionamento das Instituições Democráticas no Processo Eleitoral": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Lei 14.197/2021 – Revogação da Lei de Segurança Nacional e novos crimes democráticos (Lei 14.197, set/2021)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Soberania Nacional (Art. 359-I a 359-L)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Disposições Gerais e Aplicação do Título XII": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra as Instituições Democráticas (Art. 359-L a 359-R)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "14 - Lei 8137_1990 - Crimes Contra Ordem Tributaria - Bloco 01": {
      "Crimes contra a Ordem Tributária – Art. 1º (condutas e elementares)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção da Punibilidade pelo Pagamento e Parcelamento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Apropriação Indébita Tributária (ICMS declarado e não pago)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24/STF (prévio lançamento definitivo para Art. 1º, I-IV)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Causas de Aumento de Pena (Art. 12 da Lei 8.137/90)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Formais x Materiais na Lei 8.137/90": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Responsabilidade Penal de Administradores, Sócios e Concurso de Agentes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 RHC 163.334/SC – Apropriação indébita de ICMS declarado e não pago configura crime (STF, dez/2019)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Suspensão da Pretensão Punitiva (Art. 9º Lei 10.684/2003)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Ordem Tributária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Apropriação Indébita Tributária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção da Punibilidade pelo Pagamento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Causas de Aumento de Pena": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção da Punibilidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Formais vs Materiais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Responsabilidade dos Administradores": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Condutas do Artigo 1º": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24 e Consumação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção da Punibilidade e Parcelamento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "ICMS e Apropriação Indébita": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes de Funcionários": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Dolo nos Crimes Tributários": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Insignificância nos Crimes Tributários": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Suspensão da Pretensão Punitiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Responsabilidade Penal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Penas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "15 - Lei 8137_1990 - Crimes Contra Ordem Tributaria - Bloco 02": {
      "Crimes Contra a Ordem Tributária – Condutas do Art. 1º e Art. 2º (visão integrada)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24/STF e Lançamento Definitivo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Formais (Art. 2º) x Crimes Materiais (Art. 1º)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção da Punibilidade pelo Pagamento, Parcelamento e Suspensão": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Insignificância e Patamar de R$ 20.000,00 (tributos federais e estaduais)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Causas de Aumento de Pena (Art. 12)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Apropriação Indébita Tributária – ICMS Próprio Declarado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concurso de Pessoas, Sujeito Ativo e Crimes Funcionais da Lei 8.137/90": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 RHC 163.334 ED/SC – Requisitos subjetivos (dolo de apropriação e contumácia) (STF, ago/2020)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Ação Penal e Representação Fiscal para Fins Penais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Ordem Tributária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Causas de Aumento de Pena": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Insignificância nos Crimes Tributários": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Formais vs Materiais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Formais (Artigo 2º)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção da Punibilidade e Parcelamento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção da Punibilidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Apropriação Indébita Tributária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes de Funcionários": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sujeitos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Suspensão da Pretensão Punitiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Condutas do Artigo 1º": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concurso de Pessoas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção da Punibilidade pelo Pagamento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Funcionais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "ICMS e Apropriação Indébita": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Dolo nos Crimes Tributários": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Ação Penal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes de Particulares": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "16 - Lei 8137_1990 - Crimes Contra Ordem Tributaria - Bloco 03": {
      "Apropriação Indébita Tributária (ICMS próprio declarado e não recolhido)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "ICMS e Substituição Tributária na Apropriação Indébita": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Contra a Ordem Tributária – Estrutura típica integrada": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção da Punibilidade pelo Pagamento Integral": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Formais do Art. 2º e Súmula Vinculante 24": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Dolo Específico, Contumácia e Animus Rem Sibi Habendi": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Consunção entre Falsidade e Sonegação Fiscal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Súmula Vinculante 24/STF – Lançamento definitivo como condição objetiva (STF, dez/2009, cobrada em todas as provas recentes SEFAZ)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Responsabilidade Penal de Administradores e Continuidade Delitiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Apropriação Indébita Tributária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "ICMS e Apropriação Indébita": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Ordem Tributária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção da Punibilidade pelo Pagamento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Formais (Artigo 2º)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Dolo nos Crimes Tributários": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Formais vs Materiais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Responsabilidade dos Administradores": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção da Punibilidade e Parcelamento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção da Punibilidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sujeitos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Continuidade Delitiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Apropriação Indébita Previdenciária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Insignificância nos Crimes Tributários": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Consunção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Falsidade Ideológica vs Crime Tributário": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lançamento Definitivo e Tipicidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24 e Consumação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "17 - Lei 8137_1990 - Crimes Contra Ordem Tributaria - Bloco 04": {
      "Crimes contra a Ordem Tributária – Visão Sistêmica do Art. 1º": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Apropriação Indébita Tributária e Consumação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Consunção entre Falso e Sonegação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24/STF – Marco da Consumação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção da Punibilidade pelo Pagamento e Parcelamento Especial": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Formais (Art. 2º) e Cumulação com o Art. 1º": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Causas de Aumento de Pena e Dosimetria nos Crimes Tributários": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Insignificância e Limite de R$ 20.000,00 (tributos federais)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Responsabilidade Penal e Concurso de Agentes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Insignificância no Contrabando/Descaminho exige análise da reiteração (STJ, set/2021)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Ordem Tributária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Consunção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Causas de Aumento de Pena": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção da Punibilidade pelo Pagamento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Formais (Artigo 2º)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Apropriação Indébita Tributária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Consumação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Insignificância nos Crimes Tributários": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Praticados por Funcionários Públicos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24 e Consumação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Responsabilidade dos Administradores": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção da Punibilidade e Parcelamento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção da Punibilidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Funcionais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Prescrição": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Dolo nos Crimes Tributários": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Competência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Responsabilidade Penal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Penas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "18 - Lei 8137_1990 - Crimes Contra Ordem Tributaria - Bloco 05": {
      "Crimes Contra a Ordem Tributária – Síntese e Disposições Penais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Praticados por Particulares (Art. 1º e 2º)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Praticados por Funcionários Públicos (Art. 3º Lei 8.137/90)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Penas, Causas de Aumento e Dosimetria nos Crimes Tributários": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Consumação, Súmula Vinculante 24 e Marco Temporal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção da Punibilidade pelo Pagamento, Parcelamento e Lei 10.684/2003": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Formais x Materiais – Tipologia do Art. 1º e Art. 2º": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Consunção e Falsidade na Sonegação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Contra a Ordem Econômica e Tributária (visão interfederativa)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Autonomia do crime tributário frente à lavagem de dinheiro (STJ, ago/2021)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Ordem Tributária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Particulares": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Penas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sujeitos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Formais vs Materiais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção Punibilidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Consumação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Condutas do Artigo 1º": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Causas de Aumento de Pena": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção da Punibilidade pelo Pagamento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Processo Penal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção da Punibilidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Apropriação Indébita Tributária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Consumação e Súmula Vinculante 24": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Insignificância nos Crimes Tributários": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Praticados por Funcionários Públicos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Consunção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Contra a Ordem Econômica": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Classificação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Disposições Gerais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Funcionários": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Responsabilidade Penal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24 e Consumação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "19 - Sumulas de Direito Penal - Parte 1": {
      "Súmulas sobre Lei Penal no Tempo (lex mitior, abolitio criminis, irretroatividade)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Princípio da Insignificância e Consunção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Apropriação Indébita Previdenciária e Tributária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Dosimetria da Pena e Maus Antecedentes (Súmula 444/STJ)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Crimes contra a Ordem Tributária (Insignificância e Patamares)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Atenuantes, Confissão Espontânea e Reincidência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Crimes contra o Patrimônio (Furto Privilegiado, Latrocínio, Roubo)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Súmula 17/STJ – Falso absorvido pelo crime de sonegação fiscal quando nele se exaure a potencialidade lesiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Competência em Crimes Penais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Crime Impossível, Flagrante Preparado e Falsa Identidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lei Penal no Tempo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Consunção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Dosimetria da Pena": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Confissão Espontânea": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Insignificância": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Apropriação Indébita Previdenciária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lei Maria da Penha": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Atenuantes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Maus Antecedentes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Processo Penal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Ordem Tributária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Pena de Multa": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Restituição de Coisas Apreendidas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Moeda Falsa": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Regime Prisional": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Insignificância nos Crimes Tributários": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Prisão Civil": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Contrabando e Descaminho": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Furto e Monitoramento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Prescrição no Crime Continuado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Falsa Identidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Descaminho e Insignificância": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Reincidência e Regime": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Competência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crime Impossível e Flagrante Preparado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Peculato": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Roubo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Estupro de Vulnerável": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Juizados Especiais Criminais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Competência e Ilícitos Penais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Latrocínio": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Furto Qualificado-Privilegiado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Súmula 560/STJ – Absorção do falso pelo crime de sonegação fiscal quando exaurido (STJ, dez/2015)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "20 - Sumulas de Direito Penal - Parte 2": {
      "Súmulas sobre Regime Prisional, Progressão e Reincidência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Princípio da Insignificância e Consunção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Confissão Espontânea e Atenuantes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Crimes contra o Patrimônio (Roubo, Furto, Latrocínio)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Crime Impossível, Flagrante Preparado e Lei Penal no Tempo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Crimes contra a Ordem Tributária e Insignificância Fiscal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Prisão Preventiva, Algemas e Direito de Defesa": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Tema 990/STF – Compartilhamento de RIF do COAF com MP sem autorização judicial (RE 1.055.941, nov/2019)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Lavagem de Dinheiro e Competência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Dosimetria, Maus Antecedentes e Aplicação da Pena": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Regime Prisional": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Confissão Espontânea": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Insignificância": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lavagem de Dinheiro": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lei Maria da Penha": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Atenuantes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Competência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crime Impossível e Flagrante Preparado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Prisão Preventiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Roubo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção da Punibilidade pelo Pagamento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Ordem Tributária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Direito de Defesa": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Tráfico de Drogas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas dos Tribunais Superiores": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Uso de Algemas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lei Penal no Tempo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Progressão de Regime": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Consunção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Corrupção de Menores": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lei de Drogas - Tráfico Privilegiado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Furto e Monitoramento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Falsa Identidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Suspensão Condicional do Processo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Dosimetria da Pena": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Reincidência e Regime": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Peculato": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Estupro de Vulnerável": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Aplicação da Pena": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Insignificância em Crimes Fiscais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Latrocínio": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Furto Qualificado-Privilegiado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Maus Antecedentes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Violência Doméstica": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "21 - Sumulas de Direito Penal - Parte 3": {
      "Súmula Vinculante 24/STF (lançamento definitivo no crime material tributário)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Apropriação Indébita Previdenciária e Tributária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Princípio da Consunção e Insignificância": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Competência em Crimes Federais e Estaduais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Insignificância nos Crimes Tributários e Descaminho": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Dosimetria da Pena, Confissão e Atenuantes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Lei Penal no Tempo e Prescrição": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Crime Impossível, Flagrante Preparado e Execução Penal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Parcelamento ou pagamento após recebimento da denúncia (STJ, jun/2021)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas Diversas (Reincidência, Regime, Peculato, Estelionato)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Apropriação Indébita Previdenciária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Consunção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Súmula 653/STJ – Parcelamento/Pagamento de tributo após recebimento da denúncia (STJ, 2021)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Competência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Insignificância": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Prescrição": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Atenuantes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Insignificância e Reiteração Delitiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "ECA e Direito Penal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Confissão Espontânea": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Execução Penal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Roubo Majorado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Moeda Falsa": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Regime Prisional": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Investigação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lei Penal no Tempo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Cheque sem Fundos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Insignificância nos Crimes Tributários": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lei Maria da Penha": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Estelionato Previdenciário": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Dosimetria da Pena - Maus Antecedentes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Corrupção de Menores": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Insignificância em Contrabando": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Aplicação da Lei Penal no Tempo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lei de Drogas - Tráfico Privilegiado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Furto e Monitoramento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Falsa Identidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Descaminho e Insignificância": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Suspensão Condicional do Processo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Dosimetria da Pena": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Reincidência e Regime": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crime Impossível e Flagrante Preparado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Peculato": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Estelionato": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Violência Doméstica": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Súmula 653/STJ – Parcelamento ou pagamento após recebimento da denúncia (STJ, jun/2021)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "22 - Sumulas de Direito Penal - Parte 4": {
      "Súmulas sobre Apropriação Indébita Previdenciária e Dolo Específico": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Lei Penal no Tempo e Combinação de Leis (Súmula 501/STJ)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Insignificância em Tributos, Contrabando e Descaminho": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Dosimetria, Maus Antecedentes e Atenuantes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Crimes contra o Patrimônio (Roubo, Latrocínio, Extorsão, Furto)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24 e Aplicação aos Tributos Estaduais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Regime Prisional, Uso de Algemas e Habeas Corpus": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Súmula 648/STJ – Apropriação indébita previdenciária prescinde de dolo específico (STJ, abr/2021)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Princípio da Consunção, Falsa Identidade e Crime Impossível": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas sobre Crimes contra a Administração Pública": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Apropriação Indébita Previdenciária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lei Penal no Tempo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Corrupção de Menores": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Dosimetria da Pena": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Roubo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Uso de Algemas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Regime Prisional": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Contrabando e Descaminho": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Latrocínio": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lavagem de Dinheiro": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Confissão Espontânea": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Direito de Defesa": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Tráfico de Drogas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Execução Penal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Roubo Majorado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Furto Privilegiado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lei Maria da Penha": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Progressão de Regime": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extorsão": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Consunção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Dosimetria da Pena - Maus Antecedentes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Insignificância em Contrabando": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Falsa Identidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Administração Pública": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Suspensão Condicional do Processo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Reincidência e Regime": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crime Impossível e Flagrante Preparado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Insignificância em Crimes Fiscais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extorsão mediante Sequestro": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crime Impossível": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Habeas Corpus e Execução": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Insignificância e Tributos Federais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Intranscendência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Prisão Civil": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Descaminho": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Furto e Monitoramento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Insignificância em Crimes Previdenciários": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Furto Qualificado-Privilegiado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "23 - Informativo Jurisprudencia 774 e 775 STJ": {
      "Lavagem de Dinheiro e Cegueira Deliberada (Info 775)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Peculato e Crimes contra a Administração Pública": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Estelionato, Estelionato Previdenciário e Princípio da Insignificância": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Info 775 STJ – Lavagem de dinheiro com dolo eventual e cegueira deliberada (STJ, abr/2023)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24 e Crimes contra a Ordem Tributária no Info 774/775": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concussão, Gestão Temerária e Crimes Funcionais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Apropriação Indébita Previdenciária e Continuidade Delitiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Acordo de Não Persecução Penal (ANPP) – requisitos no Info 774/775": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Provas, Busca e Apreensão e Prisão Preventiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Insignificância em Contrabando, Descaminho e Reiteração": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lavagem de Dinheiro": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Peculato": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Tráfico de Drogas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lei de Drogas - Tráfico Privilegiado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Estelionato": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Provas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Estatuto do Desarmamento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Prescrição": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Apropriação Indébita Previdenciária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Estelionato Previdenciário": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Gestão Temerária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Acordo de Não Persecução Penal (ANPP)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Receptação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concussão": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Prisão Preventiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Regime Prisional": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Dosimetria da Pena - Maus Antecedentes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Descaminho": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Insignificância em Contrabando": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Descaminho e Insignificância": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Competência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Estupro de Vulnerável": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Insignificância": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Ordem Tributária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "24 - Informativo Jurisprudencia 776 STJ": {
      "Lavagem de Dinheiro e Crimes Antecedentes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Insignificância e Reiteração Delitiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Ordem Tributária e Dolo no Info 776": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Info 776 STJ – Requisitos para prisão preventiva em crimes de colarinho branco (STJ, mai/2023)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Moeda Falsa e Princípio da Consunção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Apropriação Indébita Previdenciária e Progressão de Regime": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Provas, Busca Domiciliar e Prisão em Flagrante": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Desobediência, Medidas Protetivas e Lei Maria da Penha": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Roubo e Arma Branca, Acordo de Não Persecução Penal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Falsidade Ideológica e Princípio da Consunção (falso x sonegação)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lavagem de Dinheiro": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Insignificância": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Ordem Tributária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Moeda Falsa": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Provas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Estatuto do Desarmamento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Apropriação Indébita Previdenciária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Progressão de Regime": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Consunção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Desobediência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lei de Drogas - Tráfico Privilegiado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Roubo e Arma Branca": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Ambientais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Tráfico de Drogas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crime de Desobediência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Furto": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Dolo nos Crimes Tributários": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Prescrição": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Descaminho": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Insignificância em Contrabando": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Prisão em Flagrante": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Acordo de Não Persecução Penal (ANPP)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Aplicação da Lei Penal no Tempo": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Falsidade Ideológica": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Dosimetria da Pena": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Prisão Preventiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Corrupção Passiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lavagem de Dinheiro e Crime Tributário": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Colaboração Premiada": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Desobediência e Medidas Protéticas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "25 - Informativo Jurisprudencia 777 STJ": {
      "Lavagem de Dinheiro e Sigilo Bancário (Info 777)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Acordo de Não Persecução Penal (ANPP) – cabimento e requisitos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Insignificância e Reiteração": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Info 777 STJ – Quebra de sigilo bancário em conta titularizada por município/prefeitura (STJ, jun/2023)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Estelionato e Furto – Competência Processual": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concurso de Crimes e Princípio da Consunção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Corrupção Passiva, Peculato e Progressão de Regime": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Colaboração Premiada e Sigilo Bancário do MP": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Busca e Apreensão Domiciliar e Inviolabilidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24 e Crimes contra a Ordem Tributária no Info 777": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lavagem de Dinheiro": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Insignificância": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Furto": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Competência Processual": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Acordo de Não Persecução Penal (ANPP)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lei de Drogas - Tráfico Privilegiado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concurso de Crimes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Estelionato": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Execução Penal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Busca e Apreensão Domiciliar": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Progressão de Regime": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Dosimetria da Pena": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Reincidência e Regime": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Estupro de Vulnerável": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Corrupção Passiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Colaboração Premiada": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sigilo Bancário": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Ordem Tributária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Confissão Espontânea": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Prescrição": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Inviolabilidade de Domicílio": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "26 - Informativo Jurisprudencia 778 STJ": {
      "Lavagem de Dinheiro e Princípio da Consunção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24 e Crimes contra a Ordem Tributária no Info 778": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Peculato, Concussão e Crimes contra Administração": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Abuso de Autoridade e Dolo Específico": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Info 778 STJ – Crime de abuso de autoridade exige demonstração do dolo específico (STJ, jun/2023)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Execução Penal e Progressão de Regime": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Falsidade Ideológica versus Crime Tributário (autonomia ou consunção)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Apropriação Indébita Previdenciária e Continuidade Delitiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Moeda Falsa e Princípio da Insignificância": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concurso de Crimes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Execução Penal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lavagem de Dinheiro": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Consunção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Ordem Tributária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Tráfico de Drogas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Moeda Falsa": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Abuso de Autoridade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Progressão de Regime": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lei de Drogas - Tráfico Privilegiado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concussão": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Peculato": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Prescrição": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Dolo nos Crimes Tributários": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Continuidade Delitiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Apropriação Indébita Previdenciária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Insignificância nos Crimes Tributários": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Falsidade Ideológica vs Crime Tributário": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Descaminho e Insignificância": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lavagem de Dinheiro e Crime Tributário": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção da Punibilidade pelo Pagamento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "27 - Informativo Jurisprudencia 779 STJ": {
      "Crimes contra a Ordem Tributária e Falsidade Ideológica (consunção)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lavagem de Dinheiro e Concurso com Crime Tributário": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24 e Marco da Consumação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Colaboração Premiada – Requisitos e Validade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Info 779 STJ – Absorção da falsidade ideológica pela sonegação fiscal em notas frias (STJ, jul/2023)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Provas, Nulidades Processuais e Falsidade Documental": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção da Punibilidade pelo Pagamento e Parcelamento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Prescrição no Crime Continuado e nos Crimes Tributários": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Inviolabilidade de Domicílio e Prisão Preventiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Ordem Tributária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lavagem de Dinheiro": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Colaboração Premiada": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Provas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Insignificância e Reiteração Delitiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Falsidade Documental": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção da Punibilidade e Parcelamento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Prescrição no Crime Continuado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção da Punibilidade pelo Pagamento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Ambientais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Confissão Espontânea": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Execução Penal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Roubo Majorado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Nulidades Processuais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Furto": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Honra": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lei de Drogas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Insignificância nos Crimes Tributários": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lei Maria da Penha": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lei de Drogas - Tráfico Privilegiado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concurso de Crimes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Falsidade Ideológica vs Crime Tributário": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Inviolabilidade de Domicílio": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Nulidades": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Prisão Preventiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24 e Consumação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Insignificância": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "28 - Informativo Jurisprudencia 780 STJ": {
      "Prescrição e Suspensão da Pretensão Punitiva em Parcelamento Fiscal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Info 780 STJ – Suspensão da pretensão punitiva e prescrição em parcelamento fiscal (STJ, jul/2023)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípios do Direito Penal e Reserva Legal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24 e Crimes contra a Ordem Tributária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lavagem de Dinheiro e Crimes Antecedentes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Dosimetria da Pena, Maus Antecedentes e Reincidência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Acordo de Não Persecução Penal (ANPP) e Colaboração Premiada": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Consunção e Princípio da Insignificância": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Execução Penal, Pena e Regime Prisional": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concurso de Crimes, Concurso de Pessoas e Culpabilidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Prescrição": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípios": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lavagem de Dinheiro": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Dosimetria da Pena": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Execução Penal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Consunção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Competência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Prisão Preventiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "ANPP": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Colaboração Premiada": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Violência Doméstica": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Processo Penal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Ordem Tributária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concurso Crimes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Prisão": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Provas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Roubo Majorado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmulas do STJ": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concurso Pessoas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Dosimetria da Pena - Maus Antecedentes": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Culpabilidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Roubo e Arma Branca": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Insignificância e Reiteração Delitiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes de Trânsito": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Pena": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Reincidência e Regime": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Contra Vida": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Sexuais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Insignificância": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Denunciação Caluniosa": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Fé Pública": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "29 - Informativo Jurisprudencia 783 784 785 786 STJ": {
      "Lavagem de Dinheiro e Crimes Antecedentes Tributários": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Estelionato, Estelionato Previdenciário e Princípio da Insignificância": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Ordem Tributária e Compartilhamento Fiscal/MP": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lei de Drogas, Tráfico Privilegiado e Causas de Diminuição": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Peculato, Concussão e Crimes Funcionais (Licitações inclusive)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Info 785 STJ – Compartilhamento e representação fiscal para fins penais entre Receita e MP (STJ, ago/2023)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Apropriação Indébita Previdenciária e Extinção da Punibilidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "ICMS e Apropriação Indébita Tributária (ICMS próprio)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Acordo de Não Persecução Penal (ANPP) e Colaboração Premiada": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Gestão Temerária, Crimes Financeiros e Abuso de Autoridade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lavagem de Dinheiro": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Estelionato": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lei de Drogas - Tráfico Privilegiado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Peculato": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção da Punibilidade e Parcelamento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Apropriação Indébita Previdenciária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Licitações": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Concussão": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Violência Doméstica": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Ordem Tributária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "ICMS e Apropriação Indébita": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Dolo nos Crimes Tributários": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Abuso de Autoridade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lei de Drogas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lei Maria da Penha": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Estelionato Previdenciário": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Consunção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Gestão Temerária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Insignificância em Contrabando": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Acordo de Não Persecução Penal (ANPP)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Insignificância e Reiteração Delitiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Falsificação de Documento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Financeiros": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Competência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Corrupção Passiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Colaboração Premiada": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Insignificância": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "30 - Informativo Jurisprudencia 787 788 789 790 791 792 STJ": {
      "Crimes contra a Ordem Tributária e Súmula Vinculante 24": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lavagem de Dinheiro e Crime Antecedente Tributário": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Estelionato Previdenciário, Apropriação Indébita Previdenciária e Confissão": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Peculato e Crimes contra a Administração Pública": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Falsidade Ideológica versus Crime Tributário (consunção)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Recebimento de denúncia baseada apenas em dados do COAF (nov/2022)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Descaminho, Insignificância e Contrabando": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Moeda Falsa e Crimes contra a Fé Pública": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Execução Penal, Prescrição e Reincidência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Ordem Tributária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lavagem de Dinheiro": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Estelionato Previdenciário": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Peculato": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Confissão Espontânea": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Execução Penal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Moeda Falsa": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Apropriação Indébita Previdenciária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lei de Drogas - Tráfico Privilegiado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Falsidade Ideológica vs Crime Tributário": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Descaminho e Insignificância": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Falsidade Ideológica": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Insignificância": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "ECA e Direito Penal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Tráfico de Drogas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Estatuto do Desarmamento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Prescrição": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lei de Drogas": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Fé Pública": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lei Maria da Penha": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Associação Criminosa": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Consunção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Descaminho": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Insignificância em Contrabando": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Insignificância e Reiteração Delitiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Falsa Identidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Saúde Pública": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Reincidência e Regime": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Homicídio Qualificado": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Estupro de Vulnerável": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Estelionato": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24 e Consumação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Contrabando": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crime de Perseguição (Stalking)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Tema 1160/STF – Recebimento de denúncia baseada apenas em dados do COAF (RE 1.357.342, nov/2022)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "31 - Informativo Jurisprudencia 1101 STF": {
      "Sigilo de Dados e Compartilhamento de Informações Fiscais com MP": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Improbidade Administrativa – Reflexos Penais (Lei 14.230/2021)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crime de Perseguição (Stalking) e Lei Maria da Penha": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Liberdade de Expressão e Desacato (descriminalização?)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 ADI 6.649 – Limites do compartilhamento de dados fiscais sigilosos (STF, jun/2022)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Prisão Preventiva, Recursos e Investigação Criminal": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Furto, Descaminho e Princípio da Insignificância": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Juiz das Garantias – Disciplina e Aplicação (Lei 13.964/2019)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Falsidade Ideológica versus Crime Tributário": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Competência em Crimes Federais e Estaduais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sigilo de Dados": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Improbidade Administrativa": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Liberdade de Expressão": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Furto": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lei Maria da Penha": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Sigilo de Dados e Compartilhamento de Informações": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Desacato": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Prisão Preventiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crime de Perseguição (Stalking)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Investigação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Recursos": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Descaminho e Insignificância": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Competência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Jurisprudência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Insignificância em Contrabando": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Falsidade Ideológica vs Crime Tributário": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Insignificância e Reiteração Delitiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Insignificância": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Juiz das Garantias (Informativo 1101 STF)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "32 - Crimes contra finanças publicas e Normais Penais relativas ao servidor público": {
      "Crimes contra as Finanças Públicas": {
        "distribuicao": "37.5%",
        "importancia": "ALTO"
      },
      "Normas Penais relativas ao servidor público": {
        "distribuicao": "37.5%",
        "importancia": "ALTO"
      },
      "Crimes Administrativos": {
        "distribuicao": "25.0%",
        "importancia": "MÉDIO"
      },
      "🆕 Lei 14.230/2021 – Nova Lei de Improbidade Administrativa e reflexos penais (Lei 14.230, out/2021)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "33 - Edicao Extraordinaria 13 STJ": {
      "Apropriação Indébita Tributária – ICMS Declarado e Não Recolhido": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24 – Consumação e Medidas Cautelares Tributárias": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lavagem de Dinheiro e Crime Tributário (autonomia e cegueira deliberada)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção da Punibilidade pelo Pagamento e Parcelamento (Lei 10.684/2003)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Responsabilidade Penal de Administradores, Sócios e Administrador de Fato": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 Cegueira deliberada em ilícitos fiscais de pessoa jurídica (STJ, mar/2021)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Consunção (falso x sonegação) e Continuidade Delitiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Suspensão da Pretensão Punitiva e Prescrição no Parcelamento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Formais (Art. 2º) versus Crimes Materiais (Art. 1º)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lavagem de Dinheiro": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Responsabilidade dos Administradores": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Responsabilidade dos Sócios": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção da Punibilidade pelo Pagamento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Dolo nos Crimes Tributários": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Continuidade Delitiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Insignificância em Tributos Estaduais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Apropriação Indébita Previdenciária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Insignificância nos Crimes Tributários": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Princípio da Consunção": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Descaminho e Insignificância": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Formais vs Materiais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Ordem Tributária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24 e Medidas Cautelares": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes Formais (Artigo 2º)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Extinção da Punibilidade e Parcelamento": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "ICMS e Apropriação Indébita": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Apropriação Indébita Tributária": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Insignificância e Reiteração": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Insignificância e Tributos Federais": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Prescrição": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Medidas Assecuratórias": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a Administração Pública - Edição 13 STJ": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Suspensão da Pretensão Punitiva": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Parcelamento e Prescrição": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Administrador de Fato": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Dosimetria da Pena": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Competência": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Lançamento Definitivo e Tipicidade": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Súmula Vinculante 24 e Consumação": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Causas de Aumento de Pena": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "🆕 HC 598.051/SP – Cegueira deliberada em ilícitos fiscais de pessoa jurídica (STJ, mar/2021)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "34 - Penas, Extinção da Punibilidade e Efeitos da Condenação": {
      "Espécies de penas e cominação": {
        "distribuicao": "27.2%",
        "importancia": "ALTO"
      },
      "Aplicação da pena (dosimetria trifásica)": {
        "distribuicao": "18.2%",
        "importancia": "MÉDIO"
      },
      "Livramento condicional, suspensão condicional da pena e medidas de segurança": {
        "distribuicao": "18.2%",
        "importancia": "MÉDIO"
      },
      "Efeitos da condenação e reabilitação": {
        "distribuicao": "9.1%",
        "importancia": "BAIXO"
      },
      "Extinção da punibilidade e prescrição": {
        "distribuicao": "27.3%",
        "importancia": "ALTO"
      }
    },
    "35 - Crimes contra a Incolumidade Pública e a Paz Pública": {
      "Crimes contra a incolumidade pública": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      },
      "Crimes contra a paz pública": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    }
  },
  "Legislação Penal Especial": {
    "01 - Abuso de autoridade": {
      "Ação penal, efeitos da condenação e dolo específico": {
        "distribuicao": "30.7%",
        "importancia": "CRÍTICO"
      },
      "Condutas: invasão de domicílio, prova ilícita, prisão ilegal": {
        "distribuicao": "30.8%",
        "importancia": "CRÍTICO"
      },
      "Violência institucional (art. 15-A, Lei 14.321/2022)": {
        "distribuicao": "23.1%",
        "importancia": "ALTO"
      },
      "Disposições gerais, sujeitos e procedimento (arts. 1º a 8º e 39 a 45)": {
        "distribuicao": "15.4%",
        "importancia": "MÉDIO"
      }
    },
    "02 - Retenção de documento de identificação": {
      "Regras e penalidades da Lei 5.553/68": {
        "distribuicao": "100.0%",
        "importancia": "MÉDIO"
      }
    },
    "03 - Crimes de racismo": {
      "Injúria racial e incitação (Lei 7.716/89)": {
        "distribuicao": "44.5%",
        "importancia": "CRÍTICO"
      },
      "Imprescritibilidade e regras gerais": {
        "distribuicao": "33.3%",
        "importancia": "ALTO"
      },
      "Crimes em espécie e efeitos da condenação (Lei 7.716/1989 com Lei 14.532/2023)": {
        "distribuicao": "22.2%",
        "importancia": "MÉDIO"
      }
    },
    "04 - Estatuto do Desarmamento e Porte no Judiciário": {
      "Porte de arma institucional (Regras gerais e exceções)": {
        "distribuicao": "28.6%",
        "importancia": "CRÍTICO"
      },
      "Crimes: posse, porte, disparo e comércio ilegal": {
        "distribuicao": "21.4%",
        "importancia": "ALTO"
      },
      "Sinarm, registro e posse (arts. 1º a 5º)": {
        "distribuicao": "21.4%",
        "importancia": "ALTO"
      },
      "Porte de arma de fogo (arts. 6º a 11) e porte funcional em tribunais": {
        "distribuicao": "28.6%",
        "importancia": "CRÍTICO"
      },
      "Resolução Conjunta CNJ/CNMP 4/2014 (Porte p/ agentes do judiciário)": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "05 - Lei de Drogas (Lei 11.343/2006)": {
      "Crimes e penas (arts. 28 a 40)": {
        "distribuicao": "33.4%",
        "importancia": "MÉDIO"
      },
      "Procedimento penal e investigação": {
        "distribuicao": "33.3%",
        "importancia": "MÉDIO"
      },
      "Prevenção, tratamento e disposições gerais": {
        "distribuicao": "33.3%",
        "importancia": "MÉDIO"
      }
    },
    "06 - Crimes Hediondos (Lei 8.072/1990)": {
      "Efeitos e regime de execução": {
        "distribuicao": "50.0%",
        "importancia": "MÉDIO"
      },
      "Rol de crimes hediondos e equiparados": {
        "distribuicao": "50.0%",
        "importancia": "MÉDIO"
      }
    },
    "07 - Crimes de Tortura (Lei 9.455/1997)": {
      "Tipos penais e penas": {
        "distribuicao": "50.0%",
        "importancia": "MÉDIO"
      },
      "Efeitos da condenação, competência e regras gerais": {
        "distribuicao": "50.0%",
        "importancia": "MÉDIO"
      }
    },
    "08 - Organizações Criminosas (Lei 12.850/2013)": {
      "Conceito e crimes": {
        "distribuicao": "33.4%",
        "importancia": "MÉDIO"
      },
      "Colaboração premiada": {
        "distribuicao": "33.3%",
        "importancia": "MÉDIO"
      },
      "Meios de obtenção de prova (infiltração e ação controlada)": {
        "distribuicao": "33.3%",
        "importancia": "MÉDIO"
      }
    },
    "09 - Interceptação Telefônica (Lei 9.296/1996)": {
      "Requisitos e procedimento": {
        "distribuicao": "50.0%",
        "importancia": "MÉDIO"
      },
      "Crime de interceptação ilegal": {
        "distribuicao": "50.0%",
        "importancia": "MÉDIO"
      }
    },
    "10 - Crimes do Estatuto da Criança e do Adolescente (ECA)": {
      "Crimes em espécie": {
        "distribuicao": "50.0%",
        "importancia": "MÉDIO"
      },
      "Disposições gerais e processuais": {
        "distribuicao": "50.0%",
        "importancia": "MÉDIO"
      }
    },
    "11 - Lei Maria da Penha (Lei 11.340/2006)": {
      "Formas de violência e medidas protetivas": {
        "distribuicao": "33.4%",
        "importancia": "MÉDIO"
      },
      "Procedimento, competência e vedações": {
        "distribuicao": "33.3%",
        "importancia": "MÉDIO"
      },
      "Crimes e descumprimento de medida protetiva": {
        "distribuicao": "33.3%",
        "importancia": "MÉDIO"
      }
    }
  },
  "Processo Penal": {
    "01 - Juizados Especiais Criminais": {
      "Infrações de menor potencial ofensivo e TCO": {
        "distribuicao": "44.5%",
        "importancia": "CRÍTICO"
      },
      "Transação penal e Suspensão condicional do processo": {
        "distribuicao": "33.3%",
        "importancia": "ALTO"
      },
      "Juizados Especiais Cíveis e princípios (Lei 9.099/1995, arts. 2º a 59)": {
        "distribuicao": "22.2%",
        "importancia": "MÉDIO"
      }
    },
    "02 - Princípios, Sistemas Processuais e Aplicação da Lei Processual Penal": {
      "Princípios e garantias processuais": {
        "distribuicao": "33.4%",
        "importancia": "MÉDIO"
      },
      "Sistemas processuais": {
        "distribuicao": "33.3%",
        "importancia": "MÉDIO"
      },
      "Aplicação da lei processual penal no tempo e no espaço; interpretação": {
        "distribuicao": "33.3%",
        "importancia": "MÉDIO"
      }
    },
    "03 - Investigação Criminal e Inquérito Policial": {
      "Inquérito policial (características, instauração, indiciamento, arquivamento)": {
        "distribuicao": "50.0%",
        "importancia": "MÉDIO"
      },
      "Investigação criminal, outros meios e controle (juiz das garantias)": {
        "distribuicao": "50.0%",
        "importancia": "MÉDIO"
      }
    },
    "04 - Ação Penal e ANPP": {
      "Ação penal (pública e privada; denúncia e queixa)": {
        "distribuicao": "50.0%",
        "importancia": "MÉDIO"
      },
      "Acordo de Não Persecução Penal (ANPP)": {
        "distribuicao": "50.0%",
        "importancia": "MÉDIO"
      }
    },
    "05 - Jurisdição, Competência e Atos Processuais": {
      "Jurisdição e competência": {
        "distribuicao": "33.4%",
        "importancia": "MÉDIO"
      },
      "Atos e prazos processuais": {
        "distribuicao": "33.3%",
        "importancia": "MÉDIO"
      },
      "Citações, intimações e comunicação dos atos": {
        "distribuicao": "33.3%",
        "importancia": "MÉDIO"
      }
    },
    "06 - Provas": {
      "Teoria geral da prova (ônus, ilicitude, cadeia de custódia)": {
        "distribuicao": "50.0%",
        "importancia": "MÉDIO"
      },
      "Provas em espécie": {
        "distribuicao": "50.0%",
        "importancia": "MÉDIO"
      }
    },
    "07 - Prisão, Medidas Cautelares e Liberdade Provisória": {
      "Prisão em flagrante": {
        "distribuicao": "25.0%",
        "importancia": "MÉDIO"
      },
      "Prisão preventiva e temporária": {
        "distribuicao": "25.0%",
        "importancia": "MÉDIO"
      },
      "Medidas cautelares diversas e fiança": {
        "distribuicao": "25.0%",
        "importancia": "MÉDIO"
      },
      "Liberdade provisória e audiência de custódia": {
        "distribuicao": "25.0%",
        "importancia": "MÉDIO"
      }
    },
    "08 - Procedimentos, Júri, Recursos e Habeas Corpus": {
      "Procedimento comum e processos especiais": {
        "distribuicao": "25.0%",
        "importancia": "MÉDIO"
      },
      "Tribunal do Júri": {
        "distribuicao": "25.0%",
        "importancia": "MÉDIO"
      },
      "Recursos": {
        "distribuicao": "25.0%",
        "importancia": "MÉDIO"
      },
      "Habeas corpus e ações autônomas de impugnação": {
        "distribuicao": "25.0%",
        "importancia": "MÉDIO"
      }
    }
  },
  "Direito da Pessoa Idosa e da Pessoa com Deficiência": {
    "01 - Estatutos (Idoso e PCD)": {
      "Prioridade especial (80+) e acesso à justiça": {
        "distribuicao": "23.0%",
        "importancia": "ALTO"
      },
      "Crimes do Estatuto da Pessoa Idosa": {
        "distribuicao": "15.4%",
        "importancia": "MÉDIO"
      },
      "Conceitos de acessibilidade e prioridade PCD": {
        "distribuicao": "23.1%",
        "importancia": "ALTO"
      },
      "Direitos fundamentais da pessoa idosa (Lei 10.741/2003, Título II)": {
        "distribuicao": "23.1%",
        "importancia": "ALTO"
      },
      "Medidas de proteção e política de atendimento (Lei 10.741/2003)": {
        "distribuicao": "15.4%",
        "importancia": "MÉDIO"
      },
      "Crimes contra PCD": {
        "distribuicao": "0.0%",
        "importancia": "EXCLUIR"
      }
    },
    "02 - Acessibilidade e Atendimento prioritário": {
      "Normas da Lei 10.098 e Lei 10.048": {
        "distribuicao": "100.0%",
        "importancia": "MÉDIO"
      }
    }
  }
};

/* =====================================================================================
   2. PESO_DISCIPLINA (% do total de pontos da prova objetiva)
   ===================================================================================== */
const PESO_DISCIPLINA = {
  "agente_policia_judicial": {
    "Língua Portuguesa": 8,
    "RLM": 3,
    "Noções de Legislação": 3,
    "Noções de Sustentabilidade": 1,
    "Direitos Humanos": 3,
    "Informática": 2,
    "Direito Constitucional": 7.2,
    "Direito Administrativo": 9.6,
    "Segurança de Dignitários": 24.8,
    "Segurança Orgânica": 12.8,
    "Normas da Polícia Judicial": 6.4,
    "Direito Penal": 8,
    "Legislação Penal Especial": 5.6,
    "Processo Penal": 1.6,
    "Direito da Pessoa Idosa e da Pessoa com Deficiência": 4
  }
};

/* =====================================================================================
   3. PESO_TEMA (% do tema dentro da disciplina; soma 100 por disciplina)
   ===================================================================================== */
const PESO_TEMA = {
  "Língua Portuguesa": {
    "01 - Sintaxe da Oração": 4,
    "02 - Morfologia": 5,
    "03 - Morfologia II: Verbos": 5,
    "04 - Sintaxe do período": 7,
    "05 - Concordância": 9,
    "06 - Regência e Crase": 8,
    "07 - Pontuação": 9,
    "08 - Ortografia Oficial": 4,
    "09 - Coesão e Coerência": 7,
    "10 - Semântica e Tipos de Textos": 7,
    "11 - Compreensão e Interpretação Textual": 19,
    "12 - Reescrita de frases": 11,
    "13 - Redação Oficial (Manual de Redação da Presidência da República)": 5
  },
  "RLM": {
    "02 - Sequências e Estruturas Lógicas": 17,
    "03 - Lógica de Argumentação": 22,
    "04 - Lógica de Proposições": 10,
    "05 - Matemática Básica, Números Inteiros e Racionais": 8,
    "06 - Problemas Aritméticos e Equações": 6,
    "07 - Números e Grandezas Proporcionais": 12,
    "08 - Porcentagem e Cálculo com Porcentagem": 11,
    "13 - Noções de Estatística": 14,
    "01 - Operações com Conjuntos": 0,
    "09 - Princípios de Contagem e Análise Combinatória": 0,
    "10 - Noções de probabilidade": 0,
    "11 - Noções de Geometria": 0,
    "12 - Matrizes e Sistemas Lineares": 0
  },
  "Noções de Legislação": {
    "01 - Código de Ética do TRT-8 (Res. TRT8 88/2012)": 0,
    "02 - Regimento Interno do TRT-8 (atualizado em 22/06/2026)": 0,
    "03 - Política de Prevenção e Enfrentamento da Violência, do Assédio e da Discriminação (Res. CNJ 351/2020)": 26.8,
    "04 - Perspectiva de Gênero e Equidade (Res. CNJ 492/2023)": 18.3,
    "05 - Tribunal Penal Internacional (Estatuto de Roma e Decreto 4.388/2002)": 31,
    "06 - Carta das Nações Unidas e Estatuto da Corte Internacional de Justiça (Decreto 19.841/1945)": 23.9
  },
  "Noções de Sustentabilidade": {
    "02 - Política de Sustentabilidade do Poder Judiciário": 100,
    "01 - Meio ambiente na Constituição": 0,
    "03 - Política Nacional sobre Mudança do Clima": 0,
    "04 - Política Nacional de Resíduos Sólidos": 0
  },
  "Direitos Humanos": {
    "01 - Teoria geral dos direitos humanos": 22.6,
    "03 - Declaração Universal dos Direitos Humanos": 13.1,
    "05 - Direitos Humanos na Constituição Federal": 13.1,
    "06 - Pacto Internacional sobre Direitos Econômicos, Sociais e Culturais (PIDESC)": 7.8,
    "08 - Pacto Internacional sobre Direitos Civis e Políticos (PIDCP)": 11.3,
    "09 - Pessoas com deficiência (Res. CSJT 386/2024, art. 6º)": 19.2,
    "02 - Sistemas de proteção": 3.2,
    "04 - Convenção Americana sobre Direitos Humanos": 9.7,
    "07 - Regras de Mandela (Regras Mínimas da ONU para o Tratamento de Presos)": 0
  },
  "Informática": {
    "01 - Redes de computadores, Internet e Intranet": 11.1,
    "02 - Navegadores web, correio eletrônico e mídias sociais": 14.9,
    "06 - Sistemas operacionais (Windows 10/11 e mobile)": 12.3,
    "08 - Segurança da informação": 13.3,
    "10 - Google Workspace: Agenda, Tarefas e Meet": 8.5,
    "11 - Google Drive e Documentos Google": 10.9,
    "03 - Editor de textos (Microsoft Word)": 7.9,
    "04 - Planilhas eletrônicas (Microsoft Excel)": 7.9,
    "05 - Apresentações (Microsoft PowerPoint)": 5.3,
    "07 - Hardware e software": 5.3,
    "09 - Gestão de documentos eletrônicos": 2.6
  },
  "Direito Constitucional": {
    "01 - Nacionalidade": 4,
    "02 - Direitos Políticos": 6.3,
    "03 - Direitos e Garantias Fundamentais (Teoria Geral)": 6.3,
    "04 - Direitos e garantias fundamentais (Direitos em espécie - introdução)": 7.2,
    "05 - Direitos e Garantias Fundamentais (Direitos em espécie)": 7.1,
    "06 - Remédios Constitucionais": 6.3,
    "07 - Direitos Sociais": 4.8,
    "08 - Constituição: Conceito, Estrutura e Objeto": 6.1,
    "12 - Aplicabilidade das normas constitucionais": 3.2,
    "13 - Princípios Fundamentais da CF/88": 6.3,
    "14 - Organização Político-Administrativa do Estado": 9.6,
    "19 - Fiscalização contábil, financeira e orçamentária": 1.4,
    "23 - Defesa do Estado e das Instituições Democráticas": 4.5,
    "24 - Controle de Constitucionalidade - Parte 1/2": 5.5,
    "25 - Controle de Constitucionalidade - Parte 2/2": 4.8,
    "09 - Classificações das Constituições": 0.5,
    "10 - Poder Constituinte Originário": 0,
    "11 - Poderes Constituídos (derivados) / Reforma Constitucional": 0.9,
    "15 - Intervenção": 0.9,
    "16 - Poder Legislativo": 2.3,
    "17 - Processo Legislativo": 3.2,
    "18 - Comissões Parlamentares de Inquérito (CPI)": 1.9,
    "20 - Poder Executivo": 3.2,
    "21 - Poder Judiciário": 2.8,
    "22 - Funções Essenciais à Justiça": 0.9,
    "26 - Controle concentrado de constitucionalidade nos Estados": 0,
    "27 - Ordem Econômica": 0,
    "28 - Ordem Social": 0,
    "29 - Federalismo Fiscal": 0
  },
  "Direito Administrativo": {
    "08 - Atos Administrativos I: Conceito, Requisitos, Atributos": 7.7,
    "01 - Administração Pública (CF, art. 37 a 41)": 8,
    "09 - Atos Administrativos: Classificação, Espécies e Extinção": 4.9,
    "07 - Poderes da Administração Pública": 8.4,
    "10 - Processo Administrativo - Lei 9.784/1999": 6.3,
    "19 - Contratos Administrativos na NLLC": 4.9,
    "21 - Lei de Improbidade Administrativa (Lei 8.429/92, alterada pela Lei 14.230/21)": 6.3,
    "24 - Lei Geral de Proteção de Dados - LGPD": 2.8,
    "18 - Lei 14.133/21 - Nova Lei de Licitações e Contratos": 10,
    "02 - Estado, Governo e Administração Pública": 5.9,
    "17 - Contratos Administrativos": 2.1,
    "16 - Controle da Administração Pública": 4.2,
    "03 - Princípios Administrativos": 4.9,
    "26 - Lei de Acesso à Informação - Lei 12.527/2011": 1.1,
    "27 - LINDB - Decreto-Lei 4.657/1942": 2.1,
    "23 - Lei das Estatais - Lei 13.303-2016": 0,
    "12 - Serviços Públicos, Concessão e Parceria Público-Privada": 0,
    "05 - Agências Executivas e Reguladoras": 0,
    "14 - Intervenção do Estado na Propriedade Privada": 0,
    "22 - Lei Anticorrupção - Lei 12.846/2013": 0,
    "15 - Responsabilidade Civil do Estado": 10.7,
    "20 - Convênios e instrumentos congêneres": 0,
    "04 - Organização Administrativa": 0,
    "11 - Agentes Públicos. Disposições doutrinárias e constitucionais": 6.1,
    "06 - Entidades paraestatais e Terceiro setor": 3.6,
    "25 - Ética Profissional do Servidor Público. Conflito de Interesses no Serviço Público.": 0,
    "13 - Bens Públicos": 0
  },
  "Segurança de Dignitários": {
    "01 - Segurança da informação": 7.2,
    "02 - Serviço de inteligência": 6,
    "03 - Planejamento de segurança": 7.4,
    "04 - Segurança corporativa estratégica": 2.6,
    "05 - Técnicas, táticas e operacionalização": 17.2,
    "06 - Análise de riscos": 5.3,
    "07 - Planejamento de contingências": 6,
    "09 - Gestão de conflitos: elementos e critérios": 4.8,
    "10 - Perímetros táticos e negociação": 1.5,
    "11 - Defesa pessoal": 8.9,
    "12 - Direção defensiva e ofensiva": 5.1,
    "13 - Legislação de trânsito (normas de circulação, infrações e penalidades)": 26.6,
    "14 - Cerimonial público e ordem geral de precedência (Decreto 70.274/1972)": 1.4,
    "08 - Proteção pessoal em situação de risco (Res. CNMP 116/2014)": 0
  },
  "Segurança Orgânica": {
    "01 - Prevenção e combate a incêndio": 23.9,
    "02 - Primeiros socorros": 68.3,
    "03 - Segurança de pessoas": 0,
    "04 - Segurança de instalações e patrimonial": 7.1,
    "06 - Defesa pessoal e direção defensiva (Orgânica)": 0.7,
    "05 - Segurança de informações (Orgânica)": 0
  },
  "Normas da Polícia Judicial": {
    "01 - Poder de polícia e atribuições da Polícia Judicial (Res. CNJ 344/2020 e 430/2021)": 37.9,
    "02 - Política e Sistema Nacional de Segurança do Judiciário (Res. CNJ 435/2021 e 515/2023)": 20.7,
    "03 - Uniformes e identificação funcional (Res. CNJ 379/2021 e 380/2021)": 13.9,
    "04 - Sistema de Inteligência de Segurança Institucional (Res. CNJ 383/2021)": 6.9,
    "05 - Porte de arma institucional (Res. CNJ 467/2022 e 566/2024)": 20.6,
    "06 - Res. CSJT 315/2021 e 432/2026 (segurança institucional na Justiça do Trabalho)": 0
  },
  "Direito Penal": {
    "01 - Aplicação da Lei Penal e Princípios do Direito Penal": 5,
    "02 - Teoria Geral do Delito - Fato Típico e seus Elementos": 7,
    "03 - Ação Penal": 2,
    "04 - Crimes Contra a Pessoa I (Art. 121 a 136 do CP)": 8.9,
    "05 - Dos crimes contra a pessoa II - Art. 138 a 153 do CP": 7.3,
    "06 - Crimes contra o Patrimônio": 8.1,
    "09 - Crimes Contra a Administração Pública": 37.3,
    "10 - Crimes contra a Administração Pública - Capítulo II-A e Capítulo II-B": 4.9,
    "11 - Crimes contra as Finanças Públicas": 3.2,
    "12 - Crimes contra a Administração da Justiça": 8.9,
    "32 - Crimes contra finanças publicas e Normais Penais relativas ao servidor público": 2.4,
    "34 - Penas, Extinção da Punibilidade e Efeitos da Condenação": 5,
    "07 - Crimes Contra a Dignidade Sexual": 0,
    "08 - Dos Crimes Contra a Fé Pública": 0,
    "13 - Dos crimes contra o estado democrático de direito": 0,
    "14 - Lei 8137_1990 - Crimes Contra Ordem Tributaria - Bloco 01": 0,
    "15 - Lei 8137_1990 - Crimes Contra Ordem Tributaria - Bloco 02": 0,
    "16 - Lei 8137_1990 - Crimes Contra Ordem Tributaria - Bloco 03": 0,
    "17 - Lei 8137_1990 - Crimes Contra Ordem Tributaria - Bloco 04": 0,
    "18 - Lei 8137_1990 - Crimes Contra Ordem Tributaria - Bloco 05": 0,
    "19 - Sumulas de Direito Penal - Parte 1": 0,
    "20 - Sumulas de Direito Penal - Parte 2": 0,
    "21 - Sumulas de Direito Penal - Parte 3": 0,
    "22 - Sumulas de Direito Penal - Parte 4": 0,
    "23 - Informativo Jurisprudencia 774 e 775 STJ": 0,
    "24 - Informativo Jurisprudencia 776 STJ": 0,
    "25 - Informativo Jurisprudencia 777 STJ": 0,
    "26 - Informativo Jurisprudencia 778 STJ": 0,
    "27 - Informativo Jurisprudencia 779 STJ": 0,
    "28 - Informativo Jurisprudencia 780 STJ": 0,
    "29 - Informativo Jurisprudencia 783 784 785 786 STJ": 0,
    "30 - Informativo Jurisprudencia 787 788 789 790 791 792 STJ": 0,
    "31 - Informativo Jurisprudencia 1101 STF": 0,
    "33 - Edicao Extraordinaria 13 STJ": 0,
    "35 - Crimes contra a Incolumidade Pública e a Paz Pública": 0
  },
  "Legislação Penal Especial": {
    "01 - Abuso de autoridade": 14.2,
    "02 - Retenção de documento de identificação": 2.2,
    "03 - Crimes de racismo": 9.8,
    "04 - Estatuto do Desarmamento e Porte no Judiciário": 15.2,
    "05 - Lei de Drogas (Lei 11.343/2006)": 10.4,
    "06 - Crimes Hediondos (Lei 8.072/1990)": 6.9,
    "07 - Crimes de Tortura (Lei 9.455/1997)": 6.9,
    "08 - Organizações Criminosas (Lei 12.850/2013)": 10.3,
    "09 - Interceptação Telefônica (Lei 9.296/1996)": 6.9,
    "10 - Crimes do Estatuto da Criança e do Adolescente (ECA)": 6.9,
    "11 - Lei Maria da Penha (Lei 11.340/2006)": 10.3
  },
  "Processo Penal": {
    "01 - Juizados Especiais Criminais": 13.1,
    "02 - Princípios, Sistemas Processuais e Aplicação da Lei Processual Penal": 13,
    "03 - Investigação Criminal e Inquérito Policial": 8.7,
    "04 - Ação Penal e ANPP": 8.7,
    "05 - Jurisdição, Competência e Atos Processuais": 13,
    "06 - Provas": 8.7,
    "07 - Prisão, Medidas Cautelares e Liberdade Provisória": 17.4,
    "08 - Procedimentos, Júri, Recursos e Habeas Corpus": 17.4
  },
  "Direito da Pessoa Idosa e da Pessoa com Deficiência": {
    "01 - Estatutos (Idoso e PCD)": 88.2,
    "02 - Acessibilidade e Atendimento prioritário": 11.8
  }
};

/* =====================================================================================
   4. ORDEM_DE_ESTUDO (global = peso da disciplina x peso do tema, em % do total de pontos)
   ===================================================================================== */
const ORDEM_DE_ESTUDO = [
  {"ordem": 1, "global": 8.74, "acumulado": 8.74, "ativos": 6, "disciplina": "Segurança Orgânica", "tema": "02 - Primeiros socorros"},
  {"ordem": 2, "global": 6.6, "acumulado": 15.34, "ativos": 13, "disciplina": "Segurança de Dignitários", "tema": "13 - Legislação de trânsito (normas de circulação, infrações e penalidades)"},
  {"ordem": 3, "global": 4.27, "acumulado": 19.61, "ativos": 4, "disciplina": "Segurança de Dignitários", "tema": "05 - Técnicas, táticas e operacionalização"},
  {"ordem": 4, "global": 3.53, "acumulado": 23.14, "ativos": 5, "disciplina": "Direito da Pessoa Idosa e da Pessoa com Deficiência", "tema": "01 - Estatutos (Idoso e PCD)"},
  {"ordem": 5, "global": 3.06, "acumulado": 26.2, "ativos": 4, "disciplina": "Segurança Orgânica", "tema": "01 - Prevenção e combate a incêndio"},
  {"ordem": 6, "global": 2.98, "acumulado": 29.18, "ativos": 28, "disciplina": "Direito Penal", "tema": "09 - Crimes Contra a Administração Pública"},
  {"ordem": 7, "global": 2.43, "acumulado": 31.61, "ativos": 3, "disciplina": "Normas da Polícia Judicial", "tema": "01 - Poder de polícia e atribuições da Polícia Judicial (Res. CNJ 344/2020 e 430/2021)"},
  {"ordem": 8, "global": 2.21, "acumulado": 33.82, "ativos": 5, "disciplina": "Segurança de Dignitários", "tema": "11 - Defesa pessoal"},
  {"ordem": 9, "global": 1.84, "acumulado": 35.66, "ativos": 3, "disciplina": "Segurança de Dignitários", "tema": "03 - Planejamento de segurança"},
  {"ordem": 10, "global": 1.79, "acumulado": 37.45, "ativos": 5, "disciplina": "Segurança de Dignitários", "tema": "01 - Segurança da informação"},
  {"ordem": 11, "global": 1.52, "acumulado": 38.97, "ativos": 6, "disciplina": "Língua Portuguesa", "tema": "11 - Compreensão e Interpretação Textual"},
  {"ordem": 12, "global": 1.49, "acumulado": 40.46, "ativos": 5, "disciplina": "Segurança de Dignitários", "tema": "02 - Serviço de inteligência"},
  {"ordem": 13, "global": 1.49, "acumulado": 41.95, "ativos": 3, "disciplina": "Segurança de Dignitários", "tema": "07 - Planejamento de contingências"},
  {"ordem": 14, "global": 1.32, "acumulado": 43.27, "ativos": 2, "disciplina": "Normas da Polícia Judicial", "tema": "02 - Política e Sistema Nacional de Segurança do Judiciário (Res. CNJ 435/2021 e 515/2023)"},
  {"ordem": 15, "global": 1.32, "acumulado": 44.59, "ativos": 2, "disciplina": "Normas da Polícia Judicial", "tema": "05 - Porte de arma institucional (Res. CNJ 467/2022 e 566/2024)"},
  {"ordem": 16, "global": 1.31, "acumulado": 45.9, "ativos": 4, "disciplina": "Segurança de Dignitários", "tema": "06 - Análise de riscos"},
  {"ordem": 17, "global": 1.26, "acumulado": 47.16, "ativos": 3, "disciplina": "Segurança de Dignitários", "tema": "12 - Direção defensiva e ofensiva"},
  {"ordem": 18, "global": 1.19, "acumulado": 48.35, "ativos": 4, "disciplina": "Segurança de Dignitários", "tema": "09 - Gestão de conflitos: elementos e critérios"},
  {"ordem": 19, "global": 1.03, "acumulado": 49.38, "ativos": 53, "disciplina": "Direito Administrativo", "tema": "15 - Responsabilidade Civil do Estado"},
  {"ordem": 20, "global": 1, "acumulado": 50.38, "ativos": 3, "disciplina": "Noções de Sustentabilidade", "tema": "02 - Política de Sustentabilidade do Poder Judiciário"},
  {"ordem": 21, "global": 0.96, "acumulado": 51.34, "ativos": 45, "disciplina": "Direito Administrativo", "tema": "18 - Lei 14.133/21 - Nova Lei de Licitações e Contratos"},
  {"ordem": 22, "global": 0.93, "acumulado": 52.27, "ativos": 5, "disciplina": "Noções de Legislação", "tema": "05 - Tribunal Penal Internacional (Estatuto de Roma e Decreto 4.388/2002)"},
  {"ordem": 23, "global": 0.91, "acumulado": 53.18, "ativos": 3, "disciplina": "Segurança Orgânica", "tema": "04 - Segurança de instalações e patrimonial"},
  {"ordem": 24, "global": 0.89, "acumulado": 54.07, "ativos": 2, "disciplina": "Normas da Polícia Judicial", "tema": "03 - Uniformes e identificação funcional (Res. CNJ 379/2021 e 380/2021)"},
  {"ordem": 25, "global": 0.88, "acumulado": 54.95, "ativos": 7, "disciplina": "Língua Portuguesa", "tema": "12 - Reescrita de frases"},
  {"ordem": 26, "global": 0.85, "acumulado": 55.8, "ativos": 4, "disciplina": "Legislação Penal Especial", "tema": "04 - Estatuto do Desarmamento e Porte no Judiciário"},
  {"ordem": 27, "global": 0.81, "acumulado": 56.61, "ativos": 33, "disciplina": "Direito Administrativo", "tema": "07 - Poderes da Administração Pública"},
  {"ordem": 28, "global": 0.8, "acumulado": 57.41, "ativos": 4, "disciplina": "Noções de Legislação", "tema": "03 - Política de Prevenção e Enfrentamento da Violência, do Assédio e da Discriminação (Res. CNJ 351/2020)"},
  {"ordem": 29, "global": 0.8, "acumulado": 58.21, "ativos": 4, "disciplina": "Legislação Penal Especial", "tema": "01 - Abuso de autoridade"},
  {"ordem": 30, "global": 0.77, "acumulado": 58.98, "ativos": 39, "disciplina": "Direito Administrativo", "tema": "01 - Administração Pública (CF, art. 37 a 41)"},
  {"ordem": 31, "global": 0.74, "acumulado": 59.72, "ativos": 46, "disciplina": "Direito Administrativo", "tema": "08 - Atos Administrativos I: Conceito, Requisitos, Atributos"},
  {"ordem": 32, "global": 0.72, "acumulado": 60.44, "ativos": 26, "disciplina": "Língua Portuguesa", "tema": "05 - Concordância"},
  {"ordem": 33, "global": 0.72, "acumulado": 61.16, "ativos": 5, "disciplina": "Língua Portuguesa", "tema": "07 - Pontuação"},
  {"ordem": 34, "global": 0.72, "acumulado": 61.88, "ativos": 4, "disciplina": "Noções de Legislação", "tema": "06 - Carta das Nações Unidas e Estatuto da Corte Internacional de Justiça (Decreto 19.841/1945)"},
  {"ordem": 35, "global": 0.71, "acumulado": 62.59, "ativos": 14, "disciplina": "Direito Penal", "tema": "04 - Crimes Contra a Pessoa I (Art. 121 a 136 do CP)"},
  {"ordem": 36, "global": 0.71, "acumulado": 63.3, "ativos": 14, "disciplina": "Direito Penal", "tema": "12 - Crimes contra a Administração da Justiça"},
  {"ordem": 37, "global": 0.69, "acumulado": 63.99, "ativos": 9, "disciplina": "Direito Constitucional", "tema": "14 - Organização Político-Administrativa do Estado"},
  {"ordem": 38, "global": 0.68, "acumulado": 64.67, "ativos": 6, "disciplina": "Direitos Humanos", "tema": "01 - Teoria geral dos direitos humanos"},
  {"ordem": 39, "global": 0.66, "acumulado": 65.33, "ativos": 6, "disciplina": "RLM", "tema": "03 - Lógica de Argumentação"},
  {"ordem": 40, "global": 0.65, "acumulado": 65.98, "ativos": 19, "disciplina": "Direito Penal", "tema": "06 - Crimes contra o Patrimônio"},
  {"ordem": 41, "global": 0.64, "acumulado": 66.62, "ativos": 6, "disciplina": "Língua Portuguesa", "tema": "06 - Regência e Crase"},
  {"ordem": 42, "global": 0.64, "acumulado": 67.26, "ativos": 2, "disciplina": "Segurança de Dignitários", "tema": "04 - Segurança corporativa estratégica"},
  {"ordem": 43, "global": 0.6, "acumulado": 67.86, "ativos": 30, "disciplina": "Direito Administrativo", "tema": "10 - Processo Administrativo - Lei 9.784/1999"},
  {"ordem": 44, "global": 0.6, "acumulado": 68.46, "ativos": 37, "disciplina": "Direito Administrativo", "tema": "21 - Lei de Improbidade Administrativa (Lei 8.429/92, alterada pela Lei 14.230/21)"},
  {"ordem": 45, "global": 0.59, "acumulado": 69.05, "ativos": 30, "disciplina": "Direito Administrativo", "tema": "11 - Agentes Públicos. Disposições doutrinárias e constitucionais"},
  {"ordem": 46, "global": 0.58, "acumulado": 69.63, "ativos": 8, "disciplina": "Direitos Humanos", "tema": "09 - Pessoas com deficiência (Res. CSJT 386/2024, art. 6º)"},
  {"ordem": 47, "global": 0.58, "acumulado": 70.21, "ativos": 14, "disciplina": "Direito Penal", "tema": "05 - Dos crimes contra a pessoa II - Art. 138 a 153 do CP"},
  {"ordem": 48, "global": 0.58, "acumulado": 70.79, "ativos": 3, "disciplina": "Legislação Penal Especial", "tema": "05 - Lei de Drogas (Lei 11.343/2006)"},
  {"ordem": 49, "global": 0.58, "acumulado": 71.37, "ativos": 3, "disciplina": "Legislação Penal Especial", "tema": "08 - Organizações Criminosas (Lei 12.850/2013)"},
  {"ordem": 50, "global": 0.58, "acumulado": 71.95, "ativos": 3, "disciplina": "Legislação Penal Especial", "tema": "11 - Lei Maria da Penha (Lei 11.340/2006)"},
  {"ordem": 51, "global": 0.57, "acumulado": 72.52, "ativos": 29, "disciplina": "Direito Administrativo", "tema": "02 - Estado, Governo e Administração Pública"},
  {"ordem": 52, "global": 0.56, "acumulado": 73.08, "ativos": 16, "disciplina": "Língua Portuguesa", "tema": "04 - Sintaxe do período"},
  {"ordem": 53, "global": 0.56, "acumulado": 73.64, "ativos": 2, "disciplina": "Língua Portuguesa", "tema": "09 - Coesão e Coerência"},
  {"ordem": 54, "global": 0.56, "acumulado": 74.2, "ativos": 8, "disciplina": "Língua Portuguesa", "tema": "10 - Semântica e Tipos de Textos"},
  {"ordem": 55, "global": 0.56, "acumulado": 74.76, "ativos": 12, "disciplina": "Direito Penal", "tema": "02 - Teoria Geral do Delito - Fato Típico e seus Elementos"},
  {"ordem": 56, "global": 0.55, "acumulado": 75.31, "ativos": 1, "disciplina": "Noções de Legislação", "tema": "04 - Perspectiva de Gênero e Equidade (Res. CNJ 492/2023)"},
  {"ordem": 57, "global": 0.55, "acumulado": 75.86, "ativos": 3, "disciplina": "Legislação Penal Especial", "tema": "03 - Crimes de racismo"},
  {"ordem": 58, "global": 0.52, "acumulado": 76.38, "ativos": 21, "disciplina": "Direito Constitucional", "tema": "04 - Direitos e garantias fundamentais (Direitos em espécie - introdução)"},
  {"ordem": 59, "global": 0.51, "acumulado": 76.89, "ativos": 11, "disciplina": "RLM", "tema": "02 - Sequências e Estruturas Lógicas"},
  {"ordem": 60, "global": 0.51, "acumulado": 77.4, "ativos": 24, "disciplina": "Direito Constitucional", "tema": "05 - Direitos e Garantias Fundamentais (Direitos em espécie)"},
  {"ordem": 61, "global": 0.47, "acumulado": 77.87, "ativos": 32, "disciplina": "Direito Administrativo", "tema": "09 - Atos Administrativos: Classificação, Espécies e Extinção"},
  {"ordem": 62, "global": 0.47, "acumulado": 78.34, "ativos": 25, "disciplina": "Direito Administrativo", "tema": "19 - Contratos Administrativos na NLLC"},
  {"ordem": 63, "global": 0.47, "acumulado": 78.81, "ativos": 17, "disciplina": "Direito Administrativo", "tema": "03 - Princípios Administrativos"},
  {"ordem": 64, "global": 0.47, "acumulado": 79.28, "ativos": 1, "disciplina": "Direito da Pessoa Idosa e da Pessoa com Deficiência", "tema": "02 - Acessibilidade e Atendimento prioritário"},
  {"ordem": 65, "global": 0.45, "acumulado": 79.73, "ativos": 14, "disciplina": "Direito Constitucional", "tema": "02 - Direitos Políticos"},
  {"ordem": 66, "global": 0.45, "acumulado": 80.18, "ativos": 15, "disciplina": "Direito Constitucional", "tema": "03 - Direitos e Garantias Fundamentais (Teoria Geral)"},
  {"ordem": 67, "global": 0.45, "acumulado": 80.63, "ativos": 13, "disciplina": "Direito Constitucional", "tema": "06 - Remédios Constitucionais"},
  {"ordem": 68, "global": 0.45, "acumulado": 81.08, "ativos": 16, "disciplina": "Direito Constitucional", "tema": "13 - Princípios Fundamentais da CF/88"},
  {"ordem": 69, "global": 0.44, "acumulado": 81.52, "ativos": 12, "disciplina": "Direito Constitucional", "tema": "08 - Constituição: Conceito, Estrutura e Objeto"},
  {"ordem": 70, "global": 0.44, "acumulado": 81.96, "ativos": 1, "disciplina": "Normas da Polícia Judicial", "tema": "04 - Sistema de Inteligência de Segurança Institucional (Res. CNJ 383/2021)"},
  {"ordem": 71, "global": 0.42, "acumulado": 82.38, "ativos": 6, "disciplina": "RLM", "tema": "13 - Noções de Estatística"},
  {"ordem": 72, "global": 0.4, "acumulado": 82.78, "ativos": 15, "disciplina": "Língua Portuguesa", "tema": "02 - Morfologia"},
  {"ordem": 73, "global": 0.4, "acumulado": 83.18, "ativos": 7, "disciplina": "Língua Portuguesa", "tema": "03 - Morfologia II: Verbos"},
  {"ordem": 74, "global": 0.4, "acumulado": 83.58, "ativos": 5, "disciplina": "Língua Portuguesa", "tema": "13 - Redação Oficial (Manual de Redação da Presidência da República)"},
  {"ordem": 75, "global": 0.4, "acumulado": 83.98, "ativos": 11, "disciplina": "Direito Constitucional", "tema": "24 - Controle de Constitucionalidade - Parte 1/2"},
  {"ordem": 76, "global": 0.4, "acumulado": 84.38, "ativos": 12, "disciplina": "Direito Administrativo", "tema": "16 - Controle da Administração Pública"},
  {"ordem": 77, "global": 0.4, "acumulado": 84.78, "ativos": 14, "disciplina": "Direito Penal", "tema": "01 - Aplicação da Lei Penal e Princípios do Direito Penal"},
  {"ordem": 78, "global": 0.4, "acumulado": 85.18, "ativos": 5, "disciplina": "Direito Penal", "tema": "34 - Penas, Extinção da Punibilidade e Efeitos da Condenação"},
  {"ordem": 79, "global": 0.39, "acumulado": 85.57, "ativos": 5, "disciplina": "Direitos Humanos", "tema": "03 - Declaração Universal dos Direitos Humanos"},
  {"ordem": 80, "global": 0.39, "acumulado": 85.96, "ativos": 2, "disciplina": "Direitos Humanos", "tema": "05 - Direitos Humanos na Constituição Federal"},
  {"ordem": 81, "global": 0.39, "acumulado": 86.35, "ativos": 8, "disciplina": "Direito Penal", "tema": "10 - Crimes contra a Administração Pública - Capítulo II-A e Capítulo II-B"},
  {"ordem": 82, "global": 0.39, "acumulado": 86.74, "ativos": 2, "disciplina": "Legislação Penal Especial", "tema": "06 - Crimes Hediondos (Lei 8.072/1990)"},
  {"ordem": 83, "global": 0.39, "acumulado": 87.13, "ativos": 2, "disciplina": "Legislação Penal Especial", "tema": "07 - Crimes de Tortura (Lei 9.455/1997)"},
  {"ordem": 84, "global": 0.39, "acumulado": 87.52, "ativos": 2, "disciplina": "Legislação Penal Especial", "tema": "09 - Interceptação Telefônica (Lei 9.296/1996)"},
  {"ordem": 85, "global": 0.39, "acumulado": 87.91, "ativos": 2, "disciplina": "Legislação Penal Especial", "tema": "10 - Crimes do Estatuto da Criança e do Adolescente (ECA)"},
  {"ordem": 86, "global": 0.37, "acumulado": 88.28, "ativos": 1, "disciplina": "Segurança de Dignitários", "tema": "10 - Perímetros táticos e negociação"},
  {"ordem": 87, "global": 0.36, "acumulado": 88.64, "ativos": 7, "disciplina": "RLM", "tema": "07 - Números e Grandezas Proporcionais"},
  {"ordem": 88, "global": 0.35, "acumulado": 88.99, "ativos": 20, "disciplina": "Direito Constitucional", "tema": "07 - Direitos Sociais"},
  {"ordem": 89, "global": 0.35, "acumulado": 89.34, "ativos": 10, "disciplina": "Direito Constitucional", "tema": "25 - Controle de Constitucionalidade - Parte 2/2"},
  {"ordem": 90, "global": 0.35, "acumulado": 89.69, "ativos": 18, "disciplina": "Direito Administrativo", "tema": "06 - Entidades paraestatais e Terceiro setor"},
  {"ordem": 91, "global": 0.35, "acumulado": 90.04, "ativos": 2, "disciplina": "Segurança de Dignitários", "tema": "14 - Cerimonial público e ordem geral de precedência (Decreto 70.274/1972)"},
  {"ordem": 92, "global": 0.34, "acumulado": 90.38, "ativos": 3, "disciplina": "Direitos Humanos", "tema": "08 - Pacto Internacional sobre Direitos Civis e Políticos (PIDCP)"},
  {"ordem": 93, "global": 0.33, "acumulado": 90.71, "ativos": 6, "disciplina": "RLM", "tema": "08 - Porcentagem e Cálculo com Porcentagem"},
  {"ordem": 94, "global": 0.32, "acumulado": 91.03, "ativos": 15, "disciplina": "Língua Portuguesa", "tema": "01 - Sintaxe da Oração"},
  {"ordem": 95, "global": 0.32, "acumulado": 91.35, "ativos": 6, "disciplina": "Língua Portuguesa", "tema": "08 - Ortografia Oficial"},
  {"ordem": 96, "global": 0.32, "acumulado": 91.67, "ativos": 5, "disciplina": "Direito Constitucional", "tema": "23 - Defesa do Estado e das Instituições Democráticas"},
  {"ordem": 97, "global": 0.3, "acumulado": 91.97, "ativos": 15, "disciplina": "RLM", "tema": "04 - Lógica de Proposições"},
  {"ordem": 98, "global": 0.3, "acumulado": 92.27, "ativos": 5, "disciplina": "Informática", "tema": "02 - Navegadores web, correio eletrônico e mídias sociais"},
  {"ordem": 99, "global": 0.29, "acumulado": 92.56, "ativos": 3, "disciplina": "Direitos Humanos", "tema": "04 - Convenção Americana sobre Direitos Humanos"},
  {"ordem": 100, "global": 0.29, "acumulado": 92.85, "ativos": 5, "disciplina": "Direito Constitucional", "tema": "01 - Nacionalidade"},
  {"ordem": 101, "global": 0.28, "acumulado": 93.13, "ativos": 4, "disciplina": "Processo Penal", "tema": "07 - Prisão, Medidas Cautelares e Liberdade Provisória"},
  {"ordem": 102, "global": 0.28, "acumulado": 93.41, "ativos": 4, "disciplina": "Processo Penal", "tema": "08 - Procedimentos, Júri, Recursos e Habeas Corpus"},
  {"ordem": 103, "global": 0.27, "acumulado": 93.68, "ativos": 7, "disciplina": "Informática", "tema": "08 - Segurança da informação"},
  {"ordem": 104, "global": 0.27, "acumulado": 93.95, "ativos": 21, "disciplina": "Direito Administrativo", "tema": "24 - Lei Geral de Proteção de Dados - LGPD"},
  {"ordem": 105, "global": 0.26, "acumulado": 94.21, "ativos": 9, "disciplina": "Direito Penal", "tema": "11 - Crimes contra as Finanças Públicas"},
  {"ordem": 106, "global": 0.25, "acumulado": 94.46, "ativos": 4, "disciplina": "Informática", "tema": "06 - Sistemas operacionais (Windows 10/11 e mobile)"},
  {"ordem": 107, "global": 0.24, "acumulado": 94.7, "ativos": 9, "disciplina": "RLM", "tema": "05 - Matemática Básica, Números Inteiros e Racionais"},
  {"ordem": 108, "global": 0.23, "acumulado": 94.93, "ativos": 3, "disciplina": "Direitos Humanos", "tema": "06 - Pacto Internacional sobre Direitos Econômicos, Sociais e Culturais (PIDESC)"},
  {"ordem": 109, "global": 0.23, "acumulado": 95.16, "ativos": 2, "disciplina": "Direito Constitucional", "tema": "12 - Aplicabilidade das normas constitucionais"},
  {"ordem": 110, "global": 0.23, "acumulado": 95.39, "ativos": 7, "disciplina": "Direito Constitucional", "tema": "17 - Processo Legislativo"},
  {"ordem": 111, "global": 0.23, "acumulado": 95.62, "ativos": 7, "disciplina": "Direito Constitucional", "tema": "20 - Poder Executivo"},
  {"ordem": 112, "global": 0.22, "acumulado": 95.84, "ativos": 5, "disciplina": "Informática", "tema": "01 - Redes de computadores, Internet e Intranet"},
  {"ordem": 113, "global": 0.22, "acumulado": 96.06, "ativos": 3, "disciplina": "Informática", "tema": "11 - Google Drive e Documentos Google"},
  {"ordem": 114, "global": 0.21, "acumulado": 96.27, "ativos": 3, "disciplina": "Processo Penal", "tema": "01 - Juizados Especiais Criminais"},
  {"ordem": 115, "global": 0.21, "acumulado": 96.48, "ativos": 3, "disciplina": "Processo Penal", "tema": "02 - Princípios, Sistemas Processuais e Aplicação da Lei Processual Penal"},
  {"ordem": 116, "global": 0.21, "acumulado": 96.69, "ativos": 3, "disciplina": "Processo Penal", "tema": "05 - Jurisdição, Competência e Atos Processuais"},
  {"ordem": 117, "global": 0.2, "acumulado": 96.89, "ativos": 6, "disciplina": "Direito Constitucional", "tema": "21 - Poder Judiciário"},
  {"ordem": 118, "global": 0.2, "acumulado": 97.09, "ativos": 21, "disciplina": "Direito Administrativo", "tema": "17 - Contratos Administrativos"},
  {"ordem": 119, "global": 0.2, "acumulado": 97.29, "ativos": 2, "disciplina": "Direito Administrativo", "tema": "27 - LINDB - Decreto-Lei 4.657/1942"},
  {"ordem": 120, "global": 0.19, "acumulado": 97.48, "ativos": 3, "disciplina": "Direito Penal", "tema": "32 - Crimes contra finanças publicas e Normais Penais relativas ao servidor público"},
  {"ordem": 121, "global": 0.18, "acumulado": 97.66, "ativos": 5, "disciplina": "RLM", "tema": "06 - Problemas Aritméticos e Equações"},
  {"ordem": 122, "global": 0.17, "acumulado": 97.83, "ativos": 3, "disciplina": "Informática", "tema": "10 - Google Workspace: Agenda, Tarefas e Meet"},
  {"ordem": 123, "global": 0.17, "acumulado": 98, "ativos": 5, "disciplina": "Direito Constitucional", "tema": "16 - Poder Legislativo"},
  {"ordem": 124, "global": 0.16, "acumulado": 98.16, "ativos": 3, "disciplina": "Informática", "tema": "03 - Editor de textos (Microsoft Word)"},
  {"ordem": 125, "global": 0.16, "acumulado": 98.32, "ativos": 3, "disciplina": "Informática", "tema": "04 - Planilhas eletrônicas (Microsoft Excel)"},
  {"ordem": 126, "global": 0.16, "acumulado": 98.48, "ativos": 5, "disciplina": "Direito Penal", "tema": "03 - Ação Penal"},
  {"ordem": 127, "global": 0.14, "acumulado": 98.62, "ativos": 4, "disciplina": "Direito Constitucional", "tema": "18 - Comissões Parlamentares de Inquérito (CPI)"},
  {"ordem": 128, "global": 0.14, "acumulado": 98.76, "ativos": 2, "disciplina": "Processo Penal", "tema": "03 - Investigação Criminal e Inquérito Policial"},
  {"ordem": 129, "global": 0.14, "acumulado": 98.9, "ativos": 2, "disciplina": "Processo Penal", "tema": "04 - Ação Penal e ANPP"},
  {"ordem": 130, "global": 0.14, "acumulado": 99.04, "ativos": 2, "disciplina": "Processo Penal", "tema": "06 - Provas"},
  {"ordem": 131, "global": 0.12, "acumulado": 99.16, "ativos": 1, "disciplina": "Legislação Penal Especial", "tema": "02 - Retenção de documento de identificação"},
  {"ordem": 132, "global": 0.11, "acumulado": 99.27, "ativos": 2, "disciplina": "Informática", "tema": "05 - Apresentações (Microsoft PowerPoint)"},
  {"ordem": 133, "global": 0.11, "acumulado": 99.38, "ativos": 2, "disciplina": "Informática", "tema": "07 - Hardware e software"},
  {"ordem": 134, "global": 0.11, "acumulado": 99.49, "ativos": 3, "disciplina": "Direito Administrativo", "tema": "26 - Lei de Acesso à Informação - Lei 12.527/2011"},
  {"ordem": 135, "global": 0.1, "acumulado": 99.59, "ativos": 1, "disciplina": "Direitos Humanos", "tema": "02 - Sistemas de proteção"},
  {"ordem": 136, "global": 0.1, "acumulado": 99.69, "ativos": 3, "disciplina": "Direito Constitucional", "tema": "19 - Fiscalização contábil, financeira e orçamentária"},
  {"ordem": 137, "global": 0.09, "acumulado": 99.78, "ativos": 1, "disciplina": "Segurança Orgânica", "tema": "06 - Defesa pessoal e direção defensiva (Orgânica)"},
  {"ordem": 138, "global": 0.06, "acumulado": 99.84, "ativos": 2, "disciplina": "Direito Constitucional", "tema": "11 - Poderes Constituídos (derivados) / Reforma Constitucional"},
  {"ordem": 139, "global": 0.06, "acumulado": 99.9, "ativos": 2, "disciplina": "Direito Constitucional", "tema": "15 - Intervenção"},
  {"ordem": 140, "global": 0.06, "acumulado": 99.96, "ativos": 2, "disciplina": "Direito Constitucional", "tema": "22 - Funções Essenciais à Justiça"},
  {"ordem": 141, "global": 0.05, "acumulado": 100, "ativos": 1, "disciplina": "Informática", "tema": "09 - Gestão de documentos eletrônicos"},
  {"ordem": 142, "global": 0.04, "acumulado": 100, "ativos": 1, "disciplina": "Direito Constitucional", "tema": "09 - Classificações das Constituições"}
];

const MARCOS_DE_COBERTURA = {"50":20, "80":66, "90":91, "95":109, "99":130};



// ═════════════════════════════════════════════════════════════════════════════
// V99 — ADEQUAÇÃO ESTRITA AO EDITAL (Agente da Polícia Judicial)
// REGRA-MÃE: o nome canônico de tema/subtema é o do RAIO-X (o que já está no banco, no progresso do aluno,
// nas leituras e no ciclo). O Config só fornece IMPORTÂNCIA e pertencimento ao edital, nunca o nome.
//
// MAPA_ALIASES_EDITAL  (editável): disciplina > tema(canônico) > { variante: canônico_do_raio_x }.
//   A chave especial "__TEMAS__" guarda aliases de TEMA (variante → tema canônico).
// MAPA_EDITAL_RESOLVIDO (gerado): importância/peso já resolvidos para os subtemas canônicos que mudaram ou
//   que não existiam no Config (importância NOVO, peso 0.0%). Regra: ativo × EXCLUIR → vale o ativo;
//   todos EXCLUIR → fora; dois ativos divergentes → vale o do canônico (ou do ativo com mais questões).
// O bloco no fim aplica as duas tabelas sobre MAPA_DISTRIBUICAO_EDITAL (idempotente): remove as variantes
// (o peso das variantes ativas foi somado ao canônico) e grava/atualiza os canônicos.
// Nada é renomeado ou apagado no Drive: a unificação é feita em tempo de leitura (_chaveCanonicaEdital).
// ═════════════════════════════════════════════════════════════════════════════
const MAPA_ALIASES_EDITAL = {
  "RLM": {
    "02 - Sequências e Estruturas Lógicas": {
      "Problemas Lógicos": "Associações Lógicas",
      "Estruturas Lógicas": "Associações Lógicas",
      "Princípios Lógicos": "Associações Lógicas",
      "Problemas Lógicos - Verdades e Mentiras": "Verdades e Mentiras",
      "Sequências": "Sequências Numéricas",
      "Sequências Lógicas": "Sequências Numéricas",
      "Sequências Lógicas Complexas": "Sequências Numéricas",
      "Sequências de Fibonacci": "Sequências Numéricas",
      "Progressões": "Sequências Numéricas",
      "Sequências Alfanuméricas": "Sequências de Letras",
      "Sequências Lógicas de Palavras": "Sequências de Letras",
      "Sequências de Palavras": "Sequências de Letras",
      "Codificação Lógica": "Sequências de Letras",
      "Sequências de Figuras (Espaciais e Descritivas)": "Sequências de Figuras",
      "Sequências de Figuras (Descritiva)": "Sequências de Figuras",
      "Sequências - Palitos": "Sequências de Figuras",
      "Lógica de Ciclos": "Sequências Cíclicas",
      "Calendários e Sequências Cíclicas": "Calendários e Ciclos",
      "Raciocínio Temporal": "Calendários e Ciclos",
      "Associação Lógica": "Associações Lógicas"
    },
    "03 - Lógica de Argumentação": {
      "Argumentos": "Validade de Argumentos",
      "Argumentos Lógicos": "Validade de Argumentos",
      "Validade de Argumentos e Falácias": "Validade de Argumentos",
      "Argumentação": "Validade de Argumentos",
      "Argumentação Lógica Complexa": "Validade de Argumentos",
      "Lógica de Argumentação": "Validade de Argumentos",
      "Dedução Lógica": "Validade de Argumentos",
      "Encadeamento Lógico": "Validade de Argumentos",
      "Argumentos com Conectivos": "Validade de Argumentos",
      "Argumentos com Conectivos e Cadeias de Condicionais": "Validade de Argumentos",
      "Cadeias de Condicionais": "Validade de Argumentos",
      "Silogismos e Validade de Argumentos": "Silogismos",
      "Silogismos e Proposições Categóricas": "Silogismos",
      "Silogismos Categóricos": "Silogismos",
      "Validade de Argumentos e Silogismo Hipotético": "Silogismo Hipotético",
      "Diagramas de Venn": "Diagramas Lógicos",
      "Silogismos (Categóricos, Hipotéticos e Disjuntivos)": "Silogismos",
      "Validade de Argumentos (Premissas e Conclusão)": "Validade de Argumentos"
    },
    "04 - Lógica de Proposições": {
      "Proposições": "Conceito de Proposição",
      "Definição de Proposições": "Conceito de Proposição",
      "Conceitos Iniciais": "Conceito de Proposição",
      "Lógica Proposicional": "Conceito de Proposição",
      "Operações Lógicas": "Conectivos Lógicos",
      "Conjunção": "Conectivos Lógicos",
      "Disjunção Inclusiva": "Conectivos Lógicos",
      "Disjunção Exclusiva": "Conectivos Lógicos",
      "Número de Linhas da Tabela-Verdade": "Tabela-Verdade",
      "Contradição": "Tautologia",
      "Contingência": "Tautologia",
      "Equivalência Lógica da Condicional": "Equivalência da Condicional",
      "Contrapositiva": "Equivalência da Condicional",
      "Equivalência Lógica (Disjunção)": "Equivalência da Condicional",
      "Equivalência": "Equivalência Lógica",
      "Implicação Lógica": "Equivalência Lógica",
      "Negação de Proposições Condicionais": "Negação de Condicional",
      "Negação de Disjunção Exclusiva": "Negação de Disjunção",
      "Negação Lógica": "Negação de Proposições Compostas",
      "Negação com Quantificadores e Conectivos": "Negação de Quantificadores",
      "Negação de 'Nenhum'": "Negação de Quantificadores",
      "Negação de Quantificador Universal Negativo": "Negação de Quantificadores",
      "Negação de Quantificador Existencial": "Negação de Quantificadores",
      "Lógica de Quantificadores": "Negação de Quantificadores",
      "Quantificadores": "Negação de Quantificadores",
      "Tabelas Verdade": "Tabela-Verdade",
      "Tabela Verdade": "Tabela-Verdade",
      "Tabela-Verdade (Construção e Análise)": "Tabela-Verdade",
      "Equivalência da Condicional (Contrapositiva)": "Equivalência da Condicional",
      "Negação da Condicional": "Negação de Condicional",
      "Negação de Quantificadores (Universal e Existencial)": "Negação de Quantificadores",
      "Negação de Proposição Composta": "Negação de Proposições Compostas",
      "Negação de Proposições Compostas (Conjunção, Disjunção, Condicional, Bicondicional)": "Negação de Proposições Compostas",
      "Equivalências Lógicas": "Equivalência Lógica",
      "Condição Necessária e Suficiente": "Condições Necessárias e Suficientes"
    },
    "05 - Matemática Básica, Números Inteiros e Racionais": {
      "Números Inteiros": "Operações com Inteiros",
      "Operações": "Operações com Inteiros",
      "Números Racionais e Frações": "Números Racionais",
      "Frações e Números Racionais": "Números Racionais",
      "Frações e Racionais": "Números Racionais",
      "Operações com Racionais": "Números Racionais",
      "Operações com Frações e Decimais": "Frações",
      "Números Decimais": "Operações com Decimais",
      "Potências de Dez": "Potenciação e Radiciação",
      "Operações com Inteiros e Divisibilidade": "Divisibilidade",
      "MMC e MDC (Mínimo Múltiplo Comum e Máximo Divisor Comum)": "Mínimo Múltiplo Comum (MMC)",
      "Números Racionais (Representações e Conversões)": "Números Racionais"
    },
    "06 - Problemas Aritméticos e Equações": {
      "Problemas Aritméticos Contextualizados": "Problemas Aritméticos",
      "Problemas de Lógica e Aritmética": "Problemas Aritméticos",
      "Aritmética e Frações": "Problemas Aritméticos",
      "Equações de 1º Grau e Modelagem Algébrica": "Equações de 1º Grau",
      "Equações": "Equações de 1º Grau",
      "Movimento": "Problemas de Percurso",
      "Problemas de Movimento, Trabalho e Torneiras": "Problemas de Percurso",
      "Torneiras e Trabalho": "Problemas de Percurso"
    },
    "07 - Números e Grandezas Proporcionais": {
      "Fração e Proporção": "Razão e Proporção",
      "Grandezas Direta e Inversamente Proporcionais": "Grandezas Proporcionais",
      "Grandezas Inversamente Proporcionais": "Grandezas Proporcionais",
      "Grandezas e Medidas": "Grandezas Proporcionais",
      "Divisão Inversamente Proporcional": "Divisão Proporcional Inversa",
      "Divisão Proporcional (Direta e Inversa, Simples e Composta)": "Divisão Proporcional",
      "Razão e Proporção (Conceitos e Aplicações)": "Razão e Proporção"
    },
    "08 - Porcentagem e Cálculo com Porcentagem": {
      "Cálculo de Porcentagem": "Porcentagem",
      "Porcentagem e Cálculo Direto/Reverso": "Porcentagem",
      "Problemas com Porcentagem": "Porcentagem",
      "Porcentagem de Porcentagem": "Porcentagem",
      "Conceitos Básicos": "Porcentagem",
      "Frações e Porcentagem": "Porcentagem",
      "Comparação de Percentuais": "Porcentagem",
      "Porcentagem e Proporção": "Porcentagem",
      "Moeda e Porcentagem": "Porcentagem",
      "Impostos e Porcentagem": "Porcentagem",
      "Análise de Metas e Porcentagem": "Porcentagem",
      "Aumentos Sucessivos": "Aumentos e Descontos Sucessivos",
      "Lucro e Variação de Custo": "Variação Percentual e Lucro",
      "Variação Percentual e Lucro/Prejuízo": "Variação Percentual e Lucro",
      "Gráficos e Porcentagem": "Gráficos de Setores e Porcentagem",
      "Gráfico de Setores e Ângulos": "Gráficos de Setores e Porcentagem",
      "Interpretação de Dados e Porcentagem": "Gráficos de Setores e Porcentagem"
    }
  },
  "Língua Portuguesa": {
    "01 - Sintaxe da Oração": {
      "Sujeito Composto": "Sujeito",
      "Sujeito Oculto": "Sujeito",
      "Sujeito Inexistente": "Sujeito",
      "Sujeito e Impessoalidade": "Sujeito",
      "Predicado Verbo-Nominal": "Predicado",
      "Verbo Intransitivo": "Transitividade Verbal",
      "Objeto Direto Preposicionado": "Objeto Direto",
      "Objeto Direto Pleonástico": "Objeto Direto",
      "Adjunto Adnominal": "Adjunto Adnominal vs Complemento Nominal",
      "Complemento Nominal": "Adjunto Adnominal vs Complemento Nominal",
      "Aposto Especificativo": "Aposto",
      "Adjunto Adverbial de Meio": "Adjunto Adverbial",
      "Adjunto Adverbial de Lugar": "Adjunto Adverbial",
      "Adjunto Adverbial de Causa": "Adjunto Adverbial",
      "Complemento Nominal vs Adjunto Adnominal": "Adjunto Adnominal vs Complemento Nominal"
    },
    "02 - Morfologia": {
      "Morfologia - Classes de Palavras (Onde/Aonde)": "Pronomes Relativos",
      "Pronomes Oblíquos (Função Sintática)": "Pronomes Pessoais",
      "Pronome LHE": "Pronomes Pessoais",
      "Concordância com Pronome de Tratamento": "Pronomes de Tratamento",
      "Pronomes Indefinitos": "Pronomes Indefinidos",
      "Pronomes - Colocação Pronominal": "Colocação Pronominal",
      "Conjunções": "Conjunções - Valor Semântico",
      "Conjunções Coordenativas": "Conjunções - Valor Semântico",
      "Conjunções - Condicionais": "Conjunções - Valor Semântico",
      "Conjunções - Adversativas vs Concessivas": "Conjunções - Valor Semântico",
      "Preposições - Relações de Sentido": "Preposições (Valor Semântico)",
      "Formação de Palavras - Derivação": "Formação de Palavras",
      "Formação de Palavras - Composição": "Formação de Palavras",
      "Substantivação (Derivação Imprópria)": "Formação de Palavras",
      "Plural de Substantivos Compostos": "Substantivos - Plural de Compostos",
      "Substantivos (Plural)": "Substantivos - Plural de Compostos",
      "Substantivos - Plural de Diminutivos": "Substantivos - Plural de Compostos",
      "Morfossintaxe": "Classes de Palavras",
      "Pronomes - Relativos": "Pronomes Relativos",
      "Pronomes Relativos (Onde vs Aonde)": "Pronomes Relativos",
      "Pronomes - Demonstrativos": "Pronomes Demonstrativos",
      "Pronomes Demonstrativos (Referência Espacial)": "Pronomes Demonstrativos",
      "Substantivos (Gênero)": "Substantivos - Gênero",
      "Pronomes - Pessoais (Função Sintática)": "Pronomes Pessoais",
      "Pronomes - Indefinidos": "Pronomes Indefinidos",
      "Pronomes - Tratamento": "Pronomes de Tratamento",
      "Formação de Palavras (Parassíntese)": "Formação de Palavras",
      "Preposições": "Preposições (Valor Semântico)",
      "Classes de Palavras (Advérbio)": "Classes de Palavras"
    },
    "03 - Morfologia II: Verbos": {
      "Voz Passiva": "Vozes Verbais",
      "Voz Passiva Analítica": "Vozes Verbais",
      "Voz Passiva Sintética": "Vozes Verbais",
      "Voz Reflexiva": "Vozes Verbais",
      "Concordância Verbal - Voz Passiva Sintética": "Vozes Verbais",
      "Concordância Verbal na Passiva": "Vozes Verbais",
      "Modos Verbais": "Verbos - Tempos e Modos",
      "Modo Subjuntivo": "Verbos - Tempos e Modos",
      "Futuro do Subjuntivo": "Verbos - Tempos e Modos",
      "Futuro do Pretérito": "Verbos - Tempos e Modos",
      "Futuro do Presente": "Verbos - Tempos e Modos",
      "Presente do Indicativo": "Verbos - Tempos e Modos",
      "Pretérito Imperfeito": "Verbos - Tempos e Modos",
      "Pretérito Perfeito vs Imperfeito": "Verbos - Tempos e Modos",
      "Presente Histórico": "Verbos - Tempos e Modos",
      "Tempos Compostos": "Verbos - Tempos e Modos",
      "Emprego Verbal": "Verbos - Tempos e Modos",
      "Modo Imperativo": "Verbos - Tempos e Modos",
      "Verbos - Imperativo": "Verbos - Tempos e Modos",
      "Conjugação": "Verbos Irregulares",
      "Verbos Derivados": "Verbos Irregulares",
      "Verbos Defetivos": "Verbos Irregulares",
      "Particípio": "Verbos Abundantes",
      "Particípio Abundante": "Verbos Abundantes",
      "Formas Nominais": "Gerúndio",
      "Emprego de Tempos e Modos": "Verbos - Tempos e Modos",
      "Tempos Verbais": "Verbos - Tempos e Modos",
      "Tempos e Modos": "Verbos - Tempos e Modos"
    },
    "05 - Concordância": {
      "Concordância Verbal e Nominal": "Concordância Verbal",
      "Concordância Verbal (Núcleo do Sujeito)": "Concordância Verbal",
      "Concordância Verbal (Sujeito Resumido)": "Concordância Verbal",
      "Concordância com Sujeito Oracional": "Concordância Verbal",
      "Concordância Verbal - Sujeito Oracional": "Concordância Verbal",
      "Concordância com Nomes Próprios no Plural": "Concordância Verbal",
      "Concordância Verbal - Verbo 'Haver' (Existir)": "Concordância Verbal - Verbo Haver",
      "Concordância Verbal - Verbo 'Haver' (Ocorrer)": "Concordância Verbal - Verbo Haver",
      "Concordância Verbal - Verbo 'Haver' (Tempo)": "Concordância Verbal - Verbo Haver",
      "Concordância Verbal - Verbo 'Haver' Auxiliar": "Concordância Verbal - Verbo Haver",
      "Concordância Verbal (Haver em Locução)": "Concordância Verbal - Verbo Haver",
      "Concordância Verbal (Verbo Existir)": "Concordância Verbal - Verbo Haver",
      "Concordância com Verbos de Sentido Existencial": "Concordância Verbal - Verbo Haver",
      "Concordância com o Verbo Haver": "Concordância Verbal - Verbo Haver",
      "Concordância com 'Fazer' (Tempo)": "Concordância Verbal - Verbo Fazer",
      "Concordância com o Verbo Fazer": "Concordância Verbal - Verbo Fazer",
      "Concordância com Verbos de Tempo": "Concordância Verbal - Verbo Fazer",
      "Concordância Verbal - Verbos de Relógio": "Concordância Verbal - Verbo Fazer",
      "Concordância com o Verbo Bater (Horas)": "Concordância Verbal - Verbo Fazer",
      "Concordância com 'Meio-dia e meia'": "Concordância Verbal - Verbo Fazer",
      "Concordância Verbal - Verbos 'Dar/Bater/Soar'": "Concordância Verbal - Verbo Fazer",
      "Concordância Verbal (Verbos Impessoais)": "Concordância Verbal - Verbo Fazer",
      "Verbos Impessoais": "Concordância Verbal - Verbo Fazer",
      "Concordância com o Verbo Ser": "Concordância Verbal - Verbo Ser",
      "Concordância com 'Parecer + Infinitivo'": "Concordância Verbal - Verbo Parecer",
      "Concordância Verbal (Partícula SE)": "Concordância com a Partícula SE",
      "Concordância Verbal - Pronome 'Se' Apassivador": "Concordância com a Partícula SE",
      "Concordância com 'Se' (IIS)": "Concordância com a Partícula SE",
      "Concordância com Sujeito Coletivo": "Concordância Verbal - Sujeito Coletivo",
      "Concordância com Expressões de Quantidade Aproximada": "Concordância Verbal - Expressões Partitivas",
      "Concordância com Porcentagem": "Concordância Verbal - Porcentagem",
      "Concordância com Numerais e Porcentagens": "Concordância Verbal - Porcentagem",
      "Concordância Verbal - Sujeito 'Mais de um'": "Concordância Verbal - Mais de um",
      "Concordância com 'Mais de um'": "Concordância Verbal - Mais de um",
      "Concordância com 'Nem um nem outro'": "Concordância Verbal - Nem um nem outro",
      "Concordância Verbal - Sujeito com 'Nem... Nem'": "Concordância Verbal - Nem um nem outro",
      "Concordância Verbal - Sujeito com 'Ou'": "Concordância Verbal (Conjunção OU)",
      "Concordância com 'Ou'": "Concordância Verbal (Conjunção OU)",
      "Concordância com Sujeito Composto Posposto": "Concordância Verbal - Sujeito Composto Posposto",
      "Concordância Verbal (Sujeito Composto por Pessoas Diferentes)": "Concordância Verbal - Sujeito Composto Posposto",
      "Concordância Verbal - Sujeito Composto por Pronomes": "Concordância Verbal - Sujeito Composto Posposto",
      "Concordância Verbal - Sujeito com 'Com'": "Concordância Verbal - Sujeito Composto Posposto",
      "Concordância Verbal - Pronome 'Quem'": "Concordância Verbal - Pronome Relativo QUEM",
      "Concordância Verbal - Sujeito 'Quem'": "Concordância Verbal - Pronome Relativo QUEM",
      "Concordância com Pronome Relativo QUEM": "Concordância Verbal - Pronome Relativo QUEM",
      "Concordância Verbal - Sujeito 'Quais de nós'": "Concordância Verbal - Pronome Relativo QUEM",
      "Concordância com Pronome Relativo QUE": "Concordância Verbal (Pronome Relativo QUE)",
      "Concordância Verbal - Um dos que": "Concordância Verbal - Expressão 'Um dos que'",
      "Concordância com 'Um dos que'": "Concordância Verbal - Expressão 'Um dos que'",
      "Concordância com 'Haja Vista'": "Concordância Verbal - Haja Vista",
      "Concordância Geral": "Concordância Nominal",
      "Concordância Nominal - Casos Especiais": "Concordância Nominal",
      "Concordância Nominal - Adjetivo Anteposto": "Concordância Nominal",
      "Concordância Nominal - Adjetivo Posposto": "Concordância Nominal",
      "Concordância Nominal - Adjetivo Adverbializado": "Concordância Nominal",
      "Concordância com 'O mais possível'": "Concordância Nominal",
      "Concordância Nominal - Possível": "Concordância Nominal",
      "Concordância Nominal (Cores)": "Concordância Nominal",
      "Concordância Nominal - Meio": "Concordância Nominal - Palavra 'Meio'",
      "Concordância Nominal (Meio/Bastante)": "Concordância Nominal - Palavra 'Meio'",
      "Concordância Nominal - Bastante": "Concordância Nominal - Palavra 'Meio'",
      "Concordância Nominal (Bastante/Muito)": "Concordância Nominal - Palavra 'Meio'",
      "Concordância com 'Bastante' e 'Meio'": "Concordância Nominal - Palavra 'Meio'",
      "Concordância com 'Bastantes'": "Concordância Nominal - Palavra 'Meio'",
      "Concordância com 'Anexo/Incluso'": "Concordância Nominal - Anexo e Incluso",
      "Concordância Nominal (Obrigado/Mesmo)": "Concordância Nominal - Obrigado",
      "Concordância com 'Só/Sós'": "Concordância Nominal - Só e A sós",
      "Concordância Nominal (Alerta/Menos)": "Concordância Nominal - Menos e Alerta",
      "Concordância com 'Menos/Alerta'": "Concordância Nominal - Menos e Alerta",
      "Concordância Nominal - Expressão 'É bom/É necessário'": "Concordância Nominal - É proibido/É necessário",
      "Concordância com 'É necessário/bom/proibido'": "Concordância Nominal - É proibido/É necessário",
      "Concordância com Expressões 'É proibido/necessário'": "Concordância Nominal - É proibido/É necessário",
      "Concordância com 'Tal qual'": "Concordância Nominal - Tal qual",
      "Concordância Verbal com Expressões Partitivas": "Concordância Verbal - Expressões Partitivas",
      "Concordância Verbal (Expressões Partitivas)": "Concordância Verbal - Expressões Partitivas",
      "Concordância Verbal (Sujeito Coletivo)": "Concordância Verbal - Sujeito Coletivo",
      "Concordância Verbal - Verbo 'Ser'": "Concordância Verbal - Verbo Ser",
      "Concordância Nominal - Anexo/Incluso": "Concordância Nominal - Anexo e Incluso",
      "Concordância Verbal (Mais de um)": "Concordância Verbal - Mais de um",
      "Concordância Nominal (Só/Sós)": "Concordância Nominal - Só e A sós",
      "Concordância Verbal - Verbo 'Fazer'": "Concordância Verbal - Verbo Fazer",
      "Concordância Verbal (Verbo Haver)": "Concordância Verbal - Verbo Haver"
    },
    "06 - Regência e Crase": {
      "Regência": "Regência Verbal"
    },
    "10 - Semântica e Tipos de Textos": {
      "Semântica": "Significado Palavras"
    },
    "11 - Compreensão e Interpretação Textual": {
      "Estrutura Textual": "Ideia Central",
      "Análise Discursiva": "Argumentação"
    },
    "12 - Reescrita de frases": {
      "Gramática": "Norma Culta",
      "Clareza": "Norma Culta",
      "Verbos - Tempos e Modos": "Emprego de Tempos e Modos"
    }
  },
  "Direito Administrativo": {
    "__TEMAS__": {
      "01 - Princípios da Administração Pública": "03 - Princípios Administrativos"
    },
    "09 - Atos Administrativos: Classificação, Espécies e Extinção": {
      "Extinção do Ato Administrativo": "Extinção dos Atos Administrativos"
    },
    "08 - Atos Administrativos I: Conceito, Requisitos, Atributos": {
      "Atributos: Presunção de Legitimidade": "Atributos - Presunção de Legitimidade",
      "Atributos: Imperatividade": "Atributos - Imperatividade",
      "Atributos: Tipicidade": "Atributos - Tipicidade"
    },
    "21 - Lei de Improbidade Administrativa (Lei 8.429/92, alterada pela Lei 14.230/21)": {
      "Sujeitos Ativos": "Sujeito Ativo (Terceiro)",
      "Perda da Função Pública": "Sanções - Perda da Função",
      "Sanções - Suspensão de Direitos Políticos (Dano)": "Sanções - Suspensão de Direitos Políticos"
    },
    "04 - Organização Administrativa": {
      "Sociedade de Economia Mista": "Sociedades de Economia Mista"
    }
  },
  "Direito Penal": {
    "01 - Aplicação da Lei Penal e Princípios do Direito Penal": {
      "Aplicação da Lei Penal": "Aplicação da Lei Penal (regras gerais e interpretação)"
    },
    "02 - Teoria Geral do Delito - Fato Típico e seus Elementos": {
      "Teoria do Erro": "Teoria do Erro (de tipo e de proibição)",
      "Iter Criminis": "Iter Criminis (Consumação, Tentativa, Desistência, Arrependimento)",
      "Conduta": "Conduta (ação e omissão)",
      "Ilicitude": "Ilicitude (Antijuridicidade e Excludentes)"
    },
    "13 - Dos crimes contra o estado democrático de direito": {
      "Sabotagem": "Sabotagem (Art. 359-R)"
    },
    "12 - Crimes contra a Administração da Justiça": {
      "Denunciação Caluniosa": "Denunciação Caluniosa (Art. 339)"
    },
    "09 - Crimes Contra a Administração Pública": {
      "Peculato": "Peculato (próprio, impróprio, culposo, mediante erro de outrem)"
    },
    "08 - Dos Crimes Contra a Fé Pública": {
      "Moeda Falsa": "Moeda Falsa (Art. 289)",
      "Falsidade Documental": "Falsidade Documental (pública e particular – Art. 297-298)",
      "Falsa Identidade": "Falsa Identidade (Art. 307)",
      "Falsidade Ideológica": "Falsidade Ideológica (Art. 299)"
    },
    "07 - Crimes Contra a Dignidade Sexual": {
      "Assédio Sexual": "Assédio Sexual (Art. 216-A)",
      "Crimes contra a Dignidade Sexual (disposições gerais e classification)": "Crimes contra a Dignidade Sexual (disposições gerais e classificação)"
    },
    "06 - Crimes contra o Patrimônio": {
      "Furto": "Furto (simples, qualificado, privilegiado, noturno)"
    },
    "05 - Dos crimes contra a pessoa II - Art. 138 a 153 do CP": {
      "Crimes contra a Honra": "Crimes contra a Honra (calúnia, difamação, injúria)"
    },
    "04 - Crimes Contra a Pessoa I (Art. 121 a 136 do CP)": {
      "Homicídio": "Homicídio (simples, privilegiado, qualificado, culposo)",
      "Lesão Corporal": "Lesão Corporal (leve, grave, gravíssima, seguida de morte)",
      "Crimes Contra Vida": "Crimes Contra a Vida (induzimento, infanticídio, aborto)"
    },
    "03 - Ação Penal": {
      "Ação Penal": "Ação Penal (disposições gerais, decadência, renúncia, perdão)"
    },
    "33 - Edicao Extraordinaria 13 STJ": {
      "Lavagem de Dinheiro e Crime Tributário": "Lavagem de Dinheiro e Crime Tributário (autonomia e cegueira deliberada)",
      "🆕 HC 598.051/SP – Cegueira Deliberada em ilícitos fiscais de pessoa jurídica (STJ, 2021)": "🆕 HC 598.051/SP – Cegueira deliberada em ilícitos fiscais de pessoa jurídica (STJ, mar/2021)"
    },
    "26 - Informativo Jurisprudencia 778 STJ": {
      "Concurso de Crimes (formal, material, continuidade delitiva)": "Concurso de Crimes"
    }
  },
  "Segurança Orgânica": {
    "01 - Prevenção e combate a incêndio": {
      "Extintores, hidrantes e métodos of extinção": "Extintores, hidrantes e métodos de extinção"
    }
  },
  "Legislação Penal Especial": {
    "04 - Estatuto do Desarmamento e Porte no Judiciário": {
      "Porte de arma institucional (Regras gerais e exceptions)": "Porte de arma institucional (Regras gerais e exceções)"
    }
  }
};

const MAPA_EDITAL_RESOLVIDO = {};

// Conflitos de classificação já resolvidos pela regra 3.2.4 (informativo; lido por auditarDuplicatasEdital).
const MAPA_EDITAL_CONFLITOS_V99 = [
  "Direito Administrativo > 09 - Atos Administrativos: Classificação, Espécies e Extinção > \"Extinção dos Atos Administrativos\": importâncias Extinção dos Atos Administrativos=BAIXO | Extinção do Ato Administrativo=EXCLUIR -> vale BAIXO",
  "Direito Administrativo > 08 - Atos Administrativos I: Conceito, Requisitos, Atributos > \"Atributos - Presunção de Legitimidade\": importâncias Atributos - Presunção de Legitimidade=EXCLUIR | Atributos: Presunção de Legitimidade=CRÍTICO -> vale CRÍTICO",
  "Direito Administrativo > 08 - Atos Administrativos I: Conceito, Requisitos, Atributos > \"Atributos - Imperatividade\": importâncias Atributos - Imperatividade=EXCLUIR | Atributos: Imperatividade=CRÍTICO -> vale CRÍTICO",
  "Direito Administrativo > 08 - Atos Administrativos I: Conceito, Requisitos, Atributos > \"Atributos - Tipicidade\": importâncias Atributos - Tipicidade=EXCLUIR | Atributos: Tipicidade=CRÍTICO -> vale CRÍTICO",
  "Direito Administrativo > 21 - Lei de Improbidade Administrativa (Lei 8.429/92, alterada pela Lei 14.230/21) > \"Sujeito Ativo (Terceiro)\": importâncias Sujeitos Ativos=MÉDIO | Sujeito Ativo (Terceiro)=EXCLUIR -> vale MÉDIO",
  "Direito Administrativo > 21 - Lei de Improbidade Administrativa (Lei 8.429/92, alterada pela Lei 14.230/21) > \"Sanções - Perda da Função\": importâncias Sanções - Perda da Função=ALTO | Perda da Função Pública=EXCLUIR -> vale ALTO",
  "Direito Administrativo > 04 - Organização Administrativa > \"Sociedades de Economia Mista\": importâncias Sociedades de Economia Mista=EXCLUIR | Sociedade de Economia Mista=MÉDIO -> vale MÉDIO",
  "Direito Penal > 02 - Teoria Geral do Delito - Fato Típico e seus Elementos > \"Teoria do Erro (de tipo e de proibição)\": importâncias Teoria do Erro=EXCLUIR | Teoria do Erro (de tipo e de proibição)=BAIXO -> vale BAIXO",
  "Direito Penal > 02 - Teoria Geral do Delito - Fato Típico e seus Elementos > \"Iter Criminis (Consumação, Tentativa, Desistência, Arrependimento)\": importâncias Iter Criminis=EXCLUIR | Iter Criminis (Consumação, Tentativa, De=MÉDIO -> vale MÉDIO",
  "Direito Penal > 02 - Teoria Geral do Delito - Fato Típico e seus Elementos > \"Conduta (ação e omissão)\": importâncias Conduta=EXCLUIR | Conduta (ação e omissão)=BAIXO -> vale BAIXO",
  "Direito Penal > 02 - Teoria Geral do Delito - Fato Típico e seus Elementos > \"Ilicitude (Antijuridicidade e Excludentes)\": importâncias Ilicitude=EXCLUIR | Ilicitude (Antijuridicidade e Excludente=ALTO -> vale ALTO",
  "Direito Penal > 13 - Dos crimes contra o estado democrático de direito > \"Sabotagem (Art. 359-R)\": importâncias Sabotagem=EXCLUIR | Sabotagem (Art. 359-R)=BAIXO -> vale BAIXO",
  "Direito Penal > 09 - Crimes Contra a Administração Pública > \"Peculato (próprio, impróprio, culposo, mediante erro de outrem)\": importâncias Peculato=MÉDIO | Peculato (próprio, impróprio, culposo, m=CRÍTICO -> vale CRÍTICO",
  "Direito Penal > 08 - Dos Crimes Contra a Fé Pública > \"Moeda Falsa (Art. 289)\": importâncias Moeda Falsa=EXCLUIR | Moeda Falsa (Art. 289)=BAIXO -> vale BAIXO",
  "Direito Penal > 08 - Dos Crimes Contra a Fé Pública > \"Falsidade Documental (pública e particular – Art. 297-298)\": importâncias Falsidade Documental=MÉDIO | Falsidade Documental (pública e particul=CRÍTICO -> vale CRÍTICO",
  "Direito Penal > 08 - Dos Crimes Contra a Fé Pública > \"Falsa Identidade (Art. 307)\": importâncias Falsa Identidade=EXCLUIR | Falsa Identidade (Art. 307)=MÉDIO -> vale MÉDIO",
  "Direito Penal > 08 - Dos Crimes Contra a Fé Pública > \"Falsidade Ideológica (Art. 299)\": importâncias Falsidade Ideológica=MÉDIO | Falsidade Ideológica (Art. 299)=ALTO -> vale ALTO",
  "Direito Penal > 06 - Crimes contra o Patrimônio > \"Furto (simples, qualificado, privilegiado, noturno)\": importâncias Furto=EXCLUIR | Furto (simples, qualificado, privilegiad=BAIXO -> vale BAIXO",
  "Direito Penal > 05 - Dos crimes contra a pessoa II - Art. 138 a 153 do CP > \"Crimes contra a Honra (calúnia, difamação, injúria)\": importâncias Crimes contra a Honra=EXCLUIR | Crimes contra a Honra (calúnia, difamaçã=MÉDIO -> vale MÉDIO",
  "Direito Penal > 04 - Crimes Contra a Pessoa I (Art. 121 a 136 do CP) > \"Lesão Corporal (leve, grave, gravíssima, seguida de morte)\": importâncias Lesão Corporal=BAIXO | Lesão Corporal (leve, grave, gravíssima,=MÉDIO -> vale MÉDIO",
  "Direito Penal > 04 - Crimes Contra a Pessoa I (Art. 121 a 136 do CP) > \"Crimes Contra a Vida (induzimento, infanticídio, aborto)\": importâncias Crimes Contra Vida=EXCLUIR | Crimes Contra a Vida (induzimento, infan=MÉDIO -> vale MÉDIO",
  "Direito Penal > 03 - Ação Penal > \"Ação Penal (disposições gerais, decadência, renúncia, perdão)\": importâncias Ação Penal=EXCLUIR | Ação Penal (disposições gerais, decadênc=BAIXO -> vale BAIXO",
  "Direito Penal > 33 - Edicao Extraordinaria 13 STJ > grupo FORA (todas as equivalentes do Config são EXCLUIR; inclui item sem mapa ou com 🆕): 🆕 HC 598.051/SP – Cegueira Deliberada em ilícitos fiscais de pessoa j [5q EXCLUIR] ## 🆕 HC 598.051/SP – Cegueira deliberada em ilícitos fiscais de pessoa j [11q -]",
  "Direito Penal > 26 - Informativo Jurisprudencia 778 STJ > \"Concurso de Crimes\": importâncias Concurso de Crimes=BAIXO | Concurso de Crimes (formal, material, co=MÉDIO -> vale BAIXO"
];

(function _aplicarAdequacaoMapaEdital() {
  if (typeof MAPA_DISTRIBUICAO_EDITAL === 'undefined' || !MAPA_DISTRIBUICAO_EDITAL) return;
  Object.keys(MAPA_ALIASES_EDITAL).forEach(function (d) {
    var mapaD = MAPA_DISTRIBUICAO_EDITAL[d];
    if (!mapaD) return;
    Object.keys(MAPA_ALIASES_EDITAL[d]).forEach(function (t) {
      if (t === '__TEMAS__' || !mapaD[t]) return;
      Object.keys(MAPA_ALIASES_EDITAL[d][t]).forEach(function (variante) {
        if (Object.prototype.hasOwnProperty.call(mapaD[t], variante)) delete mapaD[t][variante];
      });
    });
  });
  Object.keys(MAPA_EDITAL_RESOLVIDO).forEach(function (d) {
    var mapaD = MAPA_DISTRIBUICAO_EDITAL[d];
    if (!mapaD) return;
    Object.keys(MAPA_EDITAL_RESOLVIDO[d]).forEach(function (t) {
      if (!mapaD[t]) return;
      Object.keys(MAPA_EDITAL_RESOLVIDO[d][t]).forEach(function (s) {
        var r = MAPA_EDITAL_RESOLVIDO[d][t][s];
        mapaD[t][s] = { distribuicao: r.distribuicao, importancia: r.importancia };
      });
    });
  });
  // mantém ORDEM_DE_ESTUDO.ativos coerente com o mapa unificado (só o contador; ordem/pesos intactos)
  if (typeof ORDEM_DE_ESTUDO !== 'undefined' && Array.isArray(ORDEM_DE_ESTUDO)) {
    ORDEM_DE_ESTUDO.forEach(function (o) {
      var t = MAPA_DISTRIBUICAO_EDITAL[o.disciplina] && MAPA_DISTRIBUICAO_EDITAL[o.disciplina][o.tema];
      if (t) o.ativos = Object.keys(t).filter(function (k) { return t[k].importancia !== 'EXCLUIR'; }).length;
    });
  }
})();

// ═════════════════════════════════════════════════════════════════════════════
// V104 — ORDEM DIDÁTICA (pré-requisitos)
// Só define a ORDEM de estudo. Nenhuma chave do MAPA_DISTRIBUICAO_EDITAL é
// renomeada: os nomes continuam idênticos aos do Raio-X e das questões.
//   • temas:    números dos temas, na ordem de estudo (os não listados vêm depois,
//               em ordem numérica);
//   • subtemas: por número de tema, os subtemas na ordem de estudo (os não
//               listados vêm depois, na ordem em que estão no mapa).
// Disciplina ausente daqui = ordem do mapa (número do tema / ordem do Config).
// Critério: o assunto só vem depois dos assuntos de que depende.
// ═════════════════════════════════════════════════════════════════════════════
const ORDEM_DIDATICA = {
  "Língua Portuguesa": {
    temas: ["02", "03", "01", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13"],
    subtemas: {
      "02": ["Classes de Palavras", "Formação de Palavras", "Substantivos - Gênero", "Substantivos - Plural de Compostos",
             "Adjetivos - Flexão de Grau", "Pronomes", "Pronomes Pessoais", "Pronomes de Tratamento", "Pronomes Possessivos",
             "Pronomes Demonstrativos", "Pronomes Indefinidos", "Pronomes Relativos", "Colocação Pronominal",
             "Preposições (Valor Semântico)", "Conjunções - Valor Semântico"],
      "03": ["Verbos - Tempos e Modos", "Verbos Irregulares", "Verbos Abundantes", "Locuções Verbais", "Gerúndio",
             "Vozes Verbais", "Correlação Verbal"],
      "01": ["Sujeito", "Sujeito Indeterminado", "Sujeito Oracional", "Predicado", "Transitividade Verbal", "Objeto Direto",
             "Objeto Indireto", "Predicativo do Sujeito", "Predicativo do Objeto", "Adjunto Adnominal vs Complemento Nominal",
             "Adjunto Adverbial", "Agente da Passiva", "Aposto", "Vocativo", "Partícula SE"],
      "04": ["Orações Coordenadas Aditivas", "Orações Coordenadas Adversativas", "Orações Coordenadas Alternativas",
             "Orações Coordenadas Conclusivas", "Orações Coordenadas Explicativas", "Orações Subordinadas Substantivas",
             "Orações Subordinadas Adjetivas", "Orações Subordinadas Adverbiais Causais",
             "Orações Subordinadas Adverbiais Comparativas", "Orações Subordinadas Adverbiais Concessivas",
             "Orações Subordinadas Adverbiais Condicionais", "Orações Subordinadas Adverbiais Conformativas",
             "Orações Subordinadas Adverbiais Consecutivas", "Orações Subordinadas Adverbiais Finais",
             "Orações Subordinadas Adverbiais Proporcionais", "Orações Subordinadas Adverbiais Temporais"],
      "06": ["Regência Verbal", "Regência Nominal", "Regência e Crase", "Crase", "Crase Facultativa e Proibida",
             "Crase em Locuções e Pronomes"],
      "07": ["Pontuação", "Vírgula no período simples (sujeito, adjuntos deslocados, vocativo e aposto)",
             "Vírgula em Orações Subordinadas", "Ponto e Vírgula", "Dois-pontos, travessão, parênteses, aspas e reticências"],
      "08": ["Fonologia", "Ortografia", "Acordo Ortográfico", "Acentuação", "Hífen", "Emprego do Porquê"],
      "10": ["Significado Palavras", "Denotação e Conotação", "Sinonímia e Antonímia", "Figuras Linguagem",
             "Tipologia Textual", "Gêneros Textuais", "Discurso", "Intertextualidade"],
      "12": ["Reescrita", "Norma Culta", "Emprego de Tempos e Modos", "Conectivos", "Sintaxe",
             "Organização e reorganização de orações e períodos", "Equivalência e transformação de estruturas"]
    }
  },
  "RLM": {
    temas: ["02", "04", "03", "05", "06", "07", "08", "13"],
    subtemas: {
      "04": ["Conceito de Proposição", "Conectivos Lógicos", "Tabela-Verdade", "Bicondicional", "Tautologia",
             "Equivalência Lógica", "Equivalência da Condicional", "Equivalência da Bicondicional", "Negação de Conjunção",
             "Negação de Disjunção", "Negação de Condicional", "Negação de Bicondicional", "Negação de Proposições Compostas",
             "Negação de Quantificadores", "Condições Necessárias e Suficientes"],
      "03": ["Validade de Argumentos", "Diagramas Lógicos", "Silogismos", "Silogismo Hipotético", "Silogismo Disjuntivo",
             "Falácias Lógicas"],
      "07": ["Razão e Proporção", "Grandezas Proporcionais", "Regra de Três Simples", "Regra de Três Composta",
             "Divisão Proporcional", "Divisão Proporcional Inversa", "Divisão Proporcional Composta"]
    }
  },
  "Direito Constitucional": {
    temas: ["08", "09", "12", "11", "13", "03", "04", "05", "06", "07", "01", "02", "14", "15", "16", "17", "18", "19",
            "20", "21", "22", "23", "24", "25"],
    subtemas: {
      "08": ["Conceito", "Constitucionalismo", "História Constitucional", "Classificação", "Estrutura", "Preâmbulo",
             "Supremacia", "Poder Constituinte", "Vigência das normas constitucionais", "Eficácia", "Interpretação"],
      "13": ["Teoria Geral", "Fundamentos", "Objetivos", "Princípios Gerais", "Relações Internacionais", "Soberania",
             "Cidadania", "Dignidade Humana", "Democracia", "Formas Estado", "Forma Governo", "Sistemas", "Federalismo",
             "Separação Poderes", "Relações Interpoderes"],
      "03": ["Teoria Geral", "Direitos Fundamentais", "Garantias Fundamentais", "Dignidade Humana", "Aplicabilidade",
             "Eficácia", "Efetividade Direitos", "Restrições", "Colisão Direitos", "Cláusulas Pétreas",
             "Tratados Internacionais", "Inviolabilidades", "Direitos Políticos", "Judicialização"],
      "24": ["Controle de Constitucionalidade", "Inconstitucionalidade", "Sistemas", "Momentos", "Controle Difuso",
             "Reserva Plenário", "Controle Concentrado", "Competência", "Legitimidade", "Capacidade Postulatória",
             "Amicus Curiae"],
      "25": ["Controle de Constitucionalidade", "Controle Geral", "Inconstitucionalidade", "Controle Difuso",
             "Controle Concentrado", "Arguição de Descumprimento de Preceito Fundamental (ADPF)", "Processo Decisório",
             "Efeitos", "Amicus Curiae", "Advocacia Pública"]
    }
  },
  "Direito Administrativo": {
    temas: ["02", "03", "06", "07", "08", "09", "10", "11", "01", "15", "16", "18", "17", "19", "21", "24", "26", "27"],
    subtemas: {
      "02": ["Conceito de Estado e seus Elementos", "Estado e Nação", "Conceito de Povo e População", "Soberania Interna e Externa",
             "Funções Estatais", "Funções do Estado e Tripartição de Poderes", "Poderes do Estado e Funções", "Conceito de Governo",
             "Administração Pública e Governo", "Administração Pública", "Sentidos da Administração Pública (Formal vs Material)",
             "Administração Pública em Sentido Amplo e Estrito", "Administração Pública em Sentido Objetivo", "Direito Administrativo",
             "Conceito e Natureza Jurídica", "Codificação e Autonomia", "Critérios de Definição do Direito Administrativo",
             "Escola do Serviço Público", "Critério da Excludência (Residual)", "Sistemas Administrativos",
             "Fontes do Direito Administrativo", "Doutrina como Fonte", "Costumes como Fonte",
             "Princípios Gerais do Direito como Fonte", "Súmulas Vinculantes como Fonte", "Regime Jurídico Administrativo",
             "Princípios Administrativos", "Princípios da Administração Pública"],
      "03": ["Princípios Administrativos", "Classificação Princípios", "Regime Jurídico Administrativo",
             "Princípios da Administração Pública", "Legalidade", "Princípio da Impessoalidade", "Princípio da Moralidade",
             "Publicidade", "Princípio da Eficiência", "Publicidade e Promoção Pessoal", "Nepotismo",
             "Princípio da Segurança Jurídica", "Princípio da Autotutela", "Motivação", "Contraditório", "Republicano"],
      "06": ["Entidades Paraestatais", "Terceiro Setor", "Serviços Sociais Autônomos", "Terceiro Setor - Sistema S",
             "Organizações Sociais (OS)", "Terceiro Setor - Organizações Sociais", "Conselho de Administração das OS",
             "Desqualificação de OS", "OSCIP", "Terceiro Setor - OSCIP", "Remuneração nas OSCIPs",
             "Marco Regulatório (Lei 13.019/14)", "Chamamento Público", "MROSC - Acordo de Cooperação", "Fundações de Apoio",
             "Poder de Polícia no Terceiro Setor", "Administração Indireta", "Agências Reguladoras"],
      "07": ["Poderes e deveres do administrador público", "Poderes Administrativos", "Poder Vinculado vs Discricionário",
             "Poder Hierárquico", "Poder Hierárquico - Ordens", "Poder Hierárquico - Supervisão", "Poder Hierárquico - Delegação",
             "Poder Hierárquico - Avocação", "Poder Disciplinar", "Poder Disciplinar - Relação com Hierárquico",
             "Poder Disciplinar - Discrecionariedade", "Poder Disciplinar - Devido Processo", "Poder Regulamentar",
             "Poder Regulamentar - Limites", "Poder de Polícia", "Poder de Polícia - Conceito", "Poder de Polícia vs Judiciária",
             "Poder de Polícia - Prescritivo vs Concreto", "Ciclo do Poder de Polícia", "Atributos do Poder de Polícia",
             "Atributos - Autoexecutoriedade", "Poder de Polícia - Coercibilidade", "Poder de Polícia - Limites",
             "Poder de Polícia - Sanção", "Poder de Polícia e Delegação", "Poder de Polícia - Delegação a Particulares",
             "Poder de Polícia - Taxas", "Poder de Polícia - Prescrição", "Abuso de Poder", "Abuso de Poder: Excesso de Poder",
             "Abuso de Poder: Desvio de Finalidade", "Abuso de Poder - Omissão"]
    }
  },
  "Direito Penal": {
    temas: ["01", "02", "34", "03", "04", "05", "06", "09", "10", "11", "32", "12"],
    subtemas: {
      "01": ["Princípios do Direito Penal", "Princípio da Legalidade", "Princípio da Insignificância",
             "Princípio da Intranscendência", "Aplicação da Lei Penal (regras gerais e interpretação)",
             "Conflito Aparente de Normas", "Aplicação da Lei Penal no Tempo", "Lei Penal no Tempo", "Lei no Tempo",
             "Lei Penal no Espaço (Territorialidade e Extraterritorialidade)", "Lei no Espaço", "Tempo e Lugar",
             "Tempo e Lugar do Crime", "Penas"],
      "02": ["Conceito de Crime", "Conceito Analítico de Crime", "Teoria do Crime", "Conduta (ação e omissão)", "Nexo Causal",
             "Dolo e Culpa", "Teoria do Erro (de tipo e de proibição)",
             "Iter Criminis (Consumação, Tentativa, Desistência, Arrependimento)", "Ilicitude (Antijuridicidade e Excludentes)",
             "Culpabilidade", "Concurso de Pessoas", "Concurso de Crimes"],
      "03": ["Ação Penal (disposições gerais, decadência, renúncia, perdão)", "Ação Pública",
             "Ação Penal Pública (incondicionada e condicionada)", "Ação Privada",
             "Ação Penal Privada (exclusiva, personalíssima, subsidiária)"],
      "04": ["Crimes contra a Pessoa", "Homicídio (simples, privilegiado, qualificado, culposo)", "Homicídio Qualificado",
             "Homicídio Qualificado e Feminicídio", "Crimes Contra a Vida (induzimento, infanticídio, aborto)", "Suicídio",
             "🆕 Lei 14.811/2024 – Crime de Bullying e induzimento ao suicídio em redes (Lei 14811, 2024)", "🆕 Lei 14.811/2024 – Bullying como crime e induzimento ao suicídio em redes sociais (Lei 14.811, jan/2024)",
             "Infanticídio", "Aborto", "Lesão Corporal (leve, grave, gravíssima, seguida de morte)",
             "Periclitação da Vida e da Saúde (omissão de socorro e correlatos)", "Omissão de Socorro", "Rixa"]
    }
  },
  "Processo Penal": {
    temas: ["02", "03", "04", "05", "06", "07", "08", "01"]
  },
  "Informática": {
    temas: ["07", "06", "01", "02", "08", "03", "04", "05", "10", "11", "09"],
    subtemas: {
      "06": ["Organização de arquivos, pastas e programas", "Windows: área de trabalho, Explorador de Arquivos e Configurações",
             "Windows: atalhos e gerenciamento de arquivos e pastas", "Sistemas operacionais mobile (iOS e Android)"],
      "01": ["Conceitos de redes e topologias", "Equipamentos e meios de transmissão",
             "Protocolos de rede (TCP/IP, HTTP, DNS, FTP, e-mail)", "Internet, Intranet e Extranet", "Internet das Coisas (IoT)"],
      "08": ["Conceitos básicos (confidencialidade, integridade, disponibilidade, autenticidade)", "Riscos, incidentes e problemas",
             "Vírus, worms e outras pragas virtuais", "Antivírus, firewall e antispyware",
             "Autenticação de dois fatores e gestão de senhas", "Segurança em redes (firewall, VPN, criptografia)",
             "Backup (tipos e estratégias)"]
    }
  },
  "Segurança de Dignitários": {
    temas: ["01", "02", "06", "03", "04", "05", "07", "09", "10", "11", "12", "13", "14"],
    subtemas: {
      "01": ["Confidencialidade, integridade e disponibilidade", "Ameaças, vulnerabilidades e atributos básicos da informação",
             "Graus de sigilo e credenciamento", "Política Nacional de Segurança da Informação",
             "Engenharia social e comportamento do agente"],
      "02": ["SISBIN, ABIN e conceitos de inteligência", "Política Nacional de Inteligência (PNI): finalidade e utilização",
             "Metodologia, documentos e estados mentais", "Inteligência x Investigação / Fontes de coleta",
             "Controle da atividade de inteligência (controle parlamentar e democrático)"],
      "11": ["Princípios, bloqueios e uso progressivo da força", "Uso da força: Lei 13.060/2014 e Decreto 12.341/2024",
             "Princípios Básicos de Havana sobre Uso da Força e Armas de Fogo (PBUFAF, 1990)",
             "Código de Conduta da ONU (Res. 34/169) e Manual UNODC 2021",
             "Portaria MJSP 855/2025 (Comitê Nacional de Monitoramento do Uso da Força)"],
      "13": ["Sistema Nacional de Trânsito e disposições preliminares (CTB, Caps. I e II)", "Anexo I do CTB (conceitos e definições)",
             "Normas de circulação e conduta (CTB)", "Pedestres, cidadão e educação para o trânsito (CTB, Caps. IV a VI)",
             "Sinalização, engenharia e fiscalização (CTB, Caps. VII e VIII)", "Veículos, registro e licenciamento (CTB, Caps. IX a XIII)",
             "Habilitação (CTB, Cap. XIV)", "Infrações de trânsito", "Penalidades e medidas administrativas",
             "Processo administrativo de trânsito (CTB, Cap. XVIII)", "Crimes de trânsito (CTB, Cap. XIX)",
             "Disposições finais e transitórias (CTB, Cap. XX)", "Resoluções do CONTRAN"]
    }
  },
  "Direito da Pessoa Idosa e da Pessoa com Deficiência": {
    subtemas: {
      "01": ["Direitos fundamentais da pessoa idosa (Lei 10.741/2003, Título II)",
             "Medidas de proteção e política de atendimento (Lei 10.741/2003)", "Prioridade especial (80+) e acesso à justiça",
             "Crimes do Estatuto da Pessoa Idosa", "Conceitos de acessibilidade e prioridade PCD"]
    }
  },
  "Segurança Orgânica": {
    subtemas: {
      "01": ["Elementos do fogo, propagação e classes", "Extintores, hidrantes e métodos de extinção",
             "NR-23 (Portaria MTP 2.769/2022): texto atual e saídas de emergência", "Plano de evacuação e EPIs"],
      "02": ["Conceitos, sinalização do local e acionamento de recursos", "Avaliação primária e RCP/DEA",
             "Estado de choque, sinais vitais e avaliação secundária", "Hemorragias, fraturas e manobra de Heimlich",
             "Queimaduras, desmaios e transporte de vítima", "Primeiros socorros no trânsito: motociclista e remoção do capacete"]
    }
  },
  "Legislação Penal Especial": {
    subtemas: {
      "01": ["Disposições gerais, sujeitos e procedimento (arts. 1º a 8º e 39 a 45)",
             "Condutas: invasão de domicílio, prova ilícita, prisão ilegal", "Violência institucional (art. 15-A, Lei 14.321/2022)",
             "Ação penal, efeitos da condenação e dolo específico"],
      "04": ["Sinarm, registro e posse (arts. 1º a 5º)", "Porte de arma de fogo (arts. 6º a 11) e porte funcional em tribunais",
             "Porte de arma institucional (Regras gerais e exceções)", "Crimes: posse, porte, disparo e comércio ilegal"],
      "05": ["Prevenção, tratamento e disposições gerais", "Crimes e penas (arts. 28 a 40)", "Procedimento penal e investigação"],
      "06": ["Rol de crimes hediondos e equiparados", "Efeitos e regime de execução"]
    }
  },
  "Direitos Humanos": {
    subtemas: {
      "09": ["Direitos e garantias constitucionais da pessoa com deficiência",
             "Lei Brasileira de Inclusão (Lei 13.146/2015): conceito e avaliação biopsicossocial",
             "Lei Brasileira de Inclusão: direitos fundamentais, acessibilidade e discriminação",
             "Acessibilidade e prioridade de atendimento (Leis 10.098/2000 e 10.048/2000)",
             "Acessibilidade e atendimento prioritário (Decreto 5.296/2004)",
             "Apoio e integração social (Lei 7.853/1989 e Decreto 3.298/1999)", "Cão-guia (Lei 11.126/2005)",
             "Símbolo de identificação da pessoa com deficiência auditiva (Lei 8.160/1991)"]
    }
  },
  "Noções de Legislação": {
    subtemas: {
      "03": ["Res. CNJ 351/2020", "Conceitos: assédio moral, assédio sexual e discriminação",
             "Princípios, diretrizes e objetivos da política", "Recebimento e apuração de denúncias"]
    }
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { MAPA_DISTRIBUICAO_EDITAL, PESO_DISCIPLINA, PESO_TEMA, ORDEM_DE_ESTUDO, MARCOS_DE_COBERTURA, MAPA_ALIASES_EDITAL, MAPA_EDITAL_RESOLVIDO, MAPA_EDITAL_CONFLITOS_V99, ORDEM_DIDATICA };
}