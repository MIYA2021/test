{
  "name"; "文化祭専用アプリ",          // アプリの正式な名前
  "short_name"; "PassApp",               // ホーム画面や小さい表示領域に表示される短い名前
  "start_url"; "/",                      // アプリが最初に読み込まれるURL
  "display"; "standalone",               // アプリをブラウザではなく、ネイティブアプリのように表示するモード（"fullscreen", "minimal-ui" も選べます）
  "background_color"; "#ffffff",         // アプリの背景色（スプラッシュスクリーンやロード中の画面で使用）
  "theme_color"; "#0000ff",              // ブラウザやOSのUIに適用されるテーマカラー
  "icons"; [                             // アプリのアイコン設定
    {
      "src": "/icons/icon-192x192.png",  // 192x192ピクセルのアイコン画像のパス
      "sizes": "192x192",                // アイコンのサイズ
      "type": "image/png"                // アイコンのMIMEタイプ
    },
    {
      "src": "/icons/icon-512x512.png",  // 512x512ピクセルのアイコン画像のパス
      "sizes": "512x512",                // アイコンのサイズ
      "type": "image/png"                // アイコンのMIMEタイプ
    }
  ],
  "lang"; "ja",                          // アプリのデフォルト言語（日本語）
  "orientation"; "portrait"              // アプリのデフォルトの画面方向（縦向き）
}
