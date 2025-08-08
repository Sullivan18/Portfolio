# Projeto Ludare - Rede Social

## 📸 Imagens do Projeto

Este projeto possui um **carrossel de imagens** que exibe múltiplas capturas de tela em loop infinito.

### 🖼️ Imagens Disponíveis:

1. **`ludare_1.jpg`** - Screenshot principal do aplicativo
2. **`ludare_2.jpg`** - Captura de tela adicional 
3. **`ludare_3.jpg`** - Captura de tela adicional

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
  title: "Ludare - Rede Social",
  images: [
    "/projects/ludare/ludare_1.jpg",
    "/projects/ludare/ludare_2.jpg", 
    "/projects/ludare/ludare_3.jpg"
  ],
  github: null, // Código privado
  live: "https://ludare.com",
  // ... outras propriedades
}
```

### 🔗 Links do Projeto:

- **🌐 Site Live**: [https://ludare.com](https://ludare.com)
- **🔒 Código**: Privado (aplicativo comercial)

### 🎨 Benefícios:

- ✅ **Múltiplas Visualizações**: Mostra diferentes aspectos do projeto
- ✅ **Engajamento**: Mantém o usuário interessado com movimento
- ✅ **Profissionalismo**: Demonstra atenção aos detalhes
- ✅ **Performance**: Otimização automática com `next/image`

### 🔧 Tecnologias Utilizadas:

- **React Native**: Desenvolvimento mobile
- **TypeScript**: Tipagem estática
- **C#**: Backend robusto
- **.NET**: Framework de desenvolvimento
- **SQL Server**: Banco de dados relacional

### 📊 Especificações das Imagens:

- **Formato**: JPG para compatibilidade
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
- **Container Otimizado**: Altura responsiva para imagens verticais
  - Mobile: 256px (h-64)
  - Tablet: 288px (md:h-72)
  - Desktop: 320px (lg:h-80)
  - XL: 384px (xl:h-96)
- **Padding Responsivo**: 
  - Mobile: p-1
  - Tablet+: p-2
- **Hover Effect**: Scale 1.05 no hover
- **Gradient Overlay**: Overlay sutil para melhor legibilidade
- **Animações**: Transições suaves com Framer Motion
- **Responsividade**: Adaptação automática aos diferentes tamanhos de tela

### 🔧 Configuração no Código:

A imagem é referenciada em `src/app/page.tsx`:

```javascript
// Configurações específicas para imagens verticais:
- Altura do Container: 384px (xl:h-96)
- Padding: Reduzido (p-1/p-2) para aproveitar o espaço
- Object-fit: object-contain para manter proporções
```

### ✅ Benefícios do Next.js Image:

- **Otimização automática**
- **Lazy loading**
- **Responsividade**
- **WebP automático quando suportado**
- **Cache inteligente**
- **Adaptação automática para imagens verticais**

### 🔒 Sobre o Código Privado:

Este é um **aplicativo comercial** de rede social desenvolvido para uma empresa. O código fonte é confidencial e não está disponível publicamente, mas o aplicativo está em produção e pode ser acessado através do link acima.

---

*O carrossel oferece uma experiência visual rica e profissional para apresentar o projeto Ludare de forma dinâmica e atrativa.*
