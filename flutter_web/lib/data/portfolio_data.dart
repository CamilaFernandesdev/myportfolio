import 'dart:convert';

import 'package:flutter/material.dart';

import 'portfolio_loader_stub.dart'
    if (dart.library.html) 'portfolio_loader_web.dart' as loader;

/// Dados do portfólio carregados de assets/portfolio.json.
/// Edite o JSON para alterar textos, projetos e links sem mexer no código.
class PortfolioData {
  static PortfolioData? _instance;

  /// Dados carregados (disponível após [load]).
  static PortfolioData get instance => _instance!;

  /// Carrega assets/portfolio.json + assets/projects.json e inicializa [instance]. Chamar antes de runApp.
  /// No Web usa HTTP para evitar bug do path duplicado (assets/assets/).
  static Future<void> load() async {
    final portfolioJson = await loader.loadAssetString('assets/portfolio.json');
    final projectsJson = await loader.loadAssetString('assets/projects.json');
    final portfolio = jsonDecode(portfolioJson) as Map<String, dynamic>;
    final projectsData = jsonDecode(projectsJson) as Map<String, dynamic>;
    portfolio['projects'] = projectsData['projects'];
    _instance = PortfolioData.fromJson(portfolio);
  }

  final String name;
  final String tagline;
  final String role;
  final String heroHeadline;
  final String heroSubhead;
  final String ctaPrimary;
  final String ctaSecondary;
  final String navCtaLabel;
  final String sectionAvailableLabel;
  final String sectionAvailableTitle;
  final String sectionAvailableSubtitle;
  final String sectionAvailableButton;
  final String sectionSoonLabel;
  final String sectionSoonTitle;
  final String sectionSoonSubtitle;
  final String sectionSoonButton;
  final String aboutSectionTitle;
  final String aboutFeaturedLabel;
  final String aboutFeaturedHeadline;
  final String aboutFeaturedMeta;
  final String aboutFeaturedButton;
  final String aboutTabAll;
  final String aboutTabValues;
  final String aboutTabExperiences;
  final String aboutTabEducation;
  final String aboutTabCompetencies;
  final String aboutCardCta;
  final List<AboutItem> aboutItems;
  final List<AboutItem> aboutExperiences;
  final List<AboutItem> aboutEducation;
  final List<AboutItem> aboutCompetencies;
  final String stackSectionTitle;
  final String stackDescription;
  final String projectsSectionTitle;
  final String projectsSectionCta;
  final String projectsPageTitle;
  final String projectsPageIntro;
  final String projectsPageCta;
  final String projectsFilterLabel;
  final String filterAll;
  final String filterDados;
  final String filterMobile;
  final String filterWeb;
  final List<ProjectItem> projects;
  final String footerBrand;
  final String footerInspired;
  final List<FooterLink> footerLinks;

  PortfolioData({
    required this.name,
    required this.tagline,
    required this.role,
    required this.heroHeadline,
    required this.heroSubhead,
    required this.ctaPrimary,
    required this.ctaSecondary,
    required this.navCtaLabel,
    required this.sectionAvailableLabel,
    required this.sectionAvailableTitle,
    required this.sectionAvailableSubtitle,
    required this.sectionAvailableButton,
    required this.sectionSoonLabel,
    required this.sectionSoonTitle,
    required this.sectionSoonSubtitle,
    required this.sectionSoonButton,
    required this.aboutSectionTitle,
    required this.aboutFeaturedLabel,
    required this.aboutFeaturedHeadline,
    required this.aboutFeaturedMeta,
    required this.aboutFeaturedButton,
    required this.aboutTabAll,
    required this.aboutTabValues,
    required this.aboutTabExperiences,
    required this.aboutTabEducation,
    required this.aboutTabCompetencies,
    required this.aboutCardCta,
    required this.aboutItems,
    required this.aboutExperiences,
    required this.aboutEducation,
    required this.aboutCompetencies,
    required this.stackSectionTitle,
    required this.stackDescription,
    required this.projectsSectionTitle,
    required this.projectsSectionCta,
    required this.projectsPageTitle,
    required this.projectsPageIntro,
    required this.projectsPageCta,
    required this.projectsFilterLabel,
    required this.filterAll,
    required this.filterDados,
    required this.filterMobile,
    required this.filterWeb,
    required this.projects,
    required this.footerBrand,
    required this.footerInspired,
    required this.footerLinks,
  });

