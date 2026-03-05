import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';

/// Imagem do card de projeto: suporta asset local ou URL.
/// No Web, assets são carregados via URL para evitar 404.
class ProjectCardImage extends StatelessWidget {
  const ProjectCardImage({
    super.key,
    required this.imageUrl,
    required this.placeholderLabel,
    this.width,
    this.height,
    this.fit = BoxFit.cover,
    this.borderRadius,
  });

  final String? imageUrl;
  final String placeholderLabel;
  final double? width;
  final double? height;
  final BoxFit fit;
  final BorderRadius? borderRadius;

  @override
  Widget build(BuildContext context) {
    if (imageUrl == null || imageUrl!.isEmpty) {
      return _Placeholder(
        label: placeholderLabel,
        width: width,
        height: height,
        borderRadius: borderRadius,
      );
    }
    final url = imageUrl!;
    final isAsset = url.startsWith('assets/');
    if (isAsset && kIsWeb) {
      final resolvedUrl = Uri.base.resolve(url).toString();
      return ClipRRect(
        borderRadius: borderRadius ?? BorderRadius.zero,
        child: Image.network(
          resolvedUrl,
          width: width,
          height: height,
          fit: fit,
          errorBuilder: (_, __, ___) => _Placeholder(
            label: placeholderLabel,
            width: width,
            height: height,
            borderRadius: null,
          ),
          loadingBuilder: (context, child, loadingProgress) {
            if (loadingProgress == null) return child;
            return Container(
              width: width,
              height: height,
              decoration: BoxDecoration(
                color: const Color(0xFFF5F5F7),
                borderRadius: borderRadius,
              ),
              child: Center(
                child: SizedBox(
                  width: 28,
                  height: 28,
                  child: CircularProgressIndicator(
                    strokeWidth: 2,
                    value: loadingProgress.expectedTotalBytes != null
                        ? loadingProgress.cumulativeBytesLoaded /
                            (loadingProgress.expectedTotalBytes ?? 1)
                        : null,
                    color: const Color(0xFF4285F4),
                  ),
                ),
              ),
            );
          },
        ),
      );
    }
    if (isAsset) {
      return ClipRRect(
        borderRadius: borderRadius ?? BorderRadius.zero,
        child: Image.asset(
          url,
          width: width,
          height: height,
          fit: fit,
          errorBuilder: (_, __, ___) => _Placeholder(
            label: placeholderLabel,
            width: width,
            height: height,
            borderRadius: null,
          ),
        ),
      );
    }
    return ClipRRect(
      borderRadius: borderRadius ?? BorderRadius.zero,
      child: Image.network(
        url,
        width: width,
        height: height,
        fit: fit,
        errorBuilder: (_, __, ___) => _Placeholder(
          label: placeholderLabel,
          width: width,
          height: height,
          borderRadius: null,
        ),
        loadingBuilder: (context, child, loadingProgress) {
          if (loadingProgress == null) return child;
          return Container(
            width: width,
            height: height,
            decoration: BoxDecoration(
              color: const Color(0xFFF5F5F7),
              borderRadius: borderRadius,
            ),
            child: Center(
              child: SizedBox(
                width: 28,
                height: 28,
                child: CircularProgressIndicator(
                  strokeWidth: 2,
                  value: loadingProgress.expectedTotalBytes != null
                      ? loadingProgress.cumulativeBytesLoaded /
                          (loadingProgress.expectedTotalBytes ?? 1)
                      : null,
                  color: const Color(0xFF4285F4),
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}

class _Placeholder extends StatelessWidget {
  const _Placeholder({
    required this.label,
    this.width,
    this.height,
    this.borderRadius,
  });

  final String label;
  final double? width;
  final double? height;
  final BorderRadius? borderRadius;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      height: height,
      decoration: BoxDecoration(
        color: const Color(0xFFF5F5F7),
        borderRadius: borderRadius,
      ),
      child: Center(
        child: Text(
          label,
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
                color: const Color(0xFF5F5F67),
                fontWeight: FontWeight.w600,
              ),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }
}
