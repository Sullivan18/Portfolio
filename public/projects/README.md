# Imagens dos Projetos

Este diretório contém as imagens dos projetos do portfólio organizadas por projeto.

## 📁 Estrutura de Diretórios

```
public/projects/
├── ludare/                    # Ludare - Rede Social
│   └── ludare-mockup.jpg
├── modern-clinic/             # Modern Clinic Website
│   └── modern-clinic.jpg
├── sentiment-analysis/        # Análise de Sentimentos - Twitter
│   └── sentiment-analysis.jpg
├── qtemaster/                # Quick Time Event Master
│   └── qtemaster.jpg
└── dog-detection/            # Detecção de Sarna em Cachorros - IA
    └── dog-detection.jpg
```

## 📋 Projetos e Imagens

### 1. **Ludare - Rede Social**
- **Diretório**: `/projects/ludare/`
- **Imagem**: `ludare-mockup.jpg`
- **Descrição**: Screenshot ou mockup do aplicativo Ludare
- **Dimensões recomendadas**: 800x600px ou 1200x800px
- **Formato**: JPG, PNG ou WebP

### 2. **Modern Clinic Website**
- **Diretório**: `/projects/modern-clinic/`
- **Imagem**: `modern-clinic.jpg`
- **Descrição**: Screenshot do site da clínica
- **Dimensões recomendadas**: 800x600px ou 1200x800px
- **Formato**: JPG, PNG ou WebP

### 3. **Análise de Sentimentos - Twitter**
- **Diretório**: `/projects/sentiment-analysis/`
- **Imagem**: `sentiment-analysis.jpg`
- **Descrição**: Screenshot do dashboard de análise
- **Dimensões recomendadas**: 800x600px ou 1200x800px
- **Formato**: JPG, PNG ou WebP

### 4. **Quick Time Event Master**
- **Diretório**: `/projects/qtemaster/`
- **Imagem**: `qtemaster.jpg`
- **Descrição**: Screenshot do website de jogos
- **Dimensões recomendadas**: 800x600px ou 1200x800px
- **Formato**: JPG, PNG ou WebP

### 5. **Detecção de Sarna em Cachorros - IA**
- **Diretório**: `/projects/dog-detection/`
- **Imagem**: `dog-detection.jpg`
- **Descrição**: Screenshot da interface de detecção
- **Dimensões recomendadas**: 800x600px ou 1200x800px
- **Formato**: JPG, PNG ou WebP

## 🚀 Como Adicionar Imagens

1. **Crie o diretório do projeto** (se não existir):
   ```bash
   mkdir -p public/projects/nome-do-projeto
   ```

2. **Adicione a imagem** no diretório correspondente:
   ```bash
   # Exemplo para Ludare
   cp sua-imagem.jpg public/projects/ludare/ludare-mockup.jpg
   ```

3. **Mantenha a nomenclatura** consistente:
   - `nome-do-projeto.jpg` para cada projeto
   - Use nomes descritivos e consistentes

4. **Otimize as imagens** para web:
   - Comprima para menos de 1MB
   - Use WebP quando possível
   - Mantenha as dimensões recomendadas

## 🎯 Otimização Automática

O Next.js Image component oferece:

### ✅ **Benefícios Automáticos**
- **Otimização**: Compressão automática
- **Lazy Loading**: Carregamento sob demanda
- **Responsividade**: Diferentes tamanhos para diferentes dispositivos
- **WebP**: Conversão automática quando suportado
- **Cache**: Cache inteligente para melhor performance

### 📱 **Responsividade**
```jsx
<Image
  src="/projects/ludare/ludare-mockup.jpg"
  alt="Screenshot do projeto Ludare"
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={true}
/>
```

## 📊 Especificações Técnicas

### **Dimensões Recomendadas**
- **Desktop**: 1200x800px
- **Tablet**: 800x600px
- **Mobile**: 600x400px

### **Formatos Suportados**
- **JPG**: Para fotos e screenshots
- **PNG**: Para imagens com transparência
- **WebP**: Para melhor compressão (recomendado)

### **Tamanho de Arquivo**
- **Máximo**: 1MB por imagem
- **Recomendado**: 200-500KB
- **Otimização**: Use ferramentas como TinyPNG ou Squoosh

## 🔧 Configuração no Código

As imagens são referenciadas no arquivo `src/app/page.tsx`:

```javascript
const projects = [
  {
    title: "Ludare - Rede Social",
    image: "/projects/ludare/ludare-mockup.jpg",
    // ... outras propriedades
  }
];
```

## 📝 Notas Importantes

- **Alt Text**: Sempre inclua descrições acessíveis
- **Responsividade**: As imagens se adaptam automaticamente
- **Performance**: Lazy loading para melhor performance
- **SEO**: Imagens otimizadas melhoram o SEO
- **Acessibilidade**: Alt text é essencial para leitores de tela

## 🎨 Efeitos Visuais

As imagens incluem:
- **Hover Effects**: Scale e overlay no hover
- **Gradient Overlay**: Overlay sutil para melhor legibilidade
- **Animações**: Transições suaves com Framer Motion
- **Responsividade**: Adaptação automática aos diferentes tamanhos de tela
