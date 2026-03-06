import 'package:flutter/material.dart';

/// Tema inspirado no site Google Antigravity (antigravity.google):
/// fundo branco, texto preto, acentos em azul, minimalista.
class AppTheme {
  AppTheme._();

  static const Color _background = Color(0xFFFFFFFF);
  static const Color _surface = Color(0xFFF5F5F7);
  static const Color _onBackground = Color(0xFF1A1A1A);
  static const Color _onSurfaceVariant = Color(0xFF5F5F67);
  static const Color _accent = Color(0xFF4285F4);
  static const Color _accentRed = Color(0xFFEA4335); // toque Antigravity

  static ThemeData get light => ThemeData(
        useMaterial3: true,
        brightness: Brightness.light,
        scaffoldBackgroundColor: _background,
        colorScheme: const ColorScheme.light(
          primary: _accent,
          onPrimary: Colors.white,
          surface: _surface,
          onSurface: _onBackground,
          onSurfaceVariant: _onSurfaceVariant,
          outline: Color(0xFFE0E0E5),
          background: _background,
          onBackground: _onBackground,
        ),
        textTheme: _textTheme,
        appBarTheme: AppBarTheme(
          backgroundColor: Colors.white,
          elevation: 0,
          scrolledUnderElevation: 0,
          centerTitle: false,
          iconTheme: IconThemeData(color: _onBackground),
          titleTextStyle: TextStyle(
            color: _onBackground,
            fontSize: 18,
            fontWeight: FontWeight.w500,
          ),
        ),
        cardTheme: CardThemeData(
          color: Colors.white,
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
            side: const BorderSide(color: Color(0xFFE0E0E5), width: 1),
          ),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: _onBackground,
            foregroundColor: Colors.white,
            elevation: 0,
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(24),
            ),
          ),
        ),
        outlinedButtonTheme: OutlinedButtonThemeData(
          style: OutlinedButton.styleFrom(
            foregroundColor: _onBackground,
            side: const BorderSide(color: _onBackground),
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(24),
            ),
          ),
        ),
      );

  static const TextTheme _textTheme = TextTheme(
    displayLarge: TextStyle(
      color: _onBackground,
      fontSize: 48,
      fontWeight: FontWeight.w700,
      letterSpacing: -1.2,
      height: 1.1,
    ),
    displayMedium: TextStyle(
      color: _onBackground,
      fontSize: 36,
      fontWeight: FontWeight.w600,
      letterSpacing: -0.8,
    ),
    headlineMedium: TextStyle(
      color: _onBackground,
      fontSize: 24,
      fontWeight: FontWeight.w600,
    ),
    titleLarge: TextStyle(
      color: _onBackground,
      fontSize: 20,
      fontWeight: FontWeight.w500,
    ),
    bodyLarge: TextStyle(
      color: _onSurfaceVariant,
      fontSize: 16,
      height: 1.5,
    ),
    bodyMedium: TextStyle(
      color: _onSurfaceVariant,
      fontSize: 14,
      height: 1.5,
    ),
    labelLarge: TextStyle(
      color: _onSurfaceVariant,
      fontSize: 14,
      fontWeight: FontWeight.w500,
    ),
  );

  static Color get accentRed => _accentRed;
}
