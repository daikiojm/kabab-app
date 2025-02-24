# README へのアプリアイコン追加

## 実装内容

- README.md にアプリのアイコンを追加
- タイトルセクションのレイアウトを中央揃えに変更
- アイコンサイズを 120x120 に設定し、視認性を確保

## 設計上の工夫

- `<div align="center">` を使用して中央揃えのレイアウトを実現
- アイコンサイズは小さすぎず大きすぎない 120x120 を採用
- 既存の絵文字（🥙）は残し、アプリの親しみやすさを維持
- アプリ名を h3 タグで囲み、視覚的階層を明確化

## コミット内容

```
docs(readme): add app icon to readme header

- Add app icon image to the readme header
- Center align the title section
- Adjust icon size for better visibility
- Create task log for the changes
```

## 新規作成したファイル

- docs/task-logs/2025-02-24-add-app-icon-to-readme.md
  - README へのアプリアイコン追加に関する作業記録

## 今後の課題

- アプリアイコンのダークモード対応の検討
- README の他のセクションの視覚的改善の検討
