# Portfolio Flutter Web

Projeto Flutter configurado para **web**, parte do repositório myportfolio.

## Pré-requisitos

- [Flutter SDK](https://docs.flutter.dev/get-started/install) instalado
- Se o Flutter não estiver no PATH, use o caminho completo ou adicione ao seu `~/.zshrc`:
  ```bash
  export PATH="$HOME/development/flutter/bin:$PATH"
  ```

## Como rodar

```bash
cd flutter_web
flutter pub get
flutter run -d chrome
```

Para gerar build de produção:

```bash
flutter build web
```

Os arquivos estarão em `build/web/`.

> **Se aparecer** `Could not resolve DartDev snapshot or kernel`: pode ser instalação do Flutter. Tente abrir o projeto no VS Code com a extensão Flutter ou rodar os comandos em um terminal onde o Flutter já funcione.

## Estrutura

- `lib/main.dart` — ponto de entrada e app (contador de exemplo)
- `web/index.html` — página HTML de entrada para a web
- `web/manifest.json` — manifest PWA
