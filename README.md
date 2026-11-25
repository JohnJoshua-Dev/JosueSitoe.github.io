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

---

## Área de Candidaturas (`/vagas/`)

Ferramenta pessoal (não ligada ao menu público, `noindex`) para procurar vagas, adaptar o CV e não perder prazos.

| Peça | O que faz |
|------|-----------|
| `tools/fetch-jobs.mjs` | Recolhe vagas (emprego.co.mz — TI e Redes; Himalayas só vagas abertas a Moçambique; Remotive; Jobicy; Remote OK) e pontua-as contra o CV |
| `vagas/match.mjs` | Perfil de competências e cálculo do match — **edite aqui** para mudar a "minha área" |
| `.github/workflows/vagas.yml` | Corre às 07h e 17h (Maputo), publica `jobs.json` no branch `vagas-data` e abre uma *issue* (→ email) com vagas novas ≥ 60% e prazos a terminar |
| `vagas/index.html` | Lista de vagas com filtros, estado de cada candidatura, lembrete `.ics`, notificações do browser e vagas adicionadas à mão |
| `vagas/cv-tailor.mjs` | `cv/?vaga=<id>` destaca e coloca primeiro as competências pedidas, ajusta o subtítulo e o nome do PDF |

O estado das candidaturas fica no `localStorage` do browser — use **Exportar backup**.
Teste local: `node tools/fetch-jobs.mjs` e depois `python -m http.server` na raiz → `http://localhost:8000/vagas/`.

Vagas com o prazo terminado ficam visíveis (esbatidas, filtro **Prazo terminado**) durante 30 dias.
Em *Minhas candidaturas* cada vaga submetida mostra há quantos dias espera resposta; o portal lembra o follow-up aos 7, 14 e 30 dias e calcula a taxa de resposta.

#### App no telemóvel (PWA)

`/vagas/` é instalável (`vagas/manifest.webmanifest` + `vagas/sw.js`, âmbito só `/vagas/` — o portfólio não é afetado):
- **Android (Chrome)**: abrir `…/vagas/` → botão **Instalar app** (ou menu ⋮ → *Instalar app*). Depois, numa vaga do LinkedIn: **Partilhar → Vagas** abre o formulário *Adicionar vaga* já com o link.
- **iPhone (Safari)**: Partilhar → **Adicionar ao ecrã principal**. Notificações só funcionam com a app instalada (iOS 16.4+). A app instalada tem armazenamento próprio, separado do Safari — use *Exportar/Importar backup* para passar as candidaturas.
- Abre sem rede com as últimas vagas guardadas. Ao mudar ficheiros da app, não é preciso mexer no `sw.js` (rede primeiro, cache só offline).

#### Alertas por Telegram (bot próprio, API oficial e gratuita)

1. No Telegram, abrir **@BotFather** → `/newbot` → nome + username terminado em `bot` → copiar o **token**.
2. Abrir o bot novo e tocar em **Iniciar**.
3. **Candidatura submetida e follow-ups**: no portal, botão **Telegram** → colar o token → **Ligar**. O portal encontra o seu chat, envia uma mensagem de teste e mostra o **Chat ID**. (Fica só nesse browser; os lembretes de follow-up são enviados quando o portal é aberto.)
4. **Vagas com match 100%** (recolha diária): no GitHub, *Settings → Secrets and variables → Actions* → segredos `TELEGRAM_BOT_TOKEN` (o token) e `TELEGRAM_CHAT_ID` (o número mostrado no passo 3). Opcional: variável `TELEGRAM_MIN_SCORE` (padrão `100`), p. ex. `90`.

Cada mensagem traz botões **Adaptar CV** / **Abrir vaga** / **Minhas candidaturas**.

### Versões do CV (`cv/?perfil=`)

O CV está em coluna única, preto e branco, sem foto, ícones nem referências, para passar nos filtros ATS. Pode ser gerado em cinco versões: `geral` (por omissão), `fullstack`, `backend`, `frontend` e `dba`. Escolhe-se no seletor do topo ou pelo URL (ex.: `cv/?perfil=backend&lang=en`).
- Cada competência, bullet, projecto ou curso tem `data-cv="..."` com as versões onde aparece.
- Os textos ficam na tabela `I18N`, onde `chave__versao` substitui `chave` nessa versão.
- `cv/cv-Josué.pdf` e `cv/cv-Josué-EN.pdf` (botão "Baixar CV" do portfólio) são a versão Geral impressa a partir desta página. Regenere-os sempre que mudar o CV.
