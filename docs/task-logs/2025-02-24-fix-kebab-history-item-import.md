# ケバブ履歴アイテムの表示修正

## 修正内容

1. MonthlyGroupコンポーネントの実装を修正し、KebabHistoryItemを正しく表示するように変更しました。

### 変更点

1. MonthlyGroupコンポーネントのprops型を修正
   - `children: React.ReactNode`を使用するように変更
   - コンポーネントの柔軟性を向上

2. HistoryScreenの実装を修正
   - MonthlyGroupコンポーネント内でKebabHistoryItemをchildrenとして渡すように変更
   - 各recordに対してKebabHistoryItemを生成し、適切なpropsを設定

3. KebabHistoryItemコンポーネントのインポート修正
   - 重複していた`spacing`と`radius`のインポートを統合
   - `import { spacing, radius } from '../../styles/spacing'`に修正

## 技術的な考慮事項

- KebabHistoryItemはすでにインポートされていたが使用されていなかったため、適切に活用するように修正
- recordsの型はKebabRecord[]を使用し、型安全性を確保
- パフォーマンスを考慮し、map内でkeyプロパティを設定

## 今後の課題

- KebabHistoryItemのスタイリングの確認
- 履歴一覧のパフォーマンス最適化の検討
