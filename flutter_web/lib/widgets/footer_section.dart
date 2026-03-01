import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import '../data/portfolio_data.dart';

class FooterSection extends StatelessWidget {
  const FooterSection({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isWide = MediaQuery.sizeOf(context).width > 600;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 40),
      decoration: const BoxDecoration(
        color: Colors.white,
        border: Border(
          top: BorderSide(color: Color(0xFFE0E0E5)),
        ),
      ),
      child: isWide
          ? Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Icon(Icons.code, color: theme.colorScheme.primary, size: 22),
                        const SizedBox(width: 8),
                        Text(
                          PortfolioData.instance.footerBrand,
                          style: theme.textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.w600,
                            color: const Color(0xFF1A1A1A),
                          ),
                        ),
                      ],
                    ),
                    Row(
                      children: PortfolioData.instance.footerLinks.map((link) {
                        return Padding(
                          padding: const EdgeInsets.only(left: 24),
                          child: _FooterLinkItem(link: link),
                        );
                      }).toList(),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Text(
                  PortfolioData.instance.footerInspired,
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
              ],
            )
          : Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.code, color: theme.colorScheme.primary, size: 22),
                    const SizedBox(width: 8),
                    Text(
                      PortfolioData.instance.footerBrand,
                      style: theme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                        color: const Color(0xFF1A1A1A),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                ...PortfolioData.instance.footerLinks.map((link) => _FooterLinkItem(link: link)),
                const SizedBox(height: 8),
                Text(
                  PortfolioData.instance.footerInspired,
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
              ],
            ),
    );
  }
}

class _FooterLinkItem extends StatelessWidget {
  const _FooterLinkItem({required this.link});

  final FooterLink link;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: () => launchUrl(Uri.parse(link.url), mode: LaunchMode.platformDefault),
        child: Text(
          link.label,
          style: theme.textTheme.bodyMedium?.copyWith(
            color: const Color(0xFF1A1A1A),
          ),
        ),
      ),
    );
  }
}
