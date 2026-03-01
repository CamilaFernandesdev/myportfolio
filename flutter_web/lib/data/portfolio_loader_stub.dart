import 'package:flutter/services.dart';

/// Carrega asset via rootBundle (mobile/desktop).
Future<String> loadAssetString(String path) async {
  return rootBundle.loadString(path);
}
