"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaArrowDown, FaCogs, FaShieldAlt, FaServer, FaBrain, FaDatabase } from "react-icons/fa";

export default function SarnaAIPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.h1
          className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Detecção de Sarna em Cachorros — Pipeline de Dados
        </motion.h1>

        <motion.p
          className="text-slate-700 dark:text-slate-300 leading-relaxed mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          Fluxograma animado que descreve da entrada de imagens até a preparação do batch para treino e inferência.
          O objetivo é garantir dados limpos, balanceados, consistentes e performáticos ao modelo.
        </motion.p>

        

        

        

        

        

        <motion.div
          className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Limitações e Próximos Passos</h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li><b>Qualidade/variabilidade</b>: iluminação e ângulo impactam. Augmentações e coleta dirigida ajudam.</li>
            <li><b>Explicabilidade</b>: integrar <b>Grad-CAM</b> para visualizar regiões que sustentam a decisão.</li>
            <li><b>Melhorias</b>: transferência de aprendizado, <b>BatchNorm</b>, <b>LR schedule</b>, <b>k-fold CV</b>, <b>mixup/cutout</b>.</li>
          </ul>
        </motion.div>

        {/* Notas técnicas e cálculos */}
        <motion.div
          className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Notas técnicas e cálculos (por etapa)</h2>
          <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Normalização</h3>
              <p>
                Escalonamento linear de cada pixel para faixa [0,1]: <code>x_norm = x / 255.0</code>. Mantém a
                dinâmica do gradiente estável e acelera a convergência do otimizador.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Transformações Afins (Augmentação)</h3>
              <p>
                Rotação por ângulo <code>θ</code> e escala <code>s</code> podem ser expressas por:
              </p>
              <pre className="whitespace-pre-wrap text-xs bg-slate-50 dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700">{`A(θ, s) = [ s·cosθ   -s·sinθ  tx ]
[ s·sinθ    s·cosθ  ty ]
[   0          0     1 ] (coordenadas homogêneas)`}</pre>
              <p>
                O centro da imagem é usado para evitar drift ao rotacionar/escalar.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Balanceamento por pesos de classe</h3>
              <p>
                Para positivos <code>N_pos</code> e negativos <code>N_neg</code> (total <code>N=N_pos+N_neg</code>):
              </p>
              <pre className="whitespace-pre-wrap text-xs bg-slate-50 dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700">{`w_pos = N / (2·N_pos)
w_neg = N / (2·N_neg)`}</pre>
              <p>
                Esses pesos podem ser passados em <code>model.fit(..., class_weight=...)</code> quando houver desbalanceamento.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Função de perda</h3>
              <p>
                Binary Cross-Entropy para rótulo <code>y ∈ {'{'}0,1{'}'}</code> e probabilidade prevista <code>p</code>:
              </p>
              <pre className="whitespace-pre-wrap text-xs bg-slate-50 dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700">{`BCE(p, y) = - [ y·log(p) + (1 - y)·log(1 - p) ]`}</pre>
              <p>
                Em cenários com forte desbalanceamento, considerar focal loss para focar em exemplos difíceis.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Métricas</h3>
              <pre className="whitespace-pre-wrap text-xs bg-slate-50 dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700">{`Precision = TP / (TP + FP)
Recall    = TP / (TP + FN)
F1        = 2 · (Precision · Recall) / (Precision + Recall)`}</pre>
              <p>
                Para aplicações sensíveis (saúde animal), priorizamos Recall alto. O limite de decisão <code>t</code>
                pode ser ajustado (ex.: 0.4) para mover o ponto na curva PR/ROC.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">tf.data e throughput</h3>
              <p>
                Pipeline recomendado: <code>dataset.cache().shuffle(B).batch(b).prefetch(tf.data.AUTOTUNE)</code>. O buffer de
                embaralhamento <code>B</code> deve ser grande o suficiente para diversidade (ex.: múltiplos do tamanho do dataset ou de <code>b</code>),
                e <code>prefetch</code> sobrepõe CPU/IO com GPU, aumentando exemplos/s.
              </p>
            </div>
          </div>
        </motion.div>
        

        {/* Fluxograma animado do pipeline de dados */}
        <motion.div
          className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <FaCogs className="text-blue-600" /> Pipeline de Dados (Fluxo Completo)
          </h2>

          {/* Linha 1: Ingestão → Validação → Sanitização */}
          <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr] items-center mb-6">
            {/* Ingestão */}
            <NodeBox title="Ingestão" subtitle="Imagens que chegam" color="from-sky-200 to-sky-50" icon={<FaDatabase className="text-sky-600" />}>
              <li>Fotos enviadas ou em pasta</li>
              <li>Informações básicas da imagem</li>
              <li>Remoção de duplicatas</li>
            </NodeBox>
            <Arrow />
            {/* Validação */}
            <NodeBox title="Validação" subtitle="Checagens básicas" color="from-emerald-200 to-emerald-50" icon={<FaShieldAlt className="text-emerald-700" />}>
              <li>Formato e tamanho</li>
              <li>Cores/canais corretos</li>
              <li>Arquivos legíveis</li>
            </NodeBox>
            <Arrow />
            {/* Sanitização */}
            <NodeBox title="Sanitização" subtitle="Limpeza final" color="from-amber-200 to-amber-50" icon={<FaServer className="text-amber-700" />}>
              <li>Descartar arquivos ruins</li>
              <li>Padronizar formato</li>
            </NodeBox>
          </div>
          <DownArrow label="Pré-processamento" />
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Entrada segura: removemos duplicatas e arquivos inválidos, garantindo que somente dados íntegros sigam no fluxo.
          </p>

          {/* Linha 2: Padronização → Normalização → Augmentação */}
          <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr] items-center mb-6">
            {/* Padronização */}
            <NodeBox title="Padronização" subtitle="Tamanho e enquadre" color="from-purple-200 to-purple-50" icon={<FaBrain className="text-purple-700" />}>
              <li>Redimensionar</li>
              <li>Ajustar bordas</li>
              <li>Centralizar conteúdo</li>
            </NodeBox>
            <Arrow />
            {/* Normalização */}
            <NodeBox title="Normalização" subtitle="Escala dos pixels" color="from-teal-200 to-teal-50" icon={<FaBrain className="text-teal-700" />}>
              <li>Trazer para a mesma escala</li>
              <li>Manter o padrão dos dados</li>
            </NodeBox>
            <Arrow />
            {/* Augmentação */}
            <NodeBox title="Augmentação" subtitle="Variações controladas" color="from-fuchsia-200 to-pink-50" icon={<FaBrain className="text-pink-700" />}>
              <li>Espelhar imagem</li>
              <li>Girar e aproximar</li>
              <li>Pequenos ajustes de luz</li>
            </NodeBox>
          </div>
          <DownArrow label="Preparação do dataset" />
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Harmonizamos dimensões e escala para estabilidade numérica; a augmentação aumenta a variância sem quebrar o rótulo.
          </p>

          {/* Linha 3: Balanceamento → Split → tf.data */}
          <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr] items-center mb-6">
            {/* Balanceamento */}
            <NodeBox title="Balanceamento" subtitle="Equilíbrio das classes" color="from-rose-200 to-rose-50" icon={<FaBrain className="text-rose-700" />}>
              <li>Compensar minoria</li>
              <li>Repetir exemplos raros</li>
              <li>Reduzir excessos</li>
            </NodeBox>
            <Arrow />
            {/* Split */}
            <NodeBox title="Divisão" subtitle="Treino / Validação / Teste" color="from-slate-200 to-slate-50" icon={<FaServer className="text-slate-700" />}>
              <li>Separar conjuntos</li>
              <li>Evitar vazamentos</li>
              <li>Manter proporções</li>
            </NodeBox>
            <Arrow />
            {/* tf.data */}
            <NodeBox title="Leitura eficiente" subtitle="Preparar para treino" color="from-lime-200 to-lime-50" icon={<FaServer className="text-lime-700" />}>
              <li>Organizar e embaralhar</li>
              <li>Montar lotes</li>
              <li>Antecipar carregamento</li>
            </NodeBox>
          </div>
          <DownArrow label="Persistência e governança" />
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Garantimos representatividade por classe e partições reprodutíveis; o pipeline tf.data otimiza throughput CPU/GPU.
          </p>

          {/* Linha 4: Persistência → Versionamento → Monitoramento */}
          <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr] items-center mb-6">
            <NodeBox title="Salvar versões" subtitle="Fotos e índices" color="from-indigo-200 to-indigo-50" icon={<FaDatabase className="text-indigo-700" />}>
              <li>Conjuntos preparados</li>
              <li>Arquivos otimizados</li>
            </NodeBox>
            <Arrow />
            <NodeBox title="Controle" subtitle="Rastreabilidade" color="from-cyan-200 to-cyan-50" icon={<FaServer className="text-cyan-700" />}>
              <li>Registrar mudanças</li>
              <li>Repetir resultados</li>
            </NodeBox>
            <Arrow />
            <NodeBox title="Acompanhamento" subtitle="Qualidade contínua" color="from-orange-200 to-orange-50" icon={<FaServer className="text-orange-700" />}>
              <li>Olho em mudanças</li>
              <li>Alertas de problemas</li>
            </NodeBox>
          </div>
          <DownArrow label="Saída do pipeline" />
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Dados prontos podem ser versionados e auditados. Monitoramos drift para re-treinos quando necessário.
          </p>

          {/* Linha 5: Batches → Treino/Inferência */}
          <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] items-center">
            <NodeBox title="Lotes" subtitle="Pacotes de imagens" color="from-slate-200 to-slate-50" icon={<FaDatabase className="text-slate-700" />}>
              <li>Imagens agrupadas</li>
              <li>Rótulos juntos</li>
            </NodeBox>
            <Arrow />
            <NodeBox title="Treino / Uso" subtitle="Modelo em ação" color="from-emerald-200 to-emerald-50" icon={<FaServer className="text-emerald-700" />}>
              <li>Aprender com exemplos</li>
              <li>Prever novos casos</li>
            </NodeBox>
          </div>
        </motion.div>

        

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600"
          >
            Voltar ao Portfólio
          </Link>
          <a
            href="https://github.com/Sullivan18/MyPet"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-slate-100 text-slate-900 font-semibold hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
          >
            Repositório
          </a>
        </div>
      </section>
    </main>
  );
}

function Arrow() {
  return (
    <FaArrowRight className="justify-self-center hidden sm:block text-slate-500" />
  );
}

function DownArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center my-2">
      {label && <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">{label}</div>}
      <FaArrowDown className="text-slate-400" />
    </div>
  );
}

function NodeBox({ title, subtitle, color, icon, children }: { title: string; subtitle: string; color: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <motion.div
      className={`relative rounded-lg min-h-28 bg-gradient-to-br ${color} dark:from-slate-700 dark:to-slate-800 border border-white/40 dark:border-slate-700 overflow-hidden p-4`}
      initial={{ scale: 0.97, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-2 mb-2 text-slate-800 dark:text-slate-100">
        {icon}
        <div>
          <div className="text-sm font-semibold">{title}</div>
          <div className="text-xs opacity-70">{subtitle}</div>
        </div>
      </div>
      <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
        {children}
      </ul>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileInView={{ x: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}