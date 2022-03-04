# tasukan

### 画面イメージ

### 起動方法

1. npm start
2. Expo Go App で tasukan 選択

### 作業ログ

- reactnative では expo を使うと楽になるらしい

  > expo コマンドが使えない時は npx を最初に使っていた
  > 以降 npm start で良いことに気づいた

- こちらの todo 丸コピした
  https://qiita.com/nitaking/items/e9bf4c52046004ef3186

  > VirtualizedLists should never be nested
  > の warning が出たが、native-base と相性が合わなかった（リストがうまく表示されない）ので保留

- パッケージのバージョンが合わないものがあった

  > 落として利用

- データを保存する仕組みを検討

  > AsyncStorage のラッパー版、react-native-storage を利用

- 非同期処理に苦戦

  > https://terrblog.com/useeffect%E3%81%AE%E5%9F%BA%E6%9C%AC%E7%9A%84%E3%81%AA%E4%BD%BF%E3%81%84%E6%96%B9%E3%81%A8%E9%9D%9E%E5%90%8C%E6%9C%9F%E5%87%A6%E7%90%86%E3%81%AE%E3%82%84%E3%82%8A%E6%96%B9/
  > こちらを参考に処理側でのデータ確認ができた

- データを画面に反映したい

  > https://reffect.co.jp/react/react-useeffect-understanding
  > こちらを参考にストレージの情報が反映されたことを確認

- 各操作を storage 操作に変更

- 登録はできているがリアルタイムで表示されない問題

  > 全ての機能を App.js で実行したが、タスクの読み込みを useEffect にしているためかリアルタイムでは表示されない
  > redux-persist というものを検証

- react-native-modal-date-picekr の dependency error

  > https://github.com/mmazzarolo/react-native-modal-datetime-picker/issues/223

- warning: DatePickerIOS has been merged with DatePickerAndroid and will be removed in a future release. It can now be installed and importeed from '@react-native-community/datetimepicker' indtead of 'react-native'
  の error

  > react-nateve-modal-datetime-picker を 8.5.1 以上でインストール

- redux sample の add book info
  > book:{"id":3,"title":"To Kill a Mockingbird"}

### Todo

- data がない時のエラー解消
- 1 個目を消して、新たに 2 つ目を作成すると key が重複する
