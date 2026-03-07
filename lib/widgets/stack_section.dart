import 'dart:math' as math;
import 'package:flutter/material.dart';

import '../data/portfolio_data.dart';

/// Seção Stack/Ferramentas: linha de círculos com ícones da stack e texto descritivo.
class StackSection extends StatefulWidget {
  const StackSection({super.key});

  @override
  State<StackSection> createState() => _StackSectionState();
}

class _StackSectionState extends State<StackSection>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  static const _stackItems = [
    _StackItem(name: 'Flutter', icon: Icons.flutter_dash, color: Color(0xFF02569B)),
    _StackItem(name: 'Python', icon: Icons.code, color: Color(0xFF3776AB)),
    _StackItem(name: 'Swift', icon: Icons.phone_iphone, color: Color(0xFFF05138)),
    _StackItem(name: 'iOS', icon: Icons.phone_iphone, color: Color(0xFF000000)),
    _StackItem(name: 'Android', icon: Icons.android, color: Color(0xFF3DDC84)),
    _StackItem(name: 'Pandas', icon: Icons.analytics_outlined, color: Color(0xFF150458)),
    _StackItem(name: 'FlutterFlow', icon: Icons.dashboard_customize, color: Color(0xFF4285F4)),
    _StackItem(name: 'Odoo', icon: Icons.business_center, color: Color(0xFF714B67)),
    _StackItem(name: 'Web', icon: Icons.language, color: Color(0xFF4285F4)),
    _StackItem(name: 'Dados', icon: Icons.bar_chart, color: Color(0xFF34A853)),
  ];

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2500),
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
    final isWide = MediaQuery.sizeOf(context).width > 600;

    return Container(
      color: Colors.white,
      padding: EdgeInsets.symmetric(
        horizontal: isWide ? 48 : 24,
        vertical: 64,
      ),
      child: Column(
        children: [
          Wrap(
            spacing: 12,
            runSpacing: 12,
            alignment: WrapAlignment.center,
            children: List.generate(
              _stackItems.length,
              (index) => _AnimatedStackCircle(
                item: _stackItems[index],
                animation: _controller,
                index: index,
              ),
            ),
          ),
          const SizedBox(height: 48),
          ConstrainedBox(
            constraints: BoxConstraints(maxWidth: isWide ? 640 : double.infinity),
            child: Text(
              PortfolioData.instance.stackDescription,
              style: theme.textTheme.headlineMedium?.copyWith(
                color: const Color(0xFF1A1A1A),
                fontWeight: FontWeight.w500,
                height: 1.4,
              ),
              textAlign: TextAlign.center,
            ),
          ),
        ],
      ),
    );
  }
}

class _StackItem {
  final String name;
  final IconData icon;
  final Color color;

  const _StackItem({
    required this.name,
    required this.icon,
    required this.color,
  });
}

class _AnimatedStackCircle extends StatelessWidget {
  const _AnimatedStackCircle({
    required this.item,
    required this.animation,
    required this.index,
  });

  final _StackItem item;
  final Animation<double> animation;
  final int index;

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: animation,
      builder: (context, child) {
        final phase = (animation.value + index * 0.12) % 1.0;
        final scale = 1.0 + 0.06 * math.sin(phase * 2 * math.pi);
        return Transform.scale(
          scale: scale,
          child: child,
        );
      },
      child: _StackCircle(item: item),
    );
  }
}

class _StackCircle extends StatefulWidget {
  const _StackCircle({required this.item});

  final _StackItem item;

  @override
  State<_StackCircle> createState() => _StackCircleState();
}

class _StackCircleState extends State<_StackCircle> {
  bool _hover = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _hover = true),
      onExit: (_) => setState(() => _hover = false),
      cursor: SystemMouseCursors.click,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 180),
        width: 52,
        height: 52,
        decoration: BoxDecoration(
          color: _hover ? const Color(0xFFF0F0F4) : Colors.white,
          shape: BoxShape.circle,
          border: Border.all(
            color: _hover ? widget.item.color.withValues(alpha: 0.5) : const Color(0xFFE0E0E5),
            width: 1.5,
          ),
          boxShadow: _hover
              ? [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.06),
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                  )
                ] : null,
        ),
        child: Icon(
          widget.item.icon,
          color: const Color(0xFF1A1A1A),
          size: 26,
        ),
      ),
    );
  }
}
