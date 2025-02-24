# 画面遷移設定の更新

## 実装内容

記録画面（Home）と履歴画面（History）間の双方向の遷移について、以下の設定を変更しました：

- スワイプバックを無効化
- 画面遷移アニメーションを無効化

### 変更点

`App.tsx`のHome画面とHistory画面のナビゲーション設定を更新：

```typescript
<Stack.Screen 
  name="Home" 
  component={HomeScreen}
  options={{
    gestureEnabled: false,
    animation: 'none',
  }}
/>
```


```typescript
<Stack.Screen 
  name="History" 
  component={HistoryScreen}
  options={{
    gestureEnabled: false,
    animation: 'none',
  }}
/>
```

### 設定の詳細

- `gestureEnabled: false`: スワイプバックジェスチャーを無効化
- `animation: 'none'`: 画面遷移時のアニメーションを無効化

その他の画面遷移（記録⇔設定、記録⇔通知）については、デフォルトの設定（スワイプバック有効、スライドインアニメーション）を維持しています。

## 技術的な考慮事項

- React Native Stack Navigatorのscreen optionsを使用して個別の画面で設定を上書き
- デフォルトのscreenOptionsはそのまま維持し、必要な画面のみ設定を変更する方針を採用
