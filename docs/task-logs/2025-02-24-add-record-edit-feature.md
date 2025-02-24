# 履歴からの記録編集機能の追加

## 実装した機能の詳細
- 履歴画面のケバブ記録をタップして編集できる機能を追加
- 編集用のボトムシートを実装
- 既存の RecordForm コンポーネントを編集モードに対応
- 編集時は値が変更された場合のみ保存ボタンを有効化

## 設計上の考慮事項と実装方針
- 既存の RecordForm コンポーネントを再利用し、コードの重複を防止
- バリデーションロジックは既存のものを使用
- 編集時は createdAt を維持し、他のフィールドのみ更新
- ボトムシートを使用して一貫性のあるUIを提供

## コミット内容
1. useKebabRecords フックに updateRecord 関数を追加
2. RecordForm コンポーネントを編集モード対応に拡張
3. KebabHistoryItem をタップ可能に変更
4. HistoryScreen に編集機能を統合

## 新規作成・変更したファイル
- src/hooks/useKebabRecords.ts
  - updateRecord 関数の追加
  - 更新時の通知処理の実装
- src/components/home/RecordForm.tsx
  - mode と initialValues プロパティの追加
  - 編集モード時の UI と動作の実装
- src/components/history/KebabHistoryItem.tsx
  - onPress プロパティの追加
  - タップ可能なスタイルの適用
- src/components/history/MonthlyGroup.tsx
  - children プロパティの追加
  - コンポーネント構造の改善
- src/screens/HistoryScreen.tsx
  - 編集用ボトムシートの追加
  - 記録選択と編集フローの実装
  - スタイルの整理と改善

## 発生した問題と解決方法
1. 型エラー
   - MonthlyGroup の props 型を修正
   - typography と colors の型に合わせてスタイルを調整
2. コンポーネント構造
   - KebabHistoryItem の構造を修正してタップ可能に変更
   - ボトムシートの UI を既存のデザインに合わせて調整
3. BottomSheet の表示問題
   - HomeScreen の実装を参考に修正
   - 不要なプロパティを削除（enableContentPanningGesture, enableOverDrag）
   - BottomSheetBackdrop の opacity を 0.5 に設定
   - BottomSheetView のスタイル指定を修正
   - GestureHandlerRootView は App.tsx で既に設定済みであることを確認
   - z-index を使用して BottomSheet を BottomNavigation よりも前面に表示
   - BottomNavigation を View でラップしてスタイルを適用

## 今後の課題や改善点
- 編集履歴の記録機能の追加
- 一括編集機能の検討
- 編集時のアンドゥ/リドゥ機能の検討
