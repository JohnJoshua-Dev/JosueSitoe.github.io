# MyWeeding — Site de Casamento de Jaime & Joana

Site de casamento elegante desenvolvido de raiz para o casamento de **Jaime Sitoe** e **Joana Mandlate**.

🌐 **URL ao Vivo:** [johnjoshua-dev.github.io/JosueSitoe.github.io/myweeding](https://johnjoshua-dev.github.io/JosueSitoe.github.io/myweeding/)

---

## Detalhes do Evento

| Campo | Detalhe |
|-------|---------|
| **Noivos** | Jaime & Joana |
| **Famílias** | Sitoe & Mandlate |
| **Data** | Sábado, 09 de Outubro de 2027 |
| **Hora** | 15h00 |
| **Local** | Kholhisa Eventos, Matola, Nr1000 — Moçambique |

---

## Tecnologias

| Tecnologia | Uso |
|-----------|-----|
| HTML5 | Estrutura da página |
| CSS3 | Estilo completo (sem framework) |
| JavaScript (Vanilla) | Toda a interactividade |
| Canvas API | Efeito bokeh dourado animado |
| localStorage | Persistência das reservas de presentes |
| Google Fonts | Dancing Script, Playfair Display, Montserrat, Cormorant Garamond |
| Google Maps Embed | Mapa do local do evento |
| GitHub Pages | Hospedagem |

---

## Funcionalidades

### Contagem Regressiva
- Actualizada em tempo real (dias, horas, minutos, segundos)
- Alvo: 09/10/2027 às 15h00
- Caixas com efeito glassmorphism dourado

### Lista de Presentes
- 12 presentes pré-definidos organizados em grelha
- Cada presente tem: ícone emoji, nome, descrição e preço estimado
- **Sistema de reserva por checkbox:**
  - Convidado clica no checkbox → modal pede o nome
  - Após confirmação: checkbox fica marcado e desabilitado
  - Card fica semi-transparente com badge "Fechado" e nome de quem reservou
  - Estado guardado em `localStorage` — persiste ao recarregar a página
- Botão para adicionar novos presentes à lista (nome, preço, descrição, emoji)

### Presentes Pré-definidos

| # | Presente | Preço Estimado |
|---|---------|----------------|
| 1 | Jogo de Jantar Completo | 8.500 MT |
| 2 | Jogo de Taças de Cristal | 6.200 MT |
| 3 | Sofá para Sala | 45.000 MT |
| 4 | Jogo de Cama King Size | 12.000 MT |
| 5 | Lua de Mel | Qualquer valor |
| 6 | Conjunto de Panelas Premium | 15.000 MT |
| 7 | Frigorífico Combinado | 65.000 MT |
| 8 | Máquina de Lavar Roupa | 38.000 MT |
| 9 | Lustre de Sala | 18.000 MT |
| 10 | Decoração de Interior | 5.000 MT |
| 11 | Kit de Toalhas de Banho | 7.500 MT |
| 12 | Adega / Bar em Casa | 22.000 MT |

### Mapa do Local
- Iframe do Google Maps centrado em Matola, Moçambique
- Botão "Obter Direções" com link directo ao Google Maps
- Filtro CSS (grayscale + sepia) para combinar com o tema escuro

---

## Design

### Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Dourado | `#c9a84c` | Accent principal, bordas, ícones |
| Dourado Claro | `#e8c97a` | Textos de destaque, glows |
| Dourado Escuro | `#8b6914` | Gradientes de botões |
| Creme | `#e8dcc8` | Texto principal |
| Fundo | `#090705` | Background geral |

### Efeitos Visuais
- **Bokeh animado:** 65 círculos dourados flutuantes em canvas (efeito champanhe)
- **Glassmorphism:** Cards com `backdrop-filter: blur` e bordas translúcidas
- **Diamante separador:** Divisor dourado entre secções
- **Tipografia mista:** Dancing Script (títulos cursivos) + Playfair Display (serif elegante) + Montserrat (sans-serif limpo)

### Inspiração
Design baseado no convite físico do casamento — fundo escuro com luzes bokeh douradas, tipografia elegante a preto e dourado, estética champanhe.

---

## Estrutura do Ficheiro

O site é um único ficheiro `index.html` com CSS e JavaScript embutidos.

```
myweeding/
└── index.html      # Página única completa (HTML + CSS + JS inline)
```

### Secções HTML

```
nav              → Navegação fixa com logo "J & J"
#hero            → Apresentação dos noivos + data + local
#contagem        → Contagem regressiva em tempo real
#presentes       → Lista de presentes com sistema de reserva
#local           → Informações do evento + mapa integrado
footer           → Rodapé com nomes e website
```

### Estrutura JavaScript

```javascript
// BOKEH        → Canvas com partículas flutuantes
// COUNTDOWN    → setInterval de 1s actualizando dias/horas/min/seg
// GIFTS        → CRUD de presentes via localStorage
//   getGifts() / saveGifts()   → persistência da lista
//   getRsvp()  / saveRsvp()    → persistência das reservas
//   renderGifts()              → renderização dinâmica dos cards
//   handleCheck()              → intercept do checkbox + abre modal
//   confirmReservation()       → valida nome e grava reserva
//   addGift()                  → adiciona novo presente à lista
//   showToast()                → notificação temporária
```

---

## localStorage — Chaves Usadas

| Chave | Conteúdo | Exemplo |
|-------|----------|---------|
| `wg_gifts` | Array de presentes personalizados | `[{id, icon, name, desc, price}]` |
| `wg_rsvp` | Objecto de reservas `{id: nome}` | `{"1": "Maria Silva", "5": "João"}` |

> **Nota:** O localStorage é por browser/dispositivo. Cada convidado vê o estado do seu próprio browser. Para um sistema centralizado (multi-utilizador em tempo real) seria necessário um backend ou base de dados como Supabase.

---

## Como Actualizar

### Alterar a data do casamento
Em `index.html`, linha do countdown:
```javascript
const target = new Date('2027-10-09T15:00:00');
```

### Alterar presentes pré-definidos
Em `index.html`, no array `DEFAULTS`:
```javascript
const DEFAULTS = [
  { id: 1, icon: '🍽️', name: 'Nome', desc: 'Descrição', price: '0 MT' },
  // ...
];
```

### Alterar local/data visível
Actualizar o texto na secção `#hero` e `#local` no HTML.

---

## Hospedagem

Hospedado como subpasta do repositório do portfólio no GitHub Pages.

```
Repositório: JohnJoshua-Dev/JosueSitoe.github.io
Pasta:       /myweeding/
URL:         https://johnjoshua-dev.github.io/JosueSitoe.github.io/myweeding/
```

Para actualizar:
```bash
# Na pasta portfolio-clone
cp /caminho/para/myweeding/index.html myweeding/index.html
git add myweeding/index.html
git commit -m "Update myweeding site"
git push origin main
```

---

*Desenvolvido com ❤️ por Josué Sitoe — Maputo, Moçambique*
