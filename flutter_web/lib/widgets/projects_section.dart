import 'package:flutter/material.dart';

import '../data/portfolio_data.dart';
import 'dots_background.dart';
import 'project_card_image.dart';

/// Seção "Projetos em destaque" no estilo "Latest Blogs" do Antigravity.
class ProjectsSection extends StatelessWidget {
  const ProjectsSection({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isWide = MediaQuery.sizeOf(context).width > 900;
    final projects = PortfolioData.instance.projects.take(4).toList();

    return Container(
      color: Colors.white,
      padding: EdgeInsets.symmetric(
        horizontal: isWide ? 48 : 24,
        vertical: 64,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                PortfolioData.instance.projectsSectionTitle,
                style: theme.textTheme.headlineMedium?.copyWith(
                  color: const Color(0xFF1A1A1A),
                ),
              ),
              TextButton(
                onPressed: () => Navigator.of(context).pushNamed('/projects'),
                child: Text(
                  PortfolioData.instance.projectsSectionCta,
                  style: const TextStyle(color: Color(0xFF1A1A1A)),
                ),
              ),
            ],
          ),
          const SizedBox(height: 24),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: projects.map((p) => _ProjectCard(project: p)).toList(),
            ),
          ),
        ],
      ),
    );
  }
}

class _ProjectCard extends StatefulWidget {
  final ProjectItem project;

  const _ProjectCard({required this.project});

  @override
  State<_ProjectCard> createState() => _ProjectCardState();
}

class _ProjectCardState extends State<_ProjectCard> {
  bool _hover = false;

  static const _cardWidth = 280.0;
  static const _imageHeight = 180.0;
  static const _radius = 16.0;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final p = widget.project;
    final firstImage = p.imageUrls.isNotEmpty ? p.imageUrls.first : null;

    return MouseRegion(
      onEnter: (_) => setState(() => _hover = true),
      onExit: (_) => setState(() => _hover = false),
      child: Padding(
        padding: const EdgeInsets.only(right: 20),
        child: SizedBox(
          width: _cardWidth,
          child: GestureDetector(
            onTap: () => Navigator.of(context).pushNamed(
              '/project',
              arguments: p.slug,
            ),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(_radius),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(
                      alpha: _hover ? 0.08 : 0.04,
                    ),
                    blurRadius: _hover ? 16 : 10,
                    offset: Offset(0, _hover ? 6 : 3),
                  ),
                ],
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(_radius),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    // Área visual escura com detalhes azuis
                    SizedBox(
                      width: _cardWidth,
                      height: _imageHeight,
                      child: DarkBlueDotsBackground(
                        density: 0.55,
                        child: firstImage != null
                            ? Padding(
                                padding: const EdgeInsets.all(12),
                                child: ClipRRect(
                                  borderRadius: BorderRadius.circular(_radius - 4),
                                  child: ProjectCardImage(
                                    imageUrl: firstImage,
                                    placeholderLabel: p.thumbnailLabel,
                                    fit: BoxFit.cover,
                                    borderRadius: BorderRadius.zero,
                                  ),
                                ),
                              )
                            : Center(
                                child: Text(
                                  p.thumbnailLabel,
                                  style: theme.textTheme.titleMedium?.copyWith(
                                    color: Colors.white.withValues(alpha: 0.95),
                                    fontWeight: FontWeight.w600,
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ),
                      ),
                    ),
                    // Área de texto (fundo claro)
                    Container(
                      color: Colors.white,
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            p.title,
                            style: theme.textTheme.titleLarge?.copyWith(
                              color: const Color(0xFF1A1A1A),
                              fontWeight: FontWeight.w700,
                            ),
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                          ),
                          const SizedBox(height: 6),
                          Text(
                            '${p.date} · ${p.category}',
                            style: theme.textTheme.bodySmall?.copyWith(
                              color: const Color(0xFF5F5F67),
                            ),
                          ),
                          const SizedBox(height: 10),
                          Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Text(
                                'Ver projeto',
                                style: theme.textTheme.labelLarge?.copyWith(
                                  color: const Color(0xFF1A1A1A),
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                              const SizedBox(width: 4),
                              const Icon(
                                Icons.arrow_forward,
                                size: 16,
                                color: Color(0xFF1A1A1A),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
