# kabab-app

<div align="center">
  <img src="assets/icon.png" alt="Kabab App Icon" width="120" height="120" />
  <h3>ケバブ愛好家のための記録アプリケーション 🥙</h3>
</div>

## デモ動画

アプリケーションの動作デモをご覧ください：

https://github.com/user-attachments/assets/5dd8fdaa-2cdb-4f95-84d2-d965fcd8450d

## Requirements

- Node.js v22.14.0
- npm v11.1.0
- Volta（Node.jsとnpmのバージョン管理）
- iOS開発の場合
  - macOS
  - Xcode
  - iOS Simulator
- Android開発の場合
  - Android Studio
  - Android SDK
  - Android Emulator

## 技術スタック

- React Native (Expo)
- TypeScript
- Expo Router（ルーティングとナビゲーション）
- AsyncStorage（ローカルデータ保存）
- React Native Elements（UIコンポーネント）
- React Native Bottom Sheet（ボトムシートUI）
- Zod（フォームバリデーション）

## 開発環境のセットアップ

1. 必要な依存関係をインストール

```bash
npm install
```

2. iOSシミュレータで実行

```bash
npm run ios
```

3. Androidエミュレータで実行

```bash
npm run android
```

4. Web版で実行

```bash
npm run web
```

## アプリケーション利用者のペルソナ

- 毎日ケバブを食べる日本人成人男性。独身 30 代一人暮らし
- ソフトウェアエンジニア、都内在住
- 利用しているスマートフォンは iPhone
- ケバブのことを考えると夜も眠れない

## アプリケーションの要件

- ケバブ購入（食べた）の履歴を毎日つけることができるアプリ
- 最初のフェーズでは利用者は 1 人を想定しているため、ローカルに保存されていれば良い。のちにサーバサイドへの保存も検討するためそこら辺の設計は柔軟にしておきたい
- 画面構成は後述する（画面構成）
- アプリを開いてすぐに、ケバブ記録をつけることができるようにしたい
- 通知機能
  - ケバブ記録のリマインダー機能
    - 毎日指定した時刻に記録を促す通知
    - 設定画面から通知時刻の変更が可能
    - 通知をタップすると記録画面に遷移
  - プッシュ通知
    - ローカルプッシュ通知を使用
    - バックグラウンド時でも通知を表示
    - 通知音とバッジ数の表示
  - 通知履歴
    - 通知画面で過去の通知を確認可能
    - リマインダー通知も履歴に表示

## 画面構成

### トップ画面（HomeScreen）

- メイン機能
  - ヘッダー部分に設定アイコン（⚙️）と通知アイコン（🔔）を配置
  - ヘッダーはノッチにかからない程度に上部に配置
- ダッシュボード機能（DashboardStats）
  - 連続ケバブ日数の表示（🔥）：毎日記録をつけることでカウントアップ
  - 累積ケバブ数の表示（📊）：これまでに食べたケバブの総数
  - ケバブ豆知識の表示（💡）：ランダムに表示される豆知識
- ケバブ記録機能（RecordForm）
  - ボトムシートでメニューを選択
  - 1日に複数回の記録が可能
  - メニューはプリセットから選択可能（kebabOptions）

### 履歴画面（HistoryScreen）

- 月別グループ表示（MonthlyGroup）
- リストビューでケバブ記録を表示（KebabHistoryItem）
- 各記録には日付、メニュー名、メモを表示

### 設定画面（SettingsScreen）

- 履歴のリセット機能
- 通知設定（ReminderTimeSheet）
  - リマインダー時刻の設定
  - 通知のON/OFF切り替え

### 通知画面（NotificationScreen）

- 通知履歴の一覧表示（NotificationItem）
- 通知の種類
  - ケバブ記録の追加通知
  - リマインダー通知
  - ケバブ豆知識の通知

## 開発ガイドライン

- コミットメッセージは `.clinerules` に定義された Conventional Commits の規約に従うこと
- ライブラリ追加を伴う修正をする際には必ずライブラリの開発元ページを確認してメンテナンス状況をチェックすること
- 技術的な実装ルールについては `.clinerules` ファイルを参照してください

## GitHub Pages デプロイ

このアプリケーションは GitHub Pages で Web 版を公開しています。以下の手順でデプロイが自動的に実行されます：

1. `main` ブランチに変更をプッシュ
2. GitHub Actions が自動的にビルドとデプロイを実行
3. 数分後に GitHub Pages に反映

### 手動デプロイ（開発時）

ローカルから手動でデプロイする場合は以下のコマンドを実行します：

```bash
# Web 版のビルドとデプロイを実行
npm run deploy
```

このコマンドは以下の処理を実行します：

1. `expo export --platform web` で Web 版をビルド（dist ディレクトリに出力）
2. `gh-pages` パッケージを使用して GitHub Pages にデプロイ

## 開発ステータス

### 完了済み

- [x] プロジェクトの初期セットアップ
- [x] 基本的なナビゲーション構造
- [x] React NavigationからExpo Routerへの移行
- [x] 画面レイアウトの実装
  - [x] ホーム画面（HomeScreen）
  - [x] 履歴画面（HistoryScreen）
  - [x] 設定画面（SettingsScreen）
  - [x] 通知画面（NotificationScreen）
- [x] コアコンポーネントの実装
  - [x] ダッシュボード（DashboardStats）
  - [x] ケバブ記録フォーム（RecordForm）
  - [x] 履歴リスト（KebabHistoryItem, MonthlyGroup）
  - [x] 通知リスト（NotificationItem）
  - [x] リマインダー設定（ReminderTimeSheet）
- [x] データ管理機能
  - [x] ローカルストレージ（AsyncStorage）
  - [x] フォームバリデーション（Zod）
- [x] 通知機能
  - [x] リマインダー通知
  - [x] 記録追加通知
  - [x] 通知履歴管理
- [x] Web対応
  - [x] 静的レンダリングの実装（SEO対応）
  - [x] GitHub Pagesへのデプロイ設定

### 今後の予定

- [ ] パフォーマンス最適化
- [ ] オフライン対応の強化
- [ ] データバックアップ機能
- [ ] 統計・分析機能
