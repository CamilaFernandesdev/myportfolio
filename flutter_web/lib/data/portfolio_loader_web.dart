// ignore: avoid_web_libraries_in_flutter
import 'dart:html' as html;

/// Carrega asset via HTTP no Flutter Web (evita bug do path assets/assets/).
Future<String> loadAssetString(String path) async {
  final url = Uri.base.resolve(path).toString();
  final request = await html.HttpRequest.request(url);
  if (request.status != 200) {
    throw Exception('Failed to load $path: ${request.status}');
  }
  return request.responseText ?? '';
}
