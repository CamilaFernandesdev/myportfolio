import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import '../data/portfolio_data.dart';

/// Página de detalhes do projeto: carrossel de imagens, stack, descrição e links.
class ProjectDetailPage extends StatefulWidget {
  const ProjectDetailPage({super.key});

  @override
  State<ProjectDetailPage> createState() => _ProjectDetailPageState();
}

class _ProjectDetailPageState extends State<ProjectDetailPage> {
  final PageController _carouselController = PageController();
  int _currentImageIndex = 0;

  @override
  void dispose() {
    _carouselController.dispose();
    super.dispose();
  }

  Future<void> _openUrl(String url) async {
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.platformDefault);
    }
  }

  @override
  Widget build(BuildContext context) {
    final slug = ModalRoute.of(context)?.settings.arguments as String?;
    final project = slug != null ? PortfolioData.instance.projectBySlug(slug) : null;

    if (project == null) {
      return Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.white,
          leading: IconButton(
            icon: const Icon(Icons.arrow_back, color: Color(0xFF1A1A1A)),
            onPressed: () => Navigator.of(context).pop(),
          ),
        ),
        body: const Center(
          child: Text('Projeto não encontrado.'),
        ),
      );
    }

    final theme = Theme.of(context);
    final isWide = MediaQuery.sizeOf(context).width > 900;
    final images = project.imageUrls.isEmpty
        ? <String?>[null]
        : project.imageUrls.map((e) => e as String?).toList();

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
          project.title,
          style: theme.textTheme.titleLarge?.copyWith(
            color: const Color(0xFF1A1A1A),
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.symmetric(
          horizontal: isWide ? 48 : 24,
          vertical: 24,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Carrossel de imagens
            _CarouselSection(
              images: images,
              controller: _carouselController,
              onPageChanged: (i) => setState(() => _currentImageIndex = i),
              currentIndex: _currentImageIndex,
            ),
            const SizedBox(height: 32),

            // Meta: data e categoria
            Row(
              children: [
                _MetaChip(
                  icon: Icons.calendar_today_outlined,
                  label: project.date,
                ),
                const SizedBox(width: 16),
                _MetaChip(
                  icon: Icons.category_outlined,
                  label: project.category,
                ),
              ],
            ),
            const SizedBox(height: 24),

            // Descrição
            Text(
              'Sobre o projeto',
              style: theme.textTheme.titleLarge?.copyWith(
                color: const Color(0xFF1A1A1A),
                fontWeight: FontWeight.w700,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              project.description,
              style: theme.textTheme.bodyLarge?.copyWith(
                color: const Color(0xFF5F5F67),
                height: 1.6,
              ),
            ),
            const SizedBox(height: 28),

            // Stack
            if (project.stack.isNotEmpty) ...[
              Text(
                'Stack utilizada',
                style: theme.textTheme.titleLarge?.copyWith(
                  color: const Color(0xFF1A1A1A),
                  fontWeight: FontWeight.w700,
                ),
              ),
              const SizedBox(height: 12),
              Wrap(
                spacing: 10,
                runSpacing: 10,
                children: project.stack
                    .map(
                      (s) => Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 16,
                          vertical: 10,
                        ),
                        decoration: BoxDecoration(
                          color: const Color(0xFFF5F5F7),
                          borderRadius: BorderRadius.circular(24),
                          border: Border.all(
                            color: const Color(0xFFE0E0E5),
                          ),
                        ),
                        child: Text(
                          s,
                          style: theme.textTheme.labelLarge?.copyWith(
                            color: const Color(0xFF1A1A1A),
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                    )
                    .toList(),
              ),
              const SizedBox(height: 28),
            ],

            // Links (GitHub, demo, site, etc.)
            if (project.projectLinks.isNotEmpty) ...[
              Text(
                'Links',
                style: theme.textTheme.titleLarge?.copyWith(
                  color: const Color(0xFF1A1A1A),
                  fontWeight: FontWeight.w700,
                ),
              ),
              const SizedBox(height: 12),
              Wrap(
                spacing: 12,
                runSpacing: 12,
                children: project.projectLinks.map((link) {
                  return OutlinedButton.icon(
                    onPressed: () => _openUrl(link.url),
                    icon: Icon(
                      link.icon ?? Icons.open_in_new,
                      size: 18,
                      color: const Color(0xFF1A1A1A),
                    ),
                    label: Text(link.label),
                    style: OutlinedButton.styleFrom(
                      foregroundColor: const Color(0xFF1A1A1A),
                      side: const BorderSide(color: Color(0xFF1A1A1A)),
                      padding: const EdgeInsets.symmetric(
                        horizontal: 20,
                        vertical: 12,
                      ),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(24),
                      ),
                    ),
                  );
                }).toList(),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

/// Widget reutilizável para exibir imagem do projeto (asset ou URL). Usado no carrossel e no dialog de preview.
Widget buildProjectImage(
  BuildContext context,
  String url, {
  String placeholderLabel = 'Imagem',
  BoxFit fit = BoxFit.cover,
}) {
  final isAsset = url.startsWith('assets/');
  if (isAsset) {
    if (kIsWeb) {
      final imageUrl = Uri.base.resolve(url).toString();
      return Image.network(
        imageUrl,
        fit: fit,
        errorBuilder: (_, __, ___) => _PlaceholderImage(label: placeholderLabel),
        loadingBuilder: (context, child, loadingProgress) {
          if (loadingProgress == null) return child;
          return Container(
            color: const Color(0xFFF5F5F7),
            child: Center(
              child: CircularProgressIndicator(
                value: loadingProgress.expectedTotalBytes != null
                    ? loadingProgress.cumulativeBytesLoaded /
                        (loadingProgress.expectedTotalBytes ?? 1)
                    : null,
                color: const Color(0xFF4285F4),
              ),
            ),
          );
        },
      );
    }
    return Image.asset(
      url,
      fit: fit,
      errorBuilder: (_, __, ___) => _PlaceholderImage(label: placeholderLabel),
    );
  }
  return Image.network(
    url,
    fit: fit,
    errorBuilder: (_, __, ___) => _PlaceholderImage(label: placeholderLabel),
    loadingBuilder: (context, child, loadingProgress) {
      if (loadingProgress == null) return child;
      return Container(
        color: const Color(0xFFF5F5F7),
        child: Center(
          child: CircularProgressIndicator(
            value: loadingProgress.expectedTotalBytes != null
                ? loadingProgress.cumulativeBytesLoaded /
                    (loadingProgress.expectedTotalBytes ?? 1)
                : null,
            color: const Color(0xFF4285F4),
          ),
        ),
      );
    },
  );
}

/// Abre dialog em tela cheia para visualizar a imagem em tamanho maior; permite navegar entre imagens.
void showImagePreviewDialog(BuildContext context, List<String?> images, int initialIndex) {
  showDialog<void>(
    context: context,
    barrierColor: Colors.black87,
    useSafeArea: true,
    builder: (ctx) => _ImagePreviewDialog(
      images: images,
      initialIndex: initialIndex.clamp(0, images.length - 1),
    ),
  );
}

class _ImagePreviewDialog extends StatefulWidget {
  const _ImagePreviewDialog({
    required this.images,
    required this.initialIndex,
  });

  final List<String?> images;
  final int initialIndex;

  @override
  State<_ImagePreviewDialog> createState() => _ImagePreviewDialogState();
}

class _ImagePreviewDialogState extends State<_ImagePreviewDialog> {
  late int _index;

  @override
  void initState() {
    super.initState();
    _index = widget.initialIndex;
  }

  void _prev() {
    if (widget.images.length <= 1) return;
    setState(() => _index = (_index - 1) % widget.images.length);
  }

  void _next() {
    if (widget.images.length <= 1) return;
    setState(() => _index = (_index + 1) % widget.images.length);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final url = _index >= 0 && _index < widget.images.length ? widget.images[_index] : null;
    final hasMultiple = widget.images.length > 1;

    return Dialog(
      backgroundColor: Colors.transparent,
      insetPadding: EdgeInsets.zero,
      child: Stack(
        fit: StackFit.expand,
        children: [
          // Área clicável para fechar ao tocar no fundo
          GestureDetector(
            onTap: () => Navigator.of(context).pop(),
            behavior: HitTestBehavior.opaque,
            child: const SizedBox.expand(),
          ),
          // Conteúdo central: imagem
          Center(
            child: GestureDetector(
              onTap: () {}, // evita fechar ao tocar na imagem
              child: Container(
                constraints: BoxConstraints(
                  maxWidth: MediaQuery.sizeOf(context).width * 0.9,
                  maxHeight: MediaQuery.sizeOf(context).height * 0.85,
                ),
                decoration: BoxDecoration(
                  color: const Color(0xFF1A1A1A),
                  borderRadius: BorderRadius.circular(12),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.5),
                      blurRadius: 24,
                      spreadRadius: 4,
                    ),
                  ],
                ),
                clipBehavior: Clip.antiAlias,
                child: url != null && url.isNotEmpty
                    ? buildProjectImage(
                        context,
                        url,
                        placeholderLabel: 'Imagem ${_index + 1}',
                        fit: BoxFit.contain,
                      )
                    : const _PlaceholderImage(label: 'Sem imagem'),
              ),
            ),
          ),
          // Botão fechar (canto superior direito)
          Positioned(
            top: MediaQuery.paddingOf(context).top + 8,
            right: 16,
            child: IconButton(
              onPressed: () => Navigator.of(context).pop(),
              icon: const Icon(Icons.close, color: Colors.white, size: 28),
              style: IconButton.styleFrom(
                backgroundColor: Colors.black54,
              ),
            ),
          ),
          // Navegação: seta esquerda
          if (hasMultiple) ...[
            Positioned(
              left: 16,
              top: 0,
              bottom: 0,
              child: Center(
                child: IconButton(
                  onPressed: _prev,
                  icon: const Icon(Icons.chevron_left, color: Colors.white, size: 40),
                  style: IconButton.styleFrom(
                    backgroundColor: Colors.black54,
                  ),
                ),
              ),
            ),
            Positioned(
              right: 16,
              top: 0,
              bottom: 0,
              child: Center(
                child: IconButton(
                  onPressed: _next,
                  icon: const Icon(Icons.chevron_right, color: Colors.white, size: 40),
                  style: IconButton.styleFrom(
                    backgroundColor: Colors.black54,
                  ),
                ),
              ),
            ),
            // Contador (ex: "2 / 5")
            Positioned(
              bottom: MediaQuery.paddingOf(context).bottom + 16,
              left: 0,
              right: 0,
              child: Center(
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  decoration: BoxDecoration(
                    color: Colors.black54,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    '${_index + 1} / ${widget.images.length}',
                    style: theme.textTheme.titleSmall?.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class _CarouselSection extends StatelessWidget {
  const _CarouselSection({
    required this.images,
    required this.controller,
    required this.onPageChanged,
    required this.currentIndex,
  });

  final List<String?> images;
  final PageController controller;
  final ValueChanged<int> onPageChanged;
  final int currentIndex;

  @override
  Widget build(BuildContext context) {
    const height = 420.0;
    final isWide = MediaQuery.sizeOf(context).width > 900;
    final hasMultiple = images.length > 1;

    return Column(
      children: [
        ClipRRect(
          borderRadius: BorderRadius.circular(16),
          child: Stack(
            alignment: Alignment.center,
            children: [
              SizedBox(
                height: height,
                width: double.infinity,
                child: PageView.builder(
                  controller: controller,
                  onPageChanged: onPageChanged,
                  itemCount: images.length,
                  itemBuilder: (context, index) {
                    final url = images[index];
                    return GestureDetector(
                      onTap: () => showImagePreviewDialog(context, images, index),
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 0),
                        child: url != null && url.isNotEmpty
                            ? buildProjectImage(
                                context,
                                url,
                                placeholderLabel: 'Imagem ${index + 1}',
                              )
                            : const _PlaceholderImage(label: 'Sem imagem'),
                      ),
                    );
                  },
                ),
              ),
              // Navegação por setas (só quando há mais de uma imagem)
              if (hasMultiple) ...[
                Positioned(
                  left: 8,
                  child: IconButton(
                    onPressed: currentIndex > 0
                        ? () => controller.previousPage(
                              duration: const Duration(milliseconds: 300),
                              curve: Curves.easeOutCubic,
                            )
                        : null,
                    icon: Icon(
                      Icons.chevron_left,
                      size: 36,
                      color: currentIndex > 0
                          ? Colors.white
                          : Colors.white.withValues(alpha: 0.3),
                    ),
                    style: IconButton.styleFrom(
                      backgroundColor: Colors.black38,
                    ),
                  ),
                ),
                Positioned(
                  right: 8,
                  child: IconButton(
                    onPressed: currentIndex < images.length - 1
                        ? () => controller.nextPage(
                              duration: const Duration(milliseconds: 300),
                              curve: Curves.easeOutCubic,
                            )
                        : null,
                    icon: Icon(
                      Icons.chevron_right,
                      size: 36,
                      color: currentIndex < images.length - 1
                          ? Colors.white
                          : Colors.white.withValues(alpha: 0.3),
                    ),
                    style: IconButton.styleFrom(
                      backgroundColor: Colors.black38,
                    ),
                  ),
                ),
              ],
            ],
          ),
        ),
        if (hasMultiple) ...[
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List.generate(
              images.length,
              (i) => GestureDetector(
                onTap: () => controller.animateToPage(
                  i,
                  duration: const Duration(milliseconds: 300),
                  curve: Curves.easeOutCubic,
                ),
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 200),
                  margin: const EdgeInsets.symmetric(horizontal: 4),
                  width: currentIndex == i ? 24 : 8,
                  height: 8,
                  decoration: BoxDecoration(
                    color: currentIndex == i
                        ? const Color(0xFF1A1A1A)
                        : const Color(0xFFE0E0E5),
                    borderRadius: BorderRadius.circular(4),
                  ),
                ),
              ),
            ),
          ),
        ],
      ],
    );
  }
}

class _PlaceholderImage extends StatelessWidget {
  const _PlaceholderImage({required this.label});

  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      color: const Color(0xFF1A1A1A),
      child: Center(
        child: Text(
          label,
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
                color: Colors.white70,
                fontWeight: FontWeight.w500,
              ),
        ),
      ),
    );
  }
}

class _MetaChip extends StatelessWidget {
  const _MetaChip({required this.icon, required this.label});

  final IconData icon;
  final String label;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, size: 18, color: const Color(0xFF5F5F67)),
        const SizedBox(width: 6),
        Text(
          label,
          style: theme.textTheme.bodyMedium?.copyWith(
            color: const Color(0xFF5F5F67),
            fontWeight: FontWeight.w500,
          ),
        ),
      ],
    );
  }
}
