# リマインダー通知の Toggle 機能の修正

## 概要
毎日のケバブ通知リマインダーが disabled の状態から変更できない問題を修正しました。

## 問題の詳細
- 設定画面を開くと、常に disabled の状態で表示される
- toggle を enable 方向に変更しても、一瞬 enable 状態に表示されるが、すぐに disabled 状態に戻ってしまう

## 原因
`useNotifications` フックの `toggleReminder` 関数に以下の問題がありました：

1. リマインダーの有効/無効を切り替える際、`notificationId` を `undefined` に設定していたため、通知の状態が正しく保持されていませんでした。
2. これにより、通知のスケジューリングと状態管理に不整合が生じていました。

## 修正内容
`src/hooks/useNotifications.ts` の `toggleReminder` 関数を修正：

1. `notificationId` を `undefined` にリセットする処理を削除
2. 状態更新時に既存の `notificationId` を保持するように変更

```typescript
const updatedReminder = {
  ...state.reminder,
  enabled,
}
```

## 動作確認項目
- [ ] 通知が無効時にリマインダーを有効化できないことを確認
- [ ] 通知が有効時にリマインダーを有効化できることを確認
- [ ] リマインダーの有効/無効が正しく切り替わることを確認
- [ ] リマインダーの設定が永続化されることを確認
- [ ] アプリ再起動後もリマインダーの設定が保持されることを確認

## 今後の課題
- リマインダー通知の設定状態をより分かりやすく表示する
- 通知設定の状態管理をより堅牢にする
