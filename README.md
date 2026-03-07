# myportfolio

Portfólio em Flutter Web (projeto na raiz do repositório).

## Pré-requisitos

- [Flutter SDK](https://docs.flutter.dev/get-started/install) instalado
- Se o Flutter não estiver no PATH, use o caminho completo ou adicione ao seu `~/.zshrc`:
  ```bash
  export PATH="$HOME/development/flutter/bin:$PATH"
  ```

## Como rodar

Na raiz do repositório:

```bash
flutter pub get
flutter run -d chrome
```

Se aparecer **tela branca**, tente forçar o renderer HTML:

```bash
flutter run -d chrome --web-renderer html
```

Para gerar build de produção:

```bash
flutter build web
```

Os arquivos estarão em `build/web/`.

> **Se aparecer** `Could not resolve DartDev snapshot or kernel`: pode ser instalação do Flutter. Tente abrir o projeto no VS Code com a extensão Flutter ou rodar os comandos em um terminal onde o Flutter já funcione.

## Estrutura

- `lib/main.dart` — ponto de entrada e app do portfólio
- `lib/data/` — dados (portfolio_data.dart, loaders)
- `lib/pages/` — páginas (portfólio, projetos, detalhe do projeto)
- `lib/widgets/` — seções e componentes (hero, about, stack, projetos, CTA, footer, nav)
- `lib/theme/` — tema (app_theme.dart)
- `web/index.html` — página HTML de entrada para a web
- `web/manifest.json` — manifest PWA
- `assets/` — JSON (portfolio.json, projects.json) e imagens; ver [assets/README.md](assets/README.md)

## Deploy (GitHub Pages)

O deploy é feito por **GitHub Actions** ao dar push na branch `main`. Em **Settings → Pages** use **Source: GitHub Actions**.

**URL do site:** https://camilafernandesdev.github.io/myportfolio/
