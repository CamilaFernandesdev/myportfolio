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
  await PortfolioData.load();
  runApp(const MyApp());
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
