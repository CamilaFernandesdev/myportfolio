import 'package:flutter/material.dart';

import '../data/portfolio_data.dart';

class AntigravityNavBar extends StatelessWidget implements PreferredSizeWidget {
  const AntigravityNavBar({super.key});

  @override
  Size get preferredSize => const Size.fromHeight(64);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isWide = MediaQuery.sizeOf(context).width > 700;

    return AppBar(
      backgroundColor: Colors.white,
      title: Row(
        mainAxisSize: MainAxisSize.max,
        children: [
          Icon(Icons.code, color: theme.colorScheme.primary, size: 26),
          const SizedBox(width: 8),
          Flexible(
            child: Text(
              PortfolioData.instance.name,
              style: theme.textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.w600,
                color: const Color(0xFF1A1A1A),
              ),
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ],
      ),
      actions: [
        if (isWide) ...[
          _NavLink(label: 'Início', onTap: () => _scrollTo(context, 'hero')),
          _NavLink(label: 'Sobre', onTap: () => _scrollTo(context, 'about')),
          _NavLink(label: 'Stack', onTap: () => _scrollTo(context, 'stack')),
          _NavLink(
            label: 'Projetos',
            onTap: () => Navigator.of(context).pushNamed('/projects'),
          ),
          _NavLink(label: 'Contato', onTap: () => _scrollTo(context, 'cta')),
          const SizedBox(width: 16),
        ],
        Padding(
          padding: const EdgeInsets.only(right: 24),
          child: ElevatedButton(
            onPressed: () => _scrollTo(context, 'cta'),
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF1A1A1A),
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
            ),
            child: Text(PortfolioData.instance.navCtaLabel),
          ),
        ),
      ],
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

final Map<String, GlobalKey> _sectionKeys = {
  'hero': GlobalKey(),
  'about': GlobalKey(),
  'stack': GlobalKey(),
  'projects': GlobalKey(),
  'cta': GlobalKey(),
  'contact': GlobalKey(),
};

Map<String, GlobalKey> get sectionKeys => _sectionKeys;

class _NavLink extends StatefulWidget {
  final String label;
  final VoidCallback onTap;

  const _NavLink({required this.label, required this.onTap});

  @override
  State<_NavLink> createState() => _NavLinkState();
}

class _NavLinkState extends State<_NavLink> {
  bool _hover = false;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 12),
      child: MouseRegion(
        onEnter: (_) => setState(() => _hover = true),
        onExit: (_) => setState(() => _hover = false),
        cursor: SystemMouseCursors.click,
        child: GestureDetector(
          onTap: widget.onTap,
          child: AnimatedDefaultTextStyle(
            duration: const Duration(milliseconds: 150),
            style: theme.textTheme.bodyLarge!.copyWith(
              color: _hover ? theme.colorScheme.primary : const Color(0xFF1A1A1A),
              fontWeight: _hover ? FontWeight.w500 : FontWeight.normal,
            ),
            child: Text(widget.label),
          ),
        ),
      ),
    );
  }
}
