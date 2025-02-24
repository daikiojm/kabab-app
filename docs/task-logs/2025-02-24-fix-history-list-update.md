# ケバブ履歴一覧の即時更新機能の修正

## 概要
ケバブ履歴一覧から編集を行った直後に、一覧の状態が反映されない問題を修正しました。

## 修正内容

### src/screens/HomeScreen.tsx
- RecordFormのonComplete処理を修正し、記録完了後に履歴画面に遷移するように変更
- useKebabRecordsからloadRecordsを取得するように追加

### src/screens/HistoryScreen.tsx
- useKebabRecordsからloadRecordsを取得するように追加
- handleEditComplete関数で編集完了後にloadRecordsを呼び出すように修正
- useCallbackの依存配列にloadRecordsを追加

## 技術的な選択

### 画面遷移のタイミング
- アラートのOKボタンを押した後に自動的に履歴画面に遷移
- ボトムシートを閉じた後に遷移することで、スムーズなUXを実現


### 状態更新の方法
- AsyncStorageから最新のデータを再取得することで、確実に最新の状態を反映
- 編集完了後のコールバックでloadRecordsを呼び出すことで、UXを損なわない自然なタイミングで更新

### パフォーマンスへの考慮
- useCallbackを使用して不要な再レンダリングを防止
- loadRecordsの依存配列を適切に設定し、必要なタイミングでのみ更新を実行

## 今後の課題
- より効率的な状態更新方法の検討（必要に応じて）
- 大量のデータがある場合のパフォーマンス最適化

## レビュー時の確認ポイント
- 編集完了後の即時更新が正しく動作するか
- 不要な再レンダリングが発生していないか
- エラー時の挙動が適切か