  factory PortfolioData.fromJson(Map<String, dynamic> j) {
    return PortfolioData(
      name: j['name'] as String? ?? '',
      tagline: j['tagline'] as String? ?? '',
      role: j['role'] as String? ?? '',
      heroHeadline: j['heroHeadline'] as String? ?? '',
      heroSubhead: j['heroSubhead'] as String? ?? '',
      ctaPrimary: j['ctaPrimary'] as String? ?? '',
      ctaSecondary: j['ctaSecondary'] as String? ?? '',
      navCtaLabel: j['navCtaLabel'] as String? ?? '',
      sectionAvailableLabel: j['sectionAvailableLabel'] as String? ?? '',
      sectionAvailableTitle: j['sectionAvailableTitle'] as String? ?? '',
      sectionAvailableSubtitle: j['sectionAvailableSubtitle'] as String? ?? '',
      sectionAvailableButton: j['sectionAvailableButton'] as String? ?? '',
      sectionSoonLabel: j['sectionSoonLabel'] as String? ?? '',
      sectionSoonTitle: j['sectionSoonTitle'] as String? ?? '',
      sectionSoonSubtitle: j['sectionSoonSubtitle'] as String? ?? '',
      sectionSoonButton: j['sectionSoonButton'] as String? ?? '',
      aboutSectionTitle: j['aboutSectionTitle'] as String? ?? '',
      aboutFeaturedLabel: j['aboutFeaturedLabel'] as String? ?? '',
      aboutFeaturedHeadline: j['aboutFeaturedHeadline'] as String? ?? '',
      aboutFeaturedMeta: j['aboutFeaturedMeta'] as String? ?? '',
      aboutFeaturedButton: j['aboutFeaturedButton'] as String? ?? '',
      aboutTabAll: j['aboutTabAll'] as String? ?? '',
      aboutTabValues: j['aboutTabValues'] as String? ?? '',
      aboutTabExperiences: j['aboutTabExperiences'] as String? ?? 'Experiências',
      aboutTabEducation: j['aboutTabEducation'] as String? ?? 'Educacional',
      aboutTabCompetencies: j['aboutTabCompetencies'] as String? ?? 'Competências',
      aboutCardCta: j['aboutCardCta'] as String? ?? '',
      aboutItems: (j['aboutItems'] as List<dynamic>?)
              ?.map((e) => AboutItem.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      aboutExperiences: (j['aboutExperiences'] as List<dynamic>?)
              ?.map((e) => AboutItem.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      aboutEducation: (j['aboutEducation'] as List<dynamic>?)
              ?.map((e) => AboutItem.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      aboutCompetencies: (j['aboutCompetencies'] as List<dynamic>?)
              ?.map((e) => AboutItem.fromJson(e as Map<String, dynamic>))
              .toList() ??
          (j['aboutItems'] as List<dynamic>?)
              ?.map((e) => AboutItem.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      stackSectionTitle: j['stackSectionTitle'] as String? ?? '',
      stackDescription: j['stackDescription'] as String? ?? '',
      projectsSectionTitle: j['projectsSectionTitle'] as String? ?? '',
      projectsSectionCta: j['projectsSectionCta'] as String? ?? '',
      projectsPageTitle: j['projectsPageTitle'] as String? ?? '',
      projectsPageIntro: j['projectsPageIntro'] as String? ?? '',
      projectsPageCta: j['projectsPageCta'] as String? ?? '',
      projectsFilterLabel: j['projectsFilterLabel'] as String? ?? '',
      filterAll: j['filterAll'] as String? ?? 'Todos',
      filterDados: j['filterDados'] as String? ?? 'Dados',
      filterMobile: j['filterMobile'] as String? ?? 'Mobile',
      filterWeb: j['filterWeb'] as String? ?? 'Web',
      projects: (j['projects'] as List<dynamic>?)
              ?.map((e) => ProjectItem.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      footerBrand: j['footerBrand'] as String? ?? '',
      footerInspired: j['footerInspired'] as String? ?? '',
      footerLinks: (j['footerLinks'] as List<dynamic>?)
              ?.map((e) => FooterLink.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
    );
  }

  /// Retorna o projeto com [slug] ou null se não existir.
  ProjectItem? projectBySlug(String slug) {
    try {
      return projects.firstWhere((p) => p.slug == slug);
    } catch (_) {
      return null;
    }
  }
}

/// Mapeia nome do ícone (JSON) para IconData.
IconData? _iconFromString(String? name) {
  if (name == null || name.isEmpty) return null;
  switch (name) {
    case 'touch_app_outlined':
      return Icons.touch_app_outlined;
    case 'architecture_outlined':
      return Icons.architecture_outlined;
    case 'trending_up_outlined':
      return Icons.trending_up_outlined;
    case 'code':
      return Icons.code;
    case 'play_circle_filled':
      return Icons.play_circle_filled;
    case 'language':
      return Icons.language;
    case 'open_in_new':
      return Icons.open_in_new;
    case 'work_outline':
      return Icons.work_outline;
    case 'school_outlined':
      return Icons.school_outlined;
    case 'stars_outlined':
      return Icons.stars_outlined;
    case 'folder_outlined':
      return Icons.folder_outlined;
    case 'dashboard_outlined':
      return Icons.dashboard_outlined;
    default:
      return Icons.link;
  }
}

enum ProjectType { dados, mobile, web }

ProjectType _projectTypeFromString(String? s) {
  switch (s) {
    case 'dados':
      return ProjectType.dados;
    case 'mobile':
      return ProjectType.mobile;
    case 'web':
      return ProjectType.web;
    default:
      return ProjectType.web;
  }
}

class ProjectLink {
  final String label;
  final String url;
  final IconData? icon;

  const ProjectLink({
    required this.label,
    required this.url,
    this.icon,
  });

  static ProjectLink fromJson(Map<String, dynamic> j) {
    return ProjectLink(
      label: j['label'] as String? ?? '',
      url: j['url'] as String? ?? '',
      icon: _iconFromString(j['icon'] as String?),
    );
  }
}

/// Vínculo do projeto com instituição (faculdade, empresa).
class ProjectInstitution {
  final String name;
  final String? logoUrl;
  final String url;
  /// Tipo do vínculo: "empresa", "faculdade", "confidencial".
  final String type;

  const ProjectInstitution({
    required this.name,
    this.logoUrl,
    required this.url,
    this.type = 'empresa',
  });

  static ProjectInstitution fromJson(Map<String, dynamic> j) {
    return ProjectInstitution(
      name: j['name'] as String? ?? '',
      logoUrl: j['logoUrl'] as String?,
      url: j['url'] as String? ?? '',
      type: j['type'] as String? ?? 'empresa',
    );
  }
}

class ProjectItem {
  final String title;
  final String date;
  final String category;
  final ProjectType projectType;
  final String slug;
  final String thumbnailLabel;
  final String description;
  final String? imageUrl;
  final List<String> imageUrls;
  final List<String> stack;
  final List<ProjectLink> projectLinks;
  final List<ProjectInstitution> institutions;

  const ProjectItem({
    required this.title,
    required this.date,
    required this.category,
    required this.projectType,
    required this.slug,
    required this.thumbnailLabel,
    required this.description,
    this.imageUrl,
    this.imageUrls = const [],
    this.stack = const [],
    this.projectLinks = const [],
    this.institutions = const [],
  });

  static ProjectItem fromJson(Map<String, dynamic> j) {
    return ProjectItem(
      title: j['title'] as String? ?? '',
      date: j['date'] as String? ?? '',
      category: j['category'] as String? ?? '',
      projectType: _projectTypeFromString(j['projectType'] as String?),
      slug: j['slug'] as String? ?? '',
      thumbnailLabel: j['thumbnailLabel'] as String? ?? '',
      description: j['description'] as String? ?? '',
      imageUrl: j['imageUrl'] as String?,
      imageUrls: (j['imageUrls'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          [],
      stack: (j['stack'] as List<dynamic>?)?.map((e) => e as String).toList() ?? [],
      projectLinks: (j['projectLinks'] as List<dynamic>?)
              ?.map((e) => ProjectLink.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      institutions: (j['institutions'] as List<dynamic>?)
              ?.map((e) => ProjectInstitution.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
    );
  }
}

class AboutItem {
  final IconData icon;
  final String title;
  final String description;

  const AboutItem({
    required this.icon,
    required this.title,
    required this.description,
  });

  static AboutItem fromJson(Map<String, dynamic> j) {
    return AboutItem(
      icon: _iconFromString(j['icon'] as String?) ?? Icons.info_outline,
      title: j['title'] as String? ?? '',
      description: j['description'] as String? ?? '',
    );
  }
}

class FooterLink {
  final String label;
  final String url;

  const FooterLink({required this.label, required this.url});

  static FooterLink fromJson(Map<String, dynamic> j) {
    return FooterLink(
      label: j['label'] as String? ?? '',
      url: j['url'] as String? ?? '',
    );
  }
}
