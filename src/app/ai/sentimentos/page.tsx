"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaArrowDown,
  FaCogs,
  FaShieldAlt,
  FaServer,
  FaBrain,
  FaDatabase,
  FaGithub,
} from "react-icons/fa";

// === Animações
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
});

const stagger = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export default function SentimentosAIPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      {/* Fundo decorativo */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        {/* degradê radial suave */}
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_-10%,rgba(56,189,248,0.20),transparent_60%)] dark:bg-[radial-gradient(60%_40%_at_50%_-10%,rgba(56,189,248,0.12),transparent_60%)]" />
        {/* grade sobreposta */}
        <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.08] bg-[linear-gradient(to_right,transparent_0,transparent_calc(50%-0.5px),rgba(0,0,0,0.6)_calc(50%),transparent_calc(50%+0.5px),transparent_100%),linear-gradient(to_bottom,transparent_0,transparent_calc(50%-0.5px),rgba(0,0,0,0.6)_calc(50%),transparent_calc(50%+0.5px),transparent_100%)]" />
      </div>

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Cabeçalho */}
        <motion.h1
          className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4"
          {...fadeUp(0)}
        >
          Análise de sentimentos no Twitter
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-fuchsia-500 to-amber-500">
            Pipeline de NLP de ponta a ponta
          </span>
        </motion.h1>

        <motion.p
          className="text-slate-700 dark:text-slate-300 leading-relaxed mb-10 max-w-3xl"
          {...fadeUp(0.05)}
        >
          Do CSV ao JSON versionado: pré-processamento robusto, inferência com Transformers
          multilíngue e regras de dicionário customizado em Excel, unificando probabilidades do
          modelo e escore semântico por categoria com registro de tempo da análise.
        </motion.p>

        {/* Faixa de KPIs */}
        <motion.div className="mb-10 grid grid-cols-2 md:grid-cols-4 gap-3" {...stagger}>
          {[
            ["Multilíngue", "XLM‑R (twitter‑xlm‑roberta)"],
            ["Pré-processamento", "lowercase + unidecode + regex"],
            ["Dicionário Excel", "Planilhas por categoria"],
            ["Saída JSON", "com timestamp e scores"],
          ].map(([title, sub], i) => (
            <motion.div
              key={i}
              variants={fadeUp(0)}
              className="relative rounded-xl p-[1px] bg-gradient-to-br from-sky-500/30 via-fuchsia-500/30 to-amber-500/30"
            >
              <div className="rounded-xl bg-white/80 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/60 dark:border-white/10 p-4">
                <div className="text-sm font-semibold text-slate-900 dark:text-white">{title}</div>
                <div className="text-xs text-slate-600 dark:text-slate-300/80">{sub}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Limitações e próximos passos */}
        <motion.div
          className="rounded-2xl p-[1px] bg-gradient-to-br from-amber-400/40 via-sky-400/30 to-fuchsia-400/30 mb-10"
          {...fadeUp(0.1)}
        >
          <div className="rounded-2xl bg-white/80 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/60 dark:border-white/10 p-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <FaCogs className="text-amber-500" /> Limitações e próximos passos
            </h2>
            <ul className="grid gap-2 sm:grid-cols-3 text-slate-700 dark:text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-amber-500/80" />
                <span>
                  <b>Sarcasmo/negação</b>: difíceis para regras simples. Tratar negação e
                  considerar fine‑tuning.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-sky-500/80" />
                <span>
                  <b>Dominialidade</b>: adaptar dicionário por domínio; calibrar limiares por
                  distribuição real.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-fuchsia-500/80" />
                <span>
                  <b>Melhorias</b>: lematização (spaCy), <b>ABSA</b>, amostragem balanceada,
                  <b>calibração</b> e <b>TTA</b> textual leve.
                </span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Notas técnicas do pipeline */}
        <motion.div
          className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md p-6 mb-12"
          {...fadeUp(0.12)}
        >
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Notas técnicas do pipeline (NLP)
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-slate-700 dark:text-slate-300">
            <TechNote title="Ingestão (CSV)">
              Leitura de <b>Content</b> e <b>Timestamp</b>. Geração de <i>Identifier</i>.
              Logs estruturados via <code>logging</code>.
            </TechNote>
            <TechNote title="Pré-processamento">
              <code>lower()</code>, <code>unidecode</code> e remoção de pontuação com
              regex. Normalização leve de tokens para dicionário.
            </TechNote>
            <TechNote title="Modelo (Transformers)">
              <code>cardiffnlp/twitter-xlm-roberta-base-sentiment</code>. Tokenização,
              <code>softmax</code> e rótulos: negativo, neutro, positivo.
            </TechNote>
            <TechNote title="Dicionário (Excel)">
              Planilhas viram categorias; coluna <b>VALOR</b> define o peso. Soma por
              token normalizado produz <i>Custom_Score</i> e rótulo.
            </TechNote>
            <TechNote title="Fusão de sinais">
              Junta <b>Sentiment</b>/<b>Sentiment_Score</b> ao
              <b>Custom_Category</b>/<b>Custom_Score</b> por tweet.
            </TechNote>
            <TechNote title="Saída/versões">
              Gera JSON com <b>analysis_timestamp</b> e lista de
              <i>tweets_analysis</i>. Estrutura fácil de consumir.
            </TechNote>
            <TechNote title="Governança">
              Registrar modelo, versão do dicionário, semente e regras. Facilita
              auditoria e reprodução.
            </TechNote>
            <TechNote title="Monitoramento">
              Acompanhar sentimento médio, variação por período e drift de vocabulário.
              Alertar para re‑treino/revisão de dicionário.
            </TechNote>
            <TechNote title="Performance">
              Batch/streaming conforme volume; cache de tokenizer e uso de GPU quando
              disponível.
            </TechNote>
          </div>
        </motion.div>

        {/* Pipeline visual */}
        <motion.div
          className="rounded-2xl p-[1px] bg-gradient-to-br from-sky-500/30 via-fuchsia-500/30 to-amber-500/30"
          {...fadeUp(0.15)}
        >
          <div className="rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6">
            <SectionHeader
              icon={<FaCogs className="text-blue-600" />}
              title="Pipeline de NLP (fluxo completo)"
            />

            {/* Row 1 */}
            <Row>
              <NodeBox
                title="Ingestão"
                subtitle="Tweets (CSV)"
                color="from-sky-200 to-sky-50"
                icon={<FaDatabase className="text-sky-600" />}
              >
                <li>Leitura de Content/Timestamp</li>
                <li>Identificador estável</li>
                <li>Logs em arquivo</li>
              </NodeBox>
              <Connector />
              <NodeBox
                title="Validação"
                subtitle="Colunas e tipos"
                color="from-emerald-200 to-emerald-50"
                icon={<FaShieldAlt className="text-emerald-700" />}
              >
                <li>Schema mínimo</li>
                <li>Conteúdo não nulo</li>
                <li>Tratamento de erros</li>
              </NodeBox>
              <Connector />
              <NodeBox
                title="Pré‑processo"
                subtitle="Limpeza"
                color="from-amber-200 to-amber-50"
                icon={<FaServer className="text-amber-700" />}
              >
                <li>lower + unidecode</li>
                <li>Regex de pontuação</li>
              </NodeBox>
            </Row>
            <DownArrow label="Tokenização e inferência" />
            <StepNote>Texto normalizado melhora estabilidade e generalização.</StepNote>

            {/* Row 2 */}
            <Row>
              <NodeBox
                title="Tokenização"
                subtitle="XLM‑R"
                color="from-purple-200 to-purple-50"
                icon={<FaBrain className="text-purple-700" />}
              >
                <li>Padding/truncation</li>
                <li>Até 512 tokens</li>
              </NodeBox>
              <Connector />
              <NodeBox
                title="Inferência"
                subtitle="Transformers"
                color="from-teal-200 to-teal-50"
                icon={<FaBrain className="text-teal-700" />}
              >
                <li>Logits → softmax</li>
                <li>Label + confiança</li>
              </NodeBox>
              <Connector />
              <NodeBox
                title="Regras (Excel)"
                subtitle="Dicionário"
                color="from-fuchsia-200 to-pink-50"
                icon={<FaBrain className="text-pink-700" />}
              >
                <li>Pesos por token</li>
                <li>Categoria custom</li>
              </NodeBox>
            </Row>
            <DownArrow label="Fusão e preparação" />
            <StepNote>Complementa o modelo com conhecimento de domínio editável.</StepNote>

            {/* Row 3 */}
            <Row>
              <NodeBox
                title="Fusão"
                subtitle="Unir sinais"
                color="from-rose-200 to-rose-50"
                icon={<FaBrain className="text-rose-700" />}
              >
                <li>Sentiment + Score</li>
                <li>Custom + Score</li>
              </NodeBox>
              <Connector />
              <NodeBox
                title="Persistência"
                subtitle="JSON"
                color="from-slate-200 to-slate-50"
                icon={<FaServer className="text-slate-700" />}
              >
                <li>analysis_timestamp</li>
                <li>tweets_analysis[]</li>
              </NodeBox>
              <Connector />
              <NodeBox
                title="Monitoramento"
                subtitle="Qualidade"
                color="from-lime-200 to-lime-50"
                icon={<FaServer className="text-lime-700" />}
              >
                <li>Drift de vocabulário</li>
                <li>Métricas agregadas</li>
              </NodeBox>
            </Row>
            <DownArrow label="Saída" />
            <StepNote>Resultados versionáveis e prontos para consumo analítico.</StepNote>

            {/* Row 4: Código em foco */}
            <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white/70 dark:bg-slate-900/60">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <FaCodeInline /> Pontos‑chave no código (resumo)
              </h3>
              <ul className="text-sm text-slate-700 dark:text-slate-300 grid sm:grid-cols-2 gap-2">
                <li>
                  <b>preprocess_text</b>: normaliza texto para reduzir variação e ruído.
                </li>
                <li>
                  <b>load_custom_dictionary_from_excel</b>: lê abas e coluna VALOR, criando
                  pesos por token.
                </li>
                <li>
                  <b>analyze_sentiment</b>: tokeniza, infere, aplica softmax e retorna
                  rótulo e confiança.
                </li>
                <li>
                  <b>analyze_custom_category</b>: soma pesos por palavra normalizada e
                  define categoria (felicidade/tristeza/neutral).
                </li>
                <li>
                  <b>save_content_and_analyze_sentiment</b>: orquestra fluxo, adiciona
                  <i>Analysis_Timestamp</i> e grava JSON.
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Footer CTAs */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 shadow-sm"
          >
            Voltar ao portfólio
          </Link>
          <a
            href="https://github.com/Sullivan18/SentimentDash"
            className="inline-flex items-center gap-2 justify-center px-5 py-2.5 rounded-lg bg-white text-slate-900 font-semibold hover:bg-slate-100 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
          >
            <FaGithub /> Repositório
          </a>
        </div>
      </section>
    </main>
  );
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
      {icon} {title}
    </h2>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr] items-center mb-6">
      {children}
    </div>
  );
}

