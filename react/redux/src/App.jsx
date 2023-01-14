// import { useDispatch, useSelector } from "react-redux";
// import { signInAction } from "./reducks/Actions/action";

// function App() {
//   const dispatch = useDispatch()
//   // useSelectorで全てのstore情報を取得
//   const selector = useSelector((state) => state)

//   // 以下のように見ることができる
//   console.log(selector.users)

//   return (
//     <div>
//       <button onClick={() => dispatch(signInAction({uid: '0001', username: 'torahack'}))}>サインイン</button>
//     </div>
//   );
// }

// export default App;


/* 以下からはrouter設定してからのやつ */
// import Router from "./Router";
import { ContainerLogin } from "./reducks/Containers";
import { Login } from "./reducks/templates";

// App読み込みしたらとりあえずRouterに渡すように変更
// 今までここで読み込んでいたuseDispatchはtemplatesファイル内で読み込む
const App = () => {
  return (
    <main>
      {/* <Router /> */}
      {/* <Login /> */}
      <ContainerLogin />
    </main>
  )
}

export default App;