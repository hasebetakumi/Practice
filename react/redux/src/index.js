import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import * as History from 'history'


import makeStore from './reducks/Store/store';
import App from './App';
import { ConnectedRouter } from 'connected-react-router';

// 画面遷移履歴であるhistoryを作成する
const history = History.createBrowserHistory();

// 関数を実行してstoreを作成する
// historyを引数として渡してあげる
export const store = makeStore(history);
console.log('makestore')


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Provider→ラップしたコンポーネントにstoreを送る
  // ＋Reactコンポーネント内でreact-reduxのconnect関数を使えるようになる→reactとreduxを接続してstoreを変更できるように
  <Provider store={store}>
    {console.log('provide store')}
    {/* historyをstoreに渡して作成しているが、ここでhistoryをpropsとして渡すことでApp内の画面遷移情報をhistoryに入れてくれる */}
    {/* <ConnectedRouter history={history}> */}
      <App />
    {/* </ConnectedRouter> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
