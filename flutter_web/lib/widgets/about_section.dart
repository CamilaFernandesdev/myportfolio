import 'dart:math' as math;
import 'package:flutter/material.dart';

import '../data/portfolio_data.dart';

/// Breakpoints para responsividade (px lógicos).
class _Breakpoint {
  static const double sm = 480;
  static const double md = 700;
  static const double lg = 960;
}

/// Seção "Sobre mim": destaque (título + bloco) + abas + grid de valores.
class AboutSection extends StatefulWidget {
  const AboutSection({super.key});

  @override
  State<AboutSection> createState() => _AboutSectionState();
}

class _AboutSectionState extends State<AboutSection>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  int _selectedTab = 0;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 4),
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final width = MediaQuery.sizeOf(context).width;
    final isWide = width >= _Breakpoint.md;
    final isLg = width >= _Breakpoint.lg;
    final isCompact = width < _Breakpoint.sm;
    final items = PortfolioData.instance.aboutItems;

    final horizontalPadding = isCompact ? 16.0 : (isWide ? 48.0 : 24.0);
    final verticalPadding = isCompact ? 40.0 : (isLg ? 80.0 : 56.0);
    final featuredHeight = isCompact ? 200.0 : (isWide ? 320.0 : 260.0);

    return Container(
      color: Colors.white,
      padding: EdgeInsets.symmetric(
        horizontal: horizontalPadding,
        vertical: verticalPadding,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Bloco destacado: texto + área animada
          if (isWide)
            SizedBox(
              height: featuredHeight,
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Expanded(
                    flex: 1,
                    child: _FeaturedContent(theme: theme, compact: isCompact),
                  ),
                  SizedBox(width: isLg ? 40 : 24),
                  Expanded(
                    flex: 1,
                    child: _FeaturedMediaBlock(controller: _controller),
                  ),
                ],
              ),
            )
          else
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _FeaturedContent(theme: theme, compact: isCompact),
                SizedBox(height: isCompact ? 16 : 24),
                SizedBox(
                  height: featuredHeight,
                  child: _FeaturedMediaBlock(controller: _controller),
                ),
              ],
            ),
          SizedBox(height: isCompact ? 28 : 40),
          Container(height: 1, color: const Color(0xFFE0E0E5)),
          SizedBox(height: isCompact ? 20 : 24),
          // Abas
          Wrap(
            spacing: 20,
            runSpacing: 8,
            children: [
              _AboutTab(
                label: PortfolioData.instance.aboutTabAll,
                isSelected: _selectedTab == 0,
                onTap: () => setState(() => _selectedTab = 0),
              ),
              _AboutTab(
                label: PortfolioData.instance.aboutTabValues,
                isSelected: _selectedTab == 1,
                onTap: () => setState(() => _selectedTab = 1),
              ),
            ],
          ),
          SizedBox(height: isCompact ? 20 : 28),
          // Grid de itens
          LayoutBuilder(
            builder: (context, constraints) {
              final crossAxisCount = isWide ? 2 : 1;
              final aspectRatio = isCompact
                  ? 0.95
                  : (isWide ? 2.0 : 1.4);
              return GridView.count(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                crossAxisCount: crossAxisCount,
                mainAxisSpacing: isCompact ? 16 : 24,
                crossAxisSpacing: isCompact ? 16 : 24,
                childAspectRatio: aspectRatio,
                children: items
                    .map((item) => _AboutGridCard(
                          item: item,
                          compact: isCompact,
                          narrow: !isWide,
                        ))
                    .toList(),
              );
            },
          ),
        ],
      ),
    );
  }
}

class _FeaturedContent extends StatelessWidget {
  const _FeaturedContent({
    required this.theme,
    required this.compact,
  });

  final ThemeData theme;
  final bool compact;

  @override
  Widget build(BuildContext context) {
    final headlineStyle = compact
        ? theme.textTheme.headlineSmall?.copyWith(
            color: const Color(0xFF1A1A1A),
            fontWeight: FontWeight.w700,
          )
        : theme.textTheme.displaySmall?.copyWith(
            color: const Color(0xFF1A1A1A),
            fontWeight: FontWeight.w700,
          );

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          PortfolioData.instance.aboutFeaturedLabel,
          style: theme.textTheme.labelLarge?.copyWith(
            color: const Color(0xFF5F5F67),
            fontSize: compact ? 12 : null,
          ),
        ),
        SizedBox(height: compact ? 8 : 12),
        Text(
          PortfolioData.instance.aboutFeaturedHeadline,
          style: headlineStyle,
        ),
        SizedBox(height: compact ? 6 : 8),
        Text(
          PortfolioData.instance.aboutFeaturedMeta,
          style: theme.textTheme.bodyMedium?.copyWith(
            color: const Color(0xFF5F5F67),
            height: 1.5,
            fontSize: compact ? 14 : null,
          ),
        ),
        SizedBox(height: compact ? 16 : 24),
        OutlinedButton(
          onPressed: () {},
          style: OutlinedButton.styleFrom(
            foregroundColor: const Color(0xFF1A1A1A),
            side: const BorderSide(color: Color(0xFFE0E0E5)),
            padding: EdgeInsets.symmetric(
              horizontal: compact ? 16 : 20,
              vertical: compact ? 10 : 12,
            ),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(24),
            ),
          ),
          child: Text(
            PortfolioData.instance.aboutFeaturedButton,
            style: TextStyle(fontSize: compact ? 13 : null),
          ),
        ),
      ],
    );
  }
}

class _FeaturedMediaBlock extends StatelessWidget {
  const _FeaturedMediaBlock({required this.controller});

