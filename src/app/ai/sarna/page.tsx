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

export default function SarnaAIPage() {
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
          Detecção de sarna em cachorros
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-fuchsia-500 to-amber-500">
            Pipeline de dados de ponta a ponta
          </span>
        </motion.h1>

        <motion.p
          className="text-slate-700 dark:text-slate-300 leading-relaxed mb-10 max-w-3xl"
          {...fadeUp(0.05)}
        >
          Fluxo animado desde a ingestão de imagens até a preparação de lotes para treino e inferência. Foco em dados limpos, balanceados, consistentes e eficientes para o modelo.
        </motion.p>

        {/* Faixa de KPIs (polimento visual + contexto rápido) */}
        <motion.div
          className="mb-10 grid grid-cols-2 md:grid-cols-4 gap-3"
          {...stagger}
        >
          {[
            ["Ingestão segura", "Remoção de duplicatas + verificações"],
            ["Pré-processamento estável", "Normalização + resize"],
            ["Balanceamento", "pesos por classe e divisão"],
            ["Desempenho", "tf.data + prefetch"],
          ].map(([title, sub], i) => (
            <motion.div key={i} variants={fadeUp(0)} className="relative rounded-xl p-[1px] bg-gradient-to-br from-sky-500/30 via-fuchsia-500/30 to-amber-500/30">
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
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-amber-500/80" />
                <span><b>Qualidade/variabilidade</b>: iluminação e ângulo impactam. Use augmentações e coleta dirigida.</span>
              </li>
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-sky-500/80" />
                <span><b>Explicabilidade</b>: integrar <b>Grad‑CAM</b> para visualizar regiões que sustentam a predição.</span>
              </li>
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-fuchsia-500/80" />
                <span><b>Melhorias</b>: transferência de aprendizado, <b>BatchNorm</b>, <b>LR schedule</b>, <b>k‑fold</b>, <b>mixup/cutout</b>.</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Notas técnicas do pipeline */}
        <motion.div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md p-6 mb-12" {...fadeUp(0.12)}>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Notas técnicas do pipeline (explicação por etapa)</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-slate-700 dark:text-slate-300">
            <TechNote title="Ingestão">
              Calcular hash (MD5/SHA‑1) para duplicatas exatas e <i>pHash</i>/<i>SSIM</i> para quase duplicatas. Ler EXIF (orientação, data), validar o MIME real (detecção de conteúdo) e registrar a origem (upload, pasta de entrada).
            </TechNote>
            <TechNote title="Validação">
              Verificar dimensões mínimas, canais (RGB), profundidade de bits e leitura decodificada (evitar arquivos truncados). Rejeitar formatos não suportados e compressão inválida.
            </TechNote>
            <TechNote title="Sanitização">
              Corrigir orientação via EXIF, remover metadados sensíveis, converter para formato padrão (ex.: PNG/JPEG/WebP com qualidade fixa) e padronizar nomes/estrutura de diretórios.
            </TechNote>
            <TechNote title="Padronização">
              Ajustar tamanho com <b>resize</b> preservando proporção (letterbox/padding) ou <b>center‑crop + resize</b>. Escolher interpolação adequada (bilinear/bicúbica) e garantir enquadre do foco clínico.
            </TechNote>
            <TechNote title="Normalização">
              Escalar para [0,1] ou padronizar por média/desvio do dataset. Para modelos pré‑treinados (ImageNet), usar a média/desvio esperados. A consistência entre treino e inferência é crucial.
            </TechNote>
            <TechNote title="Augmentação">
              Aplicar rotação/flip, zoom leve e pequenos ajustes de brilho/contraste. Manter faixas realistas para não alterar o rótulo. Desativar em validação/teste. Use sementes fixas para reprodutibilidade.
            </TechNote>
            <TechNote title="Balanceamento">
              Utilizar <code>class_weight</code>, superamostragem da minoria ou subamostragem da maioria. Considerar <b>focal loss</b> quando o desbalanceamento for severo.
            </TechNote>
            <TechNote title="Divisão (split)">
              <b>Estratificar</b> por classe e particionar por indivíduo (ID do cão) para evitar vazamento (<i>leakage</i>). Fixar semente, salvar índices e manter proporções (treino/validação/teste).
            </TechNote>
            <TechNote title="Leitura eficiente (tf.data)">
              <code>list_files → interleave → map(num_parallel_calls) → cache → shuffle → batch → prefetch</code>. Em PyTorch, usar <code>num_workers</code> e <code>pin_memory</code>. Para grandes volumes, empacotar em TFRecords/LMDB em fragmentos.
            </TechNote>
            <TechNote title="Salvar versões">
              Versionar dados/índices (DVC/MLflow ou manifesto YAML com checksums). Estrutura endereçável por conteúdo e fragmentos com tamanho controlado (ex.: ~100–200 MB).
            </TechNote>
            <TechNote title="Controle (governança)">
              Registrar configurações de pré‑processamento, hashes, semente e mapeamento de rótulos. Registros de mudanças permitem reproduzir conjuntos anteriores e auditoria.
            </TechNote>
            <TechNote title="Monitoramento">
              Rastrear <b>data drift</b> (PSI/KL), distribuição de classes, resolução média e taxas de erro de leitura. Definir limites e alertas para disparar re‑treino.
            </TechNote>
            <TechNote title="Lotes">
              Definir <code>batch_size</code> conforme memória (usar <i>mixed precision</i> e <i>acumulação de gradiente</i> se necessário). Habilitar <code>drop_last</code> para tamanhos estáveis.
            </TechNote>
            <TechNote title="Treino / Uso">
              Ajustar o limiar de decisão com PR/ROC visando alto <b>recall</b>. Exportar o modelo (SavedModel/ONNX), validar calibração e, em produção, considerar TTA leve se fizer sentido.
            </TechNote>
          </div>
        </motion.div>

        {/* Pipeline */}
        <motion.div className="rounded-2xl p-[1px] bg-gradient-to-br from-sky-500/30 via-fuchsia-500/30 to-amber-500/30" {...fadeUp(0.15)}>
          <div className="rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6">
            <SectionHeader icon={<FaCogs className="text-blue-600" />} title="Pipeline de dados (fluxo completo)" />

            {/* Row 1 */}
            <Row>
              <NodeBox title="Ingestão" subtitle="Imagens que chegam" color="from-sky-200 to-sky-50" icon={<FaDatabase className="text-sky-600" />}>
                <li>Fotos enviadas ou em pasta</li>
                <li>Metadados básicos</li>
                <li>Remoção de duplicatas</li>
              </NodeBox>
              <Connector />
              <NodeBox title="Validação" subtitle="Checagens" color="from-emerald-200 to-emerald-50" icon={<FaShieldAlt className="text-emerald-700" />}>
                <li>Formato e tamanho</li>
                <li>Canais corretos</li>
                <li>Arquivos legíveis</li>
              </NodeBox>
              <Connector />
              <NodeBox title="Sanitização" subtitle="Limpeza final" color="from-amber-200 to-amber-50" icon={<FaServer className="text-amber-700" />}>
                <li>Descartar arquivos corrompidos</li>
                <li>Padronizar formato</li>
              </NodeBox>
            </Row>
            <DownArrow label="Pré-processamento" />
            <StepNote>Entrada segura com remoção de duplicatas e arquivos inválidos.</StepNote>

            {/* Row 2 */}
            <Row>
              <NodeBox title="Padronização" subtitle="Tamanho e enquadre" color="from-purple-200 to-purple-50" icon={<FaBrain className="text-purple-700" />}>
                <li>Resize</li>
                <li>Padding quando necessário</li>
                <li>Centralizar conteúdo</li>
              </NodeBox>
              <Connector />
              <NodeBox title="Normalização" subtitle="Escala de pixels" color="from-teal-200 to-teal-50" icon={<FaBrain className="text-teal-700" />}>
                <li>Escala comum</li>
                <li>Estabilidade numérica</li>
              </NodeBox>
              <Connector />
              <NodeBox title="Augmentación" subtitle="Variações controladas" color="from-fuchsia-200 to-pink-50" icon={<FaBrain className="text-pink-700" />}>
                <li>Flip / rotação</li>
                <li>Zoom leve</li>
                <li>Ajuste de luz</li>
              </NodeBox>
            </Row>
            <DownArrow label="Preparação do dataset" />
            <StepNote>Dimensões e escala unificadas; maior variância sem quebrar rótulos.</StepNote>

            {/* Row 3 */}
            <Row>
              <NodeBox title="Balanceamento" subtitle="Equilíbrio de classes" color="from-rose-200 to-rose-50" icon={<FaBrain className="text-rose-700" />}>
                <li>Reponderar minoria</li>
                <li>Repetir casos raros</li>
                <li>Reduzir excessos</li>
              </NodeBox>
              <Connector />
              <NodeBox title="Divisão" subtitle="Treino / Validação / Teste" color="from-slate-200 to-slate-50" icon={<FaServer className="text-slate-700" />}>
                <li>Partições estáveis</li>
                <li>Evitar vazamento</li>
                <li>Proporções fixas</li>
              </NodeBox>
              <Connector />
              <NodeBox title="Leitura eficiente" subtitle="Pronto para treinar" color="from-lime-200 to-lime-50" icon={<FaServer className="text-lime-700" />}>
                <li>Embaralhar e lote</li>
                <li>Prefetch</li>
                <li>TFRecords opcional</li>
              </NodeBox>
            </Row>
            <DownArrow label="Persistência e governança" />
            <StepNote>Representatividade por classe e throughput otimizado com tf.data.</StepNote>

            {/* Row 4 */}
            <Row>
              <NodeBox title="Salvar versões" subtitle="Imagens e índices" color="from-indigo-200 to-indigo-50" icon={<FaDatabase className="text-indigo-700" />}>
                <li>Conjuntos preparados</li>
                <li>Arquivos otimizados</li>
              </NodeBox>
              <Connector />
              <NodeBox title="Control" subtitle="Rastreabilidade" color="from-cyan-200 to-cyan-50" icon={<FaServer className="text-cyan-700" />}>
                <li>Registro de mudanças</li>
                <li>Reprodutibilidade</li>
              </NodeBox>
              <Connector />
              <NodeBox title="Monitoramento" subtitle="Qualidade contínua" color="from-orange-200 to-orange-50" icon={<FaServer className="text-orange-700" />}>
                <li>Detecção de drift</li>
                <li>Alertas</li>
              </NodeBox>
            </Row>
            <DownArrow label="Saída" />
            <StepNote>Dados versionados e auditáveis; re-treinos automáticos quando a distribuição mudar.</StepNote>

            {/* Row 5 */}
            <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] items-center">
              <NodeBox title="Lotes" subtitle="Pacotes de imagens" color="from-slate-200 to-slate-50" icon={<FaDatabase className="text-slate-700" />}>
                <li>Imagens e rótulos</li>
                <li>Prontos para GPU</li>
              </NodeBox>
              <Connector />
              <NodeBox title="Treino / Uso" subtitle="Modelo em ação" color="from-emerald-200 to-emerald-50" icon={<FaServer className="text-emerald-700" />}>
                <li>Aprendizado supervisionado</li>
                <li>Inferência</li>
              </NodeBox>
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
            href="https://github.com/Sullivan18/MyPet"
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

      <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
        {children}
      </ul>

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
