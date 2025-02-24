# Icon Generator

アプリケーションのアイコンとスプラッシュ画面を生成するスクリプト

## 生成されるファイル

- `assets/icon.png` (1024x1024) - アプリのメインアイコン
- `assets/adaptive-icon.png` (108x108) - Android用のアダプティブアイコン
- `assets/favicon.png` (192x192) - Web用のファビコン
- `assets/splash-icon.png` (2048x2048) - スプラッシュ画面用のアイコン

## 使用方法

```bash
npm run generate-icons
```

## 実装詳細

- Node.jsのCanvasを使用して絵文字（🥙）を画像として描画
- 各プラットフォームに必要なサイズでアイコンを生成
- 背景色は白（#FFFFFF）を使用
