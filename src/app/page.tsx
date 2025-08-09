"use client";

import Image from "next/image";
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaPalette, FaDatabase, FaServer, FaTimes, FaExternalLinkAlt, FaReact, FaNodeJs, FaPython, FaHtml5, FaCss3Alt, FaJs, FaGitAlt } from "react-icons/fa";
import type { IconType } from "react-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

type Project = {
  title: string;
  description: string;
  tech: string[];
  images?: string[];
  image?: string;
  github?: string | null;
  live?: string;
};

type Skill = {
  name: string;
  icon: IconType;
  items: string[];
};

// Fundo criativo e animado para o Hero (com z-index controlado)
const HeroBackground = () => {
  const bokehDots: Array<{ x: string; y: string; size: number; delay: number }> = [
    { x: "12%", y: "30%", size: 14, delay: 0.2 },
    { x: "28%", y: "72%", size: 18, delay: 0.4 },
    { x: "62%", y: "22%", size: 12, delay: 0.1 },
    { x: "82%", y: "58%", size: 16, delay: 0.3 },
    { x: "52%", y: "84%", size: 10, delay: 0.6 },
  ];

  type TechType = 'code' | 'db' | 'server' | 'palette' | 'react' | 'js' | 'html' | 'css' | 'git' | 'node' | 'python';
  const techFloaters: Array<{ x: string; y: string; delay: number; size: number; color: string; type: TechType }> = [
    { x: "10%", y: "15%", delay: 0.0, size: 18, color: "text-blue-300/80", type: 'code' },
    { x: "88%", y: "20%", delay: 0.6, size: 20, color: "text-emerald-300/80", type: 'server' },
    { x: "18%", y: "75%", delay: 1.0, size: 16, color: "text-fuchsia-300/80", type: 'palette' },
    { x: "78%", y: "78%", delay: 0.3, size: 18, color: "text-cyan-300/80", type: 'db' },
    { x: "24%", y: "24%", delay: 0.8, size: 22, color: "text-cyan-300/80", type: 'react' },
    { x: "72%", y: "30%", delay: 1.2, size: 18, color: "text-yellow-300/80", type: 'js' },
    { x: "14%", y: "58%", delay: 0.4, size: 18, color: "text-orange-300/80", type: 'html' },
    { x: "34%", y: "66%", delay: 1.0, size: 18, color: "text-sky-300/80", type: 'css' },
    { x: "60%", y: "12%", delay: 0.2, size: 18, color: "text-rose-300/80", type: 'git' },
    { x: "84%", y: "66%", delay: 1.4, size: 20, color: "text-green-300/80", type: 'node' },
    { x: "42%", y: "18%", delay: 0.9, size: 20, color: "text-indigo-300/80", type: 'python' },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Grid sutil */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 1.2 }}
        style={{
          backgroundImage: "radial-gradient(rgba(100,116,139,0.55) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          backgroundPosition: "0 0",
        }}
      />

      {/* (Aurora bands removidos) */}

      {/* Blobs principais com blur forte */}
      <motion.div
        className="absolute -top-40 -left-32 w-[36rem] h-[36rem] rounded-full blur-3xl"
        initial={{ scale: 0.95, rotate: -12 }}
        animate={{
          scale: [0.95, 1.05, 0.95],
          rotate: [-12, 12, -12],
          x: [0, 18, 0],
          y: [0, -26, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(closest-side, rgba(59,130,246,0.40), rgba(147,51,234,0.25) 60%, transparent 70%)",
        }}
      />
      <motion.div
        className="absolute -bottom-48 -right-24 w-[32rem] h-[32rem] rounded-full blur-3xl"
        initial={{ scale: 0.96, rotate: 10 }}
        animate={{
          scale: [1.02, 0.92, 1.02],
          rotate: [10, -10, 10],
          x: [0, -22, 0],
          y: [0, 18, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(closest-side, rgba(16,185,129,0.30), rgba(59,130,246,0.20) 60%, transparent 70%)",
        }}
      />

      {/* Bokeh dots */}
      {bokehDots.map((pos, i) => (
        <motion.div
          key={`bokeh-${i}`}
          className="absolute rounded-full bg-white/30 dark:bg-white/20"
          style={{ left: pos.x, top: pos.y, width: pos.size, height: pos.size, filter: "blur(2px)" }}
          animate={{ opacity: [0.25, 0.6, 0.25], y: [0, -6, 0] }}
          transition={{ duration: 3 + i * 0.4, delay: pos.delay, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
      ))}

      {/* Tokens de código flutuando */}
      {[
        { text: '{ }', x: '6%', y: '40%', d: 6 },
        { text: '()=>', x: '16%', y: '26%', d: 7 },
        { text: '<div/>', x: '28%', y: '62%', d: 6.5 },
        { text: 'const', x: '42%', y: '18%', d: 6.8 },
        { text: 'return', x: '56%', y: '30%', d: 7.2 },
        { text: 'async', x: '64%', y: '66%', d: 6.2 },
        { text: 'await', x: '78%', y: '42%', d: 6.9 },
        { text: '</>', x: '90%', y: '70%', d: 6.4 },
      ].map((t, ti) => (
        <motion.span
          key={`token-${ti}`}
          className="absolute font-mono text-xs md:text-sm text-slate-600/70 dark:text-slate-300/60"
          style={{ left: t.x, top: t.y }}
          animate={{ y: [0, -8, 0], opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: t.d, delay: ti * 0.15, repeat: Infinity, ease: 'easeInOut' }}
        >
          {t.text}
        </motion.span>
      ))}

      {/* Code Rain (leve) */}
      <div className="absolute inset-0">
        {[
          { left: '8%' }, { left: '22%' }, { left: '36%' }, { left: '50%' }, { left: '64%' }, { left: '78%' }, { left: '88%' }
        ].map((col, ci) => (
          <motion.div
            key={`coderain-${ci}`}
            className="absolute top-[-120%] h-[220%] w-6 md:w-8"
            style={{ left: col.left }}
            initial={{ y: '-10%' }}
            animate={{ y: '10%' }}
            transition={{ duration: 10 + ci * 1.5, repeat: Infinity, repeatType: 'mirror', ease: 'linear', delay: ci * 0.6 }}
          >
            {Array.from({ length: 18 }).map((_, ri) => (
              <span
                key={`rain-ch-${ci}-${ri}`}
                className="block font-mono text-[10px] md:text-xs leading-4 text-emerald-300/60"
                style={{ opacity: (ri % 6) / 6 + 0.2 }}
              >
                {['0','1','{','}','<','>','/','(',')','=','>'][ri % 10]}
              </span>
            ))}
          </motion.div>
        ))}
      </div>

      

      {/* Cursor piscando */}
      <motion.span
        className="absolute left-1/2 top-[58%] -translate-x-1/2 w-3 h-4 bg-slate-400/60 rounded-sm"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      />

      {/* Orbitas sutis no centro */}
      <motion.div
        className="absolute left-1/2 top-1/2"
        style={{ transform: "translate(-50%, -50%)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {[
          { radius: 140, size: 6, opacity: 0.18 },
          { radius: 100, size: 5, opacity: 0.16 },
          { radius: 70, size: 4, opacity: 0.14 },
        ].map((ring, ri) => (
          [0, 60, 120, 180, 240, 300].map((deg, di) => (
            <motion.span
              key={`orb-${ri}-${di}`}
              className="absolute rounded-full bg-white"
              style={{
                width: ring.size,
                height: ring.size,
                left: "50%",
                top: "50%",
                opacity: ring.opacity,
                transform: `translate(-50%, -50%) rotate(${deg}deg) translateX(${ring.radius}px)`,
                filter: "blur(1px)",
              }}
              animate={{ opacity: [ring.opacity * 0.7, ring.opacity, ring.opacity * 0.7] }}
              transition={{ duration: 3 + di * 0.2, repeat: Infinity, ease: "easeInOut" }}
            />
          ))
        ))}
      </motion.div>

      {/* Sparkles (estrelas piscando) */}
      {[
        { x: "8%", y: "18%", d: 1.8 },
        { x: "22%", y: "12%", d: 2.2 },
        { x: "46%", y: "8%", d: 2.0 },
        { x: "70%", y: "14%", d: 2.4 },
        { x: "90%", y: "26%", d: 2.1 },
        { x: "6%", y: "64%", d: 2.3 },
        { x: "32%", y: "86%", d: 2.6 },
        { x: "60%", y: "78%", d: 2.2 },
        { x: "86%", y: "68%", d: 2.5 },
      ].map((s, si) => (
        <motion.span
          key={`spark-${si}`}
          className="absolute block bg-white rounded-full"
          style={{ left: s.x, top: s.y, width: 2, height: 2, filter: "blur(0.5px)" }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.4, 1] }}
          transition={{ duration: s.d, delay: si * 0.15, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Ícones flutuantes de tech */}
      {techFloaters.map((f, i) => (
        <motion.div
          key={`float-${i}`}
          className={`absolute ${f.color}`}
          style={{ left: f.x, top: f.y }}
          animate={{ y: [0, -10, 0], x: [0, 6, 0], opacity: [0.6, 0.95, 0.6], rotate: [-4, 4, -4] }}
          transition={{ duration: 6 + i, delay: f.delay, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        >
          {f.type === 'code' && <FaCode size={f.size} />}
          {f.type === 'db' && <FaDatabase size={f.size} />}
          {f.type === 'server' && <FaServer size={f.size} />}
          {f.type === 'palette' && <FaPalette size={f.size} />}
          {f.type === 'react' && <FaReact size={f.size} />}
          {f.type === 'js' && <FaJs size={f.size} />}
          {f.type === 'html' && <FaHtml5 size={f.size} />}
          {f.type === 'css' && <FaCss3Alt size={f.size} />}
          {f.type === 'git' && <FaGitAlt size={f.size} />}
          {f.type === 'node' && <FaNodeJs size={f.size} />}
          {f.type === 'python' && <FaPython size={f.size} />}
        </motion.div>
      ))}

      {/* (Efeito de varredura removido) */}
    </div>
  );
};

// Componente do Carrossel de Projetos
const ProjectCarousel = ({ images, title }: { images: string[]; title: string }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = direita, -1 = esquerda

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= images.length) {
          setDirection(-1); // Muda direção para esquerda
          return 0; // Volta ao primeiro
        }
        setDirection(1); // Mantém direção para direita
        return nextIndex;
      });
    }, 3000); // Troca a cada 3 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  // Descrições alternativas detalhadas para cada projeto
  const getAltText = (imageIndex: number, projectTitle: string) => {
    const descriptions = {
      "Ludare - Rede Social": [
        "Screenshot 1: Interface principal do aplicativo Ludare mostrando o feed de posts com design moderno e cores vibrantes",
        "Screenshot 2: Tela de perfil do usuário com informações pessoais, posts e estatísticas de engajamento",
        "Screenshot 3: Tela de criação de post com editor de texto e opções de mídia"
      ],
      "Modern Clinic Website": [
        "Screenshot 1: Página inicial do site da clínica com hero section, informações de contato e design responsivo",
        "Screenshot 2: Seção de serviços médicos com cards informativos e botões de agendamento",
        "Screenshot 3: Formulário de contato integrado com validação e campos para nome, email e mensagem"
      ],
      "Restaurante - Website": [
        "Screenshot 1: Página inicial do website do restaurante com menu principal, hero section e design atrativo",
        "Screenshot 2: Seção de cardápio com pratos organizados, preços e sistema de pedidos",
        "Screenshot 3: Interface de pedidos online com carrinho de compras e integração com API"
      ],
      "Quick Time Event Master": [
        "Screenshot 1: Página principal do website de jogos com navegação, hero section e call-to-action",
        "Screenshot 2: Seção de produtos/serviços com cards de jogos e informações detalhadas",
        "Screenshot 3: Integração de mapa interativo mostrando localização da empresa ou eventos"
      ]
    };

    return descriptions[projectTitle as keyof typeof descriptions]?.[imageIndex] || 
           `Screenshot ${imageIndex + 1} do projeto ${projectTitle}`;
  };

  // Função para determinar o object-fit baseado no projeto
  const getImageObjectFit = (projectTitle: string) => {
    // Para o Ludare (imagem vertical), usar object-contain para manter proporções
    if (projectTitle.includes("Ludare")) {
      return "object-contain";
    }
    // Para projetos horizontais, usar object-cover para preencher melhor
    return "object-cover";
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden"
      role="region"
      aria-label={`Carrossel de imagens do projeto ${title}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ 
            x: direction * 300, // Entra da direita ou esquerda
            opacity: 0 
          }}
          animate={{ 
            x: 0, // Posição central
            opacity: 1 
          }}
          exit={{ 
            x: -direction * 300, // Sai para a esquerda ou direita
            opacity: 0 
          }}
          transition={{ 
            duration: 0.6, 
            ease: "easeInOut" as const
          }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentImageIndex]}
            alt={getAltText(currentImageIndex, title)}
            fill
            className={getImageObjectFit(title)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={currentImageIndex === 0}
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Indicadores */}
      <div 
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1"
        role="tablist"
        aria-label="Indicadores de imagem"
      >
        {images.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
            role="tab"
            aria-selected={index === currentImageIndex}
            aria-label={`Imagem ${index + 1} de ${images.length}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setCurrentImageIndex(index);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const skillModalRef = useRef<HTMLDivElement>(null);
  const closeSkillButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsClient(true);
    // Força a página a voltar ao topo quando carregada/atualizada
    window.scrollTo(0, 0);
  }, []);

  const projects: Project[] = [
    {
      title: "Ludare - Rede Social",
      description: "Aplicativo de rede social desenvolvido com React Native e TypeScript no frontend, C# e .NET no backend, e SQL Server no banco de dados. Responsável por implementação de funcionalidades, otimização de performance e integração de sistemas.",
      tech: ["React Native", "TypeScript", "C#", ".NET", "SQL Server"],
      images: [
        "/projects/ludare/ludare_1.jpg",
        "/projects/ludare/ludare_2.jpg", 
        "/projects/ludare/ludare_3.jpg"
      ],
      github: null, // Código privado
      live: "https://ludare.com"
    },
    {
      title: "Modern Clinic Website",
      description: "Site responsivo para clínica com navegação interativa, formulário de captura de leads, integração com Google Maps e suporte ao modo escuro.",
      tech: ["React", "JavaScript", "Framer Motion", "Tailwind CSS"],
      images: [
        "/projects/modern-clinic/modern-clinic_1.jpg",
        "/projects/modern-clinic/modern-clinic_2.jpg",
        "/projects/modern-clinic/modern-clinic_3.jpg"
      ],
      github: "https://github.com/Sullivan18/clinic-modern-web",
      live: "https://sullivan18.github.io/clinic-modern-web/"
    },
    {
      title: "Restaurante - Website",
      description: "Website completo de restaurante desenvolvido com React, incluindo API para comunicação com banco de dados, sistema de pedidos e interface responsiva.",
      tech: ["React", "JavaScript", "CSS", "HTML", "API"],
      images: [
        "/projects/restaurante/restaurante_1.jpg",
        "/projects/restaurante/restaurante_2.jpg",
        "/projects/restaurante/restaurante_3.jpg"
      ],
      github: "https://github.com/Sullivan18/restaurante",
      live: "https://restaurante-inky.vercel.app/"
    },
    {
      title: "Quick Time Event Master",
      description: "Desenvolvimento de websites para empresa de jogos com integração de mapas interativos, implementação de recaptcha e Google Analytics.",
      tech: ["React", "JavaScript", "MongoDB", "React-Leaflet"],
      images: [
        "/projects/qtemaster/qtemaster_1.avif",
        "/projects/qtemaster/qtemaster_2.webp",
        "/projects/qtemaster/qtemaster_3.jpg"
      ],
      github: null, // Código privado
      live: "https://qtem.inoutbox.games/"
    },
    {
      title: "Análise de Sentimentos - Twitter",
      description: "Sistema de análise de sentimentos usando Transformers e TensorFlow. Coleta tweets via Selenium, analisa sentimentos e fornece dashboard para profissionais de saúde emocional.",
      tech: ["React", "Python", "TensorFlow", "JavaScript", "Transformers"],
      image: "/projects/sentiment-analysis/sentiment-analysis.jpg",
      github: "https://github.com/Sullivan18/SentimentDash",
      live: undefined // Projeto de IA sem demo
    },
    {
      title: "Detecção de Sarna em Cachorros - IA",
      description: "Sistema de detecção de sarna em cães usando CNN com TensorFlow/Keras. Frontend React com API Express.js para processamento de imagens.",
      tech: ["Python", "React", "Keras", "TensorFlow", "JavaScript"],
      image: "/projects/dog-detection/dog-detection.jpg",
      github: "https://github.com/Sullivan18/MyPet",
      live: undefined // Projeto de IA sem demo
    }
  ];

  const skills: Skill[] = [
    { 
      name: "Frontend", 
      icon: FaCode, 
      items: ["React", "React Native", "TypeScript", "JavaScript", "HTML/CSS"] 
    },
    { 
      name: "Backend", 
      icon: FaServer, 
      items: ["C#", ".NET Framework", "Node.js", "Express.js", "Python"] 
    },
    { 
      name: "Banco de Dados", 
      icon: FaDatabase, 
      items: ["SQL Server", "MongoDB", "MySQL"] 
    },
    { 
      name: "IA & ML", 
      icon: FaPalette, 
      items: ["TensorFlow", "Keras", "Transformers", "CNN", "Selenium"] 
    }
  ];

  // Variantes de animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  // const itemVariants = {
  //   hidden: { y: 20, opacity: 0 },
  //   visible: {
  //     y: 0,
  //     opacity: 1,
  //     transition: {
  //       duration: 0.5,
  //       ease: "easeOut" as const
  //     }
  //   }
  // };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 50 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    },
    hover: {
      scale: 1.08,
      y: -15,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const skillCardVariants = {
    hidden: { x: -50, opacity: 0, rotateY: -15 },
    visible: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    },
    hover: {
      scale: 1.08,
      rotateY: 5,
      boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.08,
      y: -3,
      boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const
      }
    },
    tap: {
      scale: 0.92,
      transition: {
        duration: 0.1
      }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.3,
      y: -5,
      rotate: 360,
      transition: {
        duration: 0.4,
        ease: "easeInOut" as const
      }
    },
    tap: {
      scale: 0.8,
      transition: {
        duration: 0.1
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const
      }
    }
  };

  // Variantes do modal
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.3,
        ease: "easeIn" as const
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  // Função para abrir modal
  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    // Foco no modal após a animação
    setTimeout(() => {
      modalRef.current?.focus();
    }, 100);
  };

  // Função para fechar modal
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  // Funções para abrir/fechar modal de Skill
  const openSkillModal = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsSkillModalOpen(true);
    setTimeout(() => {
      skillModalRef.current?.focus();
    }, 100);
  };

  const closeSkillModal = () => {
    setIsSkillModalOpen(false);
    setTimeout(() => setSelectedSkill(null), 300);
  };

  // Gerenciar foco do teclado
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isModalOpen) closeModal();
        if (isSkillModalOpen) closeSkillModal();
      }
    };

    const anyModalOpen = isModalOpen || isSkillModalOpen;
    if (anyModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, isSkillModalOpen]);

  // Função para animar texto letra por letra
  const AnimatedText = ({ text, className }: { text: string; className: string }) => {
    return (
      <motion.h2
        className={className}
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {text.split("").map((letter, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            style={{ display: "inline-block" }}
            transition={{ delay: index * 0.05 }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.h2>
    );
  };

  // Função para determinar a altura do container baseada no projeto
  const getImageContainerHeight = () => {
    // Altura flexível para todos os projetos, permitindo que as imagens se ajustem naturalmente
    return "h-64 md:h-72 lg:h-80 xl:h-96"; // Altura generosa para todos os projetos
  };

  // Função para determinar o padding baseado no projeto
  const getImagePadding = () => {
    // Padding generoso para todos os projetos, permitindo que as imagens tenham espaço adequado
    return "p-2 md:p-3 lg:p-4"; // Padding responsivo para todos os projetos
  };

  // Função para determinar o object-fit baseado no projeto
  // const getImageObjectFit = (projectTitle: string) => {
  //   // Usar object-contain para todos os projetos, garantindo que a imagem completa seja exibida
  //   return "object-contain";
  // };

  // Função para determinar o aspect ratio baseado no projeto
  // const getImageAspectRatio = (projectTitle: string) => {
  //   // Para o Ludare (imagem vertical), usar aspect-ratio específico
  //   if (projectTitle.includes("Ludare")) {
  //     return "aspect-[9/16]"; // Proporção vertical (9:16)
  //   }
  //   // Para projetos horizontais, usar aspect-ratio horizontal
  //   return "aspect-[16/9]"; // Proporção horizontal (16:9)
  // };

  // Estética dinâmica por Skill
  const getSkillGradient = (skillName: string) => {
    if (skillName.includes('Front')) return 'from-blue-600 via-purple-600 to-pink-600';
    if (skillName.includes('Back')) return 'from-amber-600 via-orange-600 to-red-600';
    if (skillName.includes('Banco')) return 'from-emerald-600 via-teal-600 to-cyan-600';
    if (skillName.includes('IA')) return 'from-fuchsia-600 via-purple-600 to-indigo-600';
    return 'from-slate-700 via-slate-800 to-slate-900';
  };

  const getSkillTagline = (skillName: string) => {
    if (skillName.includes('Front')) return 'Interfaces rápidas, acessíveis e animadas';
    if (skillName.includes('Back')) return 'APIs robustas, seguras e escaláveis';
    if (skillName.includes('Banco')) return 'Dados consistentes, consultas eficientes';
    if (skillName.includes('IA')) return 'Modelos inteligentes, insights poderosos';
    return 'Excelência técnica e experiência do usuário';
  };

  const getSkillParticles = (skillName: string) => {
    if (skillName.includes('Front')) return ['JS', 'TS', '<div/>', 'CSS', 'hooks', 'state', 'UI', 'UX', 'DOM'];
    if (skillName.includes('Back')) return ['API', 'REST', 'JWT', 'Queue', 'Cache', 'SOLID', 'C#', 'Node'];
    if (skillName.includes('Banco')) return ['SQL', 'JOIN', 'Index', 'ACID', 'NoSQL', 'Query'];
    if (skillName.includes('IA')) return ['ML', 'DL', 'Tensor', 'ROC', 'NLP', 'CNN'];
    return ['Code', 'Dev'];
  };

  // Projetos relacionados à skill selecionada
  const getRelatedProjects = (skill: Skill) => {
    const skillSet = new Set(skill.items);
    const scored = projects.map((p) => {
      const overlap = p.tech.filter((t: string) => skillSet.has(t));
      // Bônus leve para projetos com imagens ao falar de Frontend
      const imageBonus = skill.name.includes('Front') && p.images ? 0.5 : 0;
      return { project: p, score: overlap.length + imageBonus, overlap };
    });
    return scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  };

  // Pega a imagem de preview do projeto (primeira disponível)
  const getProjectPreviewImage = (project: Project): string | null => {
    // Usa somente imagens que sabemos existir sob /public
    return project.images?.[0] ?? null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header/Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-50 border-b border-slate-200 dark:border-slate-700"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="text-xl font-bold text-slate-900 dark:text-white"
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95, rotate: -2 }}
              transition={{ duration: 0.2 }}
            >
              André Luiz
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {[
                { text: "Início", href: "#home" },
                { text: "Sobre", href: "#about" },
                { text: "Projetos", href: "#projects" },
                { text: "Experiência", href: "#experience" },
                { text: "Contato", href: "#contact" }
              ].map((item, index) => (
                <motion.a
                  key={item.text}
                  href={item.href}
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.1, 
                    y: -2,
                    color: "#3b82f6"
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                  {item.text}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <HeroBackground />
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center relative z-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 200 }}
            >
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center relative overflow-hidden">
                <motion.div
                  className="relative w-full h-full rounded-full overflow-hidden"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
          >
            <Image
                    src="/profile.jpeg"
                    alt="André Luiz - Desenvolvedor Full Stack, foto de perfil profissional"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 128px, 128px"
                    priority
                    quality={90}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                  {/* Overlay removido por solicitação */}
                </motion.div>
              </div>
            </motion.div>
            <motion.h1 
              className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Olá, eu sou{" "}
              <motion.span 
                className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                André Luiz
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Desenvolvedor Full Stack especializado em .NET, C#, SQL Server, JavaScript, React e React Native. 
              Apaixonado por criar soluções inovadoras e experiências digitais excepcionais.
            </motion.p>
            <motion.div 
              className="flex justify-center space-x-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <motion.a
                href="#projects"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 relative overflow-hidden"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Ver Projetos</span>
              </motion.a>
              <motion.a
                href="#contact"
                className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 relative overflow-hidden"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <motion.span
                  className="absolute inset-0 bg-slate-200 dark:bg-slate-700 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Contato</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <AnimatedText 
            text="Sobre Mim"
            className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12"
          />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                Sou um desenvolvedor Full Stack com experiência em diversas tecnologias, desde desenvolvimento 
                mobile com React Native até aplicações web com React e .NET. Especializado em C#, SQL Server, 
                JavaScript e TypeScript, busco sempre aplicar as melhores práticas em meus projetos.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                Minha experiência inclui desenvolvimento de aplicações de rede social, sistemas de análise 
                de dados com IA, websites responsivos e integração de APIs. Sou apaixonado por criar soluções 
                que não apenas funcionem perfeitamente, mas que também proporcionem uma experiência excepcional ao usuário.
              </p>
              <motion.div 
                className="flex space-x-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {[
                  { icon: FaGithub, href: "https://github.com/Sullivan18", label: "GitHub - Ver repositórios" },
                  { icon: FaLinkedin, href: "https://www.linkedin.com/in/andré-luiz-081432275/", label: "LinkedIn - Perfil profissional" },
                  { icon: FaEnvelope, href: "mailto:andre.sullivan18@hotmail.com", label: "Email - Enviar mensagem" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors relative p-2 rounded-full"
                    variants={iconVariants}
                    whileHover="hover"
                    whileTap="tap"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    aria-label={social.label}
                  >
                    <motion.div
                      className="absolute inset-0 bg-blue-100 dark:bg-blue-900 rounded-full opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <social.icon size={24} className="relative z-10" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
            <motion.div 
              className="grid grid-cols-2 gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg relative overflow-hidden cursor-pointer"
                  variants={skillCardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => openSkillModal(skill)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openSkillModal(skill);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Ver detalhes de ${skill.name}`}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="flex items-center mb-3 relative z-10">
                    <skill.icon className="text-blue-600 mr-2" size={20} />
                    <h3 className="font-semibold text-slate-900 dark:text-white">{skill.name}</h3>
                  </div>
                  <div className="space-y-2 relative z-10">
                    {skill.items.map((item, itemIndex) => (
                      <motion.div 
                        key={itemIndex} 
                        className="text-sm text-slate-600 dark:text-slate-300"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: itemIndex * 0.1 }}
                        whileHover={{ x: 5, color: "#3b82f6" }}
                      >
                        {item}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Fundo animado: Constelação em SVG */}
        {isClient && (
          <motion.svg
            className="absolute inset-0 w-full h-full text-slate-400/40 dark:text-slate-300/30"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
            aria-hidden
          >
            {(() => {
              const seed = 42;
              const pseudoRandom = (i: number) => {
                // PRNG simples e determinístico para estabilidade visual
                const x = Math.sin(i * 999 + seed) * 10000;
                return x - Math.floor(x);
              };

              // Zona central a evitar (onde ficam os cards): ~[320, 680]
              // Geramos nós somente nas laterais esquerda e direita
              const leftBand = { min: 30, max: 260 };
              const rightBand = { min: 740, max: 970 };
              type Node = { id: number; x: number; y: number; r: number; side: 'left' | 'right' };
              const nodes: Node[] = Array.from({ length: 34 }).map((_, i) => {
                const chooseLeft = pseudoRandom(i + 5) < 0.5;
                const band = chooseLeft ? leftBand : rightBand;
                return {
                  id: i,
                  x: band.min + pseudoRandom(i + 1) * (band.max - band.min),
                  y: 40 + pseudoRandom(i + 2) * 520,
                  r: 1.0 + pseudoRandom(i + 3) * 1.6,
                  side: chooseLeft ? 'left' : 'right',
                };
              });

              // Conexões somente dentro da mesma lateral para não atravessar o centro
              const lines: Array<[number, number]> = [];
              for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                  if (nodes[i].side !== nodes[j].side) continue;
                  const dx = nodes[i].x - nodes[j].x;
                  const dy = nodes[i].y - nodes[j].y;
                  const d2 = dx * dx + dy * dy;
                  if (d2 < 140 * 140 && pseudoRandom(i * 37 + j * 17) < 0.28) {
                    lines.push([i, j]);
                  }
                }
              }

              return (
                <>
                  {/* Conexões */}
                  {lines.map(([a, b], idx) => (
                    <motion.line
                      key={`l-${idx}`}
                      x1={nodes[a].x}
                      y1={nodes[a].y}
                      x2={nodes[b].x}
                      y2={nodes[b].y}
                      stroke="currentColor"
                      strokeWidth={0.6}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 0.45 }}
                      viewport={{ once: true }}
                      animate={{ opacity: [0.25, 0.55, 0.25] }}
                      transition={{ duration: 3.6 + (idx % 7) * 0.2, repeat: Infinity, ease: "easeInOut", delay: (idx % 5) * 0.3 }}
                    />
                  ))}

                  {/* Nós (estrelas) */}
                  {nodes.map((n, idx) => (
                    <motion.circle
                      key={`n-${n.id}`}
                      cx={n.x}
                      cy={n.y}
                      r={n.r}
                      fill="currentColor"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 1.2, 1] }}
                      transition={{ duration: 2.4 + (idx % 9) * 0.15, repeat: Infinity, ease: "easeInOut", delay: idx * 0.05 }}
                    />
                  ))}

                  {/* Meteoros sutis somente nas laterais */}
                  {/* Esquerda */}
                  <motion.rect
                    x={leftBand.min + 20}
                    y={-40}
                    width={80}
                    height={1.4}
                    fill="url(#grad)"
                    rx={1}
                    transform="rotate(18 0 0)"
                    initial={{ opacity: 0 }}
                    animate={{ y: [ -40, 640, 640 ], opacity: [0, 1, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
                  />
                  {/* Direita */}
                  <motion.rect
                    x={rightBand.max - 120}
                    y={640}
                    width={80}
                    height={1.4}
                    fill="url(#grad)"
                    rx={1}
                    transform="rotate(-18 0 0)"
                    initial={{ opacity: 0 }}
                    animate={{ y: [ 640, -40, -40 ], opacity: [0, 1, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeOut", delay: 1.6 }}
                  />

                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                      <stop offset="40%" stopColor="rgba(255,255,255,0.8)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </linearGradient>
                  </defs>
                </>
              );
            })()}
          </motion.svg>
        )}

        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedText 
            text="Meus Projetos"
            className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12"
          />
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-lg relative group w-full cursor-pointer"
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => openModal(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(project);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Ver detalhes do projeto ${project.title}`}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                                                {project.images ? (
                  // Projetos com imagens (frontend)
                  <div className={`${getImageContainerHeight()} relative overflow-hidden ${getImagePadding()}`}>
                    <motion.div
                      className="relative w-full h-full"
                      variants={imageVariants}
                      whileHover="hover"
                    >
                      <ProjectCarousel images={project.images} title={project.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h4 className="text-lg font-semibold">{project.title}</h4>
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  // Projetos sem imagens (backend) - Design diferenciado
                  <div className="h-56 md:h-64 lg:h-72 xl:h-80 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
                    <motion.div
                      className="relative w-full h-full flex flex-col justify-center items-center"
                      variants={imageVariants}
                      whileHover="hover"
                    >
                      {/* Efeito de Partículas de Código */}
                      {isClient && (
                        <motion.div
                          className="absolute inset-0 opacity-20"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 0.2 }}
                          viewport={{ once: true }}
                        >
                          {[
                            { left: 20, top: 20, text: '01' },
                            { left: 40, top: 30, text: '10' },
                            { left: 60, top: 40, text: 'API' },
                            { left: 80, top: 50, text: 'DB' },
                            { left: 30, top: 60, text: 'ML' },
                            { left: 50, top: 70, text: 'AI' },
                            { left: 70, top: 80, text: '{}' },
                            { left: 90, top: 90, text: '[]' },
                            { left: 25, top: 35, text: '()' },
                            { left: 45, top: 45, text: '=>' },
                            { left: 65, top: 55, text: '&&' },
                            { left: 85, top: 65, text: '||' },
                            { left: 35, top: 75, text: '++' },
                            { left: 55, top: 85, text: '--' },
                            { left: 75, top: 95, text: '//' }
                          ].map((particle, i) => (
                            <motion.div
                              key={`particle-${particle.text}-${i}`}
                              className="absolute text-green-400 text-xs font-mono"
                              style={{
                                left: `${particle.left}%`,
                                top: `${particle.top}%`,
                              }}
                              animate={{
                                y: [0, -20, 0],
                                opacity: [0, 1, 0],
                              }}
                              transition={{
                                duration: 3,
                                delay: i * 0.2,
                                repeat: Infinity,
                                repeatDelay: 2,
                              }}
                            >
                              {particle.text}
                            </motion.div>
                          ))}
                        </motion.div>
                      )}

                      {/* Ícone Central */}
                      <motion.div
                        className="relative z-10 mb-4"
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                      >
                        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                          <FaCode className="text-white text-2xl" />
                        </div>
                      </motion.div>

                      {/* Título */}
                      <motion.h4 
                        className="text-xl font-bold text-white text-center mb-2 relative z-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                      >
                        {project.title}
                      </motion.h4>

                      {/* Subtítulo */}
                      <motion.p 
                        className="text-green-300 text-sm text-center relative z-10"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                      >
                        Backend & IA
                      </motion.p>

                      {/* Efeito de Brilho */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                      />
                    </motion.div>
                  </div>
                )}
                <div className="p-6 relative z-10">
                  <motion.h3 
                    className="text-xl font-semibold text-slate-900 dark:text-white mb-2"
                    whileHover={{ color: "#3b82f6" }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.title}
                  </motion.h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
                    {project.description}
                  </p>
                  <motion.div 
                    className="flex flex-wrap gap-2 mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    {project.tech.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm rounded-full cursor-pointer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: techIndex * 0.1 }}
                        whileHover={{ 
                          scale: 1.15, 
                          backgroundColor: "#dbeafe",
                          color: "#1e40af"
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                  <div className="flex space-x-4">
                    {project.github ? (
                      <motion.a
                        href={project.github}
                        className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors p-2 rounded-full"
                        variants={iconVariants}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="Ver código no GitHub"
                      >
                        <FaGithub size={20} />
                      </motion.a>
                    ) : (
                      <motion.div
                        className="text-slate-400 dark:text-slate-500 p-2 rounded-full cursor-not-allowed relative group"
                        variants={iconVariants}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={(e) => e.stopPropagation()}
                        title="Código privado - Projeto comercial"
                      >
                        <FaGithub size={20} />
                        <motion.div
                          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                        >
                          Código Privado
                        </motion.div>
                      </motion.div>
                    )}
                    {project.live ? (
                      <motion.a
                        href={project.live}
                        className="text-blue-600 hover:text-blue-700 transition-colors font-semibold flex items-center"
                        whileHover={{ x: 8, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Ver Demo →
                      </motion.a>
                    ) : (
                      <motion.div
                        className="text-green-600 dark:text-green-400 font-semibold flex items-center cursor-not-allowed relative group"
                        onClick={(e) => e.stopPropagation()}
                        title="Projeto de IA - Sem demo público"
                      >
                        <motion.div
                          animate={{ 
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="mr-2"
                        >
                          🤖
                        </motion.div>
                        IA Project
                        <motion.div
                          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                        >
                          Projeto de IA
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
        {/* Floating Particles Background */}
        {isClient && (
          <motion.div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        )}

        <div className="max-w-6xl mx-auto relative z-10">
          <AnimatedText 
            text="Experiência Profissional"
            className="text-2xl sm:text-3xl font-bold text-center text-slate-900 dark:text-white mb-8 sm:mb-12"
          />
          
          <motion.div 
            className="space-y-8 sm:space-y-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Inoutbox Experience */}
            <motion.div 
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Animated Timeline Line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-600 hidden sm:block">
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
                {/* Timeline Dots */}
                <motion.div
                  className="absolute top-6 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full border-2 border-white dark:border-slate-800 shadow-lg"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  whileHover={{ scale: 1.3 }}
                />
              </div>
              
              {/* Experience Card */}
              <motion.div 
                className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 relative overflow-hidden group ml-8 sm:ml-12 border border-transparent hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-300"
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {/* Animated Background Pattern */}
                <motion.div
                  className="absolute inset-0 opacity-5"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 transform rotate-12 scale-150" />
                </motion.div>

                {/* Gradient Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Company Logo with Glow Effect */}
                <motion.div 
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 relative z-10 shadow-lg"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 5,
                    boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-white font-bold text-base sm:text-lg">I</span>
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg sm:rounded-xl blur-sm opacity-0"
                    whileHover={{ opacity: 0.5 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <motion.h3 
                    className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2"
                    whileHover={{ color: "#9333ea" }}
                  >
                    Desenvolvedor Web
                  </motion.h3>
                  <motion.p 
                    className="text-purple-600 dark:text-purple-400 font-semibold mb-1"
                    whileHover={{ color: "#7c3aed" }}
                  >
                    Inoutbox Games
                  </motion.p>
                  <motion.p 
                    className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-2 sm:mb-3"
                    whileHover={{ color: "#475569" }}
                  >
                    nov de 2023 - out de 2024 · 1 ano
                  </motion.p>
                  <motion.p 
                    className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-2 sm:mb-3"
                    whileHover={{ color: "#475569" }}
                  >
                    Sorocaba, São Paulo, Brasil · Remota
                  </motion.p>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                    Atuei no desenvolvimento de websites para uma empresa de jogos, focando na integração das 
                    funcionalidades de interação com o mapa do jogo utilizando React, React-Leaflet e ReactModal. 
                    Fui responsável pela personalização de estilos CSS, implementação de recaptcha para segurança 
                    e integração com o Google Analytics para monitoramento de tráfego.
                  </p>

                  {/* Skills Tags with Enhanced Animation */}
                  <motion.div 
                    className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    {["React", "JavaScript", "React-Leaflet", "ReactModal", "CSS", "Google Analytics", "Recaptcha"].map((skill, index) => (
                      <motion.span
                        key={index}
                        className="px-2 sm:px-3 py-0.5 sm:py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded-full border border-purple-200 dark:border-purple-800"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        whileHover={{ 
                          scale: 1.1, 
                          backgroundColor: "#f3e8ff",
                          y: -2,
                          boxShadow: "0 4px 12px rgba(147, 51, 234, 0.3)"
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>

                {/* Enhanced Decorative Elements */}
                <motion.div
                  className="absolute top-4 right-4 text-purple-500 opacity-20"
                  animate={{ 
                    rotate: -360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 25, 
                    repeat: Infinity, 
                    ease: "linear",
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <FaPalette size={24} />
                </motion.div>

                {/* Floating Code Elements */}
                <motion.div
                  className="absolute -top-2 -right-2 text-purple-400 opacity-30 text-xs"
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  &lt;/&gt;
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Ludare Experience */}
            <motion.div 
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Animated Timeline Line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600 hidden sm:block">
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.7 }}
                />
                {/* Timeline Dots */}
                <motion.div
                  className="absolute top-6 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-2 border-white dark:border-slate-800 shadow-lg"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  whileHover={{ scale: 1.3 }}
                />
              </div>
              
              {/* Experience Card */}
              <motion.div 
                className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 relative overflow-hidden group ml-8 sm:ml-12 border border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300"
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {/* Animated Background Pattern */}
                <motion.div
                  className="absolute inset-0 opacity-5"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 transform -rotate-12 scale-150" />
                </motion.div>

                {/* Gradient Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Company Logo with Glow Effect */}
                <motion.div 
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 relative z-10 shadow-lg"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: -5,
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-white font-bold text-base sm:text-lg">L</span>
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg sm:rounded-xl blur-sm opacity-0"
                    whileHover={{ opacity: 0.5 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <motion.h3 
                    className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2"
                    whileHover={{ color: "#3b82f6" }}
                  >
                    Desenvolvedor Full Stack
                  </motion.h3>
                  <motion.p 
                    className="text-blue-600 dark:text-blue-400 font-semibold mb-1"
                    whileHover={{ color: "#1d4ed8" }}
                  >
                    Ludare Consultoria
                  </motion.p>
                  <motion.p 
                    className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-2 sm:mb-3"
                    whileHover={{ color: "#475569" }}
                  >
                    out de 2024 - o momento · 11 meses
                  </motion.p>
                  <motion.p 
                    className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-2 sm:mb-3"
                    whileHover={{ color: "#475569" }}
                  >
                    Araçoiaba da Serra, São Paulo, Brasil · Presencial
                  </motion.p>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                    Ludare é uma rede social desenvolvida com React Native, TypeScript, C# e .NET. 
                    Responsável pelo ciclo completo de desenvolvimento, incluindo implementação de funcionalidades, 
                    otimização de performance e integração de sistemas. Atuo na modelagem de dados, manutenção de APIs 
                    e correção de bugs, com foco em garantir a eficiência e segurança da aplicação.
                  </p>

                  {/* Skills Tags with Enhanced Animation */}
                  <motion.div 
                    className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    {["React Native", "TypeScript", "C#", ".NET", "SQL Server", "APIs"].map((skill, index) => (
                      <motion.span
                        key={index}
                        className="px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full border border-blue-200 dark:border-blue-800"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        whileHover={{ 
                          scale: 1.1, 
                          backgroundColor: "#dbeafe",
                          y: -2,
                          boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)"
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>

                {/* Enhanced Decorative Elements */}
                <motion.div
                  className="absolute top-4 right-4 text-blue-500 opacity-20"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear",
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <FaCode size={24} />
                </motion.div>

                {/* Floating Code Elements */}
                <motion.div
                  className="absolute -top-2 -right-2 text-blue-400 opacity-30 text-xs"
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  {`{}`}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Future Section - Em Breve */}
            <motion.div 
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Animated Timeline Line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 to-emerald-600 hidden sm:block">
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.9 }}
                />
                {/* Timeline Dots */}
                <motion.div
                  className="absolute top-6 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full border-2 border-white dark:border-slate-800 shadow-lg"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  whileHover={{ scale: 1.3 }}
                />
              </div>
              
              {/* Future Card */}
              <motion.div 
                className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 relative overflow-hidden group ml-8 sm:ml-12 border-2 border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700 transition-all duration-300"
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {/* Animated Background Pattern */}
                <motion.div
                  className="absolute inset-0 opacity-5"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 transform rotate-45 scale-150" />
                </motion.div>

                {/* Gradient Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Future Icon with Glow Effect */}
                <motion.div 
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 relative z-10 shadow-lg"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 5,
                    boxShadow: "0 0 20px rgba(5, 150, 105, 0.5)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-white font-bold text-base sm:text-lg">🚀</span>
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg sm:rounded-xl blur-sm opacity-0"
                    whileHover={{ opacity: 0.5 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <motion.h3 
                    className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2"
                    whileHover={{ color: "#059669" }}
                  >
                    Em Breve...
                  </motion.h3>
                  <motion.p 
                    className="text-green-600 dark:text-green-400 font-semibold mb-1"
                    whileHover={{ color: "#047857" }}
                  >
                    Próximos Desafios
                  </motion.p>
                  <motion.p 
                    className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-2 sm:mb-3"
                    whileHover={{ color: "#475569" }}
                  >
                    Sempre em evolução
                  </motion.p>
                  <motion.p 
                    className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-2 sm:mb-3"
                    whileHover={{ color: "#475569" }}
                  >
                    Buscando novas oportunidades
                  </motion.p>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                    Continuo aprimorando minhas habilidades e explorando novas tecnologias. 
                    Sempre aberto a novos desafios e oportunidades de crescimento profissional.
                  </p>

                  {/* Skills Tags with Enhanced Animation */}
                  <motion.div 
                    className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                  >
                    {["Aprendizado Contínuo", "Novas Tecnologias", "Desafios", "Crescimento"].map((skill, index) => (
                      <motion.span
                        key={index}
                        className="px-2 sm:px-3 py-0.5 sm:py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full border border-green-200 dark:border-green-800"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        whileHover={{ 
                          scale: 1.1, 
                          backgroundColor: "#dcfce7",
                          y: -2,
                          boxShadow: "0 4px 12px rgba(5, 150, 105, 0.3)"
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>

                {/* Enhanced Decorative Elements */}
                <motion.div
                  className="absolute top-4 right-4 text-green-500 opacity-20"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 30, 
                    repeat: Infinity, 
                    ease: "linear",
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <span className="text-2xl">🌟</span>
                </motion.div>

                {/* Floating Code Elements */}
                <motion.div
                  className="absolute -top-2 -right-2 text-green-400 opacity-30 text-xs"
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  ✨
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedText 
            text="Vamos Trabalhar Juntos"
            className="text-3xl font-bold text-slate-900 dark:text-white mb-8"
          />
          <motion.p 
            className="text-lg text-slate-600 dark:text-slate-300 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Estou sempre aberto a novas oportunidades e projetos interessantes. 
            Entre em contato comigo!
          </motion.p>
          <motion.div 
            className="flex justify-center space-x-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.a
              href="mailto:andre.sullivan18@hotmail.com"
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 relative overflow-hidden"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <FaEnvelope size={20} className="relative z-10" />
              <span className="relative z-10">Enviar Email</span>
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/andré-luiz-081432275/"
              className="flex items-center space-x-2 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 relative overflow-hidden"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.span
                className="absolute inset-0 bg-slate-200 dark:bg-slate-700 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <FaLinkedin size={20} className="relative z-10" />
              <span className="relative z-10">LinkedIn</span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="py-8 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">
            © 2025 André Luiz. Todos os direitos reservados.
          </p>
        </div>
      </motion.footer>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 pt-[max(env(safe-area-inset-top),1rem)] pb-[max(env(safe-area-inset-bottom),1rem)] min-h-[100dvh]"
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              variants={backdropVariants}
              onClick={closeModal}
              aria-hidden="true"
            />
            
            {/* Modal Content */}
            <motion.div
              ref={modalRef}
              className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[calc(100dvh-2rem)] overflow-y-auto"
              variants={modalVariants}
              tabIndex={-1}
              role="document"
            >
              {/* Close Button */}
              <motion.button
                ref={closeButtonRef}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
                onClick={closeModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Fechar modal"
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    closeModal();
                  }
                }}
              >
                <FaTimes size={24} />
              </motion.button>

              {/* Project Image/Content */}
              {selectedProject.images ? (
                // Projetos com imagens
                <div className="relative h-96 overflow-hidden rounded-t-2xl">
                  <ProjectCarousel images={selectedProject.images} title={selectedProject.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              ) : (
                // Projetos de IA sem imagens - Design criativo
                <div className="relative h-96 overflow-hidden rounded-t-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                  {/* Efeito de Partículas de Código */}
                  {isClient && (
                    <motion.div
                      className="absolute inset-0 opacity-30"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                      transition={{ duration: 1 }}
                    >
                      {[
                        { left: 15, top: 15, text: '01', delay: 0 },
                        { left: 85, top: 25, text: '10', delay: 0.2 },
                        { left: 25, top: 45, text: 'API', delay: 0.4 },
                        { left: 75, top: 55, text: 'DB', delay: 0.6 },
                        { left: 45, top: 75, text: 'ML', delay: 0.8 },
                        { left: 65, top: 85, text: 'AI', delay: 1.0 },
                        { left: 35, top: 35, text: '{}', delay: 1.2 },
                        { left: 55, top: 65, text: '[]', delay: 1.4 },
                        { left: 95, top: 45, text: '()', delay: 1.6 },
                        { left: 5, top: 65, text: '=>', delay: 1.8 },
                        { left: 85, top: 75, text: '&&', delay: 2.0 },
                        { left: 15, top: 85, text: '||', delay: 2.2 },
                        { left: 65, top: 25, text: '++', delay: 2.4 },
                        { left: 35, top: 55, text: '--', delay: 2.6 },
                        { left: 75, top: 35, text: '//', delay: 2.8 }
                      ].map((particle, i) => (
                        <motion.div
                          key={`modal-particle-${particle.text}-${i}`}
                          className="absolute text-green-400 text-sm font-mono"
                          style={{
                            left: `${particle.left}%`,
                            top: `${particle.top}%`,
                          }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ 
                            opacity: [0, 1, 0],
                            scale: [0, 1.2, 0],
                            y: [0, -30, 0]
                          }}
                          transition={{
                            duration: 4,
                            delay: particle.delay,
                            repeat: Infinity,
                            repeatDelay: 3,
                          }}
                        >
                          {particle.text}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* Ícone Central Animado */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div
                      className="relative"
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }}
                    >
                      <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center relative">
                        <FaCode className="text-white text-3xl" />
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-green-400"
                          animate={{ 
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Efeito de Brilho */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      delay: 1,
                      ease: "easeInOut"
                    }}
                  />

                  {/* Overlay Gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
                </div>
              )}

              {/* Project Content */}
              <div className="p-8">
                <motion.h2 
                  id="modal-title"
                  className="text-3xl font-bold text-slate-900 dark:text-white mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {selectedProject.title}
                </motion.h2>
                
                {!selectedProject.images && (
                  <motion.p 
                    className="text-lg text-green-600 dark:text-green-400 font-semibold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    🤖 Projeto de Inteligência Artificial & Backend
                  </motion.p>
                )}
                
                <motion.p 
                  id="modal-description"
                  className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {selectedProject.description}
                </motion.p>

                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Tecnologias Utilizadas
                    </h3>
                    {!selectedProject.images && (
                      <motion.div
                        className="text-green-600 dark:text-green-400"
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        🤖
                      </motion.div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech, index) => (
                      <motion.span
                        key={index}
                        className={`px-4 py-2 text-sm rounded-full font-medium ${
                          !selectedProject.images 
                            ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" 
                            : "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                                      {selectedProject.github ? (
                      <motion.a
                        href="https://github.com/Sullivan18"
                        className="flex items-center justify-center space-x-2 bg-slate-900 dark:bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaGithub size={20} />
                        <span>Ver Código</span>
                      </motion.a>
                    ) : (
                    <motion.div
                      className="flex items-center justify-center space-x-2 bg-slate-400 dark:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold cursor-not-allowed relative group"
                      whileHover={{ scale: 1.02 }}
                      title="Código privado - Projeto comercial"
                    >
                      <FaGithub size={20} />
                      <span>Código Privado</span>
                      <motion.div
                        className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-sm px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                      >
                        Projeto comercial - Código confidencial
                      </motion.div>
                    </motion.div>
                  )}
                  {selectedProject.images ? (
                    <motion.a
                      href={selectedProject.live}
                      className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaExternalLinkAlt size={20} />
                      <span>Ver Demo</span>
                    </motion.a>
                  ) : (
                    <motion.div
                      className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold cursor-not-allowed relative group"
                      whileHover={{ scale: 1.02 }}
                      title="Projeto de IA - Código privado"
                    >
                      <motion.div
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        🤖
                      </motion.div>
                      <span>Projeto de IA</span>
                      <motion.div
                        className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-sm px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                      >
                        Sistema de IA - Código confidencial
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skill Modal */}
      <AnimatePresence>
        {isSkillModalOpen && selectedSkill && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 pt-[max(env(safe-area-inset-top),1rem)] pb-[max(env(safe-area-inset-bottom),1rem)] min-h-[100dvh]"
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="skill-modal-title"
            aria-describedby="skill-modal-description"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              variants={backdropVariants}
              onClick={closeSkillModal}
              aria-hidden="true"
            />

            {/* Content */}
            <motion.div
              ref={skillModalRef}
              className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[calc(100dvh-2rem)] overflow-y-auto"
              variants={modalVariants}
              tabIndex={-1}
              role="document"
            >
              {/* Header visual */}
              <div className={`relative h-40 bg-gradient-to-r ${getSkillGradient(selectedSkill.name)}`}>
                {isClient && (
                  <motion.div className="absolute inset-0 opacity-20">
                    {getSkillParticles(selectedSkill.name).map((p, i) => (
                      <motion.span
                        key={`${p}-${i}`}
                        className="absolute text-white/80 text-xs font-mono"
                        style={{
                          left: `${(i * 97) % 100}%`,
                          top: `${(i * 37) % 100}%`,
                        }}
                        animate={{ y: [0, -12, 0], opacity: [0.2, 0.7, 0.2] }}
                        transition={{ duration: 3 + i * 0.1, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        {p}
                      </motion.span>
                    ))}
                  </motion.div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-4 left-6 flex items-center gap-3 text-white">
                  <selectedSkill.icon size={28} />
                  <h3 id="skill-modal-title" className="text-2xl font-bold">
                    {selectedSkill.name}
                  </h3>
                </div>
                <motion.button
                  ref={closeSkillButtonRef}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors"
                  onClick={closeSkillModal}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Fechar modal de skills"
                >
                  <FaTimes size={22} />
                </motion.button>
              </div>

              {/* Body */}
              <div className="p-6">
                <p id="skill-modal-description" className="text-slate-600 dark:text-slate-300 mb-4">
                  {getSkillTagline(selectedSkill.name)}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedSkill.items.map((t, i) => (
                    <motion.span
                      key={`${t}-${i}`}
                      className="px-4 py-2 rounded-full text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>

                {/* Projetos Relacionados */}
                <div className="mt-2">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Projetos Relacionados</h4>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {getRelatedProjects(selectedSkill).map(({ project, overlap }, i) => (
                      <motion.button
                        key={project.title}
                        onClick={() => {
                          closeSkillModal();
                          openModal(project);
                        }}
                        className="text-left rounded-xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                        whileHover={{ y: -4, boxShadow: '0 10px 20px rgba(0,0,0,0.08)' }}
                      >
                        <div className="relative h-24 w-full">
                          {getProjectPreviewImage(project) ? (
                            <Image
                              src={getProjectPreviewImage(project)!}
                              alt={`Prévia do projeto ${project.title}`}
                              fill
                              sizes="(max-width: 640px) 100vw, 33vw"
                              className="object-cover"
                              placeholder="blur"
                              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                            />
                          ) : (
                            <div className="h-full w-full relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                              {isClient && (
                                <motion.div className="absolute inset-0 opacity-20">
                                  {[
                                    { left: 12, top: 20, text: '01' },
                                    { left: 28, top: 35, text: '10' },
                                    { left: 46, top: 25, text: 'API' },
                                    { left: 64, top: 45, text: 'DB' },
                                    { left: 78, top: 30, text: '{}' },
                                    { left: 86, top: 55, text: '()' },
                                  ].map((particle, j) => (
                                    <motion.span
                                      key={`mini-p-${particle.text}-${j}`}
                                      className="absolute text-green-400/80 text-[10px] font-mono"
                                      style={{ left: `${particle.left}%`, top: `${particle.top}%` }}
                                      animate={{ y: [0, -8, 0], opacity: [0, 1, 0] }}
                                      transition={{ duration: 3, delay: j * 0.15, repeat: Infinity, repeatDelay: 2 }}
                                    >
                                      {particle.text}
                                    </motion.span>
                                  ))}
                                </motion.div>
                              )}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center shadow-inner">
                                  <FaCode className="text-white" size={16} />
                                </div>
                              </div>
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent"
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                              />
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <div className="font-medium text-slate-900 dark:text-white line-clamp-2">{project.title}</div>
                          <div className="mt-1 flex flex-wrap gap-1.5">
                            {overlap.slice(0, 3).map((t) => (
                              <span key={`${project.title}-${t}`} className="px-2 py-0.5 text-xs rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                    {getRelatedProjects(selectedSkill).length === 0 && (
                      <div className="sm:col-span-3 text-slate-600 dark:text-slate-300 text-sm">
                        Nenhum projeto perfeitamente relacionado. Confira todos os projetos abaixo.
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <motion.a
                    href="#projects"
                    className="px-5 py-2.5 rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-semibold"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Ver Projetos Relacionados
                  </motion.a>
                  <motion.button
                    onClick={closeSkillModal}
                    className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Fechar
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
