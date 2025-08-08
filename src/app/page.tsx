"use client";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaPalette, FaMobile, FaDatabase, FaServer, FaTimes, FaExternalLinkAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

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
            priority
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
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const projects = [
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

  const skills = [
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

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
  const openModal = (project: typeof projects[0]) => {
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

  // Gerenciar foco do teclado
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevenir scroll do body
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

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
  const getImageContainerHeight = (projectTitle: string) => {
    // Altura flexível para todos os projetos, permitindo que as imagens se ajustem naturalmente
    return "h-64 md:h-72 lg:h-80 xl:h-96"; // Altura generosa para todos os projetos
  };

  // Função para determinar o padding baseado no projeto
  const getImagePadding = (projectTitle: string) => {
    // Padding generoso para todos os projetos, permitindo que as imagens tenham espaço adequado
    return "p-2 md:p-3 lg:p-4"; // Padding responsivo para todos os projetos
  };

  // Função para determinar o object-fit baseado no projeto
  const getImageObjectFit = (projectTitle: string) => {
    // Usar object-contain para todos os projetos, garantindo que a imagem completa seja exibida
    return "object-contain";
  };

  // Função para determinar o aspect ratio baseado no projeto
  const getImageAspectRatio = (projectTitle: string) => {
    // Para o Ludare (imagem vertical), usar aspect-ratio específico
    if (projectTitle.includes("Ludare")) {
      return "aspect-[9/16]"; // Proporção vertical (9:16)
    }
    // Para projetos horizontais, usar aspect-ratio horizontal
    return "aspect-[16/9]"; // Proporção horizontal (16:9)
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
      <section id="home" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center"
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
                    sizes="128px"
                    priority
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20"
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
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
                  className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg relative overflow-hidden"
                  variants={skillCardVariants}
                  whileHover="hover"
                  whileTap="tap"
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
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
                  <div className={`${getImageContainerHeight(project.title)} relative overflow-hidden ${getImagePadding(project.title)}`}>
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
      <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-6xl mx-auto">
          <AnimatedText 
            text="Experiência Profissional"
            className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12"
          />
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Zigzag Timeline */}
            <motion.div 
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            >
                              {/* SVG Path for Zigzag */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Background Path (invisible) */}
                <path
                  d="M 20 20 L 35 20 L 50 35 L 65 20 L 80 35 L 65 50 L 80 60 L 50 80 L 20 85"
                  stroke="transparent"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Animated Path */}
                <motion.path
                  d="M 20 20 L 35 20 L 50 35 L 65 20 L 80 35 L 65 50 L 80 60 L 50 80 L 20 85"
                  stroke="url(#zigzagGradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    pathLength: { duration: 4, ease: "easeInOut" },
                    opacity: { duration: 0.5, delay: 0.2 }
                  }}
                />
                
                {/* Animated Dot that follows the path */}
                {isClient && (
                  <motion.div
                    className="absolute w-3 h-3 bg-gradient-to-r from-white to-blue-500 rounded-full shadow-lg"
                    style={{
                      left: "20%",
                      top: "20%",
                      transform: "translate(-50%, -50%)"
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    animate={{
                      left: ["20%", "35%", "50%", "65%", "80%", "65%", "80%", "50%", "20%"],
                      top: ["20%", "20%", "35%", "20%", "35%", "50%", "60%", "80%", "85%"]
                    }}
                    transition={{
                      duration: 4,
                      ease: "easeInOut",
                      delay: 0.8
                    }}
                  />
                )}
                
                <defs>
                  <linearGradient id="zigzagGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="25%" stopColor="#8b5cf6" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="75%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>

                </defs>
              </svg>
            </motion.div>

            {/* Experience Cards */}
            <div className="relative">
              {/* Inoutbox Experience - Left Side (Past) */}
              <motion.div 
                className="relative mb-16 flex justify-start"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Timeline Dot */}
                <motion.div 
                  className="absolute left-1/4 top-8 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full border-4 border-white dark:border-slate-800 shadow-lg"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  whileHover={{ scale: 1.3 }}
                />

                {/* Experience Card */}
                <motion.div 
                  className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 relative overflow-hidden group"
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {/* Gradient Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                                    {/* Company Logo Placeholder */}
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 relative z-10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-white font-bold text-lg">I</span>
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.h3 
                      className="text-xl font-bold text-slate-900 dark:text-white mb-2"
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
                      className="text-slate-600 dark:text-slate-400 text-sm mb-3"
                      whileHover={{ color: "#475569" }}
                    >
                      nov de 2023 - out de 2024 · 1 ano
                    </motion.p>
                    <motion.p 
                      className="text-slate-600 dark:text-slate-400 text-sm mb-3"
                      whileHover={{ color: "#475569" }}
                    >
                      Sorocaba, São Paulo, Brasil · Remota
                    </motion.p>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      Atuei no desenvolvimento de websites para uma empresa de jogos, focando na integração das 
                      funcionalidades de interação com o mapa do jogo utilizando React, React-Leaflet e ReactModal. 
                      Fui responsável pela personalização de estilos CSS, implementação de recaptcha para segurança 
                      e integração com o Google Analytics para monitoramento de tráfego.
                    </p>

                    {/* Skills Tags */}
                    <motion.div 
                      className="flex flex-wrap gap-2 mt-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      {["React", "JavaScript", "React-Leaflet", "ReactModal", "CSS", "Google Analytics", "Recaptcha"].map((skill, index) => (
                        <motion.span
                          key={index}
                          className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded-full"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          whileHover={{ scale: 1.1, backgroundColor: "#f3e8ff" }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>

                  {/* Decorative Elements */}
                  <motion.div
                    className="absolute top-4 right-4 text-purple-500 opacity-20"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  >
                    <FaPalette size={24} />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Ludare Experience - Right Side (Present) */}
              <motion.div 
                className="relative flex justify-end"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {/* Timeline Dot */}
                <motion.div 
                  className="absolute right-1/4 top-8 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-white dark:border-slate-800 shadow-lg"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  whileHover={{ scale: 1.3 }}
                />

                {/* Experience Card */}
                <motion.div 
                  className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 relative overflow-hidden group"
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {/* Gradient Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                                    {/* Company Logo Placeholder */}
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 relative z-10"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-white font-bold text-lg">L</span>
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.h3 
                      className="text-xl font-bold text-slate-900 dark:text-white mb-2"
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
                      className="text-slate-600 dark:text-slate-400 text-sm mb-3"
                      whileHover={{ color: "#475569" }}
                    >
                      out de 2024 - o momento · 11 meses
                    </motion.p>
                    <motion.p 
                      className="text-slate-600 dark:text-slate-400 text-sm mb-3"
                      whileHover={{ color: "#475569" }}
                    >
                      Araçoiaba da Serra, São Paulo, Brasil · Presencial
                    </motion.p>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      Ludare é uma rede social desenvolvida com React Native, TypeScript, C# e .NET. 
                      Responsável pelo ciclo completo de desenvolvimento, incluindo implementação de funcionalidades, 
                      otimização de performance e integração de sistemas. Atuo na modelagem de dados, manutenção de APIs 
                      e correção de bugs, com foco em garantir a eficiência e segurança da aplicação.
                    </p>

                    {/* Skills Tags */}
                    <motion.div 
                      className="flex flex-wrap gap-2 mt-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                    >
                      {["React Native", "TypeScript", "C#", ".NET", "SQL Server", "APIs", "Performance"].map((skill, index) => (
                        <motion.span
                          key={index}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          whileHover={{ scale: 1.1, backgroundColor: "#dbeafe" }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>

                  {/* Decorative Elements */}
                  <motion.div
                    className="absolute top-4 right-4 text-blue-500 opacity-20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <FaCode size={24} />
                  </motion.div>
                                  </motion.div>
                </motion.div>
              </div>

              {/* Future Section - Em Breve */}
              <motion.div 
                className="relative flex justify-start mt-16"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {/* Timeline Dot */}
                <motion.div 
                  className="absolute left-1/4 top-8 w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full border-4 border-white dark:border-slate-800 shadow-lg"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  whileHover={{ scale: 1.3 }}
                />

                {/* Future Card */}
                <motion.div 
                  className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 relative overflow-hidden group border-2 border-green-200 dark:border-green-800"
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {/* Gradient Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Future Icon */}
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 relative z-10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-white font-bold text-lg">🚀</span>
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.h3 
                      className="text-xl font-bold text-slate-900 dark:text-white mb-2"
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
                      className="text-slate-600 dark:text-slate-400 text-sm mb-3"
                      whileHover={{ color: "#475569" }}
                    >
                      Sempre em evolução
                    </motion.p>
                    <motion.p 
                      className="text-slate-600 dark:text-slate-400 text-sm mb-3"
                      whileHover={{ color: "#475569" }}
                    >
                      Buscando novas oportunidades
                    </motion.p>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      Continuo aprimorando minhas habilidades e explorando novas tecnologias. 
                      Sempre aberto a novos desafios e oportunidades de crescimento profissional.
                    </p>

                    {/* Skills Tags */}
                    <motion.div 
                      className="flex flex-wrap gap-2 mt-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 }}
                    >
                      {["Aprendizado Contínuo", "Novas Tecnologias", "Desafios", "Crescimento"].map((skill, index) => (
                        <motion.span
                          key={index}
                          className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                          whileHover={{ scale: 1.1, backgroundColor: "#dcfce7" }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>

                  {/* Decorative Elements */}
                  <motion.div
                    className="absolute top-4 right-4 text-green-500 opacity-20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  >
                    <span className="text-2xl">🌟</span>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Floating Elements */}
            {isClient && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {[
                  { left: 10, top: 20, icon: FaCode, color: "text-blue-500" },
                  { left: 90, top: 40, icon: FaMobile, color: "text-purple-500" },
                  { left: 20, top: 70, icon: FaDatabase, color: "text-green-500" },
                  { left: 80, top: 80, icon: FaServer, color: "text-pink-500" }
                ].map((element, index) => (
                  <motion.div
                    key={index}
                    className={`absolute ${element.color} opacity-20`}
                    style={{ left: `${element.left}%`, top: `${element.top}%` }}
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 4,
                      delay: index * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <element.icon size={20} />
                  </motion.div>
                ))}
              </motion.div>
            )}
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
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
              className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
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
    </div>
  );
}
