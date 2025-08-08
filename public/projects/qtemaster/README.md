# Projeto Quick Time Event Master

## 📸 Imagens do Projeto

Este projeto possui um **carrossel de imagens** que exibe múltiplas capturas de tela em loop infinito.

### 🖼️ Imagens Disponíveis:

1. **`qtemaster_1.avif`** - Screenshot principal do website (176KB)
2. **`qtemaster_2.webp`** - Captura de tela adicional (120KB)
3. **`qtemaster_3.jpg`** - Captura de tela adicional (7.7MB)

### ⚙️ Configuração do Carrossel:

- **Loop Infinito**: As imagens trocam automaticamente a cada 3 segundos
- **Animações Suaves**: Transições com Framer Motion
- **Indicadores Visuais**: Pontos na parte inferior mostram a imagem atual
- **Responsividade**: Adaptação automática para diferentes tamanhos de tela

### 🎯 Como Funciona:

1. **Autoplay**: O carrossel inicia automaticamente quando o projeto é exibido
2. **Transições**: Cada imagem tem uma transição suave de fade + scale
3. **Indicadores**: Pontos brancos mostram qual imagem está sendo exibida
4. **Loop**: Após a última imagem, volta para a primeira automaticamente

### 📱 Uso no Código:

```typescript
// No array de projetos
{
  title: "Quick Time Event Master",
  images: [
    "/projects/qtemaster/qtemaster_1.avif",
    "/projects/qtemaster/qtemaster_2.webp",
    "/projects/qtemaster/qtemaster_3.jpg"
  ],
  github: null, // Código privado - projeto comercial
  live: "https://qtem.inoutbox.games/",
  // ... outras propriedades
}
```

### 🔗 Links do Projeto:

- **🌐 Site Live**: [https://qtem.inoutbox.games/](https://qtem.inoutbox.games/)
- **🔒 Código**: Privado (projeto comercial)

### 🎨 Benefícios:

- ✅ **Múltiplas Visualizações**: Mostra diferentes aspectos do projeto
- ✅ **Engajamento**: Mantém o usuário interessado com movimento
- ✅ **Profissionalismo**: Demonstra atenção aos detalhes
- ✅ **Performance**: Otimização automática com `next/image`

### 🔧 Tecnologias Utilizadas:

- **React**: Framework frontend
- **JavaScript**: Linguagem de programação
- **MongoDB**: Banco de dados NoSQL
- **React-Leaflet**: Integração de mapas interativos

### 📊 Especificações das Imagens:

- **Formatos**: AVIF, WebP e JPG para máxima compatibilidade
- **Otimização**: Processadas com `next/image`
- **Responsividade**: Adaptação automática
- **Carregamento**: Prioridade para melhor performance

### 🎨 Efeitos Visuais:

A imagem será exibida com:
- **Layout Responsivo**: 
  - Mobile: 1 coluna
  - Tablet: 2 colunas  
  - Desktop: 3 colunas
  - XL: 5 colunas (todos os projetos em uma linha)
- **Container Otimizado**: Altura responsiva para imagens horizontais
  - Mobile: 224px (h-56)
  - Tablet: 256px (md:h-64)
  - Desktop: 288px (lg:h-72)
  - XL: 320px (xl:h-80)
- **Padding Responsivo**: 
  - Mobile: p-2
  - Tablet+: p-3
- **Hover Effect**: Scale 1.05 no hover
- **Gradient Overlay**: Overlay sutil para melhor legibilidade
- **Animações**: Transições suaves com Framer Motion
- **Responsividade**: Adaptação automática aos diferentes tamanhos de tela

### 🔧 Configuração no Código:

A imagem é referenciada em `src/app/page.tsx`:

```javascript
// Configurações específicas para imagens horizontais:
- Altura do Container: 320px (xl:h-80)
- Padding: Normal (p-2/p-3) para aproveitar o espaço
- Object-fit: object-contain para manter proporções
```

### ✅ Benefícios do Next.js Image:

- **Otimização automática**
- **Lazy loading**
- **Responsividade**
- **WebP automático quando suportado**
- **Cache inteligente**
- **Adaptação automática para imagens horizontais**

### 🔒 Sobre o Código Privado:

Este é um **projeto comercial** desenvolvido para uma empresa de jogos. O código fonte é confidencial e não está disponível publicamente, mas o site está em produção e pode ser visitado através do link acima.

---

*O carrossel oferece uma experiência visual rica e profissional para apresentar o projeto Quick Time Event Master de forma dinâmica e atrativa.*
