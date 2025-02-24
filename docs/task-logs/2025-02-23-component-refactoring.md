# コンポーネントのリファクタリング

## 実装した機能の詳細

### 1. 共通コンポーネントの作成
- `Header`: 各画面で使用するヘッダーコンポーネント
- `EmptyState`: データが空の場合の表示コンポーネント
- `Card`: ダッシュボードで使用するカードUI
- `ListItem`: リスト項目の基本スタイル

### 2. スタイルの共通化
- `colors.ts`: カラーパレットの定義
- `spacing.ts`: スペーシングとボーダーラジウスの定義
- `typography.ts`: テキストスタイルの定義

### 3. Home画面の分割
- `DashboardStats`: 統計情報の表示
- `KebabTips`: ケバブ豆知識の表示
- `Selector`: 選択肢のUI
- `RecordForm`: 記録フォーム

### 4. History画面の分割
- `MonthlyGroup`: 月別グループのヘッダーと一覧
- `KebabHistoryItem`: 履歴の個別アイテム

### 5. Notification画面の分割
- `NotificationItem`: 通知の個別アイテム

### 6. 定数の分離
- `kebabOptions.ts`: ケバブ関連の選択肢とラベル

## 設計上の工夫

1. **責務の明確化**
   - 各コンポーネントの役割を明確に分離
   - ロジックとUIの分離を徹底

2. **再利用性の向上**
   - 共通コンポーネントの抽出
   - スタイルの共通化
   - 型の共有

3. **保守性の向上**
   - ファイル構造の整理
   - コンポーネントの粒度の適正化
   - 命名規則の統一

## コミット内容

```
feat(components): add common components
feat(styles): add shared style definitions
feat(home): split home screen components
feat(history): split history screen components
feat(notification): split notification screen components
feat(constants): extract kebab options
```

## 新規作成したファイル

### 共通コンポーネント
- `src/components/common/Header.tsx`
- `src/components/common/EmptyState.tsx`
- `src/components/common/Card.tsx`
- `src/components/common/ListItem.tsx`

### スタイル定義
- `src/styles/colors.ts`
- `src/styles/spacing.ts`
- `src/styles/typography.ts`

### Home画面
- `src/components/home/DashboardStats.tsx`
- `src/components/home/KebabTips.tsx`
- `src/components/home/Selector.tsx`
- `src/components/home/RecordForm.tsx`
- `src/components/home/HomeScreen.tsx`
- `src/components/home/selectors/index.tsx`

### History画面
- `src/components/history/MonthlyGroup.tsx`
- `src/components/history/KebabHistoryItem.tsx`
- `src/components/history/HistoryScreen.tsx`

### Notification画面
- `src/components/notification/NotificationItem.tsx`
- `src/components/notification/NotificationScreen.tsx`

### 定数
- `src/constants/kebabOptions.ts`

## 今後の課題

1. **テストの追加**
   - 各コンポーネントの単体テスト
   - インテグレーションテスト

2. **パフォーマンスの最適化**
   - メモ化の検討
   - 不要な再レンダリングの防止

3. **アクセシビリティの改善**
   - スクリーンリーダー対応
   - キーボード操作の対応

4. **ドキュメントの充実**
   - コンポーネントの使用方法
   - プロップスの説明
   - スタイルガイド
