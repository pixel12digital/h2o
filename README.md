# Header Padrão - H2O Poços Artesianos

Este projeto contém um header padrão reutilizável para todas as páginas do site H2O Poços Artesianos.

## Estrutura de Arquivos

```
h2o/
├── assets/
│   ├── css/
│   │   └── style.css          # Estilos do header, hero e layout geral
│   ├── js/
│   │   └── header.js          # Funcionalidades JavaScript do header e hero
│   ├── components/
│   │   └── header.html        # Componente HTML do header
│   ├── logo.png               # Logo da empresa
│   └── hero.jpg               # Imagem de fundo da seção hero
├── index.html                 # Página inicial com hero (exemplo)
├── sobre.html                 # Página sobre nós com hero (exemplo)
└── README.md                  # Este arquivo
```

## Como Usar

### 1. Incluir o CSS
Adicione o link para o CSS no `<head>` de todas as páginas:
```html
<link rel="stylesheet" href="assets/css/style.css">
```

### 2. Incluir o JavaScript
Adicione o script antes do fechamento do `</body>`:
```html
<script src="assets/js/header.js"></script>
```

### 3. Estrutura HTML do Header + Hero
Copie e cole o seguinte código no início do `<body>` de cada página:

```html
<header class="header">
    <div class="container">
        <div class="logo">
            <img src="assets/logo.png" alt="H2O Poços Artesianos" class="logo-img">
        </div>
        <nav class="navigation">
            <ul class="nav-list">
                <li class="nav-item">
                    <a href="index.html" class="nav-link" data-page="inicio">Início</a>
                </li>
                <li class="nav-item">
                    <a href="sobre.html" class="nav-link" data-page="sobre">Sobre nós</a>
                </li>
                <li class="nav-item">
                    <a href="servicos.html" class="nav-link" data-page="servicos">Serviços</a>
                </li>
                <li class="nav-item">
                    <a href="projetos.html" class="nav-link" data-page="projetos">Projetos</a>
                </li>
                <li class="nav-item">
                    <a href="contato.html" class="nav-link" data-page="contato">Contato</a>
                </li>
            </ul>
        </nav>
    </div>
</header>

<!-- Hero Section -->
<section class="hero" id="hero">
    <div class="hero-background">
        <img src="assets/hero.jpg" alt="Perfuração de Poços Artesianos" class="hero-image">
        <div class="hero-overlay"></div>
    </div>
    <div class="hero-content">
        <div class="container">
            <h1 class="hero-title">
                <span class="hero-title-main">Perfuração de Poços</span>
                <span class="hero-title-sub">Artesianos Sustentáveis</span>
            </h1>
            <p class="hero-description">
                Solicite Seu Orçamento Gratuito e Sem Compromisso! Atendemos Toda a Grande Florianópolis e Serra Catarinense com Serviços de Excelência.
            </p>
            <div class="hero-buttons">
                <a href="https://wa.me/5548991111950?text=Ol%C3%A1,%20vim%20atrav%C3%A9s%20do%20site.%20Gostaria%20de%20fazer%20um%20or%C3%A7amento!" 
                   class="btn btn-primary" 
                   target="_blank" 
                   rel="noopener noreferrer">
                    Contato
                </a>
                <a href="#sobre" class="btn btn-secondary">Saiba mais</a>
            </div>
        </div>
    </div>
</section>
```

### 4. Definir Página Ativa
Para cada página, adicione a classe `active` ao link correspondente:
- Página inicial: `class="nav-link active"` no link "Início"
- Página sobre: `class="nav-link active"` no link "Sobre nós"
- E assim por diante...

### 5. Configurar Seção de Destino
Para que o botão "Saiba mais" funcione corretamente, adicione uma seção com `id="sobre"` na sua página:
```html
<section class="diferenciais-section" id="sobre">
    <div class="container">
        <h2 class="section-title">Perfuração de Poços Artesianos e Semi Artesianos: Nossos Diferenciais</h2>
        <p class="section-intro">Desde 2022, a H2O Poços Artesianos e Semi Artesianos oferece serviços de perfuração e manutenção de poços artesianos e semiartesianos.</p>
        
        <!-- Vídeo Section -->
        <div class="video-container">
            <div class="video-wrapper">
                <iframe 
                    width="784" 
                    height="449" 
                    src="https://www.youtube.com/embed/IRS8h5ksIRk?list=TLGGTt04egAIDToyMzEwMjAyNQ" 
                    title="H2O Poços Artesianos" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin" 
                    allowfullscreen>
                </iframe>
            </div>
        </div>
        
        <!-- Seção de Soluções -->
        <div class="solucoes-section">
            <h3 class="solucoes-title">Soluções em Perfuração e Manutenção de Poços</h3>
            <p class="solucoes-description">
                Oferecemos serviços especializados em perfuração de poços artesianos e semiartesianos, ideais para condomínios, empresas e propriedades rurais. Trabalhamos com tecnologia avançada para terrenos difíceis, incluindo furação de pedras, e garantimos 1 ano de garantia em nossos serviços. Também realizamos limpeza, recuperação e manutenção de poços, sempre com confiança e segurança, atendendo às mais altas expectativas de qualidade.
            </p>
            
            <!-- Botão CTA -->
            <div class="cta-container">
                <a href="https://wa.me/5548991111950?text=Ol%C3%A1,%20vim%20atrav%C3%A9s%20do%20site.%20Gostaria%20de%20fazer%20um%20or%C3%A7amento!" 
                   class="btn btn-cta" 
                   target="_blank" 
                   rel="noopener noreferrer">
                    Solicite Orçamento Agora!
                </a>
            </div>
        </div>
    </div>
</section>
```

## Funcionalidades

### JavaScript Automático
O arquivo `header.js` inclui as seguintes funcionalidades:

1. **Detecção automática da página ativa** - Baseada na URL atual
2. **Efeitos de hover suaves** - Animações nos links de navegação
3. **Menu mobile responsivo** - Botão hambúrguer para dispositivos móveis
4. **Scroll suave** - Para links âncora e botão "Saiba mais"
5. **Header inteligente** - Esconde/mostra baseado na direção do scroll
6. **Integração WhatsApp** - Botão "Contato" abre conversa direta

### Responsividade
- **Desktop**: Navegação horizontal completa
- **Tablet**: Layout adaptado com menu mobile
- **Mobile**: Menu hambúrguer com navegação vertical

### Acessibilidade
- Suporte a navegação por teclado
- Atributos ARIA apropriados
- Estados de foco visíveis
- Contraste adequado

## Personalização

### Cores
As cores podem ser alteradas no arquivo `assets/css/style.css`:
- Cor principal dos links: `#333`
- Cor de hover: `#666`
- Cor de destaque: `#007bff`

### Logo
Substitua o arquivo `assets/logo.png` mantendo o mesmo nome e formato.

### Links de Navegação
Modifique os links no HTML do header conforme necessário, mantendo os atributos `data-page` para o JavaScript funcionar corretamente.

## Compatibilidade

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Dispositivos móveis (iOS/Android)

## Suporte

Para dúvidas ou problemas, verifique:
1. Se todos os arquivos CSS e JS estão sendo carregados
2. Se os caminhos dos arquivos estão corretos
3. Se o JavaScript está habilitado no navegador
4. Se não há erros no console do navegador
