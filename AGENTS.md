# Alves & Silva — site institucional

Site estático de página única (landing page) para escritório de contabilidade.

## Stack

- HTML + CSS puro (~1550 linhas) + JavaScript vanilla (IIFE, sem módulos)
- **Sem build step, sem dependências, sem package.json**
- Fontes: Google Fonts (DM Sans + Manrope) via CDN
- Ícones: texto/SVG inline (sem CDN de ícones)
- Hospedagem: Vercel (canonical: `https://alvesesilva.vercel.app/`)

## Dev

- Abrir `index.html` no navegador — não precisa de servidor local
- CSS em `css/styles.css`, JS em `js/script.js`

## Estrutura

```
index.html          — landing page única (pt-BR)
css/styles.css      — todos os estilos
js/script.js        — menu mobile, envio do formulário (web3forms), modais legais, ano automático
img/                — SVGs (logo, favicon), WebP (fotos), JPG (fundos), PNG (OG image)
```

## Formulário de contato

- Usa [web3forms.com](https://web3forms.com) — o `access_key` está inline no HTML (`index.html`)
- Envio via `fetch` + `FormData` com validação e feedback no frontend

## Observações

- Nome da pasta com espaço: `site azul` — usar aspas em comandos
- Header sticky claro; duas variantes do logo SVG (`-dark` para fundo claro, original para fundo escuro)
- Textos legais (Política de Privacidade e Termos de Serviço) em modais na própria página — sem páginas adicionais (links no rodapé e no formulário)
- Single page — navegação por âncoras (`#solucoes`, `#metodo`, etc.)