  final AnimationController controller;

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(16),
      child: AnimatedBuilder(
        animation: controller,
        builder: (context, _) {
          return Container(
            width: double.infinity,
            height: double.infinity,
            decoration: BoxDecoration(
              color: const Color(0xFF1A1A1A),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Stack(
              children: [
                Positioned.fill(
                  child: CustomPaint(
                    painter: _AnimatedDotsPainter(time: controller.value),
                  ),
                ),
                Center(
                  child: Text(
                    PortfolioData.instance.name.isNotEmpty
                        ? PortfolioData.instance.name[0].toUpperCase()
                        : '?',
                    style: TextStyle(
                      fontSize: MediaQuery.sizeOf(context).width < _Breakpoint.sm
                          ? 56
                          : 80,
                      fontWeight: FontWeight.w700,
                      color: Colors.white.withValues(alpha: 0.9),
                      height: 1,
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}

class _AboutTab extends StatelessWidget {
  const _AboutTab({
    required this.label,
    required this.isSelected,
    required this.onTap,
  });

  final String label;
  final bool isSelected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: onTap,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              label,
              style: TextStyle(
                color: isSelected
                    ? const Color(0xFF1A1A1A)
                    : const Color(0xFF5F5F67),
                fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500,
                fontSize: 15,
              ),
            ),
            const SizedBox(height: 6),
            AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              height: 3,
              width: isSelected ? 28 : 0,
              decoration: BoxDecoration(
                color: const Color(0xFF4285F4),
                borderRadius: BorderRadius.circular(2),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _AboutGridCard extends StatelessWidget {
  const _AboutGridCard({
    required this.item,
    required this.compact,
    required this.narrow,
  });

  final AboutItem item;
  final bool compact;
  final bool narrow;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final iconSize = compact ? 56 : (narrow ? 72 : 100);

    // Em telas estreitas: layout vertical (ícone em cima, texto embaixo)
    if (narrow) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Container(
                  width: iconSize.toDouble(),
                  height: iconSize.toDouble(),
                  color: const Color(0xFF1A1A1A),
                  child: Icon(
                    item.icon,
                    size: compact ? 28 : 36,
                    color: Colors.white,
                  ),
                ),
              ),
              SizedBox(width: compact ? 12 : 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      item.title,
                      style: theme.textTheme.titleMedium?.copyWith(
                        color: const Color(0xFF1A1A1A),
                        fontWeight: FontWeight.w700,
                        fontSize: compact ? 16 : null,
                      ),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                    SizedBox(height: compact ? 4 : 6),
                    Text(
                      item.description,
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: const Color(0xFF5F5F67),
                        height: 1.45,
                        fontSize: compact ? 13 : null,
                      ),
                      maxLines: narrow ? 4 : 3,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ),
              ),
            ],
          ),
          SizedBox(height: compact ? 10 : 12),
          OutlinedButton(
            onPressed: () {},
            style: OutlinedButton.styleFrom(
              foregroundColor: const Color(0xFF1A1A1A),
              side: const BorderSide(color: Color(0xFFE0E0E5)),
              padding: EdgeInsets.symmetric(
                horizontal: compact ? 12 : 16,
                vertical: compact ? 6 : 8,
              ),
              minimumSize: Size.zero,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(24),
              ),
            ),
            child: Text(
              PortfolioData.instance.aboutCardCta,
              style: TextStyle(fontSize: compact ? 12 : null),
            ),
          ),
        ],
      );
    }

    // Desktop: linha com texto à esquerda e ícone à direita
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                item.title,
                style: theme.textTheme.titleLarge?.copyWith(
                  color: const Color(0xFF1A1A1A),
                  fontWeight: FontWeight.w700,
                ),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
              Text(
                item.description,
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: const Color(0xFF5F5F67),
                  height: 1.45,
                ),
                maxLines: 3,
                overflow: TextOverflow.ellipsis,
              ),
              const SizedBox(height: 12),
              OutlinedButton(
                onPressed: () {},
                style: OutlinedButton.styleFrom(
                  foregroundColor: const Color(0xFF1A1A1A),
                  side: const BorderSide(color: Color(0xFFE0E0E5)),
                  padding: const EdgeInsets.symmetric(
                      horizontal: 16, vertical: 8),
                  minimumSize: Size.zero,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(24),
                  ),
                ),
                child: Text(PortfolioData.instance.aboutCardCta),
              ),
            ],
          ),
        ),
        const SizedBox(width: 20),
        ClipRRect(
          borderRadius: BorderRadius.circular(12),
          child: Container(
            width: iconSize.toDouble(),
            height: iconSize.toDouble(),
            color: const Color(0xFF1A1A1A),
            child: Icon(
              item.icon,
              size: iconSize * 0.4,
              color: Colors.white,
            ),
          ),
        ),
      ],
    );
  }
}

class _AnimatedDotsPainter extends CustomPainter {
  _AnimatedDotsPainter({required this.time});

  final double time;

  @override
  void paint(Canvas canvas, Size size) {
    if (size.width <= 0 || size.height <= 0) return;
    final rng = math.Random(42);
    final count = 80;
    for (var i = 0; i < count; i++) {
      final x = rng.nextDouble() * size.width;
      final y = rng.nextDouble() * size.height;
      final phase = (time + i * 0.02) % 1.0;
      final opacity = 0.12 + 0.18 * math.sin(phase * 2 * math.pi);
      final paint = Paint()
        ..color = Colors.white.withValues(alpha: opacity);
      canvas.drawCircle(Offset(x, y), 1.2 + rng.nextDouble() * 0.8, paint);
    }
  }

  @override
  bool shouldRepaint(covariant _AnimatedDotsPainter oldDelegate) {
    return oldDelegate.time != time;
  }
}
