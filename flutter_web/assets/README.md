# Dados e imagens do portfólio

## JSON

- **portfolio.json** – textos gerais (nome, hero, sobre, stack, footer, labels dos filtros).
- **projects.json** – lista de projetos (`"projects": [ ... ]`). Em cada projeto, use o array **imageUrls** para o carrossel da página de detalhes.

## Imagens dos projetos

Cada projeto pode ter **pelo menos duas imagens** no carrossel. Organize por slug:

- **Pasta:** `assets/images/projects/<slug-do-projeto>/`
- **Exemplo:** Dashboard ONS (slug `dashboard-holoviz`) → `assets/images/projects/dashboard-holoviz/`

No `projects.json`, em **imageUrls**, use o caminho do asset:

```json
"imageUrls": [
  "assets/images/projects/dashboard-holoviz/01-principais-reservatorios.png",
  "assets/images/projects/dashboard-holoviz/02-geracao-usina-horaria.png"
]
```

Também é possível usar URLs externas (http/https) em **imageUrls**.

## Ícones (projectLinks e aboutItems)

Use o nome do ícone como string. Valores aceitos: `code`, `play_circle_filled`, `language`, `open_in_new`, `touch_app_outlined`, `architecture_outlined`, `trending_up_outlined`.
