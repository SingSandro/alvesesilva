# Alves & Silva — site institucional

Site estático de página única (landing page) para escritório de contabilidade.

## Stack

- HTML + CSS puro (~1944 linhas) + JavaScript vanilla (IIFE, sem módulos)
- **Sem build step, sem dependências, sem package.json**
- Fontes: Google Fonts (Manrope, Newsreader) via CDN
- Ícones: Font Awesome 6 via CDN
- Hospedagem: Vercel (canonical: `https://alvesesilva.vercel.app/`)

## Dev

- Abrir `index.html` no navegador — não precisa de servidor local
- CSS em `css/styles.css`, JS em `js/script.js`

## Estrutura

```
index.html          — landing page única (pt-BR)
css/styles.css      — todos os estilos
js/script.js        — menu mobile, scroll reveal, envio do formulário
img/                — SVGs (logo, favicon), WebP (fotos), PNG (OG image)
```

## Formulário de contato

- Usa [web3forms.com](https://web3forms.com) — o `access_key` está inline no HTML (`index.html:491`)
- Envio via `fetch` + `FormData` com validação e feedback no frontend

## Observações

- Nome da pasta com espaço: `site azul` — usar aspas em comandos
- Scroll reveal com `IntersectionObserver` (fallback para `prefers-reduced-motion`)
- Single page — navegação por âncoras (`#servicos`, `#metodo`, etc.)
