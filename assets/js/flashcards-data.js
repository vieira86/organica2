/* ============================================================
   Banco de Flashcards por tópico
   Química Orgânica II — Técnico, IFRO Ji-Paraná
   Cada item: { q, a }
   ============================================================ */

const FLASHCARDS = {

  substituicao: [
    { q: "O que é uma reação de substituição em química orgânica?", a: "É a troca de um átomo ou grupo de átomos da molécula por outro átomo ou grupo." },
    { q: "Como ocorre a halogenação radicalar de alcanos?", a: "Por um mecanismo em cadeia (iniciação, propagação, terminação) com formação de radicais livres, geralmente ativado por luz ou calor." },
    { q: "O que é a etapa de iniciação na halogenação radicalar?", a: "É a quebra homolítica da molécula de halogênio (ex.: Cl₂) por luz ou calor, gerando dois radicais livres de cloro." },
    { q: "O que significa SN2?", a: "Substituição nucleofílica bimolecular: o nucleófilo ataca o carbono simultaneamente à saída do grupo abandonador, em uma única etapa." },
    { q: "O que significa SN1?", a: "Substituição nucleofílica unimolecular: ocorre em duas etapas, com formação de um carbocátion intermediário antes do ataque do nucleófilo." },
    { q: "Por que carbonos terciários favorecem mecanismo SN1?", a: "Porque formam carbocátions mais estáveis, favorecendo a etapa de ionização que caracteriza o mecanismo SN1." },
    { q: "O que é um grupo abandonador (nucleófugo)?", a: "É o átomo ou grupo que se desliga do carbono levando o par de elétrons da ligação, como um íon haleto." }
  ],

  adicao: [
    { q: "O que caracteriza uma reação de adição?", a: "A quebra de uma ligação pi (dupla ou tripla) com adição de novos átomos aos carbonos, sem perda de átomos da molécula original." },
    { q: "O que diz a regra de Markovnikov?", a: "Em uma adição de HX a um alceno assimétrico, o hidrogênio se liga ao carbono da dupla que já tem mais hidrogênios (o carbocátion mais estável se forma no outro carbono)." },
    { q: "O que é hidratação de um alceno?", a: "A adição de água (H-OH) à dupla ligação, catalisada por ácido, formando um álcool." },
    { q: "Como ocorre a halogenação de um alceno (ex.: com Br₂)?", a: "Por adição eletrofílica, formando um íon bromônio cíclico intermediário, seguido pelo ataque do íon brometo pelo lado oposto, gerando um dialeto vicinal." },
    { q: "O que é hidrogenação de um alceno?", a: "A adição de H₂ à dupla ligação, geralmente catalisada por metais (Pt, Pd, Ni), formando um alcano." },
    { q: "Alcinos podem sofrer quantas adições sucessivas de HX?", a: "Duas, pois possuem duas ligações pi; a primeira adição forma um haloalceno, e a segunda um di-haleto geminal." }
  ],

  eliminacao: [
    { q: "O que caracteriza uma reação de eliminação?", a: "A remoção de dois grupos (geralmente H e um grupo abandonador) de carbonos adjacentes, formando uma nova ligação dupla." },
    { q: "O que é desidratação de álcool?", a: "A eliminação de água de um álcool, catalisada por ácido e calor, formando um alceno." },
    { q: "O que diz a regra de Zaitsev (Saytzeff)?", a: "O produto principal de uma eliminação tende a ser o alceno mais substituído (mais estável)." },
    { q: "O que significa E1?", a: "Eliminação unimolecular: ocorre em duas etapas, com formação de carbocátion intermediário antes da perda do próton." },
    { q: "O que significa E2?", a: "Eliminação bimolecular: a remoção do próton e a saída do grupo abandonador ocorrem simultaneamente, em uma única etapa concertada." },
    { q: "O que é desidrohalogenação?", a: "A eliminação de um haleto de hidrogênio (H-X) de um haleto orgânico, geralmente com uma base forte, formando um alceno." }
  ],

  oxidacao: [
    { q: "O que ocorre na oxidação de um álcool primário?", a: "É oxidado primeiro a aldeído e, se o oxidante for forte, continua até ácido carboxílico." },
    { q: "O que ocorre na oxidação de um álcool secundário?", a: "É oxidado a cetona, e a reação geralmente para nesse estágio." },
    { q: "Por que álcoois terciários resistem à oxidação comum?", a: "Porque o carbono da hidroxila não tem hidrogênio disponível para ser removido no processo de oxidação." },
    { q: "O que é ozonólise de um alceno?", a: "A clivagem oxidativa da dupla ligação com ozônio (O₃), quebrando a molécula em dois fragmentos carbonílicos (aldeídos e/ou cetonas)." },
    { q: "Cite um reagente comum usado para oxidar álcoois em laboratório.", a: "Dicromato de potássio (K₂Cr₂O₇) ou permanganato de potássio (KMnO₄), em meio ácido." },
    { q: "O que indica a mudança de cor do dicromato de laranja para verde numa reação de oxidação?", a: "A redução do Cr(VI) laranja a Cr(III) verde, evidenciando que a oxidação do álcool ocorreu." }
  ],

  reducao: [
    { q: "O que é hidrogenação catalítica?", a: "A adição de H₂ a uma ligação múltipla (C=C ou C≡C) na presença de um catalisador metálico (Pt, Pd ou Ni), reduzindo a insaturação." },
    { q: "O que ocorre quando um aldeído é reduzido?", a: "É convertido em álcool primário." },
    { q: "O que ocorre quando uma cetona é reduzida?", a: "É convertida em álcool secundário." },
    { q: "Cite um agente redutor comum usado para reduzir carbonilas.", a: "Boroidreto de sódio (NaBH₄) ou hidreto de alumínio e lítio (LiAlH₄)." },
    { q: "Qual a diferença de força redutora entre NaBH₄ e LiAlH₄?", a: "LiAlH₄ é um redutor mais forte e reativo, capaz de reduzir ácidos carboxílicos e ésteres, enquanto NaBH₄ é mais seletivo, reduzindo principalmente aldeídos e cetonas." }
  ],

  aromaticas: [
    { q: "O que é uma reação de substituição eletrofílica aromática (SEA)?", a: "A substituição de um hidrogênio do anel aromático por um eletrófilo, preservando a aromaticidade do anel." },
    { q: "Cite três exemplos clássicos de SEA.", a: "Halogenação, nitração e sulfonação do benzeno (e derivados)." },
    { q: "O que é um grupo ativador em SEA?", a: "Um substituinte que doa densidade eletrônica ao anel, aumentando sua reatividade frente a eletrófilos (ex.: -OH, -NH₂, -CH₃)." },
    { q: "O que é um grupo desativador em SEA?", a: "Um substituinte que retira densidade eletrônica do anel, diminuindo sua reatividade (ex.: -NO₂, -COOH, halogênios)." },
    { q: "Grupos ativadores geralmente direcionam a substituição para quais posições?", a: "Orto e para." },
    { q: "Grupos desativadores (exceto halogênios) geralmente direcionam a substituição para qual posição?", a: "Meta." },
    { q: "Por que halogênios são desativadores, mas orientam para orto/para?", a: "Porque retiram elétrons por indução (desativando o anel), mas doam elétrons por ressonância nas posições orto/para, direcionando a substituição para lá." }
  ],

  "acidos-derivados": [
    { q: "O que é uma reação de esterificação?", a: "A reação entre um ácido carboxílico e um álcool, catalisada por ácido, formando um éster e água." },
    { q: "O que é saponificação?", a: "A hidrólise básica de um éster (geralmente um triglicerídeo) com uma base forte, formando um sal de ácido carboxílico (sabão) e um álcool (glicerol)." },
    { q: "O que diferencia a esterificação da hidrólise ácida de um éster?", a: "São reações opostas e em equilíbrio: a esterificação forma éster a partir de ácido e álcool, enquanto a hidrólise quebra o éster de volta a ácido e álcool, usando água." },
    { q: "Por que a saponificação é considerada irreversível, ao contrário da hidrólise ácida?", a: "Porque o produto (o sal carboxilato) é estável e não reage de volta para formar o éster nas condições básicas da reação." },
    { q: "Como se converte um ácido carboxílico em cloreto de ácido (cloreto de acila)?", a: "Reagindo o ácido com reagentes como cloreto de tionila (SOCl₂) ou pentacloreto de fósforo (PCl₅)." },
    { q: "Por que cloretos de acila são mais reativos que ésteres em substituições no carbono carbonílico?", a: "Porque o cloro é um grupo abandonador melhor que o alcóxido do éster, facilitando a saída do grupo após o ataque nucleofílico." }
  ],

  polimeros: [
    { q: "O que é polimerização por adição?", a: "A união sucessiva de monômeros com ligações duplas (ex.: eteno), sem perda de átomos, formando uma cadeia longa (ex.: polietileno)." },
    { q: "O que é polimerização por condensação?", a: "A união de monômeros com liberação de uma molécula pequena (geralmente água) a cada ligação formada (ex.: síntese de poliésteres e poliamidas)." },
    { q: "Cite um exemplo de polímero de adição e seu monômero.", a: "Polietileno (PE), formado a partir do monômero eteno (etileno, CH₂=CH₂)." },
    { q: "Cite um exemplo de polímero de condensação.", a: "O náilon (poliamida), formado pela condensação entre uma diamina e um diácido carboxílico." },
    { q: "O que é o PET, muito usado em garrafas plásticas?", a: "Um poliéster (polietileno tereftalato) formado por condensação entre ácido tereftálico e etilenoglicol." },
    { q: "O que caracteriza o mecanismo de polimerização radicalar em cadeia?", a: "Etapas de iniciação (formação do radical), propagação (crescimento da cadeia) e terminação (encontro de dois radicais)." }
  ]
};
