import { useDispatch } from "react-redux";
// push→画面遷移させる
// import {push} from 'connected-react-router'
import { signIn } from "../Operations/operation";
import { useSelector } from "react-redux"
import { getUserId, getUserName } from "../Selectors/selector"


const Login = () => {
    // 昔のmapDisparchToProps
    const dispatch = useDispatch()
    // storeの全ての情報を取得
    // 昔のmapStateToProps
    // dispatchが起こるたびにgetstate()を呼び出し差分を確認し、あれば再レンダリングを行う
    const selector = useSelector(state => state)
    // その全ての情報をselector関数(getUserId)に渡すと情報を取ってきてくれる
    const uid = getUserId(selector)
    const username = getUserName(selector)

    return (
        <div>
            <h2>ログイン</h2>
            {/* push→画面遷移させる */}
            <button onClick={() => dispatch(signIn())}>ログインする</button>
            <p>{uid}</p>
            <p>{username}</p>
        </div>
    )
}
// エントリーポイントであるindex.jsで読み込む
// エントリーポイント→配下のコンポーネントを全て読み込んで置く場所
export default Login