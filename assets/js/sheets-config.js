/* ============================================================
   sheets-config.js — configuração do registro em Google Sheets
   Química Orgânica II — Técnico, IFRO Ji-Paraná
   ============================================================ */

/* ------------------------------------------------------------
   Enigma do Aroma dos Deuses — Web App próprio (planilha própria).
   Passo a passo: google-apps-script/aroma-deuses/COMO_CONFIGURAR.md
   (na pasta organicaII, fora de "site").
   Cole aqui a URL do Web App gerada pelo Deploy, por exemplo:
   "https://script.google.com/macros/s/AKfycb.../exec"
   Enquanto estiver vazio, o enigma funciona normalmente, mas não
   registra na planilha (o aluno vê um aviso para mostrar a tela).
   ------------------------------------------------------------ */
const AROMA_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbz0Ngv_NUO5Gjomr6MMpZ29-k-HsAsnpaSuGur6UdlBDPZoNgrz80_0mtqqZFiiKhLb/exec";

/* ------------------------------------------------------------
   Enigma do Taxol — usa o MESMO Web App / planilha da Química
   Orgânica I (google-apps-script/enigma-taxol na pasta organicaI).
   As turmas se diferenciam pela coluna "Turma" que o aluno preenche.
   ------------------------------------------------------------ */
const ENIGMA_TAXOL_WEBAPP_URL = "https://script.google.com/macros/s/AKfycby8Vju5xOo3mxZR6C-V7E93f8z4V_bv9rWIfM9d-ozboREMxuMI_Xtm8FdON52jR0YAFQ/exec";

/* ------------------------------------------------------------
   Enigma do Caderno do Perfumista — Web App próprio (planilha própria).
   Passo a passo: google-apps-script/caderno-perfumista/COMO_CONFIGURAR.md
   Enquanto estiver vazio, o enigma funciona, mas não registra na planilha.
   ------------------------------------------------------------ */
const PERFUMISTA_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbwglJE_NVf6wIkyYkq33Z8fFM1Bs68gwWsRtCjWSKAgh8-RkcZdK_o6EdnJq2v84Coc/exec";
