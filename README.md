# Portfólio - André Luiz

Um portfólio moderno e responsivo criado com Next.js, TypeScript e Tailwind CSS, apresentando os projetos e habilidades do André Luiz com animações interativas.

## 🚀 Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Biblioteca de animações
- **React Icons** - Biblioteca de ícones
- **Geist Font** - Fonte moderna do Vercel

## ✨ Características

- 🎨 Design moderno e responsivo
- 🌙 Suporte a modo escuro
- 📱 Totalmente responsivo para mobile
- ⚡ Performance otimizada
- 🎯 SEO otimizado
- 🔗 Navegação suave entre seções
- 🎭 Animações interativas com Framer Motion
- 🎪 Efeitos de hover e transições suaves
- 🖼️ Imagens otimizadas com Next.js Image

## 🎭 Animações Implementadas

### **Entrada de Elementos**
- **Navbar**: Desliza de cima para baixo
- **Hero Section**: Elementos aparecem com stagger (sequencial)
- **Seções**: Títulos e conteúdo aparecem com fade-in
- **Cards**: Projetos e habilidades aparecem com scale e fade

### **Interações**
- **Hover Effects**: Botões e cards aumentam de tamanho
- **Tap Effects**: Elementos diminuem ao clicar
- **Scroll Animations**: Elementos aparecem conforme o scroll
- **Stagger Animations**: Elementos aparecem em sequência

### **Transições Suaves**
- **Navegação**: Links com hover e tap effects
- **Cards**: Projetos com hover e scale
- **Ícones**: Redes sociais com hover e scale
- **Botões**: Call-to-action com hover effects

## 👨‍💻 Sobre André Luiz

Desenvolvedor Full Stack especializado em:
- **Frontend**: React, React Native, TypeScript, JavaScript
- **Backend**: C#, .NET Framework, Node.js, Express.js, Python
- **Banco de Dados**: SQL Server, MongoDB, MySQL
- **IA & ML**: TensorFlow, Keras, Transformers, CNN, Selenium

## 📋 Projetos Destacados

### 1. **Ludare - Rede Social**
- Aplicativo de rede social com React Native e TypeScript
- Backend em C# e .NET com SQL Server
- Responsável por implementação de funcionalidades e otimização de performance

### 2. **Modern Clinic Website**
- Site responsivo para clínica com React e Framer Motion
- Integração com Google Maps e formulários de captura de leads
- Suporte ao modo escuro

### 3. **Análise de Sentimentos - Twitter**
- Sistema de análise de sentimentos usando Transformers e TensorFlow
- Coleta de dados via Selenium e dashboard para profissionais de saúde
- Trabalho de conclusão de curso

### 4. **Quick Time Event Master**
- Desenvolvimento de websites para empresa de jogos
- Integração de mapas interativos com React-Leaflet
- Implementação de recaptcha e Google Analytics

### 5. **Detecção de Sarna em Cachorros - IA**
- Sistema de detecção usando CNN com TensorFlow/Keras
- Frontend React com API Express.js
- Processamento de imagens para classificação

## 📋 Seções do Portfólio

1. **Hero Section** - Apresentação inicial com animações de entrada
2. **Sobre Mim** - Informações pessoais e habilidades técnicas com animações de scroll
3. **Projetos** - Galeria de projetos com animações de hover e entrada
4. **Contato** - Links para redes sociais e email com animações interativas

## 🛠️ Como Executar

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd meu-portifolio
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📦 Scripts Disponíveis

- `npm run dev` - Executa o servidor de desenvolvimento
- `npm run build` - Cria a versão de produção
- `npm run start` - Executa a versão de produção
- `npm run lint` - Executa o linter

## 🎨 Personalização

### Animações
As animações podem ser personalizadas editando as variantes no arquivo `src/app/page.tsx`:
- `containerVariants` - Animações de container
- `itemVariants` - Animações de itens individuais
- `cardVariants` - Animações de cards
- `skillCardVariants` - Animações de cards de habilidades

### Cores e Estilo
O projeto utiliza Tailwind CSS, então você pode facilmente personalizar as cores editando as classes no arquivo `src/app/page.tsx`.

### Conteúdo
Edite o arquivo `src/app/page.tsx` para personalizar:
- Nome e informações pessoais
- Projetos e tecnologias
- Links de redes sociais
- Textos e descrições

### Metadados
Atualize os metadados no arquivo `src/app/layout.tsx` para SEO.

## 🖼️ Adicionando Imagens dos Projetos

### Estrutura de Arquivos
Adicione as imagens dos projetos no diretório `/public/projects/`:

```
public/
└── projects/
    ├── ludare-mockup.jpg      # Ludare - Rede Social
    ├── modern-clinic.jpg      # Modern Clinic Website
    ├── sentiment-analysis.jpg # Análise de Sentimentos
    ├── qtemaster.jpg         # Quick Time Event Master
    └── dog-detection.jpg     # Detecção de Sarna - IA
```

### Especificações das Imagens
- **Dimensões**: 800x600px ou 1200x800px
- **Formato**: JPG, PNG ou WebP (recomendado)
- **Tamanho**: Menor que 1MB para melhor performance
- **Qualidade**: Otimizadas para web

### Otimização Automática
O Next.js Image component oferece:
- ✅ Otimização automática
- ✅ Lazy loading
- ✅ Responsividade
- ✅ Diferentes tamanhos para diferentes dispositivos
- ✅ WebP automático quando suportado

## 📱 Responsividade

O portfólio é totalmente responsivo e funciona perfeitamente em:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (até 767px)

## 🌐 Deploy

O projeto pode ser facilmente deployado em:
- **Vercel** (recomendado)
- **Netlify**
- **GitHub Pages**
- Qualquer servidor que suporte Node.js

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar e modificar conforme necessário.

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Sinta-se livre para abrir issues ou pull requests.

---

**Desenvolvido com ❤️ usando Next.js e Framer Motion**