function Connector() {
  return (
    <div className="justify-self-center hidden sm:flex items-center" aria-hidden>
      {/* linha tracejada + ponta de seta */}
      <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-slate-400/60 to-transparent relative">
        <FaArrowRight className="absolute -right-3 -top-2 text-slate-500 animate-pulse" />
      </div>
    </div>
  );
}

function DownArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center my-2">
      {label && (
        <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 tracking-wide uppercase">
          {label}
        </div>
      )}
      <FaArrowDown className="text-slate-400" />
    </div>
  );
}

function StepNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 text-center">{children}</p>
  );
}

function NodeBox({
  title,
  subtitle,
  color,
  icon,
  children,
}: {
  title: string;
  subtitle: string;
  color: string; // e.g. "from-sky-200 to-sky-50"
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={`group relative rounded-2xl bg-gradient-to-br ${color} dark:from-slate-800 dark:to-slate-900 border border-white/40 dark:border-white/10 overflow-hidden p-4 shadow-sm hover:shadow-md transition-shadow`}
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.35 }}
    >
      {/* brilho no canto */}
      <div className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full bg-gradient-to-tr from-amber-400/30 to-fuchsia-400/20 blur-2xl" />

      <div className="flex items-center gap-2 mb-2 text-slate-800 dark:text-slate-100">
        {icon}
        <div>
          <div className="text-sm font-semibold leading-tight">{title}</div>
          <div className="text-xs opacity-70 leading-tight">{subtitle}</div>
        </div>
      </div>

      <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">{children}</ul>

      {/* brilho sutil */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.35),transparent)]"
        initial={{ x: "-100%" }}
        whileInView={{ x: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

function TechNote({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/50 p-4">
      <h3 className="font-semibold text-slate-900 dark:text-white mb-1 text-sm">{title}</h3>
      <div className="text-sm">{children}</div>
    </div>
  );
}

function FaCodeInline() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block align-middle text-slate-700 dark:text-slate-300"
    >
      <path d="M9.5 7L5.5 12L9.5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.5 7L18.5 12L14.5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}


