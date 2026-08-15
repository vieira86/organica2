/* ============================================================
   Vídeos reais do YouTube por tópico (curadoria manual)
   Química Orgânica II — Técnico, IFRO Ji-Paraná
   ============================================================ */

const VIDEOS = {

  substituicao: [
    { id: "rE-8PC-xpzo", title: "Substituição Nucleofílica (SN1 e SN2)", channel: "Química Orgânica", desc: "Como reconhecer, diferenciar e desenhar os mecanismos SN1 e SN2." },
    { id: "aA4Xx-d7qpY", title: "SN1 vs SN2: Resumo", channel: "Khan Academy Brasil", desc: "Comparação dos fatores que favorecem cada mecanismo de substituição." }
  ],

  adicao: [
    { id: "UDwMTQ8tCdI", title: "Química Orgânica: Adição Eletrofílica a Alcenos", channel: "Química Orgânica", desc: "Mecanismo geral da adição eletrofílica em alcenos." },
    { id: "YheptA6jfzQ", title: "Regra de Markovnikov (Regiosseletividade) + Hidratação Catalisada por Ácido", channel: "Química Orgânica", desc: "Aplicação da regra de Markovnikov na hidratação ácida de alcenos." }
  ],

  eliminacao: [
    { id: "3IGHIawbhvY", title: "Eliminação: Desidratação de Álcoois", channel: "Módulo 26 — Aula 03", desc: "Mecanismo de desidratação de álcoois formando alcenos." },
    { id: "rn4wzq-6x7k", title: "Comparando as Reações E2, E1, SN2, SN1", channel: "Khan Academy Brasil", desc: "Diferenças entre os quatro mecanismos e quando cada um predomina." }
  ],

  oxidacao: [
    { id: "Mv6507qAuUY", title: "Oxidação de Álcoois I: Mecanismos e Estados de Oxidação", channel: "Khan Academy Brasil", desc: "Fundamentos da oxidação de álcoois primários, secundários e terciários." },
    { id: "awDBrhCYxo8", title: "Oxidação de Álcoois II: Exemplos", channel: "Khan Academy Brasil", desc: "Exemplos práticos de oxidação de diferentes álcoois." }
  ],

  reducao: [
    { id: "VQe3YbnZR2g", title: "Hidrogenação", channel: "Khan Academy Brasil", desc: "Hidrogenação de alcenos com catalisadores metálicos." },
    { id: "ntlbdaxjX8E", title: "Hidrogenação em Alcenos", channel: "Química Orgânica", desc: "Aplicação da hidrogenação catalítica na redução de alcenos." }
  ],

  aromaticas: [
    { id: "x4kj7LtcZ4I", title: "Mecanismo de Substituição Aromática Eletrofílica", channel: "Khan Academy Brasil", desc: "Etapas gerais da SEA e formação do intermediário arenônio." },
    { id: "WBqNsQpBWMo", title: "Substituição Eletrofílica em Aromáticos (SEAr) — Vídeo 3: Principais Tipos de Reações", channel: "Química Orgânica", desc: "Halogenação, nitração, sulfonação e outras reações clássicas de SEA." }
  ],

  "acidos-derivados": [
    { id: "k3wxm-kBsyM", title: "Reação de Esterificação", channel: "Química — Reações Orgânicas", desc: "Mecanismo da esterificação de Fischer entre ácido carboxílico e álcool." },
    { id: "84IUCn3-saA", title: "Reações Orgânicas de Substituição: Esterificação, Saponificação e Hidrólise", channel: "Química Orgânica", desc: "Comparação entre esterificação, hidrólise e saponificação." }
  ],

  polimeros: [
    { id: "MQxau1D7AVI", title: "Introdução aos Polímeros: Polímeros de Adição, Polimerização e Copolímeros", channel: "Aula 16 — Química III", desc: "Fundamentos da polimerização por adição e principais exemplos." },
    { id: "1AUFTMQGoV0", title: "Polímeros de Condensação: PET, Náilon-66, Kevlar, Baquelite", channel: "Aula 17 — Química III", desc: "Principais polímeros de condensação e suas aplicações industriais." }
  ]
};
