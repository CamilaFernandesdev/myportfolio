import 'package:flutter/material.dart';

/// Cor de fundo do card (branco / cinza muito claro, visual clean).
const Color cardBackgroundGrayBlue = Color(0xFFFAFAFA);

/// Área da imagem do card: fundo claro e minimalista, sem gradiente pesado.
class CardImageWithGradient extends StatelessWidget {
  const CardImageWithGradient({
    super.key,
    required this.child,
    this.radius = 16,
    this.inset = 12,
  });

  final Widget child;
  final double radius;
  final double inset;

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.vertical(top: Radius.circular(radius)),
      child: Container(
        color: const Color(0xFFF5F5F7),
        child: Padding(
          padding: EdgeInsets.all(inset),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(radius - inset),
            child: child,
          ),
        ),
      ),
    );
  }
}

/// SizedBox que usa uma fração do tamanho disponível.
class FractionallySizedBox extends StatelessWidget {
  const FractionallySizedBox({
    super.key,
    required this.child,
    this.widthFactor = 1,
    this.heightFactor = 1,
  });

  final Widget child;
  final double widthFactor;
  final double heightFactor;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        return SizedBox(
          width: constraints.maxWidth * widthFactor,
          height: constraints.maxHeight * heightFactor,
          child: child,
        );
      },
    );
  }
}
