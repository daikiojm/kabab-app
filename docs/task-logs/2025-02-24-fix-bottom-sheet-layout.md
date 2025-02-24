# HistoryScreen のボトムシートレイアウト修正

## 概要
HistoryScreen のボトムシートがボトムナビゲーションよりも下に表示される問題を修正しました。

## 修正内容

### コンポーネント構造の変更
- BottomSheet コンポーネントを最上位の View の外に移動
- Fragment (<>) で全体を囲む構造に変更
- BottomNavigation の配置を修正

### BottomSheet の設定変更
- enableContentPanningGesture を追加
- enableOverDrag を追加
- contentContainer スタイルを追加（flex: 1）

### スタイルの変更
- z-index 関連のスタイルを削除
  - bottomNavigation の zIndex: 1 を削除
  - bottomSheet の zIndex: 2 を削除

## 修正理由
- HomeScreen と同じコンポーネント構造にすることで、正しい重なり順を実現
- z-index による制御を避け、コンポーネントの配置による自然な重なり順を採用

## 技術的な考慮事項
- React Native のコンポーネントツリーでの描画順序を活用
- BottomSheet を View の外に配置することで、常に最前面に表示されることを保証

## 動作確認項目
- ボトムシートが正しく最前面に表示されること
- ボトムシートの開閉動作が正常に機能すること
- ボトムナビゲーションが正しく表示されること
- 背景のオーバーレイが正しく機能すること
