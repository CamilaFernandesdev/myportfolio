import 'package:flutter/material.dart';

import 'data/portfolio_data.dart';
import 'pages/project_detail_page.dart';
import 'pages/projects_page.dart';
import 'theme/app_theme.dart';
import 'widgets/antigravity_nav_bar.dart';
import 'widgets/hero_section.dart';
import 'widgets/about_section.dart';
import 'widgets/stack_section.dart';
import 'widgets/projects_section.dart';
import 'widgets/cta_section.dart';
import 'widgets/footer_section.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  try {
    await PortfolioData.load();
    runApp(const MyApp());
  } catch (e, st) {
    runApp(_ErrorApp(message: e.toString(), stack: st.toString()));
  }
}

/// Tela exibida se o carregamento do portfólio falhar (evita tela branca).
class _ErrorApp extends StatelessWidget {
  const _ErrorApp({required this.message, required this.stack});

  final String message;
  final String stack;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        backgroundColor: Colors.white,
        body: SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Erro ao carregar o portfólio',
                    style: TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF1A1A1A),
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    message,
                    style: const TextStyle(
                      fontSize: 14,
                      color: Color(0xFF5F5F67),
                      fontFamily: 'monospace',
                    ),
                  ),
                  if (stack.isNotEmpty) ...[
                    const SizedBox(height: 16),
                    const Text(
                      'Detalhes (desenvolvedor):',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                        color: Color(0xFF1A1A1A),
                      ),
                    ),
                    const SizedBox(height: 4),
                    SelectableText(
                      stack,
                      style: const TextStyle(
                        fontSize: 11,
                        color: Color(0xFF5F5F67),
                        fontFamily: 'monospace',
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Meu Portfolio',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light,
      initialRoute: '/',
      routes: {
        '/': (context) => const PortfolioPage(),
        '/projects': (context) => const ProjectsPage(),
        '/project': (context) => const ProjectDetailPage(),
      },
    );
  }
}

class PortfolioPage extends StatelessWidget {
  const PortfolioPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Stack(
        children: [
          SingleChildScrollView(
            child: Column(
              children: [
                _Section(key: sectionKeys['hero']!, child: const HeroSection()),
                _Section(key: sectionKeys['about']!, child: const AboutSection()),
                _Section(key: sectionKeys['stack']!, child: const StackSection()),
                _Section(key: sectionKeys['projects']!, child: const ProjectsSection()),
                _Section(key: sectionKeys['cta']!, child: const CtaSection()),
                _Section(key: sectionKeys['contact']!, child: const FooterSection()),
              ],
            ),
          ),
          Positioned(
            top: 0,
            left: 0,
            right: 0,
            child: Container(
              color: Colors.white,
              child: const AntigravityNavBar(),
            ),
          ),
        ],
      ),
    );
  }
}

class _Section extends StatelessWidget {
  const _Section({super.key, required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return child;
  }
}
