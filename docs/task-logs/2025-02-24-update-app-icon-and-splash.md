# アプリアイコンとスプラッシュ画面の更新

## 実装内容

1. アイコン生成スクリプトの作成
   - `scripts/icon-generator/` にTypeScriptスクリプトを実装
   - Node.jsのCanvasを使用して絵文字（🥙）を画像として描画
   - 各プラットフォームに必要なサイズでアイコンを生成
     - icon.png (1024x1024)
     - adaptive-icon.png (108x108)
     - favicon.png (192x192)
     - splash-icon.png (2048x2048)

2. app.jsonの更新
   - アプリ名とスラッグを "kabab-app" に変更
   - アイコンとスプラッシュ画面の設定を更新

## 設計上の工夫

1. スクリプトの再利用性
   - 独立したディレクトリで管理
   - TypeScriptで型安全性を確保
   - 詳細なREADMEを提供

2. アイコン生成の柔軟性
   - サイズを定数で管理
   - 絵文字のスケールを調整可能
   - エラーハンドリングの実装

## 新規作成したファイル

- `scripts/icon-generator/src/index.ts`
  - アイコン生成スクリプトの本体
  - Canvas APIを使用して絵文字を画像として描画
  - 各サイズのアイコンを生成して保存

- `scripts/icon-generator/README.md`
  - スクリプトの使用方法と生成されるファイルの説明
  - 実装詳細のドキュメント

- `tsconfig.scripts.json`
  - スクリプト用のTypeScript設定
  - ESModuleとNode.jsの互換性を確保

## コミット内容

1. feat(assets): add icon generator script
   - アイコン生成スクリプトの実装
   - TypeScript設定の追加
   - 依存関係（canvas）の追加

2. feat(app): update app name and icon settings
   - app.jsonの更新
   - アプリ名とスラッグの変更

## 今後の課題

1. アイコンのカスタマイズ性の向上
   - 背景色やグラデーションの設定オプション
   - 絵文字以外のアイコンソースの対応
   - アイコンのプレビュー機能

2. ビルド時の自動生成
   - ビルドプロセスの一部としてアイコン生成を組み込む
   - CIでの自動生成対応

3. プラットフォーム固有の要件対応
   - iOS/Androidの異なるアイコン要件への対応
   - 各プラットフォームの最新ガイドラインへの追従
