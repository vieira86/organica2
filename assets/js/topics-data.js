/* ============================================================
   Metadados dos tópicos da disciplina
   Química Orgânica II — Técnico, IFRO Ji-Paraná
   ============================================================ */

const TOPICS = [
  {
    id: "substituicao",
    title: "Reações de Substituição",
    short: "Substituição",
    category: "Reações",
    catClass: "violet",
    description: "Substituição radicalar em alcanos e noções de substituição nucleofílica (SN1/SN2)."
  },
  {
    id: "adicao",
    title: "Reações de Adição",
    short: "Adição",
    category: "Reações",
    catClass: "violet",
    description: "Adição eletrofílica em alcenos e alcinos, regra de Markovnikov e hidratação."
  },
  {
    id: "eliminacao",
    title: "Reações de Eliminação",
    short: "Eliminação",
    category: "Reações",
    catClass: "violet",
    description: "Desidratação de álcoois e desidrohalogenação, formação de alcenos (E1/E2)."
  },
  {
    id: "oxidacao",
    title: "Reações de Oxidação",
    short: "Oxidação",
    category: "Reações",
    catClass: "amber",
    description: "Oxidação de álcoois primários e secundários, e de alcenos (ozonólise, clivagem)."
  },
  {
    id: "reducao",
    title: "Reações de Redução",
    short: "Redução",
    category: "Reações",
    catClass: "amber",
    description: "Hidrogenação catalítica de alcenos/alcinos e redução de carbonilas a álcoois."
  },
  {
    id: "aromaticas",
    title: "Substituição Eletrofílica Aromática",
    short: "SEA",
    category: "Aromáticos",
    catClass: "blue",
    description: "Halogenação, nitração, sulfonação e efeito de grupos ativadores/desativadores no anel."
  },
  {
    id: "acidos-derivados",
    title: "Ácidos Carboxílicos e Derivados",
    short: "Ácidos e Derivados",
    category: "Reações",
    catClass: "green",
    description: "Esterificação, saponificação e reações de derivados de ácidos carboxílicos."
  },
  {
    id: "polimeros",
    title: "Polímeros e Polimerização",
    short: "Polímeros",
    category: "Aplicações",
    catClass: "green",
    description: "Polimerização por adição e por condensação, e principais polímeros industriais."
  }
];

function getTopic(id){
  return TOPICS.find(t => t.id === id);
}
