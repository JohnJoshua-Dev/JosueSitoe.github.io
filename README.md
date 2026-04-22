# Josué Sitoe — Portfólio Pessoal

Site de portfólio pessoal de **Josué Rafael Sitoe**, Desenvolvedor Fullstack baseado em Maputo, Moçambique.

🌐 **URL ao Vivo:** [johnjoshua-dev.github.io/JosueSitoe.github.io](https://johnjoshua-dev.github.io/JosueSitoe.github.io/)

---

## Visão Geral

Portfólio single-page moderno com design dark, efeito de partículas animadas e secções interactivas. Apresenta projectos, habilidades técnicas, contacto e um subprojecto de casamento hospedado na mesma raiz.

---

## Tecnologias Utilizadas

| Tecnologia | Uso |
|-----------|-----|
| HTML5 | Estrutura da página |
| CSS3 + Tailwind CSS (CDN) | Estilo e layout responsivo |
| JavaScript (Vanilla) | Animações, interactividade, partículas |
| Google Fonts | Orbitron (headings) + Inter (body) |
| Font Awesome 6 | Ícones |
| GitHub Pages | Hospedagem gratuita |

---

## Estrutura de Ficheiros

```
JosueSitoe.github.io/
│
├── index.html          # Página principal do portfólio
├── styles.css          # Estilos personalizados (complementa Tailwind)
├── script.js           # Lógica JavaScript
│
├── img/
│   ├── Fotojs com fundo Azul.png   # Foto de perfil
│   └── fundo.jpg                   # Imagem de fundo
│
├── myweeding/          # Subprojecto — Site de Casamento
│   └── index.html
│
├── public/             # Assets Next.js (não usados na versão estática)
├── app/                # Código Next.js (desenvolvimento futuro)
├── components/         # Componentes React (desenvolvimento futuro)
└── ...                 # Ficheiros de configuração Next.js
```

---

## Secções do Portfólio

### 1. Hero (`#inicio`)
- Foto com animação blob dourada
- Badges de disponibilidade e localização
- Efeito de digitação automática (React, Laravel, Node.js, Flutter…)
- Botões para GitHub, LinkedIn e UpWork
- Cards de estatísticas com contador animado (2+ Anos, 9+ Projectos, 3 Idiomas)

### 2. Sobre Mim (`#sobre`)
- Foto de perfil com anel giratório dourado/púrpura
- Descrição profissional
- Badges: Inovador, Criativo, Dedicado, Fullstack, Freelancer

### 3. Habilidades Técnicas (`#habilidades`)
- HTML5, CSS3, JavaScript, PHP, Laravel, React, Node.js, Flutter, Python, MySQL, SQL Server, Fullstack
- Cards com efeito hover (escala + glow dourado)

### 4. Projectos (`#projetos`)

| Projecto | Tecnologias | Estado |
|---------|-------------|--------|
| Central Académica | Python, OCR, Web | Em detalhe |
| Portal de Pedidos | Laravel, Flutter, Excel | Em detalhe |
| OuvirTexto | PHP, IA, TTS | Em detalhe |
| AppStockP4y | Flutter, Web, Mobile | Em detalhe |
| **MyWeeding** | HTML5, CSS3, JS, Canvas API, GitHub Pages | ✅ Ao Vivo |

### 5. Contacto (`#contacto`)
- Layout dois em dois: info cards + formulário
- Email: josuerafaelsitoe@gmail.com
- WhatsApp: +258 842 737 483
- Localização: Maputo, Moçambique

---

## Funcionalidades JavaScript

| Funcionalidade | Descrição |
|---------------|-----------|
| **Partículas** | 100 partículas animadas (dourado/púrpura) com conexões |
| **Typing Effect** | Rotação automática de tecnologias no hero |
| **Scroll Progress** | Barra de progresso dourada no topo da página |
| **Contador Animado** | Stats do hero contam de 0 ao valor real ao entrar no ecrã |
| **Nav Activo** | Link da navegação fica destacado conforme a secção visível |
| **Scroll Animations** | Secções aparecem com fade + slide ao fazer scroll |
| **Toast Notifications** | Feedback inline ao submeter o formulário (sem alertas do browser) |
| **Mobile Menu** | Menu hamburger para ecrãs pequenos |
| **Smooth Scroll** | Navegação suave com offset de 80px para a nav fixa |

---

## Como Executar Localmente

Não é necessário instalar nada — é HTML estático puro.

```bash
# Clonar o repositório
git clone https://github.com/JohnJoshua-Dev/JosueSitoe.github.io.git

# Abrir no browser
# Basta abrir o ficheiro index.html directamente no browser
# ou usar uma extensão como Live Server no VS Code
```

---

## Subprojectos

### MyWeeding
Site de casamento hospedado como subpasta deste repositório.
- **URL:** `/myweeding/`
- **Documentação:** [myweeding/README.md](myweeding/README.md)

---

## Hospedagem — GitHub Pages

O site é automaticamente publicado pelo GitHub Pages a partir do branch `main`.

Para actualizar o site basta fazer push para `main`:

```bash
git add .
git commit -m "Descrição da alteração"
git push origin main
```

As alterações ficam visíveis em 1–2 minutos.

---

## Contacto

- **Email:** josuerafaelsitoe@gmail.com
- **GitHub:** [JohnJoshua-Dev](https://github.com/JohnJoshua-Dev)
- **LinkedIn:** [josué-sitoe-programmer](https://www.linkedin.com/in/josué-sitoe-programmer)
- **UpWork:** [Perfil](https://www.upwork.com/freelancers/~016591da5a7b26dc12?viewMode=1)

---

*© 2025 Josué Rafael Sitoe — Maputo, Moçambique*
