import 'package:flutter/material.dart';

import '../data/portfolio_data.dart';
import '../widgets/project_card_image.dart';
import '../widgets/soft_card_wrapper.dart';

/// Página de projetos: hero, filtro em pills (Dados, Mobile, Web), grid de cards.
class ProjectsPage extends StatefulWidget {
  const ProjectsPage({super.key});

  @override
  State<ProjectsPage> createState() => _ProjectsPageState();
}

class _ProjectsPageState extends State<ProjectsPage> {
  String? _selectedFilterValue;

  String get _selectedFilter =>
      _selectedFilterValue ?? PortfolioData.instance.filterAll;

  List<String> get _filters => [
        PortfolioData.instance.filterAll,
        PortfolioData.instance.filterDados,
        PortfolioData.instance.filterMobile,
        PortfolioData.instance.filterWeb,
      ];

  List<ProjectItem> get _filteredProjects {
    final data = PortfolioData.instance;
    if (_selectedFilter == data.filterAll) return data.projects;
    return data.projects.where((p) {
      if (_selectedFilter == data.filterDados) return p.projectType == ProjectType.dados;
      if (_selectedFilter == data.filterMobile) return p.projectType == ProjectType.mobile;
      if (_selectedFilter == data.filterWeb) return p.projectType == ProjectType.web;
      return true;
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isWide = MediaQuery.sizeOf(context).width > 900;
    final isMedium = MediaQuery.sizeOf(context).width > 600;

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Color(0xFF1A1A1A)),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: Text(
          'Projetos',
          style: theme.textTheme.titleLarge?.copyWith(
            color: const Color(0xFF1A1A1A),
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.symmetric(
          horizontal: isWide ? 48 : 24,
          vertical: 32,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _HeroBlock(theme: theme, isWide: isWide),
            const SizedBox(height: 48),
            Text(
              PortfolioData.instance.projectsFilterLabel,
              style: theme.textTheme.titleLarge?.copyWith(
                color: const Color(0xFF1A1A1A),
                fontWeight: FontWeight.w700,
              ),
            ),
            const SizedBox(height: 16),
            Wrap(
              spacing: 12,
              runSpacing: 10,
              children: _filters
                  .map((f) => _FilterPill(
                        label: f,
                        isSelected: _selectedFilter == f,
                        onTap: () => setState(() => _selectedFilterValue = f),
                      ))
                  .toList(),
            ),
            const SizedBox(height: 40),
            LayoutBuilder(
              builder: (context, constraints) {
                final crossAxisCount = isWide ? 3 : (isMedium ? 2 : 1);
                return GridView.count(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  crossAxisCount: crossAxisCount,
                  mainAxisSpacing: 24,
                  crossAxisSpacing: 24,
                  childAspectRatio: 0.82,
                  children: _filteredProjects
                      .map((p) => _ProjectCard(
                            project: p,
                            onTap: () => Navigator.of(context).pushNamed(
                              '/project',
                              arguments: p.slug,
                            ),
                          ))
                      .toList(),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}

class _HeroBlock extends StatelessWidget {
  const _HeroBlock({required this.theme, required this.isWide});

  final ThemeData theme;
  final bool isWide;

  @override
  Widget build(BuildContext context) {
    if (isWide) {
      return Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            flex: 2,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  PortfolioData.instance.projectsPageTitle,
                  style: theme.textTheme.displaySmall?.copyWith(
                    color: const Color(0xFF1A1A1A),
                    fontWeight: FontWeight.w700,
                  ),
                ),
                const SizedBox(height: 16),
                Text(
                  PortfolioData.instance.projectsPageIntro,
                  style: theme.textTheme.bodyLarge?.copyWith(
                    color: const Color(0xFF5F5F67),
                    height: 1.5,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 32),
          Padding(
            padding: const EdgeInsets.only(top: 8),
            child: OutlinedButton(
              onPressed: () {},
              style: OutlinedButton.styleFrom(
                foregroundColor: const Color(0xFF1A1A1A),
                side: const BorderSide(color: Color(0xFF1A1A1A)),
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(24),
                ),
              ),
              child: Text(PortfolioData.instance.projectsPageCta),
            ),
          ),
        ],
      );
    }
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          PortfolioData.instance.projectsPageTitle,
          style: theme.textTheme.headlineMedium?.copyWith(
            color: const Color(0xFF1A1A1A),
            fontWeight: FontWeight.w700,
          ),
        ),
        const SizedBox(height: 12),
        Text(
          PortfolioData.instance.projectsPageIntro,
          style: theme.textTheme.bodyLarge?.copyWith(
            color: const Color(0xFF5F5F67),
            height: 1.5,
          ),
        ),
        const SizedBox(height: 20),
        OutlinedButton(
          onPressed: () {},
          style: OutlinedButton.styleFrom(
            foregroundColor: const Color(0xFF1A1A1A),
            side: const BorderSide(color: Color(0xFF1A1A1A)),
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(24),
            ),
          ),
          child: Text(PortfolioData.instance.projectsPageCta),
        ),
      ],
    );
  }
}

class _FilterPill extends StatelessWidget {
  const _FilterPill({
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
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 180),
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
          decoration: BoxDecoration(
            color: isSelected ? const Color(0xFF1A1A1A) : Colors.white,
            borderRadius: BorderRadius.circular(24),
            border: Border.all(
              color: const Color(0xFF1A1A1A),
              width: 1.5,
            ),
          ),
          child: Text(
            label,
            style: TextStyle(
              color: isSelected ? Colors.white : const Color(0xFF1A1A1A),
              fontWeight: FontWeight.w500,
              fontSize: 14,
            ),
          ),
        ),
      ),
    );
  }
}

class _ProjectCard extends StatefulWidget {
  final ProjectItem project;
  final VoidCallback? onTap;

  const _ProjectCard({required this.project, this.onTap});

  @override
  State<_ProjectCard> createState() => _ProjectCardState();
}

class _ProjectCardState extends State<_ProjectCard> {
  bool _hover = false;

  static const _radius = 16.0;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final p = widget.project;
    final firstImage = p.imageUrls.isNotEmpty ? p.imageUrls.first : null;

    return MouseRegion(
      onEnter: (_) => setState(() => _hover = true),
      onExit: (_) => setState(() => _hover = false),
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: widget.onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(_radius),
            border: Border.all(
              color: const Color(0xFFEEEEEE),
              width: 1,
            ),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(
                  alpha: _hover ? 0.06 : 0.03,
                ),
                blurRadius: _hover ? 12 : 8,
                offset: Offset(0, _hover ? 4 : 2),
              ),
            ],
          ),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(_radius),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              mainAxisSize: MainAxisSize.min,
              children: [
                Expanded(
                  flex: 5,
                  child: CardImageWithGradient(
                    radius: _radius,
                    inset: 12,
                    child: ProjectCardImage(
                      imageUrl: firstImage,
                      placeholderLabel: p.thumbnailLabel,
                      fit: BoxFit.cover,
                      borderRadius: BorderRadius.zero,
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(20),
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
                      const SizedBox(height: 8),
                      Text(
                        p.description,
                        style: theme.textTheme.bodyMedium?.copyWith(
                          color: const Color(0xFF5F5F67),
                          height: 1.4,
                        ),
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
