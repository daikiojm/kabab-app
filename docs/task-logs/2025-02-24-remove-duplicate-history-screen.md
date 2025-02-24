# 重複したHistoryScreenコンポーネントの削除

## 実装した内容

重複していたHistoryScreenコンポーネントを整理しました：

- `src/components/history/HistoryScreen.tsx` を削除
- `src/screens/HistoryScreen.tsx` を使用（現在の実装）

## 設計上の考慮事項と選択した実装方針の理由

### HistoryScreen コンポーネントについて
- `src/screens/HistoryScreen.tsx` を採用した理由：
  - コンポーネント配置のルールに従っている（画面コンポーネントは screens/ ディレクトリに配置）
  - MonthlyGroup コンポーネントと KebabHistoryItem を適切に使用している
  - より整理された実装となっている

## 変更内容

1. `src/components/history/HistoryScreen.tsx` を削除

## 今後の課題や改善点

- 他のコンポーネントでも同様の重複がないか継続的に確認
- コンポーネントの配置場所のルールを徹底
  - screens/: 画面コンポーネント
  - components/: 再利用可能なコンポーネント
  - components/[feature]/: 特定の機能に固有のコンポーネント
