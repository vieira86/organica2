/* ============================================================
   Banco de Questões de Quiz por tópico
   Cada questão: { q, options: [4], correct: index, explain }
   Química Orgânica II — Técnico, IFRO Ji-Paraná
   ============================================================ */

const QUIZZES = {

  substituicao: [
    { q: "Na halogenação radicalar de alcanos, a etapa de iniciação consiste em:",
      options: ["Ataque do nucleófilo ao carbono", "Quebra homolítica do halogênio, gerando radicais livres", "Formação do carbocátion", "Eliminação de um próton"],
      correct: 1, explain: "Luz ou calor quebram a ligação X-X homoliticamente, formando dois radicais livres de halogênio que iniciam a cadeia." },
    { q: "No mecanismo SN2, a reação ocorre:",
      options: ["Em duas etapas, com carbocátion intermediário", "Em uma única etapa concertada, com inversão de configuração", "Sem envolver o nucleófilo", "Apenas em carbonos terciários"],
      correct: 1, explain: "SN2 é um mecanismo em etapa única: o nucleófilo ataca pelo lado oposto ao grupo abandonador, invertendo a configuração (inversão de Walden)." },
    { q: "O mecanismo SN1 é favorecido em substratos:",
      options: ["Primários", "Secundários apenas", "Terciários, que formam carbocátions mais estáveis", "Que não possuem grupo abandonador"],
      correct: 2, explain: "Carbocátions terciários são mais estáveis, favorecendo a etapa de ionização característica do mecanismo SN1." },
    { q: "Um bom grupo abandonador (nucleófugo) é caracterizado por:",
      options: ["Formar uma base fraca e estável ao sair", "Ser sempre um radical livre", "Aumentar a energia do estado de transição", "Não ter carga"],
      correct: 0, explain: "Bons grupos abandonadores formam espécies estáveis e pouco básicas ao se desligarem, como os haletos." },
    { q: "Na etapa de propagação da halogenação radicalar, o radical formado:",
      options: ["Se recombina imediatamente com outro radical", "Abstrai um hidrogênio do alcano, formando um novo radical de carbono", "Forma diretamente o produto final sem reagir mais", "Retorna ao halogênio molecular"],
      correct: 1, explain: "O radical halogênio abstrai um H do alcano, formando HX e um radical de carbono que continua a cadeia reacional." }
  ],

  adicao: [
    { q: "Segundo a regra de Markovnikov, na adição de HBr a um alceno assimétrico, o H se liga:",
      options: ["Ao carbono mais substituído da dupla", "Ao carbono menos substituído (com mais hidrogênios) da dupla", "Sempre ao carbono terminal", "Aleatoriamente aos dois carbonos"],
      correct: 1, explain: "O H se adiciona ao carbono que já tem mais H, deixando o carbocátion mais estável se formar no carbono mais substituído." },
    { q: "A hidratação ácida de um alceno forma:",
      options: ["Um éter", "Um álcool", "Um ácido carboxílico", "Um alcano"],
      correct: 1, explain: "A adição de água (H-OH) catalisada por ácido à dupla ligação forma um álcool, seguindo Markovnikov." },
    { q: "Na halogenação de um alceno com Br₂, o intermediário formado é:",
      options: ["Um carbocátion livre", "Um íon bromônio cíclico", "Um radical livre", "Um enolato"],
      correct: 1, explain: "O Br₂ forma um íon bromônio cíclico com a dupla ligação, que depois é aberto pelo ataque do Br⁻ pelo lado oposto." },
    { q: "A hidrogenação catalítica de um alcino com excesso de H₂ e catalisador (Pt/Pd/Ni) forma:",
      options: ["Um alceno apenas", "Um alcano, pela adição completa de duas moléculas de H₂", "Nenhuma reação ocorre", "Um composto aromático"],
      correct: 1, explain: "Com catalisador não seletivo e excesso de H₂, ambas as ligações pi do alcino são hidrogenadas, formando o alcano." },
    { q: "Reações de adição a alcenos e alcinos são classificadas como:",
      options: ["Eliminações", "Substituições", "Adições eletrofílicas (na maioria dos casos)", "Oxidações sempre"],
      correct: 2, explain: "A maioria das adições a ligações pi ricas em elétrons (como C=C) envolve o ataque inicial de um eletrófilo." }
  ],

  eliminacao: [
    { q: "A desidratação de um álcool secundário ou terciário, catalisada por ácido, forma preferencialmente:",
      options: ["Um éter", "O alceno mais substituído (regra de Zaitsev)", "Um ácido carboxílico", "Um haleto orgânico"],
      correct: 1, explain: "A regra de Zaitsev prevê que o alceno mais substituído (mais estável) é o produto principal da eliminação." },
    { q: "No mecanismo E2, a remoção do próton e a saída do grupo abandonador ocorrem:",
      options: ["Em duas etapas distintas", "Simultaneamente, em uma única etapa concertada", "Sem envolver uma base", "Apenas em meio neutro"],
      correct: 1, explain: "E2 é um mecanismo concertado: base remove o H enquanto o grupo abandonador sai, formando a dupla ligação diretamente." },
    { q: "O mecanismo E1 costuma competir com qual outro mecanismo, por compartilharem o mesmo intermediário?",
      options: ["SN2", "SN1, pois ambos passam por um carbocátion intermediário", "SEA", "Ozonólise"],
      correct: 1, explain: "E1 e SN1 compartilham a etapa de formação do carbocátion, competindo entre eliminação e substituição a partir do mesmo intermediário." },
    { q: "A desidrohalogenação de um haleto de alquila com uma base forte (ex.: KOH em etanol) é uma reação de:",
      options: ["Adição", "Substituição apenas", "Eliminação, formando um alceno", "Oxidação"],
      correct: 2, explain: "A base remove H e o halogênio sai do carbono adjacente, formando uma nova ligação dupla (alceno)." },
    { q: "Um dos fatores que favorece o mecanismo E2 sobre a substituição é o uso de:",
      options: ["Uma base forte e volumosa", "Um nucleófilo fraco e pouco básico", "Um solvente aquoso", "Temperatura muito baixa"],
      correct: 0, explain: "Bases fortes e estericamente volumosas tendem a favorecer a eliminação (E2) em vez do ataque nucleofílico (substituição)." }
  ],

  oxidacao: [
    { q: "A oxidação branda de um álcool primário produz, inicialmente, um:",
      options: ["Éster", "Aldeído", "Éter", "Alcano"],
      correct: 1, explain: "O álcool primário é oxidado a aldeído; se o oxidante for forte e em excesso, a oxidação continua até ácido carboxílico." },
    { q: "A oxidação de um álcool secundário forma um(a):",
      options: ["Aldeído", "Ácido carboxílico", "Cetona", "Amina"],
      correct: 2, explain: "Álcoois secundários são oxidados a cetonas, e a reação geralmente para nesse estágio por falta de mais hidrogênios no carbono." },
    { q: "Por que álcoois terciários não sofrem oxidação pelos métodos convencionais (ex.: com dicromato)?",
      options: ["Porque são muito instáveis", "Porque o carbono da hidroxila não tem hidrogênio disponível para sair na oxidação", "Porque não têm grupo -OH", "Porque reagem apenas com bases"],
      correct: 1, explain: "A oxidação convencional exige remoção de H do carbono da hidroxila; o carbono terciário não tem esse H disponível." },
    { q: "A ozonólise de um alceno seguida de work-up redutor produz:",
      options: ["Ácidos carboxílicos apenas", "Aldeídos e/ou cetonas, pela clivagem da dupla ligação", "Álcoois", "Ésteres"],
      correct: 1, explain: "O ozônio cliva a dupla ligação C=C, e o tratamento redutor subsequente converte os intermediários em aldeídos e/ou cetonas." },
    { q: "Um indicativo visual comum de que uma oxidação com dicromato de potássio ocorreu é:",
      options: ["Mudança de cor de laranja para verde", "Liberação de gás incolor sem cor", "Formação de precipitado branco", "Nenhuma mudança visível"],
      correct: 0, explain: "A redução do Cr(VI), de cor laranja, a Cr(III), de cor verde, indica visualmente que a oxidação do substrato ocorreu." }
  ],

  reducao: [
    { q: "A hidrogenação catalítica de um alceno, na presença de Pt, Pd ou Ni, forma:",
      options: ["Um álcool", "Um alcano", "Um ácido carboxílico", "Um alceno isômero"],
      correct: 1, explain: "A adição de H₂ à dupla ligação, catalisada por metal, satura completamente a ligação, formando o alcano correspondente." },
    { q: "A redução de um aldeído com NaBH₄ produz:",
      options: ["Um álcool primário", "Um álcool secundário", "Um ácido carboxílico", "Uma amina"],
      correct: 0, explain: "Aldeídos, ao serem reduzidos, formam álcoois primários." },
    { q: "A redução de uma cetona produz:",
      options: ["Um álcool primário", "Um álcool secundário", "Um éter", "Um alcano"],
      correct: 1, explain: "Cetonas, ao serem reduzidas, formam álcoois secundários." },
    { q: "Comparado ao NaBH₄, o LiAlH₄ é um agente redutor:",
      options: ["Mais fraco e menos reativo", "Mais forte, capaz de reduzir ácidos carboxílicos e ésteres", "Que não reduz carbonilas", "Usado apenas em hidrogenação catalítica"],
      correct: 1, explain: "LiAlH₄ é mais reativo que NaBH₄ e consegue reduzir grupos menos eletrofílicos, como ácidos carboxílicos e ésteres." },
    { q: "Qual das opções abaixo NÃO é tipicamente reduzida por NaBH₄?",
      options: ["Aldeído", "Cetona", "Éster (em geral não é reduzido por NaBH₄)", "Nenhuma das anteriores"],
      correct: 2, explain: "NaBH₄ é um redutor seletivo, geralmente não reduz ésteres com eficiência, ao contrário do LiAlH₄." }
  ],

  aromaticas: [
    { q: "Em uma reação de substituição eletrofílica aromática (SEA), o eletrófilo:",
      options: ["Substitui um hidrogênio do anel, preservando a aromaticidade", "Adiciona-se à dupla ligação, quebrando a aromaticidade permanentemente", "Ataca apenas o carbono ipso sem sair H", "Reage apenas com anéis não aromáticos"],
      correct: 0, explain: "Após o ataque do eletrófilo, um H é removido do carbono para restaurar a aromaticidade do anel." },
    { q: "Um grupo -OH ligado ao anel aromático é classificado como:",
      options: ["Desativador forte, dirigente meta", "Ativador forte, dirigente orto/para", "Neutro, sem efeito no anel", "Desativador fraco, dirigente para apenas"],
      correct: 1, explain: "O -OH doa densidade eletrônica por ressonância, ativando o anel e dirigindo a substituição para orto e para." },
    { q: "O grupo -NO₂ ligado ao anel aromático é:",
      options: ["Ativador, dirigente orto/para", "Desativador forte, dirigente meta", "Sem efeito na reatividade do anel", "Ativador fraco, dirigente meta"],
      correct: 1, explain: "O grupo nitro retira fortemente densidade eletrônica do anel, desativando-o e direcionando a substituição para a posição meta." },
    { q: "Os halogênios (ex.: -Cl) ligados ao anel são incomuns porque:",
      options: ["Ativam o anel e dirigem para meta", "Desativam o anel mas dirigem para orto/para", "Não têm nenhum efeito no anel", "Ativam fortemente e dirigem para meta"],
      correct: 1, explain: "Halogênios retiram elétrons por indução (desativando) mas doam por ressonância nas posições orto/para (dirigindo para lá)." },
    { q: "A nitração do benzeno utiliza tipicamente qual mistura de reagentes?",
      options: ["HCl e H₂O", "HNO₃ e H₂SO₄ concentrados", "Br₂ e FeBr₃", "H₂ e catalisador de Pd"],
      correct: 1, explain: "A mistura nitrante (ácido nítrico e ácido sulfúrico concentrados) gera o eletrófilo NO₂⁺, usado na nitração aromática." }
  ],

  "acidos-derivados": [
    { q: "A reação de esterificação de Fischer ocorre entre:",
      options: ["Um ácido carboxílico e uma amina", "Um ácido carboxílico e um álcool, catalisada por ácido", "Dois álcoois", "Um éster e água, sem catalisador"],
      correct: 1, explain: "A esterificação de Fischer combina ácido carboxílico e álcool sob catálise ácida, formando éster e água." },
    { q: "A saponificação de um triglicerídeo com uma base forte forma:",
      options: ["Um ácido carboxílico e um éster", "Um sal de ácido carboxílico (sabão) e glicerol", "Um éter e um álcool", "Um haleto de acila"],
      correct: 1, explain: "A hidrólise básica do triglicerídeo (éster) forma o sal carboxilato (sabão) e libera o glicerol (álcool)." },
    { q: "Por que a saponificação é praticamente irreversível?",
      options: ["Porque o carboxilato formado é estável e não re-reage nas condições básicas", "Porque não há formação de produtos estáveis", "Porque ocorre apenas em meio ácido", "Porque não envolve hidrólise"],
      correct: 0, explain: "O ânion carboxilato é uma espécie estável que não retorna facilmente ao éster sob condições básicas, tornando a reação irreversível na prática." },
    { q: "Um cloreto de acila é obtido a partir de um ácido carboxílico usando, por exemplo:",
      options: ["NaOH", "SOCl₂ (cloreto de tionila)", "H₂O", "NaBH₄"],
      correct: 1, explain: "Reagentes como SOCl₂ ou PCl₅ convertem a hidroxila do ácido em cloro, formando o cloreto de acila." },
    { q: "Por que cloretos de acila reagem mais rapidamente com nucleófilos do que ésteres?",
      options: ["Porque o cloro é um grupo abandonador melhor que o alcóxido", "Porque não possuem carbonila", "Porque são menos eletrofílicos", "Porque são insolúveis em água"],
      correct: 0, explain: "O íon cloreto é uma base mais fraca e melhor grupo abandonador que o alcóxido, facilitando a substituição no carbono carbonílico." }
  ],

  polimeros: [
    { q: "A polimerização por adição ocorre quando:",
      options: ["Monômeros com duplas ligações se unem sem perda de átomos", "Cada ligação formada libera uma molécula pequena, como água", "Apenas dois monômeros reagem, sem formar cadeia longa", "Envolve exclusivamente reações de eliminação"],
      correct: 0, explain: "Monômeros insaturados (como o eteno) se unem diretamente, sem liberar subprodutos, formando o polímero de adição." },
    { q: "A polimerização por condensação se caracteriza por:",
      options: ["Não envolver reação química", "A liberação de uma molécula pequena (geralmente água) a cada nova ligação", "Ocorrer somente com monômeros insaturados", "Formar apenas polímeros naturais"],
      correct: 1, explain: "Cada ligação entre monômeros na polimerização por condensação libera uma molécula pequena, tipicamente água." },
    { q: "O polietileno é um exemplo de polímero formado por:",
      options: ["Condensação de ácido e álcool", "Adição do monômero eteno (etileno)", "Hidrólise de amidas", "Substituição eletrofílica aromática"],
      correct: 1, explain: "O eteno (CH₂=CH₂) polimeriza por adição, abrindo suas duplas ligações sucessivamente para formar o polietileno." },
    { q: "O náilon é formado por qual tipo de polimerização?",
      options: ["Adição", "Condensação entre uma diamina e um diácido carboxílico", "Hidrogenação catalítica", "Halogenação radicalar"],
      correct: 1, explain: "O náilon é uma poliamida formada pela condensação repetida entre grupos amina e ácido carboxílico, liberando água." },
    { q: "O PET (usado em garrafas plásticas) é classificado como um:",
      options: ["Polímero de adição", "Poliéster, formado por condensação", "Polímero natural", "Polímero inorgânico"],
      correct: 1, explain: "O PET é um poliéster obtido pela condensação entre ácido tereftálico e etilenoglicol." }
  ]
};
