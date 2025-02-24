# Header コンポーネントの移動

## 実装内容

1. `Header` コンポーネントを `src/components/common/Header.tsx` から `src/components/home/Header.tsx` に移動
2. `HomeScreen` のインポートパスを更新
3. 古い `Header.tsx` ファイルを削除

## 設計上の考慮事項と選択した実装方針の理由

- `Header` コンポーネントは `HomeScreen` でのみ使用されており、他の画面では独自のヘッダー実装を使用していた
- コンポーネントの責任範囲を明確にするため、`home` ディレクトリに移動
- プロジェクトガイドラインの「関連するコンポーネントは機能別のディレクトリにグループ化する」に従う

## 変更したファイル

- `src/components/home/Header.tsx` (新規作成)
- `src/screens/HomeScreen.tsx` (インポートパス更新)
- `src/components/common/Header.tsx` (削除)

## 今後の課題や改善点

- 他の画面のヘッダー実装も共通化できる部分があれば、新しい共通コンポーネントとして抽出することを検討
- ヘッダーのスタイリングやパディングの設定を一貫性のあるものにする
