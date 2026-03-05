import 'dart:math' as math;
import 'package:flutter/material.dart';

/// Fundo com pontos flutuantes no estilo do site Google Antigravity.
/// Usa o tamanho do [child] quando fornecido; caso contrário precisa de restrição de tamanho.
class DotsBackground extends StatelessWidget {
  const DotsBackground({
    super.key,
    this.child,
    this.density = 0.4,
  });

  final Widget? child;
  final double density;

  @override
  Widget build(BuildContext context) {
    if (child != null) {
      return Stack(
        children: [
          child!,
          Positioned.fill(
            child: CustomPaint(
              painter: _DotsPainter(density: density),
            ),
          ),
        ],
      );
    }
    return LayoutBuilder(
      builder: (context, constraints) {
        final width = constraints.maxWidth.isFinite ? constraints.maxWidth : 400.0;
        final height = constraints.maxHeight.isFinite ? constraints.maxHeight : 300.0;
        return SizedBox(
          width: width,
          height: height,
          child: CustomPaint(
            painter: _DotsPainter(density: density),
            size: Size(width, height),
          ),
        );
      },
    );
  }
}

class _DotsPainter extends CustomPainter {
  _DotsPainter({this.density = 0.4});

  final double density;

  @override
  void paint(Canvas canvas, Size size) {
    if (size.width <= 0 || size.height <= 0) return;
    final rng = math.Random(42);
    final count = (size.width * size.height * density * 0.00015).round().clamp(10, 2000);
    final blue = Paint()..color = const Color(0xFF4285F4).withValues(alpha: 0.15);
    final red = Paint()..color = const Color(0xFFEA4335).withValues(alpha: 0.12);
    final purple = Paint()..color = const Color(0xFF9B59B6).withValues(alpha: 0.1);

    for (var i = 0; i < count; i++) {
      final x = rng.nextDouble() * size.width;
      final y = rng.nextDouble() * size.height;
      final r = 1.2 + rng.nextDouble() * 1.2;
      final choice = rng.nextInt(3);
      final paint = choice == 0 ? blue : (choice == 1 ? red : purple);
      canvas.drawCircle(Offset(x, y), r, paint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

/// Fundo escuro com pontos azuis/claros para cards (estilo "dark com detalhes azuis").
class DarkBlueDotsBackground extends StatelessWidget {
  const DarkBlueDotsBackground({
    super.key,
    this.child,
    this.density = 0.5,
  });

  final Widget? child;
  final double density;

  static const Color darkBackground = Color(0xFF0D1117);

  @override
  Widget build(BuildContext context) {
    return Container(
      color: darkBackground,
      child: Stack(
        children: [
          Positioned.fill(
            child: CustomPaint(
              painter: _DarkBlueDotsPainter(density: density),
            ),
          ),
          if (child != null) Positioned.fill(child: child!),
        ],
      ),
    );
  }
}

class _DarkBlueDotsPainter extends CustomPainter {
  _DarkBlueDotsPainter({this.density = 0.5});

  final double density;

  @override
  void paint(Canvas canvas, Size size) {
    if (size.width <= 0 || size.height <= 0) return;
    final rng = math.Random(42);
    final count = (size.width * size.height * density * 0.0002).round().clamp(30, 3500);
    final blueBright = Paint()..color = const Color(0xFF5B9CF4).withValues(alpha: 0.5);
    final blueSoft = Paint()..color = const Color(0xFF4285F4).withValues(alpha: 0.35);
    final whiteSoft = Paint()..color = Colors.white.withValues(alpha: 0.25);

    for (var i = 0; i < count; i++) {
      final x = rng.nextDouble() * size.width;
      final y = rng.nextDouble() * size.height;
      final r = 1.0 + rng.nextDouble() * 1.5;
      final choice = rng.nextInt(3);
      final paint = choice == 0 ? blueBright : (choice == 1 ? blueSoft : whiteSoft);
      canvas.drawCircle(Offset(x, y), r, paint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
