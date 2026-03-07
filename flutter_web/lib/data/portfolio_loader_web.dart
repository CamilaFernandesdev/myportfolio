import 'dart:js_interop';

import 'package:web/web.dart' as web;

/// Carrega asset via HTTP no Flutter Web (evita bug do path assets/assets/).
Future<String> loadAssetString(String path) async {
  final url = Uri.base.resolve(path).toString();
  final response = await web.window.fetch(url.toJS).toDart;
  if (!response.ok) {
    throw Exception('Failed to load $path: ${response.status}');
  }
  final jsText = await response.text().toDart;
  return jsText.toDart;
}
