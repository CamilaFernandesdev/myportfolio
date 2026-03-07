import 'package:flutter/material.dart';

import '../data/portfolio_data.dart';
import 'dots_background.dart';

/// Seção duas colunas no estilo Antigravity: chaves { } com pontos,
/// "Available at no charge" / "Coming soon" com botões.
class CtaSection extends StatelessWidget {
  const CtaSection({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isWide = MediaQuery.sizeOf(context).width > 700;

    return DotsBackground(
      density: 0.35,
      child: Container(
        padding: EdgeInsets.symmetric(
          horizontal: isWide ? 48 : 24,
          vertical: 80,
        ),
        child: isWide
            ? Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Spacer(),
                  Expanded(flex: 2, child: _CtaColumn(theme: theme, primary: true)),
                  const SizedBox(width: 48),
                  Expanded(flex: 2, child: _CtaColumn(theme: theme, primary: false)),
                  const Spacer(),
                ],
              )
            : Column(
                children: [
                  _CtaColumn(theme: theme, primary: true),
                  const SizedBox(height: 32),
                  _CtaColumn(theme: theme, primary: false),
                ],
              ),
      ),
    );
  }
}

class _CtaColumn extends StatelessWidget {
  const _CtaColumn({required this.theme, required this.primary});

  final ThemeData theme;
  final bool primary;

  @override
  Widget build(BuildContext context) {
    final label = primary
        ? PortfolioData.instance.sectionAvailableLabel
        : PortfolioData.instance.sectionSoonLabel;
    final title = primary
        ? PortfolioData.instance.sectionAvailableTitle
        : PortfolioData.instance.sectionSoonTitle;
    final subtitle = primary
        ? PortfolioData.instance.sectionAvailableSubtitle
        : PortfolioData.instance.sectionSoonSubtitle;
    final buttonText = primary
        ? PortfolioData.instance.sectionAvailableButton
        : PortfolioData.instance.sectionSoonButton;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(
          label,
          style: theme.textTheme.labelLarge?.copyWith(
            color: theme.colorScheme.onSurfaceVariant,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          title,
          style: theme.textTheme.headlineMedium?.copyWith(
            color: const Color(0xFF1A1A1A),
          ),
        ),
        const SizedBox(height: 6),
        Text(
          subtitle,
          style: theme.textTheme.bodyLarge,
        ),
        const SizedBox(height: 24),
        primary
            ? ElevatedButton(
                onPressed: () {},
                child: Text(buttonText),
              )
            : OutlinedButton(
                onPressed: () {},
                child: Text(buttonText),
              ),
      ],
    );
  }
}

