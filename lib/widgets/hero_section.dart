import 'package:flutter/material.dart';

import '../data/portfolio_data.dart';
import 'antigravity_nav_bar.dart';
import 'dots_background.dart';

/// Hero no estilo Antigravity: fundo com pontos, headline central, dois CTAs.
class HeroSection extends StatelessWidget {
  const HeroSection({super.key});

  static const _icons = [
    Icons.search,
    Icons.auto_awesome,
    Icons.check_circle_outline,
    Icons.dashboard_customize,
    Icons.add_box,
    Icons.code,
    Icons.developer_mode,
    Icons.folder_outlined,
    Icons.arrow_back,
    Icons.arrow_forward,
    Icons.account_tree,
    Icons.keyboard_command_key,
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isWide = MediaQuery.sizeOf(context).width > 700;

    return DotsBackground(
      density: 0.5,
      child: Padding(
        padding: EdgeInsets.symmetric(
          horizontal: isWide ? 48 : 24,
          vertical: 48,
        ),
        child: Column(
          children: [
            const SizedBox(height: 24),
            // Barra de ícones (estilo Antigravity)
            Wrap(
              spacing: 8,
              runSpacing: 8,
              alignment: WrapAlignment.center,
              children: _icons
                  .map((icon) => _IconCircle(
                        icon: icon,
                        color: const Color(0xFF1A1A1A),
                      ))
                  .toList(),
            ),
            const SizedBox(height: 56),
            // Label pequeno
            Text(
              PortfolioData.instance.tagline,
              style: theme.textTheme.labelLarge?.copyWith(
                color: theme.colorScheme.onSurfaceVariant,
              ),
            ),
            const SizedBox(height: 16),
            // Headline
            Text(
              PortfolioData.instance.heroHeadline,
              style: theme.textTheme.displayMedium?.copyWith(
                color: const Color(0xFF1A1A1A),
                fontSize: isWide ? 42 : 32,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 16),
            Text(
              PortfolioData.instance.heroSubhead,
              style: theme.textTheme.bodyLarge?.copyWith(
                color: theme.colorScheme.onSurfaceVariant,
                fontSize: 18,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 32),
            // Dois botões (estilo Antigravity: preto + outlined)
            Wrap(
              spacing: 16,
              runSpacing: 12,
              alignment: WrapAlignment.center,
              children: [
                ElevatedButton.icon(
                  onPressed: () => _scrollTo(context, 'projects'),
                  icon: const Icon(Icons.work_outline, size: 20),
                  label: Text(PortfolioData.instance.ctaPrimary),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF1A1A1A),
                    foregroundColor: Colors.white,
                  ),
                ),
                OutlinedButton.icon(
                  onPressed: () => _scrollTo(context, 'cta'),
                  icon: const Icon(Icons.mail_outline, size: 20),
                  label: Text(PortfolioData.instance.ctaSecondary),
                  style: OutlinedButton.styleFrom(
                    foregroundColor: const Color(0xFF1A1A1A),
                    side: const BorderSide(color: Color(0xFF1A1A1A)),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 80),
          ],
        ),
      ),
    );
  }

  void _scrollTo(BuildContext context, String id) {
    final key = sectionKeys[id];
    if (key?.currentContext != null) {
      Scrollable.ensureVisible(
        key!.currentContext!,
        duration: const Duration(milliseconds: 500),
        curve: Curves.easeInOut,
      );
    }
  }
}

class _IconCircle extends StatefulWidget {
  final IconData icon;
  final Color color;

  const _IconCircle({required this.icon, required this.color});

  @override
  State<_IconCircle> createState() => _IconCircleState();
}

class _IconCircleState extends State<_IconCircle> {
  bool _hover = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _hover = true),
      onExit: (_) => setState(() => _hover = false),
      child: Container(
        width: 44,
        height: 44,
        decoration: BoxDecoration(
          color: _hover ? const Color(0xFFF0F0F4) : const Color(0xFFF5F5F7),
          shape: BoxShape.circle,
          border: Border.all(color: const Color(0xFFE0E0E5)),
        ),
        child: Icon(widget.icon, color: widget.color, size: 22),
      ),
    );
  }
}
