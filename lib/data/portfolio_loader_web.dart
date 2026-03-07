import 'package:flutter/services.dart';

/// Carrega asset via rootBundle (mesmo no web), para respeitar base-href do build.
Future<String> loadAssetString(String path) async {
  return rootBundle.loadString(path);
}
